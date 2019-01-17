// pages/zcmu_login/index.js
import api from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // showTopTips: false,
    // num: '',
    // pwd: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // const num = wx.getStorageSync('num');
    // const pwd = wx.getStorageSync('pwd');
    // this.setData({
    //   num,
    //   pwd,
    // });
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

  },
 
  save: function() {
    var self = this;
    if (self.data.num == '' || self.data.pwd == '') {
      wx.showModal({
        title: '错误',
        content: '学号/密码为空，请检查!',
        showCancel: false
      });
      return;
    }
    self.validAccount()
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
  validAccount() {
    const self = this;
    wx.showLoading({
      title: '验证账号中...',
      mask: true
    });

    wx.vrequest({
      url: getApp().globalData.serverHost + '/zf/check_account',
      data: {
        num: self.data.num,
        pwd: self.data.pwd
      },
      method: 'GET',
      success: function(rep) {

        wx.hideLoading()



        if (rep.data.msg_status == 1) {
          wx.setStorageSync('num', self.data.num);
          wx.setStorageSync('pwd', self.data.pwd);
          wx.showModal({
            title: '账号通过验证',
            content: '快去查看成绩吧',
            success: function() {
              wx.redirectTo({
                url: '/pages/zcmu/index',
              });
            }
          });
        } else {
          wx.showModal({
            title: '账号验证失败',
            content: rep.data.response,
          })
        }

      },
      fail: function(rep) {
        wx.hideLoading()
        wx.showModal({
          title: '提交失败',
          content: '检查网络，重新尝试',
        });
      }
    })
  }
})