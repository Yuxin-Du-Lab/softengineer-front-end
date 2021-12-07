import { request } from "../units/api"

const api_urls = {
    create_mod: '/mod/create',
    list_mod: '/mod/list',
    subscribe_mod: '/mod/subscribe',
    subscriptions_mod: '/mod/subscriptions',
    unsubscribe_mod: '/mod/unsubscribe',
    update_mod: '/mod/update'
}

export async function create_mod4game (body) {
    return await request({
        url: api_urls.create_mod,
        method: 'post',
        body: body
    })
}

export async function list_mods4game (params) {
    return await request({
        url: api_urls.list_mod,
        method: 'get',
        params: params
    })
}

export async function subscribe_mod (body) {
    return await request({
        url: api_urls.subscribe_mod,
        method: 'post',
        body: body
    })
}

export async function list_subscriptions (params) {
    return await request({
        url: api_urls.subscriptions_mod,
        method: 'get',
        params: params
    })
}

export async function unsubscribe_mod (body) {
    return await request({
        url: api_urls.unsubscribe_mod,
        method: 'post',
        body: body
    })
}

export async function update_mod (body) {
    return await request({
        url: api_urls.update_mod,
        method: 'post',
        body: body
    })
}
