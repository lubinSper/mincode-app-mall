getApp();

Page({
    data: {
        userId: "",
        onPullDownRefresh: "",
        onReachBottom: "",
        onHide: "",
        onShow: ""
    },
    onLoad: function(e) {},
    setUserId: function(e) {
        var t = this, n = e.detail.userId;
        t.setData({
            userId: n
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = new Date().getTime();
        this.setData({
            onShow: e
        });
    },
    onHide: function() {
        var e = new Date().getTime();
        this.setData({
            onHide: e
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {
        var e = new Date().getTime();
        this.setData({
            onPullDownRefresh: e
        });
    },
    onReachBottom: function() {
        var e = new Date().getTime();
        this.setData({
            onReachBottom: e
        });
    }
});