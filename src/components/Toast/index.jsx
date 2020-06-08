import Taro, {Component} from '@tarojs/taro'
import {View, Button} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import {AtToast} from "taro-ui"


import './index.less'

@connect(store => {
    return {
        toast: store.components.toast
    }
})

export default class Index extends Component {
    onClose = () => {
        this.props.dispatch({
            type: 'components/toast',
            payload: {
                text: '',
                show: false
            }
        })
    }

    render() {
        let {toast} = this.props
        return (
            <AtToast isOpened={toast.show} text={toast.text} onClose={this.onClose}></AtToast>
        )
    }
}
