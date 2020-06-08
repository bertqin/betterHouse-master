import {API_ACTIVITY} from '../api'
import {getPageParam} from '@/utils'
import selectorFactory from "@tarojs/redux-h5/react-redux/connect/selectorFactory";

export default {
    namespace: 'activity',

    state: {
        activityList: [],
        activityDetail: {},
        inviteList: []
    },

    reducers: {
        save(state, {payload}) {
            return {...state, ...payload}
        },
    },

    effects: {
        * initPageSaga(action, {put}) {
            yield put({
                type: 'getActivityListSaga'
            })
        },

        * getActivityListSaga(action, {put, call}) {
            let res = yield call(API_ACTIVITY.getActivityList)

            yield put({
                type: 'save',
                payload: {
                    activityList: res.data
                }
            })
        },

        * getActivityDetailSaga(action, {put, call}) {
            let res = yield call(API_ACTIVITY.getActivityDetail, {
                id: action.payload.id
            })
            yield put.resolve({
                type: 'save',
                payload: {
                    activityDetail: res.data
                }
            })

            // 更新邀请人
        },

        * initActivityDetailPageSaga(action, {put, call}) {
            yield put({
                type: 'getActivityDetailSaga',
                payload: {
                    id: getPageParam('id')
                }
            })
            yield put({
                type: 'getInviteListSaga'
            })
            yield put.resolve({
                type: 'common/getUserInfoSaga'
            })
            yield put({
                type: 'updateInvitePidSaga'
            })
        },

        * updateInvitePidSaga(action, {put, call, select}) {
            let res = yield call(API_ACTIVITY.updateInvitePid, {invite_code: getPageParam('invite_code')})
        },

        * getInviteListSaga(action, {put, call, select}) {
            let res = yield call(API_ACTIVITY.getInviteList, {})
            yield put.resolve({
                type: 'save',
                payload: {
                    inviteList: res.data
                }
            })
        },
    }
}
