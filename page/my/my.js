var e = require("../../components/template/show_dialog/show_dialog"), a = require("./which-product"), t = require("../../components/model/my/new-order-count-m"), n = require("../../components/wx-tpl/copyright/common-js/join-apply-config-m.js"), o = require("../../components/model/my/my_m"), i = require("../../util/util.js"), s = getApp();

Page({
    data: {
        avatarUrl: "",
        nickName: "",
        visiable: "none",
        visiable02: "none",
        ordering_state: 1,
        list: [ {
            status: 3
        }, {
            status: 4
        } ],
        orderCount: {},
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        detailInfo: "收货地址",
        xcxType: 3,
        buyCarCount: 0,
        isHistory: !1,
        time: i.formatTimeLayout(new Date()),
        orderSegment: [ {
            tabName: "待收货",
            img: "dshre_icon.png",
            status: 10
        }, {
            tabName: "待取货",
            img: "dqh_icon.png",
            status: 4
        }, {
            tabName: "已完成",
            img: "ywc_icon.png",
            status: 6
        }, {
            tabName: "已关闭",
            img: "ygbre_icon.png",
            status: 9
        } ],
        onAuthShow: "",
        onAuthHide: "",
        authParams: {},
        onShow: "",
        isHot: !0,
        content: {},
        balance: "",
        loginStatus: 1,
        rechargeValue: ""
    },
    onLoad: function(e) {
        wx.showLoading({
            title: "加载中"
        });
        var a = this;
        s.getTabBarTitle();
        for (var t = s.globalData.tabBarList, n = !1, o = 0; o < t.length; o++) if (t[o].pagePath.indexOf("/buy_car/buy_car") > -1) {
            n = !0;
            break;
        }
        a.setData({
            hasBuyCarTab: n
        });
    },
    onShow: function() {
        var e = this, t = this;
        t.data.hasBuyCarTab && 1 != t.data.xcxType || s.setCarCountDot(), t.getOrderCount(), 
        wx.setStorage({
            key: "currentTime",
            data: Date.parse(this.data.time)
        }), wx.getStorage({
            key: "currentTime",
            success: function(e) {}
        }), wx.getStorage({
            key: "isClickNum",
            success: function(e) {
                "1" == e.data && t.setData({
                    isHot: !1
                });
            }
        });
        var o = new Date().getTime();
        this.setData({
            onShow: o
        }), (0, n.joinApplyConfigM)({
            ele: t
        }), t.isBandCard(), s.userInfoMiddleWare().then(function(e) {
            if (e.isGetUserInfo) {
                var n = s.globalData.userInfo, o = new Date().getTime();
                t.setData({
                    avatarUrl: n.avatarUrl,
                    nickName: n.nickName,
                    onAuthHide: o
                });
            } else wx.eventBus.trigger("showOnAuthShow");
            (0, a.isHistoryOrder)({
                ele: t,
                data: {
                    openId: e.openId,
                    orgId: s.globalData.orgId
                }
            }), t.memberLoginInfo(), wx.hideLoading();
        }), t.orderTipM(), wx.getStorage({
            key: "ordering_state",
            success: function(e) {
                "2" == e.data ? t.setData({
                    visiable02: "block"
                }) : t.setData({
                    visiable02: "none"
                });
            }
        }), (0, a.whichProduct)({
            ele: t,
            data: {
                xcxId: s.globalData.xcxId
            }
        }), wx.getStorage({
            key: "shoppingCarGoods",
            success: function(a) {
                var t = 0;
                a.data.map(function(e) {
                    t += e.count;
                }), t > 99 && (t = "99+"), e.setData({
                    buyCarCount: t
                });
            }
        }), s.getUserActiviyNum(function(a) {
            e.setData({
                activiyNum: a
            });
        });
    },
    getOrderCount: function() {
        var e = this, a = e.data.list;
        s.getNewOpenId(function(n) {
            (0, t.newOrderCount)({
                openId: n,
                list: a,
                orgId: s.globalData.orgId
            }, s, function(a, t) {
                if (a) ; else {
                    var n = {
                        collectGoods: "",
                        pickGoods: ""
                    }, o = 0;
                    t.map(function(e, a) {
                        o += e, e > 99 && (e = "99+"), 0 == a && (n.collectGoods = e), 1 == a && (n.pickGoods = e);
                    }), e.setData({
                        orderCount: n
                    });
                    var i = s.isHasTabByTitle({
                        url: "page/my/my"
                    });
                    o <= 0 ? wx.hideTabBarRedDot({
                        index: i.index
                    }) : 0 == i.index && wx.showTabBarRedDot({
                        index: i.index
                    });
                }
            });
        });
    },
    goMyOrder: function(e) {
        var a = e.currentTarget.dataset;
        wx.navigateTo({
            url: "/subPackage/my/pages/my_order/my_order?status=" + a.status + "&index=" + a.index
        });
    },
    changeOrderState: function() {
        var e = this;
        wx.navigateTo({
            url: "/subPackage/my/pages/my_order/my_order"
        }), e.setData({
            visiable: "none"
        }), wx.setStorage({
            key: "ordering_state",
            data: "1"
        });
    },
    clickHot: function() {
        wx.setStorage({
            key: "isClickNum",
            data: "1"
        });
    },
    getPermission: function() {
        var e = this;
        this.getWxAddr(function() {
            wx.getSetting({
                success: function(a) {
                    a.authSetting["scope.address"] || wx.showModal({
                        title: "提示",
                        content: "您还未授权通讯地址，未授权您将无法体验完整功能，建议您授权通讯地址",
                        success: function(a) {
                            a.confirm && e.openSetting();
                        }
                    });
                }
            });
        });
    },
    setPower: function() {
        var a = this;
        wx.authorize({
            scope: "scope.address",
            success: function(e) {
                console.log("成功~" + JSON.stringify(e));
            },
            fail: function(t) {
                (0, e.ShowDialog)(a);
            }
        });
    },
    openSetting: function() {
        var e = this;
        wx.openSetting({
            success: function(a) {
                a.authSetting["scope.userLocation"] && e.getWxAddr(), console.log(JSON.stringify(a));
            },
            fail: function() {}
        });
    },
    getWxAddr: function(e) {
        var a = this;
        wx.chooseAddress({
            success: function(e) {
                a.data.userName = e.userName, a.data.telNumber = e.telNumber, a.setData(a.data);
            },
            fail: function(a) {
                e && e();
            }
        });
    },
    refreshUserInfo: function(e) {
        console.log("refreshUserInfo"), console.log(e.detail);
        var a = e.detail, t = this;
        if (a.userInfo) {
            s.globalData.isCouldAuth = 1, this.setData({
                avatarUrl: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/toux.png",
                nickName: "微信用户"
            });
            var n = s.globalData.userInfo ? s.globalData.userInfo : {};
            n = Object.assign({}, n, e.detail.userInfo), console.log("tempUserInfo=", n), setTimeout(function() {
                t.setData({
                    avatarUrl: a.userInfo.avatarUrl,
                    nickName: a.userInfo.nickName
                });
            }, 80), s.newSaveUserInfo(n);
        } else s.globalData.isCouldAuth = 2, s.globalData.userInfo && (s.globalData.userInfo.avatarUrl = "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/toux.png", 
        s.globalData.userInfo.nickName = "微信用户"), this.setData({
            avatarUrl: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/toux.png",
            nickName: "微信用户"
        });
    },
    backHandle: function(e) {
        console.log("backHandle() : "), console.log(e);
        var a = e.detail.userInfo;
        this.setData({
            avatarUrl: a.avatarUrl,
            nickName: a.nickName
        });
    },
    registerVip: function() {
        wx.navigateTo({
            url: "/subPackage/my/pages/login/login"
        });
    },
    addVipMoney: function() {
        if (2 != this.data.isSetPwd) wx.showModal({
            title: "请设置支付密码",
            content: "为了保证你的资金安全，请先设置支付密码。设置后才可进行充值、会员卡消费等操作。",
            cancelText: "取消",
            confirmColor: "#d3a95a",
            confirmText: "马上设置",
            success: function(e) {
                e.confirm && wx.navigateTo({
                    url: "/subPackage/my/pages/vip_security_center/set_password/set_password"
                });
            }
        }); else {
            if (2 == this.data.enableReturnGive) return void wx.navigateTo({
                url: "/subPackage/vipCenter/pages/recharge/index"
            });
            this.setData({
                isShowPayDialog: !0
            });
        }
    },
    goVipPage: function() {
        1 != this.data.loginStatus && wx.navigateTo({
            url: "/subPackage/superVip/pages/index/index"
        });
    },
    isBandCard: function() {
        var e = this;
        s.isBindMemberCard().then(function(a) {
            if ("000000" == a.data.code) {
                e.setData({
                    memberCardEnable: a.data.data.enableMemberCard,
                    memberCardRemark: a.data.data.remark,
                    enableReturnGive: a.data.data.enableReturnGive
                });
                var t = wx.getStorageSync("memberCardInfo");
                t && (0, o.isSetPayPwdM)({
                    ele: e,
                    data: {
                        memberId: t.id,
                        sessionId: t.sessionId
                    }
                });
            }
        });
    },
    memberLoginInfo: function() {
        var e = this, a = wx.getStorageSync("memberCardInfo");
        console.log("本地缓存的会员信息-------", a), e.setData({
            loginStatus: a ? 2 : 1
        }), a && (0, o.memberInfoM)({
            ele: e,
            data: {
                memberId: a.id,
                sessionId: a.sessionId
            }
        });
    },
    orderTipM: function() {
        var e = this;
        wx.setStorage({
            key: "ordering_type",
            data: "1"
        }), setTimeout(function() {
            e.data.visiable = "none", e.setData(e.data);
        }, 100);
    },
    closePayDialog: function() {
        this.setData({
            isShowPayDialog: !1
        });
    },
    setRechargeValue: function(e) {
        this.setData({
            rechargeValue: e.detail.value
        });
    },
    paySuccess: function(e) {
        var a = e.detail || {};
        if (a.timeStamp) {
            var t = {
                dealTime: +a.timeStamp,
                orderNo: a.orderNo,
                productName: a.productName,
                payAmount: a.amount,
                balance: a.balance,
                returnGiftAmount: a.returnGiftAmount,
                payType: 3
            };
            wx.navigateTo({
                url: "/subPackage/vipCenter/pages/rechargeSuccess/index?type=vip&config=" + JSON.stringify(t)
            });
        } else this.memberLoginInfo();
    }
});