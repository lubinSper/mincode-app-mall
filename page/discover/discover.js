var e = require("../../components/conf/conf"), t = (require("../../components/template/show_dialog/show_dialog"), 
require("../../components/model/discover/discover-list-m")), a = require("../../components/model/discover/praise-m"), o = (require("../../components/model/my/order_detail/order_state_change_m"), 
require("../../components/model/discover/category-m")), i = require("../../components/model/discover/get-template-m"), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../components/function/countdown/countdown")), d = (require("../../components/model/buy_car/buy_car"), 
require("../../components/model/discover/goods-detail/goods-detail-m")), s = (require("../../util/util.js"), 
getApp());

Page({
    data: {
        pageIndex: 1,
        name: "",
        shopList: [],
        showLoading: !1,
        hasNextPage: !1,
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        noData: !1,
        haveData: !1,
        orgName: "",
        showBlank: !1,
        tabList: {
            index: 0,
            list: []
        },
        categoryId: null,
        loading_fail: !1,
        isClick: !0,
        buyCarCount: 0,
        index: 0,
        isSetViewRecord: !0,
        onPullDownRefresh: "",
        onReachBottom: "",
        onHide: "",
        onShow: "",
        pageParams: {
            types: "",
            goodInfos: {},
            commodityAttr: [],
            isShowInventory: !1
        },
        setOutBoxStyle: "",
        isShowCart: !1,
        inventory2: 0,
        buyCarDialogInfo: {
            checkGoodsTypeBg: "",
            showCheckGoodsTypeBg: !1,
            showCheckGoodsType: !1,
            index: 0,
            count: 1
        },
        hasSelectAttrText: "",
        hasSelectAttrCode: "",
        hasSelectAttrValue: [],
        showReturnIndexBtn: !1,
        xcxType: 3,
        copyRightShow: !1,
        memberCardInfo: ""
    },
    onLoad: function(a) {
        var n = this;
        s.getNewOpenId(function(d) {
            wx.showLoading({
                title: "加载中"
            }), s.whichProduct({
                ele: n
            }), n.data.shopList = [], n.data.pageIndex = 1, n.setData(n.data), n.getShopInfo(), 
            1 == n.data.isClick && (n.setData({
                isClick: !1
            }), s.getNewOpenId(function(a) {
                (0, t.DiscoverListM)({
                    ele: n,
                    data: {
                        orgId: s.globalData.orgId,
                        pageIndex: n.data.pageIndex,
                        pageSize: e.Conf.pageSize,
                        openId: a
                    },
                    fn: function(e) {
                        console.log("shopList=", n.data.shopList), n.countdown(e);
                    },
                    isTab: !0
                });
            })), (0, o.categoryM)({
                ele: n,
                data: {
                    xcxId: s.globalData.xcxId
                },
                isTab: !0
            }), (0, i.getTemplateM)({
                ele: n,
                data: {
                    orgId: s.globalData.orgId,
                    type: 2
                },
                isTab: !0
            }), n.getBtnText(), s.getTabBarTitle(), a.action && "goHome" == a.action ? n.setData({
                showReturnIndexBtn: !0
            }) : n.setData({
                showReturnIndexBtn: !1
            });
        });
    },
    countdown: function(e, t) {
        var a = this, o = {
            key: "discover",
            timeData: e,
            fn: function(e) {
                a.setData({
                    shopList: e
                });
            }
        };
        t && (o.hideTime = t), (0, n.default)(o);
    },
    btnActive: function(e) {
        var t = this;
        t.setData({
            copyRightShow: !1
        });
        var a = e.detail.e.currentTarget.dataset, o = [ a.index, a.id ], i = o[0], n = o[1];
        this.changeStoreType(i, n), t.getBtnText();
    },
    onBtnActiveTow: function(e) {
        var t = this, a = e.detail.index, o = e.detail.id;
        t.setData({
            noData: !1,
            copyRightShow: !1
        }), this.changeStoreType(a, o), t.getBtnText();
    },
    changeStoreType: function(a, o, i) {
        var n = this;
        if (1 == n.data.isClick) {
            wx.showLoading({
                title: "加载中"
            });
            for (var d = n.data.tabList.list, r = 0; r < d.length; r++) d[r].active && delete d[r].active, 
            a == r && (d[r].active = "active");
            var l = {
                ele: n,
                data: {
                    orgId: s.globalData.orgId,
                    pageIndex: 1,
                    pageSize: e.Conf.pageSize,
                    openId: s.globalData.openid,
                    categoryId: o || null
                },
                fn: function(e) {
                    console.log("切换门店类型之后的商品列表------"), n.countdown(e);
                },
                isTab: !0
            };
            n.data.showLoading = !1, n.data.loading_fail = !1, i ? n.data.hasNextPage = !0 : (n.data.hasNextPage = !1, 
            (0, t.DiscoverListM)(l)), n.data.tabList.list = d, n.data.categoryId = o, n.data.showBlank = !1, 
            n.data.pageIndex = 1, n.setData(n.data);
        }
    },
    getShopInfo: function() {
        var e = this;
        wx.request({
            url: s.globalData.host + "coupon/org/info",
            method: "post",
            data: {
                orgId: s.globalData.orgId
            },
            header: {
                "content-type": "application/json"
            },
            complete: function() {
                wx.stopPullDownRefresh();
            },
            success: function(t) {
                var a = t.data.data;
                a && (e.data.orgName = a.orgName ? a.orgName : "");
            },
            fail: function() {
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
            }
        });
    },
    onShareAppMessage: function() {
        var e = this, t = getCurrentPages(), a = s.isHasTabByTitle({
            url: t[t.length - 1].route
        });
        console.log("tempJson=", a);
        var o = "/page/discover/discover?action=goHome&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id);
        return a.check && (o = "/page/discover/discover?memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id)), 
        {
            title: s.globalData.nickName + "给你推荐了「" + e.data.orgName + "」",
            path: o,
            imageUrl: e.data.img
        };
    },
    onShow: function() {
        var e = this;
        s.setCarCountDot(), s.setMyCountDot(), this.setData({
            memberCardInfo: wx.getStorageSync("memberCardInfo")
        }), wx.getStorage({
            key: "shoppingCarGoods",
            success: function(t) {
                e.data.buyCarCount = 0, t.data.map(function(t, a) {
                    e.data.buyCarCount += t.count;
                }), e.setData(e.data);
            }
        }), 1 == wx.getStorageSync("to-shopping-mall-category-list") && (this.changeStoreType(0, null), 
        wx.removeStorageSync("to-shopping-mall-category-list"));
        var t = new Date().getTime();
        this.setData({
            onShow: t
        }), this.data.hideTime && e.countdown(this.data.shopList, this.data.hideTime);
    },
    onHide: function() {
        this.setData({
            hideTime: new Date().getTime()
        }), s.globalData.timerObj && clearTimeout(s.globalData.timerObj.discover);
    },
    jumpToNext: function(e) {
        var t = e.detail.id;
        wx.navigateTo({
            url: "/subPackage/discover/pages/" + (3 == s.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + t
        });
    },
    onReachBottom: function() {
        var a = this;
        a.data.hasNextPage && 1 == a.data.isClick && (a.data.isClick = !1, a.data.showLoading = !0, 
        a.setData(a.data), (0, t.DiscoverListM)({
            ele: a,
            data: {
                orgId: s.globalData.orgId,
                pageIndex: a.data.pageIndex,
                pageSize: e.Conf.pageSize,
                openId: s.globalData.openid,
                categoryId: a.data.categoryId
            },
            ReachBottom: !0,
            fn: function(e) {
                console.log(e), console.log("data=", a.data), a.countdown(e);
            },
            isTab: !0
        }), a.getBtnText());
    },
    onPullDownRefresh: function() {
        var a = this, n = new Date().getTime();
        if (this.setData({
            onPullDownRefresh: n,
            copyRightShow: !1,
            hasNextPage: !0
        }), 1 == a.data.isClick) {
            a.data.pageIndex = 1, a.data.showBlank = !1, a.data.showLoading = !1, a.data.isClick = !1, 
            a.setData(a.data);
            var d = a.data, r = d.pageIndex, l = d.categoryId;
            (0, t.DiscoverListM)({
                ele: a,
                data: {
                    orgId: s.globalData.orgId,
                    pageIndex: r,
                    pageSize: e.Conf.pageSize,
                    openId: s.globalData.openid,
                    categoryId: l
                },
                PullDownRefresh: !0,
                fn: function(e) {
                    console.log("data=", a.data), a.countdown(e);
                },
                isTab: !0
            }), this.setData({
                hasNextPage: !0
            }), (0, o.categoryM)({
                ele: a,
                data: {
                    xcxId: s.globalData.xcxId
                },
                fn: function() {
                    var e = a.data.categoryId, t = 0;
                    a.data.tabList.list.map(function(a, o) {
                        a.id == e && (t = o);
                    }), a.setData({
                        isClick: !0,
                        hasNextPage: !0
                    }, function() {
                        a.changeStoreType(t, e, "PullDown");
                    });
                },
                isTab: !0
            }), (0, i.getTemplateM)({
                ele: a,
                data: {
                    orgId: s.globalData.orgId,
                    type: 2
                },
                isTab: !0
            }), a.getBtnText();
        }
    },
    onClickRetry: function() {
        var a = this;
        1 == a.data.isClick && (wx.showLoading({
            title: "加载中"
        }), a.setData({
            isClick: !1,
            loading_fail: !1
        }), (0, t.DiscoverListM)({
            ele: a,
            data: {
                orgId: s.globalData.orgId,
                pageIndex: 1,
                pageSize: e.Conf.pageSize,
                openId: s.globalData.openid,
                categoryId: a.data.categoryId
            },
            fn: function(e) {
                a.countdown(e);
            },
            isTab: !0
        }), 0 == a.data.tabList.list.length && (0, o.categoryM)({
            ele: a,
            data: {
                xcxId: s.globalData.xcxId
            },
            isTab: !0
        }), (0, i.getTemplateM)({
            ele: a,
            data: {
                orgId: s.globalData.orgId,
                type: 2
            },
            isTab: !0
        }), a.getBtnText());
    },
    onAddBuyCar: function(e) {
        var t = this;
        console.log("dicover:", e.detail);
        var a = 0;
        0 == e.detail.attributeId.length && 1 == e.detail.isInfiniteInventory ? a = e.detail.inventory : 0 == e.detail.attributeId.length && 1 != e.detail.isInfiniteInventory ? (a = e.detail.inventory, 
        t.data.isShowInventory = !1) : e.detail.attributeId.map(function(e, o) {
            2 == e.isInfiniteInventory ? t.data.isShowInventory = !1 : t.data.isShowInventory = !0, 
            e.inventory && (a += e.inventory);
        }), 0 == a && 2 != e.detail.infinite ? s.showDialog(t, "该商品已售罄") : (wx.showLoading({
            title: "加载中"
        }), (0, d.newGoodsDetailM)({
            ele: t,
            isLoadCountdown: !1,
            notSetShopList: !0,
            hideLoad: !0,
            data: {
                openId: s.globalData.openid,
                id: e.detail.id
            },
            callback: function() {
                var a = t.data, o = a.bargainActivityId, i = a.isBargain, n = "initCutPriceModal_" + o, d = wx.getStorageSync(n);
                2 != i || d ? t.setData({
                    showCutPriceModal: !1
                }) : t.setData({
                    showCutPriceModal: !0
                }, function() {
                    wx.setStorageSync(n, !0);
                }), t.showCartDialog({
                    type: 1,
                    id: e.detail.id,
                    superMemberPrice: e.detail.supermemberprice ? parseFloat(e.detail.supermemberprice) / 100 : 0,
                    enableSupperMemberPrice: e.detail.enablesuppermemberprice
                });
            }
        }));
    },
    onJumpToNextShare: function(e) {
        var t = e.detail.id;
        wx.navigateTo({
            url: "/subPackage/discover/pages/" + (3 == s.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + t + "&state=guide"
        });
    },
    onPraise: function(e) {
        var t = this;
        if (!t.data.prevent) {
            t.setData({
                prevent: !0
            }), setTimeout(function() {
                t.setData({
                    prevent: !1
                });
            }, 400);
            var o = e.detail.goodsId, i = e.detail.likeid, n = e.detail.index, d = e.detail.likeStatus;
            1 != d ? (0, a.praiseM)({
                ele: t,
                data: {
                    likeid: i,
                    goodsId: o,
                    openId: s.globalData.openid
                },
                likeStatus: d,
                index: n
            }) : wx.showToast({
                title: "你已点过赞了",
                icon: "none"
            });
        }
    },
    getBtnText: function(e) {
        var t = this;
        s.getBtnText(function(e) {
            e && t.setData({
                appointmentCopy: e.appointmentCopy ? e.appointmentCopy : "立即预约",
                appointmentZeroCopy: e.appointmentZeroCopy ? e.appointmentZeroCopy : "马上咨询",
                purchaseCopy: e.purchaseCopy ? e.purchaseCopy : "立即购买"
            });
        });
    },
    goSearch: function(e) {
        wx.navigateTo({
            url: "/subPackage/discover/pages/search/search"
        });
    },
    showCartDialog: function(e) {
        console.log("showCartDialog() ---------------+++++"), console.log(e);
        var t = new Date().getTime(), a = e.type, o = this.data.pageParams.commodityAttr, i = 2 === e.enableSupperMemberPrice ? e.superMemberPrice : 0, n = this.data.shopList.filter(function(t) {
            return t.id == e.id;
        }), d = {
            types: a,
            goodInfos: {
                previewImg: n ? n[0].mainImagesUrl[0] || n[0].imgUrls[0] : "",
                price: this.data.price,
                originalPrice: "" == this.data.originalPrice ? 0 : this.data.originalPrice,
                stock: this.data.inventory2,
                count: 1,
                id: e.id,
                attributeId: [],
                attributeValue: [],
                isInfiniteInventory: this.data.isInfiniteInventory,
                isSpecial: this.data.isSpecial,
                superMemberPrice: i
            },
            commodityAttr: o,
            isShowInventory: this.data.isShowInventory,
            isSetFirstUserSelect: !0
        };
        this.setData({
            pageParams: d,
            onShow: t
        }, function() {
            wx.hideLoading();
        });
    },
    setReadySelectAttr: function(e) {
        e.detail;
    },
    closeBuyCarDialog: function() {
        this.setData({
            isShowCart: !1,
            setOutBoxStyle: "",
            inventory2: 0
        });
    }
});