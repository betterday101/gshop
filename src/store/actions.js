import {reqShopList,reqFoodList,reqLoginSms,reqUserinfo,reqLogout,reqShopGoods,reqShopRatings,reqShopInfo} from '@/api'
import {RECEIVE_SHOPS,FOOD_LIST,SAVE_USER,RESET_USER,SHOP_GOODS,SHOP_INFO,SHOP_RATINGS,CHANGE_FOOD_COUNT,CLEAR_CART} from './mutation-type'

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
    const result= await reqUserinfo();
    if(result.code===0){
      const user=result.data;
      commit(SAVE_USER,user);
    }
    },

  //10.用户退出登录<br/>
  async getlogOut({commit}){
    const result= await reqLogout();
    if(result.code===0){
      commit(RESET_USER);
    }
  },
  //商家商品<br/>
  async getShoopGoods({commit},callback){
    const result= await reqShopGoods();
    if(result.code===0){
      const shopgoods=result.data;
      commit(SHOP_GOODS,{shopgoods});
      typeof callback==='function'&&callback();
    }
  },
  //商家评价<br/>
  async getShopRatings({commit}){
    const result= await reqShopRatings();
    if(result.code===0){
      const ratings=result.data;
      commit(SHOP_RATINGS,{ratings});
    }
  },
  //商家信息<br/>
  async getShopInfo({commit}){
    const result= await reqShopInfo();
    if(result.code===0){
      const shopinfo=result.data;
      shopinfo.score=2.8;
      commit(SHOP_INFO,{shopinfo});
    }
  },

  //商品数量增加更新
  async getCountFood({commit,state},{count,food}){
      commit(CHANGE_FOOD_COUNT,{count,food});
  },


  //清空购物车
  async clearCart({commit}){
    commit(CLEAR_CART);
  },
}
