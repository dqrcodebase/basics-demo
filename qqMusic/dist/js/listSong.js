(function ($, root) {

    var $playList = $("<div class = 'list-box'>" +
        "<div class='play-list'>播放列表</div>" +
        "<ul class = 'list-song'></ul>" +
        "<div class='close'>关闭</div>" +
        "</div>")
    //渲染播放列表dom
    function createList(data) {
        var str = '';
        var len = data.length;
        for (var i = 0; i < len; i++) {
            str += '<li class="song-name"><span>' + data[i].song + '</span><span>-</span><span>' + data[i].singer + '</span></li>';
        }
        $playList.appendTo($('.btn.list')).find('.list-song').html(str);
        playIndex();
        closeList()
        playList()
    }
    //将当前播放的歌曲添加class类名
    function playIndex() {
        $('.song-name').removeClass('active')
        $('.song-name').eq(index + 1).addClass('active')
    }
    //在播放列表中选择播放的歌曲
    function playList() { 
        $('.song-name').on('click', function (e) {
            index = $(this).index()
            audio.status = 'pause'
            playIndex(index)
            $('.play').removeClass('pause')
            $('.play').addClass('pause')
            $('body').trigger('play:change', index)
            return false
        })
    }

    //关闭播放列表
    function closeList() {
        $playList.on("click", ".close", function () {
            $('.list-box').removeClass('show')
            return false
        })
    }

    root.list = {
        createList: createList,
        playIndex: playIndex
    }
}) (window.Zepto, window.player || (window.player = {}))