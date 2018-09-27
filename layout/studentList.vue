<template>
  <div class="student-list-container">
    <div class="student-list-item-box">
      <student-list-item>
      </student-list-item>
    </div>
    <div class="student-list-item-box">
      <student-list-item >
      </student-list-item>
    </div>
    <div class="student-list-item-box">
      <student-list-item >
      </student-list-item>
    </div>

    <div class="student-list-item-box">
      <student-list-item >
      </student-list-item>
    </div>        
    <div class="add-student">
      <div @click="pageTo()">
        <div class="add-icon"></div>
        <div class="add-student-text">添加学生</div>
      </div>
    </div>
  </div>
</template>

<script>
  import StudentListItem from '../components/studentListItem'
  export default {
    name: "",
    components: {
      StudentListItem,
    },
    data(){
      return {
        studentsInfo: [
          {

          }
        ]
      }
    },
    methods: {
      pageTo(){
        this.$router.push({path: "/mine/studentInfo/edit"});
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  
  addIconSize = 0.4rem
  @import '../utils/mixin.styl'
  .brand
    background-repeat: no-repeat
    vertical-align: top
    width: addIconSize
    height: addIconSize
    background-size: addIconSize addIconSize
    
  .student-list-container
    width: 93%
    margin: 0 auto
    margin-top: 0.266667rem
    margin-bottom: 2.24rem
    .student-list-item-box
      margin-bottom: 0.266667rem
  .add-student
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
    >div
      width: 93%
      height: 1.173333rem
      background-color: #FBD959
      border-radius: 0.106667rem
      color: #333333
      display: flex
      justify-content: center
      align-items: center
      .add-student-text
        font-size: 16px
        font-weight: bolder
        color: #333333
        margin-left: 0.266667rem
  .add-icon
    @extends .brand
    bg-image("../assets/image/icon/icon-student-management-add")
</style>