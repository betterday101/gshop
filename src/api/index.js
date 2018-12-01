import Ajax from './ajax'

const BASE="/api";
// 1、根据经纬度获取位置详情<br/>
export function reqLocation(latitude,longitude){ return Ajax(BASE+`/position/${latitude},${longitude}`)}
//export const reqLocation =(location)=> Ajax(`/api/position/${location}`)

// 2、获取食品分类列表<br/>
export const reqFoodList =()=> Ajax(BASE+'/index_category')

// 3、根据经纬度获取商铺列表<br/>
export const reqShopList =(latitude,longitude)=> Ajax(BASE+'/shops',{latitude,longitude})

// 6、用户名密码登陆<br/>
export const reqLoginPwd =({name,pwd,captcha})=> Ajax(BASE+'/login_pwd',{name,pwd,captcha},"POST")

// 7、发送短信验证码<br/>
export const reqSendCode =(phone)=> Ajax(BASE+'/sendcode',{phone})

// 8、手机号验证码登陆<br/>
export const reqLoginSms =(phone,code)=> Ajax(BASE+'/login_sms',{phone,code},"POST")

// 9、根据会话获取用户信息<br/>
export const reqUserinfo =()=> Ajax(BASE+'/userinfo');

// 10、用户登出<br/>
export const reqLogout =()=> Ajax(BASE+'/logout');

//商家商品
export const  reqShopGoods=()=>Ajax('/shopgoods');
//商家评价
export const  reqShopRatings=()=>Ajax('/shopratings');
//商家信息
export const  reqShopInfo=()=>Ajax('/shopinfo');
