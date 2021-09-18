import axios from 'axios'

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
    try {
        response = await axios(options.url, {
            method: options.method,
            params: options.params,
            data: options.body
        })
    } catch (e) {
        throw new Error(e)
    }
    return response
}