var e = require("../../../../components/function/base64/base64"), t = getApp();

Component({
    properties: {
        isShowPayInput: {
            type: Boolean,
            value: !1,
            observer: function(e, t) {}
        },
        focus: {
            type: Boolean,
            value: !1,
            observer: function(e, t) {}
        },
        remark: {
            type: String,
            value: "",
            observer: function(e, t) {}
        },
        totalFee: {
            type: String,
            value: "",
            observer: function(e, t) {}
        }
    },
    data: {
        isLoaded: !0
    },
    methods: {
        getBoardHeight: function(e) {
            var t = this;
            this.setData({
                password: ""
            }, function() {
                t.setData({
                    translateY: e.detail.height ? wx.getSystemInfoSync().windowHeight - e.detail.height : 450
                });
            });
        },
        emptyBoardHeight: function() {
            this.setData({
                translateY: wx.getSystemInfoSync().windowHeight
            }), this.closeDialog();
        },
        setPayPass: function(e) {
            var t = this;
            e.detail.value.length > 6 ? this.setData({
                focus: !1
            }) : this.setData({
                password: e.detail.value.slice(0, 6)
            }, function() {
                6 != t.data.password.length || t.data.disabled || t.sendPayPassSubmit();
            });
        },
        sendPayPassSubmit: function() {
            var a = this;
            this.setData({
                disabled: !0
            }), t.ajaxSubmit({
                url: t.globalData.host + "pay/memberCardPay",
                method: "post",
                header: {
                    sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
                },
                data: {
                    memberId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id,
                    payPassword: (0, e.Base64Encode)(this.data.password + "member"),
                    remark: this.data.remark,
                    totalFee: 100 * this.data.totalFee,
                    xcxId: t.globalData.xcxId
                },
                isHideLoading: !0
            }).then(function(e) {
                if (console.log(e), a.setData({
                    password: "",
                    focus: !1,
                    disabled: !1
                }), "900001" != e.data.code) if ("900002" != e.data.code) {
                    if ("000000" !== e.data.code) return wx.showToast({
                        title: e.data.msg || "支付失败",
                        icon: "none"
                    }), void a.closeDialog();
                    wx.navigateTo({
                        url: "/subPackage/business/pages/pay_page/pay_complete?inputValue=" + a.data.totalFee + "&remark=" + a.data.remark + "&payWay=会员卡支付"
                    }), a.closeDialog();
                } else wx.showModal({
                    title: "",
                    content: e.data.msg,
                    cancelText: "确定",
                    confirmColor: "#d3a95a",
                    confirmText: "忘记密码",
                    success: function(e) {
                        e.confirm && a.forgetPass();
                    }
                }); else wx.showModal({
                    title: "",
                    content: e.data.msg,
                    cancelText: "重新输入",
                    confirmColor: "#d3a95a",
                    confirmText: "忘记密码",
                    success: function(e) {
                        e.confirm ? a.forgetPass() : a.setData({
                            focus: !1
                        }, function() {
                            a.setData({
                                focus: !0
                            });
                        });
                    }
                });
            });
        },
        forgetPass: function() {
            wx.navigateTo({
                url: "/subPackage/my/pages/vip_security_center/vip_security_center?forget=1"
            });
        },
        closeDialog: function() {
            this.triggerEvent("closeDialog");
        },
        setFocus: function() {
            this.setData({
                focus: !0
            });
        }
    }
});