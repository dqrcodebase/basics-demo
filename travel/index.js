var timer = null;
var $len = $('.slide li').eq(0).width();
var $inp = $('.search .inp')


var obj = {
    init:function(){
        this.areaList();
        this.search();
        this.slider();
    },
    areaList:function () {
        $('#location').areaList({
            items: [{
                name: '北京',
                href: '#',
            }, {
                name: '上海',
                href: '#',
            }, {
                name: '黑龙江',
                href: '#',
            }, {
                name: '天津',
                href: '#'
            }, {
                name: '重庆',
                href: '#',
            }, {
                name: '河北',
                href: '#'
            }, {
                name: '内蒙古',
                href: '#',
            }, {
                name: '西藏',
                href: '#',
            }, {
                name: '福建',
                href: '#',
            }, {
                name: '浙江',
                href: '#'
            }, {
                name: '江苏',
                href: '#',
            }, {
                name: '陕西',
                href: '#'
            }, {
                name: '山西',
                href: '#',
            }, {
                name: '江西',
                href: '#',
            }, {
                name: '青海',
                href: '#',
            }, {
                name: '广西',
                href: '#'
            }, {
                name: '广州',
                href: '#',
            }, {
                name: '云南',
                href: '#'
            }, {
                name: '湖北',
                href: '#',
            }, {
                name: '湖南',
                href: '#',
            }, {
                name: '辽宁',
                href: '#',
            }, {
                name: '吉林',
                href: '#'
            }, {
                name: '四川',
                href: '#',
            }, {
                name: '贵州',
                href: '#'
            }, {
                name: '安徽',
                href: '#'
            }],
            // 每一行显示城市数量
            rowNum: 5,
            // 默认显示值
            nowItem: '北京',
            // 显示图片  图标
            nowItemImg: './img/location.png'
        });
    },
    search:function () {
        var self = this;
        $('.search').search({
            type: 'GET',
            url: 'https://sgt.package.qunar.com/suggest/query',
            data: 'code=',
            count: '&count=7',
            dataType: 'jsonp',
            sucFn: self.addItem,
        })
    },
    addItem:function (data) {
        var arr = data.result;
        var str = '';
        arr.forEach(function (ele, index) {
            str += ' <li class="item"><a href=""><span class="key">' + ele.key + '</span><span>' + ele.display + '</span></a></li>'
        })
        $('.search .itemList').html(str)
    },
    slider: function () {
        $('#swiper').sliderImg({
            image: ['./img/1.jpg', './img/2.jpg', './img/3.jpg', './img/banner1.jpg']
        })
        console.log($('#swiper'))
    },
}
obj.init()


    






