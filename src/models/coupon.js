import {API_ACTIVITY, API_HOME} from '../api'
import {getPageParam} from '@/utils'

export default {
    namespace: 'coupon',

    state: {
        couponList: [],
        estateCouponList: [],
    },

    reducers: {
        save(state, {payload}) {
            return {...state, ...payload}
        },
    },

    effects: {
        * getCouponListSaga(action, {put, call, select}) {
            let res = yield call(API_HOME.getCouponList)

            yield put({
                type: 'save',
                payload: {
                    newsList: res.data
                }
            })
        },

        * getCouponPoolSaga(action, {put, call, select}) {
            let res = yield call(API_HOME.getCouponPool, {
                ...action.payload
            })

            yield put({
                type: 'save',
                payload: {
                    estateCouponList: res.data.list
                }
            })
        },

        * getCouponSaga(action, {put, call, select}) {
            let res = yield call(API_HOME.getCoupon, {coupon_id: action.payload.id})
            yield put({
                type: 'save',
                payload: {
                    newsDetail: res.data.detail
                }
            })
        },

        * writeOffCouponSaga(action, {put, call, select}) {
            try {
                let res = yield call(API_HOME.writeOffCoupon, {
                    coupon_sn: action.payload.coupon_sn,
                    password: action.payload.password
                })
                action.payload.success()
            } catch (e) {

            }
        },
    }
}
