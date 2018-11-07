var t = getApp();

Component({
    properties: {},
    data: {
        list: [],
        showModalStatus: !1
    },
    attached: function() {
        wx.getStorageSync("coupin_modal") || this.setData({
            showModalStatus: !0
        });
    },
    ready: function() {
        this.data.showModalStatus && this.getCouponList();
    },
    methods: {
        close: function(a) {
            t.submitFormIdM(a.detail.formId, t.globalData.orgId), this.setData({
                showModalStatus: !1
            });
        },
        getCouponList: function() {
            var a = this;
            t.getNewOpenId(function(o) {
                wx.request({
                    url: t.globalData.host + "coupon/nearby/orgCouponList",
                    method: "post",
                    data: {
                        openId: t.globalData.openid,
                        orgId: t.globalData.orgId,
                        page: getCurrentPages()[getCurrentPages().length - 1].route,
                        pageIndex: 1,
                        pageSize: 4
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    complete: function() {
                        wx.hideLoading();
                    },
                    success: function(t) {
                        if (t.data.data) {
                            var o = t.data.data.data;
                            o && a.setData({
                                list: o
                            }, function() {
                                t.data.data.data && t.data.data.data.length > 0 && wx.setStorage({
                                    key: "coupin_modal",
                                    data: !0
                                });
                            });
                        }
                    },
                    fail: function() {
                        this.setData({
                            showModalStatus: !1
                        });
                    }
                });
            });
        },
        clickReceive: function(a) {
            var o = this;
            t.userInfoMiddleWare(!0).then(function(e) {
                if (e.isGetUserInfo) {
                    t.submitFormIdM(a.detail.formId, t.globalData.orgId);
                    var n = a.currentTarget.dataset.index, s = o.data.list, i = s[n];
                    1 == i.status && t.getNewOpenId(function(a) {
                        var e = {
                            openId: a,
                            id: i.id
                        };
                        wx.request({
                            url: t.globalData.host + "coupon/receiveCoupon",
                            method: "post",
                            data: e,
                            header: {
                                "content-type": "application/json"
                            },
                            complete: function() {},
                            success: function(t) {
                                s[n].status = 2, s[n].count = +s[n].count + 1, o.setData({
                                    list: s
                                });
                            }
                        });
                    });
                } else wx.eventBus.trigger("showOnAuthShow");
            });
        },
        toMoreCoupon: function() {
            this.setData({
                showModalStatus: !1
            }), wx.navigateTo({
                url: "/subPackage/business/pages/more_coupon/more_coupon?orgId=" + t.globalData.orgId
            });
        }
    }
});