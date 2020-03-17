RightHeader.switchTo = function(elementID) {
    $("#headerTab1").css("display", "none");
    $("#headerTab2").css("display", "none");
    $("#"+elementID).css("display", "");
};

RightHeader.onButtonClick = function() {
    var pattern, author;
    switch ($(this).prop("id")) {
        case "newPattern":
            pattern = createNewPattern();
            LeftSection.addNewPatternItem(pattern);
            LeftSection.selectPattern(Project.patterns.length - 1);
            console.log("Button Clicked - New Pattern");
            break;
        case "loadPattern":
            // 이벤트 핸들러는 index 파일에 있음.
            console.log("Button Clicked - Load Pattern");
            break;
        case "savePattern":
            savePattern(Project.currentPattern);
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