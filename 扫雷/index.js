(function () {
    var piece = document.createElement('ul');
        content = document.getElementById('content'),
        number = document.getElementById('number'),
        begin = document.getElementById('begin'),
        remainder = document.getElementById('remainder'),
        win = document.getElementById('win'),
        over = document.getElementById('over'),
        close = document.getElementById('close'),
        line = 10,
        row = 10,
        mineNum = 10,
        coordinatesArr = [],
        x = 0,
        y = 0,
        num = 0,
        lock = true;

    //开始游戏
    function startGame() {
        content.style.display = 'inline-block';
        remainder.style.display = 'inline-block';
        createMine();
        sign();
    }
    //插入格子并设置地雷
    function createMine() {
        var str = '';
        var len = 10;
        for (var i = 0; i < line; i++) {
            coordinatesArr.push([])
            for (var j = 0; j < row; j++) {
                coordinatesArr[i].push([i, j])
                str += '<li class=grid id=' + i + '-' + j + '></li>'
            }
        }

        piece.innerHTML = str;
        while (len) {
            var index = Math.floor(Math.random() * 100);
            if (!piece.children[index].classList.contains('islei')) {
                piece.children[index].classList.add('islei');
                len--
            }
        }
        content.appendChild(piece);
    }
    //判断是点击左键还是右键
    function sign() {     
        content.oncontextmenu = function () {
            return false
        };
        piece.addEventListener('mousedown', function (e) {
            var event = e || window.event;
            var target = event.target || event.srcElement;
            if (e.button == 2) {                           
                rightClick(target)
            } else if (e.button == 0) {
                if (!target.classList.contains('hongqi')) {
                    troubleshoot(target)
                }
            }
        })
    }

    //右键点击时放置旗子，并判断是否赢
    function rightClick(target) {
        var lock = true
        var hongqi = document.getElementsByClassName('hongqi');
        var dilei = document.getElementsByClassName('islei')
        if (!target.classList.contains('active') && !target.classList.contains('hongqi')) {
            target.classList.add('hongqi')
            console.log(target.classList.contains('hongqi'))
            if (hongqi.length == 10) {
                for (var i = 0; i < dilei.length; i++) {
                    if (hongqi[i] != dilei[i]) {
                        lock = false;
                    }
                    if (lock) {
                        win.style.display = 'inline-block'
                    }
                }
            }
        } else {
            console.log('else')
            target.classList.remove('hongqi');
        }
    }
    //重新开始
       
    //判断是否是地雷
    function troubleshoot(dom) {
        var coordinates = dom.getAttribute('id').split('-');
        var islei = document.getElementsByClassName('islei');
        var len = islei.length
        var x = parseInt(coordinates[0]);
        var y = parseInt(coordinates[1])
        if (dom.classList.contains('islei')) {
            for (var i = 0; i < len; i++) {
                islei[i].style.backgroundImage = 'url("./img/dilei.jpg")'
            }
        } else {
            recursion(dom, x, y)
        }
    }
    //判断周围是否有雷
    function recursion(dom, x, y) {
        num = 0;
        for (var i = x - 1; i <= x + 1; i++) {
            for (var j = y - 1; j <= y + 1; j++) {
                var nearBox = document.getElementById(i + '-' + j);
                if (nearBox && nearBox.classList.contains('islei')) {
                    num++
                }
            }
        }
        dom.classList.add('active');
        dom.innerText = num;
        if (num === 0) {
            for (var i = x - 1; i <= x + 1; i++) {
                for (var j = y - 1; j <= y + 1; j++) {
                    dom.classList.add('active');
                    var li = document.getElementById(i + '-' + j)
                    if (li && !li.classList.contains('hongqi')) {
                        if (!li.classList.contains('check')) {
                            li.classList.add('check');
                            recursion(li, i, j);
                        }
                    }
                }
            }
        }
    }
    begin.onclick = function () {
        if(lock) {
            startGame();
            lock = false
        }else{
            createMine();
        }    
    }
    close.onclick = function () {
        win.style.display = 'none';
        createMine();
    }
})()
