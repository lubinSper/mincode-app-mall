var e = require("../../../../../components/function/showTime/showTime"), a = require("../../../../../components/function/base64/base64");

Page({
    data: {
        date: "",
        time: "",
        date2: (0, e.ShowTime)(Date.parse(new Date()), "Y-M-D", "-"),
        time2: (0, e.ShowTime)(Date.parse(new Date()), "hh:mm", "-"),
        selectSuc: 0
    },
    onLoad: function(t) {
        var i = this;
        if (t) {
            if (t.newDateTime && "请选择" != t.newDateTime) {
                m = t.newDateTime.split(" ");
                i.data.date = m[0], i.data.time = m[1];
            } else if (t.dateTime.trim()) {
                var m = (0, a.Base64Decode)(t.dateTime).split(" ");
                i.data.date = m[0], i.data.time = m[1];
            }
        } else {
            var d = new Date().getTime();
            i.data.date2 = (0, e.ShowTime)(d, "Y-M-D", "-"), i.data.time2 = (0, e.ShowTime)(d, "hh:mm");
        }
        i.setData(i.data);
    },
    bindDateChange: function(e) {
        var a = this;
        a.data.date = e.detail.value, a.setData(a.data);
    },
    bindTimeChange: function(a) {
        var t = this, i = Date.parse(new Date());
        t.data.date2 = (0, e.ShowTime)(i, "Y-M-D", "-"), t.data.time2 = (0, e.ShowTime)(i, "hh:mm"), 
        t.data.time = a.detail.value, t.setData(t.data);
    },
    saveChangeTimes: function() {
        var e = this, t = e.data.date, i = e.data.time, m = getCurrentPages();
        m[m.length - 2].setData({
            dateTime: t + " " + i,
            base64DateTime: (0, a.Base64Encode)(t + " " + i)
        }), wx.navigateBack();
    }
});