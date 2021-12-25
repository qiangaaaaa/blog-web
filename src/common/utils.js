// 工具类

/**
 * 清空数据内容，保存一级键名
 * @param {Object} data 对象
 */
function clearData(data) {
    for (let key in data) {
        data[key] = ''
    }
}

/**
 * 防抖函数
 * @param {*} fn 需防抖的函数
 * @param {number} delay 延迟时间
 * @returns 
 */
function debounce(fn, delay = 1000) {
    let timer = null

    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

/**
 * 获取N树最大深度
 * @param {Object} node 树形节点
 * @returns 
 */
function getMaxDepth(node) {
    if (!node) {
        return 0
    }
    let maxDepth = 0
    const childNodes = node.childNodes
    for (const childNode of childNodes) {
        const childNodeMaxDepth = getMaxDepth(childNode)
        maxDepth = Math.max(maxDepth, childNodeMaxDepth)
    }
    return maxDepth + 1
}

export {
    debounce,
    clearData,
    getMaxDepth
}