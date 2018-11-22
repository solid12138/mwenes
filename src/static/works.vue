<template>
   <div  class="mb83">
        <appHeader></appHeader>
            <!-- 空间类型内容 -->
            <div class="classification">
                <div class="fl-content">
                    <ul class="flul">
                        <li @click="sortClick()" :class="{ listy:islisty }">
                            <a href="javascript:;" >{{ SortText }}</a>
                            <span></span>
                        </li>
                    </ul>
                    <div class="lxC" v-show="isSort" @click="hideMask">
                        <ul v-show="isSort">
                            <li v-for="(SortList,index) in SortArr" :key="index" @click="GenreClick(index)" :class="{ listy2:index == islisty2 }" v-show="index!=5">{{ SortList.text }}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 空间案例 -->
            <div class="shadow"></div>
            <div class="space-case">
                <div class="space-case-box clearfix">
                    <router-link class="space-item fl" v-for="(Project,index) in Projects" :key="index" :to="{path:'worksDetail',query:{ProjectId:Project.projectid}}">
                        <div class="space-img">
                            <img v-bind:src="Project.mainurl" alt="">
                        </div>
                        <div class="space-text">
                            <h5>{{ Project.projectname }}</h5>
                            <p>
                                <span class="span-one">{{ Project.ProjectTypeName }}</span>
                                <i>|</i>
                                <span>{{ Project.projectarea }}m²</span>
                            </p>
                        </div>
                    </router-link>
                </div>
                <div class="loding-box" v-show="!showlaoding">
                    <i></i>
                </div>
            </div>
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
export default {
    data () {
        return {
            isSort: false,
            SortArr:[
                {'text':'所有空间'},
                {'text':'办公空间'},
                {'text':'餐饮空间'},
                {'text':'商业空间'},
                {'text':'酒店空间'},
                {'text':'其他空间'},
                {'text':'教育空间'},
                {'text':'会所空间'}
            ],
            SortText: "所有空间",
            islisty: false,
            islisty2: this.$route.query.ProjectType,
            Projects:[],
            //list: [],//数据
            page: 1,//页码
            showlaoding: true, //是否显示loading效果
            startPage: 0,
        }
    },
    components:{
        appHeader,
        appFooter,
        onLine,
        returnHead
    },
    created:function(){
        this.get();

    },
    methods:{
      sortClick(){  //是否显示多个类型
          if(this.isSort == true){
              this.isSort = false;
              this.islisty = false;
          } else {
              this.isSort = true;
              this.islisty = true;
          }
      },
      GenreClick(index){  //点击选择类型
          this.islisty2=index;
          this.isSort = false;
          this.SortText = this.SortArr[index].text;
          this.Projects=[];
          this.get();
          this.startPage=0;
      },
      get(starpagenum){
          this.showlaoding = true
          let my_this = this;
          var data = new Object();
          data.ProjectType = this.islisty2;
          data.startPage = starpagenum;
          this.$http({
              method:'get',
              url:this.apiUrl+'mindex/caseListByPage',
              params:data
          }).then(function(res){
              //console.log(res)
              for (let i = 0; i < res.data.length; i++) {
                  my_this.Projects.push(res.data[i]);
              }
              my_this.showlaoding = false
          }).catch(function(err){
              console.log(err)
          })
      },
      scrollfun(){  //屏幕滚动事件
          var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          //判断是否滚动到底部
          if (scrollTop + window.innerHeight + 100>= document.body.offsetHeight) { //0 表示距离底部多少的距离的开始触发loadmore效果
              if (!this.showlaoding) { //防止多次加载
                  this.get(this.startPage += 8);
              }
          }
      },
      hideMask(){
          this.isSort = false;
          this.islisty = false;
      }
    },
    mounted (){
        // 注册scroll事件并监听
        window.addEventListener('scroll',this.scrollfun)
      if(this.$route.query.ProjectType!=null){
        this.SortText=this.SortArr[this.$route.query.ProjectType].text
      }

    },
    beforeDestroy(){
        window.removeEventListener("scroll",this.scrollfun);
    },
}
</script>


<style scoped>
    @import "../assets/css/works.css";
</style>
