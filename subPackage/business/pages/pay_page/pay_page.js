var a = getApp();

Page({
    data: {
        disabled: !0,
        inputValue: "",
        isOpenPay: 0,
        isCanClickPay: !0,
        logoUrl: "",
        qrcodeUrl: "",
        orgName: "",
        realValue: "",
        confirmBtnText: "确认买单",
        remark: "",
        textValue: "",
        isOpenMemberCard: !1,
        enableOffLinePay: !1,
        showVipPay: !1,
        isEnableOffLinePay: !1,
        isShowPayWayDialog: !1,
        isShowMrDialog: !1,
        curPayWay: 0,
        iconPath: "",
        payWayList: [],
        showReturnIndexBtn: !1,
        isLogin: !1,
        enterFocus: !1,
        hasFocus: !1
    },
    onLoad: function(a) {
        var e = this;
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 2e3
        }), a.action && "goHome" == a.action ? e.setData({
            showReturnIndexBtn: !0
        }) : e.setData({
            showReturnIndexBtn: !1
        });
    },
    onShow: function() {
        var a = this;
        wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId && a.isSetPassWord(), 
        a.setData({
            inputValue: "",
            realValue: ""
        }), a.getIsOpenPay(function() {
            a.addPayWay();
        });
    },
    addPayWay: function() {
        var a = this, e = [];
        1 == a.data.isOpenPay && e.push({
            title: "微信支付",
            iconPath: "wechat"
        }), wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId && a.data.enableOffLinePay ? (a.setData({
            showVipPay: !0
        }), e.push({
            title: "会员卡支付",
            iconPath: "VIPcardyue"
        })) : a.setData({
            showVipPay: !1
        }), a.setData({
            payWayList: e,
            iconPath: e[0].iconPath
        });
    },
    getIsOpenPay: function(e) {
        var t = this, n = this;
        a.getNewOpenId(function(o) {
            wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId && t.isLoginMemberCard(), 
            wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId && t.getVipCradInfo(), 
            wx.request({
                url: a.globalData.host + "pay/isOpenPay",
                data: {
                    xcxId: a.globalData.xcxId
                },
                method: "post",
                header: {
                    codeVersion: a.globalData.codeVersion,
                    "content-type": "application/json"
                },
                success: function(a) {
                    console.log("是否有支付权限"), console.log(a), a.statusCode >= 400 ? wx.showToast({
                        title: "网络连接失败",
                        icon: "none"
                    }) : (a.data.data && (n.setData({
                        isOpenPay: a.data.data.isOpenPay ? 1 : 2,
                        enableOffLinePay: !!a.data.data.enableOffLinePay
                    }, function() {
                        e && e();
                    }), wx.hideToast()), wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId && n.isBindMemberCard());
                },
                fail: function() {
                    wx.showToast({
                        title: "网络连接失败",
                        icon: "none"
                    });
                }
            });
        });
    },
    inputPayNum: function(a) {
        console.log("############"), console.log(a.detail.value);
        var e = a.detail.value.replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", "."), t = "", n = "";
        if (console.log(e), 0 == e.slice(0, 1) && "." !== e.slice(1, 2) && (e = e.slice(0, 1)), 
        -1 != e.indexOf("¥") && (e = e.substring(1, e.length)), 0 == e.indexOf(".")) e = ""; else {
            var o = parseFloat(e);
            e = isNaN(o) ? "" : o >= 1e6 ? e.substring(0, 6) : e.replace(/^(\d+)\.(\d\d).*$/, "$1.$2");
        }
        "" != e ? (t = e, n = e + "元 确认买单") : n = "确认买单", console.log("inputValue==", t), 
        this.setData({
            textValue: e,
            inputValue: t,
            confirmBtnText: n,
            realValue: e,
            disabled: !(e > 0 && e < 1e6)
        });
    },
    utf16toEntities: function(a) {
        var e = /[\ud800-\udbff][\udc00-\udfff]/g;
        return a = a.replace(e, function(a) {
            var e, t;
            return 2 === a.length ? (e = a.charCodeAt(0), t = a.charCodeAt(1), "&#" + (1024 * (e - 55296) + 65536 + t - 56320) + ";") : a;
        });
    },
    bindRemark: function(a) {
        console.log("eeeeeeeeee", this.utf16toEntities(encodeURI(a.detail.value)));
        var e = /([^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n])|(\s)/g, t = a.detail.value.replace(e, "");
        this.setData({
            remark: t,
            hasFocus: !0
        });
    },
    isSetPassWord: function() {
        var e = this;
        return new Promise(function(t, n) {
            a.ajaxSubmit({
                url: a.globalData.shopMHost + "xcx/member/isSetPwd",
                method: "post",
                data: {
                    memberId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id
                },
                header: {
                    "content-type": "application/json",
                    sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
                },
                isHideLoading: !0
            }).then(function(a) {
                "000000" === a.data.code ? (e.setData({
                    isSetPwd: 2 == a.data.data
                }), t(a)) : wx.showToast({
                    title: a.data.msg,
                    icon: "none"
                });
            });
        });
    },
    bindButtonTap: function(e) {
        var t = this;
        a.submitFormIdM(e.detail.formId, a.globalData.orgId);
        t.data.inputValue;
        if (t.data.isCanClickPay) if ("VIPcardyue" != this.data.iconPath || this.data.isSetPwd) if ("VIPcardyue" == this.data.iconPath && this.data.textValue > (this.data.memberCardInfo && this.data.memberCardInfo.balance / 100)) this.showBlanceTip(); else if ("VIPcardyue" != this.data.iconPath) {
            var n = parseFloat(t.data.textValue);
            t.setData({
                isCanClickPay: !1
            });
            var o = 0 == t.data.curPayWay ? "微信支付" : "会员卡支付";
            a.getNewOpenId(function(e) {
                wx.request({
                    url: a.globalData.host + "pay/sign",
                    data: {
                        openId: e,
                        totalFee: 100 * n,
                        xcxId: a.globalData.xcxId,
                        remark: t.data.remark
                    },
                    method: "post",
                    header: {
                        codeVersion: a.globalData.codeVersion,
                        "content-type": "application/json"
                    },
                    success: function(a) {
                        return console.log("获取支付签名"), console.log(a), a.statusCode >= 400 ? (wx.showToast({
                            title: "网络错误",
                            icon: "none"
                        }), void t.setData({
                            isCanClickPay: !0
                        })) : a.data && "900000" == a.data.code ? (wx.showToast({
                            title: a.data.msg,
                            icon: "none"
                        }), void t.setData({
                            isCanClickPay: !0
                        })) : void (void 0 != a.data.data ? wx.requestPayment({
                            timeStamp: a.data.data.timeStamp,
                            nonceStr: a.data.data.nonceStr,
                            package: a.data.data.package,
                            signType: a.data.data.signType,
                            paySign: a.data.data.paySign,
                            success: function(a) {
                                wx.navigateTo({
                                    url: "/subPackage/business/pages/pay_page/pay_complete?inputValue=" + t.data.inputValue + "&remark=" + t.data.remark + "&payWay=" + o
                                }), t.setData({
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
                        }) : t.setData({
                            isCanClickPay: !0
                        }));
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
        } else this.setData({
            focus: !0,
            isShowPayInput: !0
        }); else wx.showModal({
            title: "请设置支付密码",
            content: "为了保证你的资金安全，请先设置支付密码。设置后才可进行充值、会员卡消费等操作。",
            cancelText: "取消",
            confirmColor: "#d3a95a",
            confirmText: "马上设置",
            success: function(a) {
                a.confirm && wx.navigateTo({
                    url: "/subPackage/my/pages/vip_security_center/set_password/set_password?isFirstLogin=1"
                });
            }
        });
    },
    openBuyRecord: function() {
        wx.navigateTo({
            url: "/subPackage/business/pages/pay_page/pay_record"
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
        });
    },
    checkPayWay: function(a) {
        this.setData({
            curPayWay: a.currentTarget.dataset.index,
            iconPath: a.currentTarget.dataset.iconpath
        }), this.closePayWayDialog();
    },
    closeMrDialog: function() {
        this.setData({
            isShowMrDialog: !1
        }), wx.setStorageSync("isCloseMrDialog", !0);
    },
    showBlanceTip: function() {
        var a = this;
        wx.showModal({
            title: "余额不足",
            content: "会员卡余额不足以支付此订单，请选择其他支付方式或立即充值",
            cancelText: "返回",
            confirmColor: "#ff7800",
            confirmText: "立即充值",
            success: function(e) {
                e.confirm && (a.data.enableReturnGive ? wx.navigateTo({
                    url: "/subPackage/vipCenter/pages/recharge/index"
                }) : wx.navigateTo({
                    url: "/subPackage/vipCenter/pages/index/index"
                }));
            }
        });
    },
    toGetMemberCard: function() {
        this.setData({
            isShowMrDialog: !1
        }), wx.navigateTo({
            url: "/subPackage/my/pages/login/login"
        });
    },
    closeDialog: function() {
        var a = this;
        this.setData({
            isShowPayInput: !1,
            focus: !1
        }, function() {
            console.log(a.data);
        });
    },
    isLoginMemberCard: function() {
        var e = this;
        return new Promise(function(t, n) {
            a.ajaxSubmit({
                url: a.globalData.shopMHost + "xcx/member/getXcxMemberLoginStatus",
                method: "post",
                header: {
                    sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
                },
                data: {
                    openId: a.globalData.openid,
                    xcxId: a.globalData.xcxId
                },
                isHideLoading: !0
            }).then(function(a) {
                e.setData({
                    isLogin: 1 == a.data.data
                }), t(a);
            });
        });
    },
    isBindMemberCard: function() {
        var e = this;
        a.isBindMemberCard().then(function(a) {
            "000000" === a.data.code ? e.setData({
                isLogin: !(!wx.getStorageSync("memberCardInfo") || !wx.getStorageSync("memberCardInfo").sessionId),
                dialogRemark: a.data.data.remark,
                enableReturnGive: 2 == a.data.data.enableReturnGive,
                isOpenMemberCard: 2 == a.data.data.enableMemberCard,
                isEnableOffLinePay: 2 == a.data.data.enableOffLinePay
            }, function() {
                wx.getStorageSync("memberCardInfo") || !e.data.isOpenMemberCard || 1 != e.data.isOpenPay ? e.setData({
                    enterFocus: !0
                }) : e.setData({
                    isShowMrDialog: !0,
                    enterFocus: !1
                });
            }) : wx.showToast({
                title: a.data.msg,
                icon: "none"
            });
        });
    },
    getVipCradInfo: function() {
        var e = this;
        a.getVipCradInfo().then(function(a) {
            e.setData({
                memberCardInfo: a.data && a.data.data || {}
            });
        });
    }
});