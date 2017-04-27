window.onload=function(){
    setHeader();
    // interval();
    // lunbo()
    // bannerlunbo()
    lunbo3()
}

// 滚动变色
function setHeader() {
    var header = document.querySelector('.header-in');
    var h = document.querySelector('.jd-banner').offsetHeight;
    var index = 0;
    var opacity = 0
    window.onscroll = function () {
        // index++;
        opacity = document.body.scrollTop / h;
        opacity = opacity>0.85?0.85:opacity;
        header.style.background = "rgba(255,0,0,"+opacity+")"
    }
}

// 计时器
function interval() {
    var timeid = null;
    var spans = document.querySelectorAll('.time span')
    var time = 5*60*60;
    timeid = setInterval(function () {
        time--;
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60); // 对 4小时零多少秒 这个数字 /60 得到分钟
        var s = Math.floor(time%60);
        spans[0].innerHTML = h<10?0:Math.floor(h/10);
        spans[1].innerHTML = Math.floor(h%10);
        spans[3].innerHTML = m<10?0:Math.floor(m/10);
        spans[4].innerHTML = Math.floor(m%10);
        spans[6].innerHTML = s<10?0:Math.floor(s/10);
        spans[7].innerHTML = Math.floor(s%10);
        if (time<=0) {
            clearInterval(timeid)
        }
    },1000)
}


//轮播图
function lunbo() {
    var banner = document.querySelector('.jd-banner');
    var ul = document.querySelector('.jd-banner ul');
    var li = -document.querySelector('.jd-banner ul li').offsetWidth;
    var olli = document.querySelectorAll('ol li')
    var index = 1;
    var timeid = null;
    ul.addEventListener('transitionend',function () {
        gundong()
    })
    // 自动轮播
    timeid = setInterval(function () {
        index--;
        ul.style.transition = "transform .5s"
        ul.style.transform = "translateX("+index*li+"px)";
        ul.addEventListener('transitionend',function () {
            gundong()
            circle()
        })
         // 小圆点跟着动
    },1000);
    // 判断是否到最后一个
    function gundong() {
        if (index>=9) {
            index = 1;
            ul.style.transition = "none"
            ul.style.transform = "translateX("+li+"px)";
        }
        if (index<=0) {
            index = 8;
            ul.style.transition = "none"
            ul.style.transform = "translateX("+li*8+"px)";
        }
    }
    // 小圆点跟着动
    function circle() {
        var lic = document.querySelector('.active');
        lic.classList.remove('active')
        var p = index>=9?1:index;
        olli[p-1].classList.add('active');
    }
    
    // 触摸事件
    function touchdong() {
        var startx = 0;
        var clientx = 0;
        var distance = 0;
        banner.addEventListener('touchstart',function (e) {
            startx = e.targetTouches[0].clientX;
            clearInterval(timeid)
        })
        banner.addEventListener('touchmove',function (e) {
            distance = e.targetTouches[0].clientX -startx;
            ul.style.transition = 'none';
            ul.style.transform = "translateX("+(index*li+distance)+"px)";
        })
        banner.addEventListener('touchend',function (e) {
            if (Math.abs(distance)>=-li/3) {
                if (distance>0) {
                    index--
                }
                if (distance<0) {
                    index++
                }
            }
            ul.style.transition = 'transform .3s';
            ul.style.transform = "translateX("+index*li+"px)";
            ul.addEventListener('transitionend',function () {
                gundong()
                circle()
            })
        })

    }
    touchdong()
}




// 第二遍轮播
function bannerlunbo() {
    var ul = document.querySelector('.jd-banner ul');
    var width = -document.querySelector('.jd-banner').offsetWidth
    var index = 1;
    // 第一步 自动滚动
    var timeID = setInterval(function () {
        index++;
        var x = index*width;
        transitionyou()
        transformyou(x)

    },1000)
    function transitionyou() {
        ul.style.transition = 'transform .3s';
        ul.style.webkitTransition = 'transform .3s';
    }
    function transitionmei() {
        ul.style.transition = 'none';
        ul.style.webkitTransition = 'none';
    }
    function transformyou(x) {
        ul.style.transform = 'translateX('+x+'px)';
        ul.style.webkitTransform = 'translateX('+x+'px)';
    }
    // 第二步 小圆点跟着动
    function yuandian() {
        var lis = document.querySelectorAll('ol li');
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove('active');
        }
        lis[index-1].classList.add('active')
    }
    
    // 第三步 点击拖动图片
    touchzou()
    function touchzou() {
        var banner = document.querySelector('.jd-banner');
        var startX = 0;
        var moveX = 0;
        banner.addEventListener('touchstart',function (e) {
            startX = e.targetTouches[0].clientX;
            transitionmei()
            clearInterval(timeID)
        })
        banner.addEventListener('touchmove',function (e) {
            moveX = e.targetTouches[0].clientX - startX;
            transformyou(index*width+moveX)
        })
        banner.addEventListener('touchend',function (e) {
            if (Math.abs(moveX)>= -width/3) {
                if (moveX>0) {
                    index--
                }
                if (moveX<0) {
                    index++
                }
            }
            transitionyou()
            transformyou(index*width)
            timeID = setInterval(function () {
                index++;
                transitionyou()
                transformyou(index*width)
            },1000)
        })
    }

    // 添加动画的监听,若是最后一个,则立即跳到第二个
    ul.addEventListener('transitionend',function () {
        if (index>=9) {
            index = 1;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX('+width+'px)';
        }
        if (index<=0) {
            index = 8;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX('+width*8+'px)';
        }
        yuandian()
    })
}


// 第三遍轮播
function lunbo3() {
    var banner = document.querySelector('.jd-banner')
    var ul = banner.querySelector('ul')
    var lis = document.querySelectorAll('ol li')
    var w = -banner.offsetWidth   // 这里直接得到负数
    var index = 1;
    // 自动轮播
    var timeid = setInterval(function () {
        index++;
        ul.style.transition = "transform .3s";
        ul.style.transform = "translateX("+index*w+"px)";
    },1000)

    // 小圆点跟着动
    function ollidong() {
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove('active')
        }
        lis[index-1].classList.add('active')
    }

    // 触摸事件
    var startX = 0;
    var moveX = 0;
    banner.addEventListener('touchstart',function (e) {
        startX = e.targetTouches[0].clientX;
        clearInterval(timeid)
    })
    banner.addEventListener('touchmove',function (e) {
        moveX = e.targetTouches[0].clientX - startX;
        ul.style.transition = "none";
        ul.style.transform = "translateX("+(index*w+moveX)+"px)";
    })
    banner.addEventListener('touchend',function (e) {
        if (Math.abs(moveX)>-w/3) {
            if (moveX>0) {
                index--;
            }
            if (moveX<0) {
                index++
            }
        }
        ul.style.transition = "transform .3s";
        ul.style.transform = "translateX("+index*w+"px)";
        startX = 0;
        moveX = 0;
        timeid = setInterval(function () {
                index++;
                ul.style.transition = "transform .3s";
                ul.style.transform = "translateX("+index*w+"px)";
            },1000)
    })
    // 每次动画结束的事件
    ul.addEventListener('transitionend',function () {
        if (index>=9) {
            index = 1;
            ul.style.transition = "none";
            ul.style.transform = "translateX("+w+"px)";
        }
        if (index<=0) {
            index = 8;
            ul.style.transition = "none";
            ul.style.transform = "translateX("+w*index+"px)";
        }
        ollidong();
    })
}















