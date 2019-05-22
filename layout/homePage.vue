<template>
	<div v-if="showPage">
    <!-- <t-head 
      :isShowBack=false
      :headName="headName"
    >
    </t-head> -->
		<router-view></router-view>	
    <foot></foot>
	</div>
</template>

<script>

  import Foot from '@/components/foot.vue'
  import { HomePageHeadName } from '../utils/constant.js'
  import { LoginByWechat } from '../utils/http.js'

  export default {
    // 组件的名称
    name: 'homepage',
    components: {
      Foot,
    },
    data() {
    	return {
        showPage: false
    	}
    },
    mounted() {
      this.checkShare();
      this.login();
    },
    methods: {
      login() {
        if(!_utils.getCookie('uuid')) {
          // 登录操作
          let code = _utils.getUrlParam("code");
          // 如果没有code则进行用户授权
          if( !code ) {
            this.loginByWechat();
          }else {
            LoginByWechat({"code": code}).then(res => {
                if(res.code === 200){
                  this.showPage = true;
                  _utils.setCookie("uuid",res.result.userBean.user_uuid);
                  _utils.setCookie("userId",res.result.userBean.user_id);
                  _utils.setCookie("usertn",res.result.token);
                  let userCache = _utils.changeParamNames(res.result.userBean, "ETF");
                  _utils.setUserCache.call(me, userCache);
                }else{
                  //  提示失败原因
                  _showTip(res.message); 
                }         
          }).catch(data => {
      
          })
          }
        }else {
          // 当前已经有用户数据，则显示
          this.showPage = true;
        }        
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
      checkShare() {
        let pid = _utils.getUrlParam("ykyy_p");
        let uid = _utils.getUrlParam("ykyy_u");
        if(pid) {
        _utils.setCookie("pid", pid);
        }
        if(uid) {
        _utils.setCookie("uid", uid);
        }
      }
    },
    computed: {
      headName() {
        return HomePageHeadName[this.$store.state.foot.pageType];
      }
    },    
  }

</script>
