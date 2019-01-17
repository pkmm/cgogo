const CONFIG = require('../config');
const API_BASE_URL = "http://47.101.58.36:8189";
// const API_BASE_URL = "http://localhost:8654";


function FetchRequest(url, data, method = "POST", header = {}) {
  console.log('request: ', url, data)
  return new Promise(Request);

  function Request(resolve, reject) {
    let _url = API_BASE_URL + url;
    // 使用云函数 v-request 代理
    wx.vrequest({
      url: _url,
      method: method.toUpperCase(),
      data: data,
      header: header,
      success: FetchSuccess,
      fail: FetchError,
      complete: RequestOver,
    })
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
        wx.showToast({
          title: err.Msg,
          icon: 'none',
          duration: 3000,
        })
      }
      reject(err);
    }

    function RequestOver() {
      console.log('request completed.')
    }
  }
}

module.exports = {
  fetchRequest: FetchRequest,
}