Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = getApp();

exports.getIsOpenPayM = function(t) {
    wx.request({
        url: e.globalData.host + "pay/isOpenPay",
        method: "post",
        data: t.data,
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            if (e.data.data) {
                var a = e.data.data.isOpenPay;
                t.ele.setData({
                    isOpenPay: a
                });
            }
        },
        fail: function() {
            setTimeout(function() {
                wx.hideLoading();
            }, 1e3);
        }
    });
};