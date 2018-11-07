require("../../../../components/template/show_dialog/show_dialog");

var e = getApp();

Page({
    data: {
        refresh: !0,
        showReturnIndexBtn: !1
    },
    onLoad: function(e) {
        setTimeout(function() {
            e.iconName && wx.setNavigationBarTitle({
                title: e.iconName
            });
        }, 1e3), wx.showLoading({
            title: "加载中"
        }), e.action && "goHome" == e.action ? this.setData({
            showReturnIndexBtn: !0
        }) : this.setData({
            showReturnIndexBtn: !1
        });
    },
    setParentData: function(e) {
        this.setData({
            orgName: e.detail.orgName
        });
    },
    onShow: function() {
        e.setMyCountDot();
    },
    onShareAppMessage: function() {
        var t = this, a = getCurrentPages(), o = e.isHasTabByTitle({
            url: a[a.length - 1].route
        });
        console.log("tempJson=", o);
        var n = "/subPackage/my/pages/link_us/link_us?action=goHome&orgId=" + e.globalData.orgId + "&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id);
        return o.check && (n = "/subPackage/my/pages/link_us/link_us?orgId=" + e.globalData.orgId + "&memberId=" + (wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id)), 
        console.log("tempShareUrl=", n), {
            title: e.globalData.nickName + "给你推荐了「" + t.data.orgName + "」",
            path: n,
            imageUrl: t.data.img
        };
    },
    seeBigPic: function(e) {
        var t = e.currentTarget.dataset.src, a = this;
        console.log(t), wx.previewImage({
            current: t,
            urls: a.data.orgOnlyImages
        });
    }
});