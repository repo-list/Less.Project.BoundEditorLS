$(document).ready(function() {
    $("#left > nav li").on("click", changeOrClosePanel);
});

function changeOrClosePanel() {
    var $iconList = $("#left > nav li");
    var $leftSection = $("#left > section");
    var $icon;
    var shouldCancel = false;

    if ($leftSection.hasClass("open")) {
        if (!$(this).hasClass("selected")) {
            for (var i = 0; i < $iconList.length; i++) {
                $icon = $iconList.eq(i);
                if ($icon.hasClass("selected")) {
                    $icon.removeClass("selected");
                    shouldCancel = true;
                    break;
                }
            }
        }
    }

    $(this).toggleClass("selected");
    if (!shouldCancel) {
        $leftSection.toggleClass("open");
        Page.refreshLayout();
    }
}