<template>
  <div class="coupons-model" v-if="show">
    <div class="close-model">
      <div class="model-close-icon" @click="closeModel"></div>
    </div>
    <div v-for="(coupon, key) in coupons" v-bind:key="key">
      <coupon
        :beginTime="coupon.benginTime"
        :endTime="coupon.endTime"
        :couponsMoney="coupon.couponsBean.couponsMoney"
        :userCouponsId="coupon.userCouponsId"
        :couponsId="coupon.couponsBean.couponsId"
        :status="coupon.status"
        :selected="selectedCouponId == coupon.userCouponsId"
        @click.native="selectCoupon(coupon.userCouponsId, coupon.couponsBean.couponsMoney)"
      >
      </coupon>
    </div>
    <div v-if="coupons.length === 0" class="coupons-empty">
      暂无优惠券
    </div>
  </div>
</template>

<script>
import coupon from "../components/coupon.vue"
import { GetUserCoupons } from "@/utils/http.js"
export default {
  name: "couponModel",
  components: {
    coupon
  },
  props: {
    show: false,
    selectedId: undefined
  },
  mounted(){
    
  },
  methods: {
    selectCoupon(id, money) {
      this.$emit("selected", id, money)
    },
    closeModel() {
      this.$emit("close");
    }
  },
  computed: {
    coupons() {
      return this.$store.state.coupons.coupons;
    },
    selectedCouponId() {
      return this.selectedId
    }
  } 
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import '../utils/mixin.styl'
  colse-icon-size = 0.8rem
  .brand
    background-repeat: no-repeat
    vertical-align: top 
    background-size: colse-icon-size colse-icon-size
  .coupons-empty
    width: 50%
    padding-top: 20%
    margin: 0px auto 
    text-align : center
  
  .coupons-model
    position: fixed
    top: 0rem
    left: 0rem
    right: 0rem
    bottom: 0rem
    background-color : white
  .close-model
    height : 1.173333rem
    background-color : white
    position: relative
  .model-close-icon
    @extend .brand
    width: colse-icon-size
    height: colse-icon-size
    bg-image('../assets/image/icon/close')
    position: absolute
    top: 0.2rem
    right: 0.5rem
</style>

