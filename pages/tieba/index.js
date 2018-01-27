// pages/tieba/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tiebaList: [],
    styles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.load();
  },

  load: function(){
    let self = this;
    wx.request({
      url: "https://api.52pkm.cn",
      success(rep) {
        console.log(rep.data)
        let sy = [];
        for (let x in rep.data.forums) {
          sy.push(self.getCls());
        }
        self.setData({
          tiebaList: rep.data.forums,
          styles: sy
        });
      }
    });
  },

  randomInteger:function(basic, min = 100){
    return Math.max(Math.ceil(Math.random() * basic), min);
  },

  getCls:function(){
    return "height: " + this.randomInteger(300) + "px;" ;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      wx.showNavigationBarLoading()
      let self = this;
      wx.request({
          url: "https://api.52pkm.cn",
          success(rep) {
              console.log(rep.data)
              let sy = [];
              for (let x in rep.data.forums) {
                  sy.push(self.getCls());
              }
              self.setData({
                  tiebaList: rep.data.forums,
                  styles: sy
              });
              wx.hideNavigationBarLoading()
              wx.stopPullDownRefresh() 
          }
      });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})