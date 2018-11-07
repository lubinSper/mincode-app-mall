Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = getApp();

exports.loginM = function(o) {
    wx.request({
        url: e.globalData.shopMHost + "xcx/member/login",
        method: "post",
        data: o.data,
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            if (console.log(e), "900000" == e.data.code) wx.hideLoading(), wx.showToast({
                title: "验证码错误，请重新输入",
                icon: "none"
            }); else if ("000000" != e.data.code) wx.hideLoading(), wx.showToast({
                title: e.data.msg,
                icon: "none"
            }); else {
                var a = e.data.data;
                o.ele.setData({
                    balance: a.balance,
                    cardNo: a.cardNo,
                    id: a.id,
                    showLayer: !1,
                    firstLogin: a.firstLogin
                }, function() {
                    o.fn && o.fn(), wx.hideLoading();
                }), a.sessionId && wx.setStorageSync("memberCardInfo", a);
            }
        },
        fail: function() {
            wx.hideLoading(), wx.showToast({
                title: "网络连接失败",
                icon: "none"
            });
        }
    });
};