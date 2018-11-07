require("../../../components/conf/conf"), require("../../../util/util.js");

var t = getApp(), e = {
    data: {
        orgName: "",
        nickName: "",
        onPullDownRefresh: "",
        onReachBottom: "",
        onHide: "",
        onShow: "",
        type: null,
        showReturnIndexBtn: !1,
        xcxType: 1,
        copyRightHide: !0,
        copyRightStyle: ""
    },
    onLoad: function(e) {
        var o = this, n = this;
        n.getBtnText(), t.getTabBarTitle(), e.action && "goHome" == e.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        }), t.getOrgInfo(function(t, e) {
            e && (o.data.orgName = e.orgName);
        }), t.whichProduct({
            ele: n
        });
    },
    onHide: function() {
        var t = new Date().getTime();
        console.log("页面--隐藏：" + t), this.setData({
            onHide: t
        });
    },
    onShow: function() {
        var t = new Date().getTime();
        console.log("页面--显示：" + t), this.setData({
            onShow: t
        });
    },
    onShareAppMessage: function() {
        var e = getCurrentPages(), o = t.isHasTabByTitle({
            url: e[e.length - 1].route
        });
        console.log("tempJson=", o);
        var n = "/page/dongtai/circle-friends-css/circle-friends-css?action=goHome";
        return o.check && (n = "/page/dongtai/circle-friends-css/circle-friends-css"), console.log("tempShareUrl=", n), 
        {
            title: t.globalData.nickName + "给你推荐了「" + this.data.orgName + "」",
            path: n
        };
    },
    onReachBottom: function() {
        var t = this, e = new Date().getTime();
        this.setData({
            onReachBottom: e
        }), t.getBtnText();
    },
    onPullDownRefresh: function() {
        var t = this, e = new Date().getTime();
        this.setData({
            onPullDownRefresh: e,
            copyRightStyle: ""
        }), t.getBtnText();
    },
    getBtnText: function(e) {
        var o = this;
        t.getBtnText(function(t) {
            t && o.setData({
                appointmentCopy: t.appointmentCopy ? t.appointmentCopy : "立即预约",
                appointmentZeroCopy: t.appointmentZeroCopy ? t.appointmentZeroCopy : "马上咨询",
                purchaseCopy: t.purchaseCopy ? t.purchaseCopy : "立即购买"
            });
        });
    },
    setParentData: function(t) {
        t.detail.copyRightHide || this.setData({
            copyRightStyle: "display:block !important;"
        });
    }
};

Page(e);