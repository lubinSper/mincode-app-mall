Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getShopConfig = void 0;

var a = require("../../../../../components/template/show_dialog/show_dialog"), e = getApp(), t = require("../../../../../util/es6-promise.min.js");

exports.getShopConfig = function(n, p) {
    return console.log("startime: " + new Date()), new t(function(t, y) {
        wx.request({
            url: e.globalData.shopMHost + "xcx/shopConfig/get",
            method: "post",
            data: n.data,
            header: {
                "content-type": "application/json"
            },
            complete: function() {
                wx.stopPullDownRefresh(), wx.hideLoading();
            },
            success: function(a) {
                var e = n.ele;
                if (a.data.data) {
                    var y = a.data.data;
                    e.data.paymen.cashOnDelivery = y.cashOnDelivery, e.data.paymen.delivery = y.delivery, 
                    e.data.paymen.freight = y.freight / 100, e.data.paymen.orgId = y.orgId, e.data.paymen.payAtStore = y.payAtStore, 
                    e.data.paymen.selfPickUp = y.selfPickUp, e.data.paymen.weixinPay = y.weixinPay, 
                    1 == y.delivery && 2 == y.selfPickUp ? e.data.tab = 2 : e.data.tab = 1, "1" == y.defaultPayMethod ? (2 == y.weixinPay && (e.data.paymen.payment_array.push("微信支付"), 
                    e.data.paymen.payment_array02.push("微信支付")), "2" == y.cashOnDelivery && (e.data.paymentMum = 1, 
                    e.data.paymen.payment_array.push("货到付款")), "2" == y.payAtStore && e.data.paymen.payment_array02.push("到店支付")) : "2" == y.defaultPayMethod && ("2" == y.cashOnDelivery && (e.data.paymentMum = 1, 
                    e.data.paymen.payment_array.push("货到付款")), "2" == y.payAtStore && e.data.paymen.payment_array02.push("到店支付"), 
                    "2" == y.weixinPay && (e.data.paymen.payment_array.push("微信支付"), e.data.paymen.payment_array02.push("微信支付"))), 
                    2 == y.delivery && (e.data.paymentMum = 1, 2 != y.weixinPay || 1 != y.defaultPayMethod && 1 != y.cashOnDelivery ? (e.data.paymentMumBak1 = 1, 
                    e.data.paymentTextBak1 = "货到付款") : (e.data.paymentMumBak1 = 0, e.data.paymentTextBak1 = "确认支付")), 
                    2 == y.selfPickUp && (2 != y.weixinPay || 1 != y.defaultPayMethod && 1 != y.payAtStore ? (e.data.paymentMumBak2 = 3, 
                    e.data.paymentTextBak2 = "到店支付") : (e.data.paymentMumBak2 = 2, e.data.paymentTextBak2 = "确认支付")), 
                    e.setData(e.data);
                }
                p && p(), t(a.data.data);
            },
            fail: function() {
                y(), (0, a.ShowDialog)(n.ele, "网络连接失败");
            }
        });
    });
};