var t = require("../common-js/mall-category-list-1"), e = require("../../../function/moveTab/move-tabs");

Component({
    behaviors: [ t.mallCategorylist1 ],
    properties: {
        shopList: {
            type: Array
        },
        tabList: {
            type: Object
        },
        haveData: {
            type: Boolean
        },
        scrollLeft: {
            type: Number
        },
        appointmentCopy: {
            type: String
        },
        appointmentZeroCopy: {
            type: String
        },
        purchaseCopy: {
            type: String,
            value: {}
        },
        isApplyNewLogic: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        scrollTop: 0
    },
    methods: {
        onBtnActiveTow: function(t) {
            var o = {
                id: t.currentTarget.dataset.id,
                index: t.currentTarget.dataset.index
            }, n = {};
            this.triggerEvent("btnactivetow", o, n), (0, e.moveTabsY)({
                event: t,
                ele: this
            });
        },
        onClickRetry: function(t) {
            var e = {}, o = {};
            this.triggerEvent("clickretry", e, o);
        },
        goSearch: function() {
            this.triggerEvent("goSearchPage");
        }
    },
    created: function() {},
    attached: function() {},
    ready: function() {},
    moved: function() {},
    detached: function() {}
});