var t = getApp();

Page({
    data: {
        applyInfo: {
            name: "",
            tel: "",
            industry: "",
            showReturnIndexBtn: 2
        },
        visitNumber: 1782567
    },
    formInput: function(t) {
        var e = parseInt(t.currentTarget.dataset.type), a = t.detail.value, n = this.data.applyInfo;
        switch (e) {
          case 1:
            a.length > 8 && (a = a.substr(0, 8)), n.name = a;
            break;

          case 2:
            a.length > 20 && (a = a.substr(0, 20)), n.tel = a;
            break;

          default:
            a.length > 20 && (a = a.substr(0, 20)), n.industry = a;
        }
        return this.setData({
            applyInfo: n
        }), a;
    },
    submitApply: function() {
        var e = this.data.applyInfo, a = e.name.trim(), n = e.tel.trim(), o = e.industry.trim(), s = this;
        if (a.length < 1) s.setData({
            showRemindType: 1
        }); else if (n.length < 1) s.setData({
            showRemindType: 2
        }); else if (o.length < 1) s.setData({
            showRemindType: 3
        }); else if (2 != s.data.oneClick) {
            s.setData({
                oneClick: 2
            });
            var i = {
                industry: e.industry,
                name: e.name,
                phone: e.tel,
                orgId: t.globalData.orgId,
                xcxId: t.globalData.xcxId
            };
            wx.request({
                url: t.globalData.pcisHost + "xcx/org/join/apply",
                method: "post",
                data: i,
                header: {
                    "content-type": "application/json"
                },
                complete: function() {
                    s.setData({
                        oneClick: 1
                    });
                },
                success: function(t) {
                    t.data.code && "000000" == t.data.code ? (wx.showToast({
                        title: "提交成功"
                    }), s.setData({
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
                fail: function(t) {
                    s.data.showTipData.content = "网络连接失败", s.setData(s.data), ShowDialog(s);
                }
            });
        }
    },
    getAgentPhone: function() {
        var e = this;
        t.getNewOpenId(function(a) {
            wx.request({
                url: t.globalData.host + "/agent/freeOrg/status",
                method: "post",
                data: {
                    openId: t.globalData.openid,
                    xcxId: t.globalData.xcxId
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    if (t.data.data) {
                        var a = t.data.data;
                        a.phone && a.phone.length > 0 && e.setData({
                            tele: a.phone
                        });
                    }
                },
                fail: function(t) {
                    e.data.showTipData.content = "网络连接失败", e.setData(e.data), ShowDialog(e);
                }
            });
        });
    },
    onLoad: function(t) {
        var e = this, a = this;
        this.getAgentPhone(), t.action && a.setData({
            showReturnIndexBtn: "goHome" == t.action ? 1 : 2
        }, function() {
            e.setData({
                params: {
                    showReturnIndexBtn: e.data.showReturnIndexBtn,
                    phone: "",
                    orgId: ""
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this, e = Math.floor(+new Date(new Date().setHours(0, 0, 0, 0)) / 1e3), a = Math.floor(+new Date() / 1e3), n = a - e;
        console.log(e, a, n), this.setData({
            visitNumber: this.data.visitNumber + n
        }), this.data.timer = setInterval(function() {
            t.setData({
                visitNumber: t.data.visitNumber + 1
            });
        }, 3e3), this.setData({
            timer: this.data.timer
        });
    },
    onHide: function() {},
    onUnload: function() {
        clearInterval(this.data.timer), console.log(this.data.timer);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var a = getCurrentPages(), n = t.isHasTabByTitle({
            url: a[a.length - 1].route
        });
        console.log("tempJson=", n);
        var o = "subPackage/my/pages/business_make_program/business_mack_program?action=goHome&phone=" + this.data.phone;
        return n.check && (o = "subPackage/my/pages/business_make_program/business_mack_program?phone=" + this.data.phone), 
        console.log("tempShareUrl=", o), {
            title: "点击这里，马上了解独立小程序开发自主入驻平台一站式客流解决方案",
            path: o
        };
    },
    pageScrollToBottom: function() {
        wx.createSelectorQuery().select("#j_page").boundingClientRect(function(t) {
            wx.pageScrollTo({
                scrollTop: t.bottom
            });
        }).exec();
    }
});