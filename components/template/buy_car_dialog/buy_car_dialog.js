Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.buyCarDialog = void 0;

require("../../../components/conf/conf");

var a = require("../../../components/template/show_dialog/show_dialog"), t = (getApp(), 
{
    showDialog: function(a) {
        var t = this, o = a.target.dataset.type ? a.target.dataset.type : a.currentTarget.dataset.type;
        t.data.buyCarDialogInfo.types = o, t.data.buyCarDialogInfo.showCheckGoodsType = !0, 
        t.setData(t.data);
        wx.getSystemInfoSync();
        var e = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        e.translateY(0).step(), t.data.buyCarDialogInfo.showCheckGoodsTypeBg = !0, t.data.buyCarDialogInfo.checkGoodsTypeBg = "check_goods_type_bg_1", 
        t.data.buyCarDialogInfo.animationData = e.export(), t.setData(t.data);
    },
    closeDialog: function() {
        var a = this, t = wx.getSystemInfoSync(), o = wx.createAnimation({
            duration: 300,
            timingFunction: "linear"
        });
        o.translateY(t.windowHeight).step(), a.data.buyCarDialogInfo.checkGoodsTypeBg = "check_goods_type_bg_2", 
        a.data.buyCarDialogInfo.animationData = o.export(), setTimeout(function() {
            a.data.buyCarDialogInfo.showCheckGoodsTypeBg = !1, a.data.buyCarDialogInfo.showCheckGoodsType = !1, 
            a.setData(a.data);
        }, 300), a.setData(a.data);
    },
    switchType: function(a) {
        var t = this, o = a.target.dataset.index, e = a.target.dataset.price, i = a.target.dataset.inventory, n = a.target.dataset.attributeId, r = "";
        a.target.dataset.originalPrice && (r = a.target.dataset.originalPrice), t.data.buyCarDialogInfo.index = o, 
        t.data.buyCarDialogInfo.price = e, t.data.buyCarDialogInfo.originalPrice = r, t.data.buyCarDialogInfo.inventory = i, 
        t.data.buyCarDialogInfo.goodsAttribute[o].active = !0, t.data.buyCarDialogInfo.count = 1, 
        t.data.buyCarDialogInfo.attributeId = n, t.data.buyCarDialogInfo.inventory = i, 
        t.setData(t.data);
    },
    addBuyCar: function(t) {
        var o = this, e = t.target.dataset.attributeId, i = t.target.dataset.count, n = t.target.dataset.id, r = o.data.buyCarDialogInfo, u = r.types, d = r.updateIndex;
        if ("1" == u || 3 == u) {
            var s = new Object(), c = new Array();
            s.id = n, s.attributeId = e, s.count = i, wx.getStorage({
                key: "shoppingCarGoods",
                success: function(t) {
                    var e = t.data;
                    if (1 == u) {
                        var i = -1;
                        e.map(function(a, t) {
                            a.id == s.id && a.attributeId == s.attributeId && (i = t);
                        }), -1 == i ? (s.isSelect = !0, e.unshift(s)) : (e[i].count = e[i].count + s.count, 
                        e[i].isSelect = !0);
                    } else {
                        e[d].attributeId != s.attributeId && (e[d].attributeId = s.attributeId), e[d].count = s.count;
                        var n = [];
                        e.map(function(a, t) {
                            a.attributeId == s.attributeId && a.id == s.id && n.push(t);
                        }), n.length > 1 && (e[n[0]].count = e[n[0]].count + e[n[1]].count, e.splice(n[1], 1));
                    }
                    wx.setStorage({
                        key: "shoppingCarGoods",
                        data: e,
                        success: function() {
                            3 == u && o.onShow();
                            var t = 1 == u ? "加入购物车成功" : "修改成功";
                            (0, a.ShowDialog)(o, t);
                            var i = 0;
                            e.map(function(a) {
                                i += a.count;
                            }), o.setData({
                                buyCarCount: i
                            });
                        }
                    });
                },
                fail: function(t) {
                    c.push(s), wx.setStorage({
                        key: "shoppingCarGoods",
                        data: c,
                        success: function() {
                            o.onShow(), o.setData({
                                buyCarCount: 1
                            }), (0, a.ShowDialog)(o, "加入购物车成功");
                        }
                    });
                }
            }), o.closeDialog();
        } else "2" == u && wx.navigateTo({
            url: "/subPackage/my/pages/order/order_sure_pickup/order_sure_pickup?attributeId=" + e + "&count=" + i + "&id=" + n
        });
    },
    addNum: function() {
        var a = this;
        a.data.buyCarDialogInfo.count += 1, a.setData(a.data);
    },
    removeNum: function() {
        var a = this;
        a.data.buyCarDialogInfo.count -= 1, a.setData(a.data);
    }
});

exports.buyCarDialog = t;