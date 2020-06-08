import Taro, {Component} from '@tarojs/taro'
import {AtTabs, AtTabsPane} from 'taro-ui'
import {connect} from "@tarojs/redux";
import PageInit from '../PageInit';
import {View} from "@tarojs/components";
import EmptyList from '../EmptyList'

import './index.less'

@connect(store => {
    return {
        tabData: store.components.tabData
    }
})

@PageInit()
export default class Index extends Component {
    state = {
        current: 0,
        tabList: []
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'components/getTabSaga',
            payload: {
                requestAPI: this.props.requestAPI
            }
        })
    }

    handleClick = (current) => {
        this.setState({
            current
        })
    }

    renderItem = (t, i) => {
        let {renderItem} = this.props
        return renderItem && renderItem(t, i) || <View>没有renderItem函数</View>
    }

    render() {
        let {tabData, tabList} = this.props

        let {current} = this.state
        let tabClass = ''
        if (!tabList) {
            tabList = [{}]
            tabClass = 'notabs'
        }
        return (
            <AtTabs
                className={`component_tabs ${tabClass}`}
                animated={false}
                current={current}
                tabList={tabList}
                onClick={this.handleClick}>
                {
                    tabList.map((t, i) => {
                        return <AtTabsPane current={current} index={i}>
                            {
                                tabData.list && tabData.list.length ?
                                    tabData.list.map(item => {
                                        return this.renderItem(item, i)
                                    })
                                    : <EmptyList/>
                            }
                        </AtTabsPane>
                    })
                }
            </AtTabs>
        )
    }
}
