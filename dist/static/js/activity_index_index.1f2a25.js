(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"368":function(e,t,a){},"414":function(e,t,a){"use strict";a.r(t);var n,o=a(2),c=a(4),i=a(28),r=a(20),s=a(403),l=a(183),m=a(29),p=(a(368),a(3)),u=function get(e,t,a){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,t);if(void 0===n){var o=Object.getPrototypeOf(e);return null===o?void 0:get(o,t,a)}if("value"in n)return n.value;var c=n.get;return void 0!==c?c.call(a):void 0},d=function(){function defineProperties(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,a){return t&&defineProperties(e.prototype,t),a&&defineProperties(e,a),e}}();t.default=Object(m.b)(function(e){return{"activityList":e.activity.activityList,"userInfo":e.common.userInfo}})(n=Object(l.d)()(n=function(e){function Index(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Index);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Index.__proto__||Object.getPrototypeOf(Index)).call(this,e));return t.config={"navigationBarTitleText":"活动列表"},t.clickTab=function(e){console.log(e),t.setState({"current":e.id,"tabOpen":!0})},t.goDetail=function(e){var a=t.props.userInfo;a.invite_code&&c.a.navigateTo({"url":"/pages/activity/detail/index?id="+e.id+"&invite_code="+a.invite_code})},t.withdraw=function(){var e=t.props.userInfo;e.balance<=0?Object(i.a)({"icon":"none","title":"提现申请失败: 余额不足!"}):t.props.dispatch({"type":"home/withdrawApply","payload":{"amount":e.balance}})},t.goOrderList=function(){c.a.navigateTo({"url":"/pages/activity/balanceList/index"})},t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Index,c["a"].Component),d(Index,[{"key":"componentDidMount","value":function componentDidMount(){this.props.dispatch({"type":"activity/initPageSaga"}),this.props.dispatch({"type":"common/getUserInfoSaga"})}}]),d(Index,[{"key":"render","value":function render(){var e=this,t=this.props,a=t.activityList,n=t.userInfo;return console.log(a),o.j.createElement(r.a,{"className":"page_activity_index"},o.j.createElement(r.a,{"className":"top","style":{"background":"url("+Object(p.a)("imgs/page_activity_index/bg.png")+") no-repeat top center"}},o.j.createElement(r.a,{"className":"app_common_header"},o.j.createElement(r.a,{"className":"left","onClick":function onClick(){return c.a.navigateBack()}},o.j.createElement(r.a,{"className":"back"},o.j.createElement(s.a,{"className":"img","src":Object(p.a)("imgs/common/back_white.png")}))),o.j.createElement(r.a,{"className":"title"},"京山买房"),o.j.createElement(r.a,{"className":"right","onClick":this.goOrderList},o.j.createElement(r.a,null,"账单"))),o.j.createElement(r.a,{"className":"top_content"},o.j.createElement(r.a,{"className":"money_wrap"},o.j.createElement(r.a,{"className":"money_title"},"我的资产(元)"),o.j.createElement(r.a,{"className":"money"},o.j.createElement(r.a,{"className":"btn-withdraw","style":{"border":"none"}}),o.j.createElement(r.a,{"className":"price"},n.balance||"0.00"),o.j.createElement(r.a,{"className":"btn-withdraw","onClick":this.withdraw},o.j.createElement(r.a,null,"提现")))),o.j.createElement(r.a,{"className":"stat_list"},o.j.createElement(r.a,{"className":"stat_item"},o.j.createElement(r.a,{"className":"num"},n.statistic&&n.statistic.comm_todo||"0"),o.j.createElement(r.a,{"className":"desc"},"佣金待生效")),o.j.createElement(r.a,{"className":"stat_item"},o.j.createElement(r.a,{"className":"num"},n.statistic&&n.statistic.comm_done||"0"),o.j.createElement(r.a,{"className":"desc"},"总佣金")),o.j.createElement(r.a,{"className":"stat_item"},o.j.createElement(r.a,{"className":"num"},n.statistic&&n.statistic.withdraw_done||"0"),o.j.createElement(r.a,{"className":"desc"},"总提现"))))),o.j.createElement(r.a,{"className":"content_wrap"},o.j.createElement(l.b,{"flag":"activity_index_top","className":"ad"}),o.j.createElement(r.a,{"className":"share_title_wrap"},o.j.createElement(r.a,{"className":"share_title"},o.j.createElement(s.a,{"className":"img","src":Object(p.a)("imgs/page_activity_index/title.png")}))),o.j.createElement(r.a,{"className":"share_list"},a.map(function(t){return o.j.createElement(r.a,{"className":"share_item","key":t.id,"onClick":e.goDetail.bind(e,t)},o.j.createElement(r.a,{"className":"title"},t.title),o.j.createElement(r.a,{"className":"thumb"},o.j.createElement(s.a,{"className":"img","src":Object(p.a)(t.thumb)})),o.j.createElement(r.a,{"className":"footer"},o.j.createElement(r.a,{"className":"more"},"查看详情")))}))))}},{"key":"componentDidShow","value":function componentDidShow(){u(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidShow",this)&&u(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){u(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidHide",this)&&u(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidHide",this).call(this)}}]),Index}())||n)||n}}]);