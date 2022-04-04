module.exports = {
    configureWebpack: {
        resolve: {
            // 路径别名
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'network': '@/network',
                'components': '@/components',
                'views': '@/views',
                'common': '@/common'
            }
        }
    },
    devServer: {
        port: 9500,     // 端口号
    }
}