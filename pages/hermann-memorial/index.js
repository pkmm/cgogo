import { fetchRequest } from '../../utils/api.js';
import { api_urls as API } from '../../utils/api.js';
const OK = 0;
const errorNotBegin = 1;
const errorTypeHasDone = 2;
const errorNotfound = 4;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remember: null, // (start, end)
    reviewList: [], // [(start, end) ...]
    currentDay: 1, // 当前复习的天数， 默认是第一天
    errorType: OK,  
    unit: 2, // 默认的背诵的单元
    startAt: new Date(),
    date: new Date(),
    totalUnit: 24, // 总计的单元数
  },


  bindDateChange({detail}) {
      this.setData({
        date: detail.value
      })
  },

  unitChange({detail}) {
    this.setData({
      unit: detail
    })
  },
  totalUnitChange({detail}) {
    this.setData({
      totalUnit: detail,
    })
  },

  saveTask() {
   // todo 保存数据到db
   const self = this;
   wx.showModal({
     title: '提示',
     content: '当前版本，设置后无法修改，确定设置任务？',
     success(res) {
       if (res.confirm) {
         fetchRequest(API.addHermannRememberMemorial, {
           unit: self.data.unit,
           total_unit: self.data.totalUnit,
           start_at: new Date(self.data.date),
         }).then(resp => {
           console.log(resp)
           self.loadData();
         })
       }

     },
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
    let date = new Date();
    let d = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    this.setData({
      startAt: d,
      date: d,
    })
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
    this.loadData();
  },
  loadData(cb) {
    wx.showLoading({
      title: '正在加载...'
    })
    fetchRequest(API.hermannRememberMemorial).then(resp => {
      if (cb && typeof cd == 'function') {
        cb();
      }
      wx.hideLoading();
      let {data, code, msg} = resp.data;
      if (code != 0) {
        if (code == 3002) {
          this.setData({
            errorType: errorTypeHasDone,
          })
        } else if (code == 3001) {
          this.setData({
            errorType: errorNotBegin,
          })
        } else if (code == 3003) {
            this.setData({
              errorType: errorNotfound,
            })
        }
        wx.showModal({
          title: '提示!',
          content: msg,
        })
        return;
      }
      if (data.tasks) {
        this.setData({
          errorType: 0,
          remember: data.tasks.remember,
          reviewList: data.tasks.review_list.reverse(),
          currentDay: data.tasks.current_day,
        })
      } else {
        this.setData({
          errorType: errorNotfound,
        })
      }
      
    })
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