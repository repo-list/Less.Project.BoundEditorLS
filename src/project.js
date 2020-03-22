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

// Triggers
const TRIGGER_EDITORTYPE_TRIGEDIT = "TrigEdit";
const TRIGGER_EDITORTYPE_TRIGEDITPLUS = "TrigEditPlus";

const TRIGGER_EXTRANGE_ALLDATA = 1;
const TRIGGER_EXTRANGE_ALLPATTERNS = 2;
const TRIGGER_EXTRANGE_CURRENTPATTERN = 3;
const TRIGGER_EXTRANGE_CUSTOM = 4;

const TRIGGER_PLAYERTYPE_NONE = 0;
const TRIGGER_PLAYERTYPE_HUMAN = 1;
const TRIGGER_PLAYERTYPE_COMPUTER = 2;

const TRIGGER_P12_KILL = "Kill";
const TRIGGER_P12_REMOVE = "Remove";

const TRIGGER_LIFETYPE_LIFE = "Life";
const TRIGGER_LIFETYPE_DEATH = "Death";

/* Default Project Settings */
const SHORT_APP_NAME = "BoundEditorLS";
const DEFAULT_PROJECT_NAME = "나의 프로젝트";
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
const DEFAULT_INITIAL_AUTHORPROMPT_DELAY = 500;

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
    mapInfo : __objValue,
    isPrivateProject : __booleanValue,
    patternList : __arrValue,
    currentPattern : __patternValue,
    currentPatternIndex : __intValue,
    triggerSettings : __objValue
};


var createNewPattern = function() {
    var patternLabel = DEFAULT_PATTERN_LABEL_HEADER + (Project.patternList.length + 1);
    var patternDescription = DEFAULT_PATTERN_DESCRIPTION;
    var tileset = DEFAULT_TILESET;
    var pattern = new BoundPattern(patternLabel, patternDescription, tileset);

    pattern.author = undefined; // 나중에 파일 저장 시, undefined인지 체크 후 닉네임 입력하게끔 유도하는 꼼수
    pattern.mapName = undefined; // 나중에 트리거 출력 시, undefined인지 체크 후 닉네임 입력하게끔 유도하는 꼼수
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

    checkPatternAuthor(pattern);

    return pattern;
};

var loadProject = function(event) {
    FileHandler.loadProjectFromFileSystem(event, function(project) {
        if (!project) {
            Popup.alert("프로젝트 파일이 잘못되었습니다.");
            return;
        }
        Project = project;
        LeftSection.clearPatternTab();

        // 태그 수동 추가
        var patternLen = project.patternList.length;
        for (var i = 0; i < patternLen; i++) {
            var $infoTab1List = $("#left > section > #infoTab1 > ul");
            let patternID = PATTERNID_HEADER + i;
            $infoTab1List.append("<li><button id='" + patternID + "' class='pattern'>" + project.patternList[i].label + "</button></li>");
            $newButton = $infoTab1List.find("#" + patternID);
            $newButton.on("click", LeftSection.onPatternButtonClick);
        }

        // 프로젝트 데이터 세팅
        var $projectName = $("#header > #projectName");
        var $projectAuthor = $("#header > #projectAuthor");
        $projectName.html(project.name);
        $projectAuthor.html(project.author);

        LeftSection.selectPattern(project.currentPatternIndex);

        Log.debug(project.patternList);
    });
};

var saveProject = function(project) {
    var content = FileHandler.getProjectFileContent(project);
    FileHandler.download(content.data, content.fileName, content.type);
};

var loadPattern = function(event) {
    FileHandler.loadPatternFromFileSystem(event, function(pattern) {
        if (!pattern) {
            Popup.alert("패턴 파일이 잘못되었습니다.");
            return;
        }
        
        LeftSection.addNewPatternItem(pattern);
        LeftSection.selectPattern(Project.patternList.length - 1);
    });
};

var savePattern = function(pattern) {
    var content = FileHandler.getPatternFileContent(pattern);
    FileHandler.download(content.data, content.fileName, content.type);
};

var deletePattern = function(patternIndex) {
    // 객체 제거
    var $patternButtons = $("#left > section > #infoTab1 button.pattern");
    Project.patternList.splice(patternIndex, 1);
    $patternButtons.eq(patternIndex).parent().remove(); // parent === <li> element
    $patternButtons = $("#left > section > #infoTab1 button.pattern"); // 다시 찾아줘야 length가 변함...

    // 버튼 ID 초기화
    for (var i = patternIndex; i < $patternButtons.length; i++) {
        $patternButtons.eq(i).prop("id", PATTERNID_HEADER + i);
    }

    // 패턴 탭에서 버튼 제거

    // 캔버스 지우기
    RightArticle.clearContext(terrainCanvas, terrainContext);
    RightArticle.clearContext(locationCanvas, locationContext);
    RightArticle.clearContext(baseCanvas, baseContext);
    RightArticle.clearContext(blockCanvas, blockContext);
    RightArticle.clearContext(bombCanvas, bombContext);
    RightArticle.clearContext(selectionCanvas, selectionContext);
    // gridContext는 한 번 초기화하고 그대로 사용하므로, 지울 필요가 없음.

    // 패턴 레이블 변경
    var $patternLabel = $("#right > header button#patternLabel");
    $patternLabel.html("");

    // 현재 패턴 정보 제거
    Project.currentPattern = null;
    Project.currentPatternIndex = null;
}

var checkPatternAuthor = function(pattern) {
    var projectAuthor = Project.author;
    var isPrivateProject = Project.isPrivateProject;
    var patternAuthor = pattern.author;

    var isFreshLoad;
    if (Page.isFreshLoad) {
        isFreshLoad = true;
        Page.isFreshLoad = false;
    }

    if (isPrivateProject !== true) {
        if (!isFreshLoad) {
            let tempAuthorName = (projectAuthor === null) ? DEFAULT_AUTHOR_NAME : projectAuthor;
            patternAuthor = Popup.prompt("패턴 제작자의 닉네임을 입력해주세요 : ", tempAuthorName);
            if (patternAuthor === null) patternAuthor = DEFAULT_AUTHOR_NAME;
        }
        else {
            patternAuthor = (projectAuthor === null) ? DEFAULT_AUTHOR_NAME : projectAuthor;
        }

        if (isPrivateProject === undefined) {
            let confirmResult = Popup.confirm("현재 프로젝트가 본인의 개인 프로젝트입니까?\n" +
                                        "확인 선택 시, 앞으로 모든 패턴에 동일한 제작자 이름이 적용됩니다.\n" +
                                        "취소 선택 시, 패턴을 저장할 때마다 제작자를 반복해서 묻습니다.");
            if (confirmResult === true) {
                projectAuthor = patternAuthor;
                isPrivateProject = true;
            }
            else {
                projectAuthor = DEFAULT_AUTHOR_NAME;
                isPrivateProject = false;
            }
        }
    }
    else if (patternAuthor === undefined) patternAuthor = projectAuthor;

    if (projectAuthor === undefined) { // 이전 버전의 영향으로 인해 isPrivateProject가 true이면서 projectAuthor가 undefined가 되는 블랙홀(;;;) 현상이 발생 가능. 그럴 때 기본값으로 설정.
        projectAuthor = patternAuthor = DEFAULT_AUTHOR_NAME;
    }

    pattern.author = patternAuthor;

    // 2. 프로젝트 제작자 처리
    updateProjectAuthor(projectAuthor);

    // 3. 개인 프로젝트 여부 처리
    updateProjectPrivacy(isPrivateProject);
    
};

var updateProjectAuthor = function(author) {
    var $projectAuthor = $("#header > #projectAuthor");

    $projectAuthor.html(author);
    Project.author = author;
    WebStorage.setProjectAuthor(author);

    Log.debug("Project author changed to : " + author);
};

var updateProjectName = function(name) {
    var $projectName = $("#header > #projectName");

    $projectName.html(name);
    Project.name = name;
    document.title = Project.name;
    
    Log.debug("Project name changed to : " + name);
};

var updatePatternLabel = function(patternIndex, label) {
    var $patternButtons = $("#left > section > #infoTab1 button.pattern");
    var $patternLabel = $("#right > header button#patternLabel");

    $patternButtons.eq(patternIndex).html(label);
    $patternLabel.html(label);
    Project.patternList[patternIndex].label = label;
    
    Log.debug("Pattern label changed to : " + label);
};

var updateProjectPrivacy = function(isPrivate) {
    if (isPrivate) {
        let hasConflicts = false;
        for (var i = 0; i < Project.patternList.length; i++) {
            if (Project.patternList[i].author !== Project.author) {
                hasConflicts = true;
                break;
            }
        }
        if (hasConflicts) {
            let confirmResult = Popup.confirm("개인 패턴 중에 프로젝트 제작자와 다른 제작자 이름이 있습니다. 덮어쓰는 데 동의하십니까?");

            if (confirmResult === true) {
                for (var i = 0; i < Project.patternList.length; i++) {
                    if (Project.patternList[i].author !== Project.author) {
                        updatePatternAuthor(i, Project.author);
                    }
                }
            }
            else return;
        }
    }

    Project.isPrivateProject = isPrivate;
    WebStorage.setPrivateProject(isPrivate);
    $("#header > input#projectType").prop("checked", isPrivate);

    Log.debug("Project privacy changed to : " + isPrivate);
};

var updatePatternAuthor = function(patternIndex, author) {
    var prevAuthor = Project.patternList[patternIndex].author;
    Project.patternList[patternIndex].author = author;
    $("#right > header #patternAuthorButton").html(author);

    Log.debug("Pattern[" + patternIndex + "] author changed from (" + prevAuthor + ") to (" + author + ")");
};

var updatePatternDescription = function(patternIndex, description) {
    Project.patternList[patternIndex].description = description;
    $("#right > header #patternDescriptionButton").html(description);
    
    Log.debug("Pattern description changed to : " + description);
};