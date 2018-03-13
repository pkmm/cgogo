// pages/zcmu/failed_lessons/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lessons: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        var self = this;
        wx.request({
            url: 'https://api.52pkm.cn/zf/get_failed_lessons',
            success: function (rep) {
                self.setData({
                    lessons: rep.data
                })
            }
        })
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
        wx.showNavigationBarLoading()
        var self = this;
        wx.request({
            url: 'https://api.52pkm.cn/zf/get_failed_lessons',
            success: function (rep) {
                self.setData({
                    lessons: rep.data
                });
                wx.hideNavigationBarLoading()
                wx.stopPullDownRefresh()
            },
            fail: function (rep) {
                wx.hideNavigationBarLoading()
                wx.stopPullDownRefresh()
            }
        })
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