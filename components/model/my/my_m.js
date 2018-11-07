Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = getApp();

exports.phoneValidCodeM = function(t) {
    wx.request({
        url: e.globalData.shopMHost + "xcx/member/getValidCode",
        method: "post",
        data: t.data,
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            var a = e.data;
            "000000" == a.code ? t.fn && t.fn() : wx.showToast({
                title: a.msg,
                icon: "none"
            });
        },
        fail: function() {
            wx.showToast({
                title: "网络连接失败",
                icon: "none"
            });
        }
    });
}, exports.memberInfoM = function(t) {
    wx.request({
        url: e.globalData.shopMHost + "xcx/member/memberInfo",
        method: "post",
        data: t.data,
        header: {
            "content-type": "application/json",
            sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
        },
        success: function(a) {
            if ("000000" == a.data.code) {
                var o = a.data.data;
                o && t.ele.setData({
                    balance: o.balance,
                    cardNo: o.cardNo,
                    memberCardInfo: o
                });
            } else "100001" == a.data.code && e.loginInOtherPlaceAlert(a, function() {
                t.repeatLogin && t.repeatLogin();
            });
        },
        fail: function() {}
    });
}, exports.isSetPayPwdM = function(t) {
    wx.request({
        url: e.globalData.shopMHost + "xcx/member/isSetPwd",
        method: "post",
        data: t.data,
        header: {
            "content-type": "application/json",
            sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
        },
        success: function(e) {
            "000000" == e.data.code && t.ele.setData({
                isSetPwd: e.data.data
            });
        },
        fail: function() {}
    });
};