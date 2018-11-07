var t = require("../../common-js/classLoop"), a = getApp();

Component({
    behaviors: [],
    properties: {
        navList: {
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
        iconMap: {
            2: "equal",
            1: "width",
            3: "height"
        },
        numClass: {
            1: "one",
            2: "two",
            3: "three",
            4: "four",
            5: "five"
        }
    },
    methods: {
        clickButton: function(e) {
            var s = e.currentTarget.dataset.jumptype, i = e.currentTarget.dataset.jumpurl, o = e.currentTarget.dataset.productid, n = (e.currentTarget.dataset.item, 
            "");
            if (2 == s && (n = "/subPackage/discover/pages/" + (3 == a.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + (o || i)), 
            3 == s) {
                var r = (0, t.classLoop)(i, this.data.classlist);
                wx.navigateTo({
                    url: "/subPackage/index/pages/category-list/category-list?tagType=&iconName=" + r + "&categoryId=" + i
                });
            }
            4 == s && (n = "/" + i), (2 == s && o || 4 == s) && wx.navigateTo({
                url: n,
                success: function() {
                    console.log(1111);
                },
                fail: function() {
                    console.log(2222);
                }
            });
        },
        updata: function() {
            for (var t = 0, a = this.data.navList.length; t < a; t++) if (5 == this.data.navList[t].jumpType) {
                var e = this.data.navList[t].jumpUrl.split("appPath=");
                this.data.navList[t].appid = e[0], this.data.navList[t].path = e[1];
            }
            this.setData({
                navList: this.data.navList
            });
        }
    },
    created: function() {},
    attached: function() {},
    ready: function() {},
    moved: function() {},
    detached: function() {}
});