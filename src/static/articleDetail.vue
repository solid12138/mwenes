<template>
    <div class="mb83">
        <!-- 顶部返回 -->
        <div class="top-back">
          <a @click="back" href="javascript:;" class="back-click"></a>
        </div>
        <!-- 博文内容 -->
        <div class="atricle-con">
          <!-- 博文顶部 -->
          <div class="atricl-top">
            <h3>{{aritcleDetailText.title}}</h3>
            <div class="avatar-box clearfix">
              <!-- 左侧头像 -->
              <div class="fl clearfix">
                <div class="avatar-img fl">
                  <img :src="aritcleDetailText.mavatar" alt="头像" />
                </div>
                <span>{{aritcleDetailText.cardName}}</span>
              </div>
              <!-- 主页按钮 -->
              <div class="fr">
                <router-link href="javascript:;" class="home-click" :to="{path:'/designerDetail',query:{CardNo:aritcleDetailText.cardNo}}">进入主页</router-link>
              </div>
            </div>
            <div class="avatar-bottom">
              <span>{{aritcleDetailText.updateDate}}</span>
              <i></i>
              <span>阅读量&nbsp;<span>{{aritcleDetailText.clickCount}}</span></span>
            </div>
          </div>
          <!-- 博文内容介绍 -->
          <div class="atricle-box">
            <!-- 文字介绍 -->
            <div class="atricle-heade clearfix">
              <div class="fl">
                <img src="../assets/images/article-detail/first-word.png">
              </div>
              <div class="fr">
                <p>{{aritcleDetailText.introduction}}</p>
              </div>
            </div>
            <!-- 图文排列项 -->
            <div class="graphic-box">
              <div class="graphic-item" v-for="imageText in aritcleDetailImgText">
                <!-- 图片 -->
                <div class="graphic-img">
                  <img :src="imageText.originalPath">
                </div>
                <!-- 文本 -->
                <div class="graphic-text">
                  <p>{{imageText.content}}</p>
                </div>
              </div>

            </div>
          </div>
          <!-- 间隔 -->
          <div class="article-gap"></div>
          <!-- 底部 -->
          <div class="atricle-footer">
            <a href="javascript:;" @click="hdhref(aritcleDetailPrev.articleID)" ><span>上一篇：</span>{{aritcleDetailPrev.title}}</a>
            <a href="javascript:;" @click="hdhref(aritcleDetailNext.articleID)" ><span>下一篇：</span>{{aritcleDetailNext.title}}</a>
          </div>
        </div>
      <!--返回顶部-->
      <returnHead></returnHead>
      <!--在线咨询-->
      <onLine></onLine>
    </div>
</template>

<script>
  import returnHead from '../components/returnHead'
  import onLine from '../components/onLine'
    export default {
      data () {
        return {
          loading: false,
          aritcleDetailText:[],
          aritcleDetailImgText:[],
          aritcleDetailPrev:[],
          aritcleDetailNext:[]
        }
      },
      methods:{
        articleDetail:function () {
          let my_this = this;
          var data = new Object();
          data.articleID=my_this.$route.query.ArticleID;
          this.$http({
            method:'get',
            url:this.apiUrl+'mbArticle/articleDetail',
            params:data
          }).then(function(aritcleDetailData){
            my_this.aritcleDetailText=aritcleDetailData.data;
            my_this.aritcleDetailImgText=aritcleDetailData.data.aiList;
            //获取上一篇文章
            if(aritcleDetailData.data.prior==null){
              //如果没有数据的
              my_this.aritcleDetailPrev.articleID="--"
              my_this.aritcleDetailPrev.title="--"
            }
            else{
              my_this.aritcleDetailPrev=aritcleDetailData.data.prior;
            }
            //获取下一篇文章

            if(aritcleDetailData.data.next==null){
              //如果没有数据的
              my_this.aritcleDetailNext.articleID="--"
              my_this.aritcleDetailNext.title="--"
            }
            else{
              my_this.aritcleDetailNext=aritcleDetailData.data.next;
            }

          }).catch(function(err){
            console.log(err);
          })
        },
        //上一篇下一篇跳转页面
        hdhref(articleID) {
          console.log(articleID)
          if(articleID=="--"){
           //没有上一篇或者下一篇
          }
          else{
            this.$router.push({
              path: `/articleDetail/?ArticleID=${articleID}`
            });

            //从新渲染数据
            this.articleDetail();
            document.body.scrollTop = document.documentElement.scrollTop = 0
          }

        },
        back(){
          this.$router.go(-1);//返回上一层
          // this.$router.push({path: "articleList"});
        }
      },
      mounted(){

      },
      components:{
        returnHead,
        onLine
      },
      created:function(){
        this.articleDetail();

      }
    }
</script>

<style scoped>
  @import "../assets/css/article-detail.css";
</style>
