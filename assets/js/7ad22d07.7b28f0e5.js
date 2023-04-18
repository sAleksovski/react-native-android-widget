"use strict";(self.webpackChunkreact_native_android_widget_docs=self.webpackChunkreact_native_android_widget_docs||[]).push([[5073],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=r.createContext({}),l=function(e){var t=r.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(d.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,d=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=l(n),m=a,f=u["".concat(d,".").concat(m)]||u[m]||s[m]||i;return n?r.createElement(f,o(o({ref:t},c),{},{components:n})):r.createElement(f,o({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=u;var p={};for(var d in t)hasOwnProperty.call(t,d)&&(p[d]=t[d]);p.originalType=e,p.mdxType="string"==typeof e?e:a,o[1]=p;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},2288:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>s,frontMatter:()=>i,metadata:()=>p,toc:()=>l});var r=n(7462),a=(n(7294),n(3905));const i={id:"RequestWidgetUpdateProps",title:"Interface: RequestWidgetUpdateProps",sidebar_label:"RequestWidgetUpdateProps",sidebar_position:0,custom_edit_url:null},o=void 0,p={unversionedId:"public-api/interfaces/RequestWidgetUpdateProps",id:"public-api/interfaces/RequestWidgetUpdateProps",title:"Interface: RequestWidgetUpdateProps",description:"Properties",source:"@site/docs/public-api/interfaces/RequestWidgetUpdateProps.md",sourceDirName:"public-api/interfaces",slug:"/public-api/interfaces/RequestWidgetUpdateProps",permalink:"/react-native-android-widget/docs/public-api/interfaces/RequestWidgetUpdateProps",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"RequestWidgetUpdateProps",title:"Interface: RequestWidgetUpdateProps",sidebar_label:"RequestWidgetUpdateProps",sidebar_position:0,custom_edit_url:null},sidebar:"api",previous:{title:"PaddingStyleProps",permalink:"/react-native-android-widget/docs/public-api/interfaces/PaddingStyleProps"},next:{title:"ScreenInfo",permalink:"/react-native-android-widget/docs/public-api/interfaces/ScreenInfo"}},d={},l=[{value:"Properties",id:"properties",level:2},{value:"widgetName",id:"widgetname",level:3},{value:"renderWidget",id:"renderwidget",level:3},{value:"Type declaration",id:"type-declaration",level:4},{value:"Parameters",id:"parameters",level:5},{value:"Returns",id:"returns",level:5},{value:"widgetNotFound",id:"widgetnotfound",level:3},{value:"Type declaration",id:"type-declaration-1",level:4},{value:"Returns",id:"returns-1",level:5}],c={toc:l};function s(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)("h3",{id:"widgetname"},"widgetName"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"widgetName"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("p",null,"The name of the widget to update"),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"renderwidget"},"renderWidget"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"renderWidget"),": (",(0,a.kt)("inlineCode",{parentName:"p"},"props"),": ",(0,a.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/WidgetInfo"},(0,a.kt)("inlineCode",{parentName:"a"},"WidgetInfo")),") => ",(0,a.kt)("inlineCode",{parentName:"p"},"Element")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"Element"),">"),(0,a.kt)("h4",{id:"type-declaration"},"Type declaration"),(0,a.kt)("p",null,"\u25b8 (",(0,a.kt)("inlineCode",{parentName:"p"},"props"),"): ",(0,a.kt)("inlineCode",{parentName:"p"},"Element")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"Element"),">"),(0,a.kt)("p",null,"Callback function that will be called with ",(0,a.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/WidgetInfo"},"WidgetInfo"),"\nIt should return the JSX of the updated widget"),(0,a.kt)("h5",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"props")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("a",{parentName:"td",href:"/react-native-android-widget/docs/public-api/interfaces/WidgetInfo"},(0,a.kt)("inlineCode",{parentName:"a"},"WidgetInfo")))))),(0,a.kt)("h5",{id:"returns"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Element")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"Element"),">"),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"widgetnotfound"},"widgetNotFound"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"widgetNotFound"),": () => ",(0,a.kt)("inlineCode",{parentName:"p"},"void")),(0,a.kt)("h4",{id:"type-declaration-1"},"Type declaration"),(0,a.kt)("p",null,"\u25b8 (): ",(0,a.kt)("inlineCode",{parentName:"p"},"void")),(0,a.kt)("p",null,"Callback function that will be called if no widgets are added on the home screen\nIt can be used to clean up background tasks that update the widget periodically"),(0,a.kt)("h5",{id:"returns-1"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"void")))}s.isMDXComponent=!0}}]);