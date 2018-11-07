require("../../../../components/function/formatMsgTime/formatMsgTime");

var t = require("../../../../components/model/discover/goods-detail/goods-detail-m"), e = (require("../../components/model/payment-m"), 
require("../../../../components/model/message/QRCode-collection/shop-info-m")), a = require("../../../../components/template/discuss/discuss"), i = require("../../../../components/template/customer_service/customer_service"), o = require("../../../../components/function/jsonMerge/jsonMerge"), n = (require("../../../../components/function/checkTime/checkTime "), 
function(t) {
    t && t.__esModule;
}(require("../../../../components/function/countdown/countdown")), require("../../../../components/template/show_dialog/show_dialog")), s = (require("../../../../util/util.js"), 
getApp()), r = {
    data: {
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
        superMemberPrice: 0,
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
        defaultPoster: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/dv2.png"
    },
    onLoad: function(a) {
        var o = this;
        wx.showLoading({
            title: "加载中"
        }), (0, t.getVisitNum)({
            goodsId: a.id
        }), "guide" == a.state && o.setData({
            guide: !0
        }), a.isDongtaiJump && o.setData({
            isDongtaiJump: !0
        }), (0, e.shopInfoM)({
            ele: o,
            data: {
                xcxId: s.globalData.xcxId
            },
            wxml: "goodsDeatil",
            fn: function(t) {
                o.setData({
                    orgXcxType: t.orgXcxType
                });
            }
        }), i.looks.getOneState(s.globalData.orgId, o), "special_selling" == a.state && wx.setNavigationBarTitle({
            title: "特卖详情"
        }), o.data.goodsId = parseInt(a.id), o.data.pageParams.goodsId = a.id, o.data.state = a.state ? a.state : "", 
        o.setData(o.data), s.getBtnText(function(t) {
            t && o.setData({
                appointmentCopy: t.appointmentCopy ? t.appointmentCopy : "立即预约",
                appointmentZeroCopy: t.appointmentZeroCopy ? t.appointmentZeroCopy : "马上咨询",
                purchaseCopy: t.purchaseCopy ? t.purchaseCopy : "立即购买"
            });
        }), a.action && "goHome" == a.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    onShow: function(e) {
        var a = this, i = this;
        s.getNewOpenId(function(e) {
            (0, t.newGoodsDetailM)({
                ele: i,
                isLoadCountdown: !0,
                data: {
                    openId: s.globalData.openid,
                    id: i.data.goodsId
                },
                callback: function(t) {
                    console.log("res=", t), i.data.pageParams.commodityAttr.length <= 0 && i.setData({
                        isShowSelectAttr: !1
                    });
                    var e = i.data, a = e.bargainActivityId, o = e.isBargain, n = "initCutPriceModal_" + a, s = wx.getStorageSync(n);
                    2 != o || s ? i.setData({
                        showCutPriceModal: !1
                    }) : i.setData({
                        showCutPriceModal: !0
                    }, function() {
                        wx.setStorageSync(n, !0);
                    });
                    "000000" == t.data.code && t.data.data.superMemberPrice && i.setData({
                        superMemberPrice: parseFloat(t.data.data.superMemberPrice / 100)
                    });
                }
            });
        }), wx.getStorage({
            key: "shoppingCarGoods",
            success: function(t) {
                var e = 0;
                t.data.map(function(t) {
                    e += t.count;
                }), e > 99 && (e = "99+"), a.setData({
                    buyCarCount: e
                });
            }
        });
        var o = new Date().getTime();
        this.setData({
            onCopyRightShow: o
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
    clearTimer: function() {
        s.globalData.timerObj && s.globalData.timerObj.goods_detail && clearTimeout(s.globalData.timerObj.goods_detail);
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
        if (t.data.name) var e = s.globalData.nickName + "给你推荐了「" + t.data.name + "」"; else e = s.globalData.nickName + "邀请你来逛逛" + t.data.orgName;
        t.setData({
            guide: !1
        });
        var a = getCurrentPages(), i = s.isHasTabByTitle({
            url: a[a.length - 1].route
        });
        console.log("tempJson=", i);
        var o = "/subPackage/discover/pages/" + (3 == s.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?action=goHome&id=" + t.data.id + "&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id);
        return i.check && (o = "/subPackage/discover/pages/" + (3 == s.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + t.data.id + "&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id)), 
        console.log("tempShareUrl=", o), {
            title: e,
            path: o,
            imageUrl: t.data.img
        };
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
        s.submitFormIdM(t.detail.formId, s.globalData.orgId);
        var e = this, a = t.currentTarget.dataset.id, i = "";
        1 == e.data.types ? i = "/subPackage/my/pages/order/order_sure_pickup/order_sure_pickup?id=" + a : 3 == e.data.types && (i = "/subPackage/my/pages/order/order_sure_price/order_sure_price?id=" + a + "&dateTime=" + e.data.dateTime + "&base64DateTime=" + e.data.base64DateTime), 
        wx.navigateTo({
            url: i
        });
    },
    jumpIndex: function() {
        wx.switchTab({
            url: s.globalData.HomePath
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
        t && t.detail && s.submitFormIdM(t.detail.formId, s.globalData.orgId), wx.showLoading({
            title: "请稍等"
        }), s.getNewOpenId(function(t) {
            wx.request({
                url: s.globalData.shopMHost + "xcx/bargain/launch",
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
                    (0, n.ShowDialog)(e, "网络错误");
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        });
    },
    toCutPrice: function() {
        wx.navigateTo({
            url: "/subPackage/discover/pages/cut_price/cut_price?id=" + this.data.bargainLaunchId
        });
    },
    openPintuan: function(t) {
        s.submitFormIdM(t.detail.formId, s.globalData.orgId);
        var e = this, a = t.currentTarget.dataset.pintuanId, i = function(t) {
            wx.showModal({
                title: "提示",
                content: t,
                showCancel: !1
            });
        };
        if (2 == this.data.isJoinPintuan) i("该商品你已有拼团，无法再次参团。"); else {
            var o = e.data, n = o.id, r = o.inventory, d = o.pintuanLeftOpenNum;
            if (0 == r) return i("该商品已售罄，无法" + (a ? "参团" : "开团")), !1;
            if (console.log("ddd" + e.data.pintuanLeftOpenNum), !a && 0 == d) return i("开团数已达上限，无法开团"), 
            !1;
            var c = "/subPackage/my/pages/order/order_sure_pickup/order_sure_pickup?from=4&id=" + n;
            a && (c += "&pintuanId=" + a), wx.navigateTo({
                url: c
            });
        }
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
        }), s.submitFormIdM(t.detail.formId, s.globalData.orgId);
        var a = new Date().getTime(), i = t.target.dataset.type ? t.target.dataset.type : t.currentTarget.dataset.type, o = this.data.pageParams.commodityAttr, n = 0;
        2 == this.data.isInfiniteInventory && (n = 99999, this.data.isShowInventory = !1), 
        console.log("tempCommodityAttr=", this.data.pageParams);
        for (var r = 0, d = 0; d < o.length; d++) 2 == o[d].isInfiniteInventory ? this.data.isShowInventory = !1 : this.data.isShowInventory = !0, 
        r += o[d].stock;
        console.log("totalStock=", r);
        var c = t.currentTarget.dataset.attributeid, l = t.currentTarget.dataset.attributevalue, u = {
            types: i,
            goodInfos: {
                previewImg: this.data.coverImage ? this.data.coverImage : this.data.imgUrls[0],
                price: this.data.isNonSelectAll ? this.data.priceRange : this.data.setGoodsInfo.price ? this.data.setGoodsInfo.price : this.data.price,
                originalPrice: this.data.originalPrice ? this.data.setGoodsInfo.originalPrice ? this.data.setGoodsInfo.originalPrice : this.data.originalPrice : 0,
                stock: 2 == this.data.isInfiniteInventory ? n : this.data.inventory ? this.data.inventory : r,
                count: this.data.buyCarDialogInfo.count,
                id: this.data.id,
                attributeId: c.length > 0 ? c : [],
                attributeValue: l,
                isInfiniteInventory: this.data.isInfiniteInventory,
                isSpecial: this.data.isSpecial,
                superMemberPrice: this.data.superMemberPrice
            },
            commodityAttr: o,
            isShowInventory: this.data.isShowInventory
        };
        this.setData({
            pageParams: u,
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
    setDiscussValue: function(t) {
        console.log("setDiscussValue---- "), console.log(t), this.setData({
            shopList: t.detail.shopList
        });
    }
}, d = (0, o.jsonMerge)(r, i.looks), c = (0, o.jsonMerge)(d, a.discuss);

Page(c);