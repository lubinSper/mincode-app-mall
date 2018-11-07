Object.defineProperty(exports, "__esModule", {
    value: !0
});

getApp();

exports.orderStateChangeM = function(e) {
    e.data.visiable = "none", e.setData(e.data), wx.getStorage({
        key: "ordering_type",
        success: function(a) {
            var t = a.data;
            e.data.visiable = "2" == t ? "flex" : "none", e.setData(e.data);
        },
        fail: function() {
            e.data.visiable = "none", e.setData(e.data);
        }
    });
};