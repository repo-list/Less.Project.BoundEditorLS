var Popup = {
    alert : function(title, message) {},
    prompt : function(message) {},
    confirm : function(message) {}
};

Popup.alert = function(title, message) {
    var result = "";

    if (title !== null) result += "[" + title + "]\n";
    result += message;

    alert(result);
};

Popup.prompt = function(message, defaultValue) {
    return prompt(message, defaultValue);
};

Popup.confirm = function(message) {
    return confirm(message);
};