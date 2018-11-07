Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.authorizeDialogFn = void 0;

require("../../../template/show_dialog/show_dialog");

var e = getApp(), o = Behavior({
    behaviors: [],
    data: {
        orgId: "",
        showTipData: {
            show: !1,
            content: "网络连接失败"
        },
        isClose: !1,
        isCallBackHandle: !1
    },
    properties: {
        onShow: {
            type: String,
            value: "",
            observer: function(e, o) {
                e && this.setDataValue(!0);
            }
        },
        onHide: {
            type: String,
            value: "",
            observer: function(e, o) {
                e && this.setDataValue(!1);
            }
        },
        params: {
            type: Object,
            value: "",
            observer: function(e, o) {
                console.log("params : ", e), e && e.isCallBackHandle && this.setData({
                    isCallBackHandle: !0
                });
            }
        }
    },
    methods: {
        onShow: function() {},
        onHide: function() {},
        onUnload: function() {},
        getUserInfo: function(o) {
            if (console.log("getUserInfo() : "), console.log(o), o.detail.userInfo) {
                e.globalData.isCouldAuth = 1;
                var a = e.globalData.userInfo;
                a = Object.assign({}, a, o.detail.userInfo), e.globalData.nickName = o.detail.userInfo.nickName, 
                console.log("tempUserInfo=", a), e.newSaveUserInfo(a), this.closePopup(), this.data.isCallBackHandle && this.triggerEvent("backhandle", {
                    userInfo: o.detail.userInfo
                }, {});
            } else this.closePopup(), this.triggerEvent("backhandle", {
                userInfo: {
                    nickName: "微信用户",
                    avatarUrl: "http://yamxcx.oss-cn-shenzhen.aliyuncs.com/xcx/toux.png"
                }
            }, {}), e.globalData.isCouldAuth = 2;
            e.globalData.showGetUserInfoAlert = !1;
        },
        setDataValue: function(e) {
            this.setData({
                isClose: e
            });
        },
        showPopup: function() {
            this.setData({
                isClose: !0
            });
        },
        closePopup: function() {
            this.setData({
                isClose: !1
            });
        }
    },
    ready: function() {}
});

exports.authorizeDialogFn = o;