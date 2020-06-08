import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image, Button} from '@tarojs/components'
import {PageInit} from '@components'
import {connect} from "@tarojs/redux";
import './index.less'
import {buildCdnPath, getPageParam} from "../../../utils";
import {AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput} from "taro-ui";

@connect(store => {
    return {
        houseDetail: store.home.houseDetail,
        huxingList: store.home.huxingList,
        fangyuan: store.home.fangyuan,
        fangyuanContent: store.home.fangyuanContent
    }
})

@PageInit()
export default class Index extends Component {
    state = {
        init: false,
        modalShow: false,
        mobile: '',
        name: '',
        fav_status: false,
    }

    config = {
        navigationBarTitleText: '京山好房'
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'home/initHouseDetailSaga',
            payload: {
                success: () => {
                    this.setState({
                        init: true
                    })
                }
            }
        })

        this.props.dispatch({
            type: 'home/getFavStatusSaga',
            payload: {
                type: 'house_estate',
                value: getPageParam('id'),
                success: (val) => {
                    this.setState({
                        fav_status: val
                    })
                }
            }
        })

        this.props.dispatch({
            type: 'coupon/getCouponPoolSaga',
            payload: {
                type: 'house_estate',
                estate_id: getPageParam('id'),
            }
        })
    }

    componentWillUnmount() {

    }

    constructor(props) {
        super(props)
        this.oldTab = null

        this.props.dispatch({
            type: 'home/save',
            payload: {
                houseDetail: {}
            }
        });
    }

    handleInputChange = (value, key) => {
        this.setState({
            [key]: value
        })
    }

    goDetail = () => {
        Taro.navigateTo({
            url: '/pages/house/detail/index'
        })
    }

    goHuxing = (item) => {
        Taro.navigateTo({
            url: `/pages/house/huxing/index?id=${item.id}&estate_id=${getPageParam('id')}`
        })
    }

    chooseHouse = () => {
        Taro.navigateTo({
            url: `/pages/house/choose/index?id=${getPageParam('id')}`
        })
    }

    meet = () => {
        this.setState({
            modalShow: true
        })
    }

    meetSure = () => {
        // estate_id	楼盘id		[string]
        // room_id	房源id		[string]
        // style_id	户型id		[string]
        // name	姓名（中文）	是	[string]
        // phone	手机号	是
        // meet_time	见面时
        this.props.dispatch({
            type: 'home/meetHouseSaga',
            payload: {
                estate_id: getPageParam('id'),
                name: this.state.name,
                mobile: this.state.mobile,
                success: () => {
                    this.handleClose()
                }
            }
        })
    }

    handleClose = () => {
        this.setState({
            modalShow: false
        })
    }

    fav = () => {
        let oldStatus = this.state.fav_status
        this.props.dispatch({
            type: 'home/favSaga',
            payload: {
                type: 'house_estate',
                value: getPageParam('id'),
                success: () => {
                    this.setState({
                        fav_status: !oldStatus
                    })
                }
            }
        })
    }

    tel = (phoneNumber) => {
        if (!phoneNumber) return
        Taro.makePhoneCall({
            phoneNumber
        })
    }

    getCoupon = () => {
        this.props.dispatch({
            type: 'coupon/getCouponSaga',
            payload: {id: 2}
        })
    }

    goCoupon = () => {
        Taro.navigateTo({
            url: '/pages/personal/coupon/index/index'
        })
    }

    render() {
        let {houseDetail, huxingList} = this.props
        return (
            <View className='page_house_detail'>
                <View className='app_common_header'>
                    <View className='left' onClick={Taro.navigateBack}>
                        <View className='back'>
                        </View>
                    </View>
                    <View className='title'>{houseDetail.name}</View>
                    <View className='right'></View>
                </View>
                <Swiper
                    className='swiper'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    circular
                    indicatorDots
                >
                    <SwiperItem>
                        {
                            houseDetail.thumb &&
                            <Image
                                className='img'
                                src={buildCdnPath(houseDetail.thumb)}/>
                        }
                    </SwiperItem>
                </Swiper>
                <View className='main_content'>
                    <View className='detail_wrap'>
                        <View className='top'>
                            <View className='title'>{houseDetail.name}</View>
                            <View className='tags'>
                                {
                                    houseDetail.attr_value && houseDetail.attr_value.map(item => {
                                        return <View className='tag'>{item.value}</View>
                                    })
                                }
                                <View className='redpack' onClick={this.goCoupon}>
                                    <Image className='img' src={buildCdnPath('imgs/page_house_detail/redpack.png')}/>
                                </View>
                            </View>
                            <View className='price'>约 {houseDetail.price_low || '0.00'} 元/m²
                            </View>

                            <View className='params'>
                                <View className='open_time'>开盘时间：{houseDetail.sale_time}</View>
                                <View className='address'>地址: {houseDetail.address}</View>
                                <View className='tel_wrap'>
                                    联系电话：<View className='tel'>{houseDetail.tel}</View>
                                </View>
                                {/*<View className='btn_more_wrap'>*/}
                                {/*    展开更多*/}
                                {/*    <View className='more_icon'>*/}
                                {/*        <Image className='img'*/}
                                {/*               src={buildCdnPath('imgs/common/arrow_down.png')}*/}
                                {/*        />*/}
                                {/*    </View>*/}
                                {/*</View>*/}

                            </View>
                        </View>
                        <View className='detail'>
                            <View className='notice'>
                                <View className='notice_1'></View>
                                <View className='notice_2'></View>
                            </View>
                            <View className='ad1' onClick={this.chooseHouse}>
                                <Image className='img' src={buildCdnPath('imgs/page_house_detail/ad0.png')}/>
                            </View>
                        </View>

                        <View className='huxing_wrap'>
                            <View className='huxing_title'>户型</View>
                            <View className='huxing_list_wrap'>
                                <View className='huxing_list'>
                                    {
                                        huxingList.map(hx => {
                                            return <View key={hx.id} className='huxing_item'
                                                         onClick={this.goHuxing.bind(this, hx)}>
                                                <View className='huxing_thumb'>
                                                    <Image className='img' src={hx.thumb}/>
                                                </View>
                                                <View className='title'>{hx.name}</View>
                                                <View className='desc'>建面{hx.area}m²</View>
                                                <View className='price'>约{hx.price_all}万/套</View>
                                            </View>
                                        })
                                    }
                                </View>
                            </View>
                        </View>
                    </View>

                </View>

                <View className='operator'>
                    <View className='fav_btn' onClick={this.fav}>
                        <View className='fav_icon'>
                            {
                                !this.state.fav_status ?
                                    <Image className='img'
                                           src={buildCdnPath('imgs/common/fav.png')}/> :
                                    <Image className='img'
                                           src={buildCdnPath('imgs/common/fav_on.png')}/>
                            }

                        </View>
                        <View className='text'>收藏</View>
                    </View>
                    <View className='yuyue_btn' onClick={this.meet}>
                        <View className='yuyue_icon'>
                            <Image className='img' src={buildCdnPath('imgs/common/yuyue.png')}/>
                        </View>
                        <View className='text'>预约看房</View>
                    </View>
                    {/*<View className='ask_btn btn'>在线咨询</View>*/}
                    <View className='buy_btn btn' onClick={this.tel.bind(this, houseDetail.tel)}>致电售楼处</View>
                </View>

                <AtModal isOpened={this.state.modalShow} onClose={this.handleClose}>
                    <AtModalHeader>预约看房</AtModalHeader>
                    <AtModalContent>
                        <View className='app_yuyue_form_wrap'>
                            <View className='close' onClick={this.handleClose}></View>
                            <View className='form'>
                                <View className='item'>
                                    <View className='label'>姓名：</View>
                                    <AtInput
                                        clear
                                        type='text'
                                        placeholder='请输入您的姓名（2-4个中文）'
                                        value={this.state.name}
                                        onChange={v => this.handleInputChange(v, 'name')}
                                    >
                                    </AtInput>
                                </View>
                                <View className='item'>
                                    <View className='label'>手机号：</View>
                                    <AtInput
                                        clear
                                        type='text'
                                        length='11'
                                        placeholder='请输入您的手机号码'
                                        value={this.state.mobile}
                                        onChange={v => this.handleInputChange(v, 'mobile')}
                                    >
                                    </AtInput>
                                </View>
                            </View>
                            <View className='btn_wrap' onClick={this.meetSure}>
                                <View className='btn'>确定</View>
                            </View>
                        </View>
                    </AtModalContent>
                </AtModal>
            </View>
        )
    }
}
