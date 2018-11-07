var t = require("../../../../components/template/show_dialog/show_dialog"), e = getApp();

Page({
    data: {
        address: "",
        businessHours: "",
        description: "",
        extInfo: [],
        logo: "",
        lat: null,
        lng: null,
        orgImages: [],
        orgName: "",
        phone: "",
        distance: "",
        orgId: 0,
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        showReturnIndexBtn: !1,
        orgOnlyImages: [],
        defaultPoster: ""
    },
    onLoad: function(t) {
        setTimeout(function() {
            t.iconName && wx.setNavigationBarTitle({
                title: t.iconName
            });
        }, 1e3), wx.showLoading({
            title: "加载中"
        });
        var a = this;
        a.data.orgId = e.globalData.orgId, a.setData(a.data), e.getTabBarTitle(), a.storeDetail({
            orgId: e.globalData.orgId
        }), wx.getLocation({
            type: "wgs84",
            success: function(t) {
                var o = {
                    lat: t.latitude,
                    lng: t.longitude,
                    xcxId: e.globalData.xcxId
                };
                a.getDistance(o);
            }
        }), a.storeIntro(), t.action && "goHome" == t.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    onShareAppMessage: function() {
        var t = this, a = getCurrentPages(), o = e.isHasTabByTitle({
            url: a[a.length - 1].route
        });
        console.log("tempJson=", o);
        var n = "/page/my/pages/link_us/link_us_tab?action=goHome&orgId=" + e.globalData.orgId + "&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id);
        return o.check && (n = "/page/my/pages/link_us/link_us_tab?memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id)), 
        console.log("tempShareUrl=", n), {
            title: e.globalData.nickName + "给你推荐了「" + t.data.orgName + "」",
            path: n,
            imageUrl: t.data.img
        };
    },
    storeDetail: function(a) {
        var o = this;
        wx.request({
            url: e.globalData.host + "/coupon/org/info",
            method: "post",
            data: a,
            header: {
                "content-type": "application/json"
            },
            complete: function() {
                wx.stopPullDownRefresh();
            },
            success: function(t) {
                if (t.data) {
                    var e = t.data.data;
                    if (o.data.address = e.address, o.data.businessHours = e.businessHours, o.data.description = e.description ? e.description : "", 
                    e.orgFacilities) {
                        for (var a = e.orgFacilities.split(","), n = 0; n < a.length; n++) {
                            var i = a[n];
                            console.log(i), "1" == i ? o.data.extInfo.push("Wi-Fi") : "2" == i ? o.data.extInfo.push("停车位") : "3" == i ? o.data.extInfo.push("支付宝支付") : "4" == i && o.data.extInfo.push("微信支付");
                        }
                        console.log(o.data.extInfo);
                    }
                    o.data.logo = e.logo, o.data.lat = e.lat, o.data.lng = e.lng, o.data.orgName = e.orgName, 
                    o.data.phone = e.phone, o.setData(o.data), console.log("纬度为：", o.data.lat);
                }
            },
            fail: function() {
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3), e.globalData.showErrorAlert && (0, t.ShowDialog)(o);
            }
        });
    },
    getDistance: function(a) {
        var o = this;
        wx.request({
            url: e.globalData.shopMHost + "/xcx/base/getDistance",
            method: "post",
            data: a,
            complete: function() {
                wx.stopPullDownRefresh(), wx.hideLoading();
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                if (t.data.data) {
                    var e = t.data.data;
                    o.data.distance = e > 1e3 ? "距离我 " + (e / 1e3).toFixed(1) + "km" : e > 1e4 ? "距离我 大于10km" : "距离我 " + (e > 0 ? e : "-k") + "m";
                } else o.data.distance = "";
                o.setData(o.data);
            },
            fail: function() {
                e.globalData.showErrorAlert && (0, t.ShowDialog)(o);
            }
        });
    },
    storeIntro: function() {
        var a = this;
        wx.request({
            url: e.globalData.host + "/coupon/org/introduce/newList",
            method: "post",
            data: {
                orgId: a.data.orgId
            },
            header: {
                "content-type": "application/json"
            },
            complete: function() {
                wx.stopPullDownRefresh();
            },
            success: function(t) {
                if (t.data.data) {
                    var e = t.data.data, o = [];
                    e.map(function(t, e) {
                        if (5 == t.type) {
                            var a = parseInt(t.divPageModuleTextDto.size);
                            t.divPageModuleTextDto.size = a + "rpx";
                            var n = 0;
                            switch (a) {
                              case 40:
                              case 36:
                              case 30:
                                n = "line-height: 46rpx;";
                                break;

                              case 26:
                              case 24:
                              default:
                                n = "line-height: 40rpx;";
                            }
                            t.divPageModuleTextDto.fontStyle ? t.divPageModuleTextDto.style = t.divPageModuleTextDto.fontStyle + ";font-size:" + a + "rpx;text-align:" + t.divPageModuleTextDto.align + ";color:" + t.divPageModuleTextDto.color + ";" + n : t.divPageModuleTextDto.style = "font-size:" + a + "rpx;text-align:" + t.divPageModuleTextDto.align + ";color:" + t.divPageModuleTextDto.color + ";" + n;
                        } else if (6 == t.type) 1 == t.divPageModuleButtonDto.style ? t.divPageModuleButtonDto.style = "background:" + t.divPageModuleButtonDto.color + ";color:#ffffff;border:none;" : t.divPageModuleButtonDto.style = "background:#ffffff;color:" + t.divPageModuleButtonDto.color + ";border:2rpx solid " + t.divPageModuleButtonDto.color + ";"; else if (2 == t.type || 3 == t.type) {
                            if (t.content.length > 0) {
                                var i = [];
                                t.content.indexOf("|") > -1 ? (i = t.content.split("|"), 3 == t.type && i.map(function(t, e) {
                                    o.push(t);
                                })) : (i.push(t.content), 3 == t.type && o.push(t.content)), t.showImgs = i;
                            }
                        } else if (4 == t.type) if (t.content.indexOf("|") > -1) {
                            var s = t.content.split("|");
                            t.poster = s[0], t.videoUrl = s[1];
                        } else t.poster = "", t.videoUrl = t.content;
                    }), console.log(e), a.setData({
                        orgImages: e,
                        orgOnlyImages: o
                    }, function() {
                        setTimeout(function() {
                            wx.hideLoading();
                        }, 1e3);
                    });
                }
            },
            fail: function() {
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3), e.globalData.showErrorAlert && (0, t.ShowDialog)(a);
            }
        });
    },
    seeBigPic: function(t) {
        var e = t.currentTarget.dataset.src, a = this;
        console.log(e), wx.previewImage({
            current: e,
            urls: a.data.orgOnlyImages
        });
    },
    openMap: function() {
        var t = this;
        console.log("纬度为02：", t.data.lat, "经度为02：", t.data.lng), wx.openLocation({
            latitude: t.data.lat,
            longitude: t.data.lng,
            name: t.data.orgName,
            address: t.data.address,
            scale: 28
        });
    },
    makePhoneCall: function(t) {
        var e = t.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: e
        });
    }
});