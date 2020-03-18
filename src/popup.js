var Popup = {
    alert : function(title, message) {},
    prompt : function(message) {},
    confirm : function(message) {}
};

Popup.alert = function(title, message) {
    alert("[" + title + "]\n" + message);
};

Popup.prompt = function(message, defaultValue) {
    return prompt(message, defaultValue);
};

Popup.confirm = function(message) {
    return confirm(message);
};