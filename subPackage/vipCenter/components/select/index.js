Component({
    properties: {
        isShowSelectDialog: {
            type: Boolean,
            value: !1,
            observer: function(e, t) {}
        },
        selectValue: {
            type: String,
            value: "",
            observer: function(e, t) {
                this.setData({
                    curIndex: e,
                    selectValue: [ e ]
                });
            }
        },
        selectList: {
            type: Array,
            value: [],
            observer: function(e, t) {
                console.log(e);
            }
        }
    },
    data: {
        years: [],
        curIndex: 0,
        value: [ 4 ]
    },
    ready: function() {},
    methods: {
        bindChange: function(e) {
            var t = this, a = e.detail.value;
            this.setData({
                curIndex: a[0]
            }, function() {
                t.setData({
                    value: [ t.data.curIndex ]
                });
            });
        },
        changeSelectValue: function() {
            this.triggerEvent("changeSelectValue", {
                value: this.data.curIndex
            }), this.closeDialog();
        },
        closeDialog: function() {
            this.triggerEvent("closeSelectDialog");
        }
    }
});