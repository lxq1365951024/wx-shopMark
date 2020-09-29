//首页的所有请求
import {request} from 'request.js'
export function getSwiperImg(){//获取轮播图
  return request({url:'/home/swiperdata'});
}
export function  getCateImg(){//获取分类导航图
  return request({url:'/home/catitems'});
}
export function getFloorList(){//获取楼层数据
  return request({url:'/home/floordata'})
}