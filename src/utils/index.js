import Taro from "@tarojs/taro";

const {windowWidth, windowHeight} = Taro.getSystemInfoSync()

export {
    windowWidth,
    windowHeight
}

export {http_get, http_post} from './http'


export * from './url'

export const tel = (phoneNumber) => {
    if (!phoneNumber) return
    Taro.makePhoneCall({
        phoneNumber
    })
}


export {initPhotoSwipeFromDOM} from './gallery'
