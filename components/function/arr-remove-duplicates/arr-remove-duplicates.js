Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.arrRemoveFuplicates = function(e) {
    for (var r = [], t = 0; t < e.length; t++) -1 == r.indexOf(e[t]) && r.push(e[t]);
    return r.sort();
}, exports.compareSameValue = function(e, r) {
    return (e = e.sort().toString()) == (r = r.sort().toString());
};