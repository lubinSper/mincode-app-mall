var e = require("../../../conf/conf").Conf.tagTypes, a = getApp();

Component({
    properties: {
        page: {
            type: String,
            value: ""
        },
        item: {
            type: Object,
            value: {}
        },
        hasBuyCar: {
            type: Boolean,
            value: !1
        },
        isShowTag: {
            type: Boolean,
            value: !0
        },
        isApplyNewLogic: {
            type: Boolean,
            value: !1
        },
        isindex: {
            type: Number,
            value: !1
        },
        alia: {
            type: Number,
            value: null
        }
    },
    data: {
        tagTypes: e
    },
    ready: function() {
        this.setData({
            xcxType: a.globalData.xcxType
        });
    },
    methods: {
        addCar: function(e) {
            var a = e.currentTarget.dataset;
            this.triggerEvent("addcar", a);
        }
    }
});