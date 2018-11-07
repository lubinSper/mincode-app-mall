require("../../../../components/conf/conf"), require("../../../../util/util.js");

var e = getApp(), t = {
    data: {
        orgName: "",
        nickName: "",
        onPullDownRefresh: "",
        onReachBottom: "",
        onHide: "",
        onShow: "",
        type: 2,
        showReturnIndexBtn: !1,
        xcxType: 1,
        copyRightHide: !0,
        copyRightStyle: ""
    },
    onLoad: function(e) {
        setTimeout(function() {
            wx.setNavigationBarTitle({
                title: e.iconName
            });
        }, 1e3), e.action && "goHome" == e.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    onHide: function() {
        var e = new Date().getTime();
        this.setData({
            onHide: e
        });
    },
    onShow: function() {
        var t = new Date().getTime();
        this.setData({
            onShow: t
        }), e.whichProduct({
            ele: this
        });
    },
    onShareAppMessage: function() {
        var t = getCurrentPages(), o = e.isHasTabByTitle({
            url: t[t.length - 1].route
        });
        console.log("tempJson=", o);
        var n = "/subPackage/index/pages/shequn/shequn?action=goHome";
        return o.check && (n = "/subPackage/index/pages/shequn/shequn"), console.log("tempShareUrl=", n), 
        {
            title: e.globalData.nickName + "邀请你来逛逛" + this.data.orgName,
            path: n
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
            onPullDownRefresh: e,
            copyRightStyle: ""
        });
    },
    setParentData: function(e) {
        e.detail.copyRightHide || this.setData({
            copyRightStyle: "display:block !important;"
        });
    }
};

Page(t);