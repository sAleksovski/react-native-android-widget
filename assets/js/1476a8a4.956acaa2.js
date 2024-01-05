"use strict";(self.webpackChunkreact_native_android_widget_docs=self.webpackChunkreact_native_android_widget_docs||[]).push([[5087],{1605:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>d});var n=i(5893),s=i(1151);const a={sidebar_position:7,sidebar_label:"Limitations"},o="Limitations",r={id:"limitations",title:"Limitations",description:"There are some limitations to this library.",source:"@site/docs/limitations.md",sourceDirName:".",slug:"/limitations",permalink:"/react-native-android-widget/docs/limitations",draft:!1,unlisted:!1,editUrl:"https://github.com/sAleksovski/react-native-android-widget/tree/master/docs/docs/limitations.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7,sidebar_label:"Limitations"},sidebar:"default",previous:{title:"Demo",permalink:"/react-native-android-widget/docs/demo"}},c={},d=[];function l(e){const t={h1:"h1",img:"img",p:"p",strong:"strong",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"limitations",children:"Limitations"}),"\n",(0,n.jsx)(t.p,{children:"There are some limitations to this library."}),"\n",(0,n.jsxs)(t.p,{children:["We cannot render React Native views directly to the widget.\nWhat this library does is render the React Native views to an image, and then show that image in the widget.\nFor it to look good, we need to know the ",(0,n.jsx)(t.strong,{children:"exact"})," size of the widget, so we can create an image that will fit the widget correctly."]}),"\n",(0,n.jsx)(t.p,{children:"On some Android launchers, the reported and actual size of the widget are not always the same."}),"\n",(0,n.jsxs)("figure",{className:"image-caption",children:[(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{src:"https://user-images.githubusercontent.com/7473800/244463696-2c017d1a-34b8-4a20-9f2e-22b4a3d9a739.png",alt:"Actual size"})}),(0,n.jsx)("figcaption",{children:"Actual size (365dp x 318dp)"})]}),"\n",(0,n.jsxs)("figure",{className:"image-caption",children:[(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{src:"https://user-images.githubusercontent.com/7473800/244463758-534f54a0-f3d2-4a0f-aaaa-0f2c5fc259b8.png",alt:"Reported size"})}),(0,n.jsx)("figcaption",{children:"Reported size (365dp x 354dp)"})]}),"\n",(0,n.jsxs)(t.p,{children:["I haven't found a reliable way to get the ",(0,n.jsx)(t.strong,{children:"exact"})," size, the current behavior is to crop the widget if the reported size is smaller."]})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},1151:(e,t,i)=>{i.d(t,{Z:()=>r,a:()=>o});var n=i(7294);const s={},a=n.createContext(s);function o(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);