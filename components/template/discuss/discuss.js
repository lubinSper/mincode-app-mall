Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.discuss = void 0;

var t = require("../../../components/model/discover/comment/discover-list-comment-publish-m"), s = require("../../../components/model/discover/comment/discover-list-likes-on-m"), o = require("../../../components/model/discover/comment/discover-list-likes-off-m"), e = require("../../../components/model/discover/comment/discover-list-comment-del-m"), i = getApp(), n = {
    showDiscussInput: function(t) {
        console.log("showDiscussInput -------"), console.log("discussInfo=", this.data.discussInfo), 
        console.log("shopList=", this.data.shopList);
        var s = this, o = t.currentTarget.dataset.nowid, e = t.currentTarget.dataset.goodsid;
        clearTimeout(i);
        var i = setTimeout(function() {
            if (!s.data.discussInfo.inputShow) {
                var t = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                s.animation = t, t.translateX(360).step(), s.data.shopList[o].animationData = s.animation.export(), 
                s.data.shopList[o].animationDataShow = !1, s.setData(s.data), s.data.discussInfo.inputShow = !0, 
                s.data.discussInfo.placeHolder = "请输入评论内容", s.data.discussInfo.goodsId = e, s.data.discussInfo.shopListIndex = o, 
                s.setData(s.data);
            }
        }, 300);
    },
    DiscussInputState: function(t) {
        console.log("开始聚焦或输入");
        var s = this, o = t.detail.value;
        s.data.discussInfo.inputText = o, s.setData(s.data);
    },
    sendDiscuss: function() {
        var s = this;
        "" == s.data.discussInfo.inputText.replace(/\s+/g, "") ? wx.showModal({
            title: "温馨提示",
            confirmColor: "#ff7800",
            showCancel: !1,
            content: "请输入评论内容",
            success: function(t) {}
        }) : ((0, t.DiscoverListCommentPublishM)({
            data: {
                comment: s.data.discussInfo.inputText.trim(),
                goodsId: s.data.discussInfo.goodsId,
                openId: i.globalData.openid
            },
            ele: s,
            fn: function() {
                console.log("准备隐藏输入框"), s.hideDiscussInput();
            }
        }), console.log("开始发送评论"));
    },
    delDiscuss: function(t) {
        var s = this, o = t.currentTarget.dataset.belongto, i = t.currentTarget.dataset.outindex, n = t.currentTarget.dataset.selfindex, a = t.currentTarget.dataset.id;
        1 == o && wx.showModal({
            title: "删除提醒",
            content: "确定删除该评论？",
            confirmColor: "#ff7800",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), (0, e.DiscoverListCommentDelM)({
                    data: {
                        id: a
                    },
                    ele: s,
                    fn: function() {
                        s.data.shopList[i].comments.splice(n, 1), s.setData(s.data);
                    }
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    clickToLick: function(t) {
        var o = t.currentTarget.dataset.goodsid, e = t.currentTarget.dataset.nowclickid, n = this;
        console.log(o), (0, s.DiscoverListLikesOnM)({
            data: {
                goodsId: o,
                openId: i.globalData.openid
            },
            ele: n,
            index: e,
            fn: function() {}
        });
    },
    clickToCancelLick: function(t) {
        t.currentTarget.dataset.nowclickid;
        var s = t.currentTarget.dataset.likeid, e = t.currentTarget.dataset.nowclickid, i = this;
        (0, o.DiscoverListLikesOffM)({
            data: {
                id: s
            },
            ele: i,
            index: e,
            fn: function() {}
        });
    },
    hideDiscussInput: function() {
        console.log("隐藏评论输入框");
        var t = this;
        t.data.discussInfo.inputShow = !1, t.data.discussInfo.goodsId = 0, t.data.discussInfo.inputText = "", 
        t.data.discussInfo.shopListIndex = "", t.setData(t.data);
    },
    noMove: function() {}
};

exports.discuss = n;