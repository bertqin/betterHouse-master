import Taro, {Component} from '@tarojs/taro'
import {connect} from "@tarojs/redux";
import {View, Text, Image} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import {PageInit, Tabbar,} from '@/components';
import moment from 'moment'
import './index.less'
import {buildCdnPath, getPageParam} from '@/utils'

@connect(store => {
    return {
        houseOrderDetail: store.home.houseOrderDetail
    }
})

@PageInit()
export default class Index extends Component {

    componentWillMount() {
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'home/getHouseOrderDetailSaga',
            payload: {
                order_id: getPageParam('id')
            }
        })
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

    cancelOrder = () => {

    }

    render() {
        let {houseOrderDetail} = this.props
        let order = houseOrderDetail.order || {}
        let field_text = houseOrderDetail.field_text || {}
        return (
            <View className='page_personal_house_order_detail'>
                <View className='app_right_header'>
                    <View className='left' onClick={() => Taro.navigateBack()}>
                        <View className='back'></View>
                        <View>订单详情</View>
                    </View>
                </View>

                <View className='result_wrap'
                      style={{backgroundImage: `url(${buildCdnPath('imgs/page_personal_index/bg.png')})`}}>
                    <View className='result'>
                        <View className='icon'>
                            <Image className='img' src={buildCdnPath('imgs/common/status_ok.png')}/>
                        </View>
                        <View className='text'>{field_text.status && field_text.status[order.status]}</View>
                    </View>
                </View>
                <View className='order_wrap'>
                    <View className='item'>
                        <View className='top'>
                            <View className='title_wrap'>
                                <View className='logo'>
                                    <Image className='img'
                                           src={buildCdnPath('imgs/common/logo_rect.png')}/>
                                </View>
                                <View className='title'>京山买房</View>
                            </View>
                        </View>
                        <View className='center'>
                            <View className='thumb'>
                                {
                                    order.image &&
                                    <Image src={buildCdnPath(order.image)} className='img'/>
                                }

                            </View>
                            <View className='right'>
                                <View className='title_wrap'>
                                    <View className='title'>{order.title}</View>
                                    <View className='addr'>{order.estate && order.estate.address}</View>
                                </View>
                                <View className='huxing'></View>
                                <View className='num'></View>
                                <View className='price_wrap'>
                                    <View></View>
                                    <View className='price'>¥{order.money_total}</View>
                                </View>
                            </View>
                        </View>
                        <View className='bottom'>
                            <View className='btn btn_cancel'
                                  onClick={this.cancelOrder.bind(this, order.id)}>取消订单</View>
                            <View className='btn btn_sure'>去付款</View>
                        </View>
                    </View>
                </View>
                <View className='order_detail'>
                    <View className='title'><View className='icon'></View>订单信息</View>
                    <View className='list'>
                        <View className='item'>
                            <View className='label'>项目名称</View>
                            <View className='desc'>{order.title}</View>
                        </View>
                        <View className='item'>
                            <View className='label'>房源</View>
                            <View className='desc'>{order.room && order.room.name}</View>
                        </View>
                        <View className='item'>
                            <View className='label'>建筑面积</View>
                            <View className='desc'>{order.room && order.room.area}</View>
                        </View>
                        <View className='item'>
                            <View className='label'>户型</View>
                            <View className='desc'>{order.title}</View>
                        </View>
                        <View className='item'>
                            <View className='label'>项目地址</View>
                            <View className='desc'>{order.title}</View>
                        </View>
                        <View className='item'>
                            <View className='label'>支付时间</View>
                            <View className='desc'>{moment(order.pay_time).format('YYYY-MM-DD hh:mm:ss')}</View>
                        </View>
                        <View className='concat_wrap'>
                            <View className='concat'>
                                <View className='icon'>
                                    <Image className='img' src={buildCdnPath('imgs/common/wangwang.png')}/>
                                </View>
                                <View className='text'>联系卖家</View>
                            </View>
                            <View className='concat'>
                                <View className='icon'>
                                    <Image className='img' src={buildCdnPath('imgs/common/tel.png')}/>
                                </View>
                                <View className='text'>拨打电话</View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='commend'>
                    <View className='title'></View>
                    <View className='list'>
                        <View className='item'></View>
                    </View>
                </View>
            </View>
        )
    }
}
