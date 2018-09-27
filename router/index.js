import HomePage from '@/layout/homePage'
import Home from '@/layout/home'
import Journey from '@/layout/journey'
import Mine from '@/layout/mine'
import Login from '@/layout/login'
import Register from '@/layout/Register'
import Product from '@/layout/product'
import StudentList from '@/layout/studentList'
import EditStudent from '@/layout/editStudent'
import CouponList from '@/components/coupon'
import MineSetting from '@/layout/mineSetting'

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
      path: '/mine/studentList',
      name:'studentList',
      component: StudentList      
    },
    {
      path: '/mine/studentInfo/edit',
      name:'studentInfoEdit',
      component: EditStudent   
    },
    {
      path: '/mine/coupon',
      name:'couponList',
      component: CouponList   
    },   
    {
      path: '/mine/mineSetting',
      name:'mineSetting',
      component: MineSetting   
    },          
]

export default routes
