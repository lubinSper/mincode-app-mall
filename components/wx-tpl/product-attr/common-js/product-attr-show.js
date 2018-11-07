Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.productAttrShow = void 0;

require("../../../../components/conf/conf");

var t = require("../../../function/arr-remove-duplicates/arr-remove-duplicates"), e = (getApp(), 
getApp(), Behavior({
    data: {
        hasAttrId: [],
        firstIndex: -1,
        commodityAttr: [],
        attrValueList: [],
        selectInfo: {
            price: null,
            productId: null,
            stock: 0,
            selectAttrCode: [],
            selectAttrKey: [],
            isInfiniteInventory: 1
        },
        loadHasGoods: {
            attributeId: []
        },
        firstAttrValue: {},
        isFirstUserSelect: !1,
        isEditSelect: !1,
        priceRange: "",
        totalStock: 0,
        availdAttrArray: []
    },
    behaviors: [],
    properties: {
        commodityAttr: {
            type: Array,
            value: null,
            observer: function(t, e) {
                var a = this;
                t && a.setData({
                    commodityAttr: t
                }, function() {
                    a.onShow();
                });
            }
        },
        showSelectAttr: {
            type: Object,
            value: null,
            observer: function(t, e) {
                var a = this;
                t && a.setData({
                    showSelectAttr: t
                }, function() {
                    null != t && a.showProductSelect();
                });
            }
        },
        selectGoods: {
            type: Object,
            value: null,
            observer: function(t, e) {
                t.id && this.setData({
                    loadHasGoods: t,
                    isEditSelect: !0
                });
            }
        },
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
        },
        isSetDefaultSelect: {
            type: Boolean,
            value: !1,
            observer: function(t, e) {}
        },
        isSetFirstUserSelect: {
            type: Boolean,
            value: !1,
            observer: function(t, e) {
                t && this.setData({
                    isFirstUserSelect: !1
                });
            }
        }
    },
    methods: {
        setReadySelectAttr: function(t) {
            var t = Object.assign({}, t, {
                priceRange: this.data.priceRange
            }), e = {};
            this.triggerEvent("setreadyselectattr", t, e);
        },
        setselectprices: function(t) {
            var t = t, e = {};
            this.triggerEvent("setselectprices", t, e);
        },
        onShow: function() {
            var t = this;
            if (this.setData({
                includeGroup: t.data.commodityAttr
            }), this.data.isFirstUserSelect || this.distachAttrValue(t.data.commodityAttr), 
            1 == this.data.commodityAttr.length || this.data.commodityAttr.length > 0 && this.properties.isSetDefaultSelect && !this.data.isFirstUserSelect && !this.data.isEditSelect) {
                var e = this.data.availdAttrArray, a = null, r = [], l = 0, s = 0;
                if ((L = this.data.attrValueList).length > 0) {
                    if (Array.isArray(e)) {
                        for (var i = !1, o = 0; o < L.length; o++) {
                            for (m = 0; m < L[o].attrValueStatus.length; m++) if (L[o].attrValueStatus[m]) {
                                l = L[o].attrCode[m], r.push(L[o].attrValues[m]), L[o].selectedValue = L[o].attrValues[m], 
                                i = !0;
                                break;
                            }
                            if (i) break;
                        }
                        for (var n = this.data.commodityAttr, u = 0; u < n.length; u++) n[u].attrValueList[0].attrCode == l && (a = n[u]);
                    } else {
                        for (var c = [], d = 0, h = !1, f = 0; f < L.length; f++) {
                            for (var V = 0; V < L[f].attrCode.length; V++) if (e[L[f].attrCode[V]] && e[L[f].attrCode[V]].length > 0) {
                                l = L[f].attrCode[V], r.push(L[f].attrValues[V]), c = e[L[f].attrCode[V]], L[f].selectedValue = L[f].attrValues[V], 
                                L[f].attrValueStatus[V] = !0, h = !0, d = f;
                                break;
                            }
                            if (h) break;
                        }
                        for (m = 0; m < L.length; m++) if (m != d) for (o = 0; o < L[m].attrCode.length; o++) if (L[m].attrCode[o] == c[0]) {
                            r.push(L[m].attrValues[o]), L[m].selectedValue = L[m].attrValues[o], L[m].attrValueStatus[o] = !0;
                            break;
                        }
                        for (v = 1; v < c.length; v++) for (m = 0; m < L.length; m++) if (m != d) for (o = 0; o < L[m].attrCode.length; o++) L[m].attrCode[o] == c[v] && (L[m].attrValueStatus[o] = !0);
                        if (c.length > 0 && (s = c[0], e[s.toString()])) for (var g = e[s.toString()], v = 1; v < g.length; v++) for (m = 0; m < L.length; m++) if (m == d) for (o = 0; o < L[m].attrCode.length; o++) L[m].attrCode[o] == g[v] && (L[m].attrValueStatus[o] = !0);
                        for (var n = this.data.commodityAttr, p = 0; p < n.length; p++) n[p].attrValueList[0].attrCode == l && n[p].attrValueList[1].attrCode == s && (a = n[p]);
                    }
                    if (a) {
                        A = {
                            originalPrice: a.originalPrice,
                            price: a.price,
                            stock: a.stock,
                            productId: a.productId,
                            selectAttrCode: s ? [ l, s ] : [ l ],
                            selectAttrKey: r,
                            isInfiniteInventory: a.isInfiniteInventory
                        };
                        this.setReadySelectAttr(A), this.setData({
                            attrValueList: L,
                            selectInfo: A
                        });
                    } else {
                        var A = {
                            originalPrice: null,
                            price: null,
                            productId: null,
                            stock: 0,
                            selectAttrCode: [],
                            selectAttrKey: [],
                            isInfiniteInventory: 1
                        };
                        this.setData({
                            attrValueList: L,
                            selectInfo: A
                        });
                    }
                }
            } else {
                var S = this.data.loadHasGoods, y = S.attributeId, C = (S.attributeValue, this.data.availdAttrArray);
                if (this.data.isEditSelect) {
                    var e = this.data.availdAttrArray, L = this.data.attrValueList, l = 0, s = 0, c = null;
                    if (L.length > 0) {
                        if (Array.isArray(C)) {
                            for (f = 0; f < L.length; f++) for (k = 0; k < L[f].attrCode.length; k++) if (L[f].attrCode[k] == y[0]) {
                                L[f].attrValueStatus[k] = !0, L[f].selectedValue = L[f].attrValues[k];
                                break;
                            }
                        } else {
                            for (f = 0; f < L.length; f++) for (var I = 0; I < y.length; I++) for (var k = 0; k < L[f].attrCode.length; k++) if (L[f].attrCode[k] == y[I]) {
                                L[f].attrValueStatus[k] = !0, L[f].selectedValue = L[f].attrValues[k], f;
                                break;
                            }
                            if (e[y[0]]) {
                                c = e[y[0]];
                                for (v = 0; v < c.length; v++) for (m = 0; m < L.length; m++) for (o = 0; o < L[m].attrCode.length; o++) L[m].attrCode[o] == c[v] && (L[m].attrValueStatus[o] = !0);
                            }
                            if (e[y[1]] && (c = e[y[1]])) for (var g = c, v = 0; v < g.length; v++) for (var m = 0; m < L.length; m++) for (o = 0; o < L[m].attrCode.length; o++) L[m].attrCode[o] == g[v] && (L[m].attrValueStatus[o] = !0);
                        }
                        this.setData({
                            attrValueList: L
                        });
                    }
                }
            }
        },
        onHide: function() {},
        distachAttrValue: function(t) {
            for (var e = [], a = [], r = 0, l = [], s = {}, i = 0; i < t.length; i++) {
                a.push(t[i].price), 2 != t[i].isInfiniteInventory && (r += t[i].stock);
                for (var o = 0; o < t[i].attrValueList.length; o++) {
                    var n = this.getAttrIndex(t[i].attrValueList[o].attrKey, e), u = 0 != t[i].stock || 1 != t[i].isInfiniteInventory;
                    if (n >= 0) this.isValueExist(t[i].attrValueList[o].attrValue, e[n].attrValues) || (e[n].attrValues.push(t[i].attrValueList[o].attrValue), 
                    e[n].attrCode.push(t[i].attrValueList[o].attrCode), 1 == t[i].attrValueList.length ? e[n].attrValueStatus.push(u) : e[n].attrValueStatus.push(!1)); else {
                        var c = !1;
                        1 == t[i].attrValueList.length && (c = u), e.push({
                            attrKey: t[i].attrValueList[o].attrKey,
                            attrValues: [ t[i].attrValueList[o].attrValue ],
                            attrCode: [ t[i].attrValueList[o].attrCode ],
                            attrValueStatus: [ c ]
                        });
                    }
                    2 == t[i].attrValueList.length ? 1 == o && t[i].stock ? s[t[i].attrValueList[o - 1].attrCode.toString()].push(t[i].attrValueList[o].attrCode) : 0 == o && (s[t[i].attrValueList[o].attrCode.toString()] || (s[t[i].attrValueList[o].attrCode.toString()] = []), 
                    s[t[i].attrValueList[o + 1].attrCode.toString()] || (s[t[i].attrValueList[o + 1].attrCode.toString()] = []), 
                    t[i].stock && s[t[i].attrValueList[o + 1].attrCode.toString()].push(t[i].attrValueList[o].attrCode)) : 1 == t[i].attrValueList.length && t[i].stock && l.push(t[i].attrValueList[o].attrCode.toString());
                }
            }
            var d = "";
            if (a.length > 0) if (1 == a.length) d = a[0]; else {
                var h = Math.max.apply(null, a), f = Math.min.apply(null, a);
                d = a.length > 0 ? f + "-" + h : "";
            }
            this.setData({
                attrValueList: e,
                priceRange: d,
                totalStock: r,
                availdAttrArray: l.length > 0 ? l : s
            });
        },
        getAttrIndex: function(t, e) {
            for (var a = 0; a < e.length && t != e[a].attrKey; a++) ;
            return a < e.length ? a : -1;
        },
        isValueExist: function(t, e) {
            for (var a = 0; a < e.length && e[a] != t; a++) ;
            return a < e.length;
        },
        selectAttrValue: function(t) {
            var e = this.data.attrValueList, a = t.currentTarget.dataset.index, r = t.currentTarget.dataset.key, l = t.currentTarget.dataset.value, s = t.currentTarget.dataset.itemkey, i = t.currentTarget.dataset.code[s];
            (t.currentTarget.dataset.status || a == this.data.firstIndex) && (t.currentTarget.dataset.selectedvalue == t.currentTarget.dataset.value ? this.disSelectValue(e, a, r, l, i) : this.selectValue(e, a, r, l, i)), 
            this.data.isFirstUserSelect || this.setData({
                isFirstUserSelect: !0
            });
        },
        showProductSelect: function() {
            var t = this, e = t.data.showSelectAttr, a = this.data.attrValueList;
            if (e.attrValueList.length > 0) for (var r = 0; r < e.attrValueList.length; r++) for (var l = 0; l < a.length; l++) {
                var s = null;
                if (e.attrValueList[r].attrKey == a[l].attrKey) {
                    for (var i = 0; i < a[l].attrValues.length; i++) a[l].attrValues[i] == e.attrValueList[r].attrValue && (s = i);
                    null != s && t.selectValue(a, r, e.attrValueList[r].attrKey, e.attrValueList[r].attrValue);
                }
            }
        },
        selectValue: function(e, a, r, l, s, i) {
            var o = this, n = [], u = this.data.availdAttrArray, c = Object.assign({}, this.data.commodityAttr);
            e[a].selectedValue = "";
            for (V = 0; V < e.length; V++) for (p = 0; p < e[V].attrValues.length; p++) e[V].attrValueStatus[p] = !0;
            this.setData({
                includeGroupBak: c,
                attrValueListBak: e
            });
            var d = a;
            if (d == this.data.firstIndex && !i) for (V = 0; V < e.length; V++) e[V].selectedValue = "";
            for (var h = 0, f = 0, V = 0; V < e.length; V++) {
                e[V].selectedValue && h++;
                for (p = 0; p < e[V].attrValues.length; p++) e[V].attrValues[p] == e[V].selectedValue && (f = e[V].attrCode[p]);
            }
            0 == h ? function(t, e, a, r) {
                for (var l = 0; l < t.length; l++) for (var s = 0; s < t[l].attrValueList.length; s++) t[l].attrValueList[s].attrKey == e && t[l].attrValueList[s].attrValue == a && r.push(t[l]);
            }(c, r, l, n) : function(e, a) {
                n = o.data.includeGroup;
                for (var r = 0; r < c.length; r++) for (var l = 0; l < c[r].attrValueList.length; l++) if (c[r].attrValueList[l].attrKey == a && e == c[r].attrValueList[l].attrValue) {
                    n.push(c[r]);
                    break;
                }
                n = (0, t.arrRemoveFuplicates)(n);
            }(l, r), e[d].selectedValue = l;
            for (V = 0; V < e.length; V++) for (p = 0; p < e[V].attrValues.length; p++) e[V].attrValueStatus[p] = !1;
            if (Array.isArray(u)) {
                for (g = 0; g < e.length; g++) for (V = 0; V < u.length; V++) for (p = 0; p < e[g].attrCode.length; p++) if (u[V] == e[g].attrCode[p]) {
                    e[g].attrValueStatus[p] = !0;
                    break;
                }
            } else for (var g = 0; g < e.length; g++) if (g != a) for (V = 0; V < e[g].attrCode.length; V++) for (var v = u[s.toString()], p = 0; p < v.length; p++) {
                if (e[g].attrCode[V] == v[p]) {
                    e[g].attrValueStatus[V] = !0;
                    break;
                }
                e[g].attrValueStatus[V] = !1;
            } else if (h > 0) for (V = 0; V < e[g].attrCode.length; V++) for (var A = u[f.toString()], p = 0; p < A.length; p++) {
                if (e[g].attrCode[V] == A[p]) {
                    e[g].attrValueStatus[V] = !0;
                    break;
                }
                e[g].attrValueStatus[V] = !1;
            } else for (V = 0; V < e[g].attrCode.length; V++) e[g].attrValueStatus[V] = !0;
            this.setData({
                attrValueList: e,
                includeGroup: n
            }), Array.isArray(u) || (h + 1 < 2 ? this.setData({
                firstIndex: d
            }) : this.setData({
                firstIndex: -1
            })), console.log("勾选完成");
            var S = this.selectAttrSearchPriceAndStock(this);
            if (console.log(S), S.selectAllAttr) {
                var y = {
                    originalPrice: S.attrObj.originalPrice,
                    price: S.attrObj.price,
                    productId: S.attrObj.productId,
                    stock: S.attrObj.stock,
                    selectAttrCode: S.selectAttrCode,
                    selectAttrKey: S.value,
                    isInfiniteInventory: S.attrObj.isInfiniteInventory
                };
                this.setData({
                    selectInfo: y
                }, function() {
                    this.setReadySelectAttr(y);
                });
            } else y = {
                price: null,
                productId: null,
                stock: 0,
                selectAttrCode: [],
                selectAttrKey: [],
                isInfiniteInventory: 1
            }, this.setData({
                selectInfo: y
            });
        },
        cancelNextSelectValue: function(t, e, a, r, l, s) {
            var i = [];
            if (e != this.data.firstIndex || s) o = this.data.includeGroupBak; else for (var o = this.data.commodityAttr, n = 0; n < t.length; n++) for (h = 0; h < t[n].attrValues.length; h++) t[n].selectedValue = "";
            for (n = 0; n < o.length; n++) for (h = 0; h < o[n].attrValueList.length; h++) o[n].attrValueList[h].attrKey == a && o[n].attrValueList[h].attrValue == r && o[n].stock && i.push(o[n]);
            t[e].selectedValue = r;
            for (n = 0; n < t.length; n++) for (h = 0; h < t[n].attrValues.length; h++) t[n].attrValueStatus[h] = !1;
            for (var u = this.data.availdAttrArray, c = 0; c < t.length; c++) if (c != e) for (n = 0; n < t[c].attrCode.length; n++) for (var d = u[l.toString()], h = 0; h < d.length; h++) {
                if (t[c].attrCode[n] == d[h]) {
                    t[c].attrValueStatus[n] = !0;
                    break;
                }
                t[c].attrValueStatus[n] = !1;
            } else for (n = 0; n < t[c].attrCode.length; n++) t[c].attrValueStatus[n] = !0;
            this.setData({
                attrValueListBak: t,
                includeGroupBak: i
            });
            for (var f = 0, n = 0; n < t.length; n++) for (h = 0; h < t[n].attrValues.length; h++) if (t[n].selectedValue) {
                f++;
                break;
            }
            f < 2 ? this.setData({
                firstIndex: e
            }) : this.setData({
                firstIndex: -1
            });
            var V = this.selectAttrSearchPriceAndStock(this);
            if (V.selectAllAttr) {
                var g = {
                    price: V.attrObj.price,
                    productId: V.attrObj.productId,
                    stock: V.attrObj.stock,
                    selectAttrCode: V.selectAttrCode,
                    isInfiniteInventory: V.attrObj.isInfiniteInventory
                };
                this.setData({
                    selectInfo: g
                });
            } else g = {
                price: this.data.priceRange,
                productId: null,
                stock: this.data.totalStock,
                selectAttrCode: [],
                isInfiniteInventory: 1
            }, this.setData({
                selectInfo: g
            });
        },
        disSelectValue: function(t, e, a, r, l) {
            var s = this.data.commodityAttr;
            t[e].selectedValue = "";
            for (i = 0; i < t.length; i++) for (o = 0; o < t[i].attrValues.length; o++) t[i].attrValueStatus[o] = !0;
            this.setData({
                includeGroupBak: s,
                attrValueListBak: t
            });
            for (var i = 0; i < t.length; i++) if (t[i].selectedValue) for (var o = 0; o < t[i].attrValues.length; o++) if (t[i].attrValues[o] == t[i].selectedValue) {
                this.cancelNextSelectValue(t, i, t[i].attrKey, t[i].selectedValue, t[i].attrCode[o], !0);
                break;
            }
            this.setData({
                attrValueList: this.data.attrValueListBak,
                includeGroup: this.data.includeGroupBak
            }, function() {
                this.setReadySelectAttr({
                    originalPrice: null,
                    price: this.data.priceRange,
                    productId: null,
                    stock: this.data.totalStock,
                    selectAttrCode: [],
                    selectAttrKey: [],
                    isNonSelectAll: !0,
                    isInfiniteInventory: 1
                });
            });
        },
        compareToShowPriceAndStock: function(e, a) {
            var r = a.selectAttrCode, l = e.data.commodityAttr;
            if (l.length > 0) for (var s = 0; s < l.length; s++) {
                var i = [];
                if (l[s].attrValueList.length > 0) {
                    for (var o = 0; o < l[s].attrValueList.length; o++) i.push(l[s].attrValueList[o].attrCode);
                    if ((0, t.compareSameValue)(i, r)) return {
                        isInfiniteInventory: l[s].isInfiniteInventory,
                        originalPrice: l[s].originalPrice,
                        price: l[s].price,
                        productId: l[s].productId,
                        stock: l[s].stock
                    };
                }
            }
        },
        selectAttrSearchPriceAndStock: function(e) {
            for (var a = [], r = [], l = 0; l < e.data.attrValueList.length && e.data.attrValueList[l].selectedValue; l++) a.push(e.data.attrValueList[l].selectedValue);
            for (var s = e.data.commodityAttr, i = 0; i < s.length; i++) for (var o = 0; o < s[i].attrValueList.length; o++) for (var n = 0; n < a.length; n++) s[i].attrValueList[o].attrValue == a[n] && r.push(s[i].attrValueList[o].attrCode);
            var u = (0, t.arrRemoveFuplicates)(r), c = {};
            if (u.length < e.data.attrValueList.length) var d = !1; else d = !0, c = e.compareToShowPriceAndStock(e, {
                value: a,
                selectAttrCode: u,
                selectAllAttr: d
            });
            return {
                value: a,
                selectAttrCode: u,
                selectAllAttr: d,
                attrObj: c
            };
        },
        submit: function() {
            var t = this.selectAttrSearchPriceAndStock(this), e = t.selectAttrCode;
            if (t.selectAllAttr) {
                for (var a = "", r = 0; r < e.length; r++) a += e[r] + ",";
                wx.showModal({
                    title: "提示",
                    content: a,
                    success: function(t) {
                        t.confirm || t.cancel;
                    }
                });
            } else wx.showModal({
                title: "提示",
                content: "请选择商品属性",
                success: function(t) {
                    t.confirm || t.cancel;
                }
            });
        }
    },
    ready: function() {}
}));

exports.productAttrShow = e;