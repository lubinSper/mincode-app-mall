Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.formatMsgTime = function(e) {
    var t = Date.parse(new Date()), r = parseInt((t - e) / 1e3), a = parseInt(r), n = parseInt(r / 60), s = parseInt(r / 3600), p = parseInt(r / 86400), D = parseInt(r / 31536e3);
    return a < 60 ? "刚刚" : n < 60 ? n + "分钟前" : s < 24 ? s + "小时前" : p > 0 && p < 365 ? p + "天前" : D > 0 ? D + "年前" : void 0;
}, exports.newFormatMsgTime = function(e) {
    new Date();
    var t = new Date(e), r = t.getMonth() + 1;
    r = r < 10 ? "0" + r : r;
    var a = t.getDate();
    a = a < 10 ? "0" + a : a;
    var n = t.getHours();
    n = n < 10 ? "0" + n : n;
    var s = t.getMinutes();
    s = s < 10 ? "0" + s : s;
    var p = Date.parse(new Date()), D = parseInt((p - e) / 1e3), o = parseInt(D), u = parseInt(D / 60), I = parseInt(D / 3600), g = parseInt(D / 86400);
    parseInt(D / 31536e3);
    if (o < 60) return "刚刚";
    if (u < 60) return u + "分钟前";
    if (I < 24 && I > 0 && u > 60) {
        var i = new Date(), v = Date.parse(new Date(i.getFullYear(), i.getMonth(), i.getDate(), 0, 0, 0));
        return (f = parseInt((v - e) / 1e3)) < 0 ? "今天" + n + ":" + s : "昨天" + n + ":" + s;
    }
    if (g > 0 && g < 2) {
        var w = new Date();
        w.setDate(w.getDate() - 1);
        var v = Date.parse(new Date(w.getFullYear(), w.getMonth(), w.getDate(), 0, 0, 0)), f = parseInt((v - e) / 1e3);
        return f < 0 ? "昨天" + n + ":" + s : r + "-" + a + " " + n + ":" + s;
    }
    return g >= 2 ? r + "-" + a + " " + n + ":" + s : void 0;
};