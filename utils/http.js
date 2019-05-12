import axios from 'axios'
import Urls from './urls.js'

axios.defaults.baseURL = "https://www.yikeyiyou.com/server";
// 设置请求拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// 设置响应拦截器
axios.interceptors.response.use(response => {
     // 暂时只需要data
     _utils.closeMask();
     return response.data;
   }, error => {
     //请求错误时做些事
     _utils.closeMask();
     _utils.showSystemError();
     return Promise.reject(error);
   });

// data: {params: {key: value}}
const commonGet = (url, data, showLoading) => {
  showLoading && (_utils.showMask(showLoading.msg));
  return axios.get(url, {params: data});
}

// data: {key: value, key: value}
const commonPost = (url, data, showLoading) => {
  showLoading && (_utils.showMask(showLoading.msg));
  return axios.post(url, data);
}

// 登录
const Login = (data) => {
  return commonPost(Urls.login, data, {msg: ""});
}

// 注册
const Register = (data) => {
  return commonPost(Urls.register, data, {msg: ""});
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

const UpdateUserInfo = data => {
  return commonPost(Urls.updateUser, data, {msg: ""});
}

// 添加孩子
const AddStudent = data => {
  return commonPost(Urls.addStudent, data, {msg: ""});
}

const ChangePass = data => {
  return commonPost(Urls.changePass, data, {msg: ""});
}

// 获得用户信息，主要用于更新store缓存
const GetUserInfo = data => {
  return commonGet(Urls.getUserInfo, data);
}

// 获得首页产品列表
const GetHomePageProduct = data => {
  return commonGet(Urls.getHomePageProduct, data);
}

// 根据类别get产品列表
const GetProductByType = data => {
  return commonGet(Urls.getProductByType, data, {msg: ""});
}

// 获取用户孩子数据
const GetStudentsByUserId = data => {
  return commonGet(Urls.getStudentsByUserID, data, {msg: ""});
}

// 更新孩子信息
const UpdateStudent = data => {
  return commonPost(Urls.updateStudent, data, {msg: ""});
}

//  微信登录的接口
const LoginByWechat = data => {
  return commonGet(Urls.loginByWechat, data, {msg: ""});
}

// 获得用户的优惠券
const GetUserCoupons = data => {
  return commonGet(Urls.getUserCoupons, data);
}

// 通过用户id获取订单信息
const GetUserPurchaseByUserId = data => {
  return commonGet(Urls.getUserPurchaseByUserId, data);
}

// 根据id获得产品信息
const GetProductById = data => {
  return commonGet(Urls.getProductById, data);
}

// 添加订单
const AddPurchase = data => {
  let {userId, userCouponsId, purchaseBean} = data;
  let queryString =  `?userId=${userId}&userCouponsId=${userCouponsId}`
  return commonPost(Urls.addPurchase + queryString, purchaseBean, {msg: ""});
}

// 通过产品信息id获取产品信息数据
const GetProductInfoById = data => {
  return commonGet(Urls.getProductInfoById, data);
}

// 根据产品id获取产品具体信息数据
const GetProductInfoByProductId = data => {
  return commonGet(Urls.getProductInfoByProductId, data);
}

const WxPay = data => {
  return commonGet(Urls.pay, data, {}, {msg: "请稍等..."});
}

const GetSign = data => {
  return commonPost(Urls.getSign, data);
}

const UpdateParentId =  data => {
  return commonPost(Urls.updateParentId, data);
}

const DeleltePurchase = data => {
  return commonPost(Urls.deletePurchase, data, {msg: "删除中..."});
}

const DeleteStudent = data => {
  return commonGet(Urls.deletStudent, data, {msg: "删除中..."});
}

export {
  Register,
  ForgetPass,
  ChangePhoneNum, 
  GetTypeProducts,
  Login,
  UpdateUserInfo,
  AddStudent,
  ChangePass,
  GetUserInfo,
  GetHomePageProduct,
  GetProductByType,
  GetStudentsByUserId,
  UpdateStudent,
  LoginByWechat,
  GetUserCoupons,
  GetUserPurchaseByUserId,
  GetProductById,
  AddPurchase,
  GetProductInfoById,
  GetProductInfoByProductId,
  WxPay,
  GetSign,
  UpdateParentId,
  DeleltePurchase,
  DeleteStudent
}