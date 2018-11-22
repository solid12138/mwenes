<template>
   <div class="mb83">
        <appHeader></appHeader>
        <!-- 分类开始 -->
        <div class="classification">
            <div class="fl-content">
                <ul class="flul" >
                    <li v-for="(articleMenusText,index) in articleMenus" :key="articleMenusText" :class="{listy:index == islisty}"  @click="classifyClick(index)" ref="articleLi">
                      <a href="javascript:;"  :id="'articleSon'+index">{{articleMenusText}}</a>
                      <span :id="'triangle'+index"></span>
                    </li>
                </ul>
                <div class="lxC" ref="articlefilter" @click.stop="filterHide()">
                    <!-- 类型 -->
                  <ul  v-if="num==0">
                    <li :class="{ listy2:0 == islisty1 }" @click="spaceTypeClick($event,0,0)">全部类型</li>
                    <li v-for="(spaceTypeTexts,index) in spaceTypeText" :class="{ listy2:index+1 == islisty1 }" :data-id="spaceTypeTexts.id"  @click="spaceTypeClick($event,index+1,spaceTypeTexts.id)" :key="index">{{spaceTypeTexts.lxname}}</li>
                  </ul>

                    <!-- 行业 -->
                    <ul v-if="num==1">
                        <li :class="{ listy2:0 == islisty2}" @click="industryTypeClick($event,0)" >全部行业</li>
                        <li v-for="(industryTypeTexts,index) in industryTypeText" :class="{ listy2:index+1 == islisty2 }" :data-id="industryTypeTexts.id" @click="industryTypeClick($event,index+1,industryTypeTexts.id)" :key="index">{{industryTypeTexts.lxname}}</li>
                    </ul>
                    <!-- 风格 -->
                    <ul  v-if="num==2">
                        <li :class="{ listy2:0 == islisty3}" @click="styleTypeClick($event,0)" >全部风格</li>
                        <li v-for="(styleTypeTexts,index) in styleTypeText" :class="{ listy2:index+1 == islisty3 }" :data-id="styleTypeTexts.styleName" @click="styleTypeClick($event,index+1,styleTypeTexts.styleName)" :key="index">{{styleTypeTexts.styleName}}</li>

                    </ul>
                    <!-- 分类 -->
                    <ul  v-if="num==3">
                        <li :data-id="decorateMenusText.search" v-for="(decorateMenusText,index) in decorateMenus" :key="decorateMenusText.name" :class="{listy2:index == islisty4}"  @click="decorateClick($event,index,decorateMenusText.search)">{{decorateMenusText.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 分类结束 -->
        <!-- 设计师排行 -->
        <div class="ranking-box">
            <div class="ranking-top">
                <img src="../assets/images/article-list/Ranking-ico.png" alt="">
                <span>活跃度排行</span>
            </div>
            <div class="ranking-content clearfix">
                <div class="ranking-item fl" v-for="(activityRanks,index) in activityRank " :key="index">
                  <router-link :to="{path:'designerDetail',query:{CardNo:activityRanks.cardNo}}">
                    <div class="raking-img">
                        <img :src="activityRanks.mavatar" alt="">
                    </div>
                    <div class="raking-text">
                        <p>{{activityRanks.cardName}}</p>
                    </div>
                  </router-link>
                </div>

            </div>
        </div>
        <!-- 博文-列表 -->
        <div class="article">
            <router-link class="article-item clearfix" v-for="(articleLists,index) in articleListText" :to="{path:'articleDetail',query:{ArticleID:articleLists.articleID}}" :key="index">
                <!-- 图片 -->
                <div class="article-img fl">
                    <img :src="articleLists.image" alt="">
                </div>
                <!-- 标题 -->
                <div class="article-title fl">
                    <h4>{{articleLists.title}}</h4>
                    <h5>{{articleLists.projectType}}-{{articleLists.industryType}}</h5>
                    <p>{{articleLists.createDate}}</p>
                </div>
            </router-link>
        </div>
        <div class="nomore-div" v-if="noMoreShow">没有数据了！</div>
        <div class="nodata-div" v-if="noDataShow"><img src="../assets/images/common/no-data.png" alt=""></div>
        <appFooter></appFooter>
         <!--在线咨询-->
         <onLine></onLine>
        <returnHead></returnHead>
    </div>
</template>

<script>
import appHeader from '../components/app-header'
import appFooter from '../components/app-footer'
import onLine from '../components/onLine'
import returnHead from '../components/returnHead'
import Swiper from 'swiper'
export default {
    data () {
        return {
          num: 0,
          tf: true,
          //一级筛选
          articleMenus: ['类型','行业','风格','分类'],
          //全部分类
          decorateMenus:[
            {
              search:"",
              name:"全部分类"
            },
            {
              search:"装修指南",
              name:"装修指南"
            },
            {
              search:"装修流程",
              name:"装修流程"
            },
            {
              search:"装修风水",
              name:"装修风水"
            },
            {
              search:"前沿设计",
              name:"前沿设计"
            },
          ],
          // 空间类型
          spaceTypeText:[],
          //控制点击选中样式
          islisty: -1,
          islisty1: 0,
          islisty2: 0,
          islisty3: 0,
          islisty4: 0,
          //选中的空间筛选类型值
          spaceNum: 0,
          //选中的行业筛选类型值
          industryNum: 0,
          //选中的风格筛选类型值
          styleNum:"",
          //选中的分类筛选类型值
          decorateNum:"",
          //行业类型
          industryTypeText:[],
          //风格类型
          styleTypeText:[],
          //活跃度的排名
          activityRank:[],
          //博文列表
          articleListText:[],
          showlaoding: true, //是否显示loading效果
          startPage: 0, //分页
          noMoreShow:false,//没有更多数据了
          noDataShow:false//切换没有数据了

        }
    },
    components:{
        appHeader,
        appFooter,
        onLine,
        returnHead
    },
    methods:{
      //点击上面筛选显示筛选框
      classifyClick:function(i){
        this.islisty=i;
        this.$refs.articlefilter.style= "display: block";
        this.$refs.articleLi[i].setAttribute("class","listy");
        this.$refs.articleLi[i].firstChild.style="color:#ce2222";
        if(this.tf == true){
          this.num=i;
        }else{
          this.tf= true;
          this.$refs.articlefilter.style= "display: none";
        }
      },
      //加载空间类型
      spaceType:function(){
        let my_this = this;
        var data = new Object();
        this.$http({
          method:'get',
          url:this.apiUrl+'type/typeInfo',
          params:data
        }).then(function(spaceType){
          //console.log(spaceType)
          my_this.spaceTypeText=spaceType.data.typeInfo;

        }).catch(function(err){
          console.log(err);
        })
      },
      //点击空间类型
      spaceTypeClick:function (even,index,id) {
        this.articleListText=[];//清空数据
        this.islisty1=index;
        this.spaceNum=id;
        this.$refs.articlefilter.style= "display: none";
        //添加选中的字节
        document.getElementById("articleSon0").innerHTML=even.target.innerHTML;
        document.getElementById("articleSon0").style="color:#ce2222";
        //去掉三角
        if(document.getElementById("triangle0")){
          document.getElementById("triangle0").style= "display: none";
        }
        //行业默认选中全部行业
        this.islisty2=0
        this.industryNum= 0,
        document.getElementById("articleSon1").innerHTML="行业";
        document.getElementById("articleSon1").style="color:#2f2f2f";
        document.getElementById("triangle1").style= "display: inline-block";
        //默认风格选择全部风格
        this.islisty3=0
        this.styleNum="";
        document.getElementById("articleSon2").innerHTML="风格";
        document.getElementById("articleSon2").style="color:#2f2f2f";
        document.getElementById("triangle2").style= "display: inline-block";
        //默认分类选择全部分类
        this.islisty4=0
        this.decorateNum="";
        document.getElementById("articleSon3").innerHTML="分类";
        document.getElementById("articleSon3").style="color:#2f2f2f";
        document.getElementById("triangle3").style= "display: inline-block";
        //添加选择后的样式
        document.getElementById("articleSon0").parentNode.setAttribute("class","listyNew");
        //加载行业类型
        this.industryType(id)
        //加载列表数据
        this.articleListFilter();
        this.startPage=0;
      },
      //加载行业类型
      industryType:function(id){
        //index代表当前选中元素的index值，id是表示当前选中的data-id值
        let my_this = this;
        var data = new Object();
        if(id==0){
          id=1
        }
        data.fuId=id,
        this.$http({
          method:'get',
          url:this.apiUrl+'type/typeInfo',
          params:data
        }).then(function(industryType){
          //console.log(industryType)
          my_this.industryTypeText=industryType.data.typeInfo;
        }).catch(function(err){
          console.log(err);
        })
      },
      //加载点击行业类型
      industryTypeClick:function(even,index,id){
        this.articleListText=[];//清空数据
        this.islisty2=index;
        this.industryNum=id;
        this.$refs.articlefilter.style= "display: none";
        //添加选中的字节
        document.getElementById("articleSon1").innerHTML=even.target.innerHTML;
        document.getElementById("articleSon1").style="color:#ce2222";
        //去掉三角
        if(document.getElementById("triangle1")){
          document.getElementById("triangle1").style= "display: none";
        }
        //默认风格选择全部风格
        this.islisty3=0
        this.styleNum="";
        document.getElementById("articleSon2").innerHTML="风格";
        document.getElementById("articleSon2").style="color:#2f2f2f";
        document.getElementById("triangle2").style= "display: inline-block";

        //默认分类选择全部分类
        this.islisty4=0
        this.decorateNum="";
        document.getElementById("articleSon3").innerHTML="分类";
        document.getElementById("articleSon3").style="color:#2f2f2f";
        document.getElementById("triangle3").style= "display: inline-block";
        //添加选择后的样式
        document.getElementById("articleSon1").parentNode.setAttribute("class","listyNew");
        //加载列表数据
        this.articleListFilter();
        this.startPage=0;
      },
      //加载风格类型
      styleType:function(){
        let my_this = this;
        var data = new Object();
        this.$http({
          method:'get',
          url:this.apiUrl+'type/styleInfo',
          params:data
        }).then(function(styleType){
          my_this.styleTypeText=styleType.data.styleInfo;
         // console.log(styleType.data.styleInfo)
        }).catch(function(err){
          console.log(err);
        })
      },
      //点击风格类型
      styleTypeClick:function(even,index,id){
        this.articleListText=[];//清空数据
        this.islisty3=index;
        this.styleNum=id;
        this.$refs.articlefilter.style= "display: none";
        //添加选中的字节
        document.getElementById("articleSon2").innerHTML=even.target.innerHTML;
        document.getElementById("articleSon2").style="color:#ce2222";
        //去掉三角
        if(document.getElementById("triangle2")){
          document.getElementById("triangle2").style= "display: none";
        }
        //添加选择后的样式
        document.getElementById("articleSon2").parentNode.setAttribute("class","listyNew");

        //加载列表数据
        this.articleListFilter();
        this.startPage=0;
      },
      //点击分类类型
      decorateClick:function(even,index,id){
        this.articleListText=[];//清空数据
        this.islisty4=index;
        this.decorateNum=id;
        this.$refs.articlefilter.style= "display: none";
        //添加选中的字节
        document.getElementById("articleSon3").innerHTML=even.target.innerHTML;
        document.getElementById("articleSon3").style="color:#ce2222";
        //去掉三角
        if(document.getElementById("triangle3")){
          document.getElementById("triangle3").style= "display: none";
        }
        //添加选择后的样式
        document.getElementById("articleSon3").parentNode.setAttribute("class","listyNew");
        //加载列表数据
        this.articleListFilter();
        this.startPage=0;
      },
      //默认展示活跃度和列表展示
      articleList:function () {
        let my_this = this;
        this.$http({
          method:'get',
          url:this.apiUrl+'mbArticle/articleList'
        }).then(function(articleList){
          //console.log(articleList);
          //活跃度的排名
          my_this.activityRank=articleList.data.designerList;
        }).catch(function(err){
          console.log(err);
        })
      },
      //筛选时展示活跃度和列表展示
      articleListFilter:function (starpagenum) {
        this.showlaoding = true
        let my_this = this;
        var data = new Object();
        //空间
        data.projectType=my_this.spaceNum;
        //行业
        data.industryType=my_this.industryNum;
        //风格
        data.keywords=my_this.styleNum;
        //类型
        data.type=my_this.decorateNum;
        data.startPage = starpagenum;
        this.$http({
          method:'get',
          url:this.apiUrl+'mbArticle/findArticleList',
          params:data
        }).then(function(articleList){

          //列表
          for (let i = 0; i < articleList.data.length; i++) {
            my_this.articleListText.push(articleList.data[i]);
          }
         // my_this.articleListText=articleList.data;
          my_this.showlaoding = false
        }).catch(function(err){
          console.log(err);
        })
      },
      //点击空白处隐藏筛选框
      filterHide:function () {
        this.$refs.articlefilter.style="display: none";
      },
      scrollfun: function () {  //屏幕滚动事件
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        //判断是否滚动到底部
        if (scrollTop + window.innerHeight + 0>= document.body.offsetHeight) { //0 表示距离底部多少的距离的开始触发loadmore效果
          if (!this.showlaoding) { //防止多次加载
            this.articleListFilter(this.startPage += 4);
          }
        }
      }
    },
    mounted (){
      // 注册scroll事件并监听
      window.addEventListener('scroll', this.scrollfun);
      //swiper 初始化
      var mySwiper_nav1 = new Swiper('.wenHead',{
        slidesPerView : 'auto',
        freeMode : true,
        initialSlide: 4
      })

    },
    updated:function(){
      if(this.articleListText.length<4){
        if(this.articleListText.length==0){
          //如果没有数据滚动
          this.noDataShow=true;
          this.noMoreShow=false;
        }
        else{
          //如果有数据滚动
          this.noMoreShow=true;
          this.noDataShow=false;
        }
      }
      else{
        this.noMoreShow=false;
        this.noDataShow=false;
      }
      //console.log("内容高度:"+document.getElementById("app").offsetHeight+"窗口高度:"+window.screen.height)
      if(document.getElementById("app").offsetHeight+45>window.screen.height){
        document.getElementById("footer").setAttribute("class","footer")
      }
      else{
        document.getElementById("footer").setAttribute("class","footer footer-fixed")
      }
    },
    created:function(){
      //空间类型
      this.spaceType();
      //行业类型
      this.industryType(1);
      //风格类型
      this.styleType();
      //加载活跃度排名数据
      this.articleList();
      //加载博文列表数据
      this.articleListFilter();

    },
    beforeDestroy(){  //离开组件销毁事件
        window.removeEventListener("scroll",this.scrollfun);
    }
}
</script>

<style scoped>
  @import "../assets/css/article-list.css";
</style>

