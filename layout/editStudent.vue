<template>
  <div>
    <!-- <t-head 
      :isShowBack=true
      :headName="headName"
    >
    </t-head> -->
    <div v-if="step === 1">
      <div class="edit-student-info">
        <div>
          <div>姓名</div>
          <div><input type="text" name="" v-model="studentName" placeholder="点击输入"></div>
        </div>
        <div>
          <div>性别</div>
          <div class="edit-student-info-sex">
            <div :class="isBoySelected" @click="selectSex(0)">
              <div :class="editBoyClass"></div>
              <div>男生</div>
            </div>
            <div :class="isGirlSelected" @click="selectSex(1)">
              <div :class="editGirlClass"></div>
              <div>女生</div>
            </div>
          </div>
        </div>
        <div>
          <div>学校</div>
          <div><input type="text" name="" v-model="studentSchool"  placeholder="点击输入"></div>
        </div>            
        <div>
          <div>年级</div>
          <div><input type="text" name="" @click="showPick('grade')" readonly="true" placeholder="点击选择" v-model="studentGrade"></div>
        </div>
        <div>
          <div>手机号</div>
          <div><input type="tel" name="" v-model="studentPhone" placeholder="点击输入"></div>
        </div>           
      </div>
    </div>
    <div v-if="step === 2">
      <div class="edit-student-info">
        <div>
          <div>年龄</div>
          <div><input type="text" name="" v-model="studentAge" placeholder="点击输入"></div>
        </div>
        <div>
          <div>身份证号码</div>
          <div><input type="text" name="" v-model="studentIdcard" placeholder="点击输入"></div>
        </div>            
        <div>
          <div>健康情况</div>
          <div><input type="text" @click="showPick('health')" readonly="true" name="" placeholder="点击选择" v-model="studentHealthStatus"></div>
        </div>
        <div id="health-detail">
          <div>健康详情</div>
        </div>           
        <div id="health-detail-info"><textarea placeholder="若有疾病，请说明，若无，则可跳过"></textarea></div>
      </div>
    </div>    
    <div v-if="step === 3">
      <div class="edit-student-info">
        <div>
          <div>监护人</div>
          <div><input type="text" name="" v-model="studentGuardian1" placeholder="点击输入"></div>
        </div>
        <!-- <div>
          <div>身份证号码</div>
          <div><input type="text" name="" v-model="studentIdcard1" placeholder="点击输入"></div>
        </div>             -->
        <div>
          <div>手机号码1</div>
          <div><input type="tel" name="" v-model="studentPhone1" placeholder="点击输入"></div>
        </div>
        <!-- <div>
          <div>监护人2姓名</div>
          <div><input type="text" name="" v-model="studentGuardian2" placeholder="点击输入"></div>
        </div> 
        <div>
          <div>身份证号码</div>
          <div><input type="text" name="" v-model="studentIdcard2" placeholder="点击输入"></div>
        </div>  -->
        <div>
          <div>手机号码2</div>
          <div><input type="tel" name="" v-model="studentPhone2" placeholder="点击输入"></div>
        </div>                           
      </div>
    </div>    
    <div class="edit-student-step-button">
      <div v-if="step !== 1" class="up-step" @click="upStep">上一步</div>
      <div :class="langOrShort" class="next-step" @click="nextStep">{{nextAllComplete}}</div>
    </div>
  
    <vue-pickers
      :show="pickShow"
      :columns="1"
      :defaultData="defaultData"
      :selectData="pickData"
      @cancel="close"
      @confirm="confirmFn"
    ></vue-pickers>
  </div>
</template>

<script>
  import vuePickers from 'vue-pickers'
  import { GradeData, HealthData, HeadlthDataList } from '../utils/constant.js'
  import { AddStudent, UpdateStudent } from '../utils/http.js'
  import { setTimeout } from 'timers';
  export default {
    name: "editStudent",
    components: {
      vuePickers,
    },
    data(){
      return {
        headName: "编辑学生信息",
        sex: "boy",
        step: 1,
        nextAllComplete: "下一步",
        langOrShort: "edit-student-step1",
        grade: "",
        health: "",
        gradeData: GradeData,
        healthData: HealthData,
        defaultData: [], 
        pickShow: false,
        pickType: "grade",
        pickData: {
          data1: []
        },
        studentName: "",
        studentAge: "",
        studentBirth: "",
        studentCreater: "",
        studentGrade: "",
        studentGuardian1: "",
        studentGuardian2: "",
        studentHeader: "",
        studentHealthStatus: "",
        studentHealthInfo: "",
        studentIdcard: "",
        studentIdcard1: "",
        studentIdcard2: "",
        studentPhone: "",
        studentPhone1: "",
        studentPhone2: "",
        studentRegion: "",
        studentSchool: "",
        studentSex: 0,
        studentId: "",
        type: "add"
      } 
    },
    mounted(){
      this.type = this.$route.params.type;
      // 如果是编辑模式，则赋予初始值
      let studentTmp = this.$store.state.student.editStudent;
      if(this.type !== "add" && studentTmp){
        for( let prop in studentTmp){
          if(this.hasOwnProperty(prop)){
            this[prop] = studentTmp[prop];
          }
        }
        this.studentHealthStatus = HeadlthDataList[this.studentHealthStatus];
      }
    },
    methods: {
      selectSex(sex){
        this.studentSex = sex;
      },
      upStep(){
        if(this.step > 1){
          this.step--;
        }
      },
      nextStep(){
        if(!this["validate" + this.step]()){
          return ;
        };
        if(this.step === 3){
          this.sentRequest();
        }else{
          this.step++;  
        }
      },

      // 校验第一步的数据
      validate1(){
        let data = [
          {
            name: "姓名",
            value: this.studentName,
            type: "Empty"
          },{
            name: "学校",
            value: this.studentSchool,
            type: "Empty"
          },{
            name: "年级",
            value: this.studentGrade,
            type: "Empty"
          },{
            name: "手机号码",
            value: this.studentPhone,
            type: "Phone"
          },
        ];
        return _utils.validate(data);
      },

      // 校验第二步的数据
      validate2(){
        let data = [
          {
            name: "年龄",
            value: this.studentAge,
            type: "Empty"
          },{
            name: "身份证号码",
            value: this.studentIdcard,
            type: "IdCard"
          },{
            name: "健康情况",
            value: this.studentHealthStatus,
            type: "Empty"
          },
        ];
        return _utils.validate(data);
      },

      // 校验第三步的数据
      validate3(){
        let data = [
          {
            name: "监护人姓名",
            value: this.studentGuardian1,
            type: "Empty"
          },{
            name: "监护人手机号1",
            value: this.studentPhone1,
            type: "Phone"
          },{
            name: "监护人手机号2",
            value: this.studentPhone2,
            type: "Phone"
          },
        ];
        return _utils.validate(data);
      },

      sentRequest(){
        let me = this;
        let data = {
          studentName: this.studentName,
          studentAge: this.studentAge,
          studentBirth: this.studentBirth,
          studentCreater: this.studentCreater,
          studentGrade: this.studentGrade,
          studentGuardian1: this.studentGuardian1,
          // studentGuardian2: this.studentGuardian2,
          studentHeader: this.studentHeader,
          studentHealthStatus: HeadlthDataList.indexOf(this.studentHealthStatus),
          studentHealthInfo: this.studentHealthInfo,
          studentIdcard: this.studentIdcard,
          studentIdcard1: this.studentIdcard1,
          studentIdcard2: this.studentIdcard2,
          studentPhone: this.studentPhone,
          // studentPhone1: this.studentPhone1,
          // studentPhone2: this.studentPhone2,
          studentRegion: this.studentRegion,
          studentSchool: this.studentSchool,
          studentSex: this.studentSex,
          studentId: this.studentId,
          userId: this.$store.state.mine.userId
        }

        if(this.type === "add"){
          this.addStudent(data);
        }else{
          this.updateStudent(data);
        }

      },

      addStudent(data){
        let me = this;
        AddStudent(_utils.changeParamNames(data, "FTE")).then(data => {
          if(data.code === 200){
            _showTip("添加成功");
            setTimeout(() => {
              me.$router.go(-1);
            },500)
          }
        }).catch(data => {

        })
      },

      updateStudent(data){
        let me = this;
        UpdateStudent(_utils.changeParamNames(data, "FTE")).then(data => {
          if(data.code === 200){
            this.updateCatchinfo(data);
            _showTip("修改成功");
            setTimeout( () => {
              me.$router.go(-1);
            },500)
          }
        }).catch( data => {

        })
      },
      updateCatchinfo(data){
        this.$store.commit("updateStudentInfo", data);
      },
      showPick(pickType){
        this.pickShow = true;
        this.pickType = pickType;
        this.pickData.data1 = pickType === "grade" ? this.gradeData:this.healthData;
      },
      // picker的两个回调
      close(){
        this.pickShow = false;
      },
      confirmFn(value){
        this.pickShow = false;
        let dataValue = value.select1.text;
        if(this.pickType === "grade"){
          this.studentGrade = dataValue;
        }else{
          this.studentHealthStatus = dataValue;
        }
      }
    },
    computed: {
      editBoyClass(){
        return this.studentSex != 1 ? "edit-sex-boy-selected":".edit-sex-boy"
      },
      editGirlClass(){
        return this.studentSex != 1 ? "edit-sex-girl":"edit-sex-girl-selected";
      },
      isBoySelected(){
        return this.studentSex != 1 ? "sex-selected":"sex-unselected";
      },
      isGirlSelected(){
        return this.studentSex != 1 ? "sex-unselected":"sex-selected";
      }      
    },
    watch: {
      step(){
        this.nextAllComplete = this.step === 3 ? "完成":"下一步";
        this.langOrShort = this.step === 1 ? "edit-student-step1" : "";
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  
  sexIconSize = 0.346667rem
  @import '../utils/mixin.styl'

  .brand
    background-size: sexIconSize sexIconSize
    background-repeat: no-repeat
    vertical-align: top
  
  .edit-student-info
    position: relative
    border-radius: 0.133333rem
    -moz-box-shadow:0 0 15px rgb(220,220,220) 
    -webkit-box-shadow:0 0 15px rgb(220,220,220) 
    box-shadow:0 0 15px rgb(220,220,220);     
    width: 93%
    margin: 0.266667rem auto
    >div
      width: 90%
      height: 1.333333rem
      margin: 0 auto
      display: flex
      align-items: center
      border-bottom: 1px solid #CAC9CF
      >div
        font-size: 14px
        color: #333333
      >div:nth-child(1)
        flex: 1
      >div:nth-child(2)
        flex: 2
        >input
          border: none
          width: 100%
    >div:last-child
      border-bottom: none
  .edit-student-info-sex
    display: flex
    >div
      flex: 1
      line-height: 14px
      >div
        display: inline-block
      >div:nth-child(1)
        @extends .brand
        width: sexIconSize
        height: sexIconSize
  
  #health-detail
    border-bottom: none
  
  #health-detail-info
    height: 3rem
    position: relative
    >textarea
      display: inline-block
      box-sizing: border-box
      padding: 0.253333rem 0.333333rem
      position: absolute
      top: 0
      width: 100%
      border: 1px solid #CAC9CF
      height: 2.4rem
      font-size: 14px

  .sex-selected
    color: #333333
  .sex-unselected
    color: #BDBDBD

  .edit-sex-boy
    bg-image('../assets/image/icon/icon-student-management-boy')
    
  .edit-sex-boy-selected
    bg-image('../assets/image/icon/icon-student-management-boy')
  
  .edit-sex-girl
    bg-image('../assets/image/icon/icon-student-management-girl-un')
    
  .edit-sex-girl-selected
    bg-image('../assets/image/icon/icon-student-management-girl')

  .edit-student-step-button
    width: 9.226667rem;
    margin: 0.8rem auto 0
    display: flex
    justify-content: space-between
    >div
      width: 4.16rem
      height: 1.173333rem
      border-radius: 0.106667rem
      text-align: center
      font-size: 16px
      line-height: 1.173333rem
    .up-step
      border: 1px solid #808080
      background-color: white
      color: #808080
    .next-step
      color: #333333
      background-color: #FBD959
  .edit-student-step1
    width: 100% !important
</style>