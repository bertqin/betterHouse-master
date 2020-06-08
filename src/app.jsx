import 'taro-ui/dist/style/index.scss';  // taro-ui css
import Taro, {Component} from '@tarojs/taro'
import {Provider} from "@tarojs/redux";
import models from "@/models";
import {buildCdnPath} from "./utils";
import './app.less'
import Index from './pages/index';
import dva from "./dva";
import {View} from "@tarojs/components";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// if (process.env.NODE_ENV !== 'production') {
let VConsole = require('vconsole')
new VConsole()
// }


const dvaApp = dva.createApp({
    initialState: {},
    models: models,
    onError(e) {

        console.log('dva onError', e)
    }
});

const store = dvaApp.getStore();


class App extends Component {

    componentDidMount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    componentDidCatchError() {
    }

    config = {
        pages: [
            'pages/index/index',
            'pages/payResult/index',
            'pages/showroom/list/index',
            'pages/showroom/detail/index',
            'pages/showroom/order/index',
            'pages/activity/index/index',
            'pages/activity/detail/index',
            'pages/activity/balanceList/index',
            'pages/personal/bindMobile/index',
            'pages/house/list/index',
            'pages/house/detail/index',
            'pages/house/choose/index',
            'pages/house/huxing/index',
            'pages/house/order/index',
            'pages/personal/index/index',
            'pages/news/list/index',
            'pages/news/detail/index',
            // 'pages/personal/auth/index',
            // 'pages/personal/order/index/index',
            'pages/personal/houseOrder/index/index',
            'pages/personal/houseOrder/detail/index',
            'pages/personal/coupon/index/index',
            'pages/personal/coupon/writeoff/index',
            'pages/personal/coupon/writeoffServer/index',
            'pages/personal/viewHistory/index/index',
            'pages/personal/meeting/index/index',
            'pages/personal/fav/index/index',
            'pages/personal/setting/index/index',
            'pages/personal/about/index/index',
            'pages/swiper/index',
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        },
        tabBar: {
            color: "#96979c",
            selectedColor: "#3f77f1",
            backgroundColor: "#fff",
            list: [
                {
                    // pagePath: 'pages/personal/coupon/writeoff/index',
                    pagePath: "pages/index/index",
                    iconPath: buildCdnPath('imgs/tabbar/1.png'),
                    selectedIconPath: buildCdnPath('imgs/tabbar/1_on.png'),
                    text: '首页',
                },
                {
                    pagePath: "pages/house/list/index",
                    iconPath: buildCdnPath('imgs/tabbar/house.png'),
                    selectedIconPath: buildCdnPath('imgs/tabbar/house_on.png'),
                    text: '买房',
                },
                {
                    pagePath: "pages/news/list/index",
                    iconPath: buildCdnPath('imgs/tabbar/3.png'),
                    selectedIconPath: buildCdnPath('imgs/tabbar/3_on.png'),
                    text: '圈子',
                },
                {
                    pagePath: "pages/activity/index/index",
                    iconPath: buildCdnPath('imgs/tabbar/2.png'),
                    selectedIconPath: buildCdnPath('imgs/tabbar/2_on.png'),
                    text: '赚钱',
                },
                {
                    pagePath: 'pages/personal/index/index',
                    iconPath: buildCdnPath('imgs/tabbar/5.png'),
                    selectedIconPath: buildCdnPath('imgs/tabbar/5_on.png'),
                    text: '我的',
                }
            ]
        },
    }

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        return (
            <Provider store={store}>
                <Index/>
            </Provider>
        )
    }
}

Taro.render(<App/>, document.getElementById('app'))
