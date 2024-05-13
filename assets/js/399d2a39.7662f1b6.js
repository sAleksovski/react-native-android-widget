"use strict";(self.webpackChunkreact_native_android_widget_docs=self.webpackChunkreact_native_android_widget_docs||[]).push([[6573],{6455:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>s,contentTitle:()=>l,default:()=>p,frontMatter:()=>d,metadata:()=>c,toc:()=>u});var t=i(5893),a=i(1151),r=i(4866),o=i(5162);const d={sidebar_position:6},l="Make Widget configurable (Optional)",c={id:"tutorial/make-widget-configurable",title:"Make Widget configurable (Optional)",description:"In order to some of the widgets configurable, we need to create a widget configuration activity.",source:"@site/docs/tutorial/make-widget-configurable.md",sourceDirName:"tutorial",slug:"/tutorial/make-widget-configurable",permalink:"/react-native-android-widget/docs/tutorial/make-widget-configurable",draft:!1,unlisted:!1,editUrl:"https://github.com/sAleksovski/react-native-android-widget/tree/master/docs/docs/tutorial/make-widget-configurable.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"default",previous:{title:"Register widget in Expo",permalink:"/react-native-android-widget/docs/tutorial/register-widget-expo"},next:{title:"Try it out",permalink:"/react-native-android-widget/docs/tutorial/try-it-our"}},s={},u=[{value:"Add a widget configuration activity class",id:"add-a-widget-configuration-activity-class",level:2},{value:"Update the widget provider xml file for the widget",id:"update-the-widget-provider-xml-file-for-the-widget",level:2},{value:"Add widget configuration activity in AndroidManifest.xml",id:"add-widget-configuration-activity-in-androidmanifestxml",level:2},{value:"Make Widget configurable in Expo using config plugin",id:"make-widget-configurable-in-expo-using-config-plugin",level:2},{value:"Create the Widget Configuration Screen",id:"create-the-widget-configuration-screen",level:2}];function g(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"make-widget-configurable-optional",children:"Make Widget configurable (Optional)"}),"\n",(0,t.jsx)(n.p,{children:"In order to some of the widgets configurable, we need to create a widget configuration activity."}),"\n",(0,t.jsxs)(n.admonition,{title:"Note",type:"info",children:[(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"WIDGET_ADDED"})," event will be fired as soon as the widget is added on the home screen, regardless of whether it is configurable or not. We will need to have a fallback configuration."]}),(0,t.jsxs)(n.p,{children:["If the configuration is cancelled when adding the widget, ",(0,t.jsx)(n.code,{children:"WIDGET_DELETED"})," will be fired."]})]}),"\n",(0,t.jsx)(n.h2,{id:"add-a-widget-configuration-activity-class",children:"Add a widget configuration activity class"}),"\n","\n","\n",(0,t.jsxs)(r.Z,{children:[(0,t.jsx)(o.Z,{value:"Java",label:"Java",default:!0,children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",metastring:'title="android/app/src/main/java/com/yourapppackage/WidgetConfigurationActivity.java"',children:"package com.yourapppackage;\n\nimport com.reactnativeandroidwidget.RNWidgetConfigurationActivity;\n\npublic class WidgetConfigurationActivity extends RNWidgetConfigurationActivity {\n}\n"})})}),(0,t.jsx)(o.Z,{value:"Kotlin",label:"Kotlin",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-kotlin",metastring:'title="android/app/src/main/java/com/yourapppackage/WidgetConfigurationActivity.kt"',children:"package com.yourapppackage\n\nimport com.reactnativeandroidwidget.RNWidgetConfigurationActivity\n\nclass WidgetConfigurationActivity : RNWidgetConfigurationActivity() {\n}\n"})})})]}),"\n",(0,t.jsx)(n.h2,{id:"update-the-widget-provider-xml-file-for-the-widget",children:"Update the widget provider xml file for the widget"}),"\n",(0,t.jsxs)(n.p,{children:["In the widget provider we created, add ",(0,t.jsx)(n.code,{children:"configure"})," and ",(0,t.jsx)(n.code,{children:"widgetFeatures"})," properties."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-xml",metastring:'title="android/app/src/main/res/xml/widgetprovider_hello.xml"',children:'<?xml version="1.0" encoding="utf-8"?>\n<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"\n    android:minWidth="320dp"\n    android:minHeight="120dp"\n\n    android:targetCellWidth="5"\n    android:targetCellHeight="2"\n\n    android:updatePeriodMillis="0"\n\n    android:initialLayout="@layout/rn_widget"\n\n    android:previewImage="@drawable/hello_preview"\n    android:description="@string/widget_hello_description"\n\n    android:resizeMode="none"\n\n\n    android:configure="com.yourapppackage.WidgetConfigurationActivity"\n    android:widgetFeatures="reconfigurable"\n\n\n    android:widgetCategory="home_screen">\n</appwidget-provider>\n'})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"android:configure"})," should reference the configuration activity we created"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"android:widgetFeatures"})," can be ",(0,t.jsx)(n.code,{children:"reconfigurable"})," or ",(0,t.jsx)(n.code,{children:"reconfigurable|configuration_optional"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"reconfigurable"})," means that the widget will be configurable and the configuration activity will open as soon as the widget is added to the home screen. Its configuration can also be changed later by long-pressing the widget."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"reconfigurable|configuration_optional"})," means that the widget configuration can only be changed by long-pressing the widget, and the configuration activity will not open when the widget is added"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"add-widget-configuration-activity-in-androidmanifestxml",children:"Add widget configuration activity in AndroidManifest.xml"}),"\n",(0,t.jsxs)(n.p,{children:["Finally, we need to add the widget configuration activity in ",(0,t.jsx)(n.code,{children:"AndroidManifest.xml"})]}),"\n",(0,t.jsxs)(n.p,{children:["In ",(0,t.jsx)(n.code,{children:"AndroidManifest.xml"}),", add a activity"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-xml",metastring:'title="android/app/src/main/AndroidManifest.xml"',children:'<manifest ...>\n  ...\n  <application\n      android:name=".MainApplication"\n      ...>\n\n      <activity\n          android:name=".MainActivity"\n          ...>\n      </activity>\n\n      <activity android:name=".WidgetConfigurationActivity"\n          android:exported="true">\n          <intent-filter>\n              <action android:name="android.appwidget.action.APPWIDGET_CONFIGURE"/>\n          </intent-filter>\n      </activity>\n  </application>\n</manifest>\n'})}),"\n",(0,t.jsx)(n.p,{children:"For the activity"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"android:name"})," myst be ",(0,t.jsx)(n.code,{children:".WidgetConfigurationActivity"})," (same as the Java class extending ",(0,t.jsx)(n.code,{children:"RNWidgetConfigurationActivity"}),")"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"make-widget-configurable-in-expo-using-config-plugin",children:"Make Widget configurable in Expo using config plugin"}),"\n",(0,t.jsxs)(n.p,{children:["If using Expo, the configuration is much simpler. We will only need to set the ",(0,t.jsx)(n.code,{children:"widgetFeatures"})," property in the config plugin to ",(0,t.jsx)(n.code,{children:"reconfigurable"})," or ",(0,t.jsx)(n.code,{children:"reconfigurable|configuration_optional"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:'title="app.config.ts"',children:"import type { ConfigContext, ExpoConfig } from 'expo/config';\nimport type { WithAndroidWidgetsParams } from 'react-native-android-widget';\n\nconst widgetConfig: WithAndroidWidgetsParams = {\n  widgets: [\n    {\n      name: 'Hello',\n      label: 'My Hello Widget',\n      minWidth: '320dp',\n      minHeight: '120dp',\n      targetCellWidth: 5,\n      targetCellHeight: 2,\n      description: 'This is my first widget',\n      previewImage: './assets/widget-preview/hello.png',\n      updatePeriodMillis: 1800000,\n\n      // This\n      widgetFeatures: 'reconfigurable',\n    },\n  ],\n};\n\nexport default ({ config }: ConfigContext): ExpoConfig => ({\n  ...config,\n  name: 'My Expo App Name',\n  plugins: [['react-native-android-widget', widgetConfig]],\n});\n"})}),"\n",(0,t.jsx)(n.h2,{id:"create-the-widget-configuration-screen",children:"Create the Widget Configuration Screen"}),"\n",(0,t.jsxs)(n.p,{children:["For the UI of the Widget Configuration Screen in both bare React Native and Expo, see the ",(0,t.jsx)(n.a,{href:"/react-native-android-widget/docs/api/register-widget-configuration-screen",children:(0,t.jsx)(n.code,{children:"registerWidgetConfigurationScreen"})})]})]})}function p(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(g,{...e})}):g(e)}},5162:(e,n,i)=>{i.d(n,{Z:()=>o});i(7294);var t=i(512);const a={tabItem:"tabItem_Ymn6"};var r=i(5893);function o(e){let{children:n,hidden:i,className:o}=e;return(0,r.jsx)("div",{role:"tabpanel",className:(0,t.Z)(a.tabItem,o),hidden:i,children:n})}},4866:(e,n,i)=>{i.d(n,{Z:()=>j});var t=i(7294),a=i(512),r=i(2466),o=i(6550),d=i(469),l=i(1980),c=i(7392),s=i(12);function u(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function g(e){const{values:n,children:i}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:i,attributes:t,default:a}}=e;return{value:n,label:i,attributes:t,default:a}}))}(i);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,i])}function p(e){let{value:n,tabValues:i}=e;return i.some((e=>e.value===n))}function h(e){let{queryString:n=!1,groupId:i}=e;const a=(0,o.k6)(),r=function(e){let{queryString:n=!1,groupId:i}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!i)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return i??null}({queryString:n,groupId:i});return[(0,l._X)(r),(0,t.useCallback)((e=>{if(!r)return;const n=new URLSearchParams(a.location.search);n.set(r,e),a.replace({...a.location,search:n.toString()})}),[r,a])]}function f(e){const{defaultValue:n,queryString:i=!1,groupId:a}=e,r=g(e),[o,l]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:i}=e;if(0===i.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:i}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${i.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=i.find((e=>e.default))??i[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:r}))),[c,u]=h({queryString:i,groupId:a}),[f,m]=function(e){let{groupId:n}=e;const i=function(e){return e?`docusaurus.tab.${e}`:null}(n),[a,r]=(0,s.Nk)(i);return[a,(0,t.useCallback)((e=>{i&&r.set(e)}),[i,r])]}({groupId:a}),v=(()=>{const e=c??f;return p({value:e,tabValues:r})?e:null})();(0,d.Z)((()=>{v&&l(v)}),[v]);return{selectedValue:o,selectValue:(0,t.useCallback)((e=>{if(!p({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),m(e)}),[u,m,r]),tabValues:r}}var m=i(2389);const v={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var w=i(5893);function x(e){let{className:n,block:i,selectedValue:t,selectValue:o,tabValues:d}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,r.o5)(),s=e=>{const n=e.currentTarget,i=l.indexOf(n),a=d[i].value;a!==t&&(c(n),o(a))},u=e=>{let n=null;switch(e.key){case"Enter":s(e);break;case"ArrowRight":{const i=l.indexOf(e.currentTarget)+1;n=l[i]??l[0];break}case"ArrowLeft":{const i=l.indexOf(e.currentTarget)-1;n=l[i]??l[l.length-1];break}}n?.focus()};return(0,w.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":i},n),children:d.map((e=>{let{value:n,label:i,attributes:r}=e;return(0,w.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>l.push(e),onKeyDown:u,onClick:s,...r,className:(0,a.Z)("tabs__item",v.tabItem,r?.className,{"tabs__item--active":t===n}),children:i??n},n)}))})}function b(e){let{lazy:n,children:i,selectedValue:a}=e;const r=(Array.isArray(i)?i:[i]).filter(Boolean);if(n){const e=r.find((e=>e.props.value===a));return e?(0,t.cloneElement)(e,{className:"margin-top--md"}):null}return(0,w.jsx)("div",{className:"margin-top--md",children:r.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==a})))})}function y(e){const n=f(e);return(0,w.jsxs)("div",{className:(0,a.Z)("tabs-container",v.tabList),children:[(0,w.jsx)(x,{...e,...n}),(0,w.jsx)(b,{...e,...n})]})}function j(e){const n=(0,m.Z)();return(0,w.jsx)(y,{...e,children:u(e.children)},String(n))}},1151:(e,n,i)=>{i.d(n,{Z:()=>d,a:()=>o});var t=i(7294);const a={},r=t.createContext(a);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);