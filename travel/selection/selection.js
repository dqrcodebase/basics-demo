(function ($) {
    var obj = {
        init : function (opt) {
            this.opt = opt;
            this.parent = opt.parent;
            this.items = this.opt.items;
            this.nowItemImg = this.opt.nowItemImg
            this.nowItem = this.opt.nowItem;
            this.rowNum = this.opt.rowNum;
            this.createDom();
            this.bindEvent();
        },
        createDom: function () {
            var $area = $('<div class="areaContent"> </div>')
            var $orientation = $('<div class="orientation"> </div>')
            var $itemList = $('<ul class="itemList"></ul>')
            var $itemName = $('<span class="item-name"> </span>')
            if(this.nowItemImg) {
                var img = new Image();
                img.src = this.nowItemImg;
                img.onload = function () {
                    $(img).prependTo($orientation)
                }
            }
            var str = ''
            this.items.forEach(function (ele,index) {
                str += '<li class="item"><a href="' + ele.href +'" >' + ele.name + '</a></li>'    
            })
            $itemName.text(this.nowItem).appendTo($orientation)
            $itemList.html(str)
            $orientation.appendTo($area)
            $area.append($itemList).prependTo($('.location'))
            $itemList.css({
                width: this.rowNum * $(".item").innerWidth() + 'px',
                top: this.parent.height() +'px'
            })
        },
        bindEvent: function () {
            $('.itemList').on('click','.item',function () {            
                $('.item').removeClass('active');
                $(this).addClass('active');
                $('span.item-name').text($(this).text())
            })
        }
    }

    $.fn.extend({
        areaList : function (opt) {
            opt.parent = this;
            obj.init(opt)
        }
    })
})(window.jQuery)