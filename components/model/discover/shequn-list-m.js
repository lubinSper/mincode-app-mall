Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.SheQunListM = void 0;

require("../../function/formatMsgTime/formatMsgTime");

var e = require("../../template/show_dialog/show_dialog"), a = getApp();

exports.SheQunListM = function(t) {
    var l = getCurrentPages();
    a.saveRecordInfo(l[0].route, null, t.data.orgId), wx.request({
        url: a.globalData.shopMHost + "/xcx/org/new/goods/list",
        method: "post",
        data: t.data,
        header: {
            "content-type": "application/json"
        },
        complete: function() {
            wx.stopPullDownRefresh();
        },
        success: function(e) {
            var a = e.data.data;
            t.ele.data.overtime = !1, a.length > 0 ? (t.ele.data.haveData = !0, t.ele.data.noData = !1) : 1 == t.ele.data.pageIndex && (t.ele.data.haveData = !1, 
            t.ele.data.noData = !0), a.length < t.data.pageSize ? (t.ele.data.showLoading = !1, 
            t.ele.data.hasNextPage = !1, t.ele.data.showBlank = !0) : (t.ele.data.showLoading = !0, 
            t.ele.data.hasNextPage = !0);
            var l = [];
            t.PullDown ? (a.length > 0 ? t.ele.data.pageIndex = 2 : t.ele.data.pageIndex = 1, 
            wx.stopPullDownRefresh()) : t.btnActive || (l = t.ele.data.shopList, a.length > 0 && (t.ele.data.pageIndex = t.data.pageIndex + 1));
            for (var o = 0; o < a.length; o++) {
                if (a[o].coverImage = a[o].mainImagesUrl.length ? a[o].mainImagesUrl[0] : a[o].coverImage, 
                t.href = "special_selling") {
                    var s = [];
                    if (a[o].imgUrls.length < 2) s.push(a[o].imgUrls[0]), a[o].imgUrls = s; else {
                        for (var n = 0; n < a[o].imgUrls.length; n++) s.push(a[o].imgUrls[n]);
                        a[o].imgUrls = s;
                    }
                }
                l.push(a[o]);
            }
            t.ele.data.shopList = l, t.ele.setData(t.ele.data, function() {
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3), t.ele.triggerEvent("setparentdata", {
                    copyRightHide: !1
                }, {});
            }), console.log("请求完成：" + t.ele.data.hasNextPage);
        },
        fail: function() {
            t.ele.data.showLoading = !1, t.ele.data.overtime = !0, t.ele.setData(t.ele.data), 
            a.globalData.showErrorAlert && (0, e.ShowDialog)(t.ele), setTimeout(function() {
                wx.hideLoading();
            }, 1e3);
        }
    });
};