var a = require("../../../../components/conf/conf"), t = require("../../components/model/my_reservation_data.js"), e = getApp();

Page({
    data: {
        status: 5,
        reservationData: [],
        haveData: !0,
        pageIndex: 1,
        pageSize: 10,
        onReachBottom: !1,
        pageLoading: !1,
        overtime: !1,
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        tab_loading_failure: !1,
        showLastPageTip: !1,
        type: 2,
        isClick: !1
    },
    onLoad: function(a) {
        var t = this;
        wx.showLoading({
            title: "加载中..."
        }), t.getData();
    },
    confirmCompletion: function(a) {
        var e = this, o = a.detail.id, n = a.detail.delIndex, i = {
            id: o,
            customerRemark: a.detail.customerRemark,
            status: 6,
            delIndex: n
        };
        (0, t.sure_complete)({
            ele: e,
            data: i
        }, function() {
            e.setData({
                status: 5
            });
        });
    },
    getData: function(o) {
        var n = this;
        e.getNewOpenId(function(e) {
            var o = {
                openId: e,
                pageIndex: 1,
                pageSize: a.Conf.pageSize,
                status: n.data.status,
                type: n.data.type
            };
            (0, t.my_reservationData)({
                ele: n,
                data: o
            }, function() {
                wx.hideLoading();
            });
        });
    },
    chooseTab: function(a) {
        var t = this, e = a.currentTarget.dataset.status;
        e != this.data.status && t.data.isClick && (wx.showLoading({
            title: "加载中..."
        }), t.setData({
            reservationData: [],
            pageLoading: !1,
            onReachBottom: !1,
            pageIndex: 1,
            showLastPageTip: !1,
            isClick: !1
        }), this.setData({
            status: e
        }, function() {
            t.getData();
        }));
    },
    onReachBottom: function() {
        var o = this;
        o.data.onReachBottom && (o.setData({
            onReachBottom: !1
        }), e.getNewOpenId(function(e) {
            var n = {
                openId: e,
                pageIndex: o.data.pageIndex,
                pageSize: a.Conf.pageSize,
                status: o.data.status,
                type: o.data.type
            };
            (0, t.my_reservationData)({
                ele: o,
                data: n
            });
        }));
    },
    onPullDownRefresh: function() {
        var o = this;
        o.setData({
            overtime: !1
        }), e.getNewOpenId(function(e) {
            var n = {
                openId: e,
                pageIndex: 1,
                pageSize: a.Conf.pageSize,
                status: o.data.status,
                type: o.data.type
            };
            (0, t.my_reservationData)({
                ele: o,
                data: n
            });
        });
    },
    clickRetry: function() {
        var a = this;
        a.getData(), a.setData({
            pageIndex: 1,
            overtime: !1,
            showLoading: !0,
            showTipData: {
                show: !1,
                content: "网络连接失败"
            },
            tab_loading_failure: !1
        });
    },
    reloadReadDown: function() {
        var o = this;
        o.setData({
            overtime: !1,
            showLoading: !0,
            showTipData: {
                show: !1,
                content: "网络连接失败"
            },
            tab_loading_failure: !1
        }), e.getNewOpenId(function(e) {
            var n = {
                openId: e,
                pageIndex: o.data.pageIndex,
                pageSize: a.Conf.pageSize,
                status: o.data.status,
                type: o.data.type
            };
            (0, t.my_reservationData)({
                ele: o,
                data: n
            });
        });
    },
    onShow: function() {}
});