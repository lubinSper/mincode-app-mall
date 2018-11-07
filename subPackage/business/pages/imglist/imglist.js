var t = getApp();

Page({
    data: {
        imageList: [],
        isShowDefault: !1,
        orgId: 0
    },
    onLoad: function(a) {
        this.setData({
            imageList: [],
            orgId: a.orgId
        }), this.getDatas({
            orgId: a.orgId
        });
        t.saveRecordInfo("/subPackage/business/pages/imglist/imglist", a.orgId);
    },
    onShow: function(t) {},
    getDatas: function(a) {
        var s = this;
        wx.request({
            url: t.globalData.host + "coupon/org/info",
            method: "post",
            data: a,
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                t.data.data ? s.setData({
                    imageList: t.data.data.images
                }) : s.setData({
                    isShowDefault: !0
                });
            }
        });
    },
    showImg: function(t) {
        var a = t.target.dataset.src;
        wx.previewImage({
            current: a,
            urls: this.data.imageList
        });
    }
});