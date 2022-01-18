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

