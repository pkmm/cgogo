// pages/index/index.js
const api = require('../../utils/api');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        menus: [
            { name: '查成绩', url: '/pages/zcmu/score/index' },
            // { name: '挂科TOP10', url: '/pages/zcmu/failed_lessons/index' },
            // { name: '我的贴吧', url: "/pages/tieba/index" },
            {
                name: '设置教务账号',
                url: '/pages/zcmu/login/index',
            },
            // {
            // name: "2018节假日",
            // url: "/pages/holiday/index"
            // },
            { name: '关于', url: '/pages/about/index' },
            { name: '教务处新闻', url: '/pages/zcmu/news/index' }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let token = wx.getStorageSync("token");
        if (!token) {
          getApp().login();
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})