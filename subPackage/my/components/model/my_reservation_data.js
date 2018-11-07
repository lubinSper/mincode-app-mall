Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.sure_complete = exports.my_reservationData = void 0;

var a = require("../../../../components/template/show_dialog/show_dialog.js"), e = require("../../../../components/function/showTime/showTime.js"), t = (require("../../../../components/function/formatMsgTime/formatMsgTime"), 
getApp());

exports.my_reservationData = function(o) {
    var d = Object.assign({}, o.data, {
        orgId: t.globalData.orgId
    });
    t.globalData.requestTask && t.globalData.requestTask.abort(), t.globalData.requestTask = wx.request({
        url: t.globalData.shopMHost + "/xcx/org/order/orderList",
        method: "post",
        data: d,
        header: {
            "content-type": "application/json"
        },
        complete: function() {
            wx.stopPullDownRefresh();
        },
        success: function(t) {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
            var d = t.data;
            if ("000000" == d.code) {
                if (d.data.length > 0) {
                    for (var r = [], i = 0; i < d.data.length; i++) {
                        d.data[i].freight = (d.data[i].freight / 100).toFixed(2), d.data[i].price = (d.data[i].price / 100).toFixed(2), 
                        d.data[i].buyTime = (0, e.ShowTime)(d.data[i].buyTime, "Y-M-D hh:mm:ss", "."), d.data[i].reserveTime = d.data[i].reserveTime;
                        for (var s = 0; s < d.data[i].xcxOrderProductDtoList.length; s++) d.data[i].xcxOrderProductDtoList[s].productPrice = d.data[i].xcxOrderProductDtoList[s].productPrice ? (d.data[i].xcxOrderProductDtoList[s].productPrice / 100).toFixed(2) : "0.00", 
                        d.data[i].xcxOrderProductDtoList[s].productOriginalPrice = d.data[i].xcxOrderProductDtoList[s].productOriginalPrice ? (d.data[i].xcxOrderProductDtoList[s].productOriginalPrice / 100).toFixed(2) : "0.00";
                    }
                    1 != o.ele.data.pageIndex ? (r = o.ele.data.reservationData, o.ele.data.reservationData = r.concat(d.data)) : o.ele.data.reservationData = d.data, 
                    d.data.length < o.ele.data.pageSize ? (o.ele.data.onReachBottom = !1, o.ele.data.pageLoading = !1, 
                    1 != o.ele.data.pageIndex ? o.ele.data.showLastPageTip = !0 : o.ele.data.showLastPageTip = !1) : (o.ele.data.showLastPageTip = !1, 
                    o.ele.data.onReachBottom = !0, o.ele.data.pageIndex = o.data.pageIndex + 1, o.ele.data.pageLoading = !0), 
                    o.ele.data.haveData = !0;
                } else o.ele.data.pageLoading = !1, o.ele.data.onReachBottom = !1, 1 == o.ele.data.pageIndex ? o.ele.data.haveData = !1 : o.ele.data.haveData = !0;
                o.ele.data.isClick = !0, o.ele.data.overtime = !1, o.ele.setData(o.ele.data, function() {
                    setTimeout(function() {
                        wx.hideLoading();
                    }, 1e3);
                });
            } else o.ele.setData({
                pageLoading: !1,
                overtime: !0,
                showTipData: {
                    show: !0,
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
                isClick: !0
            }), 1 == o.ele.data.pageIndex ? o.ele.setData({
                overtime: !0,
                tab_loading_failure: !1
            }) : o.ele.setData({
                overtime: !1,
                tab_loading_failure: !0
            }), (0, a.ShowDialog)(o.ele);
        }
    });
}, exports.sure_complete = function(e, o) {
    t.globalData.requestTask && t.globalData.requestTask.abort(), t.globalData.requestTask = wx.request({
        url: t.globalData.shopMHost + "/xcx/org/order/updateStatus",
        method: "post",
        data: {
            id: e.data.id,
            closureReason: e.data.closureReason,
            status: e.data.status
        },
        header: {
            "content-type": "application/json"
        },
        complete: function() {
            wx.stopPullDownRefresh();
        },
        success: function(a) {
            if ("000000" == a.data.code) {
                o && o();
                var t = e.data.delIndex;
                e.ele.data.reservationData.splice(t, 1), e.ele.data.reservationData.length < 1 && (e.ele.data.haveData = !1), 
                e.ele.setData(e.ele.data);
            }
        },
        fail: function() {
            e.ele.setData({
                pageLoading: !1,
                showTipData: {
                    show: !0,
                    content: "网络连接失败"
                }
            }), (0, a.ShowDialog)(e.ele);
        }
    });
};