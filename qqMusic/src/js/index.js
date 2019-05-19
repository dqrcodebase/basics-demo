
var root = window.player,
    audio = new root.audio(),
    renderingTime = root.renderingTime,
    list = root.list,
    contro,
    indexData,
    pre = 0,
    pro = 0,
    index = 0;

function bindEvent(data) {

    //播放、暂停
    $('.play').on('click', function () {
        if (audio.status == 'play') {
            renderingTime.nowTime(data[index], audio.status);//播放的时间
            audio.playSong();
        } else if (audio.status == 'pause') {
            renderingTime.stop()
            audio.pauseSong();
        }
        $(this).toggleClass('pause');
    })
    //上一首
    $('.prev').on('click', function () {
        index = contro.prev(index);
        $('body').trigger('play:change', index);
    })
    //下一首
    $('.next').on('click', function () {
        index = contro.next(index);
        $('body').trigger('play:change', index);
    })
    $('body').on('play:change', function (event, index) {
        pre = 0;
        root.rander(data[index]);
        audio.getAudio(data[index].audio);
        list.playIndex();
        renderingTime.allTime(data[index].duration);
        renderingTime.upTime(pre, data[index].duration)
        if (audio.status == 'pause') {  //上一首歌为播放状态时，则下一首歌也为播放
            audio.playSong();
            renderingTime.nowTime(data[index], status, pre)  //将播放时间归零

        }
    })

    $('.list').on('click', function () {
        $('.list-box').addClass('show');
        return false;
    })
}

//进度条
function bindTouch(data) {
    var $slider = $('.slider-point'),
        $bar = $('.pro-bottom').offset(),
        $proTop = $('.pro-top'),
        left = $bar.left,
        width = $bar.width,
        time;
    $slider.on('touchstart', function (e) {
        renderingTime.stop()
    }).on('touchmove', function (e) {
         //计算拖拽的百分比 更新当前时间和进度条
        pre = (e.targetTouches[0].pageX - left) / width //鼠标拖动位置与进度条总长度所占比例
        pro = Math.floor((pre - 1) * 100)
        if (pre > 1 || pre < 0) {
            pre = 0;
        }
            renderingTime.upTime(pre, data[index].duration)
    }).on('touchend', function (e) {
 
        time = pre * data[index].duration;
        $('.play').addClass('pause')
        audio.playTo(time);
        renderingTime.nowTime(data[index], audio.status, pre);
        audio.status = 'pause'
    })
}

function getData(url) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            indexData = data;
            bindEvent(data);
            bindTouch(data)
            list.createList(data);
            $('body').trigger('play:change', index);
            contro = new root.contro(data.length, index);

        },
        error: function () {
            console.log('error');
        }
    })
}
getData('../mock/data.json')