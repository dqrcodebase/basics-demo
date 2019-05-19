(function ($) {
    var obj = {
        init:function (opt) {
            this.father = opt.father;
            this.type = opt.type;
            this.dataType = opt.dataType;
            this.data = opt.data;
            this.url = opt.url;
            this.sucFn = opt.sucFn;
            this.createDom()
            this.bindEvent()
        },
        createDom:function () {
            var $listBox = $('<div class="list-box"></div>');
            var $searchBox = $('<div class="search-box"> </div>');
            var $itemList = $('<ul class="itemList"></ul>');
            var $inp = $('<input type="text" class="inp">');
            var $sear = $('<input type="button" class="sear" value="搜索">');

            $searchBox.append($inp).append($sear).appendTo($listBox)
            $listBox.append($itemList).appendTo($('.search'))
            $itemList.css({
                width:this.father.width() + 'px'
            })
            $inp.css({
                width:this.father.width() - $sear.width() + 'px'
            })
        },
        bindEvent:function () {
            var self = this;
           $('.inp').on('input',function (){
               var value = $(this).val();
               self.getData(value)
           })
        },
        getData:function (val) {
            var self = this;
            $.ajax({
                type:self.type,
                data: self.data + val,
                dataType :self.dataType,
                url:self.url,
                success:function (data) {
                    self.sucFn(data)
                }
            })
        }
    }

    $.fn.extend({
        search : function (opt) {
            opt.father = this
            obj.init(opt)
        }
    })
})(window.jQuery)