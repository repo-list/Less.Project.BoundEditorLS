RightSection.switchTo = function(elementID) {
    $("#sectionTab1").css("display", "none");
    $("#sectionTab2").css("display", "none");
    $("#"+elementID).css("display", "");
};

RightSection.onButtonClick = function() {
    var targetID = $(this).prop("id");
    switch (targetID) {
        case "terrainMode": RightSection.selectMode("terrainMode"); break;
        case "locationMode": RightSection.selectMode("locationMode"); break;
        case "bombMode": RightSection.selectMode("bombMode"); break;
    }
};

RightSection.onTilesetChange = function() {
    var tilesetName = $(this).val();
    RightSection.selectTileset(tilesetName, true);

    // 이미 그려져 있는 타일들의 정보 변경 후 다시 그리기
    for (var i = 0; i < Project.currentPattern.tileDataList.length; i++) {
        let byte1 = Project.currentPattern.tileDataList[i].tile.byteCode[0];
        let byte2 = Project.currentPattern.tileDataList[i].tile.byteCode[1];
        let newTile = new SCTile(tilesetName, byte1, byte2);
        Project.currentPattern.tileDataList[i].tile = newTile;
    }

    RightArticle.redrawTerrainCanvas();

    var index = RightSection.currentTileIndex;
    if (index != UNDEFINED_INT) RightSection.selectTileByIndex(RightSection.currentTileIndex);
};

RightSection.onTileClick = function() {
    var tileName = $(this).prop("id");
    RightSection.selectTile(tileName);
};

RightSection.deselectTiles = function() {
    var cssSelector = "";

    switch (RightSection.currentTileset) {
        case SCTilesetList.Badlands: cssSelector = "#sectionTab1 div#badlandsTiles > div.tile"; break;
        case SCTilesetList.SpacePlatform: cssSelector = "#sectionTab1 div#spacePlatformTiles > div.tile"; break;
        case SCTilesetList.Installation: cssSelector = "#sectionTab1 div#installationTiles > div.tile"; break;
        case SCTilesetList.AshWorld: cssSelector = "#sectionTab1 div#ashWorldTiles > div.tile"; break;
        case SCTilesetList.JungleWorld: cssSelector = "#sectionTab1 div#jungleWorldTiles > div.tile"; break;
        case SCTilesetList.DesertWorld: cssSelector = "#sectionTab1 div#desertWorldTiles > div.tile"; break;
        case SCTilesetList.IceWorld: cssSelector = "#sectionTab1 div#iceWorldTiles > div.tile"; break;
        case SCTilesetList.TwilightWorld: cssSelector = "#sectionTab1 div#twilightWorldTiles > div.tile"; break;
    }
    
    var $tempTileDivs = $(cssSelector);
    for (var j = 0; j < $tempTileDivs.length; j++) $tempTileDivs.eq(j).css("border", "");
    RightSection.currentTile = null;
    RightSection.currentTileIndex = UNDEFINED_INT;

    console.log("Tile deselected.");
};

RightSection.onSCMapAPILoad = function() {
    RightSection.addTiles(); // 타일 선택 부분에 타일 추가
    $("#sectionTab1 div.tiles > div.tile").on("click", RightSection.onTileClick); // 모든 타일이 생성되었으면, 이벤트 등록
    RightSection.selectTile(SCTileList.Badlands.Null); // 타일 선택

    // 로케이션 예시 크기 조절
    var $locationCanvas = $("#sectionTab1 > #location > #exampleCanvas");
    var gridWidth = RightArticle.canvasTileWidth;
    var gridHeight = RightArticle.canvasTileHeight;
    $locationCanvas.prop("width", gridWidth * 2);
    $locationCanvas.prop("height", gridHeight * 2);

    RightSection.refreshLocationExample(); // 로케이션 예시 표시
    
    // 그 외 로케이션 모드 관련 처리
    var $labelHeaderText = $("#sectionTab1 > #location > input#labelHeaderText");
    $labelHeaderText.on("change", function() {
        RightSection.refreshLocationExample();
        var newLabelHeader = $("#sectionTab1 > #location > input#labelHeaderText").val();
        var listStrLen = (Project.currentPattern.locationList.length + "").length;
        for (var i = 0; i < Project.currentPattern.locationList.length; i++) {
            let newNumber = i + 1;
            for (j = (newNumber + "").length; j < listStrLen; j++) {
                newNumber = "0" + newNumber;
            }
            Project.currentPattern.locationList[i].label = newLabelHeader + newNumber;
        }
        RightArticle.redrawLocationList();
        Project.currentPattern.locationLabelHeader = newLabelHeader;
    });

    var $zeroPadCheckBox = $("#sectionTab1 > #location > input#zeroPadCheckBox");
    $zeroPadCheckBox.on("change", function() {
        RightSection.refreshLocationExample();

        var labelHeader = $("#sectionTab1 > #location > input#labelHeaderText").val();
        if ($zeroPadCheckBox.is(":checked")) {
            var listStrLen = (Project.currentPattern.locationList.length + "").length;
            for (var i = 0; i < Project.currentPattern.locationList.length; i++) {
                let newNumber = i + 1;
                for (j = (newNumber + "").length; j < listStrLen; j++) {
                    newNumber = "0" + newNumber;
                }
                Project.currentPattern.locationList[i].label = labelHeader + newNumber;
            }
        }
        else {
            for (var i = 0; i < Project.currentPattern.locationList.length; i++) {
                Project.currentPattern.locationList[i].label = labelHeader + (i + 1);
            }
        }
        
        RightArticle.redrawLocationList();
        Project.currentPattern.isLocationZeroPadOn = $zeroPadCheckBox.is(":checked");
    });
};

RightSection.selectMode = function(modeName) {
    $("#sectionTab1 button#terrainMode").removeClass("selected");
    $("#sectionTab1 button#locationMode").removeClass("selected");
    $("#sectionTab1 button#bombMode").removeClass("selected");

    $("#sectionTab1 > div#terrain").css("display", "none");
    $("#sectionTab1 > div#location").css("display", "none");
    $("#sectionTab1 > div#bomb").css("display", "none");
    $("#articleTab1 > canvas#location").css("display", "none");
    $("#articleTab1 > canvas#base").css("display", "none");
    $("#articleTab1 > canvas#block").css("display", "none");
    $("#articleTab1 > canvas#bomb").css("display", "none");
    $("#articleTab1 > canvas#grid").css("display", "none");
    
    $("#articleTab1 > canvas#terrain").css("opacity", 1.0);
    $("#sectionTab1 button#" + modeName).addClass("selected");

    switch (modeName) {
        case "terrainMode":
            $("#sectionTab1 > div#terrain").css("display", "");
            $("#articleTab1 > canvas#grid").css("display", "");
            break;
        case "locationMode":
        $("#articleTab1 > canvas#terrain").css("opacity", 0.8);
            $("#sectionTab1 > div#location").css("display", "");
            $("#articleTab1 > canvas#location").css("display", "");
            $("#articleTab1 > canvas#grid").css("display", "");
            break;
        case "bombMode":
            $("#sectionTab1 > div#bomb").css("display", "");
            $("#articleTab1 > canvas#terrain").css("opacity", 0.5);
            $("#articleTab1 > canvas#base").css("display", "");
            $("#articleTab1 > canvas#block").css("display", "");
            $("#articleTab1 > canvas#bomb").css("display", "");
            RightArticle.redrawBombSettings();
            break;
    }
    RightArticle.clearContext(selectionCanvas, selectionContext);
    if (modeName === "locationMode" && RightArticle.selectedLocation !== null) {
        let gridWidth = RightArticle.canvasTileWidth;
        let gridHeight = RightArticle.canvasTileHeight;
        let left = RightArticle.selectedLocation.getLeft(gridWidth);
        let right = RightArticle.selectedLocation.getRight(gridWidth);
        let top = RightArticle.selectedLocation.getTop(gridHeight);
        let bottom = RightArticle.selectedLocation.getBottom(gridHeight);
        let posX = parseInt(left / gridWidth);
        let posY = parseInt(top / gridHeight);
        let lenX = parseInt((right - left) / gridWidth);
        let lenY = parseInt((bottom - top) / gridHeight);
        let borderWidth = 2;
        RightArticle.drawSelectionSquare(selectionContext, gridWidth, gridHeight, posX, posY, lenX, lenY, borderWidth);
    }
    RightSection.currentMode = modeName;
    
    console.log("Selected Mode : " + RightSection.currentMode);
};

RightSection.selectTileset = function(tilesetName, isUserSelection) {
    $tilesList = $("#sectionTab1 div.tiles");

    for (var i = 0; i < $tilesList.length; i++) {
        if ($tilesList.eq(i).attr("data-tileset") === tilesetName) {
            $tilesList.eq(i).css("display", "");
        }
        else {
            $tilesList.eq(i).css("display", "none");
        }
    }

    if (!isUserSelection) $("#sectionTab1 select#tilesets").val(tilesetName);
    RightSection.currentTileset = tilesetName;
    Project.currentPattern.tileset = tilesetName;
    
    console.log("Selected Tileset : " + RightSection.currentTileset);
};

RightSection.selectTile = function(tileName) {
    var targetTiles = [];
    var cssSelector = "";

    switch (RightSection.currentTileset) {
        case SCTilesetList.Badlands:
            targetTiles = BadlandsTiles;
            cssSelector = "#sectionTab1 div#badlandsTiles > div.tile";
            break;
        case SCTilesetList.SpacePlatform:
            targetTiles = SpacePlatformTiles;
            cssSelector = "#sectionTab1 div#spacePlatformTiles > div.tile";
            break;
        case SCTilesetList.Installation:
            targetTiles = InstallationTiles;
            cssSelector = "#sectionTab1 div#installationTiles > div.tile";
            break;
        case SCTilesetList.AshWorld:
            targetTiles = AshWorldTiles;
            cssSelector = "#sectionTab1 div#ashWorldTiles > div.tile";
            break;
        case SCTilesetList.JungleWorld:
            targetTiles = JungleWorldTiles;
            cssSelector = "#sectionTab1 div#jungleWorldTiles > div.tile";
            break;
        case SCTilesetList.DesertWorld:
            targetTiles = DesertWorldTiles;
            cssSelector = "#sectionTab1 div#desertWorldTiles > div.tile";
            break;
        case SCTilesetList.IceWorld:
            targetTiles = IceWorldTiles;
            cssSelector = "#sectionTab1 div#iceWorldTiles > div.tile";
            break;
        case SCTilesetList.TwilightWorld:
            targetTiles = TwilightWorldTiles;
            cssSelector = "#sectionTab1 div#twilightWorldTiles > div.tile";
            break;
    }
    
    var $tempTileDivs = $(cssSelector);
    for (var i = 0; i < targetTiles.length; i++) {
        if (targetTiles[i].alias === tileName) {
            RightSection.currentTile = targetTiles[i];
            RightSection.currentTileIndex = i;
            for (var j = 0; j < $tempTileDivs.length; j++) $tempTileDivs.eq(j).css("border", "");
            $tempTileDivs.eq(i).css("border", "2px solid white");
            break;
        }
        else if (i == targetTiles.length - 1) {
            alert("예기치 않은 오류 발생 (RightSection - selectTile). 타일 선택에 실패하였습니다.");
            console.log("Exception Occured :");
            console.log("File name : right_section.js");
            console.log("Function name : selectTile");
            console.log("Current Tileset : " + RightSection.currentTileset);
            console.log("Selected Tile : " + tileName);
            console.log("");
        }
    }

    console.log("Selected Tile : " + RightSection.currentTile.alias);
};

RightSection.selectTileByIndex = function(index) {
    var targetTiles = [];
    var cssSelector = "";

    switch (RightSection.currentTileset) {
        case SCTilesetList.Badlands:
            targetTiles = BadlandsTiles;
            cssSelector = "#sectionTab1 div#badlandsTiles > div.tile";
            break;
        case SCTilesetList.SpacePlatform:
            targetTiles = SpacePlatformTiles;
            cssSelector = "#sectionTab1 div#spacePlatformTiles > div.tile";
            break;
        case SCTilesetList.Installation:
            targetTiles = InstallationTiles;
            cssSelector = "#sectionTab1 div#installationTiles > div.tile";
            break;
        case SCTilesetList.AshWorld:
            targetTiles = AshWorldTiles;
            cssSelector = "#sectionTab1 div#ashWorldTiles > div.tile";
            break;
        case SCTilesetList.JungleWorld:
            targetTiles = JungleWorldTiles;
            cssSelector = "#sectionTab1 div#jungleWorldTiles > div.tile";
            break;
        case SCTilesetList.DesertWorld:
            targetTiles = DesertWorldTiles;
            cssSelector = "#sectionTab1 div#desertWorldTiles > div.tile";
            break;
        case SCTilesetList.IceWorld:
            targetTiles = IceWorldTiles;
            cssSelector = "#sectionTab1 div#iceWorldTiles > div.tile";
            break;
        case SCTilesetList.TwilightWorld:
            targetTiles = TwilightWorldTiles;
            cssSelector = "#sectionTab1 div#twilightWorldTiles > div.tile";
            break;
    }

    if (index >= targetTiles.length) index = 0;
    RightSection.currentTile = targetTiles[index];
    RightSection.currentTileIndex = index;

    var $tempTileDivs = $(cssSelector);
    for (var i = 0; i < $tempTileDivs.length; i++) $tempTileDivs.eq(i).css("border", "");
    $tempTileDivs.eq(index).css("border", "2px solid white");

    console.log("Selected Tile (By Index) : " + RightSection.currentTile.alias);
};

RightSection.addTiles = function() {
    $badlandsTilesDivs = $("#sectionTab1 div#badlandsTiles");
    $spacePlatformTilesDivs = $("#sectionTab1 div#spacePlatformTiles");
    $installationTilesDivs = $("#sectionTab1 div#installationTiles");
    $ashWorldTilesDivs = $("#sectionTab1 div#ashWorldTiles");
    $jungleWorldTilesDivs = $("#sectionTab1 div#jungleWorldTiles");
    $desertWorldTilesDivs = $("#sectionTab1 div#desertWorldTiles");
    $iceWorldTilesDivs = $("#sectionTab1 div#iceWorldTiles");
    $twilightWorldTilesDivs = $("#sectionTab1 div#twilightWorldTiles");

    $badlandsTilesDivs.append("<canvas></canvas>");
    $spacePlatformTilesDivs.append("<canvas></canvas>");
    $installationTilesDivs.append("<canvas></canvas>");
    $ashWorldTilesDivs.append("<canvas></canvas>");
    $jungleWorldTilesDivs.append("<canvas></canvas>");
    $desertWorldTilesDivs.append("<canvas></canvas>");
    $iceWorldTilesDivs.append("<canvas></canvas>");
    $twilightWorldTilesDivs.append("<canvas></canvas>");

    for (var i = 0; i < BadlandsTiles.length; i++) $badlandsTilesDivs.append("<div id='" + BadlandsTiles[i].alias + "' class='tile'></div>");
    for (var i = 0; i < SpacePlatformTiles.length; i++) $spacePlatformTilesDivs.append("<div id='" + SpacePlatformTiles[i].alias + "' class='tile'></div>");
    for (var i = 0; i < InstallationTiles.length; i++) $installationTilesDivs.append("<div id='" + InstallationTiles[i].alias + "' class='tile'></div>");
    for (var i = 0; i < AshWorldTiles.length; i++) $ashWorldTilesDivs.append("<div id='" + AshWorldTiles[i].alias + "' class='tile'></div>");
    for (var i = 0; i < JungleWorldTiles.length; i++) $jungleWorldTilesDivs.append("<div id='" + JungleWorldTiles[i].alias + "' class='tile'></div>");
    for (var i = 0; i < DesertWorldTiles.length; i++) $desertWorldTilesDivs.append("<div id='" + DesertWorldTiles[i].alias + "' class='tile'></div>");
    for (var i = 0; i < IceWorldTiles.length; i++) $iceWorldTilesDivs.append("<div id='" + IceWorldTiles[i].alias + "' class='tile'></div>");
    for (var i = 0; i < TwilightWorldTiles.length; i++) $twilightWorldTilesDivs.append("<div id='" + TwilightWorldTiles[i].alias + "' class='tile'></div>");
    
    var gridWidth = RightSection.canvasTileWidth;
    var gridHeight = RightSection.canvasTileHeight;

    var badlandsCanvas = document.querySelector("#sectionTab1 div#badlandsTiles > canvas");
    var spacePlatformCanvas = document.querySelector("#sectionTab1 div#spacePlatformTiles > canvas");
    var installationCanvas = document.querySelector("#sectionTab1 div#installationTiles > canvas");
    var ashWorldCanvas = document.querySelector("#sectionTab1 div#ashWorldTiles > canvas");
    var jungleWorldCanvas = document.querySelector("#sectionTab1 div#jungleWorldTiles > canvas");
    var desertWorldCanvas = document.querySelector("#sectionTab1 div#desertWorldTiles > canvas");
    var iceWorldCanvas = document.querySelector("#sectionTab1 div#iceWorldTiles > canvas");
    var twilightWorldCanvas = document.querySelector("#sectionTab1 div#twilightWorldTiles > canvas");

    var canvasWidth = gridWidth * 5;
    var canvasHeight = gridHeight * 3;
    
    badlandsCanvas.width = canvasWidth;
    badlandsCanvas.height = canvasHeight;
    spacePlatformCanvas.width = canvasWidth;
    spacePlatformCanvas.height = canvasHeight;
    installationCanvas.width = canvasWidth;
    installationCanvas.height = canvasHeight;
    ashWorldCanvas.width = canvasWidth;
    ashWorldCanvas.height = canvasHeight;
    jungleWorldCanvas.width = canvasWidth;
    jungleWorldCanvas.height = canvasHeight;
    desertWorldCanvas.width = canvasWidth;
    desertWorldCanvas.height = canvasHeight;
    iceWorldCanvas.width = canvasWidth;
    iceWorldCanvas.height = canvasHeight;
    twilightWorldCanvas.width = canvasWidth;
    twilightWorldCanvas.height = canvasHeight;

    var badlandsContext = badlandsCanvas.getContext("2d");
    var spacePlatformContext = spacePlatformCanvas.getContext("2d");
    var installationContext = installationCanvas.getContext("2d");
    var ashWorldContext = ashWorldCanvas.getContext("2d");
    var jungleWorldContext = jungleWorldCanvas.getContext("2d");
    var desertWorldContext = desertWorldCanvas.getContext("2d");
    var iceWorldContext = iceWorldCanvas.getContext("2d");
    var twilightWorldContext = twilightWorldCanvas.getContext("2d");

    var $tempTileDivs = $("#sectionTab1 div#badlandsTiles > div.tile");
    for (var i = 0; i < BadlandsTiles.length; i++) {
        let x = i % 5;
        let y = parseInt(i / 5);
        $tempTileDivs.eq(i).css("left", (gridWidth * x) + "px");
        $tempTileDivs.eq(i).css("top", (gridHeight * y) + "px");
        SCMapAPI.drawTile(badlandsContext, gridWidth, gridHeight, BadlandsTiles[i], x, y);
    }
    $tempTileDivs = $("#sectionTab1 div#spacePlatformTiles > div.tile");
    for (var i = 0; i < SpacePlatformTiles.length; i++) {
        let x = i % 5;
        let y = parseInt(i / 5);
        $tempTileDivs.eq(i).css("left", (gridWidth * x) + "px");
        $tempTileDivs.eq(i).css("top", (gridHeight * y) + "px");
        SCMapAPI.drawTile(spacePlatformContext, gridWidth, gridHeight, SpacePlatformTiles[i], x, y);
    }
    $tempTileDivs = $("#sectionTab1 div#installationTiles > div.tile");
    for (var i = 0; i < InstallationTiles.length; i++) {
        let x = i % 5;
        let y = parseInt(i / 5);
        $tempTileDivs.eq(i).css("left", (gridWidth * x) + "px");
        $tempTileDivs.eq(i).css("top", (gridHeight * y) + "px");
        SCMapAPI.drawTile(installationContext, gridWidth, gridHeight, InstallationTiles[i], x, y);
    }
    $tempTileDivs = $("#sectionTab1 div#ashWorldTiles > div.tile");
    for (var i = 0; i < AshWorldTiles.length; i++) {
        let x = i % 5;
        let y = parseInt(i / 5);
        $tempTileDivs.eq(i).css("left", (gridWidth * x) + "px");
        $tempTileDivs.eq(i).css("top", (gridHeight * y) + "px");
        SCMapAPI.drawTile(ashWorldContext, gridWidth, gridHeight, AshWorldTiles[i], x, y);
    }
    $tempTileDivs = $("#sectionTab1 div#jungleWorldTiles > div.tile");
    for (var i = 0; i < JungleWorldTiles.length; i++) {
        let x = i % 5;
        let y = parseInt(i / 5);
        $tempTileDivs.eq(i).css("left", (gridWidth * x) + "px");
        $tempTileDivs.eq(i).css("top", (gridHeight * y) + "px");
        SCMapAPI.drawTile(jungleWorldContext, gridWidth, gridHeight, JungleWorldTiles[i], x, y);
    }
    $tempTileDivs = $("#sectionTab1 div#desertWorldTiles > div.tile");
    for (var i = 0; i < DesertWorldTiles.length; i++) {
        let x = i % 5;
        let y = parseInt(i / 5);
        $tempTileDivs.eq(i).css("left", (gridWidth * x) + "px");
        $tempTileDivs.eq(i).css("top", (gridHeight * y) + "px");
        SCMapAPI.drawTile(desertWorldContext, gridWidth, gridHeight, DesertWorldTiles[i], x, y);
    }
    $tempTileDivs = $("#sectionTab1 div#iceWorldTiles > div.tile");
    for (var i = 0; i < IceWorldTiles.length; i++) {
        let x = i % 5;
        let y = parseInt(i / 5);
        $tempTileDivs.eq(i).css("left", (gridWidth * x) + "px");
        $tempTileDivs.eq(i).css("top", (gridHeight * y) + "px");
        SCMapAPI.drawTile(iceWorldContext, gridWidth, gridHeight, IceWorldTiles[i], x, y);
    }
    $tempTileDivs = $("#sectionTab1 div#twilightWorldTiles > div.tile");
    for (var i = 0; i < TwilightWorldTiles.length; i++) {
        let x = i % 5;
        let y = parseInt(i / 5);
        $tempTileDivs.eq(i).css("left", (gridWidth * x) + "px");
        $tempTileDivs.eq(i).css("top", (gridHeight * y) + "px");
        SCMapAPI.drawTile(twilightWorldContext, gridWidth, gridHeight, TwilightWorldTiles[i], x, y);
    }
    
    $terrainTileDivs = $("#right > section > #sectionTab1 > #terrain > div.tiles > div.tile");
    $terrainTileDivs.css("width", (RightSection.canvasTileWidth - 4) + "px");
    $terrainTileDivs.css("height", (RightSection.canvasTileHeight - 4) + "px");
};

RightSection.refreshLocationExample = function() {
    var labelHeader = $("#sectionTab1 > #location > input#labelHeaderText").val();
    var isZeroPadChecked = $("#sectionTab1 > #location > input#zeroPadCheckBox").is(":checked");
    var gridWidth = RightArticle.canvasTileWidth;
    var gridHeight = RightArticle.canvasTileHeight;

    var canvasHolder = document.getElementById("sectionTab1");
    var canvas = canvasHolder.querySelector("#location > #exampleCanvas");
    var context = canvas.getContext("2d");

    RightArticle.clearContext(canvas, context);
    SCMapAPI.drawLocation(context, gridWidth, gridHeight, new SCLocation(labelHeader + (isZeroPadChecked ? "0" : "") + "1", 0, 0, 2, 2));
};

RightSection.onWaitValueChange = function() {
    var newWait = parseInt($("#sectionTab1 > #bomb > input#wait").val());
    Project.currentPattern.turnList[Project.currentPattern.currentTurn - 1].wait = newWait;
    RightSection.refreshWaitRefData();
};

RightSection.refreshWaitRefData = function() {
    var wait = parseInt($("#sectionTab1 > #bomb > input#wait").val());

    // 동일 웨잇 구간
    var temp = parseInt(Math.abs(wait - 1) / 42);
    var minVal = (wait > 42) ? temp * 42 + 1 : 0;
    var maxVal = (temp + 1) * 42;
    $("#sectionTab1 > #bomb > span#waitRangeResult").text(minVal + "w ~ " + maxVal + "w");

    // 실제 시간 (ms)
    var actualTime = maxVal + 42;
    $("#sectionTab1 > #bomb > span#actualTimeResult").text("약 " + actualTime + "ms");

    // 데스 값
    var basicTurboValue = ((actualTime / 42) % 2 === 0) ? actualTime / 84 : "구현 불가";
    var eudTurboValue = actualTime / 42;
    $("#sectionTab1 > #bomb > span#deathValueResult").text(basicTurboValue + " (일반 터보) / " + eudTurboValue + " (EUD 터보)");
};

RightSection.onPlayButtonClick = function() {
    // TODO : 기능 구현
    alert("시뮬레이션 기능은 현재 구현 중입니다.");
};

RightSection.addTurn = function() {
    var boundTurn = new BoundTurn();
    boundTurn.wait = DEFAULT_TURN_WAIT;
    var turnList = Project.currentPattern.turnList;
    turnList.push(boundTurn);
    RightSection.changeTurn(turnList.length);
};

RightSection.insertTurn = function() {
    var boundTurn = new BoundTurn();
    boundTurn.wait = DEFAULT_TURN_WAIT;
    var turnList = Project.currentPattern.turnList;
    var currentTurn = Project.currentPattern.currentTurn;
    for (var i = turnList.length - 1; i >= currentTurn - 1; i--) turnList[i + 1] = turnList[i];
    turnList[currentTurn - 1] = boundTurn;
    RightSection.changeTurn(currentTurn);
};

RightSection.changeTurn = function(turnNumber) {
    var currentTurn = Project.currentPattern.currentTurn = turnNumber;
    var turnList = Project.currentPattern.turnList;
    $("#sectionTab1 > #bomb > input#currentTurn").val(currentTurn);
    $("#sectionTab1 > #bomb > span#showTurns").text(currentTurn + " / " + turnList.length);

    console.log("BoundTurn Changed to : " + currentTurn + "/" + turnList.length);
    var boundTurn = turnList[currentTurn - 1];
    $("#sectionTab1 > #bomb > input#wait").val(boundTurn.wait);

    RightSection.refreshWaitRefData();
    RightArticle.redrawBombSettings();
};

RightSection.onCurrentTurnTextChange = function() {
    var currentTurnText = $("#sectionTab1 > #bomb > input#currentTurn").val();
    if (!currentTurnText.match(/^[0-9]+$/)) {
        alert("올바른 숫자를 입력해주세요.");
        return;
    }

    var turnNumber = parseInt(currentTurnText);
    if (turnNumber < 1 || turnNumber > Project.currentPattern.turnList.length) {
        alert("존재하지 않는 턴입니다. 올바른 값을 입력해주세요.");
        return;
    }

    RightSection.changeTurn(turnNumber);
};

RightSection.onToPrevClick = function() {
    var currentTurn = Project.currentPattern.currentTurn;
    if (currentTurn === 1) return;

    RightSection.changeTurn(currentTurn - 1);
};

RightSection.onToNextClick = function() {
    var currentTurn = Project.currentPattern.currentTurn;
    if (currentTurn === Project.currentPattern.turnList.length) return;

    RightSection.changeTurn(currentTurn + 1);
};

RightSection.onToFirstClick = function() {
    RightSection.changeTurn(1);
};

RightSection.onToLastClick = function() {
    RightSection.changeTurn(Project.currentPattern.turnList.length);
};

RightSection.onOption1RadioClick = function() {
    switch (event.target.value) {
        case "kill":
            Project.currentPattern.blockOption1 = BLOCKOPTION1_UNITKILL;
            break;
        case "remove":
            Project.currentPattern.blockOption1 = BLOCKOPTION1_UNITREMOVE;
            break;
        case "live":
            Project.currentPattern.blockOption1 = BLOCKOPTION1_UNITLIVE;
            break;
    }
};

RightSection.onOption2RadioClick = function() {
    switch (event.target.value) {
        case "kill":
            Project.currentPattern.blockOption2 = BLOCKOPTION2_BLOCKKILL;
            break;
        case "remove":
            Project.currentPattern.blockOption2 = BLOCKOPTION2_BLOCKREMOVE;
            break;
    }
};

RightSection.onBombUnits1Change = function() {
    var targetUnit = $(this).val();
    var turnList = Project.currentPattern.turnList;

    for (var i = 0; i < turnList.length; i++) {
        let cellList = turnList[i].cellList;
        for (var j = 0; j < cellList.length; j++) {
            if (cellList[j].unit === Project.currentPattern.bombUnit1) {
                cellList[j].unit = targetUnit;
            }
        }
    }

    Project.currentPattern.bombUnit1 = targetUnit;
    RightArticle.redrawBombSettings();
};

RightSection.onBombUnits2Change = function() {
    var targetUnit = $(this).val();
    var turnList = Project.currentPattern.turnList;

    for (var i = 0; i < turnList.length; i++) {
        let cellList = turnList[i].cellList;
        for (var j = 0; j < cellList.length; j++) {
            if (cellList[j].unit === Project.currentPattern.bombUnit2) {
                cellList[j].unit = targetUnit;
            }
        }
    }

    Project.currentPattern.bombUnit2 = targetUnit;
    RightArticle.redrawBombSettings();
};

RightSection.onBombUnits3Change = function() {
    var targetUnit = $(this).val();
    var turnList = Project.currentPattern.turnList;

    for (var i = 0; i < turnList.length; i++) {
        let cellList = turnList[i].cellList;
        for (var j = 0; j < cellList.length; j++) {
            if (cellList[j].unit === Project.currentPattern.bombUnit3) {
                cellList[j].unit = targetUnit;
            }
        }
    }

    Project.currentPattern.bombUnit3 = targetUnit;
    RightArticle.redrawBombSettings();
};