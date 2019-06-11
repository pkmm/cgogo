
const env = 'prod';
/**
 * prod: 使用云函数代理请求，无log信息
 * test: 使用云函数代理请求，有log信息
 * dev:  不使用云函数代理请求，有log信息
 */
module.exports = {
  version: "1.0.0",
  env: env, // prod, dev
  url: env == 'dev' ? 'http://192.168.31.9:8654' : 'http://47.101.58.36:8189'
}