import Taro, {Component} from '@tarojs/taro'
import {connect} from "@tarojs/redux";
import {View, Image} from '@tarojs/components'
import {AtModal} from 'taro-ui'
import {PageInit, Tabbar,} from '@/components';
import {AtTabs, AtTabsPane} from 'taro-ui'
import './index.less'
import {buildCdnPath} from '@/utils'

@connect(store => {
    return {
        houseOrderList: store.home.houseOrderList
    }
})

@PageInit()
export default class Index extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            current: 0,
            modalShow: false,
            orderId: -1
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'home/getHouseOrderListSaga'
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
    handleClick = (value) => {
        this.setState({
            current: value
        })
    }

    cancelOrder = (orderId) => {
        this.setState({
            modalShow: true,
            orderId
        })
    }

    handleCancel = () => {
        this.setState({
            modalShow: false
        })
    }

    handleConfirm = () => {
        if (this.state.orderId < 0) return
        this.props.dispatch({
            type: 'home/cancelHouseOrderSaga',
            payload: {
                order_id: this.state.orderId
            }
        })
        this.setState({
            modalShow: false
        })
    }

    goDetail = (id) => {
        Taro.navigateTo({
            url: `/pages/personal/houseOrder/detail/index?id=${id}`
        })
    }

    render() {
        const {houseOrderList} = this.props
        let tabList = []
        let tabContent = [[], [], []]
        try {
            tabList = houseOrderList.field_text.pay_status.map(title => {
                return {
                    title: title
                }
            })
            houseOrderList.list.map(item => {
                tabContent[item.pay_status].push(item)
            })
        } catch (e) {
        }
        const height = window.innerHeight
        return (
            <View className='page_personal_order_index' style={{minHeight: height + 'px'}}>
                <View className='app_common_header'>
                    <View className='left' onClick={() => Taro.navigateBack()}>
                        <View className='back'></View>
                    </View>
                    <View className='title'>我的订单</View>
                    <View className='right'></View>
                </View>
                <AtTabs current={this.state.current}
                        tabList={tabList} onClick={this.handleClick}>
                    {
                        tabContent.map((t, i) => {
                            return <AtTabsPane current={this.state.current} key={i} index={i}>
                                {tabContent[i].length ?
                                    <View className='list'>
                                        {
                                            tabContent[i].map(item => {
                                                return <View className='item' key={item.id}
                                                             onClick={this.goDetail.bind(this, item.id)}>
                                                    <View className='top'>
                                                        <View className='title_wrap'>
                                                            <View className='logo'>
                                                                <Image className='img'
                                                                       src={buildCdnPath('imgs/common/logo_rect.png')}/>
                                                            </View>
                                                            <View className='title'>京山买房</View>
                                                        </View>

                                                        <View className='status'>{tabList[i].title}</View>
                                                    </View>
                                                    <View className='center'>
                                                        <View className='thumb'>
                                                            {
                                                                item.image &&
                                                                <Image src={buildCdnPath(item.image)} className='img'/>
                                                            }

                                                        </View>
                                                        <View className='right'>
                                                            <View className='title_wrap'>
                                                                <View className='title'>{item.title}</View>
                                                                <View className='addr'>{item.address}</View>
                                                            </View>
                                                            <View className='huxing'></View>
                                                            <View className='num'></View>
                                                            <View className='price_wrap'>
                                                                <View></View>
                                                                <View className='price'>¥{item.money_total}</View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View className='bottom'>
                                                        <View className='btn btn_cancel'
                                                              onClick={this.cancelOrder.bind(this, item.id)}>取消订单</View>
                                                        <View className='btn btn_sure'>去付款</View>
                                                    </View>
                                                </View>
                                            })
                                        }
                                    </View> :
                                    <View className='empty'>还没有订单</View>
                                }
                            </AtTabsPane>
                        })
                    }
                </AtTabs>
                <AtModal
                    isOpened={this.state.modalShow}
                    title='提示'
                    cancelText='取消'
                    confirmText='删除'
                    onClose={this.handleCancel}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                    content='确认删除该订单?'
                />
            </View>
        )
    }
}
