var t = getApp();

Page({
    data: {
        onShow: !1,
        onLoad: !1,
        pullUp: "",
        pullDown: ""
    },
    onShow: function() {
        this.setData({
            onShow: !0
        });
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "加载中"
        });
        wx.setNavigationBarTitle({
            title: t.iconName ? t.iconName : "优惠券"
        }), t.action && "goHome" == t.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    onPullDownRefresh: function() {
        var t = this, o = new Date().getTime();
        t.setData({
            pullDown: o
        });
    },
    onReachBottom: function() {
        var t = this, o = new Date().getTime();
        t.setData({
            pullUp: o
        });
    },
    onShareAppMessage: function() {
        return console.log(t.getNowUrl() + "?action=goHome"), {
            path: t.getNowUrl() + "?action=goHome"
        };
    }
});