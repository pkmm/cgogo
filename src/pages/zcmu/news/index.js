
const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    news: [],
    currentPageNumber: 0,
  },

  showModal() {
    this.setData({
      loadModal: true,
    });
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

  returnTop() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  onLoad: function(options) {
    this.loadNews();
  },
  onPullDownRefresh() {
    this.loadNews();
  },
  onReachBottom() {
    this.nextPage();
  },

  showDetail(evt) {
    let newsUrl = evt.currentTarget.dataset.newsUrl;
    wx.navigateTo({
      url: '/pages/zcmu/news/newsDetail/index?news_url=' + newsUrl,
    })
  },

  loadNews(pageNumber = 0) {
    this.showModal();
    const self = this;
    wx.cloud.callFunction({
      name: 'zf-news',
      data: {
        page: pageNumber,
      }
    }).then((res) => {
      this.closeModal();
      if (res.result.news.length === 0) {
        wx.showModal({
          title: '提示',
          content: "已经没有更多的新闻啦!"
        })
        return;
      }
      let news = this.data.news.concat(res.result.news || []);
      self.setData({
        news,
      });
    })
  },

  nextPage() {
    this.loadNews(this.data.currentPageNumber + 1);
    this.setData({
      currentPageNumber: this.data.currentPageNumber + 1,
    })
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