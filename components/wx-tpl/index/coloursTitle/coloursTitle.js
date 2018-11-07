Component({
    properties: {
        type: {
            type: Number,
            value: 1
        },
        title: {
            type: String,
            value: "优惠券"
        },
        isSegmentationTitle: {
            type: Boolean,
            value: !0
        },
        showAll: {
            type: Boolean,
            value: !1
        },
        hasLine: {
            type: Boolean,
            value: !1
        },
        url: {
            type: String,
            value: null
        }
    },
    data: {
        titleArr: []
    },
    methods: {
        openAll: function() {
            this.data.url ? wx.navigateTo({
                url: this.data.url
            }) : this.triggerEvent("openall");
        }
    }
});