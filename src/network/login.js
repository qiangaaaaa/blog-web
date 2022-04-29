import {request} from './request'

/**
 * 管理员大佬登录
 * @param {*} loginAccount 账号
 * @param {*} password 密码
 * @returns 
 */
export function login(loginAccount = 'qiangaaaaa1', password = 'aaaaaa') {
    return request({
        url: 'user/login',
        method: 'post',
        data: {
            loginAccount,
            password
        }
    })
}   