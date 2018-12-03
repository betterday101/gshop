export default{
  //计算购物车的物件总数
  totalCount(state){
   return state.shopCart.reduce((prev,item)=> prev+=item.count,0)
  },
  //计算购物车的总价格
  totalPrice(state){
    return state.shopCart.reduce((prev,item)=> prev+=item.count*item.price,0)
  },
}
