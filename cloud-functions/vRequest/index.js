const cloud = require('wx-server-sdk');
cloud.init();
const axios = require('axios');
const request = require('request');
exports.main = (evt, ctx) => {
  return new Promise((RES, REJ) => {
    // request(evt.options, (err, res, body) => {
    //   if (err) return REJ(err);
    //   RES(res);
    // })
     axios(evt.options).then(res => RES(res)).catch(err => REJ(err));
    // RES(evt);
  });
}