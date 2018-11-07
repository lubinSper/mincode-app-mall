var o = getApp();

Component({
    properties: {
        couponList: {
            type: Array,
            value: [],
            observer: function(o, e) {
                o && (console.log("~~~~~~~~~~~~~~~~~~~~~"), console.log(o));
            }
        },
        showShopInfo: {
            type: Boolean,
            value: !1,
            observer: function(o, e) {}
        },
        fromHome: {
            type: Boolean,
            value: !1,
            observer: function(o, e) {}
        }
    },
    data: {
        showShopInfo: !1,
        couponList: [],
        orgId: o.globalData.orgId
    },
    methods: {
        jumpDetail: function(o) {
            var e = o.currentTarget.dataset;
            wx.navigateTo({
                url: e.jumpUrl
            });
        },
        receiveCoupon: function(e) {
            var t = this;
            o.userInfoMiddleWare(!0).then(function(o) {
                o.isGetUserInfo ? t.triggerEvent("receivecoupon", e) : wx.eventBus.trigger("showOnAuthShow");
            });
        },
        stopJump: function(o) {
            console.log("stopJump ----");
        }
    }
});