<template>
   <div class="mb83">
        <!-- 返回图集开始 -->
        <div class="returnTj clearfix" @click="returntj()">
            <a href="javascript:;">
                <img src="../assets/images/atlas/returntj.png" alt="">
            </a>
        </div>
        <!-- 返回图集结束 -->
        <!-- 图集详情内容开始 -->
        <div class="designerlist">
            <div class="tjxq-content">
                <!-- 基本信息开始 -->
                <div class="essentialInformation">
                    <p>{{tjxq.diName}}</p>
                    <span>{{tjxq.orderNo}}</span>
                    <ul class="clearfix">
                        <li>面积: {{tjxq.orderArea}}㎡</li>
                        <li>价格: ¥{{tjxq.orderMoney}}</li>
                        <li>时间: {{tjxq.createTime}}</li>
                    </ul>
                </div>
                <!-- 基本信息结束 -->
                <!-- 内容开始 -->
                <div class="tjxqC">
                 <div v-for="(i,k) in datas.imgList" :key="k">
                     <div class="my-gallery" data-pswp-uid="1">
                         <a href="javascript:;" data-size="588x420">
                            <img :src="i.imgUrl" preview="1" />
                        </a>
                     </div>
                     <p class="clearfix"><span>{{i.imgRegion}}</span><span>{{i.imgStyle}}</span></p>
                 </div>
                </div>
                <!-- 内容结束 -->
            </div>
        </div>
        <!-- 图集详情内容结束 -->
        <appFooter></appFooter>
         <!--在线咨询-->
         <onLine></onLine>
        <!-- 图片预览开始 -->
        <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="pswp__bg"></div>
            <div class="pswp__scroll-wrap">
                <div class="pswp__container">
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                </div>
                <div class="pswp__ui pswp__ui--hidden">
                    <div class="pswp__top-bar">
                        <div class="pswp__preloader">
                        </div>
                    </div>
                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div class="pswp__share-tooltip"></div>
                    </div>
                    <div class="pswp__caption">
                        <div class="pswp__caption__center"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 图片预览结束 -->
    </div>
</template>

<script>
import appFooter from '../components/app-footer'
import onLine from '../components/onLine'
import axios from 'axios'
export default {
    data () {
        return {
            datas: [],
            tjxq: []
        }
    },
    components:{
        appFooter,
        onLine
    },
    mounted (){

    },
    created:function(){
        this.detailsAtlas();
    },
    methods:{
        // 返回设计院
        returntj (){
            this.$router.push({path: '/atlas'});
            // this.$router.go(-1);
        },
        detailsAtlas (){
            let my_this = this;
            axios.get(my_this.apiUrl+"designInstitute/atlasDetail?orderNo="+my_this.$route.query.orderNo).then(function(tjxqdata){
                my_this.datas= tjxqdata.data.data
                my_this.tjxq= tjxqdata.data.data.desGalleryInfo;
            });
        }
    }
}
</script>

<style scoped>
@import '../assets/css/detailsAtlas.css';
</style>
