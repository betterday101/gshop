import {RECEIVE_SHOPS,FOOD_LIST,SAVE_USER} from './mutation-type'
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
}
