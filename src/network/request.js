import axios from 'axios'

export function request(config) {
    // 创建实例
    const instance = axios.create({
        baseURL: 'http://121.199.72.90:9000/blog',
        timeout: 5000
    })
    // 请求拦截
    instance.interceptors.request.use(
        // 发送请求前
        config => {
            return config
        },
        // 请求失败
        err => {
            console.log('request failed', err);
        }
    )
    // 响应拦截
    instance.interceptors.response.use(
        // 响应数据
        response => {
            return response
        },
        // 响应错误
        err => {
            console.log('response failed', err);
        }
    )

    return instance(config)
}