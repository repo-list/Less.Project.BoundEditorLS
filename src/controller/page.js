$(document).ready(function() {
    Page.refreshLayout();

    $(window).on("resize", function() {
        Page.refreshLayout();
        FooterElements.refreshWndSize();
    });
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
    $rightArea.css("width", ($("#page").width() - $("#left").width() - 1) + "px");
};