import Taro, {Component} from '@tarojs/taro'
import {connect} from "@tarojs/redux";
import {View, Image} from '@tarojs/components'
import {AtButton, AtInput} from 'taro-ui'
import {PageInit, Tabbar,} from '@/components';
import './index.less'
import {buildCdnPath} from "../../../utils";

@connect(store => {
    return {}
})

@PageInit()
export default class Index extends Component {
    config = {
        navigationBarTitleText: '首页'
    }

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
            <View className='page_personal_bindmobile_index'>
                <View className='app_common_header'>
                    <View className='left'>
                        <View className='back'></View>
                    </View>
                    <View className='title'>绑定手机号</View>
                    <View className='right'></View>
                </View>
                <View className='content'>
                    <View className='logo_wrap'>
                        <View className='logo'>
                            <Image className='img' src={buildCdnPath('imgs/common/logo_rect.png')}></Image>
                        </View>
                    </View>
                    <View className='form'>
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
                            placeholder='请输入短信验证码'
                            value={this.state.code}
                            onChange={this.handleCodeChange}
                        >
                        </AtInput>
                        <View style={{height: '20px'}}></View>
                        <View className='button' onClick={this.sure}>绑定手机号</View>
                    </View>
                    <View className='copy'>
                        <View>为保障您的个人隐私权益，请在点击同意按钮前认
                            真阅读下方协议：</View>
                        <View>《京山买房隐私政策》及《京山买房用户使用协议》</View>
                    </View>
                </View>
            </View>
        )
    }
}
