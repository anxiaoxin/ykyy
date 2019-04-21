<template>
  <div>
    <div class="head-stance"></div>
    <div class="title-head">
      <div v-if="isShowBack" @click="pageBack" class="head-back"></div>
      <div>{{headName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tHead",
  props: {
    isShowBack: true,
    headName: ""
  },
  methods: {
    pageBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../utils/mixin.styl'
  leftSize = 0.5rem
  .brand
    background-repeat: no-repeat
    vertical-align: top 

  .head-stance
    height : 1.173333rem
    background-color : white
  .title-head
    position: fixed
    background-color : white
    top: 0px
    left : 0px
    right: 0px
    height : 1.173333rem
    text-align : center
    font-size: 17px
    font-weight : bolder
    line-height : 1.173333rem
    z-index: 1;
    border-bottom: 0.5px solid #ddd;
  .head-back
    position : absolute
    top: 0.3rem;
    left : .506667rem
    @extends .brand
    width : leftSize
    height : leftSize
    background-size: leftSize leftSize
    bg-image('../assets/image/icon/left')       
</style>
