var t = getApp();

Component({
    properties: {
        item: {
            type: Object,
            value: {}
        }
    },
    data: {},
    ready: function() {
        this.setData({
            xcxType: t.globalData.xcxType
        });
    },
    methods: {}
});