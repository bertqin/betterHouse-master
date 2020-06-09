
import { StyleSheet, Dimensions } from 'react-native'

// 一般app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width
const uiWidthPx = 375

function scalePx2dp (uiElementPx) {
  return uiElementPx * deviceWidthDp / uiWidthPx
}

export default StyleSheet.create({
  "flex_row": {
    "display": "flex",
    "flexDirection": "row"
  },
  "flex_center": {
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "flex_center_row": {
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",
    "flexDirection": "row"
  },
  "flex_center_column": {
    "justifyContent": "center",
    "flexDirection": "column",
    "display": "flex",
    "alignItems": "center"
  },
  "vertical_center": {
    "display": "flex",
    "alignItems": "center"
  },
  "flex_around_row": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-around"
  },
  "flex_between_row": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between"
  },
  "img": {
    "width": "100%",
    "height": "100%"
  },
  "taro-img": {
    "display": "block"
  },
  "taro-tabbar__tabbar": {
    "boxSizing": "border-box",
    "height": scalePx2dp(48)
  },
  "app_common_header": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "height": scalePx2dp(45),
    "fontSize": scalePx2dp(16),
    "position": "fixed",
    "top": 0,
    "left": 0,
    "width": "100%",
    "zIndex": 2
  },
  "btn_common": {
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",
    "height": scalePx2dp(51.5),
    "backgroundColor": "#719af6",
    "borderRadius": scalePx2dp(5),
    "color": "#fff",
    "fontSize": scalePx2dp(17)
  },
  "app_common_header.on": {
    "backgroundColor": "#6190e8"
  },
  "app_right_header": {
    "position": "fixed",
    "top": 0,
    "left": 0,
    "width": "100%",
    "backgroundColor": "#e3e3e3",
    "height": scalePx2dp(45),
    "borderBottom": "1PX solid rgba(105,105,105,.3)"
  },
  "at-tabs__header": {
    "position": "fixed",
    "zIndex": 1
  },
  "at-tabs__body": {
    "paddingTop": scalePx2dp(40)
  },
  "app_list_empty": {
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",
    "height": scalePx2dp(100)
  }
})
