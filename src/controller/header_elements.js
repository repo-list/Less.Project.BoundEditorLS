HeaderElements.onButtonClick = function() {
    switch ($(this).prop("id")) {
        case "patchNote": HeaderElements.onClickPatchNote(); break;
        case "appInfo": HeaderElements.onClickAppInfo(); break;
        case "loadProject": HeaderElements.onClickLoadProject(); break;
        case "saveProject": HeaderElements.onClickSaveProject(); break;
        case "projectAuthor": HeaderElements.onClickProjectAuthor(); break;
        case "projectName": HeaderElements.onClickProjectName(); break;
    }
};

HeaderElements.onClickPatchNote = function() {
    var title = "패치 노트";
    var message = "";

    for (var i = 0; i < PatchNote.length; i++) {
        if (i > 0) message += "\n";
        message += "v" + PatchNote[i].version + " : " + PatchNote[i].detail;
    }

    Popup.alert(title, message);
    Log.debug("Button Clicked - Patch Note");
};

HeaderElements.onClickAppInfo = function() {
    var title = "앱 정보";
    var message = "";

    message += "앱 이름 : " + App.name + "\n";
    message += "제작자 : " + App.author + "\n";
    message += "이메일 : " + App.authorEmail + "\n";
    message += "버전 : " + App.version + "\n";
    message += "소스 링크 : " + App.sourceLink + "\n";
    message += "설명 : " + App.description;

    Popup.alert(title, message);
    Log.debug("Button Clicked - App Info");
};

HeaderElements.onClickLoadProject = function() {
    // 파일 시스템에서 프로젝트 파일을 검색함
    // 해당 이벤트 리스너는 index 파일에 있음

    Log.debug("Button Clicked - Load Project");
};

HeaderElements.onClickSaveProject = function() {
    if (Project.author === undefined) {
        let author = Popup.prompt("프로젝트 제작자의 닉네임을 입력해주세요 : ", DEFAULT_AUTHOR_NAME);
        if (author === null) author = DEFAULT_AUTHOR_NAME;
        updateProjectAuthor(author);
    }

    saveProject(Project);
    Log.debug("Button Clicked - Save Project");
};

HeaderElements.onClickProjectAuthor = function() {
    var input = Popup.prompt("프로젝트 제작자의 닉네임을 입력해주세요 : ", (Project.author === undefined) ? DEFAULT_AUTHOR_NAME : Project.author);

    if (input !== null) updateProjectAuthor(input);
};

HeaderElements.onClickProjectName = function() {
    var input = Popup.prompt("프로젝트의 이름을 입력해주세요 : ", Project.name);

    if (input !== null) updateProjectName(input);
};