function loadProjectImage(src) {
    var image = new Image();
    image.src = src;

    return image;
}

var Resource = {
    image : {
        units : [
            {
                name : UNIT_TERRAN_MACHINESHOP,
                image : loadProjectImage("res/image/unit/static/Terran Machine Shop.png")
            },
            {
                name : UNIT_TERRAN_MACHINESHOP_UNCLEAR,
                image : loadProjectImage("res/image/unit/static/Terran Machine Shop(U).png")
            },
            {
                name : UNIT_NEUTRAL_PSIEMITTER,
                image : loadProjectImage("res/image/unit/static/Psi Emitter.png")
            },
            {
                name : UNIT_NEUTRAL_PSIEMITTER_UNCLEAR,
                image : loadProjectImage("res/image/unit/static/Psi Emitter(U).png")
            },
            {
                name : UNIT_NEUTRAL_KHALISCRYSTAL,
                image : loadProjectImage("res/image/unit/static/Khalis Crystal.png")
            },
            {
                name : UNIT_NEUTRAL_KHALISCRYSTAL_UNCLEAR,
                image : loadProjectImage("res/image/unit/static/Khalis Crystal(U).png")
            },
            {
                name : UNIT_NEUTRAL_URAJCRYSTAL,
                image : loadProjectImage("res/image/unit/static/Uraj Crystal.png")
            },
            {
                name : UNIT_NEUTRAL_URAJCRYSTAL_UNCLEAR,
                image : loadProjectImage("res/image/unit/static/Uraj Crystal(U).png")
            },
            {
                name : UNIT_NEUTRAL_KHAYDARINCRYSTAL,
                image : loadProjectImage("res/image/unit/static/Khaydarin Crystal.png")
            },
            {
                name : UNIT_NEUTRAL_KHAYDARINCRYSTAL_UNCLEAR,
                image : loadProjectImage("res/image/unit/static/Khaydarin Crystal(U).png")
            },
            {
                name : UNIT_OTHER_BLOCKEXPLOSION1,
                image : loadProjectImage("res/image/unit/static/Block Explosion 1x1.png")
            },
            {
                name : UNIT_OTHER_BLOCKEXPLOSION2,
                image : loadProjectImage("res/image/unit/static/Block Explosion 2x2.png")
            }
        ]
    }
};