<template>
   <div class="mb83">
        <appHeader></appHeader>
        <!-- 分类开始 -->
        <div class="classification">
            <div class="fl-content">
                <ul class="flul">
                    <li v-for="(i,k) in SortInfos" :key="k" :class="{listy:k==fl}" @click="sortClick(k)">
                        <a href="javascript:;" ref="texts">{{i.text}}</a>
                        <span ref="tfs"></span>
                    </li>
                </ul>
                <div class="lxC" ref="lxc" v-show="isShow"  @click="filterHide()">
                    <!-- 类型 -->
                    <ul v-if="SortIndex==0">
                        <li @click="QuanBu()" :class="{listy2:islisty==-1}">全部类型</li>
                        <li v-for="(i,k) in SortArr" :class="{listy2:k==islisty}" :data-id="i.id" :key="k.id" @click="GenreClick($event,k)">{{i.lxname}}</li>
                    </ul>
                    <!-- 地区 -->
                    <ul v-if="SortIndex==1">
                        <li @click="QuanBu2()" :class="{listy2:islisty2==-1}">全部地区</li>
                        <li v-for="(i,k) in genres" :class="{listy2:k==islisty2}" @click="GenreClick2(k)" :key="k">{{i.diquName}}</li>
                    </ul>
                    <!-- 风格 -->
                    <ul v-if="SortIndex==2">
                        <li @click="QuanBu3()" :class="{listy2:islisty3==-1}">全部风格</li>
                        <li v-for="(i,k) in regions" :class="{listy2:k==islisty3}" @click="GenreClick3(k)" :key="k">{{i.styleName}}</li>
                    </ul>
                    <!-- 资费 -->
                    <ul v-if="SortIndex==3">
                        <li v-for="(i,k) in zifei" :class="{listy2:k== islisty4}" @click="GenreClick4(k)" :key="k">{{i.text}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 分类结束 -->
        <!-- 设计师内容开始 -->
        <div class="sjsC"  >
            <router-link v-for="(i,k) in datas" :key="k" tag="div" :to="{path: 'designerDetail',query:{CardNo: i.cardNo}}">
                <a href="javascript:;">
                    <img :src="i.mavatar" alt="">
                    <ul>
                        <li>{{i.mname}}</li>
                        <li>{{i.industryType}}</li>
                        <li>{{i.goodField}}</li>
                        <li><span>{{i.casecount}}套作品</span>|<span>{{i.constructioncount}}个在施</span>|<span>{{i.evaluateCount}}个评论</span></li>
                    </ul>
                </a>
            </router-link>
        </div>
        <!-- 设计师内容结束 -->
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
import axios from 'axios'
import Swiper from 'swiper'
export default {
    data () {
        return {
            fl: -1,
            c:1,
            datas: [],
            SortText: "",
            isSort: true,
            SortInfos: [
                {'text':'类型'},
                {'text':'地区'},
                {'text':'风格'},
                {'text':'资费'}
            ],
            SortIndex:'',
            SortIndex2:'',
            SortArr:[],
            genres:[],
            regions:[],
            zifei:[
                {'text':'全部资费'},
                {'text':'50-100元'},
                {'text':'100-200元'},
                {'text':'200-300元'},
                {'text':'300-400元'},
                {'text':'400-500元'}
            ],
            islisty: -1,
            islisty2: -1,
            islisty3: -1,
            islisty4: -1,
            lx: '',
            dq: '',
            fg: '',
            zf: '',
            startPage: 0,
            showloading: true,//是否显示loading效果
            isShow: false,
            shownum: ''
        }
    },
    components:{
        appHeader,
        appFooter,
        onLine,
        returnHead
    },
    created() {
        this.designerList();
        this.leixing();//类型
        this.genress();//地区
        this.fenge();//风格
    },
    methods:{
        // 清空参数
        empty(){
             this.lx= '',
             this.dq= '',
             this.fg= '',
             this.zf= ''
        },
        //类型点击
        sortClick(i){  //是否显示多个类型SortIndex
            this.startPage= 0;
            // this.$refs.lxc.style= "display: block";
            if(this.isSort == true){
                this.SortIndex=i;
            }else{
                this.isSort= true;
                // this.$refs.lxc.style= "display: none";
            }

            var index = i;
            if(index === this.shownum){
                this.isShow = false;
                this.shownum = "";
            }else{
                this.isShow = true;
                this.shownum = index;
            }

            this.fl= i;
        },
        GenreClick(e,i){  //点击类型
            this.fl= -1;
            this.islisty= i;
            this.islisty2=-1;
            this.islisty3= -1;
            this.islisty4= 0;
            this.datas= [];
            this.dq='';
            this.fg='';
            this.zf='';
            this.SortInfos[0].text=this.SortArr[i].lxname;
            this.lx= e.target.getAttribute('data-id');
            // this.$refs.lxc.style= "display: none";
            //this.empty();
            this.designerList();
            this.$refs.texts[0].style= "width: 100%; color: #ce2222; padding-left: 0px; text-align: center";
            this.$refs.tfs[0].style= "border-color: transparent;";
            this.SortInfos[1].text= '地区';
            this.SortInfos[2].text= '风格';
            this.SortInfos[3].text= '资费';
            this.$refs.texts[1].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            this.$refs.tfs[1].style= "border-color: #2f2f2f transparent transparent transparent;";
            this.$refs.texts[2].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            this.$refs.tfs[2].style= "border-color: #2f2f2f transparent transparent transparent;";
            this.$refs.texts[3].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            this.$refs.tfs[3].style= "border-color: #2f2f2f transparent transparent transparent;";
            this.isShow = false;
        },
        GenreClick2(i){  //点击地区
            this.fl= -1;
            // this.islisty=0;
            this.islisty2=i;
            this.islisty3= -1;
            this.islisty= -1;
            this.islisty4= 0;
            this.datas= [];
            this.fg='';
            this.zf='';
            this.SortInfos[1].text= this.genres[i].diquName;
            this.dq= this.genres[i].diquId;
            // this.$refs.lxc.style= "display: none";
            //this.empty();
            this.designerList();
            this.$refs.texts[1].style= "width: 100%; color: #ce2222; padding-left: 0px; text-align: center";
            this.$refs.tfs[1].style= "border-color: transparent;";
            //  this.SortInfos[0].text= '类型';
            this.SortInfos[2].text= '风格';
            this.SortInfos[3].text= '资费';
            // this.$refs.texts[0].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            // this.$refs.tfs[0].style= "border-color: #2f2f2f transparent transparent transparent;";
            this.$refs.texts[2].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            this.$refs.tfs[2].style= "border-color: #2f2f2f transparent transparent transparent;";
            this.$refs.texts[3].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            this.$refs.tfs[3].style= "border-color: #2f2f2f transparent transparent transparent;";
            this.isShow = false;

        },
        GenreClick3(i){  //点击风格
            this.fl= -1;
            this.islisty=-1;
            this.islisty3=i;
            this.islisty2=-1;
            this.islisty4= 0;
            this.datas= [];
            this.zf='';
            this.SortInfos[2].text= this.regions[i].styleName;
            this.fg= this.regions[i].styleName;
            // this.$refs.lxc.style= "display: none";
            this.designerList();
            this.$refs.texts[2].style= "width: 100%; color: #ce2222; padding-left: 0px; text-align: center";
            this.$refs.tfs[2].style= "border-color: transparent;";
            //  this.SortInfos[1].text= '地区';
            //   this.SortInfos[0].text= '类型';
            this.SortInfos[3].text= '资费';
            // this.$refs.texts[1].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            // this.$refs.tfs[1].style= "border-color: #2f2f2f transparent transparent transparent;";
            // this.$refs.texts[0].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            // this.$refs.tfs[0].style= "border-color: #2f2f2f transparent transparent transparent;";
            this.$refs.texts[3].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            this.$refs.tfs[3].style= "border-color: #2f2f2f transparent transparent transparent;";
            //  this.$refs.sanjiao.style= "display: none";
            this.isShow = false;

        },
        GenreClick4(i){  //点击资费
            this.fl= -1;
            this.islisty=-1;
            this.islisty4= i;
            this.islisty3=-1;
            this.islisty2=-1;
            this.datas= [];
            this.SortInfos[3].text= this.zifei[i].text;
            this.zf= i;
            // this.$refs.lxc.style= "display: none";
            this.$refs.texts[3].style= "width: 100%; color: #ce2222; padding-left: 0px; text-align: center";
            this.$refs.tfs[3].style= "border-color: transparent;";
            //  this.SortInfos[1].text= '地区';
            //   this.SortInfos[2].text= '风格';
            //   this.SortInfos[0].text= '类型';
            // this.$refs.texts[1].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            // this.$refs.tfs[1].style= "border-color: #2f2f2f transparent transparent transparent;";
            // this.$refs.texts[2].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            // this.$refs.tfs[2].style= "border-color: #2f2f2f transparent transparent transparent;";
            // this.$refs.texts[0].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            // this.$refs.tfs[0].style= "border-color: #2f2f2f transparent transparent transparent;";
            this.empty();
            this.designerList();
            this.isShow = false;
        },
        QuanBu(){
            this.fl= -1;
            this.islisty= -1;
            this.datas= [];
            this.lx='';
            this.dq='';
            this.fg='';
            this.zf='';
            // this.$refs.lxc.style= "display: none";
            this.SortInfos[0].text= '全部类型';
            this.SortInfos[1].text= '地区';
            this.SortInfos[2].text= '风格';
            this.SortInfos[3].text= '资费';
            this.$refs.texts[0].style= "width: 100%; color: #ce2222; padding-left: 0px; text-align: center";
            this.$refs.tfs[0].style= "border-color: transparent;";
            this.designerList();
            this.$refs.texts[1].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            this.$refs.tfs[1].style= "border-color: #2f2f2f transparent transparent transparent;";
            this.$refs.texts[2].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            this.$refs.tfs[2].style= "border-color: #2f2f2f transparent transparent transparent;";
            this.$refs.texts[3].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            this.$refs.tfs[3].style= "border-color: #2f2f2f transparent transparent transparent;";
        },
        QuanBu2(){
            this.fl= -1;
            this.islisty2= -1;
            this.islisty3= -1;
            this.islisty= -1;this.islisty4= -1;
            this.datas= [];
              this.dq='';
               this.fg='';
            this.zf='';
            // this.$refs.lxc.style= "display: none";
            // this.SortInfos[0].text= '类型';
            this.SortInfos[1].text= '全部地区';
            this.SortInfos[2].text= '风格';
            this.SortInfos[3].text= '资费';
            this.$refs.texts[1].style= "width: 100%; color: #ce2222; padding-left: 0px; text-align: center";
            this.$refs.tfs[1].style= "border-color: transparent;";
            this.designerList();
            // this.$refs.texts[0].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            // this.$refs.tfs[0].style= "border-color: #2f2f2f transparent transparent transparent;";
            this.$refs.texts[2].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            this.$refs.tfs[2].style= "border-color: #2f2f2f transparent transparent transparent;";
            this.$refs.texts[3].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            this.$refs.tfs[3].style= "border-color: #2f2f2f transparent transparent transparent;";
        },
        QuanBu3(){
            this.fl= -1;
            this.datas= [];
              this.fg='';
              this.zf='';
            // this.$refs.lxc.style= "display: none";
            // this.SortInfos[0].text= '类型';
            // this.SortInfos[1].text= '地区';
            this.SortInfos[2].text= '全部风格';
            this.SortInfos[3].text= '资费'
            this.$refs.texts[2].style= "width: 100%; color: #ce2222; padding-left: 0px; text-align: center";
            this.$refs.tfs[2].style= "border-color: transparent;";
            this.designerList();
            // this.$refs.texts[1].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            // this.$refs.tfs[1].style= "border-color: #2f2f2f transparent transparent transparent;";
            // this.$refs.texts[0].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            // this.$refs.tfs[0].style= "border-color: #2f2f2f transparent transparent transparent;";
            this.$refs.texts[3].style= "width: 100%; color: #2f2f2f; padding-left: 0px; text-align: center";
            this.$refs.tfs[3].style= "border-color: #2f2f2f transparent transparent transparent;";
        },
        designerList () {
            this.showloading = true
            let my_this = this;
            axios.get(this.apiUrl+"mindex/designerList?projectType="+my_this.lx+"&marea="+my_this.dq+"&goodfield="+my_this.fg+"&ls_DesignFee="+my_this.zf+"&startPage="+my_this.startPage).then(function(desigerdata){
                for (let i = 0; i < desigerdata.data.length; i++) {
                    my_this.datas.push(desigerdata.data[i]);
                }
                //console.log(my_this.lx,",",my_this.dq,",",my_this.fg,",",my_this.zf);
                my_this.showloading = false;
            })
        },
        designerList2 () {
            this.showloading = true
            let my_this = this;
            axios.get(this.apiUrl+"mindex/designerList?projectType=").then(function(desigerdata){
                my_this.datas= desigerdata.data;
            });
        },
        // 地区
        genress:function () {
            let my_this = this;
            axios.get(this.apiUrl+"type/diquInfo").then(function(diqu){
                my_this.genres= diqu.data.diquInfo
            });
        },
        // 类型
        leixing:function () {
            let my_this = this;
            axios.get(this.apiUrl+"type/typeInfo?fuId=0").then(function(lxdata){
                my_this.SortArr= lxdata.data.typeInfo;
            });
        },
        // 风格
        fenge:function () {
            let my_this = this;
            axios.get(this.apiUrl+"type/styleInfo").then(function(fgdata){
                my_this.regions= fgdata.data.styleInfo;
            });
        },
        filterHide(){
            //console.log(this.$refs.lxc);
            // this.$refs.lxc.style="display: none";
        },
        scrollfun(){  //屏幕滚动事件
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            //判断是否滚动到底部
            if (scrollTop + window.innerHeight + 0>= document.body.offsetHeight) { //0 表示距离底部多少的距离的开始触发loadmore效果
                if (!this.showloading) { //防止多次加载
                    this.startPage += 6;
                    this.designerList();
                }
            }
        }
    },
    mounted (){  //调用屏幕滚动事件
        window.addEventListener('scroll', this.scrollfun);
    },
    beforeDestroy(){  //离开组件销毁事件
        window.removeEventListener("scroll",this.scrollfun);
    }
}
</script>






<style scoped>
    @import "../assets/css/designerlist.css";
</style>
