var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../components/function/countdown/countdown")), a = getApp(), e = "my_pintuan_list";

Page({
    data: {
        pageIndex: 1,
        list: [],
        showLoading: !0,
        loadMore: !1,
        hasMore: !0,
        hideTime: null,
        status: 1,
        noData: !1,
        showReturnIndexBtn: !1
    },
    onLoad: function(t) {
        var e = this;
        wx.showLoading({
            title: "加载中"
        }), a.getNewOpenId(function(t) {
            e.setData({
                openId: t
            }, function() {
                e.loadData();
            });
        }), t.action && "goHome" == t.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    chooseTab: function(t) {
        var a = this, e = t.currentTarget.dataset.status;
        e != this.data.status && this.setData({
            status: +e,
            pageIndex: 1
        }, function() {
            wx.showLoading({
                title: "加载中..."
            }), a.loadData();
        });
    },
    goOrderDetail: function(t) {
        var a = t.currentTarget.dataset, e = a.orderId, o = a.orderType;
        console.log("------订单类型为：--------", o), 2 == o ? wx.navigateTo({
            url: "/subPackage/my/pages/new_order_detail/new_order_detail?id=" + e
        }) : wx.navigateTo({
            url: "/subPackage/my/pages/order_detail/order_detail?orderId=" + e
        });
    },
    toPintuanDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/subPackage/discover/pages/pintuan_detail/pintuan_detail?id=" + a
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
        a.globalData.timerObj && a.globalData.timerObj[e] && clearTimeout(a.globalData.timerObj[e]);
    },
    loadData: function(o) {
        var n = this, i = this.data, d = i.pageIndex, s = i.list, r = i.status, l = i.openId;
        if (!this.data.loadMore) {
            "loadMore" == o && this.setData({
                loadMore: !0
            });
            var u = a.globalData.orgId, c = {
                openId: l,
                status: r,
                pageIndex: d,
                pageSize: 10,
                orgId: u
            };
            wx.request({
                url: a.globalData.shopMHost + "xcx/pintuan/list",
                method: "post",
                data: c,
                header: {
                    "content-type": "application/json"
                },
                complete: function() {
                    wx.stopPullDownRefresh();
                },
                success: function(i) {
                    if ("000000" != i.data.code) return "loadMore" != o && n.setData({
                        noData: !0
                    }), a.showDialog(n, "网络连接失败");
                    var r = i.data.data.data ? i.data.data.data : [];
                    r.forEach(function(t) {
                        t.limitTime = Math.ceil(t.limitTime), t.limitPeopleNum == t.currentPeopleNum && (t.limitTime = -1);
                    }), r.length > 0 && (d += 1);
                    var l = "loadMore" == o ? s.concat(r) : r;
                    n.setData({
                        list: l,
                        pageIndex: d,
                        loadMore: !1,
                        hasMore: 10 == r.length
                    }, function() {
                        setTimeout(function() {
                            wx.hideLoading();
                        }, 1e3);
                    }), "loadMore" != o && n.setData({
                        noData: 0 == r.length
                    }), (0, t.default)({
                        key: e,
                        timeKey: "limitTime",
                        isMyPintuan: 2,
                        timeData: l,
                        fn: function(t) {
                            t && n.setData({
                                list: t
                            });
                        }
                    });
                },
                fail: function(t) {
                    return wx.hideLoading(), "loadMore" != o && n.setData({
                        noData: !0
                    }), a.showDialog(n, "网络连接失败");
                }
            });
        }
    }
});