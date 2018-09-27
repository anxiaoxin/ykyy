<template>
  <div>
    <div class="home-head-imag">
      <img src="../assets/image/tmp/mainhead.png">
    </div>
    <div class="home-category">
      <div>
        <div @click="changeView('history')">
          <div class="category-img category-history"></div>
          <div class="label">史诗文化</div> 
        </div>
        <div @click="changeView('science')">
            <div class="category-img category-science"></div>
            <div class="label">科学筑梦</div> 
        </div>
        <div @click="changeView('grow')">
            <div class="category-img category-grow"></div>
            <div class="label">成长营地</div> 
        </div>        
      </div>
    </div>
    <div class="list-title">
      推荐行程
    </div>
    <div class="product-list-container">
      <div v-for="product in productData">
        <list-item @click="routeToDetail(product.id)" 
          :type="product.type"
          :imgUrl="product.imgUrl"
          :title="product.title"
          :abstract="product.abstract"
          :category="product.category"

          :orderTime="product.orderTime"
          :journeyState="product.journeyState"

          :orderPrice="product.orderPrice"
         ></list-item>        
      </div>
    </div>
  </div>
</template>

<script>
  import ListItem from '../components/productList'
  export default {
    name: "home",
    components: {
      ListItem,
    },    
    data(){
      return {
        productData: [{
          type: "product" ,
          imgUrl: "",
          title: "北京-六朝古都",
          abstract: "早在七十万年前，北京周asdfasdadf",
          category: "史诗文画",         
        },
        {
          type: "myJourney" ,
          imgUrl: "",
          title: "北京-六朝古都",
          orderTime: "2018-07-24",
          journeyState: "进行中",
          category: "史诗文画",         
        },
        {
          type: "planJourney" ,
          imgUrl: "",
          title: "北京-六朝古都",
          orderTime: "2018-07-24",
          orderPrice: "2280",
          category: "史诗文画",         
        },        
        {
          type: "myJourney" ,
          imgUrl: "",
          title: "北京-六朝古都",
          orderTime: "2018-07-24",
          journeyState: "进行中",
          category: "史诗文画",         
        },
        {
          type: "myJourney" ,
          imgUrl: "",
          title: "北京-六朝古都",
          orderTime: "2018-07-24",
          journeyState: "进行中",
          category: "史诗文画",         
        }                
        ]
      }
    },
    methods: {
      changeView(to){
        this.$router.push({path: "/product/" + to});
      },
      // 根据id跳到产品详情页面
      routeToDetail(id){

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  
  @import '../utils/mixin.styl'
  
  .home-head-imag
    width: 100%
    height: 4.0rem
    overflow: hidden
    >img
      width: 100%
      height: auto
  
  .home-category
    position: relative
    margin: 0 0.346667rem   
    > div
      box-sizing: border-box
      position: relative
      top: -0.346667rem
      border-radius: 0.133333rem
      -moz-box-shadow:0 0 15px rgb(220,220,220) 
      -webkit-box-shadow:0 0 15px rgb(220,220,220) 
      box-shadow:0 0 15px rgb(220,220,220);     
      width: 100%
      height: 2.933333rem  
      display: flex
      justify-content: space-around
      padding: 0.586667rem 0 0.48rem 0 
      background-color: white
      .category-img
        width: 1.173333rem
        height: 1.173333rem
        background-size: 1.173333rem 1.173333rem
        background-repeat: no-repeat
        vertical-align: top
        margin: 0 auto  
            
      .category-history
        bg-image('../assets/image/icon/icon-home-history')

      .category-science
        bg-image('../assets/image/icon/icon-home-science')
                
      .category-grow
        bg-image('../assets/image/icon/icon-home-grow')

      .label
        font-size: 14px
        color: rgba(51,51,51,1)
        font-weight: bolder
        margin-top: 0.16rem
      
  .list-title
    border-left: 0.08rem solid rgb(251,217,89)
    padding-left: 0.4rem
    margin-top: 0.453333rem
    font-size: 12px
   
</style>