var t = require("../common-js/custom-page-fn");

Component({
    behaviors: [ t.customPageFn ],
    properties: {},
    data: {
        thisIndexes: 99
    },
    methods: {
        stopOther: function(t) {
            console.log(t.detail), this.setData({
                thisIndexes: t.detail
            });
        }
    },
    created: function() {},
    attached: function() {},
    ready: function() {},
    moved: function() {},
    detached: function() {}
});