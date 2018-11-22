<template>
    <div>
    <!-- 顶部返回 -->
    <div class="top-back">
        <a href="javascript:;" class="back-click" @click="returnsjy()"></a>
    </div>
    <!-- 设计所介绍 -->
    <div class="introduce-box">
        <!-- 顶部介绍 -->
        <div class="introduce-top clearfix">
            <div class="fl">
                <div class="designer-img">
                    <img :src="sjy.groupSmallImg" alt="">
                </div>
            </div>
            <div class="fl introduce-text">
                <h5>{{sjy.groupName}}</h5>
                <ul class="star-box clearfix" ref="xings">
                    <li v-if="stars>=1"><img src="../assets/images/common/star-ico.png"></li>
                    <li v-if="stars>=2"><img src="../assets/images/common/star-ico.png"></li>
                    <li v-if="stars>=3"><img src="../assets/images/common/star-ico.png"></li>
                    <li v-if="stars>=4"><img src="../assets/images/common/star-ico.png"></li>
                    <li v-if="stars>=5"><img src="../assets/images/common/star-ico.png"></li>
                </ul>
                <p><span>专营：</span><span>{{sjy.specializeField}}</span></p>
                <p><span>擅长：</span><span>{{sjy.styleTypeField}}</span></p>
            </div>
        </div>
        <!-- 设计所介绍 -->
        <div class="introduce-cen clearfix">
            <div class="introduce-num fl">
                <h5>{{sjy.nowCount}}</h5>
                <p>进行中</p>
            </div>
            <div class="introduce-num fl">
                <h5>{{sjy.monthCount}}</h5>
                <p>月完成</p>
            </div>
            <div class="introduce-num fl mr26">
                <h5>9.0</h5>
                <p>评分</p>
            </div>
            <div class="introduce-num fl">
                <h5>{{sjy.avgDays}}</h5>
                <p>平均周期(天)</p>
            </div>
        </div>
        <!-- 设计所收入 -->
        <div class="ds-income clearfix">
            <div class="fl">
                <img src="../assets/images/institute-detail/dollar.png" alt="">
                <span>累计收入</span>
            </div>
            <div class="fr">
                <h5>{{sjy.allMoney}}</h5>
                <p>成交{{sjy.allCount}}笔</p>
            </div>
        </div>
    </div>
    <!-- 间隔 -->
    <div class="interval-box"></div>
    <!-- 设计所作品 -->
    <div class="designer-works">
        <div class="works-top-box">
            <div class="works-top clearfix">
                <div v-for="(navSort,index) in navSorts" class="worksTop-item fl" :class="{active:index==actives}" @click="SortClick(index)" :key="index">
                    <p>{{navSort.text}}({{ index == 0 ? anli : pingjia }})</p>
                    <i></i>
                </div>
            </div>
        </div>
        <div class="designer-conter">
            <div class="swiper-wrapper">
                <!-- 作品 -->
                <div class="works-box swiper-slide">
                    <router-link class="works-item fl" v-for="(i,k) in tj" :to="{path:'worksDetail',query:{ProjectId:i.projectId}}" :key="k">
                        <div class="works-img">
                            <img :src="i.projectUrl" alt="">
                        </div>
                        <div class="works-title">
                            <h5>{{i.projectName}}</h5>
                            <p>
                                <span>{{i.projectType}}</span>
                                <i></i>
                                <span>{{i.projectArea}}m²</span>
                            </p>
                        </div>
                    </router-link>
                </div>
                <!-- 评价 -->
                <div class="appraise swiper-slide">
                    <!-- 顶部评价类型 -->
                    <div class="raise-top clearfix">
                        <div class="genre-box" ref="zk">
                            <div class="genre-item" v-for="(i,k) in datas.tagNameAndCount" :key="k">{{i.tagName}}({{i.tagCount}})</div>
                        </div>
                        <div :class="[{active: tr},'genre-more']" @click="genreMore()">
                            <div class="genre-click">
                                <i></i>
                            </div>
                        </div>
                    </div>
                    <!-- 评价内容 -->
                    <div class="appraise-item" v-for="(i,k) in pj" :key="k">
                        <div class="appraise-inBox clearfix">
                            <div class="ds-avatar fl">
                                <img :src="i.ddeDesignerHeadUrl" alt="">
                            </div>
                            <!-- 标题 -->
                            <h5 class="fl">Jackson</h5>
                            <!-- 星级详情 -->
                            <div class="appraise-top fl clearfix">
                                <!-- 星级 -->
                                <ul class="star-box clearfix fl">
                                    <li v-if="i.ddeStar>=1"><img src="../assets/images/common/star-ico.png"></li>
                                    <li v-if="i.ddeStar>=2"><img src="../assets/images/common/star-ico.png"></li>
                                    <li v-if="i.ddeStar>=3"><img src="../assets/images/common/star-ico.png"></li>
                                    <li v-if="i.ddeStar>=4"><img src="../assets/images/common/star-ico.png"></li>
                                    <li v-if="i.ddeStar>=5"><img src="../assets/images/common/star-ico.png"></li>
                                </ul>
                                <!-- 平方 -->
                                <p class="fr">交易金额：<span>{{i.orderMoney}}</span></p>
                            </div>
                        </div>

                        <!-- 评价内容 -->
                        <div class="appraise-text">
                            <p>{{i.desDesignerEvaluateTags}}</p>
                        </div>
                        <!-- 图片展示 -->
                        <div class="appraise-ImgBox clearfix group">
                            <div class="appraise-img fl img-click" v-for="(ii,kk) in i.xgImgList" :key="kk">
                                <img :src="ii" data-click="true" data-height="190" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 底部 -->
    <div class="designer-footer">
        <div class="fl acreage">
            <p>¥ {{sjy.diPrice}}/㎡</p>
        </div>
        <a href="http://pht.zoosnet.net/LR/Chatpre.aspx?id=PHT99019346&lng=cn" class="fr reserve-btn">立即下单</a>
    </div>
    <returnHead></returnHead>
    </div>
</template>

<script>
import appHeader from '../components/app-header'
import axios from 'axios'
import Swiper from 'swiper'
import returnHead from '../components/returnHead'
export default {
    data () {
        return {
            datas: [],
            sjy: [],
            tj: [],
            pj: [],
            stars: 5,
            navSorts: [
                { text: "案例" },
                { text: "评价" }
            ],
            anli: "",
            pingjia: '',
            actives: 0,
            swipers: "",
            showloading: 0,
            tr: false,
            startPage: 0,
            ZsPage: 0,
            caselist: [{}]
        }
    },
    components:{
        appHeader,
        returnHead
    },
    methods:{
        SortClick: function(index){
            this.swipers.slideTo(index);
        },
        tabsSwiper:function(){
            var my_this = this;
            // 初始化Swiper-插件
            var tabsSwiper = new Swiper(".designer-conter", {
                speed: 100,
                on: {
                    slideChangeTransitionStart: function() {
                        my_this.actives = this.activeIndex;
                    }
                }
            })
            this.swipers = tabsSwiper;
        },
        // 评价隐藏内容展示
        genreMore (){
            if(this.tr == false){
                this.tr= true;
                this.$refs.zk.style= "height: auto";
            }else{
                this.tr= false;
                this.$refs.zk.style= "height: 1.2rem";
            }
        },
        // 返回设计院
        returnsjy (){
            this.$router.go(-1);//返回上一层
        },
        instituteDetail: function(){
            let my_this = this;
            axios.get(this.apiUrl+"designInstitute/designInstituteInfo?groupId="+my_this.$route.query.groupId+"&startPage="+my_this.alys).then(function(xqdata){
                my_this.datas= xqdata.data
                my_this.sjy= xqdata.data.groupInfo
                my_this.stars= xqdata.data.groupInfo.ddeStar
                my_this.anli= xqdata.data.groupInfo.allCount
                my_this.pingjia= xqdata.data.groupInfo.evaluateCount
            });
        },
        //案例
        cases: function(){
            let my_this = this;
            axios.get(this.apiUrl+"designInstitute/findCaseListById?groupId="+my_this.$route.query.groupId+"&startPage="+my_this.startPage).then(function(anlisj){
                my_this.caselist = anlisj.data.caseList;
                // console.log(anlisj.data.msg)
                // console.log(my_this.caselist)
                if(anlisj.data.msg!="未知异常，请联系管理员"){
                    for(let i=0;i<my_this.caselist.length;i++){
                        my_this.tj.push(my_this.caselist[i]);
                    }
                }
            });
        },
        //评价
        evaluate: function(){
            var my_this = this;
            axios.get(this.apiUrl+"designInstitute/findEvaluteById?groupId="+my_this.$route.query.groupId+"&startPage="+this.ZsPage).then(function(pjsj){
                for(let i=0;i<pjsj.data.evaluteList.length;i++){
                    my_this.pj.push(pjsj.data.evaluteList[i]);
                }
            });
        },
        scrollfun: function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            //判断是否滚动到底部
            if (scrollTop + window.innerHeight + 0>= document.body.offsetHeight) { //0 表示距离底部多少的距离的开始触发loadmore效果
                if (!this.showloading) { //防止多次加载
                    var num = this.actives+1;
                    //判断当前处于哪个列表
                    if(num=="1"){
                        //加载案例列表
                        this.startPage+=6;
                        this.cases();
                    } else if(num=="2"){
                        //加载评价列表
                        this.ZsPage+=10;
                        this.evaluate();
                    }
                }
            }
        }
    },
    mounted (){
        this.$nextTick(function () {
            this.instituteDetail();
            this.cases();
            this.evaluate();
        });
        // 调用swiper方法
        this.tabsSwiper();
        // swiper更新
        this.swipers.update();

        // 注册scroll事件并监听
        window.addEventListener('scroll',this.scrollfun);
    },
    beforeDestroy(){
        window.removeEventListener("scroll",this.scrollfun);
    },
    
}
</script>

<style scoped>
    @import "../assets/css/institute-detail.css";
</style>
