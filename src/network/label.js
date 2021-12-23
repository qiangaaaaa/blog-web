import {
    request
} from "./request";

// 请求数据--page页的
export function getLabelData(page = 1, key = '') {
    return request({
        url: `label/list?page=${page}&limit=5&sidx=label_name&order=asc&key=${key}`
    })
}