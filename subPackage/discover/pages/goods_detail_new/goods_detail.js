function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

require("../../../../components/function/formatMsgTime/formatMsgTime");

var e = require("../../../../components/model/discover/goods-detail/goods-detail-m"), a = (require("../../components/model/payment-m"), 
require("../../../../components/model/message/QRCode-collection/shop-info-m")), i = require("../../../../components/template/discuss/discuss"), o = require("../../../../components/template/customer_service/customer_service"), n = require("../../../../components/function/jsonMerge/jsonMerge"), s = (require("../../../../components/function/checkTime/checkTime "), 
function(t) {
    t && t.__esModule;
}(require("../../../../components/function/countdown/countdown")), require("../../../../components/template/show_dialog/show_dialog")), r = (require("../../../../util/util.js"), 
getApp()), d = {
    data: {
        show: !1,
        oneClick: 1,
        thumLogo: "",
        imgUrls: [],
        name: "",
        orgName: "",
        logo: "",
        goodsDesc: "",
        img: "",
        publishTime: "",
        id: "",
        shopList: [],
        discussInfo: {
            inputShow: !1,
            goodsId: 0,
            inputText: "",
            placeHolder: "请输入评论内容",
            shopListIndex: ""
        },
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        enableCs: "",
        showContent: !1,
        guide: !1,
        serviceVis: !1,
        types: 1,
        date: "2016-09-01",
        buyCarCount: 0,
        base64DateTime: "",
        buyCarDialogInfo: {
            checkGoodsTypeBg: "",
            showCheckGoodsTypeBg: !1,
            showCheckGoodsType: !1,
            index: 0,
            count: 1
        },
        cdl_price01: 0,
        cdl_price02: 0,
        timeArr: null,
        isShow: null,
        showCutPriceModal: null,
        goods: {},
        tabList: [],
        hasSelectAttrText: "",
        hasSelectAttrCode: "",
        hasSelectAttrValue: [],
        onPullDownRefresh: "",
        onReachBottom: "",
        onHide: "",
        onShow: "",
        onCopyRightShow: "",
        copyRightShow: !1,
        pageParams: {
            types: "",
            goodInfos: {},
            commodityAttr: [],
            isShowInventory: !1
        },
        coverImage: "",
        originalPrice: 0,
        appointmentCopy: "我要预约",
        appointmentZeroCopy: "马上咨询",
        isShowSelectAttr: !0,
        inventory: 0,
        isShowSale: !1,
        setOutBoxStyle: "",
        isShowCart: !1,
        appointmentExpire: !1,
        showReturnIndexBtn: !1,
        orgXcxType: 0,
        priceRange: null,
        isNonSelectAll: !1,
        setGoodsInfo: {
            price: null,
            originalPrice: null,
            stock: null
        },
        state: "",
        isSpecial: 1,
        isInfiniteInventory: 1,
        curr_id: "",
        defaultPoster: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/dv2.png",
        currentBannerIndex: 0,
        tabItemIndex: 0,
        goodDetailTabList: [ "图文详情", "商品评论" ],
        isFixed: !1,
        textShow: !1,
        onLoadOption: {},
        maxPrice: ""
    },
    linkToOpenPage: function() {
        wx.navigateTo({
            url: "/subPackage/vipCenter/pages/superVip/superVip"
        });
    },
    superVipHandler: function() {
        !this.data.memberCardInfo || 2 !== this.data.memberCardInfo.vip && 3 !== this.data.memberCardInfo.vip ? this.linkToOpenPage() : 2 !== this.data.memberCardInfo.vip && 3 !== this.data.memberCardInfo.vip || this.showCoinDesc();
    },
    likeThisProduct: function() {
        var t = this;
        1 != this.data.shopList[0].likeStatus ? r.ajaxSubmit({
            url: r.globalData.shopMHost + "xcx/org/goods/like/add",
            method: "post",
            data: {
                goodsId: this.data.id,
                openId: r.globalData.openid
            },
            isHideLoading: !0
        }).then(function(e) {
            "000000" === e.data.code && t.setData({
                show: !0
            }, function() {
                t.onShow(), t.getGoodsInfo();
            }), "900000" === e.data.code && wx.showToast({
                title: "你已经赞过了",
                icon: "none"
            });
        }) : wx.showToast({
            title: "你已经赞过了",
            icon: "none"
        });
    },
    showCoinDesc: function() {
        var t = this;
        wx.showModal({
            title: "获取金币说明详情",
            content: "分享后你的好友若购买了此商品，你将获得相应的金币。若该好友已与其他超级会员绑定，你只能获得一半的金币",
            confirmColor: "#ff7800",
            confirmText: "马上分享",
            success: function(e) {
                e.confirm && t.linkToSharePage();
            }
        });
    },
    linkToSharePage: function() {
        wx.navigateTo({
            url: "/subPackage/discover/pages/goods_share/goods_share?id=" + this.data.id
        });
    },
    isBindCard: function() {
        var t = this;
        r.isBindMemberCard().then(function(e) {
            "000000" == e.data.code && t.setData({
                superVip: 2 == e.data.data.superVip,
                memberCardEnable: e.data.data.enableMemberCard,
                memberCardRemark: e.data.data.remark,
                enableReturnGive: e.data.data.enableReturnGive
            }, function() {
                2 == t.data.memberCardEnable && t.getVipCradInfo();
            });
        });
    },
    getVipCradInfo: function() {
        var t = this;
        r.getVipCradInfo().then(function(e) {
            "000000" === e.data.code && t.setData({
                memberCardInfo: e.data.data
            });
        });
    },
    onLoad: function(t) {
        var i = this;
        console.log("onLoad(): option=", t), i.setData({
            onLoadOption: t
        }), wx.showLoading({
            title: "加载中"
        }), (0, e.getVisitNum)({
            goodsId: t.id
        }), "guide" == t.state && i.setData({
            guide: !0
        }), i.setData({
            id: t.id
        }), t.isDongtaiJump && i.setData({
            isDongtaiJump: !0
        }), o.looks.getOneState(r.globalData.orgId, i), "special_selling" == t.state && wx.setNavigationBarTitle({
            title: "特卖详情"
        }), i.data.goodsId = parseInt(t.id), i.data.pageParams.goodsId = t.id, i.data.state = t.state ? t.state : "", 
        i.setData(i.data), r.getBtnText(function(t) {
            t && i.setData({
                appointmentCopy: t.appointmentCopy ? t.appointmentCopy : "立即预约",
                appointmentZeroCopy: t.appointmentZeroCopy ? t.appointmentZeroCopy : "马上咨询",
                purchaseCopy: t.purchaseCopy ? t.purchaseCopy : "立即购买"
            });
        }), t.action && "goHome" == t.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        }), this.isBindCard(), (0, a.shopInfoM)({
            ele: i,
            data: {
                xcxId: r.globalData.xcxId
            },
            wxml: "goodsDeatil",
            fn: function(t) {
                i.setData({
                    orgXcxType: t.orgXcxType
                });
            }
        }), this.getGoodsInfo();
    },
    onShow: function(t) {
        var e = this;
        wx.getStorage({
            key: "shoppingCarGoods",
            success: function(t) {
                var a = 0;
                t.data.map(function(t) {
                    a += t.count;
                }), a > 99 && (a = "99+"), e.setData({
                    buyCarCount: a
                });
            }
        });
        var a = new Date().getTime();
        this.setData({
            onCopyRightShow: a
        });
    },
    onHide: function() {
        var t = new Date().getTime();
        this.setData({
            serviceVis: !1,
            onHide: t
        });
    },
    onUnload: function() {
        this.clearTimer();
    },
    getGoodsInfo: function() {
        var a = this, i = this;
        r.getNewOpenId(function(o) {
            (0, e.newGoodsDetailM)({
                ele: i,
                isLoadCountdown: !0,
                data: {
                    openId: r.globalData.openid,
                    id: i.data.goodsId
                },
                callback: function() {
                    i.data.pageParams.commodityAttr.length <= 0 && i.setData({
                        isShowSelectAttr: !1
                    });
                    var e = i.data, o = e.bargainActivityId, n = e.isBargain, s = "initCutPriceModal_" + o, r = i.data.shopList;
                    1 === r[0].likeStatus && (r[0].likeStatus = 2);
                    var d = wx.getStorageSync(s);
                    if (2 != n || d ? i.setData({
                        showCutPriceModal: !1,
                        shopList: r
                    }) : i.setData({
                        showCutPriceModal: !0,
                        shopList: r
                    }, function() {
                        wx.setStorageSync(s, !0);
                    }), a.data.shopList[0].commodityAttr.length) {
                        var c = [].concat(t(a.data.shopList[0].commodityAttr));
                        c.sort(function(t, e) {
                            return e.price - t.price;
                        }), a.setData({
                            maxPrice: c[0].price
                        });
                    }
                }
            });
        });
    },
    checkoutTab: function(t) {
        t.currentTarget.dataset.index != this.data.tabItemIndex && this.setData({
            tabItemIndex: t.currentTarget.dataset.index
        });
    },
    previewProductImage: function(t) {
        var e = this.data.shopList[0].mainImagesUrl;
        wx.previewImage({
            current: e[t.currentTarget.dataset.index],
            urls: e
        });
    },
    clearTimer: function() {
        r.globalData.timerObj && r.globalData.timerObj.goods_detail && clearTimeout(r.globalData.timerObj.goods_detail);
    },
    openPintuanRule: function() {
        this.setData({
            pintuanRule: !0
        });
    },
    openKanjiaRule: function() {
        this.setData({
            kanjiaRule: !0
        });
    },
    closeRuleModal: function() {
        this.setData({
            kanjiaRule: !1,
            pintuanRule: !1
        });
    },
    onShareAppMessage: function() {
        var t = this;
        if (t.data.name) var e = r.globalData.nickName + "给你推荐了「" + t.data.name + "」"; else e = r.globalData.nickName + "邀请你来逛逛" + t.data.orgName;
        t.setData({
            guide: !1
        });
        var a = getCurrentPages(), i = r.isHasTabByTitle({
            url: a[a.length - 1].route
        });
        console.log("tempJson=", i);
        var o = "/subPackage/discover/pages/" + (3 == r.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + t.data.id + "&action=goHome&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id);
        return i.check && (o = "/subPackage/discover/pages/" + (3 == r.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + t.data.id + "&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id)), 
        console.log("tempShareUrl=", o), {
            title: e,
            path: o,
            imageUrl: t.data.shopList[0].coverImage || t.data.img
        };
    },
    getCurrentBannerIndex: function(t) {
        this.setData({
            currentBannerIndex: t.detail.current
        });
    },
    previewImage: function(t) {
        wx.previewImage({
            current: t.target.dataset.src,
            urls: this.data.imgUrls
        });
    },
    previewGoodsImage: function(t) {
        var e = [];
        this.data.imgTextHybr.map(function(t) {
            t.img && e.push(t.img);
        }), wx.previewImage({
            current: t.currentTarget.dataset.src,
            urls: e
        });
    },
    hidden: function() {
        this.setData({
            guide: !1
        });
    },
    startMovePage: function() {
        var t = this, e = parseInt(t.data.discussInfo.shopListIndex);
        if (!isNaN(e) && t.data.shopList[e].animationDataShow) {
            var a = wx.createAnimation({
                duration: 200,
                timingFunction: "linear"
            });
            t.animation = a, a.translateX(360).step(), t.data.shopList[e].animationData = t.animation.export(), 
            t.data.shopList[e].animationDataShow = !1, t.setData(t.data);
        }
    },
    jumpOrderSure: function(t) {
        r.submitFormIdM(t.detail.formId, r.globalData.orgId);
        var e = this, a = t.currentTarget.dataset.id, i = "";
        1 == e.data.types ? i = "/subPackage/my/pages/order/order_sure_pickup/order_sure_pickup?id=" + a : 3 == e.data.types && (i = "/subPackage/my/pages/order/order_sure_price/order_sure_price?id=" + a + "&dateTime=" + e.data.dateTime + "&base64DateTime=" + e.data.base64DateTime), 
        wx.navigateTo({
            url: i
        });
    },
    jumpIndex: function() {
        wx.switchTab({
            url: r.globalData.HomePath
        });
    },
    onPullDownRefresh: function() {
        var t = new Date().getTime();
        this.setData({
            onPullDownRefresh: t
        });
    },
    jumpBuyCar: function() {
        wx.navigateTo({
            url: "/subPackage/my/pages/buy_car/buy_car"
        });
    },
    specialDialog: function(t) {
        var e = "";
        e = 1 == t.currentTarget.dataset.type ? "此商品为超大金额商品，不支持小程序中直接购买，请与商家客服联系" : "此商品未设置价格，不支持小程序中直接购买，请与商家客服联系", 
        wx.showModal({
            title: "不支持购买",
            content: e,
            showCancel: !1
        });
    },
    doCutPrice: function(t) {
        var e = this;
        r.userInfoMiddleWare(!0).then(function(a) {
            a.isGetUserInfo ? (t && t.detail && r.submitFormIdM(t.detail.formId, r.globalData.orgId), 
            wx.showLoading({
                title: "请稍等"
            }), r.getNewOpenId(function(t) {
                wx.request({
                    url: r.globalData.shopMHost + "xcx/bargain/launch",
                    data: {
                        activityId: e.data.bargainActivityId,
                        openId: t
                    },
                    method: "POST",
                    success: function(t) {
                        "000000" == t.data.code ? wx.navigateTo({
                            url: "/subPackage/discover/pages/cut_price/cut_price?from=publish&id=" + t.data.data.id
                        }) : wx.showModal({
                            title: "提示",
                            content: t.data.msg,
                            showCancel: !1
                        });
                    },
                    fail: function() {
                        (0, s.ShowDialog)(e, "网络错误");
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                });
            })) : wx.eventBus.trigger("showOnAuthShow");
        });
    },
    toCutPrice: function() {
        wx.navigateTo({
            url: "/subPackage/discover/pages/cut_price/cut_price?id=" + this.data.bargainLaunchId
        });
    },
    openPintuan: function(t) {
        var e = this, a = this;
        r.userInfoMiddleWare(!0).then(function(i) {
            if (i.isGetUserInfo) {
                r.submitFormIdM(t.detail.formId, r.globalData.orgId);
                var o = t.currentTarget.dataset.pintuanId, n = function(t) {
                    wx.showModal({
                        title: "提示",
                        content: t,
                        showCancel: !1
                    });
                };
                if (2 == e.data.isJoinPintuan) n("该商品你已有拼团，无法再次参团。"); else {
                    var s = a.data, d = s.id, c = s.inventory, l = s.pintuanLeftOpenNum;
                    if (0 == c) return n("该商品已售罄，无法" + (o ? "参团" : "开团")), !1;
                    if (console.log("ddd" + a.data.pintuanLeftOpenNum), !o && 0 == l) return n("开团数已达上限，无法开团"), 
                    !1;
                    var u = "/subPackage/my/pages/order/order_sure_pickup/order_sure_pickup?from=4&id=" + d;
                    o && (u += "&pintuanId=" + o), wx.navigateTo({
                        url: u
                    });
                }
            } else wx.eventBus.trigger("showOnAuthShow");
        });
    },
    toPintuanDetail: function(t) {
        wx.navigateTo({
            url: "/subPackage/discover/pages/pintuan_detail/pintuan_detail?id=" + this.data.joinOpentuanId
        });
    },
    closeCutPriceModal: function() {
        this.setData({
            showCutPriceModal: !1
        });
    },
    showCartDialog: function(t) {
        this.setData({
            curr_id: ""
        });
        var e = wx.getSystemInfoSync();
        this.setData({
            isShowCart: !0,
            copyRightShow: !1,
            setOutBoxStyle: "height:" + (2 * e.windowHeight - 100) + "rpx;overflow:hidden;"
        }), r.submitFormIdM(t.detail.formId, r.globalData.orgId), console.log("showCartDialog() ---------------+++++"), 
        console.log(t);
        var a = new Date().getTime(), i = t.target.dataset.type ? t.target.dataset.type : t.currentTarget.dataset.type, o = this.data.pageParams.commodityAttr, n = 0;
        2 == this.data.isInfiniteInventory && (n = 99999, this.data.isShowInventory = !1), 
        console.log("tempCommodityAttr=", this.data.pageParams), console.log("this.data.shopList=", this.data.shopList);
        for (var s = 0, d = 0; d < o.length; d++) 2 == o[d].isInfiniteInventory ? this.data.isShowInventory = !1 : this.data.isShowInventory = !0, 
        s += o[d].stock;
        console.log("totalStock=", s);
        var c = t.currentTarget.dataset.attributeid, l = t.currentTarget.dataset.attributevalue, u = 2 === this.data.shopList[0].enableSupperMemberPrice ? parseFloat(this.data.shopList[0].superMemberPrice) / 100 : 0, g = {
            types: i,
            goodInfos: {
                previewImg: this.data.shopList[0].mainImagesUrl[0] || this.data.imgUrls[0],
                price: this.data.isNonSelectAll ? this.data.priceRange : this.data.setGoodsInfo.price ? this.data.setGoodsInfo.price : this.data.price,
                originalPrice: this.data.originalPrice ? this.data.setGoodsInfo.originalPrice ? this.data.setGoodsInfo.originalPrice : this.data.originalPrice : 0,
                stock: 2 == this.data.isInfiniteInventory ? n : this.data.inventory ? this.data.inventory : s,
                count: this.data.buyCarDialogInfo.count,
                id: this.data.id,
                attributeId: c.length > 0 ? c : [],
                attributeValue: l,
                isInfiniteInventory: this.data.isInfiniteInventory,
                isSpecial: this.data.isSpecial,
                superMemberPrice: u
            },
            commodityAttr: o,
            isShowInventory: this.data.isShowInventory
        };
        this.setData({
            pageParams: g,
            onShow: a
        });
    },
    setReadySelectAttr: function(t) {
        var e = this, a = t.detail, i = a.count || 0, o = Object.assign({}, e.data.buyCarDialogInfo);
        o.count = i;
        var n = e.data.buyCarCount;
        a.isClickAdd && 1 == a.types && "99+" != n && "string" != typeof n && (n = (n = i + e.data.buyCarCount) > 99 ? "99+" : n), 
        !this.data.priceRange && a.priceRange ? e.setData({
            hasSelectAttrText: a.isClickAdd ? a.attributeValue.join(" ") : e.data.hasSelectAttrText,
            hasSelectAttrCode: a.attributeId,
            hasSelectAttrValue: a.attributeValue,
            buyCarCount: n,
            buyCarDialogInfo: o,
            productId: a.id,
            price: a.isClickAdd ? a.price : e.data.price,
            originalPrice: a.isClickAdd ? a.originalPrice : e.data.originalPrice,
            inventory: a.stock,
            priceRange: a.priceRange,
            setGoodsInfo: {
                price: a.price,
                originalPrice: a.originalPrice,
                stock: a.stock
            }
        }) : e.setData({
            hasSelectAttrText: a.isClickAdd ? a.attributeValue.join(" ") : e.data.hasSelectAttrText,
            hasSelectAttrCode: a.attributeId,
            hasSelectAttrValue: a.attributeValue,
            buyCarCount: n,
            buyCarDialogInfo: o,
            productId: a.id,
            price: a.isClickAdd ? a.price : e.data.price,
            originalPrice: a.isClickAdd ? a.originalPrice : e.data.originalPrice,
            inventory: a.stock,
            setGoodsInfo: {
                price: a.price,
                originalPrice: a.originalPrice,
                stock: a.stock
            }
        });
    },
    setSelectPrices: function(t) {
        var e = t.detail;
        this.setData({
            price: e.price,
            originalPrice: e.originalPrice,
            inventory: e.stock
        });
    },
    closeBuyCarDialog: function(t) {
        t.detail.isNonSelectAll ? this.setData({
            isNonSelectAll: !0
        }) : this.setData({
            isNonSelectAll: !1
        }), this.setData({
            isShowCart: !1,
            setOutBoxStyle: "",
            copyRightShow: !0
        });
    },
    videoPlay: function(t) {
        this.setData({
            curr_id: t.currentTarget.dataset.index + 1
        }), wx.createVideoContext("video-" + t.currentTarget.dataset.index).play();
    },
    onPageScroll: function(t) {
        var e = this;
        2 !== this.data.types && wx.createSelectorQuery().select(".detail-intro-body").boundingClientRect().exec(function(t) {
            t[0].top <= 0 && !e.data.isFixed ? e.setData({
                isFixed: !0
            }) : t[0].top > 0 && e.data.isFixed && e.setData({
                isFixed: !1
            }), setTimeout(function() {
                !e.data.textShow && t[0].top < 400 && e.setData({
                    textShow: !0
                });
            }, 500);
        });
    },
    discussSuccess: function() {
        var t = this;
        (0, e.newGoodsDetailM)({
            ele: this,
            isLoadCountdown: !0,
            data: {
                openId: r.globalData.openid,
                id: this.data.goodsId
            },
            callback: function() {
                t.data.pageParams.commodityAttr.length <= 0 && t.setData({
                    isShowSelectAttr: !1
                });
                var e = t.data, a = e.bargainActivityId, i = e.isBargain, o = "initCutPriceModal_" + a, n = wx.getStorageSync(o);
                2 != i || n ? t.setData({
                    showCutPriceModal: !1
                }) : t.setData({
                    showCutPriceModal: !0
                }, function() {
                    wx.setStorageSync(o, !0);
                });
            }
        }), wx.hideLoading();
    }
}, c = (0, n.jsonMerge)(d, o.looks), l = (0, n.jsonMerge)(c, i.discuss);

Page(l);