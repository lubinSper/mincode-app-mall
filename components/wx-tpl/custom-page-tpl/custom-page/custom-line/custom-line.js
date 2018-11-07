getApp();

Component({
    behaviors: [],
    properties: {
        line: {
            type: Object,
            value: {
                value: 4,
                marginType: 1
            }
        }
    },
    data: {
        lineMap: {
            1: "solid",
            2: "dashed",
            3: "dotted",
            4: "colorBlock"
        }
    },
    methods: {},
    created: function() {},
    attached: function() {},
    ready: function() {},
    moved: function() {},
    detached: function() {}
});