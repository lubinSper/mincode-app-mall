var r = require("../common-js/copyright-fn.js");

Component({
    behaviors: [ r.copyrightFn ],
    properties: {},
    data: {
        content: {}
    },
    methods: {
        wantProgram: function() {
            wx.navigateTo({
                url: "/subPackage/my/pages/business_make_program/business_mack_program"
            });
        }
    }
});