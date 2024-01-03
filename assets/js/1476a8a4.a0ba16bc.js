"use strict";(self.webpackChunkreact_native_android_widget_docs=self.webpackChunkreact_native_android_widget_docs||[]).push([[5087],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(r),m=i,f=u["".concat(c,".").concat(m)]||u[m]||d[m]||a;return r?n.createElement(f,o(o({ref:t},p),{},{components:r})):n.createElement(f,o({ref:t},p))}));function m(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var l=2;l<a;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},251:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var n=r(7462),i=(r(7294),r(3905));const a={sidebar_position:7,sidebar_label:"Limitations"},o="Limitations",s={unversionedId:"limitations",id:"limitations",title:"Limitations",description:"There are some limitations to this library.",source:"@site/docs/limitations.md",sourceDirName:".",slug:"/limitations",permalink:"/react-native-android-widget/docs/limitations",draft:!1,editUrl:"https://github.com/sAleksovski/react-native-android-widget/tree/master/docs/docs/limitations.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7,sidebar_label:"Limitations"},sidebar:"default",previous:{title:"Demo",permalink:"/react-native-android-widget/docs/demo"}},c={},l=[],p={toc:l};function d(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"limitations"},"Limitations"),(0,i.kt)("p",null,"There are some limitations to this library."),(0,i.kt)("p",null,"We cannot render React Native views directly to the widget.\nWhat this library does is render the React Native views to an image, and then show that image in the widget.\nFor it to look good, we need to know the ",(0,i.kt)("strong",{parentName:"p"},"exact")," size of the widget, so we can create an image that will fit the widget correctly."),(0,i.kt)("p",null,"On some Android launchers, the reported and actual size of the widget are not always the same."),(0,i.kt)("figure",{className:"image-caption"},(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/7473800/244463696-2c017d1a-34b8-4a20-9f2e-22b4a3d9a739.png",alt:"Actual size"})),(0,i.kt)("figcaption",null,"Actual size (365dp x 318dp)")),(0,i.kt)("figure",{className:"image-caption"},(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/7473800/244463758-534f54a0-f3d2-4a0f-aaaa-0f2c5fc259b8.png",alt:"Reported size"})),(0,i.kt)("figcaption",null,"Reported size (365dp x 354dp)")),(0,i.kt)("p",null,"I haven't found a reliable way to get the ",(0,i.kt)("strong",{parentName:"p"},"exact")," size, the current behavior is to crop the widget if the reported size is smaller."))}d.isMDXComponent=!0}}]);