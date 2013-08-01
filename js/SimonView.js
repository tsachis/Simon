var SimonView = function () {
    var btnPushHandle = null;
    var simonPlayDelay = 1000;
    var clearPushedButtons = function () {
        $("li").removeClass("pushed");
    };
    var buttonPlay = function (index) {
        console.log("pushed " + index);
        if (btnPushHandle != null)
            clearTimeout(btnPushHandle);
        clearPushedButtons();
        $("li.btn" + index).addClass("pushed");
        btnPushHandle = setTimeout(clearPushedButtons, 1000);
    };
    var simonPlayEnd = function (simonRecord) {
        $(simonRecord).each(function (i) {
            setTimeout(function () {
                buttonPlay(simonRecord[i]);
            }, (i + 1) * simonPlayDelay);
        });
    };
    var humanClicked = function () {
        buttonPlay($(this).text());
        simon.humanPlay($(this).text());
    };
    var simon = new SimonController({
        onSimonPlayEnd: simonPlayEnd
    });
    return {
        init: function () {
            $("li").click(humanClicked);
            simon.init();
            simon.startSimonPlay();
        }
    };
} ();






