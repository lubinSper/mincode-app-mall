Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = getApp();

exports.getCouponDetail = function(s, t) {
    wx.request({
        url: e.globalData.host + "coupon/info",
        method: "post",
        data: s.data,
        header: {
            codeVersion: e.globalData.codeVersion,
            "content-type": "application/json"
        },
        complete: function() {
            wx.stopPullDownRefresh();
        },
        success: function(e) {
            if (console.log(e), "000000" == e.data.code) {
                var o = e.data.data;
                1 == o.type ? (o.bgClass = "bg-red", o.userDesc = "满" + o.minConsumeMoney + "减" + o.discountMoney) : 2 == o.type ? (o.bgClass = "bg-blue", 
                o.userDesc = o.discountMoney + "元") : (o.bgClass = "bg-yellow", o.userDesc = o.discount + "折"), 
                2 == o.status ? (o.btnClass = "has-click", o.statusName = "已过期") : 1 == o.isUse ? (o.statusClass = "bg-grey", 
                o.btnClass = "has-click", o.statusName = "已使用") : 1 == o.isReceive ? (o.btnClass = "receive-btn", 
                o.statusName = "马上领取") : (o.btnClass = "query-code", o.statusName = "查看券码"), o.userInfoDtoList.length > 20 && s.ele.setData({
                    showAvatarBox: !0
                }), s.ele.setData({
                    showW: "none",
                    couponInfo: o
                }, function() {
                    t && t();
                });
            } else wx.hideLoading(), s.ele.setData({
                showW: "block"
            }), t && t();
        },
        fail: function() {}
    });
};