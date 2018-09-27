<template>
  <div>
    <div class="mine-head-container">
      <div class="mine-head-img-container">
        <div>
          <img src="../assets/image/tmp/head2.jpg">
        </div>
        <span>唐悠悠</span>
      </div>
      <div class="mine-head-info">
        <div>
          <div>{{integration}}</div>
          <div><div class="integration-icon"></div>积分</div>
        </div>  
        <div>
          <div>{{coupon}}</div>
          <div><div class="coupon-icon"></div>优惠券</div>
        </div>  
      </div>
    </div>
    <div class="mine-info-list">
      <div @click="pageTo('studentList')" class="mine-type-item">
        <div class="mine-type-icon mine-type-my-student-icon"></div>
        <div class="mine-type-text">学生管理</div>
        <div class="mine-type-right">></div> 
      </div>
    </div>
    <div class="mine-info-list">
      <div @click="pageTo('')" class="mine-type-item">
        <div class="mine-type-icon mine-type-my-honor-icon"></div>
        <div class="mine-type-text">荣誉证书</div>
        <div class="mine-type-right">></div> 
      </div>
    </div>
    <div class="mine-info-list">
      <div @click="pageTo('mineSetting')" class="mine-type-item">
        <div class="mine-type-icon mine-type-my-userinfo-icon"></div>
        <div class="mine-type-text">设置</div>
        <div class="mine-type-right">></div> 
      </div>
    </div>
    <div class="mine-info-list">
      <div @click="pageTo('')" class="mine-type-item">
        <div class="mine-type-icon mine-type-my-about-icon"></div>
        <div class="mine-type-text">关于</div>
        <div class="mine-type-right">></div> 
      </div>
    </div>            
  </div>
</template>

<script>
  export default {
    name: "mine",
    data(){
      return {
        integration: 1000,
        coupon: 8
      }
    },
    methods: {
      pageTo(to){
        this.$router.push({path: "/mine/" + to});
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../utils/mixin.styl'
  head-icon-size = 0.293333rem
  mine-type-size = 0.72rem
  
  .brand
    background-repeat: no-repeat
    vertical-align: top
  .head-icon-div
    width: head-icon-size
    height: head-icon-size 
    display: inline-block
    margin-right: 0.066667rem
    background-size: head-icon-size head-icon-size

  .mine-head-container
    height: 4.266667rem
    margin: 0.266667rem 0.346667rem
    background-color: #FBD959
    border-radius: 0.106667rem  
    .mine-head-img-container  
      text-align: center
      border-top: 1px solid transparent;
      margin-bottom: 0.533333rem
      >div
        width: 1.333333rem
        height: 1.333333rem
        border: 0.026667rem solid white
        border-radius: 50%
        margin: 0.4rem auto 0.133333rem
        img
          border: none
          width: 1.333333rem
          height: 1.333333rem          
          border-radius: 50%
          
      span
        font-size: 14px
        font-weight: bolder
        color: #333333
    
    .mine-head-info
      display: flex
      justify-content: space-around
      >div
        text-align: center
        >div:nth-child(1)
          font-size: 14px
          font-weight: bolder
          margin-bottom: 0.066667rem
        >div:nth-child(2)
          line-height: 12px
          
      .integration-icon
        @extends .brand
        @extends .head-icon-div
        bg-image('../assets/image/icon/Group')  
      
      .coupon-icon
        @extends .brand
        @extends .head-icon-div
        bg-image('../assets/image/icon/icon-my-discount')    
        
  .mine-type-item                  
    height: 1.746667rem
    margin: 0 0.48rem
    border-bottom: 1px solid #e8e8e8
    line-height: 1.746667rem
    position: relative
    padding: 0 0.133333rem
    >div
      display: inline-block
    .mine-type-icon
        @extends .brand
        background-size: mine-type-size mine-type-size
        width: mine-type-size
        height: mine-type-size 
        position: relative
        top: 0.533333rem
    .mine-type-my-student-icon
      bg-image('../assets/image/icon/icon-my-student-management')
      
    .mine-type-my-honor-icon
      bg-image('../assets/image/icon/icon-my-certificate-of-honor')
      
    .mine-type-my-userinfo-icon
      bg-image('../assets/image/icon/icon-my-userinfo')
      
    .mine-type-my-about-icon
      bg-image('../assets/image/icon/icon-my-about')                  
      
    .mine-type-text,.mine-type-right
      font-size: 14px
      color: #333333
    .mine-type-right
      float: right
</style>