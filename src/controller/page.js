$(document).ready(function() {
    Page.refreshLayout();

    $(window).on("resize", onWndResize);
});

Page.refreshLayout = function() {
    var $leftSection = $("#left > section");
    var $htmlBody = $("html,body");
    var $rightArea = $("#right");

    if ($leftSection.hasClass("open")) {
        $htmlBody.css("min-width", "");
    }
    else {
        var newMinWidth = Page.minWidth - LeftSection.totalWidth;
        $htmlBody.css("min-width", newMinWidth);
    }
    $rightArea.css("width", "");
    $rightArea.css("width", ($("#page").width() - $("#left").width()) + "px");
};

function onWndResize() {
    Page.refreshLayout();
    FooterElements.refreshWndSize();
}