import { request } from "../units/api"

const api_urls = {
    ros_grab: '/ros/grab',
    ros_key_ctrl: '/ros/key-ctrl',
    ros_start: '/ros/start',
    ros_status: '/ros/status',
    ros_stop: '/ros/stop'
}

export async function use_ros_grab() {
    return await request({
        url: api_urls.ros_grab,
        method: 'post',
        params: {}
    })
}

export async function use_key_ctrl() {
    return await request({
        url: api_urls.ros_key_ctrl,
        method: 'post',
        params: {}
    })
}

export async function use_ros_start() {
    return await request({
        url: api_urls.ros_start,
        method: 'post',
        params: {}
    })
}

export async function get_ros_status() {
    return await request({
        url: api_urls.ros_status,
        method: 'get',
        params: {}
    })
}

export async function use_ros_stop() {
    return await request({
        url: api_urls.ros_stop,
        method: 'post',
        params: {}
    })
}
