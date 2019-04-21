<template>
  <div>
    <div class="edit-user-info">
      <div>
        <div>姓名</div>
        <div><input type="text" name="" v-model="userName" placeholder="点击输入"></div>
      </div>
      <div>
        <div>性别</div>
        <div class="edit-user-info-sex">
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
        <div>地区</div>
        <div><input type="text" name="" readonly="true" placeholder="点击选择" @click="showPicker()" v-model="userRegion"></div>
      </div>           
    </div>
    <div class="edit-user-step-button">
      <div class="next-step" @click="update">完成</div>
    </div>   
    <vue-pickers
      :show="pickShow"
      :columns= 3
      :link= true
      :defaultData="defaultData"
      :selectData="pickData"
      @cancel="close"
      @confirm="confirmFn"
    ></vue-pickers>           
  </div>
</template>

<script>
  import vuePickers from 'vue-pickers'
  import { provs_data, citys_data, dists_data } from 'vue-pickers/lib/areaData'
  import { UpdateUserInfo } from '../utils/http.js'
  export default {
    name: "edituser",
    components: {
      vuePickers,
    },
    data(){
      return {
        userName: "",
        userSex: 0,
        userRegion: "",
        defaultData: [], 
        pickShow: false, 
        pickData: {
          data1: provs_data,
          data2: citys_data,
          data3: dists_data,
        }
      } 
    },
    methods: {
      selectSex(sex){
        this.userSex = sex;
      },
      showPicker(){
        this.pickShow = true;
      },
      close(){
        this.pickShow = false;
      },
      confirmFn(value){
        this.pickShow = false;
        this.userRegion = "";
        for(let item in value){
          if(value[item].text === "市辖区" || value[item].text === "县"){
            continue;
          }
          this.userRegion += value[item].text;
        }
      },
      validateData(){
        let data = [
          {
            name: "姓名",
            value: this.userName,
            type: "Empty"
          },{
            name: "地区",
            value: this.userRegion,
            type: "Empty",
          }
        ];
        return _utils.validate(data);
      },
      update(){
        if(!this.validateData()){
          return;
        }

        let me = this;
        let params = {
          user_id: this.$store.state.mine.userId,
          user_sex: this.userSex,
          user_region: this.userRegion,
          user_name: this.userName
        }

        UpdateUserInfo(params).then(data => {
          // 更新成功的话更新用户缓存数据
          if(data.code !== 200){
            _showTip(data.message);
            return ;
          }
          let updateData = {
            userName: me.userName,
            userSex: me.userSex,
            userRegion: me.userRegion
          }
          me.$store.commit("setUserCache", updateData);
          _showTip("修改成功");
          // 回退到"我的"页面
          setTimeout(() => {
            me.$router.go(-1);  
          },500);
        }).catch(data => {

        })
      }      
    },
    mounted(){
      // 获取缓存中的数据，由于使用计算属性拿到的vuex中的
      // 属性无法直接进行修改，所以通过变招进行使用，未探究好的方法
      this.userName = this._userName;
      this.userSex = this._userSex;
      this.userRegion = this._userRegion;
    },
    computed: {
      _userName(){
        return this.$store.state.mine.userName;
      },      
      _userSex(){
        return this.$store.state.mine.userSex;
      },
      _userRegion(){
        return this.$store.state.mine.userRegion;
      },     
      editBoyClass(){
        return this.userSex != 1 ? "edit-sex-boy-selected":".edit-sex-boy"
      },
      editGirlClass(){
        return this.userSex != 1 ? "edit-sex-girl":"edit-sex-girl-selected";
      },
      isBoySelected(){
        return this.userSex != 1 ? "sex-selected":"sex-unselected";
      },
      isGirlSelected(){
        return this.userSex != 1 ? "sex-unselected":"sex-selected";
      },
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
  
  .edit-user-info
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
  .edit-user-info-sex
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

  .edit-user-step-button
    width: 9.226667rem;
    margin: 0.8rem auto 0
    display: flex
    justify-content: space-between
    >div
      width: 100%
      height: 1.173333rem
      border-radius: 0.106667rem
      text-align: center
      font-size: 16px
      line-height: 1.173333rem
      background-color: #FBD959
</style>