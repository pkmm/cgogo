//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    name: 'Zhang chuancheng'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  changeName: function() {
    this.setData({
      name: 'Pkmm' 
    });
    wx.request({
      url: 'https://52pkm.cn/zcmu/getScore?stuNo=201312203501029',
      success: function(rep) {
        console.log(rep.data);

      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
