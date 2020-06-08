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
        fangyuanContent: store.home.fangyuanContent
    }
})

@PageInit()
export default class Index extends Component {
    config = {
        navigationBarTitleText: '房子详情页'
    }

    componentDidMount() {
    }

    constructor(props) {
        super(props)
        this.oldTab = null
    }

    sure = () => {
        this.props.dispatch({
            type: 'home/makeOrderSaga'
        })
    }

    render() {
        let {houseDetail, huxingList, fangyuan, fangyuanContent} = this.props
        return (
            <View className='page_showroom_order'>
                <View className='app_common_header'>
                    <View className='left'>
                        <View className='back'>
                        </View>
                    </View>
                    <View className='title'>绑定手机号</View>
                    <View className='right'></View>
                </View>
                <View className='banner'></View>
                <View className='detail'>
                    <View className='title'>30号楼-1-6-602</View>
                    <View className='price'>￥6000元</View>
                    <View className='list'>
                        <View className='item'>
                            <View className='label'>户型</View>
                            <View className='desc'>6室2厅4卫</View>
                        </View>
                        <View className='item'>
                            <View className='label'>楼层</View>
                            <View className='desc'>6</View>
                        </View>
                        <View className='item'>
                            <View className='label'>建筑面积</View>
                            <View className='desc'>231.83m²</View>
                        </View>
                        <View className='item'>
                            <View className='label'>建筑单价</View>
                            <View className='desc'>￥6000元/m²</View>
                        </View>
                    </View>
                    <View className='btn_common' onClick={this.sure}>去预定</View>
                </View>
            </View>
        )
    }
}
