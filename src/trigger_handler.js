/* 
  @file: trigger_handler.js
  @author: joshow
  @brief: 패턴을 양식에 맞는 Trigger 코드로 변환한다.(텍스트 or 바이트 코드)
  @issue
    + TE 트리거 코드 출력 기능
     개발된 기능들
      - 폭탄 수가 총 31개 이하일 때 TE 트리거 출력 가능. 빈 패턴은 출력할 수 없음.
      - TE 상수, TETextCreator의 함수로 TE용 트리거 텍스트 코드 변환
     추가할 내용
      - 폭탄 터지는 옵션 처리
      - 장애물 처리
      - 64개가 넘어가는 트리거 세트 처리
      - TE 상수 추가 지속
      - TETextCreator 함수 추가 지속
*/

const TE_QUANTITYMOD_AT_MOST = "At most";
const TE_QUANTITYMOD_AT_LEAST = "At least";
const TE_QUANTITYMOD_EXACTLY = "Exactly";

const TE_RESOURCE_ORE = "ore";
const TE_RESOURCE_GAS = "gas";
const TE_RESOURCE_ORE_AND_GAS = "ore and gas";

const TE_SWITCHSTATUS_CLEARED = "cleared";
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
const TE_PLAYER_FORCE1 = "Force 1";
const TE_PLAYER_FORCE2 = "Force 2";
const TE_PLAYER_FORCE3 = "Force 3";
const TE_PLAYER_FORCE4 = "Force 4";

const TE_UNIT_MEN = "Men";
const TE_UNIT_FACTORIES = "Factories";
const TE_UNIT_BUILDINGS = "Buildings";
const TE_UNIT_ANY_UNIT = "Any unit";

const TE_ALL = "All";

function getPatternTETriggerText(pattern) {
    var locationListLength = pattern.locationList.length;
    var turnList = pattern.turnList;
    
    if (locationListLength == 0 || (turnList.length == 1 && turnList[0].cellList.length == 0)) {
        /* 로케이션이나 폭탄이 없으면 트리거를 작성하지 않는다. */
        return "";
    }
    
    // 폭탄 갯수를 파악해서 미리 트리거를 어떻게 나눌지 파악할 수 있을까?
    var bombCount = 0;   
    for (var turn of turnList) {
        for (var cell of turn.cellList) {
            bombCount += 1;
        }
    }
    
    var triggerText = "";
    //var triggerNum = 1;
    
    var creator = new TETextCreator();

    triggerText += creator.Trigger(TE_PLAYER_P7);
    triggerText += creator.Conditions();
    triggerText += creator.Switch(15, TE_SWITCHSTATUS_SET);
    if (bombCount >= 30) { 
        /* 폭탄의 갯수가 30개 이상이라면 조건을 통해 트리거를 나눈다 */
        triggerText += creator.Accumulate(TE_PLAYER_P7, TE_QUANTITYMOD_EXACTLY, 1, TE_RESOURCE_ORE);
    }
    triggerText += creator.Actions();
    
    var lineCount = 0;
    for (var turn of turnList) {
        for (var cell of turn.cellList) {
            triggerText += creator.CreateBomb(TE_PLAYER_P7, cell.unit, cell.location.label);
            triggerText += creator.KillUnitAtLocation(TE_PLAYER_ALL, TE_UNIT_MEN, TE_ALL, cell.location.label);
            lineCount += 2;
        }
        triggerText += creator.Wait(turn.wait);
        lineCount += 1;
    }
    
    triggerText += creator.PreserveTrigger();
    triggerText += creator.TriggerEnd();
    
    console.log(triggerText);
    return triggerText;
}


var TETextCreator = function() {
    
    /*** TRIGGER ***/
    this.Trigger = function(player) {
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
        return "\tSwitch(\"Switch" + num + "\", set);\n";
    }
    
    this.Accumulate = function(player, quantitymod, quantitynum, resource) {
        return "Accumulate(\"" + player + "\", " + quantitymod + ", " + quantitynum + ", " + resource + ");\n";
    }
    
    /*** Actions ***/
    this.CreateUnitWithProperties = function(player, unit, num, location, properties) {
        return "\tCreate Unit with Properties(\"" + player + "\", \"" + unit + "\", " + num + ", \"" + location + "\", " + properties + ");\n"; // 마지막 숫자 매개변수가 유닛의 상태이다.
    }
    
    this.CreateBomb = function(player, unit, location) {
        return this.CreateUnitWithProperties(player, unit, 1, location, 1);
    }

    this.KillUnitAtLocation = function(player, unit, num, location) {
        return "\tKill Unit At Location(\"" + player + "\", \"" + unit + "\", " + num + ", \"" + location + "\");\n";
    }
    
    this.PreserveTrigger = function() {
        return "\tPreserve Trigger();\n";
    }
    
    this.Wait = function(duration) {
        return "\tWait(" + duration + ");\n";
    }
}
