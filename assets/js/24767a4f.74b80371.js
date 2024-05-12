"use strict";(self.webpackChunkreact_native_android_widget_docs=self.webpackChunkreact_native_android_widget_docs||[]).push([[1400],{2839:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>r,metadata:()=>s,toc:()=>o});var t=n(5893),d=n(1151);const r={id:"WidgetTaskHandlerProps",title:"Interface: WidgetTaskHandlerProps",sidebar_label:"WidgetTaskHandlerProps",sidebar_position:0,custom_edit_url:null},c=void 0,s={id:"public-api/interfaces/WidgetTaskHandlerProps",title:"Interface: WidgetTaskHandlerProps",description:"Properties",source:"@site/docs/public-api/interfaces/WidgetTaskHandlerProps.md",sourceDirName:"public-api/interfaces",slug:"/public-api/interfaces/WidgetTaskHandlerProps",permalink:"/react-native-android-widget/docs/public-api/interfaces/WidgetTaskHandlerProps",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"WidgetTaskHandlerProps",title:"Interface: WidgetTaskHandlerProps",sidebar_label:"WidgetTaskHandlerProps",sidebar_position:0,custom_edit_url:null},sidebar:"api",previous:{title:"WidgetPreviewProps",permalink:"/react-native-android-widget/docs/public-api/interfaces/WidgetPreviewProps"},next:{title:"WithAndroidWidgetsParams",permalink:"/react-native-android-widget/docs/public-api/interfaces/WithAndroidWidgetsParams"}},l={},o=[{value:"Properties",id:"properties",level:2},{value:"widgetInfo",id:"widgetinfo",level:3},{value:"widgetAction",id:"widgetaction",level:3},{value:"renderWidget",id:"renderwidget",level:3},{value:"Type declaration",id:"type-declaration",level:4},{value:"Parameters",id:"parameters",level:5},{value:"Returns",id:"returns",level:5},{value:"clickAction",id:"clickaction",level:3},{value:"clickActionData",id:"clickactiondata",level:3}];function a(e){const i={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",h5:"h5",hr:"hr",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,d.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.h2,{id:"properties",children:"Properties"}),"\n",(0,t.jsx)(i.h3,{id:"widgetinfo",children:"widgetInfo"}),"\n",(0,t.jsxs)(i.p,{children:["\u2022 ",(0,t.jsx)(i.strong,{children:"widgetInfo"}),": ",(0,t.jsx)(i.a,{href:"/react-native-android-widget/docs/public-api/interfaces/WidgetInfo",children:(0,t.jsx)(i.code,{children:"WidgetInfo"})})]}),"\n",(0,t.jsx)(i.p,{children:"Information about the widget being handled."}),"\n",(0,t.jsx)(i.hr,{}),"\n",(0,t.jsx)(i.h3,{id:"widgetaction",children:"widgetAction"}),"\n",(0,t.jsxs)(i.p,{children:["\u2022 ",(0,t.jsx)(i.strong,{children:"widgetAction"}),": ",(0,t.jsx)(i.code,{children:'"WIDGET_ADDED"'})," | ",(0,t.jsx)(i.code,{children:'"WIDGET_UPDATE"'})," | ",(0,t.jsx)(i.code,{children:'"WIDGET_RESIZED"'})," | ",(0,t.jsx)(i.code,{children:'"WIDGET_DELETED"'})," | ",(0,t.jsx)(i.code,{children:'"WIDGET_CLICK"'})]}),"\n",(0,t.jsx)(i.p,{children:"What kind of action is being handled"}),"\n",(0,t.jsx)(i.hr,{}),"\n",(0,t.jsx)(i.h3,{id:"renderwidget",children:"renderWidget"}),"\n",(0,t.jsxs)(i.p,{children:["\u2022 ",(0,t.jsx)(i.strong,{children:"renderWidget"}),": (",(0,t.jsx)(i.code,{children:"widgetComponent"}),": ",(0,t.jsx)(i.code,{children:"Element"}),") => ",(0,t.jsx)(i.code,{children:"void"})]}),"\n",(0,t.jsx)(i.p,{children:"Function that needs to be called with the Widget JSX to render"}),"\n",(0,t.jsx)(i.h4,{id:"type-declaration",children:"Type declaration"}),"\n",(0,t.jsxs)(i.p,{children:["\u25b8 (",(0,t.jsx)(i.code,{children:"widgetComponent"}),"): ",(0,t.jsx)(i.code,{children:"void"})]}),"\n",(0,t.jsx)(i.p,{children:"Function that needs to be called with the Widget JSX to render"}),"\n",(0,t.jsx)(i.h5,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{style:{textAlign:"left"},children:"Name"}),(0,t.jsx)(i.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,t.jsx)(i.tbody,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{style:{textAlign:"left"},children:(0,t.jsx)(i.code,{children:"widgetComponent"})}),(0,t.jsx)(i.td,{style:{textAlign:"left"},children:(0,t.jsx)(i.code,{children:"Element"})})]})})]}),"\n",(0,t.jsx)(i.h5,{id:"returns",children:"Returns"}),"\n",(0,t.jsx)(i.p,{children:(0,t.jsx)(i.code,{children:"void"})}),"\n",(0,t.jsx)(i.hr,{}),"\n",(0,t.jsx)(i.h3,{id:"clickaction",children:"clickAction"}),"\n",(0,t.jsxs)(i.p,{children:["\u2022 ",(0,t.jsx)(i.code,{children:"Optional"})," ",(0,t.jsx)(i.strong,{children:"clickAction"}),": ",(0,t.jsx)(i.code,{children:"string"})]}),"\n",(0,t.jsx)(i.p,{children:"Click action if widgetAction was WIDGET_CLICK"}),"\n",(0,t.jsx)(i.hr,{}),"\n",(0,t.jsx)(i.h3,{id:"clickactiondata",children:"clickActionData"}),"\n",(0,t.jsxs)(i.p,{children:["\u2022 ",(0,t.jsx)(i.code,{children:"Optional"})," ",(0,t.jsx)(i.strong,{children:"clickActionData"}),": ",(0,t.jsx)(i.code,{children:"Record"}),"<",(0,t.jsx)(i.code,{children:"string"}),", ",(0,t.jsx)(i.code,{children:"unknown"}),">"]}),"\n",(0,t.jsxs)(i.p,{children:["Additional click action data if widgetAction was ",(0,t.jsx)(i.code,{children:"WIDGET_CLICK"})]})]})}function h(e={}){const{wrapper:i}={...(0,d.a)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},1151:(e,i,n)=>{n.d(i,{Z:()=>s,a:()=>c});var t=n(7294);const d={},r=t.createContext(d);function c(e){const i=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function s(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:c(e.components),t.createElement(r.Provider,{value:i},e.children)}}}]);