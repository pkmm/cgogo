// pages/daily-img/index.js
const fetchRequest = require('../../utils/api.js').fetchRequest
const API = require('../../utils/api.js').api_urls
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base64Image: '',
    createdAt: new Date(),
  },

  loadImage() {
    fetchRequest(API.dailyImage, {}, "GET", {}, 'arraybuffer').then(({
      data
    }) => {
      console.error(data)
      let b64 = wx.arrayBufferToBase64(data);
      this.setData({
        base64Image: "data:image/webp;base64," + b64,
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadImage();
    let tmpDate = new Date();
    let date = tmpDate.getFullYear() + "-" + tmpDate.getMonth() + "-" + tmpDate.getDay();
    this.setData({
      createdAt: date
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})