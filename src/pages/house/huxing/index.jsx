import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image} from '@tarojs/components'
import {PageInit, ImageZoom} from '@components'
import {connect} from "@tarojs/redux";
import './index.less'
import {buildCdnPath, getPageParam,} from "@/utils";
import {AtInput, AtModal, AtModalContent, AtModalHeader} from "taro-ui";
import Zmage from 'react-zmage'

// execute above function

@connect(store => {
    return {
        huxingList: store.home.huxingList,
        huxingDetail: store.home.huxingDetail,
        houseDetail: store.home.houseDetail
    }
})

@PageInit()
export default class Index extends Component {
    config = {
        navigationBarTitleText: '户型详情图'
    }

    state = {
        modalShow: false,
        mobile: '',
        name: '',
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'home/getHuxingListSaga'
        })
        this.props.dispatch({
            type: 'home/getHuxingDetailSaga'
        })
        this.props.dispatch({
            type: 'home/getHouseDetailSaga',
            payload: {
                id: getPageParam('estate_id')
            }
        });

        initPhotoSwipeFromDOM('.my-gallery');
    }

    handleInputChange = (value, key) => {
        this.setState({
            [key]: value
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
                    this.setState({
                        modalShow: false
                    })
                }
            }
        })
    }

    constructor(props) {
        super(props)
    }

    goHuxing = (item) => {
        Taro.navigateTo({
            url: `/pages/house/huxing/index?id=${item.id}`
        })
    }

    goHouse = () => {
        let {houseDetail} = this.props
        Taro.navigateTo({
            url: `/pages/house/detail/index?id=${houseDetail.id}`
        })
    }

    tel = (phoneNumber) => {
        if (!phoneNumber) return
        Taro.makePhoneCall({
            phoneNumber
        })
    }

    handleClose = () => {
        this.setState({
            modalShow: false
        })
    }

    zoom = (imagePath) => {
        Zmage.browsing({src: imagePath})
    }

    render() {
        let {houseDetail, huxingList, huxingDetail: h} = this.props
        huxingList = huxingList.filter(l => l.id != getPageParam('id'))
        let hxTag = h.attr_value && h.attr_value.find(t => t.name == 'style_huxin').value
        return (
            <View className='page_house_huxing'>
                <View className='app_common_header'>
                    <View className='left' onClick={Taro.navigateBack}>
                        <View className='back'></View>
                    </View>
                    <View className='title'>京山买房</View>
                    <View className='right'></View>
                </View>

                <View className='huxing_guide'>
                    <View className='banner' onClick={this.zoom.bind(this, h.thumb)}>
                        <img className='img' src={buildCdnPath(h.thumb)}/>
                    </View>
                    <View className='title'>{h.name}</View>
                    <View className='tags'>
                        {
                            h.attr_value && h.attr_value.map(v => {
                                return <View className='tag' key={v.value}>{v.value}</View>
                            })
                        }
                    </View>
                    <View className='price_wrap'>
                        <View className='item'>约{h.price_all}万</View>
                        <View className='item'>{hxTag}</View>
                        <View className='item'>{h.area}m²</View>
                    </View>
                </View>
                <View className='huxing_info'>
                    <View className='huxing_title'>户型信息</View>
                    <View className='huxing_detail'>
                        <View className='row'>
                            <View className='type'>
                                <View className='label'>物业类型</View>
                                <View className='info'>住宅</View>
                            </View>
                            <View className='face'>
                                <View className='label'>朝向</View>
                                <View className='info'>南</View>
                            </View>
                        </View>
                        {/*<View className='row'>*/}
                        {/*    <View className='pay'>*/}
                        {/*        <View className='label'>首付占比</View>*/}
                        {/*        <View className='info blue'>3成17.1万，月供2117元</View>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                        <View className='row' onClick={this.goHouse}>
                            <View className='label'>所属楼盘</View>
                            <View className='info blue'>{houseDetail.name}</View>
                        </View>
                    </View>
                </View>

                {
                    huxingList.length ? <View className='huxing_other'>
                        <View className='title'>本楼盘其他户型({huxingList.length})</View>
                        <View className='huxing_wrap'>
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
                    </View> : null
                }

                <View className='operator'>
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
