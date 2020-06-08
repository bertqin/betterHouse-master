import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {PageInit, Tabs, MSwiper} from '@components'
import {connect} from "@tarojs/redux";
import './index.less'
import {buildCdnPath} from "../../../utils";
import moment from "moment";
import {AtInput} from "taro-ui";

@connect(store => {
    return {
        newsList: store.home.newsList,
        newsTags: store.home.newsTags
    }
})

@PageInit()
export default class Index extends Component {

    state = {
        keyword: '',
        tabIndex: 0
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'home/initNewsListPageSaga'
        })
    }

    constructor(props) {
        super(props)
    }

    goDetail = (id) => {
        Taro.navigateTo({
            url: `/pages/news/detail/index?id=${id}`
        })
    }

    clickTab = (tag, tabIndex) => {
        this.props.dispatch({
            type: 'home/getNewsListSaga',
            payload: {
                tag
            }
        })
        this.setState({
            tabIndex,
            keyword: ''
        })
    }

    search = () => {
        this.props.dispatch({
            type: 'home/getNewsListSaga',
            payload: {
                keyword: this.state.keyword
            }
        })
    }

    handleInputChange = (value) => {
        this.setState({
            keyword: value
        })
    }


    render() {
        let {newsTags, newsList} = this.props
        return (
            <View className='page_news_list'>
                <View className='top_header'>
                    <View className='search_bar'>
                        <View className='logo'></View>
                        <View className='input_wrap'>
                            <View className='input'>
                                <AtInput
                                    clear
                                    type='search'
                                    placeholder='请输入资讯或楼盘相关的关键字?'
                                    value={this.state.keyword}
                                    onConfirm={this.search}
                                    onChange={this.handleInputChange}
                                >
                                </AtInput>
                            </View>
                        </View>
                        <View className='user_wrap' onClick={this.goPersonal}>
                            <View className='user'></View>
                        </View>
                    </View>
                    <View className='top_navbar'>
                        {
                            newsTags.map((t, i) => {
                                return <View
                                    className={`tag ${this.state.tabIndex == i && !this.state.keyword ? 'on' : ''}`}
                                    key={t}
                                    onClick={this.clickTab.bind(this, t, i)}>
                                    <View className='text'>{t}</View>
                                </View>
                            })
                        }
                    </View>
                </View>
                <MSwiper flag='news_list_all_top' className='news_list_all_top'/>
                <View className='list_wrapper'>
                    <View className='list'>
                        {
                            newsList.list && newsList.list.map(n => {
                                return <View className='item' key={n.id} onClick={this.goDetail.bind(this, n.id)}>
                                    <View className='thumb'>
                                        <Image className='img' src={buildCdnPath(n.thumb)}/>
                                    </View>
                                    <View className='right'>
                                        <View className='title'>{n.title}</View>
                                        <View className='desc_wrap'>
                                            <View className='from'>{n.from}</View>
                                            <View
                                                className='time'>{moment(n.publish_time * 1000).format('YYYY-MM-DD')}</View>
                                        </View>
                                    </View>
                                </View>
                            })
                        }
                    </View>
                </View>
            </View>
        )
    }
}
