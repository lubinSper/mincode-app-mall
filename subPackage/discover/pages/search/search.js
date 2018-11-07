var e = require("./search-m"), t = require("../../../../components/model/discover/discover-list-m"), a = (require("../../../../components/template/show_dialog/show_dialog"), 
function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../components/function/countdown/countdown"))), o = (require("../../../../components/model/buy_car/buy_car"), 
require("../../../../components/model/my/order_detail/order_state_change_m"), require("../../../../components/model/discover/goods-detail/goods-detail-m")), i = getApp();

Page({
    data: {
        searchInfo: "",
        historyList: [],
        shopList: [],
        showSearchDel: !1,
        showLoading: !0,
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        noData: !1,
        haveData: !1,
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
        hasSelectAttrValue: [],
        showReturnIndexBtn: !1,
        loading_fail: !1
    },
    onLoad: function(e) {
        var a = this;
        wx.showLoading({
            title: "加载中"
        }), i.getNewOpenId(function(e) {
            (0, t.DiscoverListM)({
                ele: a,
                data: {
                    orgId: i.globalData.orgId,
                    pageIndex: 1,
                    pageSize: 4,
                    openId: i.globalData.openid,
                    isRecommend: 2
                },
                fn: function(e) {
                    a.countdown(e);
                }
            });
        });
    },
    onShow: function() {
        var t = this;
        this.setData({
            searchInfo: ""
        }), (0, e.GetSearchRecordList)(function(e) {
            t.setData({
                historyList: e
            });
        }), this.data.hideTime && t.countdown(this.data.shopList, this.data.hideTime);
    },
    onClickRetry: function() {
        this.onLoad(), this.onShow();
    },
    countdown: function(e, t) {
        var o = this, i = {
            key: "discover",
            timeData: e,
            fn: function(e) {
                o.setData({
                    shopList: e
                });
            }
        };
        t && (i.hideTime = t), (0, a.default)(i);
    },
    inputSearch: function(e) {
        var t = e.detail.value.trim();
        this.setData({
            searchInfo: t,
            showSearchDel: t.length > 0
        });
    },
    delSearchText: function() {
        this.setData({
            searchInfo: "",
            showSearchDel: !1
        });
    },
    startSearch: function() {
        this.setData({
            showSearchDel: !1
        });
        var t = this, a = t.data.searchInfo;
        a < 1 ? wx.showModal({
            title: "温馨提示",
            confirmColor: "#ff7800",
            showCancel: !1,
            content: "请输入搜索内容",
            confirmText: "知道了"
        }) : (wx.redirectTo({
            url: "/subPackage/discover/pages/search/search_result/search_result?key=" + a
        }), (0, e.AddSearchRecord)(a), t.setData({
            searchInfo: ""
        }));
    },
    clearHistoryData: function() {
        var t = this;
        (0, e.ClearSearchRecord)(function() {
            t.setData({
                historyList: []
            });
        });
    },
    cancelSearch: function() {
        wx.navigateBack();
    },
    onHide: function() {
        this.setData({
            hideTime: new Date().getTime()
        }), i.globalData.timerObj && clearTimeout(i.globalData.timerObj.discover);
    },
    jumpToNext: function(e) {
        var t = e.detail.id;
        wx.navigateTo({
            url: "/subPackage/discover/pages/" + (3 == i.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + t
        });
    },
    onAddBuyCar: function(e) {
        var t = this;
        console.log("dicover:", e.detail);
        var a = 0;
        0 == e.detail.attributeId.length ? a = e.detail.inventory : e.detail.attributeId.map(function(e, t) {
            e.inventory && (a += e.inventory);
        }), console.log("tempStock=", a), a ? (console.log("else---"), wx.showLoading({
            title: "加载中"
        }), (0, o.newGoodsDetailM)({
            ele: t,
            isLoadCountdown: !1,
            notSetShopList: !0,
            data: {
                openId: i.globalData.openid,
                id: e.detail.id
            },
            callback: function(a) {
                var o = 0;
                "000000" == a.data.code && a.data.data.superMemberPrice && (o = parseFloat(a.data.data.superMemberPrice / 100)), 
                t.showCartDialog({
                    type: 1,
                    id: e.detail.id,
                    superMemberPrice: o
                });
            }
        })) : i.showDialog(t, "该商品已售罄");
    },
    clickHistory: function(e) {
        var t = e.target.dataset.key;
        this.setData({
            searchInfo: t
        }), wx.navigateTo({
            url: "/subPackage/discover/pages/search/search_result/search_result?key=" + t
        });
    },
    showCartDialog: function(e) {
        console.log("showCartDialog() ---------------+++++"), console.log(e);
        var t = new Date().getTime(), a = e.type, o = this.data.pageParams.commodityAttr, i = {
            types: a,
            goodInfos: {
                previewImg: this.data.coverImage ? this.data.coverImage : this.data.imgUrls[0],
                price: this.data.price,
                originalPrice: "" == this.data.originalPrice ? 0 : this.data.originalPrice,
                stock: this.data.inventory2,
                count: 1,
                id: e.id,
                attributeId: [],
                attributeValue: [],
                isInfiniteInventory: this.data.isInfiniteInventory,
                isSpecial: this.data.isSpecial,
                superMemberPrice: e.superMemberPrice
            },
            commodityAttr: o,
            isShowInventory: this.data.isShowInventory,
            isSetFirstUserSelect: !0
        };
        this.setData({
            pageParams: i,
            onShow: t
        }, function() {
            wx.hideLoading();
        });
    },
    setReadySelectAttr: function(e) {
        e.detail;
    },
    closeBuyCarDialog: function() {
        this.setData({
            isShowCart: !1,
            setOutBoxStyle: "",
            inventory2: 0
        });
    }
});