RightHeader.switchTo = function(elementID) {
    $("#headerTab1").css("display", "none");
    $("#headerTab2").css("display", "none");
    $("#" + elementID).css("display", "");
};

RightHeader.onButtonClick = function() {
    switch ($(this).prop("id")) {
        case "patternLabel": RightHeader.onPatternLabelClick(); break;
        case "newPattern": RightHeader.onNewPatternClick(); break;
        case "loadPattern": RightHeader.onLoadPatternClick(); break;
        case "savePattern": RightHeader.onSavePatternClick(); break;
        case "deletePattern": RightHeader.onDeletePatternClick(); break;
        case "sharePattern": RightHeader.onSharePatternClick(); break;
        case "working": RightHeader.onWorkingClick(); break;
    }
};

RightHeader.onPatternLabelClick = function() {
    if (Project.currentPattern === null || Project.currentPatternIndex === null) return;

    var input = Popup.prompt("패턴의 이름을 입력해주세요 : ", Project.currentPattern.label);

    if (input !== null) updatePatternLabel(Project.currentPatternIndex, input);
};

RightHeader.onNewPatternClick = function() {
    let pattern = createNewPattern();
    LeftSection.addNewPatternItem(pattern);
    LeftSection.selectPattern(Project.patternList.length - 1);

    Log.debug("Button Clicked - New Pattern");
};

RightHeader.onLoadPatternClick = function() {
    var $loadPatternFile = $("#right #headerTab1 > #loadPatternFile");
    $loadPatternFile.click();

    Log.debug("Button Clicked - Load Pattern");
};

RightHeader.onSavePatternClick = function() {
    savePattern(Project.currentPattern);

    Log.debug("Button Clicked - Save Pattern");
};

RightHeader.onDeletePatternClick = function() {
    var confirmResult = Popup.confirm("정말로 삭제하시겠습니까?");
    
    if (confirmResult === true) {
        deletePattern(Project.currentPatternIndex);
        if (Project.patternList.length > 0) {
            LeftSection.selectPattern(Project.patternList.length - 1);
        }
    }

    Log.debug("Button Clicked - Delete Pattern (delete : " + confirmResult + ")");
};

RightHeader.onSharePatternClick = function() {
    Popup.alert("패턴 공유 - 준비 중입니다.");

    Log.debug("Button Clicked - Share Pattern");
};

RightHeader.onWorkingClick = function() {
    Popup.alert("작업 중");

    Log.debug("Button Clicked - Working");
};