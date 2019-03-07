// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const superagent = require("superagent");
const cheerio = require("cheerio");

class Crawl {
  constructor(newsUrl = 'http://jwc.zcmu.edu.cn/jwgl.htm', host = 'http://jwc.zcmu.edu.cn/') {
    this.host = host;
    this.newsUrl = newsUrl;
  }

  __getTotalPageNumber(page) {
    const $ = cheerio.load(page);
    let maxPageNumber = 0;
    $('a.Next').each((idx, ele) => {
      let str = $(ele).attr('href').trim();
      const number = parseInt(str.substring(str.indexOf('/') + 1, str.indexOf('.')));
      if (isNaN(number)) return false;
      maxPageNumber = Math.max(maxPageNumber, number);
    });
    return maxPageNumber;
  }

  __getNewsOfPage(page) {
    const $ = cheerio.load(page);
    let news = [];
    $("a.c196327").each((idx, ele) => {
      const element = $(ele);
      news.push({
        title: element.text().trim(),
        link: this.host + element.attr('href').replace('../', ''),
      });
    });
    const length = news.length;
    $('span.timestyle196327').each((idx, ele) => {
      if (idx >= length) return true;
      news[idx].date = $(ele).text().trim();
    });
    return news;
  }

  __getPageUrl(pageNumber = 0) {
    if (pageNumber < 0 || pageNumber >= this.maxPageNumber) {
      return this.newsUrl;
    }
    let url = this.newsUrl;
    if (pageNumber > 0) {
      url = url.substring(0, url.indexOf(".htm")) + "/" + pageNumber + '.htm';
    }
    return url;
  }

  // 获取新闻列表
  async retrieveNews(pageNumber = 0) {
    this.maxPageNumber = await new Promise((resolve, reject) => {
      superagent.get(this.newsUrl).end((err, res) => {
        if (err) {
          reject(0);
        } else {
          resolve(this.__getTotalPageNumber(res.text));
        }
      })
    });
    let url = this.__getPageUrl(pageNumber);
    let news = await new Promise((resolve, reject) => {
      superagent.get(url).end((err, res) => {
        if (err) {
          reject(err);
        } else {
          let page = res.text;
          let news = this.__getNewsOfPage(page);
          resolve(news);
        }
      });
    });
    return news;
  }

  async getNewsDetail(url) {
    return await new Promise((resolve, reject) => {
      superagent.get(url).end((err, res) => {
        if (err) {
          reject(err);
        } else {
          const page = res.text;
          const $ = cheerio.load(page);
          const htmlStr = $('form[name="_newscontent_fromname"] div').html();
          resolve(htmlStr);
        }
      });
    });
  }
}

let crawl = new Crawl();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let news = await crawl.retrieveNews(event.page || 0);
  let detail = null;
  if (event.news_url) {
    detail = await crawl.getNewsDetail(event.news_url);
  }

  return {
    newsDetail: detail,
    news,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}