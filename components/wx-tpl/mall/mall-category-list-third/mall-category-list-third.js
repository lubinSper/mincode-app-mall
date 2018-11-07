var t = require("../common-js/mall-category-list-1"), e = require("../../../function/moveTab/move-tabs"), a = require("../../../conf/conf"), o = a.Conf.tagTypes, n = a.Conf.tagTypeNames;

Component({
    behaviors: [ t.mallCategorylist1 ],
    properties: {
        isApplyNewLogic: {
            type: Boolean,
            value: !1
        },
        shopList: {
            type: Array
        },
        tabList: {
            type: Object,
            observer: function(t) {
                0 == t.list.length && (t.list.unshift({
                    active: "active",
                    name: "全部"
                }), this.setData({
                    tabList: t
                }));
            }
        },
        showLoading: {
            type: Boolean
        },
        haveData: {
            type: Boolean
        },
        noData: {
            type: Boolean
        },
        loadingFail: {
            type: Boolean
        }
    },
    data: {
        scrollTop: 0,
        tagTypes: o,
        tagTypeNames: n
    },
    methods: {
        onBtnActiveTow: function(t) {
            var a = {
                id: t.currentTarget.dataset.id,
                index: t.currentTarget.dataset.index
            }, o = {};
            this.triggerEvent("btnactivetow", a, o), (0, e.moveTabsY)({
                event: t,
                ele: this
            });
        },
        onClickRetry: function(t) {
            var e = {}, a = {};
            this.triggerEvent("clickretry", e, a);
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