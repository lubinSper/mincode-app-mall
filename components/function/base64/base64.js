function r(r) {
    r = r.replace(/\r\n/g, "\n");
    for (var e = "", o = 0; o < r.length; o++) {
        var t = r.charCodeAt(o);
        t < 128 ? e += String.fromCharCode(t) : t > 127 && t < 2048 ? (e += String.fromCharCode(t >> 6 | 192), 
        e += String.fromCharCode(63 & t | 128)) : (e += String.fromCharCode(t >> 12 | 224), 
        e += String.fromCharCode(t >> 6 & 63 | 128), e += String.fromCharCode(63 & t | 128));
    }
    return e;
}

function e(r) {
    for (var e = "", o = 0, t = 0, a = 0; o < r.length; ) if ((t = r.charCodeAt(o)) < 128) e += String.fromCharCode(t), 
    o++; else if (t > 191 && t < 224) a = r.charCodeAt(o + 1), e += String.fromCharCode((31 & t) << 6 | 63 & a), 
    o += 2; else {
        a = r.charCodeAt(o + 1);
        var n = r.charCodeAt(o + 2);
        e += String.fromCharCode((15 & t) << 12 | (63 & a) << 6 | 63 & n), o += 3;
    }
    return e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

exports.Base64Encode = function(e) {
    var t, a, n, h, C, d, f, c = "", i = 0;
    for (e = r(e); i < e.length; ) h = (t = e.charCodeAt(i++)) >> 2, C = (3 & t) << 4 | (a = e.charCodeAt(i++)) >> 4, 
    d = (15 & a) << 2 | (n = e.charCodeAt(i++)) >> 6, f = 63 & n, isNaN(a) ? d = f = 64 : isNaN(n) && (f = 64), 
    c = c + o.charAt(h) + o.charAt(C) + o.charAt(d) + o.charAt(f);
    return c;
}, exports.Base64Decode = function(r) {
    var t, a, n, h, C, d, f = "", c = 0;
    for (r = r.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < r.length; ) t = o.indexOf(r.charAt(c++)) << 2 | (h = o.indexOf(r.charAt(c++))) >> 4, 
    a = (15 & h) << 4 | (C = o.indexOf(r.charAt(c++))) >> 2, n = (3 & C) << 6 | (d = o.indexOf(r.charAt(c++))), 
    f += String.fromCharCode(t), 64 != C && (f += String.fromCharCode(a)), 64 != d && (f += String.fromCharCode(n));
    return f = e(f);
};