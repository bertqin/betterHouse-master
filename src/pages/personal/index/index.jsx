import Taro, {Component} from '@tarojs/taro'
import {connect} from "@tarojs/redux";
import {View, Image} from '@tarojs/components'
import {PageInit, Tabbar, MSwiper} from '@/components';
import {SignBox} from '@/pages/_components'
import './index.less'
import {buildCdnPath} from '@/utils'

@connect(state => {
    return {
        userInfo: state.common.userInfo
    }
})

@PageInit()
export default class Index extends Component {

    state = {
        menu: {
            '个人中心': [
                {
                    title: '看房清单',
                    url: '/pages/personal/meeting/index/index',
                    icon: buildCdnPath('imgs/page_personal_index/m_1_1.png'),
                },
                {
                    title: '我的收藏',
                    url: '/pages/personal/fav/index/index',
                    icon: buildCdnPath('imgs/page_personal_index/m_1_2.png')
                },
                {
                    title: '浏览记录',
                    url: '/pages/personal/viewHistory/index/index',
                    icon: buildCdnPath('imgs/page_personal_index/m_1_3.png')
                },
                // {
                //     title: '我的点评',
                //     icon: buildCdnPath('imgs/page_personal_index/m_1_4.png')
                // },
                // {
                //     title: '我的问答',
                //     icon: buildCdnPath('imgs/page_personal_index/m_1_5.png')
                // },
                {
                    title: '我想赚钱',
                    url: '/pages/activity/index/index',
                    icon: buildCdnPath('imgs/page_personal_index/m_1_6.png')
                }
            ],
            '其它服务': [
                // {
                //     title: '房贷计算',
                //     icon: buildCdnPath('imgs/page_personal_index/m_2_1.png')
                // },
                {
                    title: '联系客服',
                    icon: buildCdnPath('imgs/page_personal_index/m_2_2.png'),
                    tel: ''
                },
                {
                    title: '关于我们',
                    url: '/pages/personal/about/index/index',
                    icon: buildCdnPath('imgs/page_personal_index/m_2_3.png')
                },
                {
                    title: '帮助与反馈',
                    url: '/pages/personal/bindMobile/index',
                    icon: buildCdnPath('imgs/page_personal_index/m_2_4.png')
                },
            ]
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'common/getUserInfoSaga'
        })

        this.state.menu['其它服务'][0].tel = global.appInfo.site_info.site_tel
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

    test = () => {
        this.props.dispatch({
            type: 'common/x'
        })
    }

    handleClick = (m) => {
        if (m.url || /^http/.test(m.tel)) {
            let url = m.url || m.tel
            return Taro.navigateTo({url})
        }
        if (m.tel) {
            Taro.makePhoneCall({
                phoneNumber: m.tel
            })
        }
    }

    sign = () => {
        let {dispatch} = this.props
        dispatch({
            type: 'components/modalShow',
            payload: {
                title: '立即报名',
                content: <SignBox/>
            }
        })
    }

    goOrderIndex = () => {
        Taro.navigateTo({
            url: '/pages/personal/houseOrder/index/index'
        })
    }

    goCouponList = () => {
        Taro.navigateTo({
            url: '/pages/personal/coupon/index/index'
        })
    }

    setting = () => {
        Taro.navigateTo({
            url: '/pages/personal/setting/index/index'
        })
    }

    render() {
        let {userInfo} = this.props
        let {menu} = this.state
        return (
            <View className='page_personal_index'>
                <View className='app_common_header white'>
                    <View className='left' onClick={() => Taro.navigateBack()}>
                        <View className='back'>
                            <Image lazyLoad className='img' src={buildCdnPath('imgs/common/back_white.png')}/>
                        </View>
                    </View>
                    <View className='title'>京山买房</View>
                    <View className='right'></View>
                </View>
                <View className='top'
                      style={{backgroundImage: `url(${buildCdnPath('imgs/page_personal_index/bg.png')})`}}>
                    <View className='user_wrap'>
                        <View className='avatar_wrap'>
                            <View className='avatar'>
                                {
                                    userInfo.avatar ? <Image className='img'
                                                             src={buildCdnPath(userInfo.avatar)}/>
                                        : <Image className='img'
                                                 src={buildCdnPath('imgs/page_personal_index/avatar.png')}/>
                                }
                            </View>
                        </View>
                        {
                            userInfo.id ?
                                <View className='user_info'>
                                    <View className='name'>{userInfo.nickname || userInfo.id_card_name}</View>
                                    <View className='desc'>{userInfo.mobile}</View>
                                </View> :
                                <View className='user_info'>
                                    <View className='name'>注册/登录</View>
                                    <View className='desc'>登录后即可享受更多服务</View>
                                </View>
                        }
                    </View>
                </View>
                <View className='main_menu_wrap'>
                    <View className='main_menu'>
                        <View className='left'>
                            <View className='item' onClick={this.goOrderIndex}>
                                <View className='icon'>
                                    <Image className='img'
                                           src={buildCdnPath('imgs/page_personal_index/t_1.png')}></Image>
                                </View>
                                <View className='text'>我的订单</View>
                            </View>
                            <View className='item' onClick={this.goCouponList}>
                                <View className='icon'><Image className='img'
                                                              src={buildCdnPath('imgs/page_personal_index/t_2.png')}/></View>
                                <View className='text'>优惠券</View>
                            </View>
                        </View>
                        <View className='right'>
                            <View className='icon'>{userInfo.balance || '0.00'}</View>
                            <View className='text'>余额</View>
                        </View>
                    </View>
                </View>
                <View className='s_content'>
                    <View className='ad_wrap'>
                        <MSwiper flag='personal_index_top' className='ad'/>
                    </View>
                    {
                        Object.keys(menu).map(key => {
                            return <View className='s_menu' key={key}>
                                <View className='title'>{key}</View>
                                <View className='s_menu_list'>
                                    {
                                        menu[key].map(m => {
                                            return <View className='s_menu_item'
                                                         onClick={this.handleClick.bind(this, m)}
                                                         key={m.title}>
                                                <View className='icon_wrap'>
                                                    <View className='icon'>
                                                        <Image src={m.icon} className='img'/>
                                                    </View>
                                                </View>
                                                <View className='text'>{m.title}</View>
                                            </View>
                                        })
                                    }

                                </View>
                            </View>
                        })
                    }
                </View>
            </View>
        )
    }
}
