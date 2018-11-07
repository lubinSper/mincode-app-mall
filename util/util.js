function t(t, e) {
    var n = {
        "M+": t.getMonth() + 1,
        "d+": t.getDate(),
        "h+": t.getHours(),
        "m+": t.getMinutes(),
        "s+": t.getSeconds(),
        "q+": Math.floor((t.getMonth() + 3) / 3),
        S: t.getMilliseconds()
    };
    /(y+)/.test(e) && (e = e.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var r in n) new RegExp("(" + r + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? n[r] : ("00" + n[r]).substr(("" + n[r]).length)));
    return e;
}

function e(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

module.exports = {
    formatTime: function(t) {
        if ("number" != typeof t || t < 0) return t;
        var e = parseInt(t / 3600);
        return t %= 3600, [ e, parseInt(t / 60), t %= 60 ].map(function(t) {
            return (t = t.toString())[1] ? t : "0" + t;
        }).join(":");
    },
    formatLocation: function(t, e) {
        return "string" == typeof t && "string" == typeof e && (t = parseFloat(t), e = parseFloat(e)), 
        t = t.toFixed(2), e = e.toFixed(2), {
            longitude: t.toString().split("."),
            latitude: e.toString().split(".")
        };
    },
    GetTime: function(t, e) {
        var n = new Date(t), r = n.getFullYear() + ".", o = (n.getMonth() + 1 < 10 ? "0" + (n.getMonth() + 1) : n.getMonth() + 1) + ".", a = n.getDate() < 10 ? "0" + n.getDate() : n.getDate(), g = (parseInt(n.getHours()) > 9 ? n.getHours() : "0" + n.getHours()) + ":", u = (parseInt(n.getMinutes()) > 9 ? n.getMinutes() : "0" + n.getMinutes()) + ":", i = parseInt(n.getMinutes()) > 9 ? n.getMinutes() : "0" + n.getMinutes(), s = parseInt(n.getSeconds()) > 9 ? n.getSeconds() : "0" + n.getSeconds();
        return console.log(r, o, a, g), e ? "Y-M-D hh:mm:ss" == e ? r + o + a + " " + g + u + s : "Y-M-D hh:mm" == e ? r + o + a + " " + g + i : r + o + a : r + o + a;
    },
    formatMoney: function(t) {
        return 0 == t ? "0" : (t /= 100, (t = +t).toString());
    },
    formatMoney2: function(t) {
        return t ? (t /= 100, t = (+t).toFixed(2)) : "0.00";
    },
    formatDate: t,
    getFrontDate: function(e) {
        return t(new Date(e), "yyyy-MM-dd hh:mm");
    },
    accMul: function(t, e) {
        var n = 0, r = t.toString(), o = e.toString();
        try {
            n += r.split(".")[1].length;
        } catch (t) {}
        try {
            n += o.split(".")[1].length;
        } catch (t) {}
        return Number(r.replace(".", "")) * Number(o.replace(".", "")) / Math.pow(10, n);
    },
    randomNumber: function(t, e) {
        var n = e - t + 1;
        return Math.floor(Math.random() * n + t);
    },
    formatTimeLayout: function(t) {
        var n = (t = new Date(t)).getFullYear(), r = t.getMonth() + 1, o = t.getDate(), a = t.getHours(), g = t.getMinutes(), u = t.getSeconds();
        return [ n, r, o ].map(e).join("/") + " " + [ a, g, u ].map(e).join(":");
    }
};