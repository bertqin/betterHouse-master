(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"187":function(e,t,n){var a=n(188);"string"==typeof a&&(a=[[e.i,a,""]]);var o={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};n(31)(a,o);a.locals&&(e.exports=a.locals)},"188":function(e,t,n){(t=n(30)(!1)).push([e.i,"input {\n  display: block;\n  height: 24px;\n  text-align: inherit;\n  text-overflow: clip;\n  overflow: hidden;\n  white-space: nowrap;\n}",""]),e.exports=t},"316":function(e,t,n){"use strict";var a=n(2),o=n(11),r=n.n(o),i=n(184),s=n.n(i),l=n(20),c=(n(18),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}());var u=function(e){function Label(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Label),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Label.__proto__||Object.getPrototypeOf(Label)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Label,a["j"].Component),c(Label,[{"key":"render","value":function render(){var e=function _objectWithoutProperties(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}(this.props,[]);return a.j.createElement("label",e,this.props.children)}}]),Label}(),p=n(32),m=(n(187),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}),d=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();function getTrueType(e,t,n){if(!e)throw new Error("unexpected type");return"search"===t&&(e="search"),n&&(e="password"),"digit"===e&&(e="number"),e}var f=function(e){function Input(){!function input_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Input);var e=function input_possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Input.__proto__||Object.getPrototypeOf(Input)).apply(this,arguments));return e.onInput=e.onInput.bind(e),e.onFocus=e.onFocus.bind(e),e.onBlur=e.onBlur.bind(e),e.onKeyDown=e.onKeyDown.bind(e),e.handleComposition=e.handleComposition.bind(e),e.isOnComposition=!1,e.onInputExcuted=!1,e}return function input_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Input,a["j"].Component),d(Input,[{"key":"componentDidMount","value":function componentDidMount(){"file"===this.props.type&&this.inputRef.addEventListener("change",this.onInput)}},{"key":"componentWillUnmount","value":function componentWillUnmount(){"file"===this.props.type&&this.inputRef.removeEventListener("change",this.onInput)}},{"key":"onInput","value":function onInput(e){var t=this.props,n=t.type,a=t.maxLength,o=t.confirmType,r=t.password,i=t.onInput,onInput=void 0===i?"":i,s=t.onChange,l=void 0===s?"":s;if(!this.isOnComposition&&!this.onInputExcuted){var c=e.target.value,u=getTrueType(n,o,r);if(this.onInputExcuted=!0,"number"===u&&c&&a<=c.length&&(c=c.substring(0,a),e.target.value=c),Object.defineProperty(e,"detail",{"enumerable":!0,"value":{"value":c}}),!(["number","file"].indexOf(u)>=0)){var p=e.target.selectionEnd;setTimeout(function(){e.target.selectionStart=p,e.target.selectionEnd=p})}if(l)return l(e);if(onInput)return onInput(e)}}},{"key":"onFocus","value":function onFocus(e){var onFocus=this.props.onFocus;this.onInputExcuted=!1,Object.defineProperty(e,"detail",{"enumerable":!0,"value":{"value":e.target.value}}),onFocus&&onFocus(e)}},{"key":"onBlur","value":function onBlur(e){var onBlur=this.props.onBlur;Object.defineProperty(e,"detail",{"enumerable":!0,"value":{"value":e.target.value}}),onBlur&&onBlur(e)}},{"key":"onKeyDown","value":function onKeyDown(e){var t=this.props,n=t.onConfirm,onKeyDown=t.onKeyDown;this.onInputExcuted=!1,onKeyDown&&onKeyDown(e),13===e.keyCode&&n&&(Object.defineProperty(e,"detail",{"enumerable":!0,"value":{"value":e.target.value}}),n(e))}},{"key":"handleComposition","value":function handleComposition(e){e.target instanceof HTMLInputElement&&("compositionend"===e.type?(this.isOnComposition=!1,this.onInputExcuted=!1,this.onInput(e)):this.isOnComposition=!0)}},{"key":"render","value":function render(){var e=this,t=this.props,n=t.className,o=void 0===n?"":n,i=t.placeholder,s=t.type,l=void 0===s?"text":s,c=t.password,u=t.disabled,d=t.maxLength,f=t.confirmType,h=void 0===f?"":f,b=t.focus,g=void 0!==b&&b,y=t.value,_=r()("weui-input",o),j=Object(p.a)(this.props,["className","placeholder","disabled","max","onChange","onFocus","onBlur","type","focus"]);return"value"in this.props&&(j.value=function fixControlledValue(e){return void 0===e||null===e?"":e}(y)),a.j.createElement("input",m({"ref":function ref(t){e.inputRef=t}},j,{"className":_,"placeholder":i,"disabled":u,"maxlength":d,"onInput":this.onInput,"onFocus":this.onFocus,"onBlur":this.onBlur,"autofocus":g,"onKeyDown":this.onKeyDown,"type":getTrueType(l,h,c),"onCompositionStart":this.handleComposition,"onCompositionEnd":this.handleComposition}))}}]),Input}();f.defaultProps={"type":"text"};var h=f,b=n(402),g=n(185);n.d(t,"a",function(){return _});var y=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var _=function(e){function AtInput(){!function components_input_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtInput);var e=function components_input_possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtInput.__proto__||Object.getPrototypeOf(AtInput)).apply(this,arguments));return e.onInput=function(t){e.props.onChange(t.target.value,t)},e.onFocus=function(t){e.props.onFocus&&e.props.onFocus(t.target.value,t)},e.onBlur=function(t){e.props.onBlur&&e.props.onBlur(t.target.value,t),e.props.onChange(t.target.value,t)},e.onConfirm=function(t){e.props.onConfirm&&e.props.onConfirm(t.target.value,t)},e.onClick=function(){e.props.editable||e.props.onClick&&e.props.onClick()},e.clearValue=function(t){setTimeout(function(){e.props.onChange("",t)},50)},e.onErrorClick=function(){return e.props.onErrorClick&&e.props.onErrorClick()},e}return function components_input_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtInput,g["a"]),y(AtInput,[{"key":"render","value":function render(){var e=this.props,t=e.className,n=e.customStyle,o=e.name,i=e.cursorSpacing,s=e.confirmType,c=e.cursor,p=e.selectionStart,m=e.selectionEnd,d=e.adjustPosition,f=e.border,g=e.title,y=e.error,_=e.clear,j=e.placeholder,E=e.placeholderStyle,v=e.placeholderClass,w=e.autoFocus,N=e.focus,C=e.value,O=e.required,k=function getInputProps(e){var t={"type":e.type,"maxLength":e.maxLength,"disabled":e.disabled,"password":!1};switch(t.type){case"phone":t.type="number",t.maxLength=11;break;case"password":t.type="text",t.password=!0}return e.disabled||e.editable||(t.disabled=!0),t}(this.props),x=k.type,I=k.maxLength,P=k.disabled,T=k.password,S=r()("at-input",{"at-input--without-border":!f},t),L=r()("at-input__container",{"at-input--error":y,"at-input--disabled":P}),D=r()("at-input__overlay",{"at-input__overlay--hidden":!P}),B=r()("placeholder",v);return a.j.createElement(l.a,{"className":S,"style":n},a.j.createElement(l.a,{"className":L},a.j.createElement(l.a,{"className":D,"onClick":this.onClick}),g&&a.j.createElement(u,{"className":"at-input__title "+(O&&"at-input__title--required"),"for":o},g),a.j.createElement(h,{"className":"at-input__input","id":o,"name":o,"type":x,"password":T,"placeholderStyle":E,"placeholderClass":B,"placeholder":j,"cursorSpacing":i,"maxLength":I,"autoFocus":w,"focus":N,"value":C,"confirmType":s,"cursor":c,"selectionStart":p,"selectionEnd":m,"adjustPosition":d,"onInput":this.onInput,"onFocus":this.onFocus,"onBlur":this.onBlur,"onConfirm":this.onConfirm}),_&&C&&a.j.createElement(l.a,{"className":"at-input__icon","onTouchEnd":this.clearValue},a.j.createElement(b.a,{"className":"at-icon at-icon-close-circle at-input__icon-close"})),y&&a.j.createElement(l.a,{"className":"at-input__icon","onTouchStart":this.onErrorClick},a.j.createElement(b.a,{"className":"at-icon at-icon-alert-circle at-input__icon-alert"})),a.j.createElement(l.a,{"className":"at-input__children"},this.props.children)))}}]),AtInput}();_.defaultProps={"className":"","customStyle":"","value":"","name":"","placeholder":"","placeholderStyle":"","placeholderClass":"","title":"","cursorSpacing":50,"confirmType":"done","cursor":0,"selectionStart":-1,"selectionEnd":-1,"adjustPosition":!0,"maxLength":140,"type":"text","disabled":!1,"border":!0,"editable":!0,"error":!1,"clear":!1,"autoFocus":!1,"focus":!1,"required":!1,"onChange":function onChange(){},"onFocus":function onFocus(){},"onBlur":function onBlur(){},"onConfirm":function onConfirm(){},"onErrorClick":function onErrorClick(){},"onClick":function onClick(){}},_.propTypes={"className":s.a.oneOfType([s.a.string,s.a.array]),"customStyle":s.a.oneOfType([s.a.string,s.a.object]),"value":s.a.oneOfType([s.a.string,s.a.number]),"name":s.a.string,"placeholder":s.a.string,"placeholderStyle":s.a.string,"placeholderClass":s.a.string,"title":s.a.string,"confirmType":s.a.string,"cursor":s.a.oneOfType([s.a.string,s.a.number]),"selectionStart":s.a.oneOfType([s.a.string,s.a.number]),"selectionEnd":s.a.oneOfType([s.a.string,s.a.number]),"adjustPosition":s.a.bool,"cursorSpacing":s.a.oneOfType([s.a.string,s.a.number]),"maxLength":s.a.oneOfType([s.a.string,s.a.number]),"type":s.a.string,"disabled":s.a.bool,"border":s.a.bool,"editable":s.a.bool,"error":s.a.bool,"clear":s.a.bool,"autoFocus":s.a.bool,"focus":s.a.bool,"onChange":s.a.func,"onFocus":s.a.func,"onBlur":s.a.func,"onConfirm":s.a.func,"onErrorClick":s.a.func,"onClick":s.a.func,"required":s.a.bool}},"363":function(e,t,n){},"401":function(e,t,n){"use strict";n.r(t);var a,o=n(2),r=n(4),i=n(29),s=n(20),l=n(403),c=n(3),u=n(183),p=(n(363),n(316)),m=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();t.default=Object(i.b)(function(e){return{"houseList":e.home.houseList,"noticeList":e.home.noticeList,"zhanting":e.home.zhanting}})(a=Object(u.d)()(a=function(e){function Index(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Index);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Index.__proto__||Object.getPrototypeOf(Index)).call(this,e));return t.state={"keyword":""},t.initScrollEvent=function(e){try{var n=document.getElementById("house_list_wrap"),a=n.getBoundingClientRect().top;t.setState({"top":a}),a<=0?n.classList.add("on"):n.classList.remove("on")}catch(e){}},t.config={"navigationBarTitleText":"首页"},t.test=function(){t.props.dispatch({"type":"common/x"})},t.goHouseList=function(){r.a.navigateTo({"url":"/pages/house/list/index"})},t.goHouseDetail=function(e){r.a.navigateTo({"url":"/pages/house/detail/index?id="+e.id})},t.goNoticeDetail=function(e){r.a.navigateTo({"url":"/pages/news/detail/index?id="+e.id})},t.goShowRoomList=function(e){var n=t.props.zhanting;n&&r.a.navigateTo({"url":"/pages/showroom/list/index?activity_id="+n[e][0].activity_id})},t.search=function(){r.a.navigateTo({"url":"/pages/house/list/index?keyword="+t.state.keyword})},t.handleInputChange=function(e){t.setState({"keyword":e})},t.stopPro=function(e){e.stopPropagation()},t.goPersonal=function(){r.a.navigateTo({"url":"/pages/personal/index/index"})},t.state={"show":!1},t.initScrollEvent=t.initScrollEvent.bind(t),t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Index,r["a"].Component),m(Index,[{"key":"componentDidMount","value":function componentDidMount(){this.props.dispatch({"type":"home/initPageSaga"}),document.querySelector(".taro-tabbar__panel").addEventListener("scroll",this.initScrollEvent)}},{"key":"componentWillUnmount","value":function componentWillUnmount(){}},{"key":"componentDidShow","value":function componentDidShow(){}},{"key":"componentDidHide","value":function componentDidHide(){}},{"key":"render","value":function render(){var e=this,t=this.props,n=t.houseList,a=t.noticeList,r=t.zhanting;return o.j.createElement(s.a,{"className":"page_index"},o.j.createElement(s.a,{"className":"search_bar"},o.j.createElement(s.a,{"className":"logo"}),o.j.createElement(s.a,{"className":"input_wrap"},o.j.createElement(s.a,{"className":"input"},o.j.createElement(p.a,{"clear":!0,"type":"search","placeholder":"你想住在哪?","value":this.state.keyword,"onConfirm":this.search,"onChange":this.handleInputChange}))),o.j.createElement(s.a,{"className":"map_btn"},o.j.createElement(s.a,{"className":"map_search"},o.j.createElement(l.a,{"className":"img","src":Object(c.a)("imgs/common/地图找房.png")})))),o.j.createElement(u.b,{"flag":"index_top","className":"swiper"}),o.j.createElement(s.a,{"className":"wrapper"},o.j.createElement(s.a,{"className":"toutiao"},o.j.createElement(s.a,{"className":"icon"},o.j.createElement(l.a,{"className":"img","src":Object(c.a)("imgs/page_index/toutiao_icon.png")})),o.j.createElement(s.a,{"className":"news_list"},a.map(function(t){return o.j.createElement(s.a,{"className":"news_item","onClick":e.goNoticeDetail.bind(e,t)},o.j.createElement(s.a,{"className":"dot"}),o.j.createElement(s.a,{"className":"text"},t.title))}))),o.j.createElement(u.b,{"flag":"index_mid","className":"ad_index_mid"}),o.j.createElement(s.a,{"className":"guide_wrap"},o.j.createElement(s.a,{"className":"guide_header"},o.j.createElement(l.a,{"className":"img","src":Object(c.a)("imgs/page_index/guide_1.png")}))),o.j.createElement(s.a,{"className":"guide_1"},o.j.createElement(s.a,{"className":"guide_1_header","onClick":this.goShowRoomList.bind(this,0)},o.j.createElement(l.a,{"className":"img","src":Object(c.a)("imgs/page_index/guide_1_bg.png")})),o.j.createElement(s.a,{"className":"guide_1_list"},r[0]&&r[0].map(function(t){return o.j.createElement(s.a,{"className":"guide_1_item","key":t.id,"onClick":e.goHouseDetail.bind(e,t)},o.j.createElement(s.a,{"className":"content"},o.j.createElement(s.a,{"className":"thumb"},o.j.createElement(l.a,{"className":"img","src":Object(c.a)(t.thumb)})),o.j.createElement(s.a,{"className":"right"},o.j.createElement(s.a,{"className":"title_wrap"},o.j.createElement(s.a,{"className":"title"},t.name),o.j.createElement(s.a,{"className":"tab_sell_wrap"},o.j.createElement(s.a,{"className":"tab_sell"},"已售",t.room_sell,"套"),o.j.createElement(s.a,{"className":"tab_unsell"},"未售",t.room_stock,"套"))),o.j.createElement(s.a,{"className":"address"},"地址 ",t.address),o.j.createElement(s.a,{"className":"tags"},t.attr_value.slice(0,2).map(function(e){return o.j.createElement(s.a,{"key":e.id,"className":"tag"},e.value)})),o.j.createElement(s.a,{"className":"price"},"约",t.price_low,"元/m²"))),o.j.createElement(s.a,{"className":"btns","onClick":e.stopPro.bind(e)},o.j.createElement(s.a,{"className":"btn"},o.j.createElement(s.a,{"className":"icon wechat"},o.j.createElement(l.a,{"className":"img","src":Object(c.a)("imgs/page_index/wechat.png")})),o.j.createElement(s.a,{"className":""},"微聊")),o.j.createElement(s.a,{"className":"btn"},o.j.createElement(s.a,{"className":"icon tel"},o.j.createElement(l.a,{"className":"img","src":Object(c.a)("imgs/page_index/tel.png")})),o.j.createElement(s.a,{"className":"","onClick":c.h.bind(e,t.tel)},"电话"))))}))),o.j.createElement(s.a,{"className":"guide_1"},o.j.createElement(s.a,{"className":"guide_1_header","onClick":this.goShowRoomList.bind(this,1)},o.j.createElement(l.a,{"className":"img","src":Object(c.a)("imgs/page_index/guide_2_bg.png")})),o.j.createElement(s.a,{"className":"guide_2_list"},r[1]&&r[1].map(function(t){return o.j.createElement(s.a,{"className":"guide_2_item","key":t.id,"onClick":e.goHouseDetail.bind(e,t)},o.j.createElement(s.a,{"className":"content"},o.j.createElement(s.a,{"className":"thumb"},o.j.createElement(l.a,{"className":"img","src":Object(c.a)(t.thumb)}),o.j.createElement(s.a,{"className":"price"},"约",t.price_low,"元/m²")),o.j.createElement(s.a,{"className":"right"},o.j.createElement(s.a,{"className":"title_wrap"},o.j.createElement(s.a,{"className":"title"},t.name)),o.j.createElement(s.a,{"className":"flex_row","style":{"marginBottom":"10px"}},o.j.createElement(s.a,{"className":"tab_sell_wrap"},o.j.createElement(s.a,{"className":"tab_sell"},"已售",t.room_sell,"套"),o.j.createElement(s.a,{"className":"tab_unsell"},"未售",t.room_stock,"套"))),o.j.createElement(s.a,{"className":"address"},"地址 ",t.address),o.j.createElement(s.a,{"className":"tags"},t.attr_value.slice(0,2).map(function(e){return o.j.createElement(s.a,{"key":e.id,"className":"tag"},e.value)})))))})))),o.j.createElement(s.a,{"className":"house_list_wrap","id":"house_list_wrap"},o.j.createElement(u.e,null),o.j.createElement(s.a,{"className":"guide_1_list","style":{"minHeight":c.i}},n&&n.length?n.map(function(t){return o.j.createElement(s.a,{"onClick":e.goHouseDetail.bind(e,t),"className":"guide_1_item","key":t.id},o.j.createElement(s.a,{"className":"content"},o.j.createElement(s.a,{"className":"thumb"},o.j.createElement(l.a,{"className":"img","src":t.thumb})),o.j.createElement(s.a,{"className":"right"},o.j.createElement(s.a,{"className":"title_wrap"},o.j.createElement(s.a,{"className":"title"},t.name),o.j.createElement(s.a,{"className":"tab_sell_wrap"},o.j.createElement(s.a,{"className":"tab_sell"},"已售",t.room_sell,"套"),o.j.createElement(s.a,{"className":"tab_unsell"},"未售",t.room_stock,"套"))),o.j.createElement(s.a,{"className":"address"},"地址 ",t.address),o.j.createElement(s.a,{"className":"tags"},t.attr_value&&t.attr_value.slice(0,4).map(function(e){return o.j.createElement(s.a,{"className":"tag"},e.value)})),o.j.createElement(s.a,{"className":"price"},"约",t.money_low,"元/m²"))))}):o.j.createElement(u.a,null))))}}]),Index}())||a)||a}}]);