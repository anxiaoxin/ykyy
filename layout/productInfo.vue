<template>
  <div>
    <div id="productInfoHead" class="cover_pic">
      <img :src="ServerUrl+productInfo.productImage">
    </div>
    <!-- <div id="productBasic" class="product_basic_info">
      <div class="product_name">
        {{productInfo.productName}}
      </div>

      <div class="product_price">
        <div class="price_multi">
          <span>&yen; </span><span id="price">{{productInfo.productMoney}}</span>
        </div>
        <div class="price_single">
          <span>单独购买价：&yen;</span><span id="price_single">{{productInfo.productMoney}}</span>
        </div>
      </div>
    </div> -->
    <div class="course_detail">
      <span v-if="!productInfo.productPath">课程详情图文缺失</span> 
      <iframe v-if="productInfo.productPath" id="myiframe" :src="productInfo.productPath" frameborder="0"></iframe>
    </div>
    <div id="productFoot" class="course_info_button top-box-shadow">
      <div class="share_btn right-box-shadow">{{'￥' + productInfo.productMoney}}</div>
      <div class="buy_multi" @click="routeTo('simple')">购买</div>
      <!-- <div class="buy_multi" @click="routeTo('group')">团购</div> -->
    </div> 
  </div>
</template>

<script>

import { GetProductById, GetProductInfoById } from '../utils/http.js'
import { ServerUrl } from '../utils/constant.js'
export default {
  name: "productInfo",
  data(){
    return {
      productId: null,
      ServerUrl
    }
  },
  mounted(){
    let me = this;
    this.setFrameHeight();
    this.productId = this.$route.params.id;
    if(!this.$store.state.typeProduct.selected.hasOwnProperty("productName")) {
      _utils.getAndCacheSelectedProduct.call(this, {id: this.productId});
    }
    GetProductInfoById({id: this.productId}).then(data => {
      if(data.code === 200) {
        me.$store.commit("updateSelectProductInfoId", data.result.product_info_id);
      }
      this.initShare(data.result);
    })
  },
  methods: {
    toShare() {
      _showTip("点击右上角选择分享");
    },
    initShare(data) {
      let productInfo = productInfo;
      let info = {
        title: data.productBean.product_name,
        desc: data.productBean.product_introduction,
        pid: this.productId
      }
      _utils.initShare(info);
    },
    routeTo(type){
      this.$router.push({name: "purchase", params:{type: type}});
    },
    setFrameHeight() {
      let head = document.getElementById("productInfoHead");
      let productBasic = document.getElementById("productBasic");
      let productFoot = document.getElementById("productFoot");
      let clientHeight = document.documentElement.clientHeight;
      let clientWidth = document.documentElement.clientWidth;
      let iframe = document.getElementById("myiframe");
      let height = clientHeight - head.offsetHeight - productFoot.offsetHeight;
      iframe.height = height;      
      iframe.width = clientWidth * 0.9;
    }
  },
  computed: {
    productInfo() {
      return this.$store.state.typeProduct.selected;
    }
  }  
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cover_pic
  width: 100%;
  height: 4.933333rem;
  >img
    width: 100%;
    height: 4.933333rem;
.product_basic_info
  font-size: 14px
  font-family: PingFangSC-Medium;
  font-weight: bold
  padding: .133333rem 0
  margin : 0 .426667rem
  border-bottom: 1px solid #CAC9CF
  box-sizing : border-box
  display: flex
  align-items: center
  .product_name
    display: inline-block;
    width:60%;
    height:0.746667rem;
    color:rgba(51,51,51,1);
    line-height:0.746667rem;
    letter-spacing:0.026667rem;
  .product_price
    display: inline-block;
    .price_multi
      width: 2.4rem;
      height:0.746667rem;
      color:rgba(255,122,83,1);
      line-height:0.746667rem;
      font-size: 16px;
    .price_single
      margin-top: .053333rem
      width:3.4rem;
      height:0.373333rem;
      font-size:0.266667rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(128,128,128,1);
      line-height:0.373333rem;
.course_detail
  text-align:center;
  width:100%;
  font-size:0.533333rem;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:0.746667rem;
  letter-spacing:0.026667rem;
  iframe 
    margin: 0 auto
    margin-bottom: 1.066667rem
    margin-top: 0.5rem
    box-sizing : border-box


.course_info_button
  width:100%;
  color:rgba(51,51,51,1);
  text-align: center;
  position: fixed;
  display : flex
  justify-content : space-around
  bottom: 0
  background-color: white 
  >div
    font-size: 14px;
    height: 1.066667rem
    line-height: 1.066667rem    
    color: #333333
  >.share_btn
    width: 40%
    font-size : 18px
    color:rgba(255,122,83,1);
  >.buy_single
    width: 60%
  >.buy_multi
    width: 60%

  .buy_multi
    font-size : 16px
    border:1px solid rgba(251,217,89,1)
    background-color : rgba(251,217,89,1)
    font-weight: bolder

</style>

