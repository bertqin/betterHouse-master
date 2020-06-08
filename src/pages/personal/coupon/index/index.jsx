import Taro, {Component} from '@tarojs/taro'
import {connect} from "@tarojs/redux";
import {View, Image} from '@tarojs/components'
import {PageInit, Tabs,} from '@/components';
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

    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    config = {
        navigationBarTitleText: '首页'
    }

    goDetail = (id) => {
        Taro.navigateTo({
            url: `/pages/personal/coupon/writeoff/index?id=${id}`
        })
    }

    getCoupon = () => {
        this.props.dispatch({
            type: 'coupon/getCouponSaga',
            payload: {id: 2}
        })
    }

    showDetail = (id) => {
        console.log(id, this.state.currentId)
        this.setState({
            currentId: this.state.currentId == id ? -1 : id
        })
    }


    renderItem = item => {
        return <View className='coupon_item' key={item.id} onClick={this.goDetail.bind(this, item.id)}>
            <View className='coupon_card'>
                <View className='left_wrap'>
                    <View className='price'>
                        <View className='unit'>¥</View>
                        <View className='num'>2000</View>
                    </View>
                    <View className='price_desc'>购房优惠大礼包</View>
                </View>
                <View className='right_wrap'>
                    <View className='right_top'>
                        <View className='title'>仅限天健和府楼盘使用</View>
                        <View className='desc_wrap'>
                            <View className='time'>2020.04.07-2020.05-07</View>
                            <View className='btn'>立即使用</View>
                        </View>
                    </View>
                    <View className='right_bottom' onClick={this.showDetail.bind(this, item.id)}>详细信息</View>
                </View>
            </View>
            {
                this.state.currentId == item.id && <View className='coupon_footer'>
                    <View className='desc'>限用楼盘：仅限天健和府楼盘使用</View>
                    <View>使用规则：可与通用红包叠加使用</View>
                </View>
            }
        </View>
    }

    render() {
        return (
            <View className='page_personal_coupon_index'>
                <View className='app_common_header'>
                    <View className='left' onClick={() => Taro.navigateBack()}>
                        <View className='back'></View>
                    </View>
                    <View className='title'>我的优惠券</View>
                    <View className='right'></View>
                </View>
                <Tabs
                    // tabList={[{title: '11'}, {title: '22'}, {title: '33'}]}
                    requestAPI={API_HOME.getCouponList}
                    renderItem={this.renderItem.bind(this)}
                />
            </View>
        )
    }
}
