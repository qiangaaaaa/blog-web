import {
    request
} from "./request";

// 请求数据--page页的
export function getCasualUserData(page = 1, key = '') {
    return request({
        url: `/casualuser/list?page=${page}&limit=5&sidx=casual_user_id&order=desc&key=${key}`
    })
}
