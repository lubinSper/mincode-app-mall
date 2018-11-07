function e(e, o, t) {
    return o in e ? Object.defineProperty(e, o, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[o] = t, e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DiscoverListCommentDelM = void 0;

var o = require("../../../template/show_dialog/show_dialog"), t = getApp();

exports.DiscoverListCommentDelM = function(n) {
    var i;
    wx.request((i = {
        url: t.globalData.shopMHost + "xcx/org/goods/comment/del",
        method: "post",
        data: n.data,
        complete: function() {
            wx.hideLoading();
        },
        header: {
            "content-type": "application/json"
        }
    }, e(i, "complete", function() {
        wx.stopPullDownRefresh(), wx.hideLoading();
    }), e(i, "success", function(e) {
        n.fn();
    }), e(i, "fail", function() {
        (0, o.ShowDialog)(n.ele);
    }), i));
};