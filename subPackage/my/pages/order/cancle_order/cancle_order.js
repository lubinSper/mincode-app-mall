var e = require("../../../components/model/my_reservation_data.js");

Page({
    data: {
        reasonArray: [ {
            title: "我不想买了",
            isChoose: !0
        }, {
            title: "无法联系卖家",
            isChoose: !1
        }, {
            title: "卖家发货太慢",
            isChoose: !1
        }, {
            title: "预约人数已满",
            isChoose: !1
        }, {
            title: "此时段无法预约",
            isChoose: !1
        }, {
            title: "其他原因",
            isChoose: !1
        } ],
        showTextarea: !1,
        focus: !1,
        otherReson: "",
        id: 0,
        isBack: 0
    },
    onLoad: function(e) {
        e && this.setData({
            id: e.id,
            isBack: e.isBack ? e.isBack : 0
        });
    },
    onShow: function() {},
    onHide: function() {},
    cancleItemClick: function(e) {
        var t = this, a = t.data.reasonArray, s = e.currentTarget.dataset.title;
        if (!t.data.showTextarea || "其他原因" != s) {
            for (var i = 0; i < a.length; i++) a[i].title == s ? ("其他原因" == s && t.setData({
                showTextarea: !0,
                focus: !0
            }), a[i].isChoose = !0) : (a[i].isChoose = !1, t.setData({
                showTextarea: !1,
                focus: !1
            }));
            t.setData({
                reasonArray: a
            });
        }
    },
    sureCancleFuc: function(t) {
        var a = this;
        wx.showModal({
            title: "确认取消该订单吗？",
            content: "取消后不可恢复，如有需要请重新下单",
            cancelText: "取消",
            confirmText: "确定",
            success: function(s) {
                if (s.confirm) {
                    wx.showLoading({
                        title: "加载中"
                    });
                    for (var i = a.data.reasonArray, o = "", r = 0; r < i.length; r++) 1 == i[r].isChoose && (o = r == i.length - 1 ? t.detail.value.textarea ? t.detail.value.textarea : "其他原因" : i[r].title);
                    var n = {
                        closureReason: o,
                        id: a.data.id,
                        status: 7
                    };
                    (0, e.sure_complete)({
                        ele: a,
                        data: n
                    }, function() {
                        if (wx.hideLoading(), 1 == a.data.isBack) {
                            var e = getCurrentPages();
                            if (e.length > 2) {
                                var t = e[e.length - 3];
                                t.getData ? t.getData() : t.getOrderList && t.getOrderList(t.data.status);
                            }
                            wx.navigateBack();
                        } else wx.navigateTo({
                            url: "/subPackage/my/pages/new_order_detail/new_order_detail?id=" + a.data.id
                        });
                    });
                }
            }
        });
    }
});