var SimonView = function () {
    var btnPushHandle = null;
    var simonPlayDelay = 1000;
    var gameZoneHeight = null;
    var gameSize = 6;
    var addTransformToButton = function (btn, index, gameSize, gameZoneHeight) {
        btn.css("-webkit-transform", "rotate(" + index * (360 / gameSize) + "deg) translate(" + (gameZoneHeight / 2) + "px) rotate(-" + index * (360 / gameSize) + "deg)");
    };
    var animateButtonClick = function (btn) {
        var size = btn.width() * 0.9;
        btn.addClass("pushed").width(size).height(size);
    };
    var clearPushedButtons = function () {
        var size = gameZoneHeight * 0.4;
        $(".simonContainer div").removeClass("pushed")
                                .width(size).height(size);
    };
    var buttonPlay = function (index) {
        console.log("pushed " + index);
        if (btnPushHandle != null)
            clearTimeout(btnPushHandle);
        clearPushedButtons();
        animateButtonClick($("div.btn" + index));

        btnPushHandle = setTimeout(clearPushedButtons, 200);
    };
    var simonPlayEnd = function (simonRecord) {
        $(simonRecord).each(function (i) {
            setTimeout(function () {
                buttonPlay(simonRecord[i]);
            }, (i + 1) * simonPlayDelay);
        });
    };
    var humanClicked = function () {
        buttonPlay($(this).data("id"));
        simon.humanPlay($(this).data("id"));
    };
    var roundOver = function () { 
        $(".simonHeader").text("Round " + simon.getRound())
    };
    var gameOver = function () {
        $(".main>div").hide();
        $(".game-over").show();
    };
    var simon = new SimonController({
        onSimonPlayEnd: simonPlayEnd,
        onGameOver: gameOver,
        onHumanFinishedRound: roundOver
    });
    var startGame = function () {
        $(".simonContainer").html("");
        $(".main>div").hide();
        $(".simonContainer,.simonHeader").show();
        gameZoneHeight = $(window).height() * 0.5;
        $(".simonContainer").height(gameZoneHeight).width(gameZoneHeight);
        //$(".simonContainer").css("left", ($(window).width() / 2) - (gameZoneHeight / 2));
        $(".simonContainer").css("top", (gameZoneHeight * 0.1));
        for (var i = 1; i <= gameSize; i++) {
            var btn = $("<div></div>");
            btn.addClass("btn" + i)
                    .attr("data-id", i)
                    .width(gameZoneHeight * 0.4)
                    .height(gameZoneHeight * 0.4)
                    .click(humanClicked)
                    .appendTo($(".simonContainer"));
            addTransformToButton(btn, i, gameSize, gameZoneHeight);
        }
        simon.init();
        simon.startSimonPlay();
    };
    return {
        init: function () {
            $(".main>div").hide();
            $(".start").show();
            $("#btnStart,#btnRestart").click(function () {
                startGame();
            });
        }
    };
} ();






