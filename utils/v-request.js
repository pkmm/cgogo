
const config = require('../config.js')
wx.vrequest = function (options) {
  // 默认配置
  let defaultOptions = Object.assign({
    method: 'GET',
    dataType: 'json',
  }, options);

  //js request: encoding is null then response type is buffer.
  if (defaultOptions.responseType == 'arraybuffer') {
    defaultOptions['encoding'] = null; // 返回是二进制buffer数据
  }

  // 默认header
  defaultOptions['header'] = Object.assign({
    'Content-Type': 'application/json',
    'UserAgent': 'Retain cgogo miniprogram'
  }, options.header);

  if (typeof defaultOptions.data === 'object') {
    defaultOptions['body'] = JSON.stringify(defaultOptions['data']);
    delete defaultOptions['data'];
  } else {
    defaultOptions['body'] = defaultOptions['data'];
  }

  // 开始请求
  return new Promise((RES, REJ) => {
    config.env == 'test' && console.log('请求的参数', defaultOptions);
    wx.cloud.callFunction({
      name: 'vRequest',
      data: {
        options: defaultOptions,
      },
      success: res => {
        config.env == 'test' && console.info('返回数据：', res);
        const { result } = res;
        // 如果datatype='json'，则解析后
        let respData = result.body;
        if (options.responseType && options.responseType == 'arraybuffer') {
          respData = result.body; // arraybuffer 数据
        } else if (defaultOptions.dataType === 'json') {
          try {
            respData = JSON.parse(respData);
          } catch (err) {
            console.error('[!] v-request： 解析返回数据json失败', err);
          }
        }
        const RETURN_DATA = {
          data: respData,
          errMsg: 'request:ok',
          statusCode: result.statusCode,
          header: result.headers
        }
        options.success && options.success(RETURN_DATA);
        RES(RETURN_DATA);
      },
      fail: err => {
        // 错误回调
        options.fail && options.fail({
          errMsg: 'request:fail',
          err
        });
        REJ(err);
      },
      complete: options.complete
    })
  })
}