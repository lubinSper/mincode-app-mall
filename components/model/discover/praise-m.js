Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.praiseM = void 0;

var e = require("../../template/show_dialog/show_dialog"), a = getApp();

exports.praiseM = function(t) {
    1 == t.likeStatus ? wx.request({
        url: a.globalData.shopMHost + "xcx/org/goods/like/del",
        method: "post",
        data: {
            id: t.data.likeid
        },
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            if ("000000" == a.data.code) {
                for (var o = 0; o < t.ele.data.shopList.length; o++) o == t.index && (t.ele.data.shopList[o].likes.pop(), 
                t.ele.data.shopList[o].likeStatus = 2, t.ele.data.shopList[o].praiseId = "");
                t.ele.setData(t.ele.data);
            } else t.ele.data.showTipData.content = a.data.msg, t.ele.setData(t.ele.data), (0, 
            e.ShowDialog)(t.ele);
        },
        fail: function() {
            (0, e.ShowDialog)(t.ele);
        }
    }) : wx.request({
        url: a.globalData.shopMHost + "xcx/org/goods/like/add",
        method: "post",
        data: {
            goodsId: t.data.goodsId,
            openId: t.data.openId
        },
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            if ("000000" == a.data.code) {
                for (var o = 0; o < t.ele.data.shopList.length; o++) o == t.index && (t.ele.data.shopList[o].likes.push({
                    id: a.data.data.id
                }), t.ele.data.shopList[o].likeId = a.data.data.id, t.ele.data.shopList[o].likeStatus = 1, 
                t.ele.data.shopList[o].praiseId = a.data.data.id);
                t.ele.setData(t.ele.data);
            } else a.data.code, t.ele.data.showTipData.content = a.data.msg, t.ele.setData(t.ele.data), 
            (0, e.ShowDialog)(t.ele);
        },
        fail: function() {
            (0, e.ShowDialog)(t.ele);
        }
    });
};