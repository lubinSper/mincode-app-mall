Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.customPageFn = void 0;

require("../../../function/formatMsgTime/formatMsgTime");

var t = require("../../../template/show_dialog/show_dialog"), e = require("../../../model/message/custom-page/custom-page-info-m"), a = getApp(), o = require("../../../../vendor/wxParse/wxParse.js"), n = Behavior({
    behaviors: [],
    data: {
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        isClose: !1,
        pageId: 0,
        pageType: 2,
        pageList: [],
        classList: [],
        applyInfo: {
            name: "",
            tel: "",
            industry: "",
            remark: ""
        },
        showRemindType: 0,
        oneClick: 1,
        autoplay: !0,
        interval: 3e3,
        duration: 500,
        circular: !0,
        currentIndex: 0,
        imgUrls: [ "http://kotdev.oss-cn-shenzhen.aliyuncs.com/201805/14/sns/1526269388000000002.png", "http://kotdev.oss-cn-shenzhen.aliyuncs.com/201803/02/sns/1520496738000000031.JPEG", "http://kotdev.oss-cn-shenzhen.aliyuncs.com/201803/16/sns/1521445706000000012.JPEG" ],
        defaultPoster: "",
        poster: "",
        noData: !1,
        showReturnIndexBtn: !1,
        imagesUrlData: [],
        loading_fail: !1,
        btnLoading: !1,
        onShow: "",
        xcxType: 3,
        copyRightShow: !1,
        onSingleRowGoodsShow: "",
        onDoubleRowGoodsShow: "",
        refresh: !0
    },
    properties: {
        onPullDownRefresh: {
            type: String,
            value: "",
            observer: function(t, e) {
                t && this.onPullDownRefresh();
            }
        },
        onReachBottom: {
            type: String,
            value: "",
            observer: function(t, e) {
                t && this.onReachBottom();
            }
        },
        onShow: {
            type: String,
            value: "",
            observer: function(t, e) {}
        },
        params: {
            type: Object,
            value: "",
            observer: function(t, e) {
                console.log("页面传参改变----------------", t, e), t.id && (this.getCustomPageInfo(t.id), 
                this.getClassList(), this.setData({
                    pageId: t.id
                }), this.setPageTitle(t.pageTitle ? t.pageTitle : "", t.id, t.type)), t.isShowHome && this.setData({
                    showReturnIndexBtn: !0
                });
            }
        }
    },
    methods: {
        onShow: function() {
            this.setData({
                onSingleRowGoodsShow: !0
            }), this.refreshComponentData();
        },
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {
            var t = this;
            this.setData({
                pageList: []
            }, function() {
                t.getCustomPageInfo(t.data.pageId, !0), t.onShow({
                    refresh: !0
                }), t.getClassList();
                new Date().getTime();
                t.setData({
                    onSingleRowGoodsShow: !0
                });
            });
        },
        onReachBottom: function() {},
        getClassList: function() {
            var t = this;
            wx.request({
                url: a.globalData.shopMHost + "xcx/category/list",
                method: "post",
                data: {
                    xcxId: a.globalData.xcxId
                },
                header: {
                    "content-type": "application/json",
                    codeVersion: a.globalData.codeVersion
                },
                success: function(e) {
                    console.log("分类列表---------", e.data.data), t.setData({
                        classList: e.data.data
                    });
                },
                fail: function() {}
            });
        },
        getCustomPageInfo: function(t, o) {
            o || wx.showLoading({
                title: "加载中"
            });
            var n = this;
            (0, e.customPageInfo)({
                ele: n,
                data: {
                    customPageId: t,
                    orgId: a.globalData.orgId
                }
            }, function(t, e) {
                if (console.log(t), console.log(e), console.log("isPullDown=", o), o && wx.stopPullDownRefresh(), 
                t) n.setData({
                    loading_fail: !0
                }, function() {
                    setTimeout(function() {
                        wx.hideLoading();
                    }, 1e3);
                }); else {
                    var a = e.data;
                    a && a.length > 0 ? "richText" != a[0].type ? (n.moduleParseHtml(a), n.setData({
                        pageType: 2
                    }, function() {
                        setTimeout(function() {
                            wx.hideLoading();
                        }, 1e3);
                    })) : (n.wxParseHtml(a[0]), n.setData({
                        pageType: 1
                    }, function() {
                        setTimeout(function() {
                            wx.hideLoading();
                        }, 1e3);
                    })) : (n.wxParseHtml(a), n.setData({
                        pageType: 1
                    }, function() {
                        setTimeout(function() {
                            wx.hideLoading();
                        }, 1e3);
                    }));
                }
            });
        },
        refreshComponentData: function() {
            var t = this;
            this.setData({
                refresh: !1
            }, function() {
                t.setData({
                    refresh: !0
                });
            });
        },
        onClickRetry: function() {
            this.setData({
                loading_fail: !1
            }), this.getCustomPageInfo(this.data.pageId), this.getClassList();
        },
        setPageTitle: function(t, e, o) {
            console.log("pageTitle=", t);
            var n = JSON.parse(JSON.stringify(t));
            this.getCustomInfo(e, function(s) {
                n = 99 == o ? n : s || n;
                var i = a.isHasTabByTitle({
                    url: "page/index/custom-page/custom-page-" + e + "/custom-page-" + e
                });
                console.log("tempJson=", i), i.check && !t ? (wx.setNavigationBarTitle({
                    title: i.text
                }), a.getTabBarTitle()) : wx.setNavigationBarTitle({
                    title: n
                });
            });
        },
        getCustomInfo: function(t, e) {
            wx.request({
                url: a.globalData.shopMHost + "customPage/queryBySerialNumber",
                method: "post",
                data: {
                    orgId: a.globalData.orgId,
                    serialNumber: t
                },
                header: {
                    "content-type": "application/json",
                    codeVersion: a.globalData.codeVersion
                },
                success: function(t) {
                    t.data && t.data.data && e && e(t.data.data.pageName);
                },
                fail: function() {
                    a.globalData.showErrorAlert && wx.showToast({
                        title: "获取页面信息失败",
                        icon: "none"
                    });
                }
            });
        },
        wxParseHtml: function(t) {
            console.log("data===", t), o.wxParse("newsContent", "html", "", this, 0), t && t.content && t.content.length > 0 && o.wxParse("newsContent", "html", t.content, this, 0);
        },
        moduleParseHtml: function(t) {
            var e = t, a = [];
            console.log("tempPageList====", e), this.setData({
                pageList: e,
                imagesUrlData: a
            });
        },
        formInput: function(t) {
            var e = parseInt(t.currentTarget.dataset.type), a = t.detail.value, o = this.data.applyInfo;
            switch (e) {
              case 1:
                a.length > 8 && (a = a.substr(0, 8)), o.name = a;
                break;

              case 2:
                a.length > 20 && (a = a.substr(0, 20)), o.tel = a;
                break;

              case 3:
                a.length > 20 && (a = a.substr(0, 20)), o.industry = a;
                break;

              default:
                a.length > 100 && (a = a.substr(0, 100)), o.remark = a;
            }
            return this.setData({
                applyInfo: o
            }), a;
        },
        submitApply: function() {
            var t = this.data.applyInfo, e = t.name.trim(), o = t.tel.trim(), n = t.industry.trim(), s = this;
            if (e.length < 1) wx.showToast({
                title: "请填写您的称呼",
                icon: "none",
                duration: 2e3
            }); else if (o.length < 1) wx.showToast({
                title: "请填写联系电话",
                icon: "none",
                duration: 2e3
            }); else if (n.length < 1) wx.showToast({
                title: "请填写你所在的行业",
                icon: "none",
                duration: 2e3
            }); else if (2 != s.data.oneClick) if (s.setData({
                oneClick: 2,
                btnLoading: !0
            }), console.log(a.globalData), a.globalData.openid) {
                var i = {
                    remark: t.remark,
                    industry: t.industry,
                    name: t.name,
                    phone: t.tel,
                    orgId: a.globalData.orgId,
                    openId: a.globalData.openid
                };
                console.log("params=", i), s.postFormData(i);
            } else a.getNewOpenId(function(e) {
                var o = {
                    remark: t.remark,
                    industry: t.industry,
                    name: t.name,
                    phone: t.tel,
                    orgId: a.globalData.orgId,
                    openId: e
                };
                console.log("params=", o), s.postFormData(o);
            });
        },
        postFormData: function(e) {
            var o = this;
            wx.request({
                url: a.globalData.shopMHost + "xcx/divPageForm/add",
                method: "post",
                data: e,
                header: {
                    "content-type": "application/json",
                    codeVersion: a.globalData.codeVersion
                },
                complete: function() {
                    o.setData({
                        oneClick: 1,
                        btnLoading: !1
                    });
                },
                success: function(t) {
                    t.data.code && "000000" == t.data.code ? (wx.showToast({
                        icon: "success",
                        title: "提交成功"
                    }), o.setData({
                        showRemindType: 0,
                        applyInfo: {
                            name: "",
                            tel: "",
                            industry: "",
                            remask: ""
                        }
                    })) : wx.showToast({
                        icon: "none",
                        title: "提交失败"
                    });
                },
                fail: function(e) {
                    o.data.showTipData.show = !0, o.data.showTipData.content = "网络连接失败", o.setData(o.data), 
                    (0, t.ShowDialog)(o);
                }
            });
        },
        makePhoneCall: function(t) {
            wx.makePhoneCall({
                phoneNumber: t.currentTarget.dataset.phone
            });
        },
        showBannerImg: function(t) {
            var e = t.target.dataset.src, a = t.target.dataset.index, o = this;
            wx.previewImage({
                current: e,
                urls: o.data.pageList[a].showImgs
            });
        },
        previewImage: function(t) {
            var e = t.currentTarget.dataset.src, a = this;
            wx.previewImage({
                current: e,
                urls: a.data.imagesUrlData
            });
        }
    },
    ready: function() {
        a.whichProduct({
            ele: this
        });
    }
});

exports.customPageFn = n;