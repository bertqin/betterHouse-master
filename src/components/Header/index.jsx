import Taro, {Component} from '@tarojs/taro'
import {AtTabBar} from 'taro-ui'

import './index.less'
import {Image, Swiper, SwiperItem, View} from "@tarojs/components";
import {buildCdnPath} from "../../utils";
import {connect} from "@tarojs/redux";

@connect(state => {
    return {
        swipers: state.home.swipers
    }
})

export default class Index extends Component {

    render() {
        let {swipers, flag, className} = this.props
        return (
            <View className='app_common_header'>
                <View className='left' onClick={() => Taro.navigateBack()}>
                    <View className='back'></View>
                </View>
                <View className='title'>京山买房</View>
                <View className='right' onClick={this.goOrderList}>
                    <View>账单</View>
                </View>
            </View>
        )
    }
}
