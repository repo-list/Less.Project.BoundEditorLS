HeaderElements.onButtonClick = function() {
    var title = "", message = "";
    
    switch ($(this).prop("id")) {
        case "patchNote":
            title = "패치 노트";
            for (var i = 0; i < PatchNote.length; i++) {
                if (i > 0) message += "\n";
                message += "v" + PatchNote[i].version + " : " + PatchNote[i].detail;
            }
            HeaderElements.showDialog(title, message);
            console.log("Button Clicked - Patch Note");
            break;
        case "appInfo":
            title = "앱 정보";
            message += "앱 이름 : " + App.name + "\n";
            message += "제작자 : " + App.author + "\n";
            message += "이메일 : " + App.authorEmail + "\n";
            message += "버전 : " + App.version + "\n";
            message += "소스 링크 : " + App.sourceLink + "\n";
            message += "설명 : " + App.description;
            HeaderElements.showDialog(title, message);
            console.log("Button Clicked - App Info");
            break;
        case "loadProject":
            // 이벤트 리스너는 index 파일에
            console.log("Button Clicked - Load Project");
            break;
        case "saveProject":
            if (Project.author === undefined) {
                Project.author = prompt("프로젝트 제작자의 닉네임을 입력해주세요 : ", DEFAULT_AUTHOR_NAME);
                if (Project.author === null) Project.author = DEFAULT_AUTHOR_NAME;
            }
            saveProject(Project);
            console.log("Button Clicked - Save Project");
            break;
    }
};

HeaderElements.showDialog = function(title, message) {
    alert("[" + title + "]\n" + message);
}