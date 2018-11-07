var a = getApp();

Page({
    data: {
        disabled: !0,
        inputValue: "",
        isOpenPay: 0,
        isCanClickPay: !0,
        logoUrl: "",
        qrcodeUrl: "",
        orgName: ""
    },
    onLoad: function(t) {
        var e = this;
        wx.request({
            url: a.globalData.host + "pay/qrcode",
            data: {
                xcxId: a.globalData.xcxId
            },
            method: "post",
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                var t = a.data.data;
                t && e.setData({
                    logoUrl: t.logoUrl,
                    qrcodeUrl: t.qrcodeUrl,
                    orgName: t.orgName
                });
            }
        });
    },
    onShow: function() {
        this.getIsOpenPay(), this.setData({
            disabled: !0,
            inputValue: ""
        });
    },
    getIsOpenPay: function() {
        var t = this;
        a.getNewOpenId(function(e) {
            wx.request({
                url: a.globalData.host + "pay/isOpenPay",
                data: {
                    xcxId: a.globalData.xcxId
                },
                method: "post",
                header: {
                    "content-type": "application/json"
                },
                success: function(a) {
                    console.log("是否有支付权限"), console.log(a), a.data.data && t.setData({
                        isOpenPay: a.data.data.isOpenPay ? 1 : 2
                    });
                },
                fail: function() {
                    t.setData({
                        isOpenPay: 2
                    });
                }
            });
        });
    },
    inputPayNum: function(a) {
        var t = a.detail.value;
        if (0 == t.indexOf(".")) t = ""; else {
            var e = parseFloat(t);
            t = isNaN(e) ? "" : e > 1e6 ? t.substring(0, 6) : t.replace(/^(\d+)\.(\d\d).*$/, "$1.$2");
        }
        this.setData({
            inputValue: t,
            disabled: !(t > 0 && t < 1e6)
        });
    },
    bindButtonTap: function() {
        var t = this;
        if (t.data.isCanClickPay) {
            t.setData({
                isCanClickPay: !1
            });
            var e = parseFloat(t.data.inputValue);
            a.getNewOpenId(function(n) {
                wx.request({
                    url: a.globalData.host + "pay/sign",
                    data: {
                        openId: n,
                        totalFee: 100 * e,
                        xcxId: a.globalData.xcxId
                    },
                    method: "post",
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(a) {
                        console.log("获取支付签名"), console.log(a), void 0 != a.data.data && wx.requestPayment({
                            timeStamp: a.data.data.timeStamp,
                            nonceStr: a.data.data.nonceStr,
                            package: a.data.data.package,
                            signType: a.data.data.signType,
                            paySign: a.data.data.paySign,
                            success: function(a) {
                                t.setData({
                                    isCanClickPay: !0,
                                    inputValue: "",
                                    disabled: !0
                                });
                            },
                            fail: function(a) {
                                console.log("支付失败", a), t.setData({
                                    isCanClickPay: !0
                                });
                            }
                        });
                    },
                    error: function(a) {
                        console.log(a), t.setData({
                            isCanClickPay: !0,
                            inputValue: "",
                            disabled: !0
                        });
                    }
                });
            });
        }
    }
});