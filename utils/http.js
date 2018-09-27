import axios from 'axios'
import Urls from './urls.js'

// 设置响应拦截器
axios.interceptors.response.use(function(response){
     // 暂时只需要data
     return response;
   },function(error){
     //请求错误时做些事
     //_utils.showSystemError();
     return Promise.reject(error);
   });

// data: {params: {key: value}}
const commonGet = (url, data) => {
  return axios.get(url, data);
}

// data: {key: value, key: value}
const commonPost = (url, data) => {
  return axios.post(url, data);
}

// 登录
const Login = (data) => {
  return commonPost(Urls.login, data);
}

// 注册
const Register = (data) => {
  return commonPost(Urls.register, data);
}

// 忘记密码
const ForgetPass = (data) => {
  return commonPost();
}

// 修改手机号
const ChangePhoneNum = data => {
  return commonPost();
}

// 获取指定类型的产品
const GetTypeProducts = data => {
  return commonPost(data);
}


export {
  Register,
  ForgetPass,
  ChangePhoneNum, 
  GetTypeProducts
}