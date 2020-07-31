import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home/Home.vue'
import CommodityDetail from '../views/CommodityDetail/CommodityDetail.vue'
import Login from '../views/Login/Login.vue'
import Order from '../views/Order/Order.vue'
import Pay from '../views/Pay/Pay.vue'
import Personal from '../views/Personal/Personal.vue'
import Register from '../views/Register/Register.vue'
import Cart from '../views/Cart/Cart.vue'
import OrderDetail from '../views/OrderDetail/OrderDetail.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/commodityDetail',
    name: 'CommodityDetail',
    component:CommodityDetail
  },
  {
    path: '/login',
    name: 'Login',
    component:Login
  },
  {
    path: '/order',
    name: 'Order',
    component:Order,
    meta : {requiresAuth: true}
  },
  {
    path: '/cart',
    name: 'Cart',
    component:Cart,
    meta : {requiresAuth: true}
  },
  {
    path: '/pay',
    name: 'Pay',
    component:Pay,
    meta : {requiresAuth: true}
  },
  {
    path: '/personal',
    name: 'Personal',
    component:Personal
  },
  {
    path: '/register',
    name: 'Register',
    component:Register
  },
  {
    path: '/orderDetail',
    name: 'OrderDetail',
    component:OrderDetail,
    meta : {requiresAuth: true}
  }
]

const router = new VueRouter({
  routes
})

export default router
