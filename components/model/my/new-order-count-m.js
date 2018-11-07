Object.defineProperty(exports, "__esModule", {
    value: !0
});

getApp();

exports.newOrderCount = function(t, e, a) {
    wx.request({
        url: e.globalData.shopMHost + "xcx/org/order/newOrderCount",
        method: "post",
        data: t,
        header: {
            "content-type": "application/json"
        },
        complete: function() {},
        success: function(t) {
            t.data.data, "000000" == t.data.code ? a(null, t.data.data) : t.data.msg && a(t.data.msg, t.data.data);
        },
        fail: function(t) {
            setTimeout(function() {
                wx.hideLoading();
            }, 1e3), a(t);
        }
    });
};