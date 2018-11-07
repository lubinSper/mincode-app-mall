var t = getApp();

Component({
    behaviors: [],
    properties: {
        form: {
            type: Array,
            value: [ {
                field: "姓名",
                fieldValue: "哈哈",
                title: "请填写姓名"
            }, {
                field: "电话",
                fieldValue: "",
                title: "请填写联系电话"
            }, {
                field: "行业",
                fieldValue: "",
                title: "填写你的行业"
            }, {
                field: "备注",
                fieldValue: "",
                title: "请填写备注"
            } ],
            observer: function(t, a) {
                this.checkData();
            }
        },
        pageId: {
            type: Number,
            value: 3
        }
    },
    data: {
        invalid: !0,
        numStyleMap: {
            2: "two",
            3: "three",
            4: "four",
            5: "five"
        },
        numStyle: 2
    },
    methods: {
        checkData: function() {
            for (var t = 0, a = this.data.form.length; t < a; t++) this.data.form[t].field ? this.data.form[t].field.length > this.data.numStyle && (this.data.numStyle = this.data.form[t].field.length) : this.data.form.splice(t, 1);
            this.setData({
                form: this.data.form,
                numStyle: this.data.numStyle
            });
        },
        formInput: function(t) {
            var a = parseInt(t.currentTarget.dataset.type), e = t.detail.value;
            return "行业" != this.data.form[a].field && this.data.form[a].field, this.data.form[a].fieldValue = e, 
            console.log(e.length), this.setData({
                form: this.data.form
            }), console.log("dddddd", this.data.form), e;
        },
        dataBridge: function() {
            for (var t = {}, a = [ [ "fieldFirst", "fieldFirstValue" ], [ "fieldSecond", "fieldSecondValue" ], [ "fieldThird", "fieldThirdValue" ], [ "fieldFourth", "fieldFourthValue" ] ], e = 0, o = this.data.form.length; e < o; e++) t[a[e][0]] = this.data.form[e].field, 
            t[a[e][1]] = this.data.form[e].fieldValue;
            return t;
        },
        submitApply: function() {
            for (var a = this, e = !1, o = 0, i = this.data.form.length; o < i; o++) this.data.form[o].fieldValue && (e = !0);
            e ? 2 != a.data.oneClick && (a.setData({
                oneClick: 2,
                btnLoading: !0
            }), t.getNewOpenId(function(e) {
                var o = a.dataBridge();
                o.openId = e, o.customPageId = a.data.pageId, o.orgId = t.globalData.orgId, console.log("params=", o), 
                a.postFormData(o);
            })) : wx.showToast({
                title: "请填写表单内容后再提交",
                icon: "none",
                duration: 2e3
            });
        },
        postFormData: function(a) {
            var e = this;
            wx.request({
                url: t.globalData.shopMHost + "/customPage/integrationResult/updateForm",
                method: "post",
                data: a,
                header: {
                    "content-type": "application/json"
                },
                complete: function() {
                    e.setData({
                        oneClick: 1,
                        btnLoading: !1
                    });
                },
                success: function(t) {
                    t.data.code && "000000" == t.data.code ? (wx.showToast({
                        icon: "success",
                        title: "提交成功"
                    }), e.formReset()) : wx.showToast({
                        icon: "none",
                        title: "提交失败"
                    });
                },
                fail: function(t) {
                    e.data.showTipData.show = !0, e.data.showTipData.content = "网络连接失败", e.setData(e.data), 
                    ShowDialog(e);
                }
            });
        },
        formReset: function() {
            for (var t = 0, a = this.data.form.length; t < a; t++) this.data.form[t].fieldValue = "";
            this.setData({
                form: this.data.form
            });
        }
    },
    created: function() {},
    attached: function() {
        this.checkData();
    },
    ready: function() {},
    moved: function() {},
    detached: function() {}
});