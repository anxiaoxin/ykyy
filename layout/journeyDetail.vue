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
         ></list-item>
      </div>
      <div v-if="type1" class="journey-body">
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
      <div v-if="type2" class="journey-body">
        <div>
          <span>姓名</span>
          <span>黄豆豆</span>
        </div>
        <div>
          <span>时间</span>
          <span>2018-09-28</span>
        </div>
        <div class="journey-horizen"></div>
        <div>
          <span>相册</span>
          <span>></span>
        </div>
        <div>
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
        <div class="journey-detail-button" @click="pageBack">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from '../components/productList'
export default {
  name: "journeyDetail",
  components: {
    ListItem
  },
  data(){
    return {
      studentName: "",
      type1: true,
      type2: false,
      headName: "进行中的行程"
    }
  },
  methods: {
    pageBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    purchaseInfo(){
      return this.$store.state.typeProduct.selected;
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
    .journey-detail-button
      width: 93%
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


