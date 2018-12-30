$(document).ready(function() {
    var $canvases = $("#right > article > canvas");
    var canvasWidth = RightArticle.canvas.columns * RightArticle.canvas.pixelsPerTile;
    var canvasHeight = RightArticle.canvas.rows * RightArticle.canvas.pixelsPerTile;

    for (var i = 0; i < $canvases.length; i++) {
        $canvases.eq(i).width(canvasWidth);
        $canvases.eq(i).height(canvasHeight);
    }
});