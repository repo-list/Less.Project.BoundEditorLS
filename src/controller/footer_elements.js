FooterElements.onWndResize = function() {
    FooterElements.refreshWndSize();
};

FooterElements.refreshWndSize = function() {
    var $windowSize = $("#footer > #wndSize");
    $windowSize.text(window.innerWidth + " x " + window.innerHeight);
};

FooterElements.onRightArticleTab1MouseMove = function() {
    var x = event.offsetX;
    var y = event.offsetY;
    var coordX = parseInt(x / RightArticle.canvasTileWidth) + 1;
    var coordY = parseInt(y / RightArticle.canvasTileHeight) + 1;

    if (SCMapAPI.isReady) {
        let $articleAreaCoords = $("#footer > span#articleAreaCoords");
        $articleAreaCoords.text("(" + coordX + ", " + coordY + ")");
    }
};

FooterElements.onRightArticleTab1MouseOut = function() {
    var $articleAreaCoords = $("#footer > span#articleAreaCoords");
    $articleAreaCoords.text("");
};