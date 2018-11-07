Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getVisitNum = exports.newGoodsInfo = exports.newGoodsDetailM = exports.goodsInfo = exports.goodsDetailM = void 0;

var e = require("../../../function/formatMsgTime/formatMsgTime"), a = require("../../../template/show_dialog/show_dialog"), t = require("../../../function/showTime/showTime"), i = require("../../../../util/util"), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../function/countdown/countdown")), o = getApp();

exports.goodsDetailM = function(r) {
    wx.request({
        url: o.globalData.shopMHost + "/xcx/org/goods/info",
        data: r.data,
        method: "post",
        header: {
            "content-type": "application/json"
        },
        complete: function() {
            wx.stopPullDownRefresh(), wx.hideLoading();
        },
        success: function(a) {
            var o = a.data.data;
            if ("000000" == a.data.code) {
                if (r.ele.data.shopList = [ o ], r.ele.data.showContent = !0, r.ele.data.name = o.name, 
                r.ele.data.thumLogo = o.thumLogo, r.ele.data.orgName = o.orgName, r.ele.data.logo = o.thumLogo, 
                r.ele.data.goodsDesc = o.goodsDesc, r.ele.data.imgUrls = o.imgUrls, r.ele.data.publishTime = (0, 
                e.formatMsgTime)(o.publishTime), r.ele.data.price = parseFloat(o.price / 100).toString(), 
                r.ele.data.cdl_price01 = r.ele.data.price.split(".")[0], r.ele.data.price.split(".")[1] && (r.ele.data.cdl_price02 = r.ele.data.price.split(".")[1]), 
                r.ele.data.id = o.id, r.ele.data.img = o.imgUrls[0], r.ele.data.types = o.type, 
                r.ele.data.inventory = o.inventory, r.ele.data.buyCarDialogInfo.id = o.id, r.ele.data.buyCarDialogInfo.coverImage = o.coverImage, 
                r.ele.data.buyCarDialogInfo.imgUrls = o.imgUrls, r.ele.data.buyCarDialogInfo.price = parseFloat(o.price / 100).toString(), 
                r.ele.data.buyCarDialogInfo.inventory = o.inventory, r.ele.data.imgTextHybr = o.imgTextHybr, 
                2 == o.isBargain && (r.ele.data.bargainActivityId = o.bargainActivityId ? o.bargainActivityId : 0, 
                r.ele.data.bargainLaunchId = o.bargainLaunchId ? o.bargainLaunchId : 0, r.ele.data.bargainMinPrice = (0, 
                i.formatMoney)(o.bargainMinPrice), r.ele.data.currentBargainPrice = (0, i.formatMoney)(o.currentBargainPrice), 
                r.ele.data.isBargain = o.isBargain ? o.isBargain : "", r.ele.data.isLaunchBargain = o.isLaunchBargain ? o.isLaunchBargain : ""), 
                2 == o.isPintuan && (r.ele.data.isPintuan = o.isPintuan, r.ele.data.isJoinPintuan = o.isJoinPintuan, 
                r.ele.data.pintuanLimitPeopleNum = o.pintuanLimitPeopleNum, r.ele.data.pintuanOpenNum = o.pintuanOpenNum, 
                r.ele.data.pintuanLeftOpenNum = o.pintuanLeftOpenNum, r.ele.data.pintuanActivityId = o.pintuanActivityId, 
                o.joinOpentuanId && (r.ele.data.joinOpentuanId = o.joinOpentuanId), r.ele.data.pintuanPrice = (0, 
                i.formatMoney)(o.pintuanPrice), r.ele.data.reducePrice = (0, i.formatMoney)(o.price - o.pintuanPrice), 
                (0, n.default)({
                    key: "goods_detail_pintuan",
                    timeKey: "limitTime",
                    timeData: o.userPintuanDetailDtos,
                    isMyPintuan: 1,
                    fn: function(e) {
                        e && r.ele.setData({
                            userPintuanDetailDtos: e
                        });
                    }
                })), r.ele.data.viewNum = o.viewNum, o.reserveTime ? (r.ele.data.reserveTime = o.reserveTime, 
                new Date() > new Date(o.reserveTime.replace(/-/g, "/")) && (r.ele.data.appointmentExpire = !0)) : r.ele.data.reserveTime = "", 
                o.originalPrice ? (r.ele.data.originalPrice = parseFloat(o.originalPrice / 100), 
                r.ele.data.buyCarDialogInfo.originalPrice = parseFloat(o.originalPrice / 100)) : (r.ele.data.originalPrice = "", 
                r.ele.data.buyCarDialogInfo.originalPrice = ""), r.fn && o.reserveTime) {
                    var l = (0, t.ShowTime)(a.header.Date, "Y-M-D hh:mm:ss", "-"), d = o.reserveTime;
                    r.fn(l, d, o.toEndTime);
                }
                var s = o.goodsAttribute, c = 0;
                if (s && s.length > 0) for (var u = 0; u < s.length; u++) {
                    if (s[u].inventory) {
                        r.ele.data.buyCarDialogInfo.price = parseFloat(s[u].price / 100), s[u].originalPrice ? r.ele.data.buyCarDialogInfo.originalPrice = parseFloat(s[u].originalPrice / 100) : r.ele.data.buyCarDialogInfo.originalPrice = "", 
                        r.ele.data.buyCarDialogInfo.inventory = s[u].inventory, s[u].active = !0, r.ele.data.buyCarDialogInfo.index = u, 
                        r.ele.data.buyCarDialogInfo.attributeId = s[u].id, c += s[u].inventory, r.ele.data.inventory2 = c;
                        break;
                    }
                    s[u].inventory = 0, c += s[u].inventory, r.ele.data.inventory2 = c;
                }
                r.ele.data.buyCarDialogInfo.goodsAttribute = s, r.ele.data.isShow = !0, o.toEndTime && r.isLoadCountdown && (r.ele.data.toEndTime = o.toEndTime, 
                (0, n.default)({
                    key: "goods_detail_limit_time",
                    timeData: o.toEndTime,
                    fn: function(e) {
                        e && (r.ele.data.timeArr = e, r.ele.setData(r.ele.data));
                    }
                }));
            } else r.ele.data.tipMsg = a.data.msg, r.ele.data.isShow = !1;
            r.ele.setData(r.ele.data, function() {
                r.callback && r.callback(o);
            });
        },
        fail: function() {
            r.ele.data.isShow = !1, r.ele.data.tipMsg = "网络连接错误", r.ele.data.showContent = !1, 
            r.ele.setData(r.ele.data), (0, a.ShowDialog)(r.ele);
        }
    });
}, exports.goodsInfo = function(e, a) {
    wx.request({
        url: o.globalData.shopMHost + "/xcx/org/goods/info",
        data: e,
        method: "post",
        header: {
            "content-type": "application/json"
        },
        complete: function() {},
        success: function(e) {
            e.data.data, "000000" == e.data.code && a(null, e.data.data);
        },
        fail: function(e) {
            a(e);
        }
    });
}, exports.newGoodsDetailM = function(r) {
    wx.request({
        url: o.globalData.shopMHost + "/xcx/shop/goods/info",
        data: r.data,
        method: "post",
        header: {
            "content-type": "application/json"
        },
        complete: function() {
            wx.stopPullDownRefresh();
        },
        success: function(a) {
            var o = a.data.data;
            if ("000000" == a.data.code) {
                if (r.notSetShopList || (r.ele.data.shopList = [ o ]), r.ele.data.copyRightShow = !0, 
                r.ele.data.showContent = !0, r.ele.data.name = o.name, r.ele.data.thumLogo = o.thumLogo, 
                r.ele.data.orgName = o.orgName, r.ele.data.logo = o.thumLogo, r.ele.data.goodsDesc = o.goodsDesc, 
                r.ele.data.imgUrls = o.imgUrls, r.ele.data.publishTime = (0, e.formatMsgTime)(o.publishTime), 
                r.ele.data.price = parseFloat(o.price / 100).toString(), r.ele.data.cdl_price01 = r.ele.data.price.split(".")[0], 
                r.ele.data.price.split(".")[1] && (r.ele.data.cdl_price02 = r.ele.data.price.split(".")[1]), 
                r.ele.data.id = o.id, r.ele.data.img = o.imgUrls[0], r.ele.data.types = o.type, 
                r.ele.data.inventory = o.inventory, r.ele.data.saleTotal = o.saleTotal, r.ele.data.buyCarDialogInfo.id = o.id, 
                r.ele.data.buyCarDialogInfo.coverImage = o.coverImage, r.ele.data.buyCarDialogInfo.imgUrls = o.imgUrls, 
                r.ele.data.buyCarDialogInfo.price = parseFloat(o.price / 100).toString(), r.ele.data.buyCarDialogInfo.inventory = o.inventory, 
                r.ele.data.imgTextHybr = o.imgTextHybr, r.ele.data.isSpecial = o.isSpecial, r.ele.data.isInfiniteInventory = o.isInfiniteInventory, 
                2 == o.isBargain && (r.ele.data.bargainActivityId = o.bargainActivityId ? o.bargainActivityId : 0, 
                r.ele.data.bargainLaunchId = o.bargainLaunchId ? o.bargainLaunchId : 0, r.ele.data.bargainMinPrice = (0, 
                i.formatMoney)(o.bargainMinPrice), r.ele.data.currentBargainPrice = (0, i.formatMoney)(o.currentBargainPrice), 
                r.ele.data.isBargain = o.isBargain ? o.isBargain : "", r.ele.data.isLaunchBargain = o.isLaunchBargain ? o.isLaunchBargain : ""), 
                2 == o.isPintuan && (r.ele.data.isPintuan = o.isPintuan, r.ele.data.isJoinPintuan = o.isJoinPintuan, 
                r.ele.data.pintuanLimitPeopleNum = o.pintuanLimitPeopleNum, r.ele.data.pintuanOpenNum = o.pintuanOpenNum, 
                r.ele.data.pintuanLeftOpenNum = o.pintuanLeftOpenNum, r.ele.data.pintuanActivityId = o.pintuanActivityId, 
                o.joinOpentuanId && (r.ele.data.joinOpentuanId = o.joinOpentuanId), r.ele.data.pintuanPrice = (0, 
                i.formatMoney)(o.pintuanPrice), r.ele.data.reducePrice = (0, i.formatMoney)(o.price - o.pintuanPrice), 
                (0, n.default)({
                    key: "goods_detail_pintuan",
                    timeKey: "limitTime",
                    timeData: o.userPintuanDetailDtos,
                    isMyPintuan: 1,
                    fn: function(e) {
                        e && r.ele.setData({
                            userPintuanDetailDtos: e
                        });
                    }
                })), r.ele.data.isShowInventory = 2 == parseInt(o.isShowInventory), r.ele.data.isShowSale = 2 == parseInt(o.isShowSale), 
                r.ele.data.viewNum = o.viewNum, o.reserveTime ? (r.ele.data.reserveTime = o.reserveTime, 
                new Date() > new Date(o.reserveTime.replace(/-/g, "/")) && (r.ele.data.appointmentExpire = !0)) : r.ele.data.reserveTime = "", 
                o.originalPrice ? (r.ele.data.originalPrice = parseFloat(o.originalPrice / 100), 
                r.ele.data.buyCarDialogInfo.originalPrice = parseFloat(o.originalPrice / 100)) : (r.ele.data.originalPrice = "", 
                r.ele.data.buyCarDialogInfo.originalPrice = ""), r.fn && o.reserveTime) {
                    var l = (0, t.ShowTime)(a.header.Date, "Y-M-D hh:mm:ss", "-"), d = o.reserveTime;
                    r.fn(l, d, o.toEndTime);
                }
                var s = o.commodityAttr, c = [];
                if (r.ele.data.pageParams && r.ele.data.pageParams.commodityAttr) {
                    for (p = 0; p < s.length; p++) {
                        var u = s[p];
                        u.price = 0 == u.price ? 0 : parseFloat(u.price / 100), u.originalPrice ? u.originalPrice = 0 == u.originalPrice ? 0 : parseFloat(u.originalPrice / 100) : u.originalPrice = "", 
                        u.index = p, u.active = !0, c.push(u);
                    }
                    r.ele.data.pageParams.commodityAttr = c;
                }
                var g = 0;
                if (o.commodityAttr && o.commodityAttr.length > 0) for (var p = 0; p < o.commodityAttr.length; p++) 2 == o.commodityAttr[p].isInfiniteInventory ? r.ele.data.isShowInventory = !1 : r.ele.data.isShowInventory = !0, 
                o.commodityAttr[p].stock && (g += o.commodityAttr[p].stock); else 1 == o.isInfiniteInventory ? g = o.inventory : (g = o.inventory, 
                r.ele.data.isShowInventory = !1);
                r.ele.data.inventory2 = g, r.ele.data.isShow = !0, o.toEndTime && r.isLoadCountdown && (r.ele.data.toEndTime = o.toEndTime, 
                r.ele.setData(r.ele.data), (0, n.default)({
                    key: "goods_detail_limit_time",
                    timeData: o.toEndTime,
                    fn: function(e) {
                        e && (r.ele.data.timeArr = e, r.ele.setData({
                            timeArr: e
                        }));
                    }
                }));
            } else r.ele.data.tipMsg = a.data.msg, r.ele.data.isShow = !1;
            r.ele.setData(r.ele.data, function() {
                r.hideLoad || setTimeout(function() {
                    wx.hideLoading();
                }, 1e3), r.callback && r.callback(a);
            });
        },
        fail: function() {
            wx.hideLoading(), r.ele.data.isShow = !1, r.ele.data.tipMsg = "网络连接错误", r.ele.data.showContent = !1, 
            r.ele.setData(r.ele.data), (0, a.ShowDialog)(r.ele);
        }
    });
}, exports.newGoodsInfo = function(e, a) {
    wx.request({
        url: o.globalData.shopMHost + "/xcx/shop/goods/info",
        data: e,
        method: "post",
        header: {
            "content-type": "application/json"
        },
        complete: function() {},
        success: function(e) {
            e.data.data, "000000" == e.data.code ? a(null, e.data.data) : a(e.data.msg, e.data.data);
        },
        fail: function(e) {
            a(e);
        }
    });
}, exports.getVisitNum = function(e) {
    wx.request({
        url: o.globalData.shopMHost + "xcx/goods/addRead",
        method: "post",
        data: e,
        header: {
            "content-type": "application/json"
        },
        success: function(e) {},
        fail: function(e) {}
    });
};