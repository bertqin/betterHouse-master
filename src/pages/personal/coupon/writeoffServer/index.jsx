import Taro, {Component} from '@tarojs/taro'
import {connect} from "@tarojs/redux";
import {View, Image} from '@tarojs/components'
import {PageInit,} from '@/components';
import {AtInput} from 'taro-ui'
import './index.less'
import {API_HOME} from '@/api'
import {buildCdnPath} from '@/utils'

@connect(store => {
    return {
        houseOrderList: store.home.houseOrderList
    }
})

@PageInit()
export default class Index extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            code: ''
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.props.dispatch({
            type: ''
        })
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    config = {
        navigationBarTitleText: '卡券核销'
    }

    handleChange = (value) => {
        this.setState({
            code: value.trim()
        })
    }

    scan = () => {
        Taro.scanCode({
            scanType: ['qrCode'],
            success: (res) => {
                this.setState({
                    code: res.result
                })
            },
            fail() {
                Taro.showToast({
                    icon: 'none',
                    title: '扫码异常'
                })
            }
        })
    }

    writeoff = () => {
        if (!this.state.code) {
            Taro.showToast({
                icon: 'none',
                title: '核销码异常'
            })
            return
        }
        this.props.dispatch({
            type: 'coupon/writeOffCouponSaga'
        })
    }

    render() {
        return (
            <View className='page_personal_coupon_writeoff'>
                <View className='app_common_header'>
                    <View className='left'>
                        <View className='back'>
                        </View>
                    </View>
                    <View className='title'>核销</View>
                    <View className='right'></View>
                </View>
                <View className='code_wrap'>
                    <View className='title'></View>
                    <View className='input_wrap'>
                        <AtInput
                            clear
                            title='验证码'
                            type='text'
                            maxLength='4'
                            placeholder='验证码'
                            value={this.state.code}
                            onChange={this.handleChange.bind(this)}
                        >
                            <View onClick={this.scan}>扫码</View>
                        </AtInput>
                    </View>
                    <View className={`btn_common ${this.state.code ? '' : 'disabled'}`}
                          onClick={this.writeoff}>核销</View>
                </View>
                <View className='list'>
                    <View className='title'>核销记录</View>
                    <View className='item'>
                        <View className='label'>名称</View>
                        <View className='desc'>购房优惠券</View>
                    </View>
                    <View className='item'>
                        <View className='label'>名称</View>
                        <View className='desc'>购房优惠券</View>
                    </View>
                </View>
            </View>
        )
    }
}
