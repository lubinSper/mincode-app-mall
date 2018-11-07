Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.orderGoodsPaymentM = void 0;

require("../../../../../components/template/show_dialog/show_dialog");

var a = require("../../../../../components/conf/conf"), t = getApp(), e = (a.Conf.shoppingCarStorageKey, 
require("../../../../../util/es6-promise.min.js"));

exports.orderGoodsPaymentM = function(a) {
    return new e(function(e, o) {
        wx.request({
            url: t.globalData.shopMHost + "/xcx/org/order/newCreateOrder",
            data: a.data,
            method: "post",
            header: {
                "content-type": "application/json;charset=utf-8"
            },
            complete: function() {},
            success: function(t) {
                if (!("900001" != t.data.code && "900002" != t.data.code || 5 != a.data.payMethod && 6 != a.data.payMethod)) {
                    var n = t.data.msg, r = n.match("请点击忘记密码") ? "确定" : "重新输入";
                    return wx.showModal({
                        content: n,
                        cancelText: r,
                        confirmColor: "#ff7800",
                        confirmText: "忘记密码",
                        success: function(t) {
                            t.confirm ? wx.navigateTo({
                                url: "/subPackage/my/pages/vip_security_center/vip_security_center?forget=1"
                            }) : "重新输入" == r && a.reInput && a.reInput();
                        }
                    }), void setTimeout(function() {
                        a.ele.setData({
                            isClick: !0
                        }, function() {
                            wx.hideLoading();
                        });
                    }, 0);
                }
                "000000" == t.data.code ? (wx.setStorage({
                    key: "ordering_state",
                    data: 2
                }), t.data.data.orderId, 1 == a.data.payMethod || 3 == a.data.payMethod ? wx.requestPayment({
                    timeStamp: t.data.data.timeStamp,
                    nonceStr: t.data.data.nonceStr,
                    package: t.data.data.package,
                    signType: t.data.data.signType,
                    paySign: t.data.data.paySign,
                    success: function() {
                        e(t.data.data);
                    },
                    fail: function(a) {
                        o("requestPayment:fail cancel" == a.errMsg ? "用户取消支付" : "支付失败");
                    }
                }) : e(t.data.data)) : o(t.data.msg);
            },
            fail: function() {
                o("网络连接失败");
            }
        });
    });
};