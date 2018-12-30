$(document).ready(function() {
    var $tabList = $("#right > nav li");
    $tabList.on("click", function() {
        if ($(this).hasClass("selected")) return;
        
        var $tab;
        for (var i = 0; i < $tabList.length; i++) {
            $tab = $tabList.eq(i);
            if ($tab.hasClass("selected")) {
                $tab.removeClass("selected");
                break;
            }
        }
        $(this).toggleClass("selected");
    });
});