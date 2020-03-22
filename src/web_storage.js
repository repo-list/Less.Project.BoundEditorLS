/* Init Basic Web Storage Constants */
const SERVER = "DevCos";
const DEVELOPER = "Less";
const PROJECT_NAME = SHORT_APP_NAME;
const SS_HEADER = SERVER + "-" + DEVELOPER + "-" + PROJECT_NAME + "-" + "Session" + "-"; // SessionStorage Header
const LS_HEADER = SERVER + "-" + DEVELOPER + "-" + PROJECT_NAME + "-" + "Local" + "-"; // LocalStorage Header

/* Storage Keys */
const LS_PROJECT_AUTHOR = LS_HEADER + "ProjectAuthor";
const LS_IS_PRIVATE_PROJECT = LS_HEADER + "IsPrivateProject";

/* Check Storage Availability */
var isWebStorageAvailable;

if (!Storage) {
    isWebStorageAvailable = false;
    Log.warn("Storage unsupported!");
}
else {
    isWebStorageAvailable = true;
}

var WebStorage = {
    getProjectAuthor : function() {},
    isPrivateProject : function() {}
};

WebStorage.getProjectAuthor = function() {
    if (!isWebStorageAvailable) return;
    
    var projectAuthor = localStorage.getItem(LS_PROJECT_AUTHOR);
    Log.debug("Local Storage Get (" + LS_PROJECT_AUTHOR + ", " + projectAuthor + ")");

    return projectAuthor;
};

WebStorage.setProjectAuthor = function(projectAuthor) {
    if (!isWebStorageAvailable) return;
    
    localStorage.setItem(LS_PROJECT_AUTHOR, projectAuthor);
    Log.debug("Local Storage Set (" + LS_PROJECT_AUTHOR + ", " + projectAuthor + ")");
};

WebStorage.isPrivateProject = function() {
    if (!isWebStorageAvailable) return;
    
    var isPrivateValue = localStorage.getItem(LS_IS_PRIVATE_PROJECT); // 존재하지 않을 경우, 결과는 null임.
    var isPrivateProject = (isPrivateValue === "true") ? true : (isPrivateValue === "false") ? false : undefined;
    Log.debug("Local Storage Get (" + LS_IS_PRIVATE_PROJECT + ", " + isPrivateProject + ")");

    return isPrivateProject;
};

WebStorage.setPrivateProject = function(isPrivateProject) {
    if (!isWebStorageAvailable) return;
    
    localStorage.setItem(LS_IS_PRIVATE_PROJECT, isPrivateProject);
    Log.debug("Local Storage Set (" + LS_IS_PRIVATE_PROJECT + ", " + isPrivateProject + ")");
};