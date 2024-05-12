"use strict";(self.webpackChunkreact_native_android_widget_docs=self.webpackChunkreact_native_android_widget_docs||[]).push([[5710],{3348:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>a,default:()=>g,frontMatter:()=>s,metadata:()=>d,toc:()=>l});var i=n(5893),r=n(1151);const s={sidebar_position:3},a="Register task handler",d={id:"tutorial/register-task-handler",title:"Register task handler",description:"We designed and previewed our widget. Now we need to register a task handler that will handle the logic of adding/updating a widget to the home screen, as well as handle widget clicks.",source:"@site/docs/tutorial/register-task-handler.md",sourceDirName:"tutorial",slug:"/tutorial/register-task-handler",permalink:"/react-native-android-widget/docs/tutorial/register-task-handler",draft:!1,unlisted:!1,editUrl:"https://github.com/sAleksovski/react-native-android-widget/tree/master/docs/docs/tutorial/register-task-handler.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"default",previous:{title:"Widget Preview",permalink:"/react-native-android-widget/docs/tutorial/widget-preview"},next:{title:"Register widget",permalink:"/react-native-android-widget/docs/tutorial/register-widget"}},o={},l=[{value:"Create task handler function",id:"create-task-handler-function",level:2},{value:"Register widget task handler",id:"register-widget-task-handler",level:2},{value:"Register widget task handler (Expo)",id:"register-widget-task-handler-expo",level:2},{value:"Next steps",id:"next-steps",level:2}];function c(e){const t={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"register-task-handler",children:"Register task handler"}),"\n",(0,i.jsxs)(t.p,{children:["We designed and previewed our widget. Now we need to register a ",(0,i.jsx)(t.em,{children:"task handler"})," that will handle the logic of adding/updating a widget to the home screen, as well as handle widget clicks."]}),"\n",(0,i.jsx)(t.h2,{id:"create-task-handler-function",children:"Create task handler function"}),"\n",(0,i.jsx)(t.p,{children:"First, create a task handler function, containing:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-js",metastring:'title="widget-task-handler.tsx"',children:"import React from 'react';\nimport type { WidgetTaskHandlerProps } from 'react-native-android-widget';\nimport { HelloWidget } from './HelloWidget';\n\nconst nameToWidget = {\n  // Hello will be the **name** with which we will reference our widget.\n  Hello: HelloWidget,\n};\n\nexport async function widgetTaskHandler(props: WidgetTaskHandlerProps) {\n  const widgetInfo = props.widgetInfo;\n  const Widget =\n    nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget];\n\n  switch (props.widgetAction) {\n    case 'WIDGET_ADDED':\n      props.renderWidget(<Widget />);\n      break;\n\n    case 'WIDGET_UPDATE':\n      // Not needed for now\n      break;\n\n    case 'WIDGET_RESIZED':\n      // Not needed for now\n      break;\n\n    case 'WIDGET_DELETED':\n      // Not needed for now\n      break;\n\n    case 'WIDGET_CLICK':\n      // Not needed for now\n      break;\n\n    default:\n      break;\n  }\n}\n"})}),"\n",(0,i.jsxs)(t.p,{children:["We use ",(0,i.jsx)(t.code,{children:"nameToWidget"})," to map from the ",(0,i.jsx)(t.strong,{children:"name"})," to the component defining the widget (useful if we have multiple widgets). There are other ways to achieve this."]}),"\n",(0,i.jsx)(t.h2,{id:"register-widget-task-handler",children:"Register widget task handler"}),"\n",(0,i.jsxs)(t.p,{children:["In the main ",(0,i.jsx)(t.code,{children:"index.js"})," (or ",(0,i.jsx)(t.code,{children:"index.ts"}),", ",(0,i.jsx)(t.code,{children:"index.tsx"}),") file for our app, when we register the main component, register the widget task handler."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-js",metastring:'title="index.ts"',children:"import { AppRegistry } from 'react-native';\nimport { registerWidgetTaskHandler } from 'react-native-android-widget';\nimport { name as appName } from './app.json';\nimport App from './App';\nimport { widgetTaskHandler } from './widget-task-handler';\n\nAppRegistry.registerComponent(appName, () => App);\nregisterWidgetTaskHandler(widgetTaskHandler);\n"})}),"\n",(0,i.jsx)(t.h2,{id:"register-widget-task-handler-expo",children:"Register widget task handler (Expo)"}),"\n",(0,i.jsxs)(t.p,{children:["If we are using Expo, there is no ",(0,i.jsx)(t.code,{children:"index.js"})," (or ",(0,i.jsx)(t.code,{children:"index.ts"}),", ",(0,i.jsx)(t.code,{children:"index.tsx"}),"), but we can create it."]}),"\n",(0,i.jsxs)(t.p,{children:["First, update ",(0,i.jsx)(t.code,{children:"package.json"})," main field to point to ",(0,i.jsx)(t.code,{children:"index.ts"})," (or ",(0,i.jsx)(t.code,{children:".js"}),") instead of ",(0,i.jsx)(t.code,{children:"node_modules/expo/AppEntry.js"})]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-js",metastring:'title="package.json"',children:'{\n  "name": "my-expo-app",\n  "main": "index.ts",\n  ...\n}\n'})}),"\n",(0,i.jsxs)(t.p,{children:["Create the file, using ",(0,i.jsx)(t.code,{children:"node_modules/expo/AppEntry.js"})," as a template.\nThen import ",(0,i.jsx)(t.code,{children:"widgetTaskHandler"})," and register it."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-js",metastring:'title="index.ts"',children:"import { registerRootComponent } from 'expo';\nimport { registerWidgetTaskHandler } from 'react-native-android-widget';\n\nimport App from './App';\nimport { widgetTaskHandler } from './widget-task-handler';\n\n// registerRootComponent calls AppRegistry.registerComponent('main', () => App);\n// It also ensures that whether you load the app in Expo Go or in a native build,\n// the environment is set up appropriately\nregisterRootComponent(App);\nregisterWidgetTaskHandler(widgetTaskHandler);\n"})}),"\n",(0,i.jsx)(t.h2,{id:"next-steps",children:"Next steps"}),"\n",(0,i.jsx)(t.p,{children:"We designed our widget, saw the preview, and registered a handler that will handle adding it to the home screen."}),"\n",(0,i.jsxs)(t.p,{children:["We still need to tell the application that there is a widget called ",(0,i.jsx)(t.code,{children:"Hello"}),"."]}),"\n",(0,i.jsx)(t.p,{children:"Continue with:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:"./register-widget",children:"Register widget"})," if you are using React Native bare"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:"./register-widget-expo",children:"Register widget in Expo"})," if you are using Expo"]}),"\n"]})]})}function g(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>d,a:()=>a});var i=n(7294);const r={},s=i.createContext(r);function a(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);