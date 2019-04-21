<template>
  <div>    
    <t-head 
      :isShowBack=true
      :headName="headName"
    >
    </t-head>
    <div class="student-list-container">
      <div class="student-list-item-box" v-for="(student, key) in studentsInfo" v-bind:key="key">
        <student-list-item @editStudent="editStudent"
          :studentName="student.studentName"      
          :studentAge="student.studentAge" 
          :studentGrade="student.studentGrade"
          :studentGuardian1="student.studentGuardian1"
          :studentGuardian2="student.studentGuardian2"
          :studentHeader="student.studentHeader"
          :studentHealthStatus="student.studentHealthStatus"
          :studentHealthInfo="student.studentHealthInfo"
          :studentPhone="student.studentPhone"
          :studentSchool="student.studentSchool"
          :studentSex="student.studentSex"      
          :studentImage="student.studentImage"
          :studentId="student.studentId"
          :index="key"    
        >
        </student-list-item>
      </div>      
      <div class="add-student">
        <div @click="addStudent()">
          <div class="add-icon"></div>
          <div class="add-student-text">添加学生</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import StudentListItem from '../components/studentListItem'
  import { GetStudentsByUserId } from '../utils/http.js'
  export default {
    name: "",
    components: {
      StudentListItem,
    },
    data(){
      return {
        headName: "学生管理"
      }
    },
    mounted(){
      // 如果缓存中的students对象被销毁或值为空，则进行请求
      let studentsCache = this.$store.state.student.students;
      if(!studentsCache || studentsCache.length === 0) {
        _utils.getAndCatchStudents.call(this);
      }
    },
    methods: {
      addStudent(){
        this.$router.push({name: "studentInfoEdit", params:{type: "add"}});
      },
      editStudent(index){
        this.$store.commit("setEditStudent", this.studentsInfo[index]);
        this.$router.push({name: "studentInfoEdit", params:{type: "edit"}});
      }
    },
    computed: {
      studentsInfo() {
        return this.$store.state.student.students;
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