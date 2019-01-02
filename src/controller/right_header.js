$(document).ready(function() {
    if ($("#listTab1").hasClass("selected")) RightHeader.switchTo("headerTab2");
    else RightHeader.switchTo("headerTab1");

    $("#right > header button").on("click", RightHeader.onButtonClick);
});

RightHeader.switchTo = function(elementId) {
    $("#headerTab1").css("display", "");
    $("#headerTab2").css("display", "");
    $("#"+elementId).css("display", "none");
};

RightHeader.onButtonClick = function() {
    switch ($(this).prop("id")) {
        case "newPattern":
            alert("새 패턴");
            break;
        case "loadPattern":
            alert("불러오기");
            break;
        case "savePattern":
            alert("저장");
            break;
        case "working":
            alert("작업 중");
            break;
    }
};