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
        favList: store.home.favList
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

    componentDidMount() {
        this.props.dispatch({
            type: 'home/getFavListSaga'
        })
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

    cancelFav = (item) => {
        let {favList} = this.props
        this.props.dispatch({
            type: 'home/favSaga',
            payload: {
                type: item.type,
                value: item.value,
                success: () => {
                    // 更新 favList
                    favList = favList.filter(l => l.id != item.id)
                    this.props.dispatch({
                        type: 'home/save',
                        payload: {
                            favList
                        }
                    })
                }
            }
        })
    }

    renderItem = item => {
        return <View className={`coupon_item ${item.visit_user ? 'visited' : ''}`} key={item.id}>
            <View className='coupon_card'>
                <View className='left_wrap'>
                    {
                        item.estate &&
                        <Image src={buildCdnPath(item.estate.thumb)} className='img'/>
                    }
                </View>
                <View className='right_wrap'>
                    <View className='right_top'>
                        <View className='title'>{item.estate && item.estate.name}</View>
                        <View className='desc_wrap'>
                            <View className='time'>{item.estate && item.estate.address}</View>
                            <View className='btn' onClick={this.cancelFav.bind(this, item)}>取消收藏</View>
                        </View>
                    </View>
                    <View
                        className='right_bottom'>收藏时间：{moment((item.update_time || item.create_time) * 1000).format('YYYY-MM-DD')}</View>
                </View>
            </View>

        </View>
    }

    render() {
        let {favList} = this.props
        return (
            <View className='page_personal_fav_index'>
                <View className='app_common_header'>
                    <View className='left' onClick={() => Taro.navigateBack()}>
                        <View className='back'></View>
                    </View>
                    <View className='title'>设置</View>
                    <View className='right'></View>
                </View>

                <View className='list'>
                    {
                        favList.length ? favList.map(l => {
                                return this.renderItem(l)
                            }) :
                            <View className='app_list_empty'>还没有收藏</View>
                    }
                </View>
            </View>
        )
    }
}
