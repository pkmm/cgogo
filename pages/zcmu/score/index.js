// pages/zcmu/score/index.js
const api = require('../../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scores: [],
    allSemesterInfo: {
      total: 0,
      avg: 0.00,
    },
    currentSemesterInfo: {
      total: 0,
      avg: 0.00,
    },
    currentSemester: '',
    student: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      student: app.globalData.user.student || {}
    })
    this.getScore();
  },

  getScore() {
    if (app.globalData.user == null || app.globalData.user.student == null) {
      wx.navigateTo({
        url: '/pages/zcmu/login/index',
      })
      return;
    }
    api.fetchRequest(api.api_urls.scores).then(resp => {
      wx.hideLoading();
      if (resp.data.code == 0) {
        this.processScores(resp.data.data.scores);
      } else {
        wx.showModal({
          title: '发生错误',
          content: resp.data.msg || '未知错误',
          showCancel: false,
        })
      }
    })
  },

  processScores(scores) {
    this.calcAllSemesterInfo(scores);
    this.calcCurrentSemesterInfo(scores);
    this.setData({
      scores: scores.reverse()
    });
  },

  // 计算在校的总平均绩点， 只计算必修课
  calcAllSemesterInfo(scores) {
    if (scores.length == 0) {
      return;
    }
    let total = 0,
      sum = 0;
    scores.forEach(i => {
      if (i.type == '必修课') {
        sum += i.jd;
        total++;
      }
    });
    this.setData({
      allSemesterInfo: {
        total: total,
        avg: (sum / total).toFixed(2)
      }
    });
  },

  calcCurrentSemesterInfo(scores) {
    if (scores.length == 0) {
      return;
    }
    let total = 0,
      sum = 0;
    let currentSemester = scores[scores.length - 1].xn;
    scores.forEach(i => {
      if (i.type == '必修课' && currentSemester == i.xn) {
        total++;
        sum += i.jd;
      }
    })
    this.setData({
      currentSemesterInfo: {
        total: total,
        avg: (sum / total).toFixed(2)
      },
      currentSemester: currentSemester,
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   *
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
    wx.showLoading();
    this.getScore();
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