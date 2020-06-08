import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import './index.less'
import {buildCdnPath} from "../../utils";

export default class Index extends Component {
    state = {
        
    }

    render() {
        return (
            <View className='component_back'>
                <Image className='back_top' src={buildCdnPath('imgs/common/backtop.png')}></Image>
            </View>
        )
    }
}
