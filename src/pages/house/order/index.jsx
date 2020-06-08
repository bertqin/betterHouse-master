import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Picker, Image} from '@tarojs/components'
import {AtForm, AtInput, AtButton} from 'taro-ui'
import {PageInit} from '@components'
import {connect} from "@tarojs/redux";
import './index.less'
import {buildCdnPath, getPageParam} from "@/utils";

@connect(store => {
    return {
        orderUserInfo: store.home.orderUserInfo,
        fangyuanDetail: store.home.fangyuanDetail,
        about: store.personal.about
    }
})

@PageInit()
export default class Index extends Component {
    config = {
        navigationBarTitleText: '提交购房订单'
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'personal/getAboutSaga'
        })
        this.props.dispatch({
            type: 'home/getFangyuanDetailSaga',
            payload: {
                id: getPageParam('id')
            }
        })
    }

    constructor(props) {
        super(props)
        this.oldTab = null
    }

    onSubmit = () => {
        let {orderUserInfo: u} = this.props
        if (/^\s*$/.test(u.name)) {
            Taro.showToast({
                icon: "none",
                title: '请输入您的姓名'
            })
            return;
        }
        if (/^\s*$/.test(u.idCardNum)) {
            Taro.showToast({
                icon: "none",
                title: '请输入正确的身份证号码'
            })
            return;
        }
        if (/^\s*$/.test(u.mobile)) {
            Taro.showToast({
                icon: "none",
                title: '请输入正确的手机号'
            })
            return;
        }


        this.props.dispatch({
            type: 'home/makeOrderSaga'
        })
    }

    handleChange = (val, e) => {
        let {orderUserInfo} = this.props
        orderUserInfo[e.target.name] = val
        this.props.dispatch({
            type: 'home/save',
            payload: {
                orderUserInfo: {
                    ...orderUserInfo
                }
            }
        })
    }

    scollToTop = () => {
        Taro.pageScrollTo({scrollTop: 0})
    }

    render() {
        let {orderUserInfo, fangyuanDetail, about} = this.props
        console.log('fangyuanDetail', fangyuanDetail)
        return (
            <View className='page_house_order'>
                <View className='app_common_header'>
                    <View className='left' onClick={Taro.navigateBack}>
                        <View className='back'>
                        </View>
                    </View>
                    <View className='title'>提交购房订单</View>
                    <View className='right'></View>
                </View>
                <View className='detail'>
                    <View className='thumb_wrap'>
                        <View className='thumb'>
                            {
                                fangyuanDetail.thumb &&
                                <Image className='img' src={buildCdnPath(fangyuanDetail.thumb)}/>
                            }
                        </View>
                    </View>
                    <View className='right'>
                        <View className='title'>{fangyuanDetail.name}</View>
                        <View className='price_wrap'>
                            <View className='price'>￥{fangyuanDetail.public_money}元</View>
                            <View className='space'>{fangyuanDetail.area}m²</View>
                        </View>
                    </View>
                </View>
                <View className='user_wrap'>
                    <View className='user_title'>签约人信息</View>
                    <AtInput
                        name='name'
                        title='姓名'
                        type='text'
                        placeholder='请输入姓名'
                        value={orderUserInfo.name}
                        onChange={this.handleChange}
                    />
                    <AtInput
                        name='idCardNum'
                        title='身份证号码'
                        type='text'
                        placeholder='请输入身份证号码'
                        value={orderUserInfo.idCardNum}
                        onChange={this.handleChange}
                    />
                    <AtInput
                        name='mobile'
                        title='手机号码'
                        type='text'
                        placeholder='请输入手机号码'
                        value={orderUserInfo.mobile}
                        onChange={this.handleChange}
                    />
                    <View className='btn_wrap'>
                        <View className='price'>诚意金：{fangyuanDetail.book_money}元</View>
                        <View className='btn' onClick={this.onSubmit}>提交订单</View>
                    </View>
                </View>
                <View className='about'>
                    <View className='title'>购房须知</View>
                    <View dangerouslySetInnerHTML={{__html: about.order}}></View>
                    <View className='to_top_btn' onClick={this.scollToTop}>收起</View>
                </View>
            </View>
        )
    }
}
