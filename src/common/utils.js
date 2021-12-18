// 工具类

// 清空数据内容，保存一级键名
export function clearData(data) {
    for(let key in data) {
        data[key] = ''
    }
}