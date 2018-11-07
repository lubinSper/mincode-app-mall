Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.mallCategorylist1 = void 0;

var t = require("../../../function/moveTab/move-tabs"), e = require("../../../model/buy_car/buy_car"), r = getApp(), i = Behavior({
    behaviors: [],
    properties: {},
    data: {
        scrollLeft: 0
    },
    methods: {
        jumpToNext: function(t) {
            var e = {
                id: t.currentTarget.dataset.id
            }, r = {};
            this.triggerEvent("jumpnext", e, r);
        },
        btnActive: function(e) {
            var r = {
                e: e
            };
            (0, t.moveTabsX)({
                event: e,
                ele: this
            });
            var i = {};
            this.triggerEvent("btnactive", r, i);
        },
        selfAddBuyCar: function(t) {
            this.triggerEvent("addbuycar", t.detail, {});
        },
        onAddBuyCar: function(t) {
            this.triggerEvent("addbuycar", t.currentTarget.dataset, {});
        },
        addToBuyCar: function(t) {
            var i = this;
            console.log(t), console.log(t.attributeId);
            var a = [], n = t.attributeId ? t.attributeId : [], o = t.inventory, d = t.id;
            if (n.length > 0) for (var s = 0; s < n.length; s++) {
                var u = n[s];
                if (u.inventory > 0) {
                    a[0] = u.firstAttrId, o = u.inventory, u.secondAttrId && (a[1] = u.secondAttrId);
                    break;
                }
            }
            if (o < 1 && 2 != t.isInfiniteInventory) r.showDialog(this, "该商品已售罄"); else {
                var v = {
                    id: d,
                    attributeId: a,
                    count: 1,
                    inventory: o
                };
                (0, e.addBuyCar)(v, function() {
                    r.showDialog(i, "加入购物车成功"), r.setCarCountDot();
                });
                var c = {
                    id: d,
                    attributeId: a,
                    inventory: o
                };
                this.triggerEvent("addbuycar", c);
            }
        }
    }
});

exports.mallCategorylist1 = i;