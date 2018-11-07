function e(e, t) {
    if (null != e && null != t) {
        var n = e.split(" "), i = n[0].split("-"), l = t.split("-"), s = n[1].split(":"), r = new Date(i[0], parseInt(i[1] - 1), i[2], s[0], s[1], s[2]), o = new Date(l[0], parseInt(l[1] - 1), l[2]);
        return r.getTime() > o.getTime() ? (console.log("日期开始时间大于结束时间"), !0) : (console.log("通过"), 
        !1);
    }
}

function t(e, t) {
    if (e.length > 0 && t.length > 0) {
        var n = e.split(" "), i = t.split(" "), l = n[0].split("-"), s = i[0].split("-"), r = n[1].split(":"), o = i[1].split(":"), p = new Date(l[0], parseInt(l[1] - 1), l[2], r[0], r[1], r[2]), u = new Date(s[0], parseInt(s[1] - 1), s[2], o[0], o[1]);
        return p.getTime() > u.getTime() ? (console.log("startTime不能大于endTime，不能通过"), !0) : (console.log("startTime小于endTime，所以通过了"), 
        !1);
    }
    return console.log("时间不能为空"), !1;
}

function n(n, i) {
    if (-1 != n.indexOf(" ") && -1 != i.indexOf(" ")) return t(n, i);
    e(n, i);
    return e(n, i);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.checkTime = function(e, t) {
    return n(e, t);
};