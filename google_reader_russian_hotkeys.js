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
    var code = String.fromCharCode(event.charCode? event.charCode:event.keyCode);
    if (event.shiftKey) code = '@' + code;
    if (code == 'G') {
        document.removeEventListener('keypress', keyPress, true);
        setTimeout(function() {
          document.addEventListener('keypress', keyPress, true);
        }, g_timeout);
        return;
    }

    var cha;
    switch (code) {
    case 'т': case 'Т': case '@т': case '@Т':
        cha = 'N'; break;
    case 'з': case 'З': case '@з': case '@З':
        cha = 'P'; break;
    case 'щ': case 'Щ': case '@щ': case '@Щ':
        cha = 'O'; break;
    case 'ч': case 'Ч': case '@ч': case '@Ч':
        cha = 'X'; break;
    defalut: return;
    }
    if (! cha) return;
    if (cha && isNaN(cha)) cha = cha.charCodeAt();
    event.stopPropagation();

    evt = document.createEvent('KeyboardEvent');
    switch (code) {
    case 'т': case 'Т':
    case 'щ': case 'Щ':
    case 'з': case 'З':
    case 'ч': case 'Ч':
        evt.initKeyEvent('keypress', 1, 1, null, 0, 0, 0, 0, cha, 0);
        break;
    case '@т': case '@Т':
    case '@щ': case '@Щ':
    case '@з': case '@З':
    case '@ч': case '@Ч':
        evt.initKeyEvent('keypress', 1, 1, null, 0, 0, 1, 0, cha, 0);
        break;
    default: return;
    }
    document.dispatchEvent(evt);
}

window.addEventListener('load', function() {
    document.addEventListener('keypress', keyPress, true);
}, false);
window.removeEventListener('unload', function() {
    document.removeEventListener('keypress', keyPress, true);
}, false);
})();
