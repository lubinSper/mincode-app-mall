var o = getApp();

Component({
    behaviors: [],
    options: {},
    data: {
        isResetPos: !1
    },
    properties: {
        isResetPos: {
            type: Boolean,
            value: !1,
            observer: function(o, e) {
                o && this.setData({
                    isResetPos: o
                });
            }
        },
        isGoodsDetail: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        submitFormId: function(e) {
            o.submitFormIdM(e.detail.formId, o.globalData.orgId), console.log(o.globalData);
            var t = o.globalData.HomePath;
            console.log("homePath=" + t), wx.switchTab({
                url: t
            });
        }
    }
});