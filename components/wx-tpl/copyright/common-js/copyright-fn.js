Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.copyrightFn = void 0;

require("../../../../components/conf/conf.js");

var o = require("./join-apply-config-m.js"), n = (getApp(), Behavior({
    behaviors: [],
    data: {
        onShow: "",
        content: {}
    },
    properties: {
        onShow: {
            type: String,
            value: "",
            observer: function(o, n) {
                o && this.onShow();
            }
        },
        onPullDownRefresh: {
            type: String,
            value: "",
            observer: function(o, n) {
                o && this.onPullDownRefresh(o);
            }
        }
    },
    methods: {
        onShow: function() {
            var n = this;
            (0, o.joinApplyConfigM)({
                ele: n
            });
        },
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {
            var n = this;
            (0, o.joinApplyConfigM)({
                ele: n
            });
        }
    },
    ready: function() {}
}));

exports.copyrightFn = n;