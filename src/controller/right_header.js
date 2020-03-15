RightHeader.switchTo = function(elementID) {
    $("#headerTab1").css("display", "none");
    $("#headerTab2").css("display", "none");
    $("#"+elementID).css("display", "");
};

RightHeader.onButtonClick = function() {
    switch ($(this).prop("id")) {
        case "newPattern":
            alert("새 패턴 - 준비 중입니다.");
            console.log("Button Clicked - New Pattern");
            break;
        case "loadPattern":
            alert("패턴 불러오기 - 준비 중입니다.");
            console.log("Button Clicked - Load Pattern");
            break;
        case "savePattern":
            alert("패턴 저장 - 준비 중입니다.");
            console.log("Button Clicked - Save Pattern");
            break;
        case "sharePattern":
            alert("패턴 공유 - 준비 중입니다.");
            console.log("Button Clicked - Share Pattern");
            break
        case "working":
            alert("작업 중");
            console.log("Button Clicked - Working");
            break;
    }
};