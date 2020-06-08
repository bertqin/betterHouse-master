module.exports = {
    env: {
        NODE_ENV: '"development"',
        API_BASE: '"/api"',
    },
    defineConstants: {},
    mini: {},
    h5: {
        devServer: {
            host: 'localhost',
            port: 10086,
            proxy: {
                '/api': {
                    target: 'http://house.bangdream.net/',  // 服务端地址
                    changeOrigin: true
                }
            }
        },
    }
}
