var e = require("../../../function/formatMsgTime/formatMsgTime");

getApp();

Component({
    properties: {
        commentItem: {
            type: Object,
            value: {},
            observer: function(t, m) {
                t.createTime = (0, e.newFormatMsgTime)(t.createTime), this.setData({
                    commentItem: t
                });
            }
        },
        nobottom: {
            type: Boolean,
            value: !0
        }
    }
});