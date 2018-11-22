<template>
  <div class="mb83">
    <appHeader></appHeader>
    <!-- banner开始 -->
    <div class="banner">
      <div class="swiper-container swiperone">
        <div class="swiper-wrapper clearfix">
          <div class="swiper-slide"><img src="../assets/images/home/home_banner1.png" alt="" /></div>
          <div class="swiper-slide"><img src="../assets/images/home/home_banner2.png" alt="" /></div>
          <div class="swiper-slide"><img src="../assets/images/home/home_banner3.png" alt="" /></div>
          <div class="swiper-slide"><img src="../assets/images/home/home_banner4.png" alt="" /></div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!-- banner结束 -->
    <!-- 案例类型开始 -->
    <div class="type">
        <router-link tag="dl" :to="{path:'works',query:{ProjectType:1}}">
          <dt><img src="../assets/images/home/type_img1.png" ></dt>
          <dd>办公</dd>
        </router-link>
        <router-link tag="dl" :to="{path:'works',query:{ProjectType:2}}">
          <dt><img src="../assets/images/home/type_img2.png" ></dt>
          <dd>餐饮</dd>
        </router-link>
        <router-link tag="dl" :to="{path:'works',query:{ProjectType:3}}">
          <dt><img src="../assets/images/home/type_img3.png" ></dt>
          <dd>商业</dd>
        </router-link>
        <router-link tag="dl" :to="{path:'works',query:{ProjectType:6}}">
          <dt><img src="../assets/images/home/type_img4.png" ></dt>
          <dd>教育</dd>
        </router-link>
    </div>
    <!-- 类型结束 -->
    <!-- 设计好服务开始 -->
    <div class="service">
      <p>设计好服务</p>
      <div class="swiper-container swipertwo">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <span>找设计师</span>
            <p>高品质服务 1对1定制服务</p>
          </div>
          <div class="swiper-slide">
            <span>一站式公装</span>
            <p>毛胚到硬装 全程透明</p>
          </div>
          <div class="swiper-slide">
            <span>智能预算报价</span>
            <p>10秒即得 报价准确</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 设计好服务结束 -->
    <!-- 设计案例开始 -->
    <div class="case">
      <div class="public-titleNew clearfix">
        <h3 class="fl">设计案例</h3>
        <span class="fl">你想要的 都在这里</span>
        <router-link :to="{ path: 'works' }" class="fr more-a">更多<img src="../assets/images/home/arrow_icon.png" alt=""></router-link>

      </div>
      <ul class="caseType">
        <li :class="{lis:caseTypeNum==index}" @click="caseTab(index)" v-for="(caseNavList,index) in caseNav" :key="index">{{caseNavList.title}}</li>
      </ul>
      <div class="caseC">
        <div class="swiper-container caseswiper">
          <div class="swiper-wrapper">
            <router-link tag="div" class="swiper-slide" v-for="(caseList,index) in caseData" :key="index" :to="{path:'worksDetail',query:{ProjectId:caseList.projectid}}">
                <img :src="caseList.mainurl" alt="">
                <span>{{caseList.projectname}}</span>
                <p><span>{{caseList.industrytypename}}</span>丨<span>{{caseList.projectarea}}㎡</span></p>
            </router-link>

          </div>
        </div>
      </div>
    </div>
    <!-- 设计案例结束 -->
    <!-- 估价开始 -->
    <div class="estimate" id="estimate">
      <div class="title">
        <span></span>
        <p>10秒估算装修报价</p>
        <span></span>
      </div>
      <div class="estimateC clearfix">
        <img src="../assets/images/home/estimate_img1.gif" alt="" />
        <div class="citys" @click="cityShow()" id="citys">
          <span>{{cityName}}</span>
          <img src="../assets/images/home/sel.png" :class="ti == true ? 'imgs':''" alt="">
        </div>
        <div class="pfmeter">
          <input type="number" name="" v-model="areaNum">
          <span>㎡</span>
        </div>
        <div class="industry" @click="industryShow()" id="industry">
          <span>{{industryName}}</span>
          <img src="../assets/images/home/sel.png" :class="ti2 == true ? 'imgs':''" alt="">
        </div>
        <input type="number" placeholder="请输入手机号，短信获取报价结果" id="phoneInput"  />
        <button id="ljApply" @click="applyS()">立即申请</button>
        <!--城市弹框-->
        <div class="city-div" v-show="cityS">
          <ul class="clearfix">
            <li v-for="(cityList,index) in city" @click="cityClick(index,cityList.id)"  :class="{ current:index == cityIndex }">{{cityList.title}}</li>
          </ul>
        </div>
        <!--行业弹框-->
        <div class="industry-div" v-show="industryS">
          <ul class="clearfix">
            <li v-for="(industryList,index) in industry" @click="industryClick(index)" :class="{ current:index == industryIndex }">{{industryList.title}}</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 估价结束 -->
    <!-- 设计师开始 -->
    <div class="designer">
      <div class="public-titleNew clearfix">
        <h3 class="fl">设计师</h3>
        <span class="fl">300+优秀设计师为您服务</span>
        <router-link :to="{ path: 'designerList' }" class="fr more-a">更多<img src="../assets/images/home/arrow_icon.png" alt=""></router-link>

      </div>
      <ul class="sjsType">
        <li :class="{lis:designerTypeNum==index}" v-for="(designerli,index) in designerNav":key="index" @click="designerTab(index)">{{designerli.title}}</li>

      </ul>
      <div class="sjsC">
        <div class="swiper-container swiperthree">
          <div class="swiper-wrapper">
            <router-link class="swiper-slide" tag="div" :to="{path:'designerDetail',query:{CardNo:designerList.designerCard}}" v-for="(designerList,index) in designerListData" :key="index">
              <!-- <p>{{designerList.typeName}}</p> -->
              <img :src="designerList.designerImg" alt="">
              <div>
                <p>作品：<span>{{designerList.caseCount}}</span></p>
                <p>{{designerList.goodField}}</p>
              </div>
            </router-link>

          </div>
        </div>
      </div>
    </div>
    <!-- 设计师结束 -->
    <!-- 设计有保证开始 -->
    <div class="ensure clearfix">
      <p>设计有保证</p>
      <div>
        <dl>
          <dt><img src="../assets/images/home/ensure_img1.png" ></dt>
          <dd>累计完成案例</dd>
        </dl>
        <dl>
          <dt><img src="../assets/images/home/ensure_img2.png" ></dt>
          <dd>服务客户数量</dd>
        </dl>
      </div>
    </div>
    <!-- 设计有保证结束 -->
    <!--设计院 开始-->
    <div class="sjCourtyard">
      <div class="public-titleNew clearfix">
        <h3 class="fl">设计院</h3>
        <span class="fl">50+专业设计院为您服务</span>
        <router-link :to="{ path: 'designInstitute' }" class="fr more-a">更多<img src="../assets/images/home/arrow_icon.png" alt=""></router-link>
      </div>
      <div class="sjyC">
          <div class="designInstitute-list clearfix swiper-wrapper">
            <div class="designInstitute-item fl swiper-slide" v-for="(designInstList,index) in designInstitute" :key="index">
                <router-link :to="{path:'instituteDetail',query:{groupId:designInstList.id}}">
                  <img :src="designInstList.logo" alt="" class="designInstitute-icon">
                  <h3 class="designInstitute-name">{{designInstList.name}}</h3>
                  <p class="designInstitute-num">总销量: <span>{{designInstList.projectCount}}</span></p>
                  <a class="designInstitute-look">查看详情</a>
                </router-link>
            </div>
          </div>
          <!-- <div class="designInstitute-list clearfix swiper-wrapper">
            <div class="designInstitute-item fl swiper-slide" v-for="(designInstList,index) in designInstitute" :key="index">
                <img :src="designInstList.logo" alt="" class="designInstitute-icon">
                <h3 class="designInstitute-name">{{designInstList.name}}</h3>
                <p class="designInstitute-num">总销量: <span>{{designInstList.projectCount}}</span></p>
                <router-link class="designInstitute-look" :to="{path:'instituteDetail',query:{groupId:designInstList.id}}">查看详情</router-link>
            </div>
          </div> -->
      </div>
    </div>
    <!--设计院 结束-->
    <!-- 精选博文内容开始 -->
    <div class="study">
      <div class="public-titleNew clearfix">
        <h3 class="fl">博文</h3>
        <span class="fl">最有价值的设计分享</span>
        <router-link :to="{ path: 'articleList' }" class="fr more-a">更多<img src="../assets/images/home/arrow_icon.png" alt=""></router-link>
      </div>
      <div class="article-list">
        <router-link tag="div" class="article-item clearfix" :to="{path:'articleDetail',query:{ArticleID:articleList.articleId}}" v-for="(articleList,index) in homeArticle" :key="index">
            <img :src="articleList.image" alt="" class="article-img fl">
            <div class="article-con">
              <h4>{{articleList.title}}</h4>
              <!-- <p class="article-style">{{articleList.industrytypename}}</p> -->
              <p class="article-time clearfix">{{articleList.createDate}}<span class="fr article-read"><img src="../assets/images/home/eye_icon.png" alt="">{{articleList.clickCount}}</span></p>
            </div>
        </router-link>

      </div>
    </div>
    <div class="mask" v-show="applyShow">
      <div class="tFrame">
        <div class="close" @click="applyH()"><img src="../assets/images/home/close.png"></div>
        <div class="tkTop">
          <p>您的装修预算为</p>
          <p><span>{{areaNum*40+areaNum*500}}</span>元</p>
          <p>设计费：<span>{{areaNum*40}}</span>元</p>
          <p>施工费：<span>{{areaNum*500}}</span>元</p>
        </div>
        <div class="tkBottom">
          <p>*报价有疑问？稍后温特斯将致电为您解答</p>
          <p>*实际装修费用以现场量房报价方案为准</p>
        </div>
      </div>
    </div>
    <!-- 精选博文内容结束 -->
    <appFooter></appFooter>
    <!--在线咨询-->
    <onLine></onLine>
    <!--返回顶部-->
    <returnHead></returnHead>

  </div>
</template>

<script>
  import appHeader from './app-header'
  import appFooter from '../components/app-footer'
  import onLine from '../components/onLine'
  import returnHead from '../components/returnHead'

  import axios from 'axios'
  import Swiper from 'swiper'
  export default {
    data () {
      return {
        caseData:[],
        workData:[],
        designerListData:[],
        homeArticle:[],
        designInstitute:[],
        caseNav:[    //案例的切换导航
          {title: '办公'},
          {title: '餐饮'},
          {title: '教育'}
        ],
        caseTypeNum:0, //案例当前选中的index值
        designerNav:[  //设计师的切换导航
          {title: '实力推荐'},
          {title: '行业新秀'},
          {title: '最新签单'}
        ],
        designerTypeNum:0, //设计师当前选中的index值
        applyShow:false,
        areaNum:"", //输入的面积
        city:[    //城市
          {title: '北京',id:"12"},
          {title: '南京',id:"15"},
          {title: '合肥',id:"16"},
          {title: '武汉',id:"18"},
          {title: '天津',id:"19"},
          {title: '郑州',id:"20"},
          {title: '重庆',id:"21"},
          {title: '成都',id:"22"},
          {title: '西安',id:"25"},
          {title: '杭州',id:"26"},
          {title: '济南',id:"30"},
          {title: '石家庄',id:"31"},
          {title: '苏州',id:"35"},
          {title: '宁波',id:"36"},
          {title: '上海',id:"38"}
        ],
        industry:[    //行业
          {title: '办公',id:"1"},
          {title: '餐饮',id:"2"},
          {title: '商业',id:"3"},
          {title: '酒店',id:"4"},
          {title: '其他',id:"5"},
          {title: '教育',id:"6"},
          {title: '会所',id:"7"}
        ],
        cityS:false,
        industryS:false,
        cityIndex:0,
        industryIndex:0,
        cityNum:0,
        cityName:"城市",
        industryName:"行业",
        ti: false,
        ti2: false,
        num: 0,
        num2: 0
      }
    },
    components:{
      appHeader,
      appFooter,
      onLine,
      returnHead
    },
    mounted (){
      this.$nextTick(function () {
        this.mySwiper()
        this.homeDeail()
      /*  document.getElementById("tip-apply").addEventListener("click",function () {
          document.documentElement.scrollTop=document.getElementById("estimate").offsetTop
        })*/
      })
    },
    methods:{
      mySwiper:function(){
        //banner图轮播
        var mySwiper1 = new Swiper(".swiperone",{
          pagination: {
            el: '.swiper-pagination'
          },
          direction: 'horizontal',
          initialSlide :1,
          loop: true,
          slidesPerView: "auto",
          centeredSlides:true,
          spaceBetween: 5,
          autoplay: {
            disableOnInteraction: false
          }
        });
        //设计好服务的
        var mySwiper2 = new Swiper(".swipertwo",{
          freeMode : true,
          slidesPerView : 'auto'
        });
      },
      designerSwiper:function(){
        //设计师滑动
        var mySwiper3 = new Swiper(".swiperthree",{
          freeMode : true,
          slidesPerView : 'auto'
        });
      },
      designInsSwiper:function(){
        //设计院滑动
        var mySwiper4 = new Swiper('.sjyC',{
          freeMode : true,
          slidesPerView : 'auto'
        });
      },
      caseSwiper:function(){
        //案例滚动
        var mySwiper1 = new Swiper('.caseswiper',{
          freeMode : true,
          slidesPerView : 'auto'
        });
      },
      caseTab:function(index){
        //案例切换
        this.caseTypeNum=index
        let my_this = this;
        var data = new Object();
        data.ProjectType =index+1;
        this.$http({
          method:'get',
          url:this.apiUrl+'mindex/newIndexCase',
          params:data
        }).then(function(caseData){
          my_this.caseData=caseData.data

          //数据加载完成后执行
          my_this.$nextTick(function(){
            this.caseSwiper();
          })
        }).catch(function(err){
          console.log(err)
        })
      },
      designerTab:function(index){
      //设计师的切换
        this.designerTypeNum=index
        let my_this = this;
        var data = new Object();
        data.shejishi =index+1;
        this.$http({
          method:'get',
          url:this.apiUrl+'mindex/newIndexDesigner',
          params:data
        }).then(function(designerData){
          my_this.designerListData=designerData.data
          //数据加载完成后执行
          my_this.$nextTick(function(){
            this.designerSwiper();
          })
        }).catch(function(err){
          console.log(err)
        })
      },
      homeDeail:function () {
        let my_this = this;
        this.$http({
          method:'get',
          url:this.apiUrl+'mindex/newIndexData'
        }).then(function(homeData){
          my_this.homeArticle=homeData.data.articleList
          my_this.designInstitute=homeData.data.groupList
          my_this.designerListData=homeData.data.designerList
          my_this.caseData=homeData.data.caseList
          //数据加载完成后执行
          my_this.$nextTick(function(){
            this.designInsSwiper();
            this.designerSwiper();
            this.caseSwiper();
          })
        }).catch(function(err){
          console.log(err);
        })
      },
      applyS:function () {
        //点击立即申请立即申请显示

       let phoneNum=document.getElementById("phoneInput").value
        if (phoneNum == ''){
          //console.log("电话号为空")
          this.$layer.msg('电话号未填写');
        }
        else{
          if (phoneNum !== '') {
            var reg=/^1[3456789]\d{9}$/;
            if(!reg.test(phoneNum)){
             this.$layer.msg('请输入正确的手机号');
              //console.log('请输入有效的手机号码')
            }
            else{
              //console.log('手机号码有效')
              this.applyShow = !this.applyShow;
              this.postMes(phoneNum)
            }
          }
        }

      },
      applyH:function () {
        //点击关闭隐藏立即申请
        this.applyShow = false;
      },
      cityShow:function () {
        this.num++;
        if(this.num == 2){
          this.ti= false;
          this.cityS= false;
          this.num= 0;
        }else{
          //点击城市显示弹框
          this.cityS=true;
          this.ti=true;
        }
      },
      industryShow:function () {
        this.num2++;
        if(this.num2 == 2){
          this.ti2= false;
          this.industryS= false;
          this.num2= 0;
        }else{
          //点击行业显示弹框
          this.industryS= true;
          this.ti2=true;
        }
      },
      cityClick:function (index,id) {
        //点击城市的的子项
        this.cityIndex=index
        this.cityS=false
        this.ti=false
        this.cityNum=id
        this.cityName=this.city[index].title
      },
      industryClick:function (index) {
        this.industryIndex=index
        this.industryS=false
        this.ti2=false
        this.industryName=this.industry[index].title
      },
      postMes:function (phoneNum) {
        let my_this = this;
        var data = new Object();
        //地区
        data.diquId=my_this.cityNum;

        //客户提交路径
        data.customerType=7;//7表示手机端
        //面积
        data.projectArea=my_this.areaNum;
        //电话号
        data.customerPhone=phoneNum;
        this.$http({
          method:'post',
          url:this.apiUrl+'saveCustomerMsg',
          params:data
        }).then(function(data){

        }).catch(function(err){
          console.log(err);
        })
      }

    },
    created:function () {
      //点击空白处隐藏城市和行业选中框
      let body = document.querySelector('body')
      body.addEventListener('click',(e)=>{
        if(e.target.id === 'citys'){
         /* this.cityS = true*/
        }else {
          this.num= 0;
          this.cityS = false
          this.ti=false
        }
        if( e.target.id === 'industry'){
          /*this.industryS = true*/
        }else {
          this.num2= 0;
          this.industryS = false
          this.ti2=false
        }
      },false)
    }
  }
</script>

<style scoped>
  @import "../assets/css/home.css";
</style>
<style>
  .banner .swiper-pagination{width: 100%;position: absolute;bottom: .05rem;left: 0;}
  .banner .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active{background: #fff;width: 16px;border-radius: 4px;}
  .banner .swiper-pagination .swiper-pagination-bullet {
    margin:0 .05rem;
  }
</style>

