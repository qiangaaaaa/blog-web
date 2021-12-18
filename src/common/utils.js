// 工具类

// 清空数据内容，保存一级键名
export function clearData(data) {
    for(let key in data) {
        data[key] = ''
    }
}

// 防抖函数
export function debounce(fn, delay = 1000) {
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
