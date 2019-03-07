// pages/zcmu/news/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: [],
    currentPageNumber: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadNews();
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
    this.loadNews();
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
  showDetail(evt) {
    let newsUrl = evt.currentTarget.dataset.newsUrl;
    wx.navigateTo({
      url: '/pages/zcmu/news/newsDetail/index?news_url=' + newsUrl,
    })
  },

  loadNews(pageNumber = 0) {
    wx.showLoading();
    const self = this;
    wx.cloud.callFunction({
      name: 'zf-news',
      data: {
        page: pageNumber,
      }
    }).then((res) => {
      wx.hideLoading();
      let news = res.result.news || [];
      if (news.length == 0) {
        wx.showModal({
          title: '提示',
          content: "已经没有更多的新闻啦!"
        })
        return;
      }
      self.setData({
        news,
      });
    })
  },
  
  nextPage() {
    this.setData({
      currentPageNumber: this.data.currentPageNumber + 1,
    })
    this.loadNews(this.data.currentPageNumber + 1);
  },

  indexPage() {
    if (this.data.currentPageNumber == 0) {
      wx.showModal({
        title: '提示',
        content: '当前已经是第一页啦'
      })
      return;
    }
    this.loadNews(0);
    this.setData({
      currentPageNumber: 0,
    });
  }

})