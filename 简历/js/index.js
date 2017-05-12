/**
 * Created by yubowen on 2017/4/25.
 */
$(function() {
    var index = 0;
    var box = document.querySelector('.index_main');
    var time = null;
    var height = document.documentElement.clientHeight-70;
    var section = document.querySelectorAll('.section');
    var colors = [
        'rgba(0,0,0,.7)',
        'rgba(0,0,0,.8)',
        'rgba(0,0,0,.7)',
        'rgba(0,0,0,.7)',
    ]
    // 先将几个大的div旋转一下
    section[0].style.transform = "translateZ("+height/2+"px)"
    section[1].style.transform = "translateY("+height/2+"px) rotateX(-90deg)"
    section[2].style.transform = "translateZ("+(-height)/2+"px) rotateY(180deg) rotateZ(180deg)";
    section[3].style.transform = "translateY("+(-height)/2+"px) rotateX(90deg)";
    // 把高度给大盒子和每个小盒子,防止3d旋转的时候出问题
    box.style.height = height+"px";
    for (var i = 0; i < section.length; i++) {
        section[i].style.height = height+"px"
        section[i].style.background = colors[i]
    }

    $('#accordion').collapse()
    // 每次滚屏结束之后调用函数
    box.addEventListener('transitionend',function () {
        animationY(index)
    })


    /*第一步,最顶层的动画*/
    //左上角的qq 动画
    $(".qq").hover(function () {
        $(this).children('span').addClass("animated tada")
    },function () {
        $(this).children('span').removeClass("animated tada")
    })
    // 中间文字的入场动画
    $(".char3Ds").each(function (index,item) {
        setTimeout(function () {
            $(item).addClass("animated fadeInLeft").removeClass('collapse')
        },(index+1)*1000)
    })


    // 第一步,关闭最大遮罩层
    $(".up_btn1").click(function () {
        $('.index_up').addClass('zoomOutUp');
        setTimeout(function () {
            $("nav.navbar").addClass('bounceInUp').removeClass("collapse")
        },1000)
        setTimeout(function () {
            $(".index_main").removeClass('collapse').addClass("rollIn");
            box.style.transform = "translateZ(-300px)";
        },2000)
        // 滚屏事件
        window.onmousewheel = function (e) {
            clearTimeout(time)
            box.classList.remove('rollIn')
            time = setTimeout(function () {
                e.wheelDelta > 0 ? index++ : index--;
                // console.log(index)
                box.style.transform = "translateZ(-300px) rotateX("+index*(-90)+"deg)";
                box.style.transition = "transform 1s";
            },100)
        }
    })

});


/**
 * 滚屏结束之后的函数
 * @param index 当前屏的索引
 */
function animationY(index) {
    console.log(index)

    index = Math.abs(index%4)
    if (index == 1) {
        var arr = ['40%','50%','70%','50%','70%','90%'];
        console.log($(".progress-bar"))

        $(".progress-bar").each(function (index,item) {
            console.log(index)
            $(item).css({
                'transition':'width 1s',
                'width':arr[index]
            })
        })
    }

}




