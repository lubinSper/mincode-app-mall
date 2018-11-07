Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ShowTime = function(e, t, s) {
    var n = new Date(e), g = "";
    "." == s ? g = "." : "-" == s && (g = "-");
    var r = n.getFullYear() + g, o = (n.getMonth() + 1 < 10 ? "0" + (n.getMonth() + 1) : n.getMonth() + 1) + g, u = n.getDate() < 10 ? "0" + n.getDate() : n.getDate(), a = (parseInt(n.getHours()) > 9 ? n.getHours() : "0" + n.getHours()) + ":", M = (parseInt(n.getMinutes()) > 9 ? n.getMinutes() : "0" + n.getMinutes()) + ":", h = parseInt(n.getMinutes()) > 9 ? n.getMinutes() : "0" + n.getMinutes(), i = parseInt(n.getSeconds()) > 9 ? n.getSeconds() : "0" + n.getSeconds();
    return t ? "Y-M-D hh:mm:ss" == t ? r + o + u + " " + a + M + i : "Y-M-D hh:mm" == t ? r + o + u + " " + a + h : "hh:mm" == t ? a + h : r + o + u : r + o + u;
};