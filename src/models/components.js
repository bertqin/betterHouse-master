export default {
    namespace: 'components',
    state: {
        modal: {
            show: false,
            title: null,
            content: null
        },
        toast: {
            show: false,
            text: ''
        },
        tabData: {}
    },
    reducers: {
        save(state, {payload}) {
            return {...state, ...payload}
        },
        modalShow(state, {payload}) {
            return {...state, modal: {...payload, show: true}}
        },
        modalHide(state) {
            return {...state, modal: {...state.modal, show: false}}
        },
        toast(state, {payload}) {
            return {...state, toast: {...payload}}
        }
    },

    effects: {
        x() {
            console.log('xxxxxxxxxxx')
        },
        * getTabSaga(action, {put, call}) {
            let res = yield call(action.payload.requestAPI)
            yield put({
                type: 'save',
                payload: {
                    tabData: res.data
                }
            })
        }
    }
}
