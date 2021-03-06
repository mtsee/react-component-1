'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toggleClass = toggleClass;
exports.removeClass = removeClass;
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.getClassList = getClassList;
function toggleClass(el, className) {
    if (el && el instanceof Node && className) {
        var str = el.className;
        var index = str.indexOf(className);
        el.className = index === -1 ? str + ' ' + className : str.slice(0, index) + str.slice(index, className.length);
    }
}

function removeClass(el, className) {
    if (!el || !className) return;
    if (el instanceof NodeList) {
        var length = el.length;
        for (var i = 0; i < length; i++) {
            _removeClass(el[i], className);
        }
        return;
    }
    if (el instanceof Node) {
        _removeClass(el, className);
    }
}

function _removeClass(el, className) {
    var clist = getClassList(el);
    var length = clist.length;
    var str = '',
        changed = false;
    for (var i = 0; i < length; i++) {
        if (!clist[i]) continue;
        if (clist[i] === className) {
            changed = true;
        } else {
            if (str) str += ' ';
            str += clist[i];
        }
    }
    if (changed) el.className = str;
}

function hasClass(el, className) {
    if (el && className && el instanceof Node) {
        return el.className.indexOf(className) !== -1;
    }
    return false;
}

function addClass(el, className) {
    if (!el || !className) return;
    if (el instanceof NodeList) {
        var length = el.length;
        for (var i = 0; i < length; i++) {
            var str = el.className.trim();
            el[i].className = str + ' ' + className;
        }
        return;
    }
    if (el instanceof Node) {
        var str = el.className.trim();
        el.className = str + ' ' + className;
    }
}

function getClassList(el) {
    if (el && el instanceof Node) return el.className.split(/\s+/);
    return [];
}