var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../function/countdown/countdown")), i = getApp();

Component({
    properties: {
        appointmentCopy: {
            type: String,
            value: {}
        },
        appointmentZeroCopy: {
            type: String
        },
        purchaseCopy: {
            type: String,
            value: {}
        },
        templateId: {
            type: Number,
            value: null
        },
        refresh: {
            type: Boolean,
            value: !1,
            observer: function(e, i) {
                e && this.recommendList();
            }
        },
        hideTime: {
            type: Number,
            value: null
        },
        refreshCountdown: {
            type: Boolean,
            value: !1,
            observer: function(i, a) {
                var t = this;
                i && this.data.hideTime && (0, e.default)({
                    key: "index_recommend",
                    hideTime: this.data.hideTime,
                    timeData: this.data.recommend_list,
                    fn: function(e) {
                        e && t.setData({
                            recommend_list: e
                        }, function() {});
                    }
                });
            }
        }
    },
    data: {
        recommend_list: [],
        orgId: i.globalData.orgId
    },
    methods: {
        recommendList: function() {
            var a = this;
            wx.request({
                url: i.globalData.shopMHost + "/xcx/recommend/recommendList",
                method: "post",
                data: {
                    openId: i.globalData.openid,
                    xcxId: i.globalData.xcxId
                },
                header: {
                    "content-type": "application/json"
                },
                complete: function() {},
                success: function(i) {
                    if ("000000" == i.data.code) {
                        var t = i.data.data ? i.data.data : [];
                        t.length > 20 && t.splice(20, t.length - 20);
                        for (var r = 0; r < t.length; r++) t[r].coverImage = t[r].mainImagesUrl.length ? t[r].mainImagesUrl[0] : t[r].coverImage, 
                        2 == t[r].isPintuan && (t[r].reducePrice = (t[r].price - t[r].pintuanPrice) / 100, 
                        t[r].originalPrice = t[r].price, t[r].price = t[r].pintuanPrice), 2 == t[r].isBargain && (t[r].originalPrice = t[r].price, 
                        t[r].price = t[r].bargainMinPrice), t[r].isFreePrice = t[r].price, t[r].superMemberPrice ? (t[r].salePrice = parseFloat(t[r].price / 100), 
                        t[r].salePrice = t[r].salePrice.toString().split("."), t[r].salePrice1 = t[r].salePrice[0], 
                        t[r].salePrice2 = t[r].salePrice[1] ? "." + t[r].salePrice[1] : "", t[r].salePrice3 = t[r].salePrice1 + (".00" != t[r].salePrice2 ? t[r].salePrice2 : ""), 
                        t[r].price = parseFloat(t[r].superMemberPrice / 100).toString().split(".")) : t[r].price = parseFloat(t[r].price / 100).toString().split("."), 
                        t[r].originalPrice && 0 != t[r].originalPrice && (t[r].originalPrice = parseFloat(t[r].originalPrice / 100));
                        a.setData({
                            recommend_list: i.data.data
                        }, function() {
                            (0, e.default)({
                                key: "index_recommend",
                                timeData: i.data.data,
                                fn: function(e) {
                                    e && a.setData({
                                        recommend_list: e
                                    });
                                }
                            });
                        });
                    }
                },
                fail: function() {}
            });
        }
    }
});