import {http_get, http_post} from "../utils";

const API = {
    houseList: '/house/estate/index',
    houseDetail: '/house/estate/detail',
    huxingList: '/house/style/index',
    huxingDetail: '/house/style/detail',
    fangyuan: '/house/room/index',
    fangyuanDetail: '/house/room/detail',
    orderAdd: '/house/order/add',
    userAuth: '/user/edit/auth',
    housePay: '/house/order/pay',
    houseOrderList: '/house/order/index',
    houseOrderDetail: '/house/order/detail',
    houseOrderCancel: '/house/order/cancel',
    withdrawApply: '/user/withdraw/apply',
    withdrawToWechat: '/user/withdraw/do',
    balanceHistory: '/user/balance/index',
    swiper: '/index/carousel',
    newsTags: '/article/tags',
    newsList: '/article/index',
    newsDetail: '/article/detail',
    fav: '/user/favorite/save',
    favList: '/user/favorite/index',
    favStatus: '/user/favorite/status',
    couponList: '/user/coupon/index',
    couponPool: '/user/coupon/pool',
    couponAdd: '/user/coupon/add',
    couponWriteOff: '/user/coupon/writeOff',
    viewHistory: '/house/history/index',
    viewHistoryDel: '/house/history/delete',
    meetingHistory: '/house/meeting/index',
    meetingHouse: '/house/meeting/add',
    houseListFilter: '/house/estate/listFilter',
}

export function houseListFilter(data) {
    return http_get(API.houseListFilter, data)
}


export function getHouseList(data) {
    return http_get(API.houseList, data)
}

export function getHouseDetail(data) {
    return http_get(API.houseDetail, data)
}

export function getHuxingList(data) {
    return http_get(API.huxingList, data)
}

export function getHuxingDetail(data) {
    return http_get(API.huxingDetail, data)
}

export function getFangyuan(data) {
    return http_get(API.fangyuan, data)
}

export function getFangyuanDetail(data) {
    return http_get(API.fangyuanDetail, data)
}


export function postOrderAdd(data) {
    return http_post(API.orderAdd, data)
}

export function userAuth(data) {
    return http_post(API.userAuth, data)
}

export function housePay(data) {
    return http_post(API.housePay, data)
}

export function getHouseOrderList(data) {
    return http_get(API.houseOrderList, data)
}

export function getHouseOrderDetail(data) {
    return http_get(API.houseOrderDetail, data)
}

export function cancelHouseOrder(data) {
    return http_post(API.houseOrderCancel, data)
}


export function withdrawApply(data) {
    return http_post(API.withdrawApply, data)
}


export function withdrawToWechat(data) {
    return http_post(API.withdrawToWechat, data)
}

export function getBalanceHistory(data) {
    return http_get(API.balanceHistory, data)
}

export function getSwiper(data) {
    return http_get(API.swiper, data)
}

export function getNewsTags(data) {
    return http_get(API.newsTags, data)
}

export function getNewsList(data) {
    return http_get(API.newsList, data)
}

export function getNewsDetail(data) {
    return http_get(API.newsDetail, data)
}

export function getCouponList(data) {
    return http_get(API.couponList, data)
}

export function getCoupon(data) {
    return http_post(API.couponAdd, data)
}

export function writeOffCoupon(data) {
    return http_post(API.couponWriteOff, data)
}

export function getCouponPool(data) {
    return http_post(API.couponPool, data)
}

export function fav(data) {
    return http_post(API.fav, data, true)
}

export function getFavList(data) {
    return http_post(API.favList, data, true)
}


export function getFavStatus(data) {
    return http_get(API.favStatus, data, true)
}

export function getViewHistory(data) {
    return http_get(API.viewHistory, data)
}

export function delViewHistory(data) {
    return http_get(API.viewHistoryDel, data)
}

export function getMeetHistory(data) {
    return http_get(API.meetingHistory, data)
}

export function meetingHouse(data) {
    return http_get(API.meetingHouse, data)
}

export default {}
