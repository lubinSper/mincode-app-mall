var o = require("../../../../model/message/custom-page/custom-page-info-m"), e = function(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}(require("../../../../function/countdown/countdown")), t = (require("../../common-js/handle-goodsL-list-Info"), 
require("../../../../conf/conf")), a = getApp(), n = t.Conf.tagTypes;

Component({
    behaviors: [],
    properties: {
        loadData: {
            type: String,
            value: "",
            observer: function(o, e) {}
        },
        goodsData: {
            type: Object,
            value: null,
            observer: function(o, e) {
                var t = this;
                o && !t.data.isLoad && t.setData({
                    isLoad: !0
                }, function() {
                    t.ready(o);
                });
            }
        },
        isShowTag: {
            type: Boolean,
            value: !0
        },
        countKey: {
            type: Number,
            value: null
        }
    },
    data: {
        isLoad: !1,
        shopIDs: [],
        shopArr: "",
        tagTypes: n
    },
    methods: {
        onShow: function() {},
        ready: function() {
            var e = this, t = [];
            e.data.goodsData.goodsLayoutJump && (e.data.goodsData.goodsLayoutJump.map(function(o) {
                t.push(o.productId);
            }), e.setData({
                shopIDs: t
            }, function() {
                a.getNewOpenId(function(n) {
                    (0, o.goodsListInfo)({
                        ele: e,
                        data: {
                            orgId: a.globalData.orgId,
                            pageIndex: 1,
                            pageSize: 100,
                            openId: n,
                            productIds: t
                        },
                        fn: function(o) {
                            e.countdown(o);
                        }
                    });
                });
            }));
        },
        countdown: function(o, t) {
            var a = this, n = {
                key: "customWaterfallDiscover" + a.data.countKey,
                timeData: o,
                fn: function(o) {
                    a.setData({
                        shopArr: o
                    });
                }
            };
            t && (n.hideTime = t), (0, e.default)(n);
        },
        jump: function(o) {
            console.log("e====", o);
            var e = o.currentTarget.dataset.id;
            wx.navigateTo({
                url: "/subPackage/discover/pages/" + (3 == a.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + e,
                success: function() {
                    console.log(1111);
                },
                fail: function() {
                    console.log(2222);
                }
            });
        }
    }
});