const TE_QUANTITYMOD_AT_MOST = "At most";
const TE_QUANTITYMOD_AT_LEAST = "At least";
const TE_QUANTITYMOD_EXACTLY = "Exactly";

const TE_RESOURCE_ORE = "ore";
const TE_RESOURCE_GAS = "gas";
const TE_RESOURCE_ORE_AND_GAS = "ore and gas";

const TE_SWITCHSTATUS_CLEARED = "Not Set";
const TE_SWITCHSTATUS_SET = "Set";

const TE_PLAYER_P1 = "Player 1";
const TE_PLAYER_P2 = "Player 2";
const TE_PLAYER_P3 = "Player 3";
const TE_PLAYER_P4 = "Player 4";
const TE_PLAYER_P5 = "Player 5";
const TE_PLAYER_P6 = "Player 6";
const TE_PLAYER_P7 = "Player 7";
const TE_PLAYER_P8 = "Player 8";
const TE_PLAYER_P12 = "Player 12";
const TE_PLAYER_FORCE1 = "Force 1";
const TE_PLAYER_FORCE2 = "Force 2";
const TE_PLAYER_FORCE3 = "Force 3";
const TE_PLAYER_FORCE4 = "Force 4";
const TE_PLAYER_ALL = "All Players";
const TE_PLAYER_CURRENT = "Current Player";

const TE_UNIT_MEN = "Men";
const TE_UNIT_FACTORIES = "Factories";
const TE_UNIT_BUILDINGS = "Buildings";
const TE_UNIT_ANY_UNIT = "Any unit";

const TE_ALL = "All"; // 갯수 셀 때 전부를 의미

const TE_DISPLAYTEXT_ALWAYS = "Always Display";

const TE_STATE_DISABLE = "disabled";
const TE_STATE_ENABLE = "enabled";
const TE_STATE_TOGGLE = "toggle";

const TE_MODIFY_ADD = "Add";
const TE_MODIFY_SET_TO = "Set To";
const TE_MODIFY_SUBTRACT = "Subtract";

const TE_SCORETYPE_TOTAL = "Total";
const TE_SCORETYPE_UNITS = "Units";
const TE_SCORETYPE_BUILDINGS = "Buildings";
const TE_SCORETYPE_UNITSANDBUILDINGS = "Units and buildings";
const TE_SCORETYPE_KILLS = "Kills";
const TE_SCORETYPE_RAZINGS = "Razings";
const TE_SCORETYPE_KILLSANDRAZINGS = "Kills and razings";
const TE_SCORETYPE_CUSTOM = "Custom";

const TE_ALLIANCESTATUS_ALLY = "Ally";
const TE_ALLIANCESTATUS_ALLIEDVICTORY = "Allied Victory";
const TE_ALLIANCESTATUS_ENEMY = "Enemy";

var TrigEdit = {
    conditionLineCount : 0,
    actionLineCount : 0,
    
    /*** TRIGGER ***/
    TriggerStart : function(player) {
        this.conditionLineCount = 0;
        this.actionLineCount = 0;
        // '{' 를 열기 떄문에 사용 후 TriggerEnd()로 끝나야함
        return "Trigger(\"" + player + "\"){\r\n";
    },
    
    TriggerEnd : function() {
        return "}\r\n\r\n//-----------------------------------------------------------------//\r\n\r\n";
    },
    
    /*** Label ***/
    Conditions : function() {
        return "Conditions:\r\n";
    },
    
    Actions : function() {
        return "\r\nActions:\r\n";
    },
    
    /*** Conditions ***/
    Accumulate : function(player, quantitymod, quantitynum, resource) {
        this.conditionLineCount++;
        return "\tAccumulate(\"" + player + "\", " + quantitymod + ", " + quantitynum + ", " + resource + ");\r\n";
    },

    Always : function() {
        this.conditionLineCount++;
        return "\tAlways();\r\n";
    },

    Bring : function(player, unit, location, quantitymod, quantitynum) {
        this.conditionLineCount++;
        return "\tBring(\"" + player + "\", \"" + unit + "\", \"" + location + "\", " + quantitymod + ", " + quantitynum + ");\r\n";
    },

    Command : function(player, unit, quantitymod, quantitynum) {
        this.conditionLineCount++;
        return "\tCommand(\"" + player + "\", \"" + unit + "\", " + quantitymod + ", " + quantitynum + ");\r\n";
    },

    Deaths : function(player, unit, quantitymod, quantitynum) {
        this.conditionLineCount++;
        return "\tDeaths(\"" + player + "\", \"" + unit + "\", " + quantitymod + ", " + quantitynum + ");\r\n";
    },

    Score : function(player, scoreType, quantitymod, quantitynum) {
        this.conditionLineCount++;
        return "\tScore(\"" + player + "\", " + scoreType + ", " + quantitymod + ", " + quantitynum + ");\r\n";
    },

    Switch : function(num, status) {
        this.conditionLineCount++;
        return "\tSwitch(\"Switch" + num + "\", " + status + ");\r\n";
    },
    
    /*** Actions ***/
    Comment : function(text) {
        this.actionLineCount++;
        return "\tComment(\"" + text + "\");\r\n";
    },

    CreateUnit : function(player, unit, num, location) {
        this.actionLineCount++;
        return "\tCreate Unit(\"" + player + "\", \"" + unit + "\", " + num + ", \"" + location + "\");\r\n";
    },

    CreateUnitWithProperties : function(player, unit, num, location, properties) {
        /* properties
         * TE에서는 이 값을 쓰더라도, 맵메이커가 직접 해당 맵에서 무적 설정을 한 번 이상 건드리지 않는 한 적용되지 않음. 따라서 의미 없는 수치.
         * 3 - Invicible
         * 4 - Invicible & Hallucinated
         * 5 - Hallucinated
        */
        this.actionLineCount++;
        return "\tCreate Unit with Properties(\"" + player + "\", \"" + unit + "\", " + num + ", \"" + location + "\", " + properties + ");\r\n";
    },

    Defeat : function() {
        this.actionLineCount++;
        return "\tDefeat();\r\n";
    },

    DisplayTextMessage : function(message) {
        this.actionLineCount++;
        return "\tDisplay Text Message(" + TE_DISPLAYTEXT_ALWAYS + ", \"" + message +  "\");\r\n";
    },

    KillUnit : function(player, unit) {
        this.actionLineCount++;
        return "\tKill Unit(\"" + player + "\", \"" + unit + "\");\r\n";
    },

    KillUnitAtLocation : function(player, unit, num, location) {
        this.actionLineCount++;
        return "\tKill Unit At Location(\"" + player + "\", \"" + unit + "\", " + num + ", \"" + location + "\");\r\n";
    },

    LeaderboardComputerPlayers : function(state) {
        this.actionLineCount++;
        return "\tLeaderboard Computer Players(" + state + ");\r\n";
    },

    LeaderboardPoints : function(label, scoreType) {
        this.actionLineCount++;
        return "\tLeader Board Points(\"" + label + "\", " + scoreType + ");\r\n";
    },
    
    PreserveTrigger : function() {
        this.actionLineCount++;
        return "\tPreserve Trigger();\r\n";
    },

    RemoveUnit : function(player, unit) {
        this.actionLineCount++;
        return "\tRemove Unit(\"" + player + "\", \"" + unit + "\");\r\n";
    },
    
    RemoveUnitAtLocation : function(player, unit, num, location) {
        this.actionLineCount++;
        return "\tRemove Unit At Location(\"" + player + "\", \"" + unit + "\", " + num + ", \"" + location + "\");\r\n";
    },

    SetAllianceStatus : function(player, status) {
        this.actionLineCount++;
        return "\tSet Alliance Status(\"" + player + "\", " + status + ");\r\n";
    },

    /*
    SetInvincibility : function(player, unit, location, state) {
        this.actionLineCount++;
        return "\tSet Invincibility(\"" + player + "\", \"" + unit + "\", \"" + location + "\", " + state + ");\r\n";
    },
    */

    SetScore : function(player, modify, num, scoreType) {
        this.actionLineCount++;
        return "\tSet Score(\"" + player + "\", " + modify + ", " + num + ", " + scoreType + ");\r\n";
    },

    SetDeaths : function(player, unit, modify, num) {
        this.actionLineCount++;
        return "\tSet Deaths(\"" + player + "\", \"" + unit + "\", " + modify + ", " + num + ");\r\n";
    },

    SetResources : function(player, modify, num, resource) {
        this.actionLineCount++;
        return "\tSet Resources(\"" + player + "\", " + modify + ", " + num + ", " + resource + ");\r\n";
    },

    Victory : function() {
        this.actionLineCount++;
        return "\tVictory();\r\n";
    },
    
    Wait : function(duration) {
        this.actionLineCount++;
        return "\tWait(" + duration + ");\r\n";
    }
}