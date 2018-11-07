function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = require("../../../../components/model/discover/pintuan-m"), o = require("../../../../util/util"), n = e(require("../../../../components/function/countdown/countdown")), a = e(require("../../../../components/conf/pintuan_words")), i = getApp();

Page({
    data: {
        showModal: !1,
        showReturnIndexBtn: !1,
        time: ""
    },
    onLoad: function(e) {
        var t = e.id, o = e.isCreate, n = e.action;
        wx.showLoading({
            title: "加载中..."
        }), this.setData({
            id: t,
            showModal: 2 == o
        }), n && "goHome" == n ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    onPullDownRefresh: function() {
        this.onShow();
    },
    onShow: function() {
        var e = this;
        i.getNewOpenId(function(i) {
            (0, t.getPintuanInfo)({
                ele: e,
                data: {
                    openId: i,
                    openTuanId: e.data.id
                },
                fn: function(t) {
                    var d = new Array(t.limitPeopleNum).fill("0"), r = t.joinDtos || [];
                    t.heads = d.map(function(e, t) {
                        return r[t] ? r[r.length - 1 - t] : {
                            avatarUrl: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/shop-multi/placeholder_header.png"
                        };
                    }), t.joinDtos && t.joinDtos.forEach(function(e) {
                        e.createTime = (0, o.getFrontDate)(e.createTime), e.nickName = e.nickName ? e.nickName : "微信用户", 
                        e.word = a.default[e.id % a.default.length];
                    }), e.setData({
                        isCommander: t.openId == i,
                        isEnd: t.currentPeopleNum == t.limitPeopleNum,
                        info: t
                    }, function() {
                        (0, n.default)({
                            key: "pintuanDetail",
                            timeKey: "limitTime",
                            timeData: t.limitTime,
                            fn: function(t) {
                                t && e.setData({
                                    time: t[0] + ":" + t[1] + ":" + t[2]
                                });
                            }
                        });
                    });
                }
            });
        });
    },
    toDetail: function(e) {
        this.collectFormId(e), wx.navigateTo({
            url: "/subPackage/discover/pages/" + (3 == i.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + this.data.info.productId
        });
    },
    onShareAppMessage: function() {
        this.setData({
            showModal: !1
        });
        var e = getCurrentPages(), t = i.isHasTabByTitle({
            url: e[e.length - 1].route
        });
        console.log("tempJson=", t);
        var o = "/subPackage/discover/pages/pintuan_detail/pintuan_detail?action=goHome&id=" + this.data.id + "&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id);
        return t.check && (o = "/subPackage/discover/pages/pintuan_detail/pintuan_detail?id=" + this.data.id + "&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id)), 
        console.log("tempShareUrl=", o), {
            title: "实惠一起拼，省钱又省心【" + this.data.info.productName + "】",
            path: o
        };
    },
    closeSuccessModal: function(e) {
        this.setData({
            showModal: !1
        });
    },
    openRuleModal: function(e) {
        this.collectFormId(e), this.setData({
            ruleModal: !0
        });
    },
    closeRuleModal: function(e) {
        this.setData({
            ruleModal: !1
        });
    },
    joinPintuan: function(e) {
        var t = this, o = this;
        i.userInfoMiddleWare(!0).then(function(n) {
            n.isGetUserInfo ? (o.collectFormId(e), 2 == t.data.info.isJoin ? i.showDialog(t, "该商品你已有拼团，无法再次参团。") : wx.navigateTo({
                url: "/subPackage/my/pages/order/order_sure_pickup/order_sure_pickup?from=4&id=" + t.data.info.productId + "&pintuanId=" + t.data.info.id
            })) : wx.eventBus.trigger("showOnAuthShow");
        });
    },
    collectFormId: function(e) {
        i.submitFormIdM(e.detail.formId, i.globalData.orgId);
    }
});