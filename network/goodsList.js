//商品列表页面请求
import {request} from 'request.js'
export function getGoodsList(parmars){
  return request({url:'/goods/search',data:parmars})
}