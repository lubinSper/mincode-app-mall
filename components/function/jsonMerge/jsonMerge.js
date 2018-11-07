Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.jsonMerge = function(e, r) {
    var o = {};
    for (var t in e) o[t] = e[t];
    for (var t in r) o[t] = r[t];
    return o;
};