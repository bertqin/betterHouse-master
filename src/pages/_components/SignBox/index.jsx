import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Image, Text} from '@tarojs/components'
import {AtInput, AtForm, AtButton} from 'taro-ui'
import {connect} from "@tarojs/redux";
import './index.less'

@connect(store => {
    return {}
})

export default class Index extends Component {
    state = {
        mobile: '',
        code: ''
    }

    constructor(props) {
        super(props)
    }

    handleMobileChange = (value) => {
        this.setState({
            mobile: value
        })
    }

    getCode = () => {
        this.props.dispatch({
            type: 'common/getMsgCodeSaga',
            payload: {
                mobile: this.state.mobile
            }
        })
    }

    handleCodeChange = (value) => {
        this.setState({
            code: value
        })
    }

    sure = () => {
        this.props.dispatch({
            type: 'common/bindMobileSaga',
            payload: {
                mobile: this.state.mobile,
                code: this.state.code,
                success: () => {
                    this.props.dispatch({
                        type: 'components/modalHide'
                    })
                }
            }
        })
    }

    render() {
        return (
            <View className={'component_sign_box'}>
                <AtInput
                    clear
                    type='text'
                    length='11'
                    placeholder='请输入手机号'
                    value={this.state.mobile}
                    onChange={this.handleMobileChange}
                >
                    <View className={'btn_code'} onClick={this.getCode}>获取验证码</View>
                </AtInput>
                <AtInput
                    clear
                    type='text'
                    maxLength='6'
                    placeholder='验证码'
                    value={this.state.code}
                    onChange={this.handleCodeChange}
                >
                </AtInput>
                <View style={{height: '20px'}}></View>
                <AtButton type='primary' onClick={this.sure}>确定</AtButton>
            </View>
        )
    }
}
