import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image} from '@tarojs/components'
import {PageInit, MSwiper} from '@components'
import {connect} from "@tarojs/redux";
import './index.less'
import {buildCdnPath} from "../../../utils";

@connect(store => {
    return {
        activityList: store.activity.activityList,
        userInfo: store.common.userInfo
    }
})

@PageInit()
export default class Index extends Component {
    config = {
        navigationBarTitleText: '活动列表'
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'activity/initPageSaga'
        })
        this.props.dispatch({
            type: 'common/getUserInfoSaga'
        })
    }

    constructor(props) {
        super(props)
    }

    clickTab = (item) => {
        console.log(item)
        this.setState({
            current: item.id,
            tabOpen: true
        })
    }


    goDetail = (item) => {
        let {userInfo} = this.props
        if (!userInfo.invite_code) return
        Taro.navigateTo({
            url: `/pages/activity/detail/index?id=${item.id}&invite_code=${userInfo.invite_code}`
        })
    }

    withdraw = () => {
        let {userInfo} = this.props
        if (userInfo.balance <= 0) {
            Taro.showToast({
                icon: 'none',
                title: '提现申请失败: 余额不足!'
            })
            return
        }
        this.props.dispatch({
            type: 'home/withdrawApply',
            payload: {
                amount: userInfo.balance
            }
        })
    }

    goOrderList = () => {
        Taro.navigateTo({
            url: '/pages/activity/balanceList/index'
        })
    }

    render() {
        let {activityList, userInfo} = this.props
        console.log(activityList)
        return (
            <View className='page_activity_index'>
                <View className='top'
                      style={{background: `url(${buildCdnPath('imgs/page_activity_index/bg.png')}) no-repeat top center`}}>
                    <View className='app_common_header'>
                        <View className='left' onClick={() => Taro.navigateBack()}>
                            <View className='back'>
                                <Image className='img' src={buildCdnPath('imgs/common/back_white.png')}/>
                            </View>
                        </View>
                        <View className='title'>京山买房</View>
                        <View className='right' onClick={this.goOrderList}>
                            <View>账单</View>
                        </View>
                    </View>
                    <View className='top_content'>
                        <View className='money_wrap'>
                            <View className='money_title'>我的资产(元)</View>
                            <View className='money'>
                                <View className='btn-withdraw' style={{border: 'none'}}></View>
                                <View className='price'>{userInfo.balance || '0.00'}</View>
                                <View className='btn-withdraw' onClick={this.withdraw}><View>提现</View></View>
                            </View>
                        </View>
                        <View className='stat_list'>
                            <View className='stat_item'>
                                <View className='num'>{userInfo.statistic && userInfo.statistic.comm_todo || '0'}</View>
                                <View className='desc'>佣金待生效</View>
                            </View>
                            <View className='stat_item'>
                                <View className='num'>{userInfo.statistic && userInfo.statistic.comm_done || '0'}</View>
                                <View className='desc'>总佣金</View>
                            </View>
                            <View className='stat_item'>
                                <View
                                    className='num'>{userInfo.statistic && userInfo.statistic.withdraw_done || '0'}</View>
                                <View className='desc'>总提现</View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='content_wrap'>
                    <MSwiper flag='activity_index_top' className='ad'/>
                    <View className='share_title_wrap'>
                        <View className='share_title'>
                            <Image className='img' src={buildCdnPath('imgs/page_activity_index/title.png')}/>
                        </View>
                    </View>
                    <View className='share_list'>
                        {
                            activityList.map(item => {
                                return <View className='share_item' key={item.id}
                                             onClick={this.goDetail.bind(this, item)}>
                                    <View className='title'>{item.title}</View>
                                    <View className='thumb'>
                                        <Image className='img' src={buildCdnPath(item.thumb)}/>
                                    </View>
                                    <View className='footer'>

                                        <View className='more'>查看详情</View>
                                        {/*<View className='money'>收入：500</View>*/}
                                    </View>
                                </View>
                            })
                        }
                    </View>
                </View>
            </View>
        )
    }
}
