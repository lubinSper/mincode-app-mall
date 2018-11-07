Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.shopInfoM = void 0;

var e = require("../../../template/show_dialog/show_dialog"), o = getApp();

exports.shopInfoM = function(a) {
    wx.request({
        url: o.globalData.shopMHost + "/xcx/org/info",
        method: "post",
        data: a.data,
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            if (e.data.data) {
                var o = e.data.data;
                a.ele.setData({
                    logo: o.logo,
                    orgName: o.orgName,
                    enableCs: o.enableCs,
                    address: o.address,
                    address2: o.address
                }), a.fn && a.fn(o);
            }
        },
        fail: function() {
            o.globalData.showErrorAlert && (0, e.ShowDialog)(a.ele), setTimeout(function() {
                wx.hideLoading();
            }, 1e3);
        }
    });
};