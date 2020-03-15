RightArticle.switchTo = function(elementID) {
    $("#articleTab1").css("display", "none");
    $("#articleTab2").css("display", "none");
    $("#"+elementID).css("display", "");
};

RightArticle.onTab1MouseDown = function() {
    RightArticle.isMouseDown = true;
    var gridWidth = RightArticle.canvasTileWidth;
    var gridHeight = RightArticle.canvasTileHeight;
    var posX = parseInt(event.offsetX / gridWidth);
    var posY = parseInt(event.offsetY / gridHeight);
    var lenX = parseInt($tileWidthDiv.val());
    var lenY = parseInt($tileHeightDiv.val());
    lenX = RightArticle.getSafeLenXValue(lenX);
    lenY = RightArticle.getSafeLenYValue(lenY);
    var mouseButton = RightArticle.getMouseButtonFromEvent(event);

    if (mouseButton === MOUSEBUTTON_LEFT) {
        RightArticle.isDragging = false;
        RightArticle.initialDragPosX = event.offsetX;
        RightArticle.initialDragPosY = event.offsetY;
    }

    switch (RightSection.currentMode) {
        case "terrainMode":
            if (RightSection.currentTile !== null) {
                if (mouseButton === MOUSEBUTTON_LEFT) {
                    RightArticle.putTile(terrainContext, gridWidth, gridHeight, RightSection.currentTile, posX, posY, lenX, lenY);
                }
            }
            break;
        case "locationMode":
            break;
        case "bombMode":
            if (mouseButton === MOUSEBUTTON_LEFT || mouseButton === MOUSEBUTTON_RIGHT) {
                console.log("TEMP :: spot 6");
                var locationList = Project.currentPattern.locationList;
                var turnList = Project.currentPattern.turnList;
                var currentTurn = Project.currentPattern.currentTurn;
                var cellList = turnList[currentTurn - 1].cellList;
                var cellType, cellUnit, cellOption;
                let isProcessDone = false;
                for (var i = 0; i < locationList.length; i++) {
                    console.log("TEMP :: spot 7");
                    if ((event.offsetX >= locationList[i].getLeft(gridWidth) && event.offsetX <= locationList[i].getRight(gridWidth)) &&
                         event.offsetY >= locationList[i].getTop(gridHeight) && event.offsetY <= locationList[i].getBottom(gridHeight)) {
                        // 로케이션 영역에 마우스 이벤트가 발생했으면
                        console.log("TEMP :: spot 8");
                        if (mouseButton === MOUSEBUTTON_LEFT) {
                            // 폭탄 설정의 입력이 발생한 경우 (왼쪽 클릭)
                            for (var j = cellList.length - 1; j >= 0; j--) {
                                if (cellList[j].location === locationList[i]) {
                                    if (cellList[j].type === TURNCELLTYPE_BOMB) {
                                        // 현재 턴에 이미 해당 로케이션에 대한 폭탄 설정이 있으므로, 셀 삭제 처리
                                        cellList.splice(j, 1);
                                        isProcessDone = true;
                                        break;
                                    }
                                }
                            }
                            if (!isProcessDone) {
                                // 현재 턴에는 해당 로케이션에 대한 폭탄 설정이 아직 없으므로, 셀 추가
                                cellType = TURNCELLTYPE_BOMB;
                                cellUnit = $("#sectionTab1 > #bomb > select#bombUnits").val();
                                cellOption = TURNCELLOPTION_NONE;
                                cellList.push(new BoundTurnCell(locationList[i], cellType, cellUnit, cellOption));
                            }
                        }
                        else {
                            // 장애물 설정의 입력이 발생한 경우 (오른쪽 클릭)
                            console.log("TEMP :: spot 9");
                            for (var j = cellList.length - 1; j >= 0; j--) {
                                console.log("TEMP :: spot 10");
                                if (cellList[j].location === locationList[i]) {
                                    if (cellList[j].type === TURNCELLTYPE_BLOCKCREATE || cellList[j].type === TURNCELLTYPE_BLOCKDELETE) {
                                        // 현재 턴에 이미 해당 로케이션에 대한 장애물 설정이 있으므로, 셀 삭제 처리
                                        console.log("TEMP :: spot 11");
                                        cellList.splice(j, 1);
                                        isProcessDone = true;
                                        break;
                                    }
                                }
                            }
                            if (!isProcessDone) {
                                // 현재 턴에는 해당 로케이션에 대한 장애물 설정이 아직 없으므로, 셀 추가 (TURNCELLTYPE_BLOCKCREATE 또는 TURNCELLTYPE_BLOCKDELETE 가능)
                                console.log("TEMP :: spot 12");
                                if (turnList.length === 1) {
                                    // 현재 턴밖에 없므므로 기존 설정이 존재할 리가 없음. 따라서 BLOCKCREATE
                                    console.log("TEMP :: spot 13");
                                    cellType = TURNCELLTYPE_BLOCKCREATE;
                                    cellUnit = $("#sectionTab1 > #bomb > select#blockUnits").val();
                                    if (Project.currentPattern.blockOption1 === BLOCKOPTION1_UNITKILL) cellOption = TURNCELLOPTION_UNITKILL;
                                    else if (Project.currentPattern.blockOption1 === BLOCKOPTION1_UNITREMOVE) cellOption = TURNCELLOPTION_UNITREMOVE;
                                    else if (Project.currentPattern.blockOption1 === BLOCKOPTION1_UNITLIVE) cellOption = TURNCELLOPTION_UNITLIVE;
                                    cellList.push(new BoundTurnCell(locationList[i], cellType, cellUnit, cellOption));
                                }
                                else {
                                    console.log("TEMP :: spot 14");
                                    let isSearchFinished = false;
                                    for (var k = currentTurn - 2; ; k--) {
                                        console.log("TEMP :: spot 15");
                                        if (k < 0) k = turnList.length - 1;
                                        if (k === currentTurn - 1) {
                                            // 모든 턴을 다 검사했으나, 기존 설정이 없으므로 BLOCKCREATE
                                            console.log("TEMP :: spot 21");
                                            cellType = TURNCELLTYPE_BLOCKCREATE;
                                            cellUnit = $("#sectionTab1 > #bomb > select#blockUnits").val();
                                            if (Project.currentPattern.blockOption1 === BLOCKOPTION1_UNITKILL) cellOption = TURNCELLOPTION_UNITKILL;
                                            else if (Project.currentPattern.blockOption1 === BLOCKOPTION1_UNITREMOVE) cellOption = TURNCELLOPTION_UNITREMOVE;
                                            else if (Project.currentPattern.blockOption1 === BLOCKOPTION1_UNITLIVE) cellOption = TURNCELLOPTION_UNITLIVE;
                                            cellList.push(new BoundTurnCell(locationList[i], cellType, cellUnit, cellOption));
                                            
                                            isSearchFinished = true;
                                            break;
                                        }

                                        let tempCellList = turnList[k].cellList;
                                        for (var l = 0; l < tempCellList.length; l++) {
                                            console.log("TEMP :: spot 16");
                                            if (tempCellList[l].location === locationList[i]) {
                                                console.log("TEMP :: spot 17");
                                                if (tempCellList[l].type === TURNCELLTYPE_BOMB) continue;
                                                else if (tempCellList[l].type === TURNCELLTYPE_BLOCKCREATE) {
                                                    // 이전 패턴에 장애물 설정이 있는데 BLOCKCREATE이므로, BLOCKDELETE를 수행
                                                    console.log("TEMP :: spot 18");
                                                    cellType = TURNCELLTYPE_BLOCKDELETE;
                                                    cellUnit = tempCellList[l].unit; // 기존에 설정했던 장애물 유닛
                                                    if (Project.currentPattern.blockOption2 === BLOCKOPTION2_BLOCKKILL) cellOption = TURNCELLOPTION_BLOCKKILL;
                                                    else if (Project.currentPattern.blockOption2 === BLOCKOPTION2_BLOCKREMOVE) cellOption = TURNCELLOPTION_BLOCKREMOVE;
                                                    cellList.push(new BoundTurnCell(locationList[i], cellType, cellUnit, cellOption));

                                                    isSearchFinished = true;
                                                    break;
                                                }
                                                else if (tempCellList[l].type === TURNCELLTYPE_BLOCKDELETE) {
                                                    // 이전 패턴에 장애물 설정이 있는데 BLOCKDELETE이므로, 그냥 장애물이 없는 것이니 BLOCKCREATE를 수행
                                                    console.log("TEMP :: spot 19");
                                                    cellType = TURNCELLTYPE_BLOCKCREATE;
                                                    cellUnit = $("#sectionTab1 > #bomb > select#blockUnits").val();
                                                    if (Project.currentPattern.blockOption1 === BLOCKOPTION1_UNITKILL) cellOption = TURNCELLOPTION_UNITKILL;
                                                    else if (Project.currentPattern.blockOption1 === BLOCKOPTION1_UNITREMOVE) cellOption = TURNCELLOPTION_UNITREMOVE;
                                                    else if (Project.currentPattern.blockOption1 === BLOCKOPTION1_UNITLIVE) cellOption = TURNCELLOPTION_UNITLIVE;
                                                    cellList.push(new BoundTurnCell(locationList[i], cellType, cellUnit, cellOption));

                                                    isSearchFinished = true;
                                                    break;
                                                }
                                            }
                                        }
                                        if (isSearchFinished) break;
                                    }
                                }
                            }
                        }

                        // 최종적으로 바뀐 것을 적용하여 캔버스 다시 그리기
                        console.log("TEMP :: spot 20");
                        RightArticle.redrawBombSettings();
                        break;
                    }
                }
            }
            break;
    }
};

RightArticle.onTab1MouseUp = function() {
    RightArticle.isMouseDown = false;
    var mouseButton = RightArticle.getMouseButtonFromEvent(event);
    var gridWidth = RightArticle.canvasTileWidth;
    var gridHeight = RightArticle.canvasTileHeight;
    var posX, posY, lenX, lenY, borderWidth;

    switch (RightSection.currentMode) {
        case "terrainMode":
            if (RightSection.currentTile !== null) {
                if (mouseButton === MOUSEBUTTON_RIGHT) {
                    RightSection.deselectTiles();
                    RightArticle.clearContext(selectionCanvas, selectionContext);
                }
            }
            else {
                if (mouseButton === MOUSEBUTTON_LEFT) {
                    if (RightArticle.isDragging) {
                        if (event.offsetX > RightArticle.initialDragPosX) posX = parseInt(RightArticle.initialDragPosX / gridWidth);
                        else posX = parseInt(event.offsetX / gridWidth);
                        if (event.offsetY > RightArticle.initialDragPosY) posY = parseInt(RightArticle.initialDragPosY / gridHeight);
                        else posY = parseInt(event.offsetY / gridHeight);
                        if (event.offsetX > RightArticle.initialDragPosX) lenX = parseInt((event.offsetX / gridWidth) + 1) - parseInt(RightArticle.initialDragPosX / gridWidth);
                        else lenX = parseInt((RightArticle.initialDragPosX / gridWidth) + 1) - parseInt(event.offsetX / gridWidth);
                        if (event.offsetY > RightArticle.initialDragPosY) lenY = parseInt((event.offsetY / gridHeight) + 1) - parseInt(RightArticle.initialDragPosY / gridHeight);
                        else lenY = parseInt((RightArticle.initialDragPosY / gridHeight) + 1) - parseInt(event.offsetY / gridHeight);
                        
                        RightArticle.initialDragPosX = UNDEFINED_INT;
                        RightArticle.initialDragPosY = UNDEFINED_INT;
                    }
                    else {
                        posX = parseInt(event.offsetX / gridWidth);
                        posY = parseInt(event.offsetY / gridHeight);
                        lenX = 1;
                        lenY = 1;
                    }

                    borderWidth = 2;
                    RightArticle.clearContext(selectionCanvas, selectionContext);
                    RightArticle.drawSelectionSquare(selectionContext, gridWidth, gridHeight, posX, posY, lenX, lenY, borderWidth);
                    
                    RightArticle.selectionPosX = posX;
                    RightArticle.selectionPosY = posY;
                    RightArticle.selectionLenX = lenX;
                    RightArticle.selectionLenY = lenY;
                }
            }
            break;
        case "locationMode":
            if (mouseButton === MOUSEBUTTON_LEFT) {
                if (RightArticle.isDragging) {
                    // 로케이션 생성 1
                    RightArticle.clearContext(selectionCanvas, selectionContext);

                    if (event.offsetX > RightArticle.initialDragPosX) posX = parseInt(RightArticle.initialDragPosX / gridWidth);
                    else posX = parseInt(event.offsetX / gridWidth);
                    if (event.offsetY > RightArticle.initialDragPosY) posY = parseInt(RightArticle.initialDragPosY / gridHeight);
                    else posY = parseInt(event.offsetY / gridHeight);
                    if (event.offsetX > RightArticle.initialDragPosX) lenX = parseInt((event.offsetX / gridWidth) + 1) - parseInt(RightArticle.initialDragPosX / gridWidth);
                    else lenX = parseInt((RightArticle.initialDragPosX / gridWidth) + 1) - parseInt(event.offsetX / gridWidth);
                    if (event.offsetY > RightArticle.initialDragPosY) lenY = parseInt((event.offsetY / gridHeight) + 1) - parseInt(RightArticle.initialDragPosY / gridHeight);
                    else lenY = parseInt((RightArticle.initialDragPosY / gridHeight) + 1) - parseInt(event.offsetY / gridHeight);

                    let labelHeader = $("#sectionTab1 > #location > input#labelHeaderText").val();
                    let newLabelNumber = Project.currentPattern.locationList.length + 1;
                    let isZeroPadChecked = $("#sectionTab1 > #location > input#zeroPadCheckBox").is(":checked");
                    let newLabel = labelHeader + newLabelNumber;
                    let newLocation = new SCLocation(newLabel, posX, posY, lenX, lenY);
                    let modCount = 0;
                    
                    if (isZeroPadChecked) {
                        for (var i = 0; i < Project.currentPattern.locationList.length; i++) {
                            let label = Project.currentPattern.locationList[i].label;
                            let numberStr = label.substr(labelHeader.length);
                            let newLabelNumberLen = (newLabelNumber + "").length;

                            if (numberStr.length < newLabelNumberLen) {
                                Project.currentPattern.locationList[i].label = labelHeader + "0" + numberStr;
                                modCount++;
                            }
                        }
                        if (modCount > 0) RightArticle.redrawLocationList();
                    }

                    SCMapAPI.drawLocation(locationContext, gridWidth, gridHeight, newLocation);
                    Project.currentPattern.locationList.push(newLocation);
                    
                    RightArticle.initialDragPosX = UNDEFINED_INT;
                    RightArticle.initialDragPosY = UNDEFINED_INT;
                }
                else {
                    // 로케이션이 존재할 경우 선택, 그렇지 않을 경우 생성
                    var isLocationSelected = false;
                    for (var i = Project.currentPattern.locationList.length - 1; i >= 0; i--) {
                        let location = Project.currentPattern.locationList[i];
                        if ((event.offsetX >= location.getLeft(gridWidth) && event.offsetX <= location.getRight(gridWidth)) &&
                             (event.offsetY >= location.getTop(gridHeight) && event.offsetY <= location.getBottom(gridHeight))) {
                            // 로케이션 선택
                            posX = parseInt(location.getLeft(gridWidth) / gridWidth);
                            posY = parseInt(location.getTop(gridHeight) / gridHeight);
                            lenX = parseInt((location.getRight(gridWidth) - location.getLeft(gridWidth)) / gridWidth);
                            lenY = parseInt((location.getBottom(gridHeight) - location.getTop(gridHeight)) / gridHeight);
                            borderWidth = 2;

                            RightArticle.clearContext(selectionCanvas, selectionContext);
                            RightArticle.drawSelectionSquare(selectionContext, gridWidth, gridHeight, posX, posY, lenX, lenY, borderWidth);

                            RightArticle.selectedLocation = location;
                            isLocationSelected = true;
                            break;
                        }
                    }
                    if (!isLocationSelected) {
                        // 로케이션 생성 2
                        RightArticle.clearContext(selectionCanvas, selectionContext);

                        posX = parseInt(event.offsetX / gridWidth);
                        posY = parseInt(event.offsetY / gridHeight);
                        lenX = 1;
                        lenY = 1;
    
                        let labelHeader = $("#sectionTab1 > #location > input#labelHeaderText").val();
                        let newLabelNumber = Project.currentPattern.locationList.length + 1;
                        let isZeroPadChecked = $("#sectionTab1 > #location > input#zeroPadCheckBox").is(":checked");
                        let newLabel = labelHeader + newLabelNumber;
                        let newLocation = new SCLocation(newLabel, posX, posY, lenX, lenY);
                        let modCount = 0;
                        
                        if (isZeroPadChecked) {
                            for (var j = 0; j < Project.currentPattern.locationList.length; j++) {
                                let label = Project.currentPattern.locationList[j].label;
                                let numberStr = label.substr(labelHeader.length);
                                let newLabelNumberLen = (newLabelNumber + "").length;
    
                                if (numberStr.length < newLabelNumberLen) {
                                    Project.currentPattern.locationList[j].label = labelHeader + "0" + numberStr;
                                    modCount++;
                                }
                            }
                            if (modCount > 0) RightArticle.redrawLocationList();
                        }
    
                        SCMapAPI.drawLocation(locationContext, gridWidth, gridHeight, newLocation);
                        Project.currentPattern.locationList.push(newLocation);
                    }
                }
            }
            else if (mouseButton === MOUSEBUTTON_RIGHT) {
                if (RightArticle.selectedLocation !== null) {
                    RightArticle.clearContext(selectionCanvas, selectionContext);
                    RightArticle.selectedLocation = null;
                }
            }
            break;
    }
};

RightArticle.onTab1MouseMove = function() { // TODO : 로케이션 드래그 이동 기능 추가
    // Section 1
    var gridWidth = RightArticle.canvasTileWidth;
    var gridHeight = RightArticle.canvasTileHeight
    var posX = parseInt(event.offsetX / gridWidth);
    var posY = parseInt(event.offsetY / gridHeight);
    if (typeof($tileWidthDiv) === "undefined") return;
    var lenX = parseInt($tileWidthDiv.val());
    var lenY = parseInt($tileHeightDiv.val());
    var borderWidth;
    var left, top, right, bottom;
    var mouseButton = RightArticle.getMouseButtonFromEvent(event);
    
    if (mouseButton === MOUSEBUTTON_LEFT && RightArticle.isMouseDown) RightArticle.isDragging = true;
    
    if (RightSection.currentMode === "terrainMode" && RightSection.currentTile !== null) {
        RightArticle.clearContext(selectionCanvas, selectionContext);
        borderWidth = 2.5;
        RightArticle.drawSelectionSquare(selectionContext, gridWidth, gridHeight, posX, posY, lenX, lenY, borderWidth);
    }

    if (RightArticle.prevTilePosX !== UNDEFINED_INT && RightArticle.prevTilePosY !== UNDEFINED_INT) {
        if (RightArticle.prevTilePosX === posX &&
            RightArticle.prevTilePosY === posY &&
            RightArticle.prevTileLenX === lenX &&
            RightArticle.prevTileLenY === lenY) {
            return;
        }
    }

    // Section 2
    lenX = RightArticle.getSafeLenXValue(lenX);
    lenY = RightArticle.getSafeLenYValue(lenY);
    
    switch (RightSection.currentMode) {
        case "terrainMode":
            if (RightSection.currentTile !== null) {
                if (RightArticle.isMouseDown && mouseButton === MOUSEBUTTON_LEFT) {
                    RightArticle.putTile(terrainContext, gridWidth, gridHeight, RightSection.currentTile, posX, posY, lenX, lenY);
                }
            }
            else {
                if (RightArticle.isMouseDown && mouseButton === MOUSEBUTTON_LEFT) {
                    if (RightArticle.isDragging) {
                        currentPosX = event.offsetX;
                        currentPosY = event.offsetY;
                        var initialPosX = RightArticle.initialDragPosX;
                        var initialPosY = RightArticle.initialDragPosY;
    
                        RightArticle.clearContext(selectionCanvas, selectionContext);
                        RightArticle.drawDragSquare(selectionContext, initialPosX, initialPosY, currentPosX, currentPosY);
                    }
                }
                /* TODO : 지형 복사,붙여넣기 기능 구현 */
            }
            break;
        case "locationMode":
            if (RightArticle.isMouseDown && mouseButton === MOUSEBUTTON_LEFT) {
                if (RightArticle.isDragging) {
                    if (event.offsetX > RightArticle.initialDragPosX) left = parseInt(RightArticle.initialDragPosX / gridWidth);
                    else left = parseInt(event.offsetX / gridWidth);
                    if (event.offsetY > RightArticle.initialDragPosY) top = parseInt(RightArticle.initialDragPosY / gridHeight);
                    else top = parseInt(event.offsetY / gridHeight);
                    if (event.offsetX > RightArticle.initialDragPosX) right = parseInt((event.offsetX / gridWidth) + 1);
                    else right = parseInt((RightArticle.initialDragPosX / gridWidth) + 1);
                    if (event.offsetY > RightArticle.initialDragPosY) bottom = parseInt((event.offsetY / gridHeight) + 1);
                    else bottom = parseInt((RightArticle.initialDragPosY / gridHeight) + 1);

                    RightArticle.clearContext(selectionCanvas, selectionContext);
                    RightArticle.drawLocationSquare(selectionContext, gridWidth, gridHeight, left, top, right, bottom);
                }
            }
            break;
    }
};

RightArticle.onTab1MouseOut = function() {};

RightArticle.onKeyDown = function() {};

RightArticle.onKeyUp = function() {
    console.log("Keyup : " + event.keyCode);

    if (event.keyCode === 46) { // DELETE KEY
        switch (RightSection.currentMode) {
            case "terrainMode":
                // 타일 삭제
                var deletedCount = RightArticle.deleteSelectedTiles();
                if (deletedCount > 0) RightArticle.redrawTerrainCanvas();
                break;
            case "locationMode":
                if (RightArticle.selectedLocation !== null) {
                    // 로케이션 삭제
                    for (var i = 0; i < Project.currentPattern.locationList.length; i++) {
                        if (Project.currentPattern.locationList[i].label === RightArticle.selectedLocation.label) {
                            let labelHeader = $("#sectionTab1 > #location > input#labelHeaderText").val();
                            let isZeroPadChecked = $("#sectionTab1 > #location > input#zeroPadCheckBox").is(":checked");
                            let maxLabelNumber = Project.currentPattern.locationList.length - 1;
                            let maxLabelNumberLen = (maxLabelNumber + "").length;

                            for (var j = maxLabelNumber; j >= i + 1; j--) {
                                let label = Project.currentPattern.locationList[j].label;
                                let numberStr = label.substr(labelHeader.length);
                                numberStr = (parseInt(numberStr) - 1) + "";

                                if (isZeroPadChecked && numberStr.length < maxLabelNumberLen) {
                                    for (var k = numberStr.length; k < maxLabelNumberLen; k++) numberStr = "0" + numberStr;
                                }
                                Project.currentPattern.locationList[j].label = labelHeader + numberStr;
                            }

                            // 해당 로케이션과 겹치는 BoundTurnCell 제거
                            let turnList = Project.currentPattern.turnList;
                            for (var j = 0; j < turnList.length; j++) {
                                let cellList = turnList[j].cellList;
                                for (var k = cellList.length - 1; k >= 0; k--) {
                                    if (cellList[k].location === Project.currentPattern.locationList[i]) cellList.splice(k, 1);
                                }
                            }
                            Project.currentPattern.locationList.splice(i, 1);
                            RightArticle.clearContext(selectionCanvas, selectionContext);
                            RightArticle.selectedLocation = null;
                            RightArticle.redrawLocationList();
                            break;
                        }
                    }
                }
                break;
        }
    }
};

RightArticle.redrawTerrainCanvas = function() {
    var gridWidth = RightArticle.canvasTileWidth;
    var gridHeight = RightArticle.canvasTileHeight;

    RightArticle.clearContext(terrainCanvas, terrainContext);
    for (var i = 0; i < Project.currentPattern.tileDataList.length; i++) {
        let tileData = Project.currentPattern.tileDataList[i];
        SCMapAPI.drawTile(terrainContext, gridWidth, gridHeight, tileData.tile, tileData.posX, tileData.posY, 1, 1);
    }
};

RightArticle.redrawLocationList = function() {
    console.log("redrawLocationList called");
    var gridWidth = RightArticle.canvasTileWidth;
    var gridHeight = RightArticle.canvasTileHeight;

    RightArticle.clearContext(locationCanvas, locationContext);
    for (var i = 0; i < Project.currentPattern.locationList.length; i++) {
        SCMapAPI.drawLocation(locationContext, gridWidth, gridHeight, Project.currentPattern.locationList[i]);
    }
};

RightArticle.initCanvases = function() {
    var canvasHolder = document.getElementById("articleTab1");
    terrainCanvas = canvasHolder.querySelector("#terrain");
    locationCanvas = canvasHolder.querySelector("#location");
    baseCanvas = canvasHolder.querySelector("#base");
    blockCanvas = canvasHolder.querySelector("#block");
    bombCanvas = canvasHolder.querySelector("#bomb");
    gridCanvas = canvasHolder.querySelector("#grid");
    selectionCanvas = canvasHolder.querySelector("#selection");
    terrainContext = terrainCanvas.getContext("2d");
    locationContext = locationCanvas.getContext("2d");
    baseContext = baseCanvas.getContext("2d");
    blockContext = blockCanvas.getContext("2d");
    bombContext = bombCanvas.getContext("2d");
    gridContext = gridCanvas.getContext("2d");
    selectionContext = selectionCanvas.getContext("2d");

    RightArticle.resizeCanvases();
};

RightArticle.resizeCanvases = function() {
    var $canvasHolder1 = $("#articleTab1");
    var $canvases = $("#articleTab1 > canvas");
    var canvasWidth = RightArticle.canvasColumns * RightArticle.canvasTileWidth;
    var canvasHeight = RightArticle.canvasRows * RightArticle.canvasTileHeight;

    $canvasHolder1.css("width", canvasWidth + "px");
    $canvasHolder1.css("height", canvasHeight + "px");
    for (var i = 0; i < $canvases.length; i++) {
        $canvases.eq(i).prop("width", canvasWidth);
        $canvases.eq(i).prop("height", canvasHeight);
    }
};

RightArticle.clearContext = function(canvasElement, canvasContext) {
    if (canvasContext === undefined) return;
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
};

RightArticle.drawDragSquare = function(canvasContext, startPosX, startPosY, endPosX, endPosY) {
    var borderWidth = 1;
    var hexColorStr = "#dd0000";

    canvasContext.lineWidth = borderWidth;
    canvasContext.strokeStyle = hexColorStr;

    canvasContext.beginPath();
    canvasContext.rect(startPosX, startPosY, endPosX - startPosX, endPosY - startPosY);
    canvasContext.stroke();

    canvasContext.strokeStyle = "";
};

RightArticle.drawSelectionSquare = function(canvasContext, gridWidth, gridHeight, posX, posY, lenX, lenY, borderWidth) {
    var hexColorStr = "#dd0000";

    canvasContext.lineWidth = borderWidth;
    canvasContext.strokeStyle = hexColorStr;

    canvasContext.beginPath();
    canvasContext.rect(posX * gridWidth, posY * gridHeight, lenX * gridWidth, lenY * gridHeight);
    canvasContext.stroke();

    canvasContext.strokeStyle = "";
};

RightArticle.drawLocationSquare = function(canvasContext, gridWidth, gridHeight, left, top, right, bottom, hexColorStr, alphaVal) {
    left = left * gridWidth;
    top = top * gridHeight;
    right = right * gridWidth;
    bottom = bottom * gridHeight;

    canvasContext.globalAlpha = (alphaVal === undefined) ? DEFAULT_LOCATION_ALPHA : alphaVal;
    canvasContext.fillStyle = (hexColorStr === undefined) ? DEFAULT_LOCATION_COLOR : hexColorStr;
    canvasContext.fillRect(left, top, right - left, bottom - top);

    canvasContext.globalAlpha = 1.0;
};

RightArticle.getMouseButtonFromEvent = function(eventObj) {
    return (eventObj.which === 1) ? MOUSEBUTTON_LEFT : (eventObj.which === 2) ? MOUSEBUTTON_MIDDLE : (eventObj.which === 3) ? MOUSEBUTTON_RIGHT : MOUSEBUTTON_UNKNOWN;
};

RightArticle.putTile = function(canvasContext, gridWidth, gridHeight, tile, posX, posY, lenX, lenY) {
    // 이미 해당 좌표에 타일이 존재할 경우, 제거하고 새로 적용
    console.log("dataList Length : " + Project.currentPattern.tileDataList.length);
    for (var i = Project.currentPattern.tileDataList.length - 1; i >= 0; i--) {
        for (var j = 0; j < lenY; j++) {
            for (var k = 0; k < lenX; k++) {
                if (posX + k === Project.currentPattern.tileDataList[i].posX && posY + j === Project.currentPattern.tileDataList[i].posY) {
                    Project.currentPattern.tileDataList.splice(i,  1);
                    j = lenY - 1; // 바로 for문 빠져나감.
                    break;
                }
            }
        }
    }
    SCMapAPI.drawTile(canvasContext, gridWidth, gridHeight, tile, posX, posY, lenX, lenY);
    for (var i = 0; i < lenY; i++) {
        for (var j = 0; j < lenX; j++) {
            Project.currentPattern.tileDataList.push(new TileData(RightSection.currentTile, posX + j, posY + i));
        }
    }

    RightArticle.prevTilePosX = posX;
    RightArticle.prevTilePosY = posY;
    RightArticle.prevTileLenX = lenX;
    RightArticle.prevTileLenY = lenY;
};

RightArticle.getSafeLenXValue = function(originalLenX) {
    var newLenX = originalLenX;

    if (originalLenX < RightArticle.MIN_TILE_LENX_VALUE) newLenX = RightArticle.MIN_TILE_LENX_VALUE;
    else if (originalLenX > RightArticle.MAX_TILE_LENX_VALUE) newLenX = RightArticle.MAX_TILE_LENX_VALUE;

    return newLenX;
};

RightArticle.getSafeLenYValue = function(originalLenY) {
    var newLenY = originalLenY;

    if (originalLenY < RightArticle.MIN_TILE_LENY_VALUE) newLenY = RightArticle.MIN_TILE_LENY_VALUE;
    else if (originalLenY > RightArticle.MAX_TILE_LENY_VALUE) newLenY = RightArticle.MAX_TILE_LENY_VALUE;

    return newLenY;
};

RightArticle.deleteSelectedTiles = function() {
    var posX = RightArticle.selectionPosX;
    var posY = RightArticle.selectionPosY;
    var lenX = RightArticle.selectionLenX;
    var lenY = RightArticle.selectionLenY;
    var deletedCount = 0;

    for (var i = Project.currentPattern.tileDataList.length - 1; i >= 0; i--) {
        let tileData = Project.currentPattern.tileDataList[i];
        for (var j = 0; j < lenY; j++) {
            for (var k = 0; k < lenX; k++) {
                if (posX + k === tileData.posX && posY + j === tileData.posY) {
                    Project.currentPattern.tileDataList.splice(i, 1);
                    deletedCount++;
                    j = lenY - 1;
                    break;
                }
            }
        }
    }
    
    console.log("Tiles deleted (count : " + deletedCount + ")");

    return deletedCount;
};

RightArticle.redrawBombSettings = function() {
    var locationList = Project.currentPattern.locationList;
    var selectedTurn = Project.currentPattern.turnList[Project.currentPattern.currentTurn - 1];
    var gridWidth = RightArticle.canvasTileWidth;
    var gridHeight = RightArticle.canvasTileHeight;
    var fillColorStr = "#ffffff";
    var alphaVal = DEFAULT_LOCATION_ALPHA;
    var borderWidth = 0.5;
    var borderColorStr = "#343434";
    var fontColorStr = "#000000";

    RightArticle.clearContext(bombCanvas, baseContext);
    RightArticle.clearContext(bombCanvas, blockContext);
    RightArticle.clearContext(bombCanvas, bombContext);

    for (var i = 0; i < locationList.length; i++) {
        SCMapAPI.drawLocation(baseContext, gridWidth, gridHeight, locationList[i], fillColorStr, alphaVal, borderWidth, borderColorStr, fontColorStr);
        console.log("TEMP :: spot 1");
    }
    console.log("TEMP :: spot 2");
    for (var i = 0; i < selectedTurn.cellList.length; i++) {
        let cell = selectedTurn.cellList[i];
        console.log("TEMP :: spot 3");
        if (cell.type === TURNCELLTYPE_BOMB) {
            fillColorStr = "#c03040";
            alphaVal = 0.8;
            // TODO : 유닛 표시 처리
            SCMapAPI.drawLocation(bombContext, gridWidth, gridHeight, selectedTurn.cellList[i].location, fillColorStr, alphaVal, borderWidth, borderColorStr);
        }
        else if (cell.type === TURNCELLTYPE_BLOCKCREATE) {
            console.log("TEMP :: spot 4");
            fillColorStr = "#676767";
            alphaVal = 0.8;
            fontColorStr = "#ffffff";
            // TODO : 장애물 표시 처리
            SCMapAPI.drawLocation(blockContext, gridWidth, gridHeight, selectedTurn.cellList[i].location, fillColorStr, alphaVal, borderWidth, borderColorStr, fontColorStr);
        }
        else if (cell.type === TURNCELLTYPE_BLOCKDELETE) {
            console.log("TEMP :: spot 5");
            fillColorStr = "#ffff00";
            alphaVal = 0.4;
            fontColorStr = "#652d92";
            // TODO : 장애물 표시 처리
            SCMapAPI.drawLocation(blockContext, gridWidth, gridHeight, selectedTurn.cellList[i].location, fillColorStr, alphaVal, borderWidth, borderColorStr, fontColorStr);
        }
    }
    
    console.log("Bomb Settings Redrawn");
};