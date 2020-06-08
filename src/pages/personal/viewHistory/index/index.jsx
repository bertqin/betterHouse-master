import Taro, {Component} from '@tarojs/taro'
import {connect} from "@tarojs/redux";
import {View, Image} from '@tarojs/components'
import {AtButton, AtInput} from 'taro-ui'
import {PageInit, Tabbar, EmptyList} from '@/components';
import './index.less'
import {buildCdnPath,} from "@/utils";

@connect(store => {
    return {
        viewHistory: store.home.viewHistory
    }
})

@PageInit()
export default class Index extends Component {
    config = {
        navigationBarTitleText: '首页'
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'home/getViewHistorySaga'
        })
    }

    render() {
        let {viewHistory} = this.props
        console.log('viewHistory.list', viewHistory.list)
        return (
            <View className='page_personal_viewHistory_index'>
                <View className='app_common_header'>
                    <View className='left' onClick={() => Taro.navigateBack()}>
                        <View className='back'></View>
                    </View>
                    <View className='title'>浏览记录</View>
                    <View className='right'></View>
                </View>
                <View className='house_list'>
                    {
                        viewHistory.list && viewHistory.list.length ? viewHistory.list.map(h => {
                                return <View key={h.id} className='house_item'>
                                    <View className='content'>
                                        <View className='thumb'>
                                            <Image src={buildCdnPath(h.estate && h.estate.thumb)} className='img'/>
                                        </View>
                                        <View className='right'>
                                            <View className='title_wrap'>
                                                <View className='title'>{h.estate && h.estate.name}</View>
                                                <View
                                                    className='status'>{h.estate && viewHistory.field_text.estate.status[h.estate.status]}</View>
                                            </View>
                                            <View className='address'>地址 {h.estate && h.estate.address}</View>
                                            <View className='tags'>
                                                {
                                                    h.attr_value && h.attr_value.slice(0, 4).map(tag => {
                                                        return <View className='tag'>{tag.value}</View>
                                                    })
                                                }
                                            </View>
                                            <View className='price'>
                                                约{h.estate && h.estate.money_low}元/m²
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            }) :
                            <EmptyList/>
                    }
                </View>
            </View>
        )
    }
}
