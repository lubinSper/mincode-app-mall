function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../model/limitShopping/limitShopping")), i = e(require("../../../function/countdown/countdown")), a = getApp();

Component({
    properties: {
        refresh: {
            type: Boolean,
            value: !1,
            observer: function(e, t) {
                e && this.getLimitGoods();
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
            observer: function(e, t) {
                var a = this;
                e && this.data.hideTime && (0, i.default)({
                    key: "index_limit" + this.data.countKey,
                    hideTime: this.data.hideTime,
                    timeData: this.data.limitArr,
                    fn: function(e) {
                        e && a.setData({
                            limitArr: e
                        });
                    }
                });
            }
        },
        name: {
            type: String,
            value: ""
        },
        maxLen: {
            type: Number,
            value: null
        },
        isUser: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        limitArr: []
    },
    methods: {
        getLimitGoods: function() {
            var e = this, n = {
                pageIndex: 1,
                pageSize: this.data.maxLen && this.data.maxLen || 6,
                sort: 1,
                orgId: a.globalData.orgId
            };
            (0, t.default)(n, function(t, a) {
                t || e.setData({
                    limitArr: a
                }, function() {
                    console.log("${pageKey}${this.data.countKey}index_limit" + e.data.countKey), (0, 
                    i.default)({
                        key: "index_limit" + e.data.countKey,
                        timeData: a,
                        fn: function(t) {
                            t && e.setData({
                                limitArr: t
                            });
                        }
                    });
                });
            });
        }
    }
});