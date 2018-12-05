export default{
  //计算购物车的物件总数
  totalCount(state){
   return state.shopCart.reduce((prev,item)=> prev+=item.count,0)
  },
  //计算购物车的总价格
  totalPrice(state){
    return state.shopCart.reduce((prev,item)=> prev+=item.count*item.price,0)
  },
  //计算所有评价的数量
  totalRatings(state){
    return state.shopratings.length;
  },
  //计算推荐评价的数量
  totalPositiveRatings(state){
    return state.shopratings.reduce((prev,item)=> prev+=(item.rateType===0?1:0),0)
  },
}
