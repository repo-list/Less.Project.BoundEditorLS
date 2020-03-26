const BS_DEFAULT_WIDTH = 640; // 스타의 기본 해상도. 절대 바꾸지 말 것.
const BS_DEFAULT_HEIGHT = 480; // 스타의 기본 해상도. 절대 바꾸지 말 것.
const BS_DEFAULT_LEFT = -640;
const BS_DEFAULT_TOP = -480;

const BS_ELEMENT_HIDE_DURATION = 0;
const BS_ELEMENT_SHOW_DURATION = 500;

const BS_PROCESS_INTERVAL = 42; // ms. 절대 바꾸지 말 것. 바꿀 경우 프레임 처리에 문제 발생.
const BS_PROCESS_DELAY = 500;

const BS_QUALITY_MEDIUM = 1;
const BS_QUALITY_HIGH = 2;
const BS_HQIMAGE_RESOLUTION_WIDTH = 1440;
const BS_HQIMAGE_RESOLUTION_HEIGHT = 1080;

var BSUnit = function(name, type, size, image, location, isBomb, sprite, killSound) { // sprite, killSound는 선택. 파라미터에 대입 연산자는 IE에서 인식하지 못 함.
    this.name = name;
    this.type = type;
    this.size = size;
    this.image = image;
    this.location = location;
    this.isBomb = isBomb;
    this.sprite = null;
    this.killSound = null;
    this.state = 0;

    this.init = function() {
        if (sprite !== undefined) this.sprite = sprite;
        if (killSound !== undefined) this.killSound = killSound;
    };

    this.init();
};

var BoundSimulator = function(selector, left, top, width, height, columns, rows, quality) {
    this.selector = selector;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.columns = columns;
    this.rows = rows;
    this.quality = quality;
    this.gridWidth = null;
    this.gridHeight = null;
    this.$element = null; // BoundSimulator 최상단 DOM 객체
    this.$screenWrapper = null; // 최상단 DOM 객체의 하위 DOM 객체 (SC의 20:15 비율을 유지하면서 최상단 DOM 객체에서 가운데 정렬된 DOM 객체)
    this.$screen = null; // 실제 레이어(Canvas)들을 감싸는, 실제 맵 또는 에디터의 width * height 설정에 따른 크기
    this.terrainCanvas = null;
    this.terrainContext = null;
    this.locationCanvas = null;
    this.locationContext = null;
    this.groundUnitCanvas = null;
    this.groundUnitContext = null;
    this.airUnitCanvas = null;
    this.airUnitContext = null;

    this.airUnitList = [];
    this.groundUnitList = [];

    this.isMaximized = false;
    this.isBeingUsed = false;
	this.isEventRegistered = false;

    this.processor = null;
    this.currentFrame = null;
    this.maxFrames = null;
    this.currentPattern = null;
    this.turnList = null;
    this.intervalList = null; // 실제 ms 단위 시간
    this.currentTurn = null;

    this.screenRatioW = null;
    this.screenRatioH = null;
    this.imageRatioW = null;
    this.imageRatioH = null;

    var self = this;

    this.start = function(pattern) {
        // SCMapAPI 준비 상태 확인
        if (!SCMapAPI.isReady) {
            Log.error("SCMapAPI가 준비되지 않았습니다.");
            return;
        }

        // BoundSimulator 초기화
        this.init(pattern);

        // 메인 코드
        this.$element.css("background-color", "black");
        this.$screenWrapper.css("background-color", "#a8a8a8");
        
        this.currentPattern = pattern;
        this.turnList = pattern.turnList;
        this.intervalList = [];
        for (var i = 0; i < this.turnList.length; i++) {
            let currentWait = this.turnList[i].wait;

            if (currentWait === 0) currentWait = 42;
            else currentWait = (parseInt((currentWait - 1) / 42) + 1) * 42;

            let actualTime = currentWait + 42;
            if (i === this.turnList.length - 1) actualTime += 84; // 마지막 턴 84ms 추가
            this.intervalList.push(actualTime);
        }
        this.currentTurn = 1;
        this.currentFrame = 1;
        this.maxFrames = 0;
        for (var i = 0; i < this.intervalList.length; i++) {
            this.maxFrames += parseInt(this.intervalList[i] / 42);
        }
        
        this.maximize();
        this.show();
        
        setTimeout(function() {
            self.processor = setInterval(self.process, BS_PROCESS_INTERVAL);
        }, BS_PROCESS_DELAY);
    };

    this.hide = function() {
        this.$element.hide(BS_ELEMENT_HIDE_DURATION);
    };

    this.show = function() {
        this.$element.show(BS_ELEMENT_SHOW_DURATION);
    };

    this.moveTo = function(left, top) {
        this.$element.css({
            "left" : left + "px",
            "top" : top + "px"
        });
    };

    this.resize = function() {
        this.resizeElement();
        this.resizeScreen();
    };

    this.maximize = function() {
        this.isMaximized = true;

        var topmostElement = this.$element.get(0);
        if (topmostElement.requestFullscreen) topmostElement.requestFullscreen();
        else if (topmostElement.webkitRequestFullscreen) topmostElement.webkitRequestFullscreen();
        // else if (topmostElement.msRequestFullscreen) topmostElement.msRequestFullscreen(); // MS full screen 요청은 MSFullscreenChange, onmsfullscreenchange 이벤트 둘 다 캐치를 못 함.

        this.resize();
        this.redrawAllLayers();
    };

    this.normalize = function() {
        this.isMaximized = false;
        this.resize();
        this.redrawAllLayers();
    };

    this.resizeElement = function() {
        this.$element.width(this.width);
        this.$element.height(this.height);

        if (!this.isMaximized) {
            let wrapperWidth = parseInt(this.height * 4 / 3);
            this.$screenWrapper.width(wrapperWidth);
            this.$screenWrapper.css("left", parseInt((this.width - wrapperWidth) / 2) + "px");
        }
        else {
            let wrapperWidth = parseInt(screen.height * 4 / 3);
            this.$screenWrapper.width(wrapperWidth);
            this.$screenWrapper.css("left", parseInt((screen.width - wrapperWidth) / 2) + "px");
        }
    };

    this.resizeScreen = function() {
        this.recalcGridSize();
        this.recalcScreenAndImageRatio();

        var $canvases = this.$screen.find("canvas");
        var canvasWidth = this.columns * this.gridWidth;
        var canvasHeight = this.rows * this.gridHeight;
    
        this.$screen.css("width", canvasWidth + "px");
        this.$screen.css("height", canvasHeight + "px");

        for (var i = 0; i < $canvases.length; i++) {
            $canvases.eq(i).prop("width", canvasWidth);
            $canvases.eq(i).prop("height", canvasHeight);
        }
    };

    this.redrawAllLayers = function() {
        // Note : 레이어 redraw 메서드 새로 생길 때마다 항목을 추가해야 함.
        this.redrawTerrainLayer();
        this.redrawLocationLayer();
        this.redrawGroundUnitLayer();
        this.redrawAirUnitLayer();
    };

    this.redrawTerrainLayer = function() {
        this.clearLayer(this.terrainCanvas, this.terrainContext);
        
        var tileDataList = this.currentPattern.tileDataList;
        for (var i = 0; i < tileDataList.length; i++) {
            let tileData = tileDataList[i];
            SCMapAPI.drawTile(this.terrainContext, this.gridWidth, this.gridHeight, tileData.tile, tileData.posX, tileData.posY, 1, 1);
        }

        Log.debug("Simulator :: Terrain Layer Redrawn");
    };

    this.redrawLocationLayer = function() {
        this.clearLayer(this.locationCanvas, this.locationContext);

        var locationList = this.currentPattern.locationList;
        for (var i = 0; i < locationList.length; i++) {
            let location = locationList[i];
            SCMapAPI.drawLocation(this.locationContext, this.gridWidth, this.gridHeight, location);
        }
        
        Log.debug("Simulator :: Location Layer Redrawn");
    };

    this.redrawGroundUnitLayer = function() {
        this.clearLayer(this.groundUnitCanvas, this.groundUnitContext);

        for (var i = 0; i < this.groundUnitList.length; i++) {
            let groundUnit = this.groundUnitList[i];
            let unitIndex = i;
            this.drawUnit(this.groundUnitContext, groundUnit, unitIndex);
        }

        // Log.debug("Simulator :: Ground Unit Layer Redrawn");
    };

    this.redrawAirUnitLayer = function() {
        this.clearLayer(this.airUnitCanvas, this.airUnitContext);

        for (var i = 0; i < this.airUnitList.length; i++) {
            let airUnit = this.airUnitList[i];
            let unitIndex = i;
            this.drawUnit(this.airUnitContext, airUnit, unitIndex);
        }

        // Log.debug("Simulator :: Air Unit Layer Redrawn");
    };

    this.playUnitSounds = function() {
        for (var i = 0; i < this.groundUnitList.length; i++) {
            let bsUnit = this.groundUnitList[i];
            if (bsUnit.isBomb && bsUnit.state === 1) this.playSoundEffect(bsUnit.killSound);
        }

        for (var i = 0; i < this.airUnitList.length; i++) {
            let bsUnit = this.airUnitList[i];
            if (bsUnit.isBomb && bsUnit.state === 1) this.playSoundEffect(bsUnit.killSound);
        }
    };

    this.playSoundEffect = function(sound) {
        if (!sound.paused && sound.currentTime * 1000 <= 126) sound.volume = 0.7;
        else if (!sound.paused && sound.currentTime * 1000 <= 252) sound.volume = 0.85;
        else sound.volume = 1.0;

        if (!isNaN(sound.duration)) {
            sound.currentTime = 0;
            sound.play();
        }
    };

    this.clearLayer = function(canvasElement, canvasContext) {
        if (canvasContext === undefined) return;
        canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
    };

    this.init = function() {
        if (this.$element === null) {
            this.$element = $(this.selector);
            this.$element.addClass("bs-element");
            this.$element.append("<div class='bs-screen-wrapper'></div>");
            this.$screenWrapper = this.$element.find(".bs-screen-wrapper").eq(0);
            this.$screenWrapper.append("<div class='bs-screen'></div>");
            this.$screen = this.$screenWrapper.find(".bs-screen").eq(0);
        }

        if (this.terrainCanvas === null) {
            this.$screen.append("<canvas class='bs-layer-terrain'></canvas>");
            this.terrainCanvas = this.$screen.find(".bs-layer-terrain").eq(0).get(0);
            this.terrainContext = this.terrainCanvas.getContext("2d");
        }

        if (this.locationCanvas === null) {
            this.$screen.append("<canvas class='bs-layer-location'></canvas>");
            this.locationCanvas = this.$screen.find(".bs-layer-location").eq(0).get(0);
            this.locationContext = this.locationCanvas.getContext("2d");
        }

        if (this.groundUnitCanvas === null) {
            this.$screen.append("<canvas class='bs-layer-groundunit'></canvas>");
            this.groundUnitCanvas = this.$screen.find(".bs-layer-groundunit").eq(0).get(0);
            this.groundUnitContext = this.groundUnitCanvas.getContext("2d");
        }

        if (this.airUnitCanvas === null) {
            this.$screen.append("<canvas class='bs-layer-airunit'></canvas>");
            this.airUnitCanvas = this.$screen.find(".bs-layer-airunit").eq(0).get(0);
            this.airUnitContext = this.airUnitCanvas.getContext("2d");
        }

		if (!this.isEventRegistered) {
			this.isEventRegistered = true;
			$(document).on("fullscreenchange", this.onFullscreenChange);
			$(document).on("webkitfullscreenchange", this.onFullscreenChange);
			// $(document).on("MSFullscreenChange", this.onFullscreenChange); // 안 먹힘 TT_TT
		}

        this.moveTo(this.left, this.top);
    };

    this.recalcGridSize = function() {
        // 스타크래프트의 기본 해상도 : 640x480 (px)
        // 타일 하나의 크기는 32x32 (px)이며, 한 화면에 가로로 20개, 세로로 15개가 보이는 크기이며, 화면 리사이즈 시 이 비율은 고정이다.
        
        if (!this.isMaximized) {
            this.gridWidth = this.gridHeight = parseInt(this.height / 15);
        }
        else {
            this.gridWidth = this.gridHeight = parseInt(screen.height / 15);
        }
    };
    
    this.recalcScreenAndImageRatio = function() {
        if (!this.isMaximized) {
            let wrapperWidth = parseInt(this.height * 4 / 3);
            this.screenRatioW = wrapperWidth / BS_DEFAULT_WIDTH;
            this.screenRatioH = this.height / BS_DEFAULT_HEIGHT;
            this.imageRatioW = (this.quality === BS_QUALITY_HIGH) ? wrapperWidth / BS_HQIMAGE_RESOLUTION_WIDTH : this.screenRatioW;
            this.imageRatioH = (this.quality === BS_QUALITY_HIGH) ? this.height / BS_HQIMAGE_RESOLUTION_HEIGHT : this.screenRatioH;
        }
        else {
            let wrapperWidth = parseInt(screen.height * 4 / 3);
            this.screenRatioW = wrapperWidth / BS_DEFAULT_WIDTH;
            this.screenRatioH = screen.height / BS_DEFAULT_HEIGHT;
            this.imageRatioW = (this.quality === BS_QUALITY_HIGH) ? wrapperWidth / BS_HQIMAGE_RESOLUTION_WIDTH : this.screenRatioW;
            this.imageRatioH = (this.quality === BS_QUALITY_HIGH) ? screen.height / BS_HQIMAGE_RESOLUTION_HEIGHT : this.screenRatioH;
        }

        // 최종 임시 조정
        this.imageRatioW = this.imageRatioW * 5 / 6;
        this.imageRatioH = this.imageRatioH * 5 / 6;
    };

    this.onFullscreenChange = function() {
        if (document.fullscreenElement === null) {
            self.normalize();
            self.hide();
            self.groundUnitList.length = 0; // emptying array
            self.airUnitList.length = 0; // emptying array
            self.isBeingUsed = false;
            clearInterval(self.processor);
        }
		else if (window.navigator.userAgent.indexOf("Edge") > -1) { // MS Edge인 경우, document.fullscreenElement는 무조건 undefined임.
			if (!self.isBeingUsed) {
				self.isBeingUsed = true;
			}
			else {
				self.normalize();
				self.hide();
				self.groundUnitList.length = 0; // emptying array
				self.airUnitList.length = 0; // emptying array
				self.isBeingUsed = false;
				clearInterval(self.processor);
			}
		}
		else {
			self.isBeingUsed = true;
		}
    };

    this.createUnitAtLocation = function(unit, location, isBomb) {
        var statics = (this.quality === BS_QUALITY_HIGH) ? Resource.unit.staticsHQ : Resource.unit.statics;
        var killSprites = (this.quality === BS_QUALITY_HIGH) ? Resource.unit.killSpritesHQ : Resource.unit.killSprites;
        var killSounds = Resource.unit.killSounds;

        for (var i = 0; i < Units.length; i++) {
            if (Units[i].name === unit) {
                let unitImage;
                for (var j = 0; j < statics.length; j++) {
                    if (statics[j].name === unit) {
                        unitImage = statics[j].image;
                        break;
                    }
                    else if (j === statics.length - 1) {
                        Log.error("BoundSimulator.createUnitAtLocation => 해당 유닛의 이미지 리소스가 존재하지 않습니다 : " + unit);
                        return;
                    }
                }
                let unitSprite = null;
                if (isBomb) {
                    for (var j = 0; j < killSprites.length; j++) {
                        if (killSprites[j].name === unit) {
                            unitSprite = killSprites[j].sprite;
                            break;
                        }
                        else if (j === killSprites.length - 1) {
                            Log.error("BoundSimulator.createUnitAtLocation => 해당 유닛의 킬 스프라이트 리소스가 존재하지 않습니다 : " + unit);
                            return;
                        }
                    }
                }

                let killSound = null;
                if (isBomb) {
                    for (var j = 0; j < killSounds.length; j++) {
                        if (killSounds[j].name === unit) {
                            killSound = killSounds[j].sound;
                            break;
                        }
                        else if (j === killSounds.length - 1) {
                            Log.error("BoundSimulator.createUnitAtLocation => 해당 유닛의 킬 사운드 리소스가 존재하지 않습니다 : " + unit);
                            return;
                        }
                    }
                }

                let bsUnit = new BSUnit(Units[i].name, Units[i].type, Units[i].size, unitImage, location, isBomb, unitSprite, killSound);
                switch (bsUnit.type) {
                    case UNIT_TYPE_GROUND: this.groundUnitList.push(bsUnit); break;
                    case UNIT_TYPE_AIR: this.airUnitList.push(bsUnit); break;
                    default:
                        Log.error("BoundSimulator.createUnitAtLocation => 해당 유닛은 화면에 표시할 수 없는 유닛입니다 : " + bsUnit.name);
                        return;
                }
                break;
            }
            else if (i === Units.length - 1) {
                Log.error("BoundSimulator.createUnitAtLocation => 해당 유닛 데이터가 존재하지 않습니다 : " + unit);
                return;
            }
        }
    };

    this.drawUnit = function(canvasContext, bsUnit, bsUnitIndex) {
        var image = (bsUnit.isBomb) ? bsUnit.sprite[bsUnit.state] : bsUnit.image;
        var imageWidth = image.width * this.imageRatioW;
        var imageHeight = image.height * this.imageRatioH;

        var location = bsUnit.location;
        var locationCenterX = parseInt((location.getRight(this.gridWidth) + location.getLeft(this.gridWidth)) / 2);
        var locationCenterY = parseInt((location.getBottom(this.gridHeight) + location.getTop(this.gridHeight)) / 2);
        
        canvasContext.drawImage(image, locationCenterX - parseInt(imageWidth / 2), locationCenterY - parseInt(imageHeight / 2), imageWidth, imageHeight);

        if (bsUnit.isBomb && ++bsUnit.state >= bsUnit.sprite.length) {
            if (bsUnit.type === UNIT_TYPE_GROUND) this.groundUnitList.splice(bsUnitIndex, 1);
            else if (bsUnit.type === UNIT_TYPE_AIR) this.airUnitList.splice(bsUnitIndex, 1);
            else {
                Log.error("BoundSimulator.drawUnit => 유닛 타입 오류로 인하여 제거에 실패했습니다 : " + bsUnit.name);
                return;
            }
        }
    };

    this.processTurn = function(turnNumber) {
        var cellList = this.turnList[turnNumber - 1].cellList;

        for (var i = 0; i < cellList.length; i++) {
            switch (cellList[i].type) {
                case TURNCELLTYPE_BOMB:
                    this.createUnitAtLocation(cellList[i].unit, cellList[i].location, true);
                    break;
                case TURNCELLTYPE_BLOCKCREATE:
                    this.createUnitAtLocation(cellList[i].unit, cellList[i].location, false);
                    break;
                case TURNCELLTYPE_BLOCKDELETE:
                    for (var j = 0; j < this.groundUnitList.length; j++) {
                        if (this.groundUnitList[j].name === cellList[i].unit && this.groundUnitList[j].location === cellList[i].location) {
                            // TODO : option에 따라 kill과 remove를 원래 구분해야 하나, 리소스 따는 게 너무 힘드므로 일단 패스.
                            this.groundUnitList.splice(j, 1);
                            break;
                        }
                        else if (j === this.groundUnitList.length - 1) {
                            Log.error("BoundSimulator.processTurn => 해당 블럭 유닛이 지상유닛 리스트에 포함되어 있지 않습니다 : " + cellList[i].unit);
                            return;
                        }
                    }
                    break;
            }
        }
    };

    this.process = function() {
        if (self.currentFrame === 1) self.processTurn(1);
        else {
            let totalTime = 0;
            for (var i = 0; i < self.currentTurn; i++) totalTime += self.intervalList[i];
            
            if ((self.currentFrame - 1) * BS_PROCESS_INTERVAL === totalTime) {
                self.processTurn(++self.currentTurn);
            }
        }

        self.redrawGroundUnitLayer();
        self.redrawAirUnitLayer();
        self.playUnitSounds();
        
        if (++self.currentFrame > self.maxFrames) {
            self.currentFrame = 1;
            self.currentTurn = 1;
        }
    };
};