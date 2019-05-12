(function () {
    var obj = {
        init: function () {
            this.piece = document.createElement('ul');
            this.content = document.getElementById('content');
            this.number = document.getElementById('number');
            this.begin = document.getElementById('begin');
            this.remainder = document.getElementById('remainder');
            this.win = document.getElementById('win');
            this.over = document.getElementById('over');
            this.close = document.getElementById('close');
            this.line = 10;
            this.row = 10;
            this.mineNum = 10;
            this.coordinatesArr = [];
            this.x = 0;
            this.y = 0;
            this.num = 0;
            this.startGame();
            this.createMine();
            this.sign();
            this.restart()
        },
        //开始游戏
        startGame: function () {
            var self = this;
            this.begin.onclick = function () {
                self.content.style.display = 'inline-block';
                self.remainder.style.display = 'inline-block'
            }
        },
        //插入格子并设置地雷
        createMine: function () {
            var str = '';
            var len = 10;
            for (var i = 0; i < this.line; i++) {
                this.coordinatesArr.push([])
                for (var j = 0; j < this.row; j++) {
                    this.coordinatesArr[i].push([i, j])
                    str += '<li class=grid id=' + i + '-' + j + '></li>'
                }
            }

            this.piece.innerHTML = str;
            while (len) {
                var index = Math.floor(Math.random() * 100);
                if (!this.piece.children[index].classList.contains('islei')) {
                    this.piece.children[index].classList.add('islei');
                    len--
                }
            }
            this.content.appendChild(this.piece);
        },

        //判断是点击左键还是右键
        sign: function () {
            var self = this;
            this.content.oncontextmenu = function () {
                return false
            };
            this.piece.addEventListener('mousedown', function (e) {
                var evetn = e || window.event;
                var target = event.target || event.srcElement;
                if (e.button == 2) {
                    self.rightClick(target)
                } else if (e.button == 0) {
                    if (!target.classList.contains('hongqi')) {
                        self.troubleshoot(target)
                    }
                }
            })
        },

        //右键点击时放置旗子，并判断是否赢
        rightClick: function (target) {
            var len = this.place.length
            var lock = true
            var hongqi = document.getElementsByClassName('hongqi');
            var dilei = document.getElementsByClassName('islei')
            if (!target.classList.contains('active') && !target.classList.contains('hongqi')) {
                target.classList.add('hongqi')
                if (hongqi.length == 10) {
                    for (var i = 0; i < dilei.length; i++) {
                        if (hongqi[i] != dilei[i]) {
                            lock = false;
                        }
                        if (lock) {
                            this.win.style.display = 'inline-block'
                        }
                    }
                }
            } else {
                target.classList.remove('hongqi');
            }
        },
        //重新开始
        restart: function () {
            var self = this;
            this.close.onclick = function () {
                self.win.style.display = 'none';
                self.piece.remove();
                self.piece = document.createElement('ul');
                self.createMine();
                self.startGame();
                self.sign();
                self.restart()
            }
        },
        //判断是否是地雷
        troubleshoot: function (dom) {
            var self = this;
            var coordinates = dom.getAttribute('id').split('-');
            var islei = document.getElementsByClassName('islei');
            var len = islei.length
            var x = parseInt(coordinates[0]);
            var y = parseInt(coordinates[1])
            if (dom.classList.contains('islei')) {
                for (var i = 0; i < len; i++) {
                    islei[i].style.backgroundImage = 'url("./img/dilei.jpg")'
                }
                this.begin.onclick = function () {
                    self.piece.remove();
                    self.piece = document.createElement('ul');
                    self.createMine();
                    self.startGame();
                    self.sign();
                    self.restart()
                }
            } else {
                this.recursion(dom, x, y)
            }
        },
        //判断周围是否有雷
        recursion: function (dom, x, y) {
            this.num = 0;
            for (var i = x - 1; i <= x + 1; i++) {
                for (var j = y - 1; j <= y + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox && nearBox.classList.contains('islei')) {
                        this.num++
                    }
                }
            }
            dom.classList.add('active');
            dom.innerText = this.num;
            if (this.num === 0) {
                for (var i = x - 1; i <= x + 1; i++) {
                    for (var j = y - 1; j <= y + 1; j++) {
                        dom.classList.add('active');
                        var li = document.getElementById(i + '-' + j)
                        if (li && !li.classList.contains('hongqi')) {
                            if (!li.classList.contains('check')) {
                                li.classList.add('check');
                                this.recursion(li, i, j);
                            }
                        }
                    }
                }
            }
        }
    }
    obj.init()
})()
