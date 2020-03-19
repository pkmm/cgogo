import { getSponsors } from "../../providers/dataProvider";
import { Success } from "../../constant/responeCode";

Page({

    /**
     * 页面的初始数据
     */
    data: {
      sponsors: [], // 赞助者
    },

    loadSponsors() {
      wx.showLoading({
        title: '加载赞助者信息...',
      })
      const self = this;

      getSponsors({
        page: 1, size: 10,
      }).then(({code, data, msg}) => {
        wx.hideLoading({
          complete: (res) => {},
        });
        if (code == Success) {
            self.setData({
              sponsors: data.sponsors,
            })
        } else {
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 2000.
          })
        }
      }).catch((res) => {
        wx.hideLoading({
          complete: (res) => {},
        });
        wx.showToast({
          title: msg,
          icon : 'none',
          duration: 2000.
        });
      });
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
      this.loadSponsors();
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

    },
    updateStuInfo: function () {
        wx.navigateTo({
            url: '../zcmu_login/index',
        });
    },
    onShareAppMessage(obj) {
        return {
            title: "使用Cgogo方便快速查教务系统成绩",
            path: '/pages/index/index',
            imageUrl: '/images/score.jpg',
        };
    },
    saveImage() {
        wx.showModal({
            title:"提示",
            content: "保存图片？",
            success(res) {
              if (res.cancel) {
                return;
              }
              wx.saveImageToPhotosAlbum({
                filePath: "/images/w-pay.jpg",
                success() {
                  console.log('save success.')
                }
              })
              wx.saveImageToPhotosAlbum({
                filePath: "/images/a-pay.jpg",
                success() {
                  console.log('save success.')
                }
              })
            }
        })
    }
})