require("../../model/my_reservation_data.js");

var e = getApp();

Component({
    properties: {
        arrList: {
            type: Array,
            value: [],
            observer: function(e, t) {}
        }
    },
    data: {
        orderCode: {
            codeTip: !1,
            codeUrl: ""
        }
    },
    methods: {
        confirmCompletion: function(e) {
            var t = e.currentTarget.dataset.id, r = e.currentTarget.dataset.customerRemark, a = parseInt(e.currentTarget.dataset.index), o = this;
            wx.showModal({
                title: "确认完成这个预约吗？",
                content: "请确认已到店完成预约再完成订单",
                success: function(e) {
                    if (e.confirm) {
                        var n = {
                            id: t,
                            delIndex: a,
                            customerRemark: r
                        }, c = {};
                        o.triggerEvent("confirmCompletionTwo", n, c);
                    } else e.cancel;
                }
            });
        },
        searchOrderCode: function(t) {
            var r = this, a = t.currentTarget.dataset.orderId;
            r.setData({
                orderCode: {
                    codeTip: !0,
                    codeUrl: e.globalData.shopMHost + "xcx/qrCode/order/" + a
                }
            });
        },
        clickMask: function(e) {
            this.setData({
                orderCode: {
                    codeTip: !1
                }
            });
        },
        jumpFunc: function(e) {
            var t = e.currentTarget.dataset.status, r = e.currentTarget.dataset.id;
            "7" == t ? wx.showModal({
                title: "买家取消订单",
                content: "你已取消此订单，如有需要请重新下单",
                confirmText: "查看详情",
                success: function(e) {
                    e.confirm ? wx.navigateTo({
                        url: "/subPackage/my/pages/new_order_detail/new_order_detail?id=" + r
                    }) : e.cancel;
                }
            }) : "8" == t ? wx.showModal({
                title: "卖家关闭订单",
                content: "此订单被卖家关闭，请与商家客服联系",
                confirmText: "查看详情",
                success: function(e) {
                    e.confirm ? wx.navigateTo({
                        url: "/subPackage/my/pages/new_order_detail/new_order_detail?id=" + r
                    }) : e.cancel;
                }
            }) : wx.navigateTo({
                url: "/subPackage/my/pages/new_order_detail/new_order_detail?id=" + r
            });
        }
    }
});