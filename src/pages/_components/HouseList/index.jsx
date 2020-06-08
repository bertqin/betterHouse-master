import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Image} from '@tarojs/components'
import {AtTabsPane, AtTabs} from 'taro-ui'
import {connect} from "@tarojs/redux";
import {buildCdnPath, getPageParam} from '@utils'

import './index.less'
import {PageInit, EmptyList} from "../../../components";

@connect(store => {
    return {
        houseList: store.home.houseList
    }
})

@PageInit()
export default class Index extends Component {
    config = {
        navigationBarTitleText: '房子详情页'
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'home/getHouseListSaga',
            payload: {
                keyword: getPageParam('keyword')
            }
        })
    }

    clickTab = (item) => {
        this.setState({
            current: item.id,
            tabOpen: true
        })
    }

    goDetail = (item) => {
        Taro.navigateTo({
            url: `/pages/house/detail/index?id=${item.id}`
        })
    }


    render() {
        let {houseList} = this.props
        return (
            <View className='component_house_list'>
                {
                    houseList.length ? houseList.map(h => {
                            return <View key={h.id} className='house_item' onClick={this.goDetail.bind(this, h)}>
                                <View className='content'>
                                    <View className='thumb'>
                                        <Image src={buildCdnPath(h.thumb)} className='img'/>
                                    </View>
                                    <View className='right'>
                                        <View className='title_wrap'>
                                            <View className='title'>{h.name}</View>
                                            <View className='status'>在售</View>
                                        </View>
                                        <View className='address'>地址 {h.address}</View>
                                        <View className='tags'>
                                            {
                                                h.attr_value && h.attr_value.slice(0, 4).map(tag => {
                                                    return <View className='tag'>{tag.value}</View>
                                                })
                                            }
                                        </View>
                                        <View className='price'>
                                            约{h.price_low}元/m²
                                        </View>
                                    </View>
                                    <View className='redpack'>
                                        <Image className='img' src={buildCdnPath('imgs/page_house_list/redpack.png')}/>
                                    </View>
                                </View>
                            </View>
                        }) :
                        <EmptyList/>
                }

            </View>
        )
    }
}
