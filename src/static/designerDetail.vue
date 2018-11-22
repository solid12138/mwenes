<template>
<div class="des-detail relative" v-if="isif">
    <!-- 内容 -->
    <!-- 顶部返回 -->
    <div class="top-back">
        <a href="javascript:;" @click="back" class="back-click"></a>
    </div>
    <!-- 设计师介绍 -->
    <div class="introduce-box">
        <!-- 顶部介绍 -->
        <div class="introduce-top clearfix">
            <div class="fl designer-img-div">
                <div class="designer-img">
                    <img :src="mavatar" alt="">
                </div>
            </div>
            <div class="introduce-text">
                <h5>{{dsname}}</h5>
                <ul class="star-box clearfix">
                    <li v-show="1<=StarNums?true:false"><img src="../assets/images/common/star-ico.png" alt=""></li>
                    <li v-show="2<=StarNums?true:false"><img src="../assets/images/common/star-ico.png" alt=""></li>
                    <li v-show="3<=StarNums?true:false"><img src="../assets/images/common/star-ico.png" alt=""></li>
                    <li v-show="4<=StarNums?true:false"><img src="../assets/images/common/star-ico.png" alt=""></li>
                    <li v-show="5<=StarNums?true:false"><img src="../assets/images/common/star-ico.png" alt=""></li>
                </ul>
                <p><span>专营：</span><span>{{goodfield}}</span></p>
                <p><span>擅长：</span><span>{{mstyle}}</span></p>
            </div>
        </div>
        <div class="introduce-cen clearfix">
            <div class="introduce-num fl">
                <h5>{{ casecount }}</h5>
                <p>项目总量</p>
            </div>
            <div class="introduce-num fl">
                <h5>{{ mstar }}</h5>
                <p>评分</p>
            </div>
            <div class="introduce-num fl">
                <h5>{{ysGrade}}</h5>
                <p>等级</p>
            </div>
            <div class="introduce-num fl">
                <h5>{{ subscribeCount }}</h5>
                <p>预约</p>
            </div>
        </div>
    </div>
    <!-- 间隔 -->
    <div class="interval-box"></div>
    <!-- 设计师作品 -->
    <div class="designer-works">
        <div class="works-top-box">
            <div class="works-top clearfix">
                <div v-for="(navSort,index) in navSorts" class="worksTop-item fl" :class="{active:index==actives}" @click="SortClick(index)" :key="index">
                    <p>{{navSort.text}}</p>
                    <i></i>
                </div>
            </div>
        </div>
        <div class="designer-conter">
            <div class="swiper-wrapper">
                <!-- 作品 -->
                <div class="works-box swiper-slide">
                    <router-link v-for="(caselist,index) in caselists" class="works-item fl" :to="{path:'worksDetail',query:{ProjectId:caselist.projectId}}" :key="index">
                        <div class="works-img">
                            <img :src="caselist.mainUrl" alt="">
                        </div>
                        <div class="works-title">
                            <h5>{{ caselist.projectName }}</h5>
                            <p>
                                <span>{{ caselist.ProjectType }}</span>
                                <i></i>
                                <span>{{ caselist.projectArea }}m²</span>
                            </p>
                        </div>
                    </router-link>
                </div>
                <!-- 在施 -->
                <div class="construction swiper-slide">
                    <router-link v-for="(undoneList,index) in undoneLists" href="javascript:;" class="works-item fl" :to="{path:'worksDetail',query:{ProjectId:undoneList.projectId}}" :key="index">
                        <div class="works-img">
                            <img :src="undoneList.mainUrl" alt="">
                        </div>
                        <div class="works-title">
                            <h5>{{undoneList.projectName}}</h5>
                            <p>
                                <span>{{ undoneList.ProjectType }}</span>
                                <i></i>
                                <span>{{undoneList.projectArea}}m²</span>
                            </p>
                        </div>
                    </router-link>
                </div>
                <!-- 评价 -->
                <div class="appraise swiper-slide">
                    <div v-for="(peList,pjindex) in peLists" class="appraise-item" :key="pjindex">
                        <!-- 标题 -->
                        <h5>{{peList.projectName}}</h5>
                        <!-- 星级详情 -->
                        <div class="appraise-top clearfix">
                            <!-- 星级 -->
                            <ul class="star-box appraise-star clearfix fl">
                                <li v-show="2<=peList.totalScore?true:false"><img src="../assets/images/common/star-ico.png"></li>
                                <li v-show="4<=peList.totalScore?true:false"><img src="../assets/images/common/star-ico.png"></li>
                                <li v-show="6<=peList.totalScore?true:false"><img src="../assets/images/common/star-ico.png"></li>
                                <li v-show="8<=peList.totalScore?true:false"><img src="../assets/images/common/star-ico.png"></li>
                                <li v-show="10<=peList.totalScore?true:false"><img src="../assets/images/common/star-ico.png"></li>
                            </ul>
                            <!-- 平方 -->
                            <p class="fr">
                                <span>{{peList.projectArea}}m²</span>
                                <i></i>
                                <span>{{peList.projectType}}</span>
                            </p>
                        </div>
                        <!-- 评价内容 -->
                        <div class="appraise-text">
                            <p>{{peList.evalute}}</p>
                        </div>
                        <!-- 图片展示 -->
                        <div class="appraise-ImgBox clearfix">
                            <div v-for="(data,index) in peList.imgList" class="appraise-img fl" :key="index">
                                <img :src='data' :preview="pjindex" alt="">
                            </div>
                        </div>
                        <!-- 竣工时间 -->
                        <div class="completion clearfix">
                            <p class="fl">竣工：<span>{{peList.createTime}}</span></p>
                            <p class="fr">{{peList.completionDate}}</p>
                        </div>
                    </div>

                </div>
                <!-- 博文 -->
                <div class="article swiper-slide">
                    <router-link v-for="(article,index) in articles" href="javascript:;" class="article-item clearfix" :to="{path:'articleDetail',query:{ArticleID:article.articleID}}" :key="index">
                        <!-- 图片 -->
                        <div class="article-img fl">
                            <img :src="article.image" alt="">
                        </div>
                        <!-- 标题 -->
                        <div class="article-title fl">
                            <h4>{{article.title}}</h4>
                            <h5>{{article.projectTypeName}}-{{article.industryTypeName}}</h5>
                            <p>{{article.updateDate}}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <!-- 底部 -->
    <div class="designer-footer">
        <div class="fl acreage">
            <p>¥ {{designtariffs}}/㎡</p>
        </div>
        <a href="http://pht.zoosnet.net/LR/Chatpre.aspx?id=PHT99019346&lng=cn" class="fr reserve-btn">预约设计</a>
    </div>
    <!-- 加载图标 -->
    <div class="loading-box" v-show="loadingbox"></div>
    <returnHead></returnHead>
</div>
</template>


<script>
import Swiper from "swiper"
import returnHead from '../components/returnHead'
export default {
    data() {
        return {
            mavatar: "", //设计师头像
            dsname: "", //设计师姓名
            goodfield: "", //设计师专营
            mstyle: "", // 设计师擅长
            casecount: "", // 案例,作品数量
            mstar: "", //设计师评分
            ysGrade: "", //设计师等级
            subscribeCount: "", //设计师预约
            designtariffs: "", //设计师价格
            deSorts: [],
            navSorts: [
                { text: "作品()" },
                { text: "在施()" },
                { text: "评价()" },
                { text: "博文()" }
            ],
            actives: "", //顶部nav当前选中元素索引
            swipers: "",
            caselists: [], //作品列表
            undoneLists: [], //在施工列表
            peLists: [], //评价列表
            totalScore: "", //评价列表评分
            createTimes: "", //评价时间
            articles: [], //博文列表
            showlaoding: true,
            startPage: 0,
            ZsPage: 0,
            bowenPage: 0,
            loadingbox: true,
            isif: true,
        };
    },
    components:{
        returnHead
    },
  methods: {
    //标题点击切换到指定swiper页面
    SortClick: function(index) {
      this.swipers.slideTo(index);
    },
    // 初始化Swiper-插件
    tabsSwiper: function() {
      var my_this = this;
      // 初始化Swiper-插件
      var tabsSwiper = new Swiper(".designer-conter", {
        speed: 100,
        // autoHeight: true,
        on: {
          slideChangeTransitionStart: function() {
            my_this.actives = this.activeIndex;
            // my_this.startPage = "";
          }
        }
      });
      this.swipers = tabsSwiper;
    },
    //获取设计师详情数据
    worksDetail: function() {
        let my_this = this;
        var data = new Object();
        data.cardNo = my_this.$route.query.CardNo;
        this.$http({
            method: "get",
            url: this.apiUrl+"mindex/findMember",
            params: data
        })
        .then(function(res) {
            my_this.loadingbox=false;
            //设计师头像设置
            my_this.mavatar = res.data.memberInfo.memberMsg.mavatar;
            // 设计师姓名
            my_this.dsname = res.data.memberInfo.memberMsg.mname;
            // 设计师专营
            my_this.goodfield = res.data.memberInfo.memberMsg.industryType;
            // 设计师擅长
            my_this.mstyle = res.data.memberInfo.memberMsg.style;
            // 项目数量
            my_this.casecount = res.data.memberInfo.memberMsg.casecount;
            // 设计师评分
            my_this.mstar = res.data.memberInfo.memberMsg.mstar;
            // 设计师等级
            my_this.ysGrade = res.data.memberInfo.memberMsg.ysGrade;
            // 设计师预约
            my_this.subscribeCount = res.data.memberInfo.memberMsg.subscribeCount;
            // 设计师价格
            my_this.designtariffs = res.data.memberInfo.memberMsg.designtariff;

            //为nav标题附加案例数量
            my_this.navSorts[0].text = `作品(${my_this.casecount})`; //作品数量
            my_this.navSorts[1].text = `在施(${res.data.memberInfo.memberMsg.constructioncount})`; //在施数量
            my_this.navSorts[2].text = `评价(${res.data.memberInfo.memberMsg.evaluateCount})`; //评价数量
            my_this.navSorts[3].text = `博文(${res.data.memberInfo.memberMsg.articleCount})`; //博文数量

            // 设计师评价信息数据赋值
            my_this.peLists = res.data.peList;
            my_this.createTimes = res.data.peList.completionDate;
            //console.log(res.data.peList[0].imgList)
            


        })
        .catch(function(err) {
            console.log(err);
        });
    },
    //获取设计师作品列表
    GetCaselist: function(starpagenum) {
      this.showlaoding = true;
      let my_this = this;
      var data = new Object();
      data.cardNo = my_this.$route.query.CardNo;
    //   console.log(starpagenum)
      data.startPage = starpagenum;
      this.$http({
        method: "get",
        url: this.apiUrl+"mindex/findOverCaseList",
        params: data
      }).then(function(res) {
        // my_this.caselists = res.data.caseList;

        for (let i = 0; i < res.data.caseList.length; i++) {
            my_this.caselists.push(res.data.caseList[i]);
        }
        my_this.showlaoding = false

      });
    },
    //获取设计师在施工
    GetUndoneLists: function(ZsPageNum){
        this.showlaoding = true;
        let my_this = this;
        var data = new Object();
        data.cardNo = my_this.$route.query.CardNo;
        data.startPage = ZsPageNum;
        // console.log(ZsPageNum)
        this.$http({
            method: "get",
            url: this.apiUrl+"mindex/findApplicationCaseList",
            params: data
        }).then(function(res) {
            // my_this.caselists = res.data.caseList;
            // 在施工列表数据
            // my_this.undoneLists = res.data.undoneList;
            for (let i = 0; i < res.data.caseList.length; i++) {
                my_this.undoneLists.push(res.data.caseList[i]);
            }
            my_this.showlaoding = false

        });
    },
    //获取博文列表
    GetArticle: function(bowenPageNum){
        this.showlaoding = true;
        let my_this = this;
        var data = new Object();
        data.cardNo = my_this.$route.query.CardNo;
        data.startPage = "0";
        this.$http({
            method: "get",
            url: this.apiUrl+"mindex/findArticleMsgList",
            params: data
        }).then(function(res) {
            // console.log(res);
            //博文列表对象赋值
            for (let i = 0; i < res.data.length; i++) {
                my_this.articles.push(res.data[i]);
            }
        });
    },
    //返回事件
    back(){
        this.$router.go(-1);//返回上一层
        //window.history.back()
        //window.history.go(-1)
        // this.$router.push({path: "designerList"});
    },
    //屏幕滚动事件
    scrollfun: function(){
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        //判断是否滚动到底部
        if (scrollTop + window.innerHeight + 0>= document.body.offsetHeight) { //0 表示距离底部多少的距离的开始触发loadmore效果
            if (!this.showlaoding) { //防止多次加载
                var num = this.actives+1;
                //判断当前处于哪个列表
                if(num=="1"){
                    //加载作品列表
                    var starNum = this.startPage+=6;
                    this.GetCaselist(starNum);
                } else if(num=="2"){
                    //加载在施列表
                    var ZsPageNum = this.ZsPage+=6;
                    this.GetUndoneLists(ZsPageNum);
                } else if(num=="4"){
                    //加载博文列表
                    var bowen = this.bowenPage+=4;
                    this.GetArticle(bowen);
                }
            }
        }
    }
  },
  computed:{  // 计算属性
    StarNums:function(){
        var num = this.mstar;
        var numArr = num.split("",1);
        return numArr.toString();
    },
    // 评价时间计算
    createTime:function(){
        var num2 = this.createTimes;
        // var numstr = num2.split(" ");
        return num2;
    }
  },
  created: function() {
    //设计师信息数据获取
    this.worksDetail();
    //设计师作品列表
    this.GetCaselist();
    //设计师施工列表
    this.GetUndoneLists();
    // 设计师博文列表获取
    this.GetArticle();
  },
  mounted() {
    // 调用swiper方法
    this.tabsSwiper();
    // swiper更新
    this.swipers.update();

    // 注册scroll事件并监听
    window.addEventListener('scroll',this.scrollfun);
  },
  beforeDestroy(){
      window.removeEventListener("scroll",this.scrollfun);
      this.isif=false;
  }
};
</script>


<style scoped>
    @import "../assets/css/designer-detail.css";
</style>
