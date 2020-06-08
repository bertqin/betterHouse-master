import Taro, {Component} from '@tarojs/taro'
import {connect} from "@tarojs/redux";
import {View, Text, Image, Swiper, SwiperItem} from '@tarojs/components'
import {buildCdnPath} from '@/utils'
import {PageInit, Tabbar, SearchSelect} from '@/components';
import './index.less'


@connect(store => {
    return {
        houseList: store.home.houseList
    }
})

@PageInit()
export default class Index extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'home/initPageSaga'
        })
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    config = {
        navigationBarTitleText: '支付成功'
    }

    test = () => {
        this.props.dispatch({
            type: 'common/x'
        })
    }

    goHouseList = () => {
        Taro.navigateTo({
            url: '/pages/house/list/index'
        })
    }

    goHouseDetail = (item) => {
        Taro.navigateTo({
            url: `/pages/house/detail/index?id=${item.id}`
        })
    }

    render() {
        let {houseList} = this.props
        return (
            <View className='pay_result_index'>
                <View className='pay_success'>
                    <View className='icon'>
                        <Image className='img' src={buildCdnPath('imgs/common/success.png')}/>
                    </View>
                    <View className='title'>支付成功</View>
                    <View className='desc'>
                        本次支付已成功，详细信息请进入
                        <View className='blue'>我的订单</View>
                        查看
                    </View>
                    <View className='btn_common btn_order'>查看订单</View>
                </View>
            </View>
        )
    }
}
