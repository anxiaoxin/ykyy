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
                <div v-for="product in myJourneyProductData">
                  <list-item @click="routeToDetail(product.id)" 
                    :type="product.type"
                    :imgUrl="product.imgUrl"
                    :title="product.title"
                    :category="product.category"
                    :orderTime="product.orderTime"
                    :journeyState="product.journeyState"
                   ></list-item>        
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="product-list-container">
                <div v-for="product in planJourneyProductData">
                  <list-item @click="routeToDetail(product.id)" 
                    :type="product.type"
                    :imgUrl="product.imgUrl"
                    :title="product.title"
                    :category="product.category"
                    :orderTime="product.orderTime"
                    :orderPrice="product.orderPrice"
                   ></list-item>        
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

        myJourneyProductData: [
          {
            type: "myJourney" ,
            imgUrl: "",
            title: "北京-六朝古都",
            orderTime: "2018-07-24",
            journeyState: "进行中",
            category: "史诗文画",         
          },                                                                            
        ],

        planJourneyProductData: [
          {
            type: "planJourney" ,
            imgUrl: "",
            title: "北京-六朝古都",
            orderTime: "2018-07-24",
            orderPrice: "2280",
            category: "史诗文画",          
          },                
        ],
      }
    },
    watch: {
      activeTab(){
        console.log(this.activeTab);
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
      var me = this;
      this.mySwiper = new Swiper('.swiper-container',{
        centeredSlides: true,
        observer: true,
        observeParents: true,
        on: {
          slideChangeTransitionEnd: function(){
            console.log(this.activeIndex);
            me.activeTab = this.activeIndex;
          }
        }        
      })
    },
    methods: {
      slideTo(to){
        this.mySwiper.slideTo(to, 500, false);
        this.activeTab = to;
      },

      routeToDetail(){
        
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
    top: 1.066667rem
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