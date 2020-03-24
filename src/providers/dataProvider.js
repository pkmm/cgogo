/*
 * @Author: retain
 * @Date: 2020-03-17 12:12:28
 * @LastEditTime: 2020-03-22 23:08:58
 * @LastEditors: Please set LastEditors
 * @Description: API provider for mini program
 * @FilePath: \cgogo\src\providers\dataProvider.js
 */
import {
    isProd,
    BASE_API_URL
} from '../config';
import {CacheData} from './dataCacheProvider';
import {customRequest} from '../utils/requestProxy';

/**
 * 把wx.request包装为promise
 */
function wxRequestWrapper(options) {
    return new Promise((resolve, reject) => {
        wx.request({
            ...options,
            success: ({data}) => {
                resolve(data);
            },
            fail: (res) => {
                reject(res);
            }
        });
    });
}

//worker to do request
const service = isProd ? customRequest : wxRequestWrapper;

/**
 * 需要认证的api都要加上这个头
 */
const header = {
    'Authorization': CacheData.getToken(),
};
/**
 * api to get data
 * 使用wx.request参数格式
 */
export const login = (data)  => {
    return service({
        method: 'post',
        url: BASE_API_URL + '/auth/login',
        header,
        data,
    });
};

/**
 * @description: 退出登录
 * @return:
 */
export const logout = () => {

};

/**
 * @description: 获取登录的我
 * @return:
 */
export const me = () => {
    return service({
        method: 'get',
        url: BASE_API_URL + '/auth/me',
        header,
    });
};

/**
 * @description: 查询成绩
 * @return:
 */
export const scores = () => {
    return service({
        method: 'get',
        url: BASE_API_URL + '/scores',
        header,
    });
};
/**
 * @description: 
 * @param {object} data 
 * @return: 
 */
export const updateStudentAccount = (data) => {
    return service({
        method: 'post',
        url: BASE_API_URL + '/students/update_edu_account',
        header,
        data
    });
};
/**
 * @description: 学生成绩同步信息详情
 * @return:
 */
export const syncDetail = () => {
    return service({
        method: 'get',
        url: BASE_API_URL + '/students/sync_detail',
        header,
    });
};

/**
 * @description:获取首页的配置信息
 * @return:
 */
export const getIndexPreference = () => {
    return service({
        method: 'get',
        url: BASE_API_URL + '/mini_program/get_index_preference',
        header,
    });
};

/**
 * @description 获取首页顶部的通知信息
 * @param {object} data
 * @example 分页信息
 * {
 *  page: 1,
 *  size: 10
 * } 
 */
export const getNotification = (data) => {
    return service({
        method: 'get',
        url: BASE_API_URL + '/mini_program/get_notifications',
        header,
        data,
    });
};
/**
 * @description:获取每日一图
 * @return:
 */
export const dailyImage = () => {
    return service({
        method: 'get',
        header,
        url: BASE_API_URL + '/daily/image',
        responsType: 'arraybuff',
    });
};
/**
 * @description: 每日一句
 * @return:
 */
export const dailySentence = () => {
    return service({
        method: 'get',
        url: BASE_API_URL +  '/daily/sentence',
        header,
    });
};

/**
 * @description:背单词的任务
 * @return:
 */
export const getHermannRemeberMemorial = () => {
    return service({
        method: 'get',
        url: BASE_API_URL + '/mini_program/get_hermann_memorial',
        header,
    });
};
/**
 * @description 添加背单词任务
 * @param {object} data 
 */
export const addHermannRemeberMemorial = (data) => {
    return service({
        method: 'post',
        url: BASE_API_URL + '/mini_program/add_hermann_memorial',
        header,
        data
    });
};

/**
 * 
 * @param {object} data
 * @example
 * {
 *  page: 1,
 *  size: 10
 * } 
 */
export const getSponsors = (data) => {
    return service({
        method: 'get',
        url: BASE_API_URL + '/mini_program/get_sponsors',
        header,
        data,
    });
};