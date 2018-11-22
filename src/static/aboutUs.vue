<template>
   <div class="mb83">
        <appHeader></appHeader>
        <!-- 内容开始 -->
        <div class="aboutUs">
            <div class="gywmC">
                <img src="../assets/images/aboutUs/gywm-img01.jpg" alt="">
                <p>成立于 2014 年，旨在打造高端品牌装饰行业引领平台提供设计作品展示、设计师与设计院平台信息交流推广设计需求沟通、下单、施工等一站式专业综合服务</p>
                <p>拥有大量优秀设计师、工作室、设计院，推动业务开展范围至国内外30余个地区城市，共同创建高质量设计平台，提供专业设计方案与工程施工成交服务</p>
                <p>服务包括原创设计、匠心施工、精选材料、智能化强弱电、配套家具、智能设备等智能装修整体解决方案</p>
                <ul>
                    <li><p>33<span>家</span></p></li>
                    <li>分公司</li>
                </ul>
                <ul class="ulbr">
                    <li><p>299<span>名</span></p></li>
                    <li>设计师</li>
                </ul>
                <ul>
                    <li><p>50000<span>+</span></p></li>
                    <li>服务客户</li>
                </ul>
                <ul class="ulbr">
                    <li><p>100000<span>+</span></p></li>
                    <li>案例数量</li>
                </ul>
            </div>
        </div>
        <!--在线咨询-->
        <onLine></onLine>
        <!-- 内容结束 -->
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
        //添加左边框
        // $(".gywmC ul").each(function(i,y){
        //     if(i%2 == 1){
        //         $(this).addClass('ulbr');
        //     }
        // });
    }
}
</script>

<style scoped>
    .aboutUs{ width: 100%; float: left; }
    .aboutUs .gywmC{ width: 5.88rem; margin: 0 auto; }
    .aboutUs .gywmC>img{ width: 100%; padding: 0.26rem 0; }
    .aboutUs .gywmC>p{ color: #666; font-size: 0.24rem; line-height: 0.36rem; padding: 0.1rem 0; }
    .aboutUs .gywmC ul{ width: 2.89rem; height: 1.6rem; text-align: center; float: left; margin-top: 0.6rem; }
    .aboutUs .gywmC ul:last-child{ margin-bottom: 0.5rem; }
    .aboutUs .gywmC ul li:first-child{ padding: 0.2rem 0 0.1rem 0; }
    .aboutUs .gywmC .ulbr{ border-left: 0.01rem solid #ccc; }
    .aboutUs .gywmC ul li:first-child p{ color: #2f2f2f; font-size: 0.8rem; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; position: relative; }
    .aboutUs .gywmC ul li:first-child p span{ color: #999; font-size: 0.24rem; padding-left: 0.05rem; position: absolute; top: 0.1rem; }
    .aboutUs .gywmC ul li:last-child{ color: #666; font-size: 0.26rem; }
</style>
