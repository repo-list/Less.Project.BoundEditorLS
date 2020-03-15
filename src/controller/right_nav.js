RightNav.changeTab = function() {
    var $tabList = $("#right > nav li");
    var $tab;
    if ($(this).hasClass("selected")) return;

    for (var i = 0; i < $tabList.length; i++) {
        $tab = $tabList.eq(i);
        if ($tab.hasClass("selected")) {
            $tab.removeClass("selected");
            break;
        }
    }
    $(this).toggleClass("selected");
    
    if ($("#listTab1").hasClass("selected")) {
        RightHeader.switchTo("headerTab1");
        RightArticle.switchTo("articleTab1");
        RightSection.switchTo("sectionTab1");
    }
    else {
        RightHeader.switchTo("headerTab2");
        RightArticle.switchTo("articleTab2");
        RightSection.switchTo("sectionTab2");
    }
};