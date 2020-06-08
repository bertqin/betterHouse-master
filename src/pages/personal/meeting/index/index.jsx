import Taro, {Component} from '@tarojs/taro'
import {connect} from "@tarojs/redux";
import {View, Image} from '@tarojs/components'
import {PageInit, Tabs,} from '@/components';
import './index.less'
import {API_HOME} from '@/api'
import {buildCdnPath} from '@/utils'
import moment from "moment";

@connect(store => {
    return {
        meetHistory: store.home.meetHistory
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
        return <View className={`coupon_item ${item.visit_user ? 'visited' : ''}`} key={item.id}>
            <View className='coupon_card'>
                <View className='left_wrap'>
                    {
                        item.estate && <Image src={buildCdnPath(item.estate.thumb)} className='img'/>
                    }
                </View>
                <View className='right_wrap'>
                    <View className='right_top'>
                        <View className='title'>{item.estate && item.estate.name}</View>
                        <View className='desc_wrap'>
                            <View className='time'>预约时间：{moment(item.create_time * 1000).format('YYYY-MM-DD')}</View>
                            <View className='btn'>{item.visit_user ? '已看房' : '未看房'}</View>
                        </View>
                    </View>
                    <View className='right_bottom' onClick={this.showDetail.bind(this, item.id)}>预约信息</View>
                </View>
            </View>
            {
                this.state.currentId == item.id && <View className='coupon_footer'>
                    <View className='desc'>意向楼盘：{item.estate.name}</View>
                    <View className='user'>
                        <View>预约者姓名：{item.name}</View>
                        <View>手机号码：{item.phone}</View>
                    </View>
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
                    <View className='title'>预约看房记录</View>
                    <View className='right'></View>
                </View>
                <Tabs
                    tabList={[{title: '全部'}, {title: '未看房'}, {title: '已看房'}]}
                    requestAPI={API_HOME.getMeetHistory}
                    renderItem={this.renderItem.bind(this)}
                />
            </View>
        )
    }
}
