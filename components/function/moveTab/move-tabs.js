Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.moveTabsX = function(e) {
    var t = e.event, o = e.ele, s = t.detail.x, a = t.target.offsetLeft, r = 0;
    0 != (r = a > 150 ? s > 237.5 ? 225 : s < 137.5 ? 75 : s : a) && o.setData({
        scrollLeft: a - r
    });
}, exports.moveTabsY = function(e) {
    var t = e.event, o = e.ele, s = t.detail.y, a = t.target.offsetTop, r = 0;
    0 != (r = s > 450 ? a - 405 : s < 50 ? a - 55 : 0) && o.setData({
        scrollTop: r
    });
};