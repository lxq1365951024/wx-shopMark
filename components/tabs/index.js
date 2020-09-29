// components/tabs/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      defalut:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItme(e){//tabs点击事件
      // console.log(e)
      const {index}=e.currentTarget.dataset;
      // console.log(index);
      this.triggerEvent('handelChildItem',{index});//向父组件传递事件使用triggerEvent
    }
  }
})
