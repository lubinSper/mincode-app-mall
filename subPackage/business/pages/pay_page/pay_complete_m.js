function e(e, o, n) {
    var i = [], a = 0, s = !1;
    if (e.length > 0) {
        for (var r = 0; r < e.length; r++) i.push(e[r].id), o && (e[r].showOrgInfo = !0, 
        e[r].otherShop = !0, a += e[r].discountMoney, e[r].distance = e[r].distance ? t(e[r].distance) : ""), 
        2 == e[r].status ? (e[r].stateClass = "has-click", e[r].statusName = "已领取") : (e[r].stateClass = "", 
        e[r].statusName = "点击领取", s = !0), e[r].userCondition = "￥" + e[r].discountMoney, 
        1 == e[r].type ? (e[r].bgClass = "item-bg-red coupon-item-success", e[r].userDesc = "满" + e[r].minConsumeMoney + "元可用") : 2 == e[r].type ? (e[r].bgClass = "item-bg-blue coupon-item-success", 
        e[r].userDesc = "代金券") : (e[r].bgClass = "item-bg-yellow coupon-item-success", e[r].userCondition = e[r].discount + "折");
        n && n(i, a, s);
    }
    return e;
}

function t(e) {
    return e = e >= 1e3 ? (e / 1e3).toFixed(2) + "km" : e.toString().indexOf(".") > -1 ? Math.round(e.toFixed(1)) : e + "m";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.receiveCoupon = exports.getPayInfo = void 0;

var o = require("../../../../util/util"), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../components/function/countdown/countdown")), i = getApp();

exports.getPayInfo = function(t, a) {
    wx.request({
        url: i.globalData.shopMHost + "xcx/pay/recommend/getList",
        method: "post",
        data: t.data,
        header: {
            codeVersion: i.globalData.codeVersion,
            "content-type": "application/json"
        },
        complete: function() {},
        success: function(i) {
            "000000" == i.data.code && function() {
                var a = i.data.data, s = a.recommendCouponList, r = a.otherShopCouponList, u = a.recommendGoodsList, c = void 0;
                c = !(r.length > 2), t.ele.setData({
                    showMore: c
                });
                var d = {};
                if (s.length <= 0 && u.length <= 0 && (t.ele.data.hasMyShop = !1), u.length > 0) {
                    t.ele.setData({
                        hasGoodsList: !0
                    });
                    for (var l = 0; l < u.length; l++) d.id = u[0].id, d.name = u[0].name, d.coverImage = u[0].coverImage, 
                    2 == u[0].isPintuan ? (d.price = (0, o.formatMoney)(u[0].pintuanPrice), d.limitNum = u[0].pintuanTotalJoinNum, 
                    d.endTime = u[0].pintuanToEndTime, d.isPintuan = !0, d.originPrice = (0, o.formatMoney)(u[0].price), 
                    d.joinPeopleUrls = u[0].pintuanJoinAvatarUrls) : 2 == u[0].isBargain && (d.price = (0, 
                    o.formatMoney)(u[0].bargainMinPrice), d.limitNum = u[0].bargainTotalJoinNum, d.endTime = u[0].bargainToEndTime, 
                    d.isPintuan = !1, d.originPrice = (0, o.formatMoney)(u[0].price), d.joinPeopleUrls = u[0].pintuanJoinAvatarUrls), 
                    (0, n.default)({
                        key: "limitTime",
                        timeData: d.endTime,
                        fn: function(e) {
                            e && (d.timeArr = e, t.ele.setData({
                                recomGoodsList: d
                            }));
                        }
                    });
                }
                t.ele.data.myCouponList = e(s).slice(0), t.ele.data.otherCouponList = e(r, !0, function(e, o, n) {
                    t.ele.data.idArr = e, t.ele.data.totalPrice = o, t.ele.data.hasNoReceive = n;
                });
            }(), t.ele.setData(t.ele.data, function() {
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
            });
        },
        fail: function() {
            wx.hideLoading();
        }
    });
}, exports.receiveCoupon = function(e, t) {
    wx.request({
        url: i.globalData.host + "/coupon/receiveCoupon",
        method: "post",
        data: e.data,
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            e.data.data, "000000" == e.data.code && t && t(e);
        }
    });
};