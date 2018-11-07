var a = require("../../../components/conf/conf"), t = require("../../../components/template/show_dialog/show_dialog"), e = require("../../../components/model/discover/discover-list-m"), o = getApp();

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
        sort: 1,
        collation: null,
        isSetViewRecord: !0,
        showReturnIndexBtn: !1
    },
    onLoad: function(t) {
        var n = this;
        wx.showLoading({
            title: "加载中"
        }), o.getTabBarTitle(), n.data.shopList = [], n.data.pageIndex = 1, n.setData(n.data), 
        n.storeDetail({
            orgId: o.globalData.orgId
        }), o.getNewOpenId(function(t) {
            (0, e.DiscoverListM)({
                ele: n,
                data: {
                    sort: 1,
                    orgId: o.globalData.orgId,
                    pageIndex: n.data.pageIndex,
                    pageSize: a.Conf.pageSize,
                    openId: o.globalData.openid,
                    type: 3
                },
                href: "special_selling",
                isTab: !0
            });
        }), n.getBtnText(), t.action && "goHome" == t.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    chooseTab: function(t) {
        var n = this, i = t.detail, s = i.sort, l = i.collation;
        this.setData({
            sort: s,
            collation: l
        }), (0, e.DiscoverListM)({
            ele: n,
            data: {
                sort: s,
                collation: l,
                orgId: o.globalData.orgId,
                pageIndex: 1,
                pageSize: a.Conf.pageSize,
                openId: o.globalData.openid,
                type: 3
            },
            PullDown: !0,
            href: "special_selling",
            isTab: !0
        });
    },
    storeDetail: function(a) {
        var e = this;
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
                    var t = a.data.data;
                    e.data.orgName = t.orgName;
                }
            },
            fail: function() {
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3), o.globalData.showErrorAlert && (0, t.ShowDialog)(e);
            }
        });
    },
    onShareAppMessage: function(a) {
        var t = this;
        console.log(a.iconName);
        var e = getCurrentPages(), n = o.isHasTabByTitle({
            url: e[e.length - 1].route
        });
        console.log("tempJson=", n);
        var i = "/page/index/appointment/appointment_tab?action=goHome";
        return n.check && (i = "/page/index/appointment/appointment_tab"), console.log("tempShareUrl=", i), 
        {
            title: o.globalData.nickName + "给你推荐了「" + t.data.orgName + "」",
            path: i,
            imageUrl: t.data.img
        };
    },
    jumpToNext: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/subPackage/discover/pages/" + (3 == o.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + t + "&state=my_order"
        });
    },
    onReachBottom: function() {
        var t = this;
        if (t.data.hasNextPage) {
            t.data.showLoading = !0, t.data.hasNextPage = !1, t.setData(t.data);
            var n = this.data, i = n.sort, s = n.collation;
            (0, e.DiscoverListM)({
                ele: t,
                data: {
                    sort: i,
                    collation: s,
                    orgId: o.globalData.orgId,
                    pageIndex: t.data.pageIndex,
                    pageSize: a.Conf.pageSize,
                    openId: o.globalData.openid,
                    type: 3
                },
                ReachBottom: !0,
                href: "special_selling",
                isTab: !0
            }), t.getBtnText();
        }
    },
    onPullDownRefresh: function() {
        var t = this;
        t.data.pageIndex = 1, t.data.showBlank = !1, t.data.showLoading = !1, t.data.hasNextPage = !1, 
        t.setData(t.data);
        var n = this.data, i = n.sort, s = n.collation;
        (0, e.DiscoverListM)({
            ele: t,
            data: {
                sort: i,
                collation: s,
                orgId: o.globalData.orgId,
                pageIndex: t.data.pageIndex,
                pageSize: a.Conf.pageSize,
                openId: o.globalData.openid,
                type: 3
            },
            PullDown: !0,
            href: "special_selling",
            isTab: !0
        }), t.getBtnText();
    },
    previewImage: function(a) {
        var t = this, e = a.currentTarget.dataset.index;
        console.log(e), wx.previewImage({
            current: a.target.dataset.src,
            urls: t.data.shopList[e].imgUrls
        });
    },
    getBtnText: function(a) {
        var t = this;
        o.getBtnText(function(a) {
            a && t.setData({
                appointmentCopy: a.appointmentCopy ? a.appointmentCopy : "立即预约",
                appointmentZeroCopy: a.appointmentZeroCopy ? a.appointmentZeroCopy : "马上咨询",
                purchaseCopy: a.purchaseCopy ? a.purchaseCopy : "立即购买"
            });
        });
    }
});