var a = require("../../components/template/show_dialog/show_dialog"), e = require("../../components/model/getIsOpenPay/getIsOpenPay-m"), t = require("../../components/wx-tpl/custom-page-tpl/common-js/classLoop"), o = (require("../../util/util.js"), 
getApp()), n = {
    onReady: function(a) {
        this.videoContext = wx.createVideoContext("myVideo");
    },
    data: {
        initLoad: !1,
        navList: [],
        orgId: null,
        address: "",
        orgName: "",
        logo: "",
        phone: "",
        lat: null,
        lng: null,
        enableCs: 1,
        orgFacilities: [],
        imgList: [],
        imgUrls: [],
        preImgUrls: [],
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        bannerImgInfo: [],
        templateId: null,
        styleList: [],
        hideTime: null,
        showCouponModal: !1,
        refresh: !0,
        systomIcon: [ "/subPackage/business/pages/special_selling/special_selling?", "/subPackage/index/pages/shequn/shequn?", "/subPackage/index/pages/appointment/appointment?isApplyNewLogic=true", "/subPackage/business/pages/more_coupon/more_coupon?", "/subPackage/my/pages/link_us/link_us?", "/subPackage/my/pages/buy_car/buy_car?" ],
        activityIcon: [ "/subPackage/business/pages/limit_shopping/limit_shopping?", "/subPackage/index/pages/category-list/category-list?activityType=1", "/subPackage/index/pages/category-list/category-list?activityType=2" ],
        onShow: "",
        reShow: 0,
        onPullDownRefresh: "",
        copyRightShow: !1,
        classlist: [],
        showAddress: !1,
        shopInfo: {
            latitude: 0,
            longitude: 0,
            scale: 28,
            name: "",
            address: ""
        },
        imgUrlArry: [],
        showOpenUp: 1,
        superVip: 1,
        memberCardInfo: null
    },
    onLoad: function(a) {
        var t = this, n = this;
        wx.showLoading({
            title: "加载中"
        }), 0 != o.globalData.xcxType && n.setData({
            xcxType: o.globalData.xcxType
        }), o.getNewOpenId(function(s) {
            o.globalData.openid = s, n.setData({
                initLoad: !0,
                orgId: o.globalData.orgId
            }), o.whichProduct({
                ele: t
            }), t.setData({
                showCouponModal: !0
            }), n.getTemplate(function(e) {
                100 == e ? n.getIndexStyle(function() {
                    a.refresh && n.refreshComponentData();
                }) : a.refresh && n.refreshComponentData();
            }), n.indexNavListM(), t.getImgListData({
                orgId: t.data.orgId
            }), n.getBannerList({
                xcxId: o.globalData.xcxId,
                imgType: 1
            }), n.getClassList(), n.getBtnText(), (0, e.getIsOpenPayM)({
                ele: n,
                data: {
                    xcxId: o.globalData.xcxId
                }
            }), t.queryHome(), o.getTabBarTitle(), n.onShowHandler();
        }, !1);
    },
    onShow: function() {
        var a = this;
        o.globalData.vipLogin ? this.setData({
            memberCardInfo: wx.getStorageSync("memberCardInfo")
        }) : wx.eventBus.on("newMemberCardInfo", function() {
            a.setData({
                memberCardInfo: wx.getStorageSync("memberCardInfo")
            });
        }), this.getSuperVipset();
        var e = new Date().getTime();
        this.setData({
            reShow: e
        }), this.data.initLoad && o.globalData.openid && this.onShowHandler();
    },
    onShowHandler: function() {
        var a = this;
        o.setCarCountDot(), o.setMyCountDot();
        var e = "/subPackage/business/pages/find_detail/find_detail?orgId=" + this.data.orgId + "&orgName=" + this.data.orgName;
        o.saveRecordInfo(e, this.data.orgId), this.data.hideTime && this.setData({
            refreshCountdown: !0
        }, function() {
            a.setData({
                refreshCountdown: !1
            });
        });
        var t = new Date().getTime();
        this.setData({
            onShow: t
        });
    },
    onPullDownRefresh: function() {
        var a = this;
        this.onLoad({
            refresh: !0
        }), this.getSuperVipset(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 2e3), a.getBtnText();
        var e = new Date().getTime();
        this.setData({
            onPullDownRefresh: e
        });
    },
    refreshComponentData: function() {
        var a = this;
        this.setData({
            refresh: !1
        }, function() {
            a.setData({
                refresh: !0
            });
        });
    },
    onHide: function() {
        if (this.setData({
            hideTime: new Date().getTime()
        }), o.globalData.timerObj) {
            var a = o.globalData.timerObj, e = Object.keys(a);
            for (var t in e) e[t].indexOf("index_") > -1 && clearTimeout(a[e[t]]);
        }
    },
    getTemplate: function(e) {
        var t = this;
        wx.request({
            url: o.globalData.shopMHost + "xcx/pageTemplate/getTemplate",
            method: "post",
            data: {
                orgId: o.globalData.orgId,
                type: 1
            },
            header: {
                "content-type": "application/json"
            },
            success: function(n) {
                "000000" == n.data.code && n.data.data.templateId ? t.setData({
                    templateId: n.data.data.templateId
                }, function() {
                    e && e(n.data.data.templateId);
                }) : o.globalData.showErrorAlert && (0, a.ShowDialog)(t);
            },
            fail: function(e) {
                o.globalData.showErrorAlert && (0, a.ShowDialog)(t), setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
            }
        });
    },
    listenerBtnGetLocation: function(a) {
        var e = this;
        e.data.lat > 0 && e.data.lng > 0 && wx.openLocation({
            latitude: e.data.lat,
            longitude: e.data.lng,
            scale: 28,
            name: e.data.orgName,
            address: e.data.address
        });
        var t = "/subPackage/business/pages/find_detail/find_detail?orgId=" + e.data.orgId + "&orgName=" + e.data.orgName;
        o.saveRecordInfo(t, e.data.orgId);
    },
    makePhone: function(a) {
        this.data.phone && wx.makePhoneCall({
            phoneNumber: this.data.phone
        });
    },
    getImgListData: function(e) {
        var t = this;
        wx.request({
            url: o.globalData.host + "coupon/org/info",
            method: "post",
            data: e,
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                var e = a.data.data;
                if (e) {
                    var o = [];
                    e.orgFacilities && (o = e.orgFacilities.split(",")), t.setData({
                        imgUrls: e.thumbImages,
                        preImgUrls: e.images || e.thumbImages,
                        currentIndex: 0,
                        address: e.address ? e.address : "",
                        orgName: e.orgName,
                        logo: e.logo,
                        orgFacilities: o,
                        phone: e.phone ? e.phone : null,
                        lat: void 0 == e.lat ? null : e.lat,
                        lng: void 0 == e.lng ? null : e.lng,
                        enableCs: 2,
                        imgList: e.images ? e.images : []
                    }, function() {
                        setTimeout(function() {
                            wx.hideLoading();
                        }, 2e3);
                    });
                }
            },
            fail: function(e) {
                o.globalData.showErrorAlert && (0, a.ShowDialog)(t), setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
            }
        });
    },
    getClassList: function() {
        var a = this;
        wx.request({
            url: o.globalData.shopMHost + "xcx/category/list",
            method: "post",
            data: {
                xcxId: o.globalData.xcxId
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log("分类列表---------", e.data.data), a.setData({
                    classlist: e.data.data
                });
            },
            fail: function() {}
        });
    },
    getBannerList: function(e) {
        var t = this;
        wx.request({
            url: o.globalData.shopMHost + "/xcx/shop/image/list",
            method: "post",
            data: e,
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                var e = a.data.data;
                t.data.imgUrlArry = [];
                for (var o = 0, n = e.length; o < n; o++) if (t.data.imgUrlArry.push(e[o].thumUrl), 
                5 == e[o].type) {
                    var s = e[o].jumpUrl.split("appPath=");
                    e[o].appid = s[0], e[o].path = s[1];
                }
                e && t.setData({
                    bannerImgInfo: e,
                    imgUrlArry: t.data.imgUrlArry
                }, function() {
                    setTimeout(function() {
                        wx.hideLoading();
                    }, 2e3);
                });
            },
            fail: function(e) {
                o.globalData.showErrorAlert && (0, a.ShowDialog)(t), setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
            }
        });
    },
    showBannerImg: function(a) {
        var e = a.currentTarget.dataset.jumptype, n = a.currentTarget.dataset.jumpurl, s = a.currentTarget.dataset.productid, i = "";
        if (0 == e && (i = "/subPackage/discover/pages/" + (3 == o.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + (s || n)), 
        2 == e && (i = "/subPackage/discover/pages/" + (3 == o.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + (s || n)), 
        3 == e) {
            var r = (0, t.classLoop)(n, this.data.classlist);
            wx.navigateTo({
                url: "/subPackage/index/pages/category-list/category-list?tagType=&iconName=" + r + "&categoryId=" + n
            });
        }
        if (4 == e && (i = "/" + n), 2 == e || 4 == e || 0 == e && s) wx.navigateTo({
            url: i,
            success: function() {
                console.log(1111);
            },
            fail: function() {
                console.log(2222);
            }
        }); else if (1 == e || 0 == e && !s) {
            var l = a.currentTarget.dataset.index, d = this;
            wx.previewImage({
                current: d.data.imgUrlArry[l],
                urls: d.data.imgUrlArry
            });
        }
    },
    showImg: function(a) {
        var e = a.target.dataset.src;
        wx.previewImage({
            current: e,
            urls: this.data.imgList
        });
    },
    indexNavListM: function() {
        var e = this;
        wx.request({
            url: o.globalData.shopMHost + "xcx/icon/list",
            method: "post",
            data: {
                orgId: o.globalData.orgId
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                var t = a.data.data;
                "000000" == a.data.code && e.setData({
                    navList: t
                }, function() {
                    setTimeout(function() {
                        e.setData({
                            copyRightShow: !0
                        });
                    }, 3500);
                });
            },
            fail: function() {
                o.globalData.showErrorAlert && (0, a.ShowDialog)(e), wx.hideLoading();
            }
        });
    },
    getIndexStyle: function(e) {
        var t = this;
        wx.request({
            url: o.globalData.shopMHost + "xcx/pageTemplate/custom/list",
            method: "post",
            data: {
                xcxId: o.globalData.xcxId
            },
            header: {
                "content-type": "application/json"
            },
            success: function(n) {
                if (n.data && "000000" == n.data.code) {
                    var s = n.data.data;
                    s = (s = s.filter(function(a) {
                        return 1 == a.isDelete && 2 == a.isShow && "topBanner" != a.alias && "navIcon" != a.alias;
                    })).sort(function(a, e) {
                        return a.orderBy - e.orderBy;
                    }), t.setData({
                        styleList: s
                    }, function() {
                        setTimeout(function() {
                            wx.hideLoading();
                        }, 2e3), e && e();
                    });
                } else o.globalData.showErrorAlert && (0, a.ShowDialog)(t);
            },
            fail: function() {
                o.globalData.showErrorAlert && (0, a.ShowDialog)(t), setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
            }
        });
    },
    getBtnText: function(a) {
        var e = this;
        o.getBtnText(function(a) {
            a && e.setData({
                appointmentCopy: a.appointmentCopy ? a.appointmentCopy : "立即预约",
                appointmentZeroCopy: a.appointmentZeroCopy ? a.appointmentZeroCopy : "马上咨询",
                purchaseCopy: a.purchaseCopy ? a.purchaseCopy : "立即购买"
            });
        });
    },
    goVipCenter: function() {
        wx.getStorageSync("memberCardInfo") ? wx.navigateTo({
            url: "/subPackage/superVip/pages/index/index"
        }) : wx.navigateTo({
            url: "/subPackage/my/pages/login/login"
        });
    },
    openMap: function() {
        this.data.shopInfo.name = this.data.orgName, wx.openLocation(this.data.shopInfo);
    },
    queryHome: function() {
        var a = this;
        return new Promise(function(e, t) {
            o.ajaxSubmit({
                url: o.globalData.shopMHost + "xcx/superMember/queryHomePageSetting",
                method: "post",
                header: {
                    codeVersion: o.globalData.codeVersion
                },
                data: {
                    orgId: o.globalData.orgId
                }
            }).then(function(t) {
                if (console.log("首页设置-------", t), "000000" === t.data.code) {
                    var o = {
                        latitude: t.data.data.lat,
                        longitude: t.data.data.lng,
                        scale: 28,
                        name: a.data.orgName,
                        address: t.data.data.fullAddress
                    };
                    a.setData({
                        shopInfo: o
                    });
                }
                e(t);
            });
        });
    },
    getSuperVipset: function() {
        var a = this;
        return new Promise(function(e, t) {
            o.ajaxSubmit({
                url: o.globalData.shopMHost + "xcx/superMember/setting",
                method: "post",
                header: {
                    codeVersion: o.globalData.codeVersion
                },
                data: {
                    orgId: o.globalData.orgId
                },
                isHideLoading: !0
            }).then(function(t) {
                console.log("超级会员配置信息-------", t), "000000" === t.data.code && a.setData({
                    showOpenUp: t.data.data.banner,
                    superVip: t.data.data.superVip
                }), e(t);
            });
        });
    },
    openUp: function() {
        console.log(wx.getStorageSync("memberCardInfo")), wx.navigateTo({
            url: "/subPackage/vipCenter/pages/superVip/superVip"
        });
    },
    onShareAppMessage: function(a) {
        var e = this, t = getCurrentPages(), n = o.isHasTabByTitle({
            url: t[t.length - 1].route
        });
        console.log("tempJson=", n);
        var s = "page/message/index?action=goHome&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id);
        return n.check && (s = "page/message/index?memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id)), 
        console.log("tempShareUrl=", s), {
            title: o.globalData.nickName + "给你推荐了「" + e.data.orgName + "」",
            path: s,
            success: function(a) {
                var t = this.path;
                o.getNewOpenId(function(a) {
                    var n = {
                        actType: 2,
                        openId: a,
                        orgId: e.data.orgId,
                        page: t
                    };
                    wx.request({
                        url: o.globalData.host + "/user/behavior/record",
                        method: "post",
                        data: n,
                        header: {
                            "content-type": "application/json"
                        },
                        complete: function() {},
                        success: function(a) {}
                    });
                });
            },
            fail: function(a) {}
        };
    }
};

Page(n);