import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Image} from '@tarojs/components'
import {connect} from "@tarojs/redux";

import PageInit from "../PageInit";
import './index.less'
import {buildCdnPath} from "../../utils";

@connect(state => {
    return {
        houseListFilter: state.home.houseListFilter,
        houseListFilterKey: state.home.houseListFilterKey
    }
})

@PageInit()
export default class Index extends Component {
    state = {
        tabIndex: -1,
        tabOpen: false
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'home/getHouseListFilterSaga'
        })

    }

    clickTab = (index) => {
        this.setState({
            tabIndex: index,
            tabOpen: true
        })
    }

    renderHeader = () => {
        let {tabOpen} = this.state
        let {houseListFilter} = this.props
        return <View className='header'>
            {
                houseListFilter.map((t, i) => {
                    return <View onClick={this.clickTab.bind(this, i)}
                                 className={`header_item flex_center ${this.state.tabIndex == i && tabOpen ? 'on' : ''}`}
                                 key={t.id}>
                        <View className='bar'>{t.title}</View>
                        <View className='icon'>
                            <Image className='img' src={buildCdnPath('imgs/common/sanjiao.png')}/>
                        </View>
                    </View>
                })
            }
        </View>
    }

    select = (o) => {
        let {houseListFilterKey} = this.props

        if (houseListFilterKey[o.id]) {
            delete houseListFilterKey[o.id]
        } else {
            houseListFilterKey[o.id] = true
        }

        this.props.dispatch({
            type: 'home/save',
            payload: {
                houseListFilterKey: {
                    ...houseListFilterKey,
                }
            }
        })
    }

    renderContent = () => {
        let {tabIndex} = this.state
        let {houseListFilter, houseListFilterKey} = this.props
        if (tabIndex < 0) return null
        console.log(tabIndex)
        return <View className='content'>
            <ScrollView className='select_box' scrollY>
                <View className='list'>
                    {
                        houseListFilter[tabIndex].options.map(o => {
                            let on = houseListFilterKey[o.id] ? 'on' : ''
                            return <View className={`item ${on}`}
                                         onClick={this.select.bind(this, o)}
                                         key={o.id}>
                                {o.value}
                            </View>
                        })
                    }
                </View>
            </ScrollView>
        </View>
    }

    clear = () => {
        this.props.dispatch({
            type: 'home/save',
            payload: {
                houseListFilterKey: {}
            }
        })
    }

    hide = () => {
        this.setState({
            tabOpen: false
        })
    }

    sure = (e) => {
        let {houseListFilterKey} = this.props
        this.props.dispatch({
            type: 'home/getHouseListSaga',
            payload: {
                attr_ids: Object.keys(houseListFilterKey).toString()
            }
        })
        this.setState({
            tabOpen: false
        })
    }

    renderFooter = () => {
        return <View className='search_btn'>
            <View className='btn reset_keyword' onClick={this.clear}>清空</View>
            <View className='btn red set_keyword' onClick={this.sure}>确认</View>
        </View>
    }

    render() {
        let {tabOpen} = this.state
        return (
            <View className={`search_select ${tabOpen ? 'open' : ''}`}>
                {
                    tabOpen &&
                    <View className='mask' onClick={this.hide}></View>
                }
                {this.renderHeader()}

                {
                    <View className='select_content'>
                        {this.renderContent()}
                        {this.renderFooter()}
                    </View>
                }
            </View>
        )
    }
}
