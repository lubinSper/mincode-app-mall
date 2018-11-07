var a = require("../../common-js/classLoop"), t = getApp();

Component({
    behaviors: [],
    properties: {
        image: {
            type: Object,
            value: {
                jumpType: 1,
                jumpUrl: "/page/index",
                pictureUrl: "http://kotdev.oss-cn-shenzhen.aliyuncs.com/201807/27/sns/1532658288000000001.png",
                pictureSpacing: 2,
                pageUrl: "其他小程序路径",
                appId: "wx12354df47787dfds"
            },
            observer: function(a, t) {
                this.updata();
            }
        },
        classlist: {
            type: Array,
            value: [],
            observer: function(a, t) {
                console.log("分类列表触发更新-----------", a, t);
            }
        }
    },
    data: {
        openId: "",
        path: ""
    },
    methods: {
        previewImage: function(e) {
            var i = this.data.image.jumpType, s = this.data.image.jumpUrl, o = (this.data.image, 
            "");
            if (2 == i && (o = "/subPackage/discover/pages/" + (3 == t.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + (this.data.image.productId || s)), 
            3 == i) {
                var p = (0, a.classLoop)(s, this.data.classlist);
                wx.navigateTo({
                    url: "/subPackage/index/pages/category-list/category-list?tagType=&iconName=" + p + "&categoryId=" + s
                });
            }
            4 == i && (o = "/" + s), 2 == i && this.data.image.productId || 4 == i ? wx.navigateTo({
                url: o,
                success: function() {
                    console.log(1111);
                },
                fail: function() {
                    console.log(2222);
                }
            }) : 1 == i && wx.previewImage({
                current: this.data.image.pictureUrl,
                urls: [ this.data.image.pictureUrl ]
            });
        },
        updata: function() {
            if (5 == this.data.image.jumpType) {
                var a = this.data.image.jumpUrl.split("appPath=");
                this.setData({
                    openId: a[0],
                    path: a[1]
                });
            }
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