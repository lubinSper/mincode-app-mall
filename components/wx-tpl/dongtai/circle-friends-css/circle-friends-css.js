var o = require("../common-js/dongtai");

Component({
    behaviors: [ o.DongTaiJs ],
    options: {},
    data: {},
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
            type: String,
            value: {}
        },
        purchaseCopy: {
            type: String,
            value: {}
        }
    },
    methods: {},
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