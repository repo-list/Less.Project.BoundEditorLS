// Project Constants
const UNDEFINED_INT = -1;

const DEFAULT_BLOCKCONTEXT_ALPHA = 0.7;

const PATTERNID_HEADER = "pattern-";
const PATTERN_MODE_TERRAIN = "terrainMode";
const PATTERN_MODE_LOCATION = "locationMode";
const PATTERN_MODE_BOMB = "bombMode";

const MOUSEBUTTON_LEFT = "left";
const MOUSEBUTTON_MIDDLE = "middle";
const MOUSEBUTTON_RIGHT = "right";
const MOUSEBUTTON_UNKNOWN = "unknown";

const TURNCELLTYPE_BOMB = 1;
const TURNCELLTYPE_BLOCKCREATE = 2;
const TURNCELLTYPE_BLOCKDELETE = 3;

const TURNCELLOPTION_NONE = 0; // TURNCELLTYPE_BOMB
const TURNCELLOPTION_UNITKILL = 1; // TURNCELLTYPE_BLOCKCREATE
const TURNCELLOPTION_UNITREMOVE = 2; // TURNCELLTYPE_BLOCKCREATE
const TURNCELLOPTION_UNITLIVE = 3; // TURNCELLTYPE_BLOCKCREATE
const TURNCELLOPTION_BLOCKKILL = 4; // TURNCELLTYPE_BLOCKDELETE
const TURNCELLOPTION_BLOCKREMOVE = 5; // TURNCELLTYPE_BLOCKDELETE

const BLOCKOPTION1_UNITKILL = 1;
const BLOCKOPTION1_UNITREMOVE = 2;
const BLOCKOPTION1_UNITLIVE = 3;

const BLOCKOPTION2_BLOCKKILL = 1;
const BLOCKOPTION2_BLOCKREMOVE = 2;

const NOTATION_UNCLEAR = "(U)";

const RACE_NONE = "None";
const RACE_ZERG = "Zerg";
const RACE_TERRAN = "Terran";
const RACE_PROTOSS = "Protoss";

// Bomb Units
const UNIT_ZERG_SCOURGE = "Zerg Scourge";
const UNIT_ZERG_OVERLORD = "Zerg Overlord";
const UNIT_ZERG_DEVOURER = "Zerg Devourer";
const UNIT_ZERG_MUTALISK = "Zerg Mutalisk";
const UNIT_ZERG_ULTRALISK = "Zerg Ultralisk";

const UNIT_TERRAN_SCV = "Terran SCV";
const UNIT_TERRAN_DROPSHIP = "Terran Dropship";
const UNIT_TERRAN_WRAITH = "Terran Wraith";
const UNIT_TERRAN_BATTLECRUISER = "Terran Battlecruiser";

const UNIT_PROTOSS_OBSERVER = "Protoss Observer";
const UNIT_PROTOSS_PROBE = "Protoss Probe";
const UNIT_PROTOSS_CORSAIR = "Protoss Corsair";
const UNIT_PROTOSS_ARBITER = "Protoss Arbiter";
const UNIT_PROTOSS_SCOUT = "Protoss Scout";
const UNIT_PROTOSS_ARCHON = "Protoss Archon";
const UNIT_PROTOSS_DARKARCHON = "Protoss Dark Archon";

// Block Units
const UNIT_TERRAN_MACHINESHOP = "Terran Machine Shop";
const UNIT_TERRAN_MACHINESHOP_UNCLEAR = UNIT_TERRAN_MACHINESHOP + NOTATION_UNCLEAR;
const UNIT_NEUTRAL_PSIEMITTER = "Psi Emitter";
const UNIT_NEUTRAL_PSIEMITTER_UNCLEAR = UNIT_NEUTRAL_PSIEMITTER + NOTATION_UNCLEAR;
const UNIT_NEUTRAL_KHALISCRYSTAL = "Khalis Crystal";
const UNIT_NEUTRAL_KHALISCRYSTAL_UNCLEAR = UNIT_NEUTRAL_KHALISCRYSTAL + NOTATION_UNCLEAR;
const UNIT_NEUTRAL_URAJCRYSTAL = "Uraj Crystal";
const UNIT_NEUTRAL_URAJCRYSTAL_UNCLEAR = UNIT_NEUTRAL_URAJCRYSTAL + NOTATION_UNCLEAR;
const UNIT_NEUTRAL_KHAYDARINCRYSTAL = "Khaydarin Crystal";
const UNIT_NEUTRAL_KHAYDARINCRYSTAL_UNCLEAR = UNIT_NEUTRAL_KHAYDARINCRYSTAL + NOTATION_UNCLEAR;
const UNIT_OTHER_BLOCKEXPLOSION1 = "Block Explosion 1x1";
const UNIT_OTHER_BLOCKEXPLOSION2 = "Block Explosion 2x2";

/* Default Project Settings */
const SHORT_APP_NAME = "BoundEditorLS";
const DEFAULT_PROJECT_NAME = "새 프로젝트";
const DEFAULT_PATTERN_LABEL_HEADER = "패턴 ";
const DEFAULT_PATTERN_DESCRIPTION = "";
const DEFAULT_TILESET = SCTilesetList.Badlands;
const DEFAULT_AUTHOR_NAME = "UnknownUser";
const DEFAULT_LOCATION_LABEL_HEADER = "A";
const DEFAULT_IS_LOCATION_ZERO_PAD_ON = true;
const DEFAULT_BLOCKOPTION1 = BLOCKOPTION1_UNITKILL;
const DEFAULT_BLOCKOPTION2 = BLOCKOPTION2_BLOCKREMOVE;
// const DEFAULT_BOMBUNIT1 = UNIT_ZERG_SCOURGE;
// const DEFAULT_BOMBUNIT2 = UNIT_ZERG_OVERLORD;
// const DEFAULT_BOMBUNIT3 = UNIT_TERRAN_BATTLECRUISER;
const DEFAULT_BOMBUNIT1 = UNIT_ZERG_SCOURGE;
const DEFAULT_BOMBUNIT2 = UNIT_ZERG_OVERLORD;
const DEFAULT_BOMBUNIT3 = UNIT_TERRAN_BATTLECRUISER;
const DEFAULT_TURN_WAIT = 42;
const DEFAULT_AUTHORPROMPT_DELAY = 500;

// Classes (Modified After Declaration)
var BoundPattern = function(label, description, tileset) {
    this.label = __strValue;
    this.author = __strValue;
    this.mapName = __strValue;
    this.description = __strValue;
    this.tileset = __strValue;
    this.currentMode = __strValue;
    this.locationLabelHeader = __strValue;
    this.isLocationZeroPadOn = __booleanValue;
    this.blockOption1 = __intValue;
    this.blockOption2 = __intValue;
    this.bombUnit1 = __strValue;
    this.bombUnit2 = __strValue;
    this.bombUnit3 = __strValue;
    this.currentTurn = __intValue;
    this.tileDataList = __arrValue;
    this.locationList = __arrValue;
    this.turnList = __arrValue;

    this.init = function() {
        this.label = label;
        this.description = description;
        this.tileset = tileset;
        this.tileDataList = new Array(); // 포인터 기반 변수들은 명시적으로 별도 지정해주지 않으면, 콘솔 출력 테스트 시 이상한 애 들어가 있어서 어리둥절하는 대재앙 발생...
        this.locationList = new Array();
        this.turnList = new Array();
    };

    this.init();
};

var BoundTurn = function() {
    this.cellList = __arrValue;
    this.wait = __intValue;

    this.init = function() {
        this.cellList = new Array();
    };

    this.init();
};

var BoundTurnCell = function(location, type, unit, option) {
    this.location = __locationValue;
    this.type = __intValue; // 1 : 폭탄 Cell, 2 : 장애물 생성 Cell, 3 : 장애물 삭제 Cell
    this.unit = __strValue;
    this.option = __intValue; // 1 : 유닛 Kill, 2 : 유닛 Remove, 3 : 유닛 생존, 4 : 장애물 Kill, 5: 장애물 Remove

    this.init = function() {
        this.location = location;
        this.type = type;
        this.unit = unit;
        this.option = option;
    };

    this.init();
};

var TileData = function(tile, posX, posY) {
    this.tile = __tileValue;
    this.posX = __intValue;
    this.posY = __intValue;

    this.init = function() {
        this.tile = tile;
        this.posX = posX;
        this.posY = posY;
    };

    this.init();
};

// Declaration Constants

//* Already defined in scmap_api.js *//
// const __intValue = 0;
// const __strValue = "";
// const __imgValue = new Image();
// const __arrValue = [];
// const __2dArrValue = [[]];
// const __objValue = {};
// const __booleanValue = false;

//* Others *//
const __tileValue = new SCTile();
const __locationValue = new SCLocation();
const __patternValue = new BoundPattern();

// the project object
var Project = {
    name : __strValue,
    author : __strValue,
    mapName : __strValue,
    isPrivateProject : __booleanValue,
    patterns : __arrValue,
    currentPattern : __patternValue,
    currentPatternIndex : __intValue
};


var createNewPattern = function() {
    var patternLabel = DEFAULT_PATTERN_LABEL_HEADER + (Project.patterns.length + 1);
    var patternDescription = DEFAULT_PATTERN_DESCRIPTION;
    var tileset = DEFAULT_TILESET;
    var pattern = new BoundPattern(patternLabel, patternDescription, tileset);

    pattern.author = undefined; // 나중에 파일 저장 시, undefined인지 체크 후 닉네임 입력하게끔 유도하는 꼼수
    pattern.mapName = undefined; // 나중에 파일 저장 시, undefined인지 체크 후 닉네임 입력하게끔 유도하는 꼼수
    pattern.currentMode = PATTERN_MODE_TERRAIN;
    pattern.locationLabelHeader = DEFAULT_LOCATION_LABEL_HEADER;
    pattern.isLocationZeroPadOn = DEFAULT_IS_LOCATION_ZERO_PAD_ON;
    pattern.blockOption1 = DEFAULT_BLOCKOPTION1;
    pattern.blockOption2 = DEFAULT_BLOCKOPTION2;
    pattern.bombUnit1 = DEFAULT_BOMBUNIT1;
    pattern.bombUnit2 = DEFAULT_BOMBUNIT2;
    pattern.bombUnit3 = DEFAULT_BOMBUNIT3;
    pattern.currentTurn = 1;
    var boundTurn = new BoundTurn();
    boundTurn.wait = DEFAULT_TURN_WAIT;
    pattern.turnList.push(boundTurn);

    setTimeout(function() {
        if (Project.isPrivateProject !== true || Project.author === undefined) {
            pattern.author = prompt("패턴 제작자의 닉네임을 입력해주세요 : ", DEFAULT_AUTHOR_NAME);
            if (pattern.author === null) pattern.author = DEFAULT_AUTHOR_NAME;
            
            if (Project.isPrivateProject) Project.author = pattern.author;
            else if (Project.isPrivateProject === undefined) {
                var confirmResult = confirm("현재 프로젝트가 본인의 개인 프로젝트입니까?\n" +
                                            "확인 선택 시, 앞으로 모든 패턴에 동일한 제작자 이름이 적용됩니다.\n" +
                                            "취소 선택 시, 패턴을 저장할 때마다 제작자를 반복해서 묻습니다.");
                if (confirmResult === true) {
                    Project.author = pattern.author;
                    Project.isPrivateProject = true;
                    console.log("Project.isPrivateProject : " + Project.isPrivateProject);
                }
                else {
                    Project.isPrivateProject = false;
                    console.log("Project.isPrivateProject 2 : " + Project.isPrivateProject);
                }
            }
        }
        else pattern.author = Project.author;
    }, DEFAULT_AUTHORPROMPT_DELAY);

    return pattern;
};

var loadProject = function(event) {
    FileHandler.loadProjectFromFileSystem(event, function(project) {
        if (!project) {
            alert("프로젝트 파일이 잘못되었습니다.");
            return;
        }
        Project = project;
        LeftSection.clearPatternTab();

        var patternLen = project.patterns.length;
        for (var i = 0; i < patternLen; i++) {
            $infoTab1 = $("#left > section > #infoTab1");
            let patternID = PATTERNID_HEADER + i;
            $infoTab1.append("<button id='" + patternID + "' class='pattern'>" + project.patterns[i].label + "</button>");
            $infoTab1.find("#" + patternID).on("click", LeftSection.onPatternButtonClick);
        }

        LeftSection.selectPattern(project.currentPatternIndex);
    });
};

var saveProject = function(project) {
    var content = FileHandler.getProjectFileContent(project);
    FileHandler.download(content.data, content.fileName, content.type);
};

var loadPattern = function(event) {
    FileHandler.loadPatternFromFileSystem(event, function(pattern) {
        if (!pattern) {
            alert("패턴 파일이 잘못되었습니다.");
            return;
        }
        
        LeftSection.addPatternItem(pattern);
    });
};

var savePattern = function(pattern) {
    var content = FileHandler.getPatternFileContent(pattern);
    FileHandler.download(content.data, content.fileName, content.type);
};