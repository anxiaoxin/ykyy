  <template>
  <div>
    <div class="purchase-product-list">
      <list-item
          :type="product.type" 
          :imgUrl="product.productImage"
          :title="product.productName"
          :abstract="product.productIntroduction"
          :category="product.productType"
          :productId="product.productId"
         ></list-item>
    </div>
    <div class="buy_info">
    <div>
      <div>学生姓名</div>
      <div><input type="text" name="" v-model="studentName" readonly="true" @click="selectStudent" style="text-align:right" placeholder="点击选择"></div>
    </div>
    <div>
      <div>发团时间</div>
      <div><input type="text" name="" v-model="time" readonly="true" @click="selectTime" style="text-align:right" placeholder="点击选择"></div>
    </div>
    <div v-if="type === 'group'">
      <div>团购人数</div>
      <div><input type="text" name="" v-model="nums" readonly="true" @click="selectPepoleNum" style="text-align:right" placeholder="点击选择"></div>
    </div>
    <div>
      <div>优惠券</div>
      <div><input type="text" name="" v-model="selectedCouponMoney" readonly="true" @click="selectCoupons" style="text-align:right" placeholder="点击选择"></div>
    </div>    
  </div>
  <div class="footer">
    <div class="price_info">
      价格：<span id="price">{{product.productMoney - (selectedCouponMoney || 0)}}</span>
    </div>
    <div class="pay_btn" @click="routeToPayResult">
      <div>去支付</div>
    </div>
  </div>
  <vue-pickers
    :show="pickShow"
    :columns="1"
    :defaultData="defaultData"
    :selectData="pickData"
    @cancel="close"
    @confirm="confirmFn"
  ></vue-pickers>
  <coupon-model
    :show="showModel" 
    :selectedId="selectedCouponId"
    @selected="selectedCoupons"
    @close="closeModel">
  </coupon-model>
  </div>
</template>

<script>
  import ListItem from '../components/productList'
  import vuePickers from 'vue-pickers'
  import couponModel from '../components/couponModel'
  import { GroupNums } from '../utils/constant.js'
  import { AddPurchase, GetProductInfoByProductId, WxPay } from '../utils/http.js'
  export default {
    name: "purchase",
    components: {
      ListItem,
      vuePickers,
      couponModel
    },    
    data(){
      return {
        type: "simple",
        pickShow: false,
        showModel: false,
        defaultData: [],
        pickData: {
          data1: []
        },
        times: [],
        studentName: "",
        time: "",
        nums: "",
        pickersType: "studentName",
        price: 0,
        student_id: '',
        productInfoId: '',
        selectedCouponId: undefined,
        selectedCouponMoney: ''
      }
    },
    mounted(){
      this.type = this.$route.params.type;
      let productId = this.product.productId;
      _utils.checkCache.call(this, ["students"]);
      this.productInfos = {};
      GetProductInfoByProductId({productid: productId, page: 1, pageNum: 100}).then(data => {
        if(data.code === 200) {
          data.result.list.forEach(item => {
            this.times.push({
              text: item.product_info_time,
              value: item.product_info_id
            })
            this.productInfos[item.product_info_id] = item;
          })
        }
      }).catch(data => {
      })
      if(this.$store.state.student.students.length == 0) {
        _utils.getAndCatchStudents.call(this);
      }
    },
    methods: {
      payTheProduct() {
        AddPayOrder({
          openId: openId, 
          state: 0, 
          titalFee: this.typeMoney[type]
          }).then( data => {
          if(data.code === 200) {
            this.pay(type, data.result.id);
          }
        }).catch(data => {
          $dialog.alert({
            title: '错误',
            content: "获取订单信息失败，请重试。",
            okText: '确定'
          }).then(() => {
            
          })         
        })
      },
      routeToPayResult(){
        let productInfo = this.productInfos[this.productInfoId];
        let params = {
          purchaseBean: {
            user_id: this.$store.state.mine.userId,
            student_id: this.student_id,
            student_name: this.studentName,
            product_info_id: this.productInfoId,
            purchase_pay: 0,
            purchase_money: 0,
            purchase_time: 0,
            product_info_doctor: productInfo.product_info_doctor,
            product_info_doctorname: productInfo.product_info_doctorname,
            product_info_guidname: productInfo.product_info_guidname,
            product_info_guidid: productInfo.product_info_guidid,
            product_info_teachername: productInfo.product_info_teachername,
            product_info_teacherid: productInfo.product_info_teacherid
          },
          userId: this.$store.state.mine.userId,
          userCouponsId: this.selectedCouponId || -1
        }
        AddPurchase(params).then(data => {
          if(data.code === 200) {
            this.goToPay(params.userId, params.purchaseBean.student_id,
            params.purchaseBean.product_info_id, data.result.purchase_id);      
          }
        })
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
                this.$router.push({name: "paySuccess"});
                  //支付成功后跳转的页面
              }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                
              }else if(res.err_msg == "get_brand_wcpay_request:fail"){
                WeixinJSBridge.call('closeWindow');
              } 
        }); 
      },      
      selectStudent() {
        this.pickersType = "studentName";
        if(this.$store.getters.studentNamesList.length == 0) {
          _showTip("暂无孩子信息，请添加");
          return ;
        }
        this.pickData.data1 = this.$store.getters.studentNamesList;
        this.pickShow = true;
      },
      selectTime() {
        this.pickersType = "time";
        this.pickData.data1 = this.times;
        this.pickShow = true;
      },
      selectPepoleNum() {
        this.pickersType = "pepoleNum";
        this.pickData.data1 = GroupNums;
        this.pickShow = true;
      },
      close(){
        this.pickShow = false;
      },
      confirmFn(value){
        this.pickShow = false;
        let dataValue = value.select1.text;
        if(this.pickersType === "studentName"){
          this.studentName = dataValue;
          this.student_id = value.select1.value;
        }else if(this.pickersType === "time"){
          this.time = dataValue;
          this.productInfoId = value.select1.value;
        }else if(this.pickersType === "pepoleNum"){
          this.nums = dataValue;
        }
      },
      selectCoupons() {
        this.showModel = true;
      },
      selectedCoupons(id, money) {
        this.selectedCouponId = id;
        this.selectedCouponMoney = money;
      },
      closeModel() {
        this.showModel = false;
      },
      share() {
        // 操作分享相关
        let me = this;
        let params = {"url": location.href.split('#')[0]};
        GetSign(params).then(data => {
          let wxData = data.result;
          wx.config({
            debug: false, //开启debug模式，在验证签名过程中会返回对应信息
            appId: wxData.appid,
            timestamp: +wxData.timestamp,
            nonceStr: wxData.nonceStr,
            signature: wxData.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
          })    
          wx.ready(function(){
            let link = "https://www.yikeyiyou.com";
            let sdata = {
                title: "一课一游",
                desc: "一课一游的分享",
                link: link,
                imgUrl: "https://www.aiyouyi.net.cn/static/assets/logo.jpg",
                success: function (e) {

                },
                cancel: function (e) {
                  _showTip("取消分享");  
                },
                fail: function() {
                  _showTip("分享失败");
                }
            };
            wx.onMenuShareTimeline(sdata);
            wx.onMenuShareAppMessage(sdata);
        });
        })
      }      
    },
    computed: {
      product() {
        return this.$store.state.typeProduct.selected;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.purchase-product-list
  margin : .4rem .346667rem .266667rem
  border-radius: 0.133333rem;
  -webkit-box-shadow: 0 0 15px #dcdcdc;
  box-shadow: 0 0 15px #dcdcdc;

.buy_info
  position: relative
  width: 93%
  margin: 0.266667rem auto
  >div
    width: 90%
    height: 1.333333rem
    margin: 0 auto
    display: flex
    align-items: center
    border-bottom: 1px solid #CAC9CF
    >div
      font-size: 14px
      color: #333333
    >div:nth-child(1)
      flex: 1
    >div:nth-child(2)
      flex: 2
      >input
        border: none
        width: 100%
  >div:last-child
    border-bottom: none
.footer
  display:flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0rem
  width: 100%;
  padding: 0.213333rem
  .price_info
    font-size:0.373333rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:0.533333rem;
    #price
      color:rgba(255,122,83,1);
  .pay_btn
    >div
      width:5.066667rem;
      height:1.146667rem;
      background:rgba(251,217,89,1);
      font-size:0.426667rem;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: solid 0.013333rem rgba(251,217,89,1);
      border-radius:0.106667rem;

</style>


