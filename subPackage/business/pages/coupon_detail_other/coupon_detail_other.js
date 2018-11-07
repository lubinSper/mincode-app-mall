var o = require("coupon_detail_m"), e = getApp();

Page({
    data: {
        id: "",
        openId: "",
        orgId: "",
        couponId: "",
        channel: "",
        showReturnIndexBtn: !1,
        couponInfo: {},
        orgInfo: {},
        showAvatarBox: !1,
        locationurlz: "",
        shopQrCode: !1,
        couponQrCode: !1,
        onAuthShow: "",
        onAuthHide: "",
        authParams: {},
        showW: "none",
        hideCoupEnter: !1
    },
    onLoad: function(o) {
        var t = this;
        wx.showLoading({
            title: "加载中"
        }), t.setData({
            id: o.id,
            couponId: o.couponId,
            channel: o.channel,
            hideCoupEnter: o.hideCoupEnter,
            locationurlz: e.globalData.shopMHost
        }), o.action && "goHome" == o.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        }), t.getCouponDetailInfo(function(o) {
            t.getOrgInfo(o);
        });
    },
    onShow: function() {
        wx.getSetting({
            success: function(o) {
                if (o.authSetting["scope.userInfo"]) e.globalData.userInfo, new Date().getTime(); else {
                    var t = new Date().getTime();
                    that.setData({
                        onAuthShow: t,
                        authParams: {
                            isCallBackHandle: !0
                        }
                    });
                }
            }
        });
    },
    backHandle: function(o) {},
    getOrgInfo: function(o) {
        var t = this;
        wx.request({
            url: e.globalData.host + "coupon/org/info",
            method: "post",
            data: {
                orgId: o
            },
            header: {
                codeVersion: e.globalData.codeVersion,
                "content-type": "application/json"
            },
            success: function(o) {
                t.setData({
                    orgInfo: o.data.data
                }), wx.hideLoading();
            },
            fail: function(o) {
                wx.hideLoading();
            }
        });
    },
    onPullDownRefresh: function() {
        var o = this;
        o.getCouponDetailInfo(function(e) {
            o.getOrgInfo(e);
        });
    },
    getCouponDetailInfo: function(t) {
        var a = this;
        e.getNewOpenId(function(e) {
            a.setData({
                openId: e
            });
            var n = {
                couponId: a.data.couponId,
                openId: e
            };
            (0, o.getCouponDetail)({
                ele: a,
                data: n
            }, function() {
                "block" == a.data.showW && setTimeout(function() {
                    wx.reLaunch({
                        url: "/page/message/index"
                    });
                }, 2e3), t && t(a.data.couponInfo.orgId);
            });
        });
    },
    showAvatar: function() {
        var o = this;
        o.setData({
            showAvatarBox: !o.data.showAvatarBox
        });
    },
    makePhoneCall: function(o) {
        console.log("333333333333");
        var e = o.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    getOrgCode: function(o) {
        this.setData({
            shopQrCode: !0
        });
    },
    getCoupCode: function(o) {
        this.setData({
            couponQrCode: !0
        });
    },
    hideMask: function(o) {
        this.setData({
            shopQrCode: !1,
            couponQrCode: !1
        });
    },
    recogCode: function(o) {
        console.log(o.currentTarget.dataset.src);
        var e = o.currentTarget.dataset.src;
        wx.previewImage({
            current: e,
            urls: [ e ]
        });
    },
    handleBtn: function() {
        var o = this, e = o.data.couponInfo;
        1 != e.isUse && (1 == e.isReceive ? o.clickReceiveCoupon() : o.setData({
            couponQrCode: !0
        }));
    },
    clickReceiveCoupon: function() {
        var o = this, t = o.data.couponInfo, a = {
            openId: o.data.openId,
            id: t.id
        };
        wx.request({
            url: e.globalData.host + "coupon/receiveCoupon",
            method: "post",
            data: a,
            header: {
                codeVersion: e.globalData.codeVersion,
                "content-type": "application/json"
            },
            success: function(e) {
                wx.showToast({
                    title: "领取成功"
                });
                var a = e.data.data;
                a && (t.isReceive = 2, t.btnClass = "query-code", t.statusName = "查看券码", t.couponCode = a.couponCode, 
                t.id = a.id, o.setData({
                    couponInfo: t
                })), o.getCouponDetailInfo();
            }
        }), wx.setStorage({
            key: "couponId",
            data: t.couponId
        });
    },
    goMyCouponList: function() {
        wx.navigateTo({
            url: "/subPackage/business/pages/coupon_list/coupon_list"
        });
    },
    openMap: function() {
        var o = this.data.orgInfo;
        wx.openLocation({
            latitude: o.lat,
            longitude: o.lng,
            name: o.orgName,
            address: o.address,
            scale: 28
        });
    },
    previewGoodsImage: function(o) {
        var e = [];
        this.data.couponInfo.imgTextHybr.map(function(o) {
            o.img && e.push(o.img);
        }), wx.previewImage({
            current: o.currentTarget.dataset.src,
            urls: e
        });
    },
    videoPlay: function(o) {
        this.setData({
            curr_id: o.currentTarget.dataset.index + 1
        }), wx.createVideoContext("video-" + o.currentTarget.dataset.index).play();
    }
});