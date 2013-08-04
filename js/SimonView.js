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
        $("#txtRound").text(simon.getRound() + 1)
    };
    var gameOver = function () {
        $(".main>div").hide();
        $(".game-over").show();
    };
    var simon = null;
    var startGame = function () {
        $(".simonContainer").html("");
        $(".main>div").hide();
        gameZoneHeight = $(window).height() * 0.5;
        var btnSize = gameZoneHeight * 0.4;
        $(".simonContainer").height(gameZoneHeight).width(gameZoneHeight);
        $(".simonContainer").css("left", Math.max(($(".main").width() / 2) - (gameZoneHeight / 2) - btnSize, 10));
        $(".simonContainer").css("top", (gameZoneHeight * 0.1));
        for (var i = 1; i <= gameSize; i++) {
            var btn = $("<div></div>");
            btn.addClass("btn" + i).addClass("btn")
                    .attr("data-id", i)
                    .width(btnSize)
                    .height(btnSize)
                    .click(humanClicked)
                    .appendTo($(".simonContainer"));
            addTransformToButton(btn, i, gameSize, gameZoneHeight);
        }
        var btn = $("<div></div>");
        btn.addClass("round")
                    .width(btnSize)
                    .height(btnSize)
                    .css("left", (gameZoneHeight / 2))
                    .css("top", (gameZoneHeight / 2))
                    .append($("<div id='txtRound'>1</div>").width(btnSize).height(btnSize))
                    .appendTo($(".simonContainer"));
        $(".simonContainer").show();
        simon = new SimonController({
            onSimonPlayEnd: simonPlayEnd,
            onGameOver: gameOver,
            onHumanFinishedRound: roundOver
        });
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






