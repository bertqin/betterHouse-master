import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image} from '@tarojs/components'
import {PageInit} from '@components'
import {connect} from "@tarojs/redux"
import './index.less'
import {buildCdnPath} from "../../../utils";

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
        init: false
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

    goHuxing = (item) => {
        Taro.navigateTo({
            url: `/pages/house/huxing/index?id=${item.id}`
        })
    }

    clickFangyuanTab = (item, e) => {
        this.oldTab && this.oldTab.classList.remove('on')
        this.props.dispatch({
            type: 'home/save',
            payload: {
                fangyuanContent: item
            }
        })
        if (e) {
            e.target.classList.add('on')
            this.oldTab = e.target
        }
    }

    render() {
        let {houseDetail, huxingList, fangyuan, fangyuanContent} = this.props
        console.log(Object.keys(fangyuan))
        console.log(fangyuan)
        console.log(fangyuanContent)
        return (
            <View className='page_showroom_detail'>
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
                        <View className='top'>
                            <View className='title'>{houseDetail.name}</View>
                            <View className='tags'>
                                {
                                    houseDetail.attr_value && houseDetail.attr_value.map(item => {
                                        return <View className='tag'>{item.value}</View>
                                    })
                                }
                            </View>
                            <View className='price'>约 {houseDetail.price_low} 元/m²
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
                            <View className='ad1'>
                                <Image className='img' src={buildCdnPath('imgs/page_house_detail/ad0.png')}/>
                            </View>
                        </View>
                        <View className='fangyuan'>
                            {/* <View className='tabs'>
                                {
                                    Object.keys(fangyuan).map((key, i) => {
                                        return Object.keys(fangyuan[key]).map((key2, i2) => {
                                            let init = this.state.init == false && i == 0 && i2 == 0
                                            let on = init ? 'on' : ''
                                            init && this.clickFangyuanTab(fangyuan[key][key2])
                                            return <View className={`tab ${on}`}
                                                         onClick={this.clickFangyuanTab.bind(this, fangyuan[key][key2])}
                                                         key={'f' + key + '_d' + key2}>{key}号楼{key2}单元</View>
                                        })
                                    })
                                }
                            </View> */}
                            {/* <View className='content'>
                                {
                                    Object.keys(fangyuanContent).map(floor => {
                                        return <View className='floor'>
                                            <View className='floor_num'>{floor}层</View>
                                            <View className='rooms'>
                                                {
                                                    fangyuanContent[floor].map(room => {
                                                        return <View className='room'>
                                                            <View className='room_name'>
                                                                {room.name}
                                                            </View>
                                                        </View>
                                                    })
                                                }
                                            </View>
                                        </View>
                                    })
                                }
                            </View> */}
                        </View>
                        <View className='more_wrap' onClick={this.toggle}>
                            <View className='more'>展示更多</View>
                        </View>

                        <View className='huxing_wrap'>
                            <View className='huxing_title'>户型</View>
                            <View className='huxing_list'>
                                {
                                    huxingList.map(hx => {
                                        return <View key={hx.id} className='huxing_item'
                                                     onClick={this.goHuxing.bind(this, hx)}>
                                            <View className='huxing_thumb'>
                                                <Image className='img' src={hx.thumb}/>
                                            </View>
                                            <View className='title'>{hx.name}</View>
                                            <View className='desc'>建面{hx.area_low}-{hx.area_low}m²</View>
                                            <View className='price'>约{hx.price_all}万/套</View>
                                        </View>
                                    })
                                }

                            </View>
                        </View>
                    </View>

                </View>

                <View className='operator'>
                    <View className='fav_btn'>
                        <View className='fav_icon'>
                            <Image className='img' src={buildCdnPath('imgs/common/fav.png')}/>
                        </View>
                        <View className='text'>收藏</View>
                    </View>
                    <View className='yuyue_btn'>
                        <View className='yuyue_icon'>
                            <Image className='img' src={buildCdnPath('imgs/common/yuyue.png')}/>
                        </View>
                        <View className='text'>预约看房</View>
                    </View>
                    <View className='ask_btn btn'>在线咨询</View>
                    <View className='buy_btn btn'>致电售楼处</View>
                </View>
            </View>
        )
    }
}
