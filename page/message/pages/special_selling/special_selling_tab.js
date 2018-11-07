var a = require("../../../../components/conf/conf"), e = require("../../../../components/template/show_dialog/show_dialog"), t = require("../../../../components/model/discover/discover-list-m"), o = getApp();

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
        collation: null,
        sort: 1,
        isSetViewRecord: !0,
        showReturnIndexBtn: !1
    },
    onLoad: function(e) {
        var i = this;
        setTimeout(function() {
            e.iconName && wx.setNavigationBarTitle({
                title: e.iconName
            });
        }, 1e3), wx.showLoading({
            title: "加载中"
        }), o.getTabBarTitle(), i.data.shopList = [], i.data.pageIndex = 1, i.setData(i.data), 
        i.storeDetail({
            orgId: o.globalData.orgId
        }), o.getNewOpenId(function(e) {
            (0, t.DiscoverListM)({
                ele: i,
                data: {
                    sort: 1,
                    orgId: o.globalData.orgId,
                    pageIndex: i.data.pageIndex,
                    pageSize: a.Conf.pageSize,
                    openId: o.globalData.openid,
                    type: 4
                },
                href: "special_selling",
                isTab: !0
            });
        }), e.action && "goHome" == e.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    chooseTab: function(e) {
        var i = this;
        wx.showLoading({
            title: "加载中"
        });
        var s = e.detail, n = s.sort, l = s.collation;
        this.setData({
            sort: n,
            collation: l
        }), o.getNewOpenId(function(e) {
            (0, t.DiscoverListM)({
                ele: i,
                data: {
                    sort: n,
                    collation: l,
                    orgId: o.globalData.orgId,
                    pageIndex: 1,
                    pageSize: a.Conf.pageSize,
                    openId: e,
                    type: 4
                },
                PullDown: !0,
                href: "special_selling",
                isTab: !0
            });
        });
    },
    storeDetail: function(a) {
        var t = this;
        wx.request({
            url: o.globalData.host + "/coupon/org/info",
            method: "post",
            data: a,
            header: {
                "content-type": "application/json"
            },
            complete: function() {
                wx.stopPullDownRefresh();
            },
            success: function(a) {
                if (a.data) {
                    var e = a.data.data;
                    t.data.orgName = e.orgName;
                }
            },
            fail: function() {
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3), o.globalData.showErrorAlert && (0, e.ShowDialog)(t);
            }
        });
    },
    onShareAppMessage: function() {
        var a = this, e = getCurrentPages(), t = o.isHasTabByTitle({
            url: e[e.length - 1].route
        });
        console.log("tempJson=", t);
        var i = "/page/message/pages/special_selling/special_selling_tab?action=goHome";
        return t.check && (i = "/page/message/pages/special_selling/special_selling_tab"), 
        console.log("tempShareUrl=", i), {
            title: o.globalData.nickName + "给你推荐了「" + a.data.orgName + "」",
            path: i,
            imageUrl: a.data.img
        };
    },
    jumpToNext: function(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/subPackage/discover/pages/" + (3 == o.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + e + "&state=special_selling"
        });
    },
    onReachBottom: function() {
        var e = this;
        if (e.data.hasNextPage) {
            e.data.showLoading = !0, e.data.hasNextPage = !1;
            var i = this.data, s = i.sort, n = i.collation;
            e.setData(e.data), (0, t.DiscoverListM)({
                ele: e,
                data: {
                    sort: s,
                    collation: n,
                    orgId: o.globalData.orgId,
                    pageIndex: e.data.pageIndex,
                    pageSize: a.Conf.pageSize,
                    openId: o.globalData.openid,
                    type: 4
                },
                ReachBottom: !0,
                href: "special_selling",
                isTab: !0
            });
        }
    },
    onPullDownRefresh: function() {
        var e = this;
        e.data.pageIndex = 1, e.data.showBlank = !1, e.data.showLoading = !1, e.data.hasNextPage = !1, 
        e.setData(e.data);
        var i = this.data, s = i.sort, n = i.collation;
        (0, t.DiscoverListM)({
            ele: e,
            data: {
                sort: s,
                collation: n,
                orgId: o.globalData.orgId,
                pageIndex: e.data.pageIndex,
                pageSize: a.Conf.pageSize,
                openId: o.globalData.openid,
                type: 4
            },
            PullDown: !0,
            href: "special_selling",
            isTab: !0
        });
    },
    previewImage: function(a) {
        var e = this, t = a.currentTarget.dataset.index;
        console.log(t), wx.previewImage({
            current: a.target.dataset.src,
            urls: e.data.shopList[t].imgUrls
        });
    }
});