
/**
 * prod: 使用云函数代理请求，无log信息
 * test: 使用云函数代理请求，有log信息
 * dev:  不使用云函数代理请求，有log信息
 */
export const version = "1.0.0";

export const envType = {
  prod: 'prod',
  dev: 'env',
  test: 'test'
}
export const env = envType.prod;

export const BASE_API_URL = (env != envType.prod) ? 'http://192.168.31.191:8654/api/v1' : 'https://qwesde.com/api/v1';