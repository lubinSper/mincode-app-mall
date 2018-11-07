var t = require("../../common-js/classLoop"), o = getApp();

Component({
    behaviors: [],
    properties: {
        button: {
            type: Object,
            value: {
                buttonColor: 1,
                buttonStyle: 2,
                buttonWords: "大按钮",
                jumpType: 6,
                jumpUrl: "/page/index"
            },
            observer: function(t, o) {
                this.updata();
            }
        },
        classlist: {
            type: Array,
            value: [],
            observer: function(t, o) {
                console.log("分类列表触发更新-----------", t, o);
            }
        }
    },
    data: {
        buttonStyle: "background:#ff7800",
        colorMap: {
            0: "#222222",
            1: "#ed2308",
            2: "#ff7800",
            3: "#09bb07",
            4: "#638ee9"
        },
        appId: "",
        path: ""
    },
    methods: {
        clickButton: function(a) {
            console.log(this.data.button);
            var n = this.data.button.jumpType, e = this.data.button.jumpUrl, u = (this.data.button, 
            "");
            if (2 == n && (u = "/subPackage/discover/pages/" + (3 == o.globalData.xcxType ? "goods_detail_new" : "goods_detail") + "/goods_detail?id=" + (this.data.button.productId || e)), 
            3 == n) {
                var s = (0, t.classLoop)(e, this.data.classlist);
                wx.navigateTo({
                    url: "/subPackage/index/pages/category-list/category-list?tagType=&iconName=" + s + "&categoryId=" + e
                });
            }
            4 == n && (u = "/" + e), 2 == n && this.data.button.productId || 4 == n ? wx.navigateTo({
                url: u,
                success: function() {
                    console.log(1111);
                },
                fail: function() {
                    console.log(2222);
                }
            }) : 7 == n && wx.makePhoneCall({
                phoneNumber: e
            });
        },
        updata: function() {
            if (1 == this.data.button.buttonStyle ? this.setData({
                buttonStyle: "background: " + (this.data.colorMap[this.data.button.buttonColor] || this.data.button.buttonColor)
            }) : 2 == this.data.button.buttonStyle && this.setData({
                buttonStyle: "background: #ffffff;border: 2rpx solid " + (this.data.colorMap[this.data.button.buttonColor] || this.data.button.buttonColor) + ";color: " + (this.data.colorMap[this.data.button.buttonColor] || this.data.button.buttonColor) + ";"
            }), 5 == this.data.button.jumpType) {
                var t = this.data.button.jumpUrl.split("appPath=");
                this.setData({
                    openId: t[0],
                    path: t[1]
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