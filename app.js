require('./utils/v-request.js');
const api = require('./utils/api')
const md5 = require('./utils/md5.js')
let interstitialAd = null
App({
  onLaunch: function () {
    // 配置云函数
    wx.cloud.init({
      traceUser: true
    });
  },

  onLoad: function() {
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({ adUnitId: 'xxxx' })
      interstitialAd.onLoad(() => {
        console.log('onLoad event emit')
      })
      interstitialAd.onError((err) => {
        console.log('onError event emit', err)
      })
      interstitialAd.onClose((res) => {
        console.log('onClose event emit', res)
      })
    }

    interstitialAd.show().catch((err) => {
      console.error(err)
    })
  },

  // 调用服务端的登陆接口拿到用户的Token信息
  // 首先调用云函数获取openId appId用于认证
  // 使用appId签名openId得到code到server换取token
  login: function (cb) {
    let self = this;
    wx.cloud.callFunction({
      name: "getUserInfo",
      data: {},
      complete: (resp) => {
        self.globalData.appId = resp.result.appid;
        self.globalData.openId = resp.result.openid;
        let sign = md5.hexMD5("cgogo" + resp.result.appid + resp.result.openid);
        api.fetchRequest(api.api_urls.login, {
          sign: sign,
          openid: self.globalData.openId,
        }).then(({data}) => {
          if (data.code !== 0) {
            // todo 发生了错误
            return 
          }
          let respData = data.data;
          wx.setStorageSync('token', respData.token);
          wx.setStorageSync('user', respData.user)
          if (respData.user.student) {
            wx.setStorageSync('student', respData.user.student)
          }
          if (cb && typeof cb == 'function') {
            cb(respData.user);
          }
        })
      },
      fail: (resp) => {
        // todo 提示
      } 
    });
  },
  globalData: {}
})