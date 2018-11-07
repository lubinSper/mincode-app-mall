Component({
    properties: {
        title: {
            type: String,
            value: "",
            observer: function(t, e) {
                "" != t && this.setData({
                    title: t
                });
            }
        }
    },
    data: {
        title: ""
    },
    methods: {}
});