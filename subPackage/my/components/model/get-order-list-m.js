Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getOrderList = void 0;

var a = require("../../../../components/template/show_dialog/show_dialog"), t = require("../../../../components/function/showTime/showTime"), e = require("../../../../util/util"), d = getApp();

exports.getOrderList = function(o) {
    var r = Object.assign({}, o.data, {
        orgId: d.globalData.orgId
    });
    d.globalData.requestTask && d.globalData.requestTask.abort(), d.globalData.requestTask = wx.request({
        url: d.globalData.shopMHost + "/xcx/org/order/orderList",
        method: "post",
        data: r,
        header: {
            "content-type": "application/json"
        },
        complete: function() {
            wx.stopPullDownRefresh();
        },
        success: function(a) {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
            var d = a.data.data;
            if (d.length > 0 ? (o.ele.data.haveData = !0, o.ele.data.NodataTip = !1) : (o.ele.data.onReachBottom = !1, 
            1 == o.ele.data.pageNo && (o.ele.data.haveData = !1, o.ele.setData({
                orderingList: [],
                NodataTip: !0
            }))), d.length < o.data.pageSize ? (o.ele.data.onReachBottom = !1, o.ele.data.pageLoading = !1) : (o.ele.data.pageLoading || (o.ele.data.pageLoading = !0), 
            o.ele.data.onReachBottom = !0, o.ele.data.pageNo = o.ele.data.pageNo + 1), o.PullDown && (o.ele.setData({
                orderingList: []
            }), o.ele.data.pageNo = 2, wx.stopPullDownRefresh()), a) {
                if (a.data.data && a.data.data.length > 0) for (var r = 0; r < a.data.data.length; r++) {
                    o.ele.data.NodataTip = !1, o.ele.data.orderingList.push(a.data.data[r]), a.data.data[r].buyTime = (0, 
                    t.ShowTime)(a.data.data[r].buyTime, "Y-M-D hh:mm:ss", "-"), a.data.data[r].updateTime = (0, 
                    t.ShowTime)(a.data.data[r].updateTime, "Y-M-D hh:mm:ss", "-"), a.data.data[r].freight = (0, 
                    e.formatMoney2)(a.data.data[r].freight), a.data.data[r].price = (0, e.formatMoney2)(a.data.data[r].price), 
                    1 == a.data.data[r].payMethod ? a.data.data[r].payMethod = "微信支付" : 2 == a.data.data[r].payMethod ? 1 == a.data.data[r].carryType ? a.data.data[r].payMethod = "货到付款" : a.data.data[r].payMethod = "到店支付" : 3 == a.data.data[r].payMethod && (a.data.data[r].payMethod = "会员卡支付");
                    for (var i = a.data.data[r], l = 0; l < i.xcxOrderProductDtoList.length; l++) i.xcxOrderProductDtoList[l].productPrice = i.xcxOrderProductDtoList[l].productPrice ? "￥" + (0, 
                    e.formatMoney2)(i.xcxOrderProductDtoList[l].productPrice) : "", i.xcxOrderProductDtoList[l].productOriginalPrice = i.xcxOrderProductDtoList[l].productOriginalPrice ? "￥" + (0, 
                    e.formatMoney2)(i.xcxOrderProductDtoList[l].productOriginalPrice) : "";
                } else console.log(o.ele.data.pageNo), 1 == o.ele.data.pageNo && (o.ele.data.NodataTip = !0);
                o.ele.data.isClick = !0, o.ele.data.loading_fail = !1, o.ele.setData(o.ele.data, function() {
                    setTimeout(function() {
                        wx.hideLoading();
                    }, 1e3);
                });
            }
        },
        fail: function() {
            setTimeout(function() {
                wx.hideLoading();
            }, 1e3), o.ele.data.onReachBottom = !1, o.ele.data.isClick = !0, 1 == o.ele.data.pageNo && (o.ele.data.loading_fail = !0, 
            o.ele.data.haveData = !1, o.ele.data.orderingList = []), o.ele.data.NodataTip = !1, 
            o.ele.setData(o.ele.data), (0, a.ShowDialog)(o.ele);
        }
    });
};