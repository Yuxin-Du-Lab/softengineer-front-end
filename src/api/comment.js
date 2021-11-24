import { request } from "../units/api"

const api_urls = {
    comment_create: '/comment/create',
    comment_delete: '/comment/delete',
    comment_list: '/comment/list'
}

export async function creat_comment(body) {
    return await request({
        url: api_urls.comment_create,
        method: 'post',
        body: body
    })
}

export async function delete_comment(body) {
    return await request({
        url: api_urls.comment_delete,
        method: 'post',
        body: body
    })
}

export async function get_comment_list(params) {
    return await request({
        url: api_urls.comment_list,
        method: 'get',
        params: params
    })
}
