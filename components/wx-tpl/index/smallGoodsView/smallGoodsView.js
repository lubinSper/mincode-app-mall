var e = getApp();

Component({
    properties: {
        item: {
            type: Object,
            value: {}
        },
        isLast: {
            type: Boolean,
            value: !1
        },
        isUser: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    ready: function() {
        this.setData({
            xcxType: e.globalData.xcxType
        });
    },
    methods: {}
});