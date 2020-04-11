/*
 * @Author: Retain
 * @Date: 2020-03-17 12:59:14
 * @LastEditTime: 2020-03-23 20:24:50
 * @LastEditors: Retain
 * @Description: 程序使用期间的共享数据存取快捷方法 
 * @FilePath: \cgogo\src\providers\DataCacheProvider.js
 */
import {KEY_AUTHORIZATION, KEY_USERINFO} from './CacheKeys';

/**
 * @description 本地缓存，没有缓存数据应通过http去取数据
 */

export const CacheData = {

    /**
     * @description: 同步获取用户的信息
     * @return: object | null
     */
    getUserInfo() {
        return wx.getStorageSync(KEY_USERINFO);
    },

    /**
     * @description: 同步获取认证的token信息
     * @return: object | null
     */
    getToken: function () {
        let token = wx.getStorageSync(KEY_AUTHORIZATION);
        if (!token) {
            // todo login.
            console.error("Get authorization token but get null");
        }
        return token;
    },

    /**
     * @description: 异步保存用户的信息到storage
     * @return: object | null
     * @param userInfo
     */    
    setUserInfo(userInfo) {
        wx.setStorageSync(KEY_USERINFO, userInfo);
    },

    /**
     * @description: 保存认证的token信息
     * @return: string | null
     * @param token
     */
    setToken: function (token) {
        wx.setStorageSync(KEY_AUTHORIZATION, token);
    }
};