/*
 * 由于在移动端click会有300ms左右的延时
 * 为了响应速度更快 移动端一般会封装一个加tap的事件,本质是用touch事件来优化click
 * click事件的特点： 用户手指接触屏幕，然后离开，手指不会移动，并且手指接触屏幕的时间很短
 * touch模拟： touch必须是没有触发touchemove事件 ，手指接触屏幕的时间很短
 *
 * 定义一个tap方法来优化click事件
 */

/*1、定义在全局的变量和方法 很容易操作全局污染问题*/
/*解决方法：使用命名空间*/

/*2、tap事件 用于给一个盒子绑定优化后的点击事件*/

var itcast={
    /*
    * obj:要绑定事件盒子
    * callback：点击事件触发后的回调函数
    * */
    tap:function(obj,callback){
      if(typeof obj=='object'){
          var startTime=0; //记录起始时间
          var isMove=false; //记录是否移动

          obj.addEventListener('touchstart',function(){
              startTime=Date.now();//记录起始时间
          });

          obj.addEventListener('touchmove',function(){
              isMove=true;//记录手指移动
          });

          obj.addEventListener('touchend',function(e){
              //判断是否为click事件
              if(Date.now()-startTime<150&&!isMove){
                  callback&&callback(e); //执行回到函数
              }

              //数据重置
              startTime=0;
              isMove=false;
          });

      }

    }
};







