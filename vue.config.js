module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: '127.0.0.1',
                changeOrigin: false,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },

    transpileDependencies: [
      'vuetify'
    ]
}
