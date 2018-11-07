var a = getApp();

Page({
    data: {
        customParams: {},
        pageTitle: "",
        isAppTabNav: !1,
        id: ""
    },
    onLoad: function(e) {
        console.log(e);
        wx.showLoading({
            title: "加载中"
        });
        var t = "", o = !1;
        if (t = e.pageTitle, e.pageTitle) ; else {
            var i = a.isHasTabByTitle({
                url: "page/index/custom-page/custom-page-" + e.id + "/custom-page-" + e.id
            });
            console.log("tempJson=", i), i.check && (t = i.text, o = !0);
        }
        var s = !1;
        e.action && "goHome" == e.action && (s = !0), this.setData({
            customParams: {
                id: e.id,
                isShowHome: s,
                pageTitle: t,
                type: e.type
            },
            isAppTabNav: o,
            pageTitle: t,
            id: e.id
        });
    },
    onReady: function() {},
    onShow: function() {},
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
        var e = this.data.pageTitle, t = "/subPackage/business/pages/custom_page/custom_page?action=goHome&id=" + this.data.id + "&pageTitle=" + e;
        return this.data.isAppTabNav && (t = "/subPackage/business/pages/custom_page/custom_page?id=" + this.data.id + "&pageTitle=" + e), 
        console.log(e), console.log(t), {
            title: a.globalData.nickName + "给你推荐了「" + e + "」",
            path: t
        };
    }
});