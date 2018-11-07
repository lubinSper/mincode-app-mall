var e = require("../../components/model/QRCode-collection-m"), o = require("../../../../components/model/message/QRCode-collection/shop-info-m"), a = getApp();

Page({
    data: {
        qrcodeUrl: "",
        orgName: "",
        logo: "",
        showTipData: {
            show: !1,
            content: "网络连接失败"
        }
    },
    onLoad: function(t) {
        var c = this;
        (0, e.QRCodeCollectionM)({
            ele: c,
            data: {
                xcxId: a.globalData.xcxId,
                path: "/page/dongtai/circle-friends-css/circle-friends-css"
            }
        }), (0, o.shopInfoM)({
            ele: c,
            data: {
                xcxId: a.globalData.xcxId
            }
        });
    },
    longtap: function(e) {
        var o = e.currentTarget.dataset.src;
        console.log(o), wx.previewImage({
            current: o,
            urls: [ o ]
        });
    }
});