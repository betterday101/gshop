import Vue from 'vue'
import Router from 'vue-router'
import Msite from '@/pages/Msite/Msite.vue'
import Order from '@/pages/Order/Order.vue'
import Profile from '@/pages/Profile/Profile.vue'
import Search from '@/pages/Search/Search.vue'
import Login from '@/pages/Login/Login.vue'
import Shop from '@/pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'


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
      component: Shop,
      children:[
        {
          path: '/shop/shopgoods',
          component: ShopGoods,
        },
        {
          path: '/shop/shopinfo',
          component: ShopInfo,
        },
        {
          path: '/shop/shopratings',
          component: ShopRatings,
        },
        {
          path: '',
          redirect:'/shop/shopgoods',
        }
      ]
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
