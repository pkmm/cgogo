import {getThinkingList} from "../../providers/DataProvider";
import {Success} from "../../constant/responeCode";

Page({
    data: {
        list: [],
        page: 1,
        size: 10,
        total: 0,
        currentPage: 1,
    },
    onLoad: function (options) {
        this.loadData()
    },
    onShow() {

    },
    onPullDownRefresh() {
        this.loadData()
    },
    loadData(page = 1, size = 10) {
        getThinkingList({page: page, size: size}).then(({code, data, msg}) => {
            if (code == Success) {
                this.setData({
                    list: data.sentence,
                    total: data.total,
                })
            } else {
                wx.showToast({
                    icon: "none",
                    title: "",
                    content: msg,
                    duration: 2000,
                })
            }
        });
    },
    onReachBottom() {
        if (this.data.currentPage + 1 > this.data.total / this.data.size) {
            wx.showModal({
                showCancel: false,
                title: "提示",
                content: "没有更多的数据了"
            })
            return
        }
        this.loadData(this.data.currentPage);
        this.setData({
            currentPage: this.data.currentPage + 1,
        });
    }
});