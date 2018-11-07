require("../../../../../components/function/formatMsgTime/formatMsgTime");

var t = require("../../../../../components/model/discover/goods-detail/goods-detail-m"), e = (require("../../../components/model/payment-m"), 
require("../../../../../components/model/message/QRCode-collection/shop-info-m")), a = (require("../../../../../components/template/discuss/discuss"), 
require("../../../../../components/template/customer_service/customer_service")), o = (require("../../../../../components/function/jsonMerge/jsonMerge"), 
require("../../../../../components/function/checkTime/checkTime "), function(t) {
    t && t.__esModule;
}(require("../../../../../components/function/countdown/countdown")), require("../../../../../components/template/show_dialog/show_dialog")), i = (require("../../../../../util/util.js"), 
getApp());

Component({
    properties: {
        option: {
            type: Object,
            value: {},
            observer: function(t, e) {
                var a = this;
                console.log("dongtai.js========     newVal=", t), console.log(t), console.log(JSON.stringify(t)), 
                console.log(JSON.parse(JSON.stringify(t))), t && a.onSubLoad(t);
            }
        }
    },
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
    methods: {
        onSubLoad: function(o) {
            var s = this;
            wx.showLoading({
                title: "加载中"
            }), (0, t.getVisitNum)({
                goodsId: o.id
            }), "guide" == o.state && s.setData({
                guide: !0
            }), o.isDongtaiJump && s.setData({
                isDongtaiJump: !0
            }), (0, e.shopInfoM)({
                ele: s,
                data: {
                    xcxId: i.globalData.xcxId
                },
                wxml: "goodsDeatil",
                fn: function(t) {
                    s.setData({
                        orgXcxType: t.orgXcxType
                    });
                }
            }), a.looks.getOneState(i.globalData.orgId, s), "special_selling" == o.state && wx.setNavigationBarTitle({
                title: "特卖详情"
            }), s.data.goodsId = parseInt(o.id), s.data.pageParams.goodsId = o.id, s.data.state = o.state ? o.state : "", 
            s.setData(s.data), i.getBtnText(function(t) {
                t && s.setData({
                    appointmentCopy: t.appointmentCopy ? t.appointmentCopy : "立即预约",
                    appointmentZeroCopy: t.appointmentZeroCopy ? t.appointmentZeroCopy : "马上咨询",
                    purchaseCopy: t.purchaseCopy ? t.purchaseCopy : "立即购买"
                });
            }), o.action && "goHome" == o.action ? this.setData({
                showReturnIndexBtn: !0
            }) : this.setData({
                showReturnIndexBtn: !1
            }), this.onSubShow();
        },
        onSubShow: function(e) {
            var a = this, o = this;
            i.getNewOpenId(function(e) {
                (0, t.newGoodsDetailM)({
                    ele: o,
                    isLoadCountdown: !0,
                    data: {
                        openId: i.globalData.openid,
                        id: o.data.goodsId
                    },
                    callback: function(t) {
                        console.log("res=", t), o.data.pageParams.commodityAttr.length <= 0 && o.setData({
                            isShowSelectAttr: !1
                        });
                        var e = o.data, a = e.bargainActivityId, i = e.isBargain, s = "initCutPriceModal_" + a, n = wx.getStorageSync(s);
                        2 != i || n ? o.setData({
                            showCutPriceModal: !1
                        }) : o.setData({
                            showCutPriceModal: !0
                        }, function() {
                            wx.setStorageSync(s, !0);
                        });
                        "000000" == t.data.code && t.data.data.superMemberPrice && o.setData({
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
            var s = new Date().getTime();
            this.setData({
                onCopyRightShow: s
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
            i.globalData.timerObj && i.globalData.timerObj.goods_detail && clearTimeout(i.globalData.timerObj.goods_detail);
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
            if (t.data.name) var e = i.globalData.nickName + "给你推荐了「" + t.data.name + "」"; else e = i.globalData.nickName + "邀请你来逛逛" + t.data.orgName;
            t.setData({
                guide: !1
            });
            var a = getCurrentPages(), o = i.isHasTabByTitle({
                url: a[a.length - 1].route
            });
            console.log("tempJson=", o);
            var s = "/subPackage/discover/pages/" + (3 == i.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?action=goHome&id=" + t.data.id + "&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id);
            return o.check && (s = "/subPackage/discover/pages/" + (3 == i.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + t.data.id + "&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id)), 
            console.log("tempShareUrl=", s), {
                title: e,
                path: s,
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
            i.submitFormIdM(t.detail.formId, i.globalData.orgId);
            var e = this, a = t.currentTarget.dataset.id, o = "";
            1 == e.data.types ? o = "/subPackage/my/pages/order/order_sure_pickup/order_sure_pickup?id=" + a : 3 == e.data.types && (o = "/subPackage/my/pages/order/order_sure_price/order_sure_price?id=" + a + "&dateTime=" + e.data.dateTime + "&base64DateTime=" + e.data.base64DateTime), 
            wx.navigateTo({
                url: o
            });
        },
        jumpIndex: function() {
            wx.switchTab({
                url: i.globalData.HomePath
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
            t && t.detail && i.submitFormIdM(t.detail.formId, i.globalData.orgId), wx.showLoading({
                title: "请稍等"
            }), i.getNewOpenId(function(t) {
                wx.request({
                    url: i.globalData.shopMHost + "xcx/bargain/launch",
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
                        (0, o.ShowDialog)(e, "网络错误");
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
            i.submitFormIdM(t.detail.formId, i.globalData.orgId);
            var e = this, a = t.currentTarget.dataset.pintuanId, o = function(t) {
                wx.showModal({
                    title: "提示",
                    content: t,
                    showCancel: !1
                });
            };
            if (2 == this.data.isJoinPintuan) o("该商品你已有拼团，无法再次参团。"); else {
                var s = e.data, n = s.id, r = s.inventory, c = s.pintuanLeftOpenNum;
                if (0 == r) return o("该商品已售罄，无法" + (a ? "参团" : "开团")), !1;
                if (console.log("ddd" + e.data.pintuanLeftOpenNum), !a && 0 == c) return o("开团数已达上限，无法开团"), 
                !1;
                var d = "/subPackage/my/pages/order/order_sure_pickup/order_sure_pickup?from=4&id=" + n;
                a && (d += "&pintuanId=" + a), wx.navigateTo({
                    url: d
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
            }), i.submitFormIdM(t.detail.formId, i.globalData.orgId);
            var a = new Date().getTime(), o = t.target.dataset.type ? t.target.dataset.type : t.currentTarget.dataset.type, s = this.data.pageParams.commodityAttr, n = 0;
            2 == this.data.isInfiniteInventory && (n = 99999, this.data.isShowInventory = !1), 
            console.log("tempCommodityAttr=", this.data.pageParams);
            for (var r = 0, c = 0; c < s.length; c++) 2 == s[c].isInfiniteInventory ? this.data.isShowInventory = !1 : this.data.isShowInventory = !0, 
            r += s[c].stock;
            console.log("totalStock=", r);
            var d = t.currentTarget.dataset.attributeid, l = t.currentTarget.dataset.attributevalue, u = {
                types: o,
                goodInfos: {
                    previewImg: this.data.coverImage ? this.data.coverImage : this.data.imgUrls[0],
                    price: this.data.isNonSelectAll ? this.data.priceRange : this.data.setGoodsInfo.price ? this.data.setGoodsInfo.price : this.data.price,
                    originalPrice: this.data.originalPrice ? this.data.setGoodsInfo.originalPrice ? this.data.setGoodsInfo.originalPrice : this.data.originalPrice : 0,
                    stock: 2 == this.data.isInfiniteInventory ? n : this.data.inventory ? this.data.inventory : r,
                    count: this.data.buyCarDialogInfo.count,
                    id: this.data.id,
                    attributeId: d.length > 0 ? d : [],
                    attributeValue: l,
                    isInfiniteInventory: this.data.isInfiniteInventory,
                    isSpecial: this.data.isSpecial,
                    superMemberPrice: this.data.superMemberPrice
                },
                commodityAttr: s,
                isShowInventory: this.data.isShowInventory
            };
            this.setData({
                pageParams: u,
                onShow: a
            });
        },
        setReadySelectAttr: function(t) {
            var e = this, a = t.detail, o = a.count || 0, i = Object.assign({}, e.data.buyCarDialogInfo);
            i.count = o;
            var s = e.data.buyCarCount;
            a.isClickAdd && 1 == a.types && "99+" != s && "string" != typeof s && (s = (s = o + e.data.buyCarCount) > 99 ? "99+" : s), 
            !this.data.priceRange && a.priceRange ? e.setData({
                hasSelectAttrText: a.isClickAdd ? a.attributeValue.join(" ") : e.data.hasSelectAttrText,
                hasSelectAttrCode: a.attributeId,
                hasSelectAttrValue: a.attributeValue,
                buyCarCount: s,
                buyCarDialogInfo: i,
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
                buyCarCount: s,
                buyCarDialogInfo: i,
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
        },
        lookEvent: function() {
            var t = this;
            console.log("怎么会执行这个方法~"), wx.setStorage({
                key: "serviceVis",
                data: "false"
            }), t.data.serviceVis = !1, t.setData(t.data);
        },
        getOneState: function(t, e) {
            var e = e;
            wx.request({
                url: i.globalData.host + "coupon/org/info",
                method: "post",
                data: {
                    orgId: t
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    console.log("执行查询客服接口");
                    var a = t.data.data;
                    if (a) ;
                    1 == a.enableCsPopup ? (e.data.serviceVis = !1, e.setData(e.data)) : wx.getStorage({
                        key: "serviceVis",
                        success: function(t) {
                            var a = t.data;
                            console.log("客服状态为1:" + a), "true" == a ? (console.log("显示"), e.data.serviceVis = !0) : (console.log("隐藏"), 
                            e.data.serviceVis = !1), e.setData(e.data);
                        },
                        fail: function() {
                            console.log("第一次没存储客服状态信息"), e.data.serviceVis = !0, e.setData(e.data);
                        }
                    });
                }
            });
        },
        showDiscussInput: function(t) {
            console.log("showDiscussInput -------"), console.log("discussInfo=", this.data.discussInfo), 
            console.log("shopList=", this.data.shopList);
            var e = this, a = t.currentTarget.dataset.nowid, o = t.currentTarget.dataset.goodsid;
            clearTimeout(i);
            var i = setTimeout(function() {
                if (!e.data.discussInfo.inputShow) {
                    var t = wx.createAnimation({
                        duration: 200,
                        timingFunction: "ease-out"
                    });
                    e.animation = t, t.translateX(360).step(), e.data.shopList[a].animationData = e.animation.export(), 
                    e.data.shopList[a].animationDataShow = !1, e.setData(e.data), e.data.discussInfo.inputShow = !0, 
                    e.data.discussInfo.placeHolder = "请输入评论内容", e.data.discussInfo.goodsId = o, e.data.discussInfo.shopListIndex = a, 
                    e.setData(e.data);
                }
            }, 300);
        },
        DiscussInputState: function(t) {
            console.log("开始聚焦或输入");
            var e = this, a = t.detail.value;
            e.data.discussInfo.inputText = a, e.setData(e.data);
        },
        sendDiscuss: function() {
            var t = this;
            "" == t.data.discussInfo.inputText.replace(/\s+/g, "") ? wx.showModal({
                title: "温馨提示",
                confirmColor: "#ff7800",
                showCancel: !1,
                content: "请输入评论内容",
                success: function(t) {}
            }) : (DiscoverListCommentPublishM({
                data: {
                    comment: t.data.discussInfo.inputText.trim(),
                    goodsId: t.data.discussInfo.goodsId,
                    openId: i.globalData.openid
                },
                ele: t,
                fn: function() {
                    console.log("准备隐藏输入框"), t.hideDiscussInput();
                }
            }), console.log("开始发送评论"));
        },
        delDiscuss: function(t) {
            var e = this, a = t.currentTarget.dataset.belongto, o = t.currentTarget.dataset.outindex, i = t.currentTarget.dataset.selfindex, s = t.currentTarget.dataset.id;
            1 == a && wx.showModal({
                title: "删除提醒",
                content: "确定删除该评论？",
                confirmColor: "#ff7800",
                success: function(t) {
                    t.confirm ? (console.log("用户点击确定"), DiscoverListCommentDelM({
                        data: {
                            id: s
                        },
                        ele: e,
                        fn: function() {
                            e.data.shopList[o].comments.splice(i, 1), e.setData(e.data);
                        }
                    })) : t.cancel && console.log("用户点击取消");
                }
            });
        },
        clickToLick: function(t) {
            var e = t.currentTarget.dataset.goodsid, a = t.currentTarget.dataset.nowclickid, o = this;
            console.log(e), DiscoverListLikesOnM({
                data: {
                    goodsId: e,
                    openId: i.globalData.openid
                },
                ele: o,
                index: a,
                fn: function() {}
            });
        },
        clickToCancelLick: function(t) {
            t.currentTarget.dataset.nowclickid;
            var e = t.currentTarget.dataset.likeid, a = t.currentTarget.dataset.nowclickid, o = this;
            DiscoverListLikesOffM({
                data: {
                    id: e
                },
                ele: o,
                index: a,
                fn: function() {}
            });
        },
        hideDiscussInput: function() {
            console.log("隐藏评论输入框");
            var t = this;
            t.data.discussInfo.inputShow = !1, t.data.discussInfo.goodsId = 0, t.data.discussInfo.inputText = "", 
            t.data.discussInfo.shopListIndex = "", t.setData(t.data);
        },
        noMove: function() {}
    }
});