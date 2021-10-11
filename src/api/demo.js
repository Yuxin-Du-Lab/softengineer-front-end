import { request } from "../units/api"

const api_urls = {
    project_info: '/info/project',
    demo_calc: '/info/calc',
}

export async function get_project_info() {
    console.log('demo.js run get_project_info')
    return await request({
        url: api_urls.project_info,
        method: 'get',
    })
}

export async function demo_calc_func(params) {
    console.log('demo.js run demo_calc_func')
    return await request({
        url: api_urls.demo_calc,
        method: 'get',
        params: params
    })
}
