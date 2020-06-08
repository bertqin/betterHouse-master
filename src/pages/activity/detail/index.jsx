import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image} from '@tarojs/components'
import {PageInit} from '@components'
import {connect} from "@tarojs/redux";
import {buildCdnPath} from '@/utils'

import './index.less'

@connect(store => {
    return {
        activityDetail: store.activity.activityDetail,
        userInfo: store.common.userInfo
    }
})
@PageInit()
export default class Index extends Component {
    config = {
        navigationBarTitleText: ''
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'activity/initActivityDetailPageSaga'
        })
    }

    goDetail = () => {
        Taro.navigateTo({
            url: '/pages/house/detail/index'
        })
    }

    render() {
        let {activityDetail} = this.props
        let bg_color = activityDetail.page_config && activityDetail.page_config.bg_color
        let bg_image = activityDetail.page_config && activityDetail.page_config.bg_image

        return (
            <View className='page_activity_detail'>
                <View className='app_common_header white'
                      style={{background: `url(${buildCdnPath('imgs/common/header_bg.png')}) no-repeat top center /cover`}}>
                    <View className='left' onClick={Taro.navigateBack}>
                        <View className='back'></View>
                    </View>
                    <View className='title'>{activityDetail.title}</View>
                    <View className='right'></View>
                </View>
                <View className='top_wrap'
                      style={{background: `${bg_color} url(${buildCdnPath(bg_image)}) no-repeat top center / cover`}}>
                    <View className='notice_wrap'>
                        <View className='notice'>
                            <View className="item"><View className='dot'></View>用户173****0927 刚刚提现了100元现金红包</View>
                            <View className="item"><View className='dot'></View>用户173****0927 刚刚提现了100元现金红包</View>
                        </View>
                    </View>
                    {/*<View className='sy_wrap'>*/}
                    {/*    <View className='sy'>*/}
                    {/*        <Image className='img' src={buildCdnPath('imgs/page_activity_detail/sy.png')}/>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                </View>
                <View className='guide_title_wrap'>
                    <View className='guide_img'>
                        <Image className='img' src={buildCdnPath('imgs/page_activity_detail/guide_title.png')}/>
                    </View>
                </View>
                <View className='guide_content' dangerouslySetInnerHTML={{__html: activityDetail.detail}}>
                    {/*<View className='guide_item'>*/}
                    {/*    3.人脉榜单奖要求每位好友投资额≥3000元才能进入榜单排名，若*/}
                    {/*    邀请好友数一样，按好友总投资额排名，榜单奖品按月统计且在次*/}
                    {/*    月前5个工作日确认后发放，次月月初排名将重新计算；*/}
                    {/*</View>*/}
                </View>
                <View className='records_title'>
                    <View className='records_content'>
                        <View className='record_title'>
                            <View className='record_img'>
                                <Image className='img'
                                       src={buildCdnPath('imgs/page_activity_detail/record_title.png')}/>
                            </View>
                        </View>
                        <View className='box'>
                            <View className='box_inner'></View>
                        </View>
                        <View className='record_list'>
                            <View className='record_item record_item_title'>
                                <View className='item'>账户</View>
                                <View className='item'>好友状态</View>
                                <View className='item'>获得奖励</View>
                            </View>
                            <View className='record_item'>
                                <View className='item'>133****3996</View>
                                <View className='item'>好友状态</View>
                                <View className='item'>获得奖励</View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='footer'>
                    <View className='share_link'>
                        <View className='icon'>
                            <Image className='img' src={buildCdnPath('imgs/common/share.png')}/>
                        </View>
                        <View className='text'>分享邀请链接</View>
                    </View>
                    <View className='share_link face'>
                        <View className='icon'>
                            <Image className='img' src={buildCdnPath('imgs/common/ewm.png')}/>
                        </View>
                        <View className='text'>面对面邀请</View>
                    </View>
                </View>
            </View>
        )
    }
}
