LeftNav.changeOrClosePanel = function() {
    var $iconList = $("#left > nav li");
    var $leftSection = $("#left > section");
    var $infoTabs = $("#left > section > .infoTab");

    if (!$leftSection.hasClass("open")) {
        for (var i = 0; i < $iconList.length; i++) {
            if ($iconList.eq(i).prop("id") === $(this).prop("id")) {
                $leftSection.addClass("open");
                $(this).addClass("selected");
                for (var j = 0; j < $infoTabs.length; j++) $infoTabs.eq(j).css("display", "none");
                $infoTabs.eq(i).css("display", "");
                Page.refreshLayout(true);
                break;
            }
        }
    }
    else {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
            $leftSection.removeClass("open");
            Page.refreshLayout(false);
        }
        else {
            for (var i = 0; i < $iconList.length; i++) {
                if ($iconList.eq(i).prop("id") === $(this).prop("id")) {
                    for (var j = 0; j < $iconList.length; j++) $iconList.eq(j).removeClass("selected");
                    $(this).addClass("selected");
                    for (var j = 0; j < $infoTabs.length; j++) $infoTabs.eq(j).css("display", "none");
                    $infoTabs.eq(i).css("display", "");
                    break;
                }
            }

        }
    }
};