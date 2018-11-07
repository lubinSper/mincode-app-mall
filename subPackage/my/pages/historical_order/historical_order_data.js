Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.historicalData = void 0;

var a = require("../../../../components/template/show_dialog/show_dialog.js"), e = require("../../../../components/function/showTime/showTime.js"), t = getApp();

exports.historicalData = function(o, d) {
    t.globalData.requestTask && t.globalData.requestTask.abort(), t.globalData.requestTask = wx.request({
        url: t.globalData.shopMHost + "/xcx/user/order/list",
        method: "post",
        data: o.data,
        header: {
            "content-type": "application/json"
        },
        complete: function() {
            wx.stopPullDownRefresh();
        },
        success: function(t) {
            o.ele.data.isClick = !0;
            var i = t.data;
            if ("000000" == i.code) {
                if (i.data.length > 0) {
                    for (var l = 0; l < i.data.length; l++) {
                        i.data[l].buyTime = i.data[l].buyTime ? (0, e.ShowTime)(i.data[l].buyTime, "Y-M-D hh:mm", ".") : "", 
                        i.data[l].amount = i.data[l].amount ? (i.data[l].amount / 100).toFixed(2) : "0.00";
                        for (var r = 0; r < i.data[l].product.length; r++) i.data[l].product[r].productPTime = (0, 
                        e.ShowTime)(i.data[l].product[r].productPTime, "Y-M-D hh:mm", "."), i.data[l].product[r].productOriginalPrice = i.data[l].product[r].productOriginalPrice ? (i.data[l].product[r].productOriginalPrice / 100).toFixed(2) : "0.00", 
                        i.data[l].product[r].productPrice = i.data[l].product[r].productPrice ? (i.data[l].product[r].productPrice / 100).toFixed(2) : "0.00";
                    }
                    var s = [];
                    1 != o.ele.data.pageIndex ? (s = o.ele.data.reservationData, o.ele.data.reservationData = s.concat(i.data)) : o.ele.data.reservationData = i.data, 
                    i.data.length < o.ele.data.pageSize ? (o.ele.data.onReachBottom = !1, o.ele.data.pageLoading = !1, 
                    1 != o.ele.data.pageIndex ? o.ele.data.showLastPageTip = !0 : o.ele.data.showLastPageTip = !1) : (o.ele.data.showLastPageTip = !1, 
                    o.ele.data.onReachBottom = !0, o.ele.data.pageIndex = o.data.pageIndex + 1, o.ele.data.pageLoading = !0), 
                    o.ele.data.haveData = !0;
                } else o.ele.data.pageLoading = !1, o.ele.data.onReachBottom = !1, 1 == o.ele.data.pageIndex ? o.ele.data.haveData = !1 : o.ele.data.haveData = !0;
                o.ele.data.overtime = !1, o.ele.setData(o.ele.data), d && d();
            } else o.ele.setData({
                pageLoading: !1,
                overtime: !1,
                isClick: !0,
                tab_loading_failure: !1,
                showTipData: {
                    show: !1,
                    content: "网络连接失败"
                }
            }), (0, a.ShowDialog)(o.ele);
        },
        fail: function() {
            o.ele.setData({
                pageLoading: !1,
                showTipData: {
                    show: !0,
                    content: "网络连接失败"
                },
                haveData: !0,
                isClick: !0
            }), 1 == o.ele.data.pageIndex ? (console.log("第一页刚进来~"), o.ele.setData({
                overtime: !0,
                tab_loading_failure: !1
            })) : o.ele.setData({
                overtime: !1,
                tab_loading_failure: !0
            }), (0, a.ShowDialog)(o.ele);
        }
    });
};