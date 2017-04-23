window.onload=function(){
    //头部滚动变色
    setHeader();
    //倒计时
    downTime();
    //轮播图
    banner();
}

//头部滚动变色
/*如果滚动高度 小于banner的高度
 *   头部盒子的透明度= 页面滚动出去的高度/banner高度*
 * 如果滚动高度 小于banner的高度  透明度固定不变了
 *background: rgba(201, 21, 35, 0.8);
 *  */
function setHeader(){
    var header=document.querySelector('.header-in');
    var banner=document.querySelector('.jd-banner');
    var H=banner.offsetHeight; //获取banner的高度

    //绑定页面滚动事件
    window.onscroll=function(){
        opacity=0;
        var top=document.body.scrollTop; // 获取页面卷去的高度

        opacity=top/H; //透明度= 页面滚动出去的高度/banner高度*

        if(opacity>0.85){
            opacity=0.85;
        }
        console.log(opacity);
        //设置header的透明度
        header.style.background='rgba(201, 21, 35,'+opacity+')';
    }
}

function downTime(){
    var time=5*60*60;

    var timer=setInterval(function(){
        time--;
        //把变化后的时间转成 时分秒
        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=Math.floor(time%60);

        var  spans=document.querySelectorAll('.time span');

        spans[0].innerHTML=Math.floor(h/10); //十位
        spans[1].innerHTML=Math.floor(h%10); //个位

        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=Math.floor(m%10);

        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=Math.floor(s%10);
        //容错性变成
        if(time<=0){
            clearInterval(timer); //清除定时器
        }
    },1000);
}

/*
 * 需求：
 * 1、定时器切换轮播图
 * 2、实现无缝滚动
 * 3、角标的同步
 * 4、触屏滑动切换轮图
 * */
function banner(){
    var banner=document.querySelector('.jd-banner');
    var ul=banner.querySelector('ul');
    var W=banner.offsetWidth;
    var index=1; //轮播图的索引值
    var  setTranslateX=function(x){
        ul.style.transform='translateX('+x+'px)';
        ul.style.webkitTransform='translateX('+x+'px)';
    }
    var addTransition=function(){
        ul.style.transition="transform 0.3s";
        ul.style.webkitTransition="transform 0.3s";
    }
    var removeTransition=function(){
        ul.style.transition="none";
        ul.style.webkitTransition="none";
    }
    var timer=setInterval(function(){
        index++;
        var  x=-index*W; //ul位移的距离
        addTransition();//添加过渡
        setTranslateX(x);//ul位移
    },5000);
    bindTransitionEnd(ul,function(){
        if(index>=9){
            index=1;
            var x=-index*W;
            removeTransition(); //删除过渡
            setTranslateX(x);  //ul位移
        }
        if(index<=0){
            index=8;
            var x=-index*W;
            removeTransition(); //删除过渡
            setTranslateX(x);  //ul位移
        }
        setPoints(index);
    });
    function bindTransitionEnd(obj,callback){
        if(typeof obj=='object'){ //如果obj是对象则绑定事件
            obj.addEventListener('transitionend',function(){
                callback&&callback(); //如果callback存在则执行callback
            });
            obj.addEventListener('webkitTransitionEnd',function(){
                callback&&callback();
            });
        }
    }
    function setPoints(index1){
        var lis=banner.querySelectorAll('ol li');
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove('active');
        }
        lis[index1-1].classList.add('active');
    }
    var startX=0;
    var moveX=0;
    var distanceX=0;
    banner.addEventListener('touchstart',function(e){
        clearInterval(timer);//清除定时器
        startX= e.targetTouches[0].clientX; //记录起始位置
    })
    banner.addEventListener('touchmove',function(e){
        moveX= e.targetTouches[0].clientX; //记录移动的位置
        distanceX=moveX-startX;//距离差
        var x=-index*W+distanceX;
        removeTransition();//删除ul的过渡效果
        setTranslateX(x); //ul位移
    })
    banner.addEventListener('touchend',function(){
        if(Math.abs(distanceX)>W/3){ //切换图片
            if(distanceX>0){
                index--; //又滑  上一张
            }
            if(distanceX<0){
                index++; //左滑 下一张
            }
        }
        var x=-index*W;
        addTransition();//添加过渡
        setTranslateX(x);//ul位移
        startX=0;
        moveX=0
        distanceX=0;
        timer=setInterval(function(){
            index++;
            var  x=-index*W; //ul位移的距离
            addTransition();//添加过渡
            setTranslateX(x);//ul位移
        },4000);
    })
}



