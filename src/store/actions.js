import {reqShopList,reqFoodList,reqLoginSms,reqUserinfo} from '@/api'
import {RECEIVE_SHOPS,FOOD_LIST,SAVE_USER} from './mutation-type'

export default{

    //2、获取食品分类列表<br/>
    async getFoods({commit,state}){
      const result= await reqFoodList();
      if(result.code===0){
        commit(FOOD_LIST,result.data);
      }
    },
  //3、根据经纬度获取商铺列表<br/>
  async getShops({commit,state}){
    const {latitude,longitude}=state
    const result= await reqShopList(latitude,longitude);
    if(result.code===0){
      commit(RECEIVE_SHOPS,result.data);
    }
  },

  //5、保存用户信息<br/>
  getUserInfo({commit},user){
    commit(SAVE_USER,user);
  },

  //9、实现自动登录，获取当前用户的异步action<br/>
  async getUserinfo({commit}){
      console.log("login");
    const result= await reqUserinfo();
    if(result.code===0){
      const user=result.data;
      commit(SAVE_USER,user);
    }
  },

}
