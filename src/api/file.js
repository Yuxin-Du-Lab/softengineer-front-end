import { request } from "../units/api"

const api_urls = {
    file_get: '/file/image/',
}

/*
* params: {imageName}
* return: URL. u can use it in <img> src
* */
export async function get_file_img(params) {
    // console.log('file.js run get_file_img')
    let res  = await request({
        url: api_urls.file_get + String(params.imageName),
        params: {},
        methond: 'get',
        responseType: "blob",
    })
    return window.URL.createObjectURL(res.data)
}
