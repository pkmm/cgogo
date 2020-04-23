const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    newsDetail: [],
  },

  onLoad: function (options) {
    const self = this;
    wx.cloud.callFunction({
      name: 'zf-news',
      data: {
        news_url: options.news_url,
      }
    }).then(res => {
      self.setData({
        newsDetail: res.result.newsDetail,
      })
    })
  },
})