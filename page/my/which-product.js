Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isHistoryOrder = exports.whichProduct = void 0;

var t = require("../../components/template/show_dialog/show_dialog"), e = getApp();

exports.whichProduct = function(o) {
    wx.request({
        url: e.globalData.shopMHost + "/xcx/upgrade/info",
        method: "post",
        data: o.data,
        header: {
            "content-type": "application/json"
        },
        complete: function() {
            wx.stopPullDownRefresh();
        },
        success: function(t) {
            t.data.data && o.ele.setData({
                xcxType: t.data.data.xcxType
            }, function() {
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
            });
        },
        fail: function() {
            e.globalData.showErrorAlert && (0, t.ShowDialog)(o.ele), setTimeout(function() {
                wx.hideLoading();
            }, 1e3);
        }
    });
}, exports.isHistoryOrder = function(o, a) {
    wx.request({
        url: e.globalData.shopMHost + "/xcx/org/order/isHistoryOrder",
        method: "post",
        data: o.data,
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            "000000" == t.data.code && (t.data.data > 0 ? o.ele.setData({
                isHistory: !0
            }) : o.ele.setData({
                isHistory: !1
            }), a && a());
        },
        fail: function() {
            e.globalData.showErrorAlert && (0, t.ShowDialog)(o.ele), setTimeout(function() {
                wx.hideLoading();
            }, 1e3);
        }
    });
};