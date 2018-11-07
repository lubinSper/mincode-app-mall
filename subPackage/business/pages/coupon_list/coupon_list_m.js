function e(e) {
    return e > 99 ? "99+" : e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

require("../../../../vendor/qcloud-weapp-client-sdk/index.js"), require("../../../../util/util.js");

var a = getApp();

exports.myCouponList = function(t, o) {
    wx.request({
        url: a.globalData.host + "/coupon/my/list3",
        method: "post",
        data: t.data,
        header: {
            codeVersion: a.globalData.codeVersion,
            "content-type": "application/json"
        },
        complete: function() {
            wx.stopPullDownRefresh();
        },
        success: function(o) {
            t.ele.data.pageLoading = !1, t.ele.data.loading_failure = !1;
            var n = o.data.data.couponList;
            if (t.ele.data.couponSegment[0].number = e(o.data.data.count1), t.ele.data.couponSegment[1].number = e(o.data.data.count2), 
            t.ele.data.couponSegment[2].number = e(o.data.data.count3), n.length) {
                t.ele.data.NodataTip = !1, t.pullUp ? t.ele.data.pageLoading = !0 : t.ele.data.pageLoading = !1, 
                t.ele.data.pageNo = t.ele.data.pageNo + 1, t.PullDown && (t.ele.setData({
                    couponList: []
                }), t.ele.data.pageNo = 2, wx.stopPullDownRefresh());
                for (var d = t.ele.data.couponType, l = void 0, s = 0; s < n.length; s++) n[s].myCoupList = !0, 
                l = a.globalData.orgId == n[s].orgId ? "/subPackage/business/pages/coupon_detail_my/coupon_detail_my" : "/subPackage/business/pages/coupon_detail_other/coupon_detail_other", 
                n[s].jumpUrl = l + "?id=" + n[s].id + "&couponId=" + n[s].couponId + "&channel=coupon_list_detail&hideCoupEnter=true", 
                n[s].userCondition = "￥" + n[s].discountMoney, 1 == n[s].type ? (n[s].bgClass = "item-bg-red", 
                n[s].userDesc = "满" + n[s].minConsumeMoney + "元可用") : 2 == n[s].type ? (n[s].bgClass = "item-bg-blue", 
                n[s].userDesc = "代金券") : (n[s].bgClass = "item-bg-yellow", n[s].userCondition = n[s].discount + "折"), 
                3 == d ? (n[s].bgClass = "item-bg-grey", n[s].statusName = "已过期") : 1 == d ? n[s].statusName = "立即使用" : (n[s].stateClass = "has-click", 
                n[s].statusName = "已使用"), t.ele.data.couponList.push(n[s]);
            } else 1 == t.ele.data.pageNo ? (t.ele.data.NodataTip = !0, t.ele.data.pageLoading = !1, 
            1 == t.data.type ? t.ele.data.NoDataText = "暂无未使用的优惠券" : 2 == t.data.type ? t.ele.data.NoDataText = "暂无已使用的优惠券" : t.ele.data.NoDataText = "暂无已过期的优惠券") : t.ele.data.noMoreCoupon = !0;
            t.ele.setData(t.ele.data, function() {
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
            });
        },
        fail: function() {
            wx.showToast({
                icon: "none",
                title: "网络连接失败"
            }), t.ele.data.NodataTip = !1, t.ele.data.pageLoading = !1, t.ele.data.loading_failure = !0, 
            t.ele.setData(t.ele.data, function() {
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
            });
        }
    });
};