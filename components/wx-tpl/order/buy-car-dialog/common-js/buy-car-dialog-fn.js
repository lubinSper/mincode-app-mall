Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.buyCarDialogFn = void 0;

require("../../../../../components/conf/conf"), require("../../../../../components/template/show_dialog/show_dialog");

var t = require("../../../../../components/function/arr-remove-duplicates/arr-remove-duplicates"), e = require("../../../../function/jsonMerge/jsonMerge"), o = getApp(), a = Behavior({
    behaviors: [],
    data: {
        isClose: !1,
        oneClick: 1,
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        onHide: "",
        onShow: "",
        buyCarDialogInfo: {
            showCheckGoodsTypeBg: !1,
            showCheckGoodsType: !1,
            checkGoodsTypeBg: "",
            index: 0
        },
        goodInfos: {
            previewImg: "",
            price: "",
            originalPrice: "",
            stock: 0,
            count: 0,
            attributeId: [],
            attributeValue: [],
            id: "",
            isSetAttr: !1,
            isInfiniteInventory: 1,
            isSpecial: 1,
            superMemberPrice: 0
        },
        animationData: "",
        onAttrPullDownRefresh: "",
        onAttrReachBottom: "",
        onAttrHide: "",
        onAttrShow: "",
        commodityAttr: [],
        isSetDefaultSelect: !0,
        selectGoods: {},
        showSelectAttr: null,
        boxStyle: "",
        buyCarCount: 0,
        originalGoods: {},
        isShowInventory: !1,
        isNonSelectAll: !1,
        isSetFirstUserSelect: !1,
        isSuperVip: !1
    },
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
                t && this.onShow(t);
            }
        },
        onHide: {
            type: String,
            value: "",
            observer: function(t, e) {
                t && this.onHide(t);
            }
        },
        pageParams: {
            type: Object,
            value: {},
            observer: function(t, e) {
                console.log("/////buy-car-dialog-fn.js  pageParams= "), console.log(t), t.types && 3 == parseInt(t.types) && t.goodInfos.id && this.setData({
                    originalGoods: t.goodInfos
                }), t.commodityAttr && this.setData({
                    commodityAttr: t.commodityAttr
                }), t.goodInfos.id && t.goodInfos.id.toString().length > 0 && (t.goodInfos.isSetAttr ? this.setData({
                    goodInfos: t.goodInfos,
                    selectGoods: t.goodInfos
                }) : this.setData({
                    goodInfos: t.goodInfos
                })), t.isShowInventory && this.setData({
                    isShowInventory: t.isShowInventory
                }), t.isSetFirstUserSelect && this.setData({
                    isSetFirstUserSelect: t.isSetFirstUserSelect
                });
            }
        }
    },
    methods: {
        onShow: function(t) {
            this.showDialog();
        },
        onHide: function(t) {},
        onUnload: function() {},
        onPullDownRefresh: function() {},
        onReachBottom: function() {},
        onShareAppMessage: function() {},
        showDialog: function() {
            var t = this, e = t.properties.pageParams.types;
            t.data.buyCarDialogInfo.types = e, t.data.buyCarDialogInfo.showCheckGoodsType = !0, 
            t.setData(t.data);
            var o = wx.createAnimation({
                duration: 300,
                timingFunction: "linear",
                delay: 0
            });
            if (o.translateY(0).step(), t.data.buyCarDialogInfo.showCheckGoodsTypeBg = !0, t.data.buyCarDialogInfo.checkGoodsTypeBg = "check_goods_type_bg_1", 
            t.data.animationData = o.export(), wx.getStorageSync("memberCardInfo")) {
                var a = wx.getStorageSync("memberCardInfo");
                2 == a.vip || 3 == a.vip ? t.data.isSuperVip = !0 : t.data.isSuperVip = !1;
            }
            t.setData(t.data);
        },
        closeDialog: function() {
            var t = this, e = wx.getSystemInfoSync(), o = wx.createAnimation({
                duration: 300,
                timingFunction: "linear"
            });
            o.translateY(e.windowHeight).step(), t.data.buyCarDialogInfo.checkGoodsTypeBg = "check_goods_type_bg_2", 
            t.data.animationData = o.export(), setTimeout(function() {
                t.data.buyCarDialogInfo.showCheckGoodsTypeBg = !1, t.data.buyCarDialogInfo.showCheckGoodsType = !1, 
                t.setData(t.data);
            }, 300), t.setData(t.data), t.triggerEvent("closebuydailog", {
                isNonSelectAll: this.data.isNonSelectAll
            }, {});
        },
        switchType: function(t) {
            console.log("switchType() ---");
            var e = this, o = t.target.dataset.index, a = t.target.dataset.price, i = t.target.dataset.stock, n = t.target.dataset.attributeId, s = "";
            t.target.dataset.originalPrice && (s = t.target.dataset.originalPrice), e.data.buyCarDialogInfo.index = o, 
            e.data.buyCarDialogInfo.price = a, e.data.buyCarDialogInfo.originalPrice = s, e.data.buyCarDialogInfo.stock = i, 
            e.data.goodInfos.count = 1, e.data.buyCarDialogInfo.attributeId = n, e.data.buyCarDialogInfo.stock = i, 
            e.setData(e.data);
        },
        addBuyCar: function(e) {
            var a = this, i = a.data.goodInfos, n = a.data.originalGoods;
            if (i.id) {
                var s = i.attributeId, r = a.data.goodInfos.count, c = i.id, d = i.attributeValue, u = parseInt(a.properties.pageParams.types), l = i.superMemberPrice ? i.superMemberPrice : 0;
                if (1 == u || 3 == u) {
                    var g = new Object(), f = new Array();
                    g.id = c, g.attributeId = s, g.count = r, g.name = d, g.inventory = i.stock, g.isInfiniteInventory = i.isInfiniteInventory, 
                    g.isSpecial = i.isSpecial, g.superMemberPrice = l, wx.getStorage({
                        key: "shoppingCarGoods",
                        success: function(e) {
                            var s = e.data, r = !0;
                            if (1 == u) {
                                var c = -1;
                                if (s.map(function(e, o) {
                                    e.id == g.id && (0, t.compareSameValue)(e.attributeId, g.attributeId) && (c = o);
                                }), -1 == c) g.isSelect = !0, s.unshift(g); else if (s[c].count + g.count <= s[c].inventory || 2 == s[c].isInfiniteInventory) s[c].count = s[c].count + g.count, 
                                s[c].isSelect = !0; else {
                                    console.log("arr[indexArr[0]].isInfiniteInventory=", s[c].isInfiniteInventory), 
                                    r = !1;
                                    wx.showToast({
                                        title: "添加购物车失败，已超出库存限制",
                                        icon: "none",
                                        duration: 3e3
                                    });
                                }
                            } else {
                                var d = 0, l = !1, f = 0;
                                if (s.forEach(function(e, o, a) {
                                    e.id == g.id && (0, t.compareSameValue)(e.attributeId, g.attributeId) && (f = o, 
                                    l = !0);
                                }), s.forEach(function(e, o, a) {
                                    e.id == n.id && (0, t.compareSameValue)(e.attributeId, n.attributeId) && (d = o);
                                }), l) {
                                    var p = [];
                                    if (s.map(function(e, o) {
                                        (0, t.compareSameValue)(e.attributeId, g.attributeId) && e.id == g.id && p.push(o);
                                    }), p.length > 0) {
                                        var I = s[p[0]].count + g.count;
                                        if ((0, t.compareSameValue)(n.attributeId, g.attributeId)) s[p[0]].count = g.count; else if (I <= s[p[0]].inventory || 2 == s[p[0]].isInfiniteInventory) s[p[0]].count = I, 
                                        s.splice(d, 1); else {
                                            r = !1;
                                            wx.showToast({
                                                title: "添加购物车失败，已超出库存限制",
                                                icon: "none",
                                                duration: 3e3
                                            });
                                        }
                                    }
                                } else (0, t.compareSameValue)(s[d].attributeId, n.attributeId) && (s[d].attributeId = g.attributeId, 
                                s[d].firstAttrId = g.attributeId[0], g.attributeId.length > 1 && g.attributeId[1] && (s[d].secondAttrId = g.attributeId[1]), 
                                s[d].name = i.attributeValue, s[d].count = g.count);
                            }
                            r && (wx.setStorage({
                                key: "shoppingCarGoods",
                                data: s,
                                success: function() {
                                    var t = 1 == u ? "加入购物车成功" : "修改成功";
                                    wx.showToast({
                                        title: t,
                                        icon: "none",
                                        duration: 2e3
                                    });
                                    var e = 0;
                                    s.map(function(t) {
                                        e += t.count;
                                    }), a.setData({
                                        buyCarCount: e
                                    });
                                    var n = Object.assign({}, i, {
                                        buyCarCount: e,
                                        types: u,
                                        isClickAdd: !0
                                    });
                                    a.triggerEvent("setreadyselectattr", n, {}), o.setCarCountDot();
                                }
                            }), a.closeDialog());
                        },
                        fail: function(t) {
                            f.push(g), wx.setStorage({
                                key: "shoppingCarGoods",
                                data: f,
                                success: function() {
                                    a.onShow(), a.setData({
                                        buyCarCount: 1
                                    }), wx.showToast({
                                        title: "加入购物车成功",
                                        icon: "none",
                                        duration: 2e3
                                    });
                                    var t = Object.assign({}, i, {
                                        buyCarCount: 1,
                                        types: u,
                                        isClickAdd: !0
                                    });
                                    a.triggerEvent("setreadyselectattr", t, {}), a.closeDialog(), o.setCarCountDot();
                                }
                            });
                        }
                    });
                } else if (2 == u) {
                    var p = "attributeId=";
                    p += s.length > 0 ? s.join(",") : [], p += "&count=" + r + "&id=" + c, wx.navigateTo({
                        url: "/subPackage/my/pages/order/order_sure_pickup/order_sure_pickup?" + p,
                        success: function() {
                            a.closeDialog();
                        }
                    });
                }
            } else {
                var I = {
                    show: !0,
                    content: "请选择商品属性"
                };
                a.setData({
                    showTipData: I
                });
            }
        },
        addNum: function() {
            var t = this, o = (0, e.jsonMerge)({}, t.data.goodInfos);
            o.count < o.stock && (o.count += 1, t.setData({
                goodInfos: o
            }, function() {
                t.triggerEvent("setreadyselectattr", Object.assign({}, o, {
                    isSetCount: !0
                }), {});
            }));
        },
        removeNum: function() {
            var t = this, o = (0, e.jsonMerge)({}, t.data.goodInfos);
            o.count > 1 && (o.count -= 1, t.setData({
                goodInfos: o
            }, function() {
                t.triggerEvent("setreadyselectattr", Object.assign({}, o, {
                    isSetCount: !0
                }), {});
            }));
        },
        setReadySelectAttr: function(t) {
            var e = t.detail;
            console.log("=====================  setReadySelectAttr() : "), console.log(e);
            var o = {
                previewImg: this.data.goodInfos.previewImg,
                count: 1,
                price: e.price,
                originalPrice: e.originalPrice,
                stock: e.stock,
                id: e.productId,
                attributeId: e.selectAttrCode,
                attributeValue: e.selectAttrKey,
                isClickAdd: !1,
                priceRange: e.priceRange
            };
            o.count > o.stock && 2 != o.isInfiniteInventory && (o.count = o.stock), e.isNonSelectAll ? this.setData({
                goodInfos: o,
                isNonSelectAll: !0
            }) : this.setData({
                goodInfos: o,
                isNonSelectAll: !1
            }), 2 == e.isInfiniteInventory ? this.setData({
                isShowInventory: !1
            }) : this.setData({
                isShowInventory: !0
            }), this.triggerEvent("setreadyselectattr", o, {});
        },
        setSelectPrices: function(t) {
            this.triggerEvent("setselectprices", t.detail, {});
        },
        getAttrListData: function() {}
    },
    ready: function() {}
});

exports.buyCarDialogFn = a;