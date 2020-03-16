LeftSection.totalWidth = function() {
    return LeftSection.width + LeftSection.marginRight;
};

LeftSection.addPatternItem = function(pattern) {
    $infoTab1 = $("#left > section > #infoTab1");
    $infoTab1.append("<button id='p" + pattern.index + "' class='pattern'>" + pattern.label + "</button>");
    Project.patterns.push(pattern);
    LeftSection.selectPattern(pattern);
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

LeftSection.selectPattern = function(pattern) {
    $patternButtons = $("#left > section > #infoTab1 > button.pattern");
    for (var i = 0; i < $patternButtons.length; i++) {
        $patternButtons.eq(i).removeClass("selected");
    }
    $patternButtons.eq(pattern.index).addClass("selected");
    Project.currentPattern = pattern;

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
    RightArticle.clearContext(bombCanvas, bombContext);
    RightArticle.clearContext(selectionCanvas, selectionContext);

    for (var i = 0; i < pattern.tileDataList.length; i++) {
        let tileData = pattern.tileDataList[i];
        SCMapAPI.drawTile(terrainContext, gridWidth, gridHeight, tileData.tile, tileData.posX, tileData.posY, 1, 1);
    }
    console.log("Redraw : Pattern Tiles");
    for (var i = 0; i < pattern.locationList.length; i++) {
        SCMapAPI.drawLocation(locationContext, gridWidth, gridHeight, pattern.locationList[i]);
    }
    console.log("Redraw : Pattern Locations");

    // bombMode는 들어갈 때 다시 그리므로, 여기서 처리할 필요가 없음.
};