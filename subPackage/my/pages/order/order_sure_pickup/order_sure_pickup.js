var e = require("../../../../../components/model/buy_car/buy_car"), t = (require("../../../../../util/util"), 
require("../../../../../components/model/discover/goods-detail/goods-detail-m")), a = require("./order-goods-payment-m.js"), i = require("../../../../../components/conf/conf"), n = require("../../../../../components/model/discover/cut-price-m"), r = require("../../../../../components/model/discover/pintuan-m"), o = require("../../../../../components/function/arr-remove-duplicates/arr-remove-duplicates"), s = require("../../../../../components/model/my/my_m"), c = require("../../../../../components/function/base64/base64"), d = getApp(), u = i.Conf.shoppingCarStorageKey;

Page({
    data: {
        totalPrice: 0,
        freight: 0,
        discounts: 0,
        payablePrice: 0,
        goodsList: [],
        shippingAddress: "添加收货地址",
        userName: null,
        telNumber: null,
        isExpand: !0,
        currentTab: 1,
        pintuanId: null,
        isFullAmount: "1",
        fullAmountPrice: "",
        isClick: !0,
        textAreaValue: "",
        isShowPayWayDialog: !1,
        payList: [ {
            name: "微信支付",
            icon: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/wechat.png",
            key: "wx",
            use: !1
        }, {
            name: "会员卡支付",
            icon: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/VIPcardyue.png",
            key: "vip",
            use: !1
        }, {
            name: "货到付款",
            key: "hdfk",
            use: !1
        }, {
            name: "到店支付",
            key: "ddzf",
            use: !1
        } ],
        psPayIndex: 0,
        zqPayIndex: 0,
        showPayPwdInput: !1,
        balance: 0,
        isSetPwd: 1,
        password: "",
        enableReturnGive: 1,
        memberCardInfo: null,
        isShowwMemberCardTip: !1
    },
    onLoad: function(e) {
        var a = this;
        console.log("页面参数-------", e), wx.showLoading({
            title: "加载中..."
        });
        var i = e.from ? e.from : 1, s = e.pintuanId ? e.pintuanId : null, c = e.count ? e.count : 1, u = e.attributeId ? e.attributeId : null, l = e.id ? e.id : 0, m = e.launchId ? e.launchId : null;
        this.setData({
            from: i,
            id: l,
            attributeId: u,
            count: c,
            launchId: m,
            pintuanId: s,
            isSuperVip: !(!wx.getStorageSync("memberCardInfo") || 2 != wx.getStorageSync("memberCardInfo").vip && 3 != wx.getStorageSync("memberCardInfo").vip),
            memberCardInfo: wx.getStorageSync("memberCardInfo")
        });
        var p = this;
        d.getNewOpenId(function(e) {
            1 == i || 4 == i ? 4 == i && s ? (0, r.getPintuanInfo)({
                ele: p,
                data: {
                    openId: e,
                    openTuanId: s
                },
                fn: function(e) {
                    e.id = e.productId, e.imageUrls = e.productCoverImage, e.count = +c, e.price = e.pintuanPrice, 
                    e.originalPrice = e.currentPrice, p.getShopConfig(e), p.calculatePrice(e), p.canMemberCardPay();
                }
            }) : (0, t.newGoodsInfo)({
                openId: e,
                id: l
            }, function(e, t) {
                if (a.getShopConfig(t), wx.hideLoading(), e) return d.ShowDialog(p, "网络连接失败");
                if (t.imageUrls = t.imgUrls[0], t.count = c, 1 == i && u) if (u.indexOf(",") > -1) {
                    t.attributeId = u;
                    for (var n = [], r = 0; r < t.commodityAttr.length; r++) {
                        for (var l = [], m = [], h = 0; h < t.commodityAttr[r].attrValueList.length; h++) l.push(t.commodityAttr[r].attrValueList[h].attrCode), 
                        m.push(t.commodityAttr[r].attrValueList[h].attrValue);
                        n.push({
                            index: r,
                            code: l,
                            value: m.join(" ")
                        });
                    }
                    var g = u.split(",");
                    t.defaultAttrId = g[0], t.defaultSecondAttrId = g[1];
                    for (var f = {}, y = 0; y < n.length; y++) if ((0, o.compareSameValue)(g, n[y].code)) {
                        f.value = n[y].value, f.index = n[y].index;
                        break;
                    }
                    t.attrName = f.value, t.price = t.commodityAttr[f.index].price, t.originalPrice = t.commodityAttr[f.index].originalPrice;
                } else t.commodityAttr.map(function(e) {
                    e.attrValueList.map(function(a) {
                        a.attrCode == u && (t.attributeId = +u, t.attrName = a.attrValue, t.price = e.price, 
                        t.originalPrice = e.originalPrice);
                    });
                }), t.defaultAttrId = u;
                4 != i || s || (t.originalPrice = t.originalPrice || t.price, t.price = t.pintuanPrice), 
                p.calculatePrice(t), p.canMemberCardPay();
            }) : 2 == i ? a.setBuyCarData() : 3 == i && (0, n.getCutPriceInfo)({
                ele: a,
                data: {
                    launchId: m,
                    openId: e
                },
                fn: function(e) {
                    e.id = e.productId, e.imageUrls = e.productCoverImage, e.count = +c, e.price = e.currentPrice, 
                    p.calculatePrice(e), a.getShopConfig(e), p.canMemberCardPay();
                }
            });
        });
    },
    onShow: function() {
        this.data.firstRequest && this.canMemberCardPay();
    },
    calculatePrice: function(e) {
        var t = 0, a = 0, i = 0;
        3 == this.data.from ? i = (t = (e.goodsOriginalPrice ? e.goodsOriginalPrice : e.originalPrice) * e.count) - (a = (e.goodsOriginalPrice ? e.goodsOriginalPrice - e.currentPrice : e.originalPrice - e.price) * e.count) : (a = e.originalPrice ? (e.originalPrice - (this.data.isSuperVip && 2 !== e.isPintuan && e.superMemberPrice && 2 == e.enableSupperMemberPrice ? e.superMemberPrice : e.price)) * e.count : this.data.isSuperVip && 2 !== e.isPintuan && e.superMemberPrice && 2 == e.enableSupperMemberPrice ? (e.price - e.superMemberPrice) * e.count : 0, 
        i = (t = (e.originalPrice || e.price) * e.count) - a), this.setData({
            goods: e,
            goodsList: [ e ],
            totalPrice: t,
            discounts: a,
            payablePrice: i,
            firstRequest: !0
        });
    },
    setBuyCarData: function() {
        var t = this, a = this;
        (0, e.getBuyCarInfo)(function(e, i) {
            if (wx.hideLoading(), "boolean" == typeof e && e && goods.length <= 0) return d.showDialog(a, "数据异常");
            var n = i.length, r = 0, o = 0;
            i.forEach(function(e) {
                r += (e.originalPrice || e.price || e.superMemberPrice && 2 == e.enableSupperMemberPrice) * e.count, 
                o += e.originalPrice ? (e.originalPrice - (t.data.isSuperVip && e.superMemberPrice && 2 == e.enableSupperMemberPrice ? e.superMemberPrice : e.price)) * e.count : t.data.isSuperVip && e.superMemberPrice && 2 == e.enableSupperMemberPrice ? (e.price - e.superMemberPrice) * e.count : 0;
            }), a.setData({
                osHeight: n <= 3 ? 190 * n + "rpx" : "570rpx",
                isExpand: !(n <= 3),
                goodsList: i,
                totalPrice: r,
                discounts: o,
                payablePrice: r - o
            }), t.getShopConfig(), a.canMemberCardPay();
        });
    },
    getShopConfig: function(e) {
        var t = this, a = this, e = e;
        console.log("商品详情-----", e), wx.request({
            url: d.globalData.shopMHost + "xcx/shopConfig/get",
            method: "post",
            data: {
                xcxId: d.globalData.xcxId
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if ("000000" == e.data.code) {
                    var i = e.data.data, n = "", r = 0;
                    !i.mailedPackagPrice || 0 == i.mailedPackagPrice && null == i.mailedPackagPrice ? (n = "1", 
                    r = 0) : (n = "2", r = i.mailedPackagPrice);
                    var o = a.data.payList, s = 0, c = 0;
                    2 == i.weixinPay && (o[0].use = !0), 2 == i.cashOnDelivery && 4 != t.data.from && (o[2].use = !0, 
                    1 != i.defaultPayMethod && (s = 2)), 2 == i.payAtStore && 4 != t.data.from && (o[3].use = !0, 
                    1 != i.defaultPayMethod && (c = 3)), t.setData({
                        payConfig: i,
                        freight: i.freight,
                        isFullAmount: n,
                        fullAmountPrice: r,
                        payList: o,
                        psPayIndex: s,
                        zqPayIndex: c
                    }, function() {
                        2 == i.delivery && t.chooseAddressFuc(), t.selectedFuc(null, 2 == i.delivery ? 1 : 2);
                    });
                }
            },
            fail: function() {
                d.ShowDialog(this, "网络连接错误");
            }
        });
    },
    updateExpand: function(e) {
        var t = e.currentTarget.dataset.expand;
        this.setData({
            osHeight: t ? "auto" : "575rpx",
            isExpand: !t
        });
    },
    selectedFuc: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        e && e.detail && this.collectFormId(e);
        var a = t || e.target.dataset.tab, i = this.data.payList;
        i[2].use = !1, i[3].use = !1, 1 == a ? (2 == this.data.payConfig.cashOnDelivery && 4 != this.data.from && (i[2].use = !0), 
        this.data.payList[1].use || 1 != this.data.psPayIndex ? this.setData({
            isShowwMemberCardTip: !1
        }) : this.setData({
            isShowwMemberCardTip: !0
        })) : 2 == a && (2 == this.data.payConfig.payAtStore && 4 != this.data.from && (i[3].use = !0), 
        this.data.payList[1].use || 1 != this.data.zqPayIndex ? this.setData({
            isShowwMemberCardTip: !1
        }) : this.setData({
            isShowwMemberCardTip: !0
        })), this.setData({
            currentTab: a,
            payList: i
        }, this.canSubmit);
    },
    chooseAddressFuc: function(e) {
        var t = this;
        e && e.detail && this.collectFormId(e), this.getWxAddr(function() {
            wx.getSetting({
                success: function(e) {
                    e.authSetting["scope.address"] || wx.showModal({
                        title: "提示",
                        content: "您还未授权通讯地址，未授权您将无法体验完整功能，建议您授权通讯地址",
                        success: function(e) {
                            e.confirm && t.openSetting();
                        }
                    });
                }
            });
        });
    },
    getWxAddr: function(e) {
        var t = this;
        wx.chooseAddress({
            success: function(e) {
                e && t.setData({
                    userName: e.userName,
                    telNumber: e.telNumber,
                    shippingAddress: e.provinceName + e.cityName + e.countyName + e.detailInfo
                }, t.canSubmit);
            },
            fail: function(t) {
                e && e();
            }
        });
    },
    openSetting: function() {
        var e = this;
        wx.openSetting({
            success: function(t) {
                t.authSetting["scope.userLocation"] && e.getWxAddr();
            }
        });
    },
    bindTextAreaBlur: function(e) {
        this.setData({
            textAreaValue: e.detail.value
        });
    },
    bindKeycarrier: function(e) {
        this.setData({
            carrier: e.detail.value
        }, this.canSubmit);
    },
    bindKeyContactTel: function(e) {
        this.setData({
            contact_Tel: e.detail.value
        }, this.canSubmit);
    },
    canSubmit: function() {
        var e = this.data, t = e.currentTab, a = e.userName, i = (e.telNumber, e.carrier), n = e.contact_Tel, r = !1;
        (1 == t && a || 2 == t && i && n) && (r = !0), this.setData({
            canSubmit: r
        });
    },
    submitOrder: function(e) {
        e && e.detail && this.collectFormId(e);
        var t = this.data, a = t.canSubmit, i = t.currentTab, n = t.freight, r = (t.goodsList, 
        t.payablePrice);
        if (this.data.isClick && a) {
            if (this.data.isShowwMemberCardTip) return wx.showModal({
                title: "不支持会员卡支付",
                content: "部分商品不支持会员卡支付，请选择其他付款方式或联系商家客服",
                showCancel: !1
            }), void this.closePayWayDialog();
            var o = "", s = 0;
            o = 1 == i && 2 == this.data.isFullAmount && r - this.data.fullAmountPrice > 0 ? 0 : 1 == i && 2 == this.data.isFullAmount && this.data.fullAmountPrice - r > 0 ? n : 1 == i && 2 != this.data.isFullAmount ? n : 0, 
            s = 1 == i ? r + o : r;
            if (1 == i && 1 == this.data.psPayIndex || 2 == i && 1 == this.data.zqPayIndex) return 2 != this.data.isSetPwd ? void wx.showModal({
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
            }) : this.data.balance < s ? void wx.showModal({
                title: "余额不足",
                content: "会员卡余额不足以支付此订单，请选择其他支付方式或立即充值。",
                cancelText: "返回",
                confirmText: "立即充值",
                confirmColor: "#ff7800",
                success: function(e) {
                    e.confirm && (wx.showLoading({
                        title: "加载中..."
                    }), d.isBindMemberCard().then(function(e) {
                        wx.hideLoading(), "000000" == e.data.code && e.data.data && 2 == e.data.data.enableReturnGive ? wx.navigateTo({
                            url: "/subPackage/vipCenter/pages/recharge/index"
                        }) : wx.navigateTo({
                            url: "/subPackage/vipCenter/pages/index/index"
                        });
                    }));
                }
            }) : void this.setData({
                focus: !0,
                isShowPayInput: !0
            });
            this.continueSubmitOrder();
        }
    },
    continueSubmitOrder: function(e) {
        var t = this, i = this, n = this.data, r = n.canSubmit, o = n.from, s = n.currentTab, u = n.userName, l = n.telNumber, m = n.carrier, p = n.contact_Tel, h = n.shippingAddress, g = n.textAreaValue, f = n.freight, y = n.goodsList, P = n.payablePrice, b = n.pintuanId, x = n.password;
        if (this.data.isClick && r) {
            var I = "", w = 0;
            I = 1 == s && 2 == this.data.isFullAmount && P - this.data.fullAmountPrice > 0 ? 0 : 1 == s && 2 == this.data.isFullAmount && this.data.fullAmountPrice - P > 0 ? f : 1 == s && 2 != this.data.isFullAmount ? f : 0, 
            w = 1 == s ? P + I : P;
            var S = 0;
            S = 1 == s ? 0 == this.data.psPayIndex ? 1 : 1 == this.data.psPayIndex ? 5 : 2 : 0 == this.data.zqPayIndex ? 3 : 1 == this.data.zqPayIndex ? 6 : 4;
            var v = {
                freight: I,
                amount: w,
                goodId: "",
                goodList: y = y.map(function(e) {
                    return {
                        firstAttrId: e.defaultAttrId || e.firstAttrId,
                        secondAttrId: e.defaultSecondAttrId || e.secondAttrId,
                        inventory: e.count,
                        productId: e.id
                    };
                }),
                address: 1 == s ? h : "",
                consigneeName: 1 == s ? u : m,
                mobilePhone: 1 == s ? l : p,
                customerRemark: g,
                openId: d.globalData.openid,
                payMethod: S,
                xcxId: d.globalData.xcxId,
                memberId: wx.getStorageSync("memberCardInfo") ? wx.getStorageSync("memberCardInfo").id : "",
                shareMemberId: d.globalData.shareMemberId ? d.globalData.shareMemberId : ""
            };
            5 != S && 6 != S || (v.payPassword = (0, c.Base64Encode)(x + "member"), v.memberId = wx.getStorageSync("memberCardInfo") ? wx.getStorageSync("memberCardInfo").id : ""), 
            3 == o && (v.isUseBargain = 2), 4 == o && (v.isPintuan = 2, v.pintuanId = b), this.setData({
                isClick: !1
            }), wx.showLoading({
                title: "提交中...",
                mask: !0
            }), (0, a.orderGoodsPaymentM)({
                ele: i,
                data: v,
                reInput: function() {
                    i.setData({
                        focus: !0,
                        isShowPayInput: !0
                    });
                }
            }).then(function(e) {
                2 == i.data.from && i.clearBuyCar(), i.setData({
                    isClick: !0
                }, function() {
                    wx.hideLoading();
                }), setTimeout(function() {
                    wx.showToast({
                        title: "下单成功",
                        duration: 2500
                    }), 4 == i.data.from ? i.toPintunDetail(e.pintuanId) : wx.redirectTo({
                        url: "/subPackage/my/pages/new_order_detail/new_order_detail?id=" + e.orderId + "&isContinueBuy=1"
                    });
                }, 1e3);
            }, function(e) {
                d.showDialog(t, e), i.setData({
                    isClick: !0
                }, function() {
                    wx.hideLoading();
                });
            });
        }
    },
    pwdInputComplete: function(e) {
        var t = this;
        this.setData({
            password: e.detail.pwd,
            focus: !1,
            isShowPayInput: !1
        }, function() {
            t.continueSubmitOrder();
        });
    },
    toPintunDetail: function(e) {
        var t = getCurrentPages(), a = t[t.length - 2];
        t.length > 1 && "/subPackage/discover/pages/pintuan_detail/pintuan_detail" == a.route ? (a.setData({
            showModal: !0
        }), wx.navigateBack()) : wx.redirectTo({
            url: "/subPackage/discover/pages/pintuan_detail/pintuan_detail?id=" + e + "&isCreate=2"
        });
    },
    clearBuyCar: function() {
        wx.getStorage({
            key: u,
            success: function(e) {
                var t = e.data;
                t = t.filter(function(e) {
                    return !e.isSelect;
                }), wx.setStorage({
                    key: u,
                    data: t
                });
            }
        });
    },
    collectFormId: function(e) {
        d.submitFormIdM(e.detail.formId, d.globalData.orgId);
    },
    canMemberCardPay: function() {
        var e = this;
        if (wx.getStorageSync("memberCardInfo")) {
            var t = !0;
            if (e.data.goodsList.map(function(e) {
                2 != e.isSupportMemberCardPay && (t = !1);
            }), t) {
                var a = e.data.payList;
                a[1].use = !0, e.setData({
                    payList: a
                });
                var i = wx.getStorageSync("memberCardInfo");
                (0, s.isSetPayPwdM)({
                    ele: e,
                    data: {
                        memberId: i.id,
                        sessionId: i.sessionId
                    }
                });
            }
        }
        var n = wx.getStorageSync("memberCardInfo");
        n && (0, s.memberInfoM)({
            ele: e,
            data: {
                memberId: n.id,
                sessionId: n.sessionId
            },
            repeatLogin: function() {
                var t = e.data.payList;
                t[1].use = !1, e.setData({
                    payList: t
                });
            }
        });
    },
    showPayWayDialog: function() {
        var e = this, t = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        }), a = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        t.translateY(0).step({
            duration: 50
        }), t.opacity(1).step(), a.translateY(0).step(), a.opacity(1).step(), this.setData({
            isShowPayWayDialog: !0
        }, function() {
            e.setData({
                animationData1: t.export(),
                animationData2: a.export()
            });
        });
    },
    closePayWayDialog: function() {
        var e = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        }), t = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        e.opacity(0).step(), e.translateY(wx.getSystemInfoSync().windowHeight).step(), t.translateY(wx.getSystemInfoSync().windowHeight).step(), 
        this.setData({
            animationData1: e.export(),
            animationData2: t.export()
        }, function() {
            this.setData({
                isShowPayWayDialog: !1
            });
        });
    },
    checkPayWay: function(e) {
        for (var t = e.currentTarget.dataset.key, a = 0, i = this.data.payList, n = this.data.psPayIndex, r = this.data.zqPayIndex, o = 0; o < i.length; o++) if (i[o].key == t) {
            a = o;
            break;
        }
        if (1 == this.data.currentTab ? n = a : r = a, 1 == e.currentTarget.dataset.index && !this.data.payList[1].use) return this.setData({
            isShowwMemberCardTip: !0,
            psPayIndex: n,
            zqPayIndex: r
        }), void this.closePayWayDialog();
        this.setData({
            isShowwMemberCardTip: !1
        }), this.setData({
            psPayIndex: n,
            zqPayIndex: r
        }), this.closePayWayDialog();
    },
    closePayInputDialog: function() {
        this.setData({
            isShowPayInput: !1,
            focus: !1
        });
    }
});