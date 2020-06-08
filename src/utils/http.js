import Taro from '@tarojs/taro'
import dva from '../dva'
import {getCurrentPath} from '@/utils'


// let host = process.env.NODE_ENV !== 'development' ? 'https://www.banli17.com' : 'http://192.168.1.59:5000'

let cookie = Taro.getStorageSync('Cookies')

function http_factory(method) {
    return async (url, data, noTip) => {
        url = process.env.API_BASE + url
        return new Promise((resolve, reject) => {
            Taro.request({
                url,
                method,
                data,
                header: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Accept': 'application/json',
                },
                credentials: "include"
            }).then((res) => {
                // 保存cookie
                try {
                    let cookies = res.header['Set-Cookie'].replace(/,/g, ';')
                    Taro.setStorageSync('Cookies', cookies)
                } catch (e) {

                }

                if (res.data.msg && !noTip && res.data.code != 401) {
                    Taro.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }

                if (/^[23]/.test(res.data.code)) {
                    return resolve(res.data)
                } else {
                    if (res.data.code == 401) {
                        Taro.reLaunch()
                        return new Promise()
                    }
                    return reject(res.data)
                }
            }).catch(err => {
                console.log('错误xx', url, err)
                return reject(err)
            })
        })
    }
}

export const http_get = http_factory('GET')
export const http_post = http_factory('POST')
