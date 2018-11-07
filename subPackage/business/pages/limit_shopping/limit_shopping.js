function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../../components/function/countdown/countdown")), o = t(require("../../../../components/model/limitShopping/limitShopping")), e = require("../../../../components/model/buy_car/buy_car"), i = require("../../../../components/template/show_dialog/show_dialog"), n = getApp(), s = "limit_shopping";

Page({
    data: {
        showTipData: {
            show: !1
        },
        pageIndex: 1,
        list: [],
        showLoading: !0,
        loadMore: !1,
        hasMore: !0,
        collation: null,
        sort: 1,
        hideTime: null,
        orgName: "",
        showReturnIndexBtn: !1
    },
    onLoad: function(t) {
        var a = this;
        wx.showLoading({
            title: "加载中"
        }), t.iconName && wx.setNavigationBarTitle({
            title: t.iconName
        }), this.loadData(), n.getOrgInfo(function(t, o) {
            var e = o.orgName;
            !t && a.setData({
                orgName: e
            });
        }), t.action && "goHome" == t.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    onShow: function() {
        var t = this;
        n.setCarCountDot(), n.setMyCountDot(), this.data.hideTime && (0, a.default)({
            hideTime: this.data.hideTime,
            key: s,
            timeData: this.data.list,
            fn: function(a) {
                a && t.setData({
                    list: a
                });
            }
        });
    },
    chooseTab: function(t) {
        var a = this, o = t.detail, e = o.sort, i = o.collation;
        this.setData({
            sort: e,
            collation: i,
            pageIndex: 1
        }, function() {
            a.loadData();
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        this.setData({
            pageIndex: 1
        }, function() {
            t.loadData();
        }), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 2e3);
    },
    onReachBottom: function() {
        this.data.hasMore && this.loadData("loadMore");
    },
    onHide: function() {
        this.setData({
            hideTime: new Date().getTime()
        }), n.globalData.timerObj && n.globalData.timerObj[s] && clearTimeout(n.globalData.timerObj[s]);
    },
    onUnload: function() {
        n.globalData.timerObj && n.globalData.timerObj[s] && clearTimeout(n.globalData.timerObj[s]);
    },
    jumpToNext: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/subPackage/discover/pages/" + (3 == n.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + a
        });
    },
    addCar: function(t) {
        var a = this, o = t.currentTarget.dataset.index, n = this.data.list[o];
        n.inventory ? (0, e.addBuyCar)({
            id: n.id,
            count: 1
        }, function() {
            (0, i.ShowDialog)(a, "加入购物车成功");
        }) : (0, i.ShowDialog)(this, "该商品已售罄");
    },
    onShareAppMessage: function(t) {
        var a = getCurrentPages(), o = n.isHasTabByTitle({
            url: a[a.length - 1].route
        });
        console.log("tempJson=", o);
        var e = "/subPackage/business/pages/limit_shopping/limit_shopping?action=goHome";
        return o.check && (e = "/subPackage/business/pages/limit_shopping/limit_shopping"), 
        console.log("tempShareUrl=", e), {
            title: n.globalData.nickName + "给你推荐了「" + this.data.orgName + "」",
            path: e
        };
    },
    loadData: function(t) {
        var e = this, l = this.data, r = l.pageIndex, d = l.sort, g = l.collation, u = l.list;
        if (!this.data.loadMore) {
            "loadMore" == t && this.setData({
                loadMore: !0
            });
            var h = {
                pageIndex: r,
                pageSize: 10,
                sort: d,
                collation: g,
                orgId: n.globalData.orgId
            };
            (0, o.default)(h, function(o, n) {
                if (setTimeout(function() {
                    wx.hideLoading();
                }, 1e3), o) return (0, i.ShowDialog)(e, "网络连接失败");
                n.length > 0 && (r += 1);
                var l = "loadMore" == t ? u.concat(n) : n;
                e.setData({
                    list: l,
                    pageIndex: r,
                    showLoading: !1,
                    loadMore: !1,
                    hasMore: 10 == n.length
                }), (0, a.default)({
                    key: s,
                    timeData: l,
                    fn: function(t) {
                        t && e.setData({
                            list: t
                        });
                    }
                });
            });
        }
    }
});