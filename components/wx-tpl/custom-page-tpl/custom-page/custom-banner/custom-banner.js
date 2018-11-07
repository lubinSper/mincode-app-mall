var t = require("../../common-js/classLoop"), a = getApp();

Component({
    behaviors: [],
    properties: {
        sowingList: {
            type: Array,
            value: [],
            observer: function(t, a) {
                this.updata();
            }
        },
        classlist: {
            type: Array,
            value: [],
            observer: function(t, a) {
                console.log("分类列表触发更新-----------", t, a);
            }
        }
    },
    data: {
        autoplay: !0,
        interval: 3e3,
        duration: 500,
        circular: !0,
        currentIndex: 0,
        imgUrlArry: []
    },
    methods: {
        showBannerImg: function(i) {
            var s = i.currentTarget.dataset.jumptype, e = i.currentTarget.dataset.jumpurl, r = i.currentTarget.dataset.productid, o = (i.currentTarget.dataset.item, 
            "");
            if (2 == s && (o = "/subPackage/discover/pages/" + (3 == a.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + (r || e)), 
            3 == s) {
                var n = (0, t.classLoop)(e, this.data.classlist);
                wx.navigateTo({
                    url: "/subPackage/index/pages/category-list/category-list?tagType=&iconName=" + n + "&categoryId=" + e
                });
            }
            if (4 == s && (o = "/" + e), 2 == s && r || 4 == s) wx.navigateTo({
                url: o,
                success: function() {
                    console.log(1111);
                },
                fail: function() {
                    console.log(2222);
                }
            }); else if (1 == s) {
                i.currentTarget.dataset.src;
                var c = i.currentTarget.dataset.index, u = this;
                wx.previewImage({
                    current: u.data.sowingList[c].pictureUrl,
                    urls: u.data.imgUrlArry
                });
            }
        },
        compare: function(t) {
            return function(a, i) {
                var s = a[t], e = i[t];
                return isNaN(Number(s)) || isNaN(Number(e)) || (s = Number(s), e = Number(e)), s < e ? -1 : s > e ? 1 : 0;
            };
        },
        updata: function() {
            this.data.sowingList.sort(this.compare("sort")), this.data.imgUrlArry = [];
            for (var t = 0, a = this.data.sowingList.length; t < a; t++) if (this.data.imgUrlArry.push(this.data.sowingList[t].pictureUrl), 
            5 == this.data.sowingList[t].jumpType) {
                var i = this.data.sowingList[t].jumpUrl.split("appPath=");
                this.data.sowingList[t].appid = i[0], this.data.sowingList[t].path = i[1];
            }
            this.setData({
                sowingList: this.data.sowingList
            }), console.log("全新的轮播图-----", this.data.sowingList);
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