var a = require("./order_sure_product_m.js"), e = require("./order_price_payment_m.js"), t = require("../../../../../components/template/show_dialog/show_dialog"), i = require("../../../../../components/function/base64/base64"), n = (require("../../../../../components/function/showTime/showTime"), 
require("../../../../../components/model/my/my_m")), o = getApp();

require("../../../../../util/es6-promise.min.js");

Page({
    data: {
        payMethod: 3,
        dateTime: "请选择",
        textAreaValue: "",
        carrier: "",
        contact_Tel: "",
        freight: 0,
        goodsz: {
            goodId: 0,
            coverImage: "",
            name: "",
            price: 0,
            originalPrice: 0,
            inventory: 0,
            price2: 0,
            superMemberPrice: "",
            enableSupperMemberPrice: 1
        },
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        id: 0,
        canPayFor: 1,
        isOrderTime: 1,
        base64DateTime: "",
        hasData: !1,
        clickNum: !0,
        isShowPayWayDialog: !1,
        payList: [ {
            name: "微信支付",
            icon: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/wechat.png",
            use: !1
        }, {
            name: "会员卡支付",
            icon: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/VIPcardyue.png",
            use: !1
        }, {
            name: "到店支付",
            use: !1
        } ],
        payIndex: 0,
        showPayPwdInput: !1,
        balance: 0,
        isSetPwd: 1,
        password: "",
        enableReturnGive: 1
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "加载中"
        });
        var n = this;
        t && (n.data.id = t.id ? t.id : null, n.data.contact_Tel = t.contact_Tel ? t.contact_Tel : null, 
        n.data.carrier = t.carrier ? t.carrier : null, n.data.textAreaValue = t.textAreaValue ? t.textAreaValue : "", 
        n.setData(n.data)), this.setData({
            isSuperVip: wx.getStorageSync("memberCardInfo") && (2 == wx.getStorageSync("memberCardInfo").vip || 3 == wx.getStorageSync("memberCardInfo").vip)
        }), o.getNewOpenId(function(e) {
            (0, a.orderSureProductM)({
                ele: n,
                data: {
                    id: t.id,
                    openId: e
                }
            }).then(function() {
                "undefined" == n.data.dateTime ? n.data.dateTime = "请选择" : "" != n.data.dateTime && "请选择" != n.data.dateTime && 1 != n.data.isOrderTime || "undefined" != t.dateTime && (n.data.base64DateTime = (0, 
                i.Base64Encode)(t.dateTime), n.data.dateTime = t.dateTime, n.setData(n.data)), n.canMemberCardPay(), 
                n.setData({
                    firstRequest: !0
                });
            });
        }), (0, e.orderPricePaymentM)({
            ele: n,
            data: {
                xcxId: o.globalData.xcxId
            }
        });
    },
    onShow: function() {
        this.data.firstRequest && this.canMemberCardPay();
    },
    changeDateTime: function(a) {
        var e = this;
        if (1 == e.data.isOrderTime) {
            var t = "/subPackage/my/pages/order/schedule_time/schedule_time?page=schdule_time&id=" + e.data.id + "&textAreaValue=" + e.data.textAreaValue + "&carrier=" + e.data.carrier + "&contact_Tel=" + e.data.contact_Tel + "&dateTime=" + e.data.base64DateTime + "&newDateTime=" + e.data.dateTime;
            wx.navigateTo({
                url: t
            });
        }
    },
    bindTextAreaBlur: function(a) {
        this.setData({
            textAreaValue: a.detail.value
        });
    },
    bindKeycarrier: function(a) {
        var e = this;
        e.data.carrier = a.detail.value, e.data.contact_Tel && e.data.carrier ? e.data.canPayFor = 0 : e.data.canPayFor = 1, 
        e.setData(e.data);
    },
    bindKeyContactTel: function(a) {
        var e = this;
        e.data.contact_Tel = a.detail.value, e.data.carrier && e.data.contact_Tel ? e.data.canPayFor = 0 : e.data.canPayFor = 1, 
        e.setData(e.data);
    },
    confirmPayment: function(a) {
        var e = this;
        e.data.payMethod;
        return "请选择" == e.data.dateTime ? (e.data.showTipData.content = "请选择预约时间", void (0, 
        t.ShowDialog)(e, "请选择预约时间")) : Date.parse(e.data.dateTime.replace(/-/g, "/")) < Date.parse(new Date()) ? void (0, 
        t.ShowDialog)(e, "预约时间必须大于当前时间") : 1 == e.data.payIndex ? 2 != this.data.isSetPwd ? void wx.showModal({
            title: "请设置支付密码",
            content: "为了保证你的资金安全，请先设置支付密码。设置后才可进行充值、会员卡消费等操作。",
            cancelText: "取消",
            confirmColor: "#d3a95a",
            confirmText: "马上设置",
            success: function(a) {
                a.confirm && wx.navigateTo({
                    url: "/subPackage/my/pages/vip_security_center/set_password/set_password"
                });
            }
        }) : this.data.balance < e.data.goodsz.price2 ? void wx.showModal({
            title: "余额不足",
            content: "会员卡余额不足以支付此订单，请选择其他支付方式或立即充值。",
            cancelText: "返回",
            confirmText: "立即充值",
            confirmColor: "#ff7800",
            success: function(a) {
                a.confirm && (wx.showLoading({
                    title: "加载中..."
                }), o.isBindMemberCard().then(function(a) {
                    wx.hideLoading(), "000000" == a.data.code && a.data.data && 2 == a.data.data.enableReturnGive ? wx.navigateTo({
                        url: "/subPackage/vipCenter/pages/recharge/index"
                    }) : wx.navigateTo({
                        url: "/subPackage/vipCenter/pages/index/index"
                    });
                }));
            }
        }) : void e.setData({
            focus: !0,
            isShowPayInput: !0
        }) : void e.continuePaymentd();
    },
    continuePaymentd: function() {
        var a = this, t = [ {
            inventory: 1,
            productId: parseInt(a.data.id)
        } ];
        if (a.data.clickNum) {
            a.setData({
                clickNum: !1
            });
            var n = 0;
            n = 0 == a.data.payIndex ? 3 : 1 == a.data.payIndex ? 6 : 4, wx.showLoading({
                title: "提交中...",
                mask: !0
            }), o.getNewOpenId(function(r) {
                (0, e.orderPricePayment)({
                    ele: a,
                    data: {
                        address: "",
                        amount: a.data.isSuperVip && a.data.goodsz.superMemberPrice ? 100 * a.data.goodsz.superMemberPrice : a.data.goodsz.price2,
                        consigneeName: a.data.carrier,
                        customerRemark: a.data.textAreaValue,
                        freight: 0,
                        goodId: parseInt(a.data.id),
                        goodList: t,
                        mobilePhone: a.data.contact_Tel,
                        openId: r,
                        payMethod: n,
                        payPassword: (0, i.Base64Encode)(a.data.password + "member"),
                        memberId: wx.getStorageSync("memberCardInfo") ? wx.getStorageSync("memberCardInfo").id : "",
                        reserveTime: a.data.dateTime,
                        xcxId: o.globalData.xcxId,
                        shareMemberId: o.globalData.shareMemberId ? o.globalData.shareMemberId : ""
                    },
                    reInput: function() {
                        a.setData({
                            focus: !0,
                            isShowPayInput: !0
                        });
                    }
                }).then(function() {
                    setTimeout(function() {
                        a.setData({
                            clickNum: !0
                        }, function() {
                            wx.hideLoading();
                        });
                    }, 1e3);
                }, function() {
                    a.setData({
                        clickNum: !0
                    }, function() {
                        wx.hideLoading();
                    });
                });
            });
        }
    },
    pwdInputComplete: function(a) {
        var e = this;
        this.setData({
            password: a.detail.pwd,
            focus: !1,
            isShowPayInput: !1
        }, function() {
            e.continuePaymentd();
        });
    },
    canMemberCardPay: function() {
        var a = this;
        if (wx.getStorageSync("memberCardInfo") && 2 == a.data.goodsz.isSupportMemberCardPay) {
            var e = a.data.payList;
            e[1].use = !0, a.setData({
                payList: e
            });
            var t = wx.getStorageSync("memberCardInfo");
            (0, n.isSetPayPwdM)({
                ele: a,
                data: {
                    memberId: t.id,
                    sessionId: t.sessionId
                }
            });
        }
        var i = wx.getStorageSync("memberCardInfo");
        i && (0, n.memberInfoM)({
            ele: a,
            data: {
                memberId: i.id,
                sessionId: i.sessionId
            },
            repeatLogin: function() {
                var e = a.data.payList;
                e[1].use = !1, a.setData({
                    payList: e
                });
            }
        });
    },
    showPayWayDialog: function() {
        var a = this, e = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        }), t = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        e.translateY(0).step({
            duration: 50
        }), e.opacity(1).step(), t.translateY(0).step(), t.opacity(1).step(), this.setData({
            isShowPayWayDialog: !0
        }, function() {
            a.setData({
                animationData1: e.export(),
                animationData2: t.export()
            });
        });
    },
    closePayWayDialog: function() {
        var a = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        }), e = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        a.opacity(0).step(), a.translateY(wx.getSystemInfoSync().windowHeight).step(), e.translateY(wx.getSystemInfoSync().windowHeight).step(), 
        this.setData({
            animationData1: a.export(),
            animationData2: e.export()
        }, function() {
            this.setData({
                isShowPayWayDialog: !1
            });
        });
    },
    checkPayWay: function(a) {
        if (1 == a.currentTarget.dataset.index && !a.currentTarget.dataset.use) return wx.showModal({
            title: "不支持会员卡支付",
            content: "部分商品不支持会员卡支付，请选择其他付款方式或联系商家客服",
            showCancel: !1
        }), void this.closePayWayDialog();
        this.setData({
            payIndex: a.currentTarget.dataset.index
        }), this.closePayWayDialog();
    },
    closePayInputDialog: function() {
        this.setData({
            isShowPayInput: !1,
            focus: !1
        });
    }
});