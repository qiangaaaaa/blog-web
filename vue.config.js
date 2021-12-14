module.exports = {
    configureWebpack: {
        resolve: {
            // 路径别名
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'network': '@/network',
                'components': '@/components',
                'views': '@/views'
            }
        }
    },
}