import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import {initPhotoSwipeFromDOM} from '@/utils'
import './index.less'

@connect(store => {
    return {}
})

export default class Index extends Component {
    config = {
        navigationBarTitleText: '户型详情图'
    }

    componentDidMount() {
        setTimeout(() => {
            // alert(1);
            initPhotoSwipeFromDOM('.my-gallery')
        }, 1000)
    }

    render() {
        return (
            <View className='page_house_huxing'>

                <View className='my-gallery'>
                    <figure>
                        <div className="img-dv" data-size="1920x1080">
                            <img
                            src='https://edu-image.nosdn.127.net/7E640B56CE7F8B48631F937AF44DAAD2.jpg?imageView&quality=100&thumbnail=32y32'/>
                            </div>
                        <figcaption style="display:none;">在这里可增加图片描述</figcaption>
                    </figure>
                    <figure>
                        <div className="img-dv" data-size="1920x1080">
                            <img
                                src='https://edu-image.nosdn.127.net/7E640B56CE7F8B48631F937AF44DAAD2.jpg?imageView&quality=100&thumbnail=32y32'/>
                        </div>
                        <figcaption style="display:none;">在这里可增加图片描述</figcaption>
                    </figure>
                </View>
            </View>
        )
    }
}
