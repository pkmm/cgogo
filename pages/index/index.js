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
            { name: '关于', url: '/pages/about/index' }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // // 候检测可以看到的界面(目前硬编码， 以后再改)
        // var self = this;
        // var appInstance = getApp();
        // var curStuNum = appInstance.globalData.stu.num;
        // var i = 0, length = self.data.menus.length;
        // var tmp = self.data.menus;
        // for (i = 0; i < length; i++) {
        //     if (tmp[i].name == '我的贴吧' && curStuNum != "201312203501029") {
        //         tmp[i].canshow = false;
        //     } else {
        //         tmp[i].canshow = true;
        //     }
        // }
        // self.setData({
        //     menus: tmp
        // });
        // console.log(curStuNum)

        // wx.login({
        //     success: function(res) {
        //         if (res.code) {
        //             wx.request({
        //                 url: 'https://api.52pkm.cn/wx/login',
        //                 data: {
        //                     code: res.code
        //                 },
        //                 success: function(res) {
        //                     console.error(res)
        //                 }
        //             })
        //         }
        //     }
        // })
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
        // wx.cloud.callFunction({
        //     name: "getUserInfo",
        //     complete: console.log,
        // })
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