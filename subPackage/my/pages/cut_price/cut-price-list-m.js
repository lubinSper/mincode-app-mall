Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.cutPriceListM = void 0;

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = require("../../../../components/template/show_dialog/show_dialog.js"), t = (require("../../../../components/function/showTime/showTime.js"), 
function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../components/function/countdown/countdown"))), o = getApp();

exports.cutPriceListM = function(i) {
    o.globalData.requestTask && o.globalData.requestTask.abort(), o.globalData.requestTask = wx.request({
        url: o.globalData.shopMHost + "/xcx/bargain/list",
        method: "post",
        data: i.data,
        header: {
            "content-type": "application/json"
        },
        complete: function() {
            wx.stopPullDownRefresh();
        },
        success: function(a) {
            if (wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), a.data.data) {
                var o = a.data.data.data;
                o.length ? i.ele.data.haveData = !0 : 1 == i.ele.data.pageNo && (i.ele.data.haveData = !1, 
                i.ele.setData({
                    cutPriceList: []
                })), o.length < i.data.pageSize ? i.ele.data.pageLoading = !1 : (i.ele.data.pageLoading = !0, 
                i.ele.data.pageNo = i.ele.data.pageNo + 1), i.PullDown && (i.ele.data.cutPriceList = [], 
                i.ele.data.pageNo = 2, wx.stopPullDownRefresh());
            }
            if (a.data.data) {
                var l = a.data.data.data;
                "object" == (void 0 === l ? "undefined" : e(l)) && l.map(function(e, a) {
                    return i.ele.data.NodataTip = !1, i.ele.data.haveData = !0, e.currentPrice = l[a].currentPrice ? l[a].currentPrice / 100 : 0, 
                    e.goodsOriginalPrice = l[a].goodsOriginalPrice ? l[a].goodsOriginalPrice / 100 : 0, 
                    e.originalPrice = l[a].originalPrice ? l[a].originalPrice / 100 : 0, i.ele.data.cutPriceList.push(e), 
                    l[a] ? Object.assign({}, e, l[a]) : e;
                }), (0, t.default)({
                    key: "cut_price_list",
                    timeKey: "limitTime",
                    timeData: i.ele.data.cutPriceList,
                    fn: function(e) {
                        e && i.ele.setData({
                            cutPriceList: e
                        });
                    }
                });
            } else 1 == i.ele.data.pageNo && (i.ele.data.NodataTip = !0);
            i.ele.data.isClick = !0, i.ele.data.loading_fail = !1, i.ele.setData(i.ele.data, function() {
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
            });
        },
        fail: function() {
            i.ele.data.cutPriceList = [], i.ele.data.pageLoading = !1, i.ele.data.isClick = !0, 
            1 == i.ele.data.pageNo ? (i.ele.data.loading_fail = !0, i.ele.data.haveData = !1) : i.ele.data.tab_loading_failure = !0, 
            i.ele.data.NodataTip = !1, i.ele.setData(i.ele.data), (0, a.ShowDialog)(i.ele);
        }
    });
};