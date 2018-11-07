require("../../../util/util");

var e = getApp();

module.exports = function(i, r) {
    wx.request({
        url: e.globalData.shopMHost + "xcx/seckill/list",
        method: "post",
        data: i,
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            if ("000000" == e.data.code) {
                var i = (e.data.data ? e.data.data : []).filter(function(e) {
                    return 2 != e.isSpecial;
                });
                i.forEach(function(e) {
                    2 === e.enableSupperMemberPrice && e.superMemberPrice ? (e.salePrice = parseFloat(e.price / 100), 
                    e.salePrice = e.salePrice.toString().split("."), e.salePrice1 = e.salePrice[0], 
                    e.salePrice2 = e.salePrice[1] ? "." + e.salePrice[1] : "", e.salePrice3 = e.salePrice1 + (".00" != e.salePrice2 ? e.salePrice2 : ""), 
                    e.price = parseFloat(e.superMemberPrice / 100)) : e.price = parseFloat(e.price / 100), 
                    e.isFreePrice = Number(e.price), e.price = e.price.toString().split("."), e.price1 = e.price[0], 
                    e.price2 = e.price[1] ? "." + e.price[1] : "", (e.originalPrice || 0 != e.originalPrice) && (e.originalPrice = parseFloat(e.originalPrice / 100));
                }), r && r(null, i);
            } else setTimeout(function() {
                wx.hideLoading();
            }, 1e3);
        },
        fail: function(e) {
            setTimeout(function() {
                wx.hideLoading();
            }, 1e3), r && r(e);
        }
    });
};