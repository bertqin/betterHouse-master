import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image} from '@tarojs/components'
import {PageInit} from '@components'
import {connect} from "@tarojs/redux";
import './index.less'
import {buildCdnPath, getPageParam} from "../../../utils";
import {AtInput} from "taro-ui";
import moment from "moment";

@connect(store => {
    return {
        newsDetail: store.home.newsDetail
    }
})

@PageInit()
export default class Index extends Component {
    config = {
        navigationBarTitleText: '京山好房'
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'home/getNewsDetailSaga',
            payload: {
                id: getPageParam('id')
            }
        })
    }

    constructor(props) {
        super(props)
    }

    render() {
        let {newsDetail,} = this.props
        return (
            <View className='page_news_detail'>
                <View className='app_common_header'>
                    <View className='left' onClick={() => Taro.navigateBack()}>
                        <View className='back'></View>
                    </View>
                    <View className='title'>京山买房</View>
                    <View className='right'></View>
                </View>
                <View className='news_wrap'>
                    <View className='title'>
                        {newsDetail.title}
                    </View>
                    <View className='meta'>
                        <View className='from'>
                            <View className='icon'>
                                <Image className='img' src={buildCdnPath('imgs/common/from_icon.png')}/>
                            </View>
                            来源：{newsDetail.from}</View>
                        <View className='time'>{moment(newsDetail.publish_time * 1000).format('YYYY-MM-DD')}</View>
                    </View>
                    <View className='detail' dangerouslySetInnerHTML={{__html: newsDetail.content}}>
                    </View>
                </View>
                <View className='register'>
                    <View className='title'>意向登记</View>
                    <View className='form_wrap'>
                        <View className='form'>
                            <View className='item'>
                                <View className='label'>意向楼盘：</View>
                                <AtInput
                                    clear
                                    type='text'
                                    length='11'
                                    placeholder='华夏院子•璞院'
                                    value={this.state.mobile}
                                    onChange={this.handleMobileChange}
                                >
                                </AtInput>
                            </View>
                            <View className='item'>
                                <View className='label'>姓名：</View>
                                <AtInput
                                    clear
                                    type='text'
                                    length='11'
                                    placeholder='请输入您的姓名（2-4个中文）'
                                    value={this.state.mobile}
                                    onChange={this.handleMobileChange}
                                >
                                </AtInput>
                            </View>
                            <View className='item'>
                                <View className='label'>手机号：</View>
                                <AtInput
                                    clear
                                    type='text'
                                    length='11'
                                    placeholder='请输入您的手机号码'
                                    value={this.state.mobile}
                                    onChange={this.handleMobileChange}
                                >
                                </AtInput>
                            </View>
                        </View>
                        <View className='btn_wrap'>
                            <View className='btn'>提交意向登记</View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
