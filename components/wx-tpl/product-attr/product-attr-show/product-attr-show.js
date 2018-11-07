var t = require("../common-js/product-attr-show");

Component({
    behaviors: [ t.productAttrShow ],
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
    created: function() {},
    attached: function() {},
    ready: function() {},
    moved: function() {},
    detached: function() {}
});