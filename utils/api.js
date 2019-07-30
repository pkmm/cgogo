const config = require('../config');
const API_BASE_URL = config.url;

function FetchRequest(url, data = {}, method = "POST", header = {}, responseType = 'text') {
  return new Promise(Request);

  function Request(resolve, reject) {
    let _url = API_BASE_URL + url;

    // 添加上认证的信息
    data['token'] = wx.getStorageSync('token');
    data['device_type'] = 1;

    if (config.env == 'prod') {
      // 使用云函数 v-request 代理
      wx.vrequest({
        url: _url,
        method: method.toUpperCase(),
        data: data,
        header: header,
        success: FetchSuccess,
        fail: FetchError,
        complete: RequestOver,
        responseType: responseType,
      })
    } else {
      wx.request({
        url: _url,
        method: method.toUpperCase(),
        data: data,
        header: header,
        success: FetchSuccess,
        fail: FetchError,
        complete: RequestOver,
        responseType: responseType,
      })
    }
  
    function FetchSuccess(res) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        resolve(res)
      } else {
        FetchError(res.data)
        // todo 业务处理
      }
    }
    function FetchError(err) {
      if (err) {
        wx.hideLoading()
        wx.showToast({
          title: "网络请求出现意料之外的事情!",
          icon: 'none',
          duration: 3000,
        })
      }
      reject(err);
    }

    function RequestOver() {
    }
  }
}

const API_URLS = {
  login: '/api/auth/login',
  me: '/api/auth/me',
  scores: '/api/student/scores',
  updateStudentAccount: '/api/student/update_edu_account',
  syncDetail: '/api/student/sync_detail',
  getIndexPreference: '/api/mini_program/get_index_preference',
  getNotification: '/api/mini_program/get_notifications',
  dailyImage: '/api/daily_image',
  dailySentence: '/api/daily_sentence',
  hermannRememberMemorial: '/api/mini_program/get_hermann_memorial',
  addHermannRememberMemorial: '/api/mini_program/add_hermann_memorial',
  getSponsors: '/api/mini_program/get_sponsors',
}

module.exports = {
  fetchRequest: FetchRequest,
  api_urls: API_URLS,
}