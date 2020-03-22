LeftSection.getTotalWidth = function() {
    return LeftSection.width + LeftSection.marginRight;
};

// 주의 사항 : Project.patternList.push(pattern); 는 addPatternItem 후에 별도로 호출해야 함. (project.js에서 해당 메서드 없이 이용이 필요)
LeftSection.addNewPatternItem = function(pattern) {
    var $infoTab1List = $("#left > section > #infoTab1 > ul");
    var patternIndex = Project.patternList.length;
    var patternID = PATTERNID_HEADER + patternIndex;

    $infoTab1List.append("<li><button id='" + patternID + "' class='pattern'>" + pattern.label + "</button></li>");
    $newButton = $infoTab1List.find("#" + patternID);
    $newButton.on("click", LeftSection.onPatternButtonClick);
    Project.patternList.push(pattern);

    Log.debug("Pattern added (" + pattern.label + ")");
};

LeftSection.changeTabTo = function(tabIndex) {
    var $infoTabs = $("#left > section > .infoTab");

    for (var i = 0; i < $infoTabs.length; i++) {
        $infoTabs.eq(i).css("display", "none");
        $infoTabs.eq(i).removeClass("selected");
    }

    $infoTabs.eq(tabIndex).css("display", "");
    $infoTabs.eq(tabIndex).addClass("selected");
};

LeftSection.selectPattern = function(patternIndex) {
    var pattern = Project.patternList[patternIndex];
    var $patternButtons = $("#left > section > #infoTab1 button.pattern");
    var $selectedButton = $patternButtons.eq(patternIndex);

    for (var i = 0; i < $patternButtons.length; i++) {
        $patternButtons.eq(i).removeClass("selected");
    }

    $selectedButton.addClass("selected");
    Project.currentPattern = pattern;
    Project.currentPatternIndex = patternIndex;

    RightSection.selectTileset(pattern.tileset, false);
    var $labelHeaderText = $("#sectionTab1 > #location > input#labelHeaderText");
    $labelHeaderText.val(pattern.locationLabelHeader);
    var $zeroPadCheckBox = $("#sectionTab1 > #location > input#zeroPadCheckBox");
    $zeroPadCheckBox.prop("checked", pattern.isLocationZeroPadOn ? true : false);

    switch (pattern.blockOption1) {
        case BLOCKOPTION1_UNITKILL: $("#sectionTab1 > #bomb > input#blockOption1Kill").prop("checked", true); break;
        case BLOCKOPTION1_UNITREMOVE: $("#sectionTab1 > #bomb > input#blockOption1Remove").prop("checked", true); break;
        case BLOCKOPTION1_UNITLIVE: $("#sectionTab1 > #bomb > input#blockOption1Live").prop("checked", true); break;
    }
    switch (pattern.blockOption2) {
        case BLOCKOPTION2_BLOCKKILL: $("#sectionTab1 > #bomb > input#blockOption2Kill").prop("checked", true); break;
        case BLOCKOPTION2_BLOCKREMOVE: $("#sectionTab1 > #bomb > input#blockOption2Remove").prop("checked", true); break;
    }

    $("#right #sectionTab1 > #bomb > select#bombUnits1").val(pattern.bombUnit1);
    $("#right #sectionTab1 > #bomb > select#bombUnits2").val(pattern.bombUnit2);
    $("#right #sectionTab1 > #bomb > select#bombUnits3").val(pattern.bombUnit3);
    
    $("#sectionTab1 > #bomb > span#showTurns").text(pattern.currentTurn + " / " + pattern.turnList.length);
    $("#sectionTab1 > #bomb > input#wait").val(pattern.turnList[pattern.currentTurn - 1].wait);
    RightSection.refreshWaitRefData();

    // 로케이션 리스트의 레이어 갱신 및 maxLayer 계산
    var gridWidth = RightArticle.canvasTileWidth;
    var gridHeight = RightArticle.canvasTileHeight;
    RightArticle.refreshLocationListLayers(gridWidth, gridHeight);

    // 화면 갱신
    RightArticle.clearContext(terrainCanvas, terrainContext);
    RightArticle.clearContext(locationCanvas, locationContext);
    RightArticle.clearContext(baseCanvas, baseContext);
    RightArticle.clearContext(blockCanvas, blockContext);
    RightArticle.clearContext(bombCanvas, bombContext);
    RightArticle.clearContext(selectionCanvas, selectionContext);
    // gridContext는 한 번 초기화하고 그대로 사용하므로, 초기화할 필요가 없음.

    RightSection.refreshLocationExample();
    $("#sectionTab1 > #bomb > input#currentTurn").val(pattern.currentTurn);

    RightArticle.redrawTerrainCanvas();
    RightArticle.redrawLocationList();
    RightSection.selectMode(pattern.currentMode); // BombCanvas는 selectMode 내부에서 다시 그리므로, 여기서는 해줄 필요가 없음.

    // 패턴 레이블, 제작자, 설명 변경
    if (!pattern.label || pattern.label === "") {
        let $patternLabel = $("#right > header button#patternLabel");
        $patternLabel.html("패턴 이름");
    }
    else updatePatternLabel(patternIndex, pattern.label);

    if (!pattern.author || pattern.author === "") {
        let $patternAuthorButton = $("#right > header button#patternAuthorButton");
        $patternAuthorButton.html("패턴 제작자");
    }
    else updatePatternAuthor(patternIndex, pattern.author);

    if (!pattern.description || pattern.description === "") {
        var $patternDescriptionButton = $("#right > header button#patternDescriptionButton");
        $patternDescriptionButton.html("패턴 설명을 입력하세요");
    }
    else updatePatternDescription(patternIndex, pattern.description);

    // 스크롤바 내리기
    var $infoTab1 = $("#left > section > #infoTab1");
    $infoTab1.scrollTop($selectedButton.position().top - 40);
};

LeftSection.onPatternButtonClick = function() {
    var buttonID = $(this).prop("id");
    var patternIndex = parseInt(buttonID.substr(PATTERNID_HEADER.length));

    if (patternIndex === Project.currentPatternIndex) {
        let input = Popup.prompt("패턴의 이름을 입력해주세요 : ", Project.patternList[patternIndex].label);
    
        if (input !== null) updatePatternLabel(patternIndex, input);
    }
    else {
        LeftSection.selectPattern(patternIndex);
    }
};

LeftSection.clearPatternTab = function() {
    $patternButtons = $("#left > section > #infoTab1 button.pattern");
    $patternButtons.parent().remove();
};

LeftSection.onSortComplete = function(event, ui) {
    var buttonID = ui.item.children().eq(0).prop("id");
    var prevIndex = parseInt(buttonID.substr(PATTERNID_HEADER.length));
    var currentIndex = ui.item.index();
    $patternButtons = $("#left > section > #infoTab1 button.pattern");
    
    // 버튼 ID 변경
    for (var i = 0; i < $patternButtons.length; i++) {
        $patternButtons.eq(i).prop("id", PATTERNID_HEADER + i);
    }

    // 패턴 배열 내의 객체들 위치 변경
    var patternList = Project.patternList;
    if (currentIndex < prevIndex) {
        let temp = patternList[prevIndex];
        for (var i = prevIndex; i > currentIndex; i--) {
            patternList[i] = patternList[i - 1];
            if (i - 1 === Project.currentPatternIndex) Project.currentPatternIndex = i;
        }
        patternList[currentIndex] = temp;
    }
    else {
        let temp = patternList[prevIndex];
        for (var i = prevIndex; i < currentIndex; i++) {
            patternList[i] = patternList[i + 1];
            if (i + 1 === Project.currentPatternIndex) Project.currentPatternIndex = i;
        }
        patternList[currentIndex] = temp;
    }
    if (prevIndex === Project.currentPatternIndex) Project.currentPatternIndex = currentIndex;

    Project.currentPattern = patternList[currentIndex];
};