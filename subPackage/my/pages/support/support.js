var t = require("../../components/model/agent-info-m.js"), a = getApp();

Page({
    data: {
        phone: "",
        orgId: "",
        orgName: "",
        xcxVersion: a.globalData.xcxVersion,
        telInfo: {
            tel_chip1: "",
            tel_chip2: "",
            tel_chip3: ""
        },
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        showReturnIndexBtn: !1
    },
    onLoad: function(e) {
        var o = this;
        (0, t.agentInfoM)({
            ele: o,
            data: {
                xcxId: a.globalData.xcxId
            },
            fn: function() {
                var t = o.data.phone;
                t.length > 10 && o.setData({
                    telInfo: {
                        tel_chip1: t.substr(0, 3),
                        tel_chip2: t.substr(3, 4),
                        tel_chip3: t.substr(7, 4)
                    }
                });
            }
        }), o.getOrgName({
            orgId: a.globalData.orgId
        }), e.action && "goHome" == e.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    getOrgName: function(t) {
        var e = this;
        wx.request({
            url: a.globalData.host + "/coupon/org/info",
            method: "post",
            data: t,
            header: {
                "content-type": "application/json"
            },
            complete: function() {
                wx.stopPullDownRefresh(), wx.hideLoading();
            },
            success: function(t) {
                if (t.data) {
                    var a = t.data.data;
                    e.data.orgName = a.orgName;
                }
            },
            fail: function() {
                ShowDialog(e);
            }
        });
    },
    onShareAppMessage: function() {
        var t = this, e = getCurrentPages(), o = a.isHasTabByTitle({
            url: e[e.length - 1].route
        });
        console.log("tempJson=", o);
        var n = "/subPackage/my/pages/support/support?action=goHome";
        return o.check && (n = "/subPackage/my/pages/support/support"), {
            title: a.globalData.nickName + "给你推荐了「" + t.data.orgName + "」",
            path: n
        };
    },
    toTel: function(t) {
        var a = this.data.phone;
        wx.makePhoneCall({
            phoneNumber: a
        });
    }
});