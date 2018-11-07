var t = require("../../../../components/template/show_dialog/show_dialog.js"), e = getApp();

Page({
    data: {
        memberId: "",
        phone: "",
        vertifyCode: "",
        isShow: !1,
        buttonText: "获取验证码",
        curCount: 60,
        isClick: !1,
        isNextClick: !0,
        isCount: !1,
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        openId: "",
        sessionId: "",
        isSetPwd: 1
    },
    onLoad: function(t) {
        1 == t.forget && this.setData({
            isShow: !0
        });
        var o = wx.getStorageSync("memberCardInfo");
        o && o.sessionId && this.setData({
            phone: this.toStart(o.phone),
            memberId: o.id,
            sessionId: o.sessionId
        });
        var a = this;
        e.getNewOpenId(function(t) {
            a.setData({
                openId: t
            }, function() {
                console.log("openId", a.data.openId);
            });
        }), a.isSetPassWord();
    },
    toStart: function(t) {
        return t.substr(0, 3) + "****" + t.substr(7);
    },
    isSetPassWord: function() {
        var o = this;
        wx.request({
            url: e.globalData.shopMHost + "/xcx/member/isSetPwd",
            method: "post",
            data: {
                memberId: o.data.memberId,
                sessionId: o.data.sessionId
            },
            header: {
                "content-type": "application/json",
                sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
            },
            success: function(t) {
                "000000" === t.data.code ? o.setData({
                    isSetPwd: t.data.data
                }) : wx.showToast({
                    title: t.data.msg,
                    icon: "none"
                });
            },
            fail: function() {
                (0, t.ShowDialog)(o);
            }
        });
    },
    modifyPassword: function() {
        var t = this;
        2 != t.data.isSetPwd ? wx.showModal({
            title: "请设置支付密码",
            content: "为了保证你的资金安全，请先设置支付密码。设置后才可进行充值、会员卡消费等操作。",
            cancelText: "取消",
            confirmColor: "#d3a95a",
            confirmText: "马上设置",
            success: function(t) {
                t.confirm && wx.navigateTo({
                    url: "/subPackage/my/pages/vip_security_center/set_password/set_password"
                });
            }
        }) : t.setData({
            isShow: !0,
            buttonText: "获取验证码",
            isCount: !1
        });
    },
    getCode: function() {
        var o = this;
        wx.request({
            url: e.globalData.shopMHost + "/xcx/member/getValidCode",
            method: "post",
            data: {
                phone: wx.getStorageSync("memberCardInfo").phone
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                t.data && "000000" == t.data.code ? (o.SetRemainTime(2, "重新获取"), wx.showToast({
                    title: "验证码已发送",
                    icon: "none"
                })) : t.data && "" != t.data.msg ? wx.showToast({
                    title: t.data.msg,
                    icon: "none"
                }) : wx.showToast({
                    title: "验证码发送失败",
                    icon: "none"
                });
            },
            fail: function() {
                (0, t.ShowDialog)(o);
            }
        });
    },
    SetRemainTime: function(t, e) {
        var o, a = this, s = a.data.curCount;
        1 == t ? a.setData({
            buttonText: e
        }) : o = setInterval(function() {
            s--, a.setData({
                buttonText: e + "(" + s + "s)",
                isClick: !0
            }), (s < 1 || a.data.isCount) && (a.setData({
                buttonText: "获取验证码",
                isClick: !1
            }), clearInterval(o));
        }, 1e3);
    },
    clickMask: function() {
        this.setData({
            isShow: !1,
            isCount: !0
        });
    },
    bindKeyCode: function(t) {
        var e = this;
        e.data.vertifyCode = t.detail.value.replace(/\s+/g, ""), e.data.vertifyCode ? e.setData({
            isNextClick: !1
        }) : e.setData({
            isNextClick: !0
        });
    },
    navgateToPsw: function() {
        var o = this;
        wx.showLoading({
            title: "加载中..."
        }), wx.request({
            url: e.globalData.shopMHost + "/xcx/member/validMobile",
            method: "post",
            data: {
                orgId: e.globalData.orgId,
                phone: wx.getStorageSync("memberCardInfo").phone,
                code: o.data.vertifyCode
            },
            header: {
                "content-type": "application/json",
                sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
            },
            success: function(t) {
                wx.hideLoading(), t.data && "000000" == t.data.code ? 1 == t.data.data ? (wx.navigateTo({
                    url: "/subPackage/my/pages/vip_security_center/set_password/set_password?type=1"
                }), o.setData({
                    isShow: !1,
                    isNextClick: !0,
                    isCount: !0
                })) : wx.showToast({
                    title: "验证码错误，请重新输入",
                    icon: "none"
                }) : "100001" == t.data.code ? e.loginInOtherPlaceAlert(t, function() {
                    jsons.repeatLogin && jsons.repeatLogin();
                }) : t.data && "" != t.data.msg && wx.showToast({
                    title: t.data.msg,
                    icon: "none"
                });
            },
            fail: function() {
                wx.hideLoading(), (0, t.ShowDialog)(o);
            }
        });
    },
    exitLogon: function() {
        var o = this;
        wx.showModal({
            title: "退出登录",
            content: "确定退出此会员卡吗？",
            confirmText: "退出",
            confirmColor: "#d3a95a",
            success: function(a) {
                a.confirm && wx.request({
                    url: e.globalData.shopMHost + "/xcx/member/logout",
                    method: "post",
                    data: {
                        phone: wx.getStorageSync("memberCardInfo").phone,
                        openId: o.data.openId,
                        orgId: e.globalData.orgId
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(t) {
                        "000000" == t.data.code ? (wx.removeStorageSync("memberCardInfo"), wx.showToast({
                            title: "退出成功",
                            icon: "success",
                            success: function(t) {
                                setTimeout(function() {
                                    wx.switchTab({
                                        url: "/page/my/my"
                                    });
                                }, 1e3);
                            }
                        })) : t.data.msg && "" != t.data.msg && wx.showToast({
                            title: t.data.msg,
                            icon: "none"
                        });
                    },
                    fail: function() {
                        (0, t.ShowDialog)(o);
                    }
                });
            }
        });
    }
});