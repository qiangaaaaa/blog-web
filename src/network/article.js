import {request} from './request'

// 获取所有文章（分页）
export function getAllArticle(page = 1, limit = 10, sidx = 'title', order = 'desc', key = '') {
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

// 修改文章
export function updateArticle(data) {
    const {articleId, title, content, labelIds} = data
    return request({
        url: `article/update`,
        method: 'put',
        data: {
            articleId,
            title,
            content,
            labelIds
        }
    })
}

/**
 * 删除文章
 * @param {Array} articleIds 文章ID列表
 */
export function deleteArticle(articleIds) {
    return request({
        url: 'article/delete',
        method: 'delete',
        data: articleIds
    })
}
/**
 * 搜索文章
 * @param {Object} data 
 * @returns 
 */
export function searchAricle(data) {
    const {
        page = 1,
        limit = 10,
        key = '',
        categoryId,
        labelId
    } = data
    return request({
        url: 'article/search',
        method: 'post',
        data: {
            page,
            limit,
            key,
            categoryId,
            labelId
        }
    })
}

/**
 * 获取签名，为上传文件做准备
 * @returns 
 */
export function policy() {
    return request({
        url: 'oss/policy',
        method: 'get'
    })
}