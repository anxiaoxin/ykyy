import Vue from 'vue'
import Router from 'vue-router'
import MainRoutes from '@/router'


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
	if(to.path.indexOf(mine) === -1 ||
		(to.path.indexOf(mine) > -1 && _util.isLogin())){
		
	}else{
		router.push({name: "login"});
	}
	next();
})

export default router
