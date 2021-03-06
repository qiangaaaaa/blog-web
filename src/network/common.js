// 此为公共网络请求接口(临时用户、标签)

import {
    request
} from "./request";

// 添加用户
export function addUser(url, data) {
    return request({
        method: 'post',
        url,
        data
    })
}

// 修改用户数据
export function updateUser(url, data) {
    return request({
        method: 'put',
        url,
        data,
    })
}

// 删除用户数据
export function deleteUser(url, data) {
    return request({
        method: 'delete',
        url,
        data,
    })
}