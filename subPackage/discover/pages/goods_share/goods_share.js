function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, o = Array(t.length); a < t.length; a++) o[a] = t[a];
        return o;
    }
    return Array.from(t);
}

require("../../../../components/function/formatMsgTime/formatMsgTime");

var a = require("../../../../components/model/discover/goods-detail/goods-detail-m"), o = (function(t) {
    t && t.__esModule;
}(require("../../../../components/function/countdown/countdown")), require("../../../../components/function/checkTime/checkTime "), 
require("../../../../util/util"), getApp());

Page({
    data: {
        orgId: o.globalData.orgId,
        goodsId: 2919,
        buyCarDialogInfo: {},
        timeArr: null,
        typeMap: {
            1: "timelimit",
            2: "cut",
            3: "group",
            4: "yuyue",
            5: "ordinary"
        },
        goodType: 5,
        propagate: "我发现了一件不错的商品，会员还能享受特价哦，快来看看吧！",
        buttonText: "去看看",
        shareTitle: "",
        isGoodsTitle: !1,
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        goldCoin: 0,
        showPoster: !1,
        localImg: "",
        shareAsk: !1,
        defaultPro: "",
        defaultButtonText: "",
        pullup: !1,
        pullupHeight: 0
    },
    onLoad: function(e) {
        if (console.log(e), e.id) {
            this.data.goodsId = parseInt(e.id);
            var i = this;
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), o.getNewOpenId(function(e) {
                (0, a.newGoodsDetailM)({
                    ele: i,
                    isLoadCountdown: !0,
                    data: {
                        openId: o.globalData.openid,
                        id: i.data.goodsId
                    },
                    callback: function(a) {
                        var o = +i.data.price * a.data.data.salePercentage / 10;
                        if (a.data.data.commodityAttr.length) {
                            var e = [].concat(t(a.data.data.commodityAttr));
                            e.sort(function(t, a) {
                                return a.price - t.price;
                            }), o = +e[0].price / 100 * a.data.data.salePercentage / 10;
                        }
                        2 == i.data.isBargain ? (i.data.goodType = 2, i.data.propagate = " 我发现一件很赞的商品，快来砍价吧~") : 2 == i.data.isPintuan ? (i.data.goodType = 3, 
                        i.data.propagate = "我发现一件很赞的商品，一起来享拼团优惠吧~") : i.data.originalPrice && i.data.timeArr ? (i.data.goodType = 1, 
                        i.data.propagate = "我发现一件很赞的商品，限时特价优惠中，快来购买吧~", i.data.buttonText = "去购买") : 3 == i.data.types ? (i.data.goodType = 4, 
                        i.data.propagate = "倾情推荐，在线轻松预约服务，快来体验一下吧~") : 1 == i.data.isSpecial ? (i.data.propagate = "超值推荐，现在购买享超值特价，快来抢购~", 
                        i.data.buttonText = "去抢购") : (i.data.goodType = 5, i.data.propagate = "我发现一件很赞的商品，推荐给你，快来看看吧！"), 
                        i.setData({
                            goodType: i.data.goodType,
                            goldCoin: Math.floor(o),
                            shareTitle: i.data.name,
                            propagate: i.data.propagate,
                            buttonText: i.data.buttonText,
                            defaultButtonText: i.data.buttonText,
                            defaultPro: i.data.propagate
                        }), wx.downloadFile({
                            url: i.data.buyCarDialogInfo.coverImage,
                            success: function(t) {
                                console.log("文件下载-------------", t), "downloadFile:ok" === t.errMsg && i.setData({
                                    localImg: t.tempFilePath
                                });
                            }
                        });
                    }
                });
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onPullDownRefresh: function() {},
    onShareAppMessage: function(t) {
        return this.setData({
            shareAsk: !1
        }), {
            title: this.data.shareTitle || this.data.name,
            path: "/subPackage/discover/pages/" + (3 == o.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + this.data.goodsId + "&memberId=" + wx.getStorageSync("memberCardInfo").id
        };
    },
    onUnload: function() {
        this.clearTimer();
    },
    onShare: function() {
        this.setData({
            shareAsk: !0
        }), wx.pageScrollTo({
            scrollTop: 0,
            duration: 100
        }), this.data.propagate || this.setData({
            propagate: "我发现了一件不错的商品，购买还能得积分哦，快来看看吧！"
        }), this.data.buttonText || this.setData({
            buttonText: "马上去看看"
        });
    },
    cancelAsk: function() {
        this.setData({
            shareAsk: !1
        });
    },
    clearTimer: function() {
        o.globalData.timerObj && o.globalData.timerObj.goods_detail && clearTimeout(o.globalData.timerObj.goods_detail);
    },
    useGoodsTitle: function() {
        var t = this;
        this.setData({
            isGoodsTitle: !this.data.isGoodsTitle
        }, function() {
            t.data.isGoodsTitle && t.setData({
                shareTitle: t.data.name
            });
        });
    },
    bindfocus: function(t) {
        console.log("aaaaaaaaaaaaaa", t);
        this.setData({
            pullup: !0,
            pullupHeight: t.detail.height - function(t) {
                return t / 375 * wx.getSystemInfoSync().screenWidth;
            }(30)
        }), wx.pageScrollTo({
            scrollTop: 3e4,
            duration: 100
        });
    },
    bindblur: function() {
        this.setData({
            pullup: !1
        }), wx.pageScrollTo({
            scrollTop: 0,
            duration: 100
        });
    },
    inputTitle: function(t) {
        this.setData({
            shareTitle: t.detail.value
        });
    },
    inputPropagate: function(t) {
        this.setData({
            propagate: t.detail.value
        });
    },
    inputButton: function(t) {
        var a = /([^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n])/g;
        a.test(t.detail.value) && (t.detail.value = t.detail.value.replace(a, "")), this.setData({
            buttonText: t.detail.value
        });
    },
    blurPropagate: function(t) {
        t.detail.value || this.setData({
            propagate: this.data.defaultPro
        }), this.bindblur();
    },
    blurButton: function(t) {
        t.detail.value || this.setData({
            buttonText: this.data.defaultButtonText
        }), this.bindblur();
    },
    posterlayer: function() {
        this.getPostImg(), this.setData({
            showPoster: !0
        });
    },
    textLine: function(t, a, o, e) {
        for (var i = t.split(""), n = "", s = [], d = 0; d < i.length; d++) a.measureText(n).width < o ? n += i[d] : (d--, 
        s.push(n), n = "");
        if (s.push(n), s.length > 2) {
            for (var l = s.slice(0, 2), r = l[1], u = "", c = [], d = 0; d < r.length && a.measureText(u).width < 220; d++) u += r[d];
            c.push(u);
            var g = c[0] + "...";
            l.splice(1, 1, g), s = l;
        }
        for (var p = 0; p < s.length; p++) a.fillText(s[p], 13, e + 25 * p, o);
    },
    getPostImg: function() {
        var t = this;
        wx.showLoading({
            title: "加载中....",
            mask: !0
        });
        var a = "/subPackage/discover/pages/" + (3 == o.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + this.data.goodsId + "&memberId=" + wx.getStorageSync("memberCardInfo").id;
        wx.request({
            url: o.globalData.shopMHost + "/xcx/org/goods/goodsQrCode",
            data: {
                id: this.data.goodsId,
                path: a,
                orgId: o.globalData.orgId
            },
            method: "post",
            header: {
                codeVersion: o.globalData.codeVersion
            },
            success: function(a) {
                console.log("海报信息-----------", a), wx.hideLoading(), "000000" === a.data.code && t.setData({
                    posterImg: a.data.data.cover
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "网络开小差，请稍后重试",
                    icon: "none"
                });
            },
            complete: function() {}
        });
    },
    accessCheck: function() {
        var t = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.writePhotosAlbum"] ? t.saveAlbum() : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        t.saveAlbum();
                    }
                });
            }
        });
    },
    saveAlbum: function() {
        var t = this;
        wx.showLoading({
            title: "下载中...",
            mask: !0
        }), wx.downloadFile({
            url: this.data.posterImg,
            success: function(a) {
                console.log("文件下载-------------", a), "downloadFile:ok" === a.errMsg && (wx.hideLoading(), 
                t.data.posterImg = a.tempFilePath, wx.saveImageToPhotosAlbum({
                    filePath: t.data.posterImg,
                    success: function() {
                        wx.showToast({
                            title: "保存成功",
                            icon: "none"
                        });
                    },
                    fail: function(t) {
                        console.log(t), wx.showToast({
                            title: "保存失败",
                            icon: "none"
                        });
                    }
                }));
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "网络开小差，请稍后重试",
                    icon: "none"
                });
            }
        });
    }
});