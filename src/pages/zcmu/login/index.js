/*
 * @Author: Retain
 * @Date: 2019-01-17 23:12:16
 * @LastEditTime: 2020-03-23 20:19:38
 * @LastEditors: Retain
 * @Description: no description
 * @FilePath: \cgogo\src\pages\zcmu\login\index.js
 */
// pages/zcmu/login/index.js
import {
  updateStudentAccount
} from '../../../providers/dataProvider';
import {
  CacheData
} from '../../../providers/dataCacheProvider';
import {
  Success
} from '../../../constant/responeCode';
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
    let {
      student
    } = CacheData.getUserInfo();
    if (student) {
      this.setData({
        num: student.number || '',
        pwd: student.password || '',
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

  /**
   * @description: 更新数据
   * @return:
   * @param e
   */
  updateData(e) {
    const value = e.detail.value;
    const key = e.currentTarget.dataset.name;
    this.setData({
      [key]: value,
    });
  },

  /**
   * @description: 设置账号信息
   */
  setAccount() {
    wx.requestSubscribeMessage({
      tmplIds: ['t0PoxJslZasFu6ZlhZgjmSREPpMuTC88nQzYIeg4Jfw'],
      success(res) {
        console.error("允许接收通知: ", res);
      }
    });

    if (!this.data.num || !this.data.pwd) {
      wx.showModal({
        title: "错误",
        content: "账号/密码不能为空",
        showCancel: false,
      });
      return;
    }
    wx.showLoading({
      title: "保存中"
    });
    // 用户第一次登陆，点击按钮的时候会显示授权，授权之后调用loadUserInfo才能成功
    if (!CacheData.getToken()) {
      getApp().loadUserInfo(this.doPostData);
    }
    // 否者是已经登陆的用户，可以直接提交数据到服务端
    this.doPostData();
  },

  /**
   * 提交数据信息
   */
  doPostData() {
    updateStudentAccount({
      student_number: this.data.num,
      password: this.data.pwd,
    }).then(({
      code,
      data,
      msg
    }) => {
      wx.hideLoading();
      if (code === Success) {
        wx.showModal({
          title: "设置成功",
          content: '快去查看成绩吧',
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/zcmu/score/index',
              });
            }
          }
        });
        CacheData.setUserInfo(data);
      } else {
        wx.showToast({
          icon: 'none',
          title: msg,
          duration: 2000,
        });
      }
    }).catch(res => {
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: res,
        duration: 2000,
      });
    });
  }
});