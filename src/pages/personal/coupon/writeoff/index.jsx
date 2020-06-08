import Taro, {Component} from '@tarojs/taro'
import {connect} from "@tarojs/redux";
import {View, Image} from '@tarojs/components'
import {PageInit, Tabs,} from '@/components';
import {QRCode} from 'taro-code'
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
            currentId: -1
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
        navigationBarTitleText: '核销'
    }

    render() {
        return (
            <View className='page_personal_coupon_writeoff'>
                <View className='app_common_header'>
                    <View className='left'>
                        <View className='back' onClick={Taro.navigateBack}></View>
                    </View>
                    <View className='title'>核销码</View>
                    <View className='right'></View>
                </View>
                <View className='ewm_wrap'>
                    <View className='ewm'>
                        <QRCode
                            className={'img'}
                            text='world'
                            errorCorrectLevel='M'
                        />
                    </View>
                    <View className='code'>2341-5132-8615</View>
                    <View className='tip'>请向置业顾问出示</View>
                </View>
                <View className='list'>
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
