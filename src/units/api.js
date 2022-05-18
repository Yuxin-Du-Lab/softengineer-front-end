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
    console.log(options)
    let response
    let Token = store.getters.TokenStored
    console.log(Token)
    try {
        response = await axios(options.url, {
            method: options.method,
            params: options.params,
            data: options.body,
            responseType: options.responseType,
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
            case 500:
                userException(response)
            default:
                handleException(response)
        }
    }
    // return Promise.reject(error);
});

function userException(response) {
    alert(response.data)
    // throw new Error(response.data)
}

function handleException(response) {
    console.log('default')
    console.log('<<<' + response.status + '>>>' + response.statusText)
    throw new Error(response.data)
}

Vue.config.errorHandler = errorHandler
Vue.prototype.$throw = (error) => errorHandler(error, this)

export const getLocalTime = (utcTime, isHour, isTimeStamp) => {
    if (utcTime === null || utcTime === undefined) {
        return '无'
    } else {
        let date
        if (isTimeStamp) {
            date = new Date(utcTime * 1000)
        } else {
            date = new Date(utcTime)
        }
        const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        if (isHour) {
            return `${hour}:${min}:${second}`
        }
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${hour}:${min}:${second}`
    }
}
