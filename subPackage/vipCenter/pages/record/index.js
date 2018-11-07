var t = getApp();

Page({
    data: {
        isShowSelectDialog: !1,
        selectValue: 4,
        targetDate: new Date("2018-07-01").setHours(0, 0, 0, 0),
        curDate: +new Date(),
        startDate: 0,
        endDate: 0,
        isLoaded: !1,
        isEnd: !1,
        selectList: [ {
            name: "全部",
            startDate: 0,
            endDate: 0
        }, {
            name: "近30天",
            startDate: new Date().setHours(0, 0, 0, 0) - 2592e6,
            endDate: new Date().setHours(0, 0, 0, 0)
        }, {
            name: "近7天",
            startDate: new Date().setHours(0, 0, 0, 0) - 6048e5,
            endDate: new Date().setHours(0, 0, 0, 0)
        }, {
            name: "昨天",
            startDate: new Date().setHours(0, 0, 0, 0) - 864e5,
            endDate: new Date(new Date().setHours(0, 0, 0, 0) - 864e5).setHours(23, 59, 59, 59)
        } ],
        curIndex: 1
    },
    onLoad: function(t) {
        this.renderSelectList();
    },
    diffMonth: function() {
        var t = new Date(this.data.curDate).getFullYear() - new Date(this.data.targetDate).getFullYear();
        console.log(t);
        var e = "";
        return t && (e = new Date(this.data.curDate).getMonth()), t && (e += 12 * (t - 1) + 11 - new Date(this.data.targetDate).getMonth()), 
        t || (e += new Date(this.data.curDate).getMonth() - new Date(this.data.targetDate).getMonth()), 
        e;
    },
    renderSelectList: function() {
        var t = this, e = this.diffMonth(), a = this.getMonthList(e);
        this.data.selectList = this.data.selectList.concat(a), this.setData({
            selectList: this.data.selectList
        }, function() {
            t.setData({
                startDate: t.data.selectList[t.data.selectValue].startDate,
                endDate: t.data.selectList[t.data.selectValue].endDate
            }, function() {
                t.getRecordSumQuery(), t.getRecordList();
            });
        });
    },
    getMonthList: function(t) {
        var e = new Date(), a = [];
        a.push({
            name: e.getFullYear() + "年" + (e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) + "月",
            startDate: new Date(e.getFullYear() + "-" + (e.getMonth() + 1) + "-01").setHours(0, 0, 0, 0),
            endDate: new Date(e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + this.getLastDay(e.getFullYear(), e.getMonth() + 1)).setHours(23, 59, 59, 59)
        });
        for (var s = 0; s < t; s++) {
            e.setMonth(e.getMonth() - 1);
            var n = e.getMonth() + 1;
            n = n < 10 ? "0" + n : n, a.push({
                name: e.getFullYear() + "年" + n + "月",
                startDate: new Date(e.getFullYear() + "-" + n + "-01").setHours(0, 0, 0, 0),
                endDate: new Date(e.getFullYear() + "-" + n + "-" + this.getLastDay(e.getFullYear(), e.getMonth() + 1)).setHours(23, 59, 59, 59)
            });
        }
        return a;
    },
    getRecordList: function() {
        var e = this, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data.curIndex;
        return this.setData({
            isLoaded: !1
        }), new Promise(function(s, n) {
            t.ajaxSubmit({
                url: t.globalData.shopMHost + "xcx/member/recordQuery",
                method: "post",
                header: {
                    sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
                },
                data: {
                    memberId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id,
                    startDate: e.data.startDate,
                    endDate: e.data.endDate,
                    pageSize: 10,
                    pageIndex: a
                },
                isHideLoading: 1 !== a
            }).then(function(s) {
                1 == a && wx.hideLoading(), "100001" != s.data.code ? "000000" === s.data.code && (s.data.data.length || e.setData({
                    isEnd: !0
                }), e.setData({
                    recordList: 1 == a ? s.data.data : e.data.recordList.concat(s.data.data),
                    isLoaded: !0
                })) : t.loginInOtherPlaceAlert(s, function() {
                    jsons.repeatLogin && jsons.repeatLogin();
                });
            });
        });
    },
    getRecordSumQuery: function() {
        var e = this;
        t.ajaxSubmit({
            url: t.globalData.shopMHost + "xcx/member/recordSumQuery",
            method: "post",
            header: {
                sessionId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").sessionId
            },
            data: {
                memberId: wx.getStorageSync("memberCardInfo") && wx.getStorageSync("memberCardInfo").id,
                startDate: this.data.startDate,
                endDate: this.data.endDate
            },
            isHideLoading: !0
        }).then(function(a) {
            if ("100001" == a.data.code) t.loginInOtherPlaceAlert(a, function() {
                jsons.repeatLogin && jsons.repeatLogin();
            }); else if ("000000" !== a.data.code) return void wx.showToast({
                title: a.data.msg,
                icon: "none"
            });
            e.setData({
                recordSum: a.data.data
            });
        });
    },
    showSelectDialog: function() {
        this.setData({
            isShowSelectDialog: !0
        });
    },
    closeSelectDialog: function() {
        this.setData({
            isShowSelectDialog: !1
        });
    },
    changeSelectValue: function(t) {
        var e = this;
        this.setData({
            selectValue: t.detail.value,
            startDate: this.data.selectList[t.detail.value].startDate,
            endDate: this.data.selectList[t.detail.value].endDate,
            recordList: [],
            isEnd: !1,
            curIndex: 1
        }, function() {
            e.getRecordSumQuery(), e.getRecordList();
        });
    },
    getLastDay: function(t, e) {
        var a = t, s = e++;
        e > 12 && (s -= 12, a++);
        var n = new Date(a, s, 1);
        return new Date(n.getTime() - 864e5).getDate();
    },
    onReachBottom: function() {
        !this.data.isEnd && this.data.isLoaded && (this.setData({
            isLoaded: !1,
            curIndex: this.data.curIndex + 1
        }), this.getRecordList(this.data.curIndex));
    }
});