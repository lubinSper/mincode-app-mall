var t = require("../../../../components/function/showTime/showTime.js"), a = getApp();

Page({
    data: {
        pageIndex: 1,
        isEndPage: !1,
        buy_record: [],
        tabList: [ "微信支付", "会员卡支付" ],
        curIndex: 0,
        curPayWay: "",
        isShowTab: !1,
        showReturnIndexBtn: !1
    },
    onLoad: function(t) {
        var e = this;
        console.log("页面参数----", t), wx.showLoading({
            title: "加载中..."
        }), a.getNewOpenId(function() {
            e.getPayRecordLists();
        }), this.setData({
            isShowTab: 3 == a.globalData.xcxType,
            curPayWay: this.data.tabList[this.data.curIndex]
        }), t.action && "goHome" == t.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    getFormatDate: function(a) {
        return (0, t.ShowTime)(a, "Y-M-D hh:mm:ss", "-");
    },
    getPayRecordLists: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data.pageIndex;
        return new Promise(function(n, o) {
            wx.request({
                url: a.globalData.host + (0 === t.data.curIndex ? "pay/xcxReceiptRecord" : "pay/xcxReceiptRecordMemberCard"),
                method: "post",
                data: {
                    openId: a.globalData.openid,
                    pageIndex: e,
                    pageSize: 10
                },
                success: function(a) {
                    if (wx.hideLoading(), "000000" == a.data.code) {
                        var o = a.data.data;
                        o.map(function(a, e) {
                            a.formatDate = t.getFormatDate(a.createTime);
                        }), t.setData({
                            buy_record: 1 == e ? o : t.data.buy_record.concat(o),
                            isLoaded: !0
                        });
                    } else wx.showToast({
                        title: "网络错误",
                        icon: "none"
                    });
                    n(a.data.data);
                },
                fail: function() {
                    wx.showToast({
                        title: "网络错误",
                        icon: "none"
                    });
                }
            });
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            pageIndex: 1,
            isEndPage: !1
        }), this.getPayRecordLists().then(function() {
            wx.stopPullDownRefresh();
        });
    },
    onReachBottom: function() {
        var t = this, a = this.data.pageIndex + 1;
        this.data.isLoaded && !this.data.isEndPage && this.getPayRecordLists(a).then(function(a) {
            a.length && t.data.isLoaded ? t.setData({
                isEndPage: !1,
                pageIndex: t.data.pageIndex + 1
            }) : a.length || t.setData({
                isEndPage: !0
            });
        });
    },
    checkTab: function(t) {
        var a = this;
        t.currentTarget.dataset.index != this.data.curIndex && (this.setData({
            buy_record: [],
            isLoaded: !1,
            pageIndex: 1,
            curPayWay: t.currentTarget.dataset.payway,
            curIndex: t.currentTarget.dataset.index
        }, function() {
            a.getPayRecordLists();
        }), wx.showLoading({
            title: "加载中..."
        }));
    }
});