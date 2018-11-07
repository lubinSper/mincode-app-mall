var a = getApp();

Page({
    data: {
        customParams: {},
        pageId: "",
        pageTitle: "",
        isAppTabNav: !1,
        onShow: "",
        orgName: ""
    },
    onLoad: function(t) {
        var e = this;
        wx.showLoading({
            title: "加载中"
        }), a.getOrgInfo(function(a, t) {
            t && (e.data.orgName = t.orgName);
        });
        var o = getCurrentPages()[0].route.split("-"), n = parseInt(o[o.length - 1]), s = "", i = !1, g = a.isHasTabByTitle({
            url: "page/index/custom-page/custom-page-" + n + "/custom-page-" + n
        });
        console.log("tempJson=", g), g.check && (s = g.text, i = !0), this.setData({
            customParams: {
                id: n
            },
            pageTitle: s,
            pageId: n,
            isAppTabNav: i
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = new Date().getTime();
        this.setData({
            onShow: a
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var a = new Date().getTime();
        this.setData({
            onPullDownRefresh: a
        });
    },
    onReachBottom: function() {
        var a = new Date().getTime();
        this.setData({
            onReachBottom: a
        });
    },
    onShareAppMessage: function() {
        console.log(this.data.pageTitle, this.data.pageId);
        var t = "/page/index/custom-page/custom-page-2/custom-page-2?action=goHome";
        return this.data.isAppTabNav && (t = "/page/index/custom-page/custom-page-2/custom-page-2"), 
        console.log(t), {
            title: a.globalData.nickName + "给你推荐了「" + this.data.orgName + "」",
            path: t
        };
    }
});