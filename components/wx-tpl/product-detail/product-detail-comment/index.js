require("../../../../components/model/discover/comment/discover-list-comment-publish-m");

var t = getApp(), e = function(t) {
    return console.log(t / 375 * wx.getSystemInfoSync().screenWidth), t / 375 * wx.getSystemInfoSync().screenWidth;
};

Component({
    properties: {
        commentList: {
            type: Array,
            value: []
        },
        likeList: {
            type: Array,
            value: []
        },
        tabItemIndex: {
            type: Number,
            value: 0
        },
        goodsId: {
            type: String,
            value: "",
            observer: function(t, e) {
                this.setData({
                    "discussInfo.goodsId": t
                });
            }
        }
    },
    data: {
        discussInfo: {
            inputText: "",
            goodsId: "",
            shopListIndex: 0
        },
        payList: [ {
            name: "删除",
            key: "delete",
            title: "",
            icon: "",
            use: !0
        } ],
        isShowActionSheet: !1,
        onAuthShow: "",
        onAuthHide: "",
        authParams: {
            isCallBackHandle: !1
        }
    },
    ready: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(s) {
                console.log(s.model), t.setData({
                    isIpx: s.model.includes("iPhone X"),
                    windowHeight: s.windowHeight - e(50),
                    boardHeigt: e(50)
                });
            }
        });
    },
    methods: {
        getBlur: function() {
            this.setData({
                boardHeigt: e(50),
                blur: !1
            });
        },
        getFocus: function(e) {
            var s = this;
            t.userInfoMiddleWare().then(function(t) {
                if (console.log("data", t), t.isGetUserInfo) s.setData({
                    boardHeigt: e.detail.height,
                    blur: !0
                }); else {
                    wx.hideKeyboard();
                    var o = new Date().getTime();
                    s.setData({
                        onAuthShow: o
                    });
                }
            });
        },
        discussInputState: function(t) {
            var e = t.detail.value;
            this.setData({
                "discussInfo.inputText": e
            });
        },
        sendDiscuss: function() {
            var e = this;
            "" == this.data.discussInfo.inputText.replace(/\s+/g, "") ? wx.showModal({
                title: "温馨提示",
                confirmColor: "#ff7800",
                showCancel: !1,
                content: "请输入评论内容",
                success: function(t) {}
            }) : t.ajaxSubmit({
                url: t.globalData.shopMHost + "xcx/org/goods/comment/add",
                method: "post",
                data: {
                    comment: this.data.discussInfo.inputText.trim(),
                    goodsId: this.data.discussInfo.goodsId,
                    openId: t.globalData.openid
                }
            }).then(function(t) {
                e.setData({
                    "discussInfo.inputText": ""
                }), e.triggerEvent("discussSuccess");
            });
        },
        deleteItem: function(t) {
            var e = t.currentTarget.dataset.belongto, s = (t.currentTarget.dataset.outindex, 
            t.currentTarget.dataset.selfindex, t.currentTarget.dataset.id);
            this.data.commentId = s, 1 == e && this.setData({
                isShowActionSheet: !0
            });
        },
        deleteComment: function(e) {
            var s = this;
            console.log(e), "delete" === e.detail.key && t.ajaxSubmit({
                url: t.globalData.shopMHost + "xcx/org/goods/comment/del",
                method: "post",
                data: {
                    id: this.data.commentId
                }
            }).then(function(t) {
                s.setData({
                    isShowActionSheet: !1
                }), s.triggerEvent("discussSuccess");
            });
        }
    }
});