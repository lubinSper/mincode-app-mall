function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function a(e) {
    var t = this, a = e.target.dataset.src ? e.target.dataset.src : "", i = e.target.dataset.from;
    void 0 !== i && i.length > 0 && wx.previewImage({
        current: a,
        urls: t.data[i].imageUrls
    });
}

function i() {
    this.audioCtx.play();
}

function r() {
    this.audioCtx.pause();
}

function n() {
    this.audioCtx.seek(0);
}

function d(e) {
    var t = this, a = e.target.dataset.from, i = e.target.dataset.idx;
    void 0 !== a && a.length > 0 && o(e, i, t, a);
}

function o(e, a, i, r) {
    var n, d = i.data[r];
    if (d && 0 != d.images.length) {
        var o = d.images, u = s(e.detail.width, e.detail.height, i, r), l = o[a].index, g = "" + r, h = !0, m = !1, v = void 0;
        try {
            for (var f, w = l.split(".")[Symbol.iterator](); !(h = (f = w.next()).done); h = !0) g += ".nodes[" + f.value + "]";
        } catch (e) {
            m = !0, v = e;
        } finally {
            try {
                !h && w.return && w.return();
            } finally {
                if (m) throw v;
            }
        }
        var c = g + ".width", x = g + ".height";
        i.setData((n = {}, t(n, c, u.imageWidth), t(n, x, u.imageheight), n));
    }
}

function s(e, t, a, i) {
    var r = 0, n = 0, d = 0, o = {}, s = a.data[i].view.imagePadding;
    return r = g - 2 * s, h, e > r ? (d = (n = r) * t / e, o.imageWidth = n, o.imageheight = d) : (o.imageWidth = e, 
    o.imageheight = t), o;
}

var u = e(require("./showdown.js")), l = e(require("./html2json.js")), g = 0, h = 0;

wx.getSystemInfo({
    success: function(e) {
        g = e.windowWidth, h = e.windowHeight;
    }
}), module.exports = {
    wxParse: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wxParseData", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html", o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', s = arguments[3], g = arguments[4], h = s, m = {};
        if ("html" == t) m = l.default.html2json(o, e); else if ("md" == t || "markdown" == t) {
            var v = new u.default.Converter().makeHtml(o);
            m = l.default.html2json(v, e);
        }
        m.view = {}, m.view.imagePadding = 0, void 0 !== g && (m.view.imagePadding = g);
        var f = {};
        f[e] = m, h.setData(f), h.wxParseImgLoad = d, h.wxParseImgTap = a, h.audioPlay = i, 
        h.audioPause = r, h.audioStart = n;
    },
    wxParseTemArray: function(e, t, a, i) {
        for (var r = [], n = i.data, d = null, o = 0; o < a; o++) {
            var s = n[t + o].nodes;
            r.push(s);
        }
        e = e || "wxParseTemArray", (d = JSON.parse('{"' + e + '":""}'))[e] = r, i.setData(d);
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", a = arguments[2];
        l.default.emojisInit(e, t, a);
    }
};