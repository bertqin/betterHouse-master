import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image} from '@tarojs/components'
import {PageInit} from '@components'
import {connect} from "@tarojs/redux";
import {buildCdnPath} from '@/utils'
import moment from 'moment'

import './index.less'

@connect(store => {
    return {
        balanceHistory: store.home.balanceHistory
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
            type: 'home/getBalanceHistorySaga'
        })
    }

    goDetail = () => {
        Taro.navigateTo({
            url: '/pages/house/detail/index'
        })
    }


    render() {
        let {balanceHistory} = this.props
        return (
            <View className='page_activity_balanceList'>
                <View className='app_right_header'>
                    <View className='left' onClick={Taro.navigateBack}>
                        <View className='back'>
                            <Image className='img' src={buildCdnPath('imgs/common/back.png')}/>
                        </View>
                        <View>账单</View>
                    </View>
                </View>
                {/*<View className='total'>*/}
                {/*    <View className='date'>2020年4月</View>*/}
                {/*    <View className='desc_wrap'>*/}
                {/*        <View className='desc'>支出 ￥660.00 收入 ￥800.00</View>*/}
                {/*    </View>*/}
                {/*</View>*/}
                <View className='list'>
                    {
                        balanceHistory && balanceHistory.list && balanceHistory.list.map(l => {
                            return <View className='item' key={l.id}>
                                <View className='icon'>
                                    {
                                        l.type == 'withdraw' ?
                                            <Image className='img' src={buildCdnPath('imgs/common/withdraw.png')}/> :
                                            <Image className='img' src={buildCdnPath('imgs/common/redpack.png')}/>
                                    }
                                </View>
                                <View className='center'>
                                    <View
                                        className='title'>{balanceHistory.field_text.type[l.type]} - {l.info} </View>
                                    <View
                                        className='time'>
                                        <View>{moment(l.create_time * 1000).format('YYYY-MM-DD hh:mm:ss')} {balanceHistory.field_text.status[l.status]}</View>

                                    </View>
                                </View>
                                <View className={`right ${l.type == 'withdraw' ? '' : 'add'}`}>
                                    {l.type == 'withdraw' ? '-' : '+'}{l.amount}
                                </View>
                            </View>
                        })
                    }
                </View>
            </View>
        )
    }
}
