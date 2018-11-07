var e = getApp();

Page({
    data: {
        curPrice: 100,
        curIndex: 0,
        rechargeList: [],
        rechargeValue: "",
        rechargeId: "",
        isClickOtherPrice: !1
    },
    onLoad: function(e) {
        this.getRechargeList();
    },
    getRechargeList: function() {
        var t = this;
        e.ajaxSubmit({
            url: e.globalData.shopMHost + "xcx/member/rechargeSettingList",
            method: "post",
            header: {
                sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
            },
            data: {
                orgId: e.globalData.orgId
            }
        }).then(function(e) {
            wx.hideLoading(), !e.data.data || e.data.data.rechargeList.length ? (e.data.data.rechargeList.filter(function(e, t) {
                e.rechargeAmount = e.rechargeAmount / 100, e.returnAmount = Math.floor(e.returnAmount / 100);
            }), t.setData({
                minRechargeAmount: e.data.data.minRechargeAmount / 100,
                returnProportion: e.data.data.returnProportion,
                rechargeList: e.data.data.rechargeList,
                enableOtherAmount: 2 == e.data.data.enableOtherAmount
            }, function() {
                t.data.enableOtherAmount && t.data.rechargeList.push({
                    other: !0
                }), t.setData({
                    rechargeList: t.data.rechargeList,
                    rechargeAmount: t.data.rechargeList[0].rechargeAmount,
                    returnAmount: t.data.rechargeList[0].returnAmount,
                    rechargeId: t.data.rechargeList[0].id
                });
            })) : t.setData({
                rechargeList: t.data.rechargeList,
                returnProportion: e.data.data.returnProportion,
                enableOtherAmount: 2 == e.data.data.enableOtherAmount,
                minRechargeAmount: e.data.data.minRechargeAmount ? e.data.data.minRechargeAmount / 100 : 0,
                rechargeAmount: t.data.rechargeList.length ? Number(t.data.rechargeList[0].rechargeAmount) : 0,
                returnAmount: t.data.rechargeList.length ? Number(t.data.rechargeList[0].returnAmount) : 0,
                rechargeId: t.data.rechargeList.length ? Number(t.data.rechargeList[0].id) : 0
            }, function() {
                t.data.enableOtherAmount && (t.data.rechargeList.push({
                    other: !0
                }), t.setData({
                    rechargeList: t.data.rechargeList
                }));
            });
        });
    },
    checkPrice: function(e) {
        var t = this;
        console.log(e), e.currentTarget.dataset.other ? this.setData({
            lastIndex: this.data.curIndex,
            isShowPayDialog: !0,
            isClickOtherPrice: !0
        }, function() {
            t.setData({
                rechargeAmount: 0,
                returnAmount: 0
            });
        }) : this.setData({
            isClickOtherPrice: !1
        }), e.currentTarget.dataset.index != this.data.curIndex && this.setData({
            isSetPrice: !1,
            rechargeAmount: e.currentTarget.dataset.rechargeamount || this.data.rechargeValue,
            returnAmount: e.currentTarget.dataset.other ? Math.floor(this.data.rechargeValue * (this.data.returnProportion / 100)) : Math.floor(e.currentTarget.dataset.returnamount),
            curIndex: e.currentTarget.dataset.index,
            rechargeValue: "",
            rechargeId: e.currentTarget.dataset.id
        });
    },
    closePayDialog: function(e) {
        var t = this;
        console.log(e), e.detail.isSure ? this.setData({
            isShowPayDialog: !1
        }) : this.setData({
            curIndex: this.data.lastIndex,
            isShowPayDialog: !1
        }, function() {
            t.setData({
                rechargeAmount: t.data.rechargeList[t.data.curIndex].rechargeAmount,
                returnAmount: Math.floor(t.data.rechargeList[t.data.curIndex].returnAmount)
            });
        });
    },
    setRechargeValue: function(e) {
        var t = this;
        this.setData({
            rechargeValue: e.detail.value ? Number(e.detail.value) : ""
        }, function() {
            t.data.rechargeValue >= t.data.minRechargeAmount ? t.setData({
                returnAmount: Math.floor(t.data.rechargeValue * (t.data.returnProportion / 100))
            }) : t.setData({
                returnAmount: 0
            });
        });
    },
    surePrice: function(e) {
        this.setData({
            isSetPrice: e.detail.isSetPrice
        });
    },
    rechargeHandler: function() {
        var t = this, a = {
            amount: 100 * (this.data.rechargeAmount || this.data.rechargeValue),
            rechargeId: this.data.isClickOtherPrice ? 0 : this.data.rechargeId,
            memberId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id,
            openId: e.globalData.openid,
            orgId: e.globalData.orgId,
            returnAmount: 100 * this.data.returnAmount || 0,
            xcxId: e.globalData.xcxId
        };
        return console.log("tmpData=", a), new Promise(function(r, n) {
            e.ajaxSubmit({
                url: e.globalData.shopMHost + "xcx/member/recharge",
                method: "post",
                header: {
                    sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
                },
                data: a,
                isHideLoading: !0
            }).then(function(a) {
                "100001" != a.data.code ? "000000" === a.data.code ? (t.signWxPay(a.data.data), 
                r(a)) : wx.showToast({
                    title: a.data.msg || "服务器异常",
                    icon: "none"
                }) : e.loginInOtherPlaceAlert(a, function() {
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
                t.triggerEvent("paySuccess");
                var r = {
                    dealTime: +e.timeStamp,
                    orderNo: e.orderNo,
                    productName: e.productName,
                    payAmount: e.amount,
                    balance: e.balance,
                    returnGiftAmount: e.returnGiftAmount,
                    payType: 3
                };
                wx.redirectTo({
                    url: "/subPackage/vipCenter/pages/rechargeSuccess/index?type=vip&config=" + JSON.stringify(r)
                });
            },
            fail: function(e) {
                t.triggerEvent("paySuccess"), wx.showToast({
                    title: "用户取消支付",
                    icon: "none"
                });
            }
        });
    }
});