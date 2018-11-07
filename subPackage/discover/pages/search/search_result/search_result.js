var a = require("../../../../../components/conf/conf"), e = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../../../../components/function/countdown/countdown")), t = (require("../../../../../components/template/show_dialog/show_dialog"), 
require("../../../../../components/model/discover/discover-list-m")), o = require("../../../../../components/model/discover/goods-detail/goods-detail-m"), i = getApp();

Page({
    data: {
        pageIndex: 1,
        haveData: !0,
        noData: !1,
        searchInfo: "",
        showLoading: !1,
        shopList: [],
        loading_fail: !1,
        isClick: !0,
        hasNextPage: !0,
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        onPullDownRefresh: "",
        onReachBottom: "",
        onHide: "",
        onShow: "",
        pageParams: {
            types: "",
            goodInfos: {},
            commodityAttr: [],
            isShowInventory: !1
        },
        setOutBoxStyle: "",
        isShowCart: !1,
        inventory2: 0,
        buyCarDialogInfo: {
            checkGoodsTypeBg: "",
            showCheckGoodsTypeBg: !1,
            showCheckGoodsType: !1,
            index: 0,
            count: 1
        },
        hasSelectAttrText: "",
        hasSelectAttrCode: "",
        hasSelectAttrValue: []
    },
    onLoad: function(e) {
        console.log(e.key);
        var o = this;
        o.setData({
            searchInfo: e.key
        }), wx.showLoading({
            title: "加载中"
        }), 1 == o.data.isClick && (o.setData({
            isClick: !1
        }), i.getNewOpenId(function(e) {
            (0, t.DiscoverListM)({
                ele: o,
                data: {
                    openId: i.globalData.openid,
                    orgId: i.globalData.orgId,
                    pageIndex: 1,
                    pageSize: a.Conf.pageSize,
                    keyword: o.data.searchInfo
                },
                fn: function(a) {
                    o.countdown(a);
                }
            });
        }));
    },
    onShow: function() {
        var a = this;
        this.data.hideTime && a.countdown(this.data.shopList, this.data.hideTime);
    },
    onHide: function() {
        this.setData({
            hideTime: new Date().getTime()
        }), i.globalData.timerObj && clearTimeout(i.globalData.timerObj.discover);
    },
    onPullDownRefresh: function() {
        var e = this;
        1 == e.data.isClick && (e.data.pageIndex = 1, e.data.hasNextPage = !1, e.data.showLoading = !1, 
        e.data.isClick = !1, e.setData(e.data), (0, t.DiscoverListM)({
            ele: e,
            data: {
                orgId: i.globalData.orgId,
                pageIndex: e.data.pageIndex,
                pageSize: a.Conf.pageSize,
                openId: i.globalData.openid,
                keyword: e.data.searchInfo
            },
            PullDownRefresh: !0,
            fn: function(a) {
                e.countdown(a);
            }
        }));
    },
    onReachBottom: function() {
        var e = this;
        e.data.hasNextPage && 1 == e.data.isClick && (e.data.isClick = !1, e.data.showLoading = !0, 
        e.setData(e.data), (0, t.DiscoverListM)({
            ele: e,
            data: {
                orgId: i.globalData.orgId,
                pageIndex: e.data.pageIndex,
                pageSize: a.Conf.pageSize,
                openId: i.globalData.openid,
                keyword: e.data.searchInfo
            },
            ReachBottom: !0,
            fn: function(a) {
                e.countdown(a);
            }
        }));
    },
    cancelSearch: function() {
        wx.navigateBack({
            delta: 2
        });
    },
    backSearch: function() {
        wx.redirectTo({
            url: "../search"
        });
    },
    onClickRetry: function() {
        var e = this;
        1 == e.data.isClick && (wx.showLoading({
            title: "加载中"
        }), e.setData({
            isClick: !1,
            loading_fail: !1
        }), (0, t.DiscoverListM)({
            ele: e,
            data: {
                orgId: i.globalData.orgId,
                pageIndex: 1,
                pageSize: a.Conf.pageSize,
                openId: i.globalData.openid,
                keyword: e.data.searchInfo
            },
            fn: function(a) {
                e.countdown(a);
            }
        }));
    },
    countdown: function(a, t) {
        var o = this, i = {
            key: "discover",
            timeData: a,
            fn: function(a) {
                o.setData({
                    shopList: a
                });
            }
        };
        t && (i.hideTime = t), (0, e.default)(i);
    },
    jumpToNext: function(a) {
        var e = a.detail.id;
        wx.navigateTo({
            url: "/subPackage/discover/pages/" + (3 == i.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + e
        });
    },
    onAddBuyCar: function(a) {
        var e = this;
        console.log("dicover:", a.detail);
        var t = 0;
        0 == a.detail.attributeId.length ? t = a.detail.inventory : a.detail.attributeId.map(function(a, e) {
            a.inventory && (t += a.inventory);
        }), console.log("tempStock=", t), t ? (console.log("else---"), wx.showLoading({
            title: "加载中"
        }), (0, o.newGoodsDetailM)({
            ele: e,
            isLoadCountdown: !1,
            notSetShopList: !0,
            data: {
                openId: i.globalData.openid,
                id: a.detail.id
            },
            callback: function(t) {
                var o = 0;
                "000000" == t.data.code && t.data.data.superMemberPrice && (o = parseFloat(t.data.data.superMemberPrice / 100)), 
                e.showCartDialog({
                    type: 1,
                    id: a.detail.id,
                    superMemberPrice: o
                });
            }
        })) : i.showDialog(e, "该商品已售罄");
    },
    showCartDialog: function(a) {
        console.log("showCartDialog() ---------------+++++"), console.log(a);
        var e = new Date().getTime(), t = a.type, o = this.data.pageParams.commodityAttr, i = {
            types: t,
            goodInfos: {
                previewImg: this.data.coverImage ? this.data.coverImage : this.data.imgUrls[0],
                price: this.data.price,
                originalPrice: "" == this.data.originalPrice ? 0 : this.data.originalPrice,
                stock: this.data.inventory2,
                count: 1,
                id: a.id,
                attributeId: [],
                attributeValue: [],
                isInfiniteInventory: this.data.isInfiniteInventory,
                isSpecial: this.data.isSpecial,
                superMemberPrice: a.superMemberPrice
            },
            commodityAttr: o,
            isShowInventory: this.data.isShowInventory,
            isSetFirstUserSelect: !0
        };
        this.setData({
            pageParams: i,
            onShow: e
        }, function() {
            wx.hideLoading();
        });
    },
    setReadySelectAttr: function(a) {
        a.detail;
    },
    closeBuyCarDialog: function() {
        this.setData({
            isShowCart: !1,
            setOutBoxStyle: "",
            inventory2: 0
        });
    }
});