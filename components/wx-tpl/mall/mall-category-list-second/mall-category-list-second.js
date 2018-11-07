var e = require("../common-js/mall-category-list-1"), t = require("../../../conf/conf").Conf.tagTypes;

Component({
    behaviors: [ e.mallCategorylist1 ],
    options: {},
    data: {
        tagTypes: t
    },
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
        templateId: {
            type: Number
        },
        isApplyNewLogic: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        onJumpToNextShare: function(e) {
            var t = {
                id: e.currentTarget.dataset.id
            }, o = {};
            this.triggerEvent("jumptonextshare", t, o);
        },
        onPraise: function(e) {
            var t = {
                goodsId: e.currentTarget.dataset.id,
                likeid: e.currentTarget.dataset.likeid,
                index: e.currentTarget.dataset.index,
                likeStatus: e.currentTarget.dataset.likestatus
            }, o = {};
            this.triggerEvent("praise", t, o);
        },
        goSearch: function() {
            this.triggerEvent("goSearchPage");
        }
    },
    created: function() {
        console.log("组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData");
    },
    attached: function() {
        console.log("组件生命周期函数，在组件实例进入页面节点树时执行");
    },
    ready: function() {
        console.log("组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息");
    },
    moved: function() {
        console.log("组件生命周期函数，在组件实例被移动到节点树另一个位置时执行");
    },
    detached: function() {
        console.log("组件生命周期函数，在组件实例被从页面节点树移除时执行");
    }
});