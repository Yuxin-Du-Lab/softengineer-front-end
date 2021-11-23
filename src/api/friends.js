import { request } from "../units/api"

const api_urls = {
    get_friend_list: 'friend/list',
    add_friend: 'friend/add',
    delete_friend: 'friend/delete',
}

export async function get_friend_list(params) {
    return await request({
        url: api_urls.get_friend_list,
        method: 'get',
        params: params,
    })
}

export async function add_friend(body) {
    return await request({
        url: api_urls.add_friend,
        method: 'post',
        body: body,
    })
}

export async function delete_friend(body) {
    return await request({
        url: api_urls.delete_friend,
        method: 'post',
        body: body,
    })
}