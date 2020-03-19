import {
    env,
    envType,
    BASE_API_URL
} from '../config';
import {CacheData} from './dataCacheProvider';
import {customRequest} from '../utils/requestProxy'

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
        })
    })
}

//woker to do request
const service = (env == envType.prod) ? customRequest : wxRequestWrapper;

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
    })
}

export const logout = () => {

}

export const me = () => {
    return service({
        method: 'get',
        url: BASE_API_URL + '/auth/me',
        header,
    })
}

export const scores = () => {
    return service({
        method: 'get',
        url: BASE_API_URL + '/scores',
        header,
    })
}

export const updateStudentAccount = (data) => {
    return service({
        method: 'post',
        url: BASE_API_URL + '/students/update_edu_account',
        header,
        data
    })
}

export const syncDetail = () => {
    return service({
        method: 'get',
        url: BASE_API_URL + '/students/sync_detail',
        header,
    })
}

export const getIndexPreference = () => {
    return service({
        method: 'get',
        url: BASE_API_URL + '/mini_program/get_index_preference',
        header,
    })
}

/**
 * 
 * @param {object} data
 * @example
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
    })
}

export const dailyImage = () => {
    return service({
        method: 'get',
        header,
        url: BASE_API_URL + '/daily/image',
        responsType: 'arraybuff',
    })
}

export const dailySentence = () => {
    return service({
        method: 'get',
        url: BASE_API_URL +  '/daily/sentence',
        header,
    })
}

export const getHermannRemeberMemorial = () => {
    return service({
        method: 'get',
        url: BASE_API_URL + '/mini_program/get_hermann_memorial',
        header,
    })
}

export const addHermannRemeberMemorial = (data) => {
    return service({
        method: 'post',
        url: BASE_API_URL + '/mini_program/add_hermann_memorial',
        header,
        data
    })
}

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
    })
}