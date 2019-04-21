<template>
  <div>
    <t-head 
      :isShowBack=true
      :headName="headName"
    >
    </t-head>
    <div class="honors">
      <div v-for="honor in honors">
        <div class="honor-list-container">
          <div class="honor-list-item-time">2018.09.10</div>
          <div class="honor-list-item-body">
            <div class="honor-list-item-type" :class="'category-' + honor.category"></div>
            <div class="honor-list-item-name">北京-六朝古都</div>
            <div class="honor-list-item-detail" @click="pageTo(honor.id)">查看证书 ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "honors",
  data(){
    return {
      headName: "荣誉证书",
      honors: [
        {
          time: "2018.09.10",
          name: "北京-六朝古都",
          category: "history",
          id: 1
        },
        {
          time: "2018.09.10",
          name: "北京-六朝古都",
          category: "history",
          id: 1
        }        
      ]
    }
  },
  methods: {
    pageTo(id){
      this.$router.push({path: "/mine/honor"})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../utils/mixin.styl'
  honorItemIconWidth = .533333rem
  honorItemIconHeight = .533333rem
  .brand
    background-size: honorItemIconWidth honorItemIconHeight
    background-repeat: no-repeat
    vertical-align: top 

  .honors
    padding-top: .266667rem

  .honor-list-container
    position: relative
    box-sizing : border-box
    height : 1.853333rem
    margin-left : .6rem
    margin-right: .48rem
    border-left: .013333rem solid #FBD959
    padding-left: .28rem
  
  .honor-list-container:before
    content: ""
    position: absolute
    width: .16rem
    height: .16rem
    background-color : #FBD959
    border-radius : 50%
    top: -0.08rem
    left : -0.08rem
     
  .honor-list-item-time
    color: #808080
  
  .honor-list-item-body
    margin-top: .173333rem
  .honor-list-item-body > div
    display: inline-block
  
  .honor-list-item-type
    @extends .brand
    width: honorItemIconWidth
    height: honorItemIconHeight

  .category-history
    bg-image('../assets/image/icon/icon-home-history')

  .category-science
    bg-image('../assets/image/icon/icon-home-science')
            
  .category-grow
    bg-image('../assets/image/icon/icon-home-grow')

  .honor-list-item-name
    margin-left: .16rem
    font-size: 12px
  
  .honor-list-item-detail
    position : absolute
    right : 0px
</style>

