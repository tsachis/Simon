var SimonController = function (args) {
    var simonRecord = [];
    var humanRecord = [];
    var simonPlaying = false;
    var playerStartTime = null;
    var playerTimeoutCheckHandle = null;
    var gameData = {
        gameButtons: [],
        round: 1,
        settings: {
            gameSize: 6,
            humanPlayMaxTime: 1000 * 50
        }
    };
    var attachEvent = function (name, handler) {
        return handler == null ? function () {
            console.log(name);
            console.log(simonRecord.join(" "));
            console.log(humanRecord.join(" "));
        } : handler;
    };
    var events = {
        onSimonPlayEnd: attachEvent("onSimonPlayEnd", args.onSimonPlayEnd),
        onGameOver: attachEvent("onGameOver", args.onGameOver),
        onHumanFinishedRound: attachEvent("onHumanFinishedRound", args.onHumanFinishedRound),
        onHumanMoveIsGood: attachEvent("onHumanMoveIsGood", args.onHumanMoveIsGood),
        onHumanPlayEnd: attachEvent("onHumanPlayEnd", args.onHumanPlayEnd),
        onPlayerTimeout: attachEvent("onPlayerTimeout", args.onPlayerTimeout),
        onSimonButtonPlay: attachEvent("onSimonButtonPlay", args.onSimonButtonPlay)
    };
    var isGameOver = function () {
        return (simonRecord.join(" ").indexOf(humanRecord.join(" ")) < 0)
    }
    var isPlayerTimeOut = function () {
        return (new Date() - playerStartTime) > (gameData.settings.humanPlayMaxTime * gameData.round);
    };
    var isHumanFinishedRound = function () {
        return (simonRecord.join(" ") === humanRecord.join(" "));
    };
    var simonPlay = function () {
        var btnIndex = utils.getRandomInt(0, gameData.gameButtons.length - 1);
        simonRecord.push(btnIndex);

        $(simonRecord).each(function (i) {
            console.log("Simon pushed " + this);
            events.onSimonButtonPlay(this);
            
        });
        endSimonPlay();
    };
    var nextRound = function () {
        gameData.round++;
        humanRecord = [];
        simonPlay();
    };
    var checkPlayerTimeout = function () {
        if (isPlayerTimeOut()) {
            events.onPlayerTimeout();
            events.onGameOver();
            clearInterval(playerTimeoutCheckHandle);
        }
    };
    var endSimonPlay = function () {
        simonPlaying = false;
        events.onSimonPlayEnd(simonRecord);
        playerStartTime = new Date();
        playerTimeoutCheckHandle = setInterval(checkPlayerTimeout, 100);
        return;
    };
    return {
        init: function () {
            gameData.gameButtons = utils.createIntArray(gameData.settings.gameSize);
            console.log(gameData.gameButtons.join(" "));
            humanRecord = [];
            simonRecord = [];
            simonPlaying = false;
        },
        startSimonPlay: function () {
            simonPlaying = true;
            humanRecord = [];
            simonRecord = [];
            simonPlay();
        },
        humanPlay: function (index) {
            if (simonPlaying || isHumanFinishedRound() || isGameOver()) {
                return;
            }
            humanRecord.push(index);
            console.log("Human pushed " + index);
            if (isGameOver()) {
                clearInterval(playerTimeoutCheckHandle);
                events.onHumanPlayEnd();
                events.onGameOver();
            }
            else if (isHumanFinishedRound()) {
                clearInterval(playerTimeoutCheckHandle);
                setTimeout(function () {
                    events.onHumanPlayEnd();
                    events.onHumanFinishedRound();
                    nextRound();
                }, 1000);
            }
            else {
                events.onHumanMoveIsGood();
            }
        }
    }
};


