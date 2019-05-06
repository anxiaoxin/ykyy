<template>
  <div>
    <!-- <t-head 
      :isShowBack=true
      :headName="headName"
    >
    </t-head> -->
    <div class="honor-contain">
      <div class="honor-body">
        <div class="honor-info-title">荣誉证书</div>
        <div class="honor-info-head">
          <span class="student-name">{{honorInfo.studentName}}</span>同学
        </div>
        <div class="honor-info-body">
            在本次游学（{{honorInfo.name}}）中，你表现优异，特发此证，以资鼓励！
        </div>
        <div class="honor-info-foot">
          <div class="honor-info-foot-cp"></div>
          <div class="honor-info-time">{{honorInfo.time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "honor",
  data(){
    return {
      headName: "荣誉证书"
    }
  },
  computed: {
    honorInfo() {
      return this.$store.state.purchaseProduct.honorData;
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../utils/mixin.styl'
  imageWidth = 9.24rem
  imageHeight = 11.84rem
  footCpWidth = 1.586667rem
  footCpHeigh = .453333rem
  .brand
    background-repeat: no-repeat
    vertical-align: top 

  .honor-contain
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    padding-top: 1.2rem
    background-color: rgb(251,217,89)
  .honor-body
    @extends .brand
    width: imageWidth
    margin: 0px auto
    height: imageHeight
    background-size: imageWidth imageHeight
    border-top: 1px solid white
    font-size: 14px
    color: #333333
    position : relative
    bg-image('../assets/image/background/image-certificate-backg')  

    .honor-info-title
      font-size: 24px
      text-align: center
      margin-top: 1.653333rem
    .honor-info-head
      margin: 0 1.12rem 0 1.24rem
      margin-top: 1.533333rem

      .student-name
        font-size: 18px
        font-weight: bolder
        display: inline-block
        margin-right: .16rem
    .honor-info-body
      margin: .48rem 1.12rem 0 1.24rem
      line-height: 20px
    .honor-info-foot
      position : absolute
      right: 1.386667rem
      bottom: 1.84rem
      .honor-info-foot-cp
        @extends .brand
        width : footCpWidth
        height : footCpHeigh
        background-size: footCpWidth footCpHeigh
        bg-image('../assets/image/background/image-log-in-logo')
      .honor-info-time
        margin-top : .146667rem
        font-size: 12px
</style>