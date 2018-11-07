var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var o = arguments[a];
        for (var e in o) Object.prototype.hasOwnProperty.call(o, e) && (t[e] = o[e]);
    }
    return t;
}, a = require("/components/model/my/submit-form-id-m"), o = require("/components/model/my/new-order-count-m"), e = (require("conf"), 
require("/util/global-life-cycle.js"));

(0, e.newPage)({
    onLoad: function(t, a) {
        var o = getCurrentPages(), e = (o[o.length - 1].route, a);
        console.log("执行了自定义的onload", e), t.setData({
            test: "执行了自定义的onload"
        }), t.data.onAuthShow = "", t.data.onAuthHide = "", t.data.authParam = {};
    },
    unLoad: function() {
        console.log("执行了自定义的unLoad");
    },
    onShow: function(t) {
        console.log("执行了自定义的onShow"), t.setData({
            test2: "执行了自定义的unLoad"
        }), wx.eventBus.on("showOnAuthShow", function() {
            t.showOnAuthShow();
        });
    },
    onHide: function(t) {
        console.log("执行了自定义的onHide"), t.setData({
            test3: "执行了自定义的onHide"
        });
    },
    onReachBottom: function() {
        console.log("执行了自定义的onReachBottom");
    },
    onPullDownRefresh: function() {
        console.log("执行了自定义的onPullDownRefresh");
    },
    methods: {
        showOnAuthShow: function() {
            console.log("全局每个页面添加其他的方法", this);
            var t = new Date().getTime();
            this.setData({
                onAuthShow: t,
                authParam: {
                    isCallBackHandle: !0
                }
            });
        }
    }
}), App({
    onLaunch: function() {
        wx.eventBus = e.eventBus;
        var t = this, a = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
        a && a.name && (t.globalData.title = a.name), a && a.attr && a.attr.xcxId && (t.globalData.xcxId = a.attr.xcxId), 
        a && a.attr && a.attr.host && (t.globalData.host = a.attr.host), a && a.attr && a.attr.pcisHost && (t.globalData.pcisHost = a.attr.pcisHost), 
        a && a.attr && a.attr.shopMHost && (t.globalData.shopMHost = a.attr.shopMHost), 
        a && a.attr && a.attr.orgId && (t.globalData.orgId = a.attr.orgId), a && a.attr && a.attr.tabBar && (t.globalData.pagePath = "/" + a.attr.tabBar.list[0].pagePath, 
        t.globalData.tabBarList = a.attr.tabBar.list, t.globalData.HomePath = "/" + a.attr.tabBar.list[0].pagePath), 
        a && a.attr && a.attr.codeVersion && (t.globalData.codeVersion = a.attr.codeVersion);
    },
    onShow: function(t) {
        var a = this;
        this.getNewOpenId(function(o) {
            a.globalData.shareMemberId = t.query.memberId || a.globalData.shareMemberId, a.superShareBind(a.globalData.shareMemberId);
        }), this.whichProduct(), this.setCarCountDot();
    },
    globalData: {
        codeVersion: "v20181011",
        title: "",
        xcxId: 2522,
        hasLogin: !1,
        openid: 'oeZoA0Ydbw6kPdQetTLX4smBielk',
        avatarUrl: "",
        nickName: "你的好友",
        host: "https://x1.197.com/",
        shopMHost: "https://mmis.197.com/",
        newsHost: "https://newstest2.197.com/",
        pcisHost: "https://pcis.197.com/",
        enableCs: 1,
        ordering_state: 1,
        requestTask: null,
        timerObj: {},
        tabBarList: [],
        pagePath: "",
        HomePath: "",
        xcxVersion: "18.03.7",
        orgId: 16774,
        xcxType: 0,
        showGetUserInfoAlert: !1,
        isCouldAuth: 0,
        showErrorAlert: !1,
        vipLogin: !1,
        shareMemberId: ""
    },
    newSaveUserInfo: function(t) {
        console.log("fromButtonGetUserInfo=", t);
        var a = this;
        t.openId = a.globalData.openid, t.xcxId = a.globalData.xcxId, wx.request({
            url: a.globalData.host + "/user/wechat/addInfo",
            method: "post",
            data: t,
            header: {
                "content-type": "application/json"
            },
            success: function(o) {
                o && (a.globalData.userInfo = t.userInfo);
            }
        });
    },
    userInfoMiddleWare: function(t) {
        var a = this;
        return new Promise(function(o, e) {
            a.getNewOpenId(function(e) {
                console.log("进入个人中心时的this.globalData", a.globalData), o(t && 2 == a.globalData.isCouldAuth ? {
                    openId: e,
                    isGetUserInfo: !0
                } : !a.globalData.showGetUserInfoAlert && a.globalData.userInfo && a.globalData.userInfo.nickName ? !a.globalData.showGetUserInfoAlert && a.globalData.userInfo && a.globalData.userInfo.id ? {
                    openId: e,
                    isGetUserInfo: !0
                } : {
                    openId: e,
                    isGetUserInfo: !1
                } : {
                    openId: e,
                    isGetUserInfo: !1
                });
            });
        });
    },
    getNewOpenId: function(t) {
        var a = this;
        a.globalData.openid || a.globalData.userInfo ? t(a.globalData.openid) : wx.login({
            success: function(o) {
                wx.request({
                    url: a.globalData.host + "/user/openid",
                    data: {
                        code: o.code,
                        xcxId: a.globalData.xcxId
                    },
                    success: function(o) {
                        console.log("app.js getNewOpenId-----"), console.log(o), o.statusCode >= 400 || o.data.code && "000000" !== o.data.code ? t && t(o.data.openid) : (console.log("after return ------"), 
                        o.data.openid && (a.globalData.openid = o.data.openid, a.globalData.nickName = o.data.userInfo && o.data.userInfo.nickName || "微信用户", 
                        a.globalData.avatarUrl = o.data.userInfo && (o.data.userInfo.avatarUrl || "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/toux.png"), 
                        o.data.mustGetUserInfo ? a.globalData.showGetUserInfoAlert = o.data.mustGetUserInfo : a.globalData.userInfo = o.data.userInfo, 
                        a.isLoginMemberCard().then(function(t) {
                            console.log("登录状态22222", t), 1 == t.data ? a.globalData.vipLogin = !0 : 2 == t.data && wx.setStorageSync("memberCardInfo", null), 
                            wx.eventBus.trigger("newMemberCardInfo");
                        }), t(o.data.openid)));
                    },
                    fail: function(a) {
                        console.log("拉取用户openid失败，将无法正常使用开放接口等服0务", a), t(a);
                    }
                });
            },
            fail: function(a) {
                console.log("wx.login 接口调用失败，将无法正常使用开放接口等服务", a), t(a);
            }
        });
    },
    saveShareInfo: function(t, a, o) {
        var e = this;
        try {
            e.getNewOpenId(function(n) {
                var s = {
                    actType: 2,
                    couponId: a,
                    openId: n,
                    orgId: o,
                    page: t
                };
                wx.request({
                    url: e.globalData.host + "/user/behavior/record",
                    method: "post",
                    data: s,
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(t) {}
                });
            }, !1);
        } catch (t) {
            console.log(t);
        }
    },
    saveRecordInfo: function(t, a, o) {
        var e = this;
        try {
            var n = {
                actType: 1,
                couponId: a,
                openId: this.globalData.openid,
                orgId: o,
                page: t
            };
            wx.request({
                url: e.globalData.host + "/user/behavior/record",
                method: "post",
                data: n,
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {}
            });
        } catch (t) {
            console.log(t);
        }
    },
    getOrgInfo: function(t) {
        var a = this;
        wx.request({
            url: a.globalData.host + "coupon/org/info",
            method: "post",
            data: {
                orgId: a.globalData.orgId
            },
            header: {
                "content-type": "application/json"
            },
            complete: function() {},
            success: function(a) {
                var o = a.data.data;
                o && t(null, o);
            },
            fail: function(a) {
                t(null);
            }
        });
    },
    showDialog: function(t, a) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 2e3;
        t.setData({
            isShowDialog: !0,
            dialogContent: a
        }, function() {
            setTimeout(function() {
                t.setData({
                    isShowDialog: !1
                });
            }, o);
        });
    },
    getBtnText: function(t) {
        var a = this;
        wx.request({
            url: a.globalData.shopMHost + "/xcx/buttonCharacter/list",
            method: "post",
            data: {
                orgId: a.globalData.orgId
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                t(a.data.data);
            },
            fail: function(a) {
                t(null);
            }
        });
    },
    getTabBarTitle: function() {
        var t = this, a = getCurrentPages();
        t.globalData.tabBarList.map(function(o, e) {
            o.pagePath == a[a.length - 1].route && (0 == e ? t.getOrgInfo(function(t, a) {
                !t && a && wx.setNavigationBarTitle({
                    title: a.orgName
                });
            }) : wx.setNavigationBarTitle({
                title: o.text
            }));
        });
    },
    getUserActiviyNum: function(t) {
        var a = this;
        this.getNewOpenId(function(o) {
            wx.request({
                url: a.globalData.shopMHost + "xcx/user/index",
                method: "post",
                data: {
                    openId: o
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(a) {
                    "000000" == a.data.code && t(a.data.data);
                },
                fail: function(a) {
                    t(null);
                }
            });
        });
    },
    whichProduct: function(t) {
        var a = this;
        wx.request({
            url: this.globalData.shopMHost + "/xcx/upgrade/info",
            method: "post",
            data: {
                xcxId: this.globalData.xcxId
            },
            header: {
                "content-type": "application/json"
            },
            success: function(o) {
                o.data.data && (t ? t.ele.setData({
                    xcxType: o.data.data.xcxType
                }) : a.globalData.xcxType = o.data.data.xcxType);
            }
        });
    },
    submitFormIdM: function(t, o) {
        var e = this;
        e.getNewOpenId(function(n) {
            var s = {
                formId: t,
                openId: n,
                orgId: o
            };
            (0, a.submitFormIdM)(s, e);
        });
    },
    isHasTabByTitle: function(t) {
        var a = !1, o = 0, e = "";
        return this.globalData.tabBarList.map(function(n, s) {
            if (t.url == n.pagePath) return a = !0, o = s, e = n.text, !1;
        }), {
            check: a,
            index: o,
            text: e
        };
    },
    setCarCountDot: function() {
        var t = 0, a = this.isHasTabByTitle({
            url: "page/buy_car/buy_car"
        });
        console.log("tempJson=", a), a.check && wx.getStorage({
            key: "shoppingCarGoods",
            success: function(o) {
                o.data.map(function(a, o) {
                    a.count && (t += a.count);
                }), t > 0 ? (t = t > 99 ? "99+" : t, wx.setTabBarBadge({
                    index: a.index,
                    text: t + ""
                })) : wx.removeTabBarBadge({
                    index: a.index
                });
            },
            fail: function(t) {}
        });
    },
    setMyCountDot: function() {
        var t = this, a = t.isHasTabByTitle({
            url: "page/my/my"
        });
        if (a.check) {
            var e = [ {
                status: 3
            }, {
                status: 4
            } ];
            t.userInfoMiddleWare().then(function(n) {
                console.log("openid=", t.globalData.openid), (0, o.newOrderCount)({
                    openId: t.globalData.openid,
                    list: e,
                    orgId: t.globalData.orgId
                }, t, function(t, o) {
                    if (t) ; else {
                        var e = 0;
                        o.map(function(t, a) {
                            e += t;
                        }), e > 0 ? wx.showTabBarRedDot({
                            index: a.index
                        }) : wx.hideTabBarRedDot({
                            index: a.index
                        });
                    }
                });
            });
        }
    },
    ajaxSubmit: function(t) {
        var a = this;
        return !t.isHideLoading && wx.showLoading({
            title: "加载中...",
            icon: "loading"
        }), new Promise(function(o, e) {
            wx.request({
                url: t.url,
                method: t.method,
                header: Object.assign({}, {
                    codeVersion: a.globalData.codeVersion,
                    "content-type": "application/json;charset=utf-8"
                }, t.header),
                data: t.data,
                success: function(t) {
                    t.cb = function() {
                        wx.hideLoading();
                    }, o(t.statusCode >= 400 || "000000" !== t.data.code ? t : t);
                },
                fail: function(t) {
                    wx.hideLoading(), e();
                },
                complete: function() {}
            });
        });
    },
    isBindMemberCard: function() {
        var t = this;
        return new Promise(function(a, o) {
            t.ajaxSubmit({
                url: t.globalData.shopMHost + "xcx/member/isBind",
                method: "post",
                data: {
                    orgId: t.globalData.orgId
                },
                isHideLoading: !0
            }).then(function(t) {
                a(t);
            });
        });
    },
    getVipCradInfo: function() {
        var a = this;
        return new Promise(function(o, e) {
            a.ajaxSubmit({
                url: a.globalData.shopMHost + "xcx/member/memberInfo",
                method: "post",
                header: {
                    sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
                },
                data: {
                    memberId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id
                },
                isHideLoading: !0
            }).then(function(a) {
                console.log("会员卡信息----", a.data), "000000" === a.data.code && wx.setStorageSync("memberCardInfo", t({}, wx.getStorageSync("memberCardInfo") || {}, a.data.data)), 
                o(a);
            }).catch(function() {
                e();
            });
        });
    },
    isLoginMemberCard: function() {
        var t = this;
        return new Promise(function(a, o) {
            t.ajaxSubmit({
                url: t.globalData.shopMHost + "xcx/member/getXcxMemberLoginStatus",
                method: "post",
                header: {
                    sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
                },
                data: {
                    openId: t.globalData.openid,
                    xcxId: t.globalData.xcxId
                },
                isHideLoading: !0
            }).then(function(t) {
                a(t.data);
            });
        });
    },
    loginInOtherPlaceAlert: function(t, a) {
        wx.getStorageSync("memberCardInfo") && (wx.removeStorageSync("memberCardInfo"), 
        wx.showModal({
            title: "会员卡已退出",
            content: "此会员卡长时间未登录或已在别处登录，请注意账户资金的安全。如需使用请重新登录。",
            cancelText: "好的",
            confirmColor: "#d3a95a",
            confirmText: "重新登录",
            success: function(t) {
                t.confirm ? wx.navigateTo({
                    url: "/subPackage/my/pages/login/login"
                }) : a && a();
            }
        }));
    },
    getNowUrl: function() {
        var t = getCurrentPages();
        return console.log("223", t), t[t.length - 1].route;
    },
    getshopConfig: function(t) {
        wx.request({
            url: this.globalData.shopMHost + "xcx/shopConfig/get",
            method: "post",
            data: {
                xcxId: this.globalData.xcxId
            },
            header: {
                codeVersion: this.globalData.codeVersion
            },
            success: function(a) {
                if ("000000" == a.data.code) {
                    var o = a.data.data;
                    t(o);
                }
            },
            fail: function() {
                this.ShowDialog(this, "网络连接错误");
            }
        });
    },
    superShareBind: function(t) {
        var a = this;
        return t ? new Promise(function(o, e) {
            a.ajaxSubmit({
                url: a.globalData.shopMHost + "xcx/superShareBind/record",
                method: "post",
                data: {
                    fromMemberId: t,
                    orgId: a.globalData.orgId,
                    toOpenId: a.globalData.openid
                },
                isHideLoading: !0
            }).then(function(t) {
                o();
            });
        }) : new Promise(function(t, a) {
            t();
        });
    }
});