function e(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DiscoverListLikesOffM = void 0;

var t = require("../../../template/show_dialog/show_dialog"), i = getApp();

exports.DiscoverListLikesOffM = function(o) {
    if (1 == o.ele.data.oneClick) {
        var a;
        o.ele.data.oneClick = 2, o.ele.setData(o.ele.data), wx.request((a = {
            url: i.globalData.shopMHost + "xcx/org/goods/like/del",
            method: "post",
            data: o.data,
            complete: function() {
                wx.hideLoading();
            },
            header: {
                "content-type": "application/json"
            }
        }, e(a, "complete", function() {
            wx.stopPullDownRefresh(), wx.hideLoading(), o.ele.setData({
                oneClick: 1
            });
        }), e(a, "success", function(e) {
            var t = e.data;
            if ("000000" == t.code) {
                for (var e = o.ele.data.shopList[o.index].likes, i = 0; i < e.length; i++) e[i].id == o.data.id && e.splice(i, 1);
                o.ele.data.shopList[o.index].likeId = "", o.ele.data.shopList[o.index].likeStatus = 2, 
                o.ele.setData(o.ele.data, function() {
                    setTimeout(function() {
                        o.fn();
                    }, 500);
                });
            } else t.code;
        }), e(a, "fail", function() {
            (0, t.ShowDialog)(o.ele), setTimeout(function() {
                o.fn();
            }, 500);
        }), a));
    }
};