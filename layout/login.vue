<template>
	<div>
    <div class="logo">
    </div> 
    <div>
      <div class="input-container">
        <input class="login-button-base input" type="number" @focus="changeFootClass(true)" @blur="changeFootClass(false)" v-model="phoneNum" name="" placeholder="手机号">
        <div class="icon">
          <div class="phone-img"></div>
          <div class="vertical-line"></div>
        </div>
      </div>
      <div class="input-container">
        <input class="login-button-base input" type="password" @focus="changeFootClass(true)" @blur="changeFootClass(false)" v-model="password" name="" placeholder="密码">
        <div class="icon">
          <div class="pass-img"></div>
          <div class="vertical-line"></div>
        </div>
        <div class="forget-pass" @click="register('forgetPass')">忘记密码？</div>
      </div>
      <div>
        <button class="login-button-base login" @click="login">登陆</button>
      </div>
    </div>
    <div class="register">
      <span @click="register('register')">立即注册</span>
      <span @click="loginByWechat">微信登陆</span>
    </div>
    <div class="login-foot" :class="loginStatic">
    </div>
  </div>
</template>

<script>
  
  import { Login, LoginByWechat } from '../utils/http.js'

	export default {
    data(){
      return {
        phoneNum: "",
        password: "",
        loginStatic: ""
      }
    },
    mounted(){
      // 页面加载时判断是否为微信登陆url
      let code = _utils.getUrlParam("code");
      let me = this;
      if(code){
        LoginByWechat({"code": code}).then(res => {
            if(res.code === 200){
              _utils.setCookie("uuid",res.result.user_uuid);
              _utils.setCookie("userId",res.result.user_id);
              let userCache = _utils.changeParamNames(res.result, "ETF");
              _utils.setUserCache.call(me, userCache);
              me.$router.replace({path: "/main/mine"});
            }else{
              //  提示失败原因
              _showTip(res.message); 
            }         
      }).catch(data => {
  
        })
      }
    },
    methods: {
      validateData(){
        let data = [
          {
            name: "手机号",
            value: this.phoneNum,
            type: "Phone"
          },{
            name: "密码",
            value: this.password,
            type: "PassWord"
          }
        ];
        return _utils.validate(data);
      },
      login(){
        let params = {
          phone: this.phoneNum,
          password: this.password
        };
        if(this.validateData()){
          let me = this;
          Login(params).then((res) =>{
            // 登录成功
            if(res.code === 200){
              _utils.setCookie("uuid",res.result.userBean.user_uuid);
              _utils.setCookie("userId",res.result.userBean.user_id);
              let userCache = _utils.changeParamNames(res.result.userBean, "ETF");
              userCache.accessKey = res.result.accessKey;
              userCache.securityKey = res.result.securityKey;
              _utils.setUserCache.call(me, userCache);
              me.$router.replace({path: "/main/mine"});
            }else{
              //  提示失败原因
              _showTip(res.message);
            }
          }).catch(function(){

          })
        }
      },
      register(type){
        // 坑，使用此方法必须使用name，否则params无效
        this.$router.push({name: "register",params:{id: type}});
      },
      loginByWechat(){
        let appId = "wx9411cfeabd1b8396";
        let code = _utils.getUrlParam("code");
        let local = window.location.href;
        if(!code){
          window.location.href = 
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + 
          "&redirect_uri=" + encodeURIComponent(local) + 
          "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
        }
      },
      changeFootClass(isStatic) {
        let className = "login-foot-static";
        isStatic || (className = "");
        this.loginStatic = className;
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  @import '../utils/mixin.styl'
  
  .input-container
    position: relative
  
  .login-div
    width: 100%
    margin: 0 0.48rem
    height: 1.213333rem
  
  .login-button-base
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
    
  .login 
    background-color: #FBD959
    font-size: 16px
    font-weight: bolder
    display: block
    
  .brand
    background-size: 2.6rem 2.813333rem
    background-repeat: no-repeat
    vertical-align: top       //一般图片与文字的对其方式需指定 top 是使其顶端对其
    
  .icon-bk
    background-size: 0.426667rem 0.426667rem
    background-repeat: no-repeat
    vertical-align: top 
    position: absolute
    width: 0.426667rem
    height: 0.426667rem 
    left: 0.28rem  
    top: 0.413333rem 
    
  .logo
    @extend .brand
    width: 2.613333rem
    height: 2.813333rem
    margin: 2.16rem auto 0.746667rem
    bg-image('../assets/image/logo/image-log-in-logo')
    
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
  
  .forget-pass
    position: absolute
    right: 0.5rem
    top: 0.386667rem
    color: #333333
    font-weight: lighter
  
  .register
    margin-top: 0.666667rem
    color: #333333
    text-align: center
    display: flex;
    justify-content: space-around 
    
  .login-foot
    position: fixed
    left: 0
    right: 0
    bottom: 0
    background-size: 100% 100%
    background-repeat: no-repeat
    vertical-align: top
    width: 100%
    height: 4.0rem
    bg-image('../assets/image/background/image-log-in-background')
    
  .login-foot-static
    position: static !important
    margin-top: 2.6rem
</style>
