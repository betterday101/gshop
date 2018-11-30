import Vue from 'vue'
import Router from 'vue-router'
import Msite from '@/pages/Msite/Msite.vue'
import Order from '@/pages/Order/Order.vue'
import Profile from '@/pages/Profile/Profile.vue'
import Search from '@/pages/Search/Search.vue'
import Login from '@/pages/Login/Login.vue'
import Shop from '@/pages/Shop/Shop.vue'

Vue.use(Router)
export default new Router({
  mode:"history",
  routes: [
    {
      path: '/msite',
      component: Msite,
      meta:{
        isShow:true
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        isShow:true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        isShow:true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        isShow:true
      }
    } ,
    {
      path: '/login',
      component: Login
    } ,
    {
      path: '/shop',
      component: Shop
    } ,
    {
      path: '/',
      redirect: '/msite',
      meta:{
        isShow:true
      }
    }
  ]
})
