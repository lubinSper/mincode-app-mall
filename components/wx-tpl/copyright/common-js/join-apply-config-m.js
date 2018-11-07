Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = getApp();

exports.joinApplyConfigM = function(e) {
    wx.request({
        url: t.globalData.shopMHost + "xcx/org/joinApplyConfig",
        method: "post",
        data: {
            orgId: t.globalData.orgId
        },
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            t.data.data && (e.ele.data.content = t.data.data), e.ele.setData(e.ele.data);
        },
        fail: function() {
            setTimeout(function() {
                wx.hideLoading();
            }, 1e3);
        }
    });
};