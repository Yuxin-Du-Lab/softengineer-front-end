module.exports = {
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: '127.0.0.1',
    //             changeOrigin: false,
    //             ws: true,
    //             pathRewrite: {
    //                 '^/api': ''
    //             }
    //         }
    //     }
    // },

    proxyTable: {
        '/api': {
            target: 'http://127.0.0.1:8200',
            pathRewrite: {
                '^/api': ''
            }
        }
    },

    transpileDependencies: [
      'vuetify'
    ]
}
