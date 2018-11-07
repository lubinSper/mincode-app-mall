var o = function(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}(require("../../../../function/countdown/countdown")), t = require("../../../../model/message/custom-page/custom-page-info-m"), e = (require("../../common-js/handle-goodsL-list-Info"), 
getApp());

Component({
    properties: {
        loadData: {
            type: String,
            value: "",
            observer: function(o, t) {}
        },
        hasBuyCar: {
            type: Boolean,
            value: !0
        },
        isShowTag: {
            type: Boolean,
            value: !0
        },
        buyCarStyle: {
            type: String,
            value: "button"
        },
        shopList: {
            type: Object,
            value: ""
        },
        goodsData: {
            type: Object,
            value: null,
            observer: function(o, t) {
                var e = this;
                o && !e.data.isLoad && e.setData({
                    isLoad: !0
                }, function() {
                    e.ready(o);
                });
            }
        },
        alias: {
            type: Number,
            value: null
        },
        countKey: {
            type: Number,
            value: null
        }
    },
    data: {
        isLoad: !1,
        shopIDs: [],
        shopArr: ""
    },
    methods: {
        onShow: function() {},
        ready: function() {
            var o = this, a = [];
            o.data.goodsData.goodsLayoutJump && (o.data.goodsData.goodsLayoutJump.map(function(o) {
                a.push(o.productId);
            }), o.setData({
                shopIDs: a
            }, function() {
                e.getNewOpenId(function(n) {
                    (0, t.goodsListInfo)({
                        ele: o,
                        data: {
                            orgId: e.globalData.orgId,
                            pageIndex: 1,
                            pageSize: 100,
                            openId: n,
                            productIds: a
                        },
                        fn: function(t) {
                            o.countdown(t);
                        }
                    });
                });
            }));
        },
        countdown: function(t, e) {
            var a = this, n = {
                key: "doubleDiscover" + a.data.countKey,
                timeData: t,
                fn: function(o) {
                    a.setData({
                        shopArr: o
                    });
                }
            };
            e && (n.hideTime = e), (0, o.default)(n);
        }
    }
});