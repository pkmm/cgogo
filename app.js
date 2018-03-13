//app.js
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var self = this;
        this.globalData.stu.num = wx.getStorageSync('num');
        this.globalData.stu.pwd = wx.getStorageSync('pwd');
    },

    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },

    // 设置全局使用的数据
    globalData: {
        userInfo: null,
        stu: {
            num: '',
            pwd: ''
        }
    }
})
