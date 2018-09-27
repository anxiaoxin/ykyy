<template>
	<div class="foot">
		<div @click="changeView('home')" :class="dataHome">
      <div class="foot-img"></div>
      <div class="label">首页</div> 
    </div>
    <div @click="changeView('journey')" :class="dataJourney">
        <div class="foot-img"></div>
        <div class="label">行程</div> 
    </div>
    <div @click="changeView('mine')" :class="dataMine">
        <div class="foot-img"></div>
        <div class="label">我的</div> 
    </div>                
	</div>
</template>

<script>
	export default {
    name: 'foot',
    data() {
      return {
        
      }
    },
    methods: {
      changeView(to){
        this.$store.commit("changePage",to);
        this.$router.push({path: "/main/" + to});
      }
    },
    computed: {
      selected(){
        return this.$store.state.foot.pageType;
      },
      dataHome() {
        return this.$store.state.foot.pageType === "home" ? "homeSelected" : "home";
      },
      dataJourney() {
        return this.$store.state.foot.pageType === "journey" ? "journeySelected" : "journey";
      },
      dataMine() {
        return this.$store.state.foot.pageType === "mine" ? "mineSelected" : "mine";
      }
    }    
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  // 定义图片的宽高的变量
  imageWidth = 0.72rem
  imageHeight = 0.72rem
  .foot
    display: flex
    justify-content: space-around
    width: 100%
    height: 1.333333rem
    position: fixed
    right: 0
    left: 0
    bottom: 0
    background-color: white
    border-top: 1px solid #e8e8e8
    box-sizing: border-box
    padding: 0.066667rem 0 0.133333rem 0
    .foot-img
      width: imageWidth
      height: imageHeight
    .label
      font-size: 14px
      color: #7F8389
    
  @import '../utils/mixin.styl'
  
  .brand
    background-size: imageWidth imageHeight
    background-repeat: no-repeat
    vertical-align: top       //一般图片与文字的对其方式需指定 top 是使其顶端对其
  
  .home
    @extends .brand
    bg-image('../assets/image/foot/icon-bottom-home-unchecked')

  .homeSelected
    @extends .brand
    bg-image('../assets/image/foot/icon-bottom-home-checked')
    
  .journey
    @extends .brand
    bg-image('../assets/image/foot/icon-bottom-journey-unchecked')
  
  .journeySelected
    @extends .brand
    bg-image('../assets/image/foot/icon-bottom-journey-checked')  

  .mine
    @extends .brand
    bg-image('../assets/image/foot/icon-bottom-my-unchecked')

  .mineSelected
    @extends .brand
    bg-image('../assets/image/foot/icon-bottom-my-checked')

</style>