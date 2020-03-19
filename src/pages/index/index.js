// pages/index/index.js
import {
  menuAction
} from '../../constant/enums';
import {
  getIndexPreference,
  getNotification
} from '../../providers/dataProvider';
import {
  Success
} from '../../constant/responeCode';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: [
      // {
      //   title: "LIST背单词",
      //   action_type: menuAction.GotoPage,
      //   action_value: '/pages/hermann-memorial/index', 
      //   icon: '/images/remember.png'
      // },
      {
        title: '查看成绩',
        action_value: '/pages/zcmu/score/index',
        action_type: menuAction.GotoPage,
        icon: '/images/lesson.png'
      },
      // { name: '挂科TOP10', url: '/pages/zcmu/failed_lessons/index' },
      // { name: '我的贴吧', url: "/pages/tieba/index" },
      {
        title: '正方账号',
        action_value: '/pages/zcmu/login/index',
        action_type: menuAction.GotoPage,
        icon: '/images/setup.png'
      },
      // {
      // name: "2018节假日",
      // url: "/pages/holiday/index"
      // },
      {
        title: '赞助作者',
        action_value: '/pages/about/index',
        action_type: menuAction.GotoPage,
        icon: '/images/sponsor.png'
      },
      {
        title: '教务通知',
        action_value: '/pages/zcmu/news/index',
        action_type: menuAction.GotoPage,
        icon: '/images/news.png'
      },
      // {
      //   title: '每日一图',
      //   action_value: '/pages/daily-img/index',
      //   action_type: menuAction.GotoPage,
      //   icon: '/images/img.png'
      // }
    ],
    indexConfig: null,
    notifications: [],
    currentNotificationId: 0, // 当前广播的通知
  },

  // 更新当前的通知函数
  updateCurrentNotification() {
    if (this.data.notifications.length == 0) {
      return;
    }
    this.setData({
      currentNotificationId: (this.data.currentNotificationId + 1) % this.data.notifications.length,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    getIndexPreference().then(({
      code,
      data,
      msg
    }) => {
      if (code == Success) {
        let {
          menus
        } = this.data;
        menus = menus.concat(data.menus);
        this.setData({
          menus,
        })
        if (data.index_config) {
          this.setData({
            indexConfig: data.index_config,
          })
        }
      }
    });

    // 查询通知
    this.loadNotify();
    // 每4分钟查询一次， 通常来说用户不会停留这么久的时间
    this.getNotificationId = setInterval(this.loadNotify, 1000 * 60 * 4);
    // 更新显示的通知
    this.showNotificationId = setInterval(this.updateCurrentNotification, 1000 * 10); // 每10s更新

    // 实时的数据推送 demo代码。以后可以完善实现响应的功能
    // const db = wx.cloud.database();
    // const watcher = db.collection('todos').where({
    //   cc: 'cc',
    // }).watch({
    //   onChange: function (snapshot) {
    //     console.log('docs\'s changed events', snapshot.docChanges)
    //   },
    //   onError: function (err) {
    //     console.error('the watcher closed beacuse of error', err)
    //   }
    // });
  },

  loadNotify() {
    getNotification({
      page: 1,
      size: 10,
    }).then(({
      code,
      data,
      msg
    }) => {
      if (code != Success) {
        return;
      }
      this.setData({
        notifications: data.notifications,
      })
    })
    // fetchRequest(api_urls.getNotification).then(({
    //   data
    // }) => {
    //   let respData = data;
    //   if (respData.code == 0) {
    //     this.setData({
    //       notifications: respData.data.notifications,
    //     })
    //   } else {
    //     //TODO: handle error
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadNotify();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

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
    fetchRequest('/zf/send_template_msg', {
      form_id: evt.detail.formId,
      open_id: user.open_id,
    }).then(console.log)
  }
})