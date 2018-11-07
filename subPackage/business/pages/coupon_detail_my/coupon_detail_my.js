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
        var n = this;
        wx.showLoading({
            title: "加载中"
        }), n.setData({
            id: o.id,
            couponId: o.couponId,
            channel: o.channel,
            hideCoupEnter: o.hideCoupEnter,
            locationurlz: e.globalData.shopMHost
        }), o.action && "goHome" == o.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        }), n.getCouponDetailInfo(function(o) {
            n.getOrgInfo(o);
        });
    },
    onShow: function() {},
    backHandle: function(o) {},
    getOrgInfo: function(o) {
        var n = this;
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
                n.setData({
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
    getCouponDetailInfo: function(n) {
        var t = this;
        e.getNewOpenId(function(e) {
            t.setData({
                openId: e
            });
            var a = {
                couponId: t.data.couponId,
                openId: e
            };
            (0, o.getCouponDetail)({
                ele: t,
                data: a
            }, function() {
                "block" == t.data.showW && setTimeout(function() {
                    wx.reLaunch({
                        url: "/page/message/index"
                    });
                }, 2e3), n && n(t.data.couponInfo.orgId);
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
        var o = this;
        e.userInfoMiddleWare(!0).then(function(e) {
            if (e.isGetUserInfo) {
                var n = o.data.couponInfo;
                if (1 == n.isUse) return;
                1 == n.isReceive ? o.clickReceiveCoupon() : o.setData({
                    couponQrCode: !0
                });
            } else wx.eventBus.trigger("showOnAuthShow");
        });
    },
    clickReceiveCoupon: function() {
        var o = this, n = o.data.couponInfo, t = {
            openId: o.data.openId,
            id: n.id
        };
        wx.request({
            url: e.globalData.host + "coupon/receiveCoupon",
            method: "post",
            data: t,
            header: {
                codeVersion: e.globalData.codeVersion,
                "content-type": "application/json"
            },
            success: function(e) {
                wx.showToast({
                    title: "领取成功"
                });
                var t = e.data.data;
                t && (n.isReceive = 2, n.btnClass = "query-code", n.statusName = "查看券码", n.couponCode = t.couponCode, 
                n.id = t.id, o.setData({
                    couponInfo: n
                })), o.getCouponDetailInfo();
            }
        }), wx.setStorage({
            key: "couponId",
            data: n.couponId
        });
    },
    onShareAppMessage: function() {
        var o = this, n = e.globalData.nickName + "给你发了一张" + o.data.couponInfo.userDesc + "的优惠券，快来看看！", t = o.data.couponInfo, a = getCurrentPages(), i = e.isHasTabByTitle({
            url: a[a.length - 1].route
        }), c = "", s = "/subPackage/business/pages/coupon_detail_my/coupon_detail_my?action=goHome&id=" + t.id + "&couponId=" + t.couponId + "&channel=coupon_detail&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id);
        return i.check && (s = "/subPackage/business/pages/coupon_detail_my/coupon_detail_my?id=" + t.id + "&couponId=" + t.couponId + "&channel=coupon_detail&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id)), 
        c = 1 == o.data.couponInfo.isReceive ? "" : "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/share-avatar.png", 
        {
            title: n,
            imageUrl: c,
            path: s,
            success: function(o) {
                e.saveShareInfo(s, t.couponPkId, e.globalData.orgId);
            },
            fail: function(o) {}
        };
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