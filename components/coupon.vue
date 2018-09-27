<template>
  <div class="coupon">
    <div class="coupon-image">
      <div class="money-num">
        <div>¥</div>
        <div>50</div>
      </div>
      <div class="coupon-info">
        <div class="coupon-info-time">有限期：</div>
        <div class="coupon-info-application">使用范围仅限一课一游</div>
      </div>      
    </div>
  </div>
</template>

<script>
  export default {
    name: "coupon",
    data(){
      return {

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../utils/mixin.styl'
  
  coupon-image-width = 9.48rem
  coupon-image-height = 4.76rem

  .brand
    background-repeat: no-repeat
    vertical-align: top 
    background-size: coupon-image-width coupon-image-height
    
  .coupon
    position: relative
    .coupon-image
      @extends .brand
      width: coupon-image-width
      height: coupon-image-height
      margin: 0 auto
      position: relative
      bg-image("../assets/image/icon/image-discount")
      .money-num
        position: absolute
        left: 0
        right: 0
        bottom: 2.413333rem
        text-align: center
        > div
          display: inline-block
          font-weight: bolder
        > div:nth-child(1)
          font-size: 20px
          margin-right: 0.266667rem
        > div:nth-child(2)
          font-size: 50px
      .coupon-info
        position: absolute
        left: 0.613333rem
        right: 0.56rem
        bottom: 0.706667rem
        color: #333333
        .coupon-info-time
          font-size: 14px
          float: left
        .coupon-info-application 
          float: right
          font-size: 12px
</style>