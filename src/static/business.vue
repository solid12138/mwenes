<template>
   <div  class="mb83">
        <appHeader></appHeader>
        <!-- 分类开始 -->
        <div class="classification">
            <div class="fl-content">
                <ul class="flul">
                    <li>
                        <a href="javascript:;">业务类型</a>
                        <span></span>
                    </li>
                </ul>
                <div class="lxC">
                    <ul>
                        <li>全部业务</li>
                        <li>办公</li>
                        <li>餐饮</li>
                        <li>商业</li>
                        <li>酒店</li>
                        <li>教育</li>
                        <li>会所</li>
                        <li>其他</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 分类结束 -->
        <!-- 内容开始 -->
        <div class="business">
            <div class="ywC clearfix">
                <div>
                    <a href="javascript:;">
                        <img src="../assets/images/business/yewu_img01.jpg" alt="" />
                        <p>金融投资</p>
                        <div>
                            <img src="../assets/images/business/wenes-ywhuo.png" alt="">
                            <span>1324</span>|<span>251预约</span>
                        </div>
                    </a>
                </div>
                <div>
                    <a href="javascript:;">
                        <img src="../assets/images/business/yewu_img02.jpg" alt="" />
                        <p>广告传媒</p>
                        <div>
                            <img src="../assets/images/business/wenes-ywhuo.png" alt="">
                            <span>1180</span>|<span>470预约</span>
                        </div>
                    </a>
                </div>
                <div>
                    <a href="javascript:;">
                        <img src="../assets/images/business/yewu_img03.jpg" alt="" />
                        <p>咨询服务</p>
                        <div>
                            <img src="../assets/images/business/wenes-ywhuo.png" alt="">
                            <span>1205</span>|<span>456预约</span>
                        </div>
                    </a>
                </div>
                <div>
                    <a href="javascript:;">
                        <img src="../assets/images/business/yewu_img04.jpg" alt="" />
                        <p>生物医药</p>
                        <div>
                            <img src="../assets/images/business/wenes-ywhuo.png" alt="">
                            <span>1196</span>|<span>437预约</span>
                        </div>
                    </a>
                </div>
                <div>
                    <a href="javascript:;">
                        <img src="../assets/images/business/yewu_img05.jpg" alt="" />
                        <p>网络公司</p>
                        <div>
                            <img src="../assets/images/business/wenes-ywhuo.png" alt="">
                            <span>1134</span>|<span>431预约</span>
                        </div>
                    </a>
                </div>
                <div>
                    <a href="javascript:;">
                        <img src="../assets/images/business/yewu_img06.jpg" alt="" />
                        <p>科技公司</p>
                        <div>
                            <img src="../assets/images/business/wenes-ywhuo.png" alt="">
                            <span>1125</span>|<span>416预约</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <!-- 内容结束 -->
         <!--在线咨询-->
         <onLine></onLine>
        <appFooter></appFooter>
    </div>
</template>

<script>
import appHeader from '../components/app-header'
import appFooter from '../components/app-footer'
import onLine from '../components/onLine'
import Swiper from 'swiper'
export default {
    data () {
        return {
        }
    },
    components:{
        appHeader,
        appFooter,
        onLine
    },
    mounted (){
        var mySwiper_nav1 = new Swiper('.wenHead',{
            slidesPerView : 'auto',
            freeMode : true,
            initialSlide: 4
        })
        //页面载入给部分div右浮
        // for(var i=0;i<$(".ywC div").length;i++){
        //     if(i%2 == 0){
        //         $(".ywC div:nth-child("+i+")").css('float','right');
        //     }
        // }
        /*分类点击*/
        // $(".fl-content .flul li").on("click",function(){
        //     if($(this).attr("class") == "listy"){
        //         $(".lxC").fadeOut();
        //         $(".lxC ul").stop().slideUp();
        //         $(".flul li").removeAttr('style');
        //         $(this).removeClass('listy');
        //         $("body").css('overflow','hidden');
        //         $(".flul li[class=listy]").css('border-bottom-color','#dfdfdf');
        //         return;
        //     }
        //     $("body").css('overflow','hidden');
        //     $(this).addClass('listy').siblings().removeClass('listy');
        //     $(".lxC").fadeIn();
        //     $(".lxC ul").eq($(this).index()).slideDown().siblings().slideUp();
        //     $(this).removeAttr('style');
        // });
        /* 类型点击 */
        // $(".lxC ul li").on('click',function(event){
        //     if($(this).attr('class') == null){
        //         $(this).addClass('listy2').siblings().removeAttr('class');
        //         $(".flul li").eq($(this).parent().index()).children('a').css('color','#ce2222');
        //         $(".flul li:nth-child("+($(this).parent().index()+1)+") a").html($(this).html());
        //         $(".flul").find('span').css('border-color','#ce2222 transparent transparent transparent');
        //     }
        //     $('.fl-content .flul li').removeClass('listy');
        //     $("body").removeAttr('style');
        //     $(".lxC").fadeOut();
        //     $(".lxC ul").stop().slideUp();
        //     $(".flul li:nth-child("+($(this).parent().index()+1)+")").css('border-bottom-color','#dfdfdf');
        // });
        //点击遮罩处事件
        // $(".lxC").on('click',function(event){
        //     if(event.target == this){
        //         $("body").removeAttr('style');
        //         $(".lxC").fadeOut();
        //         $(".lxC ul").stop().slideUp();
        //         $(".flul li").removeAttr('style');
        //         $(".flul li").css('border-bottom-color','#dfdfdf');
        //         $('.fl-content .flul li').removeClass('listy');
        //     }
        // });
    }
}
</script>

<style scoped>
    /* 分类开始 */
    .classification{ width: 100%; height: .8rem; }
    .classification .fl-content{ width: 100%; height: .8rem; display: flex; }
    .classification .fl-content ul{ width: 100%; display: flex; }
    .classification .fl-content ul li{ font-size: .28rem; border-left: .01rem solid #dfdfdf; border-bottom: .01rem solid #dfdfdf; flex: 1; position: relative; }
    .classification .fl-content ul li:first-child{ border-left: none; }
    .classification .fl-content ul li a{ width: 95%; height: .8rem; color: #2f2f2f; line-height: .8rem; float: left; padding-left: 5%; }
    .classification .fl-content ul .listy a{ color: #ce2222; }
    .classification .fl-content ul li span{ display: block; width: 0; height: 0; border-style: solid; border-width: .08rem; border-color: #2f2f2f transparent transparent transparent; position: absolute; right: .35rem; top: 50%; margin-top: -.04rem; }
    .classification .fl-content ul .listy span{ border-color: #ce2222 transparent transparent transparent; }
    .classification .fl-content ul .listy{ border-bottom-color: #fff; }
    .classification .fl-content .lxC{ width: 100%; height: 100vh; background: rgba(0,0,0,0.2); position: absolute; left: 0; top: 1.7rem; display: none; }
    .classification .fl-content .lxC ul{ width: auto; background: #fff; padding: .24rem .2rem .46rem; float: left; margin: 0 auto; display: none; }
    .classification .fl-content .lxC ul li{ min-width: .96rem; height: .52rem; line-height: .52rem; border: 1px solid #f5f5f5; border-radius: .05rem; background: #f5f5f5; text-align: center; padding: 0 .2rem; float: left; margin: .05rem; }
    .classification .fl-content .lxC ul .listy2{ color: #ce2222; border-color: #ce2222; background: #fff; }
    /* 分类结束 */
    /* 业务类型开始 */
    .business{ width: 100%; }
    .business .ywC{ width: 5.89rem; height: auto; margin: .26rem auto 0.2rem; }
    .business .ywC>div{ width: 2.89rem; height: 4.23rem; float: left; }
    .business .ywC>div a{ width: 100%; height: 100%; display: block; }
    .business .ywC>div a>img{ width: 100%; float: left; }
    .business .ywC>div a p{ width: 100%; color: #2f2f2f; font-size: .28rem; font-weight: bold; padding: .26rem 0 .1rem 0; float: left; }
    .business .ywC>div a div{ color: #999; font-size: .24rem; }
    .business .ywC>div a div img{ width: .18rem; }
    .business .ywC>div a div span{ padding-right: 0.1rem; }
    .business .ywC>div a div span:last-child{ padding-left: 0.1rem; }
/* 业务类型结束 */
</style>
