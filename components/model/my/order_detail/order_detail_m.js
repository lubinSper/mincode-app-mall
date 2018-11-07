Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getNewOrderDetailM = exports.getOrderDetailM = void 0;

var e = require("../../../function/showTime/showTime"), t = require("../../../template/show_dialog/show_dialog"), r = getApp();

exports.getOrderDetailM = function(o) {
    wx.request({
        url: r.globalData.shopMHost + "/xcx/user/order/info",
        method: "post",
        data: o.data,
        header: {
            "content-type": "application/json"
        },
        complete: function(e) {
            wx.hideLoading();
        },
        success: function(r) {
            if (r.data.data) {
                var i = r.data.data, a = 0, d = 0, c = 0;
                if (i.product) for (var u = 0; u < i.product.length; u++) i.product[u].productOriginalPrice >= i.product[u].productPrice ? (a += parseInt(parseInt(i.product[u].productOriginalPrice - i.product[u].productPrice) * i.product[u].productCount), 
                d += parseInt(i.product[u].productOriginalPrice * i.product[u].productCount), c = 1) : d += parseInt(i.product[u].productPrice * i.product[u].productCount), 
                i.product[u].toFixedproductPrice = i.product[u].productPrice / 100, i.product[u].toFixedproductOriginalPrice = i.product[u].productOriginalPrice / 100;
                o.ele.setData({
                    amount: (i.amount / 100).toFixed(2),
                    buyTime: (0, e.ShowTime)(i.buyTime, "Y-M-D hh:mm:ss", "-"),
                    goodsDesc: i.goodsDesc,
                    goodsId: i.goodsId,
                    goodsImage: i.goodsImage,
                    isDelete: i.isDelete,
                    orderNo: i.orderNo,
                    publishTime: (0, e.ShowTime)(i.publishTime, ""),
                    qrcode: i.qrcode,
                    productOriginalPrice: (0).toFixed(2),
                    freight: (i.freight / 100).toFixed(2),
                    favourable: "-￥" + (a / 100).toFixed(2),
                    name: i.name,
                    payMethod: i.payMethod,
                    product: i.product,
                    productType: i.productType,
                    address1: i.address,
                    customerRemark: i.customerRemark,
                    reserveTime: i.reserveTime,
                    mobilePhone: i.mobilePhone,
                    consigneeName: i.consigneeName,
                    productPrice: (i.productPrice / 100).toFixed(2),
                    totalPrice: (d / 100).toFixed(2),
                    isFa: c,
                    hasData: !0
                });
            } else o.ele.setData({
                pageLoading: !1,
                showTipData: {
                    show: !0,
                    content: r.data.msg
                }
            }), (0, t.ShowDialog)(o.ele);
        },
        fail: function() {
            (0, t.ShowDialog)(o.ele);
        }
    });
}, exports.getNewOrderDetailM = function(o, i) {
    wx.request({
        url: r.globalData.shopMHost + "xcx/org/order/orderInfo",
        method: "post",
        data: o.data,
        header: {
            "content-type": "application/json"
        },
        complete: function(e) {
            wx.hideLoading();
        },
        success: function(r) {
            if (r.data.data) {
                var a = r.data.data;
                o.ele.setData({
                    updateTime: r.data.data.updateTime
                });
                if (a.xcxOrderProductDtoList) for (var d = a.xcxOrderProductDtoList, c = 0; c < d.length; c++) d[c].productPrice || (d[c].productPrice = 0), 
                d[c].productOriginalPrice > d[c].productPrice ? (d[c].productOriginalPrice, d[c].productPrice, 
                d[c].productCount, parseInt(d[c].productOriginalPrice * d[c].productCount)) : parseInt(d[c].productPrice * d[c].productCount), 
                d[c].productPriceStr = (d[c].productPrice / 100).toFixed(2), d[c].productOriginalPriceStr = d[c].productOriginalPrice ? (d[c].productOriginalPrice / 100).toFixed(2) : "0.00";
                a.buyTime = a.buyTime ? (0, e.ShowTime)(a.buyTime, "Y-M-D hh:mm:ss", "-") : "", 
                a.createTime = a.createTime ? (0, e.ShowTime)(a.createTime, "Y-M-D hh:mm:ss", "-") : "", 
                a.updateTime = a.updateTime ? (0, e.ShowTime)(a.updateTime, "Y-M-D hh:mm:ss", "-") : "", 
                a.originalPriceStr = a.originalPrice ? (a.originalPrice / 100).toFixed(2) : "0.00", 
                a.priceStr = a.price ? (a.price / 100).toFixed(2) : "0.00", a.freight = a.freight ? a.freight : 0, 
                a.freightDiscount = a.freightDiscount ? a.freightDiscount : 0, 0 == a.freightDiscount ? a.freightDiscountStr = "0.00" : a.freightDiscountStr = (a.freightDiscount / 100).toFixed(2), 
                0 == a.freight ? a.freightStr = a.freightDiscountStr : a.freightStr = (a.freight / 100).toFixed(2), 
                a.amount = a.price + a.freight, a.amountStr = (a.amount / 100).toFixed(2), a.favourable = "0.00", 
                a.closureReason = a.closureReason ? a.closureReason : "其他原因", a.address = a.address ? a.address : "-", 
                a.expressName = a.expressName ? a.expressName : "-", a.favourable = ((a.originalPrice - a.price) / 100).toFixed(2), 
                o.ele.setData({
                    order: a
                }), i && i();
            } else o.ele.setData({
                pageLoading: !1,
                showTipData: {
                    show: !0,
                    content: r.data.msg
                }
            }), (0, t.ShowDialog)(o.ele);
        },
        fail: function() {
            (0, t.ShowDialog)(o.ele);
        }
    });
};