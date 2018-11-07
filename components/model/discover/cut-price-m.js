Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getCutPriceInfo = void 0;

var e = require("../../../util/util"), t = getApp();

exports.getCutPriceInfo = function(a) {
    var o = a.data, i = a.fn, r = a.ele;
    wx.request({
        url: t.globalData.shopMHost + "xcx/bargain/detail",
        method: "post",
        data: o,
        header: {
            "content-type": "application/json"
        },
        complete: function() {
            wx.hideLoading();
        },
        success: function(a) {
            if ("000000" == a.data.code) {
                var o = a.data.data;
                o.userBargainRecordDtos && o.userBargainRecordDtos.forEach(function(t) {
                    t.createTime = (0, e.getFrontDate)(t.createTime), t.nickName = t.nickName ? t.nickName : "微信用户";
                }), i && i(o);
            } else t.showDialog(r, a.data.msg);
        },
        fail: function(e) {
            t.showDialog(r, "网络连接错误");
        }
    });
};