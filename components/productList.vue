<template>
  <div class="product-item-container" @click="toDetail">
      <div class="product-left">
        <img src="../assets/image/tmp/bj.png">
      </div>
      <div class="product-right">
          <div class="title">{{title}}</div>

          <div class="abstract" v-if="type === 'product'">{{abstract}}</div>
          <div class="order-tip-info" v-if="type === 'myJourney'">
            <div class="time"><div class="product-icon-time"></div>{{orderTime}}</div>
            <div class="journey-state"><div class="product-icon-location"></div>{{journeyState}}</div>
          </div>

          <div class="order-tip-info" v-if="type === 'planJourney'">
            <div class="time"><div class="product-icon-time"></div>{{orderTime}}</div>
            <div class="journey-state"><div :class="productType"></div>{{category}}</div>
          </div>


          <div class="category" v-if="type !== 'planJourney'">
            <span>{{category}}</span>
          </div>          
          <div class="order-state" v-if="type === 'planJourney'">
            <div class="order-state-info">{{orderState}}</div>
            <div class="order-price">￥{{orderPrice}}</div>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: "ListItem",
    props: {
      type: {
        type: String,
        default: "product"  // myJourney  planJourney
      },
      imgUrl: {
        type: String,
        default: ''
      },
      title: String,
      abstract: String,
      orderTime: String,
      journeyState: String,
      category: String,
      orderState: String, 
      orderPrice: String,
      productID: Number,
      productType: {
        type: String,
        default: "history"
      }
    },
    mounted(){
      
    },
    methods: {
      toDetail(){
        this.$router.push({name: '',params: {id: this.productID}});
      }
    } 
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

secondInfoBottom = 0.466667rem

.product-item-container
    width: 100%
    height: 2.933333rem
    padding: 0.44rem 0.506667rem
    box-sizing: border-box
    .product-left
      float: left
      img
        width: 3.573333rem
        height: 2.133333rem
    .product-right
      float: left
      box-sizing: border-box
      padding: 0.04rem 0
      margin-left: 0.4rem
      .title
        color: rgb(51,51,51)
        font-size: 14px
        font-weight: bolder
        margin-bottom: 0.08rem
      .abstract
        color: rgb(128,128,128)
        font-size: 14px
        width: 4.773333rem
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
        margin-bottom: secondInfoBottom
      .category
        font-size: 10px
        span
          padding: 0.026667rem 0.106667rem
          border: 1px solid rgb(183,183,183)
          color: rgb(183,183,183)
          border-radius: 0.066667rem
          
.journey-state-finish
  color: rgba(177,177,177,1)
.journey-state-unfinish
  color: rgba(233,158,29,1)
.journey-state-running
  color: rgba(97,186,100,1)
  
.order-state
  color: rgba(255,122,83,1)
  
.order-tip-info
  display: flex
  margin-bottom: secondInfoBottom
  .time
    width: 1.84rem
    margin-right: 0.4rem
    color: rgb(183,183,183)
    
  
</style>