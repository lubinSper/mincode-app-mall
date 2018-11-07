var o = require("../../../../components/model/my/my_m"), e = require("../../components/model/member_m"), t = getApp();

Page({
    data: {
        orgLogo: "",
        orgName: "",
        showLayer: !1,
        codeText: "获取验证码",
        isLogin: !1,
        phone: "",
        code: ""
    },
    onLoad: function(o) {
        var e = this;
        t.getOrgInfo(function(o, t) {
            t && e.setData({
                orgLogo: t.logo,
                orgName: t.orgName
            });
        });
    },
    showPhoneLogin: function() {
        this.setData({
            showLayer: !0
        });
    },
    getPhoneNumber: function(o) {
        var e = this, a = o.detail, n = a.iv, i = a.encryptedData, s = a.errMsg;
        console.log(s), console.log(n), console.log(i), "getPhoneNumber:fail user deny" != s && "getPhoneNumber:fail 该 appid 没有权限" != s && "getPhoneNumber:fail:cancel to bind phone" != s && "getPhoneNumber:fail:cancel to confirm login" != s && "getPhoneNumber:fail:user cancel" != s && "getPhoneNumber:fail 用户绑定的手机需要进行验证，请在客户端完成短信验证步骤" != s && (n && i ? (wx.showLoading({
            title: "加载中..."
        }), wx.login({
            success: function(o) {
                var a = {
                    encryptedData: i,
                    iv: n,
                    code: o.code ? o.code : "",
                    openId: t.globalData.openid,
                    xcxId: t.globalData.xcxId,
                    orgId: t.globalData.orgId
                };
                wx.request({
                    url: t.globalData.shopMHost + "xcx/member/wechat/phone/decrypt",
                    method: "post",
                    data: a,
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(o) {
                        if (wx.hideLoading(), console.log("xcx/member/wechat/phone/decrypt", o.data), "000000" == o.data.code) if (o.data.data) {
                            var t = o.data.data;
                            e.setData({
                                balance: t.balance,
                                cardNo: t.cardNo,
                                id: t.id,
                                showLayer: !1,
                                firstLogin: t.firstLogin
                            }), t.sessionId && wx.setStorageSync("memberCardInfo", t), e.submitNavigator();
                        } else wx.showToast({
                            title: "登录失败,无会员信息",
                            icon: "none"
                        }); else wx.showToast({
                            title: o.data.msg,
                            icon: "none"
                        });
                    },
                    fail: function() {
                        wx.hideLoading(), wx.showToast({
                            title: "网络连接失败",
                            icon: "none"
                        });
                    }
                });
            },
            fail: function() {
                wx.showToast({
                    title: "微信登录失败",
                    icon: "none"
                });
            }
        })) : wx.showToast({
            title: "该小程序不支持快捷登录，请使用验证码登录",
            icon: "none"
        }));
    },
    phoneChange: function(o) {
        var e = o.detail.value;
        this.setData({
            phone: e,
            isLogin: e && this.data.code
        });
    },
    codeChange: function(o) {
        var e = o.detail.value;
        this.setData({
            code: e,
            isLogin: e && this.data.phone
        });
    },
    sendCode: function() {
        if ("获取验证码" == this.data.codeText) {
            var e = this.data.phone;
            if (/^1[3578]\d{9}$/.test(e)) {
                var t = this;
                (0, o.phoneValidCodeM)({
                    ele: t,
                    data: {
                        phone: e
                    },
                    fn: function() {
                        wx.showToast({
                            title: "验证码已发送",
                            icon: "none"
                        }), t.countdown(60);
                    }
                });
            } else wx.showToast({
                title: "请输入正确的手机号码",
                icon: "none"
            });
        }
    },
    countdown: function(o) {
        var e = this;
        this.setData({
            codeText: "重新获取(" + o + "s)"
        }), setTimeout(function() {
            0 == --o ? e.setData({
                codeText: "获取验证码"
            }) : e.countdown(o);
        }, 1e3);
    },
    submitBind: function(o) {
        t.submitFormIdM(o.detail.formId, t.globalData.orgId);
        var a = this;
        if (a.data.isLogin) {
            var n = this.data, i = n.phone, s = n.code;
            if (/^1[3578]\d{9}$/.test(i)) {
                wx.showLoading({
                    title: "加载中...",
                    mask: !0
                });
                var d = {
                    openId: t.globalData.openid,
                    orgId: t.globalData.orgId,
                    phone: i,
                    validCode: s,
                    xcxId: t.globalData.xcxId
                };
                (0, e.loginM)({
                    ele: a,
                    data: d,
                    fn: function(o) {
                        a.submitNavigator();
                    }
                });
            } else wx.showToast({
                title: "请输入正确的手机号码",
                icon: "none"
            });
        }
    },
    submitNavigator: function() {
        wx.showToast({
            title: "登录成功"
        }), t.globalData.vipLogin = !0;
        var o = this;
        setTimeout(function() {
            wx.redirectTo({
                url: "/subPackage/superVip/pages/index/index?firstLogin=" + o.data.firstLogin
            });
        }, 10);
    },
    closeLayer: function() {
        this.setData({
            showLayer: !1
        });
    }
});