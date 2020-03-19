// pages/daily-img/index.js
Page({
  //TODO 做成可以配置的，可以使用CDN 也可以直接从服务器获取数据
  /**
   * 页面的初始数据
   */
  data: {
    // base64Image: '',
    imageFileId: '',
    createdAt: new Date(),
  },

  // 使用云存储
  // loadImage() {
  //   wx.showLoading({
  //     title: '加载中',
  //   })
  //   fetchRequest(API.dailyImage, {}, "GET", {}, 'arraybuffer').then(({
  //     data
  //   }) => {
  //     wx.hideLoading();
  //     let b64 = wx.arrayBufferToBase64(data);
  //     this.setData({
  //       base64Image: "data:image/jpeg;base64," + b64,
  //     })
  //   })
  // },

  // 使用本地的文件缓存
  cachImage(date) {
    this.clearCachedImages();
    wx.saveFile({
      tempFilePath: date + '.jpg',
      success(res) {
        wx.setStorageSync('cachedImagePath', res.savedFilePath)
      }
    })
  },

  // 删除图片缓存
  clearCachedImages() {
    wx.getSavedFileList({
      success(res) {
        if (res.fileList.length > 0) {
          res.fileList.forEach(i => {
            wx.removeSavedFile({
              filePath: i.filePath,
              complete(res) {
                console.log(res)
              }
            })
          })
        }
      }
    })
  },
  loadImageFromCloud(date) {
    let id = wx.getStorageSync('daily-image-id');
    if (id && id.indexOf(date) != -1) {
      this.setData({
        imageFileId: id,
      })
      return;
    }
    wx.cloud.database().collection('imageIds').where({
      "date": date,
    }).limit(1).get().then(res => {
      if (res.data.length > 0) {
        this.setData({
          imageFileId: res.data[0].fileId
        })
        wx.setStorageSync('daily-image-id', res.data[0].fileId);
      }
    }).catch(err => {
      console.error(err);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.loadImage();
    let tmpDate = new Date();
    let date = tmpDate.getFullYear() + "-" + (1 + tmpDate.getMonth()) + "-" + tmpDate.getDate();
    this.loadImageFromCloud(date);
    this.setData({
      createdAt: date
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})