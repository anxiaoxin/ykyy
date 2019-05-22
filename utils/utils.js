/**
 * 该文件存放公共的方法，主要是一些工具类的方法，较少涉及到网站的功能
 * 比如判断是否为函数，生成标准时间等
 */

import Msg from '../utils/tipMessage.js';
import { GetUserInfo, GetStudentsByUserId, GetHomePageProduct, GetProductById,
  GetUserCoupons, GetProductByType, GetUserPurchaseByUserId, GetSign, UpdateParentId } from './http.js'
import { EndParamToFrontParam, FrontParamToEndParam, ProductType, ProductCategory } from './constant.js'
import coupons from '../store/moudels/coupons.js';
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

    if(data.value == undefined || data.value === ""){
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

    if(passwords instanceof Array && passwords.length === 2){
      if(passwords[0].value !== passwords[1].value){
        _showTip(Msg.UnSamePassWords);
        return false;
      }else{
        return this.validatePassWord(passwords[0]) && this.validatePassWord(passwords[0]);
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
    day = day || 5;
    let time = new Date();
    time.setTime(time.getTime() + day*60*1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + time.toGMTString();
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
      document.cookie = name + "=" + value + ";expires=" + time.toGMTString()
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

    if(this.getCookie("uuid")){
      return true;
    }else{
      return false;
    }
  }

  /**
   * 参数名称转换
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  changeParamNames(data, type){
    let dataTmp = {};
    let paramData = type === "ETF" ? EndParamToFrontParam : FrontParamToEndParam;
    for(let property in data){
      if(paramData[property]){
        dataTmp[paramData[property]] = data[property]; 
      }else{
        dataTmp[property] = data[property];
      }
    }
    return dataTmp;
  }

  /**
   * 缓存用户数据
   * @param {[type]} data [description]
   */
  setUserCache(data){
    let cacheData = _utils.changeParamNames(data, "ETF");
    this.$store.commit("setUserCache", cacheData);
    _utils.handleShare.call(this);
  }

  /**
   * 根据cookie获取用户信息，保持用户登录状态以及数据缓存
   * @return {[type]} [description]
   */
  getUserInfo(){
    let me = this;
    if(_utils.getCookie("uuid") && _utils.getCookie("userId") != undefined){
      GetUserInfo({userid: _utils.getCookie("userId")}).then(data => {
        if(data.code === 200){
          _utils.setUserCache.call(me, data.result);
        }else{
          // 如果获取用户数据时失效，则将cookie置空并导航至首页
          _utils.deleteCookie("uuid");
          _utils.deleteCookie("userId");
          window.location.reload();
        }
      }).catch(data => {

      })
      // 每次获取用户数据都请求次用户的优惠券
      _utils.getAndCacheCoupons.call(this, {userId: _utils.getCookie("userId")});
    }
  }

  resetCookie(){

  }

  /**
   * 显示遮罩
   * @param  {[type]} msg [description]
   * @return {[type]}     [description]
   */
  showMask(msg){
    msg || (msg = "");
    let div = `
      <div class="loadingMask">
        <div class="loading">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>        
        </div>
        <span>${msg}</span>
      </div>
    `
    let loadMask = document.createElement("div");
    loadMask.innerHTML = div;
    loadMask.id = "loadMask";
    document.body.appendChild(loadMask);
  }

  /**
   * 关闭遮罩
   * @return {[type]} [description]
   */
  closeMask(){
    let loadMask = document.getElementById("loadMask");
    loadMask && (document.body.removeChild(loadMask));
  }

  /**
   * 获得url中指定的参数
   *
   * @param {*} name
   * @returns
   * @memberof Utils
   */
  getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let value = window.location.search.substr(1).match(reg);
    if( value != null ) {
      return unescape(value[2]);
    }else {
      return null;
    }
  }

  /**
   * 时间戳转换为不带时分秒的YMD的格式，拼接符可自定义
   *
   * @param {*} timeStamp
   * @memberof Utils
   */
  timeStamp2date1(timeStamp, str){
    let date;
    str || (str = '-');
    if(timeStamp) {
      date = new Date(timeStamp);
    }else{
      date = new Date();
    }
    let Y = date.getFullYear() + str;
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + str;
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y+M+D;//时分秒可以根据自己的需求加上

  }

  /**
   * 获取孩子信息并缓存在vuex中
   * 该方法使用的是async以及await方法，因为开始函数设计有返回值
   * 现函数结构改变，取消了返回值。因为是首次使用该特性，所以保留写法以供参考。
   * 
   * @returns
   * @memberof Utils
   */
  async getAndCatchStudents(){
    // 获得用户的id
    let userid = _utils.getCookie("userId");
    let studentsInfo = [];
    if(!userid) {
     return ;
    }
    // 根据用户id获取孩子数据
    let result = await GetStudentsByUserId({userid: userid, page: 1, pageNum: 100});
    // 处理请求结果
    if(result.code !== 200) {

    }else {
      result.result.list.forEach((value, index) => {
        studentsInfo.push(_utils.changeParamNames(value, "ETF"));
      })
      this.$store.commit("setStudentsCache", studentsInfo);
    }
  }

  /**
   * 获取并缓存首页推荐的行程
   *
   * @memberof Utils
   */
  getAndCacheHomeProductList() {
    let me = this;
    GetHomePageProduct({page: 1, pageNum: 10}).then(data => {
      let homeProducts = [];
      data.result.list.forEach((value, index) => {
        let productData = _utils.changeParamNames(value, "ETF");
        // list组件需要的type类型
        productData.type = "product";
        productData.productType = ProductType[productData.productType];
        homeProducts.push(productData);
      })
      me.$store.commit("setHomeProductCache", homeProducts);
    })
  }

  getAndCacheSelectedProduct(param) {
    let me = this;
    GetProductById(param).then(data => {
      let productInfo = _utils.changeParamNames(data.result, "ETF");
      // list组件需要的type类型
      productInfo.type = "product";
      productInfo.productType = ProductType[productInfo.productType];      
      me.$store.commit("cacheProductSelected", productInfo);
    })
  }

  /**
   * 检查需要的缓存数据是否已缓存，没有的话进行缓存
   *
   * @param {*} types
   * @memberof Utils
   */
  checkCache(types) {
    types.forEach(type => {
      switch(type) {
        case "students":
          if(!this.$store.state.student.students.length) {
            _utils.getAndCatchStudents.call(this);
          }
          break;
        default:
          break;
      }
    })
  }

  /**
   * 通过类型获取并缓存产品
   *
   * @memberof Utils
   */
  getAndCacheProductByType(param) {
    GetProductByType(param).then(data => {
      let productList = []
      data.result.list.forEach((value, index) => {
        let productData = _utils.changeParamNames(value, "ETF");
        // list组件需要的type类型
        productData.type = "product";
        productData.productType = ProductType[productData.productType];
        productList.push(productData);
      })
      let type = ProductCategory[param.producttype];
      this.$store.commit("setProductCacheByType", {
        type: type,
        data: productList
      })
    }).catch(data => {

    })
  }

  /**
   * 获取并存储用户优惠券
   *
   * @param {*} param
   * @memberof Utils
   */
  getAndCacheCoupons(param) {
    GetUserCoupons(param).then(data => {
      if(data.code === 200) {
        this.$store.commit("setCouponsCache", data.result);
      }
    })
  }

  /**
   * 获取并缓存用户订单数据
   *
   * @param {*} param
   * @memberof Utils
   */
  getAndCacheUserPurchase(param) {
    GetUserPurchaseByUserId(param).then(data => {
      if(data.code === 200) {
        let res = data.result.list.filter(item => {
          if(item.productInfoBean) {
            return true;
          }
        })
        res.forEach(item => {
          if(!item.productInfoBean){
            return;
          }
          let productData = _utils.
            changeParamNames(item.productInfoBean.productBean, "ETF");
          productData.type = "product";
          productData.productType = ProductType[productData.productType];
          item.productInfoBean.productBean = productData;
        })
        // list组件需要的type类型
        this.$store.commit("setPurchaseCache", res);
      }
    }).catch(data => {

    })
  }

  initShare(info) {
    let params = {"url": location.href.split('#')[0]};
    GetSign(params).then(data => {
      this.configWxShare(info, data.result);
    }).catch(data => {

    })
  } 

  configWxShare(info, wxData) {
    wx.config({
      debug: false, //开启debug模式，在验证签名过程中会返回对应信息
      appId: wxData.appid,
      timestamp: +wxData.timestamp,
      nonceStr: wxData.nonceStr,
      signature: wxData.signature,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
    })
    //ready中调用api
    wx.ready(function(){
      let pid = info.pid;
      let uid = _utils.getCookie("userId");
      let url =  `https://www.yikeyiyou.com/?ykyy_u=${uid}${pid ? `&ykyy_p=${pid}` : ""}`;
      let sdata = {
          title: info.title,
          desc: info.desc,
          link: url,
          imgUrl: info.imgUrl || "https://www.yikeyiyou.com/shares/logo.jpg",
          success: function (r) {
            _showTip("分享成功");
          },
          cancel: function () {
            _showTip("取消分享");
          },
          fail: function(r) {
            _showTip("分享失败");
          } 
      };
      wx.onMenuShareTimeline(sdata);
      wx.onMenuShareAppMessage(sdata);
  }); 
  }

  updateParenId(info) {
    UpdateParentId(info).then(data => {

    }).catch(data => {

    })
  }

  getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let value = window.location.search.substr(1).match(reg);
    if(value) {
      return value[2];
    }else {
      return undefined;
    }
  }

  handleShare() {
    let pid = _utils.getCookie("pid");
    let uid = _utils.getCookie("uid");
    // 如果有uid则进行father node的绑定
    if(uid) {
      UpdateParentId({
        userId: uid,
        userWx: this.$store.state.mine.userWx
      }).then(data => {
        _utils.deleteCookie("uid");
      }).catch(data => {

      })
    }

    if(pid) {
      this.$router.push({name: 'productInfo',params: {id: pid}});
      _utils.deleteCookie("pid");
    }
  }
}

export default new Utils;
