import {reqShopList,reqFoodList} from '@/api'
import {RECEIVE_SHOPS,FOOD_LIST} from './mutation-type'

export default{
   //获取所有的商铺列表
    async getShops({commit,state}){
      const {latitude,longitude}=state
      const result= await reqShopList(latitude,longitude);
      if(result.code===0){
        commit(RECEIVE_SHOPS,result.data);
      }
    },
    //获取所有的食品列表
    async getFoods({commit,state}){
      const result= await reqFoodList();
      if(result.code===0){
        commit(FOOD_LIST,result.data);
      }
    }
}
