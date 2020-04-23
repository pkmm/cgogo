// pages/zcmu/score/index.js
import { CacheData } from '../../../providers/DataCacheProvider';
import { scores } from '../../../providers/DataProvider';
import { Success } from '../../../constant/responeCode';
const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    scores: [],
    student: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScore();
  },
  onPullDownRefresh() { this.getScore(); },

  
  showModal() {
    this.setData({
      loadModal: true,
    })
    // setTimeout(() => {
    //   this.setData({
    //     loadModal: false,
    //   })
    // }, 2000)
  },

  closeModal() {
    this.setData({
      loadModal: false,
    })
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
    this.showModal();
    scores().then(({code, data, msg}) => {
      this.closeModal();
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
      this.closeModal();
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
    this.setData({
      scores: scores,
    })
    return;
  },
});