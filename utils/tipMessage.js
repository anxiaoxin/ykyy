const ErrorPhone = "请输入正确的手机号";

const ErrorPassWord = "请输入6-15位数字字母密码";

const UnSamePassWords = "两次输入的密码不一致";

// 为了在页面中有多个身份证号输入时区分，前缀放在了验证参数的name中
// 比如只有一个输入时name为身份证号，有多个时name为孩子身份证，监护人1身份证
const ErrorIdCard = "输入有误";

const LoginSuccess = "登录成功";

const LoginFailed = "手机号或密码有误";

const RegistSuccess = "注册成功";

const RegistFailed = "注册失败";

const HasSendMessage = "已发送短信，请查收";

// http请求500+错误时的提示信息
const ErrorSystem = "操作失败，请稍后重试";

// 如果想在import时使用解析赋值，不用加default关键字
export default {
  ErrorPhone,
  ErrorPassWord,
  UnSamePassWords,
  RegistSuccess,
  ErrorSystem
}