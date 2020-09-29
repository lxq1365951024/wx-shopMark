//index.js
// 导入首页请求
import{getSwiperImg,getCateImg,getFloorList} from '../../network/index'

//获取应用实例
const app = getApp()

Page({
  data: {
   swiperImgs:[], //轮播图
   cateImgs:[], //分类导航图
   floorList:[], //楼层
  },
  //初始化函数
  onLoad: function () {
    this.getSwiperImgData();//轮播图
    this.getCateImgData();//分类导航图
    this.getFloorListData();//楼层
  },
 
  getSwiperImgData(){//获取轮播图
    getSwiperImg().then((res)=>{
      //  console.log(res.data);
        let data=res.data;
        this.setData({
          swiperImgs:data.message
        })
    })
  },
  getCateImgData(){//获取分类导航图
    getCateImg().then((res)=>{
      // console.log(res.data);
        let data=res.data;
        this.setData({
          cateImgs:data.message
        })
    })
  },
  getFloorListData(){//获取分类导航图
    getFloorList().then((res)=>{
      // console.log(res.data);
        let data=res.data;
        this.setData({
          floorList:data.message
        })
    })
  }



})
