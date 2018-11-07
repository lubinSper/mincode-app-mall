var s = require("../../../../../components/template/show_dialog/show_dialog.js"), t = require("../../../../../components/function/base64/base64"), a = getApp();

Page({
    data: {
        type: 2,
        isNextClick: !0,
        psw1: "",
        psw2: "",
        psw1Display: !1,
        psw2Display: !1,
        placeholder1: "",
        placeholder2: "",
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        memberId: "",
        sessionId: ""
    },
    onLoad: function(s) {
        console.log(s), this.setData({
            isFirstLogin: !!s.isFirstLogin && s.isFirstLogin
        });
        var t = wx.getStorageSync("memberCardInfo");
        t && t.sessionId && this.setData({
            memberId: t.id,
            sessionId: t.sessionId
        }), 1 == s.type ? (wx.setNavigationBarTitle({
            title: "修改支付密码"
        }), this.setData({
            placeholder1: "请设置6位新支付密码",
            placeholder2: "请再次输入新支付密码",
            type: 1
        })) : (wx.setNavigationBarTitle({
            title: "设置支付密码"
        }), this.setData({
            placeholder1: "请设置6位支付密码",
            placeholder2: "请再次输入支付密码"
        }));
    },
    bindPsw1: function(s) {
        var t = this;
        t.data.psw1 = s.detail.value.replace(/\s+/g, ""), t.data.psw1 && t.data.psw2 ? t.setData({
            isNextClick: !1
        }) : t.setData({
            isNextClick: !0
        });
    },
    bindPsw2: function(s) {
        var t = this;
        t.data.psw2 = s.detail.value.replace(/\s+/g, ""), t.data.psw1 && t.data.psw2 ? t.setData({
            isNextClick: !1
        }) : t.setData({
            isNextClick: !0
        });
    },
    bindDisplayPsw1: function() {
        var s = this;
        s.setData({
            psw1Display: !s.data.psw1Display
        });
    },
    bindDisplayPsw2: function() {
        var s = this;
        s.setData({
            psw2Display: !s.data.psw2Display
        });
    },
    surePsw: function() {
        var e = this;
        6 == e.data.psw1.length ? e.data.psw1 == e.data.psw2 ? (wx.showLoading({
            title: "加载中..."
        }), wx.request({
            url: a.globalData.shopMHost + "/xcx/member/setPwd",
            method: "post",
            data: {
                memberId: e.data.memberId,
                password: (0, t.Base64Encode)(e.data.psw1 + "member"),
                sessionId: e.data.sessionId
            },
            header: {
                "content-type": "application/json",
                sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
            },
            success: function(s) {
                wx.hideLoading(), "000000" == s.data.code ? wx.showToast({
                    title: "设置成功",
                    icon: "success",
                    success: function() {
                        if (e.data.isFirstLogin) {
                            var s = getCurrentPages();
                            s.length > 1 && s[s.length - 2].setData({
                                setPwdSuccessReturn: !0
                            });
                        }
                        setTimeout(function() {
                            e.data.isFirstLogin ? wx.navigateBack({}) : wx.redirectTo({
                                url: "/subPackage/superVip/pages/index/index"
                            });
                        }, 1e3);
                    }
                }) : s.data.msg && "" != s.data.msg && wx.showToast({
                    title: s.data.msg,
                    icon: "none"
                });
            },
            fail: function() {
                wx.hideLoading(), (0, s.ShowDialog)(e);
            }
        })) : wx.showToast({
            title: "两次输入的密码不一致",
            icon: "none"
        }) : wx.showToast({
            title: "请输入6位支付密码",
            icon: "none"
        });
    }
});