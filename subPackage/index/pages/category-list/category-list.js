var t = require("../../../../components/conf/conf"), a = require("../../../../components/template/show_dialog/show_dialog"), e = require("../../../../components/model/discover/discover-list-m"), o = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../components/function/countdown/countdown")), n = require("../../../../components/wx-tpl/custom-page-tpl/common-js/classLoop.js"), i = require("../../../../components/model/discover/category-m"), s = getApp(), r = "category_list";

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
        isSetViewRecord: !0,
        showReturnIndexBtn: !1,
        tabList: {
            list: []
        },
        isHasClass: !0
    },
    onLoad: function(t) {
        var a = this, e = this;
        wx.showLoading({
            title: "加载中"
        });
        var o = t.categoryId, r = t.iconName, l = t.tagType, c = t.activityType, d = void 0 === c ? null : c;
        t && wx.setNavigationBarTitle({
            title: r
        }), o && (0, i.categoryM)({
            ele: this,
            data: {
                xcxId: s.globalData.xcxId
            },
            fn: function() {
                (0, n.classLoop)(o, a.data.tabList.list);
                a.setData({
                    isHasClass: n.isHasClass
                });
            }
        });
        var g = getCurrentPages(), h = s.isHasTabByTitle({
            url: g[g.length - 1].route
        });
        o = o || "", console.log("tempJson=", h);
        var p = "/subPackage/index/pages/category-list/category-list?action=goHome&categoryId=" + o + "&&iconName=" + r + "&&tagType=" + l + "&&activityType=" + d + "&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id);
        h.check && (p = "/subPackage/index/pages/category-list/category-list?categoryId=" + o + "&&iconName=" + r + "&&tagType=" + l + "&&activityType=" + d + "&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id)), 
        console.log("tempShareUrl=", p), this.setData({
            categoryId: o ? +o : null,
            activityType: d,
            iconName: r,
            tagType: +l ? +l : null,
            shopList: [],
            pageIndex: 1,
            shareUrl: p
        }, function() {
            a.loadData({
                PullDownRefresh: !0
            });
        }), d && this.setData({
            isSetViewRecord: !1
        }), e.storeDetail({
            orgId: s.globalData.orgId
        }), e.getBtnText(), t.action && "goHome" == t.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    onShow: function() {
        var t = this;
        s.setCarCountDot(), s.setMyCountDot(), this.data.hideTime && (0, o.default)({
            hideTime: this.data.hideTime,
            key: r,
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
        }), s.globalData.timerObj && s.globalData.timerObj[r] && clearTimeout(s.globalData.timerObj[r]);
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
            url: s.globalData.host + "/coupon/org/info",
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
                (0, a.ShowDialog)(e), setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
            }
        });
    },
    onShareAppMessage: function(t) {
        var a = this;
        return console.log(a.data.shareUrl), {
            title: s.globalData.nickName + "给你推荐了「" + a.data.orgName + "」",
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
        var n = this, i = a.ReachBottom, l = a.PullDownRefresh, c = this.data, d = c.sort, g = c.collation, h = c.pageIndex, p = c.categoryId, u = c.tagType, m = c.activityType;
        s.getNewOpenId(function(a) {
            var c = {
                sort: d,
                collation: g,
                orgId: s.globalData.orgId,
                pageIndex: l ? 1 : h,
                pageSize: t.Conf.pageSize,
                openId: s.globalData.openid
            };
            u && (c.tagType = u), p && (c.categoryId = p), m && (c.activityType = m), (0, e.DiscoverListM)({
                ele: n,
                data: c,
                PullDownRefresh: l,
                ReachBottom: i,
                href: "special_selling",
                fn: function(t) {
                    (0, o.default)({
                        key: r,
                        timeData: t,
                        fn: function(t) {
                            t && n.setData({
                                shopList: t
                            });
                        }
                    });
                }
            });
        });
    },
    getBtnText: function(t) {
        var a = this;
        s.getBtnText(function(t) {
            t && a.setData({
                appointmentCopy: t.appointmentCopy ? t.appointmentCopy : "立即预约",
                appointmentZeroCopy: t.appointmentZeroCopy ? t.appointmentZeroCopy : "马上咨询",
                purchaseCopy: t.purchaseCopy ? t.purchaseCopy : "立即购买"
            });
        });
    }
});