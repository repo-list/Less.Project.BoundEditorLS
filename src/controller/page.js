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

Page.onClick = function() {
    // 메인 메뉴 관련 클릭 처리
    $mainMenuIcon = $("#header > #mainMenuIcon");
    $mainMenu = $("#header > div#mainMenu");

    iconPosition = $mainMenuIcon.position();
    iconPosition.right = iconPosition.left + $mainMenuIcon.width();
    iconPosition.bottom = iconPosition.top + $mainMenuIcon.height();
    menuPosition = $mainMenu.position();
    menuPosition.right = menuPosition.left + $mainMenu.width();
    menuPosition.bottom = menuPosition.top + $mainMenu.height();

    if ($mainMenu.hasClass("open") &&
        !((event.clientX >= iconPosition.left && event.clientX <= iconPosition.right) && (event.clientY >= iconPosition.top && event.clientY <= iconPosition.bottom)) &&
        !((event.clientX >= menuPosition.left && event.clientX <= menuPosition.right) && (event.clientY >= menuPosition.top && event.clientY <= menuPosition.bottom))) {
        $mainMenu.removeClass("open");
    }
};