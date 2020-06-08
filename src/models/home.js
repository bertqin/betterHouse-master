import Taro from "@tarojs/taro";
import {API_ACTIVITY, API_HOME} from '../api';
import {getPageParam} from '@/utils';

export default {
    namespace: 'home',

    state: {
        houseList: [],
        houseListFilter: [],
        houseListFilterKey: {},
        houseDetail: {},
        huxingList: [],
        huxingDetail: {},
        fangyuan: {},
        fangyuanDetail: {},
        currentTab1Key: '',
        currentTab2Key: '',
        orderUserInfo: {
            name: '',
            idCardNum: '',
            mobile: ''
        },
        newsTags: [],
        newsList: [],
        newsDetail: {},
        houseOrderList: {},
        houseOrderDetail: {},
        balanceHistory: {},
        swipers: {},
        noticeList: [],
        zhanting: {},
        viewHistory: [],
        meetHistory: [],
        favList: [],
    },

    reducers: {
        save(state, {payload}) {
            return {...state, ...payload}
        },
    },

    effects: {
        * initPageSaga(action, {put}) {
            yield put({
                type: 'getHouseListSaga'
            })

            yield put({
                type: 'getNoticeListSaga'
            })

            yield put({
                type: 'getZhantingSaga'
            })

        },

        * getZhantingSaga(action, {put, call}) {
            try {

                let res = yield call(API_ACTIVITY.getActivityList, {
                    type: 'house_sale'
                })
                let zhanting = {}
                let act_id = res.data.map(r => {
                    zhanting[r.id] = []
                    return r.id
                }).join(',')
                let ztList = yield call(API_HOME.getHouseList, {act_id})
                ztList.data.forEach(zt => {
                    zhanting[zt.activity_id].push(zt)
                })
                yield put({
                    type: 'save',
                    payload: {
                        zhanting: [
                            [
                                zhanting[Object.keys(zhanting)[0]][0],
                                zhanting[Object.keys(zhanting)[0]][1]
                            ],
                            [
                                zhanting[Object.keys(zhanting)[1]][0],
                                zhanting[Object.keys(zhanting)[1]][1]
                            ]
                        ]
                    }
                })
            } catch (e) {

            }
        },

        * getHouseListSaga(action, {put, call}) {
            console.log(action)
            let postData = {}
            if (getPageParam('keyword')) {
                postData.keyword = getPageParam('keyword')
            }
            if (action.payload) {
                if (action.payload.attr_ids) {
                    postData.attr_ids = action.payload.attr_ids
                }
                if (action.payload.act_id) {
                    postData.act_id = action.payload.act_id
                }
                if (action.payload.keyword) {
                    postData.keyword = decodeURIComponent(action.payload.keyword)
                }
            }
            let res = yield call(API_HOME.getHouseList, postData)
            yield put({
                type: 'save',
                payload: {
                    houseList: [...res.data]
                }
            })
        },

        * getHouseListFilterSaga(action, {put, call}) {
            let res = yield call(API_HOME.houseListFilter)
            yield put({
                type: 'save',
                payload: {
                    houseListFilter: res.data
                }
            })
        },

        * getHouseDetailSaga(action, {put, call}) {
            let res = yield call(API_HOME.getHouseDetail, {id: action.payload.id})
            yield put({
                type: 'save',
                payload: {
                    houseDetail: res.data
                }
            })
        },
        * getHuxingListSaga(action, {put, call}) {
            let res = yield call(API_HOME.getHuxingList, {estate_id: getPageParam('id')})
            yield put({
                type: 'save',
                payload: {
                    huxingList: res.data
                }
            })
        },

        * getHuxingDetailSaga(action, {put, call}) {
            let res = yield call(API_HOME.getHuxingDetail, {id: getPageParam('id')})
            yield put({
                type: 'save',
                payload: {
                    huxingDetail: res.data
                }
            })
        },

        * getFangyuanSaga(action, {put, call}) {
            let res = yield call(API_HOME.getFangyuan, {
                estate_id: getPageParam('id')
            })


            // 将房源数据重组按照 栋 -> 单元来分
            let newData = {}
            let currentTab1Key = ''
            let currentTab2Key = ''
            res.data.list.forEach(item => {
                console.log(item)
                if (!newData[item.building_id]) {
                    newData[item.building_id] = {}
                }
                if (!newData[item.building_id][item.unit_num]) {
                    newData[item.building_id][item.unit_num] = {}
                }
                if (!newData[item.building_id][item.unit_num][item.tree_num]) {
                    newData[item.building_id][item.unit_num][item.tree_num] = []
                }
                item._status_text = res.data.field_text.status[item.status]
                item._huxing = item.attr_value.find(r => r.name == 'room_huxin').value
                newData[item.building_id][item.unit_num][item.tree_num].push(item)
            })

            currentTab1Key = Object.keys(newData)[0]
            currentTab2Key = Object.keys(newData[currentTab1Key])[0]

            yield put({
                type: 'save',
                payload: {
                    fangyuan: newData,
                    currentTab1Key,
                    currentTab2Key,
                }
            })


        },

        * getFangyuanDetailSaga(action, {put, call}) {
            let res = yield call(API_HOME.getFangyuanDetail, {
                id: action.payload.id
            })
            yield put({
                type: 'save',
                payload: {
                    fangyuanDetail: res.data
                }
            })
        },
        * initHouseDetailSaga(action, {put, call}) {
            yield put({
                type: 'getHouseDetailSaga',
                payload: {
                    id: getPageParam('id')
                }
            })
            yield put({
                type: 'getHuxingListSaga'
            })
            yield put.resolve({
                type: 'getFangyuanSaga',

            })
            try {
                action.payload.success()
            } catch (e) {

            }
        },

        * makeOrderSaga(action, {put, call, select}) {
            let userInfo = yield select(state => state.home.orderUserInfo)

            if (/^\s*$/.test(userInfo.name)) return
            if (/^\s*$/.test(userInfo.idCardNum)) return
            if (/^\s*$/.test(userInfo.mobile)) return

            try {
                let auth = yield call(API_HOME.userAuth, {
                    id_card_sn: userInfo.idCardNum,
                    id_card_name: userInfo.name,
                    id_card_image: 'a',
                    id_card_image2: 'a'
                })
                let res = yield call(API_HOME.postOrderAdd, {room_id: getPageParam('id')})


                // 支付
                yield put({
                    type: 'common/wxPaySaga',
                    payload: {
                        api: API_HOME.housePay,
                        data: {
                            order_id: res.data.id
                        }
                    }
                })
            } catch (e) {
            }
        },

        * getHouseOrderListSaga(action, {put, call, select}) {
            let res = yield call(API_HOME.getHouseOrderList)

            yield put({
                type: 'save',
                payload: {
                    houseOrderList: res.data
                }
            })
        },
        * getHouseOrderDetailSaga(action, {put, call, select}) {
            let res = yield call(API_HOME.getHouseOrderDetail, {
                order_id: action.payload.order_id
            })
            yield put({
                type: 'save',
                payload: {
                    houseOrderDetail: res.data
                }
            })
        },

        * cancelHouseOrderSaga(action, {put, call, select}) {
            let res = yield call(API_HOME.cancelHouseOrder, {order_id: action.payload.order_id})
            let houseOrderList = yield select(state => state.home.houseOrderList)
            let orderlist = houseOrderList.list.filter(item => item.id != action.payload.order_id)
            yield put({
                type: 'save',
                payload: {
                    houseOrderList: {
                        ...houseOrderList,
                        list: orderlist
                    }
                }
            })
        },

        * withdrawToWechat(action, {put, call, select}) {
            let res = yield call(API_HOME.withdrawToWechat)
        },

        * withdrawApply(action, {put, call, select}) {
            let res = yield call(API_HOME.withdrawApply, {
                amount: action.payload.amount
            })
        },

        * getBalanceHistorySaga(action, {put, call, select}) {
            let res = yield call(API_HOME.getBalanceHistory)
            yield put({
                type: 'save',
                payload: {
                    balanceHistory: res.data
                }
            })
        },

        * getSwiperSaga(action, {put, call, select}) {
            let swipers = yield select(state => state.home.swipers)
            let flag = action.payload.flag
            let res = yield call(API_HOME.getSwiper, {group: flag})
            swipers[flag] = res.data[flag]
            console.log(swipers)

            yield put({
                type: 'save',
                payload: {
                    swipers: {
                        ...swipers
                    }
                }
            })
        },

        * getNoticeListSaga(action, {put, call, select}) {
            let res = yield call(API_HOME.getNewsList, {type: 0})

            yield put({
                type: 'save',
                payload: {
                    noticeList: res.data.list
                }
            })
        },

        * getFavListSaga(action, {put, call, select}) {
            let res = yield call(API_HOME.getFavList)

            yield put({
                type: 'save',
                payload: {
                    favList: res.data
                }
            })
        },

        * initNewsListPageSaga(action, {put, call, select}) {
            yield put.resolve({
                type: 'getNewsTags'
            })

            let newsTags = yield select(state => state.home.newsTags)
            console.log(newsTags)

            yield put({
                type: 'getNewsListSaga',
                payload: {
                    tag: newsTags[0]
                }
            })
        },

        * getNewsTags(action, {put, call, select}) {
            let res = yield call(API_HOME.getNewsTags, {
                type: 1
            })

            yield put({
                type: 'save',
                payload: {
                    newsTags: res.data
                }
            })
        },

        * getNewsListSaga(action, {put, call, select}) {
            let postData = {
                type: 1
            }

            if (action.payload.tag) {
                postData.tag = action.payload.tag
            }

            if (action.payload.keyword) {
                postData.keyword = action.payload.keyword
            }

            let res = yield call(API_HOME.getNewsList, postData)

            yield put({
                type: 'save',
                payload: {
                    newsList: res.data
                }
            })
        },

        * getNewsDetailSaga(action, {put, call, select}) {
            let res = yield call(API_HOME.getNewsDetail, {id: action.payload.id})
            yield put({
                type: 'save',
                payload: {
                    newsDetail: res.data.detail
                }
            })
        },

        * favSaga(action, {call, put}) {
            let res = yield call(API_HOME.fav, {
                type: action.payload.type,
                value: action.payload.value
            })

            action.payload.success()
        },

        * getViewHistorySaga(action, {put, call, select}) {
            let res = yield call(API_HOME.getViewHistory)

            yield put({
                type: 'save',
                payload: {
                    viewHistory: res.data
                }
            })
        },

        * delViewHistorySaga(action, {put, call, select}) {
            let res = yield call(API_HOME.delViewHistory, {id: action.payload.id})

            yield put({
                type: 'save',
                payload: {
                    viewHistory: res.data.filter(t => t.id !== action.payload.id)
                }
            })
        },

        * getFavStatusSaga(action, {put, call, select}) {
            let res = yield call(API_HOME.getFavStatus, {
                type: action.payload.type,
                value: action.payload.value
            })

            action.payload.success(true)
        },

        * getMeetHistorySaga(action, {put, call, select}) {
            let res = yield call(API_HOME.getMeetHistory)

            yield put({
                type: 'save',
                payload: {
                    meetHistory: res.data
                }
            })
        },

        * meetHouseSaga(action, {put, call, select}) {
            if (!action.payload.name) {
                Taro.showToast({
                    icon: 'none',
                    title: '请输入姓名'
                })
                return
            }

            if (!action.payload.mobile) {
                Taro.showToast({
                    icon: 'none',
                    title: '请输入手机号'
                })
                return
            }

            if (!/^\d{11}$/.test(action.payload.mobile)) {
                Taro.showToast({
                    icon: 'none',
                    title: '手机号格式不正确'
                })
                return
            }

            try {
                let res = yield call(API_HOME.meetingHouse, {
                    estate_id: action.payload.estate_id,
                    name: action.payload.name,
                    phone: action.payload.mobile,
                })
                action.payload.success()
            } catch (e) {

            }
        },

        * searchSaga(action, {put, call, select}) {
            let res = yield call(API_HOME.getHouseList, {
                keyword: action.payload.keyword
            })

        }

    }
}
