import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image} from '@tarojs/components'
import {PageInit} from '@components'
import {connect} from "@tarojs/redux";
import './index.less'
import {buildCdnPath} from "../../../utils";

@connect(store => {
    return {
        houseDetail: store.home.houseDetail,
        huxingList: store.home.huxingList,
        fangyuan: store.home.fangyuan,
        currentTab1Key: store.home.currentTab1Key,
        currentTab2Key: store.home.currentTab2Key,
        choosedFangyuan: store.home.choosedFangyuan
    }
})

@PageInit()
export default class Index extends Component {
    state = {
        init: false,
        watchAll: true
    }

    config = {
        navigationBarTitleText: '房子详情页'
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
    }

    constructor(props) {
        super(props)
        this.oldTab = null
    }

    goDetail = () => {
        Taro.navigateTo({
            url: '/pages/house/detail/index'
        })
    }

    goHuxing = () => {
        let {choosedFangyuan} = this.props
        if (!choosedFangyuan.id) {
            Taro.showToast({
                title: '请选择房源',
                icon: 'none'
            })
            return
        }
        Taro.navigateTo({
            url: `/pages/house/huxing/index?id=${choosedFangyuan.style_id}&estate_id=${choosedFangyuan.estate_id}`
        })
    }

    toggleTab1 = (item) => {
        let {currentTab1Key, fangyuan} = this.props
        this.props.dispatch({
            type: 'home/save',
            payload: {
                currentTab1Key: item,
                currentTab2Key: Object.keys(fangyuan[currentTab1Key])[0]
            }
        })
    }

    toggleTab2 = (item, e) => {
        this.props.dispatch({
            type: 'home/save',
            payload: {
                currentTab2Key: item
            }
        })
    }

    chooseFangyuan = (room) => {
        this.props.dispatch({
            type: 'home/save',
            payload: {
                choosedFangyuan: room
            }
        })
    }

    sure = () => {
        let {choosedFangyuan} = this.props
        if (!choosedFangyuan || !choosedFangyuan.id) {
            Taro.showToast({
                title: '请选择房源',
                icon: 'none'
            })
            return
        }
        Taro.navigateTo({
            url: `/pages/house/order/index?id=${choosedFangyuan.id}`
        })
    }

    toggleWatch = () => {
        this.setState({
            watchAll: !this.state.watchAll
        })
    }

    render() {
        let {houseDetail, currentTab1Key, currentTab2Key, fangyuan, choosedFangyuan} = this.props
        return (
            <View className='page_house_choose'>
                <View className='app_common_header'>
                    <View className='left' onClick={() => Taro.navigateBack()}>
                        <View className='back'></View>
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
                        <View className='demo-text-1'>
                            {
                                houseDetail.thumb &&
                                <Image
                                    className='img'
                                    src={buildCdnPath(houseDetail.thumb)}/>
                            }
                        </View>
                    </SwiperItem>
                </Swiper>
                <View className='main_content'>
                    <View className='detail_wrap'>
                        <View className='tags'>
                            <View className='tag'>
                                <View className='icon_full'></View>
                                <View>已出售</View>
                            </View>
                            <View className='tag'>
                                <View className='icon_null'></View>
                                <View>未售</View>
                            </View>
                            <View className='tag' onClick={this.toggleWatch}>
                                <View className='cansell'>{this.state.watchAll ? '仅看未售' : '看全部'}</View>
                            </View>
                        </View>
                        <View className='fangyuan'>
                            <View className='tab1_row'>
                                {
                                    Object.keys(fangyuan).map((key) => {
                                        return <View className={`tab1 ${currentTab1Key == key ? 'on' : ''}`}
                                                     key={key}
                                                     onClick={this.toggleTab1.bind(this, key)}>{key}号楼</View>
                                    })
                                }
                            </View>
                            <View className='tab2_row'>
                                {
                                    fangyuan[currentTab1Key] && Object.keys(fangyuan[currentTab1Key]).map((key) => {
                                        return <View className={`tab2 ${currentTab2Key == key ? 'on' : ''}`}
                                                     key={key}
                                                     onClick={this.toggleTab2.bind(this, key)}>{key}单元</View>
                                    })
                                }
                            </View>
                            <View className='content'>
                                {
                                    fangyuan[currentTab1Key] && fangyuan[currentTab1Key][currentTab2Key] && Object.keys(fangyuan[currentTab1Key][currentTab2Key]).map(floor => {
                                        return <View className='floor'>
                                            <View className='floor_num'>{floor}层</View>
                                            <View className='rooms'>
                                                {
                                                    fangyuan[currentTab1Key][currentTab2Key][floor].map(room => {
                                                        if (!this.state.watchAll && room.status == 3) {
                                                            return null
                                                        }
                                                        return <View
                                                            className={`room
                                                            status_${room.status}
                                                             ${choosedFangyuan == room ? 'on' : ''}`}
                                                            onClick={this.chooseFangyuan.bind(this, room)}>
                                                            <View className='room_name'>
                                                                {room.name}
                                                            </View>
                                                            <View className='room_desc'>
                                                                <View className='room_desc_row'>{room.area}</View>
                                                                <View>{room._huxing}</View>
                                                            </View>
                                                        </View>
                                                    })
                                                }
                                            </View>
                                        </View>
                                    })
                                }
                            </View>
                        </View>
                    </View>
                </View>

                <View className='operator'>
                    <View className='btn_common btn_detail' onClick={this.goHuxing}>查看户型详情</View>
                    <View className='btn_common' onClick={this.sure}>确定</View>
                </View>
            </View>
        )
    }
}
