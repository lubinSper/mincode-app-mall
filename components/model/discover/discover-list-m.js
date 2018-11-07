Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getGoodsList = exports.DiscoverListM = void 0;

var e = require("../../function/formatMsgTime/formatMsgTime"), a = require("../../template/show_dialog/show_dialog"), t = (require("../../../util/util"), 
getApp()), i = !1;

exports.DiscoverListM = function(l) {
    if (!i) {
        if (i = !0, console.log("请求商品列表----------", l), l.ele.data.isSetViewRecord && 3 == parseInt(t.globalData.xcxType)) {
            var r = getCurrentPages();
            t.saveRecordInfo(r[0].route, null, l.data.orgId);
        }
        wx.request({
            url: t.globalData.shopMHost + "/xcx/org/new/goods/list",
            method: "post",
            data: l.data,
            header: {
                "content-type": "application/json"
            },
            complete: function() {
                wx.stopPullDownRefresh(), l.ele.data.clickOne = 1;
                var e = l.ele.data.searchObj;
                e && (e.searchTop = 0, l.ele.data.searchObj = e), l.ele.setData(l.ele.data);
            },
            success: function(r) {
                if ("000000" == r.data.code) {
                    i = !1, l.ele.data.showLoading = !1, l.ele.data.loading_fail = !1, l.ele.data.copyRightShow = !0;
                    var o = r.data.data ? r.data.data : [];
                    o.length > 0 ? (l.ele.data.haveData = !0, l.ele.data.noData = !1) : 1 == l.ele.data.pageIndex && (l.ele.data.haveData = !1, 
                    l.ele.data.noData = !0), o.length < l.data.pageSize ? (l.ele.data.showLoading = !1, 
                    l.ele.data.hasNextPage = !1, l.ele.data.showBlank = !0) : (l.ele.data.hasNextPage = !0, 
                    l.ele.data.pageIndex = l.data.pageIndex + 1);
                    var s = [];
                    l.PullDownRefresh ? (o.length > 0 ? l.ele.data.pageIndex = 2 : l.ele.data.pageIndex = 1, 
                    wx.stopPullDownRefresh()) : l.ReachBottom && (s = l.ele.data.shopList, o.length > 0 && (l.ele.data.pageIndex = l.data.pageIndex + 1));
                    for (var n = 0; n < o.length; n++) {
                        if (o[n].publishTime = (0, e.formatMsgTime)(o[n].publishTime), o[n].coverImage = o[n].mainImagesUrl.length ? o[n].mainImagesUrl[0] : o[n].coverImage, 
                        2 == o[n].isPintuan && (o[n].reducePrice = parseFloat((o[n].price - o[n].pintuanPrice) / 100), 
                        o[n].originalPrice = o[n].price, o[n].price = o[n].pintuanPrice), 2 == o[n].isBargain && (o[n].originalPrice = o[n].price, 
                        o[n].price = o[n].bargainMinPrice), 2 === o[n].enableSupperMemberPrice && o[n].superMemberPrice ? (o[n].salePrice = parseFloat(o[n].price / 100), 
                        o[n].salePrice = o[n].salePrice.toString().split("."), o[n].salePrice1 = o[n].salePrice[0], 
                        o[n].salePrice2 = o[n].salePrice[1] ? "." + o[n].salePrice[1] : "", o[n].salePrice3 = o[n].salePrice1 + (".00" != o[n].salePrice2 ? o[n].salePrice2 : ""), 
                        o[n].price = parseFloat(o[n].superMemberPrice / 100)) : o[n].price = parseFloat(o[n].price / 100), 
                        o[n].isFreePrice = Number(o[n].price), o[n].price = o[n].price.toString().split("."), 
                        o[n].price1 = o[n].price[0], o[n].price2 = o[n].price[1] ? "." + o[n].price[1] : "", 
                        (o[n].originalPrice || 0 != o[n].originalPrice) && (o[n].originalPrice = parseFloat(o[n].originalPrice / 100)), 
                        l.href = "special_selling") {
                            var c = [];
                            o[n].imgUrls.length < 3 ? (c.push(o[n].imgUrls[0]), o[n].imgUrls = c) : (c.push(o[n].imgUrls[0]), 
                            c.push(o[n].imgUrls[1]), c.push(o[n].imgUrls[2]), o[n].imgUrls = c);
                        }
                        s.push(o[n]);
                    }
                    "page/discover/discover" == l.ele.route && (s = s.filter(function(e) {
                        return 2 != e.type;
                    }), l.ele.data.haveData = s.length > 0, l.ele.data.noData = s.length < 1), console.log("222====================   shopListArr=", s), 
                    l.ele.data.shopList = s, l.ele.data.isClick = !0, l.ele.setData(l.ele.data, function() {
                        setTimeout(function() {
                            wx.hideLoading();
                        }, 1e3), l.fn && l.fn(l.ele.data.shopList);
                    });
                } else setTimeout(function() {
                    wx.hideLoading();
                }, 1e3), l.isTab ? t.globalData.showErrorAlert && (0, a.ShowDialog)(l.ele) : (0, 
                a.ShowDialog)(l.ele);
                i = !1;
            },
            fail: function(e) {
                wx.hideLoading(), console.log(e, "--------discover---"), l.ele.data.showLoading = !1, 
                l.ele.data.loading_fail = !0, l.ele.data.noData = !1, 1 == l.ele.data.pageIndex && (l.ele.data.loading_fail = !0), 
                l.ele.data.isClick = !0, l.PullDownRefresh && (l.ele.data.haveData = !1), l.ele.data.shopList = [], 
                l.ele.setData(l.ele.data), l.isTab ? t.globalData.showErrorAlert && (0, a.ShowDialog)(l.ele) : (0, 
                a.ShowDialog)(l.ele), i = !1;
            }
        });
    }
}, exports.getGoodsList = function(e) {
    var a = e.params, i = e.fn;
    wx.request({
        url: t.globalData.shopMHost + "/xcx/org/new/goods/list",
        method: "post",
        data: a,
        header: {
            "content-type": "application/json"
        },
        complete: function() {
            wx.stopPullDownRefresh();
        },
        success: function(e) {
            var a = e.data.data ? e.data.data : [];
            i && i(null, a);
        },
        fail: function(e) {
            i && i(e), setTimeout(function() {
                wx.hideLoading();
            }, 1e3);
        }
    });
};