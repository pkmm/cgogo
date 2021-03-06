/*
 * @Author: Retain
 * @Date: 2019-01-11 01:05:50
 * @LastEditTime: 2020-03-23 00:17:42
 * @LastEditors: Please set LastEditors
 * @Description: 请求代理
 * @FilePath: \cgogo\src\utils\requestProxy.js
 */

import {
  isTest
} from '../config.js';

// 转换wx的options到request库的options
function convertOptions(wx_options) {
  let defaultOptions = Object.assign({
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: null,
    fail: null,
    complete: null,
  }, wx_options);

  //js request: encoding is null then response type is buffer.
  if (defaultOptions.responseType === 'arraybuffer') {
    defaultOptions.encoding = null; // null会使request返回二进制buffer数据
  }

  // 默认headers
  defaultOptions.headers = Object.assign({
    'Content-Type': 'application/json',
    'User-Agent': 'Retain cgogo miniprogram'
  }, wx_options.header);

  delete defaultOptions.header;

  // 转换请求的数据 
  if (defaultOptions.data) {
    const METHOD = wx_options.method.toUpperCase();
    // 如果是GET请求，参数转换到qs
    if (METHOD === 'GET') {
      defaultOptions.qs = defaultOptions.data;
    } else {
      // post delete ... 等其他的请求方式
      if (typeof defaultOptions.data === 'object') {
        defaultOptions.body = JSON.stringify(defaultOptions.data);
      } else { // string or arrayBuffer
        defaultOptions.body = defaultOptions.data;
      }
    }
    delete defaultOptions.data;
  }
  return defaultOptions;
}

/**
 * @description 云端部署请求代理，通过此处调用请求
 * @param {object} options
 * options参数
 * {
 *    url: string, // string 类型       [must]
 *    data: string/object/ArrayBuffer   [optional]
 *    header: object  [optional]
 *    timeout: number [optional]
 *    dataType: 'json' [optional] 返回的数据格式， 设置为json 会调用json.parse, 其它值不会
 *    responseType 'text' [optional] 响应的数据类型 text, arrayBuffer,
 *    success: func,
 *    fail: func,
 *    complete: func,
 * }
 */
export const CustomRequest = (options) => {
  let requestOptions = convertOptions(options);
  // 开始请求
  return new Promise((resolve, reject) => {
    isTest && console.log('INFO: request proxy options: ', requestOptions);
    wx.cloud.callFunction({
      name: 'requestProxy',
      data: {
        options: requestOptions,
      },
      success: res => {
        isTest && console.info('request proxy response：', res);
        const {
          result
        } = res;
        // 如果datatype='json'，则解析后
        let respData = result.body;
        if (requestOptions.responseType && requestOptions.responseType === 'arraybuffer') {
          respData = result.body; // arraybuffer 数据
        } else if (requestOptions.dataType === 'json') {
          try {
            respData = JSON.parse(respData);
          } catch (err) {
            console.error('[!!!] request-proxy： 解析返回数据json失败', err);
          }
        }
        // 
        // const RETURN_DATA = {
        //   data: respData,
        //   errMsg: 'request:ok',
        //   statusCode: result.statusCode,
        //   header: result.headers
        // }
        if (typeof requestOptions.success === 'function') {
          requestOptions.success(respData);
        }
        resolve(respData);
      },
      fail: err => {
        // 错误回调
        if (requestOptions.fail) {
          requestOptions.fail({
            errMsg: 'request:fail',
            err
          });
        } else {
          wx.showToast({
            title: "服务异常，请求失败!",
            icon: "none"
          });
        }
        reject(err);
      },
      complete: requestOptions.complete 
    });
  });
};