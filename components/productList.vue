<template>
  <div class="product-item-container" @click="toDetail">
      <div class="product-left">
        <img :src="imgUrl">
      </div>
      <div class="product-right">
          <div class="title">{{title}}</div>

          <div class="abstract" v-if="type === 'product'">{{abstract}}</div>
          <div class="order-tip-info" v-if="journeyState !== 0">
            <div class="time"><div class="product-icon-time"></div>{{orderTime}}</div>
            <div class="journey-state"><div class="product-icon-location"></div>{{PurchaseState[journeyState]}}</div>
          </div>

          <div class="order-tip-info" v-if="journeyState === 0">
            <div class="time"><div class="product-icon-time"></div>{{orderTime}}</div>
            <div class="journey-state"><div :class="productType"></div>{{category}}</div>
          </div>


          <div class="category" v-if="journeyState !== 0">
            <span>{{category}}</span>
          </div>          
          <div class="order-state" v-if="journeyState === 0">
            <div class="order-state-info">{{orderState}}</div>
            <div class="order-price">￥{{orderPrice}}</div>
          </div>
      </div>
  </div>
</template>

<script>
import { PurchaseState } from '../utils/constant.js'
  export default {
    name: "ListItem",
    data() {
      return {
        PurchaseState
      }
    },
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
      journeyState: Number,
      category: String,
      orderState: String, 
      orderPrice: Number,
      productId: Number,
      productType: {
        type: String,
        default: "history"
      },
      pageBySelf: {
        type: Boolean,
        default: true
      },
      productInfo: {
        type: Object,
        default: function() {
          return {};
        }
      }      
    },
    mounted(){
      console.log(this.data);
    },
    methods: {
      toDetail(){
        if(!this.pageBySelf) {
          return ;
        }
        this.$store.commit("cacheProductSelected", this.productInfo);
        this.$router.push({name: 'productInfo',params: {id: this.productId}});
      }
    } 
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

secondInfoBottom = 0.2rem

.product-item-container
    width: 100%
    height: 2.933333rem
    padding: 0.44rem 0.506667rem
    box-sizing: border-box
    display : flex
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
  width :100%
  margin-bottom: secondInfoBottom
  justify-content : space-between
  .time
    margin-right: 0.4rem
    color: rgb(183,183,183)
    
  
</style>