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
 * 节流函数
 * @param {string} fn 准备执行的函数
 * @param {Number} delay 冷却时间
 * @returns 
 */
 function throttle(fn, delay = 1500) {
    let timer = null
    let first = true

    return (...args) => {
        if (timer) {
            return
        }
        if (first) {
            fn.apply(this.args)
            first = false
            return
        }

        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
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

/**
 * 生成全局唯一标识符
 * @returns 
 */
function getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
}

/**
 * 深克隆
 * @param {*} Obj 
 * @returns 
 */
function deepClone(Obj) {
    let res = null
    if (Array.isArray(Obj)) {
        res = []
        for (let item of Obj) {
            res.push(deepClone(item))
        }
    } else if (typeof (Obj) === 'object') {
        res = {}
        for (let item in Obj) {
            res[item] = deepClone(Obj[item])
        }
    } else {
        res = Obj
    }
    return res
}


export {
    debounce,
    clearData,
    getMaxDepth,
    throttle,
    getUuid,
    deepClone
}