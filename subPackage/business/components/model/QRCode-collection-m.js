Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.QRCodeCollectionM = void 0;

var e = require("../../../../components/template/show_dialog/show_dialog"), o = getApp();

exports.QRCodeCollectionM = function(t) {
    wx.request({
        url: o.globalData.shopMHost + "/xcx/base/pageQrCode",
        method: "post",
        data: t.data,
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            t.ele.setData({
                qrcodeUrl: e.data.data
            });
        },
        fail: function() {
            (0, e.ShowDialog)(t.ele);
        }
    });
};