var t = require("../../../../components/conf/conf"), e = require("../../components/model/get-order-list-m"), a = getApp();

Page({
    data: {
        activeIndex: 0,
        orderSegment: [ {
            tabName: "待收货",
            status: 10
        }, {
            tabName: "待取货",
            status: 4
        }, {
            tabName: "已完成",
            status: 6
        }, {
            tabName: "已关闭",
            status: 9
        } ],
        status: 10,
        orderType: 1,
        orderingList: [],
        pageNo: 1,
        haveData: !0,
        NodataTip: !1,
        isClick: !0,
        loading_fail: !1,
        pageLoading: !1,
        onReachBottom: !1,
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        orderCode: {
            codeTip: !1,
            codeUrl: ""
        }
    },
    onLoad: function(t) {
        var e = this;
        a.getNewOpenId(function(a) {
            t.status && e.setData({
                activeIndex: t.index,
                status: t.status
            }), e.getOrderList(e.data.status);
        });
    },
    orderTabClick: function(t) {
        var e = this;
        if (e.data.isClick) {
            var a = t.target.dataset.index, o = t.target.dataset.status;
            e.setData({
                activeIndex: a,
                status: o,
                onReachBottom: !1,
                pageLoading: !1
            }), wx.showLoading({
                title: "加载中..."
            }), e.getOrderList(o);
        }
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
    searchLogist: function(t) {
        var e = t.target.dataset, a = (e.expressName ? e.expressName : "商家配送") + " " + (e.expressNo ? e.expressNo : "");
        wx.showModal({
            title: "物流信息",
            content: a,
            showCancel: !1,
            success: function(t) {
                t.confirm;
            }
        });
    },
    confirmReceipt: function(t) {
        var e = this, a = t.target.dataset.orderId;
        wx.showModal({
            title: "是否已收到商品?",
            content: "请确认收到商品后再确认收货",
            success: function(t) {
                t.confirm && e.changeStatus(a);
            }
        });
    },
    pickGoods: function(t) {
        var e = this, a = t.target.dataset.orderId;
        wx.showModal({
            title: "是否已收到商品？",
            content: "请确认已取货后再确认取货",
            success: function(t) {
                t.confirm && e.changeStatus(a);
            }
        });
    },
    getOrderList: function(o) {
        var s = this;
        s.data.orderingList = [], s.data.pageNo = 1, s.data.NodataTip = !1, s.data.isClick = !1, 
        s.setData(s.data);
        var i = {
            openId: a.globalData.openid,
            pageIndex: 1,
            pageSize: t.Conf.pageSize,
            status: o,
            type: s.data.orderType
        };
        (0, e.getOrderList)({
            ele: s,
            data: i
        });
    },
    changeStatus: function(t) {
        var e = this;
        wx.request({
            url: a.globalData.shopMHost + "/xcx/org/order/updateStatus",
            method: "post",
            data: {
                id: t,
                status: 6
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e.getOrderList(e.data.status);
            }
        });
    },
    goOrderDetail: function(t) {
        var e = t.currentTarget.dataset, a = {};
        7 == e.status && (a = {
            title: "买家取消订单",
            content: "你已取消此订单,如有需要请重新下单"
        }), 8 == e.status && (a = {
            title: "卖家关闭订单",
            content: "此订单被卖家关闭,请与商家客服联系"
        }), 7 == e.status || 8 == e.status ? wx.showModal({
            title: a.title,
            content: a.content,
            confirmText: "查看详情",
            cancelText: "取消",
            success: function(t) {
                t.confirm && wx.navigateTo({
                    url: "/subPackage/my/pages/new_order_detail/new_order_detail?id=" + e.id
                });
            }
        }) : wx.navigateTo({
            url: "/subPackage/my/pages/new_order_detail/new_order_detail?id=" + e.id
        });
    },
    onPullDownRefresh: function() {
        var o = this;
        o.setData({
            pageLoading: !1,
            loading_fail: !1
        }), a.getNewOpenId(function(a) {
            var s = {
                openId: a,
                pageIndex: 1,
                pageSize: t.Conf.pageSize,
                status: o.data.status,
                type: o.data.orderType
            };
            1 == o.data.isClick && (o.setData({
                isClick: !1,
                pageNo: 1
            }), (0, e.getOrderList)({
                ele: o,
                data: s,
                PullDown: !0
            }));
        });
    },
    onReachBottom: function() {
        var o = this;
        o.data.onReachBottom && (o.setData({
            onReachBottom: !1
        }), a.getNewOpenId(function(a) {
            var s = {
                openId: a,
                pageIndex: o.data.pageNo,
                pageSize: t.Conf.pageSize,
                status: o.data.status,
                type: o.data.orderType
            };
            1 == o.data.isClick && (o.setData({
                isClick: !1
            }), (0, e.getOrderList)({
                ele: o,
                data: s
            }));
        }));
    },
    clickRetry: function() {
        var o = this;
        wx.showLoading({
            title: "加载中"
        }), 1 == o.data.isClick && a.getNewOpenId(function(a) {
            var s = {
                openId: a,
                pageIndex: 1,
                pageSize: t.Conf.pageSize,
                status: o.data.status,
                type: o.data.orderType
            };
            o.setData({
                orderingList: [],
                isClick: !1,
                loading_fail: !1,
                showTipData: {
                    show: !1,
                    content: "网络连接失败"
                }
            }, function() {
                wx.hideLoading(), (0, e.getOrderList)({
                    ele: o,
                    data: s
                });
            });
        });
    }
});