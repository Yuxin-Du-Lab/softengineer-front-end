module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://49.235.193.150:30010/',
                changeOrigin: false,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },

    // proxyTable: {
    //     '/api': {
    //         target: 'http://127.0.0.1:8200',
    //         pathRewrite: {
    //             '^/api': ''
    //         }
    //     }
    // },

    transpileDependencies: [
      'vuetify'
    ]
}
