Page.onWndResize = function() {
    Page.refreshLayout(false);
    FooterElements.onWndResize();
};

Page.refreshLayout = function(shouldRefreshInfoTabs) {
    var $leftSection = $("#left > section");
    var $htmlBody = $("html,body");
    var $rightArea = $("#right");
    var $page = $("#page");
    var $left = $("#left");

    if ($leftSection.hasClass("open")) {
        $htmlBody.css("min-width", "");
    }
    else {
        let newMinWidth = Page.minWidth - LeftSection.getTotalWidth();
        $htmlBody.css("min-width", newMinWidth);
    }

    $rightArea.css("width", "");
    $rightArea.css("width", ($page.width() - $left.width()) + "px");
    
    if (shouldRefreshInfoTabs) {
        let $infoTabs = $("#left > section > .infoTab");
        for (var i = 0; i < $infoTabs.length; i++) {
            $infoTabs.eq(i).width($leftSection.width());
            $infoTabs.eq(i).height($leftSection.height());
        }
    }
};