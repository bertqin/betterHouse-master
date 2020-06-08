import {http_get, http_post} from "../utils";

const API = {
    activityList: '/house/activity/index',
    activityDetail: '/house/activity/detail',
    updateInvitePid: '/user/invite/updatePid',
    inviteList: '/invite/index',
}

export function getActivityList(data) {
    return http_get(API.activityList, data)
}

export function getActivityDetail(data) {
    return http_get(API.activityDetail, data)
}

export function updateInvitePid(data) {
    return http_post(API.updateInvitePid, data, true)
}

export function getInviteList(data) {
    return http_get(API.inviteList, data)
}


export default {}
