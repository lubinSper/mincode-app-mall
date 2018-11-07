var o = require("../../../../components/model/my/order_detail/order_detail_m"), a = require("../../../../components/model/message/QRCode-collection/shop-info-m"), e = getApp();

Page({
    data: {
        default_img: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/one-shop-one-mini-app/150.png",
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        product: [],
        totalPrice: 0,
        isOrder: 2,
        bookId: 0,
        isFa: 0,
        isContinueBuy: 0,
        activityIconType: [ "xsg_icon", "kj_icon", "pt_icon" ],
        homePath: e.globalData.HomePath,
        hasData: !1
    },
    onLoad: function(o) {
        wx.showLoading({
            title: "加载中..."
        });
        var a = this;
        o && a.setData({
            orderId: o.orderId,
            orgId: e.globalData.orgId,
            locationurlz: e.globalData.shopMHost,
            bookId: o.bookId,
            isContinueBuy: o.isContinueBuy ? o.isContinueBuy : 0
        });
    },
    onShow: function() {
        var t = this;
        (0, o.getOrderDetailM)({
            ele: t,
            data: {
                orderId: parseInt(t.data.orderId)
            }
        }), (0, a.shopInfoM)({
            ele: t,
            data: {
                xcxId: e.globalData.xcxId
            }
        });
    }
});