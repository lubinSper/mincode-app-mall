var e = require("../../../../components/model/discover/cut-price-m"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../components/function/countdown/countdown")), a = getApp();

Page({
    data: {
        isInit: !0,
        info: null,
        showModal: !1,
        openId: "",
        isSelf: !0,
        isEnd: !1,
        isFull: !1,
        isBuy: !1,
        isHelp: !1,
        limitArr: [ "00", "00", "00" ],
        imageActionText: "全部",
        imageActionImage: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/turnqb_normal.png",
        showHeaders: [],
        showReturnIndexBtn: !1,
        headerStyle: 1,
        defaultHeader: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/toux.png",
        isFlag: !0
    },
    onLoad: function(e) {
        var t = this, o = e.from, n = void 0 === o ? "" : o, i = e.id, s = e.action, r = new Array(20);
        this.setData({
            showHeaders: r
        }), wx.showLoading({
            title: "加载中"
        }), a.getNewOpenId(function(e) {
            t.setData({
                openId: e,
                launchId: +i
            }, function() {
                t.loadInfo(function() {
                    var e = t.data, a = e.isSelf, o = e.isEnd, i = e.isBuy, s = e.isHelp;
                    "publish" != n && (a || s || o && !i) || t.setData({
                        showModal: !0
                    });
                });
            });
        }), s && "goHome" == s ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    onShow: function() {
        this.data.isInit ? this.setData({
            isInit: !1
        }) : this.loadInfo();
    },
    onPullDownRefresh: function() {
        this.loadInfo(function() {
            wx.stopPullDownRefresh();
        });
    },
    onShareAppMessage: function() {
        var e = getCurrentPages(), t = a.isHasTabByTitle({
            url: e[e.length - 1].route
        }), o = "/subPackage/discover/pages/cut_price/cut_price?action=goHome&id=" + this.data.launchId + "&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id);
        return t.check && (o = "/subPackage/discover/pages/cut_price/cut_price?id=" + this.data.launchId + "&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id)), 
        this.setData({
            showModal: !1
        }), {
            title: "帮砍一刀也是爱，我发现了一件好货，快来帮我砍价",
            path: o
        };
    },
    doCutPrice: function(e) {
        var t = this, o = this;
        a.userInfoMiddleWare(!0).then(function(n) {
            if (n.isGetUserInfo) {
                o.collectFormId(e), console.log("doCutPrice-----"), console.log("this.doCutPrice=", t.doCutPrice), 
                t.data.openId = a.globalData.openid;
                var i = t.data, s = i.info, r = i.launchId, c = i.openId;
                if (console.log(s, r, c), console.log("data=", t.data), t.doCutPrice && t.doCutPrice.ing) return;
                if (t.doCutPrice.ing = !0, !t.data.isFlag) return;
                a.getNewOpenId(function(e) {
                    wx.request({
                        url: a.globalData.shopMHost + "xcx/bargain/helpBargain",
                        data: {
                            launchId: r,
                            openId: e
                        },
                        method: "POST",
                        header: {
                            "content-type": "application/json"
                        },
                        complete: function() {
                            this.doCutPrice && (this.doCutPrice.ing = !1);
                        },
                        success: function(e) {
                            console.log("res=", e), "000000" == e.data.code ? (t.loadInfo(function() {
                                t.setData({
                                    showModal: !0
                                });
                            }), t.setData({
                                isFlag: !1
                            })) : a.showDialog(t, e.data.msg);
                        },
                        fail: function() {
                            a.showDialog(t, "网络连接失败");
                        }
                    });
                });
            } else wx.eventBus.trigger("showOnAuthShow");
        });
    },
    toPayOrder: function(e) {
        var t = this, o = this.data.info, n = o.productId, i = o.id, s = this;
        s.collectFormId(e), s.getGoodsInfo([ {
            productId: n
        } ], function(e) {
            0 != e.inventory ? wx.navigateTo({
                url: "/subPackage/my/pages/order/order_sure_pickup/order_sure_pickup?launchId=" + i + "&from=3"
            }) : a.showDialog(t, "下单失败，该商品已经售罄");
        });
    },
    loadInfo: function(a) {
        var o = this, n = this.data, i = n.openId, s = n.launchId;
        (0, e.getCutPriceInfo)({
            ele: this,
            data: {
                launchId: s,
                openId: i
            },
            fn: function(e) {
                var n = new Array(e.peopleNum).fill("0"), s = e.userBargainRecordDtos || [];
                if (e.headers = n.map(function(e, t) {
                    if (s[t]) {
                        var a = s[s.length - 1 - t];
                        e = a.avatarUrl ? a.avatarUrl : o.data.defaultHeader;
                    } else e = "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/wttx.png";
                    return e;
                }), e.currentPeopleNum < 5) {
                    var r = e.headers.slice(0, 5);
                    o.setData({
                        headerStyle: 1,
                        showHeaders: r
                    });
                } else if (e.currentPeopleNum >= 5) {
                    var c = e.headers.slice(0, e.currentPeopleNum);
                    e.currentPeopleNum > 20 && e.currentPeopleNum < e.peopleNum && (c = e.headers.slice(0, 20)), 
                    o.setData({
                        headerStyle: 2,
                        showHeaders: c
                    });
                }
                2 == e.isBuy && (e.limitTime = -1);
                var d = {};
                2 == e.helpResult && (d = e.userBargainRecordDtos.filter(function(e) {
                    return e.openId == i;
                })[0]), o.setData({
                    info: e,
                    isSelf: i == e.openId,
                    isBuy: 2 == e.isBuy,
                    isFull: e.peopleNum == e.currentPeopleNum,
                    isHelp: 2 == e.helpResult,
                    isEnd: e.limitTime <= 0,
                    helpCutItem: d
                }, function() {
                    a && a(), (0, t.default)({
                        key: "cut_price",
                        timeData: e.limitTime,
                        fn: function(e) {
                            "00" == e[0] && "00" == e[1] && "00" == e[2] ? o.setData({
                                isEnd: !0,
                                limitArr: [ "00", "00", "00" ]
                            }) : o.setData({
                                limitArr: e
                            });
                        }
                    });
                });
            }
        });
    },
    toDetail: function(e) {
        this.collectFormId(e);
        var t = getCurrentPages();
        t.length > 1 && t[t.length - 2].route == "/subPackage/discover/pages/" + (3 == a.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail" ? wx.navigateBack() : wx.navigateTo({
            url: "/subPackage/discover/pages/" + (3 == a.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + this.data.info.productId
        });
    },
    getGoodsInfo: function(e, t) {
        var o = this;
        wx.request({
            url: a.globalData.shopMHost + "xcx/shopping/chenckCart",
            method: "post",
            data: {
                shoppingIds: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                "000000" == e.data.code ? t(e.data.data[0]) : a.showDialog(this, e.data.msg);
            },
            fail: function(e) {
                a.showDialog(o, "网络连接失败");
            }
        });
    },
    closeSuccessModal: function() {
        this.setData({
            showModal: !1
        });
    },
    showOrHide: function(e) {
        var t = this;
        "全部" === this.data.imageActionText ? this.setData({
            imageActionText: "收起",
            imageActionImage: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/turnqb_press.png",
            showHeaders: t.data.info.headers.slice(0, t.data.info.currentPeopleNum)
        }) : this.setData({
            imageActionText: "全部",
            imageActionImage: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/turnqb_normal.png",
            showHeaders: t.data.info.headers.slice(0, 20)
        });
    },
    collectFormId: function(e) {
        a.submitFormIdM(e.detail.formId, a.globalData.orgId);
    }
});