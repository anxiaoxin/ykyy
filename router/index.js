import HomePage from '@/layout/homePage'
import Home from '@/layout/home'
import Journey from '@/layout/journey'
import Mine from '@/layout/mine'
import Login from '@/layout/login'
import Register from '@/layout/Register'
import Product from '@/layout/product'
import StudentList from '@/layout/studentList'
import EditStudent from '@/layout/editStudent'
import CouponList from '@/layout/coupons'
import MineSetting from '@/layout/mineSetting'
import MineEditInfo from '@/components/editUserInfo'
import ProductInfo from '@/layout/productInfo'
import Purchase from '@/layout/purchase'
import PaySuccess from '@/components/paySuccess'
import About from '@/layout/about'
import Honor from '@/components/honor'
import Honors from '@/layout/honors'
import JourneyDetail from '@/layout/journeyDetail'


const routes = [
    {
      path: '/main',
      name: 'main',
      component: HomePage,
      children: [
        {
          path: 'home',
          component: Home,          
        },
        { // 行程页
          path: 'journey',
          component: Journey,          
        },
        { // 我的页
          path: 'mine',
          component: Mine,        
        }        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register/:id',
      name: 'register',
      component: Register
    },
    {
      path: '/product/:id',
      name:'product',
      component: Product
    },
    {
      path: '/productInfo/:id',
      name:'productInfo',
      component: ProductInfo
    },
    {
      path: '/purchase/:type',
      name:'purchase',
      component: Purchase
    },
    {
      path: '/journey/:id',
      name: 'journeyDetail',
      component: JourneyDetail
    },     
    {
      path: '/payResult/paySuccess',
      name:'paySuccess',
      component: PaySuccess
    },     
    {
      path: '/mine/studentList',
      name:'studentList',
      component: StudentList      
    },
    {
      path: '/mine/studentInfo/edit/:type',
      name:'studentInfoEdit',
      component: EditStudent   
    },
    {
      path: '/mine/coupon',
      name:'couponList',
      component: CouponList   
    },  
    {
      path: '/mine/about',
      name:'about',
      component: About   
    },   
    {
      path: '/mine/honors',
      name:'honors',
      component: Honors   
    },    
    {
      path: '/mine/honor',
      name:'honor',
      component: Honor   
    },            
    {
      path: '/mine/mineSetting',
      name:'mineSetting',
      component: MineSetting   
    },    
    {
      path: '/mine/mineEditInfo',
      name:'mineEditInfo',
      component: MineEditInfo   
    },          
]

export default routes
