"use strict";(self.webpackChunkreact_native_android_widget_docs=self.webpackChunkreact_native_android_widget_docs||[]).push([[6117],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var i=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,i,n=function(e,t){if(null==e)return{};var r,i,n={},a=Object.keys(e);for(i=0;i<a.length;i++)r=a[i],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)r=a[i],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var d=i.createContext({}),c=function(e){var t=i.useContext(d),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=c(e.components);return i.createElement(d.Provider,{value:t},e.children)},g={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},l=i.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,d=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),l=c(r),m=n,u=l["".concat(d,".").concat(m)]||l[m]||g[m]||a;return r?i.createElement(u,o(o({ref:t},p),{},{components:r})):i.createElement(u,o({ref:t},p))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,o=new Array(a);o[0]=l;var s={};for(var d in t)hasOwnProperty.call(t,d)&&(s[d]=t[d]);s.originalType=e,s.mdxType="string"==typeof e?e:n,o[1]=s;for(var c=2;c<a;c++)o[c]=r[c];return i.createElement.apply(null,o)}return i.createElement.apply(null,r)}l.displayName="MDXCreateElement"},2485:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>g,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var i=r(7462),n=(r(7294),r(3905));const a={sidebar_position:3},o="ImageWidget",s={unversionedId:"primitives/image-widget",id:"primitives/image-widget",title:"ImageWidget",description:"Widget for displaying different types of images, including network images, data:/image images, and static resources.",source:"@site/docs/primitives/image-widget.md",sourceDirName:"primitives",slug:"/primitives/image-widget",permalink:"/react-native-android-widget/docs/primitives/image-widget",draft:!1,editUrl:"https://github.com/sAleksovski/react-native-android-widget/tree/master/docs/docs/primitives/image-widget.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"default",previous:{title:"OverlapWidget",permalink:"/react-native-android-widget/docs/primitives/overlap-widget"},next:{title:"TextWidget",permalink:"/react-native-android-widget/docs/primitives/text-widget"}},d={},c=[{value:"Usage",id:"usage",level:2},{value:"Props",id:"props",level:2}],p={toc:c};function g(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,i.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"imagewidget"},"ImageWidget"),(0,n.kt)("p",null,"Widget for displaying different types of images, including network images, ",(0,n.kt)("inlineCode",{parentName:"p"},"data:/image")," images, and static resources."),(0,n.kt)("h2",{id:"usage"},"Usage"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-tsx"},"import { FlexWidget, ImageWidget } from 'react-native-android-widget';\n\nexport function MyWidget() {\n  return (\n    <FlexWidget>\n      <ImageWidget\n        image={require('../assets/image-file.jpg')}\n        imageWidth={88}\n        imageHeight={88}\n      />\n    </FlexWidget>\n  );\n}\n")),(0,n.kt)("h2",{id:"props"},"Props"),(0,n.kt)("p",null,"Check the props in the ",(0,n.kt)("a",{parentName:"p",href:"/docs/public-api/interfaces/ImageWidgetProps"},"Public API")," documentation"))}g.isMDXComponent=!0}}]);