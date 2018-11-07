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
        shareUrl: "",
        sort: 1,
        collation: null,
        isSetViewRecord: !0,
        showReturnIndexBtn: !1,
        onShow: "",
        onPullDownRefresh: "",
        copyRightShow: !1
    },
    onLoad: function(e) {
        var n = this;
        e.isApplyNewLogic && n.setData({
            isApplyNewLogic: e.isApplyNewLogic
        }), setTimeout(function() {
            e.iconName && wx.setNavigationBarTitle({
                title: e.iconName
            });
        }, 1e3), wx.showLoading({
            title: "加载中"
        }), n.data.shopList = [], n.data.pageIndex = 1, n.setData(n.data), n.storeDetail({
            orgId: o.globalData.orgId
        }), o.getNewOpenId(function(e) {
            (0, t.DiscoverListM)({
                ele: n,
                data: {
                    sort: 1,
                    orgId: o.globalData.orgId,
                    pageIndex: n.data.pageIndex,
                    pageSize: a.Conf.pageSize,
                    openId: o.globalData.openid,
                    type: 3
                },
                href: "special_selling"
            });
        }), n.getBtnText(), e.action && "goHome" == e.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    onShow: function() {
        o.setMyCountDot();
        var a = new Date().getTime();
        this.setData({
            onShow: a
        });
    },
    chooseTab: function(e) {
        var n = this, i = e.detail, s = i.sort, l = i.collation;
        this.setData({
            sort: s,
            collation: l
        }), (0, t.DiscoverListM)({
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
            href: "special_selling"
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
                    e && (t.data.orgName = e.orgName);
                }
            },
            fail: function() {
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3), (0, e.ShowDialog)(t);
            }
        });
    },
    onShareAppMessage: function(a) {
        var e = this;
        console.log(a.iconName);
        var t = getCurrentPages(), n = o.isHasTabByTitle({
            url: t[t.length - 1].route
        });
        console.log("tempJson=", n);
        var i = "/subPackage/index/pages/appointment/appointment?action=goHome";
        return n.check && (i = "/subPackage/index/pages/appointment/appointment"), console.log("tempShareUrl=", i), 
        {
            title: o.globalData.nickName + "给你推荐了「" + e.data.orgName + "」",
            path: i,
            imageUrl: e.data.img
        };
    },
    jumpToNext: function(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/subPackage/discover/pages/" + (3 == o.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + e + "&state=my_order"
        });
    },
    onReachBottom: function() {
        var e = this;
        if (e.data.hasNextPage) {
            e.data.showLoading = !0, e.data.hasNextPage = !1, e.setData(e.data);
            var n = this.data, i = n.sort, s = n.collation;
            (0, t.DiscoverListM)({
                ele: e,
                data: {
                    sort: i,
                    collation: s,
                    orgId: o.globalData.orgId,
                    pageIndex: e.data.pageIndex,
                    pageSize: a.Conf.pageSize,
                    openId: o.globalData.openid,
                    type: 3
                },
                ReachBottom: !0,
                href: "special_selling"
            }), e.getBtnText();
        }
    },
    onPullDownRefresh: function() {
        var e = this;
        e.data.pageIndex = 1, e.data.showBlank = !1, e.data.showLoading = !1, e.data.hasNextPage = !1, 
        e.setData(e.data);
        var n = new Date().getTime();
        this.setData({
            onPullDownRefresh: n
        });
        var i = this.data, s = i.sort, l = i.collation;
        (0, t.DiscoverListM)({
            ele: e,
            data: {
                sort: s,
                collation: l,
                orgId: o.globalData.orgId,
                pageIndex: e.data.pageIndex,
                pageSize: a.Conf.pageSize,
                openId: o.globalData.openid,
                type: 3
            },
            PullDown: !0,
            href: "special_selling"
        }), e.getBtnText();
    },
    previewImage: function(a) {
        var e = this, t = a.currentTarget.dataset.index;
        console.log(t), wx.previewImage({
            current: a.target.dataset.src,
            urls: e.data.shopList[t].imgUrls
        });
    },
    getBtnText: function(a) {
        var e = this;
        o.getBtnText(function(a) {
            a && e.setData({
                appointmentCopy: a.appointmentCopy ? a.appointmentCopy : "立即预约",
                appointmentZeroCopy: a.appointmentZeroCopy ? a.appointmentZeroCopy : "马上咨询",
                purchaseCopy: a.purchaseCopy ? a.purchaseCopy : "立即购买"
            });
        });
    }
});