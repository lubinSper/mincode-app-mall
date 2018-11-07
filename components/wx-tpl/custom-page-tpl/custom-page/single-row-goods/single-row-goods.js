var o = require("../../../../model/message/custom-page/custom-page-info-m"), t = function(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}(require("../../../../function/countdown/countdown")), e = (require("../../common-js/handle-goodsL-list-Info"), 
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
        isApplyNewLogic: {
            type: Boolean,
            value: !1
        },
        countKey: {
            type: Number,
            value: null
        }
    },
    data: {
        isLoad: !1,
        appointmentCopy: "",
        appointmentZeroCopy: "",
        purchaseCopy: "",
        shopIDs: [],
        shopArr: ""
    },
    methods: {
        onShow: function() {},
        ready: function() {
            var t = this;
            t.getBtnText(), console.log("single-row-goods:  shopList==================", t.data.goodsData.goodsLayoutJump);
            var n = [];
            t.data.goodsData.goodsLayoutJump.map(function(o) {
                n.push(o.productId);
            }), t.setData({
                shopIDs: n
            }, function() {
                console.log("single-row-goods:  shopIDs====", n), e.getNewOpenId(function(a) {
                    (0, o.goodsListInfo)({
                        ele: t,
                        data: {
                            orgId: e.globalData.orgId,
                            pageIndex: 1,
                            pageSize: 100,
                            openId: a,
                            productIds: n
                        },
                        fn: function(o) {
                            t.countdown(o);
                        }
                    });
                });
            });
        },
        countdown: function(o, e) {
            var n = this;
            console.log("countKey===", +n.data.countKey);
            var a = {
                key: "singleDiscover" + n.data.countKey,
                timeData: o,
                fn: function(o) {
                    n.setData({
                        shopArr: o
                    });
                }
            };
            e && (a.hideTime = e), (0, t.default)(a);
        },
        getBtnText: function(o) {
            var t = this;
            e.getBtnText(function(o) {
                o && t.setData({
                    appointmentCopy: o.appointmentCopy ? o.appointmentCopy : "立即预约",
                    appointmentZeroCopy: o.appointmentZeroCopy ? o.appointmentZeroCopy : "马上咨询",
                    purchaseCopy: o.purchaseCopy ? o.purchaseCopy : "立即购买"
                });
            });
        }
    }
});