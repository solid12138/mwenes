<template>
<div class="relative mb83">
  <!-- 头部图片区域开始-->
  <div class="title-img">
    <img v-if="!loading" :src="worksDetailtxtPi.mainUrl" alt="" class="icon-img">
    <a @click="back" href="javascript:;"><img src="../assets/images/works-detail/works_detail_2.png" alt="" class="icon-left"></a>
    <a href="#"> <img src="../assets/images/works-detail/works_detail_3.png" alt="" class="icon-right"></a>
  </div>
  <!-- 头部图片区域结束-->
  <div class="content">
    <div class="w">
      <!-- 案例公司简介区域开始 -->
      <div class="case-brief">
        <h2 v-if="!loading">{{worksDetailtxtPi.projectName}}</h2>
        <p class="top-p">
          <span v-if="!loading">{{worksDetailtxtPi.projectType}}</span>
          <i>|</i>
          <span v-if="!loading">{{worksDetailtxtPi.designstyle}}</span>
          <i>|</i>
          <span v-if="!loading">{{worksDetailtxtMes.diquName}}</span>
          <i>|</i>
          <span v-if="!loading">{{worksDetailtxtPi.projectarea}}㎡</span>
        </p>
        <p class="bottom-p" v-if="!loading">{{worksDetailtxtPi.projectDescription}}</p>
      </div>
      <!-- 案例公司简介区域结束 -->
      <!-- 设计师区域开始 -->
      <!-- 设计师区域开始 -->
    </div>
    <div class="designer-wrap">
      <div class="designer-left">
        <img v-if="!loading" :src="worksDetailtxtMes.mavatar" alt="">
      </div>
      <div class="designer-middle">
        <p class="designer-middle-p-one" v-if="!loading">{{worksDetailtxtMes.mname}}</p>
        <p class="designer-middle-p-two" v-if="!loading">项目数量：{{worksDetailtxtMes.casecount}}</p>
      </div>
      <div class="designer-right">
        <div class="star-1 clearfix">
          <div v-if="!loading" :class="'star-div1 fl star-num' +designStar"></div>
          <span v-if="!loading" :class="'star-num-span fl star-text'+designStar"></span>
        </div>
        <div class="server-btn">
          <a href="http://pht.zoosnet.net/LR/Chatpre.aspx?id=PHT99019346&lng=cn">为我服务</a>
        </div>
      </div>
    </div>
    <!-- 设计师区域结束 -->
    <div class="w">
      <!-- 客户需求区域开始 -->
      <div class="demand">
        <div class="demand-aim">
          <p class="demand-p-one">客户需求：</p>
          <p class="demand-p-two" v-if="!loading">{{worksDetailtxtPi.customersdemand}}</p>
        </div>
      </div>
      <!-- 上面轮播部分开始 -->
      <div class="branch-office2">
        <ul class="branch-office-ul2 swiper-wrapper clearfix">
          <li class="swiper-slide" v-if="!loading" v-for="(completedData,index) in worksDetailtxtPi.qjImgList" :key="index">
            <a href="javascript:;">
              <div class="demand-img">
                <img :src="completedData.imgUrl" alt="" class="branch-img">
              </div>
              <p>{{completedData.imgDesc}}</p>
            </a>
          </li>
        </ul>
        <img src="../assets/images/works-detail/works_detail_8.png" alt="" class="otbg">
        <div class="swiper-pagination"></div>
      </div>
      <!-- 上面轮播部分结束 -->
      <div class="demand-detail-img"  v-if="!loading" v-for="(effectImgs,index) in worksDetailtxtPi.xgImgList" :key="index">
        <img :src="effectImgs.imgUrl" alt="" >
        <p>{{effectImgs.imgDesc}}</p>
      </div>
      <div class="demand-detail-img">
        <img v-if="!loading"  v-for="(materialImgs,index) in worksDetailtxtPi.czImgList" :src="materialImgs.imgUrl" :key="index">
        <p  v-if="!loading">材质分析：{{worksDetailtxtPi.creativeDescription}}</p>
      </div>
      <div class="demand-detail-img">
        <img  v-if="!loading" v-for="(designImgs,index) in worksDetailtxtPi.sjImgList" :src="designImgs.imgUrl" :key="index">
        <p  v-if="!loading">设计元素：{{worksDetailtxtPi.innovateDescription}}</p>
      </div>
      <div class="demand-detail-img">
        <img  v-if="!loading" v-for="(designImgs,index) in worksDetailtxtPi.scImgList" :src="designImgs.imgUrl" :key="index">

        <p v-if="!loading">色彩分析：{{worksDetailtxtPi.colorDescription}}</p>
      </div>
      <!-- 下面轮播图 -->
      <!-- 轮播部分开始 -->
      <div class="branch-office">
        <ul class="branch-office-ul2 swiper-wrapper clearfix">
          <li class="swiper-slide"  v-for="(jgImgListImgs,index) in worksDetailtxtPi.jgImgList" :key="index">
            <a href="javascript:;">
              <div class="demand-img">
                <img  v-if="!loading" :src="jgImgListImgs.imgUrl" class="branch-img">
                <div class="complete">竣工效果</div>
              </div>
            </a>
          </li>

        </ul>
        <img src="../assets/images/works-detail/works_detail_8.png" class="otbg otbg2">
        <div class="swiper-pagination swiper-pagination2"></div>
      </div>
      <!-- 轮播部分结束 -->
      <!-- 客户评价开始 -->
      <div v-if="flagShow">
        <div class="demand">
          <div class="demand-evaluate">
            <p class="demand-p-one">客户评价</p>
          </div>
        </div>
       <!-- <div class="evaluate">
          <div class="evaluate-left">
            <img src="../assets/images/works-detail/works_detail_12.png" alt="">
          </div>
          <div class="evaluate-middle">
            <div class="evaluate-middle-top">Erik Pierce</div>
            <div class="star" data-num="5">
              <ul class="comment" name="starlist">
                <li value="1"><img src="../assets/images/works-detail/works_detail_15.png" alt=""></li>
                <li value="2"><img src="../assets/images/works-detail/works_detail_15.png" alt=""></li>
                <li value="3"><img src="../assets/images/works-detail/works_detail_15.png" alt=""></li>
                <li value="4"><img src="../assets/images/works-detail/works_detail_15.png" alt=""></li>
                <li value="5"><img src="../assets/images/works-detail/works_detail_15.png" alt=""></li>
              </ul>
            </div>
          </div>
          <div class="evaluate-right">
            <span>{{worksDetailtxtPi.projectarea}}㎡ </span>
            <i>|</i>
            <span>{{worksDetailtxtPi.projectType}}</span>
          </div>
        </div>-->
        <div class="evaluate-text">
          <p>{{worksDetailtxtPi.evalute}}</p>
        </div>
      </div>
    </div>
  </div>
  <!--在线咨询-->
  <onLine></onLine>
  <!-- 客户评价结束 -->
  <returnHead></returnHead>
  <!-- 加载图标 -->
  <div class="loading-box" v-show="loadingbox"></div>
</div>
</template>


<script>
  import Swiper from "swiper"
  import onLine from '../components/onLine'
  import returnHead from '../components/returnHead'
  export default {
    data () {
      return {
        loading: false,
        worksDetailtxt:[],
        worksDetailtxtPi:[],
        customstarNum:[],
        flagShow:true,
        //设计师星级
        designStar:5,
        loadingbox: true,
      }
    },
    methods:{
      worksDetail:function () {
        let my_this = this;
        this.loading = true;
        var data = new Object();
        data.projectId=my_this.$route.query.ProjectId;
        this.$http({
          method:'get',
          url:this.apiUrl+'mindex/caseDetails',
          params:data
        }).then(function(worksText){
          my_this.loadingbox = false;
          my_this.loading = false;
          my_this.worksDetailtxt=worksText.data;
          my_this.worksDetailtxtPi=worksText.data.pi;
          my_this.worksDetailtxtMes=worksText.data.designerMsg;
          my_this.designStar=worksText.data.designerMsg.mstar
          //如果是没有评星级设计师星级为5星
          if(my_this.designStar==0){
            my_this.designStar=5
          }
          //判断客户评价显示与隐藏
          if( worksText.data.pi.evalute==null){
            my_this.flagShow=false
          }
          else{
            my_this.flagShow=true
          }
          //数据加载完成后执行
          my_this.$nextTick(function(){
            this.mySwiper1(); //初始化swiper
            this.mySwiper2();
          })

        }).catch(function(err){
          console.log(err);
        })
      },
      mySwiper1:function(){
        var mySwiper1 = new Swiper('.branch-office2', {
          autoplay: false, //可选选项，自动滑动
          loop: true,
          slidesPerView: "auto",
          paginationType: 'fraction',
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
          }
        });
      },
      mySwiper2:function(){
        var mySwiper2 = new Swiper('.branch-office', {
          autoplay: false, //可选选项，自动滑动
          loop: true,
          slidesPerView: "auto",
          centeredSlides: false,
          spaceBetween: 0,
          pagination: '.swiper-pagination',
          paginationType: 'fraction',
          observer:true,
          observeParents:true,
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
          }
        });
      },
      back(){
        this.$router.go(-1);//返回上一层
        // this.$router.push({path: "works"});
      }
    },
    components:{
        onLine,
        returnHead
    },
    created:function(){
      this.worksDetail();

    }
  }
</script>


<style scoped>
  @import "../assets/css/works-detail.css";
</style>
