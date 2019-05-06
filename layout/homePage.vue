<template>
	<div>
    <!-- <t-head 
      :isShowBack=false
      :headName="headName"
    >
    </t-head> -->
		<router-view></router-view>	
    <foot></foot>
	</div>
</template>

<script>

  import Foot from '@/components/foot.vue'
  import { HomePageHeadName } from '../utils/constant.js'

  export default {
    // 组件的名称
    name: 'homepage',
    components: {
      Foot,
    },
    data() {
    	return {
    	}
    },
    computed: {
      headName() {
        return HomePageHeadName[this.$store.state.foot.pageType];
      }
    },    
  }

</script>
