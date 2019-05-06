<template>
  <div>
    <!-- <t-head 
      :isShowBack=true
      :headName="name"
    >
    </t-head> -->
    <div class="product-list-container">
      <div v-for="(product, key) in productData" v-bind:key="key">
        <list-item
          :type="product.type" 
          :imgUrl="product.productImage"
          :title="product.productName"
          :abstract="product.productIntroduction"
          :category="product.productType"
          :productId="product.productId"
         ></list-item>        
      </div>
      <div v-if="productData.length !== 0" class="moreProduct">
        更多课程正在研发中，敬请期待...
      </div>
    </div>    
    <div v-if="productData.length === 0" class="emptyProduct">
      该板块正在规划中，敬请期待...
    </div>
  </div>
</template>

<script>
  import ListItem from '../components/productList'
  import tHead from '../components/head'
  import { ProductCategory, ProductType } from '../utils/constant.js'
  import { GetProductByType } from '../utils/http.js'
	export default {
		name:"typeProduct",
    components: {
      ListItem,
      tHead
    },
		data(){
			return {
        productType: 0,
			}
		},
    mounted(){
      // 产品类型字符串
      let categoryString = this.$route.params.id;
      let category = ProductCategory.indexOf(categoryString);
      this.productType = category > -1 ? category : 0;  
      if(this.$store.state.typeProduct[categoryString].length === 0) {
        this.getProductList();
      }
    },
    methods: {
      getProductList(){
        _utils.getAndCacheProductByType.call(this, {producttype: this.productType, page: 1, pageNum: 10});
      }
    },
    computed: {
      productData() {
        return this.$store.state.typeProduct[this.$route.params.id];
      },
      name() {
        let index = ProductCategory.indexOf(this.$route.params.id);
        index > -1 || (index = 0);
        return ProductType[index];
      }
    }
	}

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .productMsg
    width: 100%
    text-align: center;
    color: #BDBDBD    
    
  .moreProduct
    @extends .productMsg
    font-size: 12px
    position: relative
    top: 0.2rem
  .emptyProduct
    @extends .productMsg
    font-size: 16px
</style>