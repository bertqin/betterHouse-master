import wx from "weixin-js-sdk";
import Taro from "@tarojs/taro";
import {
    getPageParam,
    queryToString,
    removeQueryFromURL,
    setStorage,
} from "@/utils";
import {API_COMMON} from "../api";
import {joinQueryToURL, getCurrentPath} from "../utils";

// h5 扫码需要 window 上有 wx
// global.wx = wx

function removeWxCode() {
    if (getPageParam('code') && getPageParam('state')) {
        // Taro.redirectTo({
        //     url: getCurrentPath()
        // })
        location.href = location.origin + getCurrentPath()
        return
    }
}

export default {
    namespace: 'common',
    state: {
        isConnected: true,
        networkType: '',
        userInfo: {},
        pageLoading: true,
    },
    reducers: {
        save(state, {payload}) {
            return {...state, ...payload}
        },
    },

    effects: {
        * initPageSaga(action, {call, put, select}) {
            try {
                // let pageLoading = yield select(store => store.common.pageLoading)
                // if (!pageLoading) return

                let appInfo = yield call(API_COMMON.getAppInfo)
                global.appInfo = appInfo.data
                yield put.resolve({
                    type: 'checkLoginSaga'
                })


                yield put.resolve({
                    type: 'loginSaga',
                })

                // yield action.payload.success()
            } catch (e) {
                // yield action.payload.success()
                // yield action.payload && action.payload.error()
            }

            yield put.resolve({
                type: 'initWxConfigSaga'
            })
        },

        * initWxConfigSaga(action, {call, put, select}) {
            let res = yield call(API_COMMON.getWxConfig, {
                url: location.href
            })

            wx.config({
                debug: res.data.debug,
                appId: res.data.appId,
                timestamp: res.data.timestamp,
                nonceStr: res.data.nonceStr,
                signature: res.data.signature,
                jsApiList: [...res.data.jsApiList, 'chooseWXPay', 'scanQRCode']
            });


            const shareOptions = {
                title: '测试',
                desc: '测试',
                link: location.href,
                imgUrl: '',
                success() {
                },
                cancel() {
                }
            }


            wx.ready(function () {
                wx.onMenuShareAppMessage(shareOptions)
                wx.onMenuShareTimeline(shareOptions)
            })
        },

        * checkLoginSaga(action, {call, put, select}) {
            let userInfo = yield select(state => state.common.userInfo)
            let res = yield call(API_COMMON.checkLogin)
            if (res.data.id > 0) {
                Taro.setStorageSync('logined', 1)
                yield put({
                    type: 'save',
                    payload: {
                        userInfo: {
                            ...userInfo,
                            id: res.data.id,
                        }
                    }
                })
            } else {
                Taro.removeStorageSync('logined')
            }
        },

        * loginSaga(action, {call, put, select}) {
            try {
                let userInfo = yield select(state => state.common.userInfo)
                // 需要用户头像/名称的页面
                let isNeedUserInfoPages = [
                    'pages/activity/detail/index',
                    '/pages/personal/index/index'
                ].includes(getCurrentPath())

                console.log(userInfo)
                // !(isNeedUserInfoPages && !userInfo.nickname)
                if (userInfo.id > 0 && (userInfo.nickname || !isNeedUserInfoPages)) {

                    return
                }
                // 3. 微信授权成功，获取 token API_BASIC.wxLogin

                let postData = getPageParam('code') ? {
                    code: getPageParam('code'),
                    state: getPageParam('state')
                } : {
                    redirect_url: encodeURIComponent(location.href)
                }

                console.log('location.href', postData)

                let loginAPI = API_COMMON.login
                if (isNeedUserInfoPages && userInfo.id && !userInfo.nickname) {
                    loginAPI = API_COMMON.loginWithUserInfo
                }

                let res = yield call(loginAPI, postData)

                // setStorage('wx_login_info', res.data)
                if (res.code == 301 && res.url) {
                    // setTimeout(() => {
                    // Taro.redirectTo({url: res.url})
                    location.href = res.url
                    return new Promise()
                    // }, 5000
                }


                yield put({
                    type: 'save',
                    payload: {
                        userInfo: {
                            ...userInfo,
                            ...res.data
                        }
                    }
                })
            } catch (e) {
                return new Promise() // 登录失败，停止后续请求
            } finally {
                removeWxCode()
            }
        },

        * getUserInfoSaga(action, {call, put, select}) {
            let userInfo = yield select(state => state.home.userInfo)
            let res = yield call(API_COMMON.getUserInfo)
            yield put({
                type: 'save',
                payload: {
                    userInfo: {
                        ...userInfo,
                        ...res.data
                    }
                }
            })
        },

        * getMsgCodeSaga(action, {call, put, select}) {
            let mobile = action.payload.mobile
            if (!/\d{11}/.test(mobile)) {
                Taro.showToast({
                    title: '手机号格式不正确',
                    icon: 'none'
                })
                return false
            }
            let res = yield call(API_COMMON.getMsgCode, {
                mobile
            })
        },
        * bindMobileSaga(action, {call, put, select}) {
            let {mobile, code} = action.payload
            if (!/\d{11}/.test(mobile)) {
                Taro.showToast({
                    title: '手机号格式不正确',
                    icon: 'none'
                })
                return false
            }
            if (!/\d{6}/.test(code)) {
                Taro.showToast({
                    title: '短信验证码不正确',
                    icon: 'none'
                })
                return false
            }

            let res = yield call(API_COMMON.bindMobile, {
                mobile,
                code
            })
            action.payload.success && action.payload.success()
        },

        * wxPaySaga({payload}, {call}) {
            let res = yield call(payload.api || '', payload.data || {})
            location.href = joinQueryToURL('/pay/jsapi.html', res.data)
            return

            wx.ready(function () {
                wx.chooseWXPay({
                    appId: res.data.appId,
                    timestamp: res.data.timeStamp,
                    nonceStr: res.data.nonceStr,
                    package: res.data.package,
                    signType: res.data.signType,
                    paySign: res.data.paySign,
                    success: () => {
                        Taro.showToast({
                            title: '支付成功',
                            icon: 'none'
                        })
                    },
                    fail: () => {
                        Taro.showToast({
                            title: '支付失败',
                            icon: 'none'
                        })
                    },
                })
                // payload.callback()
            })
        },

    }
}
