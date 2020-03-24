function loadProjectImage(src) {
    var image = new Image();
    image.src = src;

    return image;
}

function loadProjectSound(src) {
    var sound = new Audio();
    sound.src = src;

    return sound;
}

var Resource = {
    unit : {
        statics : [
            // Bomb Images
            {
                name : UNIT_ZERG_SCOURGE,
                image : loadProjectImage("res/unit/statics/Zerg Scourge.png")
            },
            {
                name : UNIT_ZERG_OVERLORD,
                image : loadProjectImage("res/unit/statics/Zerg Overlord.png")
            },
            {
                name : UNIT_TERRAN_BATTLECRUISER,
                image : loadProjectImage("res/unit/statics/Terran Battlecruiser.png")
            },
    
            // Block Images
            {
                name : UNIT_TERRAN_MACHINESHOP,
                image : loadProjectImage("res/unit/statics/Terran Machine Shop.png")
            },
            {
                name : UNIT_TERRAN_MACHINESHOP_UNCLEAR,
                image : loadProjectImage("res/unit/statics/Terran Machine Shop(U).png")
            },
            {
                name : UNIT_NEUTRAL_PSIEMITTER,
                image : loadProjectImage("res/unit/statics/Psi Emitter.png")
            },
            {
                name : UNIT_NEUTRAL_PSIEMITTER_UNCLEAR,
                image : loadProjectImage("res/unit/statics/Psi Emitter(U).png")
            },
            {
                name : UNIT_NEUTRAL_KHALISCRYSTAL,
                image : loadProjectImage("res/unit/statics/Khalis Crystal.png")
            },
            {
                name : UNIT_NEUTRAL_KHALISCRYSTAL_UNCLEAR,
                image : loadProjectImage("res/unit/statics/Khalis Crystal(U).png")
            },
            {
                name : UNIT_NEUTRAL_URAJCRYSTAL,
                image : loadProjectImage("res/unit/statics/Uraj Crystal.png")
            },
            {
                name : UNIT_NEUTRAL_URAJCRYSTAL_UNCLEAR,
                image : loadProjectImage("res/unit/statics/Uraj Crystal(U).png")
            },
            {
                name : UNIT_NEUTRAL_KHAYDARINCRYSTAL,
                image : loadProjectImage("res/unit/statics/Khaydarin Crystal.png")
            },
            {
                name : UNIT_NEUTRAL_KHAYDARINCRYSTAL_UNCLEAR,
                image : loadProjectImage("res/unit/statics/Khaydarin Crystal(U).png")
            },
            {
                name : UNIT_OTHER_BLOCKEXPLOSION1,
                image : loadProjectImage("res/unit/statics/Block Explosion 1x1.png")
            },
            {
                name : UNIT_OTHER_BLOCKEXPLOSION2,
                image : loadProjectImage("res/unit/statics/Block Explosion 2x2.png")
            }
        ],

        staticsHQ : [
            // Bomb Images
            {
                name : UNIT_ZERG_SCOURGE,
                image : loadProjectImage("res/unit/statics_hq/Zerg Scourge.png")
            },
            {
                name : UNIT_ZERG_OVERLORD,
                image : loadProjectImage("res/unit/statics_hq/Zerg Overlord.png")
            },
            {
                name : UNIT_TERRAN_BATTLECRUISER,
                image : loadProjectImage("res/unit/statics_hq/Terran Battlecruiser.png")
            },
    
            // Block Images
            {
                name : UNIT_TERRAN_MACHINESHOP,
                image : loadProjectImage("res/unit/statics_hq/Terran Machine Shop.png")
            },
            {
                name : UNIT_TERRAN_MACHINESHOP_UNCLEAR,
                image : loadProjectImage("res/unit/statics_hq/Terran Machine Shop(U).png")
            },
            {
                name : UNIT_NEUTRAL_PSIEMITTER,
                image : loadProjectImage("res/unit/statics_hq/Psi Emitter.png")
            },
            {
                name : UNIT_NEUTRAL_PSIEMITTER_UNCLEAR,
                image : loadProjectImage("res/unit/statics_hq/Psi Emitter(U).png")
            },
            {
                name : UNIT_NEUTRAL_KHALISCRYSTAL,
                image : loadProjectImage("res/unit/statics_hq/Khalis Crystal.png")
            },
            {
                name : UNIT_NEUTRAL_KHALISCRYSTAL_UNCLEAR,
                image : loadProjectImage("res/unit/statics_hq/Khalis Crystal(U).png")
            },
            {
                name : UNIT_NEUTRAL_URAJCRYSTAL,
                image : loadProjectImage("res/unit/statics_hq/Uraj Crystal.png")
            },
            {
                name : UNIT_NEUTRAL_URAJCRYSTAL_UNCLEAR,
                image : loadProjectImage("res/unit/statics_hq/Uraj Crystal(U).png")
            },
            {
                name : UNIT_NEUTRAL_KHAYDARINCRYSTAL,
                image : loadProjectImage("res/unit/statics_hq/Khaydarin Crystal.png")
            },
            {
                name : UNIT_NEUTRAL_KHAYDARINCRYSTAL_UNCLEAR,
                image : loadProjectImage("res/unit/statics_hq/Khaydarin Crystal(U).png")
            },
            {
                name : UNIT_OTHER_BLOCKEXPLOSION1,
                image : loadProjectImage("res/unit/statics_hq/Block Explosion 1x1.png")
            },
            {
                name : UNIT_OTHER_BLOCKEXPLOSION2,
                image : loadProjectImage("res/unit/statics_hq/Block Explosion 2x2.png")
            }
        ],

        killSprites : [
            // Bomb Sprites
            {
                name : UNIT_ZERG_SCOURGE,
                sprite : [
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_01.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_02.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_03.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_04.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_05.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_06.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_07.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_08.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_09.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_10.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_11.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_12.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_13.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_14.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_15.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_16.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_17.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Scourge_18.png")
                ]
            },
            {
                name : UNIT_ZERG_OVERLORD,
                sprite : [
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_01.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_02.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_03.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_04.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_05.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_06.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_07.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_08.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_09.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_10.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_11.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_12.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_13.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_14.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_15.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_16.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_17.png"),
                    loadProjectImage("res/unit/kill_sprites/Zerg Overlord_18.png")
                ]
            },
            {
                name : UNIT_TERRAN_BATTLECRUISER,
                sprite : [
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_01.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_02.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_03.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_04.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_05.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_06.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_07.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_08.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_09.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_10.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_11.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_12.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_13.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_14.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_15.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_16.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_17.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_18.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_19.png"),
                    loadProjectImage("res/unit/kill_sprites/Terran Battlecruiser_20.png")
                ]
            }
        ],

        killSpritesHQ : [
            // Bomb Sprites
            {
                name : UNIT_ZERG_SCOURGE,
                sprite : [
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_01.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_02.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_03.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_04.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_05.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_06.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_07.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_08.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_09.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_10.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_11.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_12.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_13.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_14.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_15.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_16.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_17.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Scourge_18.png")
                ]
            },
            {
                name : UNIT_ZERG_OVERLORD,
                sprite : [
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_01.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_02.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_03.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_04.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_05.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_06.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_07.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_08.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_09.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_10.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_11.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_12.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_13.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_14.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_15.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_16.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_17.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Zerg Overlord_18.png")
                ]
            },
            {
                name : UNIT_TERRAN_BATTLECRUISER,
                sprite : [
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_01.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_02.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_03.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_04.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_05.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_06.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_07.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_08.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_09.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_10.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_11.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_12.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_13.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_14.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_15.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_16.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_17.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_18.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_19.png"),
                    loadProjectImage("res/unit/kill_sprites_hq/Terran Battlecruiser_20.png")
                ]
            }
        ],

        killSounds : [
            // Bomb Units
            {
                name : UNIT_ZERG_SCOURGE,
                sound : loadProjectSound("res/unit/kill_sounds/Zerg Scourge.ogg")
            },
            {
                name : UNIT_ZERG_OVERLORD,
                sound : loadProjectSound("res/unit/kill_sounds/Zerg Overlord.ogg")
            },
            {
                name : UNIT_TERRAN_BATTLECRUISER,
                sound : loadProjectSound("res/unit/kill_sounds/Terran Battlecruiser.ogg")
            }
        ]
    }
};