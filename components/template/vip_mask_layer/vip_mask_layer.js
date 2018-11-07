var e = getApp();

Component({
    properties: {
        showLayer: {
            type: Boolean,
            value: !1,
            observer: function(e, o) {
                e && !o && wx.setStorageSync("isGiveVip", !0);
            }
        },
        layerType: {
            type: Number,
            value: 99
        },
        proshow: {
            type: Boolean,
            value: !1
        },
        reShow: {
            type: Number,
            value: 0,
            observer: function(e, o) {
                console.log("查询是否赠送了体验会员"), this.pollPopUp();
            }
        }
    },
    data: {
        validityTime: 158e9
    },
    ready: function() {},
    methods: {
        _closeLayer: function() {
            var e = this;
            this.setData({
                showLayer: !1
            }, function() {
                e.triggerEvent("closelayer");
            });
        },
        pollPopUp: function(o) {
            var a = this;
            this.data.proshow || e.getVipCradInfo().then(function(e) {
                console.log("会员信息-------", e), "000000" === e.data.code && 2 == e.data.data.isNeedShow && (wx.setStorageSync("isGiveVip", !0), 
                a.setData({
                    showLayer: !0,
                    validityTime: e.data.data.endTime
                }, function() {
                    a.updateGiveRecord();
                }));
            });
        },
        updateGiveRecord: function() {
            wx.request({
                url: e.globalData.shopMHost + "xcx/superMember/updateGiveRecord",
                method: "post",
                data: {
                    memberId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id,
                    orgId: e.globalData.orgId
                },
                header: {
                    codeVersion: e.globalData.codeVersion
                },
                success: function(e) {
                    "000000" === e.data.code && console.log("更新成功");
                },
                fail: function() {}
            });
        },
        goVipCenter: function() {
            this.setData({
                showLayer: !1
            }, function() {
                "subPackage/superVip/pages/index/index" != e.getNowUrl() && wx.navigateTo({
                    url: "/subPackage/superVip/pages/index/index"
                });
            });
        }
    }
});