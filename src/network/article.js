import {request} from './request'

// 获取所有文章（分页）
export function getAllArticle(page = 1, limit = 20, sidx = 'title', order = 'desc', key = '') {
    return request({
        url: `article/list?page=${page}&limit=${limit}&sidx=${sidx}&order=${order}&${key}`
    })
}

// 添加文章
export function saveArticle(data) {
    const {title, content, imageUrl, categoryId, labelIds} = data
    return request({
        url: `article/save`,
        method: 'post',
        data: {
            title,
            content,
            imageUrl,
            categoryId,
            labelIds
        }
    })
}

