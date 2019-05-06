<template>
  <div>
    <!-- <t-head 
      :isShowBack=true
      :headName="headName"
    >
    </t-head> -->
    <div v-for="(coupon, key) in coupons" v-bind:key="key">
      <coupon
        :beginTime="coupon.benginTime"
        :endTime="coupon.endTime"
        :couponsMoney="coupon.couponsBean.couponsMoney"
        :userCouponsId="coupon.userCouponsId"
        :couponsId="coupon.couponsBean.couponsId"
        :status="coupon.status"
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
  name: "coupons",
  components: {
    coupon
  },
  data(){
    return {
      headName: "优惠券"
    }
  },
  mounted(){
    
  },
  computed: {
    coupons() {
      return this.$store.state.coupons.coupons;
    }
  } 
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .coupons-empty
    width: 50%
    padding-top: 20%
    margin: 0px auto 
    text-align : center
</style>

