function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DiscoverListCommentPublishM = void 0;

var t = require("../../../template/show_dialog/show_dialog"), a = getApp();

exports.DiscoverListCommentPublishM = function(o) {
    var n;
    wx.showLoading({
        title: "发布中..."
    }), wx.request((n = {
        url: a.globalData.shopMHost + "xcx/org/goods/comment/add",
        method: "post",
        data: o.data,
        complete: function() {
            wx.hideLoading();
        },
        header: {
            "content-type": "application/json"
        }
    }, e(n, "complete", function() {
        wx.stopPullDownRefresh(), wx.hideLoading();
    }), e(n, "success", function(e) {
        var t = o.ele.data.discussInfo.shopListIndex, n = a.globalData.userInfo;
        o.ele.data.shopList[t].comments.push({
            id: e.data.data.id,
            belongTo: 1,
            comment: o.ele.data.discussInfo.inputText,
            nickName: e.data.data.nickName ? e.data.data.nickName : n.nickName ? n.nickName : "微信用户"
        }), o.ele.setData(o.ele.data, function() {
            o.fn();
        });
    }), e(n, "fail", function() {
        (0, t.ShowDialog)(o.ele), o.fn();
    }), n));
};