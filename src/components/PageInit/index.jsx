import Taro, {Component} from '@tarojs/taro'
import {connect} from "@tarojs/redux";
import {View} from '@tarojs/components'

import './index.less'

let initScrolled = false

console.log(Taro.navigateTo)

function PageInit() {
    return function (Component) {
        @connect(store => {
            return {pageLoading: store.common.pageLoading}
        })
        class A extends Component {
            initScrollEvent() {
                if (initScrolled) return
                initScrolled = true
                try {
                    let wrapper = document.querySelector('.taro-tabbar__panel')
                    wrapper.addEventListener('scroll', (e) => {
                        try {
                            let headers = document.querySelectorAll('.app_common_header')
                            let header = headers[headers.length - 1]
                            if (wrapper.scrollTop > header.getBoundingClientRect().height / 2) {
                                header.classList.add('on')
                            } else {
                                header.classList.remove('on')
                            }
                        } catch (e) {
                            console.log('scroll error', e)
                        }
                    }, false)
                } catch (e) {

                }

            }

            componentDidMount() {
                try {
                    document.querySelector('.taro-tabbar__panel').scrollTo(0, 0)
                    this.initScrollEvent()
                } catch (e) {

                }

                // setTimeout(() => {
                //     super.componentDidMount()
                // }, 1000)

                this.props.dispatch({
                    type: 'common/initPageSaga'
                }).then(() => {
                    super.componentDidMount()
                }).catch(() => {
                    super.componentDidMount()
                })
            }
        }

        return A
    }
}

export default PageInit
