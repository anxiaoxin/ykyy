<template>
  <div>
    <!-- <t-head 
      :isShowBack=true
      :headName="headName"
    >
    </t-head> -->
    <div>
      <div class="product-info-contain">
        <list-item
          :type="purchaseInfo.productInfoBean.productBean.type"
          :imgUrl="purchaseInfo.productInfoBean.productBean.productImage"
          :title="purchaseInfo.productInfoBean.productBean.productName"
          :abstract="purchaseInfo.productInfoBean.productBean.productIntroduction"
          :category="purchaseInfo.productInfoBean.productBean.productType"
          :productId="purchaseInfo.productInfoBean.productBean.productId"
          :journeyState="purchaseInfo.purchase_pay"
          :orderTime="purchaseInfo.productInfoBean.product_info_time"
          :orderPrice="purchaseInfo.purchase_money"
         ></list-item>
      </div>
      <div v-if="type==0" class="journey-body">
        <div>
          <span>姓名</span>
          <span>{{purchaseInfo.student_name}}</span>
        </div>   
        <div>
          <span>时间</span>
          <span>{{purchaseInfo.purchase_time}}</span>
        </div>
        <div>
          <span>地点</span>
          <span>{{purchaseInfo.productInfoBean.product_info_destination}}</span>
        </div>
        <div>
          <span>老师</span>
          <span>{{purchaseInfo.productInfoBean.product_info_teachername}}</span>
        </div>
        <div>
          <span>领队</span>
          <span>{{purchaseInfo.productInfoBean.product_info_guidname}}</span>
        </div>                                      
        <div>
          <span>电话</span>
          <span></span>
        </div>
        <div>
          <span>队医</span>
          <span>{{purchaseInfo.productInfoBean.product_info_doctorname}}</span>
        </div>
        <div>
          <span>实时天气</span>
          <span></span>
        </div>                       
      </div>
      <div v-if="type==1" class="journey-body">
        <div>
          <span>姓名</span>
          <span>{{purchaseInfo.student_name}}</span>
        </div>
        <div>
          <span>时间</span>
          <span>{{purchaseInfo.purchase_time}}</span>
        </div>
        <div class="journey-horizen"></div>
        <!-- <div @click="routeToImages">
          <span>相册</span>
          <span>></span>
        </div> -->
        <div @click="goToHonor">
          <span>荣誉证书</span>
          <span>></span>
        </div>   
        <div>
          <span>评价</span>
          <div>
            <textarea name="" id="journey-assess"  placeholder="请填写评价">
            </textarea>
          </div>
        </div>     
      </div>
      <div class="journey-detail-back">
        <div class="journey-delete-button" @click="deletePurchase" v-if="purchaseInfo.purchase_pay == 0">
          删除
        </div>        
        <div class="journey-detail-button" @click="pageBack">
          {{purchaseInfo.purchase_pay == 0 ? "支付" : "返回"}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from '../components/productList'
import { WxPay, DeleltePurchase } from '../utils/http.js'

export default {
  name: "journeyDetail",
  components: {
    ListItem
  },
  data(){
    return {
      studentName: "",
      headName: "进行中的行程"
    }
  },
  mounted() {
    let purchaseId = this.$route.params.id;
  },
  methods: {
    pageBack() {
      if(this.purchaseInfo.purchase_pay !== 0) {
        this.$router.go(-1);
        return ;
      }
      let purchase = this.purchaseInfo.purchase_id;
      let userId = this.purchaseInfo.user_id;
      let studentId = this.purchaseInfo.student_id;
      let productInfoId = this.purchaseInfo.product_info_id;
      this.goToPay(userId, studentId, productInfoId, purchase);
    },  
    goToPay(userId, studentId, productInfoId, purchase) {
      let params = {
        userId,
        studentId,
        productInfoId,
        purchase
      }
      let me = this;
      WxPay(params).then(data => {
        window.payData = data.result;
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady',
                me.onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady',
                me.onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady',
                me.onBridgeReady);
          }
        } else {
          setTimeout(() => {
            me.onBridgeReady();
          }, 100);
        }
      })
    },
    onBridgeReady() {
      let data = window.payData;
      let me = this;
      WeixinJSBridge.invoke( 'getBrandWCPayRequest', {
        "appId":data.appId,     //公众号名称,由商户传入     
        "timeStamp":data.timeStamp + "",         //时间戳,自1970年以来的秒数     
        "nonceStr":data.nonceStr, //随机串     
        "package":data.package,     
        "signType":data.signType,         //微信签名方式：     
        "paySign":data.paySign //微信签名 
        }, 
        function(res){    
          if(res.err_msg == "get_brand_wcpay_request:ok" ) {
              me.$router.replace({name: "paySuccess"});
                //支付成功后跳转的页面
            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
              _showTip("支付取消");
            }else if(res.err_msg == "get_brand_wcpay_request:fail"){
              _showTip("支付失败");
              WeixinJSBridge.call('closeWindow');
            } 
      }); 
    },   
    goToHonor() {
      let honorInfo = {
        studentName: this.purchaseInfo.student_name,
        name: this.purchaseInfo.productInfoBean.productBean.productName,
        time: this.purchaseInfo.purchase_change_time
      }
      this.$store.commit("setHonorCache", honorInfo);
      this.$router.push({path: "/mine/honor"});
    },
    routeToImages() {
      _showTip("该功能暂未开放");
    },
    deletePurchase() {
      let purchase_id = this.purchaseInfo.purchase_id;
      DeleltePurchase({purchase_id}).then( data => {
        _showTip("删除成功");
        this.$router.go(-1);
      }).catch(data => {
        _showTip("删除失败，请重试");
      })
    }  
  },
  computed: {
    purchaseInfo(){
      if(!this.$store.state.purchaseProduct.selectedPurchase.purchase_id) {
        this.$router.go(-1);
      }
      return this.$store.state.purchaseProduct.selectedPurchase;
    },
    type() {
      let st = this.$store.state.purchaseProduct.selectedPurchase;
      if(st == 2) {
        return 1;
      }else {
        return 0;
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .product-info-contain
    margin : .4rem .346667rem .266667rem
    border-radius: 0.133333rem;
    -webkit-box-shadow: 0 0 15px #dcdcdc;
    box-shadow: 0 0 15px #dcdcdc;
  .paySuccessButton
    width: 9.04rem
    margin: 0.4rem auto 0
    height: 1.213333rem
    text-align: center
    border: none
    border-radius: 0.066667rem
    display: block
    box-sizing: border-box
    font-size: 16px
  .journey-detail-back
    box-sizing: border-box
    height: 1.973333rem
    position: fixed
    display: flex
    left: 0
    right: 0
    bottom: 0
    background-color: white
    justify-content: center
    align-items: center
    padding:0 0.2rem
    .journey-delete-button
      flex: 1
      height: 1.173333rem
      background-color: gray
      border-radius: 0.106667rem
      color: #333333
      display: flex
      justify-content: center
      align-items: center
      font-size: 16px
      font-weight: bolder
      color: #333333      
      margin-right: 0.2rem
    .journey-detail-button
      flex: 3
      height: 1.173333rem
      background-color: #FBD959
      border-radius: 0.106667rem
      color: #333333
      display: flex
      justify-content: center
      align-items: center
      font-size: 16px
      font-weight: bolder
      color: #333333

  .journey-body
    >div
      margin: 0 .826667rem
      padding-top: .4rem
      font-size : 14px
      >span:nth-child(2)
        float : right 
      #journey-assess
        box-sizing : border-box
        width : 8.346667rem
        height : 2.4rem
        border : 1px solid #CAC9CF
        margin-top: .266667rem
        padding: .253333rem .333333rem
        font-size: 14px
    .journey-horizen
      border-bottom : 1px solid #CAC9CF
      margin: 0 .48rem





</style>


