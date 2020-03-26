/* Init Basic Web Storage Constants */
const SERVER = "DevCos";
const DEVELOPER = "Less";
const PROJECT_NAME = SHORT_APP_NAME;
const SS_HEADER = SERVER + "-" + DEVELOPER + "-" + PROJECT_NAME + "-" + "Session" + "-"; // SessionStorage Header
const LS_HEADER = SERVER + "-" + DEVELOPER + "-" + PROJECT_NAME + "-" + "Local" + "-"; // LocalStorage Header

/* Storage Keys */
const LS_PROJECT_AUTHOR = LS_HEADER + "ProjectAuthor";
const LS_IS_PRIVATE_PROJECT = LS_HEADER + "IsPrivateProject";

var WebStorage = {
    isAvailable : true,
    getProjectAuthor : function() {},
    isPrivateProject : function() {}
};

/* Check Storage Availability */
if (!Storage) {
    WebStorage.isAvailable = false;
    Log.warn("Storage unsupported!");
}

/* Storage Methods */
WebStorage.getProjectAuthor = function() {
    var projectAuthor = null;

    if (localStorage) {
        var projectAuthor = localStorage.getItem(LS_PROJECT_AUTHOR);
        Log.debug("Local Storage Get (" + LS_PROJECT_AUTHOR + ", " + projectAuthor + ")");
    }
    else {
        Log.debug("Local Storage Not Available (WebStorage.getProjectAuthor)");
    }

    return projectAuthor;
};

WebStorage.setProjectAuthor = function(projectAuthor) {
    if (localStorage) {
        localStorage.setItem(LS_PROJECT_AUTHOR, projectAuthor);
        Log.debug("Local Storage Set (" + LS_PROJECT_AUTHOR + ", " + projectAuthor + ")");
    }
    else {
        Log.debug("Local Storage Not Available (WebStorage.setProjectAuthor)");
    }
};

WebStorage.isPrivateProject = function() {
    var isPrivateProject = undefined;

    if (localStorage) {
        let isPrivateValue = localStorage.getItem(LS_IS_PRIVATE_PROJECT); // 존재하지 않을 경우, 결과는 null임.
        isPrivateProject = (isPrivateValue === "true") ? true : (isPrivateValue === "false") ? false : undefined;
        Log.debug("Local Storage Get (" + LS_IS_PRIVATE_PROJECT + ", " + isPrivateProject + ")");
    }
    else {
        Log.debug("Local Storage Not Available (WebStorage.isPrivateProject)");
    }

    return isPrivateProject;
};

WebStorage.setPrivateProject = function(isPrivateProject) {
    if (localStorage) {
        localStorage.setItem(LS_IS_PRIVATE_PROJECT, isPrivateProject);
        Log.debug("Local Storage Set (" + LS_IS_PRIVATE_PROJECT + ", " + isPrivateProject + ")");
    }
    else {
        Log.debug("Local Storage Not Available (WebStorage.setPrivateProject)");
    }
};