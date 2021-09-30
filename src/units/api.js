import axios from 'axios'
import Vue from 'vue'
import store from '@/store/store'

axios.defaults.baseURL = 'api'

//@ request options need:
//     url
//     method
//     params
//     body

export async function request(options) {
    console.log('api.js run request')
    let response
    let Token = store.getters.TokenStored
    console.log(Token)
    try {
        response = await axios(options.url, {
            method: options.method,
            params: options.params,
            data: options.body,
            headers: {
                Token: Token
            },
        })
    } catch (e) {
        console.log('catch error')
        this.$throw(e)
    }
    return response
}

const errorHandler = (error, vm, info) => {
    console.log('error handler')
    console.log(error)
}

// 响应拦截器
axios.interceptors.response.use(function (response) {
    console.log('axios work')
    return response;
}, function (error) {
    console.log(error.response);  // 对响应错误做点什么
    let response = error.response

    if (response.status != 200) {
        console.log('error happened')
        switch (response.status) {
            case 201:
                handleException(response)
            case 204:
                handleException(response)
            case 401:
                handleException(response)
            case 403:
                handleException(response)
            case 404:
                handleException(response)
            default:
                handleException(response)
        }
    }
    // return Promise.reject(error);
});

function handleException(response) {
    console.log('default')
    console.log('<<<' + response.status + '>>>' + response.statusText)
    throw new Error(response.data)
}

Vue.config.errorHandler = errorHandler
Vue.prototype.$throw = (error) => errorHandler(error, this)

  