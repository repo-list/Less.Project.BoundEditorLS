HeaderElements.onMainMenuIconClick = function() {
    $("#header > div#mainMenu").toggleClass("open");
};

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

HeaderElements.onMainMenuItemClick = function() {
    switch ($(this).prop("id")) {
        case "extractTrigger": HeaderElements.onClickExtractTrigger(); break;
    }
};

HeaderElements.onClickPatchNote = function() {
    var title = "패치 노트";
    var message = "";

    for (var i = 0; i < PatchNote.length; i++) {
        if (i > 0) message += "\n";
        message += "v" + PatchNote[i].version + " :\n" + PatchNote[i].detail;
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
    message += "네이버 카페 : " + App.naverCafe + "\n";
    message += "설명 : " + App.description;

    Popup.alert(title, message);
    Log.debug("Button Clicked - App Info");
};

HeaderElements.onClickLoadProject = function() {
    var $loadProjectFile = $("#header > #loadProjectFile");
    $loadProjectFile.click();

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

HeaderElements.onClickExtractTrigger = function() {
    var $page = $("#page");

    if (HeaderElements.$extractTriggerDialog === null) {
        HeaderElements.addTrigExtDialogEventListeners();
        HeaderElements.$extractTriggerDialog = $("#header > #extractTriggerDialog").dialog({
            width: 410,
            height: 520,
            modal: true,
            open: function() { $page.css("opacity", 0.8); },
            close: function() { $page.css("opacity", 1.0); },
            dialogClass: "extractTrigger"
        });
    }
    else {
        HeaderElements.$extractTriggerDialog.dialog("open");
    }
    
    $("#header > div#mainMenu").removeClass("open");
};

HeaderElements.addTrigExtDialogEventListeners = function() {
    var $dialog = $("#header > #extractTriggerDialog");
    var $mapNameText = $dialog.find("#mapNameText");
    var $lifeTypes = $dialog.find("#lifeTypes");
    var $lifeCountInput = $dialog.find("#lifeCountInput");
    var $editorTypes = $dialog.find("#editorTypes");
    var $extractionRanges = $dialog.find("#extractionRanges");
    var $computerPlayers = $dialog.find("#computerPlayers");
    var $userForces = $dialog.find("#userForces");
    var $userForceNameInput = $dialog.find("#userForceNameInput");
    var $boundingUnits = $dialog.find("#boundingUnits");
    var $boundingUnitInvincibleSettings = $dialog.find("#boundingUnitInvincibleSettings");
    var $p12DeleteMethods = $dialog.find("#p12DeleteMethods");
    var $patternConditionUnits = $dialog.find("#patternConditionUnits");
    var $turnConditionUnits = $dialog.find("#turnConditionUnits");
    var $levelLocationHeaderInput = $dialog.find("#levelLocationHeaderInput");
    var $levelLocationHeaderExample = $dialog.find("#levelLocationHeaderExample");
    var $reviveLocationHeaderInput = $dialog.find("#reviveLocationHeaderInput");
    var $reviveLocationHeaderExample = $dialog.find("#reviveLocationHeaderExample");
    var $victoryLocationInput = $dialog.find("#victoryLocationInput");
    var $lifeSettingsCheckBox = $dialog.find("#lifeSettingsCheckBox");
    var $p12DeleteCheckBox = $dialog.find("#p12DeleteCheckBox");
    var $defeatConditionCheckBox = $dialog.find("#defeatConditionCheckBox");
    var $victoryConditionCheckBox = $dialog.find("#victoryConditionCheckBox");
    var $allianceSettingsCheckBox = $dialog.find("#allianceSettingsCheckBox");
    var $shareVisionSettingsCheckBox = $dialog.find("#shareVisionSettingsCheckBox");
    var $levelStartConditionCheckBox = $dialog.find("#levelStartConditionCheckBox");
    var $reviveConditionCheckBox = $dialog.find("#reviveConditionCheckBox");
    var $hyperTriggerCheckBox = $dialog.find("#hyperTriggerCheckBox");
    var $extractButton = $dialog.find("#extract");
    var triggerSettings = {};

    // 프로젝트 설정 불러오기
    if (Project.mapName && Project.mapName !== "") $mapNameText.val(Project.mapName);

    if (Project.triggerSettings && Project.triggerSettings.lifeType) { // 하나라도 항목이 있으면 값이 저장된 게 맞다는 뜻.
        triggerSettings = Project.triggerSettings;

        $lifeTypes.val(triggerSettings.lifeType);
        $lifeCountInput.val(triggerSettings.lifeCount);
        if (triggerSettings.lifeType == TRIGGER_LIFETYPE_DEATH) $lifeCountInput.attr("disabled", true);
        $editorTypes.val(triggerSettings.editorType);
        $extractionRanges.val(triggerSettings.extractionRange);
        $computerPlayers.val(triggerSettings.computerPlayer);
        $userForces.val(triggerSettings.userForce);
        $userForceNameInput.val(triggerSettings.userForceName);
        $boundingUnits.val(triggerSettings.boundingUnit);
        $boundingUnitInvincibleSettings.val(triggerSettings.boundingUnitInvincibleSettings);
        $p12DeleteMethods.val(triggerSettings.p12DeleteMethod);
        $patternConditionUnits.val(triggerSettings.patternConditionUnit);
        $turnConditionUnits.val(triggerSettings.turnConditionUnit);
        $levelLocationHeaderInput.val(triggerSettings.levelLocationHeader);
        $levelLocationHeaderExample.text("예시 : " + triggerSettings.levelLocationHeader + "1, " + triggerSettings.levelLocationHeader + "2, " + triggerSettings.levelLocationHeader + "3, ...");
        $reviveLocationHeaderInput.val(triggerSettings.reviveLocationHeader);
        $reviveLocationHeaderExample.text("예시 : " + triggerSettings.reviveLocationHeader + "1, " + triggerSettings.reviveLocationHeader + "2, " + triggerSettings.reviveLocationHeader + "3, ...");
        $victoryLocationInput.val(triggerSettings.victoryLocation);

        if (!triggerSettings.includeLifeSettings) $lifeSettingsCheckBox.prop("checked", false);
        if (!triggerSettings.includeP12Delete) $p12DeleteCheckBox.prop("checked", false);
        if (!triggerSettings.includeDefeatCondition) $defeatConditionCheckBox.prop("checked", false);
        if (!triggerSettings.includeVictoryCondition) $victoryConditionCheckBox.prop("checked", false);
        if (!triggerSettings.includeAllianceSettings) $allianceSettingsCheckBox.prop("checked", false);
        if (!triggerSettings.includeShareVisionSettings) $shareVisionSettingsCheckBox.prop("checked", false);
        if (!triggerSettings.includeLevelStartCondition) $levelStartConditionCheckBox.prop("checked", false);
        if (!triggerSettings.includeReviveCondition) $reviveConditionCheckBox.prop("checked", false);
        if (!triggerSettings.includeHyperTrigger) $hyperTriggerCheckBox.prop("checked", false);
    }
    else {
        // 트리거 세팅 초기화
        triggerSettings.mapName = $mapNameText.val();
        triggerSettings.lifeType = $lifeTypes.val();
        triggerSettings.lifeCount = parseInt($lifeCountInput.val());
        triggerSettings.editorType = $editorTypes.val();
        triggerSettings.extractionRange = parseInt($extractionRanges.val());
        triggerSettings.computerPlayer = $computerPlayers.val();
        triggerSettings.userForce = $userForces.val();
        triggerSettings.userForceName = $userForceNameInput.val();
        triggerSettings.boundingUnit = $boundingUnits.val();
        triggerSettings.boundingUnitInvincibleSettings = $boundingUnitInvincibleSettings.val();
        triggerSettings.p12DeleteMethod = $p12DeleteMethods.val();
        triggerSettings.patternConditionUnit = $patternConditionUnits.val();
        triggerSettings.turnConditionUnit = $turnConditionUnits.val();
        triggerSettings.levelLocationHeader = $levelLocationHeaderInput.val();
        triggerSettings.reviveLocationHeader = $reviveLocationHeaderInput.val();
        triggerSettings.victoryLocation = $victoryLocationInput.val();
        triggerSettings.includeLifeSettings = $lifeSettingsCheckBox.is(":checked");
        triggerSettings.includeP12Delete = $p12DeleteCheckBox.is(":checked");
        triggerSettings.includeDefeatCondition = $defeatConditionCheckBox.is(":checked");
        triggerSettings.includeVictoryCondition = $victoryConditionCheckBox.is(":checked");
        triggerSettings.includeAllianceSettings = $allianceSettingsCheckBox.is(":checked");
        triggerSettings.includeShareVisionSettings = $shareVisionSettingsCheckBox.is(":checked");
        triggerSettings.includeLevelStartCondition = $levelStartConditionCheckBox.is(":checked");
        triggerSettings.includeReviveCondition = $reviveConditionCheckBox.is(":checked");
        triggerSettings.includeHyperTrigger = $hyperTriggerCheckBox.is(":checked");
        
        Project.triggerSettings = triggerSettings;
    }

    console.log("Initial triggerSettings : ");
    console.log(triggerSettings);

    // 변경 이벤트 처리
    $mapNameText.on("change", function() {
        Log.debug('$mapNameText.on("change")');
        let mapName = $(this).val();
        triggerSettings.mapName = mapName;
        Project.mapName = mapName;
        Log.debug("Project.mapName : " + Project.mapName);
        for (var i = 0; i < Project.patternList.length; i++) {
            Project.patternList[i].mapName = mapName;
            Log.debug("Project.patternList[" + i + "].mapName : " + Project.patternList[i].mapName);
        }
    });

    $lifeTypes.on("change", function() {
        Log.debug('$lifeTypes.on("change")');
        let lifeType = $(this).val();
        triggerSettings.lifeType = lifeType;
        Log.debug("triggerSettings.lifeType : " + triggerSettings.lifeType);

        if (lifeType === TRIGGER_LIFETYPE_LIFE) {
            // 라이프제인 경우
            $lifeCountInput.attr("disabled", false);
        }
        else {
            // 무한 목숨인 경우
            $lifeCountInput.attr("disabled", true);
        }
    });

    $lifeCountInput.on("change", function() {
        Log.debug('$lifeCountInput.on("change")');
        let lifeCount = parseInt($(this).val());
        triggerSettings.lifeCount = lifeCount;
        Log.debug("triggerSettings.lifeCount : " + triggerSettings.lifeCount);
    });

    $editorTypes.on("change", function() {
        Log.debug('$editorTypes.on("change")');
        let editorType = $(this).val();
        triggerSettings.editorType = editorType;
        Log.debug("triggerSettings.editorType : " + triggerSettings.editorType);
    });

    $extractionRanges.on("change", function() {
        Log.debug('$extractionRanges.on("change")');
        let extractionRange = parseInt($(this).val());
        triggerSettings.extractionRange = extractionRange;
        Log.debug("triggerSettings.extractionRange : " + triggerSettings.extractionRange);

        if (extractionRange === TRIGGER_EXTRANGE_ALLDATA) {
            $lifeSettingsCheckBox.prop("checked", true);
            $p12DeleteCheckBox.prop("checked", true);
            $defeatConditionCheckBox.prop("checked", true);
            $victoryConditionCheckBox.prop("checked", true);
            $allianceSettingsCheckBox.prop("checked", true);
            $shareVisionSettingsCheckBox.prop("checked", true);
            $levelStartConditionCheckBox.prop("checked", true);
            $reviveConditionCheckBox.prop("checked", true);
            $hyperTriggerCheckBox.prop("checked", true);

            triggerSettings.includeLifeSettings = true;
            triggerSettings.includeP12Delete = true;
            triggerSettings.includeDefeatCondition = true;
            triggerSettings.includeVictoryCondition = true;
            triggerSettings.includeAllianceSettings = true;
            triggerSettings.includeShareVisionSettings = true;
            triggerSettings.includeLevelStartCondition = true;
            triggerSettings.includeReviveCondition = true;
            triggerSettings.includeHyperTrigger = true;
        }
        else if (extractionRange === TRIGGER_EXTRANGE_ALLPATTERNS || extractionRange === TRIGGER_EXTRANGE_CURRENTPATTERN) {
            $lifeSettingsCheckBox.prop("checked", false);
            $p12DeleteCheckBox.prop("checked", false);
            $defeatConditionCheckBox.prop("checked", false);
            $victoryConditionCheckBox.prop("checked", false);
            $allianceSettingsCheckBox.prop("checked", true);
            $shareVisionSettingsCheckBox.prop("checked", true);
            $levelStartConditionCheckBox.prop("checked", true);
            $reviveConditionCheckBox.prop("checked", true);
            $hyperTriggerCheckBox.prop("checked", true);

            triggerSettings.includeLifeSettings = false;
            triggerSettings.includeP12Delete = false;
            triggerSettings.includeDefeatCondition = false;
            triggerSettings.includeVictoryCondition = false;
            triggerSettings.includeAllianceSettings = true;
            triggerSettings.includeShareVisionSettings = true;
            triggerSettings.includeLevelStartCondition = true;
            triggerSettings.includeReviveCondition = true;
            triggerSettings.includeHyperTrigger = true;
        }
    });

    $computerPlayers.on("change", function() {
        Log.debug('$computerPlayers.on("change")');
        let computerPlayer = $(this).val();
        triggerSettings.computerPlayer = computerPlayer;
        Log.debug("triggerSettings.computerPlayer : " + triggerSettings.computerPlayer);
    });

    $userForces.on("change", function() {
        Log.debug('$userForces.on("change")');
        let userForce = $(this).val();
        triggerSettings.userForce = userForce;
        Log.debug("triggerSettings.userForce : " + triggerSettings.userForce);
    });

    $userForceNameInput.on("change", function() {
        Log.debug('$userForceNameInput.on("change")');
        let userForceName = $(this).val();
        triggerSettings.userForceName = userForceName;
        Log.debug("triggerSettings.userForceName : " + triggerSettings.userForceName);
    });

    $boundingUnits.on("change", function() {
        Log.debug('$boundingUnits.on("change")');
        let boundingUnit = $(this).val();
        triggerSettings.boundingUnit = boundingUnit;
        Log.debug("triggerSettings.boundingUnit : " + triggerSettings.boundingUnit);
    });

    $boundingUnitInvincibleSettings.on("change", function() {
        Log.debug('$boundingUnitInvincibleSettings.on("change")');
        let boundingUnitInvincibleSettings = $(this).val();
        triggerSettings.boundingUnitInvincibleSettings = boundingUnitInvincibleSettings;
        Log.debug("triggerSettings.boundingUnitInvincibleSettings : " + triggerSettings.boundingUnitInvincibleSettings);
    });

    $p12DeleteMethods.on("change", function() {
        Log.debug('$p12DeleteMethods.on("change")');
        let p12DeleteMethod = $(this).val();
        triggerSettings.p12DeleteMethod = p12DeleteMethod;
        Log.debug("triggerSettings.p12DeleteMethod : " + triggerSettings.p12DeleteMethod);
    });

    $patternConditionUnits.on("change", function() {
        Log.debug('$patternConditionUnits.on("change")');
        let patternConditionUnit = $(this).val();
        triggerSettings.patternConditionUnit = patternConditionUnit;
        Log.debug("triggerSettings.patternConditionUnit : " + triggerSettings.patternConditionUnit);

        // NOTE : 만약 나중에 patternConditionUnit, turnConditionUnit에 중복된 선택지를 넣을 경우, 중복 선택시 다른 걸 강제로 변경하는 코드를 작성해야 함.
    });

    $turnConditionUnits.on("change", function() {
        Log.debug('$turnConditionUnits.on("change")');
        let turnConditionUnit = $(this).val();
        triggerSettings.turnConditionUnit = turnConditionUnit;
        Log.debug("triggerSettings.turnConditionUnit : " + triggerSettings.turnConditionUnit);

        // NOTE : 만약 나중에 patternConditionUnit, turnConditionUnit에 중복된 선택지를 넣을 경우, 중복 선택시 다른 걸 강제로 변경하는 코드를 작성해야 함.
    });

    $levelLocationHeaderInput.on("change", function() {
        Log.debug('$levelLocationHeaderInput.on("change")');
        let levelLocationHeader = $(this).val();
        triggerSettings.levelLocationHeader = levelLocationHeader;
        Log.debug("triggerSettings.levelLocationHeader : " + triggerSettings.levelLocationHeader);

        $levelLocationHeaderExample.text("예시 : " + levelLocationHeader + "1, " + levelLocationHeader + "2, " + levelLocationHeader + "3, ...");
    });

    $reviveLocationHeaderInput.on("change", function() {
        Log.debug('$reviveLocationHeaderInput.on("change")');
        let reviveLocationHeader = $(this).val();
        triggerSettings.reviveLocationHeader = reviveLocationHeader;
        Log.debug("triggerSettings.reviveLocationHeader : " + triggerSettings.reviveLocationHeader);
        
        $reviveLocationHeaderExample.text("예시 : " + reviveLocationHeader + "1, " + reviveLocationHeader + "2, " + reviveLocationHeader + "3, ...");
    });

    $victoryLocationInput.on("change", function() {
        Log.debug('$victoryLocationInput.on("change")');
        let victoryLocation = $(this).val();
        triggerSettings.victoryLocation = victoryLocation;
        Log.debug("triggerSettings.victoryLocation : " + triggerSettings.victoryLocation);
    });

    $lifeSettingsCheckBox.on("change", function() {
        Log.debug('$lifeSettingsCheckBox.on("change")');
        let includeLifeSettings = $(this).is(":checked");
        triggerSettings.includeLifeSettings = includeLifeSettings;
        Log.debug("triggerSettings.includeLifeSettings : " + triggerSettings.includeLifeSettings);
    });

    $p12DeleteCheckBox.on("change", function() {
        Log.debug('$p12DeleteCheckBox.on("change")');
        let includeP12Delete = $(this).is(":checked");
        triggerSettings.includeP12Delete = includeP12Delete;
        Log.debug("triggerSettings.includeP12Delete : " + triggerSettings.includeP12Delete);
    });

    $defeatConditionCheckBox.on("change", function() {
        Log.debug('$defeatConditionCheckBox.on("change")');
        let includeDefeatCondition = $(this).is(":checked");
        triggerSettings.includeDefeatCondition = includeDefeatCondition;
        Log.debug("triggerSettings.includeDefeatCondition : " + triggerSettings.includeDefeatCondition);
    });

    $victoryConditionCheckBox.on("change", function() {
        Log.debug('$victoryConditionCheckBox.on("change")');
        let includeVictoryCondition = $(this).is(":checked");
        triggerSettings.includeVictoryCondition = includeVictoryCondition;
        Log.debug("triggerSettings.includeVictoryCondition : " + triggerSettings.includeVictoryCondition);
    });

    $allianceSettingsCheckBox.on("change", function() {
        Log.debug('$allianceSettingsCheckBox.on("change")');
        let includeAllianceSettings = $(this).is(":checked");
        triggerSettings.includeAllianceSettings = includeAllianceSettings;
        Log.debug("triggerSettings.includeAllianceSettings : " + triggerSettings.includeAllianceSettings);
    });

    $shareVisionSettingsCheckBox.on("change", function() {
        Log.debug('$shareVisionSettingsCheckBox.on("change")');
        let includeShareVisionSettings = $(this).is(":checked");
        triggerSettings.includeShareVisionSettings = includeShareVisionSettings;
        Log.debug("triggerSettings.includeShareVisionSettings : " + triggerSettings.includeShareVisionSettings);
    });

    $levelStartConditionCheckBox.on("change", function() {
        Log.debug('$levelStartConditionCheckBox.on("change")');
        let includeLevelStartCondition = $(this).is(":checked");
        triggerSettings.includeLevelStartCondition = includeLevelStartCondition;
        Log.debug("triggerSettings.includeLevelStartCondition : " + triggerSettings.includeLevelStartCondition);
    });

    $reviveConditionCheckBox.on("change", function() {
        Log.debug('$reviveConditionCheckBox.on("change")');
        let includeReviveCondition = $(this).is(":checked");
        triggerSettings.includeReviveCondition = includeReviveCondition;
        Log.debug("triggerSettings.includeReviveCondition : " + triggerSettings.includeReviveCondition);
    });

    $hyperTriggerCheckBox.on("change", function() {
        Log.debug('$hyperTriggerCheckBox.on("change")');
        let includeHyperTrigger = $(this).is(":checked");
        triggerSettings.includeHyperTrigger = includeHyperTrigger;
        Log.debug("triggerSettings.includeHyperTrigger : " + triggerSettings.includeHyperTrigger);
    });

    // 출력 이벤트 처리
    $extractButton.on("click", function() {
        if (triggerSettings.mapName === "" || !triggerSettings.mapName) {
            let title = "트리거 출력";
            let message = "맵 이름을 입력해주세요.";
            Popup.alert(title, message);
            return;
        }
        let triggerText = HeaderElements.extractTrigger(triggerSettings);

        var currentTime = new Date();
        var year = currentTime.getFullYear();
        var month = currentTime.getMonth() + 1;
        var date = currentTime.getDate();
        var today = year + "" + ((month < 10) ? "0" + month : month) + "" + ((date < 10) ? "0" + date : date);

        let fileName = triggerSettings.mapName + "_" + triggerSettings.editorType + "_" + today + ".txt";
        FileHandler.download(triggerText, fileName, "text/plain");
        
        $dialog.dialog("close");
    });
};

HeaderElements.extractTrigger = function(triggerSettings) {
    var patternList;
    if (triggerSettings.extractionRange === TRIGGER_EXTRANGE_ALLDATA ||
        triggerSettings.extractionRange === TRIGGER_EXTRANGE_ALLPATTERNS) {
        patternList = Project.patternList;
    }
    else if (triggerSettings.extractionRange === TRIGGER_EXTRANGE_CURRENTPATTERN) {
        patternList = new Array();
        for (var i = 0; i < Project.patternList.length; i++) {
            if (i === Project.currentPatternIndex) patternList.push(Project.currentPattern);
            else patternList.push(null);
        }
    }

    // var mapName = triggerSettings.mapName;
    var lifeType = triggerSettings.lifeType;
    var lifeCount = triggerSettings.lifeCount;
    var editorType = triggerSettings.editorType;
    var bombPlayer = triggerSettings.computerPlayer;
    var userForce = triggerSettings.userForce;
    var userForceName = triggerSettings.userForceName;
    var boundingUnit = triggerSettings.boundingUnit;
    var boundingUnitInvincibleSettings = triggerSettings.boundingUnitInvincibleSettings;
    var p12DeleteMethod = triggerSettings.p12DeleteMethod;
    var levelLocationHeader = triggerSettings.levelLocationHeader;
    var reviveLocationHeader = triggerSettings.reviveLocationHeader;
    var victoryLocation = triggerSettings.victoryLocation;
    var patternConditionUnit = triggerSettings.patternConditionUnit;
    var turnConditionUnit = triggerSettings.turnConditionUnit;
    var result, triggerText = "";

    if (triggerSettings.includeLifeSettings) {
        result = TriggerHandler.getLifeSettingsTrigger(editorType, userForce, userForceName, lifeType, lifeCount);
        if (result) triggerText += result;
    }

    if (triggerSettings.includeP12Delete) {
        result = TriggerHandler.getP12DeleteTrigger(editorType, bombPlayer, p12DeleteMethod);
        if (result) triggerText += result;
    }

    if (triggerSettings.includeDefeatCondition && triggerSettings.lifeType === TRIGGER_LIFETYPE_LIFE) {
        result = TriggerHandler.getDefeatTrigger(editorType, userForce, userForceName, boundingUnit);
        if (result) triggerText += result;
    }

    if (triggerSettings.includeVictoryCondition) {
        result = TriggerHandler.getVictoryTrigger(editorType, userForce, userForceName, victoryLocation);
        if (result) triggerText += result;
    }

    if (triggerSettings.includeAllianceSettings) {
        result = TriggerHandler.getAllianceTrigger(editorType);
        if (result) triggerText += result;
    }

    if (triggerSettings.includeShareVisionSettings) {
        result = TriggerHandler.getShareVisionTrigger(editorType, userForce, userForceName, bombPlayer);
        if (result) triggerText += result;
    }

    if (triggerSettings.includeLevelStartCondition) {
        result = TriggerHandler.getLevelStartConditionTriggers(editorType, patternList, userForce, userForceName, bombPlayer, levelLocationHeader, patternConditionUnit, turnConditionUnit);
        if (result) triggerText += result;
    }
    
    if (triggerSettings.includeReviveCondition) {
        result = TriggerHandler.getReviveConditionTriggers(editorType, patternList, userForce, userForceName, bombPlayer, reviveLocationHeader, patternConditionUnit, boundingUnit, lifeType, boundingUnitInvincibleSettings);
        if (result) triggerText += result;
    }
    
    result = TriggerHandler.parsePatternList(editorType, patternList, bombPlayer, patternConditionUnit, turnConditionUnit);
    if (result) triggerText += result;
    
    if (triggerSettings.includeHyperTrigger) {
        result = TriggerHandler.getHyperTriggers(editorType);
        if (result) triggerText += result;
    }

    return triggerText;
};

HeaderElements.onProjectTypeChange = function() {
    updateProjectPrivacy($(this).is(":checked"));
};