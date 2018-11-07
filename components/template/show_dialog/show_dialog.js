Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ShowDialog = function(t, a) {
    a && (t.data.showTipData.content = a), t.data.showTipData.show = !0, t.setData(t.data), 
    setTimeout(function() {
        t.data.showTipData.show = !1, t.data.showTipData.content = "网络连接失败", t.setData(t.data);
    }, 2500);
};