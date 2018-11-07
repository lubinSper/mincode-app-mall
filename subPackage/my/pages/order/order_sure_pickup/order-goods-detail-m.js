Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.orderGoodsDetailM = void 0;

var e = require("../../../../../components/template/show_dialog/show_dialog"), a = getApp(), o = require("../../../../../util/es6-promise.min.js");

exports.orderGoodsDetailM = function(t, i) {
    return new o(function(o, r) {
        wx.request({
            url: a.globalData.shopMHost + "/xcx/org/goods/info",
            data: t.data,
            method: "post",
            header: {
                "content-type": "application/json"
            },
            complete: function() {
                wx.stopPullDownRefresh();
            },
            success: function(a) {
                i && i();
                var r = t.ele;
                if ("000000" == a.data.code) {
                    if (a.data.data) {
                        var d = a.data.data, n = d.originalPrice || d.price;
                        d.price = "cut_price" == t.ele.data.from ? d.currentBargainPrice : d.price, t.ele.data.goodsz.coverImage = d.coverImage, 
                        t.ele.data.goodsz.name = d.name, t.ele.data.goodsz.price = d.price ? d.price / 100 : 0, 
                        t.ele.data.goodsz.originalPrice = d.originalPrice ? d.originalPrice / 100 : 0, t.ele.data.goodsz.inventory = d.inventory, 
                        t.ele.data.hasData = !0, n > d.price ? t.ele.data.paymen.youHuiPrice = (n - d.price) / 100 : t.ele.data.paymen.youHuiPrice = 0;
                    }
                } else r.data.showTipData.content = a.data.msg, (0, e.ShowDialog)(t.ele, "网络连接失败");
                t.ele.setData(t.ele.data), o(a.data.data);
            },
            fail: function() {
                r(), (0, e.ShowDialog)(t.ele, "网络连接失败");
            }
        });
    });
};