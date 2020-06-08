import Taro, {Component} from '@tarojs/taro'
import {AtTabBar} from 'taro-ui'

import './index.less'
import {Image, Swiper, SwiperItem, View} from "@tarojs/components";
import {buildCdnPath} from "../../utils";
import {connect} from "@tarojs/redux";

@connect(state => {
    return {
        swipers: state.home.swipers
    }
})

export default class Index extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'home/getSwiperSaga',
            payload: {
                flag: this.props.flag
            }
        })
    }

    go = (item) => {
        console.log('xx')
        Taro.navigateTo({
            url: item.link
        })
    }

    render() {
        let {swipers, flag, className} = this.props
        return (
            <Swiper
                className={`${className} component_swiper`}
                indicatorColor='#999'
                indicatorActiveColor='#333'
                circular
                indicatorDots
            >
                {
                    swipers[flag] && swipers[flag].map(item => {
                        return <SwiperItem key={item.id}>
                            <View onClick={this.go.bind(this, item)}>
                                <Image className='img' src={buildCdnPath(item.image)}/>
                            </View>
                        </SwiperItem>
                    })
                }

            </Swiper>
        )
    }
}
