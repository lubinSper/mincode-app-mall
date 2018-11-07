require("../../../components/conf/conf"), require("../../../util/util.js");

var e = getApp(), t = {
    data: {
        orgName: "",
        nickName: "",
        onPullDownRefresh: "",
        onReachBottom: "",
        onHide: "",
        onShow: "",
        type: 2,
        showReturnIndexBtn: !1
    },
    onLoad: function(t) {
        var o = this;
        e.getTabBarTitle(), t.action && "goHome" == t.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        }), e.getOrgInfo(function(e, t) {
            t && (o.data.orgName = t.orgName);
        });
    },
    onHide: function() {
        var e = new Date().getTime();
        console.log("页面--隐藏：" + e), this.setData({
            onHide: e
        });
    },
    onShow: function() {
        var e = new Date().getTime();
        console.log("页面--显示：" + e), this.setData({
            onShow: e
        });
    },
    onShareAppMessage: function() {
        var t = this, o = getCurrentPages(), n = e.isHasTabByTitle({
            url: o[o.length - 1].route
        });
        console.log("tempJson=", n);
        var a = "/page/index/shequn/shequn_tab?action=goHome";
        return n.check && (a = "/page/index/shequn/shequn_tab"), console.log("tempShareUrl=", a), 
        {
            title: e.globalData.nickName + "给你推荐了「" + t.data.orgName + "」",
            path: a
        };
    },
    onReachBottom: function() {
        var e = new Date().getTime();
        console.log("页面--上拉加载更多：" + e), this.setData({
            onReachBottom: e
        });
    },
    onPullDownRefresh: function() {
        var e = new Date().getTime();
        console.log("页面--下拉刷新：" + e), this.setData({
            onPullDownRefresh: e
        });
    }
};

Page(t);