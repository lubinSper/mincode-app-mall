var o = require("../../../../model/message/custom-page/custom-page-info-m"), t = function(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}(require("../../../../function/countdown/countdown")), e = (require("../../common-js/handle-goodsL-list-Info"), 
require("../../../../conf/conf")), a = getApp(), n = e.Conf.tagTypes;

Component({
    properties: {
        loadData: {
            type: String,
            value: "",
            observer: function(o, t) {}
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
        countKey: {
            type: Number,
            value: null
        },
        isShowTag: {
            type: Boolean,
            value: !0
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
            var t = this, e = [];
            t.data.goodsData.goodsLayoutJump && (t.data.goodsData.goodsLayoutJump.map(function(o) {
                e.push(o.productId);
            }), t.setData({
                shopIDs: e
            }, function() {
                a.getNewOpenId(function(n) {
                    (0, o.goodsListInfo)({
                        ele: t,
                        data: {
                            orgId: a.globalData.orgId,
                            pageIndex: 1,
                            pageSize: 100,
                            openId: n,
                            productIds: e
                        },
                        fn: function(o) {
                            t.countdown(o);
                        }
                    });
                });
            }));
        },
        countdown: function(o, e) {
            var a = this, n = {
                key: "scrollDiscover" + a.data.countKey,
                timeData: o,
                fn: function(o) {
                    a.setData({
                        shopArr: o
                    });
                }
            };
            e && (n.hideTime = e), (0, t.default)(n);
        }
    }
});