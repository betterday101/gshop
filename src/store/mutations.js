import {RECEIVE_SHOPS,
  FOOD_LIST,
  SAVE_USER,
  RESET_USER,
  SHOP_RATINGS,
  SHOP_INFO,
  SHOP_GOODS,
  CHANGE_FOOD_COUNT
  } from './mutation-type'
import Vue from 'vue'
export default{
    [RECEIVE_SHOPS](state,shops){
         state.shopList=shops;
      },
    [FOOD_LIST](state,foods){
       state.foodCategory=foods;
    },
    [SAVE_USER](state,user){
       state.user=user;
    },
    [RESET_USER](state){
      state.user={};
    },
    [SHOP_RATINGS](state,{ratings}){
      state.shopratings=ratings;
    },
    [SHOP_INFO](state,{shopinfo}){
      state.shopinfo=shopinfo;
    },
    [SHOP_GOODS](state,{shopgoods}){
      state.shopgoods=shopgoods;
    },
    [CHANGE_FOOD_COUNT](state,{count,food}){
      debugger
      if(!food.count)
      {
        Vue.set(food, 'count', 1);
      }
      else {
        if(food.count>0){
           food.count+=count;
        }
      }

    }
}
