// 云函数入口文件
const cloud = require('wx-server-sdk')
const path = require('path')
cloud.init()
const db = cloud.database()
_loadImage = async () => {
  let {result} = await cloud.callFunction({
    name: 'vRequest',
    data: {
      options: {
        method: 'GET',
        url: 'http://47.101.58.36:8189/api/daily_image',
        encoding: null,
        'Content-Type': 'application/json',
        'UserAgent': 'Retain cgogo miniprogram'
      }
    },
  })
  return result.body
}

// 云函数入口函数
exports.main = async (event, context) => {
  let d = new Date();
  let utcTime = d.getTime();
  let cst = new Date(utcTime + 8 * (1 * 60 * 60 * 1000));
  const date = cst.getFullYear() + '-' + (cst.getMonth() + 1) + '-' + cst.getDate();
  let imageStreamBuffer = await _loadImage()
  let resp = await cloud.uploadFile({
    cloudPath: path.join('daily-images', date + ".jpg"),
    fileContent: Buffer.from(imageStreamBuffer),
  })
  let fileId = resp.fileID;
  await db.collection('imageIds').add({
    data: {
      date: date,
      fileId: fileId
    }
  });
  return resp;
}