Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.addBuyCar = exports.getBuyCarInfo = void 0;

var t = require("../../../components/conf/conf"), e = require("../../../components/function/jsonMerge/jsonMerge"), r = require("../../../components/function/arr-remove-duplicates/arr-remove-duplicates"), n = t.Conf.shoppingCarStorageKey, o = getApp();

exports.getBuyCarInfo = function(t, r, s) {
    wx.getStorage({
        key: n,
        success: function(i) {
            var a = i.data;
            if (t) if (Array.isArray(a)) if (0 != a.length) {
                var c = [];
                s || (a = a.filter(function(t) {
                    return t.isSelect;
                })), a.map(function(t) {
                    c.push({
                        productId: t.id,
                        ids: t.attributeId ? t.attributeId : []
                    });
                }), wx.request({
                    url: o.globalData.shopMHost + "xcx/shopping/cardList",
                    method: "post",
                    data: {
                        shoppingIds: c
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    complete: function() {},
                    success: function(o) {
                        wx.hideLoading();
                        var s = o.data, i = s.data;
                        "000000" == s.code ? (a = a.map(function(t, r) {
                            return i[r].firstAttrName && i[r].secondAttrName ? t.attrName = i[r].firstAttrName + " " + i[r].secondAttrName : i[r].firstAttrName && (t.attrName = i[r].firstAttrName), 
                            2 != t.isInfiniteInventory && t.count > i[r].inventory && (t.count = i[r].inventory), 
                            0 == t.attributeId.length ? i[r].firstAttrId && !i[r].secondAttrId ? (t.attributeId = [ i[r].firstAttrId ], 
                            t.isSelect = !0) : i[r].firstAttrId && i[r].secondAttrId && (t.attributeId = [ i[r].firstAttrId, i[r].secondAttrId ], 
                            t.isSelect = !0) : (i[r].firstAttrId || i[r].secondAttrId ? i[r].firstAttrId && !i[r].secondAttrId && (t.attributeId = [ i[r].firstAttrId ], 
                            t.secondAttrId = "") : (t.attributeId = [], t.firstAttrId = "", t.secondAttrId = ""), 
                            i[r].firstAttrId && i[r].secondAttrId && (t.attributeId = [ i[r].firstAttrId, i[r].secondAttrId ])), 
                            t.superMemberPrice = i[r].superMemberPrice, i[r] ? (0, e.jsonMerge)(t, i[r]) : t;
                        }), r && wx.setStorage({
                            key: n,
                            data: a,
                            success: function() {
                                console.log("重新设置进缓存成功！----");
                            }
                        }), t(null, a)) : t(!0, []);
                    },
                    fail: function(e) {
                        t(!0, []), setTimeout(function() {
                            wx.hideLoading();
                        }, 1e3);
                    }
                });
            } else t("isEmpty", []); else wx.removeStorage({
                key: n,
                success: function(t) {
                    wx.showModal({
                        title: "提示",
                        content: "购物车数据异常"
                    });
                }
            });
        },
        fail: function(e) {
            t("isFail", []);
        }
    });
}, exports.addBuyCar = function(t, e) {
    console.log("addBuyCar---", t);
    var o = [], s = !0;
    wx.getStorage({
        key: n,
        success: function(i) {
            var a = -1;
            if ((o = i.data).map(function(e, n) {
                e.id == t.id && (0, r.compareSameValue)(e.attributeId, t.attributeId) && (a = n);
            }), -1 == a) t.isSelect = !0, o.unshift(t); else {
                var c = o[a].count + t.count;
                c <= t.inventory ? (o[a].count = c, o[a].isSelect = !0) : (s = !1, wx.showToast({
                    title: "添加购物车失败，已超出库存限制",
                    icon: "none",
                    duration: 3e3
                }));
            }
            s && wx.setStorage({
                key: n,
                data: o,
                success: function() {
                    e && e(o);
                }
            });
        },
        fail: function(r) {
            o.unshift(t), wx.setStorage({
                key: n,
                data: o,
                success: function() {
                    e && e(o);
                }
            });
        }
    });
};