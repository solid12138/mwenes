/*计算rem高度*/
(function (win, doc) {
    win.onresize = function () {
        change();
    };
    change();

    function change() {
        var oFs = doc.documentElement.clientWidth / (640 / 100);
        doc.documentElement.style.fontSize = oFs + 'px';
    }
})(window, document);

// $(function () {
//     //点击搜索显示弹框
//     var n= 0;
//     $(".searcH").on('click',function(){
//         n++;
//         if(n == 1){
//             $(".searcHz").css({'left':'0','padding':' 0 0.26rem'});
//             $(".searcH img").css({'left':'0.6rem'});
//         }else if(n == 2){
//             n=0;
//             $(".searcHz").css({'left':'-5rem','padding':'0'});
//             $(".searcH img").css({'left':'50%'});
//         }
//     });

//     /*头部点击*/
//     $(".wenHead .swiper-wrapper").on("click","a",function(){
//         $(this).addClass('asty').siblings().removeClass('asty');
//     });
//     //头部滚动
//     var clickNum= $(".wenHead .swiper-wrapper a.asty").index();
//     if(clickNum>3){
//         clickNum=5
//     }
//     else{
//         clickNum=0
//     }
//     var mySwiper_nav1 = new Swiper('.wenHead',{
//         freeMode : false,
//         slidesPerView : 'auto',
//         initialSlide : clickNum
//     });

// })
