Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ClearSearchRecord = exports.AddSearchRecord = exports.GetSearchRecordList = void 0;

require("../../../../components/template/show_dialog/show_dialog"), getApp();

exports.GetSearchRecordList = function(e) {
    wx.getStorage({
        key: "search-history-key",
        success: function(t) {
            var r = t.data;
            e && e(r);
        },
        fail: function() {
            e && e([]);
        }
    });
}, exports.AddSearchRecord = function(e, t) {
    wx.getStorage({
        key: "search-history-key",
        success: function(r) {
            var o = r.data;
            o.unshift(e), o.length > 10 && o.splice(10, o.length - 10), wx.setStorage({
                key: "search-history-key",
                data: o
            }), t && t(o);
        },
        fail: function() {
            wx.setStorage({
                key: "search-history-key",
                data: [ e ]
            }), t && t([ e ]);
        }
    });
}, exports.ClearSearchRecord = function(e) {
    wx.setStorage({
        key: "search-history-key",
        data: []
    }), e && e();
};