<template>
	<div>
    <div v-if="pageType === 'register' || pageType === 'forgetPass'">
      <div class="register-top">
        <div class="input-container">
          <input class="register-button-base input" type="number" name="" v-model="phoneNum" placeholder="手机号">
          <div class="icon">
            <div class="phone-img"></div>
            <div class="vertical-line"></div>
          </div>
        </div>
        <div class="input-container">
          <input class="register-button-base input" type="password" name="" placeholder="验证码" v-model="identify">
          <div class="icon">
            <div class="identifying-code"></div>
            <div class="vertical-line"></div>
          </div>
          <div class="send-sms" @click="sendSMS">{{identifyText}}</div>
        </div>
        <div class="input-container">
          <input class="register-button-base input" type="password" name="" v-model="password" placeholder="输入密码">
          <div class="icon">
            <div class="pass-img"></div>
            <div class="vertical-line"></div>
          </div>
        </div>
        <div class="input-container">
          <input class="register-button-base input" type="password" name="" v-model="passwordTmp" placeholder="再次输入密码">
          <div class="icon">
            <div class="pass-img"></div>
            <div class="vertical-line"></div>
          </div>
        </div>            
        <div>
          <button class="register-button-base register-button" @click="register">{{buttonText}}</button>
        </div>
      </div>
    </div>
    <div v-if="pageType === 'changePhoneNum'">
      <div class="register-top">
        <div class="input-container">
          <input class="register-button-base input" type="password" name="" v-model="password" placeholder="输入密码">
          <div class="icon">
            <div class="pass-img"></div>
            <div class="vertical-line"></div>
          </div>
        </div>        
        <div class="input-container">
          <input class="register-button-base input" type="number" name="" v-model="phoneNum" placeholder="手机号">
          <div class="icon">
            <div class="phone-img"></div>
            <div class="vertical-line"></div>
          </div>
          <div class="send-sms" @click="sendSMS">{{identifyText}}</div>          
        </div>
        <div class="input-container">
          <input class="register-button-base input" type="text" name="" placeholder="验证码" v-model="identify">
          <div class="icon">
            <div class="identifying-code"></div>
            <div class="vertical-line"></div>
          </div>
        </div>
        <div>
          <button class="register-button-base register-button" @click="changePhoneNum">完成</button>
        </div>
      </div>      
    </div>
    <div v-if="pageType === 'changePass'">
      <div class="register-top">
        <div class="input-container">
          <input class="register-button-base input" type="password" name="" v-model="password" placeholder="输入原始密码">
          <div class="icon">
            <div class="pass-img"></div>
            <div class="vertical-line"></div>
          </div>
        </div>        
        <div class="input-container">
          <input class="register-button-base input" type="password" name="" v-model="newPassword" placeholder="输入新密码">
          <div class="icon">
            <div class="pass-img"></div>
            <div class="vertical-line"></div>
          </div>
        </div> 
        <div class="input-container">
          <input class="register-button-base input" type="password" name="" v-model="newPasswordTmp" placeholder="再次输入密码">
          <div class="icon">
            <div class="pass-img"></div>
            <div class="vertical-line"></div>
          </div>
        </div>         
        <div>
          <button class="register-button-base register-button" @click="changePass">完成</button>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>

  import { Register } from '../utils/http.js'

	export default {
    name: 'register',
    data() {
      return {
        phoneNum: '',
        // 注册以及忘记密码时的密码参数
        password: '',
        passwordTmp: '',
        // 修改密码时的密码参数
        newPassword: '',
        newPasswordTmp: '',
        identifyText: "获取验证码",
        identify: "", // 验证码
        countDown: 60, // 倒计时
      }
    },
    methods: {
      /**
       * 跳转页面
       * @param  {[type]} to [description]
       * @return {[type]}    [description]
       */
      changeView(to){
        this.selected = to;
        this.$router.push({path: "/main/" + to});
      },

      /**
       * 发送验证码
       * @return {[type]} [description]
       */
      sendSMS(){

        // 发送验证码前验证手机号
        let validateData = {
          name: "手机号",
          value: this.phoneNum,
          type: "Phone"
        };
        if(!_utils.validate(validateData)){
          return ;
        }

        let countTime =  () => {
          this.identifyText = this.countDown + "s后重试";
          this.countDown--;
          this.countDown !== -1 || this.initCountDownData(handle);
        }      
        countTime();
        let handle = setInterval(countTime,1000)
      },

      /**
       * 计算倒计时
       * @param  {[type]} handle [description]
       * @return {[type]}        [description]
       */
      initCountDownData(handle){
        clearInterval(handle);
        this.identifyText = "获取验证码";
        this.countDown = 60;
      },

      // 注册以及忘记密码时的验证参数
      validateData(){
        let params = [
          {
            name: "手机号",
            value: this.phoneNum,
            type: "Phone"
          },{
            name: "验证码",
            value: this.identify,
            type: "Identify",
          },{
            name: "",
            value: [
              {
                name: "密码",
                value: this.password,
                type: PassWord
              },{
                name:"确认密码",
                value: this.passwordTmp,
                type: PassWord
              }
            ],
            type: "TwoPassWord"
          }
        ]
        return _utils.validate(params);
      },

      // 注册
      register(){
        let params = { 
          "user_authority": 0,
          "user_password": this.password, 
          "user_phone": this.phoneNum,

        }

        if(this.validateData()){
          Register(params).then((data) => {
            // 如果成功了替换当前的location
            _utils.showRegisterSuccess();
            this.$router.replace({path: "/login"})
          }).catch((data) => {
            console.log(2, data);
          })  
        }
      },

      // 修改密码
      changePass(){
        if(this.validateChangepassParam()){
          let params = {
            password: this.password,
            newPassword: this.newPassword
          }
          // 进行http请求
        }
      },

      // 修改密码时的参数验证
      validateChangepassParam(){
        let params = [
          {
            name: "原密码",
            value: this.password,
            type: "PassWord"
          },
          {
            name: "",
            value: [
              {
                name: "新密码",
                value: this.newPassword,
                type: PassWord
              },{
                name:"确认密码",
                value: this.newPasswordTmp,
                type: PassWord
              }
            ],
            type: "TwoPassWord"
          },
        ]
        return _utils.validate(params);
      },

      changePhoneNum(){
        if(this.validateChangePhoneNumParams){
          // send http request
        }
      },

      validateChangePhoneNumParams(){
        let params = [
          {
            name: "密码",
            value: this.password,
            type: PassWord
          },{
            name: "手机号",
            value: this.phoneNum,
            type: "Phone"
          },{
            name: "验证码",
            value: this.identify,
            type: "Identify",
          }
        ];
        return _utils.validate(params);
      }
    },
    computed: {
      buttonText() {
        // 使用$route取参，而不是$router
        return this.$route.params.id === "register" ? "注册" : "修改密码";
      },
      // 页面类型，表示当前页面是注册 or 修改密码 or 修改手机号 or 忘记密码
      // register forgetPass changePhoneNum changePass
      pageType() {
        return this.$route.params.id;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  @import '../utils/mixin.styl'
  
  .input-container
    position: relative
  
  .register-div
    width: 100%
    margin: 0 0.48rem
    height: 1.213333rem
  
  .register-button-base
    width: 9.04rem
    margin: 0.4rem auto 0
    height: 1.213333rem
    text-align: center
    border: none
    border-radius: 0.066667rem
    display: block
    box-sizing: border-box
    
  .input
    border: 0.026667rem solid #CAC9CF
    text-align: left
    padding-left: 1.2rem
    outline: none
    color: #333333
    
  .register-button 
    background-color: #FBD959
    font-size: 16px
    font-weight: bolder
    display: block
    
  .icon-bk
    background-size: 0.426667rem 0.426667rem
    background-repeat: no-repeat
    vertical-align: top 
    position: absolute
    width: 0.426667rem
    height: 0.426667rem 
    left: 0.28rem  
    top: 0.413333rem 
    
  .register-top
    margin-top: 0.8rem
    
  .icon
    position: absolute
    left: 0.4rem
    top: 0
    bottom: 0
    width: 1.2rem
    box-sizing: border-box
    .phone-img
      @extend .icon-bk
      bg-image('../assets/image/icon/icon-log-in-phone')
    .identifying-code
      @extend .icon-bk
      bg-image('../assets/image/icon/icon-log-up-verification-code')      
    .pass-img
      @extend .icon-bk         
      bg-image('../assets/image/icon/icon-log-in-password')
    
    .vertical-line
      position: absolute
      border: none
      border-left: 0.026667rem solid #CAC9CF
      left: 0.853333rem
      height: 0.76rem
      top: 0.226667rem
  
  .send-sms
    position: absolute
    right: 0.7rem
    top: 0.266667rem
    color: rgb(51,51,51)
    font-weight: lighter
    padding: 0.12rem
    border: 0.026667rem solid rgb(51,51,51)
    border-radius: 0.066667rem
    width: 1.6rem
    text-align: center
    
</style>
