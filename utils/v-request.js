wx.vrequest = function (options) {
  // 默认配置
  let defaultOptions = Object.assign({
    method: 'GET',
    dataType: 'json',
    responseType: 'text', // json, arraybuffer
  }, options);

  // 默认header
  defaultOptions['header'] = Object.assign({
    'Content-Type': 'application/json',
    'UserAgent': 'Retain cgogo miniprogram'
  }, options.header);

  // if (typeof options.data === 'object') {
  //   POST_DATA['data'] = JSON.stringify(POST_DATA['data']);
  // }

  // 开始请求
  return new Promise((RES, REJ) => {
    console.log(defaultOptions);
    wx.cloud.callFunction({
      name: 'proxy',
      data: {
        options: defaultOptions,
      },
      success: res => {
        console.error("==", res)
        const { data } = res;
        // 如果datatype='json'，则解析后
        let respData = data;
        if (options.responseType && options.responseType == 'arraybuffer') {
          respData = data.body; // arraybuffer 数据
        } else if (defaultOptions.dataType === 'json') {
          try {
            respData = JSON.parse(data);
          } catch (err) {
            console.error('[!] v-request： 解析返回数据json失败', err);
          }
        }
        const RETURN_DATA = {
          data: respData,
          errMsg: 'request:ok',
          statusCode: res.status,
          header: res.headers
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