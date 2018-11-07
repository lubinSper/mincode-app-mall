var e = Object.assign || function(e) {
    for (var a = 1; a < arguments.length; a++) {
        var t = arguments[a];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
}, a = require("../../../../conf"), t = getApp();

Page({
    data: {
        annualFee: "",
        memberCardInfo: "",
        hideBtn: !0,
        rightsList: [],
        textList: [],
        renew: !1,
        weixinPay: !1
    },
    onLoad: function(e) {
        e.hideBtn && this.setData({
            hideBtn: "true" == e.hideBtn
        }), this.getAllsetting();
    },
    onReady: function() {},
    onPullDownRefresh: function() {
        this.onShow();
    },
    onShow: function() {
        var e = this;
        console.log(wx.getStorageSync("memberCardInfo").vip), this.data.memberCardInfo = wx.getStorageSync("memberCardInfo"), 
        this.setData({
            memberCardInfo: wx.getStorageSync("memberCardInfo")
        }), t.ajaxSubmit({
            url: t.globalData.shopMHost + "xcx/superMember/setting",
            method: "post",
            header: {
                sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId,
                codeVersion: t.globalData.codeVersion
            },
            data: {
                orgId: t.globalData.orgId
            }
        }).then(function(a) {
            wx.hideLoading();
            var t = 0;
            e.data.memberCardInfo && 1 !== e.data.memberCardInfo.vip && 3 !== e.data.memberCardInfo.vip || (t = a.data.data.annualFee / 100), 
            2 === e.data.memberCardInfo.vip && 0 === e.data.memberCardInfo.vipRenewCount && (t = a.data.data.nextAnnualFee / 100), 
            e.setData({
                annualFee: t,
                renew: 2 == a.data.data.renew
            });
        });
    },
    getAllsetting: function() {
        var n = this;
        wx.request({
            url: a.Conf.superVipContent,
            method: "get",
            headers: {
                "Content-Type": "application/json",
                codeVersion: t.globalData.codeVersion
            },
            success: function(a) {
                console.log("请求结果", a), n.setData(e({}, a.data));
            }
        });
    },
    recharge: function() {
        var e = this;
        return new Promise(function(a, n) {
            t.ajaxSubmit({
                url: t.globalData.shopMHost + "xcx/superMember/openRenew",
                method: "post",
                header: {
                    sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
                },
                data: {
                    memberId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id,
                    openId: t.globalData.openid,
                    orgId: t.globalData.orgId,
                    type: 2 == wx.getStorageSync("memberCardInfo").vip ? 2 : 1,
                    shareMemberId: t.globalData.memberId,
                    xcxId: t.globalData.xcxId
                },
                isHideLoading: !0
            }).then(function(n) {
                "100001" != n.data.code ? "000000" === n.data.code ? (e.signWxPay(n.data.data), 
                a(n)) : wx.showToast({
                    title: n.data.msg || "服务器异常",
                    icon: "none"
                }) : t.loginInOtherPlaceAlert(n, function() {
                    jsons.repeatLogin && jsons.repeatLogin();
                });
            });
        });
    },
    signWxPay: function(a) {
        a && 0 != a.amount && 0 != this.data.annualFee ? wx.requestPayment({
            timeStamp: a.timeStamp,
            nonceStr: a.nonceStr,
            package: a.package,
            signType: a.signType,
            paySign: a.paySign,
            success: function(t) {
                var n = {
                    dealTime: a.transTime,
                    expirationDate: a.endDate,
                    orderNo: a.orderNo,
                    productName: a.productName,
                    payAmount: a.amount,
                    payType: 2 == wx.getStorageSync("memberCardInfo").vip ? 2 : 1
                };
                wx.setStorageSync("memberCardInfo", e({}, wx.getStorageSync("memberCardInfo"), {
                    vip: 2
                })), wx.redirectTo({
                    url: "/subPackage/vipCenter/pages/rechargeSuccess/index?type=super&config=" + JSON.stringify(n)
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "用户取消支付",
                    icon: "none"
                });
            }
        }) : wx.redirectTo({
            url: "/subPackage/superVip/pages/index/index?popType=" + (2 == wx.getStorageSync("memberCardInfo").vip ? "2" : "1")
        });
    },
    openSuperMember: function(e) {
        var a = this;
        t.submitFormIdM(e.detail.formId, t.globalData.orgId), t.isBindMemberCard().then(function(e) {
            console.log("会员卡开关----", e);
            var t = e.data.data.enableMemberCard;
            wx.getStorageSync("memberCardInfo") ? a.recharge() : 2 == t ? wx.navigateTo({
                url: "/subPackage/my/pages/login/login"
            }) : wx.showToast({
                title: "无法登录，请联系商家客服",
                icon: "none"
            });
        });
    }
});