// Global Variables
var terrainCanvas, locationCanvas, baseCanvas, blockCanvas, bombCanvas, gridCanvas, selectionCanvas
var terrainContext, locationContext, baseContext, blockContext, bombContext, gridContext, selectionContext;
var $tileWidthDiv, $tileHeightDiv;

var RightArticle = {
    // 공통
    canvasTileWidth : 34,
    canvasTileHeight : 34,
    canvasColumns : 100,
    canvasRows : 50,
    isMouseDown : false,
    initialDragPosX : UNDEFINED_INT,
    initialDragPosY : UNDEFINED_INT,
    isDragging : false,

    // 상수
    MIN_TILE_LENX_VALUE : 1,
    MAX_TILE_LENX_VALUE : 10,
    MIN_TILE_LENY_VALUE : 1,
    MAX_TILE_LENY_VALUE : 10,

    // terrainMode 관련
    prevTilePosX : UNDEFINED_INT,
    prevTilePosY : UNDEFINED_INT,
    prevTileLenX : UNDEFINED_INT,
    prevTileLenY : UNDEFINED_INT,
    selectionPosX : UNDEFINED_INT,
    selectionPosY : UNDEFINED_INT,
    selectionLenX : UNDEFINED_INT,
    selectionLenY : UNDEFINED_INT,

    // locationMode 관련
    selectedLocation : null, // SCLocation
    isLocationControlModeOn : false,
    isSelectedLocationMoving : false,
    currentLocationLayer : 1,
    maxLocationLayer : 1,

    // 메서드
    switchTo : function(elementID) {},
    onTab1MouseDown : function() {},
    onTab1MouseUp : function() {},
    onTab1MouseMove : function() {},
    onTab1MouseOut : function() {},
    onKeyDown : function() {},
    onKeyUp : function() {},
    redrawTerrainCanvas : function() {},
    redrawLocationList : function() {},
    initCanvases : function() {},
    resizeCanvases : function() {},
    clearContext : function(canvasElement, canvasContext) {},
    drawDragSquare : function(canvasContext, startPosX, startPosY, endPosX, endPosY) {},
    drawSelectionSquare : function(canvasContext, gridWidth, gridHeight, posX, posY, lenX, lenY, borderWidth) {},
    drawLocationSquare : function(canvasContext, gridWidth, gridHeight, left, top, right, bottom, hexColorStr, fillColorAlpha) {},
    drawLocationMoveSquare : function(canvasContext, gridWidth, gridHeight, event) {},
    getMouseButtonFromEvent : function(eventObj) {},
    putTile : function(canvasContext, gridWidth, gridHeight, tile, posX, posY, lenX, lenY) {},
    getSafeLenXValue : function(originalLenX) {},
    getSafeLenYValue : function(originalLenY) {},
    deleteSelectedTiles : function() {},
    redrawBombSettings : function() {},
    drawBlockUnit : function(canvasContext, gridWidth, gridHeight, location, unit, isCenterAligned) {},
    createLocation : function(gridWidth, gridHeight, posX, posY, lenX, lenY) {},
    refreshLocationListLayers : function(gridWidth, gridHeight) {}
};