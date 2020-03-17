import {
  hexMD5
} from './utils/md5.js';

import {
  login
} from './providers/dataProvider'
import {
  CacheData
} from './providers/dataCacheProvider';
import {
  DeviceType
} from "./constant/enums";
import {
  Success
} from "./constant/responeCode"

App({
  onLaunch: function () {
    // 配置云函数
    wx.cloud.init({
      traceUser: true,
      env: "vgog-1b82a8"
    });
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    });
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  },
  onShow() {
    this.loadUserInfo();
  },
  /**
   * 首先取出用户的信息，没有就需要登录
   * 1) 新用户获取会失败，需要特定的时候点击授权才能获取
   * 2) 老用户直接可以获取用户的信息
   */
  loadUserInfo() {
    let userInfo = CacheData.getUserInfo();
    if (!userInfo) {
      wx.cloud.callFunction({
        name: 'getUserInfo',
        data: {},
        success: ({
          result
        }) => {
          let {
            openid,
            appid
          } = result;
          let sign = hexMD5("cgogo" + appid + openid);
          login({
            device_type: DeviceType.Miniprogram,
            sign: sign.toUpperCase(),
            openid,
          }).then(({
            code,
            data,
            msg
          }) => {
            if (code == Success) {
              CacheData.setToken(data.token);
              CacheData.setUserInfo(data.user);
            } else {
              wx.showToast({
                icon: 'none',
                title: msg,
                duration: 2000,
              })
            }
          }).catch(({
            msg
          }) => {
            wx.showToast({
              icon: 'none',
              title: msg,
              duration: 2000,
            })
          })
        }
      })
    }
  }
})