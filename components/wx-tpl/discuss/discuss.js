var t = require("../../../components/model/discover/comment/discover-list-comment-publish-m"), e = require("../../../components/model/discover/comment/discover-list-likes-on-m"), s = require("../../../components/model/discover/comment/discover-list-likes-off-m"), o = require("../../../components/model/discover/comment/discover-list-comment-del-m"), a = getApp();

Component({
    properties: {
        seeNum: {
            type: Number,
            value: "",
            observer: function(t, e) {}
        },
        likeId: {
            type: Number,
            value: "",
            observer: function(t, e) {
                t && this.setData({
                    likeId: t
                });
            }
        },
        likeStatus: {
            type: Number,
            value: "",
            observer: function(t, e) {
                t && this.setData({
                    likeStatus: t
                });
            }
        },
        likes: {
            type: Array,
            value: "",
            observer: function(t, e) {
                t && this.setData({
                    likes: t
                });
            }
        },
        comments: {
            type: Array,
            value: "",
            observer: function(t, e) {
                t && this.setData({
                    comments: t
                });
            }
        },
        i: {
            type: Number,
            value: "",
            observer: function(t, e) {}
        },
        goodsId: {
            type: Number,
            value: "",
            observer: function(t, e) {}
        },
        animationData: {
            type: Array,
            value: "",
            observer: function(t, e) {}
        },
        showBlock: {
            type: String,
            value: "",
            observer: function(t, e) {}
        },
        shopList: {
            type: Array,
            value: "",
            observer: function(t, e) {
                t && this.setData({
                    shopList: t
                });
            }
        },
        discussInfo: {
            type: Object,
            value: {},
            observer: function(t, e) {
                t && this.setData({
                    discussInfo: t
                });
            }
        }
    },
    data: {
        discussInfo: {},
        shopList: [],
        oneClick: 1,
        onAuthShow: "",
        onAuthHide: "",
        authParams: {
            isCallBackHandle: !1
        }
    },
    methods: {
        showDiscussInput: function(t) {
            var e = this;
            a.userInfoMiddleWare().then(function(s) {
                if (console.log("data", s), s.isGetUserInfo) {
                    var o = t.currentTarget.dataset.nowid, a = t.currentTarget.dataset.goodsid;
                    clearTimeout(i);
                    var i = setTimeout(function() {
                        if (!e.data.discussInfo.inputShow) {
                            var t = wx.createAnimation({
                                duration: 200,
                                timingFunction: "ease-out"
                            });
                            e.animation = t, t.translateX(360).step(), e.data.shopList[o].animationData = e.animation.export(), 
                            e.data.shopList[o].animationDataShow = !1, e.setData(e.data), e.data.discussInfo.inputShow = !0, 
                            e.data.discussInfo.placeHolder = "请输入评论内容", e.data.discussInfo.goodsId = a, e.data.discussInfo.shopListIndex = o, 
                            e.setData(e.data);
                        }
                    }, 300);
                } else {
                    var n = new Date().getTime();
                    e.setData({
                        onAuthShow: n
                    });
                }
            });
        },
        DiscussInputState: function(t) {
            console.log("开始聚焦或输入");
            var e = this, s = t.detail.value;
            e.data.discussInfo.inputText = s, e.setData(e.data);
        },
        sendDiscuss: function() {
            var e = this;
            "" == e.data.discussInfo.inputText.replace(/\s+/g, "") ? wx.showModal({
                title: "温馨提示",
                confirmColor: "#ff7800",
                showCancel: !1,
                content: "请输入评论内容",
                success: function(t) {}
            }) : ((0, t.DiscoverListCommentPublishM)({
                data: {
                    comment: e.data.discussInfo.inputText.trim(),
                    goodsId: e.data.discussInfo.goodsId,
                    openId: a.globalData.openid
                },
                ele: e,
                fn: function() {
                    console.log("准备隐藏输入框"), e.triggerEvent("setDiscussValue", {
                        shopList: e.data.shopList
                    }), e.hideDiscussInput();
                }
            }), console.log("开始发送评论"));
        },
        delDiscuss: function(t) {
            var e = this, s = t.currentTarget.dataset.belongto, a = t.currentTarget.dataset.outindex, i = t.currentTarget.dataset.selfindex, n = t.currentTarget.dataset.id;
            1 == s && wx.showModal({
                title: "删除提醒",
                content: "确定删除该评论？",
                confirmColor: "#ff7800",
                success: function(t) {
                    t.confirm ? (console.log("用户点击确定"), (0, o.DiscoverListCommentDelM)({
                        data: {
                            id: n
                        },
                        ele: e,
                        fn: function() {
                            var t = e.data.shopList;
                            t[a].comments.splice(i, 1), e.triggerEvent("setDiscussValue", {
                                shopList: t
                            });
                        }
                    })) : t.cancel && console.log("用户点击取消");
                }
            });
        },
        clickToLick: function(t) {
            var s = t.currentTarget.dataset.goodsid, o = t.currentTarget.dataset.nowclickid, i = this;
            a.userInfoMiddleWare().then(function(t) {
                if (console.log("data", t), t.isGetUserInfo) (0, e.DiscoverListLikesOnM)({
                    data: {
                        goodsId: s,
                        openId: a.globalData.openid
                    },
                    ele: i,
                    index: o,
                    fn: function() {
                        i.triggerEvent("setDiscussValue", {
                            shopList: i.data.shopList
                        });
                    }
                }); else {
                    var n = new Date().getTime();
                    i.setData({
                        onAuthShow: n
                    });
                }
            });
        },
        clickToCancelLick: function(t) {
            console.log("clickToCancelLick----");
            t.currentTarget.dataset.nowclickid;
            var e = t.currentTarget.dataset.likeid, o = t.currentTarget.dataset.nowclickid, a = this;
            (0, s.DiscoverListLikesOffM)({
                data: {
                    id: e
                },
                ele: a,
                index: o,
                fn: function() {
                    a.triggerEvent("setDiscussValue", {
                        shopList: a.data.shopList
                    });
                }
            });
        },
        hideDiscussInput: function() {
            console.log("隐藏评论输入框");
            var t = this;
            t.data.discussInfo.inputShow = !1, t.data.discussInfo.goodsId = 0, t.data.discussInfo.inputText = "", 
            t.data.discussInfo.shopListIndex = "", t.setData(t.data);
        },
        noMove: function() {}
    }
});