<template>
  <div>
    <div class="mine-info-list">
      <div @click="pageTo('studentList')" class="mine-type-item">
        <div class="mine-type-text">修改手机号</div>
        <div class="mine-type-right">></div> 
      </div>
    </div>
    <div class="mine-info-list">
      <div @click="pageTo('studentList')" class="mine-type-item">
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

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>