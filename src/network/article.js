import {request} from './request'

// 获取所有文章（分页）
export function getAllArticle(page = 1, key = '', limit = 5, sidx = 'title', order = 'desc') {
    return request({
        url: `article/list?page=${page}&limit=${limit}&sidx=${sidx}&order=${order}&key=${key}`
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
    const {articleId, title, content, imageUrl, categoryId, labelIds} = data
    return request({
        url: `article/update`,
        method: 'put',
        data: {
            articleId,
            title,
            content,
            imageUrl,
            categoryId,
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

/**
 * 传图片到服务器
 * @param {*} host 请求地址
 * @param {*} formData 签名
 * @returns 
 */
export function postImg(host, formData) {
    return request({
        url: host,
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

/**
 * 根据id获取文章详情 
 * @param {*} articleId 文章id
 * @returns 
 */
export function getArticleInfo(articleId) {
    return request({
        url: `article/info/${articleId}`,
        method: 'get',
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

