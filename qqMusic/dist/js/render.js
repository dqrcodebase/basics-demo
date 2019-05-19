(function ($,root) {

    //渲染播放歌曲的图片、信息
    function getImage(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            root.blurImg(img,$('body'));
            $('.img-box img').attr('src',src)
        }
    }

    function getMessage(data) {
        src = '<div class="song-name">' + data.song + '</div>\
            <div class="singer-name">' + data.singer + '</div >\
                <div class="album-name"> ' + data.album + '</div>';
        $('.message').html(src)
    }

    function getLike(data) {
       if(data) {
           $('.footer .like').addClass('like-solid')
       }else{
           $('.footer .like').removeClass('like-solid')
       }
    }
    root.rander = function(data) {
        getImage(data.image)
        getMessage(data)
        getLike(data.isLike)
    }
})(window.Zepto,window.player || (window.player = {}))