const UNITSIZE_UNKNOWN = -1;

const NOTATION_UNCLEAR = "(U)";

// Race
const RACE_NONE = "None";
const RACE_ZERG = "Zerg";
const RACE_TERRAN = "Terran";
const RACE_PROTOSS = "Protoss";

// Type
const UNIT_TYPE_UNKNOWN = -1;
const UNIT_TYPE_GROUND = 1;
const UNIT_TYPE_AIR = 2;

// Bomb Units
const UNIT_ZERG_SCOURGE = "Zerg Scourge";
const UNIT_ZERG_OVERLORD = "Zerg Overlord";
const UNIT_ZERG_DEVOURER = "Zerg Devourer";
const UNIT_ZERG_MUTALISK = "Zerg Mutalisk";
const UNIT_ZERG_ULTRALISK = "Zerg Ultralisk";

const UNIT_TERRAN_SCV = "Terran SCV";
const UNIT_TERRAN_DROPSHIP = "Terran Dropship";
const UNIT_TERRAN_WRAITH = "Terran Wraith";
const UNIT_TERRAN_BATTLECRUISER = "Terran Battlecruiser";

const UNIT_PROTOSS_OBSERVER = "Protoss Observer";
const UNIT_PROTOSS_PROBE = "Protoss Probe";
const UNIT_PROTOSS_CORSAIR = "Protoss Corsair";
const UNIT_PROTOSS_ARBITER = "Protoss Arbiter";
const UNIT_PROTOSS_SCOUT = "Protoss Scout";
const UNIT_PROTOSS_ARCHON = "Protoss Archon";
const UNIT_PROTOSS_DARKARCHON = "Protoss Dark Archon";

// Block Units
const UNIT_TERRAN_MACHINESHOP = "Terran Machine Shop";
const UNIT_TERRAN_MACHINESHOP_UNCLEAR = UNIT_TERRAN_MACHINESHOP + NOTATION_UNCLEAR;
const UNIT_NEUTRAL_PSIEMITTER = "Psi Emitter";
const UNIT_NEUTRAL_PSIEMITTER_UNCLEAR = UNIT_NEUTRAL_PSIEMITTER + NOTATION_UNCLEAR;
const UNIT_NEUTRAL_KHALISCRYSTAL = "Khalis Crystal";
const UNIT_NEUTRAL_KHALISCRYSTAL_UNCLEAR = UNIT_NEUTRAL_KHALISCRYSTAL + NOTATION_UNCLEAR;
const UNIT_NEUTRAL_URAJCRYSTAL = "Uraj Crystal";
const UNIT_NEUTRAL_URAJCRYSTAL_UNCLEAR = UNIT_NEUTRAL_URAJCRYSTAL + NOTATION_UNCLEAR;
const UNIT_NEUTRAL_KHAYDARINCRYSTAL = "Khaydarin Crystal";
const UNIT_NEUTRAL_KHAYDARINCRYSTAL_UNCLEAR = UNIT_NEUTRAL_KHAYDARINCRYSTAL + NOTATION_UNCLEAR;
const UNIT_OTHER_BLOCKEXPLOSION1 = "Block Explosion 1x1";
const UNIT_OTHER_BLOCKEXPLOSION2 = "Block Explosion 2x2";

// Bound Units
const UNIT_ZERG_ZERGLING = "Zerg Zergling";
const UNIT_ZERG_DEVOURING_ONE = "Devouring One (Zergling)";
const UNIT_ZERG_HUNTER_KILLER = "Hunter Killer (Hydralisk)";

// Trigger Condition Units
const UNIT_NEUTRAL_FLAG = "Flag";
const UNIT_NEUTRAL_CAVE = "Cave";
const UNIT_NEUTRAL_CANTINA = "Cantina";
const UNIT_NEUTRAL_JUMPGATE = "Jump Gate";
const UNIT_NEUTRAL_RUINS = "Ruins";
const UNIT_NEUTRAL_MININGPLATFORM = "Mining Platform";

var Units = [
    // Bomb Units
    {
        name : UNIT_ZERG_SCOURGE,
        size : 1,
        race : RACE_ZERG,
        type : UNIT_TYPE_AIR
    },
    {
        name : UNIT_ZERG_OVERLORD,
        size : 2,
        race : RACE_ZERG,
        type : UNIT_TYPE_AIR
    },
    {
        name : UNIT_ZERG_DEVOURER,
        size : 2,
        race : RACE_ZERG,
        type : UNIT_TYPE_AIR
    },
    {
        name : UNIT_ZERG_MUTALISK,
        size : 2,
        race : RACE_ZERG,
        type : UNIT_TYPE_AIR
    },
    {
        name : UNIT_ZERG_ULTRALISK,
        size : 3,
        race : RACE_ZERG,
        type : UNIT_TYPE_GROUND
    },

    {
        name : UNIT_TERRAN_SCV,
        size : 1,
        race : RACE_TERRAN,
        type : UNIT_TYPE_GROUND
    },
    {
        name : UNIT_TERRAN_DROPSHIP,
        size : 2,
        race : RACE_TERRAN,
        type : UNIT_TYPE_AIR
    },
    {
        name : UNIT_TERRAN_WRAITH,
        size : 2,
        race : RACE_TERRAN,
        type : UNIT_TYPE_AIR
    },
    {
        name : UNIT_TERRAN_BATTLECRUISER,
        size : 3,
        race : RACE_TERRAN,
        type : UNIT_TYPE_AIR
    },
    
    {
        name : UNIT_PROTOSS_OBSERVER,
        size : 1,
        race : RACE_PROTOSS,
        type : UNIT_TYPE_AIR
    },
    {
        name : UNIT_PROTOSS_PROBE,
        size : 1,
        race : RACE_PROTOSS,
        type : UNIT_TYPE_GROUND
    },
    {
        name : UNIT_PROTOSS_CORSAIR,
        size : 2,
        race : RACE_PROTOSS,
        type : UNIT_TYPE_AIR
    },
    {
        name : UNIT_PROTOSS_ARBITER,
        size : 2,
        race : RACE_PROTOSS,
        type : UNIT_TYPE_AIR
    },
    {
        name : UNIT_PROTOSS_SCOUT,
        size : 2,
        race : RACE_PROTOSS,
        type : UNIT_TYPE_AIR
    },
    {
        name : UNIT_PROTOSS_ARCHON,
        size : 2,
        race : RACE_PROTOSS,
        type : UNIT_TYPE_GROUND
    },
    {
        name : UNIT_PROTOSS_DARKARCHON,
        size : 2,
        race : RACE_PROTOSS,
        type : UNIT_TYPE_GROUND
    },

    // Block Units
    {
        name : UNIT_TERRAN_MACHINESHOP,
        size : 2,
        race : RACE_TERRAN,
        type : UNIT_TYPE_GROUND
    },
    {
        name : UNIT_TERRAN_MACHINESHOP_UNCLEAR,
        size : 2,
        race : RACE_TERRAN,
        type : UNIT_TYPE_GROUND
    },
    {
        name : UNIT_NEUTRAL_PSIEMITTER,
        size : 1,
        race : RACE_NONE,
        type : UNIT_TYPE_GROUND
    },
    {
        name : UNIT_NEUTRAL_PSIEMITTER_UNCLEAR,
        size : 1,
        race : RACE_NONE,
        type : UNIT_TYPE_GROUND
    },
    {
        name : UNIT_NEUTRAL_KHALISCRYSTAL,
        size : 1,
        race : RACE_NONE,
        type : UNIT_TYPE_GROUND
    },
    {
        name : UNIT_NEUTRAL_KHALISCRYSTAL_UNCLEAR,
        size : 1,
        race : RACE_NONE,
        type : UNIT_TYPE_GROUND
    },
    {
        name : UNIT_NEUTRAL_URAJCRYSTAL,
        size : 1,
        race : RACE_NONE,
        type : UNIT_TYPE_GROUND
    },
    {
        name : UNIT_NEUTRAL_URAJCRYSTAL_UNCLEAR,
        size : 1,
        race : RACE_NONE,
        type : UNIT_TYPE_GROUND
    },
    {
        name : UNIT_NEUTRAL_KHAYDARINCRYSTAL,
        size : 1,
        race : RACE_NONE,
        type : UNIT_TYPE_GROUND
    },
    {
        name : UNIT_NEUTRAL_KHAYDARINCRYSTAL_UNCLEAR,
        size : 1,
        race : RACE_NONE,
        type : UNIT_TYPE_GROUND
    },

    // Bound Units
    {
        name : UNIT_ZERG_ZERGLING,
        size : 1,
        race : RACE_ZERG,
        type : UNIT_TYPE_GROUND
    },
    {
        name : UNIT_ZERG_DEVOURING_ONE,
        size : 1,
        race : RACE_ZERG,
        type : UNIT_TYPE_GROUND
    },
    {
        name : UNIT_ZERG_HUNTER_KILLER,
        size : 1,
        race : RACE_ZERG,
        type : UNIT_TYPE_GROUND
    },

    // Trigger Condition Units
    {
        name : UNIT_NEUTRAL_FLAG,
        size : 1,
        race : RACE_NONE,
        type : UNIT_TYPE_GROUND
    },
    {
        name : UNIT_NEUTRAL_CAVE,
        size : UNITSIZE_UNKNOWN,
        race : RACE_NONE,
        type : UNIT_TYPE_UNKNOWN
    },
    {
        name : UNIT_NEUTRAL_CANTINA,
        size : UNITSIZE_UNKNOWN,
        race : RACE_NONE,
        type : UNIT_TYPE_UNKNOWN
    },
    {
        name : UNIT_NEUTRAL_JUMPGATE,
        size : UNITSIZE_UNKNOWN,
        race : RACE_NONE,
        type : UNIT_TYPE_UNKNOWN
    },
    {
        name : UNIT_NEUTRAL_RUINS,
        size : UNITSIZE_UNKNOWN,
        race : RACE_NONE,
        type : UNIT_TYPE_UNKNOWN
    },
    {
        name : UNIT_NEUTRAL_MININGPLATFORM,
        size : UNITSIZE_UNKNOWN,
        race : RACE_NONE,
        type : UNIT_TYPE_UNKNOWN
    }
];