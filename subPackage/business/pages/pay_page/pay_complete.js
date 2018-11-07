var o = require("pay_complete_m"), t = getApp();

Page({
    data: {
        openId: "",
        money: "",
        remark: "",
        payWay: "",
        payInfo: {},
        myCouponList: [],
        otherCouponList: [],
        twoOtherCouponList: [],
        recomGoodsList: {},
        hasMyShop: !0,
        hasGoodsList: !1,
        hasRecomGoods: !1,
        idArr: [],
        totalPrice: 0,
        showMore: !1,
        hasNoReceive: !0,
        xcxOrgType: 0
    },
    onShow: function() {},
    onLoad: function(o) {
        var a = this;
        this.setData({
            xcxOrgType: t.globalData.xcxType
        }), wx.showLoading({
            title: "加载中"
        }), a.getPayInfo();
        var e = o.inputValue;
        "." == e.charAt(e.length - 1) && (e = e.slice(0, e.length - 1)), a.setData({
            money: a.toDecimal2(e) ? a.toDecimal2(e) : "",
            remark: o.remark ? o.remark : "",
            payWay: o.payWay ? o.payWay : "微信支付"
        });
    },
    toDecimal2: function(o) {
        var t = parseFloat(o);
        if (isNaN(t)) return !1;
        var a = (t = Math.round(100 * o) / 100).toString(), e = a.indexOf(".");
        for (e < 0 && (e = a.length, a += "."); a.length <= e + 2; ) a += "0";
        return a;
    },
    getPayInfo: function() {
        var a = this, e = void 0;
        t.getNewOpenId(function(n) {
            e = {
                orgId: t.globalData.orgId,
                openId: n
            }, (0, o.getPayInfo)({
                ele: a,
                data: e
            }), a.setData({
                openId: n
            });
        });
    },
    backHome: function() {
        wx.switchTab({
            url: "/page/my/my"
        });
    },
    showMoreList: function() {
        var o = this;
        o.setData({
            showMore: !o.data.showMore
        });
    },
    receiveCoupon: function(a) {
        var e = this;
        t.userInfoMiddleWare(!0).then(function(n) {
            if (n.isGetUserInfo) {
                t.submitFormIdM(a.detail.formId, t.globalData.orgId);
                var s = a.currentTarget.dataset, i = s.id, r = s.couponid, u = (s.status, s.otherShop), c = {
                    openId: e.data.openId,
                    id: i
                }, d = [];
                d = u ? e.data.otherCouponList : e.data.myCouponList, (0, o.receiveCoupon)({
                    ele: e,
                    data: c
                }, function(o) {
                    for (var a = 0; a < d.length; a++) if (r == d[a].couponId && 1 == d[a].status) {
                        wx.showToast({
                            title: "领取成功"
                        }), d[a].stateClass = "has-click", d[a].statusName = "已领取", d[a].status = 2, d[a].count = d[a].count + 1;
                        var n = "/subPackage/business/pages/more_coupon/more_coupon?orgId=" + e.data.orgId + "&orgName=" + e.data.orgName;
                        t.saveRecordInfo(n, e.data.orgId);
                    }
                    u ? e.setData({
                        otherCouponList: d
                    }) : e.setData({
                        myCouponList: d
                    });
                });
            } else wx.eventBus.trigger("showOnAuthShow");
        });
    },
    receiveAllCoupon: function() {
        var o = this;
        t.userInfoMiddleWare(!0).then(function(a) {
            if (a.isGetUserInfo) {
                if (!o.data.hasNoReceive) return void wx.showToast({
                    icon: "none",
                    title: "已经领过了，不要太贪心哦"
                });
                var e = o.data.otherCouponList;
                console.log(o.data.idArr);
                var n = {
                    openId: o.data.openId,
                    ids: o.data.idArr
                };
                wx.request({
                    url: t.globalData.host + "/coupon/batchReceiveCoupon",
                    method: "post",
                    data: n,
                    header: {
                        codeVersion: t.globalData.codeVersion,
                        "content-type": "application/json"
                    },
                    success: function(t) {
                        e.forEach(function(o) {
                            o.stateClass = "has-click", o.statusName = "已领取", o.status = 2, o.count = o.count + 1;
                        }), o.setData({
                            otherCouponList: e,
                            hasNoReceive: !1
                        }, function() {
                            wx.showToast({
                                icon: "none",
                                title: "领取成功，请在我的优惠券查看"
                            });
                        });
                    }
                });
            } else wx.eventBus.trigger("showOnAuthShow");
        });
    },
    goGoodsDetail: function(o) {
        console.log(o);
        var a = o.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/subPackage/discover/pages/" + (3 == t.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + a
        });
    },
    gotoCouponList: function() {
        wx.navigateTo({
            url: "/subPackage/business/pages/coupon_list/coupon_list?title=我的优惠券"
        });
    }
});