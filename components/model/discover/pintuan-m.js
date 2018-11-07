Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = getApp();

exports.getPintuanInfo = function(e) {
    var a = e.data, o = e.fn, n = e.ele;
    wx.request({
        url: t.globalData.shopMHost + "xcx/pintuan/detail",
        method: "post",
        data: a,
        header: {
            "content-type": "application/json"
        },
        complete: function() {
            wx.hideLoading(), wx.stopPullDownRefresh();
        },
        success: function(e) {
            if ("000000" == e.data.code) {
                var a = e.data.data;
                o && o(a);
            } else t.showDialog(n, e.data.msg);
        },
        fail: function(e) {
            t.showDialog(n, "网络连接错误");
        }
    });
};