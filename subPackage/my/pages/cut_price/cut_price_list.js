var a = require("../../../../components/conf/conf.js"), t = require("./cut-price-list-m.js"), e = getApp();

Page({
    data: {
        pageNo: 1,
        pageSize: 10,
        pageLoading: !1,
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        NodataTip: !1,
        default_img: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/one-shop-one-mini-app/140.png",
        cutPriceList: [],
        isClick: !0,
        loading_fail: !1,
        haveData: !0,
        tab_loading_failure: !1,
        onReachBottom: !1,
        status: 1
    },
    onLoad: function(i) {
        var o = this;
        wx.showLoading({
            title: "加载中"
        }), e.getNewOpenId(function(e) {
            var i = {
                status: o.data.status,
                openId: e,
                pageIndex: 1,
                pageSize: a.Conf.pageSize
            };
            o.setData({
                cutPriceList: []
            }), (0, t.cutPriceListM)({
                ele: o,
                data: i
            });
        });
    },
    onPullDownRefresh: function() {
        var i = this;
        e.getNewOpenId(function(e) {
            var o = {
                status: i.data.status,
                openId: e,
                pageIndex: 1,
                pageSize: a.Conf.pageSize
            };
            1 == i.data.isClick && (i.setData({
                isClick: !1,
                pageNo: 1
            }), (0, t.cutPriceListM)({
                ele: i,
                data: o,
                PullDown: !0
            }));
        });
    },
    chooseTab: function(i) {
        var o = i.currentTarget.dataset.status;
        if (o != this.data.status) {
            wx.showLoading({
                title: "加载中..."
            }), this.setData({
                status: o,
                pageNo: 1
            });
            var n = {
                status: o,
                openId: e.globalData.openid,
                pageIndex: 1,
                pageSize: a.Conf.pageSize
            };
            (0, t.cutPriceListM)({
                ele: this,
                data: n,
                PullDown: !0
            });
        }
    },
    onReachBottom: function() {
        var i = this;
        i.data.pageLoading && e.getNewOpenId(function(e) {
            var o = {
                status: i.data.status,
                openId: e,
                pageIndex: i.data.pageNo,
                pageSize: a.Conf.pageSize
            };
            1 == i.data.isClick && (i.setData({
                isClick: !1
            }), (0, t.cutPriceListM)({
                ele: i,
                data: o
            }));
        });
    },
    clickRetry: function() {
        var i = this;
        1 == i.data.isClick && (wx.showLoading({
            title: "加载中"
        }), e.getNewOpenId(function(e) {
            var o = {
                status: i.data.status,
                openId: e,
                pageIndex: 1,
                pageSize: a.Conf.pageSize
            };
            i.data.cutPriceList = [], i.data.isClick = !1, i.setData(i.data), (0, t.cutPriceListM)({
                ele: i,
                data: o
            });
        }));
    },
    reloadReadDown: function() {
        var i = this;
        i.data.onReachBottom = !0, i.data.tab_loading_failure = !1, i.data.oneClick = 1, 
        i.setData(i.data), e.getNewOpenId(function(e) {
            i.data.onReachBottom = !1;
            var o = {
                status: i.data.status,
                openId: e,
                pageIndex: i.data.pageNo,
                pageSize: a.Conf.pageSize
            };
            1 == i.data.isClick && (wx.showLoading({
                title: "加载中"
            }), i.setData({
                cutPriceList: [],
                isClick: !1
            }), (0, t.cutPriceListM)({
                ele: i,
                data: o
            }));
        });
    },
    goOrderDetail: function(a) {
        var t = a.currentTarget.dataset, e = t.orderId;
        2 == t.orderType ? wx.navigateTo({
            url: "/subPackage/my/pages/new_order_detail/new_order_detail?id=" + e
        }) : wx.navigateTo({
            url: "/subPackage/my/pages/order_detail/order_detail?orderId=" + e
        });
    },
    buyNow: function(a) {
        var t = a.currentTarget.dataset, e = (t.ids, t.id);
        wx.navigateTo({
            url: "/subPackage/my/pages/order/order_sure_pickup/order_sure_pickup?launchId=" + e + "&from=3"
        });
    },
    cuttingPriceDetail: function(a) {
        var t = a.currentTarget.dataset.id, e = a.currentTarget.dataset.limittime;
        console.log(e), e < 0 ? wx.showModal({
            title: "提示",
            content: "该砍价活动已经结束",
            showCancel: !1,
            success: function(a) {
                a.confirm;
            }
        }) : wx.navigateTo({
            url: "/subPackage/discover/pages/cut_price/cut_price?id=" + t
        });
    },
    buyOverNow: function(a) {
        if (2 == a.currentTarget.dataset.isbuy) var t = "你已经购买了该商品，请在“查看订单”中查看详情"; else t = "该砍价活动已经结束";
        wx.showModal({
            title: "提示",
            content: t,
            showCancel: !1,
            success: function(a) {
                a.confirm;
            }
        });
    }
});