var t = require("../../../template/show_dialog/show_dialog"), e = getApp();

Component({
    properties: {
        xcxType: {
            type: Number
        },
        isContactPage: {
            type: Boolean,
            value: !1,
            observer: function(t, a) {
                var o = this;
                t && (this.setData({
                    isContactPage: t
                }), wx.getLocation({
                    type: "wgs84",
                    success: function(t) {
                        var a = {
                            lat: t.latitude,
                            lng: t.longitude,
                            xcxId: e.globalData.xcxId
                        };
                        o.getDistance(a);
                    }
                }));
            }
        },
        refresh: {
            type: Boolean,
            value: !1,
            observer: function(t, e) {
                t && (this.getIntroduceData(), this.getOrgInfo());
            }
        }
    },
    data: {
        troduce_list: [],
        serveArr: [ "Wi-Fi", "停车位", "支付宝支付", "微信支付" ],
        shopImages: [],
        curr_id: "",
        defaultPoster: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/dv2.png"
    },
    methods: {
        getOrgInfo: function() {
            var t = this;
            e.getOrgInfo(function(e, a) {
                if (a) {
                    var o = [];
                    a.orgFacilities && a.orgFacilities.length > 0 && (o = a.orgFacilities.split(",")), 
                    a.orgFacilities = o, t.setData({
                        orgInfo: a,
                        logo: a.logo,
                        latitude: a.lat,
                        longitude: a.lng,
                        name: a.orgName,
                        address: a.address,
                        phone: a.phone,
                        orgName: a.orgName,
                        title: a.title && a.title || "商户介绍"
                    }, function() {
                        var t = {
                            orgName: this.data.orgName
                        }, e = {};
                        this.triggerEvent("setparentdata", t, e), setTimeout(function() {
                            wx.hideLoading();
                        }, 1e3);
                    });
                }
            });
        },
        videoPlay: function(t) {
            this.setData({
                curr_id: t.currentTarget.dataset.index + 1
            }), wx.createVideoContext("video-" + t.currentTarget.dataset.index).play();
        },
        getIntroduceData: function() {
            var t = this;
            wx.request({
                url: e.globalData.host + "coupon/org/introduce/newList",
                method: "post",
                data: {
                    orgId: e.globalData.orgId
                },
                header: {
                    "content-type": "application/json"
                },
                complete: function() {},
                success: function(e) {
                    var a = [];
                    if (e.data.data) {
                        var o = e.data.data;
                        o.map(function(t, e) {
                            if (5 == t.type) {
                                var o = parseInt(t.divPageModuleTextDto.size);
                                t.divPageModuleTextDto.size = o + "rpx";
                                var n = 0;
                                switch (o) {
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
                                t.divPageModuleTextDto.fontStyle ? t.divPageModuleTextDto.style = t.divPageModuleTextDto.fontStyle + ";font-size:" + o + "rpx;text-align:" + t.divPageModuleTextDto.align + ";color:" + t.divPageModuleTextDto.color + ";" + n : t.divPageModuleTextDto.style = "font-size:" + o + "rpx;text-align:" + t.divPageModuleTextDto.align + ";color:" + t.divPageModuleTextDto.color + ";" + n;
                            } else if (6 == t.type) t.divPageModuleButtonDto && (1 == t.divPageModuleButtonDto.style ? t.divPageModuleButtonDto.style = "background:" + t.divPageModuleButtonDto.color + ";color:#ffffff;border:none;" : t.divPageModuleButtonDto.style = "background:#ffffff;color:" + t.divPageModuleButtonDto.color + ";border:2rpx solid " + t.divPageModuleButtonDto.color + ";"); else if (2 == t.type || 3 == t.type) {
                                if (t.content.length > 0) {
                                    var i = [];
                                    t.content.indexOf("|") > -1 ? (i = t.content.split("|"), 3 == t.type && i.map(function(t, e) {
                                        a.push(t);
                                    })) : (i.push(t.content), 3 == t.type && a.push(t.content)), t.showImgs = i;
                                }
                            } else if (4 == t.type) if (t.content.indexOf("|") > -1) {
                                var s = t.content.split("|");
                                t.poster = s[0], t.videoUrl = s[1];
                            } else t.poster = "", t.videoUrl = t.content;
                        }), t.setData({
                            troduce_list: o,
                            shopImages: a
                        });
                    }
                },
                fail: function() {
                    setTimeout(function() {
                        wx.hideLoading();
                    }, 1e3);
                }
            });
        },
        previewImage: function(t) {
            var e = t.currentTarget.dataset.src, a = this;
            wx.previewImage({
                current: e,
                urls: a.data.shopImages
            });
        },
        openMap: function() {
            var t = this;
            wx.openLocation({
                latitude: t.data.latitude,
                longitude: t.data.longitude,
                name: t.data.orgName,
                address: t.data.address,
                scale: 28
            });
        },
        makePhoneCall: function(t) {
            wx.makePhoneCall({
                phoneNumber: t.currentTarget.dataset.phone
            });
        },
        getDistance: function(a) {
            var o = this;
            wx.request({
                url: e.globalData.shopMHost + "/xcx/base/getDistance",
                method: "post",
                data: a,
                complete: function() {
                    wx.stopPullDownRefresh();
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    if (t.data.data) {
                        var e = t.data.data;
                        o.data.distance = e > 1e3 ? "距离我 " + (e / 1e3).toFixed(1) + "km" : "距离我 " + (e > 0 ? e : "-k") + "m";
                    } else o.data.distance = "";
                    o.setData(o.data);
                },
                fail: function() {
                    (0, t.ShowDialog)(o);
                }
            });
        },
        seeBigPic: function(t) {
            var e = t.currentTarget.dataset.src, a = this;
            console.log(e), wx.previewImage({
                current: e,
                urls: a.data.orgOnlyImages
            });
        }
    }
});