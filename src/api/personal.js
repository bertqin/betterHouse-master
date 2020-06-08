import {http_get, http_post} from "../utils";

const API = {
    aboutUs: '/index/agreement'
}

export function getAboutUs(data) {
    return http_get(API.aboutUs, data)
}

export default {}
