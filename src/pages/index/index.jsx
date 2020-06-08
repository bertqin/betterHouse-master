import Taro, {Component} from '@tarojs/taro'
import {connect} from "@tarojs/redux";
import {View, Text, Image, Swiper, SwiperItem} from '@tarojs/components'
import {buildCdnPath, tel, windowHeight} from '@/utils'
import {PageInit, Tabbar, SearchSelect, MSwiper, EmptyList, BackTop} from '@/components';
import './index.less'
import {AtInput} from "taro-ui";


@connect(store => {
    return {
        houseList: store.home.houseList,
        noticeList: store.home.noticeList,
        zhanting: store.home.zhanting
    }
})

@PageInit()
export default class Index extends Component {

    state = {
        keyword:"",
    }

    initScrollEvent = (e) => {
        try {
            let ele = document.getElementById('house_list_wrap')
            let top = ele.getBoundingClientRect().top
            // let offtop = ele.offsetTop
            this.setState({
                top: top,
            })
            if (top <= 0) {
                ele.classList.add('on')
            } else {
                ele.classList.remove('on')
            }
            // if(offtop - top <= 300) {
            //     this.setState({
            //         show: false
            //     })
            // }else {
            //     this.setState({
            //         show: true
            //     })
            // }
        } catch (e) {

        }
    }

    constructor(props){
        super(props)
        this.state = ({
          show : false,
        })
        this.initScrollEvent = this.initScrollEvent.bind(this);
        // this.scrollToTop = this.scrollToTop.bind(this);
    }
    

    componentDidMount() {
        // let ele = document.getElementById('house_list_wrap')
        // let offtop = ele.offsetTop
        // this.setState({
        //     offtop: offtop,
        // })
        this.props.dispatch({
            type: 'home/initPageSaga'
        })

        let wrapper = document.querySelector('.taro-tabbar__panel')
        //挂载事件监听
        wrapper.addEventListener('scroll', this.initScrollEvent)

    }
    //卸载事件监听
    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.initScrollEvent)
    // }

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

    goHouseList = () => {
        Taro.navigateTo({
            url: '/pages/house/list/index'
        })
    }

    goHouseDetail = (item) => {
        Taro.navigateTo({
            url: `/pages/house/detail/index?id=${item.id}`
        })
    }

    goNoticeDetail = (item) => {
        Taro.navigateTo({
            url: `/pages/news/detail/index?id=${item.id}`
        })
    }

    goShowRoomList = (index) => {
        let {zhanting} = this.props
        if (zhanting) {
            Taro.navigateTo({
                url: `/pages/showroom/list/index?activity_id=${zhanting[index][0].activity_id}`
            })
        }
    }

    search = () => {
        Taro.navigateTo({
            url: `/pages/house/list/index?keyword=${this.state.keyword}`
        })
    }

    handleInputChange = (value) => {
        this.setState({
            keyword: value
        })
    }
    stopPro = (event) => {
        event.stopPropagation()
    }

    //添加动画效果
    // scrollToTop() {
    //     let ele = document.getElementById('house_list_wrap')
    //     let pos = this.state.top
    //     console.log(pos)
    //     const scrollToTop = window.setInterval(() => {
    //       if ( pos > 0 ) {
    //         ele.scrollTo( 0, pos - 20 );
    //       } else {
    //         window.clearInterval( scrollToTop );
    //       }
    //     }, 1);
    // }

    goPersonal = () => {
        Taro.navigateTo({
            url: '/pages/personal/index/index'
        })
    }

    render() {
        let {houseList, noticeList, zhanting} = this.props
        // let { show } = this.state;
        return (
            <View className='page_index'>
                <View className='search_bar'>
                    <View className='logo'></View>
                    <View className='input_wrap'>
                        <View className='input'>
                            <AtInput
                                clear
                                type='search'
                                placeholder='你想住在哪?'
                                value={this.state.keyword}
                                onConfirm={this.search}
                                onChange={this.handleInputChange}
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
                <MSwiper flag='index_top' className='swiper'/>

                <View className='wrapper'>
                    {/* <View className='find_house_list'>
                        <View className='find_house_item' onClick={this.goHouseList.bind(this, '')}>
                            <Image className='img' src={buildCdnPath('imgs/page_index/find_house_1.png')}></Image>
                        </View>
                        <View className='find_house_item' onClick={this.goHouseList.bind(this, '')}>
                            <Image className='img' src={buildCdnPath('imgs/page_index/find_house_2.png')}></Image>
                        </View>
                        <View className='find_house_item' onClick={this.goHouseList.bind(this, '')}>
                            <Image className='img' src={buildCdnPath('imgs/page_index/find_house_3.png')}></Image>
                        </View>
                    </View> */}
                    <View className='toutiao'>
                        <View className='icon'>
                            <Image className='img' src={buildCdnPath('imgs/page_index/toutiao_icon.png')}/>
                        </View>
                        <View className='news_list'>
                            {
                                noticeList.map(n => {
                                    return <View className='news_item' onClick={this.goNoticeDetail.bind(this, n)}>
                                        <View className='dot'></View>
                                        <View className='text'>{n.title}</View>
                                    </View>
                                })
                            }
                        </View>
                    </View>
                    <MSwiper flag='index_mid' className='ad_index_mid'/>
                    <View className='guide_wrap'>
                        <View className='guide_header'>
                            <Image className='img' src={buildCdnPath('imgs/page_index/guide_1.png')}></Image>
                        </View>
                    </View>
                    <View className='guide_1'>
                        <View className='guide_1_header' onClick={this.goShowRoomList.bind(this, 0)}>
                            <Image className='img' src={buildCdnPath('imgs/page_index/guide_1_bg.png')}></Image>
                        </View>
                        <View className='guide_1_list'>
                            {
                                zhanting[0] && zhanting[0].map(z => {
                                    return <View className='guide_1_item' key={z.id}
                                                 onClick={this.goHouseDetail.bind(this, z)}>
                                        <View className='content'>
                                            <View className='thumb'>
                                                <Image className='img' src={buildCdnPath(z.thumb)}/>
                                            </View>
                                            <View className='right'>
                                                <View className='title_wrap'>
                                                    <View className='title'>{z.name}</View>
                                                    <View className='tab_sell_wrap'>
                                                        <View className='tab_sell'>已售{z.room_sell}套</View>
                                                        <View className='tab_unsell'>未售{z.room_stock}套</View>
                                                    </View>
                                                </View>
                                                <View className='address'>地址 {z.address}</View>
                                                <View className='tags'>
                                                    {
                                                        z.attr_value.slice(0, 2).map(v => {
                                                            return <View key={v.id} className='tag'>{v.value}</View>
                                                        })
                                                    }
                                                </View>
                                                <View className='price'>
                                                    约{z.price_low}元/m²
                                                </View>
                                            </View>
                                        </View>
                                        <View className='btns' onClick={this.stopPro.bind(this)}>
                                            <View className='btn'>
                                                <View className='icon wechat'>
                                                    <Image className='img'
                                                           src={buildCdnPath('imgs/page_index/wechat.png')}/>
                                                </View>
                                                <View className=''>微聊</View>
                                            </View>
                                            <View className='btn'>
                                                <View className='icon tel'>
                                                    <Image className='img'
                                                           src={buildCdnPath('imgs/page_index/tel.png')}/>
                                                </View>
                                                <View className='' onClick={tel.bind(this, z.tel)}>电话</View>
                                            </View>
                                        </View>
                                    </View>
                                })
                            }

                        </View>

                    </View>

                    <View className='guide_1'>
                        <View className='guide_1_header' onClick={this.goShowRoomList.bind(this, 1)}>
                            <Image className='img' src={buildCdnPath('imgs/page_index/guide_2_bg.png')}></Image>
                        </View>
                        <View className='guide_2_list'>
                            {
                                zhanting[1] && zhanting[1].map(z => {
                                    return <View className='guide_2_item' key={z.id}
                                                 onClick={this.goHouseDetail.bind(this, z)}>
                                        <View className='content'>
                                            <View className='thumb'>
                                                <Image className='img' src={buildCdnPath(z.thumb)}/>
                                                <View className='price'>约{z.price_low}元/m²</View>
                                            </View>
                                            <View className='right'>
                                                <View className='title_wrap'>
                                                    <View className='title'>{z.name}</View>
                                                </View>
                                                <View className='flex_row' style={{marginBottom: '10px'}}>
                                                    <View className='tab_sell_wrap'>
                                                        <View className='tab_sell'>已售{z.room_sell}套</View>
                                                        <View className='tab_unsell'>未售{z.room_stock}套</View>
                                                    </View>
                                                </View>
                                                <View className='address'>地址 {z.address}</View>
                                                <View className='tags'>
                                                    {
                                                        z.attr_value.slice(0, 2).map(v => {
                                                            return <View key={v.id} className='tag'>{v.value}</View>
                                                        })
                                                    }
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                })
                            }

                        </View>

                    </View>

                </View>
                <View className='house_list_wrap' id='house_list_wrap'>
                    <SearchSelect/>
                    {/*<View className='tabs'>*/}
                    {/*    <View className='tab'>户型找房</View>*/}
                    {/*    <View className='tab on'>户型找房</View>*/}
                    {/*    <View className='tab'>户型找房</View>*/}
                    {/*    <View className='tab'>户型找房</View>*/}
                    {/*</View>*/}
                    <View className='guide_1_list' style={{minHeight: windowHeight}}>
                        {
                            houseList && houseList.length ? houseList.map(h => {
                                    return <View
                                        onClick={this.goHouseDetail.bind(this, h)}
                                        className='guide_1_item' key={h.id}>
                                        <View className='content'>
                                            <View className='thumb'>
                                                <Image className='img' src={h.thumb}/>
                                            </View>
                                            <View className='right'>
                                                <View className='title_wrap'>
                                                    <View className='title'>{h.name}</View>
                                                    <View className='tab_sell_wrap'>
                                                        <View className='tab_sell'>已售{h.room_sell}套</View>
                                                        <View className='tab_unsell'>未售{h.room_stock}套</View>
                                                    </View>
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
                                                    约{h.money_low}元/m²
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                })
                                : <EmptyList/>
                        }

                    </View>
                </View>
                {/* { 
                    show && <View>
                        <BackTop/>
                    </View>
                } */}
            </View>
        )
    }
}
