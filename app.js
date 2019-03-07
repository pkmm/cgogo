require('./utils/v-request.js');
const api = require('./utils/api')
App({
  onLaunch: function () {
    wx.cloud.init({
      traceUser: true
    })
    let token = wx.getStorageSync('token')
    if (token) {
      api.fetchRequest('/zf/check_token').then(resp => {
        if (resp.data.code != 0) {
          this.login();
        }
      });
    } else {
      this.login();
    }
    
  },

  // getUserInfo: function (cb) {
  //   var that = this
  //   if (this.globalData.userInfo) {
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   } else {
  //     //调用登录接口
  //     wx.getUserInfo({
  //       withCredentials: false,
  //       success: function (res) {
  //         that.globalData.userInfo = res.userInfo
  //         typeof cb == "function" && cb(that.globalData.userInfo)
  //       }
  //     })
  //   }
  // },

  // 调用服务端的登陆接口 拿到用户的信息
  login: function (cb) {
    let self = this;
    wx.login({
      success(repOfLogin) {
        wx.getUserInfo({
          success(resp) {
            api.fetchRequest('/zf/login', {
              code: repOfLogin.code,
              iv: resp.iv,
              encrypted_data: resp.encryptedData,
            }).then(resp => {
              let data = resp.data.data;
              if (resp.data.code !== 0) {
                // 发生了错误 业务逻辑处理 todo
                return;
              }
              wx.setStorageSync('token', data.token)
              self.globalData.user = data.user;
              if (cb && typeof cb == 'function') {
                cb(data.user);
              }
            })
          }
        })
      },
    });
  },
  globalData: {
    api_param: {
      __user_id: null,
      __access_token: null,
    },
    user: null,
  }
})