import { request } from "../units/api"

const api_urls = {
    tag_create: '/tag/create',
    tag_delete: '/tag/delete',
    tag_list: '/tag/list',
    tag_manage: '/tag/manage',
    tag_game_list: '/tag/of'
}

export async function create_tag (body) {
    return await request({
        url: api_urls.tag_create,
        method: 'post',
        body: body
    })
}

export async function delete_tag (body) {
    return await request({
        url: api_urls.tag_delete,
        method: 'post',
        body: body
    })
}

export async function list_tag () {
    return await request({
        url: api_urls.tag_list,
        method: 'get',
        params: null
    })
}

export async function manage_tag (body) {
    return await request({
        url: api_urls.tag_manage,
        method: 'post',
        body: body
    })
}

export async function list_tag_of_game (params) {
    return await request({
        url: api_urls.tag_game_list,
        method: 'get',
        params: params
    })
}
