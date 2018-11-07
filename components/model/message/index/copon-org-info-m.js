Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = getApp();

exports.coponOrgInfoM = function(a) {
    wx.request({
        url: e.globalData.host + "coupon/org/info",
        method: "post",
        data: a.data,
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            var t = e.data.data;
            t && (a.ele.data.enableCs = t.enableCs, wx.setStorage({
                key: "enableCs",
                data: t.enableCs
            })), a.ele.setData(a.ele.data);
        }
    });
};