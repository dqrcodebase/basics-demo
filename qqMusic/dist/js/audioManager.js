(function ($,root) {
    function AudioManager() {
        this.audio = new Audio();
        this.status = 'play';
    }
    //绑定监听歌曲是否播放完成事件
    AudioManager.prototype = {
        getAudio : function (src){
            this.audio.src = src;
        },
        playSong : function () {
            this.audio.play();
            this.status = 'pause'
        },
        pauseSong : function () {
            this.audio.pause();
            this.status = 'play'
        },
        playTo :function (time) {
            this.audio.currentTime = time;
            this.audio.play()
        }
    }

    root.audio = AudioManager;
})(window.Zepto,window.player || (window.player = {}))