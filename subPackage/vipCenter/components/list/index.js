Component({
    properties: {
        recordList: {
            type: Array,
            value: [],
            observer: function(e, o) {}
        },
        isShowViewMore: {
            type: Boolean,
            value: !1,
            observer: function(e, o) {}
        }
    },
    methods: {
        viewMore: function() {
            wx.navigateTo({
                url: "/subPackage/vipCenter/pages/record/index"
            });
        }
    }
});