(function ($,root){

    function AudioContro(len) {
        this.len = len;
    }
    AudioContro.prototype = {
        prev : function (index) {
            return this.getIndex(-1,index)
        },
        next: function (index) {
            return this.getIndex(1,index)
        },
        getIndex : function (num,index) {
            var nowIndex = (index + num + this.len) % this.len;
            return nowIndex
        }
    }
    root.contro = AudioContro
})(window.Zepto,window.player || (window.player = {}))