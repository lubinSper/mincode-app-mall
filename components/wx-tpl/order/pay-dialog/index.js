var e = getApp();

Component({
    properties: {
        isShowPayDialog: {
            type: Boolean,
            value: !1,
            observer: function(e, t) {}
        },
        memberCardInfo: {
            type: Object,
            value: {},
            observer: function(e, t) {}
        },
        rechargeValue: {
            type: String,
            value: "",
            observer: function(e, t) {}
        },
        recharge: {
            type: Boolean,
            value: !0,
            observer: function(e, t) {}
        }
    },
    data: {
        hideInput: !1,
        focus: !0,
        isShowInput: !0
    },
    ready: function() {
        e.getNewOpenId(function() {});
    },
    methods: {
        recharge: function() {
            var t = this;
            return new Promise(function(a, n) {
                e.ajaxSubmit({
                    url: e.globalData.shopMHost + "xcx/member/recharge",
                    method: "post",
                    header: {
                        sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
                    },
                    data: {
                        amount: 100 * t.data.rechargeValue,
                        memberId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id,
                        openId: e.globalData.openid,
                        orgId: e.globalData.orgId,
                        xcxId: e.globalData.xcxId
                    },
                    isHideLoading: !0
                }).then(function(n) {
                    "100001" != n.data.code ? "000000" === n.data.code ? (t.triggerEvent("setRechargeValue", {
                        value: ""
                    }), t.signWxPay(n.data.data), a(n)) : wx.showToast({
                        title: n.data.msg || "服务器异常",
                        icon: "none"
                    }) : e.loginInOtherPlaceAlert(n, function() {
                        jsons.repeatLogin && jsons.repeatLogin();
                    });
                });
            });
        },
        signWxPay: function(e) {
            var t = this;
            wx.requestPayment({
                timeStamp: e.timeStamp,
                nonceStr: e.nonceStr,
                package: e.package,
                signType: e.signType,
                paySign: e.paySign,
                success: function(a) {
                    t.triggerEvent("paySuccess", e);
                },
                fail: function(e) {
                    t.triggerEvent("paySuccess", {}), wx.showToast({
                        title: "用户取消支付",
                        icon: "none"
                    });
                }
            });
        },
        closeDialog: function() {
            this.triggerEvent("closePayDialog", {
                isSure: !1
            });
        },
        setRechargeValue: function(e) {
            var t = e.detail.value.replace(/[^\d]/g, "").replace(/^0/, "");
            this.triggerEvent("setRechargeValue", {
                value: t
            });
        },
        bindfocus: function() {
            var e = this;
            this.data.isShowPayDialog || this.setData({
                isShowInput: !1,
                focus: !1
            }, function() {
                console.log(e.data);
            });
        },
        surePrice: function() {
            this.data.rechargeValue && (this.triggerEvent("surePrice", {
                isSetPrice: !0
            }), this.triggerEvent("closePayDialog", {
                isSure: !0
            }), this.data.recharge && this.recharge());
        }
    }
});