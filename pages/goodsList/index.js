// pages/goodsList/index.js
import{getGoodsList} from '../../network/goodsList'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:[
      {id:0,title:'综合',isActive:true},
      {id:1,title:'最新',isActive:false},
      {id:2,title:'精选',isActive:false},
    ],
    goodsList:[],
  },
  parmars:{//搜索商品参数
    query:'',//关键字
    cid:'',//分类id
    pagenum:1,//页码
    pagesize:10,//页容量
  },
  totalPage:0,//数据总页数
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options,'options');//optinos可接受其他页面传过来的参数
    this.parmars.cid=options.cid;
    this.getGoodsListData(this.parmars);
  },
  changeChildItem(e){//处理子组件传递过来的事件--tabs点击事件
    // console.log(e)
    const index=e.detail.index;
    const {tabList}=this.data;
    tabList.forEach((ele,i) => {i===index?ele.isActive=true:ele.isActive=false});
    this.setData({
      tabList
    })
  },
  getGoodsListData(parmars){//获取商品列表数据
    return getGoodsList(parmars).then((res)=>{
      // console.log(res.data.message)
      const data=res.data.message;
      this.totalPage=Math.ceil(data.total/this.parmars.pagesize);
      // console.log(this.totalPage,'totalpage')
      this.setData({
        goodsList:[...this.data.goodsList,...data.goods],
      })
      wx.stopPullDownRefresh()//关闭loading
    })
  },

    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {//上拉加载下一页
    this.parmars.pagenum++;
    if(this.parmars.pagenum>this.totalPage){
      wx.showToast({title: '到底了！',});  
    }else{
      this.getGoodsListData(this.parmars);
    } 
  },
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {//下拉刷新数据
    // console.log('到顶了了');
    this.setData({
      goodsList:[]
    });
    this.parmars.pagenum=1;
    this.getGoodsListData(this.parmars);
  },
    
  
})