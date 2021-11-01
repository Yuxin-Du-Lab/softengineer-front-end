import { request } from "../units/api"

const api_urls = {
    user_list: '/user/userlist',
    user_register: '/user/register',
    get_user_info: '/user/whoami',
    user_login: '/auth/login',
    user_logout: '/auth/logout',
    img_url: 'user/avatar',
    edit_user_image: 'user/setAvatar',
    update_user_data: 'user/updateInfo',
    get_user_all_data: 'user/userinfo',
    user_recharge: '/user/recharge',
    get_user_balance: '/user/balance',
    get_owned_game: '/user/ownedGames',
    get_order_list: '/user/listOrders',
}

export async function get_order_list() {
    return await request({
        url: api_urls.get_order_list,
        method: 'get',
        params: {}
    })
}

export async function get_owned_games(params) {
    return await request({
        url: api_urls.get_owned_game,
        method: 'get',
        params: params
    })
}

export async function get_user_balance() {
    return await request({
        url: api_urls.get_user_balance,
        method: 'get',
        params: {}
    })
}

export async function recharge(body) {
    return await request({
        url: api_urls.user_recharge,
        method: 'post',
        body: body
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

export async function getImgUrl(params) {
    return await request({
        url: api_urls.img_url,
        params: params,
        method: 'get',
    })
}

export async function editUserImage(body) {
    return await request({
        url: api_urls.edit_user_image,
        body: body,
        method: 'post',
    })
}

export async function updateUserData(body) {
    return await request({
        url: api_urls.update_user_data,
        body: body,
        method: 'post',
    })
}

export async function getAllUserData() {
    return await request({
        url: api_urls.get_user_all_data,
        params: {},
        method: 'get',
    })
}
