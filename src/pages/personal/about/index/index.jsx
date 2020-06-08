import Taro, {Component} from '@tarojs/taro'
import {connect} from "@tarojs/redux";
import {View, Image} from '@tarojs/components'
import {PageInit, Tabs,} from '@/components';
import './index.less'
import {API_HOME} from '@/api'
import {buildCdnPath} from '@/utils'
import moment from "moment";

@connect(store => {
    return {
        about: store.personal.about
    }
})

@PageInit()
export default class Index extends Component {
    constructor() {
        super(...arguments)
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'personal/getAboutSaga'
        })
    }

    componentWillMount() {
    }


    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    config = {
        navigationBarTitleText: '首页'
    }

    render() {
        let {about} = this.props
        return (
            <View className='page_personal_about_index'>
                <View className='app_common_header'>
                    <View className='left' onClick={() => Taro.navigateBack()}>
                        <View className='back'></View>
                    </View>
                    <View className='title'>关于我们</View>
                    <View className='right'></View>
                </View>
                <View className='article'>
                    <View dangerouslySetInnerHTML={{__html: about.about}}></View>
                </View>
            </View>
        )
    }
}
