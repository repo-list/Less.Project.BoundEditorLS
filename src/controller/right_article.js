$(document).ready(function() {
    if ($("#listTab1").hasClass("selected")) RightHeader.switchTo("articleTab2");
    else RightHeader.switchTo("articleTab1");

    resizeCanvases();
});

RightArticle.switchTo = function(elementId) {
    $("#articleTab1").css("display", "");
    $("#articleTab2").css("display", "");
    $("#"+elementId).css("display", "none");
};

function resizeCanvases() {
    var $canvasHolder1 = $("#articleTab1");
    var $bombCanvases = $("#articleTab1 > canvas");
    var canvasWidth = RightArticle.canvas.bomb.columns * RightArticle.canvas.pixelsPerTile;
    var canvasHeight = RightArticle.canvas.bomb.rows * RightArticle.canvas.pixelsPerTile;

    $canvasHolder1.css("width", canvasWidth + "px");
    $canvasHolder1.css("height", canvasHeight + "px");
    for (var i = 0; i < $bombCanvases.length; i++) {
        $bombCanvases.eq(i).prop("width", canvasWidth);
        $bombCanvases.eq(i).prop("height", canvasHeight);
    }
}