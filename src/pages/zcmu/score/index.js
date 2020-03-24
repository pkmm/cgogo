// pages/zcmu/score/index.js
import { CacheData } from '../../../providers/dataCacheProvider';
import { scores } from '../../../providers/dataProvider';
import { Success } from '../../../constant/responeCode';
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
    student: {},
    activeNames: ['1'],
    scoreGroupInfo: {},
    allSemesters: [], // 所有的学期
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScore();
  },

  getScore() {
    let {student} = CacheData.getUserInfo();

    if (!student) {
      wx.navigateTo({
        url: '/pages/zcmu/login/index',
      });
      return;
    }
    this.setData({
      student,
    });
    wx.showLoading({
      title: '加载中',
    });

    scores().then(({code, data, msg}) => {
      wx.hideLoading();
      if (code === Success) {
          this.processScores(data.scores);
      } else {
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 2000,
        })
      }
    }).catch((res) => {
      wx.hideLoading();
      wx.showToast({
        title: res,
        icon: 'none',
        duration: 2000,
      });
    });
  },

  processScores(scores) {
    if (scores.length === 0) {
      return;
    }
    let total = 0,
      sum = 0, currentSemesterTotal = 0, currentSemesterSum = 0;
   
    // 分组信息
    let groupMap = {};
    let currentSemester = scores[scores.length - 1].xn;
    scores.forEach(i => {
      if (i.type === '必修课') {
        sum += i.jd;
        total++;
      }

      if (i.type === '必修课' && i.xn === currentSemester) {
        currentSemesterTotal++;
        currentSemesterSum += i.jd;
      }
      let groupKey = `${i.xn}学年 第${i.xq}学期`
      if (!groupMap[groupKey]) {
        groupMap[groupKey] = [];
      }
      groupMap[groupKey].push(i);
    });


    let allSemesters = Object.keys(groupMap).reverse();

    this.setData({
      allSemesterInfo: {
        total: total,
        avg: total === 0 ? 0 : (sum / total).toFixed(2),
      },
      scores: scores.reverse(),
      currentSemesterInfo: {
        total: currentSemesterTotal,
        avg: currentSemesterTotal === 0 ? 0 : (currentSemesterSum / currentSemesterTotal).toFixed(2),
      },
      currentSemester: currentSemester,
      scoreGroupInfo: groupMap,
      allSemesters: allSemesters,
      activeNames: allSemesters.length === 0 ? '' : allSemesters[0]
    });
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
});