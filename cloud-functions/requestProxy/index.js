
const cloud = require('wx-server-sdk');
const request = require('request');
cloud.init();

/**
 * @description 用于在云端修改请求的api地址，小程序端的代码不需要做改变
 * @type {string}
 */
const hookHost = '';

/**
 * @description 注入环境参数到header中
 * @param options
 */
function injectEnvParams(options) {
  let wxContext = cloud.getWXContext();
  let {OPENID, APPID, SOURCE, ENV} = wxContext;
  if (!options.headers) {
    options.headers = {}
  }
  options.headers = {...options.headers, OPENID, APPID, SOURCE, ENV};
}

/**
 * @description 修改请求的主机地址
 */
function modifyHost(options) {
  if (!hookHost) return; // do not modify.
  options.url = hookHost + options.url.substring(options.url.indexOf("/api"));
}

/**
 * @summary 使用request代理请求
 * @param {object} evt
 * @param {*} ctx
 *
 * @example
 * 参数options
 * const options = {
 *     url: 'https://api.github.com/repos/request/request',
 *     headers: {
 *        'User-Agent': 'request'
 *     },
 *     method: 'get', // default is get
 *     json: true, //  json 设置为true，要保证body是可以json序列化的，同时返回的body应该是json数据
 *     body: {}, // 一个可以json序列化的数据
 *     encoding: // 用于设置返回的请求的数据格式 如果是null，返回是buffer（也就是二进制数据），任何的其他值都会把返回数据编码成string
 *     qs: {}, // 一个object表示query的参数，
 *     //useQuerystring：true, // 格式化qs为string的形式
 *   };
 */
exports.main = async (evt, ctx) => {
  return new Promise((resolve, reject) => {
    let options = evt.options;
    modifyHost(options);
    injectEnvParams(options);
    request(options, (err, response, body) => {
      if (err) return reject(err);
      return resolve(response);
    });
  });
};

