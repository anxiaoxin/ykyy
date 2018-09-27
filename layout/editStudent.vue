<template>
  <div>
    <div v-if="step === 1">
      <div class="edit-student-info">
        <div>
          <div>姓名</div>
          <div><input type="text" name="" placeholder="点击输入"></div>
        </div>
        <div>
          <div>性别</div>
          <div class="edit-student-info-sex">
            <div :class="isBoySelected" @click="selectSex('boy')">
              <div :class="editBoyClass"></div>
              <div>男生</div>
            </div>
            <div :class="isGirlSelected" @click="selectSex('girl')">
              <div :class="editGirlClass"></div>
              <div>女生</div>
            </div>
          </div>
        </div>
        <div>
          <div>学校</div>
          <div><input type="text" name=""  placeholder="点击输入"></div>
        </div>            
        <div>
          <div>年级</div>
          <div><input type="text" name="" @click="showPick('grade')" readonly="true" placeholder="点击选择" v-model="grade"></div>
        </div>
        <div>
          <div>手机号</div>
          <div><input type="tel" name="" placeholder="点击输入"></div>
        </div>           
      </div>
    </div>
    <div v-if="step === 2">
      <div class="edit-student-info">
        <div>
          <div>年龄</div>
          <div><input type="text" name="" placeholder="点击输入"></div>
        </div>
        <div>
          <div>身份证号码</div>
          <div><input type="text" name="" placeholder="点击输入"></div>
        </div>            
        <div>
          <div>健康情况</div>
          <div><input type="text" @click="showPick('health')" readonly="true" name="" placeholder="点击选择" v-model="health"></div>
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
          <div>监护人1姓名</div>
          <div><input type="text" name="" placeholder="点击输入"></div>
        </div>
        <div>
          <div>身份证号码</div>
          <div><input type="text" name="" placeholder="点击输入"></div>
        </div>            
        <div>
          <div>手机号码</div>
          <div><input type="tel" name="" placeholder="点击输入"></div>
        </div>
        <div>
          <div>监护人2姓名</div>
          <div><input type="text" name="" placeholder="点击输入"></div>
        </div> 
        <div>
          <div>身份证号码</div>
          <div><input type="text" name="" placeholder="点击输入"></div>
        </div> 
        <div>
          <div>手机号码</div>
          <div><input type="tel" name="" placeholder="点击输入"></div>
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
      @concel="close"
      @confirm="confirmFn"
    ></vue-pickers>
  </div>
</template>

<script>
  import vuePickers from 'vue-pickers'
  export default {
    name: "editStudent",
    components: {
      vuePickers,
    },
    data(){
      return {
        sex: "boy",
        step: 1,
        nextAllComplete: "下一步",
        langOrShort: "edit-student-step1",

        grade: "",
        health: "",

        gradeData: [
          {
            text: "一年级",
            value: 1
          },
          {
            text: "二年级",
            value: 1
          },
          {
            text: "三年级",
            value: 1
          },                    
          {
            text: "四年级",
            value: 1
          },
          {
            text: "五年级",
            value: 1
          },
          {
            text: "六年级",
            value: 1
          },
          {
            text: "初中一年级",
            value: 1
          },
          {
            text: "初中二年级",
            value: 1
          },
          {
            text: "初中三年级",
            value: 1
          },
          {
            text: "高中一年级",
            value: 1
          },     
          {
            text: "高中二年级",
            value: 1
          }, 
          {
            text: "高中三年级",
            value: 1
          },    
        ],
        healthData: [
          {
            text: "健康",
            value: 1
          },  
          {
            text: "良好",
            value: 1
          },         
          {
            text: "一般",
            value: 1
          }                
        ],
        defaultData: [], 
        pickShow: false,
        pickType: "grade",
        pickData: {
          data1: []
        }
      } 
    },
    methods: {
      selectSex(sex){
        this.sex = sex;
      },
      upStep(){
        if(this.step > 1){
          this.step--;
        }
      },
      nextStep(){
        if(this.step === 3){
          // 请求数据
        }else{
          this.step++;  
        }
      },
      showPick(pickType){
        this.pickShow = true;
        this.pickType = pickType;
        this.pickData.data1 = pickType === "grade" ? this.gradeData:this.healthData;
      },
      close(){
        this.pickShow = false;
      },
      confirmFn(value){
        this.pickShow = false;
        let dataValue = value.select1.text;
        if(this.pickType === "grade"){
          this.grade = dataValue;
        }else{
          this.health = dataValue;
        }
        console.log(this.grade, this.health);
      }
    },
    computed: {
      editBoyClass(){
        return this.sex === "boy" ? "edit-sex-boy-selected":".edit-sex-boy"
      },
      editGirlClass(){
        return this.sex === "boy" ? "edit-sex-girl":"edit-sex-girl-selected";
      },
      isBoySelected(){
        return this.sex === "boy" ? "sex-selected":"sex-unselected";
      },
      isGirlSelected(){
        return this.sex === "boy" ? "sex-unselected":"sex-selected";
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