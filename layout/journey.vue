<template>
  <div class="journey-container">
    <div class="journey-tab">
      <div :class="myJourneyTabClass"  @click="slideTo(0)">我的行程</div>
      <div :class="panJourneyTabClass"  @click="slideTo(1)">计划行程</div>
    </div>
    <div class="journey-content">
      <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="product-list-container">
                <div v-for="(product, key) in myJourneyProductData" @click="routeToDetail(product)" v-bind:key="key">
                  <list-item 
                    :type="'myJourney'"
                    :imgUrl="product.productInfoBean.productBean.productImage"
                    :title="product.productInfoBean.productBean.productName"
                    :category="product.productInfoBean.productBean.productType"
                    :orderTime="product.productInfoBean.product_info_time"
                    :journeyState="product.purchase_status"
                    :pageBySelf='false'
                   ></list-item>        
                  <div v-if="myJourneyProductData.length == 0" class=".empty-message">
                    暂无行程
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="product-list-container">
                <div v-for="(product, key) in planJourneyProductData" @click="routeToDetail(product)" v-bind:key="key">
                  <list-item  
                    :type="'planJourney'"
                    :imgUrl="product.productInfoBean.productBean.productImage"
                    :title="product.productInfoBean.productBean.productName"
                    :category="product.productInfoBean.productBean.productType"
                    :orderTime="product.productInfoBean.product_info_time"
                    :orderPrice="product.purchase_money"
                    :pageBySelf="false"
                   ></list-item>  
                  <div v-if="planJourneyProductData.length == 0" class=".empty-message">
                    暂无行程
                  </div>                         
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import ListItem from '../components/productList'
  import { GetUserPurchaseByUserId } from '../utils/http.js'

  export default {
    name: "journey",
    components: {
      ListItem,
    },
    data(){
      return {
        mySwiper: '',
        activeTab: 0,
        myJourneyTabClass: 'tab-active',
        panJourneyTabClass: 'tab-unactive',
      }
    },
    watch: {
      activeTab(){
        if(this.activeTab === 0){
          this.myJourneyTabClass = 'tab-active';
          this.panJourneyTabClass = 'tab-unactive';
        }else{
          this.myJourneyTabClass = 'tab-unactive';
          this.panJourneyTabClass = 'tab-active';          
        }
      }
    },
    mounted(){
      let me = this;
      this.mySwiper = new Swiper('.swiper-container',{
        centeredSlides: true,
        observer: true,
        observeParents: true,
        on: {
          slideChangeTransitionEnd: function(){
            me.activeTab = this.activeIndex;
          }
        }        
      })
      let user_id = _utils.getCookie("userId"); 
      if(!user_id) {
        return ;
      }
      // 获取数据
      if(this.$store.state.purchaseProduct.unPayPurchase.length || this.$store.state.purchaseProduct.purchaseState.length) {
        return ;
      }
      let params = {
        user_id: user_id,
        page: 1
      }
      _utils.getAndCacheUserPurchase.call(this, params);
    },
    methods: {
      slideTo(to){
        this.mySwiper.slideTo(to, 500, false);
        this.activeTab = to;
      },
      routeToDetail(product){
        this.$store.commit("cacheProductSelected", product);
        this.$router.push({name: "journeyDetail",params: {id: product.purchase_id}})
      }      
    },
    computed: {
      myJourneyProductData() {
        return this.$store.state.purchaseProduct.purchaseState;
      },
      planJourneyProductData() {
        console.log(this.$store.state.purchaseProduct.unPayPurchase);
        return this.$store.state.purchaseProduct.unPayPurchase;
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'swiper/dist/css/swiper.min.css'
  
  .journey-container
    position: relative
  .tab-selected
    color: rgb(51,51,51)
  .tab-unselected
    color: rgb(128,128,128)
  .journey-tab
    display: flex
    height: 1.066667rem
    box-sizing: border-box
    > div
      width: 50%
      display: inline-block
      padding: 0.293333rem 0
      text-align: center
      font-size: 14px
      font-weight: bold
  .journey-content      
    position: fixed
    top: 2.24rem
    bottom: 0
    overview-y: scroll
    > div
      min-height: 100%
  .tab-active
    border-bottom: 2px rgb(251,217,89) solid
    color: rgba(51,51,51,1)
  .tab-unactive
    border-bottom: 1px rgb(202,201,207) solid
    color: rgba(128,128,128,1)
</style>