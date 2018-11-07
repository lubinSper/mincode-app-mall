var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
    }
    return e;
};

Page({
    data: {
        dealTime: "",
        expirationDate: "",
        orderNo: "",
        productName: "",
        payAmount: "",
        reType: "vip",
        balance: "",
        returnGiftAmount: "",
        payType: ""
    },
    onLoad: function(t) {
        t.config && this.setData(e({}, JSON.parse(t.config), {
            reType: t.type
        }));
    },
    onReady: function() {},
    onShow: function() {}
});