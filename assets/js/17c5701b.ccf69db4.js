"use strict";(self.webpackChunkreact_native_android_widget_docs=self.webpackChunkreact_native_android_widget_docs||[]).push([[3895],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>u});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),d=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=d(e.components);return r.createElement(c.Provider,{value:t},e.children)},g={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},l=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),l=d(n),u=i,v=l["".concat(c,".").concat(u)]||l[u]||g[u]||o;return n?r.createElement(v,a(a({ref:t},p),{},{components:n})):r.createElement(v,a({ref:t},p))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=l;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:i,a[1]=s;for(var d=2;d<o;d++)a[d]=n[d];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}l.displayName="MDXCreateElement"},6808:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>g,frontMatter:()=>o,metadata:()=>s,toc:()=>d});var r=n(7462),i=(n(7294),n(3905));const o={sidebar_position:6},a="SvgWidget",s={unversionedId:"primitives/svg-widget",id:"primitives/svg-widget",title:"SvgWidget",description:"Widget for displaying SVG.",source:"@site/docs/primitives/svg-widget.md",sourceDirName:"primitives",slug:"/primitives/svg-widget",permalink:"/react-native-android-widget/docs/primitives/svg-widget",draft:!1,editUrl:"https://github.com/sAleksovski/react-native-android-widget/tree/master/docs/docs/primitives/svg-widget.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"default",previous:{title:"IconWidget",permalink:"/react-native-android-widget/docs/primitives/icon-widget"},next:{title:"Limitations",permalink:"/react-native-android-widget/docs/limitations"}},c={},d=[{value:"Usage",id:"usage",level:2},{value:"Props",id:"props",level:2}],p={toc:d};function g(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"svgwidget"},"SvgWidget"),(0,i.kt)("p",null,"Widget for displaying SVG.\nIt supports importing an SVG file, or using an SVG string;"),(0,i.kt)("h2",{id:"usage"},"Usage"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx"},'import { FlexWidget, SvgWidget } from \'react-native-android-widget\';\n\nconst svgString = `\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 300 300">\n  ...\n</svg>\n`;\n\nexport function MyWidget() {\n  return (\n    <FlexWidget>\n      <SvgWidget\n        // highlight-next-line\n        svg={require(\'../assets/SVG_Logo.svg\')}\n        style={{ height: 72, width: 72 }}\n      />\n\n      <SvgWidget\n        // highlight-next-line\n        svg={svgString}\n        style={{ height: 72, width: 72 }}\n      />\n    </FlexWidget>\n  );\n}\n')),(0,i.kt)("h2",{id:"props"},"Props"),(0,i.kt)("p",null,"Check the props in the ",(0,i.kt)("a",{parentName:"p",href:"/docs/public-api/interfaces/SvgWidgetProps"},"Public API")," documentation"))}g.isMDXComponent=!0}}]);