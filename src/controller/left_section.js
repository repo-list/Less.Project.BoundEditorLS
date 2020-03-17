LeftSection.totalWidth = function() {
    return LeftSection.width + LeftSection.marginRight;
};

// 주의 사항 : Project.patterns.push(pattern); 는 addPatternItem 후에 별도로 호출해야 함. (project.js에서 해당 메서드 없이 이용이 필요)
LeftSection.addNewPatternItem = function(pattern) {
    $infoTab1 = $("#left > section > #infoTab1");
    var patternIndex = Project.patterns.length;
    var patternID = PATTERNID_HEADER + patternIndex;
    $infoTab1.append("<button id='" + patternID + "' class='pattern'>" + pattern.label + "</button>");
    $infoTab1.find("#" + patternID).on("click", LeftSection.onPatternButtonClick);
    Project.patterns.push(pattern);
    console.log("Pattern added (" + pattern.label + ")");
};

LeftSection.changeTabTo = function(tabIndex) {
    $infoTabs = $("#left > section > .infoTab");

    for (var i = 0; i < $infoTabs.length; i++) {
        $infoTabs.eq(i).css("display", "none");
        $infoTabs.eq(i).removeClass("selected");
    }

    $infoTabs.eq(tabIndex).css("display", "");
    $infoTabs.eq(tabIndex).addClass("selected");
};

LeftSection.selectPattern = function(patternIndex) {
    var pattern = Project.patterns[patternIndex];
    $patternButtons = $("#left > section > #infoTab1 > button.pattern");
    for (var i = 0; i < $patternButtons.length; i++) {
        $patternButtons.eq(i).removeClass("selected");
    }
    $patternButtons.eq(patternIndex).addClass("selected");
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
};

LeftSection.onPatternButtonClick = function() {
    var buttonID = $(this).prop("id");
    var patternIndex = parseInt(buttonID.substr(PATTERNID_HEADER.length));
    LeftSection.selectPattern(patternIndex);
};

LeftSection.clearPatternTab = function() {
    $("#left > section > #infoTab1 > button.pattern").remove();
};