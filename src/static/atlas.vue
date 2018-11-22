<template>
   <div class="mb83">
        <appHeader></appHeader>
        <!-- 分类开始 -->
        <div class="classification">
            <div class="fl-content">
                <ul class="flul">
                    <li v-for="(i,k) in menus" :key="k" :class="{listy:k==fl}" @click="menusOn(k)">
                        <a href="javascript:;" ref="texts">{{i}}</a>
                        <span ref="tfs"></span>
                    </li>
                </ul>
                <div class="lxC" ref="lxc" @click="lxcOn()">
                    <!-- 类型 -->
                    <ul v-if="num==0">
                        <li @click="wholelx()" :class="{listy2:ione==-1}">全部类型</li>
                        <li v-for="(i,k) in types" :class="{listy2:k==ione}" :data-id="i.id" :key="k.id" @click="lxOn($event,k)">{{i.lxname}}</li>
                    </ul>
                    <!-- 行业 -->
                    <ul v-if="num==1">
                        <li @click="wholehy()" :class="{listy2:itwo==-1}">全部行业</li>
                        <li v-for="(i,k) in behaviors" :class="{listy2:k==itwo}" :key="k" @click="hyOn(k)">{{i.lxname}}</li>
                    </ul>
                    <!-- 空间 -->
                    <ul v-if="num==2">
                        <li @click="wholekj()" :class="{listy2:ithree==-1}">全部空间</li>
                        <li v-for="(i,k) in spaces" :class="{listy2:k==ithree}" :key="k" @click="kjOn(k)">{{i.drName}}</li>
                    </ul>
                    <!-- 风格 -->
                    <ul v-if="num==3">
                        <li @click="wholefg()" :class="{listy2:ifour==-1}">全部风格</li>
                        <li v-for="(i,k) in styles" :class="{listy2:k== ifour}" :key="k" @click="fgOn(k)">{{i.styleName}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 分类结束 -->
        <!-- 图集开始 -->
        <div class="atlastart">
            <div class="tj-content">
                <router-link v-for="(i,k) in datas" :key="k" tag="div" :to="{path:'detailsAtlas',query:{orderNo: i.orderNo}}">
                    <a href="javascript:;">
                        <img :src="i.imgUrl" alt="">
                        <p><span>{{i.orderName}}</span></p>
                    </a>
                </router-link>
            </div>
        </div>
        <!-- 图集结束 -->
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
import axios from 'axios'
import Swiper from 'swiper'
import returnHead from '../components/returnHead'
export default {
    data () {
        return {
            fl: -1,
            datas: [],
            loading: true,
            menus: ['类型','行业','空间','风格'],
            types: [],
            behaviors: [],
            spaces: [],
            styles: [],
            num: 0,
            lxnum: 0,
            hynum: 1,
            kjnum: 0,
            tf: true,
            d: 0,
            ione: -1,
            itwo: -1,
            ithree: -1,
            ifour: -1,
            lxtext: '',
            hytext: '',
            kjtext: '',
            fgtext: '',
            showloading: true, //是否显示loading效果
            startPage: 0
        }
    },
    components:{
        appHeader,
        appFooter,
        onLine,
        returnHead
    },
    created:function(){
        this.atlas();
        this.lxsj();
        this.hysj();
        this.kjsj();
        this.fgsj();
    },
    methods:{
        // 返回设计院
        returnsjy (){
            this.$router.push({path: '/designInstitute'});
        },
        //
        //点击遮罩处事件
        lxcOn (){
            // if(event.target == this){
            this.$refs.lxc.style= "display: none";
            this.fl= -1;
            // }
        },
        //分类点击事件
        menusOn (i){
            this.startPage= 0;
            this.$refs.lxc.style= "display: block";
            if(this.tf == true){
                this.num=i;
            }else{
                this.tf= true;
                this.$refs.lxc.style= "display: none";
            }
            this.fl= i;
        },
        empty (){
            this.lxtext= '';
            this.hytext= '';
            this.kjtext= '';
            this.fgtext= '';
            this.ione= -1;
            this.itwo= -1;
            this.ithree= -1;
            this.ifour= -1;
            this.$refs.texts[1].innerText= "行业";
            this.$refs.texts[1].style= "width: 75%; color: #2f2f2f; padding-left: 25%;";
            this.$refs.tfs[1].style= "border-color: #2f2f2f transparent transparent transparent;";
            this.$refs.texts[2].innerText= "空间";
            this.$refs.texts[2].style= "width: 75%; color: #2f2f2f; padding-left: 25%;";
            this.$refs.tfs[2].style= "border-color: #2f2f2f transparent transparent transparent;";
            this.$refs.texts[3].innerText= "风格";
            this.$refs.texts[3].style= "width: 75%; color: #2f2f2f; padding-left: 25%;";
            this.$refs.tfs[3].style= "border-color: #2f2f2f transparent transparent transparent;";
        },
        //全部类型
        wholelx (){
            this.ione= -1;
            this.fl= -1;
            this.$refs.texts[0].innerText= "全部类型";
            this.$refs.texts[0].style= "width: 100%; color: #ce2222; padding-left: 0px; text-align: center";
            this.$refs.tfs[0].style= "border-color: transparent;";
            this.$refs.lxc.style= "display: none";
            this.isActive= false;
            let my_this = this;
            this.empty();
            axios.get(this.apiUrl+"designInstitute/atlasList").then(function(qb){
                my_this.datas= qb.data.ralleryList;
            });
        },
        //全部行业
        wholehy (){
            this.itwo= -1;
            this.fl= -1;
            this.$refs.texts[1].innerText= "全部行业";
            this.$refs.texts[1].style= "width: 100%; color: #ce2222; padding-left: 0px; text-align: center";
            this.$refs.tfs[1].style= "border-color: transparent;";
            this.behaviors[1].lxname= 0;
            this.$refs.lxc.style= "display: none";
            let my_this = this;
            axios.get(this.apiUrl+"designInstitute/atlasList").then(function(qb){
                my_this.datas= qb.data.ralleryList;
            });
        },
        //全部空间
        wholekj (){
            this.ithree= -1;
            this.fl= -1;
            this.$refs.texts[2].innerText= "全部空间";
            this.$refs.texts[2].style= "width: 100%; color: #ce2222; padding-left: 0px; text-align: center";
            this.$refs.tfs[2].style= "border-color: transparent;";
            this.$refs.lxc.style= "display: none";
            let my_this = this;
            axios.get(this.apiUrl+"designInstitute/atlasList").then(function(qb){
                my_this.datas= qb.data.ralleryList;
            });
        },
        //全部风格
        wholefg (){
            this.ifour= -1;
            this.fl= -1;
            this.$refs.texts[3].innerText= "全部风格";
            this.$refs.texts[3].style= "width: 100%; color: #ce2222; padding-left: 0px; text-align: center";
            this.$refs.tfs[3].style= "border-color: transparent;";
            this.$refs.lxc.style= "display: none";
            let my_this = this;
            axios.get(this.apiUrl+"designInstitute/atlasList").then(function(qb){
                my_this.datas= qb.data.ralleryList;
            });
        },
        //类型点击事件
        lxOn (e,i){
            this.empty();
            this.datas= [];
            this.ione= i;
            this.fl= -1;
            this.$refs.lxc.style= "display: none";
            this.hynum= e.target.getAttribute('data-id');
            this.lxtext= this.types[i].lxname;
            this.$refs.texts[0].style= "width: 100%; color: #ce2222; padding-left: 0px; text-align: center";
            this.$refs.tfs[0].style= "border-color: transparent;";
            this.$refs.texts[0].innerText= this.types[i].lxname;
            this.isActive= false;
            this.hysj();
            this.kjsj();
            this.atlas();
        },
        //行业点击事件
        hyOn (i){
            this.datas= [];
            this.itwo= i;
            this.fl= -1;
            this.$refs.lxc.style= "display: none";
            this.hytext= this.behaviors[i].lxname;
            this.$refs.texts[1].style= "width: 100%; color: #ce2222; padding-left: 0px; text-align: center";
            this.$refs.tfs[1].style= "border-color: transparent;";
            this.$refs.texts[1].innerText= this.behaviors[i].lxname;
            this.atlas();
        },
        //空间点击事件
        kjOn (i){
            this.datas= [];
            this.ithree= i;
            this.fl= -1;
            this.$refs.lxc.style= "display: none";
            this.kjtext= this.spaces[i].drName;
            this.$refs.texts[2].style= "width: 100%; color: #ce2222; padding-left: 0px; text-align: center";
            this.$refs.tfs[2].style= "border-color: transparent;";
            this.$refs.texts[2].innerText= this.spaces[i].drName;
            this.atlas();
        },
        //风格点击事件
        fgOn (i){
            this.datas= [];
            this.ifour= i;
            this.fl= -1;
            this.$refs.lxc.style= "display: none";
            this.fgtext= this.styles[i].styleName;
            this.$refs.texts[3].style= "width: 100%; color: #ce2222; padding-left: 0px; text-align: center";
            this.$refs.tfs[3].style= "border-color: transparent;";
            this.$refs.texts[3].innerText= this.styles[i].styleName;
            this.atlas();
        },
        //类型数据获取
        lxsj (){
            let my_this = this;
            axios.get(this.apiUrl+"type/typeInfo?fuId="+my_this.lxnum).then(function(lxdata){
                my_this.types= lxdata.data.typeInfo
            });
        },
        //行业数据获取
        hysj (){
            let my_this = this;
            axios.get(this.apiUrl+"type/typeInfo?fuId="+my_this.hynum).then(function(hydata){
                my_this.behaviors= hydata.data.typeInfo
            });
        },
        //空间数据获取
        kjsj (){
            let my_this = this;
            axios.get(this.apiUrl+"type/findRegionList?projectType="+my_this.kjnum).then(function(kjdata){
                my_this.spaces= kjdata.data.retionList
            });
        },
        //风格数据获取
        fgsj (){
            let my_this = this;
            axios.get(this.apiUrl+"type/styleInfo").then(function(fgdata){
                my_this.styles= fgdata.data.styleInfo
            });
        },
        atlas (){
            this.showloading = true
            let my_this = this;
            axios.get(this.apiUrl+"designInstitute/atlasList?orderType="+my_this.lxtext+"&industryType="+my_this.hytext+"&regionName="+my_this.kjtext+"&imgStyle="+my_this.fgtext+"&startPage="+my_this.startPage).then(function(tjdata){
                for (var i= 0; i < tjdata.data.ralleryList.length; i++) {
                    my_this.datas.push(tjdata.data.ralleryList[i]);
                }
                my_this.showloading = false
            });
        },
        scrollfun (){  //屏幕滚动事件
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            //判断是否滚动到底部
            if (scrollTop + window.innerHeight + 0>= document.body.offsetHeight) { //0 表示距离底部多少的距离的开始触发loadmore效果
                if (!this.showloading) { //防止多次加载
                    this.startPage += 10;
                    this.atlas();
                }
            }
        }
    },
    mounted (){
        var mySwiper_nav1 = new Swiper('.wenHead',{
            slidesPerView : 'auto',
            freeMode : true,
            initialSlide: 4
        })
        //调用屏幕滚动事件
        window.addEventListener('scroll', this.scrollfun); 
    },
    beforeDestroy(){  //离开组件销毁事件
        window.removeEventListener("scroll",this.scrollfun);
    }
}
</script>

<style scoped>
    @import "../assets/css/atlas.css";
</style>
