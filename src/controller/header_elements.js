HeaderElements.onButtonClick = function() {
    var title = "", message = "";
    
    switch ($(this).prop("id")) {
        case "patchNote":
            title = "패치 노트";
            for (var i = 0; i < PatchNote.length; i++) {
                if (i > 0) message += "\n";
                message += "v" + PatchNote[i].version + " : " + PatchNote[i].detail;
            }
            break;
        case "appInfo":
            title = "앱 정보";
            message += "앱 이름 : " + App.name + "\n";
            message += "제작자 : " + App.author + "\n";
            message += "이메일 : " + App.authorEmail + "\n";
            message += "버전 : " + App.version + "\n";
            message += "소스 링크 : " + App.sourceLink + "\n";
            message += "설명 : " + App.description;
            break;
    }

    HeaderElements.showDialog(title, message);
};

HeaderElements.showDialog = function(title, message) {
    alert("[" + title + "]\n" + message);
}