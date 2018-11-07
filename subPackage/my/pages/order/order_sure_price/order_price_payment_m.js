Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.orderPricePaymentM = exports.orderPricePayment = void 0;

var e = require("../../../../../components/conf/conf"), t = require("../../../../../components/template/show_dialog/show_dialog"), a = getApp(), o = require("../../../../../util/es6-promise.min.js");

e.Conf.shoppingCarStorageKey;

exports.orderPricePayment = function(e) {
    return new o(function(o, n) {
        wx.request({
            url: a.globalData.shopMHost + "/xcx/org/order/newCreateOrder",
            data: e.data,
            method: "post",
            header: {
                "content-type": "application/json;charset=utf-8"
            },
            complete: function() {
                wx.stopPullDownRefresh();
            },
            success: function(a) {
                if (!("900001" != a.data.code && "900002" != a.data.code || 5 != e.data.payMethod && 6 != e.data.payMethod)) {
                    var i = a.data.msg, r = i.match("请点击忘记密码") ? "确定" : "重新输入";
                    return wx.showModal({
                        content: i,
                        cancelText: r,
                        confirmColor: "#ff7800",
                        confirmText: "忘记密码",
                        success: function(t) {
                            t.confirm ? wx.navigateTo({
                                url: "/subPackage/my/pages/vip_security_center/vip_security_center?forget=1"
                            }) : "重新输入" == r && e.reInput && e.reInput();
                        }
                    }), void e.ele.setData({
                        clickNum: !0
                    }, function() {
                        wx.hideLoading();
                    });
                }
                if ("000000" == a.data.code) {
                    wx.setStorage({
                        key: "ordering_state",
                        data: 2
                    });
                    var d = a.data.data.orderId;
                    (1 == e.data.payMethod || 3 == e.data.payMethod) && e.ele.data.goodsz.price > 0 ? wx.requestPayment({
                        timeStamp: a.data.data.timeStamp,
                        nonceStr: a.data.data.nonceStr,
                        package: a.data.data.package,
                        signType: a.data.data.signType,
                        paySign: a.data.data.paySign,
                        success: function(e) {
                            o(), wx.showToast({
                                title: "预约成功",
                                duration: 2500
                            }), setTimeout(function() {
                                wx.redirectTo({
                                    url: "/subPackage/my/pages/new_order_detail/new_order_detail?id=" + d + "&isContinueBuy=1"
                                });
                            }, 2500);
                        },
                        fail: function() {
                            n();
                        }
                    }) : (o(), wx.showToast({
                        title: "预约成功",
                        duration: 2500
                    }), setTimeout(function() {
                        wx.redirectTo({
                            url: "/subPackage/my/pages/new_order_detail/new_order_detail?id=" + d + "&isContinueBuy=1"
                        });
                    }, 2500));
                } else n(), e.ele.data.showTipData.content = a.data.msg, (0, t.ShowDialog)(e.ele);
                e.ele.setData(e.ele.data);
            },
            fail: function() {
                n(), (0, t.ShowDialog)(e.ele), e.ele.setData({
                    clickNum: !0
                });
            }
        });
    });
}, exports.orderPricePaymentM = function(e, o) {
    wx.request({
        url: a.globalData.shopMHost + "xcx/shopConfig/get",
        method: "post",
        data: e.data,
        header: {
            "content-type": "application/json"
        },
        complete: function() {
            wx.stopPullDownRefresh();
        },
        success: function(t) {
            if (e.ele, t.data.data) {
                var a = t.data.data, n = e.ele.data.payList, i = 0;
                2 == a.weixinPay && (n[0].use = !0), 2 == a.payAtStore && (n[2].use = !0), 1 != a.defaultPayMethod && (i = 2), 
                e.ele.setData({
                    payConfig: a,
                    payList: n,
                    payIndex: i
                }), o && o();
            }
        },
        fail: function() {
            (0, t.ShowDialog)(e.ele);
        }
    });
};