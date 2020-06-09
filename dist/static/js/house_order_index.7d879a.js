(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"187":function(e,t,n){var o=n(188);"string"==typeof o&&(o=[[e.i,o,""]]);var r={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};n(31)(o,r);o.locals&&(e.exports=o.locals)},"188":function(e,t,n){(t=n(30)(!1)).push([e.i,"input {\n  display: block;\n  height: 24px;\n  text-align: inherit;\n  text-overflow: clip;\n  overflow: hidden;\n  white-space: nowrap;\n}",""]),e.exports=t},"316":function(e,t,n){"use strict";var o=n(2),r=n(11),a=n.n(r),i=n(184),l=n.n(i),c=n(20),s=(n(18),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}());var u=function(e){function Label(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Label),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Label.__proto__||Object.getPrototypeOf(Label)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Label,o["j"].Component),s(Label,[{"key":"render","value":function render(){var e=function _objectWithoutProperties(e,t){var n={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n}(this.props,[]);return o.j.createElement("label",e,this.props.children)}}]),Label}(),p=n(32),f=(n(187),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}),d=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();function getTrueType(e,t,n){if(!e)throw new Error("unexpected type");return"search"===t&&(e="search"),n&&(e="password"),"digit"===e&&(e="number"),e}var m=function(e){function Input(){!function input_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Input);var e=function input_possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Input.__proto__||Object.getPrototypeOf(Input)).apply(this,arguments));return e.onInput=e.onInput.bind(e),e.onFocus=e.onFocus.bind(e),e.onBlur=e.onBlur.bind(e),e.onKeyDown=e.onKeyDown.bind(e),e.handleComposition=e.handleComposition.bind(e),e.isOnComposition=!1,e.onInputExcuted=!1,e}return function input_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Input,o["j"].Component),d(Input,[{"key":"componentDidMount","value":function componentDidMount(){"file"===this.props.type&&this.inputRef.addEventListener("change",this.onInput)}},{"key":"componentWillUnmount","value":function componentWillUnmount(){"file"===this.props.type&&this.inputRef.removeEventListener("change",this.onInput)}},{"key":"onInput","value":function onInput(e){var t=this.props,n=t.type,o=t.maxLength,r=t.confirmType,a=t.password,i=t.onInput,onInput=void 0===i?"":i,l=t.onChange,c=void 0===l?"":l;if(!this.isOnComposition&&!this.onInputExcuted){var s=e.target.value,u=getTrueType(n,r,a);if(this.onInputExcuted=!0,"number"===u&&s&&o<=s.length&&(s=s.substring(0,o),e.target.value=s),Object.defineProperty(e,"detail",{"enumerable":!0,"value":{"value":s}}),!(["number","file"].indexOf(u)>=0)){var p=e.target.selectionEnd;setTimeout(function(){e.target.selectionStart=p,e.target.selectionEnd=p})}if(c)return c(e);if(onInput)return onInput(e)}}},{"key":"onFocus","value":function onFocus(e){var onFocus=this.props.onFocus;this.onInputExcuted=!1,Object.defineProperty(e,"detail",{"enumerable":!0,"value":{"value":e.target.value}}),onFocus&&onFocus(e)}},{"key":"onBlur","value":function onBlur(e){var onBlur=this.props.onBlur;Object.defineProperty(e,"detail",{"enumerable":!0,"value":{"value":e.target.value}}),onBlur&&onBlur(e)}},{"key":"onKeyDown","value":function onKeyDown(e){var t=this.props,n=t.onConfirm,onKeyDown=t.onKeyDown;this.onInputExcuted=!1,onKeyDown&&onKeyDown(e),13===e.keyCode&&n&&(Object.defineProperty(e,"detail",{"enumerable":!0,"value":{"value":e.target.value}}),n(e))}},{"key":"handleComposition","value":function handleComposition(e){e.target instanceof HTMLInputElement&&("compositionend"===e.type?(this.isOnComposition=!1,this.onInputExcuted=!1,this.onInput(e)):this.isOnComposition=!0)}},{"key":"render","value":function render(){var e=this,t=this.props,n=t.className,r=void 0===n?"":n,i=t.placeholder,l=t.type,c=void 0===l?"text":l,s=t.password,u=t.disabled,d=t.maxLength,m=t.confirmType,h=void 0===m?"":m,b=t.focus,y=void 0!==b&&b,v=t.value,g=a()("weui-input",r),_=Object(p.a)(this.props,["className","placeholder","disabled","max","onChange","onFocus","onBlur","type","focus"]);return"value"in this.props&&(_.value=function fixControlledValue(e){return void 0===e||null===e?"":e}(v)),o.j.createElement("input",f({"ref":function ref(t){e.inputRef=t}},_,{"className":g,"placeholder":i,"disabled":u,"maxlength":d,"onInput":this.onInput,"onFocus":this.onFocus,"onBlur":this.onBlur,"autofocus":y,"onKeyDown":this.onKeyDown,"type":getTrueType(c,h,s),"onCompositionStart":this.handleComposition,"onCompositionEnd":this.handleComposition}))}}]),Input}();m.defaultProps={"type":"text"};var h=m,b=n(402),y=n(185);n.d(t,"a",function(){return g});var v=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var g=function(e){function AtInput(){!function components_input_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtInput);var e=function components_input_possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtInput.__proto__||Object.getPrototypeOf(AtInput)).apply(this,arguments));return e.onInput=function(t){e.props.onChange(t.target.value,t)},e.onFocus=function(t){e.props.onFocus&&e.props.onFocus(t.target.value,t)},e.onBlur=function(t){e.props.onBlur&&e.props.onBlur(t.target.value,t),e.props.onChange(t.target.value,t)},e.onConfirm=function(t){e.props.onConfirm&&e.props.onConfirm(t.target.value,t)},e.onClick=function(){e.props.editable||e.props.onClick&&e.props.onClick()},e.clearValue=function(t){setTimeout(function(){e.props.onChange("",t)},50)},e.onErrorClick=function(){return e.props.onErrorClick&&e.props.onErrorClick()},e}return function components_input_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtInput,y["a"]),v(AtInput,[{"key":"render","value":function render(){var e=this.props,t=e.className,n=e.customStyle,r=e.name,i=e.cursorSpacing,l=e.confirmType,s=e.cursor,p=e.selectionStart,f=e.selectionEnd,d=e.adjustPosition,m=e.border,y=e.title,v=e.error,g=e.clear,_=e.placeholder,j=e.placeholderStyle,w=e.placeholderClass,C=e.autoFocus,O=e.focus,E=e.value,I=e.required,x=function getInputProps(e){var t={"type":e.type,"maxLength":e.maxLength,"disabled":e.disabled,"password":!1};switch(t.type){case"phone":t.type="number",t.maxLength=11;break;case"password":t.type="text",t.password=!0}return e.disabled||e.editable||(t.disabled=!0),t}(this.props),T=x.type,k=x.maxLength,P=x.disabled,N=x.password,S=a()("at-input",{"at-input--without-border":!m},t),D=a()("at-input__container",{"at-input--error":v,"at-input--disabled":P}),F=a()("at-input__overlay",{"at-input__overlay--hidden":!P}),B=a()("placeholder",w);return o.j.createElement(c.a,{"className":S,"style":n},o.j.createElement(c.a,{"className":D},o.j.createElement(c.a,{"className":F,"onClick":this.onClick}),y&&o.j.createElement(u,{"className":"at-input__title "+(I&&"at-input__title--required"),"for":r},y),o.j.createElement(h,{"className":"at-input__input","id":r,"name":r,"type":T,"password":N,"placeholderStyle":j,"placeholderClass":B,"placeholder":_,"cursorSpacing":i,"maxLength":k,"autoFocus":C,"focus":O,"value":E,"confirmType":l,"cursor":s,"selectionStart":p,"selectionEnd":f,"adjustPosition":d,"onInput":this.onInput,"onFocus":this.onFocus,"onBlur":this.onBlur,"onConfirm":this.onConfirm}),g&&E&&o.j.createElement(c.a,{"className":"at-input__icon","onTouchEnd":this.clearValue},o.j.createElement(b.a,{"className":"at-icon at-icon-close-circle at-input__icon-close"})),v&&o.j.createElement(c.a,{"className":"at-input__icon","onTouchStart":this.onErrorClick},o.j.createElement(b.a,{"className":"at-icon at-icon-alert-circle at-input__icon-alert"})),o.j.createElement(c.a,{"className":"at-input__children"},this.props.children)))}}]),AtInput}();g.defaultProps={"className":"","customStyle":"","value":"","name":"","placeholder":"","placeholderStyle":"","placeholderClass":"","title":"","cursorSpacing":50,"confirmType":"done","cursor":0,"selectionStart":-1,"selectionEnd":-1,"adjustPosition":!0,"maxLength":140,"type":"text","disabled":!1,"border":!0,"editable":!0,"error":!1,"clear":!1,"autoFocus":!1,"focus":!1,"required":!1,"onChange":function onChange(){},"onFocus":function onFocus(){},"onBlur":function onBlur(){},"onConfirm":function onConfirm(){},"onErrorClick":function onErrorClick(){},"onClick":function onClick(){}},g.propTypes={"className":l.a.oneOfType([l.a.string,l.a.array]),"customStyle":l.a.oneOfType([l.a.string,l.a.object]),"value":l.a.oneOfType([l.a.string,l.a.number]),"name":l.a.string,"placeholder":l.a.string,"placeholderStyle":l.a.string,"placeholderClass":l.a.string,"title":l.a.string,"confirmType":l.a.string,"cursor":l.a.oneOfType([l.a.string,l.a.number]),"selectionStart":l.a.oneOfType([l.a.string,l.a.number]),"selectionEnd":l.a.oneOfType([l.a.string,l.a.number]),"adjustPosition":l.a.bool,"cursorSpacing":l.a.oneOfType([l.a.string,l.a.number]),"maxLength":l.a.oneOfType([l.a.string,l.a.number]),"type":l.a.string,"disabled":l.a.bool,"border":l.a.bool,"editable":l.a.bool,"error":l.a.bool,"clear":l.a.bool,"autoFocus":l.a.bool,"focus":l.a.bool,"onChange":l.a.func,"onFocus":l.a.func,"onBlur":l.a.func,"onConfirm":l.a.func,"onErrorClick":l.a.func,"onClick":l.a.func,"required":l.a.bool}},"384":function(e,t,n){},"437":function(e,t,n){"use strict";n.r(t);var o,r=n(2),a=n(28),i=n(0),l=void 0,c=void 0,s=function pageScrollTo(e){var t=e.scrollTop,n=e.duration,o=void 0===n?300:n,r=e.success,a=e.fail,s=e.complete;return new Promise(function(e,n){try{if(void 0===t)throw Error('"scrollTop" is required');var u=document.querySelector(".taro-tabbar__panel")||window;l||(l=u===window?function scrollFunc(e){if(void 0===e)return window.pageYOffset;window.scrollTo(0,e)}:function scrollFunc(e){if(void 0===e)return u.scrollTop;u.scrollTop=e});var p=l(),f=t-p,d=o/17,m=Object(i.f)(i.c,d);!function scroll(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=p+f*m(t);if(l(n),t<d)c&&clearTimeout(c),c=setTimeout(function(){scroll(t+1)},17);else{var o={"errMsg":"pageScrollTo:ok"};r&&r(o),s&&s(o),e(o)}}()}catch(e){var h={"errMsg":"pageScrollTo:fail "+e.message};a&&a(h),s&&s(h),n(h)}})},u=n(4),p=n(20),f=n(403),d=n(316),m=n(183),h=n(29),b=(n(384),n(3)),y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},v=function get(e,t,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,t);if(void 0===o){var r=Object.getPrototypeOf(e);return null===r?void 0:get(r,t,n)}if("value"in o)return o.value;var a=o.get;return void 0!==a?a.call(n):void 0},g=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();t.default=Object(h.b)(function(e){return{"orderUserInfo":e.home.orderUserInfo,"fangyuanDetail":e.home.fangyuanDetail,"about":e.personal.about}})(o=Object(m.d)()(o=function(e){function Index(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Index);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Index.__proto__||Object.getPrototypeOf(Index)).call(this,e));return t.config={"navigationBarTitleText":"提交购房订单"},t.onSubmit=function(){var e=t.props.orderUserInfo;/^\s*$/.test(e.name)?Object(a.a)({"icon":"none","title":"请输入您的姓名"}):/^\s*$/.test(e.idCardNum)?Object(a.a)({"icon":"none","title":"请输入正确的身份证号码"}):/^\s*$/.test(e.mobile)?Object(a.a)({"icon":"none","title":"请输入正确的手机号"}):t.props.dispatch({"type":"home/makeOrderSaga"})},t.handleChange=function(e,n){var o=t.props.orderUserInfo;o[n.target.name]=e,t.props.dispatch({"type":"home/save","payload":{"orderUserInfo":y({},o)}})},t.scollToTop=function(){s({"scrollTop":0})},t.oldTab=null,t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Index,u["a"].Component),g(Index,[{"key":"componentDidMount","value":function componentDidMount(){this.props.dispatch({"type":"personal/getAboutSaga"}),this.props.dispatch({"type":"home/getFangyuanDetailSaga","payload":{"id":Object(b.c)("id")}})}}]),g(Index,[{"key":"render","value":function render(){var e=this.props,t=e.orderUserInfo,n=e.fangyuanDetail,o=e.about;return console.log("fangyuanDetail",n),r.j.createElement(p.a,{"className":"page_house_order"},r.j.createElement(p.a,{"className":"app_common_header"},r.j.createElement(p.a,{"className":"left","onClick":u.a.navigateBack},r.j.createElement(p.a,{"className":"back"})),r.j.createElement(p.a,{"className":"title"},"提交购房订单"),r.j.createElement(p.a,{"className":"right"})),r.j.createElement(p.a,{"className":"detail"},r.j.createElement(p.a,{"className":"thumb_wrap"},r.j.createElement(p.a,{"className":"thumb"},n.thumb&&r.j.createElement(f.a,{"className":"img","src":Object(b.a)(n.thumb)}))),r.j.createElement(p.a,{"className":"right"},r.j.createElement(p.a,{"className":"title"},n.name),r.j.createElement(p.a,{"className":"price_wrap"},r.j.createElement(p.a,{"className":"price"},"￥",n.public_money,"元"),r.j.createElement(p.a,{"className":"space"},n.area,"m²")))),r.j.createElement(p.a,{"className":"user_wrap"},r.j.createElement(p.a,{"className":"user_title"},"签约人信息"),r.j.createElement(d.a,{"name":"name","title":"姓名","type":"text","placeholder":"请输入姓名","value":t.name,"onChange":this.handleChange}),r.j.createElement(d.a,{"name":"idCardNum","title":"身份证号码","type":"text","placeholder":"请输入身份证号码","value":t.idCardNum,"onChange":this.handleChange}),r.j.createElement(d.a,{"name":"mobile","title":"手机号码","type":"text","placeholder":"请输入手机号码","value":t.mobile,"onChange":this.handleChange}),r.j.createElement(p.a,{"className":"btn_wrap"},r.j.createElement(p.a,{"className":"price"},"诚意金：",n.book_money,"元"),r.j.createElement(p.a,{"className":"btn","onClick":this.onSubmit},"提交订单"))),r.j.createElement(p.a,{"className":"about"},r.j.createElement(p.a,{"className":"title"},"购房须知"),r.j.createElement(p.a,{"dangerouslySetInnerHTML":{"__html":o.order}}),r.j.createElement(p.a,{"className":"to_top_btn","onClick":this.scollToTop},"收起")))}},{"key":"componentDidShow","value":function componentDidShow(){v(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidShow",this)&&v(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){v(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidHide",this)&&v(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidHide",this).call(this)}}]),Index}())||o)||o}}]);