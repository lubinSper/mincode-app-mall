Component({
    properties: {
        showVipCardPrivilege: {
            type: Boolean
        }
    },
    data: {},
    methods: {
        goAddMoney: function() {
            this.triggerEvent("goRecharge", {});
        },
        closeLayer: function() {
            this.triggerEvent("closePrivilege", {});
        }
    }
});