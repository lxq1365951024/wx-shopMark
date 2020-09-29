// pages/category/index.js
import {getCategory} from "../../network/category"

Page({

  /**
   * 页面的初始数据
   */
  data: {
      leftList:[],
      rightList:[],
      currentIndex:0,
      scrollTop:0,//点击切换时右侧内容滚动到顶部
  },
  categoryList:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 使用本地缓存：判断有没有本地缓存，没有测重新发送请求，若有判断数据是否过期，过期重新请求。没有测使用之前的数据
     */
    let cates=wx.getStorageSync('cates');
    if(!cates){
      console.log('第一次请求数据')
      this.getCategoryData();
    }else{
      if(Date.now()-cates.time>1000*60*5){//存储时间为5分钟
        console.log('存储时间过期')
        this.getCategoryData();
      }else{//使用旧数据
        console.log('使用缓存数据');
        this.categoryList=cates.data;
        let leftList=this.categoryList.map((ele)=>ele.cat_name);
        let rightList=this.categoryList[0].children;
        this.setData({
          leftList,
          rightList,
        })
      }
    }
  },
  getCategoryData(){//获取分类数据
    getCategory().then((res)=>{
      // console.log(res.data);
      let data=res.data;
      this.categoryList=data.message;
      wx.setStorageSync('cates', {time:Date.now(),data:this.categoryList});//将数据存入本地缓存 
      let leftList=this.categoryList.map((ele)=>ele.cat_name);
      let rightList=this.categoryList[0].children;
      this.setData({
        leftList,
        rightList,
      })
    })
  },
  handleTap(e){//分类切换事件
    // console.log(e);
    let index=e.currentTarget.dataset.index;//获取当前点击的数据下标
    let rightList=this.categoryList[index].children;//获取对应右侧内容
    this.setData({
      currentIndex:index,
      rightList,
      scrollTop:0,
    })
  }


})