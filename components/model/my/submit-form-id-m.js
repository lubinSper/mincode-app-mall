Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.submitFormIdM = void 0;

require("../../function/formatMsgTime/formatMsgTime"), require("../../template/show_dialog/show_dialog"), 
getApp();

exports.submitFormIdM = function(e, o) {
    wx.request({
        url: o.globalData.pcisHost + "xcx/formId/collect",
        method: "post",
        data: e,
        header: {
            "content-type": "application/json"
        },
        complete: function() {
            wx.stopPullDownRefresh(), wx.hideLoading();
        },
        success: function(e) {},
        fail: function(e) {}
    });
};