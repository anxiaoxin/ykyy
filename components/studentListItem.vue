<template>
  <div class="student-list">
    <div class="student-list-head">
      <div class="student-list-head-img">
        <img src="../assets/image/tmp/head2.jpg">
      </div>
      <div class="student-list-head-userinfo">
        <div class="student-list-head-username">
          <span>{{studentName}}</span>
          <div :class="sexClass"></div>
        </div>
        <div class="student-list-head-edit">
          <div @click="editStudent()"></div>
          <span @click="editStudent()">修改学生信息</span>
        </div>         
      </div>      
      <div @click="toggleBody()" class="student-list-head-show-body">
        <div :class="editClass"></div>
        <span>展开详细信息</span>
      </div>    
    </div>
    <div v-if="isShowBody" class="student-list-body">
      <div>
        <div>学校</div>
        <div>{{studentSchool}}</div>
      </div>
      <div>
        <div>年龄</div>
        <div>{{studentAge}}</div>
      </div>
      <div>
        <div>手机号</div>
        <div>{{studentPhone}}</div>
      </div>
      <div>
        <div>健康状态</div>
        <div>{{studentHealthStatus}}</div>
      </div>
      <div>
        <div>健康详情</div>
        <div>{{studentHealthInfo}}</div>
      </div>
      <div>
        <div>监护人1</div>
        <div>{{studentGuardian1}}</div>
      </div>                              
      <!-- <div>
        <div>监护人2</div>
        <div>{{studentGuardian2}}</div>
      </div>  -->
      <div>
        <div @click="deleteStudent" class="delete_student">
          删除
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
  import { DeleteStudent } from '../utils/http.js'
  export default {
    name: "studentList",
    props: {
      studentName: "",
      studentAge: "",  
      studentGrade: "", 
      studentGuardian1: "", 
      studentGuardian2: "", 
      studentHeader: "", 
      studentHealthStatus: "", 
      studentHealthInfo: "", 
      studentPhone: "", 
      studentSchool: "", 
      studentSex: "",
      studentImage: "",
      studentId: "",
      index: ""
    },
    data(){
      return {
        isShowBody: false
      }
    },
    methods: {
      editStudent() {
        this.$emit("editStudent", this.index);
      },
      toggleBody() {
        this.isShowBody = !this.isShowBody;
      },
      deleteStudent() {
        let userId = _utils.getCookie("userId");
        let params = {
          userid: userId,
          studentid: this.studentId
        }
        DeleteStudent(params).then(data => {
          _showTip("删除成功");
          _utils.getAndCatchStudents.call(this);
        }).catch(data => {

        })
      }
     },
    computed: {
      sexClass() {
        return this.studentSex === 0 ? "boy" : "girl";
      },
      editClass() {
        return this.isShowBody ? "up" : "down";
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../utils/mixin.styl'
  sex-icon-size = 0.266667rem
  edit-icon-size = 0.346667rem
  .brand
    background-repeat: no-repeat
    vertical-align: top
  
  .boy
    bg-image("../assets/image/icon/icon-student-management-boy")
  .girl
    bg-image("../assets/image/icon/icon-student-management-girl")

  .up
    bg-image("../assets/image/icon/icon-student-management-pack-up")
  .down
    bg-image("../assets/image/icon/icon-student-management-unfold")
    
  .student-list
    position: relative
    border-radius: 0.133333rem
    -moz-box-shadow:0 0 15px rgb(220,220,220) 
    -webkit-box-shadow:0 0 15px rgb(220,220,220) 
    box-shadow:0 0 15px rgb(220,220,220);     
    width: 100%
    .student-list-head
      box-sizing: border-box
      padding: 0.466667rem 0.48rem
      height: 2.266667rem
      position: relative
      >div
        display: inline-block
      .student-list-head-img
        width: 1.333333rem
        height: 1.333333rem
        position: absolute
        >img
          width: 1.333333rem
          height: 1.333333rem
          border-radius: 50%
      .student-list-head-userinfo
        margin-left: 1.733333rem
        
        .student-list-head-username
          line-height: 14px
          margin: 0.12rem 0.0rem 0.333333rem
          >span
            font-size: 14px
            font-weight: bolder
            color: #333333
          >div
            @extends .brand
            width: sex-icon-size
            height: sex-icon-size
            background-size: sex-icon-size sex-icon-size
            display: inline-block
      
        .student-list-head-edit
          >div
            @extends .brand
            width: edit-icon-size
            height: edit-icon-size
            background-size: edit-icon-size edit-icon-size
            display: inline-block
            margin-top: 0.04rem
            bg-image("../assets/image/icon/icon-student-management-modification")
          span 
            font-size: 12px
            color: #B1B1B1
      .student-list-head-show-body
        position: absolute
        right: 0.48rem
        bottom: 0.55rem
        line-height: 12px
        >div
          @extends .brand
          width: 0.346667rem
          height: 0.173333rem
          background-size: 0.346667rem 0.173333rem
          display: inline-block
          margin-top: 0.066667rem
    .student-list-body
      margin: 0 0.48rem
      padding-top: 0.466667rem
      border-top: 1px solid #CAC9CF
      .delete_student
        width: 100%
        text-align : center
      >div
        display: flex
        justify-content: space-between
        padding-bottom: 0.4rem
        >div:nth-child(1)
          font-size: 14px
          color: #333333
        >div:nth-child(2)
          font-size: 12px
          color: #808080
        
          
</style>