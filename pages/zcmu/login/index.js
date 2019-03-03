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
    if (app.globalData.user) {
      this.setData({
        num: app.globalData.user.num,
        pwd: app.globalData.user.pwd,
      })
    } else { // 本地缓存加载
      let user = wx.getStorageSync('user')
      this.setData({
        num: user.num,
        pwd: user.pwd,
      });
    }
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
  // clearData(e) {
  //   const value = e.detail.value;
  //   const key = e.currentTarget.dataset.name;
  //   this.setData({
  //     [key]: '',
  //   });
  // },
  setAccount() {
    if (!this.data.num || !this.data.pwd) {
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
        let data = res.data.data;
        wx.setStorageSync('token', data.token) // 更新新的token 这个token有最新的num信息
        app.globalData.user = data.user;
        wx.setStorageSync('user', data.user);
        wx.showModal({
          title: "设置成功",
          content: '快去查看成绩吧',
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/zcmu/score/index',
              })
            }
          },
          fail: function () {

          }
        })
      } else {
        wx.showModal({
          title: "发生错误",
          content: res.data.msg || "未知错误",
          showCancel: false,
        })
      }
    })
  },
  bindGetUserInfo(e) {
    app.login(user => {
      this.setAccount();
    });
  }
});