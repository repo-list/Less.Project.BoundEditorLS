$(document).ready(function() {
    FooterElements.refreshWndSize();
});

FooterElements.refreshWndSize = function() {
    $("#footer > #wndSize").text(window.innerWidth + " x " + window.innerHeight);
};