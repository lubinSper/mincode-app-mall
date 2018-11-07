Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.categoryM = void 0;

var t = require("../../template/show_dialog/show_dialog"), e = getApp();

exports.categoryM = function(a) {
    wx.request({
        url: e.globalData.shopMHost + "xcx/category/list",
        method: "post",
        data: a.data,
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            var e = t.data.data;
            e && e.length > 0 && (e.unshift({
                active: "active",
                name: "全部"
            }), a.ele.data.tabList.list = e), a.ele.setData({
                tabList: a.ele.data.tabList
            }, function() {
                a.fn && a.fn();
            });
        },
        fail: function() {
            a.isTab ? e.globalData.showErrorAlert && (0, t.ShowDialog)(a.ele) : (0, t.ShowDialog)(a.ele);
        }
    });
};