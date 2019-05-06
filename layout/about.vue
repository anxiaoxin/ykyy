<template>
  <div>
    <!-- <t-head 
      :isShowBack=true
      :headName="headName"
    >
    </t-head> -->
    <div class="about-head"></div>
    <div class="app-version">版本号：{{version}}</div>
    <div class="about-info">
      {{appInfo}}
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  data(){
    return {
      headName: "关于一课一游",
      version: "1.0.0",
      appInfo: `一课一游是研学活动为学校的团体活动，由学校协助组织，并派老师带队，
      一课一游负责承接具体课程及服务工作，一课一游带队老师均有多年带队及丰富教育经验，
      吃、住、行均与正规可靠商家合作，课程自主研发，专职教师讲授，尽可能让学生全方位体
      会到研学旅行的魅力，并从中获益`
    }
  },
  mounted(){

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../utils/mixin.styl'
  headWidth = 1.866667rem
  headheight = 1.866667rem
  
  .brand
    background-repeat: no-repeat
    vertical-align: top

  .about-head
    width: headWidth
    margin: 0px auto 
    margin-top: .933333rem
    height: headheight
    background-size: headWidth headheight
    bg-image('../assets/image/icon/image-home-logo')  
  
  .app-version
    width: 50%
    margin: .4rem auto .373333rem
    color: #808080
    font-size: 14px
    text-align: center

  .about-info
    width: 8.093333rem
    margin: 0px auto
    color: #6D6D6D
    text-align: justify
    font-size: 12px
    line-height: 18px
</style>