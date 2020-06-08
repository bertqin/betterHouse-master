import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image} from '@tarojs/components'
import {PageInit} from '@components'
import {connect, Provider} from "@tarojs/redux";
import './index.less'
import {buildCdnPath, getPageParam} from "../../../utils";
import {SignBox} from "@/pages/_components";
import {Modal} from '@/components'

@connect(store => {
    return {
        houseList: store.home.houseList,
        activityDetail: store.activity.activityDetail
    }
})

@PageInit()
export default class Index extends Component {
    config = {
        navigationBarTitleText: '活动列表'
    }

    componentWillMount() {
        this.props.dispatch({
            type: 'home/getHouseListSaga',
            payload: {
                act_id: getPageParam('activity_id')
            }
        })
        this.props.dispatch({
            type: 'activity/getActivityDetailSaga',
            payload: {
                id: getPageParam('activity_id')
            }
        })
    }

    constructor(props) {
        super(props)
    }

    clickTab = (item) => {
        this.setState({
            current: item.id,
            tabOpen: true
        })
    }


    goDetail = (id) => {
        Taro.navigateTo({
            url: `/pages/showroom/detail/index?id=${id}`
        })
    }

    sign = (e) => {
        e.stopPropagation()
        this.props.dispatch({
            type: 'components/modalShow',
            payload: {
                title: '立即报名',
                content: <SignBox/>
            }
        });
    }

    render() {
        let {houseList, activityDetail} = this.props
        return (
            <View className='page_showroom_list'>
                <View className='banner'>
                    <Image className='img' src={buildCdnPath('imgs/page_showroot_list/banner.png')}/>
                </View>
                <View className='list_wrap'>
                    <View className='list'>
                        {
                            houseList.map(h => {
                                return <View className='item' key={h.id} onClick={this.goDetail.bind(this, h.id)}>
                                    <View className='title_wrap'>
                                        <View className='icon'></View>
                                        <View className='title'>{h.name}</View>
                                    </View>
                                    <View className='desc_wrap'>
                                        <View className='countdown_wrap'>
                                            <View>剩余</View>
                                            <View className='countdown'>{activityDetail.end_time}</View>
                                        </View>
                                        <View className='sign_num'>
                                            <View className='icon'></View>
                                            <View className='num'>100</View>
                                            <View>人已报名</View>
                                        </View>
                                    </View>
                                    <View className='content'>
                                        <View className='thumb'>
                                            <Image className='img' src={buildCdnPath(h.thumb)}></Image>
                                        </View>
                                        <View className='content_right'>
                                            <View className='title'>{h.name}</View>
                                            <View className='addr_wrap'>
                                                <View className='address'>{h.address}</View>
                                                <View className='price'>
                                                    {h.money_low}元/m²
                                                </View>
                                            </View>
                                            <View className='space'>建面 {h.area_low}-{h.area_high} m²</View>
                                            <View className='tags'>
                                                {
                                                    h.attr_value && h.attr_value.slice(0, 3).map(a => {
                                                        return <View className='tag' key={a.title}>{a.value}</View>
                                                    })
                                                }

                                            </View>
                                        </View>
                                    </View>
                                    <View className='btn_sign' onClick={this.sign.bind(this)}>立即报名</View>
                                </View>
                            })
                        }

                    </View>
                </View>
                <Modal/>
            </View>
        )
    }
}
