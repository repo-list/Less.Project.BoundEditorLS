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
        case "patternAuthorButton" : RightHeader.onPatternAuthorButtonClick(); break;
        case "patternDescriptionButton" : RightHeader.onPatternDescriptionButtonClick(); break;
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
    var title = "패턴 공유";
    var message = "준비 중입니다.";

    Popup.alert(title, message);

    Log.debug("Button Clicked - Share Pattern");
};

RightHeader.onPatternAuthorButtonClick = function() {
    if (Project.currentPattern === null || Project.currentPatternIndex === null) return;
    if (Project.isPrivateProject) {
        let title = "패턴 제작자 닉네임";
        let message = "개인 프로젝트는 패턴별로 제작자를 변경할 수 없습니다.";
        Popup.alert(title, message);
        return;
    }

    var input = Popup.prompt("패턴 제작자의 닉네임을 입력해주세요 : ", Project.currentPattern.author);

    if (input !== null) updatePatternAuthor(Project.currentPatternIndex, input);
};

RightHeader.onPatternDescriptionButtonClick = function() {
    if (Project.currentPattern === null || Project.currentPatternIndex === null) return;

    var input = Popup.prompt("패턴에 대한 설명을 입력해주세요 : ", Project.currentPattern.description);

    if (input !== null) updatePatternDescription(Project.currentPatternIndex, input);
};

RightHeader.onWorkingClick = function() {
    var title = "작업 중";
    var message = "작업 중입니다.";

    Popup.alert(title, message);

    Log.debug("Button Clicked - Working");
};