/*
 * @Author: Retain
 * @Date: 2020-03-17 12:59:14
 * @LastEditTime: 2020-03-23 16:56:48
 * @LastEditors: Retain
 * @Description: 程序使用期间的共享数据存取快捷方法 
 * @FilePath: \cgogo\src\providers\dataCacheProvider.js
 */
import {
    KEY_AUTHORIZATION,
    KEY_USERINFO
} from './cacheKeys'
/**
 * @description 本地缓存，没有缓存数据应通过http去取数据
 */

export const CacheData = {

    /**
     * @description: 同步获取用户的信息
     * @param {null} 
     * @return: object | null
     */
    getUserInfo() {
        let userInfo = wx.getStorageSync(KEY_USERINFO);
        return userInfo;
    },

    /**
     * @description: 同步获取认证的token信息
     * @param {null} 
     * @return: object | null
     */
    getToken() {
        let token = wx.getStorageSync(KEY_AUTHORIZATION);
        if (!token) {
            // todo login.
        }
        return token;
    },

    /**
     * @description: 异步保存用户的信息到storage
     * @param {object} 
     * @return: object | null
     */    
    setUserInfo(userInfo) {
        wx.setStorage({
            data: userInfo,
            key: KEY_USERINFO,
        })
    },

    /**
     * @description: 异步保存认证的token信息
     * @param {string} 
     * @return: string | null
     */
    setToken(token) {
        wx.setStorage({
            data: token,
            key: KEY_AUTHORIZATION,
        })
    }
};