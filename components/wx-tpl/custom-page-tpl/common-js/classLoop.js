Object.defineProperty(exports, "__esModule", {
    value: !0
});

var s = !0;

exports.classLoop = function(e, r) {
    var a = "分类";
    exports.isHasClass = s = !1;
    for (var t = 0; t < r.length; t++) if (r[t].id == e) {
        a = r[t].name, exports.isHasClass = s = !0;
        break;
    }
    return a;
}, exports.isHasClass = s;