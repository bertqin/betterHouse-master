import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image} from '@tarojs/components'
import {PageInit, MSwiper, SearchSelect} from '@components'
import {connect} from "@tarojs/redux";
import './index.less'
import {HouseList} from '@/pages/_components'
import {buildCdnPath, getPageParam} from "../../../utils";
import {AtInput} from "taro-ui";

@connect(store => {
    return {
        houseDetail: store.home.houseDetail
    }
})

@PageInit()
export default class Index extends Component {

    state = {
        keyword: getPageParam('keyword')
    }

    config = {
        navigationBarTitleText: '买房'
    }

    componentWillMount() {

    }

    constructor(props) {
        super(props)
    }

    clickTab = (item) => {
        this.setState({
            current: item.id,
            tabOpen: true
        })
    }


    goDetail = () => {
        Taro.navigateTo({
            url: '/pages/house/detail/index'
        })
    }

    handleInputChange = (value) => {
        this.setState({
            keyword: value
        })
    }

    search = () => {
        Taro.redirectTo({
            url: `/pages/house/list/index?keyword=${this.state.keyword}`
        })
    }

    render() {
        return (
            <View className='page_house_list'>
                <View className='search_bar'
                      style={{backgroundImage: `url(${buildCdnPath('imgs/common/search_bg.png')})`}}>
                    <View className='back_wrap'>
                        <View className='back' onClick={() => Taro.navigateTo({
                            url: '/pages/index/index'
                        })}>
                            <Image className='img' src={buildCdnPath('imgs/common/back_white.png')}></Image>
                        </View>
                    </View>
                    <View className='search_box'>
                        <View className='search_input_wrap'>
                            <View className='house_search'>
                                <Image className='img ' src={buildCdnPath('imgs/common/house_search.png')}/>
                            </View>
                            <AtInput
                                clear
                                type='text'
                                placeholder='搜索新房楼盘和地址'
                                value={this.state.keyword}
                                onChange={this.handleInputChange}
                                onConfirm={this.search}
                            >
                            </AtInput>
                        </View>
                    </View>
                    <View className='map_btn'>
                        <View className='map_search'>
                            <Image className='img' src={buildCdnPath('imgs/common/地图找房.png')}/>
                        </View>
                    </View>
                </View>
                <SearchSelect/>

                <MSwiper flag='house_list_top' className='ad_top'/>
                <HouseList/>
            </View>
        )
    }
}
