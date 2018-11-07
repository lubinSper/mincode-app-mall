var t = require("../../../../components/model/my/order_detail/order_detail_m"), e = require("../../../../components/model/message/QRCode-collection/shop-info-m"), a = (require("../../../../util/util.js"), 
getApp());

Page({
    data: {
        activityIconType: [ "xsg_icon", "kj_icon", "pt_icon" ],
        id: 0,
        isContinueBuy: 0,
        order: null,
        originalFreight: 0,
        isFullAmount: "1",
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        homePath: a.globalData.HomePath,
        remainingTime: "",
        orderInterval: null,
        orderCode: {
            codeTip: !1,
            codeUrl: ""
        }
    },
    onLoad: function(t) {
        console.log(t), wx.showLoading({
            title: "加载中..."
        });
        var o = this;
        t && o.setData({
            id: t.id,
            isContinueBuy: t.isContinueBuy ? t.isContinueBuy : 0
        }), (0, e.shopInfoM)({
            ele: o,
            data: {
                xcxId: a.globalData.xcxId
            }
        });
    },
    timeTransfer: function() {
        var t = this, e = (Date.parse(new Date()), 1209600 - (Date.parse(new Date()) - t.data.updateTime) / 1e3), a = 0, o = 0, r = 0;
        a = parseInt(e / 86400);
        var n = e % 86400;
        o = parseInt(n / 3600), r = parseInt(n % 3600 / 60), t.setData({
            remainingTime: a + "天" + o + "时" + r + "分"
        });
    },
    onShow: function() {
        var e = this;
        (0, t.getNewOrderDetailM)({
            ele: e,
            data: {
                id: parseInt(e.data.id)
            }
        }, function() {
            if (e.data.orderInterval && (clearInterval(e.data.orderInterval), e.setData({
                orderInterval: null
            })), 3 == e.data.order.status) {
                var t = setInterval(e.timeTransfer, 1e3);
                e.setData({
                    orderInterval: t
                });
            }
        });
    },
    searchOrderCode: function(t) {
        var e = this, o = t.target.dataset.orderId;
        e.setData({
            orderCode: {
                codeTip: !0,
                codeUrl: a.globalData.shopMHost + "xcx/qrCode/order/" + o
            }
        });
    },
    clickMask: function(t) {
        this.setData({
            orderCode: {
                codeTip: !1
            }
        });
    },
    cancleOrder: function(t) {
        var e = this, a = e.data.order.payMethod;
        (1 == a || 3 == a) && e.data.order.price > 0 ? wx.showModal({
            title: "请联系商家客服",
            content: "你已支付，如需取消订单请联系商家客服",
            showCancel: !1,
            confirmText: "关闭"
        }) : wx.navigateTo({
            url: "/subPackage/my/pages/order/cancle_order/cancle_order?id=" + e.data.id + "&isBack=1"
        });
    },
    sureFuc: function(t) {
        var e = this, a = e.data.order.status, o = "", r = "";
        3 == a ? (o = "是否已收到商品?", r = "请确认收到商品后再确认收货") : 4 == a ? (o = "是否已收到商品?", r = "请确认已取货后再确认取货") : 5 == a && (o = "确认完成这个预约吗?", 
        r = "请确认已到店完成预约再完成订单"), r.length > 0 && wx.showModal({
            title: o,
            content: r,
            success: function(t) {
                t.confirm && e.changeOrderStatus();
            }
        });
    },
    changeOrderStatus: function() {
        var t = this;
        wx.request({
            url: a.globalData.shopMHost + "/xcx/org/order/updateStatus",
            method: "post",
            data: {
                id: t.data.id,
                status: 6
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t.onShow();
                var a = getCurrentPages();
                if (a.length > 1) {
                    var o = a[a.length - 2];
                    o.getOrderList(o.data.status);
                }
            }
        });
    },
    copyPost: function(t) {
        var e = this.data.order.expressNo;
        wx.setClipboardData({
            data: e,
            success: function(t) {
                wx.showToast({
                    title: "复制成功",
                    icon: "success",
                    duration: 2e3
                }), wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data);
                    }
                });
            }
        });
    },
    continueGoBuy: function(t) {
        var e = this;
        wx.switchTab({
            url: e.data.homePath
        });
    }
});