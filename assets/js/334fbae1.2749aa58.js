"use strict";(self.webpackChunkreact_native_android_widget_docs=self.webpackChunkreact_native_android_widget_docs||[]).push([[6998],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var d=r.createContext({}),p=function(e){var t=r.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(d.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,d=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),f=i,m=u["".concat(d,".").concat(f)]||u[f]||s[f]||a;return n?r.createElement(m,o(o({ref:t},c),{},{components:n})):r.createElement(m,o({ref:t},c))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=u;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var p=2;p<a;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},6105:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>s,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var r=n(7462),i=(n(7294),n(3905));const a={id:"WidgetConfigurationScreenProps",title:"Interface: WidgetConfigurationScreenProps",sidebar_label:"WidgetConfigurationScreenProps",sidebar_position:0,custom_edit_url:null},o=void 0,l={unversionedId:"public-api/interfaces/WidgetConfigurationScreenProps",id:"public-api/interfaces/WidgetConfigurationScreenProps",title:"Interface: WidgetConfigurationScreenProps",description:"Properties",source:"@site/docs/public-api/interfaces/WidgetConfigurationScreenProps.md",sourceDirName:"public-api/interfaces",slug:"/public-api/interfaces/WidgetConfigurationScreenProps",permalink:"/react-native-android-widget/docs/public-api/interfaces/WidgetConfigurationScreenProps",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"WidgetConfigurationScreenProps",title:"Interface: WidgetConfigurationScreenProps",sidebar_label:"WidgetConfigurationScreenProps",sidebar_position:0,custom_edit_url:null},sidebar:"api",previous:{title:"Widget",permalink:"/react-native-android-widget/docs/public-api/interfaces/Widget"},next:{title:"WidgetInfo",permalink:"/react-native-android-widget/docs/public-api/interfaces/WidgetInfo"}},d={},p=[{value:"Properties",id:"properties",level:2},{value:"widgetInfo",id:"widgetinfo",level:3},{value:"renderWidget",id:"renderwidget",level:3},{value:"Type declaration",id:"type-declaration",level:4},{value:"Parameters",id:"parameters",level:5},{value:"Returns",id:"returns",level:5},{value:"setResult",id:"setresult",level:3},{value:"Type declaration",id:"type-declaration-1",level:4},{value:"Parameters",id:"parameters-1",level:5},{value:"Returns",id:"returns-1",level:5}],c={toc:p};function s(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"widgetinfo"},"widgetInfo"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"widgetInfo"),": ",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/WidgetInfo"},(0,i.kt)("inlineCode",{parentName:"a"},"WidgetInfo"))),(0,i.kt)("p",null,"Information about the widget being configured."),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"renderwidget"},"renderWidget"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"renderWidget"),": (",(0,i.kt)("inlineCode",{parentName:"p"},"widgetComponent"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Element"),") => ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"type-declaration"},"Type declaration"),(0,i.kt)("p",null,"\u25b8 (",(0,i.kt)("inlineCode",{parentName:"p"},"widgetComponent"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Function that can be called with the Widget JSX to render"),(0,i.kt)("h5",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"widgetComponent")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Element"))))),(0,i.kt)("h5",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"setresult"},"setResult"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"setResult"),": (",(0,i.kt)("inlineCode",{parentName:"p"},"result"),": ",(0,i.kt)("inlineCode",{parentName:"p"},'"ok"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"cancel"'),") => ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"type-declaration-1"},"Type declaration"),(0,i.kt)("p",null,"\u25b8 (",(0,i.kt)("inlineCode",{parentName:"p"},"result"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"This must be called after finishing with configuration.\n'ok' means the widget is configured and can be added,\n'cancel' means the configuration process is canceled and the widget will be removed if this is the first time configuring it"),(0,i.kt)("h5",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"result")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},'"ok"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"td"},'"cancel"'))))),(0,i.kt)("h5",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")))}s.isMDXComponent=!0}}]);