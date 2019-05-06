<template>
  <div>
    <!-- <t-head 
      :isShowBack=true
      :headName="headName"
    >
    </t-head> -->
    <div class="mine-info-list">
      <div @click="pageTo('changePhoneNum')" class="mine-type-item">
        <div class="mine-type-text">修改手机号</div>
        <div class="mine-type-right">></div> 
      </div>
    </div>
    <div class="mine-info-list">
      <div @click="pageTo('changePass')" class="mine-type-item">
        <div class="mine-type-text">修改密码</div>
        <div class="mine-type-right">></div> 
      </div>
    </div>        
  </div>
</template>

<script>
  export default {
    name: "mineSetting",
    data(){
      return {
        headName: "设置"
      }
    },
    methods: {
      pageTo(to){
        this.$router.push({name: "register",params:{id: to}});
      }
    },
    computed: {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>