window.onload=function(){
    var dels=document.querySelectorAll('.del');
    var winBox=document.querySelector('.winbox');
    var removeBox=document.querySelector('.removebox');
    var cancel=document.querySelector('.cancel');
    //??????��?????????
    // ????��????
    // 1-??????��???��??
    // 2-???????
    for(var i=0;i<dels.length;i++){
        dels[i].onclick=function(){
            this.classList.add('open'); //???opne????
            removeBox.classList.add('animated'); // ??? ????????????
            removeBox.classList.add('bounceInDown');
            winBox.style.display='block'; //?????????
        }
    }

    //?????????
    //1-????????
    //2-???open????
    cancel.onclick=function(){
        winBox.style.display='none';
        removeBox.classList.remove('animated'); // ??? ????????????
        removeBox.classList.remove('bounceInDown');
        var open=document.querySelector('.open'); //?? ????????
        open.classList.remove('open');
    }

}