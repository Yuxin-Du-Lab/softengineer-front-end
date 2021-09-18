module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://49.235.193.150:8112',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
