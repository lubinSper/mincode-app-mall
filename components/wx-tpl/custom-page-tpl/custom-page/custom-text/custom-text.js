getApp();

Component({
    behaviors: [],
    properties: {
        text: {
            type: Object,
            value: {
                wordSize: 1,
                textColor: 1,
                textFormat: 2,
                textStyle: 3,
                textWords: "一行测试的文字，我们需要足够长来看下换行的情况，所以我需要一行很长很长很长的文字",
                oldData: !1
            },
            observer: function(t, e) {
                this.updata();
            }
        }
    },
    data: {
        sizeMap: {
            0: "40rpx",
            1: "36rpx",
            2: "30rpx",
            3: "26rpx",
            4: "24rpx"
        },
        styleMap: {
            0: "left",
            1: "center",
            2: "right"
        },
        formatMap: {
            0: "bold",
            1: "italic",
            2: "underline"
        },
        colorMap: {
            0: "#222222",
            1: "#888",
            2: "#ed2308",
            3: "#ff7800",
            4: "#1aad18",
            5: "#638ee9",
            6: "#b04fbb"
        },
        textStyle: ""
    },
    methods: {
        updata: function() {
            try {
                this.data.text.textWords = JSON.parse(this.data.text.textWords), this.data.text.textWords.content = this.data.text.textWords.content.replace(/\n/g, "@!!@!"), 
                this.data.text.textWords.content = this.data.text.textWords.content.replace(/\s/g, "&nbsp;"), 
                this.data.text.textWords.content = this.data.text.textWords.content.replace(/@!!@!/g, "\n"), 
                this.setData({
                    oldData: !0,
                    text: this.data.text
                }), console.log("老数据--------", this.data.text.textWords);
            } catch (t) {
                console.log("新数据------", this.data.text.textWords.length), this.data.text.textWords = this.data.text.textWords.replace(/\n/g, "@!!@!"), 
                this.data.text.textWords = this.data.text.textWords.replace(/\s/g, "&nbsp;"), this.data.text.textWords = this.data.text.textWords.replace(/@!!@!/g, "\n"), 
                this.setData({
                    oldData: !1,
                    text: this.data.text
                });
            }
            this.data.textStyle = "";
            for (var t = this.data.text.textFormat ? this.data.text.textFormat.split(",") : "", e = 0, a = t.length; e < a; e++) this.data.textStyle = this.data.textStyle + " " + this.data.formatMap[t[e]];
            this.setData({
                textStyle: this.data.textStyle
            });
        }
    },
    created: function() {},
    attached: function() {
        this.updata();
    },
    ready: function() {},
    moved: function() {},
    detached: function() {}
});