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

    //-------------------封装复用代码--------------------
    //ul位移的方法
    var  setTranslateX=function(x){
        ul.style.transform='translateX('+x+'px)';
        ul.style.webkitTransform='translateX('+x+'px)';
    }
    //添加过渡方法
    var addTransition=function(){
        ul.style.transition="transform 0.3s";
        ul.style.webkitTransition="transform 0.3s";
    }
    //删除过渡方法
    var removeTransition=function(){
        ul.style.transition="none";
        ul.style.webkitTransition="none";
    }

    //-----------------1、定时器切换轮播图----------------

    var timer=setInterval(function(){
        index++;
        var  x=-index*W; //ul位移的距离
        addTransition();//添加过渡
        setTranslateX(x);//ul位移

    },4000);

    //-----------------2、实现无缝滚动---------------------------
    //调用过渡结束的兼容的方法

    bindTransitionEnd(ul,function(){
        if(index>=9){
            index=1;
            //ul 快速跳转 不需要过渡
            var x=-index*W;
            removeTransition(); //删除过渡
            setTranslateX(x);  //ul位移
        }

        if(index<=0){
            index=8;
            //ul 快速跳转 不需要过渡
            var x=-index*W;
            removeTransition(); //删除过渡
            setTranslateX(x);  //ul位移
        }
        console.log(index);
        //让角标同步
        setPoints(index);
    });

    //由于 transitionend 的兼容性问题 ，导致代码冗余
    //封装一个方法解决代码冗余的问题
    //作用 给盒子绑定兼容的过渡结束的方法
    /*
     * obj:要绑定兼容过渡结束事件的 元素
     * callback: 当过渡结束事件触发后要执行的操作
     * */
    function bindTransitionEnd(obj,callback){
        if(typeof obj=='object'){ //如果obj是对象则绑定事件
            obj.addEventListener('transitionend',function(){
                //if(callback){ callback();}
                callback&&callback(); //如果callback存在则执行callback
            });

            obj.addEventListener('webkitTransitionEnd',function(){
                callback&&callback();
            });
        }
    }

    //-----------------3、角标同步---------------------------
    //index  当前要高亮显示的小圆点
    function setPoints(index1){
        var lis=banner.querySelectorAll('ol li');
        //排他
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove('active');
        }
        //由于角标和图片个数不对应，需要index-1
        lis[index1-1].classList.add('active');
    }
//--------------------- 4、触屏滑动切换轮图---------------------------
    /*
     * 4-1触屏开始
     *   清除定时器
     *   记录触屏起始位置
     * 4-2触屏移动
     *   记录触屏移动位置
     *   ul跟随手指移动
     * 4-3触屏结束    *
     *   如果触屏移动的距离> 屏幕宽度/3 切换图片
     *       向右滑动 上一张     index--
     *       向左滑动 下一张     index++
     *   否则吸附回去
     *   再次开启定时器
     * */
    //定义变量 记录数据
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
        //ul位移距离=（-index*W)+distanceX;
        var x=-index*W+distanceX;
        removeTransition();//删除ul的过渡效果
        setTranslateX(x); //ul位移
    })

    banner.addEventListener('touchend',function(){
        //如果触屏移动的距离> 屏幕宽度/3 切换图片
        //*       向右滑动 上一张     index--
        //*       向左滑动 下一张     index++
        //*   否则吸附回去
        if(Math.abs(distanceX)>W/3){ //切换图片
            if(distanceX>0){
                index--; //右滑  上一张
            }
            if(distanceX<0){
                index++; //左滑 下一张
            }
        }else{
            //吸附回去
        }

        //让ul位移
        var x=-index*W;
        addTransition();//添加过渡
        setTranslateX(x);//ul位移

        //数据重置
        startX=0;
        moveX=0
        distanceX=0;

        //开启定时器
        timer=setInterval(function(){
            index++;
            var  x=-index*W; //ul位移的距离
            addTransition();//添加过渡
            setTranslateX(x);//ul位移
        },4000);
    })
}



