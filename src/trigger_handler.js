/*
 * @ name: trigger_handler.js
 * @ version: 0.1.1
 * @ author: joshow
 * @ brief: 폭탄피하기 패턴을 특정 포맷에 맞는 트리거 코드로 변환한다.
 * @ detail
 *   trigger_handler.js는 BoundEditorLS에서 취급하는 BoundPattern 객체를 특정 포맷에 맞는 트리거 코드로 변환시킨다.
 *   SCM Draft 2의 플러그인인 'TE'와 'TE+' 포맷에 맞는 텍스트 코드 변환과 '.scx' 같은 스타크래프트 맵 파일에 직접 트리거 바이너리 코드를 삽입하는 기능 구현까지 목표로 하고 있다.
 *   추가로 BoundEditorLS 내에서 패턴 외의 간단한 트리거 편집 기능 추가도 고려하고 있다.
 *   
 *   0.1.1v - 2020.03.18
 *    - 0.1.1v 은 TE 트리거 변환만 지원한다.
 *    - getPatternTETriggerText()를 호출하여 BoundPattern 객체를 TE 트리거 코드로(String) 반환한다.
 *    - 플레이어는 Player7, 조건은  Switch15와 1 이상의 미네랄로 고정되어있다. 차후 수정될 예정이다.
 *    - TE 에서 취급하는 문자열 상수들이 정의되어 있다.
 *    - TETextCreator 객체를 통해 TE 트리거 함수를 호출하듯 트리거 코드를 작성할 수 있다.
 *    - TE 함수를 호출할 때는 아래와 같은 순서대로 작성해야 올바른 트리거 코드를 얻을 수 있다.
        < Trigger() - Conditions() - {조건들} - Actions() - {액션들} - TriggerEnd() > 
 *    - 또한 conditionLineCount와 actionLineCount가 최대치를 넘지 않도록 유의하여 작성하여야 한다.
 *    - 0.1.1v 에서는 구현하면서 꼭 필요했던 상수들과 함수들만 추가하였으나 그 외의 것이 필요하다면 TE와 동일한 양식으로 추가하면 된다.
 *    - 기본 기능 테스트는 전부 마쳤지만 그 외 많은 테스트를 수행하지 못했기에 문제가 발생할 여지가 있다.
*/

const TE_QUANTITYMOD_AT_MOST = "At most";
const TE_QUANTITYMOD_AT_LEAST = "At least";
const TE_QUANTITYMOD_EXACTLY = "Exactly";

const TE_RESOURCE_ORE = "ore";
const TE_RESOURCE_GAS = "gas";
const TE_RESOURCE_ORE_AND_GAS = "ore and gas";

const TE_SWITCHSTATUS_CLEARED = "not set";
const TE_SWITCHSTATUS_SET = "set";

const TE_PLAYER_P1 = "Player 1";
const TE_PLAYER_P2 = "Player 2";
const TE_PLAYER_P3 = "Player 3";
const TE_PLAYER_P4 = "Player 4";
const TE_PLAYER_P5 = "Player 5";
const TE_PLAYER_P6 = "Player 6";
const TE_PLAYER_P7 = "Player 7";
const TE_PLAYER_P8 = "Player 8";
const TE_PLAYER_ALL = "All Players";
const TE_PLAYER_CURRENT = "Current Player";

const TE_UNIT_MEN = "Men";
const TE_UNIT_FACTORIES = "Factories";
const TE_UNIT_BUILDINGS = "Buildings";
const TE_UNIT_ANY_UNIT = "Any unit";

const TE_ALL = "All"; // 갯수 셀 때 전부를 의미

const TE_STATE_DISABLE = "disabled";
const TE_STATE_ENABLE = "enabled";
const TE_STATE_TOGGLE = "toggle";

const TE_MODIFY_ADD = "Add";
const TE_MODIFY_SET_TO = "Set To";
const TE_MODIFY_SUBTRACT = "Subtract";


function getPatternTETriggerText(pattern) {
    var locationListLength = pattern.locationList.length;
    var turnList = pattern.turnList;
    
    if (locationListLength == 0 || (turnList.length == 1 && turnList[0].cellList.length == 0)) {
        /* 로케이션이나 폭탄이 없으면 트리거를 작성하지 않는다. */
        return null;
    }
    
    // 폭탄 갯수를 파악해서 미리 트리거를 어떻게 나눌지 파악할 수 있을까?
    var bombCount = 0;   
    for (var turn of turnList) {
        for (var cell of turn.cellList) {
            bombCount += 1;
        }
    }
    
    
    var creator = new TETextCreator();
    var triggerText = "";
    var triggerConditionCount = 1;

    triggerText += creator.Trigger(TE_PLAYER_P7);
    triggerText += creator.Conditions();
    triggerText += creator.Switch(15, TE_SWITCHSTATUS_SET);

    if (bombCount >= 30) { 
        /* 폭탄의 갯수가 30개 이상이라면 조건을 통해 트리거를 나눈다. */
        triggerText += creator.Accumulate(TE_PLAYER_P7, TE_QUANTITYMOD_EXACTLY, 1, TE_RESOURCE_ORE);
    }

    triggerText += creator.Actions();
    
    turnList.forEach(function(turn, i, turns) {
        
        for (var cell of turn.cellList) {
            // type - 1 : 폭탄 Cell, 2 : 장애물 생성 Cell, 3 : 장애물 삭제 Cell
            // option - 1 : 유닛 Kill, 2 : 유닛 Remove, 3 : 유닛 생존, 4 : 장애물 Kill, 5: 장애물 Remove
            // option은 type 2,3 일 때만 의미를 가지며 type 1일 때의 값은 0 이다.
            // Remove와 kill 순서가 꼬여서 문제가 발생 가능성 있음. 일단 다 작성하고 확인
            if (cell.type == 1) { 
                triggerText += creator.CreateBomb(TE_PLAYER_P7, cell.unit, cell.location.label);
                triggerText += creator.KillUnitAtLocation(TE_PLAYER_ALL, TE_UNIT_MEN, TE_ALL, cell.location.label);
            }
            else if (cell.type == 2) {
                if (cell.option == 1)
                    triggerText += creator.KillUnitAtLocation(TE_PLAYER_ALL, TE_UNIT_MEN, TE_ALL, cell.location.label);
                else if (cell.option == 2)
                    triggerText += creator.RemoveUnitAtLocation(TE_PLAYER_ALL, TE_UNIT_MEN, TE_ALL, cell.location.label);
                
                // 장애물 생성
                triggerText += creator.CreateBomb(TE_PLAYER_P7, cell.unit, cell.location.label);
                
            }
            else if (cell.type == 3) {
                if (cell.option == 4)
                    triggerText += creator.KillUnitAtLocation(TE_PLAYER_ALL, cell.unit, 1, cell.location.label);
                else if (cell.option == 5)
                    triggerText += creator.RemoveUnitAtLocation(TE_PLAYER_ALL, cell.unit, 1, cell.location.label);
            }
            else console.error("Unknown type BoundTurncell");
            
            if (creator.actionLineCount > 60) {
                triggerConditionCount++;
                triggerText += creator.SetResources(TE_PLAYER_P7, "Set To", triggerConditionCount, TE_RESOURCE_ORE);    
                triggerText += creator.PreserveTrigger();
    				    triggerText += creator.TriggerEnd();
                

                triggerText += creator.Trigger(TE_PLAYER_P7);
				        triggerText += creator.Conditions();
			    	    triggerText += creator.Switch(15, TE_SWITCHSTATUS_SET);
                if (bombCount >= 30) { 
                    // 뭔가 찝찝한 조건. 나중에 고치자.
                    triggerText += creator.Accumulate(TE_PLAYER_P7, TE_QUANTITYMOD_EXACTLY, triggerConditionCount, TE_RESOURCE_ORE);
                }
                triggerText += creator.Actions();
            }
        }
        triggerText += creator.Wait(turn.wait);
        
        /* 더 출력할 액션이 있는지 확인하고 있다면 새 트리거 폼을 만든다 */
        if (i + 1 < turns.length) {
            if ((creator.actionLineCount + turns[i + 1].cellList.length * 2) > 60) { 
                triggerConditionCount++;
                triggerText += creator.SetResources(TE_PLAYER_P7, TE_MODIFY_SET_TO, triggerConditionCount, TE_RESOURCE_ORE);
                triggerText += creator.PreserveTrigger();
    				    triggerText += creator.TriggerEnd();
                
                triggerText += creator.Trigger(TE_PLAYER_P7);
				        triggerText += creator.Conditions();
			    	    triggerText += creator.Switch(15, TE_SWITCHSTATUS_SET);
                triggerText += creator.Accumulate(TE_PLAYER_P7, TE_QUANTITYMOD_EXACTLY, triggerConditionCount, TE_RESOURCE_ORE);
                triggerText += creator.Actions();
            }
            
            return true; // is continue loop
        }
    });
    
    if (triggerConditionCount > 1) {
        triggerText += creator.SetResources(TE_PLAYER_P7, TE_MODIFY_SET_TO, 1, TE_RESOURCE_ORE);
    }
    
    triggerText += creator.PreserveTrigger();
    triggerText += creator.TriggerEnd();
    
    console.log(triggerText);
    return triggerText;
}


var TETextCreator = function() {
    this.conditionLineCount = 0;
    this.actionLineCount = 0;
    
    /*** TRIGGER ***/
    this.Trigger = function(player) {
        this.conditionLineCount = 0;
        this.actionLineCount = 0;
        // '{' 를 열기 떄문에 사용 후 TriggerEnd()로 끝나야함
        return "Trigger(\"" + player + "\"){\n";
    }
    
    this.TriggerEnd = function() {
        return "}\n\n//-----------------------------------------------------------------//\n\n";
    }
    
    /*** Label ***/
    this.Conditions = function() {
        return "Conditions:\n";
    }
    
    this.Actions = function() {
        return "\nActions:\n";
    }
    
    /*** Conditions ***/
    this.Switch = function(num) {
        this.conditionLineCount++;
        return "\tSwitch(\"Switch" + num + "\", set);\n";
    }
    
    this.Accumulate = function(player, quantitymod, quantitynum, resource) {
        this.conditionLineCount
        return "\tAccumulate(\"" + player + "\", " + quantitymod + ", " + quantitynum + ", " + resource + ");\n";
    }
    
    /*** Actions ***/
    this.CreateUnitWithProperties = function(player, unit, num, location, properties) {
        /* properties
         * TE+와 달리 그냥 TE는 Properties에 대한 명확한 명시가 제대로 안되어 있음.
         * 따라서 필요에 따라 직접 확인하거나 아래 명시된 수치를 사용할 것
         * 3 - Invicible
         * 4 - Invicible & Hallucinated
         * 5 - Hallucinated
        */
        this.actionLineCount++;
        return "\tCreate Unit with Properties(\"" + player + "\", \"" + unit + "\", " + num + ", \"" + location + "\", " + properties + ");\n"; // 마지막 숫자 매개변수가 유닛의 상태이다.
    }
    
    this.CreateBomb = function(player, unit, location) {
        /* CreateBomb()은 무적 상태 유닛을 1기를 생산한다. */
        return this.CreateUnitWithProperties(player, unit, 1, location, 3);
    }

    this.KillUnitAtLocation = function(player, unit, num, location) {
        this.actionLineCount++;
        return "\tKill Unit At Location(\"" + player + "\", \"" + unit + "\", " + num + ", \"" + location + "\");\n";
    }
    
    this.PreserveTrigger = function() {
        this.actionLineCount++;
        return "\tPreserve Trigger();\n";
    }
    
    this.RemoveUnitAtLocation = function(player, unit, num, location) {
        this.actionLineCount++;
        return "\tRemove Unit At Location(\"" + player + "\", \"" + unit + "\", " + num + ", \"" + location + "\");\n";
    }
    /*
    this.SetInvincibility = function(player, unit, location, state) {
        this.actionLineCount++;
        return "\tSet Invincibility(\"" + player + "\", \"" + unit + "\", \"" + location + "\", " + state + ");\n";
    }
    */
    this.SetResources = function(player, modify, num, resource) {
        this.actionLineCount++;
        return "\tSet Resources(\"" + player + "\", " + modify + ", " + num + ", " + resource + ");\n";
    }
    
    this.Wait = function(duration) {
        this.actionLineCount++;
        return "\tWait(" + duration + ");\n";
    }
}
