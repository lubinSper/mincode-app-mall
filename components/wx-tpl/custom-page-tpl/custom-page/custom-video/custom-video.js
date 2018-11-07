getApp();

Component({
    behaviors: [],
    properties: {
        video: {
            type: Object,
            value: {
                coverUrl: "",
                marginType: 2,
                videoUrl: ""
            },
            observer: function(e, t) {
                this.updata();
            }
        },
        indexes: {
            type: Number,
            value: 1
        },
        thisIndexes: {
            type: Number,
            value: 99,
            observer: function(e, t) {
                console.log("当前播放的视频------", e, this.data.indexes), this.data.indexes;
            }
        }
    },
    data: {
        defaultPoster: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/dv2.png"
    },
    methods: {
        updata: function() {
            "|" == this.data.video.videoUrl[0] && (this.data.video.videoUrl = this.data.video.videoUrl.substr(1), 
            this.setData({
                video: this.data.video
            }));
        },
        startPlay: function() {
            this.triggerEvent("startplay", this.data.indexes);
        },
        videoPlay: function(e) {
            this.triggerEvent("startplay", this.data.indexes), wx.createVideoContext("video-" + this.data.indexes).play();
        },
        stopPlay: function() {
            console.log("停止播放", this.data.indexes);
            var e = wx.createVideoContext("cumstoVideo" + this.data.indexes);
            console.log(e), wx.createVideoContext("cumstoVideo" + this.data.indexes).seek(0), 
            wx.createVideoContext("cumstoVideo" + this.data.indexes).pause();
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