"use strict";(self.webpackChunkreact_native_android_widget_docs=self.webpackChunkreact_native_android_widget_docs||[]).push([[265],{3905:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>c});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function d(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},m=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},k={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,m=d(e,["components","mdxType","originalType","parentName"]),h=p(r),c=i,s=h["".concat(l,".").concat(c)]||h[c]||k[c]||a;return r?n.createElement(s,o(o({ref:t},m),{},{components:r})):n.createElement(s,o({ref:t},m))}));function c(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=h;var d={};for(var l in t)hasOwnProperty.call(t,l)&&(d[l]=t[l]);d.originalType=e,d.mdxType="string"==typeof e?e:i,o[1]=d;for(var p=2;p<a;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},6068:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>k,frontMatter:()=>a,metadata:()=>d,toc:()=>p});var n=r(7462),i=(r(7294),r(3905));const a={id:"TextWidgetStyle",title:"Interface: TextWidgetStyle",sidebar_label:"TextWidgetStyle",sidebar_position:0,custom_edit_url:null},o=void 0,d={unversionedId:"public-api/interfaces/TextWidgetStyle",id:"public-api/interfaces/TextWidgetStyle",title:"Interface: TextWidgetStyle",description:"Hierarchy",source:"@site/docs/public-api/interfaces/TextWidgetStyle.md",sourceDirName:"public-api/interfaces",slug:"/public-api/interfaces/TextWidgetStyle",permalink:"/react-native-android-widget/docs/public-api/interfaces/TextWidgetStyle",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"TextWidgetStyle",title:"Interface: TextWidgetStyle",sidebar_label:"TextWidgetStyle",sidebar_position:0,custom_edit_url:null},sidebar:"api",previous:{title:"TextWidgetProps",permalink:"/react-native-android-widget/docs/public-api/interfaces/TextWidgetProps"},next:{title:"Widget",permalink:"/react-native-android-widget/docs/public-api/interfaces/Widget"}},l={},p=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Properties",id:"properties",level:2},{value:"color",id:"color",level:3},{value:"fontSize",id:"fontsize",level:3},{value:"fontFamily",id:"fontfamily",level:3},{value:"fontStyle",id:"fontstyle",level:3},{value:"fontWeight",id:"fontweight",level:3},{value:"adjustsFontSizeToFit",id:"adjustsfontsizetofit",level:3},{value:"textAlign",id:"textalign",level:3},{value:"letterSpacing",id:"letterspacing",level:3},{value:"textShadowColor",id:"textshadowcolor",level:3},{value:"textShadowRadius",id:"textshadowradius",level:3},{value:"textShadowOffset",id:"textshadowoffset",level:3},{value:"Type declaration",id:"type-declaration",level:4},{value:"margin",id:"margin",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"marginHorizontal",id:"marginhorizontal",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"marginVertical",id:"marginvertical",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"marginTop",id:"margintop",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"marginBottom",id:"marginbottom",level:3},{value:"Inherited from",id:"inherited-from-4",level:4},{value:"marginLeft",id:"marginleft",level:3},{value:"Inherited from",id:"inherited-from-5",level:4},{value:"marginRight",id:"marginright",level:3},{value:"Inherited from",id:"inherited-from-6",level:4},{value:"padding",id:"padding",level:3},{value:"Inherited from",id:"inherited-from-7",level:4},{value:"paddingHorizontal",id:"paddinghorizontal",level:3},{value:"Inherited from",id:"inherited-from-8",level:4},{value:"paddingVertical",id:"paddingvertical",level:3},{value:"Inherited from",id:"inherited-from-9",level:4},{value:"paddingTop",id:"paddingtop",level:3},{value:"Inherited from",id:"inherited-from-10",level:4},{value:"paddingBottom",id:"paddingbottom",level:3},{value:"Inherited from",id:"inherited-from-11",level:4},{value:"paddingLeft",id:"paddingleft",level:3},{value:"Inherited from",id:"inherited-from-12",level:4},{value:"paddingRight",id:"paddingright",level:3},{value:"Inherited from",id:"inherited-from-13",level:4},{value:"height",id:"height",level:3},{value:"Inherited from",id:"inherited-from-14",level:4},{value:"width",id:"width",level:3},{value:"Inherited from",id:"inherited-from-15",level:4},{value:"backgroundColor",id:"backgroundcolor",level:3},{value:"Inherited from",id:"inherited-from-16",level:4},{value:"backgroundGradient",id:"backgroundgradient",level:3},{value:"Type declaration",id:"type-declaration-1",level:4},{value:"Inherited from",id:"inherited-from-17",level:4},{value:"borderWidth",id:"borderwidth",level:3},{value:"Inherited from",id:"inherited-from-18",level:4},{value:"borderTopWidth",id:"bordertopwidth",level:3},{value:"Inherited from",id:"inherited-from-19",level:4},{value:"borderBottomWidth",id:"borderbottomwidth",level:3},{value:"Inherited from",id:"inherited-from-20",level:4},{value:"borderLeftWidth",id:"borderleftwidth",level:3},{value:"Inherited from",id:"inherited-from-21",level:4},{value:"borderRightWidth",id:"borderrightwidth",level:3},{value:"Inherited from",id:"inherited-from-22",level:4},{value:"borderColor",id:"bordercolor",level:3},{value:"Inherited from",id:"inherited-from-23",level:4},{value:"borderTopColor",id:"bordertopcolor",level:3},{value:"Inherited from",id:"inherited-from-24",level:4},{value:"borderBottomColor",id:"borderbottomcolor",level:3},{value:"Inherited from",id:"inherited-from-25",level:4},{value:"borderLeftColor",id:"borderleftcolor",level:3},{value:"Inherited from",id:"inherited-from-26",level:4},{value:"borderRightColor",id:"borderrightcolor",level:3},{value:"Inherited from",id:"inherited-from-27",level:4},{value:"borderRadius",id:"borderradius",level:3},{value:"Inherited from",id:"inherited-from-28",level:4},{value:"borderTopLeftRadius",id:"bordertopleftradius",level:3},{value:"Inherited from",id:"inherited-from-29",level:4},{value:"borderTopRightRadius",id:"bordertoprightradius",level:3},{value:"Inherited from",id:"inherited-from-30",level:4},{value:"borderBottomLeftRadius",id:"borderbottomleftradius",level:3},{value:"Inherited from",id:"inherited-from-31",level:4},{value:"borderBottomRightRadius",id:"borderbottomrightradius",level:3},{value:"Inherited from",id:"inherited-from-32",level:4},{value:"borderStyle",id:"borderstyle",level:3},{value:"Inherited from",id:"inherited-from-33",level:4},{value:"rotation",id:"rotation",level:3},{value:"Inherited from",id:"inherited-from-34",level:4}],m={toc:p};function k(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},(0,i.kt)("inlineCode",{parentName:"a"},"CommonStyleProps"))),(0,i.kt)("p",{parentName:"li"},"\u21b3 ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"TextWidgetStyle"))))),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"color"},"color"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"color"),": ",(0,i.kt)("a",{parentName:"p",href:"../#colorprop"},(0,i.kt)("inlineCode",{parentName:"a"},"ColorProp"))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"fontsize"},"fontSize"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"fontSize"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"fontfamily"},"fontFamily"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"fontFamily"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"fontstyle"},"fontStyle"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"fontStyle"),": ",(0,i.kt)("inlineCode",{parentName:"p"},'"normal"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"italic"')),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"fontweight"},"fontWeight"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"fontWeight"),": ",(0,i.kt)("inlineCode",{parentName:"p"},'"normal"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"bold"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"100"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"200"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"300"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"400"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"500"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"600"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"700"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"800"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"900"')),(0,i.kt)("p",null,"Specifies font weight. The values 'normal' and 'bold' are supported\nfor most fonts. Not all fonts have a variant for each of the numeric\nvalues, in that case the closest one is chosen."),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"adjustsfontsizetofit"},"adjustsFontSizeToFit"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"adjustsFontSizeToFit"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"textalign"},"textAlign"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"textAlign"),": ",(0,i.kt)("inlineCode",{parentName:"p"},'"center"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"right"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"left"')),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"letterspacing"},"letterSpacing"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"letterSpacing"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"textshadowcolor"},"textShadowColor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"textShadowColor"),": ",(0,i.kt)("a",{parentName:"p",href:"../#colorprop"},(0,i.kt)("inlineCode",{parentName:"a"},"ColorProp"))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"textshadowradius"},"textShadowRadius"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"textShadowRadius"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"textshadowoffset"},"textShadowOffset"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"textShadowOffset"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Object")),(0,i.kt)("h4",{id:"type-declaration"},"Type declaration"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"height")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"width")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number"))))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"margin"},"margin"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"margin"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#margin"},"margin")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"marginhorizontal"},"marginHorizontal"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"marginHorizontal"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#marginhorizontal"},"marginHorizontal")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"marginvertical"},"marginVertical"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"marginVertical"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#marginvertical"},"marginVertical")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"margintop"},"marginTop"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"marginTop"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#margintop"},"marginTop")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"marginbottom"},"marginBottom"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"marginBottom"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-4"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#marginbottom"},"marginBottom")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"marginleft"},"marginLeft"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"marginLeft"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-5"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#marginleft"},"marginLeft")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"marginright"},"marginRight"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"marginRight"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-6"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#marginright"},"marginRight")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"padding"},"padding"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"padding"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-7"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#padding"},"padding")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"paddinghorizontal"},"paddingHorizontal"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"paddingHorizontal"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-8"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#paddinghorizontal"},"paddingHorizontal")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"paddingvertical"},"paddingVertical"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"paddingVertical"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-9"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#paddingvertical"},"paddingVertical")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"paddingtop"},"paddingTop"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"paddingTop"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-10"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#paddingtop"},"paddingTop")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"paddingbottom"},"paddingBottom"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"paddingBottom"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-11"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#paddingbottom"},"paddingBottom")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"paddingleft"},"paddingLeft"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"paddingLeft"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-12"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#paddingleft"},"paddingLeft")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"paddingright"},"paddingRight"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"paddingRight"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-13"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#paddingright"},"paddingRight")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"height"},"height"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"height"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"wrap_content"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"match_parent"')),(0,i.kt)("h4",{id:"inherited-from-14"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#height"},"height")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"width"},"width"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"width"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"wrap_content"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"match_parent"')),(0,i.kt)("h4",{id:"inherited-from-15"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#width"},"width")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"backgroundcolor"},"backgroundColor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"backgroundColor"),": ",(0,i.kt)("a",{parentName:"p",href:"../#colorprop"},(0,i.kt)("inlineCode",{parentName:"a"},"ColorProp"))),(0,i.kt)("h4",{id:"inherited-from-16"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#backgroundcolor"},"backgroundColor")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"backgroundgradient"},"backgroundGradient"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"backgroundGradient"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Object")),(0,i.kt)("h4",{id:"type-declaration-1"},"Type declaration"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"from")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../#colorprop"},(0,i.kt)("inlineCode",{parentName:"a"},"ColorProp")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"to")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../#colorprop"},(0,i.kt)("inlineCode",{parentName:"a"},"ColorProp")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"orientation")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},'"TOP_BOTTOM"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"td"},'"TR_BL"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"td"},'"RIGHT_LEFT"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"td"},'"BR_TL"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"td"},'"BOTTOM_TOP"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"td"},'"BL_TR"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"td"},'"LEFT_RIGHT"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"td"},'"TL_BR"'))))),(0,i.kt)("h4",{id:"inherited-from-17"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#backgroundgradient"},"backgroundGradient")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"borderwidth"},"borderWidth"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"borderWidth"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-18"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#borderwidth"},"borderWidth")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"bordertopwidth"},"borderTopWidth"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"borderTopWidth"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-19"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#bordertopwidth"},"borderTopWidth")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"borderbottomwidth"},"borderBottomWidth"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"borderBottomWidth"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-20"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#borderbottomwidth"},"borderBottomWidth")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"borderleftwidth"},"borderLeftWidth"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"borderLeftWidth"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-21"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#borderleftwidth"},"borderLeftWidth")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"borderrightwidth"},"borderRightWidth"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"borderRightWidth"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-22"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#borderrightwidth"},"borderRightWidth")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"bordercolor"},"borderColor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"borderColor"),": ",(0,i.kt)("a",{parentName:"p",href:"../#colorprop"},(0,i.kt)("inlineCode",{parentName:"a"},"ColorProp"))),(0,i.kt)("h4",{id:"inherited-from-23"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#bordercolor"},"borderColor")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"bordertopcolor"},"borderTopColor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"borderTopColor"),": ",(0,i.kt)("a",{parentName:"p",href:"../#colorprop"},(0,i.kt)("inlineCode",{parentName:"a"},"ColorProp"))),(0,i.kt)("h4",{id:"inherited-from-24"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#bordertopcolor"},"borderTopColor")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"borderbottomcolor"},"borderBottomColor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"borderBottomColor"),": ",(0,i.kt)("a",{parentName:"p",href:"../#colorprop"},(0,i.kt)("inlineCode",{parentName:"a"},"ColorProp"))),(0,i.kt)("h4",{id:"inherited-from-25"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#borderbottomcolor"},"borderBottomColor")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"borderleftcolor"},"borderLeftColor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"borderLeftColor"),": ",(0,i.kt)("a",{parentName:"p",href:"../#colorprop"},(0,i.kt)("inlineCode",{parentName:"a"},"ColorProp"))),(0,i.kt)("h4",{id:"inherited-from-26"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#borderleftcolor"},"borderLeftColor")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"borderrightcolor"},"borderRightColor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"borderRightColor"),": ",(0,i.kt)("a",{parentName:"p",href:"../#colorprop"},(0,i.kt)("inlineCode",{parentName:"a"},"ColorProp"))),(0,i.kt)("h4",{id:"inherited-from-27"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#borderrightcolor"},"borderRightColor")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"borderradius"},"borderRadius"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"borderRadius"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-28"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#borderradius"},"borderRadius")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"bordertopleftradius"},"borderTopLeftRadius"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"borderTopLeftRadius"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-29"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#bordertopleftradius"},"borderTopLeftRadius")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"bordertoprightradius"},"borderTopRightRadius"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"borderTopRightRadius"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-30"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#bordertoprightradius"},"borderTopRightRadius")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"borderbottomleftradius"},"borderBottomLeftRadius"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"borderBottomLeftRadius"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-31"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#borderbottomleftradius"},"borderBottomLeftRadius")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"borderbottomrightradius"},"borderBottomRightRadius"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"borderBottomRightRadius"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-32"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#borderbottomrightradius"},"borderBottomRightRadius")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"borderstyle"},"borderStyle"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"borderStyle"),": ",(0,i.kt)("inlineCode",{parentName:"p"},'"solid"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"dotted"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"dashed"')),(0,i.kt)("h4",{id:"inherited-from-33"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#borderstyle"},"borderStyle")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"rotation"},"rotation"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"rotation"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from-34"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps"},"CommonStyleProps"),".",(0,i.kt)("a",{parentName:"p",href:"/react-native-android-widget/docs/public-api/interfaces/CommonStyleProps#rotation"},"rotation")))}k.isMDXComponent=!0}}]);