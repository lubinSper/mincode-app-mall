var o = require("../../conf/conf"), a = require("../../model/message/more_coupon/more-coupon-list-m"), e = getApp();

Component({
    properties: {
        onShow: {
            type: Boolean,
            value: !1,
            observer: function(o, a) {
                o && this.onShow();
            }
        },
        pullDown: {
            type: String,
            value: "",
            observer: function(o, a) {
                o && this.onPullDownRefresh();
            }
        },
        pullUp: {
            type: String,
            value: "",
            observer: function(o, a) {
                o && this.onReachBottom();
            }
        },
        showReturnIndexBtn: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        orgId: 0,
        openId: "",
        pageNo: 1,
        NodataTip: !1,
        couponList: [],
        copyrightPos: "static",
        pageLoading: !1,
        cpShow: !1,
        loading_failure: !1,
        couponListHas: !1,
        noMoreCoupon: !1
    },
    methods: {
        onShow: function() {
            var o = this;
            e.setMyCountDot(), e.getNewOpenId(function(a) {
                o.setData({
                    orgId: e.globalData.orgId,
                    openId: a
                }, function() {
                    o.getCouponList();
                });
            });
        },
        getCouponList: function() {
            var t = this, n = {
                openId: t.data.openId,
                orgId: t.data.orgId,
                page: "/subPackage/business/pages/more_coupon/more_coupon?orgId=" + e.globalData.orgId,
                pageIndex: t.data.pageNo,
                pageSize: o.Conf.pageSize
            };
            (0, a.moreCouponList)({
                ele: t,
                data: n
            });
        },
        onPullDownRefresh: function() {
            var o = this;
            o.data.couponList = [], o.data.pageNo = 1, o.data.pageLoading = !1, o.setData(o.data), 
            o.getCouponList();
        },
        onReachBottom: function() {
            var o = this;
            o.data.pageLoading && o.getCouponList();
        },
        receiveCoupon: function(o) {
            e.submitFormIdM(o.detail.detail.formId, e.globalData.orgId);
            var a = this, t = o.detail.target.dataset, n = t.id, s = t.couponid, i = (t.status, 
            {
                openId: a.data.openId,
                id: n
            });
            wx.request({
                url: e.globalData.host + "coupon/receiveCoupon",
                method: "post",
                data: i,
                header: {
                    codeVersion: e.globalData.codeVersion,
                    "content-type": "application/json"
                },
                success: function(o) {
                    for (var t = a.data.couponList, n = 0; n < t.length; n++) if (s == t[n].couponId && 1 == t[n].status) {
                        wx.showToast({
                            title: "领取成功"
                        }), t[n].statusName = "已领取", t[n].stateClass = "has-click", t[n].status = 2, t[n].count = t[n].count + 1;
                        var i = "/subPackage/business/pages/more_coupon/more_coupon?orgId=" + a.data.orgId + "&orgName=" + a.data.orgName;
                        e.saveRecordInfo(i, a.data.orgId);
                    }
                    a.setData({
                        couponList: t
                    });
                }
            });
        },
        reLoadEvent: function(e) {
            var t = this, n = {
                openId: t.data.openId,
                orgId: t.data.orgId,
                page: "/subPackage/business/pages/more_coupon/more_coupon?orgId=" + t.data.orgId,
                pageIndex: t.data.pageNo,
                pageSize: o.Conf.pageSize
            };
            (0, a.moreCouponList)({
                ele: t,
                data: n
            });
        },
        goMyCoupon: function() {
            wx.navigateTo({
                url: "/subPackage/business/pages/coupon_list/coupon_list?title=我的优惠券"
            });
        }
    }
});