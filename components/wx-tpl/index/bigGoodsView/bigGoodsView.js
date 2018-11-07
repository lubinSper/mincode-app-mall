var e = require("../../../conf/conf").Conf.tagTypes, t = getApp();

Component({
    properties: {
        item: {
            type: Object,
            value: {},
            observer: function(e) {}
        },
        template: {
            type: Number,
            value: !1
        },
        isShowTag: {
            type: Boolean,
            value: !0
        },
        isHideHot: {
            type: Boolean
        },
        templateId: {
            type: Number,
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
    methods: {}
});