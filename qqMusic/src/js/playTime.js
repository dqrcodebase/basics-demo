
(function ($,root) {
    var duration = 0,
        listTime,
        newTime,
        lastpre=0,
        timer = null; 
    function nowTime(data,status,pre) {    
        listTime = new Date().getTime();  
        lastpre = pre == undefined ? lastpre : pre;
        function frame() {
            cancelAnimationFrame(timer) 
            newTime = new Date().getTime();           
            duration = data.duration;     
            lastpre = lastpre + (newTime - listTime) / (duration * 1000);        
            if (lastpre > 1 ) {
                cancelAnimationFrame(timer);
                $('.next').trigger('click')            
            }else{ 
                upTime(lastpre, duration);
                timer = requestAnimationFrame(frame);
            }           
        }
       frame()
    }
    //控制播放时间和进度条
    function upTime(pre, duration) {   
        var playTime = pre * duration;
        playTime = formatTime(playTime);
        $('.play-time').text(playTime);
        pro = ((pre - 1) * 100)
        $('.pro-top').css({
            transform: 
            'translateX(' + pro + '%)'
        })
        listTime = newTime;  
    }
     //把秒转换成分和秒
    function formatTime(duration) {
        duration = Math.round(duration);
        var min = Math.floor(duration/ 60);
        var sec = duration- min * 60;
        if(min < 10) {
            min = '0' + min;
        }
        if(sec < 10) {
            sec = '0' + sec;

        }
        return min + ':' + sec;
    }
    //获取歌曲总时间
    function allTime(duration) {
        $('.all-time').text(formatTime(duration));
    }
    //暂停渲染并获取暂停时的时间
    function stop() {
        var stopTime = new Date().getTime();
        listTime = listTime + (stopTime - listTime) / (duration * 1000);
        cancelAnimationFrame(timer);
    }
    root.renderingTime = {
        nowTime : nowTime,
        allTime : allTime,
        upTime : upTime,
        stop: stop
    }
})(window.Zepto,window.player ||(window.player = {}))