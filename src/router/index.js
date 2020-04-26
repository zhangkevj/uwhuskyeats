import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserWallet from '../views/UserWallet.vue'
import BusinessDashboard from '../views/BusinessDashboard.vue'
import BusinessListing from '../views/BusinessListing.vue'
import CheckoutPage from '../views/CheckoutPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: UserWallet
  },
  {
    path: '/my-business',
    name: 'BusinessDashboard',
    component: BusinessDashboard
  },
  {
    path: '/merchants/:vendor_id/:vendor_name',
    name: 'BusinessListing',
    component: BusinessListing
  },
  {
    path: '/purchase/:product_id',
    name: 'CheckoutPage',
    component: CheckoutPage
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
