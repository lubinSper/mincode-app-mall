var t = getApp();

Page({
    data: {
        userId: "",
        onPullDownRefresh: "",
        onReachBottom: "",
        onHide: "",
        onShow: ""
    },
    onLoad: function(e) {
        t.getTabBarTitle(), wx.showLoading({
            title: "加载中"
        });
    },
    setUserId: function(t) {
        var e = this, n = t.detail.userId;
        e.setData({
            userId: n
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = new Date().getTime();
        this.setData({
            onShow: t
        });
    },
    onHide: function() {
        var t = new Date().getTime();
        this.setData({
            onHide: t
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = new Date().getTime();
        this.setData({
            onPullDownRefresh: t
        });
    },
    onReachBottom: function() {
        var t = new Date().getTime();
        this.setData({
            onReachBottom: t
        });
    }
});