// pages/zcmu/login/index.js
const api = require('../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: '',
    pwd: '',
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

  },
  updateData(e) {
    const value = e.detail.value;
    const key = e.currentTarget.dataset.name;
    this.setData({
      [key]: value,
    });
  },
  clearData(e) {
    const value = e.detail.value;
    const key = e.currentTarget.dataset.name;
    this.setData({
      [key]: '',
    });
  },
  setAccount() {
    if (this.data.num == '' || this.data.pwd == '') {
      wx.showModal({
        title: "错误",
        content: "账号/密码不能为空",
        showCancel: false,
      });
      return;
    }
    api.fetchRequest('/zf/set_account', {
      num: this.data.num,
      pwd: this.data.pwd,
    }).then(res => {
      if (res.data.code == 0) {
        // this.setData({
        //   num: res.data
        // })
      } else {
        wx.showModal({
          title: "发生错误",
          content: res.data.Msg || "未知错误",
        })
      }
    })
  },
  bindGetUserInfo(e) {
    // console.error(e)
    wx.login({
      success: function(resOfLogin){
        // success
        wx.getUserInfo({
          success: function(resOfGetUserInfo){
            // success
            api.fetchRequest('/zf/login', {
              code: resOfLogin.code,
              iv: resOfGetUserInfo.iv,
              encrypted_data: resOfGetUserInfo.encryptedData,
            }).then(resp => {
              let data = resp.data.data;
              app.globalData.token = data.token;
              app.globalData.user = data.user;
            })
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
});