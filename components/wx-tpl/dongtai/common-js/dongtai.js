Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DongTaiJs = void 0;

var a = require("../../../../components/conf/conf"), t = require("../../../../components/model/discover/shequn-list-m"), e = require("../../../../components/model/getIsOpenPay/getIsOpenPay-m"), o = require("../../../../components/model/message/QRCode-collection/shop-info-m"), s = require("../../../../components/template/show_dialog/show_dialog"), n = (require("../../../../components/model/my/order_detail/order_state_change_m"), 
require("../../../../components/template/discuss/discuss")), i = require("../../custom-page-tpl/common-js/classLoop"), r = require("../../../../components/function/jsonMerge/jsonMerge"), d = getApp(), l = {
    previewImage: function(a) {
        var t = this, e = a.currentTarget.dataset.index;
        console.log(e), wx.previewImage({
            current: a.target.dataset.src,
            urls: t.data.shopList[e].imgUrls
        });
    },
    getBannerList: function(a) {
        var t = this;
        wx.request({
            url: d.globalData.shopMHost + "/xcx/shop/image/list",
            method: "post",
            data: a,
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                var e = a.data.data;
                t.data.imgUrlArry = [];
                for (var o = 0, s = e.length; o < s; o++) if (t.data.imgUrlArry.push(e[o].thumUrl), 
                5 == e[o].type) {
                    var n = e[o].jumpUrl.split("appPath=");
                    e[o].appid = n[0], e[o].path = n[1];
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
            fail: function(a) {
                d.globalData.showErrorAlert && (0, s.ShowDialog)(t), setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
            }
        });
    },
    getClassList: function() {
        var a = this;
        wx.request({
            url: d.globalData.shopMHost + "xcx/category/list",
            method: "post",
            data: {
                xcxId: d.globalData.xcxId
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log("分类列表---------", t.data.data), a.setData({
                    classlist: t.data.data
                });
            },
            fail: function() {}
        });
    },
    showBannerImg: function(a) {
        var t = a.currentTarget.dataset.jumptype, e = a.currentTarget.dataset.jumpurl, o = a.currentTarget.dataset.productid, s = (a.currentTarget.dataset.src, 
        "");
        if (2 == t && (s = "/subPackage/discover/pages/" + (3 == d.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + (o || e)), 
        3 == t) {
            var n = (0, i.classLoop)(e, this.data.classlist);
            wx.navigateTo({
                url: "/subPackage/index/pages/category-list/category-list?tagType=&iconName=" + n + "&categoryId=" + e
            });
        }
        if (4 == t && (s = "/" + e), 2 == t || 4 == t) wx.navigateTo({
            url: s,
            success: function() {
                console.log(1111);
            },
            fail: function() {
                console.log(2222);
            }
        }); else if (1 == t) {
            var r = a.currentTarget.dataset.index;
            wx.previewImage({
                current: this.data.imgUrlArry[r],
                urls: this.data.imgUrlArry
            });
        }
    },
    jumpToNext: function(a) {
        this.startMovePage();
        var t = a.currentTarget.dataset.id;
        console.log(t), wx.navigateTo({
            url: "/subPackage/discover/pages/goods_detail/goods_detail?id=" + t
        });
    },
    onReachBottom: function() {
        var e = this;
        e.data.hasNextPage && (e.data.showLoading = !0, e.setData(e.data), (0, t.SheQunListM)({
            ele: e,
            data: {
                openId: d.globalData.openid,
                orgId: d.globalData.orgId,
                pageIndex: e.data.pageIndex,
                pageSize: a.Conf.pageSize,
                type: e.data.type
            }
        }));
    },
    onPullDownRefresh: function() {
        console.log("下拉刷新");
        var o = this;
        o.data.shopList = [], o.data.pageIndex = 1, o.data.showBlank = !1, o.data.hasNextPage = !1, 
        o.data.showLoading = !1, o.setData(o.data), (0, t.SheQunListM)({
            ele: o,
            data: {
                openId: d.globalData.openid,
                orgId: d.globalData.orgId,
                pageIndex: 1,
                pageSize: a.Conf.pageSize,
                type: o.data.type
            },
            PullDown: !0
        }), (0, e.getIsOpenPayM)({
            ele: o,
            data: {
                xcxId: d.globalData.xcxId
            }
        }), this.getBannerList({
            xcxId: d.globalData.xcxId,
            imgType: 2
        }), this.getClassList();
    },
    retry: function() {
        var e = this;
        e.data.shopList = [], e.data.pageIndex = 1, e.setData(e.data), wx.showLoading({
            title: "加载中"
        }), (0, t.SheQunListM)({
            ele: e,
            data: {
                openId: d.globalData.openid,
                orgId: d.globalData.orgId,
                pageIndex: 1,
                pageSize: a.Conf.pageSize,
                type: e.data.type
            }
        });
    },
    onHide: function() {
        var a = this, t = wx.createAnimation({
            duration: 200,
            timingFunction: "ease-out"
        });
        if (a.animation = t, t.translateX(360).step(), a.data.shopList) for (var e = 0; e < a.data.shopList.length; e++) a.data.shopList[e].animationData = a.animation.export(), 
        a.data.shopList[e].animationDataShow = !1;
        this.data.visiable = "none", this.setData(this.data);
    },
    onShow: function() {
        var a = this;
        setTimeout(function() {
            d.setMyCountDot(), wx.getStorage({
                key: "ordering_type",
                success: function(t) {
                    "2" == t.data ? a.setData({
                        visiable: "flex"
                    }) : a.setData({
                        visiable: "none"
                    });
                }
            });
        }, 1e3);
    },
    startMovePage: function() {
        var a = parseInt(this.data.discussInfo.shopListIndex);
        if (!isNaN(a) && this.data.shopList[a].animationDataShow) {
            var t = wx.createAnimation({
                duration: 200,
                timingFunction: "linear"
            });
            this.animation = t, t.translateX(360).step(), this.data.shopList[a].animationData = this.animation.export(), 
            this.data.shopList[a].animationDataShow = !1, this.setData(this.data);
        }
    },
    setDiscussValue: function(a) {
        this.setData({
            shopList: a.detail.shopList
        });
    }
}, g = Behavior({
    data: {
        pageIndex: 1,
        shopList: [],
        autoplay: !0,
        interval: 3e3,
        duration: 500,
        circular: !0,
        bannerImgInfo: [],
        showLoading: !1,
        showBlank: !1,
        goodsName: "发现",
        isOpenPay: 0,
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        orgName: "",
        visiable: "none",
        prevent: !1,
        noData: !1,
        haveData: !1,
        overtime: !1,
        discussInfo: {
            inputShow: !1,
            goodsId: 0,
            inputText: "",
            placeHolder: "请输入评论内容",
            shopListIndex: ""
        },
        oneClick: 1,
        hasNextPage: !1,
        type: 1,
        classlist: [],
        imgUrlArry: [],
        onAuthShow: "",
        onAuthHide: "",
        authParams: {
            isCallBackHandle: !1
        }
    },
    behaviors: [],
    properties: {
        type: {
            type: String,
            value: null,
            observer: function(a, t) {
                console.log("type====" + a), a && console.log("type====" + a);
            }
        },
        onPullDownRefresh: {
            type: String,
            value: "",
            observer: function(a, t) {
                a && this.onPullDownRefresh();
            }
        },
        onReachBottom: {
            type: String,
            value: "",
            observer: function(a, t) {
                console.log(a + "子组件上拉加载更多:" + this.data.hasNextPage), a && this.onReachBottom();
            }
        },
        onShow: {
            type: String,
            value: "",
            observer: function(a, t) {
                console.log(a + "子组件显示:" + this.data.hasNextPage), a && this.onShow();
            }
        },
        onHide: {
            type: String,
            value: "",
            observer: function(a, t) {
                console.log(a + "子组件隐藏:" + this.data.hasNextPage), a && this.onHide();
            }
        }
    },
    methods: (0, r.jsonMerge)(l, n.discuss),
    ready: function() {
        wx.showLoading({
            title: "加载中"
        });
        var s = this;
        d.getNewOpenId(function(n) {
            s.data.shopList = [], s.data.pageIndex = 1, s.setData(s.data), (0, t.SheQunListM)({
                ele: s,
                data: {
                    openId: d.globalData.openid,
                    orgId: d.globalData.orgId,
                    pageIndex: s.data.pageIndex,
                    pageSize: a.Conf.pageSize,
                    type: s.data.type
                }
            }), d.userInfoMiddleWare().then(function(a) {
                if (a.isGetUserInfo) console.log("openid=", d.globalData.openid); else {
                    var t = new Date().getTime();
                    s.setData({
                        onAuthShow: t
                    });
                }
            }), (0, e.getIsOpenPayM)({
                ele: s,
                data: {
                    xcxId: d.globalData.xcxId
                }
            }), (0, o.shopInfoM)({
                ele: s,
                data: {
                    xcxId: d.globalData.xcxId
                },
                wxml: "discover"
            }), s.getBannerList({
                xcxId: d.globalData.xcxId,
                imgType: 2
            }), s.getClassList();
        });
    }
});

exports.DongTaiJs = g;