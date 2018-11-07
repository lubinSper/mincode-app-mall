function t(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var e = require("../../../../components/conf/conf"), o = require("coupon_list_m"), a = getApp();

Page({
    data: {
        openId: "",
        couponType: "1",
        couponSegment: [ {
            status: 1,
            tabName: "未使用",
            number: 0
        }, {
            status: 2,
            tabName: "使用记录",
            number: 0
        }, {
            status: 3,
            tabName: "已过期",
            number: 0
        } ],
        couponList: [],
        myShopCoupon: !0,
        pageNo: 1,
        pageLoading: !1,
        NoDataText: "暂无未使用的优惠券",
        NodataTip: !1,
        noMoreCoupon: !1
    },
    onLoad: function(t) {
        var e = this;
        wx.showLoading({
            title: "加载中"
        }), a.getNewOpenId(function(t) {
            e.setData({
                openId: t
            }, function() {
                e.getCoupList();
            });
        });
    },
    clickSegement: function(t) {
        wx.showLoading({
            title: "加载中"
        });
        var e = this, o = t.target.dataset.status;
        e.data.couponList = [], e.data.noMoreCoupon = !1, e.data.pageNo = 1, e.data.couponType = o, 
        e.setData(e.data, function() {
            e.getCoupList();
        });
    },
    onReachBottom: function() {
        this.getCoupList("pullUp");
    },
    onPullDownRefresh: function() {
        var t = this;
        t.data.couponList = [], t.data.pageNo = 1, t.setData(t.data, function() {
            t.getCoupList("PullDown");
        });
    },
    reLoadEvent: function(t) {
        var e = this;
        e.setData({
            pageIndex: 1
        }, function() {
            e.getCoupList();
        });
    },
    getCoupList: function(a) {
        var n = this, u = {
            openId: n.data.openId,
            pageIndex: n.data.pageNo,
            pageSize: e.Conf.pageSize,
            type: n.data.couponType
        };
        (0, o.myCouponList)(t({
            ele: n,
            data: u
        }, a, !0));
    },
    receiveCoupon: function(t) {
        var e = t.detail.target.dataset;
        console.log(e.jumpUrl), wx.navigateTo({
            url: e.jumpUrl
        });
    }
});