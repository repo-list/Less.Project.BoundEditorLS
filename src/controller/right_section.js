$(document).ready(function() {
    if ($("#listTab1").hasClass("selected")) RightHeader.switchTo("sectionTab2");
    else RightHeader.switchTo("sectionTab1");
});

RightSection.switchTo = function(elementId) {
    $("#sectionTab1").css("display", "");
    $("#sectionTab2").css("display", "");
    $("#"+elementId).css("display", "none");
};