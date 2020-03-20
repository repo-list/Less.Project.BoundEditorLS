var Log = {
    isDebugMode : true,
    debug : function(message) {},
    warn : function(message) {},
    error : function(message) {},
    temp : function(message) {}
};

Log.debug = function(message) {
    if (this.isDebugMode) console.log(message);
};

Log.warn = function(message) {
    console.error("WARNING : " + message);
};

Log.error = function(message) {
    console.error("ERROR : " + message);
};

Log.temp = function(message) {
    if (this.isDebugMode) console.log("TEMP :: " + message);
};