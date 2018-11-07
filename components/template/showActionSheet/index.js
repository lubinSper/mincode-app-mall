Component({
    properties: {
        isShowActionSheet: {
            type: Boolean,
            value: !1,
            observer: function(t, a) {
                !1 === t ? this.closePayWayDialog() : this.showPayWayDialog();
            }
        },
        payList: {
            type: Array,
            value: [ {
                name: "确定",
                key: "",
                title: "",
                icon: "",
                use: !0
            } ]
        }
    },
    data: {
        animationData1: null,
        animationData2: null
    },
    methods: {
        showPayWayDialog: function() {
            var t = this, a = wx.createAnimation({
                duration: 300,
                timingFunction: "ease"
            }), e = wx.createAnimation({
                duration: 300,
                timingFunction: "ease"
            });
            a.translateY(0).step({
                duration: 50
            }), a.opacity(1).step(), e.translateY(0).step(), e.opacity(1).step(), this.setData({
                isShowActionSheet: !0
            }, function() {
                t.setData({
                    animationData1: a.export(),
                    animationData2: e.export()
                });
            });
        },
        closePayWayDialog: function() {
            var t = wx.createAnimation({
                duration: 300,
                timingFunction: "ease"
            }), a = wx.createAnimation({
                duration: 300,
                timingFunction: "ease"
            });
            t.opacity(0).step(), t.translateY(wx.getSystemInfoSync().windowHeight).step(), a.translateY(wx.getSystemInfoSync().windowHeight).step(), 
            this.setData({
                animationData1: t.export(),
                animationData2: a.export()
            }, function() {
                var t = this;
                setTimeout(function() {
                    t.setData({
                        isShowActionSheet: !1
                    });
                }, 200);
            });
        },
        checkSheet: function(t) {
            console.log("选择选项------", t);
            var a = t.currentTarget.dataset.key, e = t.currentTarget.dataset.index;
            this.triggerEvent("checkSheet", {
                key: a,
                index: e
            });
        }
    }
});