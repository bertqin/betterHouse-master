import Taro, {Component} from '@tarojs/taro'
import {connect} from "@tarojs/redux";
import {View, Text} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import {Container, Tabbar, } from '@/components';
import './index.less'

@connect(store => {
    return {}
})

export default class Index extends Component {

    componentWillMount() {
    }

    componentDidMount() {
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

    test = () => {
        this.props.dispatch({
            type: 'common/x'
        })
    }

    render() {
        return (
            <Container className='index'>
                <View onClick={this.test}>
                    fhello
                </View>
            </Container>
        )
    }
}
