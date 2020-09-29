//封装请求
let ajaxTime=0;//请求次数---当有页面同时加载多个请求时会执行多次 不能直接关闭loading
export const request=(parmas)=>{
  ajaxTime++;
  //添加全局loading效果
  wx.showLoading({
    title: '加载中',
    mask: true,  
  });
  //公共url 
  let baseUrl='https://api-hmugo-web.itheima.net/api/public/v1';
  return new Promise((resolve,reject)=>{
    wx.request({
      ...parmas,
      url:baseUrl+parmas.url,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {//无论成功与否都会执行
        ajaxTime--;
        if(ajaxTime===0){
          wx.hideLoading();//关闭loading
        }
        
      }
    });   
  })
}
