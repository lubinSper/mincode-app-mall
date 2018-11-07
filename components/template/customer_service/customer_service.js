Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = getApp(), a = {
    lookEvent: function() {
        var e = this;
        console.log("怎么会执行这个方法~"), wx.setStorage({
            key: "serviceVis",
            data: "false"
        }), e.data.serviceVis = !1, e.setData(e.data);
    },
    getOneState: function(a, t) {
        var t = t;
        wx.request({
            url: e.globalData.host + "coupon/org/info",
            method: "post",
            data: {
                orgId: a
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log("执行查询客服接口");
                var a = e.data.data;
                if (a) ;
                1 == a.enableCsPopup ? (t.data.serviceVis = !1, t.setData(t.data)) : wx.getStorage({
                    key: "serviceVis",
                    success: function(e) {
                        var a = e.data;
                        console.log("客服状态为1:" + a), "true" == a ? (console.log("显示"), t.data.serviceVis = !0) : (console.log("隐藏"), 
                        t.data.serviceVis = !1), t.setData(t.data);
                    },
                    fail: function() {
                        console.log("第一次没存储客服状态信息"), t.data.serviceVis = !0, t.setData(t.data);
                    }
                });
            }
        });
    }
};

exports.looks = a;