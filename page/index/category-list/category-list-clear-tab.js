var t = require("../../../components/conf/conf"), a = require("../../../components/template/show_dialog/show_dialog"), e = require("../../../components/model/discover/discover-list-m"), o = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../components/function/countdown/countdown")), n = getApp(), i = "category_list";

Page({
    data: {
        pageIndex: 1,
        shopList: [],
        orgName: "",
        showLoading: !1,
        hasNextPage: !1,
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        noData: !1,
        haveData: !1,
        showBlank: !1,
        loading_fail: !1,
        shareUrl: "",
        categoryId: "",
        sort: 1,
        collation: null,
        showReturnIndexBtn: !1
    },
    onLoad: function(t) {
        var a = this, e = this;
        wx.showLoading({
            title: "加载中"
        });
        n.getTabBarTitle();
        var o = getCurrentPages(), i = n.isHasTabByTitle({
            url: o[o.length - 1].route
        });
        console.log("tempJson=", i);
        var s = "/page/index/category-list/category-list-clear-tab?action=goHome";
        i.check && (s = "/page/index/category-list/category-list-clear-tab"), console.log("tempShareUrl=", s), 
        this.setData({
            categoryId: null,
            iconName: "清仓",
            tagType: 3,
            shopList: [],
            pageIndex: 1,
            shareUrl: s
        }, function() {
            a.loadData({
                PullDownRefresh: !0
            });
        }), e.storeDetail({
            orgId: n.globalData.orgId
        }), e.getBtnText(), t.action && "goHome" == t.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    onShow: function() {
        var t = this;
        this.data.hideTime && (0, o.default)({
            hideTime: this.data.hideTime,
            key: i,
            timeData: this.data.shopList,
            fn: function(a) {
                a && t.setData({
                    shopList: a
                });
            }
        });
    },
    onHide: function() {
        this.setData({
            hideTime: new Date().getTime()
        }), n.globalData.timerObj && n.globalData.timerObj[i] && clearTimeout(n.globalData.timerObj[i]);
    },
    chooseTab: function(t) {
        var a = this, e = t.detail, o = e.sort, n = e.collation;
        this.setData({
            sort: o,
            collation: n
        }, function() {
            a.loadData({
                PullDownRefresh: !0
            });
        });
    },
    storeDetail: function(t) {
        var e = this;
        wx.request({
            url: n.globalData.host + "/coupon/org/info",
            method: "post",
            data: t,
            header: {
                "content-type": "application/json"
            },
            complete: function() {
                wx.stopPullDownRefresh();
            },
            success: function(t) {
                if (t.data) {
                    var a = t.data.data;
                    e.data.orgName = a.orgName;
                }
            },
            fail: function() {
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3), n.globalData.showErrorAlert && (0, a.ShowDialog)(e);
            }
        });
    },
    onShareAppMessage: function(t) {
        var a = this;
        return {
            title: n.globalData.nickName + "给你推荐了「" + a.data.orgName + "」",
            path: a.data.shareUrl,
            imageUrl: a.data.img
        };
    },
    onReachBottom: function() {
        var t = this, a = this;
        a.data.hasNextPage && (a.data.showLoading = !0, a.data.hasNextPage = !1, a.setData(a.data, function() {
            t.loadData({
                ReachBottom: !0
            });
        })), a.getBtnText();
    },
    onPullDownRefresh: function() {
        var t = this, a = this;
        a.data.pageIndex = 1, a.data.showBlank = !1, a.data.showLoading = !1, a.data.hasNextPage = !1, 
        a.setData(a.data, function() {
            t.loadData({
                PullDownRefresh: !0
            });
        }), a.getBtnText();
    },
    loadData: function(a) {
        var s = this, l = a.ReachBottom, r = a.PullDownRefresh, c = this.data, h = c.sort, d = c.collation, g = c.pageIndex, p = c.categoryId, u = c.tagType;
        n.getNewOpenId(function(a) {
            var c = {
                sort: h,
                collation: d,
                orgId: n.globalData.orgId,
                pageIndex: r ? 1 : g,
                pageSize: t.Conf.pageSize,
                openId: n.globalData.openid
            };
            u && (c.tagType = u), p && (c.categoryId = p), (0, e.DiscoverListM)({
                ele: s,
                data: c,
                PullDownRefresh: r,
                ReachBottom: l,
                href: "special_selling",
                fn: function(t) {
                    (0, o.default)({
                        key: i,
                        timeData: t,
                        fn: function(t) {
                            t && s.setData({
                                shopList: t
                            });
                        }
                    });
                },
                isTab: !0
            });
        });
    },
    getBtnText: function(t) {
        var a = this;
        n.getBtnText(function(t) {
            t && a.setData({
                appointmentCopy: t.appointmentCopy ? t.appointmentCopy : "立即预约",
                appointmentZeroCopy: t.appointmentZeroCopy ? t.appointmentZeroCopy : "马上咨询",
                purchaseCopy: t.purchaseCopy ? t.purchaseCopy : "立即购买"
            });
        });
    }
});