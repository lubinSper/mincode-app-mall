function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.paymentM = void 0;

var a = require("../../../../components/template/show_dialog/show_dialog"), t = getApp();

exports.paymentM = function(o) {
    t.getNewOpenId(function(n) {
        var d;
        wx.showLoading({
            title: "加载中"
        }), wx.request((d = {
            url: t.globalData.shopMHost + "xcx/org/order/add",
            data: {
                openId: n,
                goodsId: o.data.goodsId,
                xcxId: t.globalData.xcxId
            },
            method: "post",
            header: {
                "content-type": "application/json"
            },
            complete: function() {
                o.fn && o.fn();
            },
            success: function(e) {
                wx.hideLoading(), "000000" == e.data.code ? wx.requestPayment({
                    timeStamp: e.data.data.timeStamp,
                    nonceStr: e.data.data.nonceStr,
                    package: e.data.data.package,
                    signType: e.data.data.signType,
                    paySign: e.data.data.paySign,
                    success: function(e) {
                        e && (wx.setStorage({
                            key: "ordering_state",
                            data: "2"
                        }), wx.setStorage({
                            key: "ordering_type",
                            data: "2"
                        }), o.ele.data.visiable = "flex", o.ele.setData(o.ele.data));
                    }
                }) : (o.ele.setData({
                    showTipData: {
                        show: !1,
                        content: e.data.msg
                    }
                }), (0, a.ShowDialog)(o.ele));
            }
        }, e(d, "complete", function() {
            o.fn && o.fn();
        }), e(d, "fail", function(e) {
            (0, a.ShowDialog)(o.ele);
        }), d));
    });
};