// pages/about/home/home.js
Component({
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    showQrcode() {
      wx.previewImage({
        urls: ['cloud://vgog-1b82a8.7667-vgog-1b82a8-1258473255/微信图片_20200423003950.jpg'],
        current: 'cloud://vgog-1b82a8.7667-vgog-1b82a8-1258473255/微信图片_20200423003950.jpg'
      })
    }
  }
})
