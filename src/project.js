var Project = {
    patterns : []
};

// Declaration Constants
const __intValue = 0;
const __strValue = "";
const __imgValue = new Image();
const __arrValue = [];
const __2dArrValue = [[]];

const BoundPattern = function() {
    this.level = undefined;
    this.tiles = __2dArrValue;
    this.locations = __2dArrValue;
    this.phases = __arrValue;
    this.waits = __arrValue;
};