var t = getApp();

require("../../../../util/util");

Component({
    properties: {
        refresh: {
            type: Boolean,
            value: !1,
            observer: function(t, a) {
                t && this.getCouponList();
            }
        },
        reShow: {
            type: String,
            value: !1,
            observer: function(t, a) {
                var o = this;
                t && o.changeCouponState();
            }
        }
    },
    data: {
        couponTitle: "优惠券",
        lastPageStyle: "last_page hide",
        paddingBottom: "0rpx",
        isLastPage: !0,
        couponList: [],
        orgId: t.globalData.orgId,
        clickNum: !0
    },
    methods: {
        changeCouponState: function() {
            var t = this, a = t.data.couponList;
            wx.getStorage({
                key: "couponId",
                success: function(o) {
                    for (var e = 0; e < a.length; e++) a[e].couponId == o.data && (a[e].statusName = "已领取", 
                    a[e].stateClass = "has-click", a[e].status = 2, a[e].count = a[e].count + 1);
                    t.setData({
                        couponList: a
                    }, function() {
                        wx.removeStorage({
                            key: "couponId",
                            success: function(t) {}
                        });
                    });
                }
            });
        },
        getCouponList: function() {
            var a = this;
            t.getNewOpenId(function(o) {
                var e = {
                    openId: t.globalData.openid,
                    orgId: t.globalData.orgId,
                    page: "",
                    pageIndex: 1,
                    pageSize: 10
                };
                wx.request({
                    url: t.globalData.host + "coupon/nearby/orgCouponList",
                    method: "post",
                    data: e,
                    header: {
                        "content-type": "application/json"
                    },
                    complete: function() {},
                    success: function(e) {
                        if (e.data.data && e.data.data.data) {
                            var s = e.data.data.data || [], n = s.length;
                            a.data.isOnLoad && (1 == n ? a.setData({
                                height: "188rpx",
                                paddingBottom: "0"
                            }) : 2 == n ? a.setData({
                                height: "370rpx",
                                paddingBottom: "0rpx"
                            }) : n > 2 && a.setData({
                                height: "370rpx",
                                paddingBottom: "90rpx"
                            })), 1 == a.data.pageNo && 0 == s.length && a.setData({
                                isShowImgs: !0
                            });
                            for (var i = void 0, u = e.data.data.title, d = e.data.data.count || 0, c = 0; c < s.length; c++) i = t.globalData.orgId == s[c].orgId ? "/subPackage/business/pages/coupon_detail_my/coupon_detail_my" : "/subPackage/business/pages/coupon_detail_other/coupon_detail_other", 
                            s[c].jumpUrl = i + "?id=" + s[c].id + "&couponId=" + s[c].couponId + "&channel=index", 
                            1 == s[c].status ? (s[c].stateClass = "", s[c].statusName = "领取") : (s[c].stateClass = "has-click", 
                            s[c].statusName = "已领取"), s[c].userCondition = "￥" + s[c].discountMoney, 1 == s[c].type ? (s[c].bgClass = "home-bg-red", 
                            s[c].userDesc = "满" + s[c].minConsumeMoney + "元可用") : 2 == s[c].type ? (s[c].bgClass = "home-bg-blue", 
                            s[c].userDesc = "代金券") : (s[c].bgClass = "home-bg-yellow", s[c].userDesc = "折扣券", 
                            s[c].userCondition = s[c].discount + "折");
                            var p = a.data.couponList && a.data.couponList.length >= d;
                            a.setData({
                                couponList: s,
                                couponTitle: u,
                                isLastPage: p,
                                openId: o
                            });
                        } else a.setData({
                            couponList: []
                        });
                    },
                    fail: function(t) {}
                });
            });
        },
        receiveCoupon: function(a) {
            t.submitFormIdM(a.detail.detail.formId, t.globalData.orgId);
            var o = this, e = a.detail.target.dataset, s = e.id, n = e.couponid, i = (e.status, 
            {
                openId: o.data.openId,
                id: s
            });
            wx.request({
                url: t.globalData.host + "coupon/receiveCoupon",
                method: "post",
                data: i,
                header: {
                    "content-type": "application/json"
                },
                success: function(a) {
                    for (var e = o.data.couponList, s = 0; s < e.length; s++) if (n == e[s].couponId && 1 == e[s].status) {
                        wx.showToast({
                            title: "领取成功"
                        }), e[s].stateClass = "has-click", e[s].statusName = "已领取", e[s].status = 2, e[s].count = e[s].count + 1;
                        var i = "/subPackage/business/pages/more_coupon/more_coupon?orgId=" + o.data.orgId + "&orgName=" + o.data.orgName;
                        t.saveRecordInfo(i, o.data.orgId);
                    }
                    o.setData({
                        couponList: e
                    });
                }
            });
        }
    }
});