import {RECEIVE_SHOPS,
  FOOD_LIST,
  SAVE_USER,
  RESET_USER,
  SHOP_RATINGS,
  SHOP_INFO,
  SHOP_GOODS,
  CHANGE_FOOD_COUNT,
  CLEAR_CART
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
      if(!food.count)
      {
        Vue.set(food, 'count', 1);
        state.shopCart.push(food);
      }
      else {
        if(food.count>0){
           food.count+=count;
        }
        if(food.count===0){
          state.shopCart.splice(state.shopCart.indexOf(food),1);
        }
      }

    },

    [CLEAR_CART](state){
      state.shopCart.forEach((item,index)=>{
        item.count=0;
      });
      state.shopCart=[];
    },
}
