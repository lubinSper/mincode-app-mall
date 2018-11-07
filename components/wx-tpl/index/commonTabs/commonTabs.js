Component({
    properties: {
        activityType: {
            type: String,
            value: null,
            observer: function(t, a) {
                console.log(t), 1 != t && 2 != t || this.setData({
                    tabs: [ {
                        id: 1,
                        name: "综合"
                    }, {
                        id: 2,
                        name: "最热"
                    }, {
                        id: 3,
                        name: "新品"
                    } ]
                });
            }
        }
    },
    data: {
        tabs: [ {
            id: 1,
            name: "综合"
        }, {
            id: 2,
            name: "最热"
        }, {
            id: 3,
            name: "新品"
        }, {
            id: 4,
            name: "价格"
        } ],
        sort: 1,
        collation: null
    },
    methods: {
        chooseTab: function(t) {
            wx.showLoading({
                title: "加载中"
            });
            var a = t.currentTarget.dataset.sort, e = this.data.collation;
            e = 4 == a ? 1 == e ? 2 : 1 : null, this.setData({
                sort: a,
                collation: e
            }), this.triggerEvent("chooseTab", {
                collation: e,
                sort: a
            });
        }
    }
});