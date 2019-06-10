
const env = 'prod';

module.exports = {
  version: "1.0.0",
  env: env, // prod, dev
  url: env == 'dev' ? 'http://192.168.31.9:8654' : 'http://47.101.58.36:8189'
}