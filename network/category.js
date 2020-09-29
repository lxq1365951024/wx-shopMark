//分类页面请求
import {request} from 'request.js'

export function getCategory(){
  return request({url:'/categories'})
}
