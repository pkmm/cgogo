// pages/zcmu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stu: {
      num: '',
      pwd: '',
    },
    scores: [],
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
    wx.showLoading({
      title: 'Loading...',
    });
    this.loadStuInfoFromLocal();

    wx.hideLoading();
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
    const self = this;
    wx.request({
      url: 'https://api.52pkm.cn/zf',
      data: {
        num: self.data.stu.num,
        pwd: self.data.stu.pwd,
        version: 1,
      },
      method: "GET",
      success: function (rep) {
      
        self.makeResult(rep.data)
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      },
      fail: function () {
        wx.showModal({
          title: '获取成绩失败',
          content: '检查学号密码正确性，以及教务系统是否正常. 获取Emial：zccxxx79@gmail.com',
        })
      }
    })
  },

  makeResult(data) {
    const self = this;
    let temp = [];
    let i = data.scores.length - 1;
    while (i > 0) {
      temp.push(data.scores[i]);
      i--;
    }
    data.scores = temp;
    self.setData({
      scores: data,
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

  },

  //==========自定义函数开始============


  // 本地加载用户的信息
  loadStuInfoFromLocal: function () {
    var self = this;
    wx.getStorage({
      key: 'num',
      success: function (res1) {
        self.setData({
          'stu.num': res1.data
        });
        wx.getStorage({
          key: 'pwd',
          success: function (res) {
            self.setData({
              'stu.pwd': res.data
            });
            self.getScore(res1.data, res.data);
          },
          fail: function () {
            wx.navigateTo({
              url: '../zcmu_login/index',
            });
          }
        });
      },
      fail: function () {
        wx.navigateTo({
          url: '../zcmu_login/index',
        });
      },
    });

  },
  // 自定义的数据 ， 
  customeData: {},
  getScore: function (num, pwd) {
    const self = this;
    wx.request({
      url: 'https://api.52pkm.cn/zf',
      data: {
        num: num,
        pwd: pwd,
        version: 1,
      },
      method: "GET",
      success: function (rep) {
        console.error(rep.data)
        self.makeResult(rep.data)
      },
      fail: function () {
        wx.showModal({
          title: '获取成绩失败',
          content: '检查学号密码正确性，以及教务系统是否正常. 获取Emial：zccxxx79@gmail.com',
        })
      }
    })
  },
  showTip(){
    wx.showModal({
      title: '绩点只计算必修课的',
      content: '',
    })
  }
})