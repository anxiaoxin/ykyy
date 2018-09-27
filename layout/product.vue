<template>
  <div>
    <div>
      
    </div>
    <div class="product-list-container">
      <div v-for="product in productData">
        <list-item @click="routeToDetail(product.product_id)" 
          :type="product.product_type" 
          :imgUrl="product.product_image"
          :title="product.product_name"
          :abstract="product.product_introduction"
          :category="product.product_type"

          :orderTime="product.product_create_time"
          :journeyState="product.product_status"

          :orderPrice="product.product_money"
         ></list-item>        
      </div>
    </div>    
  </div>
</template>

<script>
	import ListItem from '../components/productList'

	export default {
		name:"typeProduct",
		data(){
			return {
				productData:{

				}
			}
		}
	}

</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>