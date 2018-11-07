var t = getApp();

Page({
    data: {
        onShow: !1,
        pullUp: "",
        pullDown: ""
    },
    onShow: function() {
        var t = this;
        new Date().getTime();
        t.setData({
            onShow: !0
        });
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "加载中"
        }), wx.setNavigationBarTitle({
            title: t.iconName ? t.iconName : "优惠券"
        }), t.action && "goHome" == t.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    onPullDownRefresh: function() {
        var t = this, e = new Date().getTime();
        t.setData({
            pullDown: e
        });
    },
    onReachBottom: function() {
        var t = this, e = new Date().getTime();
        t.setData({
            pullUp: e
        });
    },
    onShareAppMessage: function() {
        return {
            path: t.getNowUrl()
        };
    }
});