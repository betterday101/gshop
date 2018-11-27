import Ajax from './ajax'
const base="http://localhost:5000"
// 1、根据经纬度获取位置详情<br/>
export function reqLocation(location){ return Ajax(`/api/position/${location}`)}

//export const reqLocation =(location)=> Ajax(`/api/position/${location}`)
// 2、获取食品分类列表<br/>
export const reqFoodList =()=> Ajax('/api/index_category')
// 3、根据经纬度获取商铺列表<br/>
