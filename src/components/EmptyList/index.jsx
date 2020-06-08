import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import './index.less'
import {buildCdnPath} from "../../utils";

export default class Index extends Component {
    state = {
        loading: true
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
    }

    render() {
        return (
            <View className='component_empty_list'>
                {
                    this.state.loading ?
                        <View>加载中...</View> :
                        <View>
                            <Image src={buildCdnPath('imgs/common/empty.png')}/>
                            <View>没有数据</View>
                        </View>
                }
            </View>
        )
    }
}
