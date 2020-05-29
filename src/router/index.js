import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '../components/Login.vue'
const Login = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/Login.vue')

// import Home from '../components/Home.vue'
const Home = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/Home.vue')

// import Welcome from '../components/Welcome.vue'
const Welcome = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/Welcome.vue')

// import Users from '../components/Users/Users.vue'
const Users = () => import(/* webpackChunkName: "Users_Right_Roles" */ '../components/Users/Users.vue')

// import Right from '../components/power/Right.vue'
const Right = () => import(/* webpackChunkName: "Users_Right_Roles" */ '../components/power/Right.vue')

// import Roles from '../components/power/Roles.vue'
const Roles = () => import(/* webpackChunkName: "Users_Right_Roles" */ '../components/power/Roles.vue')

// import Category from '../components/goods/Category.vue'
const Category = () => import(/* webpackChunkName: "Category_Params_List" */ '../components/goods/Category.vue')

// import Params from '../components/goods/Params.vue'
const Params = () => import(/* webpackChunkName: "Category_Params_List" */ '../components/goods/Params.vue')

// import List from '../components/goods/List.vue'
const List = () => import(/* webpackChunkName: "Category_Params_List" */ '../components/goods/List.vue')

// import Add from '../components/goods/add.vue'
const Add = () => import(/* webpackChunkName: "Add_Order_Report" */ '../components/goods/add.vue')

// import Order from '../components/order/orders.vue'
const Order = () => import(/* webpackChunkName: "Add_Order_Report" */ '../components/order/orders.vue')

// import Report from '../components/report/report.vue'
const Report = () => import(/* webpackChunkName: "Add_Order_Report" */ '../components/report/report.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{ path: '/welcome', component: Welcome },
    { path: '/users', component: Users },
    { path: '/rights', component: Right },
    { path: '/roles', component: Roles },
    { path: '/categories', component: Category },
    { path: '/params', component: Params },
    { path: '/list', component: List },
    { path: '/goods/add', component: Add },
    { path: '/order', component: Order },
    { path: '/report', component: Report }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router













