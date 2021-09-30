import { request } from "../units/api"

const api_urls = {
    user_list: '/user/userlist',
    user_register: '/user/register',
    get_user_info: '/user/whoami',
    user_login: '/auth/login',
    user_logout: '/auth/logout',
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

export async function getUserInfo() {
    return await request({
        url: api_urls.get_user_info,
        params: {},
        method: 'get',
    })
}

export async function getUserList() {
    return await request({
        url: api_urls.user_list,
        params: {},
        method: 'get',
    })
}