import { request } from "../units/api"

const api_urls = {
    project_info: '/info/project'
}

export async function get_project_info() {
    console.log('demo.js run get_project_info')
    return await request({
        url: api_urls.project_info,
        methond: 'get',
    })
}