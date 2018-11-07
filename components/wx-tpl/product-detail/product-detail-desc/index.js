getApp();

Component({
    properties: {
        imgTextHybr: {
            type: Array,
            value: [],
            observer: function(e, t) {
                console.log(e);
            }
        }
    },
    data: {
        defaultPoster: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/dv2.png"
    },
    ready: function() {
        this.videoContext = wx.createVideoContext("myVideo");
    },
    methods: {
        videoPlay: function(e) {
            this.setData({
                curr_id: e.currentTarget.dataset.index + 1
            });
            var t = wx.createVideoContext("video-" + e.currentTarget.dataset.index);
            this.videoContext.seek(0), t.play();
        },
        previewGoodsImage: function(e) {
            var t = [];
            this.data.imgTextHybr.map(function(e) {
                e.img && t.push(e.img);
            }), wx.previewImage({
                current: e.currentTarget.dataset.src,
                urls: t
            });
        }
    }
});