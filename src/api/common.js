import {http_get, http_post} from "../utils";

const API = {
    appInfo: '/index/index',
    login: '/user/login/wechat',
    checkLogin: '/user/login/index',
    bindMobile: '/user/edit/mobile',
    wxConfig: '/index/jssdk',
    userInfo: '/user/center/info',
    loginWithUserInfo: '/user/edit/wechat'
}

export function getAppInfo(data) {
    return http_get(API.appInfo, data)
}

export function login(data) {
    return http_get(API.login, data, true)
}

export function loginWithUserInfo(data) {
    return http_get(API.loginWithUserInfo, data, true)
}

export function checkLogin(data) {
    return http_get(API.checkLogin, data)
}

export function getMsgCode(data) {
    return http_get(API.bindMobile, data)
}

export function bindMobile(data) {
    return http_post(API.bindMobile, data)
}

export function getWxConfig(data) {
    return http_get(API.wxConfig, data)
}

export function getUserInfo(data) {
    return http_get(API.userInfo, data)
}


export default {}
