var t = getApp();

Component({
    properties: {
        item: {
            type: Object,
            value: {}
        },
        page: {
            type: String,
            value: ""
        },
        isFirst: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    ready: function() {
        this.setData({
            xcxType: t.globalData.xcxType
        });
    },
    methods: {
        jumpPin: function(e) {
            t.submitFormIdM(e.detail.formId, t.globalData.orgId);
        }
    }
});