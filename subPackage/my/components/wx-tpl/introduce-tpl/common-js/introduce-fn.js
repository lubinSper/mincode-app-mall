Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.introduceFn = void 0;

var t = require("../../../../../../components/template/show_dialog/show_dialog"), e = require("../../../model/agent-info-m.js"), o = getApp(), n = Behavior({
    behaviors: [],
    data: {
        oneClick: 1,
        phone: "",
        orgId: "",
        qr_code: "",
        applyInfo: {
            name: "",
            tel: "",
            industry: ""
        },
        showRemindType: 0,
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        showReturnIndexBtn: !1
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
            observer: function(t, e) {
                t && this.onShow(t);
            }
        },
        onHide: {
            type: String,
            value: "",
            observer: function(t, e) {
                t && this.onHide();
            }
        },
        params: {
            type: Object,
            value: "",
            observer: function(t, e) {
                t && this.setData({
                    phone: t.phone,
                    orgId: t.orgId
                }), t.showReturnIndexBtn && this.setData({
                    showReturnIndexBtn: t.showReturnIndexBtn
                });
            }
        }
    },
    methods: {
        onShow: function() {},
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {},
        onReachBottom: function() {},
        onShareAppMessage: function() {},
        clickSunCode: function(t) {
            var e = t.currentTarget.dataset.src;
            wx.previewImage({
                current: e,
                urls: [ e ]
            });
        },
        getAgentQrcode: function() {
            var e = this;
            wx.request({
                url: o.globalData.pcisHost + "xcx/org/contacts/wx/qrCode",
                method: "post",
                data: {
                    orgId: o.globalData.orgId,
                    xcxId: o.globalData.xcxId
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    t.data.data && e.setData({
                        qr_code: t.data.data.wxQrCode
                    });
                },
                fail: function(o) {
                    e.data.showTipData.content = "网络连接失败", e.setData(e.data), (0, t.ShowDialog)(e);
                }
            });
        },
        formInput: function(t) {
            var e = parseInt(t.currentTarget.dataset.type), o = t.detail.value, n = this.data.applyInfo;
            switch (e) {
              case 1:
                o.length > 8 && (o = o.substr(0, 8)), n.name = o;
                break;

              case 2:
                o.length > 20 && (o = o.substr(0, 20)), n.tel = o;
                break;

              default:
                o.length > 20 && (o = o.substr(0, 20)), n.industry = o;
            }
            return this.setData({
                applyInfo: n
            }), o;
        },
        submitApply: function() {
            var e = this.data.applyInfo, n = e.name.trim(), a = e.tel.trim(), s = e.industry.trim(), r = this;
            n.length < 1 ? r.setData({
                showRemindType: 1
            }) : a.length < 1 ? r.setData({
                showRemindType: 2
            }) : s.length < 1 ? r.setData({
                showRemindType: 3
            }) : (wx.showLoading({
                title: "加载中"
            }), 1 == r.data.oneClick && (r.setData({
                oneClick: 2
            }), o.getNewOpenId(function(n) {
                var a = {
                    industry: e.industry,
                    name: e.name,
                    phone: e.tel,
                    openId: null == n ? o.globalData.openid : n,
                    orgId: o.globalData.orgId,
                    xcxId: o.globalData.xcxId
                };
                wx.request({
                    url: o.globalData.pcisHost + "xcx/org/join/apply",
                    method: "post",
                    data: a,
                    header: {
                        "content-type": "application/json"
                    },
                    complete: function() {
                        r.setData({
                            oneClick: 1
                        }), setTimeout(function() {
                            wx.hideLoading();
                        }, 1200);
                    },
                    success: function(t) {
                        t.data.code && "000000" == t.data.code ? (wx.showToast({
                            title: "提交成功"
                        }), r.setData({
                            showRemindType: 0,
                            applyInfo: {
                                name: "",
                                tel: "",
                                industry: ""
                            }
                        })) : wx.showToast({
                            title: "提交失败"
                        });
                    },
                    fail: function(e) {
                        r.data.showTipData.content = "网络连接失败", r.setData(r.data), (0, t.ShowDialog)(r);
                    }
                });
            })));
        },
        goApplyForm: function() {
            wx.pageScrollTo({
                scrollTop: 2890
            });
        },
        goQrcodeContact: function() {
            wx.pageScrollTo({
                scrollTop: 3890
            });
        },
        goTelSupport: function() {
            var t = this;
            (0, e.agentInfoM)({
                ele: t,
                data: {
                    xcxId: o.globalData.xcxId
                },
                fn: function() {
                    console.log("phone为", t.data.phone, "orgId为", t.data.orgId), wx.makePhoneCall({
                        phoneNumber: t.data.phone
                    });
                }
            });
        },
        toTop: function() {
            wx.pageScrollTo({
                scrollTop: 0
            });
        }
    },
    ready: function() {
        this.getAgentQrcode();
    }
});

exports.introduceFn = n;