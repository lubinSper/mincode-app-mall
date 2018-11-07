var t = getApp();

Component({
    properties: {
        page: {
            type: String,
            value: ""
        },
        refresh: {
            type: Boolean,
            value: !1,
            observer: function(t, e) {
                t && this.getData();
            }
        },
        textShow: {
            type: Boolean,
            value: !1,
            observer: function(t, e) {
                var a = this;
                if (console.log("改值触发-----", t), !0 === t && !1 === e) {
                    var n = wx.createAnimation({
                        duration: 300,
                        timingFunction: "ease"
                    });
                    n.translateX(-15), n.opacity(1).step({
                        duration: 300
                    }), this.setData({
                        textShow: !0
                    }, function() {
                        a.setData({
                            animationData1: n.export()
                        }), setTimeout(function() {
                            a.hideText();
                        }, 3e3);
                    });
                }
            }
        }
    },
    data: {
        isOpen: !1,
        phone: "",
        animationData1: null
    },
    ready: function() {
        this.getData();
    },
    methods: {
        hideText: function() {
            var t = wx.createAnimation({
                duration: 300,
                timingFunction: "ease"
            });
            t.translateX(15), t.opacity(0).step({
                duration: 300
            }), this.setData({
                animationData1: t.export()
            });
        },
        getData: function() {
            var e = this;
            wx.request({
                url: t.globalData.shopMHost + "xcx/org/greet/findByOrgId",
                data: {
                    orgId: t.globalData.orgId
                },
                method: "POST",
                header: {
                    "content-type": "application/json"
                },
                success: function(a) {
                    var n = a.data.data;
                    n && 2 == n.isOpen ? (e.setData({
                        isOpen: !0,
                        headImg: n.headImg ? n.headImg : "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/shop-multi/kefu.png",
                        content: n.content,
                        headline: n.headline
                    }), t.getOrgInfo(function(t, a) {
                        var n = a.phone;
                        e.setData({
                            phone: n
                        });
                    })) : e.setData({
                        isOpen: !1
                    });
                },
                fail: function() {}
            });
        },
        makePhoneCall: function() {
            wx.makePhoneCall({
                phoneNumber: this.data.phone
            });
        }
    }
});