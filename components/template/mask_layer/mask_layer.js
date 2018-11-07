Component({
    properties: {
        showLayer: {
            type: Boolean,
            value: !1
        },
        layerType: {
            type: Number,
            value: 99
        }
    },
    data: {},
    methods: {
        _closeLayer: function() {
            var e = this;
            this.setData({
                showLayer: !1
            }, function() {
                e.triggerEvent("closelayer");
            });
        }
    }
});