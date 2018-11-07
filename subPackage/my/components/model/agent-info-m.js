Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.agentInfoM = void 0;

var e = require("../../../../components/template/show_dialog/show_dialog"), t = getApp();

exports.agentInfoM = function(a) {
    wx.request({
        url: t.globalData.host + "/agent/info",
        method: "post",
        data: a.data,
        header: {
            "content-type": "application/json"
        },
        complete: function() {
            wx.stopPullDownRefresh(), wx.hideLoading();
        },
        success: function(e) {
            e.data.data && (a.ele.data.phone = e.data.data.phone, a.ele.data.orgId = e.data.data.orgId, 
            a.ele.setData(a.ele.data)), a.fn && a.fn();
        },
        fail: function() {
            (0, e.ShowDialog)(a.ele);
        }
    });
};