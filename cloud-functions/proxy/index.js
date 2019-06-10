// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const axios = require('axios')
// 云函数入口函数
exports.main = async (event, context) => {
  return axios(event.options);
}