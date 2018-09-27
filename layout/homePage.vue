<template>
	<div>
		<router-view></router-view>	
    <foot></foot>
	</div>
</template>

<script>

  import Foot from '@/components/foot.vue'

  export default {
    // 组件的名称
    name: 'homepage',
    components: {
      Foot,
    },
    data() {
    	return {
    	}
    }
  }

</script>
