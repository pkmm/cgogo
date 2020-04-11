/*
 * @Author: retain
 * @Date: 2020-03-17 12:12:28
 * @LastEditTime: 2020-03-22 23:08:58
 * @LastEditors: Please set LastEditors
 * @Description: API provider for mini program
 * @FilePath: \cgogo\src\providers\DataProvider.js
 */
import {
    isProd,
    BASE_API_URL
} from '../config';
import {CacheData} from './DataCacheProvider';
import {CustomRequest} from '../utils/requestProxy';

const METHOD_GET = 'get'
const METHOD_POST = 'post'


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
const service = isProd ? CustomRequest : wxRequestWrapper;

/**
 * 需要认证的api都要加上这个头
 */
const header = {
    'Authorization': CacheData.getToken(),
};

/**
 *
 * @param url string
 * @param method string
 * @param data object | null
 * @param defaultHeader object
 * @param responseType string
 */
const apiHelper = (url, data = {}, method = METHOD_POST, defaultHeader = {}, responseType = 'text') => {
    let newHeader = {...defaultHeader, ...header};
    let v =  {
        method: method,
        url: BASE_API_URL + url,
        header: newHeader,
        responseType,
    };
    if (data !== null) {
        v.data = data
    }
    return service(v);
}

/**
 * api to get data
 * 使用wx.request参数格式
 */
export const login = (data)  => {
    return apiHelper('/auth/login', data)
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
    return apiHelper('/auth/me', null, METHOD_GET);
};

/**
 * @description: 查询成绩
 * @return:
 */
export const scores = () => {
    return apiHelper('/scores', null, METHOD_GET)
};
/**
 * @description: 
 * @param {object} data 
 * @return: 
 */
export const updateStudentAccount = (data) => {
    return apiHelper('/students/update_edu_account', data, METHOD_POST)
};
/**
 * @description: 学生成绩同步信息详情
 * @return:
 */
export const syncDetail = () => {
    return apiHelper('/students/sync_details', null, METHOD_GET)
};

/**
 * @description:获取首页的配置信息
 * @return:
 */
export const getIndexPreference = () => {
    return apiHelper('/mini_program/index_preferences', null, METHOD_GET)
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
    return apiHelper('/mini_program/notifications', METHOD_GET, data)
};
/**
 * @description:获取每日一图
 * @return:
 */
export const dailyImage = () => {
    return apiHelper('/daily/images', null, METHOD_GET, {}, 'arraybuff')
};
/**
 * @description: 每日一句
 * @return:
 */
export const dailySentence = () => {
    return apiHelper('/daily/sentences', null, METHOD_GET)
};

/**
 * @description:背单词的任务
 * @return:
 */
export const getHermannRemeberMemorial = () => {
    return apiHelper('/mini_program/hermann_memorials', null, METHOD_GET)
};
/**
 * @description 添加背单词任务
 * @param {object} data 
 */
export const addHermannRememberMemorial = (data) => {
    return apiHelper('/mini_program/hermann_memorials', data, METHOD_POST)
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
    return apiHelper('/mini_program/sponsors', data, METHOD_POST)
};