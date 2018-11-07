var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../components/function/countdown/countdown")), a = require("../../../../components/model/discover/goods-detail/goods-detail-m"), e = getApp();

Page({
    data: {
        pageIndex: 1,
        list: [],
        showLoading: !0,
        loadMore: !1,
        hasMore: !0,
        hideTime: null,
        showReturnIndexBtn: !1
    },
    onLoad: function(t) {
        var n = this, o = t.id, i = t.action;
        wx.showLoading({
            title: "加载中"
        }), e.getNewOpenId(function(t) {
            (0, a.newGoodsInfo)({
                openId: t,
                id: o
            }, function(t, a) {
                n.setData({
                    id: o,
                    goods: a,
                    activityId: a.pintuanActivityId
                }, function() {
                    n.loadData();
                });
            });
        }), i && "goHome" == i ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    openPintuan: function(t) {
        var a = t.currentTarget.dataset.pintuanId, e = this.data.goods, n = e.id, o = e.inventory, i = (e.pintuanLeftOpenNum, 
        function(t) {
            wx.showModal({
                title: "提示",
                content: t,
                showCancel: !1
            });
        });
        2 == e.isJoinPintuan ? i("该商品你已有拼团，无法再次参团。") : 0 == o ? i("该商品已售罄，无法参团") : wx.navigateTo({
            url: "/subPackage/my/pages/order/order_sure_pickup/order_sure_pickup?from=4&id=" + n + "&pintuanId=" + a
        });
    },
    onShow: function() {},
    onPullDownRefresh: function() {
        var t = this;
        this.setData({
            pageIndex: 1
        }, function() {
            t.loadData();
        });
    },
    onReachBottom: function() {
        this.data.hasMore && this.loadData("loadMore");
    },
    onUnload: function() {
        e.globalData.timerObj && e.globalData.timerObj.pintuan_list && clearTimeout(e.globalData.timerObj.pintuan_list);
    },
    onShareAppMessage: function(t) {
        var a = getCurrentPages(), n = e.isHasTabByTitle({
            url: a[a.length - 1].route
        });
        console.log("tempJson=", n);
        var o = "/subPackage/discover/pages/pintuan_list/pintuan_list?action=goHome&id=" + this.data.id;
        return n.check && (o = "/subPackage/discover/pages/pintuan_list/pintuan_list?id=" + this.data.id), 
        console.log("tempShareUrl=", o), {
            url: o
        };
    },
    loadData: function(a) {
        var n = this, o = this.data, i = o.activityId, s = o.pageIndex, d = o.list;
        if (!this.data.loadMore) {
            "loadMore" == a && this.setData({
                loadMore: !0
            });
            var u = {
                activityId: i,
                pageIndex: s,
                pageSize: 10
            };
            wx.request({
                url: e.globalData.shopMHost + "xcx/pintuan/pageOpenTuan",
                method: "post",
                data: u,
                header: {
                    "content-type": "application/json"
                },
                complete: function() {
                    wx.hideLoading(), wx.stopPullDownRefresh();
                },
                success: function(e) {
                    if ("000000" == e.data.code) {
                        var o = e.data.data ? e.data.data.data : [];
                        o.length > 0 && (s += 1);
                        var i = "loadMore" == a ? d.concat(o) : o;
                        n.setData({
                            count: e.data.data.allRecord,
                            list: i,
                            pageIndex: s,
                            loadMore: !1,
                            hasMore: 10 == o.length
                        }), (0, t.default)({
                            key: "pintuan_list",
                            timeKey: "limitTime",
                            timeData: i,
                            fn: function(t) {
                                t && n.setData({
                                    list: t
                                });
                            }
                        });
                    }
                },
                fail: function(t) {
                    return e.showDialog(n, "网络连接失败");
                }
            });
        }
    }
});