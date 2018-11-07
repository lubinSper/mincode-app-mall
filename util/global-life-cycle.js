Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = Object.assign || function(o) {
    for (var n = 1; n < arguments.length; n++) {
        var e = arguments[n];
        for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (o[t] = e[t]);
    }
    return o;
}, n = {
    eventsMap: {},
    on: function(o, n) {
        this.eventsMap[o] = n;
    },
    trigger: function(o, n) {
        if (this.eventsMap[o]) return this.eventsMap[o](n), this;
        console.log("事件为定义 " + o);
    }
};

exports.newPage = function(n) {
    function e(o, e) {
        if (o[e]) {
            var t = o[e];
            o[e] = function(o) {
                t.call(this, o), "onLoad" == e ? n && n.onLoad && n.onLoad(this, o) : "unLoad" == e ? n && n.unLoad && n.unLoad() : "onShow" == e ? n && n.onShow && n.onShow(this) : "onHide" == e ? n && n.onHide && n.onHide(this) : "onReachBottom" == e ? n && n.onReachBottom && n.onReachBottom(this) : "onPullDownRefresh" == e && n && n.onPullDownRefresh && n.onPullDownRefresh();
            };
        }
    }
    var t = Page;
    Page = function(a) {
        e(a, "onLoad"), e(a, "unLoad"), e(a, "onShow"), e(a, "onHide"), e(a, "onReachBottom"), 
        e(a, "onPullDownRefresh"), t(o({}, a, n.methods));
    };
}, exports.eventBus = n;