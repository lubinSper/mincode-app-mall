function t(r) {
    var i = r.key, a = r.timeData, u = r.fn, f = r.timeKey, l = void 0 === f ? "toEndTime" : f, m = r.data, c = r.hideTime;
    if (!i) throw new Error("countdown缺少key参数");
    var b = null;
    if (c) {
        var y = new Date().getTime();
        b = Math.ceil((y - c) / 1e3);
    }
    o.globalData.timerObj || (o.globalData.timerObj = {});
    var d = function(t) {
        if ("object" == (void 0 === m ? "undefined" : n(m))) {
            var o = !1;
            m.forEach(function(n) {
                var r = l;
                2 == n.isPintuan && (o = !0, r = "pintuanToEndTime"), n[r] && n[r] > 0 && (t && b ? b > n[r] ? n[r] = 0 : b < n[r] && (n[r] = n[r] - b) : t || (n[r] = n[r] - 1), 
                n.timeArr = e(n[r]));
            }), u && u(m);
            var r = m.filter(function(t) {
                return t[l];
            });
            if (o && (r = r.concat(m.filter(function(t) {
                return t.pintuanToEndTime;
            }))), r.length > 0) return !0;
        } else if (t && b ? b > m ? m = 0 : b < m && (m -= b) : t || (m -= 1), u && u(e(m)), 
        m) return !0;
        return !1;
    };
    a && (m = a, o.globalData.timerObj[i] && clearTimeout(o.globalData.timerObj[i]), 
    d(!0)), o.globalData.timerObj[i] = setTimeout(function() {
        d() && t({
            data: m,
            fn: u,
            timeKey: l,
            key: i
        });
    }, 1e3);
}

function e(t) {
    if (!t || t < 0) return [ "00", "00", "00" ];
    var e = Math.floor(t / 3600), n = t % 3600, o = Math.floor(n / 60), r = n % 60, i = function(t) {
        return t ? t < 10 && (t = "0" + t) : t = "00", t;
    };
    return [ i(e), i(o), i(r) ];
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = getApp();

module.exports = t;