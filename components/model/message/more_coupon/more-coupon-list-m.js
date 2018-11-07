Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.moreCouponList = void 0;

require("../../../function/showTime/showTime");

var e = getApp();

exports.moreCouponList = function(a) {
    e.globalData.requestTask && e.globalData.requestTask.abort(), wx.request({
        url: e.globalData.host + "coupon/nearby/orgCouponList",
        method: "post",
        data: a.data,
        header: {
            codeVersion: e.globalData.codeVersion,
            "content-type": "application/json"
        },
        complete: function() {
            wx.stopPullDownRefresh();
        },
        success: function(t) {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
            var o = t.data.data.count, s = t.data.data.data;
            if (o) {
                if (s.length < a.data.pageSize ? (a.ele.data.pageLoading = !1, a.ele.data.cpShow = !0, 
                1 == a.ele.data.pageNo && s.length < 3 && (a.ele.data.copyrightPos = "fixed"), 1 != a.ele.data.pageNo && (a.ele.data.noMoreCoupon = !0)) : (a.ele.data.pageLoading = !0, 
                a.ele.data.pageNo = a.ele.data.pageNo + 1, a.ele.data.cpShow = !1, a.ele.data.copyrightPos = "static"), 
                a.PullDown && (a.ele.setData({
                    couponList: []
                }), a.ele.data.pageNo = 2, wx.stopPullDownRefresh()), t) {
                    var l = t.data.data.data;
                    if (l.length > 0) {
                        for (var i = void 0, n = 0; n < l.length; n++) a.ele.data.NodataTip = !1, a.ele.data.couponList.push(l[n]), 
                        i = e.globalData.orgId == l[n].orgId ? "/subPackage/business/pages/coupon_detail_my/coupon_detail_my" : "/subPackage/business/pages/coupon_detail_other/coupon_detail_other", 
                        l[n].jumpUrl = i + "?id=" + l[n].id + "&couponId=" + l[n].couponId + "&channel=index", 
                        1 == l[n].status ? (l[n].stateClass = "", l[n].statusName = "点击领取") : (l[n].stateClass = "has-click", 
                        l[n].statusName = "已领取"), l[n].userCondition = "￥" + l[n].discountMoney, 1 == l[n].type ? (l[n].bgClass = "item-bg-red", 
                        l[n].userDesc = "满" + l[n].minConsumeMoney + "元可用") : 2 == l[n].type ? (l[n].bgClass = "item-bg-blue", 
                        l[n].userDesc = "代金券") : (l[n].bgClass = "item-bg-yellow", l[n].userCondition = l[n].discount + "折");
                        a.ele.data.couponListHas = !1, a.ele.data.loading_failure = !1;
                    } else 1 == a.ele.data.pageNo && (a.ele.data.NodataTip = !0, a.ele.data.couponListHas = !0);
                }
            } else a.ele.data.pageLoading = !1, 1 == a.ele.data.pageNo && (a.ele.data.NodataTip = !0, 
            a.ele.data.couponListHas = !0);
            a.ele.setData(a.ele.data, function() {
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
            });
        },
        fail: function() {
            a.isTab ? e.globalData.showErrorAlert && wx.showToast({
                icon: "none",
                title: "网络连接失败"
            }) : wx.showToast({
                icon: "none",
                title: "网络连接失败"
            }), a.ele.data.pageLoading = !1, a.ele.data.cpShow = !0, a.ele.data.copyrightPos = "fixed", 
            a.ele.data.loading_failure = !0, a.ele.setData(a.ele.data, function() {
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
            });
        }
    });
};