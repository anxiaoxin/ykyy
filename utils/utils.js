/**
 * 该文件存放公共的方法，主要是一些工具类的方法，较少涉及到网站的功能
 * 比如判断是否为函数，生成标准时间等
 */

import Msg from '../utils/tipMessage.js';

const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
const passwordReg = /^[A-Za-z0-9]{6,15}$/;
const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

class Utils {

	/**
	 * @param  {[type]}
	 * @return {Boolean}
	 */
	isFunction(fun){
		return typeof fun === "function";
	}

  /**
   * 校验数据
   */
  validate(params){
    let me = this;

    for(let index = 0; index < params.length; index++){
      let value = params[index];
      // 如果不存在校验函数，则跳过
      if(!me.isFunction(me["validate" + value.type])){
        continue ;
      }

      if(!me["validate" + value.type](params[index])){
        return false;
      }
        
    }

    return true;
  }

  /**
   * 验证不能为空
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  validateEmpty(data){

    if(!data.value){
      _showTip(data.name + "不能为空");
      return false;
    }else{
      return true;
    }
  }

  /**
   * 验证手机号
   * @param  {[type]} phoneNum [description]
   * @return {[type]}          [description]
   */
  validatePhone(phone){

    if(!this.validateEmpty(phone)){
      return false;
    }

    if(!phoneReg.test(phone.value)){
      _showTip(Msg.ErrorPhone);
      return false;
    }

    return true;
  }

  /**
   * 验证6-15位数字字母密码
   */
  validatePassWord(password){

    if(!this.validateEmpty(password)){
      return false;
    }

    if(!passwordReg.test(password.value)){
      _showTip(Msg.ErrorPassWord);
      return false;
    }

    return true;
  }

  /**
   * 两次输入密码的验证（不能为空，必须一致）
   * @return {[type]} [description]
   */
  validateTwoPassWord(passwords){
    passwords = passwords.value;
    if(typeof passwords === "array" && passwords.length === 2){
      if(passwords[0].password !== passwords[1].password){
        _showTip(Msg.UnSamePassWords);
        return false;
      }else{
        return me.validatePassWord(passwords[0]) && me.validatePassWord(passwords[0]);
      }
    }else{
      return false;
    }
  }

  /**
   * 验证验证码(不能为空)
   * @param  {[type]} identify [description]
   * @return {[type]}          [description]
   */
  validateIdentify(identify){
    if(!this.validateEmpty(identify)){
      return false;
    }
    return true;
  }

  /**
   * 验证身份证信息
   * 为了在页面中有多个身份证号输入时区分，前缀放在了验证参数的name中
   * 比如只有一个输入时name为身份证号，有多个时name为孩子身份证，监护人1身份证
   * @param  {[type]} idCard [description]
   * @return {[type]}        [description]
   */
  validateIdCard(idCard){
    if(!this.validateEmpty(idCard)){
      return false;
    }

    if(!idCardReg.test(idCard.value)){
      _showTip(idCard.name + Msg.ErrorIdCard);
      return false;
    }
    return true;
  }

  /**
   * 获取cookie
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  getCookie(name){
    let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;    
  }

  /**
   * 设置cookie
   * @param {[type]} name  [description]
   * @param {[type]} value [description]
   * @param {[type]} day   [description]
   */
  setCookie(name,value,day){
    // 默认30天
    day = day || 30;
    let time = new Date();
    time.setTime(time.getTime() + day*24*60*60*1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  }

  /**
   * 删除cookie，设置cookie过期
   * @param  {[type]} nane [description]
   * @return {[type]}      [description]
   */
  deleteCookie(name){
    let time = new Date();
    time.setTime(time.getTime() - 1);
    let value = this.getCookie(name);
    value == null || (
      document.cookie = name + "=" + value + ";expires=" + time.toGMTString();
      )
  }

  /**
   * 提示注册成功
   * @return {[type]} [description]
   */
  showRegisterSuccess(){
    _showTip(Msg.RegistSuccess);
  }

  /**
   * 提示系统问题
   * @return {[type]} [description]
   */
  showSystemError(){
    _showTip(Msg.ErrorSystem);
  }

  /**
   * 判断是否登录
   * @return {Boolean} [description]
   */
  isLogin(){

    if(this.getCookie("user_uuid")){
      return true;
    }else{
      return false;
    }
  }

}

export default new Utils;
