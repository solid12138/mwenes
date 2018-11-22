<template>
    <!-- 头部开始 -->
    <header>
        <div class="searcHz" ref="searcHz">
            <input type="text" placeholder="搜索案例或设计师">
            <a href="javascript:;" class="searcH" @click="sou()">
                <img src="../assets/images/common/wenes-search.png" alt="" ref="img">
            </a>
        </div>
        <div class="wenHead">
            <div class="swiper-wrapper">
                <router-link :to="i.type" v-for="(i,k) in data" class="swiper-slide" ref="i" :key="k">{{i.title}}</router-link>
            </div>
        </div>
        <router-view></router-view>
    </header>
    <!-- 头部结束 -->
</template>

<script>
import Swiper from 'swiper'
export default {
    data () {
        return {
            tf: false,
            data: [
                {type: '/',title: '首页'},
                {type: '/works',title: '作品'},
                {type: '/designerList',title: '设计师'},
                {type: '/designInstitute',title: '设计院'},
                {type: '/atlas',title: '图集'},
                {type: '/articleList',title: '博文'},
                {type: '/aboutUs',title: '关于我们'},
                // {type: '/business',title: '业务'}
            ],
            n: 0
        }
    },
    mounted (){
        var mySwiper = new Swiper(".wenHead", {
            slidesPerView : 'auto',
            freeMode : true
        });
    },
    methods: {
        //点击搜索显示弹框
        sou (){
            this.n++;
            if(this.n == 1){
                this.$refs.searcHz.style= 'left:0;padding: 0 0.26rem';
                this.$refs.img.style.left= '0.6rem';
            }else if(this.n == 2){
                this.n=0;
                this.$refs.searcHz.style= 'left:-5rem;padding: 0';
                this.$refs.img.style.left= '50%';
            }
        }
    }
}
</script>

<style scoped>

</style>
