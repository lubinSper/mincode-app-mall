Component({
    properties: {
        arrList: {
            type: Array,
            value: [],
            observer: function(e, r) {}
        },
        status: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        jumpFunc: function(e) {
            var r = e.currentTarget.dataset.id;
            wx.navigateTo({
                url: "/subPackage/my/pages/order_detail/order_detail?orderId=" + r
            });
        }
    }
});