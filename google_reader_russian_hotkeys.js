// ==UserScript==
// @name           Google Reader russian hotkeys
// @namespace      dvg.su/gm/grrh
// @description    Support russian hotkeys
// @include        http://www.google.*/reader/*
// @include        https://www.google.*/reader/*
// ==/UserScript==


// Thanks fxwiki(http://userscripts.org/users/89274) for Google Reader Key Customize (http://userscripts.org/scripts/show/48220)
// as example source

(function() {
var g_timeout = 2000;

var keyPress = function(event) {
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    var code = String.fromCharCode(event.charCode? event.charCode:event.keyCode).toLowerCase();
    var is_shift = event.shiftKey;
    var cha;
    switch (code) {
    case 'т':
        cha = 'N'; break;
    case 'з':
        cha = 'P'; break;
    case 'щ':
        cha = 'O'; break;
    case 'ч':
        cha = 'X'; break;
    defalut: return;
    }
    if (! cha) return;
    if (cha && isNaN(cha)) cha = cha.charCodeAt();
    event.stopPropagation();

    evt = document.createEvent('KeyboardEvent');
    evt.initKeyEvent('keypress', 1, 1, null, 0, 0, is_shift, 0, cha, 0);
    document.dispatchEvent(evt);
}

window.addEventListener('load', function() {
    document.addEventListener('keypress', keyPress, true);
}, false);
window.removeEventListener('unload', function() {
    document.removeEventListener('keypress', keyPress, true);
}, false);
})();
