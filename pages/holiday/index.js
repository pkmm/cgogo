// pages/holiday/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: [1, 4, 5, 6, 9, 10]
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
        var urls = [];
        const prefix = "https://api.52pkm.cn/static/images/";
        for (var i = 0; i < this.data.images.length; i++) {
            urls.push({
                url: prefix + this.data.images[i] + '.gif',
                mode: "widthFix"
            });
        }
        this.setData({
            images: urls
        });
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