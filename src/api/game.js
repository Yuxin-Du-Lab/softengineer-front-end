import { request } from "../units/api"

const api_urls = {
    game_list_get: '/game/list/',
    game_info_get: '/game/info',
}

export async function get_game_list(params) {
    console.log('game.js run get_game_list')
    return await request({
        url: api_urls.game_list_get,
        method: 'get',
        params: params
    })
}

export async function get_game_info(params) {
    console.log('game.js run get_game_info')
    return await request({
        url: api_urls.game_info_get,
        method: 'get',
        params: params
    })
}
