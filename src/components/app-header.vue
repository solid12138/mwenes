<template>
  <!-- 头部开始 -->
  <header>
      <div class="headTop">
          <p><img src="../assets/images/common/logo.png" alt="" /></p>
          <div class="ipt">
            <a href="#estimate">
            <img src="../assets/images/common/calculator.png" class="offer" alt="" />
            <div id="tip-apply" class="ipt-div">10秒装修报价</div>
           <!-- <input type="text" placeholder="10秒装修报价" id="tip-apply">-->
            </a>
          </div>
          <!-- <div class="sel" @click="city()">
            <span>{{citytit2}}</span>
            <img src="../assets/images/common/dropDown.png" alt="" />
          </div> -->
      </div>
      <div class="headBottom">
          <ul class="clearfix">
            <router-link v-for="(list,index) in navLists" tag="li" :to="list.path" :key="index">{{list.title}}<span></span></router-link>
          </ul>
      </div>
      <div :class="[{closeMask: ft},{xsMask: ft2},'cityMask']" id="cityMask">
        <div class="cityC">
          <div class="cityCt">
            <p>选择您所在地位置</p>
            <ul class="clearfix">
              <li v-for="(t,i) in citys" :key="i" :class="i == v ? 'lis' : ''"  @click="xzcity(i)">{{t}}</li>
            </ul>
          </div>
          <div class="cityCb" @click="qrcity()">确定</div>
        </div>
      </div>
  </header>
  <!-- 头部结束 -->
</template>


<script>
    export default {
      data () {
        return {
          navLists: [
            {path: '/',title: '首页'},
            {path: '/works',title: '案例'},
            {path: '/designerList',title: '设计师'},
            {path: '/designInstitute',title: '设计院'},
            {path: '/atlas',title: '图集'},
            {path: '/aboutUs',title: '我们'}
          ],
          citys: ["北京","南京","合肥","武汉","天津","郑州","重庆","成都","西安","杭州","济南","石家庄","苏州","宁波","上海"],
          v: 0,
          ft: true,
          ft2: false,
          citytit: '北京',
          citytit2: '北京'
        }
      },
    methods:{
      city: function(){
        this.ft= false;
        this.ft2= true;
      },
      xzcity: function(i){
        this.v= i;
        this.citytit= this.citys[i];
      },
      qrcity: function(){
        this.ft2= false;
        this.ft= true;
        this.citytit2= this.citytit;
      }
    },
    created:function () {
      let body = document.querySelector('body')
      body.addEventListener('click',(e)=>{
        if(e.target.id === "cityMask"){
          this.ft= true;
        }else {
          return;
        }
      },false)
    }
  }
</script>

<style scoped>

</style>
