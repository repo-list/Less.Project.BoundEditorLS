Page.onWndResize = function() {
    Page.refreshLayout(false);
    FooterElements.onWndResize();
};

Page.refreshLayout = function(shouldRefreshInfoTabs) {
    var $leftSection = $("#left > section");
    var $htmlBody = $("html,body");
    var $rightArea = $("#right");

    if ($leftSection.hasClass("open")) {
        $htmlBody.css("min-width", "");
    }
    else {
        var newMinWidth = Page.minWidth - LeftSection.totalWidth();
        $htmlBody.css("min-width", newMinWidth);
    }
    $rightArea.css("width", "");
    $rightArea.css("width", ($("#page").width() - $("#left").width()) + "px");
    
    if (shouldRefreshInfoTabs) {
        var $infoTabs = $("#left > section > .infoTab");
        for (var i = 0; i < $infoTabs.length; i++) {
            $infoTabs.eq(i).width($leftSection.width());
            $infoTabs.eq(i).height($leftSection.height());
        }
    }
};