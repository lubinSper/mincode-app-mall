Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.buyCarFn = void 0;

var t = require("../../../../../components/conf/conf"), e = require("../../../../../components/template/show_dialog/show_dialog"), o = require("../../../../../components/model/buy_car/buy_car"), n = require("../../../../../components/model/discover/goods-detail/goods-detail-m"), i = require("../../../../../components/function/arr-remove-duplicates/arr-remove-duplicates"), s = getApp(), a = t.Conf.shoppingCarStorageKey, r = t.Conf.goodsDefaultImg, c = !1, u = Behavior({
    data: {
        defaultImg: r,
        isSelectAll: !1,
        goods: [],
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        buyCarDialogInfo: {
            checkGoodsTypeBg: "",
            showCheckGoodsTypeBg: !1,
            showCheckGoodsType: !1,
            index: 0,
            count: 1
        },
        hasSelectAttr: "",
        onPullDownRefresh: "",
        onReachBottom: "",
        onSubHide: "",
        onSubShow: "",
        pageParams: {
            types: "",
            goodInfos: {},
            commodityAttr: []
        },
        setOutBoxStyle: "",
        isShowCart: !1,
        loading_fail: !1,
        isSuperVip: !1
    },
    behaviors: [],
    properties: {
        onPullDownRefresh: {
            type: String,
            value: "",
            observer: function(t, e) {
                t && this.onPullDownRefresh();
            }
        },
        onReachBottom: {
            type: String,
            value: "",
            observer: function(t, e) {
                t && this.onReachBottom();
            }
        },
        onShow: {
            type: String,
            value: "",
            observer: function(t, e) {
                t && this.onShow();
            }
        },
        onHide: {
            type: String,
            value: "",
            observer: function(t, e) {
                t && this.onHide();
            }
        }
    },
    methods: {
        onShow: function(t) {
            wx.showLoading({
                title: "加载中"
            }), s.setMyCountDot(), s.setCarCountDot(), "function" == typeof t ? this.initGetBuyCarInfo(t) : this.initGetBuyCarInfo(null);
            var e = new Date().getTime();
            if (this.setData({
                onSubHide: e
            }), wx.getStorageSync("memberCardInfo")) {
                var o = wx.getStorageSync("memberCardInfo");
                2 == o.vip || 3 == o.vip ? this.setData({
                    isSuperVip: !0
                }) : this.setData({
                    isSuperVip: !1
                });
            } else this.setData({
                isSuperVip: !1
            });
        },
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {
            if (this.data.isShowCart) return !1;
            this.onShow();
        },
        onReachBottom: function() {},
        initGetBuyCarInfo: function(t) {
            var e = this, n = this;
            (0, o.getBuyCarInfo)(function(o, i) {
                if (console.log(o, i), setTimeout(function() {
                    wx.stopPullDownRefresh(), wx.hideLoading();
                }, 1500), "boolean" == typeof o && o && i.length <= 0) {
                    n.setData({
                        loading_fail: !0
                    });
                    var a = s.isHasTabByTitle({
                        url: "page/buy_car/buy_car"
                    });
                    console.log("tempJson=", a), a.check && wx.removeTabBarBadge({
                        index: a.index
                    });
                }
                var r = !1;
                i.length > 0 && i.forEach(function(o) {
                    0 != o.inventory && o.count <= o.inventory && 1 == o.status ? c || (o.isSelect = !0) : (t && o.isSelect && (r = !0), 
                    0 != o.inventory && 2 != o.status || (o.count = 1), o.isSelect = !1), o.isSuperVip = e.data.isSuperVip, 
                    o.isSetAttr = !0;
                }), console.log("goods = "), console.log(i), e.setGoods(i), c || (c = !0), t && t(r);
            }, !0, !0);
        },
        onClickRetry: function() {
            this.setData({
                loading_fail: !1
            }), this.initGetBuyCarInfo(null);
        },
        showCartDialog: function(t) {
            var e = this;
            wx.getSystemInfoSync();
            e.setData({
                pageParams: {
                    types: "",
                    goodInfos: {},
                    commodityAttr: []
                },
                isShowCart: !0
            });
            var o = t.currentTarget.dataset.id, i = t.currentTarget.dataset.index, a = t.currentTarget.dataset.type;
            wx.showLoading(), (0, n.newGoodsDetailM)({
                ele: e,
                data: {
                    openId: s.globalData.openid,
                    id: o
                },
                callback: function() {
                    var t = e.data.pageParams, o = e.data.goods[i];
                    t.types = a;
                    var n = {
                        previewImg: o.imageUrls,
                        price: parseFloat(o.price / 100).toString(),
                        originalPrice: parseFloat(o.originalPrice / 100).toString(),
                        stock: o.inventory,
                        count: o.count,
                        attributeId: o.attributeId,
                        attributeValue: [ o.firstAttrName, o.secondAttrName ],
                        id: o.id,
                        isSetAttr: o.isSetAttr,
                        isInfiniteInventory: o.isInfiniteInventory,
                        isSpecial: o.isSpecial
                    };
                    t.goodInfos = n, t.commodityAttr = e.data.pageParams.commodityAttr, t.isShowInventory = !0;
                    new Date().getTime();
                    e.setData({
                        pageParams: t
                    }, function() {
                        var t = new Date().getTime();
                        e.setData({
                            onSubShow: t
                        });
                    });
                }
            });
        },
        toSelect: function(t) {
            var o = this, n = t.currentTarget.dataset.index, i = this.data.goods;
            1 == i[n].status ? 0 != i[n].inventory ? i[n].inventory < i[n].count && !i[n].isSelect ? wx.showModal({
                content: "该商品库存不足，是否自动修改为最大数量？",
                success: function(t) {
                    t.confirm && (i[n].isSelect = !i[n].isSelect, i[n].count = i[n].inventory, o.setGoods(i));
                }
            }) : (i[n].isSelect = !i[n].isSelect, this.setGoods(i)) : (0, e.ShowDialog)(this, "该商品已售罄") : (0, 
            e.ShowDialog)(this, "该商品已下架");
        },
        updateNum: function(t) {
            var e = this, o = t.currentTarget.dataset.index, n = "add" == t.currentTarget.dataset.type, i = this.data.goods, a = i[o];
            if (1 != a.count || n) {
                if (n && !(0 != a.inventory && a.count < a.inventory && 1 == a.status)) return;
                i[o].count = n ? i[o].count + 1 : i[o].count - 1, this.setGoods(i), s.setCarCountDot();
            } else wx.showModal({
                content: "确定将此商品移出购物车？",
                success: function(t) {
                    t.confirm && (i.splice(o, 1), e.setGoods(i), wx.showToast({
                        title: "移出购物车成功",
                        icon: "success",
                        duration: 2e3
                    }), s.setCarCountDot());
                }
            });
        },
        selectAll: function() {
            var t = this, e = this.data, o = e.goods, n = e.isSelectAll, i = function(e) {
                o = o.map(function(t) {
                    return 0 != t.inventory && 1 == t.status && (t.isSelect = n), e && t.count > t.inventory && (t.count = t.inventory), 
                    t;
                }), t.setGoods(o);
            };
            (n = !n) && o.filter(function(t) {
                return t.count > t.inventory && 0 != t.inventory && 1 == t.status;
            }).length > 0 ? wx.showModal({
                content: "部分商品库存不足，是否自动修改为最大数量？",
                success: function(t) {
                    t.confirm && i(!0);
                }
            }) : i();
        },
        toClearing: function() {
            var t = this, o = function() {
                if (0 == t.data.goods.filter(function(t) {
                    return t.isSelect;
                }).length) return (0, e.ShowDialog)(t, "你还没有选择商品哦");
                wx.navigateTo({
                    url: "/subPackage/my/pages/order/order_sure_pickup/order_sure_pickup?from=2"
                });
            };
            if (!(this.data.goods.length > 0)) return (0, e.ShowDialog)(this, "你还没有选择商品哦");
            this.onShow(function(n) {
                n ? (0, e.ShowDialog)(t, "商品数据变动,部分商品已不可选") : o();
            });
        },
        bindErrorImg: function(t) {
            var e = t.target.dataset.index, o = this.data.goods;
            o[e].imageUrls = r, this.setData({
                goods: o
            });
        },
        setGoods: function(t) {
            var e = [];
            t.forEach(function(t, o, n) {
                e.push({
                    id: t.id,
                    firstAttrId: t.firstAttrId,
                    secondAttrId: t.secondAttrId,
                    attributeId: t.attributeId,
                    count: t.count,
                    name: t.name,
                    isSelect: t.isSelect,
                    inventory: t.inventory,
                    status: t.status,
                    isSetAttr: t.isSetAttr,
                    isInfiniteInventory: t.isInfiniteInventory,
                    isSpecial: t.isSpecial,
                    superMemberPrice: t.superMemberPrice
                });
            }), wx.setStorage({
                key: a,
                data: e
            }), this.setData({
                goods: t,
                isSelectAll: this.hasSelectAllIcon(t)
            });
        },
        hasSelectAllIcon: function(t) {
            var e = t.filter(function(t) {
                return 0 != t.inventory && 1 == t.status;
            });
            return t.filter(function(t) {
                return t.isSelect;
            }).length == e.length && 0 != e;
        },
        setReadySelectAttr: function(t) {
            var e = t.detail;
            this.setBuyCarCount(e);
        },
        setSelectPrices: function(t) {
            console.log("++++++++++++++++  setSelectPrices() : ");
        },
        setBuyCarCount: function(t) {
            var e = this.data.goods;
            e.forEach(function(e) {
                e.id == t.id && (0, i.compareSameValue)(e.attributeId, t.attributeId) && (1 == t.types ? e.count += t.count : 3 == t.types && (e.count = t.count));
            }), this.setData({
                goods: e,
                isShowCart: !1
            }), this.onPullDownRefresh();
        },
        closeBuyCarDialog: function() {
            this.setData({
                isShowCart: !1,
                setOutBoxStyle: ""
            });
        },
        catchTouchMove: function(t) {
            console.log("catchTouchMove----");
        }
    },
    ready: function() {
        this.setData({
            xcxType: s.globalData.xcxType
        });
    }
});

exports.buyCarFn = u;