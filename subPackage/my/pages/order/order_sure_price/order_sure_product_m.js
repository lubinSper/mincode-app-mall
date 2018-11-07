Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.orderSureProductM = void 0;

var e = require("../../../../../components/template/show_dialog/show_dialog"), a = getApp();

exports.orderSureProductM = function(t, o) {
    return wx.showLoading({
        title: "加载中"
    }), new Promise(function(r, d) {
        wx.request({
            url: a.globalData.shopMHost + "/xcx/shop/goods/info",
            data: t.data,
            method: "post",
            header: {
                "content-type": "application/json"
            },
            complete: function() {
                wx.stopPullDownRefresh(), wx.hideLoading();
            },
            success: function(a) {
                o && o();
                var d = t.ele;
                if ("000000" == a.data.code) {
                    if (console.log("商品详情------------------", a.data.data), a.data.data) {
                        var i = a.data.data;
                        t.ele.data.goodsz.coverImage = i.coverImage, t.ele.data.goodsz.name = i.name, t.ele.data.goodsz.isSupportMemberCardPay = i.isSupportMemberCardPay, 
                        t.ele.data.dateTime = i.reserveTime ? i.reserveTime : t.ele.data.dateTime, t.ele.data.goodsz.price = i.price ? i.price / 100 : 0, 
                        t.ele.data.goodsz.price2 = i.price, t.ele.data.goodsz.originalPrice = i.originalPrice ? i.originalPrice / 100 : 0, 
                        t.ele.data.goodsz.inventory = i.inventory, t.ele.data.hasData = !0, t.ele.data.isShowInventory = 2 == parseInt(i.isShowInventory), 
                        t.ele.data.goodsz.superMemberPrice = (i.superMemberPrice || 0) / 100, t.ele.data.isShowSale = 2 == parseInt(i.isShowSale), 
                        t.ele.data.goodsz.enableSupperMemberPrice = i.enableSupperMemberPrice, "" == t.ele.data.dateTime || "用户自选时间" == t.ele.data.dateTime || "请选择" == t.ele.data.dateTime ? t.ele.data.isOrderTime = 1 : t.ele.data.isOrderTime = 0;
                    }
                    t.ele.setData(t.ele.data, function() {
                        console.log("更改后的数据--------------", t.ele.data);
                    });
                } else d.data.showTipData.content = a.data.msg, (0, e.ShowDialog)(d);
                r(a.data.data);
            },
            fail: function() {
                d(), (0, e.ShowDialog)(that);
            }
        });
    });
};