Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.orderGoodsCheckcarM = void 0;

var e = require("../../../../../components/template/show_dialog/show_dialog"), o = getApp();

exports.orderGoodsCheckcarM = function(a, t) {
    return new Promise(function(l, i) {
        wx.request({
            url: o.globalData.shopMHost + "xcx/shopping/chenckCart",
            method: "post",
            data: a.data,
            header: {
                "content-type": "application/json"
            },
            complete: function() {
                wx.stopPullDownRefresh();
            },
            success: function(o) {
                if (console.log("进来的是这个吗？"), t && t(), o.data.data) for (var i = o.data.data, r = 0; r < i.length; r++) {
                    a.ele.data.goodsSigleInfo.goodsimg = i[r].imageUrls, a.ele.data.goodsSigleInfo.goodsName = i[r].producName, 
                    a.ele.data.goodsSigleInfo.goodsAttrName = i[r].attrName, a.ele.data.goodsSigleInfo.goodsPrice = i[r].price / 100, 
                    a.ele.data.goodsSigleInfo.goodsoriginalPrice = i[r].originalPrice / 100, a.ele.data.hasData = !0;
                    var d = 0;
                    d = i[r].originalPrice > 0 ? i[r].originalPrice * a.ele.data.goodsSigleInfo.count : i[r].price * a.ele.data.goodsSigleInfo.count, 
                    a.ele.data.total_sum02 = d;
                    var s = 0;
                    i[r].originalPrice > i[r].price && (s = parseInt(i[r].originalPrice - i[r].price) * a.ele.data.goodsSigleInfo.count), 
                    a.ele.data.favourableMoney02 = s / 100, a.ele.setData(a.ele.data);
                } else that.data.showTipData.content = o.data.msg, console.log("网络连接失败01"), (0, 
                e.ShowDialog)(a.ele, "网络连接失败");
                a.ele.setData(a.ele.data), l(o.data.data);
            },
            fail: function() {
                i(), console.log("网络连接失败02"), (0, e.ShowDialog)(a.ele, "网络连接失败");
            }
        });
    });
};