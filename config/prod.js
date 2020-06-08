module.exports = {
    env: {
        NODE_ENV: '"production"',
        API_BASE: '"/api"'
    },
    defineConstants: {},
    mini: {},
    h5: {
        output: {
            filename: 'static/js/[name].[hash:6].js',
            chunkFilename: 'static/js/[name].[chunkhash:6].js'
        },
        imageUrlLoaderOption: {
            limit: 5000,
            name: 'static/imgs/[name].[hash:6].[ext]'
        },
        miniCssExtractPluginOption: {
            filename: 'static/css/[name].[hash:6].css',
            chunkFilename: 'static/css/[name].[chunkhash:6].css'
        },
        publicPath: '/h5',
        router: {
            mode: 'browser', // 路由模式 'hash'
            basename: '/h5'
        },
        /**
         * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
         * 参考代码如下：
         * webpackChain (chain) {
         *   chain.plugin('analyzer')
         *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
         * }
         */
    }
}
