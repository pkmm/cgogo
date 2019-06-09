// pages/index/index.js
const api = require('../../utils/api');
const menuAction = require('../constant/enums').menuAction
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: [
      {
        title: '查成绩',
        action_value: '/pages/zcmu/score/index',
        action_type: menuAction.GotoPage
      },
      // { name: '挂科TOP10', url: '/pages/zcmu/failed_lessons/index' },
      // { name: '我的贴吧', url: "/pages/tieba/index" },
      {
        title: '设置教务账号',
        action_value: '/pages/zcmu/login/index',
        action_type: menuAction.GotoPage
      },
      // {
      // name: "2018节假日",
      // url: "/pages/holiday/index"
      // },
      {
        title: '嘿嘿',
        action_value: '/pages/about/index',
        action_type: menuAction.GotoPage
      },
      {
        title: '教务处新闻',
        action_value: '/pages/zcmu/news/index',
        action_type: menuAction.GotoPage
      }
    ],
    indexConfig: null,
    notifications: [],
    currentNotificationId: 0, // 当前广播的通知
  },

  // 更新当前的通知函数
  updateCurrentNotification() {
     this.setData({
       currentNotificationId: (this.data.currentNotificationId + 1) % this.data.notifications.length,
     }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().login();
    api.fetchRequest(api.api_urls.getIndexPreference).then((resp) => {
      let data = resp.data;
      if (data.code == 0) {
        let menus = data.data.menus;
        let indexConfig = data.data.index_config;
        // 设置为默认的菜单不受影响， 这个主要控制新添加的菜单
        let tmpMenus = this.data.menus;
        tmpMenus = tmpMenus.concat(menus)
        this.setData({
          menus: tmpMenus,
        })
        if (indexConfig != null) {
          this.setData({indexConfig})
        }
      } else {
        // TODO: error handle.
      }
    });
    // 查询通知
    this.getNotification();
    
  },

  getNotification() {
    api.fetchRequest(api.api_urls.getNotification).then(({data}) => {
      let respData = data;
      if (respData.code == 0) {
          this.setData({
            notifications: respData.data.notifications,
          })
      } else {
        //TODO: handle error
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
    // 每4分钟查询一次， 通常来说用户不会停留这么久的时间
    this.getNotificationId = setInterval(this.getNotification, 1000 * 60 * 4);

    // 更新显示的通知
    this.showNotificationId = setInterval(this.updateCurrentNotification, 1000 * 10); // 每10s更新
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.getNotificationId && clearInterval(this.getNotificationId)
    this.showNotificationId && clearInterval(this.showNotificationId)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.getNotificationId && clearInterval(this.getNotificationId)
    this.showNotificationId && clearInterval(this.showNotificationId)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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
  onScoreUpdateInformMe(evt) {
    let user = wx.getStorageSync("user")
    api.fetchRequest('/zf/send_template_msg', {
      form_id: evt.detail.formId,
      open_id: user.open_id,
    }
    ).then(console.log)
  }
})