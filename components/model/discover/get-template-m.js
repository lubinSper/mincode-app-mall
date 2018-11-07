Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getTemplateM = void 0;

var e = require("../../template/show_dialog/show_dialog"), t = getApp();

exports.getTemplateM = function(a) {
    wx.request({
        url: t.globalData.shopMHost + "/xcx/pageTemplate/getTemplate",
        method: "post",
        data: a.data,
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            e && (a.ele.data.templateId = e.data.data.templateId, a.ele.setData(a.ele.data));
        },
        fail: function() {
            a.isTab ? t.globalData.showErrorAlert && (0, e.ShowDialog)(a.ele) : (0, e.ShowDialog)(a.ele);
        }
    });
};