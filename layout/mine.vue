<template>
  <div>
    <div class="mine-head-container">
      <div class="mine-head-img-container">
        <div>
          <img :src="userHead">
        </div>
        <div>
          <span>{{userName || "姓名"}}</span>
          <div class="icon-student-management-modification-white" @click="pageTo('mineEditInfo')"></div>
        </div>
      </div>
      <div class="mine-head-info">
        <div>
          <div>{{score}}</div>
          <div><div class="integration-icon"></div>积分</div>
        </div>  
        <div @click="pageTo('coupon')">
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
      <div @click="pageTo('honors')" class="mine-type-item">
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
      <div @click="pageTo('about')" class="mine-type-item">
        <div class="mine-type-icon mine-type-my-about-icon"></div>
        <div class="mine-type-text">关于</div>
        <div class="mine-type-right">></div>
      </div>
    </div>            
  </div>
</template>

<script>
  import { UserDefaultHeadImg } from '../utils/constant.js'
  export default {
    name: "mine",
    data(){
      return {

      }
    },
    methods: {
      pageTo(to){
        if(to == "mineSetting") {
          _showTip("暂不支持修改");
          return ;
        }
        this.$router.push({path: "/mine/" + to});
      }
    },
    computed: {
      userName(){
        return this.$store.state.mine.userName;
      },
      score(){
        return this.$store.state.mine.userScore;
      },
      userHead(){
        return this.$store.state.mine.userHead || UserDefaultHeadImg;
      },
      coupon(){
        return this.$store.getters.couponsNum;
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../utils/mixin.styl'
  head-icon-size = 0.293333rem
  mine-type-size = 0.72rem
  mine-modification-width = 0.32rem
  mine-modification-height = 0.333333rem
  
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
      >div:nth-child(1)
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
      >div:nth-child(2)
        line-height: 14px
        position: relative
        span
          font-size: 14px
          font-weight: bolder
          color: #333333
          
        .icon-student-management-modification-white
          display: inline-block
          position: absolute
          margin-left: 0.226667rem
          @extends .brand
          width: mine-modification-width
          height: mine-modification-height
          background-size: mine-modification-width mine-modification-height
          bg-image('../assets/image/icon/icon-student-management-modification-white')
            
        
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