import Vue from 'vue'
import Router from 'vue-router'
import MainRoutes from '@/router'
import { needLoginUrl } from './constant.js'

// 在router入口处声明Vue使用router，在main.js中写也可以
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/main/home',
    },
    ...MainRoutes
  ]
})

router.beforeEach((to, from, next) => {
  // 路由转换前的操作
  let isNeedLogin = needLoginUrl.test(to.path);
  
	if((!isNeedLogin ||
		(isNeedLogin && _utils.isLogin()))){
		
	}else{
		router.push({name: "login"});
	}
	next();
})

router.afterEach((to, from) => {
  let pageTypePath = ['/main/home', '/main/journey', '/main/mine'];
  if(pageTypePath.includes(to.path)){
    router.app.$store.commit("changePage",to.path.split("/")[2]);
  }
})
export default router
