<template>
   <div class="mb83">
        <appHeader></appHeader>
        <!-- 设计所-列表 -->
        <div class="place-box">
            <router-link class="place-item clearfix" v-for="(i,k) in datas" :key="k" :to="{path:'instituteDetail',query:{groupId:i.groupId}}">
                <div class="place-img fl">
                    <img :src="i.groupSmallImg" alt="">
                </div>
                <div class="place-detail fl">
                    <h4>{{i.groupName}}</h4>
                    <h5>专营：<span>{{i.managementType}}</span></h5>
                    <p>
                        <span><em>{{i.nowCount}}</em>个进行中</span>
                        <i></i>
                        <span><em>{{i.allCount}}</em>个总销量</span>
                    </p>
                </div>
            </router-link>
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
import axios from 'axios'
import returnHead from '../components/returnHead'
export default {
    data () {
        return {
            datas: [],
            sjyid: 0,
            className: 'aaa',
            num: 1
            // startPage: 0
        }
    },
    components:{
        appHeader,
        appFooter,
        onLine,
        returnHead
    },
    mounted (){
        // window.addEventListener('scroll', () => {
        //     var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        //     判断是否滚动到底部
        //     if (scrollTop + window.innerHeight + 0>= document.body.offsetHeight) { //0 表示距离底部多少的距离的开始触发loadmore效果
        //         if (!this.showloading) { //防止多次加载
        //             this.startPage += 18;
        //             this.designInstitute();
        //         }
        //     }
        // })
        this.$nextTick(function () {
          this.designInstitute()
        })
    },
    methods:{
        designInstitute:function () {
            let my_this = this;
            axios.get(this.apiUrl+"designInstitute/designInstituteList?startPage="+my_this.startPage).then(function(sjydata){
                my_this.datas= sjydata.data.groupList;
                // for(var i=0;i<sjydata.data.groupList.length;i++){
                //     my_this.datas.push(sjydata.data.groupList[i]);
                // }
            });
        }
    }
}
</script>

<style scoped>
    /* 设计所列表 */
    .place-box{ padding-top: 0.1rem; }
    .place-item{ display: block; padding: 0.2rem 0rem 0.2rem 0.26rem; border-bottom: 1px solid #dfdfdf; }
    .place-img{ width: 1.2rem; height: 1.2rem; }
    .place-img img{ display: block; width: 100%; height: 100%; }
    .place-detail{ margin-left: 0.26rem; padding-top: 0.03rem; }
    .place-detail h4{ font-size: 0.32rem; color: #2f2f2f; line-height: 0.32rem; margin-bottom: 0.21rem; letter-spacing: 0.02rem; }
    .place-detail h5{ width: 4.45rem; font-size: 0.24rem; color: #666666; line-height: 0.26rem; margin-bottom: 0.17rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .place-detail p{ font-size: 0.24rem; color: #666666; line-height: 0.24rem; }
    .place-detail p i{ display: inline-block; width: 0.03rem; height: 0.24rem; background-color: #666666; vertical-align: -0.04rem; margin-left: 0.14rem; margin-right: 0.14rem; }
    h1,h2,h3,h4,h5,h6{font-weight: 400;}
</style>
