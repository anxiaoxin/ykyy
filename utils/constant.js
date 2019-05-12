const needLoginUrl = /(mine)|(purchase)/g;

const GradeData = [
  {
    text: "一年级",
    value: 1
  },
  {
    text: "二年级",
    value: 2
  },
  {
    text: "三年级",
    value: 3
  },                    
  {
    text: "四年级",
    value: 4
  },
  {
    text: "五年级",
    value: 5
  },
  {
    text: "六年级",
    value: 6
  },
  {
    text: "初中一年级",
    value: 11
  },
  {
    text: "初中二年级",
    value: 12
  },
  {
    text: "初中三年级",
    value: 13
  },
  {
    text: "高中一年级",
    value: 21
  },     
  {
    text: "高中二年级",
    value: 22
  }, 
  {
    text: "高中三年级",
    value: 23
  },    
]

const HealthData = [
  {
    text: "健康",
    value: 0
  },  
  {
    text: "良好",
    value: 1
  },         
  {
    text: "一般",
    value: 2
  }                
]

const GroupNums = [
  {
    text: "2人",
    value: 2
  },
  {
    text: "3人",
    value: 3
  },
  {
    text: "4人",
    value: 4
  },
  {
    text: "5人",
    value: 5
  }        
]

const HeadlthDataList = ["健康", "良好", "一般"];

const ProductType = ["史诗文画", "科学筑梦", "成长营地"];

const ProductCategory = ["history", "science", "grow"];

const PurchaseState = ["待支付", "进行中", "已完成"];

const EndParamToFrontParam = {
  "student_name": "studentName",
  "student_age": "studentAge", 
  "student_birth": "studentBirth", 
  "student_creater": "studentCreater", 
  "student_grade": "studentGrade", 
  "student_guardian1": "studentGuardian1", 
  "student_guardian2": "studentGuardian2", 
  "student_header": "studentHeader", 
  "student_health_status": "studentHealthStatus", 
  "student_health_info": "studentHealthInfo", 
  "student_idcard": "studentIdcard", 
  "student_idcard1": "studentIdcard1", 
  "student_idcard2": "studentIdcard2", 
  "student_phone": "studentPhone", 
  "student_phone1": "studentPhone1", 
  "student_phone2": "studentPhone2", 
  "student_region": "studentRegion", 
  "student_school": "studentSchool", 
  "student_sex": "studentSex",
  "student_change_time": "studentChangeTime",
  "student_changer": "studentChanger",
  "student_create_time": "studentCreateTime",
  "student_id": "studentId",
  "student_uuid": "studentUuid",
  "student_status": "studentStatus",
  "user_id": "userId",
  "user_uuid": "userUuid",
  "user_wx": "userWx",
  "user_parent": "userParent",
  "user_phone": "userPhone",
  "user_password": "userPassword",
  "user_name": "userName",
  "user_head": "userHead",
  "user_birth": "userBirth",
  "user_sex": "userSex",
  "user_idcard": "userIdcard",
  "user_region": "userRegion",
  "user_score": "userScore",
  "user_create_time": "userCreateTime",
  "user_change_time": "userChangeTime",
  "user_change_id": "userChangeId",
  "user_authority": "userAuthority",
  "user_status": "userStatus",
  "product_id": "productId",
  "product_uuid": "productUuid",
  "product_name": "productName",
  "product_image": "productImage",
  "product_introduction": "productIntroduction",
  "product_type": "productType",
  "product_is_index": "productIsIndex",
  "product_path": "productPath",
  "product_money": "productMoney",
  "product_status": "productStatus",
  "product_create_time": "productCreateTime",
  "product_change_time": "productChangeTime",
  "product_creater": "productCreater",
  "product_changer": "productChanger"  
}

const FrontParamToEndParam = {
  "studentName": "student_name",
  "studentAge": "student_age", 
  "studentBirth": "student_birth", 
  "studentCreater": "student_creater", 
  "studentGrade": "student_grade", 
  "studentGuardian1": "student_guardian1", 
  "studentGuardian2": "student_guardian2", 
  "studentHeader": "student_header", 
  "studentHealthStatus": "student_health_status", 
  "studentHealthInfo": "student_health_info", 
  "studentIdcard": "student_idcard", 
  "studentIdcard1": "student_idcard1", 
  "studentIdcard2": "student_idcard2", 
  "studentPhone": "student_phone", 
  "studentPhone1": "student_phone1", 
  "studentPhone2": "student_phone2", 
  "studentRegion": "student_region", 
  "studentSchool": "student_school", 
  "studentSex": "student_sex",
  "studentChangeTime" : "student_change_time",
  "studentChanger": "student_changer",
  "studentCreateTime": "student_create_time",
  "studentId": "student_id",
  "studentUuid": "student_uuid",
  "studentStatus": "student_status",
  "userId": "user_id",
  "userUuid": "user_uuid",
  "userWx": "user_wx",
  "userParent": "user_parent",
  "userPhone": "user_phone",
  "userPassword": "user_password",
  "userName": "user_name",
  "userHead": "user_head",
  "userBirth": "user_birth",
  "userSex": "user_sex",
  "userIdcard": "user_idcard",
  "userRegion": "user_region",
  "userScore": "user_score",
  "userCreateTime": "user_create_time",
  "userChangeTime": "user_change_time",
  "userChangeId": "user_change_id",
  "userAuthority": "user_authority",
  "userStatus": "user_status",
  "productId": "product_id",
  "productUuid": "product_uuid",
  "productName": "product_name",
  "productImage": "product_image",
  "productIntroduction": "product_introduction",
  "productType": "product_type",
  "productIsIndex": "product_is_index",
  "productPath": "product_path",
  "productMoney": "product_money",
  "productStatus": "product_status",
  "productCreateTime": "product_create_time",
  "productChangeTime": "product_change_time",
  "productCreater": "product_creater",
  "productChanger": "product_changer"  
}

const UserDefaultHeadImg = "/static/img/image-pay-logo@3x.93c4726.png";

const HomePageHeadName = {
  home: "一课一游",
  journey: "行程",
  mine: "我的"
}

const ServerUrl = "https://yikeyiyou.com/"

export {
  GradeData,
  HealthData,
  ProductType,
  ProductCategory,
  EndParamToFrontParam,
  FrontParamToEndParam,
  HeadlthDataList,
  UserDefaultHeadImg,
  HomePageHeadName,
  GroupNums,
  needLoginUrl,
  PurchaseState,
  ServerUrl
}