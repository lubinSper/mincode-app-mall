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
}), exports.DiscoverListLikesOnM = void 0;

var t = require("../../../template/show_dialog/show_dialog"), a = getApp();

exports.DiscoverListLikesOnM = function(o) {
    if (1 == o.ele.data.oneClick) {
        var i;
        o.ele.data.oneClick = 2, o.ele.setData(o.ele.data), wx.request((i = {
            url: a.globalData.shopMHost + "xcx/org/goods/like/add",
            method: "post",
            data: o.data,
            complete: function() {
                wx.hideLoading();
            },
            header: {
                "content-type": "application/json"
            }
        }, e(i, "complete", function() {
            wx.stopPullDownRefresh(), wx.hideLoading(), o.ele.setData({
                oneClick: 1
            });
        }), e(i, "success", function(e) {
            var t = e.data;
            "000000" == t.code ? (o.ele.data.shopList[o.index].likes.push({
                openId: t.data.openId,
                id: t.data.id,
                avatar: t.data.avatar,
                nickName: t.data.nickName
            }), o.ele.data.shopList[o.index].likeId = t.data.id, o.ele.data.shopList[o.index].likeStatus = 1, 
            o.ele.setData(o.ele.data), setTimeout(function() {
                o.fn();
            }, 500)) : "900000" == t.code && setTimeout(function() {
                o.fn();
            }, 500);
        }), e(i, "fail", function() {
            console.log(11121), (0, t.ShowDialog)(o.ele), setTimeout(function() {
                o.fn();
            }, 500);
        }), i));
    }
};