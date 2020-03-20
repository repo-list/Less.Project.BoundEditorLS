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

var TrigEdit = {
    conditionLineCount : 0,
    actionLineCount : 0,
    
    /*** TRIGGER ***/
    TriggerStart : function(player) {
        this.conditionLineCount = 0;
        this.actionLineCount = 0;
        // '{' 를 열기 떄문에 사용 후 TriggerEnd()로 끝나야함
        return "Trigger(\"" + player + "\"){\n";
    },
    
    TriggerEnd : function() {
        return "}\n\n//-----------------------------------------------------------------//\n\n";
    },
    
    /*** Label ***/
    Conditions : function() {
        return "Conditions:\n";
    },
    
    Actions : function() {
        return "\nActions:\n";
    },
    
    /*** Conditions ***/
    Accumulate : function(player, quantitymod, quantitynum, resource) {
        this.conditionLineCount++;
        return "\tAccumulate(\"" + player + "\", " + quantitymod + ", " + quantitynum + ", " + resource + ");\n";
    },

    Always : function() {
        this.conditionLineCount++;
        return "\tAlways();\n";
    },

    Bring : function(player, unit, location, quantitymod, quantitynum) {
        this.conditionLineCount++;
        return "\tBring(\"" + player + "\", \"" + unit + "\", \"" + location + "\", " + quantitymod + ", " + quantitynum + ");\n";
    },

    Command : function(player, unit, quantitymod, quantitynum) {
        this.conditionLineCount++;
        return "\tCommand(\"" + player + "\", \"" + unit + "\", " + quantitymod + ", " + quantitynum + ");\n";
    },

    Deaths : function(player, unit, quantitymod, quantitynum) {
        this.conditionLineCount++;
        return "\tDeaths(\"" + player + "\", \"" + unit + "\", " + quantitymod + ", " + quantitynum + ");\n";
    },

    Score : function(player, scoreType, quantitymod, quantitynum) {
        this.conditionLineCount++;
        return "\tScore(\"" + player + "\", " + scoreType + ", " + quantitymod + ", " + quantitynum + ");\n";
    },

    Switch : function(num, status) {
        this.conditionLineCount++;
        return "\tSwitch(\"Switch" + num + "\", " + status + ");\n";
    },
    
    /*** Actions ***/
    Comment : function(text) {
        this.actionLineCount++;
        return "\tComment(\"" + text + "\");\n";
    },

    CreateUnit : function(player, unit, num, location) {
        this.actionLineCount++;
        return "\tCreate Unit(\"" + player + "\", \"" + unit + "\", " + num + ", \"" + location + "\");\n";
    },

    CreateUnitWithProperties : function(player, unit, num, location, properties) {
        /* properties
         * TE+와 달리 그냥 TE는 Properties에 대한 명확한 명시가 제대로 안되어 있음.
         * 따라서 필요에 따라 직접 확인하거나 아래 명시된 수치를 사용할 것
         * 3 - Invicible
         * 4 - Invicible & Hallucinated
         * 5 - Hallucinated
        */
        this.actionLineCount++;
        return "\tCreate Unit with Properties(\"" + player + "\", \"" + unit + "\", " + num + ", \"" + location + "\", " + properties + ");\n"; // 마지막 숫자 매개변수가 유닛의 상태이다.
    },
    
    CreateInvincibleUnit : function(player, unit, location) {
        /* 무적 상태 유닛을 1기 생산한다. */
        return this.CreateUnitWithProperties(player, unit, 1, location, 3);
    },

    Defeat : function() {
        this.actionLineCount++;
        return "\tDefeat();\n";
    },

    DisplayTextMessage : function(message) {
        this.actionLineCount++;
        return "\tDisplay Text Message(" + TE_DISPLAYTEXT_ALWAYS + ", \"" + message +  "\");\n";
    },

    KillUnit : function(player, unit) {
        this.actionLineCount++;
        return "\tKill Unit(\"" + player + "\", \"" + unit + "\");\n";
    },

    KillUnitAtLocation : function(player, unit, num, location) {
        this.actionLineCount++;
        return "\tKill Unit At Location(\"" + player + "\", \"" + unit + "\", " + num + ", \"" + location + "\");\n";
    },

    LeaderboardComputerPlayers : function(state) {
        this.actionLineCount++;
        return "\tLeaderboard Computer Players(" + state + ");\n";
    },

    LeaderboardPoints : function(label, scoreType) {
        this.actionLineCount++;
        return "\tLeader Board Points(\"" + label + "\", " + scoreType + ");\n";
    },
    
    PreserveTrigger : function() {
        this.actionLineCount++;
        return "\tPreserve Trigger();\n";
    },

    RemoveUnit : function(player, unit) {
        this.actionLineCount++;
        return "\tRemove Unit(\"" + player + "\", \"" + unit + "\");\n";
    },
    
    RemoveUnitAtLocation : function(player, unit, num, location) {
        this.actionLineCount++;
        return "\tRemove Unit At Location(\"" + player + "\", \"" + unit + "\", " + num + ", \"" + location + "\");\n";
    },

    /*
    SetInvincibility : function(player, unit, location, state) {
        this.actionLineCount++;
        return "\tSet Invincibility(\"" + player + "\", \"" + unit + "\", \"" + location + "\", " + state + ");\n";
    },
    */

    SetScore : function(player, modify, num, scoreType) {
        this.actionLineCount++;
        return "\tSet Score(\"" + player + "\", " + modify + ", " + num + ", " + scoreType + ");\n";
    },

    SetDeaths : function(player, unit, modify, num) {
        this.actionLineCount++;
        return "\tSet Deaths(\"" + player + "\", \"" + unit + "\", " + modify + ", " + num + ");\n";
    },

    SetResources : function(player, modify, num, resource) {
        this.actionLineCount++;
        return "\tSet Resources(\"" + player + "\", " + modify + ", " + num + ", " + resource + ");\n";
    },

    Victory : function() {
        this.actionLineCount++;
        return "\tVictory();\n";
    },
    
    Wait : function(duration) {
        this.actionLineCount++;
        return "\tWait(" + duration + ");\n";
    }
}