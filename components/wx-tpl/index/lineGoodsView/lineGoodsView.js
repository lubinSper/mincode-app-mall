var e = require("../../../conf/conf").Conf.tagTypes, t = getApp();

Component({
    properties: {
        item: {
            type: Object,
            value: {}
        },
        page: {
            type: String,
            value: "custom"
        },
        isLast: {
            type: Boolean,
            value: !1
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
        appointmentCopy: {
            type: String
        },
        appointmentZeroCopy: {
            type: String
        },
        purchaseCopy: {
            type: String,
            value: {}
        },
        isApplyNewLogic: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        tagTypes: e
    },
    ready: function() {
        this.setData({
            xcxType: t.globalData.xcxType
        });
    },
    methods: {
        addCar: function(e) {
            var t = e.currentTarget.dataset;
            this.triggerEvent("addcar", t);
        }
    }
});