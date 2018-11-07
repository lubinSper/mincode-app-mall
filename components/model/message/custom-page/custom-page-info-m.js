Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.goodsListInfo = exports.customPageInfo = void 0;

var e = require("../../../template/show_dialog/show_dialog"), a = require("../../../function/formatMsgTime/formatMsgTime"), t = getApp();

exports.customPageInfo = function(a, i) {
    wx.request({
        url: t.globalData.shopMHost + "customPage/integrationResult/queryPageDetail",
        method: "post",
        data: a.data,
        header: {
            "content-type": "application/json",
            codeVersion: t.globalData.codeVersion
        },
        complete: function() {},
        success: function(o) {
            setTimeout(function() {
                wx.hideLoading();
            }, 1e3), "000000" == o.data.code ? o.data.data ? ("richText" != o.data.data.type || o.data.data.content ? (a.ele.data.noData = !1, 
            a.ele.setData(a.ele.data)) : (a.ele.data.noData = !0, a.ele.data.copyRightShow = !0, 
            a.ele.setData(a.ele.data)), console.log("noData", a.ele.data.noData), i(null, o.data)) : (a.ele.data.noData = !0, 
            a.ele.data.copyRightShow = !0, a.ele.setData(a.ele.data), i(null, o.data)) : t.globalData.showErrorAlert && (a.ele.data.showTipData.show = !0, 
            a.ele.data.showTipData.content = "网络连接失败", (0, e.ShowDialog)(a.ele), i("网络连接失败", o));
        },
        fail: function(i) {
            setTimeout(function() {
                wx.hideLoading();
            }, 1e3), t.globalData.showErrorAlert && (a.ele.data.showTipData.show = !0, a.ele.data.showTipData.content = "网络连接失败", 
            (0, e.ShowDialog)(a.ele));
        }
    });
}, exports.goodsListInfo = function(i) {
    wx.request({
        url: t.globalData.shopMHost + "/xcx/org/new/goods/list",
        method: "post",
        data: i.data,
        header: {
            "content-type": "application/json",
            codeVersion: t.globalData.codeVersion
        },
        complete: function() {},
        success: function(t) {
            if (console.log("datas========", t), "000000" == t.data.code) {
                for (var o = t.data.data ? t.data.data : [], r = [], s = 0; s < o.length; s++) {
                    if (o[s].publishTime = (0, a.formatMsgTime)(o[s].publishTime), o[s].coverImage = o[s].mainImagesUrl.length ? o[s].mainImagesUrl[0] : o[s].coverImage, 
                    2 == o[s].isPintuan && (o[s].reducePrice = parseFloat((o[s].price - o[s].pintuanPrice) / 100), 
                    o[s].originalPrice = o[s].price, o[s].price = o[s].pintuanPrice), 2 == o[s].isBargain && (o[s].originalPrice = o[s].price, 
                    o[s].price = o[s].bargainMinPrice), 2 === o[s].enableSupperMemberPrice && o[s].superMemberPrice ? (o[s].salePrice = parseFloat(o[s].price / 100), 
                    o[s].salePrice = o[s].salePrice.toString().split("."), o[s].salePrice1 = o[s].salePrice[0], 
                    o[s].salePrice2 = o[s].salePrice[1] ? "." + o[s].salePrice[1] : "", o[s].salePrice3 = o[s].salePrice1 + (".00" != o[s].salePrice2 ? o[s].salePrice2 : ""), 
                    o[s].price = parseFloat(o[s].superMemberPrice / 100)) : o[s].price = parseFloat(o[s].price / 100), 
                    o[s].isFreePrice = Number(o[s].price), o[s].price = o[s].price.toString().split("."), 
                    o[s].price1 = o[s].price[0], o[s].price2 = o[s].price[1] ? "." + o[s].price[1] : "", 
                    (o[s].originalPrice || 0 != o[s].originalPrice) && (o[s].originalPrice = parseFloat(o[s].originalPrice / 100)), 
                    i.href = "special_selling") {
                        var l = [];
                        o[s].imgUrls.length < 3 ? (l.push(o[s].imgUrls[0]), o[s].imgUrls = l) : (l.push(o[s].imgUrls[0]), 
                        l.push(o[s].imgUrls[1]), l.push(o[s].imgUrls[2]), o[s].imgUrls = l);
                    }
                    r.push(o[s]);
                }
                for (var n = [], s = 0, c = i.data.productIds.length; s < c; s++) for (var d = 0, c = r.length; d < c; d++) if (r[d].id == i.data.productIds[s]) {
                    n.push(r[d]);
                    break;
                }
                i.ele.data.shopArr = n, i.ele.data.isLoad = !1, i.ele.setData(i.ele.data, function() {
                    console.log("jsons.ele.data.shopArr", i.ele.data.shopArr), setTimeout(function() {
                        wx.hideLoading();
                    }, 1e3), i.fn && i.fn(i.ele.data.shopArr);
                });
            } else setTimeout(function() {
                wx.hideLoading();
            }, 1e3), (0, e.ShowDialog)(i.ele);
        },
        fail: function(a) {
            setTimeout(function() {
                wx.hideLoading();
            }, 1e3), i.ele.data.showTipData.show = !0, i.ele.data.showTipData.content = "网络连接失败", 
            (0, e.ShowDialog)(i.ele);
        }
    });
};