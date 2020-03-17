import {
    KEY_AUTHORIZATION,
    KEY_USERINFO
} from './cacheKeys'
/**
 * @description 本地缓存，没有缓存数据应通过http去取数据
 */

export const CacheData = {

    // 同步
    getUserInfo() {
        let userInfo = wx.getStorageSync(KEY_USERINFO);
        if (!userInfo) {
            //todo http get 
        }
        return userInfo;
    },

    getToken() {
        let token = wx.getStorageSync(KEY_AUTHORIZATION);
        if (!token) {
            // todo login.
        }
        return token;
    },

    // 异步保存
    setUserInfo(userInfo) {
        wx.setStorage({
            data: userInfo,
            key: KEY_USERINFO,
        })
    },
    setToken(token) {
        wx.setStorage({
            data: token,
            key: KEY_AUTHORIZATION,
        })
    }
};