/**
 * Bound Editor LS Project File, Bound Editor LS Pattern File 1.1버전 변경 사항 :
 * - Project.patterns -> Project.patternList로 이름 변경
 * - Project 파일에는 triggerSettings가 포함될 수 있음.
 * - 패턴 파일의 형식은 바뀌지 않았는데, 실수로 1.1로 올려버림. 1.0과 1.1의 구조는 완전히 동일함.
 * 
 * Bound Editor LS Project File 1.2버전 변경 사항
 * - triggerSettings에 hyperConditionUnit이 제외됨.
 */

const PROJECTFILE_TYPE = "Bound Editor LS Project File";
const PROJECTFILE_VERSION = "1.2";
const PROJECTFILE_MIMETYPE = "application/json";
const PROJECTFILE_EXTENSION = ".bpj";

const PATTERNFILE_TYPE = "Bound Editor LS Pattern File";
const PATTERNFILE_VERSION = "1.1";
const PATTERNFILE_MIMETYPE = "application/json";
const PATTERNFILE_EXTENSION = ".bpn";

var ProjectFile = function(fileType, fileVersion, project) {
    this.fileType = __strValue;
    this.fileVersion = __strValue;
    this.project = __objValue;

    this.init = function() {
        this.fileType = fileType;
        this.fileVersion = fileVersion;
        this.project = project;
    };

    this.init();
}

var PatternFile = function(fileType, fileVersion, pattern) {
    this.fileType = __strValue;
    this.fileVersion = __strValue;
    this.pattern = __patternValue;

    this.init = function() {
        this.fileType = fileType;
        this.fileVersion = fileVersion;
        this.pattern = pattern;
    };

    this.init();
}

var FileHandler = {
    download : function(data, fileName, type) {},
    getProjectFileContent : function(project) {},
    getPatternFileContent : function(pattern) {},
    loadProjectFromFileSystem : function() {},
    loadPatternFromFileSystem : function() {},
    isJSONString : function(str) {},
    convertToPatternObject : function(loadedPattern) {}
};

// Reference : https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
FileHandler.download = function(data, fileName, type) {
    var file = new Blob([data], {type: type});

    if (window.navigator.msSaveOrOpenBlob) { // IE10+
        window.navigator.msSaveOrOpenBlob(file, fileName);
    }
    else { // Others
        var element = document.createElement("a");
        var url = URL.createObjectURL(file);
        
        element.href = url;
        element.download = fileName;
        document.body.appendChild(element);
        element.click();

        setTimeout(function() {
            document.body.removeChild(element);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
};

// Reference : https://stackoverflow.com/questions/3582671/how-to-open-a-local-disk-file-with-javascript
FileHandler.readFileFromFileSystem = function(event, callback) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(ev) {
        var content = ev.target.result;
        callback(content);
    };
    reader.readAsText(file);
};

FileHandler.getProjectFileContent = function(project) {
    var fileType = PROJECTFILE_TYPE;
    var fileVersion = PROJECTFILE_VERSION;

    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    var date = currentTime.getDate();
    var today = year + "" + ((month < 10) ? "0" + month : month) + "" + ((date < 10) ? "0" + date : date);

    var projectObj = {
        name: project.name,
        author: project.author,
        mapName: project.mapName,
        isPrivateProject: project.isPrivateProject,
        patternList: project.patternList,
        currentPattern: project.currentPattern,
        currentPatternIndex: project.currentPatternIndex,
        triggerSettings : project.triggerSettings
    };

    var data = JSON.stringify(new ProjectFile(fileType, fileVersion, projectObj), undefined, 4);
    var fileName = project.name + "_" + today + PROJECTFILE_EXTENSION;
    var type = PROJECTFILE_MIMETYPE;

    return {data: data, fileName : fileName, type: type};
};

FileHandler.getPatternFileContent = function(pattern) {
    var fileType = PATTERNFILE_TYPE;
    var fileVersion = PATTERNFILE_VERSION;

    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    var date = currentTime.getDate();
    var today = year + "" + ((month < 10) ? "0" + month : month) + "" + ((date < 10) ? "0" + date : date);

    var data = JSON.stringify(new PatternFile(fileType, fileVersion, pattern), undefined, 4);
    var fileName = Project.name + "_" + pattern.label + "_" + today + PATTERNFILE_EXTENSION;
    var type = PATTERNFILE_MIMETYPE;

    return {data: data, fileName : fileName, type: type};
};

FileHandler.loadProjectFromFileSystem = function(event, callback) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(ev) {
        var content = ev.target.result;
        if (!FileHandler.isJSONString(content)) {
            Log.error("FileHandler.loadProjectFromFileSystem : JSON 형식 오류");
            content = null;
        }
        else {
            var projectFile = JSON.parse(content);
            if (projectFile.fileType === undefined || projectFile.fileType !== PROJECTFILE_TYPE) {
                Log.error("FileHandler.loadProjectFromFileSystem : projectFile.fileType 오류");
                content = null;
            }
            else if (projectFile.fileVersion === undefined) {
                Log.error("FileHandler.loadProjectFromFileSystem : projectFile.fileVersion 오류");
                content = null;
            }
            else {
                if (projectFile.project.name === undefined ||
                    projectFile.project.author === undefined ||
                    projectFile.project.isPrivateProject === undefined ||
                    (parseFloat(projectFile.fileVersion) >= 1.1 && projectFile.project.patternList === undefined) ||
                    (projectFile.fileVersion === "1.0" && projectFile.project.patterns === undefined) ||
                    projectFile.project.currentPattern === undefined) {
                    Log.error("FileHandler.loadProjectFromFileSystem : projectFile 항목 누락 오류");
                    content = null;
                }
                else {
                    var patternList = (parseFloat(projectFile.fileVersion) >= 1.1) ? projectFile.project.patternList : projectFile.project.patterns;
                    for (var i = 0; i < patternList.length; i++) {
                        patternList[i] = FileHandler.convertToPatternObject(patternList[i]);
                        if (patternList[i] === null) {
                            Log.error("FileHandler.loadProjectFromFileSystem : patternFile.pattern 컨버팅 오류");
                            content = null;
                            break;
                        }
                    }
                    if (projectFile.fileVersion === "1.0") {
                        projectFile.project.patternList = projectFile.project.patterns;
                        projectFile.project.patterns = undefined;
                    }
                    if (projectFile.project.triggerSettings.hyperConditionUnit) { // 프로젝트 파일 버전이 1.1일 때 사용되던 값.  1.2부터는 사용되지 않음.
                        projectFile.project.triggerSettings.hyperConditionUnit = undefined;
                    }
                    projectFile.project.currentPattern = projectFile.project.patternList[projectFile.project.currentPatternIndex];

                    content = projectFile.project;
                }
            }
        }

        callback(content);
    };

    reader.readAsText(file);
};

FileHandler.loadPatternFromFileSystem = function(event, callback) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(ev) {
        var content = ev.target.result;
        if (!FileHandler.isJSONString(content)) {
            Log.error("FileHandler.loadPatternFromFileSystem : JSON 형식 오류");
            content = null;
        }
        else {
            var patternFile = JSON.parse(content);
            if (patternFile.fileType === undefined || patternFile.fileType !== PATTERNFILE_TYPE) {
                Log.error("FileHandler.loadPatternFromFileSystem : patternFile.fileType 오류");
                content = null;
            }
            else if (patternFile.fileVersion === undefined || !(patternFile.fileVersion === "1.0" || patternFile.fileVersion === "1.1")) {
                Log.error("FileHandler.loadPatternFromFileSystem : patternFile.fileVersion 오류");
                content = null;
            }
            else {
                if (patternFile.pattern === undefined ||
                    patternFile.pattern.label === undefined ||
                    patternFile.pattern.author === undefined ||
                    patternFile.pattern.description === undefined ||
                    patternFile.pattern.tileset === undefined ||
                    patternFile.pattern.currentMode === undefined ||
                    patternFile.pattern.locationLabelHeader === undefined ||
                    patternFile.pattern.isLocationZeroPadOn === undefined ||
                    patternFile.pattern.blockOption1 === undefined ||
                    patternFile.pattern.blockOption2 === undefined ||
                    patternFile.pattern.bombUnit1 === undefined ||
                    patternFile.pattern.bombUnit2 === undefined ||
                    patternFile.pattern.bombUnit3 === undefined ||
                    patternFile.pattern.currentTurn === undefined ||
                    patternFile.pattern.tileDataList === undefined ||
                    patternFile.pattern.locationList === undefined ||
                    patternFile.pattern.turnList === undefined) {
                    Log.error("FileHandler.loadPatternFromFileSystem : patternFile.pattern 항목 누락 오류");
                    content = null;
                }
                else {
                    content = FileHandler.convertToPatternObject(patternFile.pattern);
                    if (content === null) {
                        Log.error("FileHandler.loadPatternFromFileSystem : patternFile.pattern 컨버팅 오류");
                    }
                }
            }
        }

        callback(content);
    };

    reader.readAsText(file);
};

FileHandler.isJSONString = function(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }

    return true;
};

FileHandler.convertToPatternObject = function(loadedPattern) {
    // SCTile 복구
    var tileDataList = loadedPattern.tileDataList;
    for (var i = 0; i < tileDataList.length; i++) {
        tileDataList[i].tile = new SCTile(loadedPattern.tileset, tileDataList[i].tile.byteCode[0], tileDataList[i].tile.byteCode[1]);
    }
    
    // SCLocation 복구
    var locationList = loadedPattern.locationList;
    for (var i = 0; i < locationList.length; i++) {
        locationList[i] = new SCLocation(locationList[i].label, locationList[i].posX, locationList[i].posY, locationList[i].lenX, locationList[i].lenY);
    }

    // pattern.turnList 복구
    var turnList = loadedPattern.turnList;
    for (var i = 0; i < turnList.length; i++) {
        let cellList = turnList[i].cellList;
        for (var j = 0; j < cellList.length; j++) {
            for (var k = 0; k < locationList.length; k++) {
                if (cellList[j].location.label === locationList[k].label) { // 로케이션 레이블이 서로 같은 것으로 판단. 이는 나중에 직접 맵을 불러올 경우, 이름 중복 문제가 있을 수 있으므로 주의
                    cellList[j].location = locationList[k];
                    break;
                }
                else if (k === locationList.length - 1) {
                    Log.error("FileHandler.convertToPatternObject : pattern.turnList 컨버팅 오류");
                    return null;
                }
            }
        }
    }

    return loadedPattern;
};