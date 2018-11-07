var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../function/countdown/countdown")), a = require("../../../conf/conf"), t = require("../../../../util/util"), i = getApp(), o = a.Conf.tagTypes;

Component({
    properties: {
        appointmentCopy: {
            type: String,
            value: {}
        },
        purchaseCopy: {
            type: String,
            value: {}
        },
        alias: {
            type: String,
            value: null,
            observer: function(e, a) {
                e && this.setData({
                    alias: e
                });
            }
        },
        name: {
            type: String,
            value: ""
        },
        templateId: {
            type: Number,
            value: null
        },
        maxLen: {
            type: Number,
            value: null
        },
        isUser: {
            type: Boolean,
            value: !1
        },
        refresh: {
            type: Boolean,
            value: !1,
            observer: function(e, a) {
                var t = this;
                e && (+this.data.alias && !this.data.isUser ? this.setData({
                    categoryId: +this.data.alias
                }, function() {
                    t.getGoods();
                }) : this.getGoods());
            }
        },
        hideTime: {
            type: Number,
            value: null
        },
        countKey: {
            type: Number,
            value: null
        },
        refreshCountdown: {
            type: Boolean,
            value: !1,
            observer: function(a, t) {
                var i = this;
                a && this.data.hideTime && (console.log("this.data.countKey==" + this.data.countKey), 
                (0, e.default)({
                    key: "index_custom_" + this.data.alias + this.data.countKey,
                    hideTime: this.data.hideTime,
                    timeData: this.data.goodsList,
                    fn: function(e) {
                        e && i.setData({
                            goodsList: e
                        });
                    }
                }));
            }
        }
    },
    ready: function() {},
    data: {
        goodsList: [],
        orgId: i.globalData.orgId,
        categoryId: "",
        alias: ""
    },
    methods: {
        getGoods: function() {
            var a = this, n = this, r = this.data, s = r.alias, c = r.categoryId, l = {
                openId: i.globalData.openid,
                orgId: i.globalData.orgId,
                pageIndex: 1,
                pageSize: this.data.maxLen
            };
            c ? l.categoryId = c : "bargain" == s ? (l.activityType = 1, l.sort = 6) : "pintuan" == s ? (l.activityType = 2, 
            l.sort = 5) : (console.log("alias===" + s), console.log("isUser====" + n.data.isUser), 
            n.data.isUser ? l.tagType = s : l.tagType = o.indexOf(s) + 1), wx.request({
                url: i.globalData.shopMHost + "/xcx/org/new/goods/list",
                method: "post",
                data: l,
                header: {
                    "content-type": "application/json"
                },
                complete: function() {},
                success: function(i) {
                    var o = i.data.data ? i.data.data : [];
                    o.forEach(function(e) {
                        e.coverImage = e.mainImagesUrl.length ? e.mainImagesUrl[0] : e.coverImage, 2 == e.isPintuan && (e.reducePrice = (0, 
                        t.formatMoney)(e.price - e.pintuanPrice), e.originalPrice = e.price, e.price = e.pintuanPrice), 
                        2 == e.isBargain && (e.originalPrice = e.price, e.price = e.bargainMinPrice), e.superMemberPrice ? (e.salePrice = (0, 
                        t.formatMoney)(e.price).split("."), e.salePrice1 = e.salePrice[0], e.salePrice2 = e.salePrice[1] ? "." + e.salePrice[1] : "", 
                        e.salePrice3 = e.salePrice1 + (".00" != e.salePrice2 ? e.salePrice2 : ""), e.price = (0, 
                        t.formatMoney)(e.superMemberPrice).split(".")) : e.price = (0, t.formatMoney)(e.price).split("."), 
                        e.originalPrice = (0, t.formatMoney)(e.originalPrice);
                    }), n.setData({
                        goodsList: o
                    }, function() {
                        (0, e.default)({
                            key: "index_custom_" + a.data.alias + a.data.countKey,
                            timeData: o,
                            fn: function(e) {
                                e && n.setData({
                                    goodsList: e
                                }, function() {});
                            }
                        });
                    });
                },
                fail: function(e) {
                    console.log(e, "-------", a.data);
                }
            });
        },
        getBtnText: function(e) {
            var a = this;
            i.getBtnText(function(e) {
                e && a.setData({
                    appointmentCopy: e.appointmentCopy ? e.appointmentCopy : "立即预约",
                    appointmentZeroCopy: e.appointmentZeroCopy ? e.appointmentZeroCopy : "马上咨询",
                    purchaseCopy: e.purchaseCopy ? e.purchaseCopy : "立即购买"
                });
            });
        },
        toCategorylist: function() {
            var e = this.data, a = e.categoryId, t = e.alias, i = e.name, n = "";
            n = "bargain" == t ? "/subPackage/index/pages/category-list/category-list?iconName=" + i + "&activityType=1" : "pintuan" == t ? "/subPackage/index/pages/category-list/category-list?iconName=" + i + "&activityType=2" : "/subPackage/index/pages/category-list/category-list?categoryId=" + a + "&&iconName=" + i + "&&tagType=" + ("" == a ? o.indexOf(t) + 1 : ""), 
            wx.navigateTo({
                url: n
            });
        }
    }
});