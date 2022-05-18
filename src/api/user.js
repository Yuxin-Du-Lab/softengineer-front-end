import { request } from "../units/api"

const api_urls = {
    user_register: '/user/register',
    user_login: '/auth/login',
    user_logout: '/auth/logout',
    get_user_status: '/auth/status'
}

export async function get_user_status() {
    return await request({
        url: api_urls.get_user_status,
        method: 'get',
        params: {}
    })
}

export async function register(body) {
    return await request({
        url: api_urls.user_register,
        body: body,
        method: 'post',
    })
}

export async function login(body) {
    return await request({
        url: api_urls.user_login,
        body: body,
        method: 'post',
    })
}

export async function logout() {
    return await request({
        url: api_urls.user_logout,
        body: {},
        method: 'post',
    })
}

