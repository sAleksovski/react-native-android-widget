"use strict";(self.webpackChunkreact_native_android_widget_docs=self.webpackChunkreact_native_android_widget_docs||[]).push([[2814],{3905:(A,e,t)=>{t.d(e,{Zo:()=>s,kt:()=>g});var r=t(7294);function n(A,e,t){return e in A?Object.defineProperty(A,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):A[e]=t,A}function i(A,e){var t=Object.keys(A);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(A);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(A,e).enumerable}))),t.push.apply(t,r)}return t}function a(A){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?i(Object(t),!0).forEach((function(e){n(A,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(e){Object.defineProperty(A,e,Object.getOwnPropertyDescriptor(t,e))}))}return A}function d(A,e){if(null==A)return{};var t,r,n=function(A,e){if(null==A)return{};var t,r,n={},i=Object.keys(A);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||(n[t]=A[t]);return n}(A,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(A);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(A,t)&&(n[t]=A[t])}return n}var o=r.createContext({}),l=function(A){var e=r.useContext(o),t=e;return A&&(t="function"==typeof A?A(e):a(a({},e),A)),t},s=function(A){var e=l(A.components);return r.createElement(o.Provider,{value:e},A.children)},c={inlineCode:"code",wrapper:function(A){var e=A.children;return r.createElement(r.Fragment,{},e)}},v=r.forwardRef((function(A,e){var t=A.components,n=A.mdxType,i=A.originalType,o=A.parentName,s=d(A,["components","mdxType","originalType","parentName"]),v=l(t),g=n,k=v["".concat(o,".").concat(g)]||v[g]||c[g]||i;return t?r.createElement(k,a(a({ref:e},s),{},{components:t})):r.createElement(k,a({ref:e},s))}));function g(A,e){var t=arguments,n=e&&e.mdxType;if("string"==typeof A||n){var i=t.length,a=new Array(i);a[0]=v;var d={};for(var o in e)hasOwnProperty.call(e,o)&&(d[o]=e[o]);d.originalType=A,d.mdxType="string"==typeof A?A:n,a[1]=d;for(var l=2;l<i;l++)a[l]=t[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}v.displayName="MDXCreateElement"},7020:(A,e,t)=>{t.r(e),t.d(e,{assets:()=>o,contentTitle:()=>a,default:()=>c,frontMatter:()=>i,metadata:()=>d,toc:()=>l});var r=t(7462),n=(t(7294),t(3905));const i={sidebar_position:6,sidebar_label:"Demo"},a="Demo",d={unversionedId:"demo",id:"demo",title:"Demo",description:"You can download the demo app with the example widgets from the Releases Page",source:"@site/docs/demo.md",sourceDirName:".",slug:"/demo",permalink:"/react-native-android-widget/docs/demo",draft:!1,editUrl:"https://github.com/sAleksovski/react-native-android-widget/tree/master/docs/docs/demo.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,sidebar_label:"Demo"},sidebar:"default",previous:{title:"Handling Clicks",permalink:"/react-native-android-widget/docs/handling-clicks"}},o={},l=[{value:"Fitness Widget Preview",id:"fitness-widget-preview",level:2},{value:"List Widget Preview",id:"list-widget-preview",level:2},{value:"Resizable Music Widget Preview",id:"resizable-music-widget-preview",level:2},{value:"Rotated Widget Preview",id:"rotated-widget-preview",level:2},{value:"Shopify Widget Preview",id:"shopify-widget-preview",level:2},{value:"Click Demo Widget Preview",id:"click-demo-widget-preview",level:2},{value:"Counter Widget Preview",id:"counter-widget-preview",level:2},{value:"Debug Events Widget Preview",id:"debug-events-widget-preview",level:2}],s={toc:l};function c(A){let{components:e,...i}=A;return(0,n.kt)("wrapper",(0,r.Z)({},s,i,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"demo"},"Demo"),(0,n.kt)("p",null,"You can download the demo app with the example widgets from the ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/sAleksovski/react-native-android-widget/releases"},"Releases Page")),(0,n.kt)("h2",{id:"fitness-widget-preview"},"Fitness Widget Preview"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Fitness Widget Preview",src:t(1242).Z,width:"880",height:"575"})),(0,n.kt)("h2",{id:"list-widget-preview"},"List Widget Preview"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"List Widget Preview",src:t(4061).Z,width:"880",height:"605"})),(0,n.kt)("h2",{id:"resizable-music-widget-preview"},"Resizable Music Widget Preview"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Resizable Music Widget Preview",src:t(76).Z,width:"963",height:"886"})),(0,n.kt)("h2",{id:"rotated-widget-preview"},"Rotated Widget Preview"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Rotated Widget Preview",src:t(786).Z,width:"553",height:"886"})),(0,n.kt)("h2",{id:"shopify-widget-preview"},"Shopify Widget Preview"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Shopify Widget Preview",src:t(2248).Z,width:"880",height:"1100"})),(0,n.kt)("h2",{id:"click-demo-widget-preview"},"Click Demo Widget Preview"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Click Demo Widget Preview",src:t(4949).Z,width:"916",height:"545"})),(0,n.kt)("h2",{id:"counter-widget-preview"},"Counter Widget Preview"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Counter Widget Preview",src:t(9183).Z,width:"825",height:"330"})),(0,n.kt)("h2",{id:"debug-events-widget-preview"},"Debug Events Widget Preview"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Debug Events Widget Preview",src:t(7974).Z,width:"886",height:"580"})))}c.isMDXComponent=!0},4949:(A,e,t)=>{t.d(e,{Z:()=>r});const r=t.p+"assets/images/clickdemo-593febb0e4f48be76bd8b38d13d988d3.png"},9183:(A,e,t)=>{t.d(e,{Z:()=>r});const r="data:image/png;base64,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FAC6jJIDQObPn5+ZM2dmwYIFbVlv7733zk477ZSXvvSl2WijjfLss89mYGAgjzzySH7+85/njjvuaMs+O+ywQ2644QZvXgPgBZQcgHFu6dKlecMb3pCbbrppxGvsscceeetb35pDDjkku+22W6ZMmbLOPe+9997cdNNNueqqq/KDH/xgxHsfccQRufbaa711DYDnKTkA49zpp5+eiy66aERzX/Oa1+Sss87Ka1/72hGXjFprbr755px77rm59tprR7TGF77whZx88skjmgtA/1FyAMax66+/PocffnjL86ZMmZLzzz8/J510UiZOnNiWLLXWXHHFFTn99NOzZMmSluZOnz49P/7xj71aGoAkyYSmAwDQjCeffDJnnnlmy/N22223fP/7388pp5zStoKTJKWU/Mmf/Em+/e1vZ9ttt21p7qJFi3LZZZe1LQsAvc1JDsA49bnPfS6nnXZaS3P22muvXHvttXn5y1/eoVRDbrnllhx66KFZtmzZsOdsueWWueeee9b5PBAA/c9JDsA4tGzZspx77rktzZk+fXq++tWvdrzgJMn++++f888/v6U5CxcuzPXXX9+hRAD0EiUHYBz69re/nfnz57c055JLLsmOO+7YoUQvduqpp+aAAw5oac7VV1/doTQA9BLX1QDGobe85S258sorhz3+zW9+c2bNmpVSSgdTvdg111yTY445ZtjjJ0+enIULF2bq1KkdTAW978ILL2zp86r+7u/+LltttVUHE0F7KTkA48ySJUuy2WabtTTn5ptvzqtf/eoOJVqzgYGB7LLLLvnv//7vYc+58cYbc/DBB3cwFfS+U089NZdeeumwx99///1jepILo+W6GsA4c9ttt7U0/qCDDmqk4CRDJzPHHXdcS3Na+b/TAPQnJQdgnLn11ltbGn/CCSd0KMnw/OEf/mFL45UcAJQcgHHmrrvuamn8fvvt16EkwzNjxoyWxt93330dSgJAr1ByAMaZuXPntjR+l1126VCS4dluu+1aGv+Tn/wkHjcFGN+UHIBxpNaaH//4x8Mev/XWWzf+prJJkyZlhx12GPb4JUuW5IknnuhgIgC6nZIDMI489dRTLY0fiw/+HI5WcwwMDHQoCQC9YL2mAwAwdp577rm8853vHPb4bik5G264YUvjlRyA8U3JARhHNt5441x88cVNx2jZxIkTWxr/zDPPdCgJAL3AdTUAul6rz9hMmTKlQ0kA6AVKDgBdb/78+S2NV3IAxjclB4Cu9uijj+ahhx4a9vhXv/rVWX/99TuYCIBup+QA0NVa/fDSP/qjP+pQEgB6hZIDQFebM2dOS+P333//DiUBoFcoOQB0rcHBwVx++eXDHr/pppvmkEMO6WAiAHqBkgNA1/r3f//3zJs3b9jjTznlFC8dAEDJAaA7PfXUU/nbv/3bluYcf/zxHUoDQC9RcgDoSueff37uvPPOYY8/7rjjst9++3UwEQC9QskBoOvMnj07f/VXf9XSnL/8y7/sUBoAeo2SA0BX+eEPf5jjjjuupTl/9md/lr333rtDiQDoNUoOAF3juuuuy+tf//o8/vjjw56z9dZb52/+5m86mAqAXqPkANC4Rx99NO973/ty5JFHtlRwkuTSSy/NFlts0aFkAPSi9ZoOAMD49cADD2TWrFk577zzsmjRopbnX3jhhTn88MM7kAyAXqbkADAmnnnmmfzqV7/KfffdlzvuuCPf/OY3M3v27BGvd8455+T0009vY0IA+oWSA8CIfPjDH84999yz1jFPP/10fvOb3+TXv/517r333gwMDLRl70suuSSnnXZaW9YCoP8oOQCMyNy5c3P11VeP6Z477LBDvvjFL+bggw8e030B6C1KDgA94T3veU8+9KEPZdq0aU1HgY6ZM2dOnn322Y7v8/DDD7c0/uabb84vfvGLDqX5nT322CObb755x/eh/yk5AHS1N77xjfnrv/7r7Lvvvk1HgY5785vfnF//+tdNx3iRE088cUz2+Y//+A8vE6EtlBwAutJBBx2U8847L3/wB3+QUkrTcQDoIT4nB4CudNNNN+XDH/5wLr/88pY/OweA8U3JAaBrzZ49OyeeeGJ22WWXnH322SP6LB0Axh8lB4Cu98gjj+Sss87K7rvvnosuuiiDg4NNRwKgi3kmh8bNmjUrV1xxRSN7v+xlL8vFF1/cyN5A6xYtWpTTTz89X/3qV/OZz3wmu+66a9ORAOhCSg6NW7hw4Zh/1sYKe+65ZyP7AqMzZ86cHHTQQbn88svzx3/8x03HAaDLKDkAjMi//du/pda61jHPPPNMfvvb3+aJJ57I4sWLs3DhwsybNy933HFHrrvuuixYsGDE+y9ZsiRHHnlkrrrqqhx33HEjXgeA/qPkADAiEyas+7HOiRMnZtKkSdl4442z1VZbZY899shhhx2WJHn22WefLzsXX3xxHnrooRHlOP744zN16lSfrQHA87x4AIBGTJw4Mfvuu28+9KEP5d57782ll16abbfddkRrnXjiifn5z3/e5oQA9ConOQA0buONN87b3/72HHvssfnIRz6SCy64oKX5jzzySN7//vfnqquu8sGh9LRXvvKVeeqppzq+z/z581t6Jfvee++dyZMndzDRkI022qjjezA+lLquC9XQYRdccEHOPPPMRvbec889M3fu3Eb2BtZs1qxZOemkkzIwMNDSvNmzZz9/HQ5Ys1NPPTWXXnrpsMfff//92XHHHTuYCNrLdTUAus5xxx2Xa665Juuvv35L884///x1vgwBgP6n5ADQlQ477LBccsklLc351re+lZtvvrlDiQDoFUoOAF3rpJNOavn10K0WIwD6j2dyAOhqd999d3bfffdhj588eXIefvjhbLrpph1MBb3NMzn0Oyc5AHS13XbbLSeffPKwxw8MDOS73/1uBxMB0O2UHAC6XqtX1q699toOJQGgFyg5AHS9gw8+uKU3rX3nO9/xljWAcUzJAaDrbbLJJjn00EOHPX7BggV58MEHO5gIgG6m5ADQE171qle1NP6nP/1ph5IA0O2UHAB6wrbbbtvS+EcffbRDSQDodkoOAD1hs802a2n8448/3qEkAHQ7JQeAnrDRRhu1NF7JARi/lBwAekIppaPjAegf6zUdAICx8+53vzsPPPDAsMfPmjUrG264YQcTDd/g4GBL41s9+QGgfyg5AOPIz372s1x33XXDHv/UU091TclZunRpS+O7JTcAY891NYBxZJNNNmlp/JIlSzqUpHUPP/xwS+OnTZvWoSQAdDslB2AcmT59ekvjH3rooQ4lad28efNaGr/11lt3KAkA3U7JARhHXvGKV7Q0/ic/+UmHkrTuxhtvbGm8kgMwfik5AOPIdttt19L4OXPmdChJa+bPn5/58+cPe/y2226bLbbYooOJAOhmSg7AODJjxoyWxv/rv/5rHnnkkQ6lGb5Wy9bhhx+eCRP8Jw5gvPJfAIBxZJdddsk222zT0pyrrrqqQ2mG57nnnsvnPve5luYccMABHUoDQC9QcgDGkYkTJ+boo49uac4nPvGJLF68uEOJ1u073/lOfvCDH7Q0Z+bMmR1KA0AvUHIAxpljjjmmpfELFizI2Wef3aE0azcwMJCzzjqrpTlHHHFEyy9YAKC/KDkA48zMmTOz/fbbtzTnH/7hH/K1r32tQ4nW7GMf+1huvfXWlua87W1v61AaAHqFkgMwzkyaNClnnHFGy/NOPvnk3HDDDR1ItHqXXnppPvrRj7Y0Z+edd86b3vSmDiUCoFcoOQDj0CmnnNLyCwiWLl2ao48+Ol//+tc7lGpIrTWf/vSnc+qpp7Y89/3vf3823HDDDqQCoJcoOQDj0JQpU/KRj3yk5XlLly7Nsccemw9+8IN54okn2p5r4cKFefvb3553v/vdLc896KCD8ta3vrXtmQDoPUoOwDh14oknjvhq1znnnJN99903X/rSl/Lkk0+OOsvixYvzyU9+Mq961aty2WWXjWiNT33qU5k0adKoswDQ+0qttTYdAoBmPPjggznwwAOzYMGCEa+x+eab59RTT83rXve67LPPPpkyZcqw5i1atCi33HJLvvWtb+Wyyy7L0qVLR5zhH//xH3PmmWeOeD6MN7Nmzcq8efOGPf6d73xnXvrSl3YwEbSXkgMwzt1666057LDD8vjjj7dlvf322y977rlntt5660ydOjWTJk1KrTUDAwNZvHhxHnzwwdx2222555572rLfu971rlx00UUppbRlPQB6n5IDQK6//voce+yxWbZsWdNRWvKWt7wln//8571sAIAX8EwOADnssMNy/fXXZ8stt2w6yrC94x3vyBe+8AUFB4AXUXIASJIceOCB+d73vpcDDjig6Sjr9NGPfjSf/exnvWgAgNVyXQ2AF3jyySfzsY99LOecc07TUV5km222yec///kcfvjhTUcBoIs5yQHgBX7v934vZ599dm688cYcfPDBTcd53umnn57bbrtNwQFgnZzkALBGv/3tb3PFFVfk3HPPbdvb0Fp19NFH5wMf+EAOPPDARvYHoPcoOQCs0+DgYK655pr80z/9U7773e92fL/1118/J5xwQk477bQcfPDBXg8NQEuUHABacvfdd+cb3/hGrrnmmtx0001tXfuoo47KUUcdlaOPPjpbbbVVW9cGYPxQcgAYsQULFuRHP/pR7rrrrtx+++350Y9+lPnz569z3vrrr58ZM2Zkr732yj777JM99tgj++yzT6ZNmzYGqQHod0oOAG01ODiYRYsW5Te/+U0GBwczODiYUkomTZqUSZMm5SUveUmmT5+e9dZbr+mo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"},7974:(A,e,t)=>{t.d(e,{Z:()=>r});const r=t.p+"assets/images/debugevents-0a6dd2b6a94eb896f9c53e7aff325833.png"},1242:(A,e,t)=>{t.d(e,{Z:()=>r});const r=t.p+"assets/images/fitness-0c38df17d7bb7f1b8846f0f21347c685.png"},4061:(A,e,t)=>{t.d(e,{Z:()=>r});const r=t.p+"assets/images/list-0d495fe5548effb055930ecbdd3eb9ae.png"},76:(A,e,t)=>{t.d(e,{Z:()=>r});const r=t.p+"assets/images/resizable-1058d2386ccea47b5a616cabf5d79173.png"},786:(A,e,t)=>{t.d(e,{Z:()=>r});const r=t.p+"assets/images/rotated-ec4a7afbecb2f7eeb34c792a7e0389d0.png"},2248:(A,e,t)=>{t.d(e,{Z:()=>r});const r=t.p+"assets/images/shopify-ea022a5b06aaa27eb58e5c8bd2e6ade1.png"}}]);