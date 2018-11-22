<template>
  <!-- 底部咨询开始 -->
  <div class="consultation clearfix">
    <div>
      <a href="tel:400-158-6798">
        <img src="../assets/images/common/tel.png" />
        <span>电话咨询</span>
      </a>
    </div>
    <div>
      <a href="http://pht.zoosnet.net/LR/Chatpre.aspx?id=PHT99019346&lng=cn">
        <img src="../assets/images/common/message.png" />
        <span>在线咨询</span>
      </a>
    </div>
  </div>
  <!-- 底部咨询结束 -->
</template>

<script>
    export default {
        name: "advisory"
    }
</script>

<style scoped>
  /* 底部咨询start */
  .consultation{
    width: 100%;
    height: .82rem;
    border-top: 1px solid #f5f5f5;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: -.01rem;
    z-index: 1000;
  }
  .consultation div{
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    float: left;
  }
  .consultation div a{
    width:100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .consultation div:first-child{
    border-right: 1px solid #f5f5f5;
  }
  .consultation div img{
    width: .32rem;
    height: .32rem;
    padding-right: .22rem;
  }
  .consultation div span{
    color: #2f2f2f;
    font-size: .26rem;
  }
  /* 底部咨询end */
</style>
