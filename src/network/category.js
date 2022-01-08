import {
    request
} from "./request";

// 获取分类树
export function getCategory() {
    console.log("come");
    return request({
        url: '/category/list/tree'
    })
}

// 添加分类
export function addCategory(newCategory) {
    // 解构赋值
    const data = {
        parentCategoryId: newCategory.parentCategoryId,
        categoryName: newCategory.categoryName,
        iconUrl: newCategory.iconUrl,
        sort: newCategory.sort,
        showStatus: newCategory.showStatus
    }
    // 返回
    return request({
        url: '/category/save',
        method: 'post',
        data
    })
}

// 更新分类
export function updateCategory(newCategory) {
    // 解构赋值
    const data = {
        categoryId: newCategory.categoryId,
        categoryName: newCategory.categoryName,
        parentCategoryId: newCategory.parentCategoryId,
        sort: newCategory.sort,
    }
    // 返回
    return request({
        url: '/category/update',
        method: 'put',
        data
    })
}

// 删除分类
export function deleteCategory(deleteCategoryId) {
    return request({
        url: `/category/delete/${deleteCategoryId}`,
        method: 'delete',
    })
}