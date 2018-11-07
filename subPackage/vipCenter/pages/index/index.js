var e = getApp();

Page({
    data: {
        isShowPayDialog: !1,
        rechargeValue: "",
        firstLogin: 1,
        isLoaded: !1
    },
    onLoad: function(e) {
        e.firstLogin && this.setData({
            firstLogin: e.firstLogin
        }), this.getVipCradInfo(), this.isSetPassWord(), this.isSetReturnGive();
    },
    onShow: function() {
        if (this.getVipCradInfo(), this.data.setPwdSuccessReturn) {
            this.setData({
                setPwdSuccessReturn: !1
            });
            var e = this;
            this.isSetReturnGive(), this.isSetPassWord(function() {
                e.rechargeMoney();
            });
        }
        this.getRecordList();
    },
    isSetReturnGive: function() {
        var t = this;
        e.isBindMemberCard().then(function(e) {
            "000000" === e.data.code ? t.setData({
                enableMemberCard: 2 == e.data.data.enableMemberCard,
                enableReturnGive: 2 == e.data.data.enableReturnGive
            }) : wx.showToast({
                title: e.data.msg,
                icon: "none"
            });
        });
    },
    getVipCradInfo: function() {
        var t = this;
        e.getVipCradInfo().then(function(e) {
            "000000" === e.data.code ? t.setData({
                memberCardInfo: e.data.data
            }) : wx.showToast({
                title: e.data.msg,
                icon: "none"
            });
        });
    },
    getRecordList: function() {
        var t = this;
        return new Promise(function(a, i) {
            e.ajaxSubmit({
                url: e.globalData.shopMHost + "xcx/member/recordQuery",
                method: "post",
                header: {
                    sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
                },
                data: {
                    memberId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id,
                    startDate: String(+new Date() - 6048e6),
                    endDate: String(+new Date()),
                    pageSize: 10,
                    pageIndex: 1
                }
            }).then(function(a) {
                console.log(a), wx.hideLoading(), "100001" != a.data.code ? "000000" === a.data.code && t.setData({
                    recordList: a.data.data,
                    isLoaded: !0
                }) : e.loginInOtherPlaceAlert(a, function() {
                    jsons.repeatLogin && jsons.repeatLogin();
                });
            });
        });
    },
    isSetPassWord: function(t) {
        var a = this, i = wx.getStorageSync("memberCardInfo");
        return i && {
            memberId: i.id,
            sessionId: i.sessionId
        }, new Promise(function(i, n) {
            e.ajaxSubmit({
                url: e.globalData.shopMHost + "xcx/member/isSetPwd",
                method: "post",
                data: {
                    memberId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id
                },
                header: {
                    "content-type": "application/json",
                    sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
                },
                isHideLoading: !0
            }).then(function(e) {
                "000000" === e.data.code ? (a.setData({
                    isSetPwd: 2 == e.data.data
                }), i(e), t && t()) : wx.showToast({
                    title: e.data.msg,
                    icon: "none"
                });
            });
        });
    },
    closePayDialog: function() {
        this.setData({
            isShowPayDialog: !1
        });
    },
    setRechargeValue: function(e) {
        this.setData({
            rechargeValue: e.detail.value
        });
    },
    rechargeMoney: function(e) {
        if (this.data.isSetPwd) {
            if (this.data.enableReturnGive) return void wx.navigateTo({
                url: "/subPackage/vipCenter/pages/recharge/index"
            });
            this.showPayDialog();
        } else wx.showModal({
            title: "请设置支付密码",
            content: "为了保证你的资金安全，请先设置支付密码。设置后才可进行充值、会员卡消费等操作。",
            cancelText: "取消",
            confirmColor: "#d3a95a",
            confirmText: "马上设置",
            success: function(t) {
                t.confirm && wx.navigateTo({
                    url: "/subPackage/my/pages/vip_security_center/set_password/set_password?isFirstLogin=" + e
                });
            }
        });
    },
    toSecurity: function() {
        wx.navigateTo({
            url: "/subPackage/my/pages/vip_security_center/vip_security_center"
        });
    },
    goRechargeMoney: function() {
        this.setData({
            firstLogin: 1
        }), this.rechargeMoney(!0);
    },
    closePrivilegeLayer: function() {
        this.setData({
            firstLogin: 1
        });
    },
    showPayDialog: function() {
        this.setData({
            isShowPayDialog: !0
        });
    },
    viewMore: function() {
        wx.navigateTo({
            url: "/subPackage/vipCenter/pages/record/index"
        });
    },
    paySuccess: function() {
        this.getVipCradInfo(), this.isSetPassWord(), this.isSetReturnGive(), this.setData({
            rechargeValue: ""
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});