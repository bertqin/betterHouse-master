import wx from "weixin-js-sdk";
import Taro from "@tarojs/taro";
import {
    getPageParam,
    queryToString,
    removeQueryFromURL,
    setStorage,
} from "@/utils";
import {API_PERSONAL} from "../api";
import {joinQueryToURL} from "../utils";


export default {
    namespace: 'personal',
    state: {
        about: {}
    },
    reducers: {
        save(state, {payload}) {
            return {...state, ...payload}
        },
    },

    effects: {
        * getAboutSaga({payload}, {call, put}) {
            let res = yield call(API_PERSONAL.getAboutUs)
            yield put({
                type: 'save',
                payload: {
                    about: res.data
                }
            })
        },

    }
}
