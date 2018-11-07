require("../../../../components/template/show_dialog/show_dialog");

var e = require("../../components/model/agent-info-m.js"), o = getApp();

Page({
    data: {
        oneClick: 1,
        phone: "",
        orgId: "",
        qr_code: "",
        applyInfo: {
            name: "",
            tel: "",
            industry: ""
        },
        showRemindType: 0,
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        showReturnIndexBtn: !1,
        params: {
            phone: null,
            orgId: null
        }
    },
    onLoad: function(t) {
        var n = t.phone ? t.phone : "", a = t.orgId ? t.orgId : "", s = !(!t.action || "goHome" != t.action);
        this.setData({
            params: {
                phone: n,
                orgId: a,
                showReturnIndexBtn: s
            }
        });
        var r = this;
        (0, e.agentInfoM)({
            ele: r,
            data: {
                xcxId: o.globalData.xcxId
            },
            fn: function() {
                console.log("phone为", r.data.phone, "orgId为", r.data.orgId);
            }
        });
    },
    setUserId: function(e) {
        var o = this, t = e.detail.userId;
        o.setData({
            userId: t
        });
    },
    onShow: function() {
        var e = new Date().getTime();
        this.setData({
            onHide: e
        });
    },
    onHide: function() {
        var e = new Date().getTime();
        this.setData({
            onHide: e
        });
    },
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
    },
    onShareAppMessage: function(e) {
        var t = getCurrentPages(), n = o.isHasTabByTitle({
            url: t[t.length - 1].route
        });
        console.log("tempJson=", n);
        var a = "/subPackage/my/pages/introduce/introduce?action=goHome&phone=" + this.data.phone;
        return n.check && (a = "/subPackage/my/pages/introduce/introduce?phone=" + this.data.phone), 
        console.log("tempShareUrl=", a), {
            title: "点击这里，马上了解独立小程序开发自主入驻平台一站式客流解决方案",
            path: a
        };
    }
});