<template>
  <div>
    <appHeader></appHeader>
    <!-- 轮播图区域开始 -->
    <div class="wenBanner" id="wenBanner">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><a href="javascript:;"><img src="../assets/images/homePage/wenes-banner02.png" alt=""></a></div>
                <div class="swiper-slide"><a href="javascript:;"><img src="../assets/images/homePage/wenes-banner01.png" alt=""></a></div>
                <div class="swiper-slide"><a href="javascript:;"><img src="../assets/images/homePage/wenes-banner03.png" alt=""></a></div>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
    <!-- 轮播图区域结束 -->
    <!-- 作品标题（公用）开始 -->
    <div class="public-title">
        <ul>
            <li><a href="javascript:;">作品</a></li>
            <li><router-link :to="{path:'works'}">更多</router-link></li>
        </ul>
    </div>
    <!-- 标题结束 -->
    <!-- 作品内容开始 -->
    <div class="worksC">
        <div class="zp-content">
            <div v-for="i in datas.caseList" :key="i.projectid">
                <router-link :to="{path:'worksDetail',query:{ProjectId:i.projectid}}" key="">
                    <img :src="i.mainurl" alt="">
                    <b>{{i.projectname}}</b>
                    <p><span>{{i.industrytypename}}</span>|<span>{{i.projectarea}}㎡</span></p>
                </router-link>
            </div>
        </div>
    </div>
    <!-- 作品内容结束 -->
    <!-- 设计师标题（公用）开始 -->
    <div class="public-title">
        <ul>
            <li><a href="javascript:;">设计师</a></li>
            <li><router-link :to="{path:'designerList'}">更多</router-link></li>
        </ul>
    </div>
    <!-- 标题结束 -->
    <!-- 设计师内容开始 -->
    <div class="designer">
        <div class="sjs-content">
            <div v-for="i in datas.designerList" :key="i.designerCard">
                <router-link :to="{path:'designerDetail',query:{CardNo:i.designerCard}}">
                    <p>{{i.DiquName}}</p>
                    <img :src="i.designerImg" alt="" />
                    <p>
                        <span>{{i.designerName}}</span>
                        <span>{{i.DiquName}}</span>
                    </p>
                </router-link>
            </div>
        </div>
    </div>
    <!-- 设计师内容结束 -->
    <!-- 设计院标题（公用）开始 -->
    <div class="public-title">
        <ul>
            <li><a href="javascript:;">设计院</a></li>
            <li><router-link :to="{path:'designInstitute'}" href="javascript:;">更多</router-link></li>
        </ul>
    </div>
    <!-- 标题结束 -->
    <!-- 设计院内容开始 -->
    <div class="designInstitute">
        <div class="sjy-content">
            <ul class="designInstitute-ul swiper-wrapper clearfix">
                <li class="swiper-slide" v-for="i in datas.groupList" :key="i.id">
                    <router-link :to="{path:'instituteDetail',query:{groupId:i.id}}" >
                        <img :src="i.MainUrl" alt="">
                        <p><img :src="i.logo" alt="">{{i.name}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
    <!-- 设计院内容结束 -->
    <!-- 精选博文标题（公用）开始 -->
    <div class="public-title">
        <ul>
            <li><a href="javascript:;">精选博文</a></li>
            <li><router-link :to="{path:'articleList'}">更多</router-link></li>
        </ul>
    </div>
    <!-- 标题结束 -->
    <!-- 精选博文内容开始 -->
    <div class="boWen">
        <div class="bw-content">
            <div v-for="i in datas.articleList" :key="i.ArticleID">
                <router-link :to="{path:'articleDetail',query:{ArticleID:i.ArticleID}}">
                    <img :src="i.image" alt="">
                    <p>{{i.title}}</p>
                    <ul>
                        <li>{{i.industrytypename}}</li>
                        <li>{{i.create_date}}</li>
                    </ul>
                </router-link>
            </div>
        </div>
    </div>
    <!-- 精选博文内容结束 -->
    <!-- 量房内容开始 -->
    <div class="volumeRoom">
        <div class="lf-content">
            <ul class="liangul">
                <li>量房·设计·报价</li>
                <li>AMOUNT  DESIGN  PRICE</li>
            </ul>
            <input type="text" placeholder="姓名" v-model="clientName">
            <input type="text" placeholder="联系方式" v-model="clientPhone">
            <button @click="submit">立即预约</button>
            <p>
                <span>多家知名企业 全国连锁供应商</span>
                <span>一站式装修 整体解决方案提供商</span>
            </p>
            <div>
                <img src="../assets/images/homePage/qr-code.jpg" alt="">
                <ul>
                    <li>咨询热线：</li>
                    <li>400-158-6798</li>
                    <li>18401258202</li>
                </ul>
            </div>
        </div>
    </div>
    <!-- 量房内容结束 -->
  </div>
</template>

<script>
import appHeader from './app-header-old'
import axios from 'axios'
import Swiper from 'swiper'
export default {
    data () {
        return {
            datas: [],
            clientName: "",
            clientPhone: ""
        }
    },
    components:{
        appHeader
    },
    mounted (){
        this.$nextTick(function () {
          this.worksDetail()
        })
    },
    methods:{
        mySwiper:function(){
            var mySwiper = new Swiper('.swiper-container',{ //banner图片轮播
                pagination: {
                    el: '.swiper-pagination'
                },
                direction: 'horizontal',
                initialSlide :1,
                autoplay: true,//可选选项，自动滑动
                loop: true,
                slidesPerView: "auto",
                centeredSlides:true,
                spaceBetween: 5
            });
        },
        mySwiper1:function(){ //设计院滑动
            var mySwiper1 = new Swiper('.sjy-content',{
                autoplay: false,//可选选项，自动滑动
                loop: false,
                slidesPerView: "auto",
                spaceBetween: 0
            });
        },
        worksDetail:function () {
            let my_this = this;
            axios.get(this.apiUrl+"mindex/indexData").then(function(homedata){
                my_this.datas= homedata.data;
                my_this.$nextTick(function(){
                    my_this.mySwiper(); //banner图片轮播
                    my_this.mySwiper1(); //设计院轮播图
                });
            });
        },
        submit:function(){ //点击提交按钮事件执行
            let my_this = this;
            if(this.clientName!=""&&(/^[1][3,4,5,6,7,8][0-9]{9}$/).test(this.clientPhone)){
                const params = new URLSearchParams();
                params.append('customerType', '7');
                params.append('customerName', my_this.clientName);
                params.append('customerPhone', my_this.clientPhone);
                axios.post('http://www.wenes.cn/saveCustomerMsg', params)
                .then(function (response) {
                    my_this.clientName="";
                    my_this.clientPhone="";
                    alert("提交信息成功，请静等工作人员联系！");
                })
                .catch(function (error) {
                    console.log(error);
                });
            } else {
                alert("姓名或手机号格式有误，请查验后重新提交！")
            }
        }
    }
}
</script>

<style scoped>
    @import "../assets/css/homepage.css";
</style>
<style>
    #wenBanner .swiper-pagination-bullet{ width: .08rem; height: .08rem; background: #b2b2b2; margin: .05rem; }
    #wenBanner .swiper-pagination .swiper-pagination-bullet-active{ width:  .1rem; height: .1rem; background: #666; margin: .04rem .05rem; }
    #wenBanner .swiper-container { width: 5.88rem; height: 3.6rem; overflow: visible!important; }
</style>
