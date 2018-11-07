function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t = require("../../../../util/util.js"), e = getApp();

Page({
    data: {
        id: "",
        openId: "",
        name: "",
        type: 1,
        discountMoney: 0,
        endTime: 1502150888e3,
        instructions: "",
        minConsumeMoney: 0,
        startTime: 1492251152e3,
        shopName: "",
        validType: 1,
        validTypeName: "",
        count: 0,
        isReceive: 1,
        couponId: "",
        channel: "",
        status: 1,
        showReturnIndexBtn: !1
    },
    onShareAppMessage: function(a) {
        var t = getCurrentPages(), o = e.isHasTabByTitle({
            url: t[t.length - 1].route
        });
        console.log("tempJson=", o);
        var n = "page/message/pages/coupon_detail?action=goHome";
        return o.check && (n = "page/message/pages/coupon_detail"), console.log("tempShareUrl=", n), 
        {
            title: "详情",
            path: n,
            success: function(a) {},
            fail: function(a) {}
        };
    },
    onLoad: function(a) {
        console.log(a);
        var t = this;
        a ? (t.setData({
            channel: a.channel,
            id: a.id
        }), e.getNewOpenId(function(e) {
            t.getDetailData({
                couponId: a.couponId,
                openId: e
            });
        })) : console.log("传来数据为空~");
        var o = "/subPackage/business/pages/coupon_list_detail/coupon_list_detail?id=" + t.data.id + "&orgId=" + a.orgId + "&couponId=" + t.data.couponId;
        e.saveRecordInfo(o, a.orgId), a.action && "goHome" == a.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    onShow: function(a) {},
    getDetailData: function(o) {
        var n = this;
        wx.request({
            url: e.globalData.host + "coupon/info",
            method: "post",
            data: o,
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if ("000000" == e.data.code) {
                    var o;
                    2 == e.data.data.status ? wx.hideShareMenu() : wx.showShareMenu({
                        withShareTicket: !0
                    }), n.setData((o = {
                        orgName: e.data.data.orgName,
                        name: e.data.data.name,
                        type: e.data.data.type,
                        minConsumeMoney: e.data.data.minConsumeMoney,
                        discountMoney: e.data.data.discountMoney,
                        endTime: t.GetTime(e.data.data.endTime, "Y-M-D"),
                        instructions: e.data.data.remark
                    }, a(o, "minConsumeMoney", e.data.data.minConsumeMoney), a(o, "startTime", t.GetTime(e.data.data.startTime, "Y-M-D")), 
                    a(o, "discount", e.data.data.discount), a(o, "phone", e.data.data.phone), a(o, "address", e.data.data.address), 
                    a(o, "logo", e.data.data.logo), a(o, "validType", e.data.data.validType), a(o, "validTypeName", e.data.data.validTypeName), 
                    a(o, "count", e.data.data.count), a(o, "isReceive", e.data.data.isReceive), a(o, "id", e.data.data.id), 
                    a(o, "couponId", e.data.data.couponId), a(o, "status", e.data.data.status), o));
                }
            }
        });
    },
    clickReceive: function(a) {
        var t = this, o = a.target.dataset.id, n = {
            openId: e.globalData.openid,
            id: o,
            couponId: a.target.dataset.couponid
        };
        1 == a.target.dataset.status && wx.request({
            url: e.globalData.host + "coupon/receiveCoupon",
            method: "post",
            data: n,
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                "000000" == a.data.code && (wx.showToast({
                    title: "领取成功！",
                    duration: 1500
                }), t.setData({
                    isReceive: 2,
                    count: t.data.count + 1
                }));
            }
        });
    }
});