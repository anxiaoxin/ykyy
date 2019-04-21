<template>
  <div>
    <div class="pay-success-logo"></div>
    <div class="pay-success-title">支付成功</div>
    <div>
      <button class="paySuccessButton paySuccessShare" @click="share">
        分享
      </button>
      <button class="paySuccessButton" @click="pageHome">
        返回首页
      </button>      
    </div>
  </div>
</template>

<script>
export default {
  name: "paySuccess",
  data(){
    return {
      
    }
  },
  methods: {
    pageHome(){
      this.$router.replace({path: "/main/home"})
    },
    share(){

    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../utils/mixin.styl'

  .brand
    background-size: 1.933333rem 1.933333rem
    background-repeat: no-repeat
    vertical-align: top  

  .pay-success-logo
    @extends .brand
    width: 1.933333rem
    height : 1.933333rem
    margin: 1.266667rem auto 0
    bg-image('../assets/image/icon/image-pay-logo')

  .pay-success-title
    font-size : 18px
    font-weight: bold
    margin-top: .4rem
    margin-bottom: 1.266667rem
    text-align : center

  .paySuccessButton
    width: 9.04rem
    margin: 0.4rem auto 0
    height: 1.213333rem
    text-align: center
    border: none
    border-radius: 0.066667rem
    display: block
    box-sizing: border-box
    font-size: 16px
  .paySuccessShare
    background-color: #FBD959
    font-weight: bolder
    display: block    
</style>
