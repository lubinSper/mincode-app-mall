getApp();

Component({
    data: {
        password: ""
    },
    properties: {
        isShowPayInput: {
            type: Boolean,
            value: !1,
            observer: function(t, e) {}
        },
        focus: {
            type: Boolean,
            value: !1,
            observer: function(t, e) {}
        }
    },
    methods: {
        getBoardHeight: function(t) {
            this.setData({
                translateY: t.detail.height
            });
        },
        emptyBoardHeight: function() {
            this.setData({
                translateY: wx.getSystemInfoSync().windowHeight
            }), this.closeDialog();
        },
        setPayPass: function(t) {
            var e = this;
            this.setData({
                password: t.detail.value
            }, function() {
                e.data.password.length >= 6 && e.sendPayPassSubmit();
            });
        },
        sendPayPassSubmit: function() {
            var t = this.data.password, e = this;
            this.triggerEvent("inputComplete", {
                pwd: t
            }), setTimeout(function() {
                e.setData({
                    isShowPayInput: !1,
                    focus: !1,
                    password: ""
                });
            }, 0);
        },
        forgetPass: function() {
            wx.navigateTo({
                url: "/subPackage/my/pages/vip_security_center/vip_security_center?forget=1"
            });
        },
        closeDialog: function() {
            this.triggerEvent("closeDialog");
        },
        setFocus: function() {
            this.setData({
                focus: !0
            });
        }
    }
});