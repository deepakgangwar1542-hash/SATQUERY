var NM=Object.defineProperty;var LM=(t,e,n)=>e in t?NM(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Xe=(t,e,n)=>LM(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function DM(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var bv={exports:{}},Gu={},Sv={exports:{}},Ke={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dl=Symbol.for("react.element"),IM=Symbol.for("react.portal"),kM=Symbol.for("react.fragment"),FM=Symbol.for("react.strict_mode"),UM=Symbol.for("react.profiler"),OM=Symbol.for("react.provider"),zM=Symbol.for("react.context"),BM=Symbol.for("react.forward_ref"),HM=Symbol.for("react.suspense"),VM=Symbol.for("react.memo"),GM=Symbol.for("react.lazy"),Ig=Symbol.iterator;function WM(t){return t===null||typeof t!="object"?null:(t=Ig&&t[Ig]||t["@@iterator"],typeof t=="function"?t:null)}var Mv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},wv=Object.assign,Ev={};function Ua(t,e,n){this.props=t,this.context=e,this.refs=Ev,this.updater=n||Mv}Ua.prototype.isReactComponent={};Ua.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ua.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Tv(){}Tv.prototype=Ua.prototype;function Gp(t,e,n){this.props=t,this.context=e,this.refs=Ev,this.updater=n||Mv}var Wp=Gp.prototype=new Tv;Wp.constructor=Gp;wv(Wp,Ua.prototype);Wp.isPureReactComponent=!0;var kg=Array.isArray,Av=Object.prototype.hasOwnProperty,jp={current:null},Cv={key:!0,ref:!0,__self:!0,__source:!0};function Rv(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)Av.call(e,i)&&!Cv.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:dl,type:t,key:s,ref:a,props:r,_owner:jp.current}}function jM(t,e){return{$$typeof:dl,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Xp(t){return typeof t=="object"&&t!==null&&t.$$typeof===dl}function XM(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Fg=/\/+/g;function vd(t,e){return typeof t=="object"&&t!==null&&t.key!=null?XM(""+t.key):e.toString(36)}function Cc(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case dl:case IM:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+vd(a,0):i,kg(r)?(n="",t!=null&&(n=t.replace(Fg,"$&/")+"/"),Cc(r,e,n,"",function(c){return c})):r!=null&&(Xp(r)&&(r=jM(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(Fg,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",kg(t))for(var o=0;o<t.length;o++){s=t[o];var l=i+vd(s,o);a+=Cc(s,e,n,l,r)}else if(l=WM(t),typeof l=="function")for(t=l.call(t),o=0;!(s=t.next()).done;)s=s.value,l=i+vd(s,o++),a+=Cc(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function Sl(t,e,n){if(t==null)return t;var i=[],r=0;return Cc(t,i,"","",function(s){return e.call(n,s,r++)}),i}function $M(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var _n={current:null},Rc={transition:null},YM={ReactCurrentDispatcher:_n,ReactCurrentBatchConfig:Rc,ReactCurrentOwner:jp};function Pv(){throw Error("act(...) is not supported in production builds of React.")}Ke.Children={map:Sl,forEach:function(t,e,n){Sl(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Sl(t,function(){e++}),e},toArray:function(t){return Sl(t,function(e){return e})||[]},only:function(t){if(!Xp(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ke.Component=Ua;Ke.Fragment=kM;Ke.Profiler=UM;Ke.PureComponent=Gp;Ke.StrictMode=FM;Ke.Suspense=HM;Ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=YM;Ke.act=Pv;Ke.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=wv({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=jp.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(l in e)Av.call(e,l)&&!Cv.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&o!==void 0?o[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var c=0;c<l;c++)o[c]=arguments[c+2];i.children=o}return{$$typeof:dl,type:t.type,key:r,ref:s,props:i,_owner:a}};Ke.createContext=function(t){return t={$$typeof:zM,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:OM,_context:t},t.Consumer=t};Ke.createElement=Rv;Ke.createFactory=function(t){var e=Rv.bind(null,t);return e.type=t,e};Ke.createRef=function(){return{current:null}};Ke.forwardRef=function(t){return{$$typeof:BM,render:t}};Ke.isValidElement=Xp;Ke.lazy=function(t){return{$$typeof:GM,_payload:{_status:-1,_result:t},_init:$M}};Ke.memo=function(t,e){return{$$typeof:VM,type:t,compare:e===void 0?null:e}};Ke.startTransition=function(t){var e=Rc.transition;Rc.transition={};try{t()}finally{Rc.transition=e}};Ke.unstable_act=Pv;Ke.useCallback=function(t,e){return _n.current.useCallback(t,e)};Ke.useContext=function(t){return _n.current.useContext(t)};Ke.useDebugValue=function(){};Ke.useDeferredValue=function(t){return _n.current.useDeferredValue(t)};Ke.useEffect=function(t,e){return _n.current.useEffect(t,e)};Ke.useId=function(){return _n.current.useId()};Ke.useImperativeHandle=function(t,e,n){return _n.current.useImperativeHandle(t,e,n)};Ke.useInsertionEffect=function(t,e){return _n.current.useInsertionEffect(t,e)};Ke.useLayoutEffect=function(t,e){return _n.current.useLayoutEffect(t,e)};Ke.useMemo=function(t,e){return _n.current.useMemo(t,e)};Ke.useReducer=function(t,e,n){return _n.current.useReducer(t,e,n)};Ke.useRef=function(t){return _n.current.useRef(t)};Ke.useState=function(t){return _n.current.useState(t)};Ke.useSyncExternalStore=function(t,e,n){return _n.current.useSyncExternalStore(t,e,n)};Ke.useTransition=function(){return _n.current.useTransition()};Ke.version="18.3.1";Sv.exports=Ke;var se=Sv.exports;const qM=DM(se);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var KM=se,ZM=Symbol.for("react.element"),QM=Symbol.for("react.fragment"),JM=Object.prototype.hasOwnProperty,e1=KM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,t1={key:!0,ref:!0,__self:!0,__source:!0};function Nv(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)JM.call(e,i)&&!t1.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:ZM,type:t,key:s,ref:a,props:r,_owner:e1.current}}Gu.Fragment=QM;Gu.jsx=Nv;Gu.jsxs=Nv;bv.exports=Gu;var g=bv.exports,Vf={},Lv={exports:{}},zn={},Dv={exports:{}},Iv={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(H,z){var W=H.length;H.push(z);e:for(;0<W;){var Q=W-1>>>1,le=H[Q];if(0<r(le,z))H[Q]=z,H[W]=le,W=Q;else break e}}function n(H){return H.length===0?null:H[0]}function i(H){if(H.length===0)return null;var z=H[0],W=H.pop();if(W!==z){H[0]=W;e:for(var Q=0,le=H.length,ve=le>>>1;Q<ve;){var Ue=2*(Q+1)-1,Fe=H[Ue],De=Ue+1,Z=H[De];if(0>r(Fe,W))De<le&&0>r(Z,Fe)?(H[Q]=Z,H[De]=W,Q=De):(H[Q]=Fe,H[Ue]=W,Q=Ue);else if(De<le&&0>r(Z,W))H[Q]=Z,H[De]=W,Q=De;else break e}}return z}function r(H,z){var W=H.sortIndex-z.sortIndex;return W!==0?W:H.id-z.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var l=[],c=[],u=1,f=null,d=3,p=!1,x=!1,y=!1,m=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function M(H){for(var z=n(c);z!==null;){if(z.callback===null)i(c);else if(z.startTime<=H)i(c),z.sortIndex=z.expirationTime,e(l,z);else break;z=n(c)}}function b(H){if(y=!1,M(H),!x)if(n(l)!==null)x=!0,Y(S);else{var z=n(c);z!==null&&G(b,z.startTime-H)}}function S(H,z){x=!1,y&&(y=!1,h(v),v=-1),p=!0;var W=d;try{for(M(z),f=n(l);f!==null&&(!(f.expirationTime>z)||H&&!N());){var Q=f.callback;if(typeof Q=="function"){f.callback=null,d=f.priorityLevel;var le=Q(f.expirationTime<=z);z=t.unstable_now(),typeof le=="function"?f.callback=le:f===n(l)&&i(l),M(z)}else i(l);f=n(l)}if(f!==null)var ve=!0;else{var Ue=n(c);Ue!==null&&G(b,Ue.startTime-z),ve=!1}return ve}finally{f=null,d=W,p=!1}}var E=!1,C=null,v=-1,A=5,R=-1;function N(){return!(t.unstable_now()-R<A)}function L(){if(C!==null){var H=t.unstable_now();R=H;var z=!0;try{z=C(!0,H)}finally{z?B():(E=!1,C=null)}}else E=!1}var B;if(typeof _=="function")B=function(){_(L)};else if(typeof MessageChannel<"u"){var D=new MessageChannel,O=D.port2;D.port1.onmessage=L,B=function(){O.postMessage(null)}}else B=function(){m(L,0)};function Y(H){C=H,E||(E=!0,B())}function G(H,z){v=m(function(){H(t.unstable_now())},z)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(H){H.callback=null},t.unstable_continueExecution=function(){x||p||(x=!0,Y(S))},t.unstable_forceFrameRate=function(H){0>H||125<H?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<H?Math.floor(1e3/H):5},t.unstable_getCurrentPriorityLevel=function(){return d},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(H){switch(d){case 1:case 2:case 3:var z=3;break;default:z=d}var W=d;d=z;try{return H()}finally{d=W}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(H,z){switch(H){case 1:case 2:case 3:case 4:case 5:break;default:H=3}var W=d;d=H;try{return z()}finally{d=W}},t.unstable_scheduleCallback=function(H,z,W){var Q=t.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?Q+W:Q):W=Q,H){case 1:var le=-1;break;case 2:le=250;break;case 5:le=1073741823;break;case 4:le=1e4;break;default:le=5e3}return le=W+le,H={id:u++,callback:z,priorityLevel:H,startTime:W,expirationTime:le,sortIndex:-1},W>Q?(H.sortIndex=W,e(c,H),n(l)===null&&H===n(c)&&(y?(h(v),v=-1):y=!0,G(b,W-Q))):(H.sortIndex=le,e(l,H),x||p||(x=!0,Y(S))),H},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(H){var z=d;return function(){var W=d;d=z;try{return H.apply(this,arguments)}finally{d=W}}}})(Iv);Dv.exports=Iv;var n1=Dv.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var i1=se,On=n1;function ae(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var kv=new Set,zo={};function Rs(t,e){Ea(t,e),Ea(t+"Capture",e)}function Ea(t,e){for(zo[t]=e,t=0;t<e.length;t++)kv.add(e[t])}var tr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Gf=Object.prototype.hasOwnProperty,r1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ug={},Og={};function s1(t){return Gf.call(Og,t)?!0:Gf.call(Ug,t)?!1:r1.test(t)?Og[t]=!0:(Ug[t]=!0,!1)}function a1(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function o1(t,e,n,i){if(e===null||typeof e>"u"||a1(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function vn(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var tn={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){tn[t]=new vn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];tn[e]=new vn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){tn[t]=new vn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){tn[t]=new vn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){tn[t]=new vn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){tn[t]=new vn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){tn[t]=new vn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){tn[t]=new vn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){tn[t]=new vn(t,5,!1,t.toLowerCase(),null,!1,!1)});var $p=/[\-:]([a-z])/g;function Yp(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace($p,Yp);tn[e]=new vn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace($p,Yp);tn[e]=new vn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace($p,Yp);tn[e]=new vn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){tn[t]=new vn(t,1,!1,t.toLowerCase(),null,!1,!1)});tn.xlinkHref=new vn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){tn[t]=new vn(t,1,!1,t.toLowerCase(),null,!0,!0)});function qp(t,e,n,i){var r=tn.hasOwnProperty(e)?tn[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(o1(e,n,r,i)&&(n=null),i||r===null?s1(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var or=i1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ml=Symbol.for("react.element"),Qs=Symbol.for("react.portal"),Js=Symbol.for("react.fragment"),Kp=Symbol.for("react.strict_mode"),Wf=Symbol.for("react.profiler"),Fv=Symbol.for("react.provider"),Uv=Symbol.for("react.context"),Zp=Symbol.for("react.forward_ref"),jf=Symbol.for("react.suspense"),Xf=Symbol.for("react.suspense_list"),Qp=Symbol.for("react.memo"),vr=Symbol.for("react.lazy"),Ov=Symbol.for("react.offscreen"),zg=Symbol.iterator;function Ga(t){return t===null||typeof t!="object"?null:(t=zg&&t[zg]||t["@@iterator"],typeof t=="function"?t:null)}var Pt=Object.assign,yd;function co(t){if(yd===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);yd=e&&e[1]||""}return`
`+yd+t}var bd=!1;function Sd(t,e){if(!t||bd)return"";bd=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=a&&0<=o);break}}}finally{bd=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?co(t):""}function l1(t){switch(t.tag){case 5:return co(t.type);case 16:return co("Lazy");case 13:return co("Suspense");case 19:return co("SuspenseList");case 0:case 2:case 15:return t=Sd(t.type,!1),t;case 11:return t=Sd(t.type.render,!1),t;case 1:return t=Sd(t.type,!0),t;default:return""}}function $f(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Js:return"Fragment";case Qs:return"Portal";case Wf:return"Profiler";case Kp:return"StrictMode";case jf:return"Suspense";case Xf:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Uv:return(t.displayName||"Context")+".Consumer";case Fv:return(t._context.displayName||"Context")+".Provider";case Zp:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Qp:return e=t.displayName||null,e!==null?e:$f(t.type)||"Memo";case vr:e=t._payload,t=t._init;try{return $f(t(e))}catch{}}return null}function c1(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return $f(e);case 8:return e===Kp?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Br(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function zv(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function u1(t){var e=zv(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function wl(t){t._valueTracker||(t._valueTracker=u1(t))}function Bv(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=zv(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function eu(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Yf(t,e){var n=e.checked;return Pt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Bg(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Br(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Hv(t,e){e=e.checked,e!=null&&qp(t,"checked",e,!1)}function qf(t,e){Hv(t,e);var n=Br(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Kf(t,e.type,n):e.hasOwnProperty("defaultValue")&&Kf(t,e.type,Br(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Hg(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Kf(t,e,n){(e!=="number"||eu(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var uo=Array.isArray;function xa(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Br(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Zf(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ae(91));return Pt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Vg(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ae(92));if(uo(n)){if(1<n.length)throw Error(ae(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Br(n)}}function Vv(t,e){var n=Br(e.value),i=Br(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Gg(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Gv(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Qf(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Gv(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var El,Wv=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(El=El||document.createElement("div"),El.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=El.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Bo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var bo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},d1=["Webkit","ms","Moz","O"];Object.keys(bo).forEach(function(t){d1.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),bo[e]=bo[t]})});function jv(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||bo.hasOwnProperty(t)&&bo[t]?(""+e).trim():e+"px"}function Xv(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=jv(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var f1=Pt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Jf(t,e){if(e){if(f1[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ae(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ae(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ae(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ae(62))}}function eh(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var th=null;function Jp(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var nh=null,_a=null,va=null;function Wg(t){if(t=pl(t)){if(typeof nh!="function")throw Error(ae(280));var e=t.stateNode;e&&(e=Yu(e),nh(t.stateNode,t.type,e))}}function $v(t){_a?va?va.push(t):va=[t]:_a=t}function Yv(){if(_a){var t=_a,e=va;if(va=_a=null,Wg(t),e)for(t=0;t<e.length;t++)Wg(e[t])}}function qv(t,e){return t(e)}function Kv(){}var Md=!1;function Zv(t,e,n){if(Md)return t(e,n);Md=!0;try{return qv(t,e,n)}finally{Md=!1,(_a!==null||va!==null)&&(Kv(),Yv())}}function Ho(t,e){var n=t.stateNode;if(n===null)return null;var i=Yu(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ae(231,e,typeof n));return n}var ih=!1;if(tr)try{var Wa={};Object.defineProperty(Wa,"passive",{get:function(){ih=!0}}),window.addEventListener("test",Wa,Wa),window.removeEventListener("test",Wa,Wa)}catch{ih=!1}function h1(t,e,n,i,r,s,a,o,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(u){this.onError(u)}}var So=!1,tu=null,nu=!1,rh=null,p1={onError:function(t){So=!0,tu=t}};function m1(t,e,n,i,r,s,a,o,l){So=!1,tu=null,h1.apply(p1,arguments)}function g1(t,e,n,i,r,s,a,o,l){if(m1.apply(this,arguments),So){if(So){var c=tu;So=!1,tu=null}else throw Error(ae(198));nu||(nu=!0,rh=c)}}function Ps(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Qv(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function jg(t){if(Ps(t)!==t)throw Error(ae(188))}function x1(t){var e=t.alternate;if(!e){if(e=Ps(t),e===null)throw Error(ae(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return jg(r),t;if(s===i)return jg(r),e;s=s.sibling}throw Error(ae(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(ae(189))}}if(n.alternate!==i)throw Error(ae(190))}if(n.tag!==3)throw Error(ae(188));return n.stateNode.current===n?t:e}function Jv(t){return t=x1(t),t!==null?ey(t):null}function ey(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=ey(t);if(e!==null)return e;t=t.sibling}return null}var ty=On.unstable_scheduleCallback,Xg=On.unstable_cancelCallback,_1=On.unstable_shouldYield,v1=On.unstable_requestPaint,kt=On.unstable_now,y1=On.unstable_getCurrentPriorityLevel,em=On.unstable_ImmediatePriority,ny=On.unstable_UserBlockingPriority,iu=On.unstable_NormalPriority,b1=On.unstable_LowPriority,iy=On.unstable_IdlePriority,Wu=null,Ri=null;function S1(t){if(Ri&&typeof Ri.onCommitFiberRoot=="function")try{Ri.onCommitFiberRoot(Wu,t,void 0,(t.current.flags&128)===128)}catch{}}var di=Math.clz32?Math.clz32:E1,M1=Math.log,w1=Math.LN2;function E1(t){return t>>>=0,t===0?32:31-(M1(t)/w1|0)|0}var Tl=64,Al=4194304;function fo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function ru(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=fo(o):(s&=a,s!==0&&(i=fo(s)))}else a=n&~r,a!==0?i=fo(a):s!==0&&(i=fo(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-di(e),r=1<<n,i|=t[n],e&=~r;return i}function T1(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function A1(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-di(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=T1(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}}function sh(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function ry(){var t=Tl;return Tl<<=1,!(Tl&4194240)&&(Tl=64),t}function wd(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function fl(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-di(e),t[e]=n}function C1(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-di(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function tm(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-di(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var ft=0;function sy(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var ay,nm,oy,ly,cy,ah=!1,Cl=[],Pr=null,Nr=null,Lr=null,Vo=new Map,Go=new Map,Sr=[],R1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function $g(t,e){switch(t){case"focusin":case"focusout":Pr=null;break;case"dragenter":case"dragleave":Nr=null;break;case"mouseover":case"mouseout":Lr=null;break;case"pointerover":case"pointerout":Vo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Go.delete(e.pointerId)}}function ja(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=pl(e),e!==null&&nm(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function P1(t,e,n,i,r){switch(e){case"focusin":return Pr=ja(Pr,t,e,n,i,r),!0;case"dragenter":return Nr=ja(Nr,t,e,n,i,r),!0;case"mouseover":return Lr=ja(Lr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Vo.set(s,ja(Vo.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Go.set(s,ja(Go.get(s)||null,t,e,n,i,r)),!0}return!1}function uy(t){var e=cs(t.target);if(e!==null){var n=Ps(e);if(n!==null){if(e=n.tag,e===13){if(e=Qv(n),e!==null){t.blockedOn=e,cy(t.priority,function(){oy(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Pc(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=oh(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);th=i,n.target.dispatchEvent(i),th=null}else return e=pl(n),e!==null&&nm(e),t.blockedOn=n,!1;e.shift()}return!0}function Yg(t,e,n){Pc(t)&&n.delete(e)}function N1(){ah=!1,Pr!==null&&Pc(Pr)&&(Pr=null),Nr!==null&&Pc(Nr)&&(Nr=null),Lr!==null&&Pc(Lr)&&(Lr=null),Vo.forEach(Yg),Go.forEach(Yg)}function Xa(t,e){t.blockedOn===e&&(t.blockedOn=null,ah||(ah=!0,On.unstable_scheduleCallback(On.unstable_NormalPriority,N1)))}function Wo(t){function e(r){return Xa(r,t)}if(0<Cl.length){Xa(Cl[0],t);for(var n=1;n<Cl.length;n++){var i=Cl[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Pr!==null&&Xa(Pr,t),Nr!==null&&Xa(Nr,t),Lr!==null&&Xa(Lr,t),Vo.forEach(e),Go.forEach(e),n=0;n<Sr.length;n++)i=Sr[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Sr.length&&(n=Sr[0],n.blockedOn===null);)uy(n),n.blockedOn===null&&Sr.shift()}var ya=or.ReactCurrentBatchConfig,su=!0;function L1(t,e,n,i){var r=ft,s=ya.transition;ya.transition=null;try{ft=1,im(t,e,n,i)}finally{ft=r,ya.transition=s}}function D1(t,e,n,i){var r=ft,s=ya.transition;ya.transition=null;try{ft=4,im(t,e,n,i)}finally{ft=r,ya.transition=s}}function im(t,e,n,i){if(su){var r=oh(t,e,n,i);if(r===null)Id(t,e,i,au,n),$g(t,i);else if(P1(r,t,e,n,i))i.stopPropagation();else if($g(t,i),e&4&&-1<R1.indexOf(t)){for(;r!==null;){var s=pl(r);if(s!==null&&ay(s),s=oh(t,e,n,i),s===null&&Id(t,e,i,au,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Id(t,e,i,null,n)}}var au=null;function oh(t,e,n,i){if(au=null,t=Jp(i),t=cs(t),t!==null)if(e=Ps(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Qv(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return au=t,null}function dy(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(y1()){case em:return 1;case ny:return 4;case iu:case b1:return 16;case iy:return 536870912;default:return 16}default:return 16}}var Er=null,rm=null,Nc=null;function fy(){if(Nc)return Nc;var t,e=rm,n=e.length,i,r="value"in Er?Er.value:Er.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return Nc=r.slice(t,1<i?1-i:void 0)}function Lc(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Rl(){return!0}function qg(){return!1}function Bn(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Rl:qg,this.isPropagationStopped=qg,this}return Pt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Rl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Rl)},persist:function(){},isPersistent:Rl}),e}var Oa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},sm=Bn(Oa),hl=Pt({},Oa,{view:0,detail:0}),I1=Bn(hl),Ed,Td,$a,ju=Pt({},hl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:am,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==$a&&($a&&t.type==="mousemove"?(Ed=t.screenX-$a.screenX,Td=t.screenY-$a.screenY):Td=Ed=0,$a=t),Ed)},movementY:function(t){return"movementY"in t?t.movementY:Td}}),Kg=Bn(ju),k1=Pt({},ju,{dataTransfer:0}),F1=Bn(k1),U1=Pt({},hl,{relatedTarget:0}),Ad=Bn(U1),O1=Pt({},Oa,{animationName:0,elapsedTime:0,pseudoElement:0}),z1=Bn(O1),B1=Pt({},Oa,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),H1=Bn(B1),V1=Pt({},Oa,{data:0}),Zg=Bn(V1),G1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},W1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},j1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function X1(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=j1[t])?!!e[t]:!1}function am(){return X1}var $1=Pt({},hl,{key:function(t){if(t.key){var e=G1[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Lc(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?W1[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:am,charCode:function(t){return t.type==="keypress"?Lc(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Lc(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Y1=Bn($1),q1=Pt({},ju,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Qg=Bn(q1),K1=Pt({},hl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:am}),Z1=Bn(K1),Q1=Pt({},Oa,{propertyName:0,elapsedTime:0,pseudoElement:0}),J1=Bn(Q1),ew=Pt({},ju,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),tw=Bn(ew),nw=[9,13,27,32],om=tr&&"CompositionEvent"in window,Mo=null;tr&&"documentMode"in document&&(Mo=document.documentMode);var iw=tr&&"TextEvent"in window&&!Mo,hy=tr&&(!om||Mo&&8<Mo&&11>=Mo),Jg=" ",e0=!1;function py(t,e){switch(t){case"keyup":return nw.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function my(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ea=!1;function rw(t,e){switch(t){case"compositionend":return my(e);case"keypress":return e.which!==32?null:(e0=!0,Jg);case"textInput":return t=e.data,t===Jg&&e0?null:t;default:return null}}function sw(t,e){if(ea)return t==="compositionend"||!om&&py(t,e)?(t=fy(),Nc=rm=Er=null,ea=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return hy&&e.locale!=="ko"?null:e.data;default:return null}}var aw={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function t0(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!aw[t.type]:e==="textarea"}function gy(t,e,n,i){$v(i),e=ou(e,"onChange"),0<e.length&&(n=new sm("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var wo=null,jo=null;function ow(t){Ay(t,0)}function Xu(t){var e=ia(t);if(Bv(e))return t}function lw(t,e){if(t==="change")return e}var xy=!1;if(tr){var Cd;if(tr){var Rd="oninput"in document;if(!Rd){var n0=document.createElement("div");n0.setAttribute("oninput","return;"),Rd=typeof n0.oninput=="function"}Cd=Rd}else Cd=!1;xy=Cd&&(!document.documentMode||9<document.documentMode)}function i0(){wo&&(wo.detachEvent("onpropertychange",_y),jo=wo=null)}function _y(t){if(t.propertyName==="value"&&Xu(jo)){var e=[];gy(e,jo,t,Jp(t)),Zv(ow,e)}}function cw(t,e,n){t==="focusin"?(i0(),wo=e,jo=n,wo.attachEvent("onpropertychange",_y)):t==="focusout"&&i0()}function uw(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Xu(jo)}function dw(t,e){if(t==="click")return Xu(e)}function fw(t,e){if(t==="input"||t==="change")return Xu(e)}function hw(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var pi=typeof Object.is=="function"?Object.is:hw;function Xo(t,e){if(pi(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Gf.call(e,r)||!pi(t[r],e[r]))return!1}return!0}function r0(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function s0(t,e){var n=r0(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=r0(n)}}function vy(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?vy(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function yy(){for(var t=window,e=eu();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=eu(t.document)}return e}function lm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function pw(t){var e=yy(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&vy(n.ownerDocument.documentElement,n)){if(i!==null&&lm(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=s0(n,s);var a=s0(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var mw=tr&&"documentMode"in document&&11>=document.documentMode,ta=null,lh=null,Eo=null,ch=!1;function a0(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ch||ta==null||ta!==eu(i)||(i=ta,"selectionStart"in i&&lm(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Eo&&Xo(Eo,i)||(Eo=i,i=ou(lh,"onSelect"),0<i.length&&(e=new sm("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=ta)))}function Pl(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var na={animationend:Pl("Animation","AnimationEnd"),animationiteration:Pl("Animation","AnimationIteration"),animationstart:Pl("Animation","AnimationStart"),transitionend:Pl("Transition","TransitionEnd")},Pd={},by={};tr&&(by=document.createElement("div").style,"AnimationEvent"in window||(delete na.animationend.animation,delete na.animationiteration.animation,delete na.animationstart.animation),"TransitionEvent"in window||delete na.transitionend.transition);function $u(t){if(Pd[t])return Pd[t];if(!na[t])return t;var e=na[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in by)return Pd[t]=e[n];return t}var Sy=$u("animationend"),My=$u("animationiteration"),wy=$u("animationstart"),Ey=$u("transitionend"),Ty=new Map,o0="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Wr(t,e){Ty.set(t,e),Rs(e,[t])}for(var Nd=0;Nd<o0.length;Nd++){var Ld=o0[Nd],gw=Ld.toLowerCase(),xw=Ld[0].toUpperCase()+Ld.slice(1);Wr(gw,"on"+xw)}Wr(Sy,"onAnimationEnd");Wr(My,"onAnimationIteration");Wr(wy,"onAnimationStart");Wr("dblclick","onDoubleClick");Wr("focusin","onFocus");Wr("focusout","onBlur");Wr(Ey,"onTransitionEnd");Ea("onMouseEnter",["mouseout","mouseover"]);Ea("onMouseLeave",["mouseout","mouseover"]);Ea("onPointerEnter",["pointerout","pointerover"]);Ea("onPointerLeave",["pointerout","pointerover"]);Rs("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Rs("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Rs("onBeforeInput",["compositionend","keypress","textInput","paste"]);Rs("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Rs("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Rs("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ho="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),_w=new Set("cancel close invalid load scroll toggle".split(" ").concat(ho));function l0(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,g1(i,e,void 0,t),t.currentTarget=null}function Ay(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;l0(r,o,c),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;l0(r,o,c),s=l}}}if(nu)throw t=rh,nu=!1,rh=null,t}function bt(t,e){var n=e[ph];n===void 0&&(n=e[ph]=new Set);var i=t+"__bubble";n.has(i)||(Cy(e,t,2,!1),n.add(i))}function Dd(t,e,n){var i=0;e&&(i|=4),Cy(n,t,i,e)}var Nl="_reactListening"+Math.random().toString(36).slice(2);function $o(t){if(!t[Nl]){t[Nl]=!0,kv.forEach(function(n){n!=="selectionchange"&&(_w.has(n)||Dd(n,!1,t),Dd(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Nl]||(e[Nl]=!0,Dd("selectionchange",!1,e))}}function Cy(t,e,n,i){switch(dy(e)){case 1:var r=L1;break;case 4:r=D1;break;default:r=im}n=r.bind(null,e,n,t),r=void 0,!ih||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Id(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=cs(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}Zv(function(){var c=s,u=Jp(n),f=[];e:{var d=Ty.get(t);if(d!==void 0){var p=sm,x=t;switch(t){case"keypress":if(Lc(n)===0)break e;case"keydown":case"keyup":p=Y1;break;case"focusin":x="focus",p=Ad;break;case"focusout":x="blur",p=Ad;break;case"beforeblur":case"afterblur":p=Ad;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Kg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=F1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=Z1;break;case Sy:case My:case wy:p=z1;break;case Ey:p=J1;break;case"scroll":p=I1;break;case"wheel":p=tw;break;case"copy":case"cut":case"paste":p=H1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Qg}var y=(e&4)!==0,m=!y&&t==="scroll",h=y?d!==null?d+"Capture":null:d;y=[];for(var _=c,M;_!==null;){M=_;var b=M.stateNode;if(M.tag===5&&b!==null&&(M=b,h!==null&&(b=Ho(_,h),b!=null&&y.push(Yo(_,b,M)))),m)break;_=_.return}0<y.length&&(d=new p(d,x,null,n,u),f.push({event:d,listeners:y}))}}if(!(e&7)){e:{if(d=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",d&&n!==th&&(x=n.relatedTarget||n.fromElement)&&(cs(x)||x[nr]))break e;if((p||d)&&(d=u.window===u?u:(d=u.ownerDocument)?d.defaultView||d.parentWindow:window,p?(x=n.relatedTarget||n.toElement,p=c,x=x?cs(x):null,x!==null&&(m=Ps(x),x!==m||x.tag!==5&&x.tag!==6)&&(x=null)):(p=null,x=c),p!==x)){if(y=Kg,b="onMouseLeave",h="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(y=Qg,b="onPointerLeave",h="onPointerEnter",_="pointer"),m=p==null?d:ia(p),M=x==null?d:ia(x),d=new y(b,_+"leave",p,n,u),d.target=m,d.relatedTarget=M,b=null,cs(u)===c&&(y=new y(h,_+"enter",x,n,u),y.target=M,y.relatedTarget=m,b=y),m=b,p&&x)t:{for(y=p,h=x,_=0,M=y;M;M=Is(M))_++;for(M=0,b=h;b;b=Is(b))M++;for(;0<_-M;)y=Is(y),_--;for(;0<M-_;)h=Is(h),M--;for(;_--;){if(y===h||h!==null&&y===h.alternate)break t;y=Is(y),h=Is(h)}y=null}else y=null;p!==null&&c0(f,d,p,y,!1),x!==null&&m!==null&&c0(f,m,x,y,!0)}}e:{if(d=c?ia(c):window,p=d.nodeName&&d.nodeName.toLowerCase(),p==="select"||p==="input"&&d.type==="file")var S=lw;else if(t0(d))if(xy)S=fw;else{S=uw;var E=cw}else(p=d.nodeName)&&p.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(S=dw);if(S&&(S=S(t,c))){gy(f,S,n,u);break e}E&&E(t,d,c),t==="focusout"&&(E=d._wrapperState)&&E.controlled&&d.type==="number"&&Kf(d,"number",d.value)}switch(E=c?ia(c):window,t){case"focusin":(t0(E)||E.contentEditable==="true")&&(ta=E,lh=c,Eo=null);break;case"focusout":Eo=lh=ta=null;break;case"mousedown":ch=!0;break;case"contextmenu":case"mouseup":case"dragend":ch=!1,a0(f,n,u);break;case"selectionchange":if(mw)break;case"keydown":case"keyup":a0(f,n,u)}var C;if(om)e:{switch(t){case"compositionstart":var v="onCompositionStart";break e;case"compositionend":v="onCompositionEnd";break e;case"compositionupdate":v="onCompositionUpdate";break e}v=void 0}else ea?py(t,n)&&(v="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(v="onCompositionStart");v&&(hy&&n.locale!=="ko"&&(ea||v!=="onCompositionStart"?v==="onCompositionEnd"&&ea&&(C=fy()):(Er=u,rm="value"in Er?Er.value:Er.textContent,ea=!0)),E=ou(c,v),0<E.length&&(v=new Zg(v,t,null,n,u),f.push({event:v,listeners:E}),C?v.data=C:(C=my(n),C!==null&&(v.data=C)))),(C=iw?rw(t,n):sw(t,n))&&(c=ou(c,"onBeforeInput"),0<c.length&&(u=new Zg("onBeforeInput","beforeinput",null,n,u),f.push({event:u,listeners:c}),u.data=C))}Ay(f,e)})}function Yo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function ou(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Ho(t,n),s!=null&&i.unshift(Yo(t,s,r)),s=Ho(t,e),s!=null&&i.push(Yo(t,s,r))),t=t.return}return i}function Is(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function c0(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&c!==null&&(o=c,r?(l=Ho(n,s),l!=null&&a.unshift(Yo(n,l,o))):r||(l=Ho(n,s),l!=null&&a.push(Yo(n,l,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var vw=/\r\n?/g,yw=/\u0000|\uFFFD/g;function u0(t){return(typeof t=="string"?t:""+t).replace(vw,`
`).replace(yw,"")}function Ll(t,e,n){if(e=u0(e),u0(t)!==e&&n)throw Error(ae(425))}function lu(){}var uh=null,dh=null;function fh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var hh=typeof setTimeout=="function"?setTimeout:void 0,bw=typeof clearTimeout=="function"?clearTimeout:void 0,d0=typeof Promise=="function"?Promise:void 0,Sw=typeof queueMicrotask=="function"?queueMicrotask:typeof d0<"u"?function(t){return d0.resolve(null).then(t).catch(Mw)}:hh;function Mw(t){setTimeout(function(){throw t})}function kd(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Wo(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Wo(e)}function Dr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function f0(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var za=Math.random().toString(36).slice(2),Ei="__reactFiber$"+za,qo="__reactProps$"+za,nr="__reactContainer$"+za,ph="__reactEvents$"+za,ww="__reactListeners$"+za,Ew="__reactHandles$"+za;function cs(t){var e=t[Ei];if(e)return e;for(var n=t.parentNode;n;){if(e=n[nr]||n[Ei]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=f0(t);t!==null;){if(n=t[Ei])return n;t=f0(t)}return e}t=n,n=t.parentNode}return null}function pl(t){return t=t[Ei]||t[nr],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ia(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ae(33))}function Yu(t){return t[qo]||null}var mh=[],ra=-1;function jr(t){return{current:t}}function Mt(t){0>ra||(t.current=mh[ra],mh[ra]=null,ra--)}function vt(t,e){ra++,mh[ra]=t.current,t.current=e}var Hr={},fn=jr(Hr),En=jr(!1),vs=Hr;function Ta(t,e){var n=t.type.contextTypes;if(!n)return Hr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function Tn(t){return t=t.childContextTypes,t!=null}function cu(){Mt(En),Mt(fn)}function h0(t,e,n){if(fn.current!==Hr)throw Error(ae(168));vt(fn,e),vt(En,n)}function Ry(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ae(108,c1(t)||"Unknown",r));return Pt({},n,i)}function uu(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Hr,vs=fn.current,vt(fn,t),vt(En,En.current),!0}function p0(t,e,n){var i=t.stateNode;if(!i)throw Error(ae(169));n?(t=Ry(t,e,vs),i.__reactInternalMemoizedMergedChildContext=t,Mt(En),Mt(fn),vt(fn,t)):Mt(En),vt(En,n)}var ji=null,qu=!1,Fd=!1;function Py(t){ji===null?ji=[t]:ji.push(t)}function Tw(t){qu=!0,Py(t)}function Xr(){if(!Fd&&ji!==null){Fd=!0;var t=0,e=ft;try{var n=ji;for(ft=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}ji=null,qu=!1}catch(r){throw ji!==null&&(ji=ji.slice(t+1)),ty(em,Xr),r}finally{ft=e,Fd=!1}}return null}var sa=[],aa=0,du=null,fu=0,jn=[],Xn=0,ys=null,Yi=1,qi="";function rs(t,e){sa[aa++]=fu,sa[aa++]=du,du=t,fu=e}function Ny(t,e,n){jn[Xn++]=Yi,jn[Xn++]=qi,jn[Xn++]=ys,ys=t;var i=Yi;t=qi;var r=32-di(i)-1;i&=~(1<<r),n+=1;var s=32-di(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,Yi=1<<32-di(e)+r|n<<r|i,qi=s+t}else Yi=1<<s|n<<r|i,qi=t}function cm(t){t.return!==null&&(rs(t,1),Ny(t,1,0))}function um(t){for(;t===du;)du=sa[--aa],sa[aa]=null,fu=sa[--aa],sa[aa]=null;for(;t===ys;)ys=jn[--Xn],jn[Xn]=null,qi=jn[--Xn],jn[Xn]=null,Yi=jn[--Xn],jn[Xn]=null}var Un=null,In=null,Et=!1,oi=null;function Ly(t,e){var n=Yn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function m0(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Un=t,In=Dr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Un=t,In=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=ys!==null?{id:Yi,overflow:qi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Yn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Un=t,In=null,!0):!1;default:return!1}}function gh(t){return(t.mode&1)!==0&&(t.flags&128)===0}function xh(t){if(Et){var e=In;if(e){var n=e;if(!m0(t,e)){if(gh(t))throw Error(ae(418));e=Dr(n.nextSibling);var i=Un;e&&m0(t,e)?Ly(i,n):(t.flags=t.flags&-4097|2,Et=!1,Un=t)}}else{if(gh(t))throw Error(ae(418));t.flags=t.flags&-4097|2,Et=!1,Un=t}}}function g0(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Un=t}function Dl(t){if(t!==Un)return!1;if(!Et)return g0(t),Et=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!fh(t.type,t.memoizedProps)),e&&(e=In)){if(gh(t))throw Dy(),Error(ae(418));for(;e;)Ly(t,e),e=Dr(e.nextSibling)}if(g0(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ae(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){In=Dr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}In=null}}else In=Un?Dr(t.stateNode.nextSibling):null;return!0}function Dy(){for(var t=In;t;)t=Dr(t.nextSibling)}function Aa(){In=Un=null,Et=!1}function dm(t){oi===null?oi=[t]:oi.push(t)}var Aw=or.ReactCurrentBatchConfig;function Ya(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ae(309));var i=n.stateNode}if(!i)throw Error(ae(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(ae(284));if(!n._owner)throw Error(ae(290,t))}return t}function Il(t,e){throw t=Object.prototype.toString.call(e),Error(ae(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function x0(t){var e=t._init;return e(t._payload)}function Iy(t){function e(h,_){if(t){var M=h.deletions;M===null?(h.deletions=[_],h.flags|=16):M.push(_)}}function n(h,_){if(!t)return null;for(;_!==null;)e(h,_),_=_.sibling;return null}function i(h,_){for(h=new Map;_!==null;)_.key!==null?h.set(_.key,_):h.set(_.index,_),_=_.sibling;return h}function r(h,_){return h=Ur(h,_),h.index=0,h.sibling=null,h}function s(h,_,M){return h.index=M,t?(M=h.alternate,M!==null?(M=M.index,M<_?(h.flags|=2,_):M):(h.flags|=2,_)):(h.flags|=1048576,_)}function a(h){return t&&h.alternate===null&&(h.flags|=2),h}function o(h,_,M,b){return _===null||_.tag!==6?(_=Gd(M,h.mode,b),_.return=h,_):(_=r(_,M),_.return=h,_)}function l(h,_,M,b){var S=M.type;return S===Js?u(h,_,M.props.children,b,M.key):_!==null&&(_.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===vr&&x0(S)===_.type)?(b=r(_,M.props),b.ref=Ya(h,_,M),b.return=h,b):(b=zc(M.type,M.key,M.props,null,h.mode,b),b.ref=Ya(h,_,M),b.return=h,b)}function c(h,_,M,b){return _===null||_.tag!==4||_.stateNode.containerInfo!==M.containerInfo||_.stateNode.implementation!==M.implementation?(_=Wd(M,h.mode,b),_.return=h,_):(_=r(_,M.children||[]),_.return=h,_)}function u(h,_,M,b,S){return _===null||_.tag!==7?(_=xs(M,h.mode,b,S),_.return=h,_):(_=r(_,M),_.return=h,_)}function f(h,_,M){if(typeof _=="string"&&_!==""||typeof _=="number")return _=Gd(""+_,h.mode,M),_.return=h,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Ml:return M=zc(_.type,_.key,_.props,null,h.mode,M),M.ref=Ya(h,null,_),M.return=h,M;case Qs:return _=Wd(_,h.mode,M),_.return=h,_;case vr:var b=_._init;return f(h,b(_._payload),M)}if(uo(_)||Ga(_))return _=xs(_,h.mode,M,null),_.return=h,_;Il(h,_)}return null}function d(h,_,M,b){var S=_!==null?_.key:null;if(typeof M=="string"&&M!==""||typeof M=="number")return S!==null?null:o(h,_,""+M,b);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case Ml:return M.key===S?l(h,_,M,b):null;case Qs:return M.key===S?c(h,_,M,b):null;case vr:return S=M._init,d(h,_,S(M._payload),b)}if(uo(M)||Ga(M))return S!==null?null:u(h,_,M,b,null);Il(h,M)}return null}function p(h,_,M,b,S){if(typeof b=="string"&&b!==""||typeof b=="number")return h=h.get(M)||null,o(_,h,""+b,S);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Ml:return h=h.get(b.key===null?M:b.key)||null,l(_,h,b,S);case Qs:return h=h.get(b.key===null?M:b.key)||null,c(_,h,b,S);case vr:var E=b._init;return p(h,_,M,E(b._payload),S)}if(uo(b)||Ga(b))return h=h.get(M)||null,u(_,h,b,S,null);Il(_,b)}return null}function x(h,_,M,b){for(var S=null,E=null,C=_,v=_=0,A=null;C!==null&&v<M.length;v++){C.index>v?(A=C,C=null):A=C.sibling;var R=d(h,C,M[v],b);if(R===null){C===null&&(C=A);break}t&&C&&R.alternate===null&&e(h,C),_=s(R,_,v),E===null?S=R:E.sibling=R,E=R,C=A}if(v===M.length)return n(h,C),Et&&rs(h,v),S;if(C===null){for(;v<M.length;v++)C=f(h,M[v],b),C!==null&&(_=s(C,_,v),E===null?S=C:E.sibling=C,E=C);return Et&&rs(h,v),S}for(C=i(h,C);v<M.length;v++)A=p(C,h,v,M[v],b),A!==null&&(t&&A.alternate!==null&&C.delete(A.key===null?v:A.key),_=s(A,_,v),E===null?S=A:E.sibling=A,E=A);return t&&C.forEach(function(N){return e(h,N)}),Et&&rs(h,v),S}function y(h,_,M,b){var S=Ga(M);if(typeof S!="function")throw Error(ae(150));if(M=S.call(M),M==null)throw Error(ae(151));for(var E=S=null,C=_,v=_=0,A=null,R=M.next();C!==null&&!R.done;v++,R=M.next()){C.index>v?(A=C,C=null):A=C.sibling;var N=d(h,C,R.value,b);if(N===null){C===null&&(C=A);break}t&&C&&N.alternate===null&&e(h,C),_=s(N,_,v),E===null?S=N:E.sibling=N,E=N,C=A}if(R.done)return n(h,C),Et&&rs(h,v),S;if(C===null){for(;!R.done;v++,R=M.next())R=f(h,R.value,b),R!==null&&(_=s(R,_,v),E===null?S=R:E.sibling=R,E=R);return Et&&rs(h,v),S}for(C=i(h,C);!R.done;v++,R=M.next())R=p(C,h,v,R.value,b),R!==null&&(t&&R.alternate!==null&&C.delete(R.key===null?v:R.key),_=s(R,_,v),E===null?S=R:E.sibling=R,E=R);return t&&C.forEach(function(L){return e(h,L)}),Et&&rs(h,v),S}function m(h,_,M,b){if(typeof M=="object"&&M!==null&&M.type===Js&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case Ml:e:{for(var S=M.key,E=_;E!==null;){if(E.key===S){if(S=M.type,S===Js){if(E.tag===7){n(h,E.sibling),_=r(E,M.props.children),_.return=h,h=_;break e}}else if(E.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===vr&&x0(S)===E.type){n(h,E.sibling),_=r(E,M.props),_.ref=Ya(h,E,M),_.return=h,h=_;break e}n(h,E);break}else e(h,E);E=E.sibling}M.type===Js?(_=xs(M.props.children,h.mode,b,M.key),_.return=h,h=_):(b=zc(M.type,M.key,M.props,null,h.mode,b),b.ref=Ya(h,_,M),b.return=h,h=b)}return a(h);case Qs:e:{for(E=M.key;_!==null;){if(_.key===E)if(_.tag===4&&_.stateNode.containerInfo===M.containerInfo&&_.stateNode.implementation===M.implementation){n(h,_.sibling),_=r(_,M.children||[]),_.return=h,h=_;break e}else{n(h,_);break}else e(h,_);_=_.sibling}_=Wd(M,h.mode,b),_.return=h,h=_}return a(h);case vr:return E=M._init,m(h,_,E(M._payload),b)}if(uo(M))return x(h,_,M,b);if(Ga(M))return y(h,_,M,b);Il(h,M)}return typeof M=="string"&&M!==""||typeof M=="number"?(M=""+M,_!==null&&_.tag===6?(n(h,_.sibling),_=r(_,M),_.return=h,h=_):(n(h,_),_=Gd(M,h.mode,b),_.return=h,h=_),a(h)):n(h,_)}return m}var Ca=Iy(!0),ky=Iy(!1),hu=jr(null),pu=null,oa=null,fm=null;function hm(){fm=oa=pu=null}function pm(t){var e=hu.current;Mt(hu),t._currentValue=e}function _h(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function ba(t,e){pu=t,fm=oa=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(wn=!0),t.firstContext=null)}function Zn(t){var e=t._currentValue;if(fm!==t)if(t={context:t,memoizedValue:e,next:null},oa===null){if(pu===null)throw Error(ae(308));oa=t,pu.dependencies={lanes:0,firstContext:t}}else oa=oa.next=t;return e}var us=null;function mm(t){us===null?us=[t]:us.push(t)}function Fy(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,mm(e)):(n.next=r.next,r.next=n),e.interleaved=n,ir(t,i)}function ir(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var yr=!1;function gm(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Uy(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Qi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Ir(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,nt&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,ir(t,n)}return r=i.interleaved,r===null?(e.next=e,mm(i)):(e.next=r.next,r.next=e),i.interleaved=e,ir(t,n)}function Dc(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,tm(t,n)}}function _0(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function mu(t,e,n,i){var r=t.updateQueue;yr=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?s=c:a.next=c,a=l;var u=t.alternate;u!==null&&(u=u.updateQueue,o=u.lastBaseUpdate,o!==a&&(o===null?u.firstBaseUpdate=c:o.next=c,u.lastBaseUpdate=l))}if(s!==null){var f=r.baseState;a=0,u=c=l=null,o=s;do{var d=o.lane,p=o.eventTime;if((i&d)===d){u!==null&&(u=u.next={eventTime:p,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var x=t,y=o;switch(d=e,p=n,y.tag){case 1:if(x=y.payload,typeof x=="function"){f=x.call(p,f,d);break e}f=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=y.payload,d=typeof x=="function"?x.call(p,f,d):x,d==null)break e;f=Pt({},f,d);break e;case 2:yr=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,d=r.effects,d===null?r.effects=[o]:d.push(o))}else p={eventTime:p,lane:d,tag:o.tag,payload:o.payload,callback:o.callback,next:null},u===null?(c=u=p,l=f):u=u.next=p,a|=d;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;d=o,o=d.next,d.next=null,r.lastBaseUpdate=d,r.shared.pending=null}}while(!0);if(u===null&&(l=f),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Ss|=a,t.lanes=a,t.memoizedState=f}}function v0(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ae(191,r));r.call(i)}}}var ml={},Pi=jr(ml),Ko=jr(ml),Zo=jr(ml);function ds(t){if(t===ml)throw Error(ae(174));return t}function xm(t,e){switch(vt(Zo,e),vt(Ko,t),vt(Pi,ml),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Qf(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Qf(e,t)}Mt(Pi),vt(Pi,e)}function Ra(){Mt(Pi),Mt(Ko),Mt(Zo)}function Oy(t){ds(Zo.current);var e=ds(Pi.current),n=Qf(e,t.type);e!==n&&(vt(Ko,t),vt(Pi,n))}function _m(t){Ko.current===t&&(Mt(Pi),Mt(Ko))}var Tt=jr(0);function gu(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ud=[];function vm(){for(var t=0;t<Ud.length;t++)Ud[t]._workInProgressVersionPrimary=null;Ud.length=0}var Ic=or.ReactCurrentDispatcher,Od=or.ReactCurrentBatchConfig,bs=0,Ct=null,Bt=null,$t=null,xu=!1,To=!1,Qo=0,Cw=0;function rn(){throw Error(ae(321))}function ym(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!pi(t[n],e[n]))return!1;return!0}function bm(t,e,n,i,r,s){if(bs=s,Ct=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ic.current=t===null||t.memoizedState===null?Lw:Dw,t=n(i,r),To){s=0;do{if(To=!1,Qo=0,25<=s)throw Error(ae(301));s+=1,$t=Bt=null,e.updateQueue=null,Ic.current=Iw,t=n(i,r)}while(To)}if(Ic.current=_u,e=Bt!==null&&Bt.next!==null,bs=0,$t=Bt=Ct=null,xu=!1,e)throw Error(ae(300));return t}function Sm(){var t=Qo!==0;return Qo=0,t}function Si(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return $t===null?Ct.memoizedState=$t=t:$t=$t.next=t,$t}function Qn(){if(Bt===null){var t=Ct.alternate;t=t!==null?t.memoizedState:null}else t=Bt.next;var e=$t===null?Ct.memoizedState:$t.next;if(e!==null)$t=e,Bt=t;else{if(t===null)throw Error(ae(310));Bt=t,t={memoizedState:Bt.memoizedState,baseState:Bt.baseState,baseQueue:Bt.baseQueue,queue:Bt.queue,next:null},$t===null?Ct.memoizedState=$t=t:$t=$t.next=t}return $t}function Jo(t,e){return typeof e=="function"?e(t):e}function zd(t){var e=Qn(),n=e.queue;if(n===null)throw Error(ae(311));n.lastRenderedReducer=t;var i=Bt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,c=s;do{var u=c.lane;if((bs&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var f={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(o=l=f,a=i):l=l.next=f,Ct.lanes|=u,Ss|=u}c=c.next}while(c!==null&&c!==s);l===null?a=i:l.next=o,pi(i,e.memoizedState)||(wn=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,Ct.lanes|=s,Ss|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Bd(t){var e=Qn(),n=e.queue;if(n===null)throw Error(ae(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);pi(s,e.memoizedState)||(wn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function zy(){}function By(t,e){var n=Ct,i=Qn(),r=e(),s=!pi(i.memoizedState,r);if(s&&(i.memoizedState=r,wn=!0),i=i.queue,Mm(Gy.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||$t!==null&&$t.memoizedState.tag&1){if(n.flags|=2048,el(9,Vy.bind(null,n,i,r,e),void 0,null),Yt===null)throw Error(ae(349));bs&30||Hy(n,e,r)}return r}function Hy(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Ct.updateQueue,e===null?(e={lastEffect:null,stores:null},Ct.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Vy(t,e,n,i){e.value=n,e.getSnapshot=i,Wy(e)&&jy(t)}function Gy(t,e,n){return n(function(){Wy(e)&&jy(t)})}function Wy(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!pi(t,n)}catch{return!0}}function jy(t){var e=ir(t,1);e!==null&&fi(e,t,1,-1)}function y0(t){var e=Si();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Jo,lastRenderedState:t},e.queue=t,t=t.dispatch=Nw.bind(null,Ct,t),[e.memoizedState,t]}function el(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=Ct.updateQueue,e===null?(e={lastEffect:null,stores:null},Ct.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Xy(){return Qn().memoizedState}function kc(t,e,n,i){var r=Si();Ct.flags|=t,r.memoizedState=el(1|e,n,void 0,i===void 0?null:i)}function Ku(t,e,n,i){var r=Qn();i=i===void 0?null:i;var s=void 0;if(Bt!==null){var a=Bt.memoizedState;if(s=a.destroy,i!==null&&ym(i,a.deps)){r.memoizedState=el(e,n,s,i);return}}Ct.flags|=t,r.memoizedState=el(1|e,n,s,i)}function b0(t,e){return kc(8390656,8,t,e)}function Mm(t,e){return Ku(2048,8,t,e)}function $y(t,e){return Ku(4,2,t,e)}function Yy(t,e){return Ku(4,4,t,e)}function qy(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Ky(t,e,n){return n=n!=null?n.concat([t]):null,Ku(4,4,qy.bind(null,e,t),n)}function wm(){}function Zy(t,e){var n=Qn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&ym(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Qy(t,e){var n=Qn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&ym(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function Jy(t,e,n){return bs&21?(pi(n,e)||(n=ry(),Ct.lanes|=n,Ss|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,wn=!0),t.memoizedState=n)}function Rw(t,e){var n=ft;ft=n!==0&&4>n?n:4,t(!0);var i=Od.transition;Od.transition={};try{t(!1),e()}finally{ft=n,Od.transition=i}}function eb(){return Qn().memoizedState}function Pw(t,e,n){var i=Fr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},tb(t))nb(e,n);else if(n=Fy(t,e,n,i),n!==null){var r=xn();fi(n,t,i,r),ib(n,e,i)}}function Nw(t,e,n){var i=Fr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(tb(t))nb(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,pi(o,a)){var l=e.interleaved;l===null?(r.next=r,mm(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Fy(t,e,r,i),n!==null&&(r=xn(),fi(n,t,i,r),ib(n,e,i))}}function tb(t){var e=t.alternate;return t===Ct||e!==null&&e===Ct}function nb(t,e){To=xu=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function ib(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,tm(t,n)}}var _u={readContext:Zn,useCallback:rn,useContext:rn,useEffect:rn,useImperativeHandle:rn,useInsertionEffect:rn,useLayoutEffect:rn,useMemo:rn,useReducer:rn,useRef:rn,useState:rn,useDebugValue:rn,useDeferredValue:rn,useTransition:rn,useMutableSource:rn,useSyncExternalStore:rn,useId:rn,unstable_isNewReconciler:!1},Lw={readContext:Zn,useCallback:function(t,e){return Si().memoizedState=[t,e===void 0?null:e],t},useContext:Zn,useEffect:b0,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,kc(4194308,4,qy.bind(null,e,t),n)},useLayoutEffect:function(t,e){return kc(4194308,4,t,e)},useInsertionEffect:function(t,e){return kc(4,2,t,e)},useMemo:function(t,e){var n=Si();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=Si();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=Pw.bind(null,Ct,t),[i.memoizedState,t]},useRef:function(t){var e=Si();return t={current:t},e.memoizedState=t},useState:y0,useDebugValue:wm,useDeferredValue:function(t){return Si().memoizedState=t},useTransition:function(){var t=y0(!1),e=t[0];return t=Rw.bind(null,t[1]),Si().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=Ct,r=Si();if(Et){if(n===void 0)throw Error(ae(407));n=n()}else{if(n=e(),Yt===null)throw Error(ae(349));bs&30||Hy(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,b0(Gy.bind(null,i,s,t),[t]),i.flags|=2048,el(9,Vy.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=Si(),e=Yt.identifierPrefix;if(Et){var n=qi,i=Yi;n=(i&~(1<<32-di(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Qo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Cw++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Dw={readContext:Zn,useCallback:Zy,useContext:Zn,useEffect:Mm,useImperativeHandle:Ky,useInsertionEffect:$y,useLayoutEffect:Yy,useMemo:Qy,useReducer:zd,useRef:Xy,useState:function(){return zd(Jo)},useDebugValue:wm,useDeferredValue:function(t){var e=Qn();return Jy(e,Bt.memoizedState,t)},useTransition:function(){var t=zd(Jo)[0],e=Qn().memoizedState;return[t,e]},useMutableSource:zy,useSyncExternalStore:By,useId:eb,unstable_isNewReconciler:!1},Iw={readContext:Zn,useCallback:Zy,useContext:Zn,useEffect:Mm,useImperativeHandle:Ky,useInsertionEffect:$y,useLayoutEffect:Yy,useMemo:Qy,useReducer:Bd,useRef:Xy,useState:function(){return Bd(Jo)},useDebugValue:wm,useDeferredValue:function(t){var e=Qn();return Bt===null?e.memoizedState=t:Jy(e,Bt.memoizedState,t)},useTransition:function(){var t=Bd(Jo)[0],e=Qn().memoizedState;return[t,e]},useMutableSource:zy,useSyncExternalStore:By,useId:eb,unstable_isNewReconciler:!1};function si(t,e){if(t&&t.defaultProps){e=Pt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function vh(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Pt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Zu={isMounted:function(t){return(t=t._reactInternals)?Ps(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=xn(),r=Fr(t),s=Qi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Ir(t,s,r),e!==null&&(fi(e,t,r,i),Dc(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=xn(),r=Fr(t),s=Qi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Ir(t,s,r),e!==null&&(fi(e,t,r,i),Dc(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=xn(),i=Fr(t),r=Qi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Ir(t,r,i),e!==null&&(fi(e,t,i,n),Dc(e,t,i))}};function S0(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!Xo(n,i)||!Xo(r,s):!0}function rb(t,e,n){var i=!1,r=Hr,s=e.contextType;return typeof s=="object"&&s!==null?s=Zn(s):(r=Tn(e)?vs:fn.current,i=e.contextTypes,s=(i=i!=null)?Ta(t,r):Hr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Zu,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function M0(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Zu.enqueueReplaceState(e,e.state,null)}function yh(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},gm(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Zn(s):(s=Tn(e)?vs:fn.current,r.context=Ta(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(vh(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Zu.enqueueReplaceState(r,r.state,null),mu(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Pa(t,e){try{var n="",i=e;do n+=l1(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Hd(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function bh(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var kw=typeof WeakMap=="function"?WeakMap:Map;function sb(t,e,n){n=Qi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){yu||(yu=!0,Nh=i),bh(t,e)},n}function ab(t,e,n){n=Qi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){bh(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){bh(t,e),typeof i!="function"&&(kr===null?kr=new Set([this]):kr.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function w0(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new kw;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=qw.bind(null,t,e,n),e.then(t,t))}function E0(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function T0(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Qi(-1,1),e.tag=2,Ir(n,e,1))),n.lanes|=1),t)}var Fw=or.ReactCurrentOwner,wn=!1;function gn(t,e,n,i){e.child=t===null?ky(e,null,n,i):Ca(e,t.child,n,i)}function A0(t,e,n,i,r){n=n.render;var s=e.ref;return ba(e,r),i=bm(t,e,n,i,s,r),n=Sm(),t!==null&&!wn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,rr(t,e,r)):(Et&&n&&cm(e),e.flags|=1,gn(t,e,i,r),e.child)}function C0(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Lm(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,ob(t,e,s,i,r)):(t=zc(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:Xo,n(a,i)&&t.ref===e.ref)return rr(t,e,r)}return e.flags|=1,t=Ur(s,i),t.ref=e.ref,t.return=e,e.child=t}function ob(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Xo(s,i)&&t.ref===e.ref)if(wn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(wn=!0);else return e.lanes=t.lanes,rr(t,e,r)}return Sh(t,e,n,i,r)}function lb(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},vt(ca,Nn),Nn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,vt(ca,Nn),Nn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,vt(ca,Nn),Nn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,vt(ca,Nn),Nn|=i;return gn(t,e,r,n),e.child}function cb(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Sh(t,e,n,i,r){var s=Tn(n)?vs:fn.current;return s=Ta(e,s),ba(e,r),n=bm(t,e,n,i,s,r),i=Sm(),t!==null&&!wn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,rr(t,e,r)):(Et&&i&&cm(e),e.flags|=1,gn(t,e,n,r),e.child)}function R0(t,e,n,i,r){if(Tn(n)){var s=!0;uu(e)}else s=!1;if(ba(e,r),e.stateNode===null)Fc(t,e),rb(e,n,i),yh(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=Zn(c):(c=Tn(n)?vs:fn.current,c=Ta(e,c));var u=n.getDerivedStateFromProps,f=typeof u=="function"||typeof a.getSnapshotBeforeUpdate=="function";f||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==c)&&M0(e,a,i,c),yr=!1;var d=e.memoizedState;a.state=d,mu(e,i,a,r),l=e.memoizedState,o!==i||d!==l||En.current||yr?(typeof u=="function"&&(vh(e,n,u,i),l=e.memoizedState),(o=yr||S0(e,n,o,i,d,l,c))?(f||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),a.props=i,a.state=l,a.context=c,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,Uy(t,e),o=e.memoizedProps,c=e.type===e.elementType?o:si(e.type,o),a.props=c,f=e.pendingProps,d=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=Zn(l):(l=Tn(n)?vs:fn.current,l=Ta(e,l));var p=n.getDerivedStateFromProps;(u=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==f||d!==l)&&M0(e,a,i,l),yr=!1,d=e.memoizedState,a.state=d,mu(e,i,a,r);var x=e.memoizedState;o!==f||d!==x||En.current||yr?(typeof p=="function"&&(vh(e,n,p,i),x=e.memoizedState),(c=yr||S0(e,n,c,i,d,x,l)||!1)?(u||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,x,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,x,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=x),a.props=i,a.state=x,a.context=l,i=c):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),i=!1)}return Mh(t,e,n,i,s,r)}function Mh(t,e,n,i,r,s){cb(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&p0(e,n,!1),rr(t,e,s);i=e.stateNode,Fw.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=Ca(e,t.child,null,s),e.child=Ca(e,null,o,s)):gn(t,e,o,s),e.memoizedState=i.state,r&&p0(e,n,!0),e.child}function ub(t){var e=t.stateNode;e.pendingContext?h0(t,e.pendingContext,e.pendingContext!==e.context):e.context&&h0(t,e.context,!1),xm(t,e.containerInfo)}function P0(t,e,n,i,r){return Aa(),dm(r),e.flags|=256,gn(t,e,n,i),e.child}var wh={dehydrated:null,treeContext:null,retryLane:0};function Eh(t){return{baseLanes:t,cachePool:null,transitions:null}}function db(t,e,n){var i=e.pendingProps,r=Tt.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),vt(Tt,r&1),t===null)return xh(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=ed(a,i,0,null),t=xs(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Eh(n),e.memoizedState=wh,t):Em(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return Uw(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Ur(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=Ur(o,s):(s=xs(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?Eh(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=wh,i}return s=t.child,t=s.sibling,i=Ur(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Em(t,e){return e=ed({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function kl(t,e,n,i){return i!==null&&dm(i),Ca(e,t.child,null,n),t=Em(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Uw(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=Hd(Error(ae(422))),kl(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=ed({mode:"visible",children:i.children},r,0,null),s=xs(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Ca(e,t.child,null,a),e.child.memoizedState=Eh(a),e.memoizedState=wh,s);if(!(e.mode&1))return kl(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(ae(419)),i=Hd(s,i,void 0),kl(t,e,a,i)}if(o=(a&t.childLanes)!==0,wn||o){if(i=Yt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,ir(t,r),fi(i,t,r,-1))}return Nm(),i=Hd(Error(ae(421))),kl(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=Kw.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,In=Dr(r.nextSibling),Un=e,Et=!0,oi=null,t!==null&&(jn[Xn++]=Yi,jn[Xn++]=qi,jn[Xn++]=ys,Yi=t.id,qi=t.overflow,ys=e),e=Em(e,i.children),e.flags|=4096,e)}function N0(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),_h(t.return,e,n)}function Vd(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function fb(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(gn(t,e,i.children,n),i=Tt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&N0(t,n,e);else if(t.tag===19)N0(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(vt(Tt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&gu(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Vd(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&gu(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Vd(e,!0,n,null,s);break;case"together":Vd(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Fc(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function rr(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Ss|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ae(153));if(e.child!==null){for(t=e.child,n=Ur(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ur(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Ow(t,e,n){switch(e.tag){case 3:ub(e),Aa();break;case 5:Oy(e);break;case 1:Tn(e.type)&&uu(e);break;case 4:xm(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;vt(hu,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(vt(Tt,Tt.current&1),e.flags|=128,null):n&e.child.childLanes?db(t,e,n):(vt(Tt,Tt.current&1),t=rr(t,e,n),t!==null?t.sibling:null);vt(Tt,Tt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return fb(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),vt(Tt,Tt.current),i)break;return null;case 22:case 23:return e.lanes=0,lb(t,e,n)}return rr(t,e,n)}var hb,Th,pb,mb;hb=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Th=function(){};pb=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,ds(Pi.current);var s=null;switch(n){case"input":r=Yf(t,r),i=Yf(t,i),s=[];break;case"select":r=Pt({},r,{value:void 0}),i=Pt({},i,{value:void 0}),s=[];break;case"textarea":r=Zf(t,r),i=Zf(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=lu)}Jf(n,i);var a;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var o=r[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(zo.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(o=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==o&&(l!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(zo.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&bt("scroll",t),s||o===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};mb=function(t,e,n,i){n!==i&&(e.flags|=4)};function qa(t,e){if(!Et)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function sn(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function zw(t,e,n){var i=e.pendingProps;switch(um(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return sn(e),null;case 1:return Tn(e.type)&&cu(),sn(e),null;case 3:return i=e.stateNode,Ra(),Mt(En),Mt(fn),vm(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Dl(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,oi!==null&&(Ih(oi),oi=null))),Th(t,e),sn(e),null;case 5:_m(e);var r=ds(Zo.current);if(n=e.type,t!==null&&e.stateNode!=null)pb(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ae(166));return sn(e),null}if(t=ds(Pi.current),Dl(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Ei]=e,i[qo]=s,t=(e.mode&1)!==0,n){case"dialog":bt("cancel",i),bt("close",i);break;case"iframe":case"object":case"embed":bt("load",i);break;case"video":case"audio":for(r=0;r<ho.length;r++)bt(ho[r],i);break;case"source":bt("error",i);break;case"img":case"image":case"link":bt("error",i),bt("load",i);break;case"details":bt("toggle",i);break;case"input":Bg(i,s),bt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},bt("invalid",i);break;case"textarea":Vg(i,s),bt("invalid",i)}Jf(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&Ll(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&Ll(i.textContent,o,t),r=["children",""+o]):zo.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&bt("scroll",i)}switch(n){case"input":wl(i),Hg(i,s,!0);break;case"textarea":wl(i),Gg(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=lu)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Gv(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[Ei]=e,t[qo]=i,hb(t,e,!1,!1),e.stateNode=t;e:{switch(a=eh(n,i),n){case"dialog":bt("cancel",t),bt("close",t),r=i;break;case"iframe":case"object":case"embed":bt("load",t),r=i;break;case"video":case"audio":for(r=0;r<ho.length;r++)bt(ho[r],t);r=i;break;case"source":bt("error",t),r=i;break;case"img":case"image":case"link":bt("error",t),bt("load",t),r=i;break;case"details":bt("toggle",t),r=i;break;case"input":Bg(t,i),r=Yf(t,i),bt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=Pt({},i,{value:void 0}),bt("invalid",t);break;case"textarea":Vg(t,i),r=Zf(t,i),bt("invalid",t);break;default:r=i}Jf(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?Xv(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Wv(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Bo(t,l):typeof l=="number"&&Bo(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(zo.hasOwnProperty(s)?l!=null&&s==="onScroll"&&bt("scroll",t):l!=null&&qp(t,s,l,a))}switch(n){case"input":wl(t),Hg(t,i,!1);break;case"textarea":wl(t),Gg(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Br(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?xa(t,!!i.multiple,s,!1):i.defaultValue!=null&&xa(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=lu)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return sn(e),null;case 6:if(t&&e.stateNode!=null)mb(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ae(166));if(n=ds(Zo.current),ds(Pi.current),Dl(e)){if(i=e.stateNode,n=e.memoizedProps,i[Ei]=e,(s=i.nodeValue!==n)&&(t=Un,t!==null))switch(t.tag){case 3:Ll(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Ll(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Ei]=e,e.stateNode=i}return sn(e),null;case 13:if(Mt(Tt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Et&&In!==null&&e.mode&1&&!(e.flags&128))Dy(),Aa(),e.flags|=98560,s=!1;else if(s=Dl(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ae(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ae(317));s[Ei]=e}else Aa(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;sn(e),s=!1}else oi!==null&&(Ih(oi),oi=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Tt.current&1?Ht===0&&(Ht=3):Nm())),e.updateQueue!==null&&(e.flags|=4),sn(e),null);case 4:return Ra(),Th(t,e),t===null&&$o(e.stateNode.containerInfo),sn(e),null;case 10:return pm(e.type._context),sn(e),null;case 17:return Tn(e.type)&&cu(),sn(e),null;case 19:if(Mt(Tt),s=e.memoizedState,s===null)return sn(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)qa(s,!1);else{if(Ht!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=gu(t),a!==null){for(e.flags|=128,qa(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return vt(Tt,Tt.current&1|2),e.child}t=t.sibling}s.tail!==null&&kt()>Na&&(e.flags|=128,i=!0,qa(s,!1),e.lanes=4194304)}else{if(!i)if(t=gu(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),qa(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!Et)return sn(e),null}else 2*kt()-s.renderingStartTime>Na&&n!==1073741824&&(e.flags|=128,i=!0,qa(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=kt(),e.sibling=null,n=Tt.current,vt(Tt,i?n&1|2:n&1),e):(sn(e),null);case 22:case 23:return Pm(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Nn&1073741824&&(sn(e),e.subtreeFlags&6&&(e.flags|=8192)):sn(e),null;case 24:return null;case 25:return null}throw Error(ae(156,e.tag))}function Bw(t,e){switch(um(e),e.tag){case 1:return Tn(e.type)&&cu(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ra(),Mt(En),Mt(fn),vm(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return _m(e),null;case 13:if(Mt(Tt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ae(340));Aa()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Mt(Tt),null;case 4:return Ra(),null;case 10:return pm(e.type._context),null;case 22:case 23:return Pm(),null;case 24:return null;default:return null}}var Fl=!1,ln=!1,Hw=typeof WeakSet=="function"?WeakSet:Set,we=null;function la(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Lt(t,e,i)}else n.current=null}function Ah(t,e,n){try{n()}catch(i){Lt(t,e,i)}}var L0=!1;function Vw(t,e){if(uh=su,t=yy(),lm(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,c=0,u=0,f=t,d=null;t:for(;;){for(var p;f!==n||r!==0&&f.nodeType!==3||(o=a+r),f!==s||i!==0&&f.nodeType!==3||(l=a+i),f.nodeType===3&&(a+=f.nodeValue.length),(p=f.firstChild)!==null;)d=f,f=p;for(;;){if(f===t)break t;if(d===n&&++c===r&&(o=a),d===s&&++u===i&&(l=a),(p=f.nextSibling)!==null)break;f=d,d=f.parentNode}f=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(dh={focusedElem:t,selectionRange:n},su=!1,we=e;we!==null;)if(e=we,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,we=t;else for(;we!==null;){e=we;try{var x=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var y=x.memoizedProps,m=x.memoizedState,h=e.stateNode,_=h.getSnapshotBeforeUpdate(e.elementType===e.type?y:si(e.type,y),m);h.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var M=e.stateNode.containerInfo;M.nodeType===1?M.textContent="":M.nodeType===9&&M.documentElement&&M.removeChild(M.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ae(163))}}catch(b){Lt(e,e.return,b)}if(t=e.sibling,t!==null){t.return=e.return,we=t;break}we=e.return}return x=L0,L0=!1,x}function Ao(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Ah(e,n,s)}r=r.next}while(r!==i)}}function Qu(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Ch(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function gb(t){var e=t.alternate;e!==null&&(t.alternate=null,gb(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Ei],delete e[qo],delete e[ph],delete e[ww],delete e[Ew])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function xb(t){return t.tag===5||t.tag===3||t.tag===4}function D0(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||xb(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Rh(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=lu));else if(i!==4&&(t=t.child,t!==null))for(Rh(t,e,n),t=t.sibling;t!==null;)Rh(t,e,n),t=t.sibling}function Ph(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Ph(t,e,n),t=t.sibling;t!==null;)Ph(t,e,n),t=t.sibling}var Zt=null,ai=!1;function dr(t,e,n){for(n=n.child;n!==null;)_b(t,e,n),n=n.sibling}function _b(t,e,n){if(Ri&&typeof Ri.onCommitFiberUnmount=="function")try{Ri.onCommitFiberUnmount(Wu,n)}catch{}switch(n.tag){case 5:ln||la(n,e);case 6:var i=Zt,r=ai;Zt=null,dr(t,e,n),Zt=i,ai=r,Zt!==null&&(ai?(t=Zt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Zt.removeChild(n.stateNode));break;case 18:Zt!==null&&(ai?(t=Zt,n=n.stateNode,t.nodeType===8?kd(t.parentNode,n):t.nodeType===1&&kd(t,n),Wo(t)):kd(Zt,n.stateNode));break;case 4:i=Zt,r=ai,Zt=n.stateNode.containerInfo,ai=!0,dr(t,e,n),Zt=i,ai=r;break;case 0:case 11:case 14:case 15:if(!ln&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Ah(n,e,a),r=r.next}while(r!==i)}dr(t,e,n);break;case 1:if(!ln&&(la(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){Lt(n,e,o)}dr(t,e,n);break;case 21:dr(t,e,n);break;case 22:n.mode&1?(ln=(i=ln)||n.memoizedState!==null,dr(t,e,n),ln=i):dr(t,e,n);break;default:dr(t,e,n)}}function I0(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Hw),e.forEach(function(i){var r=Zw.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function ti(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:Zt=o.stateNode,ai=!1;break e;case 3:Zt=o.stateNode.containerInfo,ai=!0;break e;case 4:Zt=o.stateNode.containerInfo,ai=!0;break e}o=o.return}if(Zt===null)throw Error(ae(160));_b(s,a,r),Zt=null,ai=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Lt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)vb(e,t),e=e.sibling}function vb(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(ti(e,t),xi(t),i&4){try{Ao(3,t,t.return),Qu(3,t)}catch(y){Lt(t,t.return,y)}try{Ao(5,t,t.return)}catch(y){Lt(t,t.return,y)}}break;case 1:ti(e,t),xi(t),i&512&&n!==null&&la(n,n.return);break;case 5:if(ti(e,t),xi(t),i&512&&n!==null&&la(n,n.return),t.flags&32){var r=t.stateNode;try{Bo(r,"")}catch(y){Lt(t,t.return,y)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&Hv(r,s),eh(o,a);var c=eh(o,s);for(a=0;a<l.length;a+=2){var u=l[a],f=l[a+1];u==="style"?Xv(r,f):u==="dangerouslySetInnerHTML"?Wv(r,f):u==="children"?Bo(r,f):qp(r,u,f,c)}switch(o){case"input":qf(r,s);break;case"textarea":Vv(r,s);break;case"select":var d=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?xa(r,!!s.multiple,p,!1):d!==!!s.multiple&&(s.defaultValue!=null?xa(r,!!s.multiple,s.defaultValue,!0):xa(r,!!s.multiple,s.multiple?[]:"",!1))}r[qo]=s}catch(y){Lt(t,t.return,y)}}break;case 6:if(ti(e,t),xi(t),i&4){if(t.stateNode===null)throw Error(ae(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(y){Lt(t,t.return,y)}}break;case 3:if(ti(e,t),xi(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Wo(e.containerInfo)}catch(y){Lt(t,t.return,y)}break;case 4:ti(e,t),xi(t);break;case 13:ti(e,t),xi(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Cm=kt())),i&4&&I0(t);break;case 22:if(u=n!==null&&n.memoizedState!==null,t.mode&1?(ln=(c=ln)||u,ti(e,t),ln=c):ti(e,t),xi(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!u&&t.mode&1)for(we=t,u=t.child;u!==null;){for(f=we=u;we!==null;){switch(d=we,p=d.child,d.tag){case 0:case 11:case 14:case 15:Ao(4,d,d.return);break;case 1:la(d,d.return);var x=d.stateNode;if(typeof x.componentWillUnmount=="function"){i=d,n=d.return;try{e=i,x.props=e.memoizedProps,x.state=e.memoizedState,x.componentWillUnmount()}catch(y){Lt(i,n,y)}}break;case 5:la(d,d.return);break;case 22:if(d.memoizedState!==null){F0(f);continue}}p!==null?(p.return=d,we=p):F0(f)}u=u.sibling}e:for(u=null,f=t;;){if(f.tag===5){if(u===null){u=f;try{r=f.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=f.stateNode,l=f.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=jv("display",a))}catch(y){Lt(t,t.return,y)}}}else if(f.tag===6){if(u===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(y){Lt(t,t.return,y)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;u===f&&(u=null),f=f.return}u===f&&(u=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:ti(e,t),xi(t),i&4&&I0(t);break;case 21:break;default:ti(e,t),xi(t)}}function xi(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(xb(n)){var i=n;break e}n=n.return}throw Error(ae(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Bo(r,""),i.flags&=-33);var s=D0(t);Ph(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=D0(t);Rh(t,o,a);break;default:throw Error(ae(161))}}catch(l){Lt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Gw(t,e,n){we=t,yb(t)}function yb(t,e,n){for(var i=(t.mode&1)!==0;we!==null;){var r=we,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||Fl;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||ln;o=Fl;var c=ln;if(Fl=a,(ln=l)&&!c)for(we=r;we!==null;)a=we,l=a.child,a.tag===22&&a.memoizedState!==null?U0(r):l!==null?(l.return=a,we=l):U0(r);for(;s!==null;)we=s,yb(s),s=s.sibling;we=r,Fl=o,ln=c}k0(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,we=s):k0(t)}}function k0(t){for(;we!==null;){var e=we;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:ln||Qu(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!ln)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:si(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&v0(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}v0(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var f=u.dehydrated;f!==null&&Wo(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ae(163))}ln||e.flags&512&&Ch(e)}catch(d){Lt(e,e.return,d)}}if(e===t){we=null;break}if(n=e.sibling,n!==null){n.return=e.return,we=n;break}we=e.return}}function F0(t){for(;we!==null;){var e=we;if(e===t){we=null;break}var n=e.sibling;if(n!==null){n.return=e.return,we=n;break}we=e.return}}function U0(t){for(;we!==null;){var e=we;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Qu(4,e)}catch(l){Lt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Lt(e,r,l)}}var s=e.return;try{Ch(e)}catch(l){Lt(e,s,l)}break;case 5:var a=e.return;try{Ch(e)}catch(l){Lt(e,a,l)}}}catch(l){Lt(e,e.return,l)}if(e===t){we=null;break}var o=e.sibling;if(o!==null){o.return=e.return,we=o;break}we=e.return}}var Ww=Math.ceil,vu=or.ReactCurrentDispatcher,Tm=or.ReactCurrentOwner,qn=or.ReactCurrentBatchConfig,nt=0,Yt=null,zt=null,Jt=0,Nn=0,ca=jr(0),Ht=0,tl=null,Ss=0,Ju=0,Am=0,Co=null,Sn=null,Cm=0,Na=1/0,Wi=null,yu=!1,Nh=null,kr=null,Ul=!1,Tr=null,bu=0,Ro=0,Lh=null,Uc=-1,Oc=0;function xn(){return nt&6?kt():Uc!==-1?Uc:Uc=kt()}function Fr(t){return t.mode&1?nt&2&&Jt!==0?Jt&-Jt:Aw.transition!==null?(Oc===0&&(Oc=ry()),Oc):(t=ft,t!==0||(t=window.event,t=t===void 0?16:dy(t.type)),t):1}function fi(t,e,n,i){if(50<Ro)throw Ro=0,Lh=null,Error(ae(185));fl(t,n,i),(!(nt&2)||t!==Yt)&&(t===Yt&&(!(nt&2)&&(Ju|=n),Ht===4&&Mr(t,Jt)),An(t,i),n===1&&nt===0&&!(e.mode&1)&&(Na=kt()+500,qu&&Xr()))}function An(t,e){var n=t.callbackNode;A1(t,e);var i=ru(t,t===Yt?Jt:0);if(i===0)n!==null&&Xg(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Xg(n),e===1)t.tag===0?Tw(O0.bind(null,t)):Py(O0.bind(null,t)),Sw(function(){!(nt&6)&&Xr()}),n=null;else{switch(sy(i)){case 1:n=em;break;case 4:n=ny;break;case 16:n=iu;break;case 536870912:n=iy;break;default:n=iu}n=Cb(n,bb.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function bb(t,e){if(Uc=-1,Oc=0,nt&6)throw Error(ae(327));var n=t.callbackNode;if(Sa()&&t.callbackNode!==n)return null;var i=ru(t,t===Yt?Jt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Su(t,i);else{e=i;var r=nt;nt|=2;var s=Mb();(Yt!==t||Jt!==e)&&(Wi=null,Na=kt()+500,gs(t,e));do try{$w();break}catch(o){Sb(t,o)}while(!0);hm(),vu.current=s,nt=r,zt!==null?e=0:(Yt=null,Jt=0,e=Ht)}if(e!==0){if(e===2&&(r=sh(t),r!==0&&(i=r,e=Dh(t,r))),e===1)throw n=tl,gs(t,0),Mr(t,i),An(t,kt()),n;if(e===6)Mr(t,i);else{if(r=t.current.alternate,!(i&30)&&!jw(r)&&(e=Su(t,i),e===2&&(s=sh(t),s!==0&&(i=s,e=Dh(t,s))),e===1))throw n=tl,gs(t,0),Mr(t,i),An(t,kt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ae(345));case 2:ss(t,Sn,Wi);break;case 3:if(Mr(t,i),(i&130023424)===i&&(e=Cm+500-kt(),10<e)){if(ru(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){xn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=hh(ss.bind(null,t,Sn,Wi),e);break}ss(t,Sn,Wi);break;case 4:if(Mr(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-di(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=kt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Ww(i/1960))-i,10<i){t.timeoutHandle=hh(ss.bind(null,t,Sn,Wi),i);break}ss(t,Sn,Wi);break;case 5:ss(t,Sn,Wi);break;default:throw Error(ae(329))}}}return An(t,kt()),t.callbackNode===n?bb.bind(null,t):null}function Dh(t,e){var n=Co;return t.current.memoizedState.isDehydrated&&(gs(t,e).flags|=256),t=Su(t,e),t!==2&&(e=Sn,Sn=n,e!==null&&Ih(e)),t}function Ih(t){Sn===null?Sn=t:Sn.push.apply(Sn,t)}function jw(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!pi(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Mr(t,e){for(e&=~Am,e&=~Ju,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-di(e),i=1<<n;t[n]=-1,e&=~i}}function O0(t){if(nt&6)throw Error(ae(327));Sa();var e=ru(t,0);if(!(e&1))return An(t,kt()),null;var n=Su(t,e);if(t.tag!==0&&n===2){var i=sh(t);i!==0&&(e=i,n=Dh(t,i))}if(n===1)throw n=tl,gs(t,0),Mr(t,e),An(t,kt()),n;if(n===6)throw Error(ae(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,ss(t,Sn,Wi),An(t,kt()),null}function Rm(t,e){var n=nt;nt|=1;try{return t(e)}finally{nt=n,nt===0&&(Na=kt()+500,qu&&Xr())}}function Ms(t){Tr!==null&&Tr.tag===0&&!(nt&6)&&Sa();var e=nt;nt|=1;var n=qn.transition,i=ft;try{if(qn.transition=null,ft=1,t)return t()}finally{ft=i,qn.transition=n,nt=e,!(nt&6)&&Xr()}}function Pm(){Nn=ca.current,Mt(ca)}function gs(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,bw(n)),zt!==null)for(n=zt.return;n!==null;){var i=n;switch(um(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&cu();break;case 3:Ra(),Mt(En),Mt(fn),vm();break;case 5:_m(i);break;case 4:Ra();break;case 13:Mt(Tt);break;case 19:Mt(Tt);break;case 10:pm(i.type._context);break;case 22:case 23:Pm()}n=n.return}if(Yt=t,zt=t=Ur(t.current,null),Jt=Nn=e,Ht=0,tl=null,Am=Ju=Ss=0,Sn=Co=null,us!==null){for(e=0;e<us.length;e++)if(n=us[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}us=null}return t}function Sb(t,e){do{var n=zt;try{if(hm(),Ic.current=_u,xu){for(var i=Ct.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}xu=!1}if(bs=0,$t=Bt=Ct=null,To=!1,Qo=0,Tm.current=null,n===null||n.return===null){Ht=1,tl=e,zt=null;break}e:{var s=t,a=n.return,o=n,l=e;if(e=Jt,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=o,f=u.tag;if(!(u.mode&1)&&(f===0||f===11||f===15)){var d=u.alternate;d?(u.updateQueue=d.updateQueue,u.memoizedState=d.memoizedState,u.lanes=d.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=E0(a);if(p!==null){p.flags&=-257,T0(p,a,o,s,e),p.mode&1&&w0(s,c,e),e=p,l=c;var x=e.updateQueue;if(x===null){var y=new Set;y.add(l),e.updateQueue=y}else x.add(l);break e}else{if(!(e&1)){w0(s,c,e),Nm();break e}l=Error(ae(426))}}else if(Et&&o.mode&1){var m=E0(a);if(m!==null){!(m.flags&65536)&&(m.flags|=256),T0(m,a,o,s,e),dm(Pa(l,o));break e}}s=l=Pa(l,o),Ht!==4&&(Ht=2),Co===null?Co=[s]:Co.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var h=sb(s,l,e);_0(s,h);break e;case 1:o=l;var _=s.type,M=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||M!==null&&typeof M.componentDidCatch=="function"&&(kr===null||!kr.has(M)))){s.flags|=65536,e&=-e,s.lanes|=e;var b=ab(s,o,e);_0(s,b);break e}}s=s.return}while(s!==null)}Eb(n)}catch(S){e=S,zt===n&&n!==null&&(zt=n=n.return);continue}break}while(!0)}function Mb(){var t=vu.current;return vu.current=_u,t===null?_u:t}function Nm(){(Ht===0||Ht===3||Ht===2)&&(Ht=4),Yt===null||!(Ss&268435455)&&!(Ju&268435455)||Mr(Yt,Jt)}function Su(t,e){var n=nt;nt|=2;var i=Mb();(Yt!==t||Jt!==e)&&(Wi=null,gs(t,e));do try{Xw();break}catch(r){Sb(t,r)}while(!0);if(hm(),nt=n,vu.current=i,zt!==null)throw Error(ae(261));return Yt=null,Jt=0,Ht}function Xw(){for(;zt!==null;)wb(zt)}function $w(){for(;zt!==null&&!_1();)wb(zt)}function wb(t){var e=Ab(t.alternate,t,Nn);t.memoizedProps=t.pendingProps,e===null?Eb(t):zt=e,Tm.current=null}function Eb(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=Bw(n,e),n!==null){n.flags&=32767,zt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ht=6,zt=null;return}}else if(n=zw(n,e,Nn),n!==null){zt=n;return}if(e=e.sibling,e!==null){zt=e;return}zt=e=t}while(e!==null);Ht===0&&(Ht=5)}function ss(t,e,n){var i=ft,r=qn.transition;try{qn.transition=null,ft=1,Yw(t,e,n,i)}finally{qn.transition=r,ft=i}return null}function Yw(t,e,n,i){do Sa();while(Tr!==null);if(nt&6)throw Error(ae(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ae(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(C1(t,s),t===Yt&&(zt=Yt=null,Jt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ul||(Ul=!0,Cb(iu,function(){return Sa(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=qn.transition,qn.transition=null;var a=ft;ft=1;var o=nt;nt|=4,Tm.current=null,Vw(t,n),vb(n,t),pw(dh),su=!!uh,dh=uh=null,t.current=n,Gw(n),v1(),nt=o,ft=a,qn.transition=s}else t.current=n;if(Ul&&(Ul=!1,Tr=t,bu=r),s=t.pendingLanes,s===0&&(kr=null),S1(n.stateNode),An(t,kt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(yu)throw yu=!1,t=Nh,Nh=null,t;return bu&1&&t.tag!==0&&Sa(),s=t.pendingLanes,s&1?t===Lh?Ro++:(Ro=0,Lh=t):Ro=0,Xr(),null}function Sa(){if(Tr!==null){var t=sy(bu),e=qn.transition,n=ft;try{if(qn.transition=null,ft=16>t?16:t,Tr===null)var i=!1;else{if(t=Tr,Tr=null,bu=0,nt&6)throw Error(ae(331));var r=nt;for(nt|=4,we=t.current;we!==null;){var s=we,a=s.child;if(we.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var c=o[l];for(we=c;we!==null;){var u=we;switch(u.tag){case 0:case 11:case 15:Ao(8,u,s)}var f=u.child;if(f!==null)f.return=u,we=f;else for(;we!==null;){u=we;var d=u.sibling,p=u.return;if(gb(u),u===c){we=null;break}if(d!==null){d.return=p,we=d;break}we=p}}}var x=s.alternate;if(x!==null){var y=x.child;if(y!==null){x.child=null;do{var m=y.sibling;y.sibling=null,y=m}while(y!==null)}}we=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,we=a;else e:for(;we!==null;){if(s=we,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Ao(9,s,s.return)}var h=s.sibling;if(h!==null){h.return=s.return,we=h;break e}we=s.return}}var _=t.current;for(we=_;we!==null;){a=we;var M=a.child;if(a.subtreeFlags&2064&&M!==null)M.return=a,we=M;else e:for(a=_;we!==null;){if(o=we,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:Qu(9,o)}}catch(S){Lt(o,o.return,S)}if(o===a){we=null;break e}var b=o.sibling;if(b!==null){b.return=o.return,we=b;break e}we=o.return}}if(nt=r,Xr(),Ri&&typeof Ri.onPostCommitFiberRoot=="function")try{Ri.onPostCommitFiberRoot(Wu,t)}catch{}i=!0}return i}finally{ft=n,qn.transition=e}}return!1}function z0(t,e,n){e=Pa(n,e),e=sb(t,e,1),t=Ir(t,e,1),e=xn(),t!==null&&(fl(t,1,e),An(t,e))}function Lt(t,e,n){if(t.tag===3)z0(t,t,n);else for(;e!==null;){if(e.tag===3){z0(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(kr===null||!kr.has(i))){t=Pa(n,t),t=ab(e,t,1),e=Ir(e,t,1),t=xn(),e!==null&&(fl(e,1,t),An(e,t));break}}e=e.return}}function qw(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=xn(),t.pingedLanes|=t.suspendedLanes&n,Yt===t&&(Jt&n)===n&&(Ht===4||Ht===3&&(Jt&130023424)===Jt&&500>kt()-Cm?gs(t,0):Am|=n),An(t,e)}function Tb(t,e){e===0&&(t.mode&1?(e=Al,Al<<=1,!(Al&130023424)&&(Al=4194304)):e=1);var n=xn();t=ir(t,e),t!==null&&(fl(t,e,n),An(t,n))}function Kw(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Tb(t,n)}function Zw(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ae(314))}i!==null&&i.delete(e),Tb(t,n)}var Ab;Ab=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||En.current)wn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return wn=!1,Ow(t,e,n);wn=!!(t.flags&131072)}else wn=!1,Et&&e.flags&1048576&&Ny(e,fu,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Fc(t,e),t=e.pendingProps;var r=Ta(e,fn.current);ba(e,n),r=bm(null,e,i,t,r,n);var s=Sm();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Tn(i)?(s=!0,uu(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,gm(e),r.updater=Zu,e.stateNode=r,r._reactInternals=e,yh(e,i,t,n),e=Mh(null,e,i,!0,s,n)):(e.tag=0,Et&&s&&cm(e),gn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Fc(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=Jw(i),t=si(i,t),r){case 0:e=Sh(null,e,i,t,n);break e;case 1:e=R0(null,e,i,t,n);break e;case 11:e=A0(null,e,i,t,n);break e;case 14:e=C0(null,e,i,si(i.type,t),n);break e}throw Error(ae(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:si(i,r),Sh(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:si(i,r),R0(t,e,i,r,n);case 3:e:{if(ub(e),t===null)throw Error(ae(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Uy(t,e),mu(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Pa(Error(ae(423)),e),e=P0(t,e,i,n,r);break e}else if(i!==r){r=Pa(Error(ae(424)),e),e=P0(t,e,i,n,r);break e}else for(In=Dr(e.stateNode.containerInfo.firstChild),Un=e,Et=!0,oi=null,n=ky(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Aa(),i===r){e=rr(t,e,n);break e}gn(t,e,i,n)}e=e.child}return e;case 5:return Oy(e),t===null&&xh(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,fh(i,r)?a=null:s!==null&&fh(i,s)&&(e.flags|=32),cb(t,e),gn(t,e,a,n),e.child;case 6:return t===null&&xh(e),null;case 13:return db(t,e,n);case 4:return xm(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Ca(e,null,i,n):gn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:si(i,r),A0(t,e,i,r,n);case 7:return gn(t,e,e.pendingProps,n),e.child;case 8:return gn(t,e,e.pendingProps.children,n),e.child;case 12:return gn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,vt(hu,i._currentValue),i._currentValue=a,s!==null)if(pi(s.value,a)){if(s.children===r.children&&!En.current){e=rr(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Qi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),_h(s.return,n,e),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(ae(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),_h(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}gn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,ba(e,n),r=Zn(r),i=i(r),e.flags|=1,gn(t,e,i,n),e.child;case 14:return i=e.type,r=si(i,e.pendingProps),r=si(i.type,r),C0(t,e,i,r,n);case 15:return ob(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:si(i,r),Fc(t,e),e.tag=1,Tn(i)?(t=!0,uu(e)):t=!1,ba(e,n),rb(e,i,r),yh(e,i,r,n),Mh(null,e,i,!0,t,n);case 19:return fb(t,e,n);case 22:return lb(t,e,n)}throw Error(ae(156,e.tag))};function Cb(t,e){return ty(t,e)}function Qw(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Yn(t,e,n,i){return new Qw(t,e,n,i)}function Lm(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Jw(t){if(typeof t=="function")return Lm(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Zp)return 11;if(t===Qp)return 14}return 2}function Ur(t,e){var n=t.alternate;return n===null?(n=Yn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function zc(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")Lm(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case Js:return xs(n.children,r,s,e);case Kp:a=8,r|=8;break;case Wf:return t=Yn(12,n,e,r|2),t.elementType=Wf,t.lanes=s,t;case jf:return t=Yn(13,n,e,r),t.elementType=jf,t.lanes=s,t;case Xf:return t=Yn(19,n,e,r),t.elementType=Xf,t.lanes=s,t;case Ov:return ed(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Fv:a=10;break e;case Uv:a=9;break e;case Zp:a=11;break e;case Qp:a=14;break e;case vr:a=16,i=null;break e}throw Error(ae(130,t==null?t:typeof t,""))}return e=Yn(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function xs(t,e,n,i){return t=Yn(7,t,i,e),t.lanes=n,t}function ed(t,e,n,i){return t=Yn(22,t,i,e),t.elementType=Ov,t.lanes=n,t.stateNode={isHidden:!1},t}function Gd(t,e,n){return t=Yn(6,t,null,e),t.lanes=n,t}function Wd(t,e,n){return e=Yn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function eE(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=wd(0),this.expirationTimes=wd(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=wd(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Dm(t,e,n,i,r,s,a,o,l){return t=new eE(t,e,n,o,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Yn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},gm(s),t}function tE(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Qs,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function Rb(t){if(!t)return Hr;t=t._reactInternals;e:{if(Ps(t)!==t||t.tag!==1)throw Error(ae(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Tn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ae(171))}if(t.tag===1){var n=t.type;if(Tn(n))return Ry(t,n,e)}return e}function Pb(t,e,n,i,r,s,a,o,l){return t=Dm(n,i,!0,t,r,s,a,o,l),t.context=Rb(null),n=t.current,i=xn(),r=Fr(n),s=Qi(i,r),s.callback=e??null,Ir(n,s,r),t.current.lanes=r,fl(t,r,i),An(t,i),t}function td(t,e,n,i){var r=e.current,s=xn(),a=Fr(r);return n=Rb(n),e.context===null?e.context=n:e.pendingContext=n,e=Qi(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Ir(r,e,a),t!==null&&(fi(t,r,a,s),Dc(t,r,a)),a}function Mu(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function B0(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Im(t,e){B0(t,e),(t=t.alternate)&&B0(t,e)}function nE(){return null}var Nb=typeof reportError=="function"?reportError:function(t){console.error(t)};function km(t){this._internalRoot=t}nd.prototype.render=km.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ae(409));td(t,e,null,null)};nd.prototype.unmount=km.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Ms(function(){td(null,t,null,null)}),e[nr]=null}};function nd(t){this._internalRoot=t}nd.prototype.unstable_scheduleHydration=function(t){if(t){var e=ly();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Sr.length&&e!==0&&e<Sr[n].priority;n++);Sr.splice(n,0,t),n===0&&uy(t)}};function Fm(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function id(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function H0(){}function iE(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Mu(a);s.call(c)}}var a=Pb(e,i,t,0,null,!1,!1,"",H0);return t._reactRootContainer=a,t[nr]=a.current,$o(t.nodeType===8?t.parentNode:t),Ms(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var c=Mu(l);o.call(c)}}var l=Dm(t,0,!1,null,null,!1,!1,"",H0);return t._reactRootContainer=l,t[nr]=l.current,$o(t.nodeType===8?t.parentNode:t),Ms(function(){td(e,l,n,i)}),l}function rd(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=Mu(a);o.call(l)}}td(e,a,t,r)}else a=iE(n,e,t,r,i);return Mu(a)}ay=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=fo(e.pendingLanes);n!==0&&(tm(e,n|1),An(e,kt()),!(nt&6)&&(Na=kt()+500,Xr()))}break;case 13:Ms(function(){var i=ir(t,1);if(i!==null){var r=xn();fi(i,t,1,r)}}),Im(t,1)}};nm=function(t){if(t.tag===13){var e=ir(t,134217728);if(e!==null){var n=xn();fi(e,t,134217728,n)}Im(t,134217728)}};oy=function(t){if(t.tag===13){var e=Fr(t),n=ir(t,e);if(n!==null){var i=xn();fi(n,t,e,i)}Im(t,e)}};ly=function(){return ft};cy=function(t,e){var n=ft;try{return ft=t,e()}finally{ft=n}};nh=function(t,e,n){switch(e){case"input":if(qf(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Yu(i);if(!r)throw Error(ae(90));Bv(i),qf(i,r)}}}break;case"textarea":Vv(t,n);break;case"select":e=n.value,e!=null&&xa(t,!!n.multiple,e,!1)}};qv=Rm;Kv=Ms;var rE={usingClientEntryPoint:!1,Events:[pl,ia,Yu,$v,Yv,Rm]},Ka={findFiberByHostInstance:cs,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},sE={bundleType:Ka.bundleType,version:Ka.version,rendererPackageName:Ka.rendererPackageName,rendererConfig:Ka.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:or.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Jv(t),t===null?null:t.stateNode},findFiberByHostInstance:Ka.findFiberByHostInstance||nE,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ol=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ol.isDisabled&&Ol.supportsFiber)try{Wu=Ol.inject(sE),Ri=Ol}catch{}}zn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=rE;zn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Fm(e))throw Error(ae(200));return tE(t,e,null,n)};zn.createRoot=function(t,e){if(!Fm(t))throw Error(ae(299));var n=!1,i="",r=Nb;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Dm(t,1,!1,null,null,n,!1,i,r),t[nr]=e.current,$o(t.nodeType===8?t.parentNode:t),new km(e)};zn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ae(188)):(t=Object.keys(t).join(","),Error(ae(268,t)));return t=Jv(e),t=t===null?null:t.stateNode,t};zn.flushSync=function(t){return Ms(t)};zn.hydrate=function(t,e,n){if(!id(e))throw Error(ae(200));return rd(null,t,e,!0,n)};zn.hydrateRoot=function(t,e,n){if(!Fm(t))throw Error(ae(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=Nb;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=Pb(e,null,t,1,n??null,r,!1,s,a),t[nr]=e.current,$o(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new nd(e)};zn.render=function(t,e,n){if(!id(e))throw Error(ae(200));return rd(null,t,e,!1,n)};zn.unmountComponentAtNode=function(t){if(!id(t))throw Error(ae(40));return t._reactRootContainer?(Ms(function(){rd(null,null,t,!1,function(){t._reactRootContainer=null,t[nr]=null})}),!0):!1};zn.unstable_batchedUpdates=Rm;zn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!id(n))throw Error(ae(200));if(t==null||t._reactInternals===void 0)throw Error(ae(38));return rd(t,e,n,!1,i)};zn.version="18.3.1-next-f1338f8080-20240426";function Lb(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Lb)}catch(t){console.error(t)}}Lb(),Lv.exports=zn;var aE=Lv.exports,V0=aE;Vf.createRoot=V0.createRoot,Vf.hydrateRoot=V0.hydrateRoot;function zl({imageSrc:t,polygon:e,onPolygonChange:n,sceneLabel:i,isDrawing:r,onToggleDrawing:s,accentColor:a="#38bdf8"}){const o=se.useRef(null),[l,c]=se.useState(e),[u,f]=se.useState(null),[d,p]=se.useState("freehand"),x=se.useRef(!1);se.useEffect(()=>{c(e)},[e]);const y=se.useCallback(v=>{if(!o.current)return null;const A=o.current.getBoundingClientRect(),R=Math.max(0,Math.min(1,(v.clientX-A.left)/A.width)),N=Math.max(0,Math.min(1,(v.clientY-A.top)/A.height));return[Math.round(R*1e3)/1e3,Math.round(N*1e3)/1e3]},[]),m=v=>{if(!r||v.target.closest(".annotator-toolbar"))return;const A=y(v);A&&d==="freehand"&&(x.current=!0,c([A]),n([A]))},h=v=>{if(!r||v.target.closest(".annotator-toolbar"))return;const A=y(v);A&&(f(A),d==="freehand"&&x.current&&c(R=>{if(R.length===0)return[A];const N=R[R.length-1];if(Math.hypot(A[0]-N[0],A[1]-N[1])>.015){const B=[...R,A];return n(B),B}return R}))},_=v=>{var A,R;r&&(v&&((R=(A=v.target).closest)!=null&&R.call(A,".annotator-toolbar"))||d==="freehand"&&x.current&&(x.current=!1,l.length>=3&&(n(l),s())))},M=v=>{if(!r||d!=="polygon"||v.target.closest(".annotator-toolbar"))return;const A=y(v);if(!A)return;if(l.length>=3){const[N,L]=l[0];if(Math.hypot(A[0]-N,A[1]-L)<.05){n(l),s();return}}const R=[...l,A];c(R),n(R)},b=v=>{v.stopPropagation(),l.length>=3&&(n(l),s())},S=v=>{v.stopPropagation(),c([]),n([]),f(null)},E=v=>{v.stopPropagation();const A=[[.2,.2],[.8,.2],[.8,.8],[.2,.8]];c(A),n(A)},C=l.length>=3;return g.jsxs("div",{ref:o,className:`polygon-annotator-container ${r?"drawing-active":""}`,onClick:M,onMouseDown:m,onMouseMove:h,onMouseUp:_,onMouseLeave:()=>{f(null),x.current&&_()},title:r?d==="freehand"?"Hold and drag mouse to freely draw any shape":"Click points to create polygon":"",children:[g.jsx("img",{src:t,alt:i,className:"annotator-bg-image"}),g.jsxs("svg",{className:"polygon-svg-overlay",viewBox:"0 0 100 100",preserveAspectRatio:"none",children:[C&&g.jsx("polygon",{points:l.map(([v,A])=>`${v*100},${A*100}`).join(" "),fill:a,fillOpacity:"0.25",stroke:a,strokeWidth:"2.2",strokeDasharray:r?"3,2":void 0,className:"polygon-filled-shape"}),r&&l.length>0&&!C&&g.jsx("polyline",{points:l.map(([v,A])=>`${v*100},${A*100}`).join(" "),fill:"none",stroke:a,strokeWidth:"2.2",strokeDasharray:"3,2"}),r&&d==="polygon"&&l.length>0&&u&&g.jsx("line",{x1:`${l[l.length-1][0]*100}`,y1:`${l[l.length-1][1]*100}`,x2:`${u[0]*100}`,y2:`${u[1]*100}`,stroke:a,strokeWidth:"1.5",strokeDasharray:"2,2",opacity:"0.85"}),l.map(([v,A],R)=>g.jsx("g",{children:g.jsx("circle",{cx:`${v*100}`,cy:`${A*100}`,r:R===0&&r&&l.length>=3?3.5:d==="freehand"?1.5:2.2,fill:R===0&&r&&l.length>=3?"#10b981":a,stroke:"#fff",strokeWidth:"0.8",className:R===0&&r&&l.length>=3?"closing-node":""})},R))]}),g.jsxs("div",{className:"annotator-toolbar",children:[g.jsx("button",{type:"button",className:`annotator-btn ${r?"btn-active":""}`,onClick:v=>{v.stopPropagation(),s()},title:r?"Stop drawing":"Draw shape on this scene",children:g.jsx("span",{children:r?"✏️ Drawing Active":"✏️ Draw Shape"})}),r&&g.jsxs("div",{className:"mode-toggle-group",children:[g.jsx("button",{type:"button",className:`mode-btn ${d==="freehand"?"active":""}`,onClick:v=>{v.stopPropagation(),p("freehand")},title:"Drag mouse freely to trace any shape or lake",children:"🖌️ Freehand"}),g.jsx("button",{type:"button",className:`mode-btn ${d==="polygon"?"active":""}`,onClick:v=>{v.stopPropagation(),p("polygon")},title:"Click point by point",children:"📐 Points"})]}),r&&l.length>=3&&g.jsx("button",{type:"button",className:"annotator-btn btn-finish",onClick:b,title:"Complete shape",children:g.jsx("span",{children:"✔ Finish Shape"})}),!C&&!r&&g.jsx("button",{type:"button",className:"annotator-btn btn-preset",onClick:E,title:"Place center Region of Interest polygon",children:g.jsx("span",{children:"🎯 Center ROI Preset"})}),C&&g.jsx("button",{type:"button",className:"annotator-btn btn-clear",onClick:S,title:"Clear shape",children:g.jsx("span",{children:"✕ Clear"})}),C&&g.jsx("div",{className:"annotator-stat-badge",children:g.jsxs("span",{children:["📐 ROI: ",l.length," pts"]})})]}),r&&g.jsx("div",{className:"drawing-helper-toast",children:g.jsx("span",{children:d==="freehand"?"🖱️ Click and drag mouse over any lake/region to freely sketch a shape":`Click to place points (${l.length} pts). Click P1 or 'Finish' to complete.`})}),g.jsx("style",{children:`
        .polygon-annotator-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 380px;
          border-radius: 8px;
          overflow: hidden;
          background: #020617;
          cursor: default;
          user-select: none;
          display: flex;
        }
        .polygon-annotator-container.drawing-active {
          cursor: crosshair;
        }
        .annotator-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .polygon-svg-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .polygon-filled-shape {
          filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.5));
        }
        .closing-node {
          animation: pulseNode 1.2s infinite ease-in-out;
        }
        @keyframes pulseNode {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.8; }
        }
        .annotator-toolbar {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          z-index: 20;
          pointer-events: auto;
          background: rgba(3, 7, 18, 0.82);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 8px;
          padding: 6px 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
        }
        .annotator-btn {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #e2e8f0;
          font-size: 0.76rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.15s ease;
          font-family: inherit;
        }
        .annotator-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          color: #ffffff;
          transform: translateY(-1px);
        }
        .annotator-btn.btn-active {
          background: rgba(14, 165, 233, 0.35);
          color: #7dd3fc;
          border-color: rgba(56, 189, 248, 0.8);
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
        }
        .annotator-btn.btn-finish {
          background: rgba(16, 185, 129, 0.35);
          color: #6ee7b7;
          border-color: rgba(16, 185, 129, 0.7);
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.3);
        }
        .annotator-btn.btn-finish:hover {
          background: rgba(16, 185, 129, 0.5);
          color: #fff;
        }
        .annotator-btn.btn-clear {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.4);
          color: #fca5a5;
        }
        .annotator-btn.btn-clear:hover {
          background: rgba(239, 68, 68, 0.35);
          color: #fff;
        }
        .annotator-btn.btn-preset {
          background: rgba(234, 179, 8, 0.15);
          border-color: rgba(234, 179, 8, 0.4);
          color: #fde047;
        }
        .annotator-btn.btn-preset:hover {
          background: rgba(234, 179, 8, 0.3);
          color: #fff;
        }
        .annotator-stat-badge {
          margin-left: auto;
          font-size: 0.72rem;
          font-weight: 700;
          color: #38bdf8;
          padding: 3px 8px;
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.35);
          border-radius: 6px;
        }
        .mode-toggle-group {
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 6px;
          padding: 2px;
          gap: 2px;
        }
        .mode-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .mode-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }
        .mode-btn.active {
          background: rgba(56, 189, 248, 0.25);
          color: #38bdf8;
          font-weight: 700;
        }
        .drawing-helper-toast {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(3, 7, 18, 0.92);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(56, 189, 248, 0.4);
          border-radius: 999px;
          padding: 6px 18px;
          font-size: 0.74rem;
          color: #bae6fd;
          text-align: center;
          z-index: 25;
          pointer-events: none;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.6);
          white-space: nowrap;
          max-width: 90%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `})]})}const oE=()=>typeof window<"u"&&("SpeechRecognition"in window||"webkitSpeechRecognition"in window),lE=new Set(["kya","hai","hain","kaise","kahan","kaha","kitna","kitni","kitne","batao","bataiye","batana","pehle","baad","badlav","badla","nuksan","dekh","dekho","dikh","dikhao","dikhaye","ye","yeh","wo","woh","isme","ismein","mai","mein","ko","se","aur","ka","ki","ke","par","hua","hui","huye","hue","hoga","hogi","honge","raha","rahi","rahe","chahiye","karo","kare","karein","kijiye","tasveer","chhavi","pani","baadh","imarat","nadi","kuch","sab","wala","wali","wale","bhi","nahi","nahin","matlab","thoda","jyada","zyada","yahan","wahan","khojo","dhundo","mil","mila","mile","farq","antar","bata","hume","hum","aap","tum","kyun","kab","kis","kisko","kaun","sirf","jungle","ped","sadak","bhavan","shehar","gaon","khet","fasal","sukha"]),cE=t=>!t||!t.trim()?{code:"auto",label:"Auto Detect"}:/[\u0900-\u097F]/.test(t)?{code:"hi-IN",label:"हिंदी (Hindi)"}:/[\u0980-\u09FF]/.test(t)?{code:"bn-IN",label:"বাংলা (Bengali)"}:/[\u0B80-\u0BFF]/.test(t)?{code:"ta-IN",label:"தமிழ் (Tamil)"}:/[\u0C00-\u0C7F]/.test(t)?{code:"te-IN",label:"తెలుగు (Telugu)"}:(t.toLowerCase().match(/\b[a-z]+\b/g)||[]).some(n=>lE.has(n))?{code:"hi-IN",label:"Hinglish (हिन्दी/EN)",isHinglish:!0}:{code:"en-IN",label:"English"},uE=[{title:"Urban Expansion & Buildings",icon:"🏢",query:"Identify all newly constructed buildings and infrastructure between these two scenes",preSample:"/SATQUERY-SEQUENCE/sat_015.webp",postSample:"/SATQUERY-SEQUENCE/sat_180.webp",preName:"Sentinel2_Urban_T1.webp",postName:"Sentinel2_Urban_T2.webp"},{title:"Flood Impact & Water Inundation",icon:"🌊",query:"Calculate the total flooded area in km² and list all affected settlements or roads",preSample:"/SATQUERY-SEQUENCE/sat_040.webp",postSample:"/SATQUERY-SEQUENCE/sat_220.webp",preName:"Sentinel1_Flood_T1.webp",postName:"Sentinel1_Flood_T2.webp"},{title:"Deforestation & Vegetation Loss",icon:"🌲",query:"Analyze NDVI vegetation changes and quantify canopy loss between pre and post imagery",preSample:"/SATQUERY-SEQUENCE/sat_060.webp",postSample:"/SATQUERY-SEQUENCE/sat_260.webp",preName:"Landsat8_Canopy_T1.webp",postName:"Landsat8_Canopy_T2.webp"},{title:"SAR-Optical Joint Verification",icon:"📡",query:"Perform joint SAR and optical change detection to penetrate cloud cover and verify damage",preSample:"/SATQUERY-SEQUENCE/sat_080.webp",postSample:"/SATQUERY-SEQUENCE/sat_300.webp",preName:"SAR_GF_Radar_T1.webp",postName:"Optical_S2_Target_T2.webp"}];function dE({onAnalyze:t,loading:e}){const[n,i]=se.useState(""),[r,s]=se.useState(),[a,o]=se.useState(),[l,c]=se.useState(""),[u,f]=se.useState(""),[d,p]=se.useState(""),[x,y]=se.useState(""),[m,h]=se.useState(),[_,M]=se.useState(),[b,S]=se.useState(!1),[E,C]=se.useState(!1),[v,A]=se.useState([]),[R,N]=se.useState([]),[L,B]=se.useState(!1),[D,O]=se.useState(!1),[Y,G]=se.useState(!0),[H,z]=se.useState(!1),[W,Q]=se.useState(!1),[le,ve]=se.useState(""),Ue=oE(),Fe=se.useRef(null),De=se.useRef(null),Z=se.useRef(null),te=se.useRef(null),be=v.length>=3?v:R.length>=3?R:[],Ie=be.length>=3,xe=ie=>{A(ie),Y&&N(ie)},He=ie=>{N(ie),Y&&A(ie)},ct=cE(n),Ve=se.useCallback(()=>{if(!Ue||W)return;const ie=window.SpeechRecognition||window.webkitSpeechRecognition,Ae=new ie;Ae.lang=ct.code==="hi-IN"?"hi-IN":navigator.language||"en-IN",Ae.interimResults=!1,Ae.maxAlternatives=1,Fe.current=Ae,Ae.onstart=()=>Q(!0),Ae.onend=()=>Q(!1),Ae.onerror=()=>Q(!1),Ae.onresult=P=>{const w=P.results[0][0].transcript;i(w),ve(`Heard: "${w}"`),De.current&&clearTimeout(De.current),De.current=setTimeout(()=>ve(""),3500)},Ae.start()},[Ue,W,ct.code]),Ge=se.useCallback(()=>{var ie;(ie=Fe.current)==null||ie.stop(),Q(!1)},[]);se.useEffect(()=>()=>{var ie;(ie=Fe.current)==null||ie.stop()},[]);const rt=ie=>ie<1024?`${ie} B`:ie<1024*1024?`${(ie/1024).toFixed(1)} KB`:`${(ie/(1024*1024)).toFixed(2)} MB`,Oe=(ie,Ae,P,w,F)=>{P(ie.name),w(rt(ie.size));const V=new FileReader;V.onload=()=>{const K=V.result;F(K),Ae(K.split(",")[1])},V.readAsDataURL(ie)},st=(ie,Ae,P,w,F)=>{var K;const V=(K=ie.target.files)==null?void 0:K[0];V&&Oe(V,Ae,P,w,F)},wt=(ie,Ae,P,w,F,V)=>{var oe;ie.preventDefault(),V(!1);const K=(oe=ie.dataTransfer.files)==null?void 0:oe[0];K&&K.type.startsWith("image/")&&Oe(K,Ae,P,w,F)},Wt=async(ie,Ae,P,w)=>{try{const[F,V]=await Promise.all([fetch(ie),fetch(Ae)]),[K,oe]=await Promise.all([F.blob(),V.blob()]);Oe(new File([K],P,{type:K.type||"image/webp"}),s,c,p,h),Oe(new File([oe],w,{type:oe.type||"image/webp"}),o,f,y,M)}catch(F){console.warn("Failed to load sample dataset",F)}},at=async(ie,Ae,P=!1)=>{try{const F=await(await fetch(ie)).blob(),V=new File([F],Ae,{type:F.type||"image/webp"});P?Oe(V,o,f,y,M):Oe(V,s,c,p,h)}catch(w){console.warn("Failed to load demo scene",w)}},ht=()=>{if(!n.trim()||e)return;const ie=ct.code!=="auto"?ct.code:"en-IN";t({question:n.trim(),image_b64:r,image2_b64:a,language:ie,polygon:Ie?be:void 0,roi_mode:Ie,target_scene:"both"},{prePreview:m,postPreview:_,preName:l,postName:u})},I=ie=>{ie.key==="Enter"&&(ie.ctrlKey||ie.metaKey)&&ht()};return g.jsxs("div",{className:"mission-setup-container fade-in",id:"mission-setup-view",children:[g.jsxs("div",{className:"mission-setup-hero",children:[g.jsxs("div",{className:"mission-phase-badge",children:[g.jsx("span",{className:"pulse-dot"}),g.jsx("span",{children:"PHASE 00 · MISSION INITIALIZATION"})]}),g.jsxs("h1",{className:"mission-title",children:["Mission ",g.jsx("span",{className:"gradient-text",children:"Setup"})]}),g.jsx("p",{className:"mission-subtitle",children:"Feed pre & post satellite acquisitions or a single target scene, then define your intelligence query."})]}),g.jsxs("div",{className:"observation-grid",children:[g.jsxs("div",{className:`obs-card obs-pre ${b?"drag-over":""} ${m?"has-content":""}`,onDragOver:ie=>{ie.preventDefault(),S(!0)},onDragLeave:()=>S(!1),onDrop:ie=>wt(ie,s,c,p,h,S),children:[g.jsx("input",{ref:Z,type:"file",accept:"image/*",style:{display:"none"},onChange:ie=>st(ie,s,c,p,h)}),g.jsxs("div",{className:"obs-card-header",children:[g.jsxs("div",{className:"obs-tag tag-cyan",children:[g.jsx("span",{className:"tag-dot"}),g.jsx("span",{children:"PRE OBSERVATION (T₁)"})]}),m?g.jsxs("div",{className:"obs-header-actions",children:[g.jsxs("span",{className:"obs-meta-pill",title:l,children:[l," (",d,")"]}),g.jsx("button",{type:"button",className:"obs-btn-remove",onClick:()=>{s(void 0),c(""),p(""),h(void 0),A([])},title:"Remove image",children:"✕"})]}):g.jsx("button",{type:"button",className:"obs-btn-demo",onClick:()=>at("/SATQUERY-SEQUENCE/sat_015.webp","Sentinel2_Baseline_T1.webp",!1),title:"Load sample baseline satellite image",children:"+ Load Sample T₁"})]}),g.jsx("div",{className:"obs-card-body",children:m?g.jsx("div",{className:"obs-preview-frame",children:g.jsx(zl,{imageSrc:m,polygon:v,onPolygonChange:xe,sceneLabel:"T₁ Baseline Scene",isDrawing:L,onToggleDrawing:()=>B(!L),accentColor:"#38bdf8"})}):g.jsxs("div",{className:"obs-upload-cta",onClick:()=>{var ie;return(ie=Z.current)==null?void 0:ie.click()},children:[g.jsx("div",{className:"obs-upload-icon-wrap",children:g.jsx("span",{className:"obs-icon",children:b?"📂":"🛰"})}),g.jsx("h3",{children:"Upload Pre-Event Imagery"}),g.jsx("p",{children:"Drag and drop raster or browse local disk"}),g.jsx("span",{className:"obs-file-types",children:"PNG · JPG · TIFF · GeoTIFF"}),g.jsxs("div",{className:"flex items-center gap-2 mt-3",children:[g.jsx("button",{type:"button",className:"btn btn-secondary btn-sm",onClick:ie=>{var Ae;ie.stopPropagation(),(Ae=Z.current)==null||Ae.click()},children:"Browse File"}),g.jsx("button",{type:"button",className:"btn btn-primary btn-sm",style:{background:"rgba(6, 182, 212, 0.2)",borderColor:"#06b6d4",color:"#67e8f9"},onClick:ie=>{ie.stopPropagation(),at("/SATQUERY-SEQUENCE/sat_015.webp","Sentinel2_Baseline_T1.webp",!1)},children:"Load Demo Scene"})]})]})})]}),g.jsxs("div",{className:`obs-card obs-post ${E?"drag-over":""} ${_?"has-content":""}`,onDragOver:ie=>{ie.preventDefault(),C(!0)},onDragLeave:()=>C(!1),onDrop:ie=>wt(ie,o,f,y,M,C),children:[g.jsx("input",{ref:te,type:"file",accept:"image/*",style:{display:"none"},onChange:ie=>st(ie,o,f,y,M)}),g.jsxs("div",{className:"obs-card-header",children:[g.jsxs("div",{className:"obs-tag tag-purple",children:[g.jsx("span",{className:"tag-dot"}),g.jsx("span",{children:"POST OBSERVATION (T₂)"})]}),_?g.jsxs("div",{className:"obs-header-actions",children:[g.jsxs("span",{className:"obs-meta-pill",title:u,children:[u," (",x,")"]}),g.jsx("button",{type:"button",className:"obs-btn-remove",onClick:()=>{o(void 0),f(""),y(""),M(void 0),N([])},title:"Remove image",children:"✕"})]}):g.jsx("button",{type:"button",className:"obs-btn-demo",onClick:()=>at("/SATQUERY-SEQUENCE/sat_180.webp","Sentinel2_Target_T2.webp",!0),title:"Load sample target satellite image",children:"+ Load Sample T₂"})]}),g.jsx("div",{className:"obs-card-body",children:_?g.jsx("div",{className:"obs-preview-frame",children:g.jsx(zl,{imageSrc:_,polygon:R,onPolygonChange:He,sceneLabel:"T₂ Target Scene",isDrawing:D,onToggleDrawing:()=>O(!D),accentColor:"#c084fc"})}):g.jsxs("div",{className:"obs-upload-cta",onClick:()=>{var ie;return(ie=te.current)==null?void 0:ie.click()},children:[g.jsx("div",{className:"obs-upload-icon-wrap",children:g.jsx("span",{className:"obs-icon",children:E?"📂":"🌍"})}),g.jsx("h3",{children:"Upload Post-Event Imagery"}),g.jsx("p",{children:"Drag and drop raster or browse local disk"}),g.jsx("span",{className:"obs-file-types",children:"PNG · JPG · TIFF · GeoTIFF"}),g.jsxs("div",{className:"flex items-center gap-2 mt-3",children:[g.jsx("button",{type:"button",className:"btn btn-secondary btn-sm",onClick:ie=>{var Ae;ie.stopPropagation(),(Ae=te.current)==null||Ae.click()},children:"Browse File"}),g.jsx("button",{type:"button",className:"btn btn-primary btn-sm",style:{background:"rgba(168, 85, 247, 0.2)",borderColor:"#a855f7",color:"#d8b4fe"},onClick:ie=>{ie.stopPropagation(),at("/SATQUERY-SEQUENCE/sat_180.webp","Sentinel2_Target_T2.webp",!0)},children:"Load Demo Scene"})]})]})})]})]}),(Ie||m&&_)&&g.jsxs("div",{className:"roi-telemetry-bar",children:[g.jsxs("div",{className:"roi-telemetry-left",children:[g.jsx("span",{className:"roi-badge-icon",children:"📐"}),g.jsxs("div",{children:[g.jsx("span",{className:"roi-status-text",children:Ie?`Polygon ROI Active (${be.length} vertices)`:"Bi-Temporal Baseline Loaded"}),g.jsx("p",{className:"roi-hint-text",children:Ie?"Analysis will be spatially constrained to this marked region.":"Ready for temporal change, spectral, and spatial analysis."})]})]}),g.jsxs("div",{className:"roi-telemetry-actions",children:[Ie&&g.jsx("button",{type:"button",className:`roi-sync-btn ${Y?"synced":""}`,onClick:()=>G(!Y),children:Y?"🔗 Linked T₁ ↔ T₂":"🔓 Independent"}),g.jsx("button",{type:"button",className:"roi-expand-btn",onClick:()=>z(!0),children:"🔍 Precision ROI Studio"})]})]}),g.jsxs("div",{className:"mission-query-card card",children:[g.jsxs("div",{className:"query-card-header",children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("span",{className:"query-header-icon",children:"❓"}),g.jsxs("div",{children:[g.jsx("h2",{className:"query-header-title",children:"WHAT DO YOU WANT TO KNOW?"}),g.jsx("p",{className:"query-header-sub",children:"Ask any question in natural language (English, Hindi, Hinglish)"})]})]}),g.jsxs("div",{className:`lang-pill ${ct.isHinglish?"lang-hinglish":""}`,children:[g.jsx("span",{className:"lang-indicator"}),g.jsx("span",{children:ct.code!=="auto"?ct.label:"Auto Detection"})]})]}),g.jsxs("div",{className:"query-input-wrapper",children:[g.jsx("textarea",{id:"query-input",className:"mission-textarea",placeholder:"e.g., Identify all destroyed or damaged structures between these two dates and estimate flooded area...",value:n,onChange:ie=>i(ie.target.value),onKeyDown:I,rows:3}),Ue&&g.jsx("button",{id:"mic-button",type:"button",className:`mission-mic-btn ${W?"listening":""}`,onClick:W?Ge:Ve,title:W?"Stop recording voice":"Speak query in English / Hindi",disabled:e,children:W?"🔴":"🎤"})]}),le&&g.jsxs("div",{className:"voice-transcription-toast fade-in",children:[g.jsx("span",{children:"🎙"}),g.jsx("span",{children:le})]}),g.jsxs("div",{className:"preset-missions-section",children:[g.jsx("span",{className:"preset-label",children:"QUICK MISSION PRESETS (CLICK TO AUTO-LOAD QUERY & SATELLITE SCENES):"}),g.jsx("div",{className:"preset-chips-grid",children:uE.map((ie,Ae)=>g.jsxs("button",{type:"button",className:"preset-chip",onClick:()=>{i(ie.query),Wt(ie.preSample,ie.postSample,ie.preName,ie.postName)},children:[g.jsx("span",{children:ie.icon}),g.jsx("span",{className:"preset-chip-title",children:ie.title})]},Ae))})]}),g.jsxs("div",{className:"mission-action-footer",children:[g.jsxs("div",{className:"mission-meta-cues",children:[g.jsxs("span",{children:["⌨ ",g.jsx("kbd",{children:"Ctrl"})," + ",g.jsx("kbd",{children:"Enter"})," to dispatch"]}),g.jsx("span",{children:"·"}),g.jsx("span",{children:"ISRO SIH26167 Engine Active"})]}),g.jsx("button",{id:"analyze-mission-btn",className:"btn btn-primary mission-analyze-btn",onClick:ht,disabled:!n.trim()||e,children:e?g.jsxs(g.Fragment,{children:[g.jsx("span",{className:"spinner"}),g.jsx("span",{children:"INITIALIZING SATELLITE COPILOT…"})]}):g.jsxs(g.Fragment,{children:[g.jsx("span",{children:"ANALYZE MISSION"}),g.jsx("span",{className:"btn-arrow",children:"→"})]})})]})]}),H&&g.jsx("div",{className:"visualizer-modal-backdrop fade-in",onClick:()=>z(!1),children:g.jsxs("div",{className:"visualizer-modal-dialog",onClick:ie=>ie.stopPropagation(),children:[g.jsxs("div",{className:"visualizer-header",children:[g.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:[g.jsx("span",{style:{fontSize:"1.4rem"},children:"🛰"}),g.jsxs("div",{children:[g.jsx("h3",{className:"visualizer-title",children:"Precision ROI Studio"}),g.jsx("p",{className:"visualizer-subtitle",children:"Large viewport inspection and freehand / polygon ROI drawing"})]})]}),g.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:[g.jsx("button",{type:"button",className:`roi-sync-toggle ${Y?"synced":""}`,onClick:()=>G(!Y),children:Y?"🔗 Linked T₁ ↔ T₂":"🔓 Independent"}),g.jsx("button",{type:"button",className:"visualizer-close-btn",onClick:()=>z(!1),children:"✕"})]})]}),g.jsxs("div",{className:"visualizer-stage-grid",children:[g.jsxs("div",{className:"visualizer-stage-panel panel-before",children:[g.jsxs("div",{className:"stage-panel-header",children:[g.jsx("span",{className:"stage-panel-tag tag-before",children:"T₁ · Before"}),l&&g.jsxs("span",{className:"stage-file-name",children:["📄 ",l]})]}),g.jsx("div",{className:"stage-annotator-container",children:m?g.jsx(zl,{imageSrc:m,polygon:v,onPolygonChange:xe,sceneLabel:"Scene 1 (Before)",isDrawing:L,onToggleDrawing:()=>B(!L),accentColor:"#38bdf8"}):g.jsxs("div",{className:"stage-empty-placeholder",onClick:()=>{var ie;return(ie=Z.current)==null?void 0:ie.click()},children:[g.jsx("span",{children:"📡"}),g.jsx("p",{children:"Upload Pre-Observation Image"})]})})]}),g.jsxs("div",{className:"visualizer-stage-panel panel-after",children:[g.jsxs("div",{className:"stage-panel-header",children:[g.jsx("span",{className:"stage-panel-tag tag-after",children:"T₂ · After"}),u&&g.jsxs("span",{className:"stage-file-name",children:["📄 ",u]})]}),g.jsx("div",{className:"stage-annotator-container",children:_?g.jsx(zl,{imageSrc:_,polygon:R,onPolygonChange:He,sceneLabel:"Scene 2 (After)",isDrawing:D,onToggleDrawing:()=>O(!D),accentColor:"#c084fc"}):g.jsxs("div",{className:"stage-empty-placeholder",onClick:()=>{var ie;return(ie=te.current)==null?void 0:ie.click()},children:[g.jsx("span",{children:"🌍"}),g.jsx("p",{children:"Upload Post-Observation Image"})]})})]})]}),g.jsxs("div",{className:"visualizer-footer",children:[g.jsx("div",{className:"visualizer-footer-left",children:g.jsx("input",{type:"text",className:"visualizer-prompt-input",value:n,onChange:ie=>i(ie.target.value),placeholder:"Define mission query for this marked ROI...",onKeyDown:I})}),g.jsxs("div",{className:"visualizer-footer-actions",children:[g.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>z(!1),children:"Done Editing"}),g.jsx("button",{type:"button",className:"btn btn-primary",onClick:()=>{z(!1),ht()},disabled:!n.trim()||e,children:"Analyze Mission →"})]})]})]})}),g.jsx("style",{children:`
        .mission-setup-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 2rem 1.5rem 5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .mission-setup-hero {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .mission-phase-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 4px 16px;
          border-radius: 999px;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.3);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
          margin-bottom: 0.85rem;
        }
        .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 10px #38bdf8;
          animation: pulse 2s infinite;
        }
        .mission-title {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          color: #ffffff;
        }
        .mission-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
          max-width: 680px;
          line-height: 1.55;
        }
        .observation-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.75rem;
        }
        .obs-card {
          background: rgba(15, 23, 42, 0.7);
          border: 1.5px dashed rgba(56, 189, 248, 0.25);
          border-radius: 16px;
          min-height: 420px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all 0.25s ease;
          box-shadow: 0 16px 35px -10px rgba(0,0,0,0.6);
        }
        .obs-card:hover {
          border-color: rgba(56, 189, 248, 0.5);
          box-shadow: 0 20px 45px -10px rgba(56, 189, 248, 0.15);
        }
        .obs-card.has-content {
          border-style: solid;
          background: rgba(11, 19, 41, 0.85);
          min-height: 460px;
        }
        .obs-card.drag-over {
          border-color: #38bdf8;
          background: rgba(56, 189, 248, 0.08);
          transform: scale(1.01);
        }
        .obs-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.25rem;
          background: rgba(0, 0, 0, 0.45);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .obs-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 3px 12px;
          border-radius: 999px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
        }
        .tag-cyan { background: rgba(6, 182, 212, 0.15); color: #67e8f9; border: 1px solid rgba(6, 182, 212, 0.4); }
        .tag-purple { background: rgba(168, 85, 247, 0.15); color: #d8b4fe; border: 1px solid rgba(168, 85, 247, 0.4); }
        .tag-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
        .obs-header-actions { display: flex; align-items: center; gap: 0.5rem; }
        .obs-meta-pill {
          font-size: 0.72rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.06);
          padding: 2px 8px;
          border-radius: 4px;
          max-width: 180px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .obs-btn-remove {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }
        .obs-btn-remove:hover { background: rgba(239, 68, 68, 0.35); color: #fff; }
        .obs-btn-demo {
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #7dd3fc;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .obs-btn-demo:hover {
          background: rgba(56, 189, 248, 0.25);
          color: #fff;
        }
        .obs-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .obs-preview-frame {
          flex: 1;
          display: flex;
          min-height: 400px;
          position: relative;
        }
        .obs-upload-cta {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1.5rem;
          text-align: center;
          cursor: pointer;
        }
        .obs-upload-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(56, 189, 248, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .obs-icon { font-size: 1.8rem; }
        .obs-upload-cta h3 { font-size: 1.05rem; font-weight: 700; color: #f8fafc; margin-bottom: 0.3rem; }
        .obs-upload-cta p { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.4rem; }
        .obs-file-types { font-family: var(--font-mono); font-size: 0.7rem; color: #64748b; letter-spacing: 0.05em; }
        
        .roi-telemetry-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1.4rem;
          background: rgba(14, 165, 233, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 12px;
          backdrop-filter: blur(12px);
        }
        .roi-telemetry-left { display: flex; align-items: center; gap: 0.85rem; }
        .roi-badge-icon { font-size: 1.4rem; }
        .roi-status-text { font-size: 0.86rem; font-weight: 700; color: #7dd3fc; }
        .roi-hint-text { font-size: 0.74rem; color: var(--text-secondary); margin: 0; }
        .roi-telemetry-actions { display: flex; align-items: center; gap: 0.75rem; }
        .roi-sync-btn, .roi-expand-btn {
          font-size: 0.76rem;
          font-weight: 600;
          padding: 5px 14px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .roi-sync-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: var(--text-secondary);
        }
        .roi-sync-btn.synced {
          background: rgba(56, 189, 248, 0.2);
          border-color: rgba(56, 189, 248, 0.5);
          color: #bae6fd;
        }
        .roi-expand-btn {
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.25), rgba(99, 102, 241, 0.3));
          border: 1px solid rgba(56, 189, 248, 0.5);
          color: #e0f2fe;
        }
        .roi-expand-btn:hover { background: rgba(14, 165, 233, 0.4); }

        .mission-query-card {
          padding: 1.75rem 2rem;
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(8, 14, 28, 0.95));
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 18px;
          box-shadow: 0 25px 60px -15px rgba(0,0,0,0.85), 0 0 35px rgba(56, 189, 248, 0.12);
        }
        .query-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .query-header-icon { font-size: 1.4rem; }
        .query-header-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: #ffffff;
          margin: 0;
        }
        .query-header-sub { font-size: 0.78rem; color: var(--text-muted); margin: 0; }
        .lang-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 4px 14px;
          border-radius: 999px;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
          font-size: 0.76rem;
          font-weight: 600;
        }
        .lang-pill.lang-hinglish {
          background: rgba(245, 158, 11, 0.12);
          border-color: rgba(245, 158, 11, 0.4);
          color: #f59e0b;
        }
        .lang-indicator { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

        .query-input-wrapper { position: relative; margin-bottom: 1rem; }
        .mission-textarea {
          width: 100%;
          min-height: 100px;
          background: rgba(3, 7, 18, 0.75);
          border: 1.5px solid rgba(56, 189, 248, 0.25);
          border-radius: 12px;
          padding: 1rem 3.5rem 1rem 1.2rem;
          color: #f8fafc;
          font-family: var(--font-sans);
          font-size: 1rem;
          line-height: 1.6;
          resize: vertical;
          outline: none;
          transition: all 0.2s ease;
        }
        .mission-textarea:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2), 0 0 25px rgba(56, 189, 248, 0.25);
        }
        .mission-mic-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #e2e8f0;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .mission-mic-btn:hover { background: rgba(56, 189, 248, 0.2); border-color: #38bdf8; }
        .mission-mic-btn.listening {
          background: rgba(239, 68, 68, 0.25);
          border-color: #ef4444;
          animation: pulse 1.5s infinite;
        }
        .voice-transcription-toast {
          padding: 0.6rem 1rem;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.35);
          border-radius: 8px;
          color: #6ee7b7;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .preset-missions-section {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .preset-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.12em;
          font-weight: 700;
        }
        .preset-chips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 0.6rem;
        }
        .preset-chip {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 8px 14px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          font-size: 0.78rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .preset-chip:hover {
          background: rgba(56, 189, 248, 0.12);
          border-color: rgba(56, 189, 248, 0.4);
          color: #f1f5f9;
          transform: translateY(-1px);
        }
        .mission-action-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
          gap: 1rem;
        }
        .mission-meta-cues {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .mission-meta-cues kbd {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 4px;
          padding: 1px 5px;
          font-size: 0.68rem;
          color: #cbd5e1;
        }
        .mission-analyze-btn {
          padding: 0.9rem 2.4rem;
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          border-radius: 12px;
          background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
          box-shadow: 0 0 30px rgba(37, 99, 235, 0.4);
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
        }
        .mission-analyze-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 0 45px rgba(56, 189, 248, 0.6);
        }
        .btn-arrow { font-size: 1.15rem; }

        @media (max-width: 900px) {
          .observation-grid { grid-template-columns: 1fr; }
          .obs-card { min-height: 340px; }
          .mission-setup-container { padding: 1rem 1rem 3rem; }
          .mission-action-footer { flex-direction: column; align-items: stretch; }
          .mission-analyze-btn { justify-content: center; }
        }
      `})]})}/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function gl(t){return t+.5|0}const Ar=(t,e,n)=>Math.max(Math.min(t,n),e);function po(t){return Ar(gl(t*2.55),0,255)}function Or(t){return Ar(gl(t*255),0,255)}function Xi(t){return Ar(gl(t/2.55)/100,0,1)}function G0(t){return Ar(gl(t*100),0,100)}const Vn={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},kh=[..."0123456789ABCDEF"],fE=t=>kh[t&15],hE=t=>kh[(t&240)>>4]+kh[t&15],Bl=t=>(t&240)>>4===(t&15),pE=t=>Bl(t.r)&&Bl(t.g)&&Bl(t.b)&&Bl(t.a);function mE(t){var e=t.length,n;return t[0]==="#"&&(e===4||e===5?n={r:255&Vn[t[1]]*17,g:255&Vn[t[2]]*17,b:255&Vn[t[3]]*17,a:e===5?Vn[t[4]]*17:255}:(e===7||e===9)&&(n={r:Vn[t[1]]<<4|Vn[t[2]],g:Vn[t[3]]<<4|Vn[t[4]],b:Vn[t[5]]<<4|Vn[t[6]],a:e===9?Vn[t[7]]<<4|Vn[t[8]]:255})),n}const gE=(t,e)=>t<255?e(t):"";function xE(t){var e=pE(t)?fE:hE;return t?"#"+e(t.r)+e(t.g)+e(t.b)+gE(t.a,e):void 0}const _E=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Db(t,e,n){const i=e*Math.min(n,1-n),r=(s,a=(s+t/30)%12)=>n-i*Math.max(Math.min(a-3,9-a,1),-1);return[r(0),r(8),r(4)]}function vE(t,e,n){const i=(r,s=(r+t/60)%6)=>n-n*e*Math.max(Math.min(s,4-s,1),0);return[i(5),i(3),i(1)]}function yE(t,e,n){const i=Db(t,1,.5);let r;for(e+n>1&&(r=1/(e+n),e*=r,n*=r),r=0;r<3;r++)i[r]*=1-e-n,i[r]+=e;return i}function bE(t,e,n,i,r){return t===r?(e-n)/i+(e<n?6:0):e===r?(n-t)/i+2:(t-e)/i+4}function Um(t){const n=t.r/255,i=t.g/255,r=t.b/255,s=Math.max(n,i,r),a=Math.min(n,i,r),o=(s+a)/2;let l,c,u;return s!==a&&(u=s-a,c=o>.5?u/(2-s-a):u/(s+a),l=bE(n,i,r,u,s),l=l*60+.5),[l|0,c||0,o]}function Om(t,e,n,i){return(Array.isArray(e)?t(e[0],e[1],e[2]):t(e,n,i)).map(Or)}function zm(t,e,n){return Om(Db,t,e,n)}function SE(t,e,n){return Om(yE,t,e,n)}function ME(t,e,n){return Om(vE,t,e,n)}function Ib(t){return(t%360+360)%360}function wE(t){const e=_E.exec(t);let n=255,i;if(!e)return;e[5]!==i&&(n=e[6]?po(+e[5]):Or(+e[5]));const r=Ib(+e[2]),s=+e[3]/100,a=+e[4]/100;return e[1]==="hwb"?i=SE(r,s,a):e[1]==="hsv"?i=ME(r,s,a):i=zm(r,s,a),{r:i[0],g:i[1],b:i[2],a:n}}function EE(t,e){var n=Um(t);n[0]=Ib(n[0]+e),n=zm(n),t.r=n[0],t.g=n[1],t.b=n[2]}function TE(t){if(!t)return;const e=Um(t),n=e[0],i=G0(e[1]),r=G0(e[2]);return t.a<255?`hsla(${n}, ${i}%, ${r}%, ${Xi(t.a)})`:`hsl(${n}, ${i}%, ${r}%)`}const W0={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},j0={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function AE(){const t={},e=Object.keys(j0),n=Object.keys(W0);let i,r,s,a,o;for(i=0;i<e.length;i++){for(a=o=e[i],r=0;r<n.length;r++)s=n[r],o=o.replace(s,W0[s]);s=parseInt(j0[a],16),t[o]=[s>>16&255,s>>8&255,s&255]}return t}let Hl;function CE(t){Hl||(Hl=AE(),Hl.transparent=[0,0,0,0]);const e=Hl[t.toLowerCase()];return e&&{r:e[0],g:e[1],b:e[2],a:e.length===4?e[3]:255}}const RE=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function PE(t){const e=RE.exec(t);let n=255,i,r,s;if(e){if(e[7]!==i){const a=+e[7];n=e[8]?po(a):Ar(a*255,0,255)}return i=+e[1],r=+e[3],s=+e[5],i=255&(e[2]?po(i):Ar(i,0,255)),r=255&(e[4]?po(r):Ar(r,0,255)),s=255&(e[6]?po(s):Ar(s,0,255)),{r:i,g:r,b:s,a:n}}}function NE(t){return t&&(t.a<255?`rgba(${t.r}, ${t.g}, ${t.b}, ${Xi(t.a)})`:`rgb(${t.r}, ${t.g}, ${t.b})`)}const jd=t=>t<=.0031308?t*12.92:Math.pow(t,1/2.4)*1.055-.055,ks=t=>t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4);function LE(t,e,n){const i=ks(Xi(t.r)),r=ks(Xi(t.g)),s=ks(Xi(t.b));return{r:Or(jd(i+n*(ks(Xi(e.r))-i))),g:Or(jd(r+n*(ks(Xi(e.g))-r))),b:Or(jd(s+n*(ks(Xi(e.b))-s))),a:t.a+n*(e.a-t.a)}}function Vl(t,e,n){if(t){let i=Um(t);i[e]=Math.max(0,Math.min(i[e]+i[e]*n,e===0?360:1)),i=zm(i),t.r=i[0],t.g=i[1],t.b=i[2]}}function kb(t,e){return t&&Object.assign(e||{},t)}function X0(t){var e={r:0,g:0,b:0,a:255};return Array.isArray(t)?t.length>=3&&(e={r:t[0],g:t[1],b:t[2],a:255},t.length>3&&(e.a=Or(t[3]))):(e=kb(t,{r:0,g:0,b:0,a:1}),e.a=Or(e.a)),e}function DE(t){return t.charAt(0)==="r"?PE(t):wE(t)}let Fb=class Fh{constructor(e){if(e instanceof Fh)return e;const n=typeof e;let i;n==="object"?i=X0(e):n==="string"&&(i=mE(e)||CE(e)||DE(e)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var e=kb(this._rgb);return e&&(e.a=Xi(e.a)),e}set rgb(e){this._rgb=X0(e)}rgbString(){return this._valid?NE(this._rgb):void 0}hexString(){return this._valid?xE(this._rgb):void 0}hslString(){return this._valid?TE(this._rgb):void 0}mix(e,n){if(e){const i=this.rgb,r=e.rgb;let s;const a=n===s?.5:n,o=2*a-1,l=i.a-r.a,c=((o*l===-1?o:(o+l)/(1+o*l))+1)/2;s=1-c,i.r=255&c*i.r+s*r.r+.5,i.g=255&c*i.g+s*r.g+.5,i.b=255&c*i.b+s*r.b+.5,i.a=a*i.a+(1-a)*r.a,this.rgb=i}return this}interpolate(e,n){return e&&(this._rgb=LE(this._rgb,e._rgb,n)),this}clone(){return new Fh(this.rgb)}alpha(e){return this._rgb.a=Or(e),this}clearer(e){const n=this._rgb;return n.a*=1-e,this}greyscale(){const e=this._rgb,n=gl(e.r*.3+e.g*.59+e.b*.11);return e.r=e.g=e.b=n,this}opaquer(e){const n=this._rgb;return n.a*=1+e,this}negate(){const e=this._rgb;return e.r=255-e.r,e.g=255-e.g,e.b=255-e.b,this}lighten(e){return Vl(this._rgb,2,e),this}darken(e){return Vl(this._rgb,2,-e),this}saturate(e){return Vl(this._rgb,1,e),this}desaturate(e){return Vl(this._rgb,1,-e),this}rotate(e){return EE(this._rgb,e),this}};/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function Fi(){}const IE=(()=>{let t=0;return()=>t++})();function St(t){return t==null}function Dt(t){if(Array.isArray&&Array.isArray(t))return!0;const e=Object.prototype.toString.call(t);return e.slice(0,7)==="[object"&&e.slice(-6)==="Array]"}function et(t){return t!==null&&Object.prototype.toString.call(t)==="[object Object]"}function hn(t){return(typeof t=="number"||t instanceof Number)&&isFinite(+t)}function _i(t,e){return hn(t)?t:e}function mt(t,e){return typeof t>"u"?e:t}const kE=(t,e)=>typeof t=="string"&&t.endsWith("%")?parseFloat(t)/100*e:+t;function Nt(t,e,n){if(t&&typeof t.call=="function")return t.apply(n,e)}function dt(t,e,n,i){let r,s,a;if(Dt(t))for(s=t.length,r=0;r<s;r++)e.call(n,t[r],r);else if(et(t))for(a=Object.keys(t),s=a.length,r=0;r<s;r++)e.call(n,t[a[r]],a[r])}function wu(t,e){let n,i,r,s;if(!t||!e||t.length!==e.length)return!1;for(n=0,i=t.length;n<i;++n)if(r=t[n],s=e[n],r.datasetIndex!==s.datasetIndex||r.index!==s.index)return!1;return!0}function Eu(t){if(Dt(t))return t.map(Eu);if(et(t)){const e=Object.create(null),n=Object.keys(t),i=n.length;let r=0;for(;r<i;++r)e[n[r]]=Eu(t[n[r]]);return e}return t}function Ub(t){return["__proto__","prototype","constructor"].indexOf(t)===-1}function FE(t,e,n,i){if(!Ub(t))return;const r=e[t],s=n[t];et(r)&&et(s)?nl(r,s,i):e[t]=Eu(s)}function nl(t,e,n){const i=Dt(e)?e:[e],r=i.length;if(!et(t))return t;n=n||{};const s=n.merger||FE;let a;for(let o=0;o<r;++o){if(a=i[o],!et(a))continue;const l=Object.keys(a);for(let c=0,u=l.length;c<u;++c)s(l[c],t,a,n)}return t}function Po(t,e){return nl(t,e,{merger:UE})}function UE(t,e,n){if(!Ub(t))return;const i=e[t],r=n[t];et(i)&&et(r)?Po(i,r):Object.prototype.hasOwnProperty.call(e,t)||(e[t]=Eu(r))}const $0={"":t=>t,x:t=>t.x,y:t=>t.y};function OE(t){const e=t.split("."),n=[];let i="";for(const r of e)i+=r,i.endsWith("\\")?i=i.slice(0,-1)+".":(n.push(i),i="");return n}function zE(t){const e=OE(t);return n=>{for(const i of e){if(i==="")break;n=n&&n[i]}return n}}function il(t,e){return($0[e]||($0[e]=zE(e)))(t)}function Bm(t){return t.charAt(0).toUpperCase()+t.slice(1)}const Tu=t=>typeof t<"u",Vr=t=>typeof t=="function",Y0=(t,e)=>{if(t.size!==e.size)return!1;for(const n of t)if(!e.has(n))return!1;return!0};function BE(t){return t.type==="mouseup"||t.type==="click"||t.type==="contextmenu"}const qt=Math.PI,Kn=2*qt,HE=Kn+qt,Au=Number.POSITIVE_INFINITY,VE=qt/180,kn=qt/2,qr=qt/4,q0=qt*2/3,Ob=Math.log10,La=Math.sign;function No(t,e,n){return Math.abs(t-e)<n}function K0(t){const e=Math.round(t);t=No(t,e,t/1e3)?e:t;const n=Math.pow(10,Math.floor(Ob(t))),i=t/n;return(i<=1?1:i<=2?2:i<=5?5:10)*n}function GE(t){const e=[],n=Math.sqrt(t);let i;for(i=1;i<n;i++)t%i===0&&(e.push(i),e.push(t/i));return n===(n|0)&&e.push(n),e.sort((r,s)=>r-s).pop(),e}function WE(t){return typeof t=="symbol"||typeof t=="object"&&t!==null&&!(Symbol.toPrimitive in t||"toString"in t||"valueOf"in t)}function Cu(t){return!WE(t)&&!isNaN(parseFloat(t))&&isFinite(t)}function jE(t,e){const n=Math.round(t);return n-e<=t&&n+e>=t}function XE(t,e,n){let i,r,s;for(i=0,r=t.length;i<r;i++)s=t[i][n],isNaN(s)||(e.min=Math.min(e.min,s),e.max=Math.max(e.max,s))}function fs(t){return t*(qt/180)}function Hm(t){return t*(180/qt)}function Z0(t){if(!hn(t))return;let e=1,n=0;for(;Math.round(t*e)/e!==t;)e*=10,n++;return n}function $E(t,e){const n=e.x-t.x,i=e.y-t.y,r=Math.sqrt(n*n+i*i);let s=Math.atan2(i,n);return s<-.5*qt&&(s+=Kn),{angle:s,distance:r}}function Uh(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function YE(t,e){return(t-e+HE)%Kn-qt}function Ln(t){return(t%Kn+Kn)%Kn}function zb(t,e,n,i){const r=Ln(t),s=Ln(e),a=Ln(n),o=Ln(s-r),l=Ln(a-r),c=Ln(r-s),u=Ln(r-a);return r===s||r===a||i&&s===a||o>l&&c<u}function Ki(t,e,n){return Math.max(e,Math.min(n,t))}function qE(t){return Ki(t,-32768,32767)}function Bb(t,e,n,i=1e-6){return t>=Math.min(e,n)-i&&t<=Math.max(e,n)+i}function Vm(t,e,n){n=n||(a=>t[a]<e);let i=t.length-1,r=0,s;for(;i-r>1;)s=r+i>>1,n(s)?r=s:i=s;return{lo:r,hi:i}}const Oh=(t,e,n,i)=>Vm(t,n,i?r=>{const s=t[r][e];return s<n||s===n&&t[r+1][e]===n}:r=>t[r][e]<n),KE=(t,e,n)=>Vm(t,n,i=>t[i][e]>=n);function ZE(t,e,n){let i=0,r=t.length;for(;i<r&&t[i]<e;)i++;for(;r>i&&t[r-1]>n;)r--;return i>0||r<t.length?t.slice(i,r):t}const Hb=["push","pop","shift","splice","unshift"];function QE(t,e){if(t._chartjs){t._chartjs.listeners.push(e);return}Object.defineProperty(t,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[e]}}),Hb.forEach(n=>{const i="_onData"+Bm(n),r=t[n];Object.defineProperty(t,n,{configurable:!0,enumerable:!1,value(...s){const a=r.apply(this,s);return t._chartjs.listeners.forEach(o=>{typeof o[i]=="function"&&o[i](...s)}),a}})})}function Q0(t,e){const n=t._chartjs;if(!n)return;const i=n.listeners,r=i.indexOf(e);r!==-1&&i.splice(r,1),!(i.length>0)&&(Hb.forEach(s=>{delete t[s]}),delete t._chartjs)}function JE(t){const e=new Set(t);return e.size===t.length?t:Array.from(e)}const Vb=function(){return typeof window>"u"?function(t){return t()}:window.requestAnimationFrame}();function Gb(t,e){let n=[],i=!1;return function(...r){n=r,i||(i=!0,Vb.call(window,()=>{i=!1,t.apply(e,n)}))}}function eT(t,e){let n;return function(...i){return e?(clearTimeout(n),n=setTimeout(t,e,i)):t.apply(this,i),e}}const tT=t=>t==="start"?"left":t==="end"?"right":"center",J0=(t,e,n)=>t==="start"?e:t==="end"?n:(e+n)/2,Gl=t=>t===0||t===1,ex=(t,e,n)=>-(Math.pow(2,10*(t-=1))*Math.sin((t-e)*Kn/n)),tx=(t,e,n)=>Math.pow(2,-10*t)*Math.sin((t-e)*Kn/n)+1,Lo={linear:t=>t,easeInQuad:t=>t*t,easeOutQuad:t=>-t*(t-2),easeInOutQuad:t=>(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1),easeInCubic:t=>t*t*t,easeOutCubic:t=>(t-=1)*t*t+1,easeInOutCubic:t=>(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2),easeInQuart:t=>t*t*t*t,easeOutQuart:t=>-((t-=1)*t*t*t-1),easeInOutQuart:t=>(t/=.5)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2),easeInQuint:t=>t*t*t*t*t,easeOutQuint:t=>(t-=1)*t*t*t*t+1,easeInOutQuint:t=>(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2),easeInSine:t=>-Math.cos(t*kn)+1,easeOutSine:t=>Math.sin(t*kn),easeInOutSine:t=>-.5*(Math.cos(qt*t)-1),easeInExpo:t=>t===0?0:Math.pow(2,10*(t-1)),easeOutExpo:t=>t===1?1:-Math.pow(2,-10*t)+1,easeInOutExpo:t=>Gl(t)?t:t<.5?.5*Math.pow(2,10*(t*2-1)):.5*(-Math.pow(2,-10*(t*2-1))+2),easeInCirc:t=>t>=1?t:-(Math.sqrt(1-t*t)-1),easeOutCirc:t=>Math.sqrt(1-(t-=1)*t),easeInOutCirc:t=>(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1),easeInElastic:t=>Gl(t)?t:ex(t,.075,.3),easeOutElastic:t=>Gl(t)?t:tx(t,.075,.3),easeInOutElastic(t){return Gl(t)?t:t<.5?.5*ex(t*2,.1125,.45):.5+.5*tx(t*2-1,.1125,.45)},easeInBack(t){return t*t*((1.70158+1)*t-1.70158)},easeOutBack(t){return(t-=1)*t*((1.70158+1)*t+1.70158)+1},easeInOutBack(t){let e=1.70158;return(t/=.5)<1?.5*(t*t*(((e*=1.525)+1)*t-e)):.5*((t-=2)*t*(((e*=1.525)+1)*t+e)+2)},easeInBounce:t=>1-Lo.easeOutBounce(1-t),easeOutBounce(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},easeInOutBounce:t=>t<.5?Lo.easeInBounce(t*2)*.5:Lo.easeOutBounce(t*2-1)*.5+.5};function Gm(t){if(t&&typeof t=="object"){const e=t.toString();return e==="[object CanvasPattern]"||e==="[object CanvasGradient]"}return!1}function nx(t){return Gm(t)?t:new Fb(t)}function Xd(t){return Gm(t)?t:new Fb(t).saturate(.5).darken(.1).hexString()}const nT=["x","y","borderWidth","radius","tension"],iT=["color","borderColor","backgroundColor"];function rT(t){t.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),t.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:e=>e!=="onProgress"&&e!=="onComplete"&&e!=="fn"}),t.set("animations",{colors:{type:"color",properties:iT},numbers:{type:"number",properties:nT}}),t.describe("animations",{_fallback:"animation"}),t.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:e=>e|0}}}})}function sT(t){t.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const ix=new Map;function aT(t,e){e=e||{};const n=t+JSON.stringify(e);let i=ix.get(n);return i||(i=new Intl.NumberFormat(t,e),ix.set(n,i)),i}function Wb(t,e,n){return aT(e,n).format(t)}const oT={values(t){return Dt(t)?t:""+t},numeric(t,e,n){if(t===0)return"0";const i=this.chart.options.locale;let r,s=t;if(n.length>1){const c=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(c<1e-4||c>1e15)&&(r="scientific"),s=lT(t,n)}const a=Ob(Math.abs(s)),o=isNaN(a)?1:Math.max(Math.min(-1*Math.floor(a),20),0),l={notation:r,minimumFractionDigits:o,maximumFractionDigits:o};return Object.assign(l,this.options.ticks.format),Wb(t,i,l)}};function lT(t,e){let n=e.length>3?e[2].value-e[1].value:e[1].value-e[0].value;return Math.abs(n)>=1&&t!==Math.floor(t)&&(n=t-Math.floor(t)),n}var jb={formatters:oT};function cT(t){t.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(e,n)=>n.lineWidth,tickColor:(e,n)=>n.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:jb.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),t.route("scale.ticks","color","","color"),t.route("scale.grid","color","","borderColor"),t.route("scale.border","color","","borderColor"),t.route("scale.title","color","","color"),t.describe("scale",{_fallback:!1,_scriptable:e=>!e.startsWith("before")&&!e.startsWith("after")&&e!=="callback"&&e!=="parser",_indexable:e=>e!=="borderDash"&&e!=="tickBorderDash"&&e!=="dash"}),t.describe("scales",{_fallback:"scale"}),t.describe("scale.ticks",{_scriptable:e=>e!=="backdropPadding"&&e!=="callback",_indexable:e=>e!=="backdropPadding"})}const ws=Object.create(null),zh=Object.create(null);function Do(t,e){if(!e)return t;const n=e.split(".");for(let i=0,r=n.length;i<r;++i){const s=n[i];t=t[s]||(t[s]=Object.create(null))}return t}function $d(t,e,n){return typeof e=="string"?nl(Do(t,e),n):nl(Do(t,""),e)}class uT{constructor(e,n){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,r)=>Xd(r.backgroundColor),this.hoverBorderColor=(i,r)=>Xd(r.borderColor),this.hoverColor=(i,r)=>Xd(r.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(e),this.apply(n)}set(e,n){return $d(this,e,n)}get(e){return Do(this,e)}describe(e,n){return $d(zh,e,n)}override(e,n){return $d(ws,e,n)}route(e,n,i,r){const s=Do(this,e),a=Do(this,i),o="_"+n;Object.defineProperties(s,{[o]:{value:s[n],writable:!0},[n]:{enumerable:!0,get(){const l=this[o],c=a[r];return et(l)?Object.assign({},c,l):mt(l,c)},set(l){this[o]=l}}})}apply(e){e.forEach(n=>n(this))}}var Ft=new uT({_scriptable:t=>!t.startsWith("on"),_indexable:t=>t!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[rT,sT,cT]);function dT(t){return!t||St(t.size)||St(t.family)?null:(t.style?t.style+" ":"")+(t.weight?t.weight+" ":"")+t.size+"px "+t.family}function Ru(t,e,n,i,r){let s=e[r];return s||(s=e[r]=t.measureText(r).width,n.push(r)),s>i&&(i=s),i}function fT(t,e,n,i){i=i||{};let r=i.data=i.data||{},s=i.garbageCollect=i.garbageCollect||[];i.font!==e&&(r=i.data={},s=i.garbageCollect=[],i.font=e),t.save(),t.font=e;let a=0;const o=n.length;let l,c,u,f,d;for(l=0;l<o;l++)if(f=n[l],f!=null&&!Dt(f))a=Ru(t,r,s,a,f);else if(Dt(f))for(c=0,u=f.length;c<u;c++)d=f[c],d!=null&&!Dt(d)&&(a=Ru(t,r,s,a,d));t.restore();const p=s.length/2;if(p>n.length){for(l=0;l<p;l++)delete r[s[l]];s.splice(0,p)}return a}function Kr(t,e,n){const i=t.currentDevicePixelRatio,r=n!==0?Math.max(n/2,.5):0;return Math.round((e-r)*i)/i+r}function rx(t,e){!e&&!t||(e=e||t.getContext("2d"),e.save(),e.resetTransform(),e.clearRect(0,0,t.width,t.height),e.restore())}function Bh(t,e,n,i){hT(t,e,n,i)}function hT(t,e,n,i,r){let s,a,o,l,c,u,f,d;const p=e.pointStyle,x=e.rotation,y=e.radius;let m=(x||0)*VE;if(p&&typeof p=="object"&&(s=p.toString(),s==="[object HTMLImageElement]"||s==="[object HTMLCanvasElement]")){t.save(),t.translate(n,i),t.rotate(m),t.drawImage(p,-p.width/2,-p.height/2,p.width,p.height),t.restore();return}if(!(isNaN(y)||y<=0)){switch(t.beginPath(),p){default:t.arc(n,i,y,0,Kn),t.closePath();break;case"triangle":u=y,t.moveTo(n+Math.sin(m)*u,i-Math.cos(m)*y),m+=q0,t.lineTo(n+Math.sin(m)*u,i-Math.cos(m)*y),m+=q0,t.lineTo(n+Math.sin(m)*u,i-Math.cos(m)*y),t.closePath();break;case"rectRounded":c=y*.516,l=y-c,a=Math.cos(m+qr)*l,f=Math.cos(m+qr)*l,o=Math.sin(m+qr)*l,d=Math.sin(m+qr)*l,t.arc(n-f,i-o,c,m-qt,m-kn),t.arc(n+d,i-a,c,m-kn,m),t.arc(n+f,i+o,c,m,m+kn),t.arc(n-d,i+a,c,m+kn,m+qt),t.closePath();break;case"rect":if(!x){l=Math.SQRT1_2*y,u=l,t.rect(n-u,i-l,2*u,2*l);break}m+=qr;case"rectRot":f=Math.cos(m)*y,a=Math.cos(m)*y,o=Math.sin(m)*y,d=Math.sin(m)*y,t.moveTo(n-f,i-o),t.lineTo(n+d,i-a),t.lineTo(n+f,i+o),t.lineTo(n-d,i+a),t.closePath();break;case"crossRot":m+=qr;case"cross":f=Math.cos(m)*y,a=Math.cos(m)*y,o=Math.sin(m)*y,d=Math.sin(m)*y,t.moveTo(n-f,i-o),t.lineTo(n+f,i+o),t.moveTo(n+d,i-a),t.lineTo(n-d,i+a);break;case"star":f=Math.cos(m)*y,a=Math.cos(m)*y,o=Math.sin(m)*y,d=Math.sin(m)*y,t.moveTo(n-f,i-o),t.lineTo(n+f,i+o),t.moveTo(n+d,i-a),t.lineTo(n-d,i+a),m+=qr,f=Math.cos(m)*y,a=Math.cos(m)*y,o=Math.sin(m)*y,d=Math.sin(m)*y,t.moveTo(n-f,i-o),t.lineTo(n+f,i+o),t.moveTo(n+d,i-a),t.lineTo(n-d,i+a);break;case"line":a=Math.cos(m)*y,o=Math.sin(m)*y,t.moveTo(n-a,i-o),t.lineTo(n+a,i+o);break;case"dash":t.moveTo(n,i),t.lineTo(n+Math.cos(m)*y,i+Math.sin(m)*y);break;case!1:t.closePath();break}t.fill(),e.borderWidth>0&&t.stroke()}}function Zi(t,e,n){return n=n||.5,!e||t&&t.x>e.left-n&&t.x<e.right+n&&t.y>e.top-n&&t.y<e.bottom+n}function Wm(t,e){t.save(),t.beginPath(),t.rect(e.left,e.top,e.right-e.left,e.bottom-e.top),t.clip()}function jm(t){t.restore()}function pT(t,e,n,i,r){if(!e)return t.lineTo(n.x,n.y);if(r==="middle"){const s=(e.x+n.x)/2;t.lineTo(s,e.y),t.lineTo(s,n.y)}else r==="after"!=!!i?t.lineTo(e.x,n.y):t.lineTo(n.x,e.y);t.lineTo(n.x,n.y)}function mT(t,e,n,i){if(!e)return t.lineTo(n.x,n.y);t.bezierCurveTo(i?e.cp1x:e.cp2x,i?e.cp1y:e.cp2y,i?n.cp2x:n.cp1x,i?n.cp2y:n.cp1y,n.x,n.y)}function gT(t,e){e.translation&&t.translate(e.translation[0],e.translation[1]),St(e.rotation)||t.rotate(e.rotation),e.color&&(t.fillStyle=e.color),e.textAlign&&(t.textAlign=e.textAlign),e.textBaseline&&(t.textBaseline=e.textBaseline)}function xT(t,e,n,i,r){if(r.strikethrough||r.underline){const s=t.measureText(i),a=e-s.actualBoundingBoxLeft,o=e+s.actualBoundingBoxRight,l=n-s.actualBoundingBoxAscent,c=n+s.actualBoundingBoxDescent,u=r.strikethrough?(l+c)/2:c;t.strokeStyle=t.fillStyle,t.beginPath(),t.lineWidth=r.decorationWidth||2,t.moveTo(a,u),t.lineTo(o,u),t.stroke()}}function _T(t,e){const n=t.fillStyle;t.fillStyle=e.color,t.fillRect(e.left,e.top,e.width,e.height),t.fillStyle=n}function Pu(t,e,n,i,r,s={}){const a=Dt(e)?e:[e],o=s.strokeWidth>0&&s.strokeColor!=="";let l,c;for(t.save(),t.font=r.string,gT(t,s),l=0;l<a.length;++l)c=a[l],s.backdrop&&_T(t,s.backdrop),o&&(s.strokeColor&&(t.strokeStyle=s.strokeColor),St(s.strokeWidth)||(t.lineWidth=s.strokeWidth),t.strokeText(c,n,i,s.maxWidth)),t.fillText(c,n,i,s.maxWidth),xT(t,n,i,c,s),i+=Number(r.lineHeight);t.restore()}function Hh(t,e){const{x:n,y:i,w:r,h:s,radius:a}=e;t.arc(n+a.topLeft,i+a.topLeft,a.topLeft,1.5*qt,qt,!0),t.lineTo(n,i+s-a.bottomLeft),t.arc(n+a.bottomLeft,i+s-a.bottomLeft,a.bottomLeft,qt,kn,!0),t.lineTo(n+r-a.bottomRight,i+s),t.arc(n+r-a.bottomRight,i+s-a.bottomRight,a.bottomRight,kn,0,!0),t.lineTo(n+r,i+a.topRight),t.arc(n+r-a.topRight,i+a.topRight,a.topRight,0,-kn,!0),t.lineTo(n+a.topLeft,i)}const vT=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,yT=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function bT(t,e){const n=(""+t).match(vT);if(!n||n[1]==="normal")return e*1.2;switch(t=+n[2],n[3]){case"px":return t;case"%":t/=100;break}return e*t}const ST=t=>+t||0;function Xb(t,e){const n={},i=et(e),r=i?Object.keys(e):e,s=et(t)?i?a=>mt(t[a],t[e[a]]):a=>t[a]:()=>t;for(const a of r)n[a]=ST(s(a));return n}function MT(t){return Xb(t,{top:"y",right:"x",bottom:"y",left:"x"})}function Io(t){return Xb(t,["topLeft","topRight","bottomLeft","bottomRight"])}function Jn(t){const e=MT(t);return e.width=e.left+e.right,e.height=e.top+e.bottom,e}function Fn(t,e){t=t||{},e=e||Ft.font;let n=mt(t.size,e.size);typeof n=="string"&&(n=parseInt(n,10));let i=mt(t.style,e.style);i&&!(""+i).match(yT)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const r={family:mt(t.family,e.family),lineHeight:bT(mt(t.lineHeight,e.lineHeight),n),size:n,style:i,weight:mt(t.weight,e.weight),string:""};return r.string=dT(r),r}function Wl(t,e,n,i){let r,s,a;for(r=0,s=t.length;r<s;++r)if(a=t[r],a!==void 0&&a!==void 0)return a}function wT(t,e,n){const{min:i,max:r}=t,s=kE(e,(r-i)/2),a=(o,l)=>n&&o===0?0:o+l;return{min:a(i,-Math.abs(s)),max:a(r,s)}}function $r(t,e){return Object.assign(Object.create(t),e)}function Xm(t,e=[""],n,i,r=()=>t[0]){const s=n||t;typeof i>"u"&&(i=Kb("_fallback",t));const a={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:t,_rootScopes:s,_fallback:i,_getTarget:r,override:o=>Xm([o,...t],e,s,i)};return new Proxy(a,{deleteProperty(o,l){return delete o[l],delete o._keys,delete t[0][l],!0},get(o,l){return Yb(o,l,()=>LT(l,e,t,o))},getOwnPropertyDescriptor(o,l){return Reflect.getOwnPropertyDescriptor(o._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(t[0])},has(o,l){return ax(o).includes(l)},ownKeys(o){return ax(o)},set(o,l,c){const u=o._storage||(o._storage=r());return o[l]=u[l]=c,delete o._keys,!0}})}function Da(t,e,n,i){const r={_cacheable:!1,_proxy:t,_context:e,_subProxy:n,_stack:new Set,_descriptors:$b(t,i),setContext:s=>Da(t,s,n,i),override:s=>Da(t.override(s),e,n,i)};return new Proxy(r,{deleteProperty(s,a){return delete s[a],delete t[a],!0},get(s,a,o){return Yb(s,a,()=>TT(s,a,o))},getOwnPropertyDescriptor(s,a){return s._descriptors.allKeys?Reflect.has(t,a)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(t,a)},getPrototypeOf(){return Reflect.getPrototypeOf(t)},has(s,a){return Reflect.has(t,a)},ownKeys(){return Reflect.ownKeys(t)},set(s,a,o){return t[a]=o,delete s[a],!0}})}function $b(t,e={scriptable:!0,indexable:!0}){const{_scriptable:n=e.scriptable,_indexable:i=e.indexable,_allKeys:r=e.allKeys}=t;return{allKeys:r,scriptable:n,indexable:i,isScriptable:Vr(n)?n:()=>n,isIndexable:Vr(i)?i:()=>i}}const ET=(t,e)=>t?t+Bm(e):e,$m=(t,e)=>et(e)&&t!=="adapters"&&(Object.getPrototypeOf(e)===null||e.constructor===Object);function Yb(t,e,n){if(Object.prototype.hasOwnProperty.call(t,e)||e==="constructor")return t[e];const i=n();return t[e]=i,i}function TT(t,e,n){const{_proxy:i,_context:r,_subProxy:s,_descriptors:a}=t;let o=i[e];return Vr(o)&&a.isScriptable(e)&&(o=AT(e,o,t,n)),Dt(o)&&o.length&&(o=CT(e,o,t,a.isIndexable)),$m(e,o)&&(o=Da(o,r,s&&s[e],a)),o}function AT(t,e,n,i){const{_proxy:r,_context:s,_subProxy:a,_stack:o}=n;if(o.has(t))throw new Error("Recursion detected: "+Array.from(o).join("->")+"->"+t);o.add(t);let l=e(s,a||i);return o.delete(t),$m(t,l)&&(l=Ym(r._scopes,r,t,l)),l}function CT(t,e,n,i){const{_proxy:r,_context:s,_subProxy:a,_descriptors:o}=n;if(typeof s.index<"u"&&i(t))return e[s.index%e.length];if(et(e[0])){const l=e,c=r._scopes.filter(u=>u!==l);e=[];for(const u of l){const f=Ym(c,r,t,u);e.push(Da(f,s,a&&a[t],o))}}return e}function qb(t,e,n){return Vr(t)?t(e,n):t}const RT=(t,e)=>t===!0?e:typeof t=="string"?il(e,t):void 0;function PT(t,e,n,i,r){for(const s of e){const a=RT(n,s);if(a){t.add(a);const o=qb(a._fallback,n,r);if(typeof o<"u"&&o!==n&&o!==i)return o}else if(a===!1&&typeof i<"u"&&n!==i)return null}return!1}function Ym(t,e,n,i){const r=e._rootScopes,s=qb(e._fallback,n,i),a=[...t,...r],o=new Set;o.add(i);let l=sx(o,a,n,s||n,i);return l===null||typeof s<"u"&&s!==n&&(l=sx(o,a,s,l,i),l===null)?!1:Xm(Array.from(o),[""],r,s,()=>NT(e,n,i))}function sx(t,e,n,i,r){for(;n;)n=PT(t,e,n,i,r);return n}function NT(t,e,n){const i=t._getTarget();e in i||(i[e]={});const r=i[e];return Dt(r)&&et(n)?n:r||{}}function LT(t,e,n,i){let r;for(const s of e)if(r=Kb(ET(s,t),n),typeof r<"u")return $m(t,r)?Ym(n,i,t,r):r}function Kb(t,e){for(const n of e){if(!n)continue;const i=n[t];if(typeof i<"u")return i}}function ax(t){let e=t._keys;return e||(e=t._keys=DT(t._scopes)),e}function DT(t){const e=new Set;for(const n of t)for(const i of Object.keys(n).filter(r=>!r.startsWith("_")))e.add(i);return Array.from(e)}function IT(t,e,n,i){const{iScale:r}=t,{key:s="r"}=this._parsing,a=new Array(i);let o,l,c,u;for(o=0,l=i;o<l;++o)c=o+n,u=e[c],a[o]={r:r.parse(il(u,s),c)};return a}const kT=Number.EPSILON||1e-14,Ia=(t,e)=>e<t.length&&!t[e].skip&&t[e],Zb=t=>t==="x"?"y":"x";function FT(t,e,n,i){const r=t.skip?e:t,s=e,a=n.skip?e:n,o=Uh(s,r),l=Uh(a,s);let c=o/(o+l),u=l/(o+l);c=isNaN(c)?0:c,u=isNaN(u)?0:u;const f=i*c,d=i*u;return{previous:{x:s.x-f*(a.x-r.x),y:s.y-f*(a.y-r.y)},next:{x:s.x+d*(a.x-r.x),y:s.y+d*(a.y-r.y)}}}function UT(t,e,n){const i=t.length;let r,s,a,o,l,c=Ia(t,0);for(let u=0;u<i-1;++u)if(l=c,c=Ia(t,u+1),!(!l||!c)){if(No(e[u],0,kT)){n[u]=n[u+1]=0;continue}r=n[u]/e[u],s=n[u+1]/e[u],o=Math.pow(r,2)+Math.pow(s,2),!(o<=9)&&(a=3/Math.sqrt(o),n[u]=r*a*e[u],n[u+1]=s*a*e[u])}}function OT(t,e,n="x"){const i=Zb(n),r=t.length;let s,a,o,l=Ia(t,0);for(let c=0;c<r;++c){if(a=o,o=l,l=Ia(t,c+1),!o)continue;const u=o[n],f=o[i];a&&(s=(u-a[n])/3,o[`cp1${n}`]=u-s,o[`cp1${i}`]=f-s*e[c]),l&&(s=(l[n]-u)/3,o[`cp2${n}`]=u+s,o[`cp2${i}`]=f+s*e[c])}}function zT(t,e="x"){const n=Zb(e),i=t.length,r=Array(i).fill(0),s=Array(i);let a,o,l,c=Ia(t,0);for(a=0;a<i;++a)if(o=l,l=c,c=Ia(t,a+1),!!l){if(c){const u=c[e]-l[e];r[a]=u!==0?(c[n]-l[n])/u:0}s[a]=o?c?La(r[a-1])!==La(r[a])?0:(r[a-1]+r[a])/2:r[a-1]:r[a]}UT(t,r,s),OT(t,s,e)}function jl(t,e,n){return Math.max(Math.min(t,n),e)}function BT(t,e){let n,i,r,s,a,o=Zi(t[0],e);for(n=0,i=t.length;n<i;++n)a=s,s=o,o=n<i-1&&Zi(t[n+1],e),s&&(r=t[n],a&&(r.cp1x=jl(r.cp1x,e.left,e.right),r.cp1y=jl(r.cp1y,e.top,e.bottom)),o&&(r.cp2x=jl(r.cp2x,e.left,e.right),r.cp2y=jl(r.cp2y,e.top,e.bottom)))}function HT(t,e,n,i,r){let s,a,o,l;if(e.spanGaps&&(t=t.filter(c=>!c.skip)),e.cubicInterpolationMode==="monotone")zT(t,r);else{let c=i?t[t.length-1]:t[0];for(s=0,a=t.length;s<a;++s)o=t[s],l=FT(c,o,t[Math.min(s+1,a-(i?0:1))%a],e.tension),o.cp1x=l.previous.x,o.cp1y=l.previous.y,o.cp2x=l.next.x,o.cp2y=l.next.y,c=o}e.capBezierPoints&&BT(t,n)}function qm(){return typeof window<"u"&&typeof document<"u"}function Km(t){let e=t.parentNode;return e&&e.toString()==="[object ShadowRoot]"&&(e=e.host),e}function Nu(t,e,n){let i;return typeof t=="string"?(i=parseInt(t,10),t.indexOf("%")!==-1&&(i=i/100*e.parentNode[n])):i=t,i}const sd=t=>t.ownerDocument.defaultView.getComputedStyle(t,null);function VT(t,e){return sd(t).getPropertyValue(e)}const GT=["top","right","bottom","left"];function _s(t,e,n){const i={};n=n?"-"+n:"";for(let r=0;r<4;r++){const s=GT[r];i[s]=parseFloat(t[e+"-"+s+n])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const WT=(t,e,n)=>(t>0||e>0)&&(!n||!n.shadowRoot);function jT(t,e){const n=t.touches,i=n&&n.length?n[0]:t,{offsetX:r,offsetY:s}=i;let a=!1,o,l;if(WT(r,s,t.target))o=r,l=s;else{const c=e.getBoundingClientRect();o=i.clientX-c.left,l=i.clientY-c.top,a=!0}return{x:o,y:l,box:a}}function as(t,e){if("native"in t)return t;const{canvas:n,currentDevicePixelRatio:i}=e,r=sd(n),s=r.boxSizing==="border-box",a=_s(r,"padding"),o=_s(r,"border","width"),{x:l,y:c,box:u}=jT(t,n),f=a.left+(u&&o.left),d=a.top+(u&&o.top);let{width:p,height:x}=e;return s&&(p-=a.width+o.width,x-=a.height+o.height),{x:Math.round((l-f)/p*n.width/i),y:Math.round((c-d)/x*n.height/i)}}function XT(t,e,n){let i,r;if(e===void 0||n===void 0){const s=t&&Km(t);if(!s)e=t.clientWidth,n=t.clientHeight;else{const a=s.getBoundingClientRect(),o=sd(s),l=_s(o,"border","width"),c=_s(o,"padding");e=a.width-c.width-l.width,n=a.height-c.height-l.height,i=Nu(o.maxWidth,s,"clientWidth"),r=Nu(o.maxHeight,s,"clientHeight")}}return{width:e,height:n,maxWidth:i||Au,maxHeight:r||Au}}const Cr=t=>Math.round(t*10)/10;function $T(t,e,n,i){const r=sd(t),s=_s(r,"margin"),a=Nu(r.maxWidth,t,"clientWidth")||Au,o=Nu(r.maxHeight,t,"clientHeight")||Au,l=XT(t,e,n);let{width:c,height:u}=l;if(r.boxSizing==="content-box"){const d=_s(r,"border","width"),p=_s(r,"padding");c-=p.width+d.width,u-=p.height+d.height}return c=Math.max(0,c-s.width),u=Math.max(0,i?c/i:u-s.height),c=Cr(Math.min(c,a,l.maxWidth)),u=Cr(Math.min(u,o,l.maxHeight)),c&&!u&&(u=Cr(c/2)),(e!==void 0||n!==void 0)&&i&&l.height&&u>l.height&&(u=l.height,c=Cr(Math.floor(u*i))),{width:c,height:u}}function ox(t,e,n){const i=e||1,r=Cr(t.height*i),s=Cr(t.width*i);t.height=Cr(t.height),t.width=Cr(t.width);const a=t.canvas;return a.style&&(n||!a.style.height&&!a.style.width)&&(a.style.height=`${t.height}px`,a.style.width=`${t.width}px`),t.currentDevicePixelRatio!==i||a.height!==r||a.width!==s?(t.currentDevicePixelRatio=i,a.height=r,a.width=s,t.ctx.setTransform(i,0,0,i,0,0),!0):!1}const YT=function(){let t=!1;try{const e={get passive(){return t=!0,!1}};qm()&&(window.addEventListener("test",null,e),window.removeEventListener("test",null,e))}catch{}return t}();function lx(t,e){const n=VT(t,e),i=n&&n.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function os(t,e,n,i){return{x:t.x+n*(e.x-t.x),y:t.y+n*(e.y-t.y)}}function qT(t,e,n,i){return{x:t.x+n*(e.x-t.x),y:i==="middle"?n<.5?t.y:e.y:i==="after"?n<1?t.y:e.y:n>0?e.y:t.y}}function KT(t,e,n,i){const r={x:t.cp2x,y:t.cp2y},s={x:e.cp1x,y:e.cp1y},a=os(t,r,n),o=os(r,s,n),l=os(s,e,n),c=os(a,o,n),u=os(o,l,n);return os(c,u,n)}const ZT=function(t,e){return{x(n){return t+t+e-n},setWidth(n){e=n},textAlign(n){return n==="center"?n:n==="right"?"left":"right"},xPlus(n,i){return n-i},leftForLtr(n,i){return n-i}}},QT=function(){return{x(t){return t},setWidth(t){},textAlign(t){return t},xPlus(t,e){return t+e},leftForLtr(t,e){return t}}};function Yd(t,e,n){return t?ZT(e,n):QT()}function JT(t,e){let n,i;(e==="ltr"||e==="rtl")&&(n=t.canvas.style,i=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",e,"important"),t.prevTextDirection=i)}function eA(t,e){e!==void 0&&(delete t.prevTextDirection,t.canvas.style.setProperty("direction",e[0],e[1]))}function Qb(t){return t==="angle"?{between:zb,compare:YE,normalize:Ln}:{between:Bb,compare:(e,n)=>e-n,normalize:e=>e}}function cx({start:t,end:e,count:n,loop:i,style:r}){return{start:t%n,end:e%n,loop:i&&(e-t+1)%n===0,style:r}}function tA(t,e,n){const{property:i,start:r,end:s}=n,{between:a,normalize:o}=Qb(i),l=e.length;let{start:c,end:u,loop:f}=t,d,p;if(f){for(c+=l,u+=l,d=0,p=l;d<p&&a(o(e[c%l][i]),r,s);++d)c--,u--;c%=l,u%=l}return u<c&&(u+=l),{start:c,end:u,loop:f,style:t.style}}function Jb(t,e,n){if(!n)return[t];const{property:i,start:r,end:s}=n,a=e.length,{compare:o,between:l,normalize:c}=Qb(i),{start:u,end:f,loop:d,style:p}=tA(t,e,n),x=[];let y=!1,m=null,h,_,M;const b=()=>l(r,M,h)&&o(r,M)!==0,S=()=>o(s,h)===0||l(s,M,h),E=()=>y||b(),C=()=>!y||S();for(let v=u,A=u;v<=f;++v)_=e[v%a],!_.skip&&(h=c(_[i]),h!==M&&(y=l(h,r,s),m===null&&E()&&(m=o(h,r)===0?v:A),m!==null&&C()&&(x.push(cx({start:m,end:v,loop:d,count:a,style:p})),m=null),A=v,M=h));return m!==null&&x.push(cx({start:m,end:f,loop:d,count:a,style:p})),x}function eS(t,e){const n=[],i=t.segments;for(let r=0;r<i.length;r++){const s=Jb(i[r],t.points,e);s.length&&n.push(...s)}return n}function nA(t,e,n,i){let r=0,s=e-1;if(n&&!i)for(;r<e&&!t[r].skip;)r++;for(;r<e&&t[r].skip;)r++;for(r%=e,n&&(s+=r);s>r&&t[s%e].skip;)s--;return s%=e,{start:r,end:s}}function iA(t,e,n,i){const r=t.length,s=[];let a=e,o=t[e],l;for(l=e+1;l<=n;++l){const c=t[l%r];c.skip||c.stop?o.skip||(i=!1,s.push({start:e%r,end:(l-1)%r,loop:i}),e=a=c.stop?l:null):(a=l,o.skip&&(e=l)),o=c}return a!==null&&s.push({start:e%r,end:a%r,loop:i}),s}function rA(t,e){const n=t.points,i=t.options.spanGaps,r=n.length;if(!r)return[];const s=!!t._loop,{start:a,end:o}=nA(n,r,s,i);if(i===!0)return ux(t,[{start:a,end:o,loop:s}],n,e);const l=o<a?o+r:o,c=!!t._fullLoop&&a===0&&o===r-1;return ux(t,iA(n,a,l,c),n,e)}function ux(t,e,n,i){return!i||!i.setContext||!n?e:sA(t,e,n,i)}function sA(t,e,n,i){const r=t._chart.getContext(),s=dx(t.options),{_datasetIndex:a,options:{spanGaps:o}}=t,l=n.length,c=[];let u=s,f=e[0].start,d=f;function p(x,y,m,h){const _=o?-1:1;if(x!==y){for(x+=l;n[x%l].skip;)x-=_;for(;n[y%l].skip;)y+=_;x%l!==y%l&&(c.push({start:x%l,end:y%l,loop:m,style:h}),u=h,f=y%l)}}for(const x of e){f=o?f:x.start;let y=n[f%l],m;for(d=f+1;d<=x.end;d++){const h=n[d%l];m=dx(i.setContext($r(r,{type:"segment",p0:y,p1:h,p0DataIndex:(d-1)%l,p1DataIndex:d%l,datasetIndex:a}))),aA(m,u)&&p(f,d-1,x.loop,u),y=h,u=m}f<d-1&&p(f,d-1,x.loop,u)}return c}function dx(t){return{backgroundColor:t.backgroundColor,borderCapStyle:t.borderCapStyle,borderDash:t.borderDash,borderDashOffset:t.borderDashOffset,borderJoinStyle:t.borderJoinStyle,borderWidth:t.borderWidth,borderColor:t.borderColor}}function aA(t,e){if(!e)return!1;const n=[],i=function(r,s){return Gm(s)?(n.includes(s)||n.push(s),n.indexOf(s)):s};return JSON.stringify(t,i)!==JSON.stringify(e,i)}function Xl(t,e,n){return t.options.clip?t[n]:e[n]}function oA(t,e){const{xScale:n,yScale:i}=t;return n&&i?{left:Xl(n,e,"left"),right:Xl(n,e,"right"),top:Xl(i,e,"top"),bottom:Xl(i,e,"bottom")}:e}function tS(t,e){const n=e._clip;if(n.disabled)return!1;const i=oA(e,t.chartArea);return{left:n.left===!1?0:i.left-(n.left===!0?0:n.left),right:n.right===!1?t.width:i.right+(n.right===!0?0:n.right),top:n.top===!1?0:i.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?t.height:i.bottom+(n.bottom===!0?0:n.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class lA{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(e,n,i,r){const s=n.listeners[r],a=n.duration;s.forEach(o=>o({chart:e,initial:n.initial,numSteps:a,currentStep:Math.min(i-n.start,a)}))}_refresh(){this._request||(this._running=!0,this._request=Vb.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(e=Date.now()){let n=0;this._charts.forEach((i,r)=>{if(!i.running||!i.items.length)return;const s=i.items;let a=s.length-1,o=!1,l;for(;a>=0;--a)l=s[a],l._active?(l._total>i.duration&&(i.duration=l._total),l.tick(e),o=!0):(s[a]=s[s.length-1],s.pop());o&&(r.draw(),this._notify(r,i,e,"progress")),s.length||(i.running=!1,this._notify(r,i,e,"complete"),i.initial=!1),n+=s.length}),this._lastDate=e,n===0&&(this._running=!1)}_getAnims(e){const n=this._charts;let i=n.get(e);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},n.set(e,i)),i}listen(e,n,i){this._getAnims(e).listeners[n].push(i)}add(e,n){!n||!n.length||this._getAnims(e).items.push(...n)}has(e){return this._getAnims(e).items.length>0}start(e){const n=this._charts.get(e);n&&(n.running=!0,n.start=Date.now(),n.duration=n.items.reduce((i,r)=>Math.max(i,r._duration),0),this._refresh())}running(e){if(!this._running)return!1;const n=this._charts.get(e);return!(!n||!n.running||!n.items.length)}stop(e){const n=this._charts.get(e);if(!n||!n.items.length)return;const i=n.items;let r=i.length-1;for(;r>=0;--r)i[r].cancel();n.items=[],this._notify(e,n,Date.now(),"complete")}remove(e){return this._charts.delete(e)}}var Vi=new lA;const fx="transparent",cA={boolean(t,e,n){return n>.5?e:t},color(t,e,n){const i=nx(t||fx),r=i.valid&&nx(e||fx);return r&&r.valid?r.mix(i,n).hexString():e},number(t,e,n){return t+(e-t)*n}};class uA{constructor(e,n,i,r){const s=n[i];r=Wl([e.to,r,s,e.from]);const a=Wl([e.from,s,r]);this._active=!0,this._fn=e.fn||cA[e.type||typeof a],this._easing=Lo[e.easing]||Lo.linear,this._start=Math.floor(Date.now()+(e.delay||0)),this._duration=this._total=Math.floor(e.duration),this._loop=!!e.loop,this._target=n,this._prop=i,this._from=a,this._to=r,this._promises=void 0}active(){return this._active}update(e,n,i){if(this._active){this._notify(!1);const r=this._target[this._prop],s=i-this._start,a=this._duration-s;this._start=i,this._duration=Math.floor(Math.max(a,e.duration)),this._total+=s,this._loop=!!e.loop,this._to=Wl([e.to,n,r,e.from]),this._from=Wl([e.from,r,n])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(e){const n=e-this._start,i=this._duration,r=this._prop,s=this._from,a=this._loop,o=this._to;let l;if(this._active=s!==o&&(a||n<i),!this._active){this._target[r]=o,this._notify(!0);return}if(n<0){this._target[r]=s;return}l=n/i%2,l=a&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[r]=this._fn(s,o,l)}wait(){const e=this._promises||(this._promises=[]);return new Promise((n,i)=>{e.push({res:n,rej:i})})}_notify(e){const n=e?"res":"rej",i=this._promises||[];for(let r=0;r<i.length;r++)i[r][n]()}}class nS{constructor(e,n){this._chart=e,this._properties=new Map,this.configure(n)}configure(e){if(!et(e))return;const n=Object.keys(Ft.animation),i=this._properties;Object.getOwnPropertyNames(e).forEach(r=>{const s=e[r];if(!et(s))return;const a={};for(const o of n)a[o]=s[o];(Dt(s.properties)&&s.properties||[r]).forEach(o=>{(o===r||!i.has(o))&&i.set(o,a)})})}_animateOptions(e,n){const i=n.options,r=fA(e,i);if(!r)return[];const s=this._createAnimations(r,i);return i.$shared&&dA(e.options.$animations,i).then(()=>{e.options=i},()=>{}),s}_createAnimations(e,n){const i=this._properties,r=[],s=e.$animations||(e.$animations={}),a=Object.keys(n),o=Date.now();let l;for(l=a.length-1;l>=0;--l){const c=a[l];if(c.charAt(0)==="$")continue;if(c==="options"){r.push(...this._animateOptions(e,n));continue}const u=n[c];let f=s[c];const d=i.get(c);if(f)if(d&&f.active()){f.update(d,u,o);continue}else f.cancel();if(!d||!d.duration){e[c]=u;continue}s[c]=f=new uA(d,e,c,u),r.push(f)}return r}update(e,n){if(this._properties.size===0){Object.assign(e,n);return}const i=this._createAnimations(e,n);if(i.length)return Vi.add(this._chart,i),!0}}function dA(t,e){const n=[],i=Object.keys(e);for(let r=0;r<i.length;r++){const s=t[i[r]];s&&s.active()&&n.push(s.wait())}return Promise.all(n)}function fA(t,e){if(!e)return;let n=t.options;if(!n){t.options=e;return}return n.$shared&&(t.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function hx(t,e){const n=t&&t.options||{},i=n.reverse,r=n.min===void 0?e:0,s=n.max===void 0?e:0;return{start:i?s:r,end:i?r:s}}function hA(t,e,n){if(n===!1)return!1;const i=hx(t,n),r=hx(e,n);return{top:r.end,right:i.end,bottom:r.start,left:i.start}}function pA(t){let e,n,i,r;return et(t)?(e=t.top,n=t.right,i=t.bottom,r=t.left):e=n=i=r=t,{top:e,right:n,bottom:i,left:r,disabled:t===!1}}function iS(t,e){const n=[],i=t._getSortedDatasetMetas(e);let r,s;for(r=0,s=i.length;r<s;++r)n.push(i[r].index);return n}function px(t,e,n,i={}){const r=t.keys,s=i.mode==="single";let a,o,l,c;if(e===null)return;let u=!1;for(a=0,o=r.length;a<o;++a){if(l=+r[a],l===n){if(u=!0,i.all)continue;break}c=t.values[l],hn(c)&&(s||e===0||La(e)===La(c))&&(e+=c)}return!u&&!i.all?0:e}function mA(t,e){const{iScale:n,vScale:i}=e,r=n.axis==="x"?"x":"y",s=i.axis==="x"?"x":"y",a=Object.keys(t),o=new Array(a.length);let l,c,u;for(l=0,c=a.length;l<c;++l)u=a[l],o[l]={[r]:u,[s]:t[u]};return o}function qd(t,e){const n=t&&t.options.stacked;return n||n===void 0&&e.stack!==void 0}function gA(t,e,n){return`${t.id}.${e.id}.${n.stack||n.type}`}function xA(t){const{min:e,max:n,minDefined:i,maxDefined:r}=t.getUserBounds();return{min:i?e:Number.NEGATIVE_INFINITY,max:r?n:Number.POSITIVE_INFINITY}}function _A(t,e,n){const i=t[e]||(t[e]={});return i[n]||(i[n]={})}function mx(t,e,n,i){for(const r of e.getMatchingVisibleMetas(i).reverse()){const s=t[r.index];if(n&&s>0||!n&&s<0)return r.index}return null}function gx(t,e){const{chart:n,_cachedMeta:i}=t,r=n._stacks||(n._stacks={}),{iScale:s,vScale:a,index:o}=i,l=s.axis,c=a.axis,u=gA(s,a,i),f=e.length;let d;for(let p=0;p<f;++p){const x=e[p],{[l]:y,[c]:m}=x,h=x._stacks||(x._stacks={});d=h[c]=_A(r,u,y),d[o]=m,d._top=mx(d,a,!0,i.type),d._bottom=mx(d,a,!1,i.type);const _=d._visualValues||(d._visualValues={});_[o]=m}}function Kd(t,e){const n=t.scales;return Object.keys(n).filter(i=>n[i].axis===e).shift()}function vA(t,e){return $r(t,{active:!1,dataset:void 0,datasetIndex:e,index:e,mode:"default",type:"dataset"})}function yA(t,e,n){return $r(t,{active:!1,dataIndex:e,parsed:void 0,raw:void 0,element:n,index:e,mode:"default",type:"data"})}function Za(t,e){const n=t.controller.index,i=t.vScale&&t.vScale.axis;if(i){e=e||t._parsed;for(const r of e){const s=r._stacks;if(!s||s[i]===void 0||s[i][n]===void 0)return;delete s[i][n],s[i]._visualValues!==void 0&&s[i]._visualValues[n]!==void 0&&delete s[i]._visualValues[n]}}}const Zd=t=>t==="reset"||t==="none",xx=(t,e)=>e?t:Object.assign({},t),bA=(t,e,n)=>t&&!e.hidden&&e._stacked&&{keys:iS(n,!0),values:null};class ko{constructor(e,n){this.chart=e,this._ctx=e.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const e=this._cachedMeta;this.configure(),this.linkScales(),e._stacked=qd(e.vScale,e),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(e){this.index!==e&&Za(this._cachedMeta),this.index=e}linkScales(){const e=this.chart,n=this._cachedMeta,i=this.getDataset(),r=(f,d,p,x)=>f==="x"?d:f==="r"?x:p,s=n.xAxisID=mt(i.xAxisID,Kd(e,"x")),a=n.yAxisID=mt(i.yAxisID,Kd(e,"y")),o=n.rAxisID=mt(i.rAxisID,Kd(e,"r")),l=n.indexAxis,c=n.iAxisID=r(l,s,a,o),u=n.vAxisID=r(l,a,s,o);n.xScale=this.getScaleForId(s),n.yScale=this.getScaleForId(a),n.rScale=this.getScaleForId(o),n.iScale=this.getScaleForId(c),n.vScale=this.getScaleForId(u)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(e){return this.chart.scales[e]}_getOtherScale(e){const n=this._cachedMeta;return e===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){const e=this._cachedMeta;this._data&&Q0(this._data,this),e._stacked&&Za(e)}_dataCheck(){const e=this.getDataset(),n=e.data||(e.data=[]),i=this._data;if(et(n)){const r=this._cachedMeta;this._data=mA(n,r)}else if(i!==n){if(i){Q0(i,this);const r=this._cachedMeta;Za(r),r._parsed=[]}n&&Object.isExtensible(n)&&QE(n,this),this._syncList=[],this._data=n}}addElements(){const e=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(e.dataset=new this.datasetElementType)}buildOrUpdateElements(e){const n=this._cachedMeta,i=this.getDataset();let r=!1;this._dataCheck();const s=n._stacked;n._stacked=qd(n.vScale,n),n.stack!==i.stack&&(r=!0,Za(n),n.stack=i.stack),this._resyncElements(e),(r||s!==n._stacked)&&(gx(this,n._parsed),n._stacked=qd(n.vScale,n))}configure(){const e=this.chart.config,n=e.datasetScopeKeys(this._type),i=e.getOptionScopes(this.getDataset(),n,!0);this.options=e.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(e,n){const{_cachedMeta:i,_data:r}=this,{iScale:s,_stacked:a}=i,o=s.axis;let l=e===0&&n===r.length?!0:i._sorted,c=e>0&&i._parsed[e-1],u,f,d;if(this._parsing===!1)i._parsed=r,i._sorted=!0,d=r;else{Dt(r[e])?d=this.parseArrayData(i,r,e,n):et(r[e])?d=this.parseObjectData(i,r,e,n):d=this.parsePrimitiveData(i,r,e,n);const p=()=>f[o]===null||c&&f[o]<c[o];for(u=0;u<n;++u)i._parsed[u+e]=f=d[u],l&&(p()&&(l=!1),c=f);i._sorted=l}a&&gx(this,d)}parsePrimitiveData(e,n,i,r){const{iScale:s,vScale:a}=e,o=s.axis,l=a.axis,c=s.getLabels(),u=s===a,f=new Array(r);let d,p,x;for(d=0,p=r;d<p;++d)x=d+i,f[d]={[o]:u||s.parse(c[x],x),[l]:a.parse(n[x],x)};return f}parseArrayData(e,n,i,r){const{xScale:s,yScale:a}=e,o=new Array(r);let l,c,u,f;for(l=0,c=r;l<c;++l)u=l+i,f=n[u],o[l]={x:s.parse(f[0],u),y:a.parse(f[1],u)};return o}parseObjectData(e,n,i,r){const{xScale:s,yScale:a}=e,{xAxisKey:o="x",yAxisKey:l="y"}=this._parsing,c=new Array(r);let u,f,d,p;for(u=0,f=r;u<f;++u)d=u+i,p=n[d],c[u]={x:s.parse(il(p,o),d),y:a.parse(il(p,l),d)};return c}getParsed(e){return this._cachedMeta._parsed[e]}getDataElement(e){return this._cachedMeta.data[e]}applyStack(e,n,i){const r=this.chart,s=this._cachedMeta,a=n[e.axis],o={keys:iS(r,!0),values:n._stacks[e.axis]._visualValues};return px(o,a,s.index,{mode:i})}updateRangeFromParsed(e,n,i,r){const s=i[n.axis];let a=s===null?NaN:s;const o=r&&i._stacks[n.axis];r&&o&&(r.values=o,a=px(r,s,this._cachedMeta.index)),e.min=Math.min(e.min,a),e.max=Math.max(e.max,a)}getMinMax(e,n){const i=this._cachedMeta,r=i._parsed,s=i._sorted&&e===i.iScale,a=r.length,o=this._getOtherScale(e),l=bA(n,i,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:u,max:f}=xA(o);let d,p;function x(){p=r[d];const y=p[o.axis];return!hn(p[e.axis])||u>y||f<y}for(d=0;d<a&&!(!x()&&(this.updateRangeFromParsed(c,e,p,l),s));++d);if(s){for(d=a-1;d>=0;--d)if(!x()){this.updateRangeFromParsed(c,e,p,l);break}}return c}getAllParsedValues(e){const n=this._cachedMeta._parsed,i=[];let r,s,a;for(r=0,s=n.length;r<s;++r)a=n[r][e.axis],hn(a)&&i.push(a);return i}getMaxOverflow(){return!1}getLabelAndValue(e){const n=this._cachedMeta,i=n.iScale,r=n.vScale,s=this.getParsed(e);return{label:i?""+i.getLabelForValue(s[i.axis]):"",value:r?""+r.getLabelForValue(s[r.axis]):""}}_update(e){const n=this._cachedMeta;this.update(e||"default"),n._clip=pA(mt(this.options.clip,hA(n.xScale,n.yScale,this.getMaxOverflow())))}update(e){}draw(){const e=this._ctx,n=this.chart,i=this._cachedMeta,r=i.data||[],s=n.chartArea,a=[],o=this._drawStart||0,l=this._drawCount||r.length-o,c=this.options.drawActiveElementsOnTop;let u;for(i.dataset&&i.dataset.draw(e,s,o,l),u=o;u<o+l;++u){const f=r[u];f.hidden||(f.active&&c?a.push(f):f.draw(e,s))}for(u=0;u<a.length;++u)a[u].draw(e,s)}getStyle(e,n){const i=n?"active":"default";return e===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(e||0,i)}getContext(e,n,i){const r=this.getDataset();let s;if(e>=0&&e<this._cachedMeta.data.length){const a=this._cachedMeta.data[e];s=a.$context||(a.$context=yA(this.getContext(),e,a)),s.parsed=this.getParsed(e),s.raw=r.data[e],s.index=s.dataIndex=e}else s=this.$context||(this.$context=vA(this.chart.getContext(),this.index)),s.dataset=r,s.index=s.datasetIndex=this.index;return s.active=!!n,s.mode=i,s}resolveDatasetElementOptions(e){return this._resolveElementOptions(this.datasetElementType.id,e)}resolveDataElementOptions(e,n){return this._resolveElementOptions(this.dataElementType.id,n,e)}_resolveElementOptions(e,n="default",i){const r=n==="active",s=this._cachedDataOpts,a=e+"-"+n,o=s[a],l=this.enableOptionSharing&&Tu(i);if(o)return xx(o,l);const c=this.chart.config,u=c.datasetElementScopeKeys(this._type,e),f=r?[`${e}Hover`,"hover",e,""]:[e,""],d=c.getOptionScopes(this.getDataset(),u),p=Object.keys(Ft.elements[e]),x=()=>this.getContext(i,r,n),y=c.resolveNamedOptions(d,p,x,f);return y.$shared&&(y.$shared=l,s[a]=Object.freeze(xx(y,l))),y}_resolveAnimations(e,n,i){const r=this.chart,s=this._cachedDataOpts,a=`animation-${n}`,o=s[a];if(o)return o;let l;if(r.options.animation!==!1){const u=this.chart.config,f=u.datasetAnimationScopeKeys(this._type,n),d=u.getOptionScopes(this.getDataset(),f);l=u.createResolver(d,this.getContext(e,i,n))}const c=new nS(r,l&&l.animations);return l&&l._cacheable&&(s[a]=Object.freeze(c)),c}getSharedOptions(e){if(e.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},e))}includeOptions(e,n){return!n||Zd(e)||this.chart._animationsDisabled}_getSharedOptions(e,n){const i=this.resolveDataElementOptions(e,n),r=this._sharedOptions,s=this.getSharedOptions(i),a=this.includeOptions(n,s)||s!==r;return this.updateSharedOptions(s,n,i),{sharedOptions:s,includeOptions:a}}updateElement(e,n,i,r){Zd(r)?Object.assign(e,i):this._resolveAnimations(n,r).update(e,i)}updateSharedOptions(e,n,i){e&&!Zd(n)&&this._resolveAnimations(void 0,n).update(e,i)}_setStyle(e,n,i,r){e.active=r;const s=this.getStyle(n,r);this._resolveAnimations(n,i,r).update(e,{options:!r&&this.getSharedOptions(s)||s})}removeHoverStyle(e,n,i){this._setStyle(e,i,"active",!1)}setHoverStyle(e,n,i){this._setStyle(e,i,"active",!0)}_removeDatasetHoverStyle(){const e=this._cachedMeta.dataset;e&&this._setStyle(e,void 0,"active",!1)}_setDatasetHoverStyle(){const e=this._cachedMeta.dataset;e&&this._setStyle(e,void 0,"active",!0)}_resyncElements(e){const n=this._data,i=this._cachedMeta.data;for(const[o,l,c]of this._syncList)this[o](l,c);this._syncList=[];const r=i.length,s=n.length,a=Math.min(s,r);a&&this.parse(0,a),s>r?this._insertElements(r,s-r,e):s<r&&this._removeElements(s,r-s)}_insertElements(e,n,i=!0){const r=this._cachedMeta,s=r.data,a=e+n;let o;const l=c=>{for(c.length+=n,o=c.length-1;o>=a;o--)c[o]=c[o-n]};for(l(s),o=e;o<a;++o)s[o]=new this.dataElementType;this._parsing&&l(r._parsed),this.parse(e,n),i&&this.updateElements(s,e,n,"reset")}updateElements(e,n,i,r){}_removeElements(e,n){const i=this._cachedMeta;if(this._parsing){const r=i._parsed.splice(e,n);i._stacked&&Za(i,r)}i.data.splice(e,n)}_sync(e){if(this._parsing)this._syncList.push(e);else{const[n,i,r]=e;this[n](i,r)}this.chart._dataChanges.push([this.index,...e])}_onDataPush(){const e=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-e,e])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(e,n){n&&this._sync(["_removeElements",e,n]);const i=arguments.length-2;i&&this._sync(["_insertElements",e,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}Xe(ko,"defaults",{}),Xe(ko,"datasetElementType",null),Xe(ko,"dataElementType",null);class Bc extends ko{getLabelAndValue(e){const n=this._cachedMeta.vScale,i=this.getParsed(e);return{label:n.getLabels()[e],value:""+n.getLabelForValue(i[n.axis])}}parseObjectData(e,n,i,r){return IT.bind(this)(e,n,i,r)}update(e){const n=this._cachedMeta,i=n.dataset,r=n.data||[],s=n.iScale.getLabels();if(i.points=r,e!=="resize"){const a=this.resolveDatasetElementOptions(e);this.options.showLine||(a.borderWidth=0);const o={_loop:!0,_fullLoop:s.length===r.length,options:a};this.updateElement(i,void 0,o,e)}this.updateElements(r,0,r.length,e)}updateElements(e,n,i,r){const s=this._cachedMeta.rScale,a=r==="reset";for(let o=n;o<n+i;o++){const l=e[o],c=this.resolveDataElementOptions(o,l.active?"active":r),u=s.getPointPositionForValue(o,this.getParsed(o).r),f=a?s.xCenter:u.x,d=a?s.yCenter:u.y,p={x:f,y:d,angle:u.angle,skip:isNaN(f)||isNaN(d),options:c};this.updateElement(l,o,p,r)}}}Xe(Bc,"id","radar"),Xe(Bc,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),Xe(Bc,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});function Zr(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class Zm{constructor(e){Xe(this,"options");this.options=e||{}}static override(e){Object.assign(Zm.prototype,e)}init(){}formats(){return Zr()}parse(){return Zr()}format(){return Zr()}add(){return Zr()}diff(){return Zr()}startOf(){return Zr()}endOf(){return Zr()}}var SA={_date:Zm};function MA(t,e,n,i){const{controller:r,data:s,_sorted:a}=t,o=r._cachedMeta.iScale,l=t.dataset&&t.dataset.options?t.dataset.options.spanGaps:null;if(o&&e===o.axis&&e!=="r"&&a&&s.length){const c=o._reversePixels?KE:Oh;if(i){if(r._sharedOptions){const u=s[0],f=typeof u.getRange=="function"&&u.getRange(e);if(f){const d=c(s,e,n-f),p=c(s,e,n+f);return{lo:d.lo,hi:p.hi}}}}else{const u=c(s,e,n);if(l){const{vScale:f}=r._cachedMeta,{_parsed:d}=t,p=d.slice(0,u.lo+1).reverse().findIndex(y=>!St(y[f.axis]));u.lo-=Math.max(0,p);const x=d.slice(u.hi).findIndex(y=>!St(y[f.axis]));u.hi+=Math.max(0,x)}return u}}return{lo:0,hi:s.length-1}}function ad(t,e,n,i,r){const s=t.getSortedVisibleDatasetMetas(),a=n[e];for(let o=0,l=s.length;o<l;++o){const{index:c,data:u}=s[o],{lo:f,hi:d}=MA(s[o],e,a,r);for(let p=f;p<=d;++p){const x=u[p];x.skip||i(x,c,p)}}}function wA(t){const e=t.indexOf("x")!==-1,n=t.indexOf("y")!==-1;return function(i,r){const s=e?Math.abs(i.x-r.x):0,a=n?Math.abs(i.y-r.y):0;return Math.sqrt(Math.pow(s,2)+Math.pow(a,2))}}function Qd(t,e,n,i,r){const s=[];return!r&&!t.isPointInArea(e)||ad(t,n,e,function(o,l,c){!r&&!Zi(o,t.chartArea,0)||o.inRange(e.x,e.y,i)&&s.push({element:o,datasetIndex:l,index:c})},!0),s}function EA(t,e,n,i){let r=[];function s(a,o,l){const{startAngle:c,endAngle:u}=a.getProps(["startAngle","endAngle"],i),{angle:f}=$E(a,{x:e.x,y:e.y});zb(f,c,u)&&r.push({element:a,datasetIndex:o,index:l})}return ad(t,n,e,s),r}function TA(t,e,n,i,r,s){let a=[];const o=wA(n);let l=Number.POSITIVE_INFINITY;function c(u,f,d){const p=u.inRange(e.x,e.y,r);if(i&&!p)return;const x=u.getCenterPoint(r);if(!(!!s||t.isPointInArea(x))&&!p)return;const m=o(e,x);m<l?(a=[{element:u,datasetIndex:f,index:d}],l=m):m===l&&a.push({element:u,datasetIndex:f,index:d})}return ad(t,n,e,c),a}function Jd(t,e,n,i,r,s){return!s&&!t.isPointInArea(e)?[]:n==="r"&&!i?EA(t,e,n,r):TA(t,e,n,i,r,s)}function _x(t,e,n,i,r){const s=[],a=n==="x"?"inXRange":"inYRange";let o=!1;return ad(t,n,e,(l,c,u)=>{l[a]&&l[a](e[n],r)&&(s.push({element:l,datasetIndex:c,index:u}),o=o||l.inRange(e.x,e.y,r))}),i&&!o?[]:s}var AA={modes:{index(t,e,n,i){const r=as(e,t),s=n.axis||"x",a=n.includeInvisible||!1,o=n.intersect?Qd(t,r,s,i,a):Jd(t,r,s,!1,i,a),l=[];return o.length?(t.getSortedVisibleDatasetMetas().forEach(c=>{const u=o[0].index,f=c.data[u];f&&!f.skip&&l.push({element:f,datasetIndex:c.index,index:u})}),l):[]},dataset(t,e,n,i){const r=as(e,t),s=n.axis||"xy",a=n.includeInvisible||!1;let o=n.intersect?Qd(t,r,s,i,a):Jd(t,r,s,!1,i,a);if(o.length>0){const l=o[0].datasetIndex,c=t.getDatasetMeta(l).data;o=[];for(let u=0;u<c.length;++u)o.push({element:c[u],datasetIndex:l,index:u})}return o},point(t,e,n,i){const r=as(e,t),s=n.axis||"xy",a=n.includeInvisible||!1;return Qd(t,r,s,i,a)},nearest(t,e,n,i){const r=as(e,t),s=n.axis||"xy",a=n.includeInvisible||!1;return Jd(t,r,s,n.intersect,i,a)},x(t,e,n,i){const r=as(e,t);return _x(t,r,"x",n.intersect,i)},y(t,e,n,i){const r=as(e,t);return _x(t,r,"y",n.intersect,i)}}};const rS=["left","top","right","bottom"];function Qa(t,e){return t.filter(n=>n.pos===e)}function vx(t,e){return t.filter(n=>rS.indexOf(n.pos)===-1&&n.box.axis===e)}function Ja(t,e){return t.sort((n,i)=>{const r=e?i:n,s=e?n:i;return r.weight===s.weight?r.index-s.index:r.weight-s.weight})}function CA(t){const e=[];let n,i,r,s,a,o;for(n=0,i=(t||[]).length;n<i;++n)r=t[n],{position:s,options:{stack:a,stackWeight:o=1}}=r,e.push({index:n,box:r,pos:s,horizontal:r.isHorizontal(),weight:r.weight,stack:a&&s+a,stackWeight:o});return e}function RA(t){const e={};for(const n of t){const{stack:i,pos:r,stackWeight:s}=n;if(!i||!rS.includes(r))continue;const a=e[i]||(e[i]={count:0,placed:0,weight:0,size:0});a.count++,a.weight+=s}return e}function PA(t,e){const n=RA(t),{vBoxMaxWidth:i,hBoxMaxHeight:r}=e;let s,a,o;for(s=0,a=t.length;s<a;++s){o=t[s];const{fullSize:l}=o.box,c=n[o.stack],u=c&&o.stackWeight/c.weight;o.horizontal?(o.width=u?u*i:l&&e.availableWidth,o.height=r):(o.width=i,o.height=u?u*r:l&&e.availableHeight)}return n}function NA(t){const e=CA(t),n=Ja(e.filter(c=>c.box.fullSize),!0),i=Ja(Qa(e,"left"),!0),r=Ja(Qa(e,"right")),s=Ja(Qa(e,"top"),!0),a=Ja(Qa(e,"bottom")),o=vx(e,"x"),l=vx(e,"y");return{fullSize:n,leftAndTop:i.concat(s),rightAndBottom:r.concat(l).concat(a).concat(o),chartArea:Qa(e,"chartArea"),vertical:i.concat(r).concat(l),horizontal:s.concat(a).concat(o)}}function yx(t,e,n,i){return Math.max(t[n],e[n])+Math.max(t[i],e[i])}function sS(t,e){t.top=Math.max(t.top,e.top),t.left=Math.max(t.left,e.left),t.bottom=Math.max(t.bottom,e.bottom),t.right=Math.max(t.right,e.right)}function LA(t,e,n,i){const{pos:r,box:s}=n,a=t.maxPadding;if(!et(r)){n.size&&(t[r]-=n.size);const f=i[n.stack]||{size:0,count:1};f.size=Math.max(f.size,n.horizontal?s.height:s.width),n.size=f.size/f.count,t[r]+=n.size}s.getPadding&&sS(a,s.getPadding());const o=Math.max(0,e.outerWidth-yx(a,t,"left","right")),l=Math.max(0,e.outerHeight-yx(a,t,"top","bottom")),c=o!==t.w,u=l!==t.h;return t.w=o,t.h=l,n.horizontal?{same:c,other:u}:{same:u,other:c}}function DA(t){const e=t.maxPadding;function n(i){const r=Math.max(e[i]-t[i],0);return t[i]+=r,r}t.y+=n("top"),t.x+=n("left"),n("right"),n("bottom")}function IA(t,e){const n=e.maxPadding;function i(r){const s={left:0,top:0,right:0,bottom:0};return r.forEach(a=>{s[a]=Math.max(e[a],n[a])}),s}return i(t?["left","right"]:["top","bottom"])}function mo(t,e,n,i){const r=[];let s,a,o,l,c,u;for(s=0,a=t.length,c=0;s<a;++s){o=t[s],l=o.box,l.update(o.width||e.w,o.height||e.h,IA(o.horizontal,e));const{same:f,other:d}=LA(e,n,o,i);c|=f&&r.length,u=u||d,l.fullSize||r.push(o)}return c&&mo(r,e,n,i)||u}function $l(t,e,n,i,r){t.top=n,t.left=e,t.right=e+i,t.bottom=n+r,t.width=i,t.height=r}function bx(t,e,n,i){const r=n.padding;let{x:s,y:a}=e;for(const o of t){const l=o.box,c=i[o.stack]||{placed:0,weight:1},u=o.stackWeight/c.weight||1;if(o.horizontal){const f=e.w*u,d=c.size||l.height;Tu(c.start)&&(a=c.start),l.fullSize?$l(l,r.left,a,n.outerWidth-r.right-r.left,d):$l(l,e.left+c.placed,a,f,d),c.start=a,c.placed+=f,a=l.bottom}else{const f=e.h*u,d=c.size||l.width;Tu(c.start)&&(s=c.start),l.fullSize?$l(l,s,r.top,d,n.outerHeight-r.bottom-r.top):$l(l,s,e.top+c.placed,d,f),c.start=s,c.placed+=f,s=l.right}}e.x=s,e.y=a}var Yl={addBox(t,e){t.boxes||(t.boxes=[]),e.fullSize=e.fullSize||!1,e.position=e.position||"top",e.weight=e.weight||0,e._layers=e._layers||function(){return[{z:0,draw(n){e.draw(n)}}]},t.boxes.push(e)},removeBox(t,e){const n=t.boxes?t.boxes.indexOf(e):-1;n!==-1&&t.boxes.splice(n,1)},configure(t,e,n){e.fullSize=n.fullSize,e.position=n.position,e.weight=n.weight},update(t,e,n,i){if(!t)return;const r=Jn(t.options.layout.padding),s=Math.max(e-r.width,0),a=Math.max(n-r.height,0),o=NA(t.boxes),l=o.vertical,c=o.horizontal;dt(t.boxes,y=>{typeof y.beforeLayout=="function"&&y.beforeLayout()});const u=l.reduce((y,m)=>m.box.options&&m.box.options.display===!1?y:y+1,0)||1,f=Object.freeze({outerWidth:e,outerHeight:n,padding:r,availableWidth:s,availableHeight:a,vBoxMaxWidth:s/2/u,hBoxMaxHeight:a/2}),d=Object.assign({},r);sS(d,Jn(i));const p=Object.assign({maxPadding:d,w:s,h:a,x:r.left,y:r.top},r),x=PA(l.concat(c),f);mo(o.fullSize,p,f,x),mo(l,p,f,x),mo(c,p,f,x)&&mo(l,p,f,x),DA(p),bx(o.leftAndTop,p,f,x),p.x+=p.w,p.y+=p.h,bx(o.rightAndBottom,p,f,x),t.chartArea={left:p.left,top:p.top,right:p.left+p.w,bottom:p.top+p.h,height:p.h,width:p.w},dt(o.chartArea,y=>{const m=y.box;Object.assign(m,t.chartArea),m.update(p.w,p.h,{left:0,top:0,right:0,bottom:0})})}};class aS{acquireContext(e,n){}releaseContext(e){return!1}addEventListener(e,n,i){}removeEventListener(e,n,i){}getDevicePixelRatio(){return 1}getMaximumSize(e,n,i,r){return n=Math.max(0,n||e.width),i=i||e.height,{width:n,height:Math.max(0,r?Math.floor(n/r):i)}}isAttached(e){return!0}updateConfig(e){}}class kA extends aS{acquireContext(e){return e&&e.getContext&&e.getContext("2d")||null}updateConfig(e){e.options.animation=!1}}const Hc="$chartjs",FA={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Sx=t=>t===null||t==="";function UA(t,e){const n=t.style,i=t.getAttribute("height"),r=t.getAttribute("width");if(t[Hc]={initial:{height:i,width:r,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",n.boxSizing=n.boxSizing||"border-box",Sx(r)){const s=lx(t,"width");s!==void 0&&(t.width=s)}if(Sx(i))if(t.style.height==="")t.height=t.width/(e||2);else{const s=lx(t,"height");s!==void 0&&(t.height=s)}return t}const oS=YT?{passive:!0}:!1;function OA(t,e,n){t&&t.addEventListener(e,n,oS)}function zA(t,e,n){t&&t.canvas&&t.canvas.removeEventListener(e,n,oS)}function BA(t,e){const n=FA[t.type]||t.type,{x:i,y:r}=as(t,e);return{type:n,chart:e,native:t,x:i!==void 0?i:null,y:r!==void 0?r:null}}function Lu(t,e){for(const n of t)if(n===e||n.contains(e))return!0}function HA(t,e,n){const i=t.canvas,r=new MutationObserver(s=>{let a=!1;for(const o of s)a=a||Lu(o.addedNodes,i),a=a&&!Lu(o.removedNodes,i);a&&n()});return r.observe(document,{childList:!0,subtree:!0}),r}function VA(t,e,n){const i=t.canvas,r=new MutationObserver(s=>{let a=!1;for(const o of s)a=a||Lu(o.removedNodes,i),a=a&&!Lu(o.addedNodes,i);a&&n()});return r.observe(document,{childList:!0,subtree:!0}),r}const rl=new Map;let Mx=0;function lS(){const t=window.devicePixelRatio;t!==Mx&&(Mx=t,rl.forEach((e,n)=>{n.currentDevicePixelRatio!==t&&e()}))}function GA(t,e){rl.size||window.addEventListener("resize",lS),rl.set(t,e)}function WA(t){rl.delete(t),rl.size||window.removeEventListener("resize",lS)}function jA(t,e,n){const i=t.canvas,r=i&&Km(i);if(!r)return;const s=Gb((o,l)=>{const c=r.clientWidth;n(o,l),c<r.clientWidth&&n()},window),a=new ResizeObserver(o=>{const l=o[0],c=l.contentRect.width,u=l.contentRect.height;c===0&&u===0||s(c,u)});return a.observe(r),GA(t,s),a}function ef(t,e,n){n&&n.disconnect(),e==="resize"&&WA(t)}function XA(t,e,n){const i=t.canvas,r=Gb(s=>{t.ctx!==null&&n(BA(s,t))},t);return OA(i,e,r),r}class $A extends aS{acquireContext(e,n){const i=e&&e.getContext&&e.getContext("2d");return i&&i.canvas===e?(UA(e,n),i):null}releaseContext(e){const n=e.canvas;if(!n[Hc])return!1;const i=n[Hc].initial;["height","width"].forEach(s=>{const a=i[s];St(a)?n.removeAttribute(s):n.setAttribute(s,a)});const r=i.style||{};return Object.keys(r).forEach(s=>{n.style[s]=r[s]}),n.width=n.width,delete n[Hc],!0}addEventListener(e,n,i){this.removeEventListener(e,n);const r=e.$proxies||(e.$proxies={}),a={attach:HA,detach:VA,resize:jA}[n]||XA;r[n]=a(e,n,i)}removeEventListener(e,n){const i=e.$proxies||(e.$proxies={}),r=i[n];if(!r)return;({attach:ef,detach:ef,resize:ef}[n]||zA)(e,n,r),i[n]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(e,n,i,r){return $T(e,n,i,r)}isAttached(e){const n=e&&Km(e);return!!(n&&n.isConnected)}}function YA(t){return!qm()||typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas?kA:$A}class Es{constructor(){Xe(this,"x");Xe(this,"y");Xe(this,"active",!1);Xe(this,"options");Xe(this,"$animations")}tooltipPosition(e){const{x:n,y:i}=this.getProps(["x","y"],e);return{x:n,y:i}}hasValue(){return Cu(this.x)&&Cu(this.y)}getProps(e,n){const i=this.$animations;if(!n||!i)return this;const r={};return e.forEach(s=>{r[s]=i[s]&&i[s].active()?i[s]._to:this[s]}),r}}Xe(Es,"defaults",{}),Xe(Es,"defaultRoutes");function qA(t,e){const n=t.options.ticks,i=KA(t),r=Math.min(n.maxTicksLimit||i,i),s=n.major.enabled?QA(e):[],a=s.length,o=s[0],l=s[a-1],c=[];if(a>r)return JA(e,c,s,a/r),c;const u=ZA(s,e,r);if(a>0){let f,d;const p=a>1?Math.round((l-o)/(a-1)):null;for(ql(e,c,u,St(p)?0:o-p,o),f=0,d=a-1;f<d;f++)ql(e,c,u,s[f],s[f+1]);return ql(e,c,u,l,St(p)?e.length:l+p),c}return ql(e,c,u),c}function KA(t){const e=t.options.offset,n=t._tickSize(),i=t._length/n+(e?0:1),r=t._maxLength/n;return Math.floor(Math.min(i,r))}function ZA(t,e,n){const i=e2(t),r=e.length/n;if(!i)return Math.max(r,1);const s=GE(i);for(let a=0,o=s.length-1;a<o;a++){const l=s[a];if(l>r)return l}return Math.max(r,1)}function QA(t){const e=[];let n,i;for(n=0,i=t.length;n<i;n++)t[n].major&&e.push(n);return e}function JA(t,e,n,i){let r=0,s=n[0],a;for(i=Math.ceil(i),a=0;a<t.length;a++)a===s&&(e.push(t[a]),r++,s=n[r*i])}function ql(t,e,n,i,r){const s=mt(i,0),a=Math.min(mt(r,t.length),t.length);let o=0,l,c,u;for(n=Math.ceil(n),r&&(l=r-i,n=l/Math.floor(l/n)),u=s;u<0;)o++,u=Math.round(s+o*n);for(c=Math.max(s,0);c<a;c++)c===u&&(e.push(t[c]),o++,u=Math.round(s+o*n))}function e2(t){const e=t.length;let n,i;if(e<2)return!1;for(i=t[0],n=1;n<e;++n)if(t[n]-t[n-1]!==i)return!1;return i}const t2=t=>t==="left"?"right":t==="right"?"left":t,wx=(t,e,n)=>e==="top"||e==="left"?t[e]+n:t[e]-n,Ex=(t,e)=>Math.min(e||t,t);function Tx(t,e){const n=[],i=t.length/e,r=t.length;let s=0;for(;s<r;s+=i)n.push(t[Math.floor(s)]);return n}function n2(t,e,n){const i=t.ticks.length,r=Math.min(e,i-1),s=t._startPixel,a=t._endPixel,o=1e-6;let l=t.getPixelForTick(r),c;if(!(n&&(i===1?c=Math.max(l-s,a-l):e===0?c=(t.getPixelForTick(1)-l)/2:c=(l-t.getPixelForTick(r-1))/2,l+=r<e?c:-c,l<s-o||l>a+o)))return l}function i2(t,e){dt(t,n=>{const i=n.gc,r=i.length/2;let s;if(r>e){for(s=0;s<r;++s)delete n.data[i[s]];i.splice(0,r)}})}function eo(t){return t.drawTicks?t.tickLength:0}function Ax(t,e){if(!t.display)return 0;const n=Fn(t.font,e),i=Jn(t.padding);return(Dt(t.text)?t.text.length:1)*n.lineHeight+i.height}function r2(t,e){return $r(t,{scale:e,type:"scale"})}function s2(t,e,n){return $r(t,{tick:n,index:e,type:"tick"})}function a2(t,e,n){let i=tT(t);return(n&&e!=="right"||!n&&e==="right")&&(i=t2(i)),i}function o2(t,e,n,i){const{top:r,left:s,bottom:a,right:o,chart:l}=t,{chartArea:c,scales:u}=l;let f=0,d,p,x;const y=a-r,m=o-s;if(t.isHorizontal()){if(p=J0(i,s,o),et(n)){const h=Object.keys(n)[0],_=n[h];x=u[h].getPixelForValue(_)+y-e}else n==="center"?x=(c.bottom+c.top)/2+y-e:x=wx(t,n,e);d=o-s}else{if(et(n)){const h=Object.keys(n)[0],_=n[h];p=u[h].getPixelForValue(_)-m+e}else n==="center"?p=(c.left+c.right)/2-m+e:p=wx(t,n,e);x=J0(i,a,r),f=n==="left"?-kn:kn}return{titleX:p,titleY:x,maxWidth:d,rotation:f}}class xl extends Es{constructor(e){super(),this.id=e.id,this.type=e.type,this.options=void 0,this.ctx=e.ctx,this.chart=e.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(e){this.options=e.setContext(this.getContext()),this.axis=e.axis,this._userMin=this.parse(e.min),this._userMax=this.parse(e.max),this._suggestedMin=this.parse(e.suggestedMin),this._suggestedMax=this.parse(e.suggestedMax)}parse(e,n){return e}getUserBounds(){let{_userMin:e,_userMax:n,_suggestedMin:i,_suggestedMax:r}=this;return e=_i(e,Number.POSITIVE_INFINITY),n=_i(n,Number.NEGATIVE_INFINITY),i=_i(i,Number.POSITIVE_INFINITY),r=_i(r,Number.NEGATIVE_INFINITY),{min:_i(e,i),max:_i(n,r),minDefined:hn(e),maxDefined:hn(n)}}getMinMax(e){let{min:n,max:i,minDefined:r,maxDefined:s}=this.getUserBounds(),a;if(r&&s)return{min:n,max:i};const o=this.getMatchingVisibleMetas();for(let l=0,c=o.length;l<c;++l)a=o[l].controller.getMinMax(this,e),r||(n=Math.min(n,a.min)),s||(i=Math.max(i,a.max));return n=s&&n>i?i:n,i=r&&n>i?n:i,{min:_i(n,_i(i,n)),max:_i(i,_i(n,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const e=this.chart.data;return this.options.labels||(this.isHorizontal()?e.xLabels:e.yLabels)||e.labels||[]}getLabelItems(e=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(e))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){Nt(this.options.beforeUpdate,[this])}update(e,n,i){const{beginAtZero:r,grace:s,ticks:a}=this.options,o=a.sampleSize;this.beforeUpdate(),this.maxWidth=e,this.maxHeight=n,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=wT(this,s,r),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const l=o<this.ticks.length;this._convertTicksToLabels(l?Tx(this.ticks,o):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),a.display&&(a.autoSkip||a.source==="auto")&&(this.ticks=qA(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let e=this.options.reverse,n,i;this.isHorizontal()?(n=this.left,i=this.right):(n=this.top,i=this.bottom,e=!e),this._startPixel=n,this._endPixel=i,this._reversePixels=e,this._length=i-n,this._alignToPixels=this.options.alignToPixels}afterUpdate(){Nt(this.options.afterUpdate,[this])}beforeSetDimensions(){Nt(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){Nt(this.options.afterSetDimensions,[this])}_callHooks(e){this.chart.notifyPlugins(e,this.getContext()),Nt(this.options[e],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){Nt(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(e){const n=this.options.ticks;let i,r,s;for(i=0,r=e.length;i<r;i++)s=e[i],s.label=Nt(n.callback,[s.value,i,e],this)}afterTickToLabelConversion(){Nt(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){Nt(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const e=this.options,n=e.ticks,i=Ex(this.ticks.length,e.ticks.maxTicksLimit),r=n.minRotation||0,s=n.maxRotation;let a=r,o,l,c;if(!this._isVisible()||!n.display||r>=s||i<=1||!this.isHorizontal()){this.labelRotation=r;return}const u=this._getLabelSizes(),f=u.widest.width,d=u.highest.height,p=Ki(this.chart.width-f,0,this.maxWidth);o=e.offset?this.maxWidth/i:p/(i-1),f+6>o&&(o=p/(i-(e.offset?.5:1)),l=this.maxHeight-eo(e.grid)-n.padding-Ax(e.title,this.chart.options.font),c=Math.sqrt(f*f+d*d),a=Hm(Math.min(Math.asin(Ki((u.highest.height+6)/o,-1,1)),Math.asin(Ki(l/c,-1,1))-Math.asin(Ki(d/c,-1,1)))),a=Math.max(r,Math.min(s,a))),this.labelRotation=a}afterCalculateLabelRotation(){Nt(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){Nt(this.options.beforeFit,[this])}fit(){const e={width:0,height:0},{chart:n,options:{ticks:i,title:r,grid:s}}=this,a=this._isVisible(),o=this.isHorizontal();if(a){const l=Ax(r,n.options.font);if(o?(e.width=this.maxWidth,e.height=eo(s)+l):(e.height=this.maxHeight,e.width=eo(s)+l),i.display&&this.ticks.length){const{first:c,last:u,widest:f,highest:d}=this._getLabelSizes(),p=i.padding*2,x=fs(this.labelRotation),y=Math.cos(x),m=Math.sin(x);if(o){const h=i.mirror?0:m*f.width+y*d.height;e.height=Math.min(this.maxHeight,e.height+h+p)}else{const h=i.mirror?0:y*f.width+m*d.height;e.width=Math.min(this.maxWidth,e.width+h+p)}this._calculatePadding(c,u,m,y)}}this._handleMargins(),o?(this.width=this._length=n.width-this._margins.left-this._margins.right,this.height=e.height):(this.width=e.width,this.height=this._length=n.height-this._margins.top-this._margins.bottom)}_calculatePadding(e,n,i,r){const{ticks:{align:s,padding:a},position:o}=this.options,l=this.labelRotation!==0,c=o!=="top"&&this.axis==="x";if(this.isHorizontal()){const u=this.getPixelForTick(0)-this.left,f=this.right-this.getPixelForTick(this.ticks.length-1);let d=0,p=0;l?c?(d=r*e.width,p=i*n.height):(d=i*e.height,p=r*n.width):s==="start"?p=n.width:s==="end"?d=e.width:s!=="inner"&&(d=e.width/2,p=n.width/2),this.paddingLeft=Math.max((d-u+a)*this.width/(this.width-u),0),this.paddingRight=Math.max((p-f+a)*this.width/(this.width-f),0)}else{let u=n.height/2,f=e.height/2;s==="start"?(u=0,f=e.height):s==="end"&&(u=n.height,f=0),this.paddingTop=u+a,this.paddingBottom=f+a}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){Nt(this.options.afterFit,[this])}isHorizontal(){const{axis:e,position:n}=this.options;return n==="top"||n==="bottom"||e==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(e){this.beforeTickToLabelConversion(),this.generateTickLabels(e);let n,i;for(n=0,i=e.length;n<i;n++)St(e[n].label)&&(e.splice(n,1),i--,n--);this.afterTickToLabelConversion()}_getLabelSizes(){let e=this._labelSizes;if(!e){const n=this.options.ticks.sampleSize;let i=this.ticks;n<i.length&&(i=Tx(i,n)),this._labelSizes=e=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return e}_computeLabelSizes(e,n,i){const{ctx:r,_longestTextCache:s}=this,a=[],o=[],l=Math.floor(n/Ex(n,i));let c=0,u=0,f,d,p,x,y,m,h,_,M,b,S;for(f=0;f<n;f+=l){if(x=e[f].label,y=this._resolveTickFontOptions(f),r.font=m=y.string,h=s[m]=s[m]||{data:{},gc:[]},_=y.lineHeight,M=b=0,!St(x)&&!Dt(x))M=Ru(r,h.data,h.gc,M,x),b=_;else if(Dt(x))for(d=0,p=x.length;d<p;++d)S=x[d],!St(S)&&!Dt(S)&&(M=Ru(r,h.data,h.gc,M,S),b+=_);a.push(M),o.push(b),c=Math.max(M,c),u=Math.max(b,u)}i2(s,n);const E=a.indexOf(c),C=o.indexOf(u),v=A=>({width:a[A]||0,height:o[A]||0});return{first:v(0),last:v(n-1),widest:v(E),highest:v(C),widths:a,heights:o}}getLabelForValue(e){return e}getPixelForValue(e,n){return NaN}getValueForPixel(e){}getPixelForTick(e){const n=this.ticks;return e<0||e>n.length-1?null:this.getPixelForValue(n[e].value)}getPixelForDecimal(e){this._reversePixels&&(e=1-e);const n=this._startPixel+e*this._length;return qE(this._alignToPixels?Kr(this.chart,n,0):n)}getDecimalForPixel(e){const n=(e-this._startPixel)/this._length;return this._reversePixels?1-n:n}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:e,max:n}=this;return e<0&&n<0?n:e>0&&n>0?e:0}getContext(e){const n=this.ticks||[];if(e>=0&&e<n.length){const i=n[e];return i.$context||(i.$context=s2(this.getContext(),e,i))}return this.$context||(this.$context=r2(this.chart.getContext(),this))}_tickSize(){const e=this.options.ticks,n=fs(this.labelRotation),i=Math.abs(Math.cos(n)),r=Math.abs(Math.sin(n)),s=this._getLabelSizes(),a=e.autoSkipPadding||0,o=s?s.widest.width+a:0,l=s?s.highest.height+a:0;return this.isHorizontal()?l*i>o*r?o/i:l/r:l*r<o*i?l/i:o/r}_isVisible(){const e=this.options.display;return e!=="auto"?!!e:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(e){const n=this.axis,i=this.chart,r=this.options,{grid:s,position:a,border:o}=r,l=s.offset,c=this.isHorizontal(),f=this.ticks.length+(l?1:0),d=eo(s),p=[],x=o.setContext(this.getContext()),y=x.display?x.width:0,m=y/2,h=function(Y){return Kr(i,Y,y)};let _,M,b,S,E,C,v,A,R,N,L,B;if(a==="top")_=h(this.bottom),C=this.bottom-d,A=_-m,N=h(e.top)+m,B=e.bottom;else if(a==="bottom")_=h(this.top),N=e.top,B=h(e.bottom)-m,C=_+m,A=this.top+d;else if(a==="left")_=h(this.right),E=this.right-d,v=_-m,R=h(e.left)+m,L=e.right;else if(a==="right")_=h(this.left),R=e.left,L=h(e.right)-m,E=_+m,v=this.left+d;else if(n==="x"){if(a==="center")_=h((e.top+e.bottom)/2+.5);else if(et(a)){const Y=Object.keys(a)[0],G=a[Y];_=h(this.chart.scales[Y].getPixelForValue(G))}N=e.top,B=e.bottom,C=_+m,A=C+d}else if(n==="y"){if(a==="center")_=h((e.left+e.right)/2);else if(et(a)){const Y=Object.keys(a)[0],G=a[Y];_=h(this.chart.scales[Y].getPixelForValue(G))}E=_-m,v=E-d,R=e.left,L=e.right}const D=mt(r.ticks.maxTicksLimit,f),O=Math.max(1,Math.ceil(f/D));for(M=0;M<f;M+=O){const Y=this.getContext(M),G=s.setContext(Y),H=o.setContext(Y),z=G.lineWidth,W=G.color,Q=H.dash||[],le=H.dashOffset,ve=G.tickWidth,Ue=G.tickColor,Fe=G.tickBorderDash||[],De=G.tickBorderDashOffset;b=n2(this,M,l),b!==void 0&&(S=Kr(i,b,z),c?E=v=R=L=S:C=A=N=B=S,p.push({tx1:E,ty1:C,tx2:v,ty2:A,x1:R,y1:N,x2:L,y2:B,width:z,color:W,borderDash:Q,borderDashOffset:le,tickWidth:ve,tickColor:Ue,tickBorderDash:Fe,tickBorderDashOffset:De}))}return this._ticksLength=f,this._borderValue=_,p}_computeLabelItems(e){const n=this.axis,i=this.options,{position:r,ticks:s}=i,a=this.isHorizontal(),o=this.ticks,{align:l,crossAlign:c,padding:u,mirror:f}=s,d=eo(i.grid),p=d+u,x=f?-u:p,y=-fs(this.labelRotation),m=[];let h,_,M,b,S,E,C,v,A,R,N,L,B="middle";if(r==="top")E=this.bottom-x,C=this._getXAxisLabelAlignment();else if(r==="bottom")E=this.top+x,C=this._getXAxisLabelAlignment();else if(r==="left"){const O=this._getYAxisLabelAlignment(d);C=O.textAlign,S=O.x}else if(r==="right"){const O=this._getYAxisLabelAlignment(d);C=O.textAlign,S=O.x}else if(n==="x"){if(r==="center")E=(e.top+e.bottom)/2+p;else if(et(r)){const O=Object.keys(r)[0],Y=r[O];E=this.chart.scales[O].getPixelForValue(Y)+p}C=this._getXAxisLabelAlignment()}else if(n==="y"){if(r==="center")S=(e.left+e.right)/2-p;else if(et(r)){const O=Object.keys(r)[0],Y=r[O];S=this.chart.scales[O].getPixelForValue(Y)}C=this._getYAxisLabelAlignment(d).textAlign}n==="y"&&(l==="start"?B="top":l==="end"&&(B="bottom"));const D=this._getLabelSizes();for(h=0,_=o.length;h<_;++h){M=o[h],b=M.label;const O=s.setContext(this.getContext(h));v=this.getPixelForTick(h)+s.labelOffset,A=this._resolveTickFontOptions(h),R=A.lineHeight,N=Dt(b)?b.length:1;const Y=N/2,G=O.color,H=O.textStrokeColor,z=O.textStrokeWidth;let W=C;a?(S=v,C==="inner"&&(h===_-1?W=this.options.reverse?"left":"right":h===0?W=this.options.reverse?"right":"left":W="center"),r==="top"?c==="near"||y!==0?L=-N*R+R/2:c==="center"?L=-D.highest.height/2-Y*R+R:L=-D.highest.height+R/2:c==="near"||y!==0?L=R/2:c==="center"?L=D.highest.height/2-Y*R:L=D.highest.height-N*R,f&&(L*=-1),y!==0&&!O.showLabelBackdrop&&(S+=R/2*Math.sin(y))):(E=v,L=(1-N)*R/2);let Q;if(O.showLabelBackdrop){const le=Jn(O.backdropPadding),ve=D.heights[h],Ue=D.widths[h];let Fe=L-le.top,De=0-le.left;switch(B){case"middle":Fe-=ve/2;break;case"bottom":Fe-=ve;break}switch(C){case"center":De-=Ue/2;break;case"right":De-=Ue;break;case"inner":h===_-1?De-=Ue:h>0&&(De-=Ue/2);break}Q={left:De,top:Fe,width:Ue+le.width,height:ve+le.height,color:O.backdropColor}}m.push({label:b,font:A,textOffset:L,options:{rotation:y,color:G,strokeColor:H,strokeWidth:z,textAlign:W,textBaseline:B,translation:[S,E],backdrop:Q}})}return m}_getXAxisLabelAlignment(){const{position:e,ticks:n}=this.options;if(-fs(this.labelRotation))return e==="top"?"left":"right";let r="center";return n.align==="start"?r="left":n.align==="end"?r="right":n.align==="inner"&&(r="inner"),r}_getYAxisLabelAlignment(e){const{position:n,ticks:{crossAlign:i,mirror:r,padding:s}}=this.options,a=this._getLabelSizes(),o=e+s,l=a.widest.width;let c,u;return n==="left"?r?(u=this.right+s,i==="near"?c="left":i==="center"?(c="center",u+=l/2):(c="right",u+=l)):(u=this.right-o,i==="near"?c="right":i==="center"?(c="center",u-=l/2):(c="left",u=this.left)):n==="right"?r?(u=this.left+s,i==="near"?c="right":i==="center"?(c="center",u-=l/2):(c="left",u-=l)):(u=this.left+o,i==="near"?c="left":i==="center"?(c="center",u+=l/2):(c="right",u=this.right)):c="right",{textAlign:c,x:u}}_computeLabelArea(){if(this.options.ticks.mirror)return;const e=this.chart,n=this.options.position;if(n==="left"||n==="right")return{top:0,left:this.left,bottom:e.height,right:this.right};if(n==="top"||n==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:e.width}}drawBackground(){const{ctx:e,options:{backgroundColor:n},left:i,top:r,width:s,height:a}=this;n&&(e.save(),e.fillStyle=n,e.fillRect(i,r,s,a),e.restore())}getLineWidthForValue(e){const n=this.options.grid;if(!this._isVisible()||!n.display)return 0;const r=this.ticks.findIndex(s=>s.value===e);return r>=0?n.setContext(this.getContext(r)).lineWidth:0}drawGrid(e){const n=this.options.grid,i=this.ctx,r=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(e));let s,a;const o=(l,c,u)=>{!u.width||!u.color||(i.save(),i.lineWidth=u.width,i.strokeStyle=u.color,i.setLineDash(u.borderDash||[]),i.lineDashOffset=u.borderDashOffset,i.beginPath(),i.moveTo(l.x,l.y),i.lineTo(c.x,c.y),i.stroke(),i.restore())};if(n.display)for(s=0,a=r.length;s<a;++s){const l=r[s];n.drawOnChartArea&&o({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),n.drawTicks&&o({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){const{chart:e,ctx:n,options:{border:i,grid:r}}=this,s=i.setContext(this.getContext()),a=i.display?s.width:0;if(!a)return;const o=r.setContext(this.getContext(0)).lineWidth,l=this._borderValue;let c,u,f,d;this.isHorizontal()?(c=Kr(e,this.left,a)-a/2,u=Kr(e,this.right,o)+o/2,f=d=l):(f=Kr(e,this.top,a)-a/2,d=Kr(e,this.bottom,o)+o/2,c=u=l),n.save(),n.lineWidth=s.width,n.strokeStyle=s.color,n.beginPath(),n.moveTo(c,f),n.lineTo(u,d),n.stroke(),n.restore()}drawLabels(e){if(!this.options.ticks.display)return;const i=this.ctx,r=this._computeLabelArea();r&&Wm(i,r);const s=this.getLabelItems(e);for(const a of s){const o=a.options,l=a.font,c=a.label,u=a.textOffset;Pu(i,c,0,u,l,o)}r&&jm(i)}drawTitle(){const{ctx:e,options:{position:n,title:i,reverse:r}}=this;if(!i.display)return;const s=Fn(i.font),a=Jn(i.padding),o=i.align;let l=s.lineHeight/2;n==="bottom"||n==="center"||et(n)?(l+=a.bottom,Dt(i.text)&&(l+=s.lineHeight*(i.text.length-1))):l+=a.top;const{titleX:c,titleY:u,maxWidth:f,rotation:d}=o2(this,l,n,o);Pu(e,i.text,0,0,s,{color:i.color,maxWidth:f,rotation:d,textAlign:a2(o,n,r),textBaseline:"middle",translation:[c,u]})}draw(e){this._isVisible()&&(this.drawBackground(),this.drawGrid(e),this.drawBorder(),this.drawTitle(),this.drawLabels(e))}_layers(){const e=this.options,n=e.ticks&&e.ticks.z||0,i=mt(e.grid&&e.grid.z,-1),r=mt(e.border&&e.border.z,0);return!this._isVisible()||this.draw!==xl.prototype.draw?[{z:n,draw:s=>{this.draw(s)}}]:[{z:i,draw:s=>{this.drawBackground(),this.drawGrid(s),this.drawTitle()}},{z:r,draw:()=>{this.drawBorder()}},{z:n,draw:s=>{this.drawLabels(s)}}]}getMatchingVisibleMetas(e){const n=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",r=[];let s,a;for(s=0,a=n.length;s<a;++s){const o=n[s];o[i]===this.id&&(!e||o.type===e)&&r.push(o)}return r}_resolveTickFontOptions(e){const n=this.options.ticks.setContext(this.getContext(e));return Fn(n.font)}_maxDigits(){const e=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/e}}class Kl{constructor(e,n,i){this.type=e,this.scope=n,this.override=i,this.items=Object.create(null)}isForType(e){return Object.prototype.isPrototypeOf.call(this.type.prototype,e.prototype)}register(e){const n=Object.getPrototypeOf(e);let i;u2(n)&&(i=this.register(n));const r=this.items,s=e.id,a=this.scope+"."+s;if(!s)throw new Error("class does not have id: "+e);return s in r||(r[s]=e,l2(e,a,i),this.override&&Ft.override(e.id,e.overrides)),a}get(e){return this.items[e]}unregister(e){const n=this.items,i=e.id,r=this.scope;i in n&&delete n[i],r&&i in Ft[r]&&(delete Ft[r][i],this.override&&delete ws[i])}}function l2(t,e,n){const i=nl(Object.create(null),[n?Ft.get(n):{},Ft.get(e),t.defaults]);Ft.set(e,i),t.defaultRoutes&&c2(e,t.defaultRoutes),t.descriptors&&Ft.describe(e,t.descriptors)}function c2(t,e){Object.keys(e).forEach(n=>{const i=n.split("."),r=i.pop(),s=[t].concat(i).join("."),a=e[n].split("."),o=a.pop(),l=a.join(".");Ft.route(s,r,l,o)})}function u2(t){return"id"in t&&"defaults"in t}class d2{constructor(){this.controllers=new Kl(ko,"datasets",!0),this.elements=new Kl(Es,"elements"),this.plugins=new Kl(Object,"plugins"),this.scales=new Kl(xl,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...e){this._each("register",e)}remove(...e){this._each("unregister",e)}addControllers(...e){this._each("register",e,this.controllers)}addElements(...e){this._each("register",e,this.elements)}addPlugins(...e){this._each("register",e,this.plugins)}addScales(...e){this._each("register",e,this.scales)}getController(e){return this._get(e,this.controllers,"controller")}getElement(e){return this._get(e,this.elements,"element")}getPlugin(e){return this._get(e,this.plugins,"plugin")}getScale(e){return this._get(e,this.scales,"scale")}removeControllers(...e){this._each("unregister",e,this.controllers)}removeElements(...e){this._each("unregister",e,this.elements)}removePlugins(...e){this._each("unregister",e,this.plugins)}removeScales(...e){this._each("unregister",e,this.scales)}_each(e,n,i){[...n].forEach(r=>{const s=i||this._getRegistryForType(r);i||s.isForType(r)||s===this.plugins&&r.id?this._exec(e,s,r):dt(r,a=>{const o=i||this._getRegistryForType(a);this._exec(e,o,a)})})}_exec(e,n,i){const r=Bm(e);Nt(i["before"+r],[],i),n[e](i),Nt(i["after"+r],[],i)}_getRegistryForType(e){for(let n=0;n<this._typedRegistries.length;n++){const i=this._typedRegistries[n];if(i.isForType(e))return i}return this.plugins}_get(e,n,i){const r=n.get(e);if(r===void 0)throw new Error('"'+e+'" is not a registered '+i+".");return r}}var Mi=new d2;class f2{constructor(){this._init=void 0}notify(e,n,i,r){if(n==="beforeInit"&&(this._init=this._createDescriptors(e,!0),this._notify(this._init,e,"install")),this._init===void 0)return;const s=r?this._descriptors(e).filter(r):this._descriptors(e),a=this._notify(s,e,n,i);return n==="afterDestroy"&&(this._notify(s,e,"stop"),this._notify(this._init,e,"uninstall"),this._init=void 0),a}_notify(e,n,i,r){r=r||{};for(const s of e){const a=s.plugin,o=a[i],l=[n,r,s.options];if(Nt(o,l,a)===!1&&r.cancelable)return!1}return!0}invalidate(){St(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(e){if(this._cache)return this._cache;const n=this._cache=this._createDescriptors(e);return this._notifyStateChanges(e),n}_createDescriptors(e,n){const i=e&&e.config,r=mt(i.options&&i.options.plugins,{}),s=h2(i);return r===!1&&!n?[]:m2(e,s,r,n)}_notifyStateChanges(e){const n=this._oldCache||[],i=this._cache,r=(s,a)=>s.filter(o=>!a.some(l=>o.plugin.id===l.plugin.id));this._notify(r(n,i),e,"stop"),this._notify(r(i,n),e,"start")}}function h2(t){const e={},n=[],i=Object.keys(Mi.plugins.items);for(let s=0;s<i.length;s++)n.push(Mi.getPlugin(i[s]));const r=t.plugins||[];for(let s=0;s<r.length;s++){const a=r[s];n.indexOf(a)===-1&&(n.push(a),e[a.id]=!0)}return{plugins:n,localIds:e}}function p2(t,e){return!e&&t===!1?null:t===!0?{}:t}function m2(t,{plugins:e,localIds:n},i,r){const s=[],a=t.getContext();for(const o of e){const l=o.id,c=p2(i[l],r);c!==null&&s.push({plugin:o,options:g2(t.config,{plugin:o,local:n[l]},c,a)})}return s}function g2(t,{plugin:e,local:n},i,r){const s=t.pluginScopeKeys(e),a=t.getOptionScopes(i,s);return n&&e.defaults&&a.push(e.defaults),t.createResolver(a,r,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function Vh(t,e){const n=Ft.datasets[t]||{};return((e.datasets||{})[t]||{}).indexAxis||e.indexAxis||n.indexAxis||"x"}function x2(t,e){let n=t;return t==="_index_"?n=e:t==="_value_"&&(n=e==="x"?"y":"x"),n}function _2(t,e){return t===e?"_index_":"_value_"}function Cx(t){if(t==="x"||t==="y"||t==="r")return t}function v2(t){if(t==="top"||t==="bottom")return"x";if(t==="left"||t==="right")return"y"}function Gh(t,...e){if(Cx(t))return t;for(const n of e){const i=n.axis||v2(n.position)||t.length>1&&Cx(t[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`)}function Rx(t,e,n){if(n[e+"AxisID"]===t)return{axis:e}}function y2(t,e){if(e.data&&e.data.datasets){const n=e.data.datasets.filter(i=>i.xAxisID===t||i.yAxisID===t);if(n.length)return Rx(t,"x",n[0])||Rx(t,"y",n[0])}return{}}function b2(t,e){const n=ws[t.type]||{scales:{}},i=e.scales||{},r=Vh(t.type,e),s=Object.create(null);return Object.keys(i).forEach(a=>{const o=i[a];if(!et(o))return console.error(`Invalid scale configuration for scale: ${a}`);if(o._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${a}`);const l=Gh(a,o,y2(a,t),Ft.scales[o.type]),c=_2(l,r),u=n.scales||{};s[a]=Po(Object.create(null),[{axis:l},o,u[l],u[c]])}),t.data.datasets.forEach(a=>{const o=a.type||t.type,l=a.indexAxis||Vh(o,e),u=(ws[o]||{}).scales||{};Object.keys(u).forEach(f=>{const d=x2(f,l),p=a[d+"AxisID"]||d;s[p]=s[p]||Object.create(null),Po(s[p],[{axis:d},i[p],u[f]])})}),Object.keys(s).forEach(a=>{const o=s[a];Po(o,[Ft.scales[o.type],Ft.scale])}),s}function cS(t){const e=t.options||(t.options={});e.plugins=mt(e.plugins,{}),e.scales=b2(t,e)}function uS(t){return t=t||{},t.datasets=t.datasets||[],t.labels=t.labels||[],t}function S2(t){return t=t||{},t.data=uS(t.data),cS(t),t}const Px=new Map,dS=new Set;function Zl(t,e){let n=Px.get(t);return n||(n=e(),Px.set(t,n),dS.add(n)),n}const to=(t,e,n)=>{const i=il(e,n);i!==void 0&&t.add(i)};class M2{constructor(e){this._config=S2(e),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(e){this._config.type=e}get data(){return this._config.data}set data(e){this._config.data=uS(e)}get options(){return this._config.options}set options(e){this._config.options=e}get plugins(){return this._config.plugins}update(){const e=this._config;this.clearCache(),cS(e)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(e){return Zl(e,()=>[[`datasets.${e}`,""]])}datasetAnimationScopeKeys(e,n){return Zl(`${e}.transition.${n}`,()=>[[`datasets.${e}.transitions.${n}`,`transitions.${n}`],[`datasets.${e}`,""]])}datasetElementScopeKeys(e,n){return Zl(`${e}-${n}`,()=>[[`datasets.${e}.elements.${n}`,`datasets.${e}`,`elements.${n}`,""]])}pluginScopeKeys(e){const n=e.id,i=this.type;return Zl(`${i}-plugin-${n}`,()=>[[`plugins.${n}`,...e.additionalOptionScopes||[]]])}_cachedScopes(e,n){const i=this._scopeCache;let r=i.get(e);return(!r||n)&&(r=new Map,i.set(e,r)),r}getOptionScopes(e,n,i){const{options:r,type:s}=this,a=this._cachedScopes(e,i),o=a.get(n);if(o)return o;const l=new Set;n.forEach(u=>{e&&(l.add(e),u.forEach(f=>to(l,e,f))),u.forEach(f=>to(l,r,f)),u.forEach(f=>to(l,ws[s]||{},f)),u.forEach(f=>to(l,Ft,f)),u.forEach(f=>to(l,zh,f))});const c=Array.from(l);return c.length===0&&c.push(Object.create(null)),dS.has(n)&&a.set(n,c),c}chartOptionScopes(){const{options:e,type:n}=this;return[e,ws[n]||{},Ft.datasets[n]||{},{type:n},Ft,zh]}resolveNamedOptions(e,n,i,r=[""]){const s={$shared:!0},{resolver:a,subPrefixes:o}=Nx(this._resolverCache,e,r);let l=a;if(E2(a,n)){s.$shared=!1,i=Vr(i)?i():i;const c=this.createResolver(e,i,o);l=Da(a,i,c)}for(const c of n)s[c]=l[c];return s}createResolver(e,n,i=[""],r){const{resolver:s}=Nx(this._resolverCache,e,i);return et(n)?Da(s,n,void 0,r):s}}function Nx(t,e,n){let i=t.get(e);i||(i=new Map,t.set(e,i));const r=n.join();let s=i.get(r);return s||(s={resolver:Xm(e,n),subPrefixes:n.filter(o=>!o.toLowerCase().includes("hover"))},i.set(r,s)),s}const w2=t=>et(t)&&Object.getOwnPropertyNames(t).some(e=>Vr(t[e]));function E2(t,e){const{isScriptable:n,isIndexable:i}=$b(t);for(const r of e){const s=n(r),a=i(r),o=(a||s)&&t[r];if(s&&(Vr(o)||w2(o))||a&&Dt(o))return!0}return!1}var T2="4.5.1";const A2=["top","bottom","left","right","chartArea"];function Lx(t,e){return t==="top"||t==="bottom"||A2.indexOf(t)===-1&&e==="x"}function Dx(t,e){return function(n,i){return n[t]===i[t]?n[e]-i[e]:n[t]-i[t]}}function Ix(t){const e=t.chart,n=e.options.animation;e.notifyPlugins("afterRender"),Nt(n&&n.onComplete,[t],e)}function C2(t){const e=t.chart,n=e.options.animation;Nt(n&&n.onProgress,[t],e)}function fS(t){return qm()&&typeof t=="string"?t=document.getElementById(t):t&&t.length&&(t=t[0]),t&&t.canvas&&(t=t.canvas),t}const Vc={},kx=t=>{const e=fS(t);return Object.values(Vc).filter(n=>n.canvas===e).pop()};function R2(t,e,n){const i=Object.keys(t);for(const r of i){const s=+r;if(s>=e){const a=t[r];delete t[r],(n>0||s>e)&&(t[s+n]=a)}}}function P2(t,e,n,i){return!n||t.type==="mouseout"?null:i?e:t}class $i{static register(...e){Mi.add(...e),Fx()}static unregister(...e){Mi.remove(...e),Fx()}constructor(e,n){const i=this.config=new M2(n),r=fS(e),s=kx(r);if(s)throw new Error("Canvas is already in use. Chart with ID '"+s.id+"' must be destroyed before the canvas with ID '"+s.canvas.id+"' can be reused.");const a=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||YA(r)),this.platform.updateConfig(i);const o=this.platform.acquireContext(r,a.aspectRatio),l=o&&o.canvas,c=l&&l.height,u=l&&l.width;if(this.id=IE(),this.ctx=o,this.canvas=l,this.width=u,this.height=c,this._options=a,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new f2,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=eT(f=>this.update(f),a.resizeDelay||0),this._dataChanges=[],Vc[this.id]=this,!o||!l){console.error("Failed to create chart: can't acquire context from the given item");return}Vi.listen(this,"complete",Ix),Vi.listen(this,"progress",C2),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:e,maintainAspectRatio:n},width:i,height:r,_aspectRatio:s}=this;return St(e)?n&&s?s:r?i/r:null:e}get data(){return this.config.data}set data(e){this.config.data=e}get options(){return this._options}set options(e){this.config.options=e}get registry(){return Mi}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():ox(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return rx(this.canvas,this.ctx),this}stop(){return Vi.stop(this),this}resize(e,n){Vi.running(this)?this._resizeBeforeDraw={width:e,height:n}:this._resize(e,n)}_resize(e,n){const i=this.options,r=this.canvas,s=i.maintainAspectRatio&&this.aspectRatio,a=this.platform.getMaximumSize(r,e,n,s),o=i.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=a.width,this.height=a.height,this._aspectRatio=this.aspectRatio,ox(this,o,!0)&&(this.notifyPlugins("resize",{size:a}),Nt(i.onResize,[this,a],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){const n=this.options.scales||{};dt(n,(i,r)=>{i.id=r})}buildOrUpdateScales(){const e=this.options,n=e.scales,i=this.scales,r=Object.keys(i).reduce((a,o)=>(a[o]=!1,a),{});let s=[];n&&(s=s.concat(Object.keys(n).map(a=>{const o=n[a],l=Gh(a,o),c=l==="r",u=l==="x";return{options:o,dposition:c?"chartArea":u?"bottom":"left",dtype:c?"radialLinear":u?"category":"linear"}}))),dt(s,a=>{const o=a.options,l=o.id,c=Gh(l,o),u=mt(o.type,a.dtype);(o.position===void 0||Lx(o.position,c)!==Lx(a.dposition))&&(o.position=a.dposition),r[l]=!0;let f=null;if(l in i&&i[l].type===u)f=i[l];else{const d=Mi.getScale(u);f=new d({id:l,type:u,ctx:this.ctx,chart:this}),i[f.id]=f}f.init(o,e)}),dt(r,(a,o)=>{a||delete i[o]}),dt(i,a=>{Yl.configure(this,a,a.options),Yl.addBox(this,a)})}_updateMetasets(){const e=this._metasets,n=this.data.datasets.length,i=e.length;if(e.sort((r,s)=>r.index-s.index),i>n){for(let r=n;r<i;++r)this._destroyDatasetMeta(r);e.splice(n,i-n)}this._sortedMetasets=e.slice(0).sort(Dx("order","index"))}_removeUnreferencedMetasets(){const{_metasets:e,data:{datasets:n}}=this;e.length>n.length&&delete this._stacks,e.forEach((i,r)=>{n.filter(s=>s===i._dataset).length===0&&this._destroyDatasetMeta(r)})}buildOrUpdateControllers(){const e=[],n=this.data.datasets;let i,r;for(this._removeUnreferencedMetasets(),i=0,r=n.length;i<r;i++){const s=n[i];let a=this.getDatasetMeta(i);const o=s.type||this.config.type;if(a.type&&a.type!==o&&(this._destroyDatasetMeta(i),a=this.getDatasetMeta(i)),a.type=o,a.indexAxis=s.indexAxis||Vh(o,this.options),a.order=s.order||0,a.index=i,a.label=""+s.label,a.visible=this.isDatasetVisible(i),a.controller)a.controller.updateIndex(i),a.controller.linkScales();else{const l=Mi.getController(o),{datasetElementType:c,dataElementType:u}=Ft.datasets[o];Object.assign(l,{dataElementType:Mi.getElement(u),datasetElementType:c&&Mi.getElement(c)}),a.controller=new l(this,i),e.push(a.controller)}}return this._updateMetasets(),e}_resetElements(){dt(this.data.datasets,(e,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(e){const n=this.config;n.update();const i=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),r=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:e,cancelable:!0})===!1)return;const s=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let a=0;for(let c=0,u=this.data.datasets.length;c<u;c++){const{controller:f}=this.getDatasetMeta(c),d=!r&&s.indexOf(f)===-1;f.buildOrUpdateElements(d),a=Math.max(+f.getMaxOverflow(),a)}a=this._minPadding=i.layout.autoPadding?a:0,this._updateLayout(a),r||dt(s,c=>{c.reset()}),this._updateDatasets(e),this.notifyPlugins("afterUpdate",{mode:e}),this._layers.sort(Dx("z","_idx"));const{_active:o,_lastEvent:l}=this;l?this._eventHandler(l,!0):o.length&&this._updateHoverStyles(o,o,!0),this.render()}_updateScales(){dt(this.scales,e=>{Yl.removeBox(this,e)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const e=this.options,n=new Set(Object.keys(this._listeners)),i=new Set(e.events);(!Y0(n,i)||!!this._responsiveListeners!==e.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:e}=this,n=this._getUniformDataChanges()||[];for(const{method:i,start:r,count:s}of n){const a=i==="_removeElements"?-s:s;R2(e,r,a)}}_getUniformDataChanges(){const e=this._dataChanges;if(!e||!e.length)return;this._dataChanges=[];const n=this.data.datasets.length,i=s=>new Set(e.filter(a=>a[0]===s).map((a,o)=>o+","+a.splice(1).join(","))),r=i(0);for(let s=1;s<n;s++)if(!Y0(r,i(s)))return;return Array.from(r).map(s=>s.split(",")).map(s=>({method:s[1],start:+s[2],count:+s[3]}))}_updateLayout(e){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;Yl.update(this,this.width,this.height,e);const n=this.chartArea,i=n.width<=0||n.height<=0;this._layers=[],dt(this.boxes,r=>{i&&r.position==="chartArea"||(r.configure&&r.configure(),this._layers.push(...r._layers()))},this),this._layers.forEach((r,s)=>{r._idx=s}),this.notifyPlugins("afterLayout")}_updateDatasets(e){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:e,cancelable:!0})!==!1){for(let n=0,i=this.data.datasets.length;n<i;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,i=this.data.datasets.length;n<i;++n)this._updateDataset(n,Vr(e)?e({datasetIndex:n}):e);this.notifyPlugins("afterDatasetsUpdate",{mode:e})}}_updateDataset(e,n){const i=this.getDatasetMeta(e),r={meta:i,index:e,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",r)!==!1&&(i.controller._update(n),r.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",r))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(Vi.has(this)?this.attached&&!Vi.running(this)&&Vi.start(this):(this.draw(),Ix({chart:this})))}draw(){let e;if(this._resizeBeforeDraw){const{width:i,height:r}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,r)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const n=this._layers;for(e=0;e<n.length&&n[e].z<=0;++e)n[e].draw(this.chartArea);for(this._drawDatasets();e<n.length;++e)n[e].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(e){const n=this._sortedMetasets,i=[];let r,s;for(r=0,s=n.length;r<s;++r){const a=n[r];(!e||a.visible)&&i.push(a)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const e=this.getSortedVisibleDatasetMetas();for(let n=e.length-1;n>=0;--n)this._drawDataset(e[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(e){const n=this.ctx,i={meta:e,index:e.index,cancelable:!0},r=tS(this,e);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(r&&Wm(n,r),e.controller.draw(),r&&jm(n),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(e){return Zi(e,this.chartArea,this._minPadding)}getElementsAtEventForMode(e,n,i,r){const s=AA.modes[n];return typeof s=="function"?s(this,e,i,r):[]}getDatasetMeta(e){const n=this.data.datasets[e],i=this._metasets;let r=i.filter(s=>s&&s._dataset===n).pop();return r||(r={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:e,_dataset:n,_parsed:[],_sorted:!1},i.push(r)),r}getContext(){return this.$context||(this.$context=$r(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(e){const n=this.data.datasets[e];if(!n)return!1;const i=this.getDatasetMeta(e);return typeof i.hidden=="boolean"?!i.hidden:!n.hidden}setDatasetVisibility(e,n){const i=this.getDatasetMeta(e);i.hidden=!n}toggleDataVisibility(e){this._hiddenIndices[e]=!this._hiddenIndices[e]}getDataVisibility(e){return!this._hiddenIndices[e]}_updateVisibility(e,n,i){const r=i?"show":"hide",s=this.getDatasetMeta(e),a=s.controller._resolveAnimations(void 0,r);Tu(n)?(s.data[n].hidden=!i,this.update()):(this.setDatasetVisibility(e,i),a.update(s,{visible:i}),this.update(o=>o.datasetIndex===e?r:void 0))}hide(e,n){this._updateVisibility(e,n,!1)}show(e,n){this._updateVisibility(e,n,!0)}_destroyDatasetMeta(e){const n=this._metasets[e];n&&n.controller&&n.controller._destroy(),delete this._metasets[e]}_stop(){let e,n;for(this.stop(),Vi.remove(this),e=0,n=this.data.datasets.length;e<n;++e)this._destroyDatasetMeta(e)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:e,ctx:n}=this;this._stop(),this.config.clearCache(),e&&(this.unbindEvents(),rx(e,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete Vc[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...e){return this.canvas.toDataURL(...e)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const e=this._listeners,n=this.platform,i=(s,a)=>{n.addEventListener(this,s,a),e[s]=a},r=(s,a,o)=>{s.offsetX=a,s.offsetY=o,this._eventHandler(s)};dt(this.options.events,s=>i(s,r))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const e=this._responsiveListeners,n=this.platform,i=(l,c)=>{n.addEventListener(this,l,c),e[l]=c},r=(l,c)=>{e[l]&&(n.removeEventListener(this,l,c),delete e[l])},s=(l,c)=>{this.canvas&&this.resize(l,c)};let a;const o=()=>{r("attach",o),this.attached=!0,this.resize(),i("resize",s),i("detach",a)};a=()=>{this.attached=!1,r("resize",s),this._stop(),this._resize(0,0),i("attach",o)},n.isAttached(this.canvas)?o():a()}unbindEvents(){dt(this._listeners,(e,n)=>{this.platform.removeEventListener(this,n,e)}),this._listeners={},dt(this._responsiveListeners,(e,n)=>{this.platform.removeEventListener(this,n,e)}),this._responsiveListeners=void 0}updateHoverStyle(e,n,i){const r=i?"set":"remove";let s,a,o,l;for(n==="dataset"&&(s=this.getDatasetMeta(e[0].datasetIndex),s.controller["_"+r+"DatasetHoverStyle"]()),o=0,l=e.length;o<l;++o){a=e[o];const c=a&&this.getDatasetMeta(a.datasetIndex).controller;c&&c[r+"HoverStyle"](a.element,a.datasetIndex,a.index)}}getActiveElements(){return this._active||[]}setActiveElements(e){const n=this._active||[],i=e.map(({datasetIndex:s,index:a})=>{const o=this.getDatasetMeta(s);if(!o)throw new Error("No dataset found at index "+s);return{datasetIndex:s,element:o.data[a],index:a}});!wu(i,n)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,n))}notifyPlugins(e,n,i){return this._plugins.notify(this,e,n,i)}isPluginEnabled(e){return this._plugins._cache.filter(n=>n.plugin.id===e).length===1}_updateHoverStyles(e,n,i){const r=this.options.hover,s=(l,c)=>l.filter(u=>!c.some(f=>u.datasetIndex===f.datasetIndex&&u.index===f.index)),a=s(n,e),o=i?e:s(e,n);a.length&&this.updateHoverStyle(a,r.mode,!1),o.length&&r.mode&&this.updateHoverStyle(o,r.mode,!0)}_eventHandler(e,n){const i={event:e,replay:n,cancelable:!0,inChartArea:this.isPointInArea(e)},r=a=>(a.options.events||this.options.events).includes(e.native.type);if(this.notifyPlugins("beforeEvent",i,r)===!1)return;const s=this._handleEvent(e,n,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,r),(s||i.changed)&&this.render(),this}_handleEvent(e,n,i){const{_active:r=[],options:s}=this,a=n,o=this._getActiveElements(e,r,i,a),l=BE(e),c=P2(e,this._lastEvent,i,l);i&&(this._lastEvent=null,Nt(s.onHover,[e,o,this],this),l&&Nt(s.onClick,[e,o,this],this));const u=!wu(o,r);return(u||n)&&(this._active=o,this._updateHoverStyles(o,r,n)),this._lastEvent=c,u}_getActiveElements(e,n,i,r){if(e.type==="mouseout")return[];if(!i)return n;const s=this.options.hover;return this.getElementsAtEventForMode(e,s.mode,s,r)}}Xe($i,"defaults",Ft),Xe($i,"instances",Vc),Xe($i,"overrides",ws),Xe($i,"registry",Mi),Xe($i,"version",T2),Xe($i,"getChart",kx);function Fx(){return dt($i.instances,t=>t._plugins.invalidate())}function hS(t,e,n=e){t.lineCap=mt(n.borderCapStyle,e.borderCapStyle),t.setLineDash(mt(n.borderDash,e.borderDash)),t.lineDashOffset=mt(n.borderDashOffset,e.borderDashOffset),t.lineJoin=mt(n.borderJoinStyle,e.borderJoinStyle),t.lineWidth=mt(n.borderWidth,e.borderWidth),t.strokeStyle=mt(n.borderColor,e.borderColor)}function N2(t,e,n){t.lineTo(n.x,n.y)}function L2(t){return t.stepped?pT:t.tension||t.cubicInterpolationMode==="monotone"?mT:N2}function pS(t,e,n={}){const i=t.length,{start:r=0,end:s=i-1}=n,{start:a,end:o}=e,l=Math.max(r,a),c=Math.min(s,o),u=r<a&&s<a||r>o&&s>o;return{count:i,start:l,loop:e.loop,ilen:c<l&&!u?i+c-l:c-l}}function D2(t,e,n,i){const{points:r,options:s}=e,{count:a,start:o,loop:l,ilen:c}=pS(r,n,i),u=L2(s);let{move:f=!0,reverse:d}=i||{},p,x,y;for(p=0;p<=c;++p)x=r[(o+(d?c-p:p))%a],!x.skip&&(f?(t.moveTo(x.x,x.y),f=!1):u(t,y,x,d,s.stepped),y=x);return l&&(x=r[(o+(d?c:0))%a],u(t,y,x,d,s.stepped)),!!l}function I2(t,e,n,i){const r=e.points,{count:s,start:a,ilen:o}=pS(r,n,i),{move:l=!0,reverse:c}=i||{};let u=0,f=0,d,p,x,y,m,h;const _=b=>(a+(c?o-b:b))%s,M=()=>{y!==m&&(t.lineTo(u,m),t.lineTo(u,y),t.lineTo(u,h))};for(l&&(p=r[_(0)],t.moveTo(p.x,p.y)),d=0;d<=o;++d){if(p=r[_(d)],p.skip)continue;const b=p.x,S=p.y,E=b|0;E===x?(S<y?y=S:S>m&&(m=S),u=(f*u+b)/++f):(M(),t.lineTo(b,S),x=E,f=0,y=m=S),h=S}M()}function Wh(t){const e=t.options,n=e.borderDash&&e.borderDash.length;return!t._decimated&&!t._loop&&!e.tension&&e.cubicInterpolationMode!=="monotone"&&!e.stepped&&!n?I2:D2}function k2(t){return t.stepped?qT:t.tension||t.cubicInterpolationMode==="monotone"?KT:os}function F2(t,e,n,i){let r=e._path;r||(r=e._path=new Path2D,e.path(r,n,i)&&r.closePath()),hS(t,e.options),t.stroke(r)}function U2(t,e,n,i){const{segments:r,options:s}=e,a=Wh(e);for(const o of r)hS(t,s,o.style),t.beginPath(),a(t,e,o,{start:n,end:n+i-1})&&t.closePath(),t.stroke()}const O2=typeof Path2D=="function";function z2(t,e,n,i){O2&&!e.options.segment?F2(t,e,n,i):U2(t,e,n,i)}class Rr extends Es{constructor(e){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,e&&Object.assign(this,e)}updateControlPoints(e,n){const i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){const r=i.spanGaps?this._loop:this._fullLoop;HT(this._points,i,e,r,n),this._pointsUpdated=!0}}set points(e){this._points=e,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=rA(this,this.options.segment))}first(){const e=this.segments,n=this.points;return e.length&&n[e[0].start]}last(){const e=this.segments,n=this.points,i=e.length;return i&&n[e[i-1].end]}interpolate(e,n){const i=this.options,r=e[n],s=this.points,a=eS(this,{property:n,start:r,end:r});if(!a.length)return;const o=[],l=k2(i);let c,u;for(c=0,u=a.length;c<u;++c){const{start:f,end:d}=a[c],p=s[f],x=s[d];if(p===x){o.push(p);continue}const y=Math.abs((r-p[n])/(x[n]-p[n])),m=l(p,x,y,i.stepped);m[n]=e[n],o.push(m)}return o.length===1?o[0]:o}pathSegment(e,n,i){return Wh(this)(e,this,n,i)}path(e,n,i){const r=this.segments,s=Wh(this);let a=this._loop;n=n||0,i=i||this.points.length-n;for(const o of r)a&=s(e,this,o,{start:n,end:n+i-1});return!!a}draw(e,n,i,r){const s=this.options||{};(this.points||[]).length&&s.borderWidth&&(e.save(),z2(e,this,i,r),e.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}Xe(Rr,"id","line"),Xe(Rr,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),Xe(Rr,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),Xe(Rr,"descriptors",{_scriptable:!0,_indexable:e=>e!=="borderDash"&&e!=="fill"});function Ux(t,e,n,i){const r=t.options,{[n]:s}=t.getProps([n],i);return Math.abs(e-s)<r.radius+r.hitRadius}class Gc extends Es{constructor(n){super();Xe(this,"parsed");Xe(this,"skip");Xe(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,n&&Object.assign(this,n)}inRange(n,i,r){const s=this.options,{x:a,y:o}=this.getProps(["x","y"],r);return Math.pow(n-a,2)+Math.pow(i-o,2)<Math.pow(s.hitRadius+s.radius,2)}inXRange(n,i){return Ux(this,n,"x",i)}inYRange(n,i){return Ux(this,n,"y",i)}getCenterPoint(n){const{x:i,y:r}=this.getProps(["x","y"],n);return{x:i,y:r}}size(n){n=n||this.options||{};let i=n.radius||0;i=Math.max(i,i&&n.hoverRadius||0);const r=i&&n.borderWidth||0;return(i+r)*2}draw(n,i){const r=this.options;this.skip||r.radius<.1||!Zi(this,i,this.size(r)/2)||(n.strokeStyle=r.borderColor,n.lineWidth=r.borderWidth,n.fillStyle=r.backgroundColor,Bh(n,r,this.x,this.y))}getRange(){const n=this.options||{};return n.radius+n.hitRadius}}Xe(Gc,"id","point"),Xe(Gc,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),Xe(Gc,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function B2(t,e,n){const i=t.segments,r=t.points,s=e.points,a=[];for(const o of i){let{start:l,end:c}=o;c=od(l,c,r);const u=jh(n,r[l],r[c],o.loop);if(!e.segments){a.push({source:o,target:u,start:r[l],end:r[c]});continue}const f=eS(e,u);for(const d of f){const p=jh(n,s[d.start],s[d.end],d.loop),x=Jb(o,r,p);for(const y of x)a.push({source:y,target:d,start:{[n]:Ox(u,p,"start",Math.max)},end:{[n]:Ox(u,p,"end",Math.min)}})}}return a}function jh(t,e,n,i){if(i)return;let r=e[t],s=n[t];return t==="angle"&&(r=Ln(r),s=Ln(s)),{property:t,start:r,end:s}}function H2(t,e){const{x:n=null,y:i=null}=t||{},r=e.points,s=[];return e.segments.forEach(({start:a,end:o})=>{o=od(a,o,r);const l=r[a],c=r[o];i!==null?(s.push({x:l.x,y:i}),s.push({x:c.x,y:i})):n!==null&&(s.push({x:n,y:l.y}),s.push({x:n,y:c.y}))}),s}function od(t,e,n){for(;e>t;e--){const i=n[e];if(!isNaN(i.x)&&!isNaN(i.y))break}return e}function Ox(t,e,n,i){return t&&e?i(t[n],e[n]):t?t[n]:e?e[n]:0}function mS(t,e){let n=[],i=!1;return Dt(t)?(i=!0,n=t):n=H2(t,e),n.length?new Rr({points:n,options:{tension:0},_loop:i,_fullLoop:i}):null}function zx(t){return t&&t.fill!==!1}function V2(t,e,n){let r=t[e].fill;const s=[e];let a;if(!n)return r;for(;r!==!1&&s.indexOf(r)===-1;){if(!hn(r))return r;if(a=t[r],!a)return!1;if(a.visible)return r;s.push(r),r=a.fill}return!1}function G2(t,e,n){const i=$2(t);if(et(i))return isNaN(i.value)?!1:i;let r=parseFloat(i);return hn(r)&&Math.floor(r)===r?W2(i[0],e,r,n):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function W2(t,e,n,i){return(t==="-"||t==="+")&&(n=e+n),n===e||n<0||n>=i?!1:n}function j2(t,e){let n=null;return t==="start"?n=e.bottom:t==="end"?n=e.top:et(t)?n=e.getPixelForValue(t.value):e.getBasePixel&&(n=e.getBasePixel()),n}function X2(t,e,n){let i;return t==="start"?i=n:t==="end"?i=e.options.reverse?e.min:e.max:et(t)?i=t.value:i=e.getBaseValue(),i}function $2(t){const e=t.options,n=e.fill;let i=mt(n&&n.target,n);return i===void 0&&(i=!!e.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function Y2(t){const{scale:e,index:n,line:i}=t,r=[],s=i.segments,a=i.points,o=q2(e,n);o.push(mS({x:null,y:e.bottom},i));for(let l=0;l<s.length;l++){const c=s[l];for(let u=c.start;u<=c.end;u++)K2(r,a[u],o)}return new Rr({points:r,options:{}})}function q2(t,e){const n=[],i=t.getMatchingVisibleMetas("line");for(let r=0;r<i.length;r++){const s=i[r];if(s.index===e)break;s.hidden||n.unshift(s.dataset)}return n}function K2(t,e,n){const i=[];for(let r=0;r<n.length;r++){const s=n[r],{first:a,last:o,point:l}=Z2(s,e,"x");if(!(!l||a&&o)){if(a)i.unshift(l);else if(t.push(l),!o)break}}t.push(...i)}function Z2(t,e,n){const i=t.interpolate(e,n);if(!i)return{};const r=i[n],s=t.segments,a=t.points;let o=!1,l=!1;for(let c=0;c<s.length;c++){const u=s[c],f=a[u.start][n],d=a[u.end][n];if(Bb(r,f,d)){o=r===f,l=r===d;break}}return{first:o,last:l,point:i}}class gS{constructor(e){this.x=e.x,this.y=e.y,this.radius=e.radius}pathSegment(e,n,i){const{x:r,y:s,radius:a}=this;return n=n||{start:0,end:Kn},e.arc(r,s,a,n.end,n.start,!0),!i.bounds}interpolate(e){const{x:n,y:i,radius:r}=this,s=e.angle;return{x:n+Math.cos(s)*r,y:i+Math.sin(s)*r,angle:s}}}function Q2(t){const{chart:e,fill:n,line:i}=t;if(hn(n))return J2(e,n);if(n==="stack")return Y2(t);if(n==="shape")return!0;const r=eC(t);return r instanceof gS?r:mS(r,i)}function J2(t,e){const n=t.getDatasetMeta(e);return n&&t.isDatasetVisible(e)?n.dataset:null}function eC(t){return(t.scale||{}).getPointPositionForValue?nC(t):tC(t)}function tC(t){const{scale:e={},fill:n}=t,i=j2(n,e);if(hn(i)){const r=e.isHorizontal();return{x:r?i:null,y:r?null:i}}return null}function nC(t){const{scale:e,fill:n}=t,i=e.options,r=e.getLabels().length,s=i.reverse?e.max:e.min,a=X2(n,e,s),o=[];if(i.grid.circular){const l=e.getPointPositionForValue(0,s);return new gS({x:l.x,y:l.y,radius:e.getDistanceFromCenterForValue(a)})}for(let l=0;l<r;++l)o.push(e.getPointPositionForValue(l,a));return o}function tf(t,e,n){const i=Q2(e),{chart:r,index:s,line:a,scale:o,axis:l}=e,c=a.options,u=c.fill,f=c.backgroundColor,{above:d=f,below:p=f}=u||{},x=r.getDatasetMeta(s),y=tS(r,x);i&&a.points.length&&(Wm(t,n),iC(t,{line:a,target:i,above:d,below:p,area:n,scale:o,axis:l,clip:y}),jm(t))}function iC(t,e){const{line:n,target:i,above:r,below:s,area:a,scale:o,clip:l}=e,c=n._loop?"angle":e.axis;t.save();let u=s;s!==r&&(c==="x"?(Bx(t,i,a.top),nf(t,{line:n,target:i,color:r,scale:o,property:c,clip:l}),t.restore(),t.save(),Bx(t,i,a.bottom)):c==="y"&&(Hx(t,i,a.left),nf(t,{line:n,target:i,color:s,scale:o,property:c,clip:l}),t.restore(),t.save(),Hx(t,i,a.right),u=r)),nf(t,{line:n,target:i,color:u,scale:o,property:c,clip:l}),t.restore()}function Bx(t,e,n){const{segments:i,points:r}=e;let s=!0,a=!1;t.beginPath();for(const o of i){const{start:l,end:c}=o,u=r[l],f=r[od(l,c,r)];s?(t.moveTo(u.x,u.y),s=!1):(t.lineTo(u.x,n),t.lineTo(u.x,u.y)),a=!!e.pathSegment(t,o,{move:a}),a?t.closePath():t.lineTo(f.x,n)}t.lineTo(e.first().x,n),t.closePath(),t.clip()}function Hx(t,e,n){const{segments:i,points:r}=e;let s=!0,a=!1;t.beginPath();for(const o of i){const{start:l,end:c}=o,u=r[l],f=r[od(l,c,r)];s?(t.moveTo(u.x,u.y),s=!1):(t.lineTo(n,u.y),t.lineTo(u.x,u.y)),a=!!e.pathSegment(t,o,{move:a}),a?t.closePath():t.lineTo(n,f.y)}t.lineTo(n,e.first().y),t.closePath(),t.clip()}function nf(t,e){const{line:n,target:i,property:r,color:s,scale:a,clip:o}=e,l=B2(n,i,r);for(const{source:c,target:u,start:f,end:d}of l){const{style:{backgroundColor:p=s}={}}=c,x=i!==!0;t.save(),t.fillStyle=p,rC(t,a,o,x&&jh(r,f,d)),t.beginPath();const y=!!n.pathSegment(t,c);let m;if(x){y?t.closePath():Vx(t,i,d,r);const h=!!i.pathSegment(t,u,{move:y,reverse:!0});m=y&&h,m||Vx(t,i,f,r)}t.closePath(),t.fill(m?"evenodd":"nonzero"),t.restore()}}function rC(t,e,n,i){const r=e.chart.chartArea,{property:s,start:a,end:o}=i||{};if(s==="x"||s==="y"){let l,c,u,f;s==="x"?(l=a,c=r.top,u=o,f=r.bottom):(l=r.left,c=a,u=r.right,f=o),t.beginPath(),n&&(l=Math.max(l,n.left),u=Math.min(u,n.right),c=Math.max(c,n.top),f=Math.min(f,n.bottom)),t.rect(l,c,u-l,f-c),t.clip()}}function Vx(t,e,n,i){const r=e.interpolate(n,i);r&&t.lineTo(r.x,r.y)}var sC={id:"filler",afterDatasetsUpdate(t,e,n){const i=(t.data.datasets||[]).length,r=[];let s,a,o,l;for(a=0;a<i;++a)s=t.getDatasetMeta(a),o=s.dataset,l=null,o&&o.options&&o instanceof Rr&&(l={visible:t.isDatasetVisible(a),index:a,fill:G2(o,a,i),chart:t,axis:s.controller.options.indexAxis,scale:s.vScale,line:o}),s.$filler=l,r.push(l);for(a=0;a<i;++a)l=r[a],!(!l||l.fill===!1)&&(l.fill=V2(r,a,n.propagate))},beforeDraw(t,e,n){const i=n.drawTime==="beforeDraw",r=t.getSortedVisibleDatasetMetas(),s=t.chartArea;for(let a=r.length-1;a>=0;--a){const o=r[a].$filler;o&&(o.line.updateControlPoints(s,o.axis),i&&o.fill&&tf(t.ctx,o,s))}},beforeDatasetsDraw(t,e,n){if(n.drawTime!=="beforeDatasetsDraw")return;const i=t.getSortedVisibleDatasetMetas();for(let r=i.length-1;r>=0;--r){const s=i[r].$filler;zx(s)&&tf(t.ctx,s,t.chartArea)}},beforeDatasetDraw(t,e,n){const i=e.meta.$filler;!zx(i)||n.drawTime!=="beforeDatasetDraw"||tf(t.ctx,i,t.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const go={average(t){if(!t.length)return!1;let e,n,i=new Set,r=0,s=0;for(e=0,n=t.length;e<n;++e){const o=t[e].element;if(o&&o.hasValue()){const l=o.tooltipPosition();i.add(l.x),r+=l.y,++s}}return s===0||i.size===0?!1:{x:[...i].reduce((o,l)=>o+l)/i.size,y:r/s}},nearest(t,e){if(!t.length)return!1;let n=e.x,i=e.y,r=Number.POSITIVE_INFINITY,s,a,o;for(s=0,a=t.length;s<a;++s){const l=t[s].element;if(l&&l.hasValue()){const c=l.getCenterPoint(),u=Uh(e,c);u<r&&(r=u,o=l)}}if(o){const l=o.tooltipPosition();n=l.x,i=l.y}return{x:n,y:i}}};function bi(t,e){return e&&(Dt(e)?Array.prototype.push.apply(t,e):t.push(e)),t}function Gi(t){return(typeof t=="string"||t instanceof String)&&t.indexOf(`
`)>-1?t.split(`
`):t}function aC(t,e){const{element:n,datasetIndex:i,index:r}=e,s=t.getDatasetMeta(i).controller,{label:a,value:o}=s.getLabelAndValue(r);return{chart:t,label:a,parsed:s.getParsed(r),raw:t.data.datasets[i].data[r],formattedValue:o,dataset:s.getDataset(),dataIndex:r,datasetIndex:i,element:n}}function Gx(t,e){const n=t.chart.ctx,{body:i,footer:r,title:s}=t,{boxWidth:a,boxHeight:o}=e,l=Fn(e.bodyFont),c=Fn(e.titleFont),u=Fn(e.footerFont),f=s.length,d=r.length,p=i.length,x=Jn(e.padding);let y=x.height,m=0,h=i.reduce((b,S)=>b+S.before.length+S.lines.length+S.after.length,0);if(h+=t.beforeBody.length+t.afterBody.length,f&&(y+=f*c.lineHeight+(f-1)*e.titleSpacing+e.titleMarginBottom),h){const b=e.displayColors?Math.max(o,l.lineHeight):l.lineHeight;y+=p*b+(h-p)*l.lineHeight+(h-1)*e.bodySpacing}d&&(y+=e.footerMarginTop+d*u.lineHeight+(d-1)*e.footerSpacing);let _=0;const M=function(b){m=Math.max(m,n.measureText(b).width+_)};return n.save(),n.font=c.string,dt(t.title,M),n.font=l.string,dt(t.beforeBody.concat(t.afterBody),M),_=e.displayColors?a+2+e.boxPadding:0,dt(i,b=>{dt(b.before,M),dt(b.lines,M),dt(b.after,M)}),_=0,n.font=u.string,dt(t.footer,M),n.restore(),m+=x.width,{width:m,height:y}}function oC(t,e){const{y:n,height:i}=e;return n<i/2?"top":n>t.height-i/2?"bottom":"center"}function lC(t,e,n,i){const{x:r,width:s}=i,a=n.caretSize+n.caretPadding;if(t==="left"&&r+s+a>e.width||t==="right"&&r-s-a<0)return!0}function cC(t,e,n,i){const{x:r,width:s}=n,{width:a,chartArea:{left:o,right:l}}=t;let c="center";return i==="center"?c=r<=(o+l)/2?"left":"right":r<=s/2?c="left":r>=a-s/2&&(c="right"),lC(c,t,e,n)&&(c="center"),c}function Wx(t,e,n){const i=n.yAlign||e.yAlign||oC(t,n);return{xAlign:n.xAlign||e.xAlign||cC(t,e,n,i),yAlign:i}}function uC(t,e){let{x:n,width:i}=t;return e==="right"?n-=i:e==="center"&&(n-=i/2),n}function dC(t,e,n){let{y:i,height:r}=t;return e==="top"?i+=n:e==="bottom"?i-=r+n:i-=r/2,i}function jx(t,e,n,i){const{caretSize:r,caretPadding:s,cornerRadius:a}=t,{xAlign:o,yAlign:l}=n,c=r+s,{topLeft:u,topRight:f,bottomLeft:d,bottomRight:p}=Io(a);let x=uC(e,o);const y=dC(e,l,c);return l==="center"?o==="left"?x+=c:o==="right"&&(x-=c):o==="left"?x-=Math.max(u,d)+r:o==="right"&&(x+=Math.max(f,p)+r),{x:Ki(x,0,i.width-e.width),y:Ki(y,0,i.height-e.height)}}function Ql(t,e,n){const i=Jn(n.padding);return e==="center"?t.x+t.width/2:e==="right"?t.x+t.width-i.right:t.x+i.left}function Xx(t){return bi([],Gi(t))}function fC(t,e,n){return $r(t,{tooltip:e,tooltipItems:n,type:"tooltip"})}function $x(t,e){const n=e&&e.dataset&&e.dataset.tooltip&&e.dataset.tooltip.callbacks;return n?t.override(n):t}const xS={beforeTitle:Fi,title(t){if(t.length>0){const e=t[0],n=e.chart.data.labels,i=n?n.length:0;if(this&&this.options&&this.options.mode==="dataset")return e.dataset.label||"";if(e.label)return e.label;if(i>0&&e.dataIndex<i)return n[e.dataIndex]}return""},afterTitle:Fi,beforeBody:Fi,beforeLabel:Fi,label(t){if(this&&this.options&&this.options.mode==="dataset")return t.label+": "+t.formattedValue||t.formattedValue;let e=t.dataset.label||"";e&&(e+=": ");const n=t.formattedValue;return St(n)||(e+=n),e},labelColor(t){const n=t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);return{borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderWidth:n.borderWidth,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(t){const n=t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);return{pointStyle:n.pointStyle,rotation:n.rotation}},afterLabel:Fi,afterBody:Fi,beforeFooter:Fi,footer:Fi,afterFooter:Fi};function yn(t,e,n,i){const r=t[e].call(n,i);return typeof r>"u"?xS[e].call(n,i):r}class Xh extends Es{constructor(e){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=e.chart,this.options=e.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(e){this.options=e,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const e=this._cachedAnimations;if(e)return e;const n=this.chart,i=this.options.setContext(this.getContext()),r=i.enabled&&n.options.animation&&i.animations,s=new nS(this.chart,r);return r._cacheable&&(this._cachedAnimations=Object.freeze(s)),s}getContext(){return this.$context||(this.$context=fC(this.chart.getContext(),this,this._tooltipItems))}getTitle(e,n){const{callbacks:i}=n,r=yn(i,"beforeTitle",this,e),s=yn(i,"title",this,e),a=yn(i,"afterTitle",this,e);let o=[];return o=bi(o,Gi(r)),o=bi(o,Gi(s)),o=bi(o,Gi(a)),o}getBeforeBody(e,n){return Xx(yn(n.callbacks,"beforeBody",this,e))}getBody(e,n){const{callbacks:i}=n,r=[];return dt(e,s=>{const a={before:[],lines:[],after:[]},o=$x(i,s);bi(a.before,Gi(yn(o,"beforeLabel",this,s))),bi(a.lines,yn(o,"label",this,s)),bi(a.after,Gi(yn(o,"afterLabel",this,s))),r.push(a)}),r}getAfterBody(e,n){return Xx(yn(n.callbacks,"afterBody",this,e))}getFooter(e,n){const{callbacks:i}=n,r=yn(i,"beforeFooter",this,e),s=yn(i,"footer",this,e),a=yn(i,"afterFooter",this,e);let o=[];return o=bi(o,Gi(r)),o=bi(o,Gi(s)),o=bi(o,Gi(a)),o}_createItems(e){const n=this._active,i=this.chart.data,r=[],s=[],a=[];let o=[],l,c;for(l=0,c=n.length;l<c;++l)o.push(aC(this.chart,n[l]));return e.filter&&(o=o.filter((u,f,d)=>e.filter(u,f,d,i))),e.itemSort&&(o=o.sort((u,f)=>e.itemSort(u,f,i))),dt(o,u=>{const f=$x(e.callbacks,u);r.push(yn(f,"labelColor",this,u)),s.push(yn(f,"labelPointStyle",this,u)),a.push(yn(f,"labelTextColor",this,u))}),this.labelColors=r,this.labelPointStyles=s,this.labelTextColors=a,this.dataPoints=o,o}update(e,n){const i=this.options.setContext(this.getContext()),r=this._active;let s,a=[];if(!r.length)this.opacity!==0&&(s={opacity:0});else{const o=go[i.position].call(this,r,this._eventPosition);a=this._createItems(i),this.title=this.getTitle(a,i),this.beforeBody=this.getBeforeBody(a,i),this.body=this.getBody(a,i),this.afterBody=this.getAfterBody(a,i),this.footer=this.getFooter(a,i);const l=this._size=Gx(this,i),c=Object.assign({},o,l),u=Wx(this.chart,i,c),f=jx(i,c,u,this.chart);this.xAlign=u.xAlign,this.yAlign=u.yAlign,s={opacity:1,x:f.x,y:f.y,width:l.width,height:l.height,caretX:o.x,caretY:o.y}}this._tooltipItems=a,this.$context=void 0,s&&this._resolveAnimations().update(this,s),e&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(e,n,i,r){const s=this.getCaretPosition(e,i,r);n.lineTo(s.x1,s.y1),n.lineTo(s.x2,s.y2),n.lineTo(s.x3,s.y3)}getCaretPosition(e,n,i){const{xAlign:r,yAlign:s}=this,{caretSize:a,cornerRadius:o}=i,{topLeft:l,topRight:c,bottomLeft:u,bottomRight:f}=Io(o),{x:d,y:p}=e,{width:x,height:y}=n;let m,h,_,M,b,S;return s==="center"?(b=p+y/2,r==="left"?(m=d,h=m-a,M=b+a,S=b-a):(m=d+x,h=m+a,M=b-a,S=b+a),_=m):(r==="left"?h=d+Math.max(l,u)+a:r==="right"?h=d+x-Math.max(c,f)-a:h=this.caretX,s==="top"?(M=p,b=M-a,m=h-a,_=h+a):(M=p+y,b=M+a,m=h+a,_=h-a),S=M),{x1:m,x2:h,x3:_,y1:M,y2:b,y3:S}}drawTitle(e,n,i){const r=this.title,s=r.length;let a,o,l;if(s){const c=Yd(i.rtl,this.x,this.width);for(e.x=Ql(this,i.titleAlign,i),n.textAlign=c.textAlign(i.titleAlign),n.textBaseline="middle",a=Fn(i.titleFont),o=i.titleSpacing,n.fillStyle=i.titleColor,n.font=a.string,l=0;l<s;++l)n.fillText(r[l],c.x(e.x),e.y+a.lineHeight/2),e.y+=a.lineHeight+o,l+1===s&&(e.y+=i.titleMarginBottom-o)}}_drawColorBox(e,n,i,r,s){const a=this.labelColors[i],o=this.labelPointStyles[i],{boxHeight:l,boxWidth:c}=s,u=Fn(s.bodyFont),f=Ql(this,"left",s),d=r.x(f),p=l<u.lineHeight?(u.lineHeight-l)/2:0,x=n.y+p;if(s.usePointStyle){const y={radius:Math.min(c,l)/2,pointStyle:o.pointStyle,rotation:o.rotation,borderWidth:1},m=r.leftForLtr(d,c)+c/2,h=x+l/2;e.strokeStyle=s.multiKeyBackground,e.fillStyle=s.multiKeyBackground,Bh(e,y,m,h),e.strokeStyle=a.borderColor,e.fillStyle=a.backgroundColor,Bh(e,y,m,h)}else{e.lineWidth=et(a.borderWidth)?Math.max(...Object.values(a.borderWidth)):a.borderWidth||1,e.strokeStyle=a.borderColor,e.setLineDash(a.borderDash||[]),e.lineDashOffset=a.borderDashOffset||0;const y=r.leftForLtr(d,c),m=r.leftForLtr(r.xPlus(d,1),c-2),h=Io(a.borderRadius);Object.values(h).some(_=>_!==0)?(e.beginPath(),e.fillStyle=s.multiKeyBackground,Hh(e,{x:y,y:x,w:c,h:l,radius:h}),e.fill(),e.stroke(),e.fillStyle=a.backgroundColor,e.beginPath(),Hh(e,{x:m,y:x+1,w:c-2,h:l-2,radius:h}),e.fill()):(e.fillStyle=s.multiKeyBackground,e.fillRect(y,x,c,l),e.strokeRect(y,x,c,l),e.fillStyle=a.backgroundColor,e.fillRect(m,x+1,c-2,l-2))}e.fillStyle=this.labelTextColors[i]}drawBody(e,n,i){const{body:r}=this,{bodySpacing:s,bodyAlign:a,displayColors:o,boxHeight:l,boxWidth:c,boxPadding:u}=i,f=Fn(i.bodyFont);let d=f.lineHeight,p=0;const x=Yd(i.rtl,this.x,this.width),y=function(v){n.fillText(v,x.x(e.x+p),e.y+d/2),e.y+=d+s},m=x.textAlign(a);let h,_,M,b,S,E,C;for(n.textAlign=a,n.textBaseline="middle",n.font=f.string,e.x=Ql(this,m,i),n.fillStyle=i.bodyColor,dt(this.beforeBody,y),p=o&&m!=="right"?a==="center"?c/2+u:c+2+u:0,b=0,E=r.length;b<E;++b){for(h=r[b],_=this.labelTextColors[b],n.fillStyle=_,dt(h.before,y),M=h.lines,o&&M.length&&(this._drawColorBox(n,e,b,x,i),d=Math.max(f.lineHeight,l)),S=0,C=M.length;S<C;++S)y(M[S]),d=f.lineHeight;dt(h.after,y)}p=0,d=f.lineHeight,dt(this.afterBody,y),e.y-=s}drawFooter(e,n,i){const r=this.footer,s=r.length;let a,o;if(s){const l=Yd(i.rtl,this.x,this.width);for(e.x=Ql(this,i.footerAlign,i),e.y+=i.footerMarginTop,n.textAlign=l.textAlign(i.footerAlign),n.textBaseline="middle",a=Fn(i.footerFont),n.fillStyle=i.footerColor,n.font=a.string,o=0;o<s;++o)n.fillText(r[o],l.x(e.x),e.y+a.lineHeight/2),e.y+=a.lineHeight+i.footerSpacing}}drawBackground(e,n,i,r){const{xAlign:s,yAlign:a}=this,{x:o,y:l}=e,{width:c,height:u}=i,{topLeft:f,topRight:d,bottomLeft:p,bottomRight:x}=Io(r.cornerRadius);n.fillStyle=r.backgroundColor,n.strokeStyle=r.borderColor,n.lineWidth=r.borderWidth,n.beginPath(),n.moveTo(o+f,l),a==="top"&&this.drawCaret(e,n,i,r),n.lineTo(o+c-d,l),n.quadraticCurveTo(o+c,l,o+c,l+d),a==="center"&&s==="right"&&this.drawCaret(e,n,i,r),n.lineTo(o+c,l+u-x),n.quadraticCurveTo(o+c,l+u,o+c-x,l+u),a==="bottom"&&this.drawCaret(e,n,i,r),n.lineTo(o+p,l+u),n.quadraticCurveTo(o,l+u,o,l+u-p),a==="center"&&s==="left"&&this.drawCaret(e,n,i,r),n.lineTo(o,l+f),n.quadraticCurveTo(o,l,o+f,l),n.closePath(),n.fill(),r.borderWidth>0&&n.stroke()}_updateAnimationTarget(e){const n=this.chart,i=this.$animations,r=i&&i.x,s=i&&i.y;if(r||s){const a=go[e.position].call(this,this._active,this._eventPosition);if(!a)return;const o=this._size=Gx(this,e),l=Object.assign({},a,this._size),c=Wx(n,e,l),u=jx(e,l,c,n);(r._to!==u.x||s._to!==u.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=o.width,this.height=o.height,this.caretX=a.x,this.caretY=a.y,this._resolveAnimations().update(this,u))}}_willRender(){return!!this.opacity}draw(e){const n=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(n);const r={width:this.width,height:this.height},s={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const a=Jn(n.padding),o=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&o&&(e.save(),e.globalAlpha=i,this.drawBackground(s,e,r,n),JT(e,n.textDirection),s.y+=a.top,this.drawTitle(s,e,n),this.drawBody(s,e,n),this.drawFooter(s,e,n),eA(e,n.textDirection),e.restore())}getActiveElements(){return this._active||[]}setActiveElements(e,n){const i=this._active,r=e.map(({datasetIndex:o,index:l})=>{const c=this.chart.getDatasetMeta(o);if(!c)throw new Error("Cannot find a dataset at index "+o);return{datasetIndex:o,element:c.data[l],index:l}}),s=!wu(i,r),a=this._positionChanged(r,n);(s||a)&&(this._active=r,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(e,n,i=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const r=this.options,s=this._active||[],a=this._getActiveElements(e,s,n,i),o=this._positionChanged(a,e),l=n||!wu(a,s)||o;return l&&(this._active=a,(r.enabled||r.external)&&(this._eventPosition={x:e.x,y:e.y},this.update(!0,n))),l}_getActiveElements(e,n,i,r){const s=this.options;if(e.type==="mouseout")return[];if(!r)return n.filter(o=>this.chart.data.datasets[o.datasetIndex]&&this.chart.getDatasetMeta(o.datasetIndex).controller.getParsed(o.index)!==void 0);const a=this.chart.getElementsAtEventForMode(e,s.mode,s,i);return s.reverse&&a.reverse(),a}_positionChanged(e,n){const{caretX:i,caretY:r,options:s}=this,a=go[s.position].call(this,e,n);return a!==!1&&(i!==a.x||r!==a.y)}}Xe(Xh,"positioners",go);var hC={id:"tooltip",_element:Xh,positioners:go,afterInit(t,e,n){n&&(t.tooltip=new Xh({chart:t,options:n}))},beforeUpdate(t,e,n){t.tooltip&&t.tooltip.initialize(n)},reset(t,e,n){t.tooltip&&t.tooltip.initialize(n)},afterDraw(t){const e=t.tooltip;if(e&&e._willRender()){const n={tooltip:e};if(t.notifyPlugins("beforeTooltipDraw",{...n,cancelable:!0})===!1)return;e.draw(t.ctx),t.notifyPlugins("afterTooltipDraw",n)}},afterEvent(t,e){if(t.tooltip){const n=e.replay;t.tooltip.handleEvent(e.event,n,e.inChartArea)&&(e.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(t,e)=>e.bodyFont.size,boxWidth:(t,e)=>e.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:xS},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:t=>t!=="filter"&&t!=="itemSort"&&t!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]};function pC(t,e){const n=[],{bounds:r,step:s,min:a,max:o,precision:l,count:c,maxTicks:u,maxDigits:f,includeBounds:d}=t,p=s||1,x=u-1,{min:y,max:m}=e,h=!St(a),_=!St(o),M=!St(c),b=(m-y)/(f+1);let S=K0((m-y)/x/p)*p,E,C,v,A;if(S<1e-14&&!h&&!_)return[{value:y},{value:m}];A=Math.ceil(m/S)-Math.floor(y/S),A>x&&(S=K0(A*S/x/p)*p),St(l)||(E=Math.pow(10,l),S=Math.ceil(S*E)/E),r==="ticks"?(C=Math.floor(y/S)*S,v=Math.ceil(m/S)*S):(C=y,v=m),h&&_&&s&&jE((o-a)/s,S/1e3)?(A=Math.round(Math.min((o-a)/S,u)),S=(o-a)/A,C=a,v=o):M?(C=h?a:C,v=_?o:v,A=c-1,S=(v-C)/A):(A=(v-C)/S,No(A,Math.round(A),S/1e3)?A=Math.round(A):A=Math.ceil(A));const R=Math.max(Z0(S),Z0(C));E=Math.pow(10,St(l)?R:l),C=Math.round(C*E)/E,v=Math.round(v*E)/E;let N=0;for(h&&(d&&C!==a?(n.push({value:a}),C<a&&N++,No(Math.round((C+N*S)*E)/E,a,Yx(a,b,t))&&N++):C<a&&N++);N<A;++N){const L=Math.round((C+N*S)*E)/E;if(_&&L>o)break;n.push({value:L})}return _&&d&&v!==o?n.length&&No(n[n.length-1].value,o,Yx(o,b,t))?n[n.length-1].value=o:n.push({value:o}):(!_||v===o)&&n.push({value:v}),n}function Yx(t,e,{horizontal:n,minRotation:i}){const r=fs(i),s=(n?Math.sin(r):Math.cos(r))||.001,a=.75*e*(""+t).length;return Math.min(e/s,a)}class qx extends xl{constructor(e){super(e),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(e,n){return St(e)||(typeof e=="number"||e instanceof Number)&&!isFinite(+e)?null:+e}handleTickRangeOptions(){const{beginAtZero:e}=this.options,{minDefined:n,maxDefined:i}=this.getUserBounds();let{min:r,max:s}=this;const a=l=>r=n?r:l,o=l=>s=i?s:l;if(e){const l=La(r),c=La(s);l<0&&c<0?o(0):l>0&&c>0&&a(0)}if(r===s){let l=s===0?1:Math.abs(s*.05);o(s+l),e||a(r-l)}this.min=r,this.max=s}getTickLimit(){const e=this.options.ticks;let{maxTicksLimit:n,stepSize:i}=e,r;return i?(r=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,r>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${r} ticks. Limiting to 1000.`),r=1e3)):(r=this.computeTickLimit(),n=n||11),n&&(r=Math.min(n,r)),r}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const e=this.options,n=e.ticks;let i=this.getTickLimit();i=Math.max(2,i);const r={maxTicks:i,bounds:e.bounds,min:e.min,max:e.max,precision:n.precision,step:n.stepSize,count:n.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:n.minRotation||0,includeBounds:n.includeBounds!==!1},s=this._range||this,a=pC(r,s);return e.bounds==="ticks"&&XE(a,this,"value"),e.reverse?(a.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),a}configure(){const e=this.ticks;let n=this.min,i=this.max;if(super.configure(),this.options.offset&&e.length){const r=(i-n)/Math.max(e.length-1,1)/2;n-=r,i+=r}this._startValue=n,this._endValue=i,this._valueRange=i-n}getLabelForValue(e){return Wb(e,this.chart.options.locale,this.options.ticks.format)}}function $h(t){const e=t.ticks;if(e.display&&t.display){const n=Jn(e.backdropPadding);return mt(e.font&&e.font.size,Ft.font.size)+n.height}return 0}function mC(t,e,n){return n=Dt(n)?n:[n],{w:fT(t,e.string,n),h:n.length*e.lineHeight}}function Kx(t,e,n,i,r){return t===i||t===r?{start:e-n/2,end:e+n/2}:t<i||t>r?{start:e-n,end:e}:{start:e,end:e+n}}function gC(t){const e={l:t.left+t._padding.left,r:t.right-t._padding.right,t:t.top+t._padding.top,b:t.bottom-t._padding.bottom},n=Object.assign({},e),i=[],r=[],s=t._pointLabels.length,a=t.options.pointLabels,o=a.centerPointLabels?qt/s:0;for(let l=0;l<s;l++){const c=a.setContext(t.getPointLabelContext(l));r[l]=c.padding;const u=t.getPointPosition(l,t.drawingArea+r[l],o),f=Fn(c.font),d=mC(t.ctx,f,t._pointLabels[l]);i[l]=d;const p=Ln(t.getIndexAngle(l)+o),x=Math.round(Hm(p)),y=Kx(x,u.x,d.w,0,180),m=Kx(x,u.y,d.h,90,270);xC(n,e,p,y,m)}t.setCenterPoint(e.l-n.l,n.r-e.r,e.t-n.t,n.b-e.b),t._pointLabelItems=yC(t,i,r)}function xC(t,e,n,i,r){const s=Math.abs(Math.sin(n)),a=Math.abs(Math.cos(n));let o=0,l=0;i.start<e.l?(o=(e.l-i.start)/s,t.l=Math.min(t.l,e.l-o)):i.end>e.r&&(o=(i.end-e.r)/s,t.r=Math.max(t.r,e.r+o)),r.start<e.t?(l=(e.t-r.start)/a,t.t=Math.min(t.t,e.t-l)):r.end>e.b&&(l=(r.end-e.b)/a,t.b=Math.max(t.b,e.b+l))}function _C(t,e,n){const i=t.drawingArea,{extra:r,additionalAngle:s,padding:a,size:o}=n,l=t.getPointPosition(e,i+r+a,s),c=Math.round(Hm(Ln(l.angle+kn))),u=MC(l.y,o.h,c),f=bC(c),d=SC(l.x,o.w,f);return{visible:!0,x:l.x,y:u,textAlign:f,left:d,top:u,right:d+o.w,bottom:u+o.h}}function vC(t,e){if(!e)return!0;const{left:n,top:i,right:r,bottom:s}=t;return!(Zi({x:n,y:i},e)||Zi({x:n,y:s},e)||Zi({x:r,y:i},e)||Zi({x:r,y:s},e))}function yC(t,e,n){const i=[],r=t._pointLabels.length,s=t.options,{centerPointLabels:a,display:o}=s.pointLabels,l={extra:$h(s)/2,additionalAngle:a?qt/r:0};let c;for(let u=0;u<r;u++){l.padding=n[u],l.size=e[u];const f=_C(t,u,l);i.push(f),o==="auto"&&(f.visible=vC(f,c),f.visible&&(c=f))}return i}function bC(t){return t===0||t===180?"center":t<180?"left":"right"}function SC(t,e,n){return n==="right"?t-=e:n==="center"&&(t-=e/2),t}function MC(t,e,n){return n===90||n===270?t-=e/2:(n>270||n<90)&&(t-=e),t}function wC(t,e,n){const{left:i,top:r,right:s,bottom:a}=n,{backdropColor:o}=e;if(!St(o)){const l=Io(e.borderRadius),c=Jn(e.backdropPadding);t.fillStyle=o;const u=i-c.left,f=r-c.top,d=s-i+c.width,p=a-r+c.height;Object.values(l).some(x=>x!==0)?(t.beginPath(),Hh(t,{x:u,y:f,w:d,h:p,radius:l}),t.fill()):t.fillRect(u,f,d,p)}}function EC(t,e){const{ctx:n,options:{pointLabels:i}}=t;for(let r=e-1;r>=0;r--){const s=t._pointLabelItems[r];if(!s.visible)continue;const a=i.setContext(t.getPointLabelContext(r));wC(n,a,s);const o=Fn(a.font),{x:l,y:c,textAlign:u}=s;Pu(n,t._pointLabels[r],l,c+o.lineHeight/2,o,{color:a.color,textAlign:u,textBaseline:"middle"})}}function _S(t,e,n,i){const{ctx:r}=t;if(n)r.arc(t.xCenter,t.yCenter,e,0,Kn);else{let s=t.getPointPosition(0,e);r.moveTo(s.x,s.y);for(let a=1;a<i;a++)s=t.getPointPosition(a,e),r.lineTo(s.x,s.y)}}function TC(t,e,n,i,r){const s=t.ctx,a=e.circular,{color:o,lineWidth:l}=e;!a&&!i||!o||!l||n<0||(s.save(),s.strokeStyle=o,s.lineWidth=l,s.setLineDash(r.dash||[]),s.lineDashOffset=r.dashOffset,s.beginPath(),_S(t,n,a,i),s.closePath(),s.stroke(),s.restore())}function AC(t,e,n){return $r(t,{label:n,index:e,type:"pointLabel"})}class xo extends qx{constructor(e){super(e),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const e=this._padding=Jn($h(this.options)/2),n=this.width=this.maxWidth-e.width,i=this.height=this.maxHeight-e.height;this.xCenter=Math.floor(this.left+n/2+e.left),this.yCenter=Math.floor(this.top+i/2+e.top),this.drawingArea=Math.floor(Math.min(n,i)/2)}determineDataLimits(){const{min:e,max:n}=this.getMinMax(!1);this.min=hn(e)&&!isNaN(e)?e:0,this.max=hn(n)&&!isNaN(n)?n:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/$h(this.options))}generateTickLabels(e){qx.prototype.generateTickLabels.call(this,e),this._pointLabels=this.getLabels().map((n,i)=>{const r=Nt(this.options.pointLabels.callback,[n,i],this);return r||r===0?r:""}).filter((n,i)=>this.chart.getDataVisibility(i))}fit(){const e=this.options;e.display&&e.pointLabels.display?gC(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(e,n,i,r){this.xCenter+=Math.floor((e-n)/2),this.yCenter+=Math.floor((i-r)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(e,n,i,r))}getIndexAngle(e){const n=Kn/(this._pointLabels.length||1),i=this.options.startAngle||0;return Ln(e*n+fs(i))}getDistanceFromCenterForValue(e){if(St(e))return NaN;const n=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-e)*n:(e-this.min)*n}getValueForDistanceFromCenter(e){if(St(e))return NaN;const n=e/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-n:this.min+n}getPointLabelContext(e){const n=this._pointLabels||[];if(e>=0&&e<n.length){const i=n[e];return AC(this.getContext(),e,i)}}getPointPosition(e,n,i=0){const r=this.getIndexAngle(e)-kn+i;return{x:Math.cos(r)*n+this.xCenter,y:Math.sin(r)*n+this.yCenter,angle:r}}getPointPositionForValue(e,n){return this.getPointPosition(e,this.getDistanceFromCenterForValue(n))}getBasePosition(e){return this.getPointPositionForValue(e||0,this.getBaseValue())}getPointLabelPosition(e){const{left:n,top:i,right:r,bottom:s}=this._pointLabelItems[e];return{left:n,top:i,right:r,bottom:s}}drawBackground(){const{backgroundColor:e,grid:{circular:n}}=this.options;if(e){const i=this.ctx;i.save(),i.beginPath(),_S(this,this.getDistanceFromCenterForValue(this._endValue),n,this._pointLabels.length),i.closePath(),i.fillStyle=e,i.fill(),i.restore()}}drawGrid(){const e=this.ctx,n=this.options,{angleLines:i,grid:r,border:s}=n,a=this._pointLabels.length;let o,l,c;if(n.pointLabels.display&&EC(this,a),r.display&&this.ticks.forEach((u,f)=>{if(f!==0||f===0&&this.min<0){l=this.getDistanceFromCenterForValue(u.value);const d=this.getContext(f),p=r.setContext(d),x=s.setContext(d);TC(this,p,l,a,x)}}),i.display){for(e.save(),o=a-1;o>=0;o--){const u=i.setContext(this.getPointLabelContext(o)),{color:f,lineWidth:d}=u;!d||!f||(e.lineWidth=d,e.strokeStyle=f,e.setLineDash(u.borderDash),e.lineDashOffset=u.borderDashOffset,l=this.getDistanceFromCenterForValue(n.reverse?this.min:this.max),c=this.getPointPosition(o,l),e.beginPath(),e.moveTo(this.xCenter,this.yCenter),e.lineTo(c.x,c.y),e.stroke())}e.restore()}}drawBorder(){}drawLabels(){const e=this.ctx,n=this.options,i=n.ticks;if(!i.display)return;const r=this.getIndexAngle(0);let s,a;e.save(),e.translate(this.xCenter,this.yCenter),e.rotate(r),e.textAlign="center",e.textBaseline="middle",this.ticks.forEach((o,l)=>{if(l===0&&this.min>=0&&!n.reverse)return;const c=i.setContext(this.getContext(l)),u=Fn(c.font);if(s=this.getDistanceFromCenterForValue(this.ticks[l].value),c.showLabelBackdrop){e.font=u.string,a=e.measureText(o.label).width,e.fillStyle=c.backdropColor;const f=Jn(c.backdropPadding);e.fillRect(-a/2-f.left,-s-u.size/2-f.top,a+f.width,u.size+f.height)}Pu(e,o.label,0,-s,u,{color:c.color,strokeColor:c.textStrokeColor,strokeWidth:c.textStrokeWidth})}),e.restore()}drawTitle(){}}Xe(xo,"id","radialLinear"),Xe(xo,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:jb.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(e){return e},padding:5,centerPointLabels:!1}}),Xe(xo,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),Xe(xo,"descriptors",{angleLines:{_fallback:"grid"}});const ld={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},Mn=Object.keys(ld);function Zx(t,e){return t-e}function Qx(t,e){if(St(e))return null;const n=t._adapter,{parser:i,round:r,isoWeekday:s}=t._parseOpts;let a=e;return typeof i=="function"&&(a=i(a)),hn(a)||(a=typeof i=="string"?n.parse(a,i):n.parse(a)),a===null?null:(r&&(a=r==="week"&&(Cu(s)||s===!0)?n.startOf(a,"isoWeek",s):n.startOf(a,r)),+a)}function Jx(t,e,n,i){const r=Mn.length;for(let s=Mn.indexOf(t);s<r-1;++s){const a=ld[Mn[s]],o=a.steps?a.steps:Number.MAX_SAFE_INTEGER;if(a.common&&Math.ceil((n-e)/(o*a.size))<=i)return Mn[s]}return Mn[r-1]}function CC(t,e,n,i,r){for(let s=Mn.length-1;s>=Mn.indexOf(n);s--){const a=Mn[s];if(ld[a].common&&t._adapter.diff(r,i,a)>=e-1)return a}return Mn[n?Mn.indexOf(n):0]}function RC(t){for(let e=Mn.indexOf(t)+1,n=Mn.length;e<n;++e)if(ld[Mn[e]].common)return Mn[e]}function e_(t,e,n){if(!n)t[e]=!0;else if(n.length){const{lo:i,hi:r}=Vm(n,e),s=n[i]>=e?n[i]:n[r];t[s]=!0}}function PC(t,e,n,i){const r=t._adapter,s=+r.startOf(e[0].value,i),a=e[e.length-1].value;let o,l;for(o=s;o<=a;o=+r.add(o,1,i))l=n[o],l>=0&&(e[l].major=!0);return e}function t_(t,e,n){const i=[],r={},s=e.length;let a,o;for(a=0;a<s;++a)o=e[a],r[o]=a,i.push({value:o,major:!1});return s===0||!n?i:PC(t,i,r,n)}class Du extends xl{constructor(e){super(e),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(e,n={}){const i=e.time||(e.time={}),r=this._adapter=new SA._date(e.adapters.date);r.init(n),Po(i.displayFormats,r.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(e),this._normalized=n.normalized}parse(e,n){return e===void 0?null:Qx(this,e)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const e=this.options,n=this._adapter,i=e.time.unit||"day";let{min:r,max:s,minDefined:a,maxDefined:o}=this.getUserBounds();function l(c){!a&&!isNaN(c.min)&&(r=Math.min(r,c.min)),!o&&!isNaN(c.max)&&(s=Math.max(s,c.max))}(!a||!o)&&(l(this._getLabelBounds()),(e.bounds!=="ticks"||e.ticks.source!=="labels")&&l(this.getMinMax(!1))),r=hn(r)&&!isNaN(r)?r:+n.startOf(Date.now(),i),s=hn(s)&&!isNaN(s)?s:+n.endOf(Date.now(),i)+1,this.min=Math.min(r,s-1),this.max=Math.max(r+1,s)}_getLabelBounds(){const e=this.getLabelTimestamps();let n=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return e.length&&(n=e[0],i=e[e.length-1]),{min:n,max:i}}buildTicks(){const e=this.options,n=e.time,i=e.ticks,r=i.source==="labels"?this.getLabelTimestamps():this._generate();e.bounds==="ticks"&&r.length&&(this.min=this._userMin||r[0],this.max=this._userMax||r[r.length-1]);const s=this.min,a=this.max,o=ZE(r,s,a);return this._unit=n.unit||(i.autoSkip?Jx(n.minUnit,this.min,this.max,this._getLabelCapacity(s)):CC(this,o.length,n.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:RC(this._unit),this.initOffsets(r),e.reverse&&o.reverse(),t_(this,o,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(e=>+e.value))}initOffsets(e=[]){let n=0,i=0,r,s;this.options.offset&&e.length&&(r=this.getDecimalForValue(e[0]),e.length===1?n=1-r:n=(this.getDecimalForValue(e[1])-r)/2,s=this.getDecimalForValue(e[e.length-1]),e.length===1?i=s:i=(s-this.getDecimalForValue(e[e.length-2]))/2);const a=e.length<3?.5:.25;n=Ki(n,0,a),i=Ki(i,0,a),this._offsets={start:n,end:i,factor:1/(n+1+i)}}_generate(){const e=this._adapter,n=this.min,i=this.max,r=this.options,s=r.time,a=s.unit||Jx(s.minUnit,n,i,this._getLabelCapacity(n)),o=mt(r.ticks.stepSize,1),l=a==="week"?s.isoWeekday:!1,c=Cu(l)||l===!0,u={};let f=n,d,p;if(c&&(f=+e.startOf(f,"isoWeek",l)),f=+e.startOf(f,c?"day":a),e.diff(i,n,a)>1e5*o)throw new Error(n+" and "+i+" are too far apart with stepSize of "+o+" "+a);const x=r.ticks.source==="data"&&this.getDataTimestamps();for(d=f,p=0;d<i;d=+e.add(d,o,a),p++)e_(u,d,x);return(d===i||r.bounds==="ticks"||p===1)&&e_(u,d,x),Object.keys(u).sort(Zx).map(y=>+y)}getLabelForValue(e){const n=this._adapter,i=this.options.time;return i.tooltipFormat?n.format(e,i.tooltipFormat):n.format(e,i.displayFormats.datetime)}format(e,n){const r=this.options.time.displayFormats,s=this._unit,a=n||r[s];return this._adapter.format(e,a)}_tickFormatFunction(e,n,i,r){const s=this.options,a=s.ticks.callback;if(a)return Nt(a,[e,n,i],this);const o=s.time.displayFormats,l=this._unit,c=this._majorUnit,u=l&&o[l],f=c&&o[c],d=i[n],p=c&&f&&d&&d.major;return this._adapter.format(e,r||(p?f:u))}generateTickLabels(e){let n,i,r;for(n=0,i=e.length;n<i;++n)r=e[n],r.label=this._tickFormatFunction(r.value,n,e)}getDecimalForValue(e){return e===null?NaN:(e-this.min)/(this.max-this.min)}getPixelForValue(e){const n=this._offsets,i=this.getDecimalForValue(e);return this.getPixelForDecimal((n.start+i)*n.factor)}getValueForPixel(e){const n=this._offsets,i=this.getDecimalForPixel(e)/n.factor-n.end;return this.min+i*(this.max-this.min)}_getLabelSize(e){const n=this.options.ticks,i=this.ctx.measureText(e).width,r=fs(this.isHorizontal()?n.maxRotation:n.minRotation),s=Math.cos(r),a=Math.sin(r),o=this._resolveTickFontOptions(0).size;return{w:i*s+o*a,h:i*a+o*s}}_getLabelCapacity(e){const n=this.options.time,i=n.displayFormats,r=i[n.unit]||i.millisecond,s=this._tickFormatFunction(e,0,t_(this,[e],this._majorUnit),r),a=this._getLabelSize(s),o=Math.floor(this.isHorizontal()?this.width/a.w:this.height/a.h)-1;return o>0?o:1}getDataTimestamps(){let e=this._cache.data||[],n,i;if(e.length)return e;const r=this.getMatchingVisibleMetas();if(this._normalized&&r.length)return this._cache.data=r[0].controller.getAllParsedValues(this);for(n=0,i=r.length;n<i;++n)e=e.concat(r[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(e)}getLabelTimestamps(){const e=this._cache.labels||[];let n,i;if(e.length)return e;const r=this.getLabels();for(n=0,i=r.length;n<i;++n)e.push(Qx(this,r[n]));return this._cache.labels=this._normalized?e:this.normalize(e)}normalize(e){return JE(e.sort(Zx))}}Xe(Du,"id","time"),Xe(Du,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function Jl(t,e,n){let i=0,r=t.length-1,s,a,o,l;n?(e>=t[i].pos&&e<=t[r].pos&&({lo:i,hi:r}=Oh(t,"pos",e)),{pos:s,time:o}=t[i],{pos:a,time:l}=t[r]):(e>=t[i].time&&e<=t[r].time&&({lo:i,hi:r}=Oh(t,"time",e)),{time:s,pos:o}=t[i],{time:a,pos:l}=t[r]);const c=a-s;return c?o+(l-o)*(e-s)/c:o}class n_ extends Du{constructor(e){super(e),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const e=this._getTimestampsForTable(),n=this._table=this.buildLookupTable(e);this._minPos=Jl(n,this.min),this._tableRange=Jl(n,this.max)-this._minPos,super.initOffsets(e)}buildLookupTable(e){const{min:n,max:i}=this,r=[],s=[];let a,o,l,c,u;for(a=0,o=e.length;a<o;++a)c=e[a],c>=n&&c<=i&&r.push(c);if(r.length<2)return[{time:n,pos:0},{time:i,pos:1}];for(a=0,o=r.length;a<o;++a)u=r[a+1],l=r[a-1],c=r[a],Math.round((u+l)/2)!==c&&s.push({time:c,pos:a/(o-1)});return s}_generate(){const e=this.min,n=this.max;let i=super.getDataTimestamps();return(!i.includes(e)||!i.length)&&i.splice(0,0,e),(!i.includes(n)||i.length===1)&&i.push(n),i.sort((r,s)=>r-s)}_getTimestampsForTable(){let e=this._cache.all||[];if(e.length)return e;const n=this.getDataTimestamps(),i=this.getLabelTimestamps();return n.length&&i.length?e=this.normalize(n.concat(i)):e=n.length?n:i,e=this._cache.all=e,e}getDecimalForValue(e){return(Jl(this._table,e)-this._minPos)/this._tableRange}getValueForPixel(e){const n=this._offsets,i=this.getDecimalForPixel(e)/n.factor-n.end;return Jl(this._table,i*this._tableRange+this._minPos,!0)}}Xe(n_,"id","timeseries"),Xe(n_,"defaults",Du.defaults);$i.register(Bc,xo,Gc,Rr,sC,hC);const i_=["Task Classification","Sensor Compatibility","Model Output Quality","Evidence Agreement","Temporal Consistency","Answer Groundedness"],r_=["task_classification","sensor_compatibility","model_output_quality","evidence_agreement","temporal_consistency","answer_groundedness"];function ec(t){return t>=.85?"var(--accent-success)":t>=.65?"var(--accent-warning)":"var(--accent-danger)"}function NC({breakdown:t}){const e=se.useRef(null),n=se.useRef(null),i=r_.map(s=>Math.round(t[s]*100));se.useEffect(()=>{if(e.current)return n.current&&n.current.destroy(),n.current=new $i(e.current,{type:"radar",data:{labels:i_,datasets:[{label:"Confidence",data:i,fill:!0,backgroundColor:"rgba(59,130,246,0.15)",borderColor:"rgba(59,130,246,0.8)",pointBackgroundColor:"rgba(6,182,212,1)",pointRadius:4,borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!0,animation:{duration:800,easing:"easeInOutQuart"},scales:{r:{min:0,max:100,ticks:{stepSize:25,color:"rgba(148,163,184,0.6)",font:{size:10},backdropColor:"transparent"},grid:{color:"rgba(255,255,255,0.06)"},pointLabels:{color:"rgba(148,163,184,0.9)",font:{size:11,family:"Inter, sans-serif"}},angleLines:{color:"rgba(255,255,255,0.06)"}}},plugins:{legend:{display:!1},tooltip:{callbacks:{label:s=>`${s.label}: ${s.parsed.r}%`}}}}}),()=>{var s;(s=n.current)==null||s.destroy()}},[t]);const r=Math.round(t.overall*100);return g.jsxs("div",{className:"card fade-in-up",id:"confidence-breakdown-panel",children:[g.jsxs("div",{className:"flex items-center justify-between mb-4",children:[g.jsxs("div",{children:[g.jsx("p",{className:"section-label",children:"📊 Confidence Breakdown"}),g.jsx("p",{className:"text-sm text-muted",children:"6-component analysis · SIH26167 §4.3"})]}),g.jsxs("div",{className:"overall-score",style:{color:ec(t.overall)},children:[g.jsx("span",{className:"overall-number",children:r}),g.jsx("span",{className:"overall-label",children:"/ 100"})]})]}),g.jsx("div",{className:"radar-wrap",children:g.jsx("canvas",{ref:e,id:"confidence-radar-chart"})}),g.jsx("div",{className:"gauge-list",children:r_.map((s,a)=>{const o=t[s],l=Math.round(o*100);return g.jsxs("div",{className:"gauge-row",id:`gauge-${s}`,children:[g.jsx("span",{className:"gauge-label",children:i_[a]}),g.jsx("div",{className:"progress-bar gauge-bar",children:g.jsx("div",{className:"progress-bar-fill",style:{width:`${l}%`,background:`linear-gradient(90deg, ${ec(o)}, ${ec(o)}88)`}})}),g.jsxs("span",{className:"gauge-val",style:{color:ec(o)},children:[l,"%"]})]},s)})}),g.jsx("style",{children:`
        .overall-score { text-align: right; }
        .overall-number { font-size: 2rem; font-weight: 800; line-height: 1; }
        .overall-label { font-size: 0.85rem; font-weight: 600; opacity: 0.7; }
        .radar-wrap { max-width: 300px; margin: 0 auto 1.25rem; }
        .gauge-list { display: flex; flex-direction: column; gap: 0.55rem; }
        .gauge-row { display: grid; grid-template-columns: 160px 1fr 42px; align-items: center; gap: 0.6rem; }
        .gauge-label { font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); white-space: nowrap; }
        .gauge-bar { height: 8px; }
        .gauge-val { font-size: 0.78rem; font-weight: 700; text-align: right; font-family: var(--font-mono); }
        @media (max-width: 500px) { .gauge-row { grid-template-columns: 1fr; } .gauge-label { font-size: 0.7rem; } }
      `})]})}const s_={success:{icon:"✓",color:"var(--accent-success)",badge:"badge-green"},warning:{icon:"⚠",color:"var(--accent-warning)",badge:"badge-amber"},error:{icon:"✕",color:"var(--accent-danger)",badge:"badge-red"},skipped:{icon:"—",color:"var(--text-muted)",badge:"badge-blue"}};function LC({trace:t}){const[e,n]=se.useState(null),i=r=>n(s=>s===r?null:r);return g.jsxs("div",{className:"card fade-in-up",id:"provenance-graph-panel",children:[g.jsxs("div",{className:"flex items-center justify-between mb-4",children:[g.jsxs("div",{children:[g.jsx("p",{className:"section-label",children:"🔗 Execution Trace"}),g.jsxs("p",{className:"text-sm text-muted",children:["Trace ID: ",g.jsx("code",{className:"text-mono",style:{color:"var(--text-accent)"},children:t.trace_id})," · ",t.steps.length," steps · ",t.total_duration_ms.toFixed(0)," ms total"]})]}),g.jsx("span",{className:"badge badge-blue",children:"Auditable"})]}),g.jsx("div",{className:"trace-pipeline",children:t.steps.map((r,s)=>g.jsx(DC,{step:r,index:s,isLast:s===t.steps.length-1,expanded:e===r.step_id,onToggle:()=>i(r.step_id)},r.step_id))}),g.jsx("style",{children:`
        .trace-pipeline { display: flex; flex-direction: column; gap: 0; }
      `})]})}function DC({step:t,index:e,isLast:n,expanded:i,onToggle:r}){const s=s_[t.status]??s_.success;return g.jsxs("div",{className:"step-wrap",id:`trace-step-${t.step_id}`,children:[g.jsxs("div",{className:"step-connector-col",children:[g.jsx("div",{className:"step-dot",style:{borderColor:s.color,color:s.color},children:s.icon}),!n&&g.jsx("div",{className:"step-line"})]}),g.jsxs("div",{className:"step-body",children:[g.jsxs("div",{className:"step-header",onClick:r,role:"button",tabIndex:0,onKeyDown:a=>a.key==="Enter"&&r(),children:[g.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[g.jsxs("span",{className:"step-num text-xs text-muted",children:["#",e+1]}),g.jsx("span",{style:{fontWeight:600,fontSize:"0.88rem"},children:t.step_name}),g.jsx("span",{className:`badge ${s.badge}`,children:t.status})]}),g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsxs("span",{className:"text-xs",style:{color:"var(--text-muted)",fontFamily:"var(--font-mono)"},children:[t.duration_ms.toFixed(1)," ms"]}),g.jsx("span",{className:"text-xs",style:{color:"var(--text-muted)",fontSize:"0.7rem"},children:i?"▲":"▼"})]})]}),g.jsx("p",{className:"step-component text-xs text-muted",style:{marginTop:"2px"},children:t.component}),i&&g.jsx("div",{className:"step-detail fade-in",children:g.jsxs("div",{className:"step-io",children:[g.jsxs("div",{children:[g.jsx("p",{className:"section-label",style:{fontSize:"0.65rem"},children:"Input"}),g.jsx("p",{className:"text-xs text-secondary",children:t.input_summary})]}),g.jsxs("div",{children:[g.jsx("p",{className:"section-label",style:{fontSize:"0.65rem"},children:"Output"}),g.jsx("p",{className:"text-xs text-secondary",children:t.output_summary})]})]})})]}),g.jsx("style",{children:`
        .step-wrap { display: flex; gap: 0.75rem; }
        .step-connector-col { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; width: 28px; }
        .step-dot { width: 28px; height: 28px; border-radius: 50%; border: 2px solid; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; background: var(--bg-card); flex-shrink: 0; }
        .step-line { flex: 1; width: 2px; background: linear-gradient(180deg, rgba(59,130,246,0.25), rgba(59,130,246,0.06)); min-height: 16px; }
        .step-body { flex: 1; padding-bottom: 1rem; min-width: 0; }
        .step-header { display: flex; align-items: center; justify-content: space-between; cursor: pointer; padding: 4px 8px; border-radius: var(--radius-sm); transition: background 0.15s; }
        .step-header:hover { background: rgba(255,255,255,0.04); }
        .step-num { min-width: 18px; }
        .step-component { padding-left: 8px; }
        .step-detail { margin-top: 0.5rem; padding: 0.65rem; background: rgba(0,0,0,0.25); border-radius: var(--radius-sm); border: 1px solid var(--border-card); }
        .step-io { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        @media (max-width: 500px) { .step-io { grid-template-columns: 1fr; } }
      `})]})}const IC={vqa_agent:"var(--accent-primary)",caption_agent:"var(--accent-secondary)",grounding_agent:"var(--accent-tertiary)",change_detection_agent:"var(--accent-warning)",change_vqa_agent:"var(--accent-warning)",sar_optical_agent:"var(--accent-success)",sam_agent:"#ec4899",spectral_analysis_agent:"#10b981"};function kC({output:t,index:e}){const[n,i]=se.useState(!0),r=IC[t.agent_id]??"var(--accent-primary)",s=Math.round(t.raw_score*100);return g.jsxs("div",{className:"card agent-card fade-in-up",id:`agent-card-${t.agent_id}`,style:{animationDelay:`${e*.07}s`,borderLeft:`3px solid ${r}`},children:[g.jsxs("div",{className:"agent-header",onClick:()=>i(a=>!a),children:[g.jsxs("div",{className:"agent-title-row",children:[g.jsxs("span",{className:"agent-badge",style:{color:r,borderColor:r},children:["Agent ",e+1]}),g.jsx("span",{style:{fontWeight:600,fontSize:"0.9rem"},children:t.agent_name}),t.error&&g.jsx("span",{className:"badge badge-red",children:"Error"})]}),g.jsxs("div",{className:"agent-meta",children:[g.jsx(FC,{score:s,color:r}),g.jsx("span",{className:"toggle-arrow",children:n?"▲":"▼"})]})]}),g.jsx("p",{className:"text-xs text-muted",style:{marginTop:"4px"},children:t.task}),t.evidence_regions&&t.evidence_regions.length>0&&g.jsx("div",{className:"evidence-chips",children:t.evidence_regions.map((a,o)=>g.jsxs("span",{className:"badge badge-blue",children:["📌 ",a.label," (",(a.confidence*100).toFixed(0),"%)"]},o))}),g.jsxs("div",{className:`collapsible-content ${n?"open":"closed"}`,children:[g.jsx("div",{className:"divider"}),t.error?g.jsxs("p",{className:"text-sm",style:{color:"var(--accent-danger)"},children:["⚠ ",t.error]}):g.jsx(UC,{result:t.result})]}),g.jsx("style",{children:`
        .agent-card { cursor: default; }
        .agent-header { display: flex; align-items: flex-start; justify-content: space-between; cursor: pointer; }
        .agent-title-row { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        .agent-badge { font-size: 0.68rem; font-weight: 800; text-transform: uppercase; border: 1px solid; border-radius: 4px; padding: 1px 6px; }
        .agent-meta { display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0; }
        .evidence-chips { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.5rem; }
        .score-ring { position: relative; width: 36px; height: 36px; flex-shrink: 0; }
        .score-ring svg { transform: rotate(-90deg); }
        .score-ring .score-text { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; font-weight: 700; }
      `})]})}function FC({score:t,color:e}){const i=2*Math.PI*14,r=t/100*i;return g.jsxs("div",{className:"score-ring",children:[g.jsxs("svg",{width:"36",height:"36",viewBox:"0 0 36 36",children:[g.jsx("circle",{cx:"18",cy:"18",r:14,fill:"none",stroke:"rgba(255,255,255,0.08)",strokeWidth:"3"}),g.jsx("circle",{cx:"18",cy:"18",r:14,fill:"none",stroke:e,strokeWidth:"3",strokeDasharray:`${r} ${i}`,strokeLinecap:"round",style:{transition:"stroke-dasharray 0.8s ease"}})]}),g.jsx("div",{className:"score-text",style:{color:e},children:t})]})}function UC({result:t}){const e=["answer","caption","change_type","change_map_description","severity","changed_area_km2","change_percent","fusion_insights","num_objects_detected","land_cover_distribution"],n=Object.entries(t).filter(([i])=>!i.includes("inference_time")&&i!=="model").sort(([i],[r])=>{const s=e.indexOf(i),a=e.indexOf(r);return(s===-1?99:s)-(a===-1?99:a)});return g.jsxs("div",{className:"result-fields",children:[n.map(([i,r])=>{const s=i.replace(/_/g," ");return Array.isArray(r)?g.jsxs("div",{className:"rf-row",children:[g.jsx("span",{className:"rf-label",children:s}),g.jsx("ul",{className:"rf-list",children:r.map((a,o)=>g.jsx("li",{children:String(a)},o))})]},i):typeof r=="object"&&r!==null?g.jsxs("div",{className:"rf-row",children:[g.jsx("span",{className:"rf-label",children:s}),g.jsx("div",{className:"rf-dict",children:Object.entries(r).map(([a,o])=>g.jsxs("span",{className:"rf-chip",children:[g.jsxs("span",{style:{color:"var(--text-muted)"},children:[a.replace(/_/g," "),": "]}),g.jsx("span",{style:{color:"var(--text-primary)",fontWeight:600},children:String(o)})]},a))})]},i):g.jsxs("div",{className:"rf-row",children:[g.jsx("span",{className:"rf-label",children:s}),g.jsx("span",{className:"rf-value",children:String(r)})]},i)}),g.jsx("style",{children:`
        .result-fields { display: flex; flex-direction: column; gap: 0.5rem; }
        .rf-row { display: grid; grid-template-columns: 140px 1fr; gap: 0.5rem; align-items: baseline; }
        .rf-label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); white-space: nowrap; }
        .rf-value { font-size: 0.85rem; color: var(--text-secondary); }
        .rf-list { font-size: 0.82rem; color: var(--text-secondary); padding-left: 1rem; line-height: 1.7; }
        .rf-dict { display: flex; flex-wrap: wrap; gap: 0.3rem; }
        .rf-chip { display: inline-flex; gap: 2px; font-size: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; padding: 2px 6px; }
        @media (max-width: 500px) { .rf-row { grid-template-columns: 1fr; } }
      `})]})}function OC({sensor:t}){const e=t.selected_sensor.toLowerCase().includes("multi"),n=t.selected_sensor.toLowerCase().includes("sar"),i=e?"🛰+📡":n?"📡":"🛰",r=e?"var(--accent-tertiary)":n?"var(--accent-warning)":"var(--accent-secondary)";return g.jsxs("div",{className:"card sensor-card fade-in-up",id:"sensor-decision-panel",children:[g.jsx("p",{className:"section-label",children:"📡 Sensor Selection"}),g.jsxs("div",{className:"sensor-header",children:[g.jsx("span",{className:"sensor-icon",style:{color:r},children:i}),g.jsxs("div",{children:[g.jsx("h3",{style:{color:r,fontSize:"0.95rem"},children:t.selected_sensor}),t.fallback_considered&&g.jsx("span",{className:"badge badge-amber",style:{marginTop:"4px"},children:"⚠ Fallback considered"})]})]}),g.jsx("p",{className:"sensor-rationale",children:t.rationale}),t.cloud_cover_estimate!==null&&g.jsxs("div",{className:"cloud-row",children:[g.jsx("span",{className:"text-xs text-muted",children:"☁ Cloud cover estimate"}),g.jsxs("div",{className:"cloud-bar-wrap",children:[g.jsx("div",{className:"progress-bar",children:g.jsx("div",{className:"progress-bar-fill",style:{width:`${Math.min(t.cloud_cover_estimate,100)}%`,background:t.cloud_cover_estimate>25?"linear-gradient(90deg, var(--accent-warning), var(--accent-danger))":"linear-gradient(90deg, var(--accent-success), var(--accent-secondary))"}})}),g.jsxs("span",{className:"text-xs",style:{color:t.cloud_cover_estimate>25?"var(--accent-warning)":"var(--accent-success)"},children:[t.cloud_cover_estimate.toFixed(1),"%"]})]})]}),g.jsx("style",{children:`
        .sensor-header { display: flex; align-items: flex-start; gap: 0.75rem; margin: 0.6rem 0 0.5rem; }
        .sensor-icon { font-size: 1.8rem; line-height: 1; flex-shrink: 0; }
        .sensor-rationale { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; }
        .cloud-row { margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.3rem; }
        .cloud-bar-wrap { display: flex; align-items: center; gap: 0.5rem; }
        .cloud-bar-wrap .progress-bar { flex: 1; }
      `})]})}const zC={vqa:"badge-blue",captioning:"badge-cyan",grounding:"badge-purple",change_detection:"badge-amber",change_vqa:"badge-amber",sar_optical_joint:"badge-green",unknown:"badge-red"},BC={vqa:"❓",captioning:"📝",grounding:"📍",change_detection:"🔄",change_vqa:"💧",sar_optical_joint:"📡",unknown:"❔"};function HC({spec:t}){const[e,n]=se.useState(!0);return g.jsxs("div",{className:"card fade-in-up",id:"earthquery-spec-panel",children:[g.jsxs("button",{className:"spec-toggle",onClick:()=>n(i=>!i),"aria-expanded":e,id:"spec-toggle-btn",children:[g.jsxs("span",{className:"flex items-center gap-2",children:[g.jsx("span",{style:{fontSize:"1.1rem"},children:"🧠"}),g.jsx("span",{className:"section-label",style:{margin:0},children:"How I understood your question"}),g.jsxs("span",{className:`badge ${zC[t.task_type]}`,children:[BC[t.task_type]," ",t.task_type.replace(/_/g," ")]})]}),g.jsx("span",{className:"toggle-arrow",children:e?"▲":"▼"})]}),g.jsxs("div",{className:`collapsible-content ${e?"open":"closed"}`,children:[g.jsx("div",{className:"divider"}),g.jsxs("div",{className:"spec-grid",children:[g.jsx(Qr,{label:"Intent",value:t.intent,highlight:!0}),g.jsx(Qr,{label:"Task type",value:t.task_type.replace(/_/g," ")}),g.jsx(Qr,{label:"Requires 2 images",value:t.requires_two_images?"Yes":"No"}),g.jsx(Qr,{label:"Sensor hint",value:t.sensor_hint??"any"}),t.temporal_context&&g.jsx(Qr,{label:"Temporal context",value:t.temporal_context}),g.jsx(Qr,{label:"Extracted entities",value:t.extracted_entities.length>0?t.extracted_entities.join(", "):"(none detected)"}),g.jsx(Qr,{label:"Classification confidence",value:`${(t.confidence*100).toFixed(1)}%`})]})]}),g.jsx("style",{children:`
        .spec-toggle {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; background: none; border: none; cursor: pointer; padding: 0;
          color: var(--text-primary);
        }
        .toggle-arrow { color: var(--text-muted); font-size: 0.75rem; }
        .spec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
        @media (max-width: 600px) { .spec-grid { grid-template-columns: 1fr; } }
      `})]})}function Qr({label:t,value:e,highlight:n}){return g.jsxs("div",{className:"spec-row",children:[g.jsx("p",{className:"section-label",children:t}),g.jsx("p",{style:{color:n?"var(--text-accent)":"var(--text-primary)",fontSize:"0.88rem",fontWeight:n?600:400},children:e})]})}const VC=[{step:1,num:"01",title:"MISSION FINDING",subtitle:"Verified Intelligence & VLM Insights"},{step:2,num:"02",title:"OBSERVATIONS",subtitle:"Pre & Post Satellite Feeds"},{step:3,num:"03",title:"WHAT CHANGED?",subtitle:"Bi-Temporal Difference & Metrics"},{step:4,num:"04",title:"WHERE DID IT HAPPEN?",subtitle:"Spatial Footprint & ROI Grounding"},{step:5,num:"05",title:"WHY DO WE BELIEVE IT?",subtitle:"Evidence Fusion & Multi-Agent Verification"},{step:6,num:"06",title:"CONFIDENCE & PROVENANCE",subtitle:"6-Factor Radar & Execution Audit"}];function GC({response:t,requestMeta:e,onNewMission:n}){var x,y,m,h,_,M,b;const[i,r]=se.useState(1),s=se.useMemo(()=>t.agent_outputs.find(S=>S.agent_id==="change_detection_agent"||S.agent_id==="change_vqa_agent"),[t.agent_outputs]),a=se.useMemo(()=>{const S=[];return t.agent_outputs.forEach(E=>{E.evidence_regions&&E.evidence_regions.forEach(C=>{S.push({bbox:C.bbox,label:C.label||"Region of Interest",confidence:C.confidence||E.raw_score,agentName:E.agent_name})})}),S},[t.agent_outputs]),o=t.verifier_result,l=t.earthquery_spec,c=t.semantic_interpretation,u=e==null?void 0:e.prePreview,f=e==null?void 0:e.postPreview,d=()=>{i<6&&r(S=>S+1)},p=()=>{i>1&&r(S=>S-1)};return g.jsxs("div",{className:"mission-workflow-container fade-in",id:"mission-results-workflow",children:[g.jsxs("header",{className:"mission-workflow-header",children:[g.jsxs("div",{className:"mission-workflow-topbar",children:[g.jsxs("div",{className:"mission-id-badge",children:[g.jsx("span",{className:"live-indicator"}),g.jsxs("span",{children:["MISSION ID: ",g.jsx("strong",{className:"text-mono text-accent",children:t.query_id})]})]}),g.jsxs("div",{className:"mission-top-actions",children:[g.jsx("span",{className:"task-type-pill",children:l.task_type.toUpperCase().replace(/_/g," ")}),g.jsxs("button",{type:"button",className:"btn btn-secondary btn-sm new-mission-btn",onClick:n,title:"Return to setup and start a new mission",children:[g.jsx("span",{children:"↺"}),g.jsx("span",{children:"NEW MISSION"})]})]})]}),g.jsx("nav",{className:"mission-stepper-hud","aria-label":"Mission step navigation",children:VC.map(S=>{const E=i===S.step,C=i>S.step;return g.jsxs("button",{type:"button",className:`step-pill-btn ${E?"active":""} ${C?"completed":""}`,onClick:()=>r(S.step),title:`Jump to Step ${S.step}: ${S.title}`,children:[g.jsx("div",{className:"step-num-circle",children:C?"✓":S.num}),g.jsxs("div",{className:"step-text-wrap",children:[g.jsx("span",{className:"step-hud-title",children:S.title}),g.jsx("span",{className:"step-hud-sub",children:S.subtitle})]})]},S.step)})})]}),g.jsxs("main",{className:"mission-step-viewport",children:[i===1&&g.jsxs("section",{className:"mission-step-view fade-in-up",id:"step-finding",children:[g.jsxs("div",{className:"step-view-header",children:[g.jsx("span",{className:"step-number-tag",children:"STEP 01 / 06"}),g.jsx("h2",{className:"step-view-title",children:"Mission Finding"}),g.jsx("p",{className:"step-view-desc",children:"High-confidence synthesized intelligence report, natural language findings, and actionable insights."})]}),g.jsxs("div",{className:"card answer-payoff-card mb-4",id:"primary-finding-card",children:[g.jsxs("div",{className:"answer-card-top",children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("span",{className:"payoff-badge-icon",children:"💡"}),g.jsxs("div",{children:[g.jsx("span",{className:"payoff-label",children:"SYNTHESIZED INTELLIGENCE FINDING"}),g.jsx("h3",{className:"payoff-title",children:"Verified Answer"})]})]}),g.jsx("span",{className:"badge badge-cyan",children:"Ground-Truth Verified"})]}),g.jsx("div",{className:"payoff-answer-content",children:g.jsx("p",{className:"answer-primary-text",children:t.answer})}),g.jsxs("div",{className:"payoff-footer",children:[g.jsx("a",{href:t.report_url,download:!0,className:"btn btn-primary btn-sm download-pdf-btn",id:"download-report-btn",target:"_blank",rel:"noopener noreferrer",children:"📄 Download Comprehensive PDF Report"}),g.jsxs("span",{className:"text-xs text-muted",children:["Trace ID: ",g.jsx("code",{className:"text-mono",children:t.execution_trace.trace_id})]})]})]}),c&&g.jsxs("div",{className:"vlm-reasoning-card card mb-4",children:[g.jsxs("div",{className:"flex items-center justify-between mb-3",children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("span",{style:{fontSize:"1.2rem"},children:"🧠"}),g.jsxs("div",{children:[g.jsx("p",{className:"section-label",style:{margin:0},children:"Multimodal Semantic Reasoner (VLM)"}),g.jsxs("span",{className:"text-xs text-muted",children:["Model: ",c.model_name," · Mode: ",c.reasoning_mode]})]})]}),g.jsx("span",{className:"badge badge-purple",children:"Structured Reasoning"})]}),c.observations&&c.observations.length>0&&g.jsxs("div",{className:"vlm-section mb-3",children:[g.jsx("span",{className:"vlm-section-title",children:"Key Scene Observations:"}),g.jsx("ul",{className:"vlm-bullet-list",children:c.observations.map((S,E)=>g.jsx("li",{children:S},E))})]}),c.interpretation&&c.interpretation.length>0&&g.jsxs("div",{className:"vlm-section mb-3",children:[g.jsx("span",{className:"vlm-section-title",children:"Semantic Interpretation:"}),g.jsx("ul",{className:"vlm-bullet-list",children:c.interpretation.map((S,E)=>g.jsx("li",{children:S},E))})]}),c.uncertainties&&c.uncertainties.length>0&&g.jsxs("div",{className:"vlm-uncertainty-box",children:[g.jsx("span",{className:"text-xs text-warning font-bold",children:"Uncertainties & Sensor Limitations:"}),g.jsx("ul",{className:"vlm-bullet-list text-muted",children:c.uncertainties.map((S,E)=>g.jsx("li",{className:"text-xs",children:S},E))})]})]})]}),i===2&&g.jsxs("section",{className:"mission-step-view fade-in-up",id:"step-observations",children:[g.jsxs("div",{className:"step-view-header",children:[g.jsx("span",{className:"step-number-tag",children:"STEP 02 / 06"}),g.jsx("h2",{className:"step-view-title",children:"Primary Observations"}),g.jsx("p",{className:"step-view-desc",children:"Raw multispectral or SAR observation frames captured across target timestamps."})]}),g.jsxs("div",{className:"observations-display-grid",children:[g.jsxs("div",{className:"observation-frame-card frame-pre",children:[g.jsxs("div",{className:"frame-card-bar",children:[g.jsx("span",{className:"frame-tag tag-cyan",children:"T₁ · PRE OBSERVATION"}),(e==null?void 0:e.preName)&&g.jsxs("span",{className:"frame-filename",children:["📄 ",e.preName]})]}),g.jsx("div",{className:"frame-image-container",children:u?g.jsx("img",{src:u,alt:"Pre observation",className:"observation-img"}):g.jsx(Fs,{icon:"🛰",label:"Baseline Satellite Scan Active",sub:"Sentinel-2 Optical / SAR Reference Feed Locked"})})]}),g.jsxs("div",{className:"observation-frame-card frame-post",children:[g.jsxs("div",{className:"frame-card-bar",children:[g.jsx("span",{className:"frame-tag tag-purple",children:"T₂ · POST OBSERVATION"}),(e==null?void 0:e.postName)&&g.jsxs("span",{className:"frame-filename",children:["📄 ",e.postName]})]}),g.jsx("div",{className:"frame-image-container",children:f?g.jsx("img",{src:f,alt:"Post observation",className:"observation-img"}):g.jsx(Fs,{icon:"🌍",label:"Target Scene Observation Active",sub:"Surface Telemetry Captured via Copilot Engine"})})]})]}),g.jsx("div",{className:"step-meta-deck",children:g.jsx(HC,{spec:l})})]}),i===3&&g.jsxs("section",{className:"mission-step-view fade-in-up",id:"step-change",children:[g.jsxs("div",{className:"step-view-header",children:[g.jsx("span",{className:"step-number-tag",children:"STEP 03 / 06"}),g.jsx("h2",{className:"step-view-title",children:"What Changed?"}),g.jsx("p",{className:"step-view-desc",children:"Bi-temporal differential analysis, pixel mask transitions, and change magnitude."})]}),g.jsx("div",{className:"change-visual-stage",children:g.jsxs("div",{className:"change-triptych",children:[g.jsxs("div",{className:"triptych-card",children:[g.jsx("div",{className:"triptych-header",children:g.jsx("span",{className:"triptych-tag tag-cyan",children:"T₁ Baseline"})}),g.jsx("div",{className:"triptych-body",children:u?g.jsx("img",{src:u,alt:"T1 Baseline"}):g.jsx(Fs,{icon:"🛰",label:"T₁ Baseline Scene",sub:"Optical Baseline"})})]}),g.jsxs("div",{className:"triptych-card change-focus-card",children:[g.jsxs("div",{className:"triptych-header",children:[g.jsx("span",{className:"triptych-tag tag-amber",children:"Δt Change Dynamics"}),s&&g.jsx("span",{className:"change-model-pill",children:"ChangeFormer / Fusion"})]}),g.jsx("div",{className:"triptych-body change-overlay-wrap",children:f?g.jsxs("div",{className:"diff-composite-container",children:[g.jsx("img",{src:f,alt:"Change target",className:"base-post-layer"}),g.jsx("div",{className:"diff-highlight-overlay"}),g.jsx("div",{className:"diff-badge-indicator",children:g.jsx("span",{children:"🔍 Δt Detections Active"})})]}):g.jsx(Fs,{icon:"🔄",label:"Bi-Temporal Change Inferred",sub:"Differential Map Active"})})]}),g.jsxs("div",{className:"triptych-card",children:[g.jsx("div",{className:"triptych-header",children:g.jsx("span",{className:"triptych-tag tag-purple",children:"T₂ Target"})}),g.jsx("div",{className:"triptych-body",children:f?g.jsx("img",{src:f,alt:"T2 Target"}):g.jsx(Fs,{icon:"🌍",label:"T₂ Target Scene",sub:"Post-Event Analysis"})})]})]})}),g.jsxs("div",{className:"change-metrics-deck",children:[g.jsxs("div",{className:"metric-card",children:[g.jsx("span",{className:"metric-icon",children:"🔄"}),g.jsxs("div",{className:"metric-data",children:[g.jsx("span",{className:"metric-label",children:"Identified Task / Change Type"}),g.jsx("span",{className:"metric-value text-accent",children:(x=s==null?void 0:s.result)!=null&&x.change_type?String(s.result.change_type):l.task_type.replace(/_/g," ").toUpperCase()})]})]}),((y=s==null?void 0:s.result)==null?void 0:y.changed_area_km2)!==void 0&&g.jsxs("div",{className:"metric-card",children:[g.jsx("span",{className:"metric-icon",children:"📐"}),g.jsxs("div",{className:"metric-data",children:[g.jsx("span",{className:"metric-label",children:"Changed Area"}),g.jsxs("span",{className:"metric-value",children:[String(s.result.changed_area_km2)," km²"]})]})]}),((m=s==null?void 0:s.result)==null?void 0:m.change_percent)!==void 0&&g.jsxs("div",{className:"metric-card",children:[g.jsx("span",{className:"metric-icon",children:"📊"}),g.jsxs("div",{className:"metric-data",children:[g.jsx("span",{className:"metric-label",children:"Change Extent"}),g.jsxs("span",{className:"metric-value",children:[String(s.result.change_percent),"%"]})]})]}),!!((h=s==null?void 0:s.result)!=null&&h.severity)&&g.jsxs("div",{className:"metric-card",children:[g.jsx("span",{className:"metric-icon",children:"⚡"}),g.jsxs("div",{className:"metric-data",children:[g.jsx("span",{className:"metric-label",children:"Severity Level"}),g.jsx("span",{className:"metric-value text-warning",children:String((_=s==null?void 0:s.result)==null?void 0:_.severity).toUpperCase()})]})]})]}),!!((M=s==null?void 0:s.result)!=null&&M.change_map_description)&&g.jsxs("div",{className:"card mt-3",children:[g.jsx("p",{className:"section-label",children:"Spatial & Spectral Change Summary"}),g.jsx("p",{className:"text-sm",style:{color:"var(--text-secondary)"},children:String((b=s==null?void 0:s.result)==null?void 0:b.change_map_description)})]})]}),i===4&&g.jsxs("section",{className:"mission-step-view fade-in-up",id:"step-spatial",children:[g.jsxs("div",{className:"step-view-header",children:[g.jsx("span",{className:"step-number-tag",children:"STEP 04 / 06"}),g.jsx("h2",{className:"step-view-title",children:"Where Did It Happen?"}),g.jsx("p",{className:"step-view-desc",children:"Spatial bounding boxes, marked ROI contours, and geographical ground truth."})]}),g.jsxs("div",{className:"spatial-inspection-stage",children:[g.jsxs("div",{className:"spatial-canvas-card",children:[g.jsxs("div",{className:"spatial-card-header",children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("span",{className:"frame-tag tag-purple",children:"Spatial Evidence Regions"}),g.jsxs("span",{className:"text-xs text-muted",children:["(",a.length," Detected Regions)"]})]}),a.length>0&&g.jsx("span",{className:"badge badge-cyan",children:"Visual Grounding Active"})]}),g.jsx("div",{className:"spatial-viewport",children:f||u?g.jsxs("div",{className:"spatial-image-wrapper",children:[g.jsx("img",{src:f||u,alt:"Spatial Inspection",className:"spatial-bg-image"}),a.map((S,E)=>{const[C,v,A,R]=S.bbox,N=`${C*100}%`,L=`${v*100}%`,B=`${(R-v)*100}%`,D=`${(A-C)*100}%`;return g.jsx("div",{className:"evidence-bbox",style:{top:N,left:L,width:B,height:D},children:g.jsxs("span",{className:"bbox-tag",children:[S.label," (",Math.round(S.confidence*100),"%)"]})},E)})]}):g.jsx(Fs,{icon:"📍",label:"Spatial Footprint & Geo Telemetry Locked",sub:"Full Target Scene Grounded Globally"})})]}),g.jsxs("div",{className:"spatial-data-sidebar card",children:[g.jsx("p",{className:"section-label",children:"📌 Grounded Evidence Regions"}),a.length>0?g.jsx("div",{className:"spatial-regions-scroll",children:a.map((S,E)=>g.jsxs("div",{className:"region-item-row",children:[g.jsxs("div",{className:"region-item-left",children:[g.jsxs("span",{className:"region-index",children:["#",E+1]}),g.jsxs("div",{children:[g.jsx("span",{className:"region-title",children:S.label}),g.jsx("span",{className:"region-agent-sub",children:S.agentName})]})]}),g.jsxs("span",{className:"badge badge-blue",children:[(S.confidence*100).toFixed(0),"% Match"]})]},E))}):g.jsx("p",{className:"text-xs text-muted",style:{padding:"1rem 0"},children:"No discrete bounding boxes specified in this query; full scene processed globally."}),t.agent_outputs.some(S=>{var E;return((E=S.result)==null?void 0:E.num_objects_detected)!==void 0})&&g.jsxs("div",{className:"spatial-stat-card mt-3",children:[g.jsx("span",{className:"section-label",children:"Identified Features"}),t.agent_outputs.map(S=>{var E;return((E=S.result)==null?void 0:E.num_objects_detected)!==void 0?g.jsxs("div",{className:"flex items-center justify-between text-sm mt-1",children:[g.jsxs("span",{style:{color:"var(--text-secondary)"},children:[S.agent_name,":"]}),g.jsxs("strong",{style:{color:"var(--accent-primary)"},children:[String(S.result.num_objects_detected)," objects"]})]},S.agent_id):null})]})]})]})]}),i===5&&g.jsxs("section",{className:"mission-step-view fade-in-up",id:"step-evidence",children:[g.jsxs("div",{className:"step-view-header",children:[g.jsx("span",{className:"step-number-tag",children:"STEP 05 / 06"}),g.jsx("h2",{className:"step-view-title",children:"Why Do We Believe It?"}),g.jsx("p",{className:"step-view-desc",children:"Multi-agent cross-verification, specialist consensus, sensor selection, and conflict resolution."})]}),g.jsxs("div",{className:`card verifier-decision-card mb-4 ${o.agreement?"verifier-success":"verifier-warning"}`,children:[g.jsxs("div",{className:"flex items-center justify-between flex-wrap gap-2 mb-2",children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("span",{className:"verifier-status-icon",children:o.agreement?"✅":o.replanned?"🔄":"⚠"}),g.jsxs("div",{children:[g.jsx("h3",{className:"verifier-status-title",children:o.agreement?"Multi-Agent Consensus Verified":o.replanned?"Autonomous Re-Planning Executed":"Conflicts Detected"}),g.jsx("p",{className:"verifier-status-desc",children:o.agreement?"All specialist vision and reasoning agents achieved unanimous consensus on ground evidence.":"Discrepancies identified and resolved through cross-modal arbitration."})]})]}),g.jsx("span",{className:`badge ${o.agreement?"badge-green":"badge-amber"}`,children:o.agreement?"Consensus 100%":"Arbitrated"})]}),o.conflicts_found.length>0&&g.jsxs("div",{className:"conflicts-box mt-2",children:[g.jsx("span",{className:"text-xs text-warning font-bold",children:"Resolved Conflicts:"}),g.jsx("ul",{className:"conflict-list",children:o.conflicts_found.map((S,E)=>g.jsxs("li",{className:"text-xs text-warning",children:["⚠ ",S]},E))})]})]}),g.jsx("div",{className:"mb-4",children:g.jsx(OC,{sensor:t.sensor_selection})}),g.jsxs("div",{className:"card",children:[g.jsxs("p",{className:"section-label mb-3",children:["🤖 Specialist Agent Invocations (",t.agent_outputs.length,")"]}),g.jsx("div",{className:"agent-list-stack",children:t.agent_outputs.map((S,E)=>g.jsx(kC,{output:S,index:E},S.agent_id))})]})]}),i===6&&g.jsxs("section",{className:"mission-step-view fade-in-up",id:"step-confidence",children:[g.jsxs("div",{className:"step-view-header",children:[g.jsx("span",{className:"step-number-tag",children:"STEP 06 / 06"}),g.jsx("h2",{className:"step-view-title",children:"Confidence & Provenance"}),g.jsx("p",{className:"step-view-desc",children:"Mathematical transparency, 6-component confidence breakdown, and end-to-end auditable execution trace."})]}),g.jsxs("div",{className:"trust-grid",children:[g.jsx("div",{className:"trust-col",children:g.jsx(NC,{breakdown:t.confidence_breakdown})}),g.jsx("div",{className:"trust-col",children:g.jsx(LC,{trace:t.execution_trace})})]})]})]}),g.jsxs("footer",{className:"mission-navigation-footer",children:[g.jsxs("button",{type:"button",className:"btn btn-secondary btn-nav-back",onClick:p,disabled:i===1,children:[g.jsx("span",{children:"←"}),g.jsx("span",{children:"BACK"})]}),g.jsxs("div",{className:"mission-progress-indicator",children:[g.jsxs("span",{children:["STEP ",i," OF 6"]}),g.jsx("div",{className:"progress-dots",children:[1,2,3,4,5,6].map(S=>g.jsx("span",{className:`p-dot ${S===i?"active":""} ${S<i?"done":""}`,onClick:()=>r(S)},S))})]}),i<6?g.jsxs("button",{type:"button",className:"btn btn-primary btn-nav-continue",onClick:d,children:[g.jsxs("span",{children:["CONTINUE TO STEP ",i+1]}),g.jsx("span",{children:"→"})]}):g.jsxs("button",{type:"button",className:"btn btn-primary btn-nav-continue new-mission-cta",onClick:n,children:[g.jsx("span",{children:"START NEW MISSION"}),g.jsx("span",{children:"↺"})]})]}),g.jsx("style",{children:`
        .mission-workflow-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.5rem 2rem 5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .mission-workflow-header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .mission-workflow-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 12px;
          backdrop-filter: blur(12px);
        }
        .mission-id-badge {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: #94a3b8;
        }
        .live-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
        }
        .mission-top-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .task-type-pill {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          padding: 3px 10px;
          border-radius: 999px;
          letter-spacing: 0.05em;
        }
        .new-mission-btn {
          font-size: 0.74rem;
          font-weight: 700;
          padding: 4px 12px;
        }

        /* HUD Stepper */
        .mission-stepper-hud {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0.6rem;
        }
        .step-pill-btn {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 0.65rem 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          outline: none;
        }
        .step-pill-btn:hover {
          background: rgba(56, 189, 248, 0.08);
          border-color: rgba(56, 189, 248, 0.3);
        }
        .step-pill-btn.active {
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.22), rgba(99, 102, 241, 0.25));
          border-color: #38bdf8;
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.25);
        }
        .step-pill-btn.completed {
          border-color: rgba(16, 185, 129, 0.35);
        }
        .step-num-circle {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-secondary);
          flex-shrink: 0;
        }
        .step-pill-btn.active .step-num-circle {
          background: #38bdf8;
          color: #030712;
          border-color: #38bdf8;
          box-shadow: 0 0 10px #38bdf8;
        }
        .step-pill-btn.completed .step-num-circle {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10b981;
          color: #10b981;
        }
        .step-text-wrap {
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
        }
        .step-hud-title {
          font-size: 0.76rem;
          font-weight: 700;
          color: #f1f5f9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .step-hud-sub {
          font-size: 0.65rem;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .step-pill-btn.active .step-hud-title { color: #38bdf8; }

        /* Step View common */
        .mission-step-viewport {
          min-height: 520px;
        }
        .mission-step-view {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .step-view-header {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .step-number-tag {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #38bdf8;
        }
        .step-view-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }
        .step-view-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Step 1: Finding */
        .answer-payoff-card {
          padding: 2rem 2.5rem;
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(8, 14, 28, 0.98));
          border: 1.5px solid rgba(56, 189, 248, 0.4);
          border-left: 5px solid #38bdf8;
          box-shadow: 0 25px 60px -10px rgba(0,0,0,0.85), 0 0 45px rgba(56, 189, 248, 0.2);
          border-radius: 16px;
        }
        .answer-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .payoff-badge-icon { font-size: 1.8rem; }
        .payoff-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #38bdf8;
          display: block;
        }
        .payoff-title { font-size: 1.3rem; font-weight: 800; color: #ffffff; margin: 0; }
        .payoff-answer-content {
          margin: 1.25rem 0 1.75rem;
          padding: 1.25rem 1.5rem;
          background: rgba(3, 7, 18, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
        .answer-primary-text {
          font-size: 1.12rem;
          line-height: 1.8;
          color: #f8fafc;
          font-weight: 500;
          white-space: pre-wrap;
          margin: 0;
        }
        .payoff-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .download-pdf-btn {
          padding: 0.65rem 1.4rem;
          font-weight: 700;
          font-size: 0.85rem;
        }
        .vlm-reasoning-card {
          border-color: rgba(168, 85, 247, 0.3);
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.85), rgba(8, 14, 28, 0.95));
        }
        .vlm-section-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: #d8b4fe;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.4rem;
        }
        .vlm-bullet-list {
          padding-left: 1.25rem;
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .vlm-uncertainty-box {
          margin-top: 0.75rem;
          padding: 0.65rem 1rem;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.25);
          border-radius: 8px;
        }

        /* Step 2: Observations */
        .observations-display-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .observation-frame-card {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 420px;
        }
        .frame-pre { border-color: rgba(6, 182, 212, 0.35); }
        .frame-post { border-color: rgba(168, 85, 247, 0.35); }
        .frame-card-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.1rem;
          background: rgba(0, 0, 0, 0.45);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .frame-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 10px;
          border-radius: 999px;
        }
        .tag-cyan { background: rgba(6, 182, 212, 0.15); color: #67e8f9; border: 1px solid rgba(6, 182, 212, 0.4); }
        .tag-purple { background: rgba(168, 85, 247, 0.15); color: #d8b4fe; border: 1px solid rgba(168, 85, 247, 0.4); }
        .tag-amber { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }
        .frame-filename {
          font-size: 0.72rem;
          color: var(--text-muted);
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .frame-image-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #030712;
          overflow: hidden;
          position: relative;
        }
        .observation-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          max-height: 480px;
        }

        /* Step 3: Change */
        .change-triptych {
          display: grid;
          grid-template-columns: 1fr 1.3fr 1fr;
          gap: 1rem;
          align-items: stretch;
        }
        .triptych-card {
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 340px;
        }
        .change-focus-card {
          border-color: rgba(245, 158, 11, 0.5);
          box-shadow: 0 0 35px rgba(245, 158, 11, 0.15);
        }
        .triptych-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 1rem;
          background: rgba(0, 0, 0, 0.5);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .triptych-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 999px;
        }
        .change-model-pill {
          font-size: 0.68rem;
          color: #fbbf24;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 1px 7px;
          border-radius: 4px;
        }
        .triptych-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #030712;
          overflow: hidden;
          position: relative;
        }
        .triptych-body img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          max-height: 380px;
        }
        .diff-composite-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .diff-highlight-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.25) 0%, transparent 70%);
          mix-blend-mode: color-dodge;
          pointer-events: none;
        }
        .diff-badge-indicator {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.75);
          border: 1px solid rgba(245, 158, 11, 0.5);
          color: #fbbf24;
          padding: 3px 12px;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 600;
          backdrop-filter: blur(8px);
        }
        .change-metrics-deck {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        .metric-card {
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .metric-icon { font-size: 1.6rem; }
        .metric-data { display: flex; flex-direction: column; gap: 0.2rem; }
        .metric-label { font-size: 0.72rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; }
        .metric-value { font-size: 1.15rem; font-weight: 800; color: #f8fafc; }

        /* Step 4: Spatial */
        .spatial-inspection-stage {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 1.5rem;
          align-items: start;
        }
        .spatial-canvas-card {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .spatial-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          background: rgba(0, 0, 0, 0.45);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .spatial-viewport {
          position: relative;
          background: #030712;
          min-height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .spatial-image-wrapper {
          position: relative;
          display: inline-block;
          max-width: 100%;
          max-height: 520px;
        }
        .spatial-bg-image {
          display: block;
          max-width: 100%;
          max-height: 520px;
          object-fit: contain;
        }
        .evidence-bbox {
          position: absolute;
          border: 2px solid #38bdf8;
          background: rgba(56, 189, 248, 0.15);
          border-radius: 4px;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.5);
          pointer-events: none;
        }
        .bbox-tag {
          position: absolute;
          top: -22px;
          left: 0;
          background: #0284c7;
          color: #fff;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 3px;
          white-space: nowrap;
        }
        .spatial-data-sidebar {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .spatial-regions-scroll {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 360px;
          overflow-y: auto;
        }
        .region-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.55rem 0.75rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
        }
        .region-item-left { display: flex; align-items: center; gap: 0.6rem; }
        .region-index { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); }
        .region-title { font-size: 0.78rem; font-weight: 600; color: #f1f5f9; display: block; }
        .region-agent-sub { font-size: 0.65rem; color: var(--text-muted); display: block; }
        .spatial-stat-card {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 0.75rem;
        }

        /* Step 5: Evidence */
        .verifier-decision-card {
          border-left: 4px solid;
        }
        .verifier-success {
          border-left-color: #10b981;
          background: linear-gradient(145deg, rgba(6, 78, 59, 0.25), rgba(15, 23, 42, 0.85));
        }
        .verifier-warning {
          border-left-color: #f59e0b;
          background: linear-gradient(145deg, rgba(120, 53, 15, 0.25), rgba(15, 23, 42, 0.85));
        }
        .verifier-status-icon { font-size: 1.8rem; }
        .verifier-status-title { font-size: 1.05rem; font-weight: 700; color: #f8fafc; margin: 0; }
        .verifier-status-desc { font-size: 0.8rem; color: var(--text-secondary); margin: 0; }
        .conflicts-box {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
          padding: 0.5rem 0.75rem;
        }
        .conflict-list { padding-left: 1rem; margin-top: 0.25rem; }
        .agent-list-stack { display: flex; flex-direction: column; gap: 0.85rem; }

        /* Step 6: Trust */
        .trust-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        .trust-col { min-width: 0; }

        /* Navigation Footer */
        .mission-navigation-footer {
          position: sticky;
          bottom: 1.5rem;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.75rem;
          background: rgba(15, 23, 42, 0.88);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.8), 0 0 25px rgba(56, 189, 248, 0.15);
        }
        .btn-nav-back, .btn-nav-continue {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.04em;
          padding: 0.65rem 1.4rem;
          border-radius: 10px;
        }
        .new-mission-cta {
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
        }
        .mission-progress-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .progress-dots {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .p-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .p-dot.done { background: #10b981; }
        .p-dot.active {
          width: 22px;
          border-radius: 4px;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
        }

        @media (max-width: 1100px) {
          .mission-stepper-hud { grid-template-columns: repeat(3, 1fr); }
          .observations-display-grid { grid-template-columns: 1fr; }
          .change-triptych { grid-template-columns: 1fr; }
          .spatial-inspection-stage { grid-template-columns: 1fr; }
          .trust-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 700px) {
          .mission-stepper-hud { grid-template-columns: repeat(2, 1fr); }
          .mission-workflow-container { padding: 1rem 0.75rem 4rem; }
          .mission-navigation-footer { padding: 0.75rem 1rem; }
          .btn-nav-back, .btn-nav-continue { font-size: 0.75rem; padding: 0.5rem 1rem; }
        }
      `})]})}function Fs({icon:t,label:e,sub:n}){return g.jsxs("div",{className:"radar-placeholder-wrap",children:[g.jsx("div",{className:"radar-grid-backdrop"}),g.jsx("div",{className:"radar-sweep-beam"}),g.jsxs("div",{className:"radar-target-reticle",children:[g.jsx("div",{className:"reticle-circle reticle-1"}),g.jsx("div",{className:"reticle-circle reticle-2"}),g.jsx("div",{className:"reticle-crosshair-h"}),g.jsx("div",{className:"reticle-crosshair-v"}),g.jsx("span",{className:"radar-center-icon",children:t})]}),g.jsxs("div",{className:"radar-telemetry-text",children:[g.jsx("span",{className:"radar-main-label",children:e}),g.jsx("span",{className:"radar-sub-label",children:n}),g.jsxs("div",{className:"radar-coords-strip",children:[g.jsx("span",{children:"LAT: 28.6139° N"}),g.jsx("span",{children:"·"}),g.jsx("span",{children:"LON: 77.2090° E"}),g.jsx("span",{children:"·"}),g.jsx("span",{children:"ALT: 786 KM"})]})]}),g.jsx("style",{children:`
        .radar-placeholder-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 380px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.12) 0%, rgba(3, 7, 18, 0.95) 75%);
          padding: 2rem;
        }
        .radar-grid-backdrop {
          position: absolute;
          inset: 0;
          background-size: 32px 32px;
          background-image:
            linear-gradient(to right, rgba(56, 189, 248, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.07) 1px, transparent 1px);
          pointer-events: none;
        }
        .radar-sweep-beam {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: conic-gradient(from 0deg at 50% 50%, rgba(56, 189, 248, 0.25) 0deg, transparent 90deg, transparent 360deg);
          animation: radarSweep 4s linear infinite;
          pointer-events: none;
        }
        .radar-target-reticle {
          position: relative;
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          z-index: 2;
        }
        .reticle-circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(56, 189, 248, 0.4);
        }
        .reticle-1 { width: 140px; height: 140px; border-style: dashed; animation: spin 20s linear infinite; }
        .reticle-2 { width: 85px; height: 85px; border-color: rgba(168, 85, 247, 0.4); }
        .reticle-crosshair-h { position: absolute; width: 100%; height: 1px; background: rgba(56, 189, 248, 0.35); }
        .reticle-crosshair-v { position: absolute; height: 100%; width: 1px; background: rgba(56, 189, 248, 0.35); }
        .radar-center-icon {
          font-size: 2.2rem;
          line-height: 1;
          filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.7));
          z-index: 3;
        }
        .radar-telemetry-text {
          position: relative;
          z-index: 2;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
        }
        .radar-main-label {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: #f1f5f9;
        }
        .radar-sub-label {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }
        .radar-coords-strip {
          margin-top: 0.4rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 3px 10px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(56, 189, 248, 0.25);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: #38bdf8;
          letter-spacing: 0.05em;
        }
        @keyframes radarSweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qm="186",WC=0,a_=1,jC=2,Wc=1,XC=2,_o=3,Ts=0,un=1,li=2,Ji=0,Fo=1,Uo=2,o_=3,l_=4,$C=5,Zs=100,YC=101,qC=102,KC=103,ZC=104,QC=200,JC=201,eR=202,tR=203,vS=204,yS=205,nR=206,iR=207,rR=208,sR=209,aR=210,oR=211,lR=212,cR=213,uR=214,Yh=0,qh=1,Kh=2,sl=3,Zh=4,Qh=5,Jh=6,ep=7,bS=0,dR=1,fR=2,Ni=0,SS=1,MS=2,wS=3,Jm=4,ES=5,TS=6,AS=7,CS=300,As=301,ka=302,rf=303,sf=304,cd=306,Iu=1e3,Ti=1001,tp=1002,Qt=1003,hR=1004,tc=1005,cn=1006,af=1007,hs=1008,Dn=1009,RS=1010,PS=1011,al=1012,eg=1013,Di=1014,Ai=1015,Ii=1016,tg=1017,ng=1018,ol=1020,NS=35902,LS=35899,DS=1021,IS=1022,ui=1023,sr=1026,ps=1027,kS=1028,ig=1029,Cs=1030,rg=1031,sg=1033,jc=33776,Xc=33777,$c=33778,Yc=33779,np=35840,ip=35841,rp=35842,sp=35843,ap=36196,op=37492,lp=37496,cp=37488,up=37489,ku=37490,dp=37491,fp=37808,hp=37809,pp=37810,mp=37811,gp=37812,xp=37813,_p=37814,vp=37815,yp=37816,bp=37817,Sp=37818,Mp=37819,wp=37820,Ep=37821,Tp=36492,Ap=36494,Cp=36495,Rp=36283,Pp=36284,Fu=36285,Np=36286,pR=3200,Lp=0,mR=1,wr="",Wn="srgb",Uu="srgb-linear",Ou="linear",ut="srgb",of=7680,gR=519,xR=512,_R=513,vR=514,ag=515,yR=516,bR=517,og=518,SR=519,MR=35044,c_="300 es",Ci=2e3,ll=2001;function wR(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function zu(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function ER(){const t=zu("canvas");return t.style.display="block",t}const u_={};function d_(...t){const e="THREE."+t.shift();console.log(e,...t)}function FS(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function ze(...t){t=FS(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function it(...t){t=FS(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function Ma(...t){const e=t.join(" ");e in u_||(u_[e]=!0,ze(...t))}function TR(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const AR={[Yh]:qh,[Kh]:Jh,[Zh]:ep,[sl]:Qh,[qh]:Yh,[Jh]:Kh,[ep]:Zh,[Qh]:sl};class Ns{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],lf=Math.PI/180,Dp=180/Math.PI;function _l(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(an[t&255]+an[t>>8&255]+an[t>>16&255]+an[t>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[n&63|128]+an[n>>8&255]+"-"+an[n>>16&255]+an[n>>24&255]+an[i&255]+an[i>>8&255]+an[i>>16&255]+an[i>>24&255]).toLowerCase()}function qe(t,e,n){return Math.max(e,Math.min(n,t))}function CR(t,e){return(t%e+e)%e}function cf(t,e,n){return(1-n)*t+n*e}function no(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:case Uint8ClampedArray:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function bn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const vg=class vg{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=qe(this.x,e.x,n.x),this.y=qe(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=qe(this.x,e,n),this.y=qe(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};vg.prototype.isVector2=!0;let Ze=vg;class Ba{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3],d=s[a+0],p=s[a+1],x=s[a+2],y=s[a+3];if(f!==y||l!==d||c!==p||u!==x){let m=l*d+c*p+u*x+f*y;m<0&&(d=-d,p=-p,x=-x,y=-y,m=-m);let h=1-o;if(m<.9995){const _=Math.acos(m),M=Math.sin(_);h=Math.sin(h*_)/M,o=Math.sin(o*_)/M,l=l*h+d*o,c=c*h+p*o,u=u*h+x*o,f=f*h+y*o}else{l=l*h+d*o,c=c*h+p*o,u=u*h+x*o,f=f*h+y*o;const _=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=_,c*=_,u*=_,f*=_}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[a],d=s[a+1],p=s[a+2],x=s[a+3];return e[n]=o*x+u*f+l*p-c*d,e[n+1]=l*x+u*d+c*f-o*p,e[n+2]=c*x+u*p+o*d-l*f,e[n+3]=u*x-o*f-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),f=o(s/2),d=l(i/2),p=l(r/2),x=l(s/2);switch(a){case"XYZ":this._x=d*u*f+c*p*x,this._y=c*p*f-d*u*x,this._z=c*u*x+d*p*f,this._w=c*u*f-d*p*x;break;case"YXZ":this._x=d*u*f+c*p*x,this._y=c*p*f-d*u*x,this._z=c*u*x-d*p*f,this._w=c*u*f+d*p*x;break;case"ZXY":this._x=d*u*f-c*p*x,this._y=c*p*f+d*u*x,this._z=c*u*x+d*p*f,this._w=c*u*f-d*p*x;break;case"ZYX":this._x=d*u*f-c*p*x,this._y=c*p*f+d*u*x,this._z=c*u*x-d*p*f,this._w=c*u*f+d*p*x;break;case"YZX":this._x=d*u*f+c*p*x,this._y=c*p*f+d*u*x,this._z=c*u*x-d*p*f,this._w=c*u*f-d*p*x;break;case"XZY":this._x=d*u*f-c*p*x,this._y=c*p*f-d*u*x,this._z=c*u*x+d*p*f,this._w=c*u*f+d*p*x;break;default:ze("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],c=n[2],u=n[6],f=n[10],d=i+o+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,n=Math.sin(n*c)/u,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const yg=class yg{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(f_.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(f_.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*n-s*r),f=2*(s*i-a*n);return this.x=n+l*c+a*f-o*u,this.y=i+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=qe(this.x,e.x,n.x),this.y=qe(this.y,e.y,n.y),this.z=qe(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=qe(this.x,e,n),this.y=qe(this.y,e,n),this.z=qe(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return uf.copy(this).projectOnVector(e),this.sub(uf)}reflect(e){return this.sub(uf.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};yg.prototype.isVector3=!0;let $=yg;const uf=new $,f_=new Ba,bg=class bg{constructor(e,n,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c)}set(e,n,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],d=i[2],p=i[5],x=i[8],y=r[0],m=r[3],h=r[6],_=r[1],M=r[4],b=r[7],S=r[2],E=r[5],C=r[8];return s[0]=a*y+o*_+l*S,s[3]=a*m+o*M+l*E,s[6]=a*h+o*b+l*C,s[1]=c*y+u*_+f*S,s[4]=c*m+u*M+f*E,s[7]=c*h+u*b+f*C,s[2]=d*y+p*_+x*S,s[5]=d*m+p*M+x*E,s[8]=d*h+p*b+x*C,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return n*a*u-n*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,d=o*l-u*s,p=c*s-a*l,x=n*f+i*d+r*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/x;return e[0]=f*y,e[1]=(r*c-u*i)*y,e[2]=(o*i-r*a)*y,e[3]=d*y,e[4]=(u*n-r*l)*y,e[5]=(r*s-o*n)*y,e[6]=p*y,e[7]=(i*l-c*n)*y,e[8]=(a*n-i*s)*y,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+n,0,0,1),this}scale(e,n){return Ma("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(df.makeScale(e,n)),this}rotate(e){return Ma("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(df.makeRotation(-e)),this}translate(e,n){return Ma("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(df.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};bg.prototype.isMatrix3=!0;let Be=bg;const df=new Be,h_=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),p_=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function RR(){const t={enabled:!0,workingColorSpace:Uu,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ut&&(r.r=er(r.r),r.g=er(r.g),r.b=er(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ut&&(r.r=wa(r.r),r.g=wa(r.g),r.b=wa(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===wr?Ou:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ma("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ma("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Uu]:{primaries:e,whitePoint:i,transfer:Ou,toXYZ:h_,fromXYZ:p_,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Wn},outputColorSpaceConfig:{drawingBufferColorSpace:Wn}},[Wn]:{primaries:e,whitePoint:i,transfer:ut,toXYZ:h_,fromXYZ:p_,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Wn}}}),t}const Qe=RR();function er(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function wa(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Us;class PR{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Us===void 0&&(Us=zu("canvas")),Us.width=e.width,Us.height=e.height;const r=Us.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Us}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=zu("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=er(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(er(n[i]/255)*255):n[i]=er(n[i]);return{data:n,width:e.width,height:e.height}}else return ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let NR=0;class lg{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:NR++}),this.uuid=_l(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ff(r[a].image)):s.push(ff(r[a]))}else s=ff(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function ff(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?PR.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(ze("Texture: Unable to serialize Texture."),{})}let LR=0;const hf=new $;class dn extends Ns{constructor(e=dn.DEFAULT_IMAGE,n=dn.DEFAULT_MAPPING,i=Ti,r=Ti,s=cn,a=hs,o=ui,l=Dn,c=dn.DEFAULT_ANISOTROPY,u=wr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:LR++}),this.uuid=_l(),this.name="",this.source=new lg(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ze(0,0),this.repeat=new Ze(1,1),this.center=new Ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(hf).x}get height(){return this.source.getSize(hf).y}get depth(){return this.source.getSize(hf).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){ze(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){ze(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==CS)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Iu:e.x=e.x-Math.floor(e.x);break;case Ti:e.x=e.x<0?0:1;break;case tp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Iu:e.y=e.y-Math.floor(e.y);break;case Ti:e.y=e.y<0?0:1;break;case tp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=CS;dn.DEFAULT_ANISOTROPY=1;const Sg=class Sg{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],p=l[5],x=l[9],y=l[2],m=l[6],h=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-y)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+y)<.1&&Math.abs(x+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const M=(c+1)/2,b=(p+1)/2,S=(h+1)/2,E=(u+d)/4,C=(f+y)/4,v=(x+m)/4;return M>b&&M>S?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=E/i,s=C/i):b>S?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=E/r,s=v/r):S<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),i=C/s,r=v/s),this.set(i,r,s,n),this}let _=Math.sqrt((m-x)*(m-x)+(f-y)*(f-y)+(d-u)*(d-u));return Math.abs(_)<.001&&(_=1),this.x=(m-x)/_,this.y=(f-y)/_,this.z=(d-u)/_,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=qe(this.x,e.x,n.x),this.y=qe(this.y,e.y,n.y),this.z=qe(this.z,e.z,n.z),this.w=qe(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=qe(this.x,e,n),this.y=qe(this.y,e,n),this.z=qe(this.z,e,n),this.w=qe(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Sg.prototype.isVector4=!0;let At=Sg;class DR extends Ns{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new At(0,0,e,n),this.scissorTest=!1,this.viewport=new At(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new dn(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:cn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new lg(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const n=e.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hi extends DR{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class US extends dn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class IR extends dn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Vu=class Vu{constructor(e,n,i,r,s,a,o,l,c,u,f,d,p,x,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c,u,f,d,p,x,y,m)}set(e,n,i,r,s,a,o,l,c,u,f,d,p,x,y,m){const h=this.elements;return h[0]=e,h[4]=n,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=f,h[14]=d,h[3]=p,h[7]=x,h[11]=y,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Vu().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,r=1/Os.setFromMatrixColumn(e,0).length(),s=1/Os.setFromMatrixColumn(e,1).length(),a=1/Os.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*u,p=a*f,x=o*u,y=o*f;n[0]=l*u,n[4]=-l*f,n[8]=c,n[1]=p+x*c,n[5]=d-y*c,n[9]=-o*l,n[2]=y-d*c,n[6]=x+p*c,n[10]=a*l}else if(e.order==="YXZ"){const d=l*u,p=l*f,x=c*u,y=c*f;n[0]=d+y*o,n[4]=x*o-p,n[8]=a*c,n[1]=a*f,n[5]=a*u,n[9]=-o,n[2]=p*o-x,n[6]=y+d*o,n[10]=a*l}else if(e.order==="ZXY"){const d=l*u,p=l*f,x=c*u,y=c*f;n[0]=d-y*o,n[4]=-a*f,n[8]=x+p*o,n[1]=p+x*o,n[5]=a*u,n[9]=y-d*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const d=a*u,p=a*f,x=o*u,y=o*f;n[0]=l*u,n[4]=x*c-p,n[8]=d*c+y,n[1]=l*f,n[5]=y*c+d,n[9]=p*c-x,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const d=a*l,p=a*c,x=o*l,y=o*c;n[0]=l*u,n[4]=y-d*f,n[8]=x*f+p,n[1]=f,n[5]=a*u,n[9]=-o*u,n[2]=-c*u,n[6]=p*f+x,n[10]=d-y*f}else if(e.order==="XZY"){const d=a*l,p=a*c,x=o*l,y=o*c;n[0]=l*u,n[4]=-f,n[8]=c*u,n[1]=d*f+y,n[5]=a*u,n[9]=p*f-x,n[2]=x*f-p,n[6]=o*u,n[10]=y*f+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kR,e,FR)}lookAt(e,n,i){const r=this.elements;return Rn.subVectors(e,n),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),fr.crossVectors(i,Rn),fr.lengthSq()===0&&(Math.abs(i.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),fr.crossVectors(i,Rn)),fr.normalize(),nc.crossVectors(Rn,fr),r[0]=fr.x,r[4]=nc.x,r[8]=Rn.x,r[1]=fr.y,r[5]=nc.y,r[9]=Rn.y,r[2]=fr.z,r[6]=nc.z,r[10]=Rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],d=i[9],p=i[13],x=i[2],y=i[6],m=i[10],h=i[14],_=i[3],M=i[7],b=i[11],S=i[15],E=r[0],C=r[4],v=r[8],A=r[12],R=r[1],N=r[5],L=r[9],B=r[13],D=r[2],O=r[6],Y=r[10],G=r[14],H=r[3],z=r[7],W=r[11],Q=r[15];return s[0]=a*E+o*R+l*D+c*H,s[4]=a*C+o*N+l*O+c*z,s[8]=a*v+o*L+l*Y+c*W,s[12]=a*A+o*B+l*G+c*Q,s[1]=u*E+f*R+d*D+p*H,s[5]=u*C+f*N+d*O+p*z,s[9]=u*v+f*L+d*Y+p*W,s[13]=u*A+f*B+d*G+p*Q,s[2]=x*E+y*R+m*D+h*H,s[6]=x*C+y*N+m*O+h*z,s[10]=x*v+y*L+m*Y+h*W,s[14]=x*A+y*B+m*G+h*Q,s[3]=_*E+M*R+b*D+S*H,s[7]=_*C+M*N+b*O+S*z,s[11]=_*v+M*L+b*Y+S*W,s[15]=_*A+M*B+b*G+S*Q,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],p=e[14],x=e[3],y=e[7],m=e[11],h=e[15],_=l*p-c*d,M=o*p-c*f,b=o*d-l*f,S=a*p-c*u,E=a*d-l*u,C=a*f-o*u;return n*(y*_-m*M+h*b)-i*(x*_-m*S+h*E)+r*(x*M-y*S+h*C)-s*(x*b-y*E+m*C)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return n*(a*u-o*c)-i*(s*u-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],p=e[11],x=e[12],y=e[13],m=e[14],h=e[15],_=n*o-i*a,M=n*l-r*a,b=n*c-s*a,S=i*l-r*o,E=i*c-s*o,C=r*c-s*l,v=u*y-f*x,A=u*m-d*x,R=u*h-p*x,N=f*m-d*y,L=f*h-p*y,B=d*h-p*m,D=_*B-M*L+b*N+S*R-E*A+C*v;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/D;return e[0]=(o*B-l*L+c*N)*O,e[1]=(r*L-i*B-s*N)*O,e[2]=(y*C-m*E+h*S)*O,e[3]=(d*E-f*C-p*S)*O,e[4]=(l*R-a*B-c*A)*O,e[5]=(n*B-r*R+s*A)*O,e[6]=(m*b-x*C-h*M)*O,e[7]=(u*C-d*b+p*M)*O,e[8]=(a*L-o*R+c*v)*O,e[9]=(i*R-n*L-s*v)*O,e[10]=(x*E-y*b+h*_)*O,e[11]=(f*b-u*E-p*_)*O,e[12]=(o*A-a*N-l*v)*O,e[13]=(n*N-i*A+r*v)*O,e[14]=(y*M-x*S-m*_)*O,e[15]=(u*S-f*M+d*_)*O,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,c=s+s,u=a+a,f=o+o,d=s*c,p=s*u,x=s*f,y=a*u,m=a*f,h=o*f,_=l*c,M=l*u,b=l*f,S=i.x,E=i.y,C=i.z;return r[0]=(1-(y+h))*S,r[1]=(p+b)*S,r[2]=(x-M)*S,r[3]=0,r[4]=(p-b)*E,r[5]=(1-(d+h))*E,r[6]=(m+_)*E,r[7]=0,r[8]=(x+M)*C,r[9]=(m-_)*C,r[10]=(1-(d+y))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let a=Os.set(r[0],r[1],r[2]).length();const o=Os.set(r[4],r[5],r[6]).length(),l=Os.set(r[8],r[9],r[10]).length();s<0&&(a=-a),ni.copy(this);const c=1/a,u=1/o,f=1/l;return ni.elements[0]*=c,ni.elements[1]*=c,ni.elements[2]*=c,ni.elements[4]*=u,ni.elements[5]*=u,ni.elements[6]*=u,ni.elements[8]*=f,ni.elements[9]*=f,ni.elements[10]*=f,n.setFromRotationMatrix(ni),i.x=a,i.y=o,i.z=l,this}makePerspective(e,n,i,r,s,a,o=Ci,l=!1){const c=this.elements,u=2*s/(n-e),f=2*s/(i-r),d=(n+e)/(n-e),p=(i+r)/(i-r);let x,y;if(l)x=s/(a-s),y=a*s/(a-s);else if(o===Ci)x=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===ll)x=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=Ci,l=!1){const c=this.elements,u=2/(n-e),f=2/(i-r),d=-(n+e)/(n-e),p=-(i+r)/(i-r);let x,y;if(l)x=1/(a-s),y=a/(a-s);else if(o===Ci)x=-2/(a-s),y=-(a+s)/(a-s);else if(o===ll)x=-1/(a-s),y=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=x,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};Vu.prototype.isMatrix4=!0;let Rt=Vu;const Os=new $,ni=new Rt,kR=new $(0,0,0),FR=new $(1,1,1),fr=new $,nc=new $,Rn=new $,m_=new Rt,g_=new Ba;class Gr{constructor(e=0,n=0,i=0,r=Gr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],d=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(qe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-qe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return m_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(m_,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return g_.setFromEuler(this),this.setFromQuaternion(g_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Gr.DEFAULT_ORDER="XYZ";class OS{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let UR=0;const x_=new $,zs=new Ba,Ui=new Rt,ic=new $,io=new $,OR=new $,zR=new Ba,__=new $(1,0,0),v_=new $(0,1,0),y_=new $(0,0,1),b_={type:"added"},BR={type:"removed"},Bs={type:"childadded",child:null},pf={type:"childremoved",child:null};class en extends Ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:UR++}),this.uuid=_l(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=en.DEFAULT_UP.clone();const e=new $,n=new Gr,i=new Ba,r=new $(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Rt},normalMatrix:{value:new Be}}),this.matrix=new Rt,this.matrixWorld=new Rt,this.matrixAutoUpdate=en.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new OS,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return zs.setFromAxisAngle(e,n),this.quaternion.multiply(zs),this}rotateOnWorldAxis(e,n){return zs.setFromAxisAngle(e,n),this.quaternion.premultiply(zs),this}rotateX(e){return this.rotateOnAxis(__,e)}rotateY(e){return this.rotateOnAxis(v_,e)}rotateZ(e){return this.rotateOnAxis(y_,e)}translateOnAxis(e,n){return x_.copy(e).applyQuaternion(this.quaternion),this.position.add(x_.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(__,e)}translateY(e){return this.translateOnAxis(v_,e)}translateZ(e){return this.translateOnAxis(y_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ui.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?ic.copy(e):ic.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),io.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ui.lookAt(io,ic,this.up):Ui.lookAt(ic,io,this.up),this.quaternion.setFromRotationMatrix(Ui),r&&(Ui.extractRotation(r.matrixWorld),zs.setFromRotationMatrix(Ui),this.quaternion.premultiply(zs.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(it("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(b_),Bs.child=e,this.dispatchEvent(Bs),Bs.child=null):it("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(BR),pf.child=e,this.dispatchEvent(pf),pf.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ui.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ui.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ui),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(b_),Bs.child=e,this.dispatchEvent(Bs),Bs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(io,e,OR),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(io,zR,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),p=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),x.length>0&&(i.nodes=x)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}en.DEFAULT_UP=new $(0,1,0);en.DEFAULT_MATRIX_AUTO_UPDATE=!0;en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ua extends en{constructor(){super(),this.isGroup=!0,this.type="Group"}}const HR={type:"move"};class mf{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ua,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ua,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ua,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const y of e.hand.values()){const m=n.getJointPose(y,i),h=this._getHandJoint(c,y);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),p=.02,x=.005;c.inputState.pinching&&d>p+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(HR)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new ua;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const zS={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hr={h:0,s:0,l:0},rc={h:0,s:0,l:0};function gf(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Je{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Wn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=Qe.workingColorSpace){return this.r=e,this.g=n,this.b=i,Qe.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=Qe.workingColorSpace){if(e=CR(e,1),n=qe(n,0,1),i=qe(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=gf(a,s,e+1/3),this.g=gf(a,s,e),this.b=gf(a,s,e-1/3)}return Qe.colorSpaceToWorking(this,r),this}setStyle(e,n=Wn){function i(s){s!==void 0&&parseFloat(s)<1&&ze("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:ze("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Wn){const i=zS[e.toLowerCase()];return i!==void 0?this.setHex(i,n):ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=er(e.r),this.g=er(e.g),this.b=er(e.b),this}copyLinearToSRGB(e){return this.r=wa(e.r),this.g=wa(e.g),this.b=wa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wn){return Qe.workingToColorSpace(on.copy(this),e),Math.round(qe(on.r*255,0,255))*65536+Math.round(qe(on.g*255,0,255))*256+Math.round(qe(on.b*255,0,255))}getHexString(e=Wn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Qe.workingColorSpace){Qe.workingToColorSpace(on.copy(this),n);const i=on.r,r=on.g,s=on.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=Qe.workingColorSpace){return Qe.workingToColorSpace(on.copy(this),n),e.r=on.r,e.g=on.g,e.b=on.b,e}getStyle(e=Wn){Qe.workingToColorSpace(on.copy(this),e);const n=on.r,i=on.g,r=on.b;return e!==Wn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(hr),this.setHSL(hr.h+e,hr.s+n,hr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(hr),e.getHSL(rc);const i=cf(hr.h,rc.h,n),r=cf(hr.s,rc.s,n),s=cf(hr.l,rc.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new Je;Je.NAMES=zS;class VR extends en{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gr,this.environmentIntensity=1,this.environmentRotation=new Gr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}}const ii=new $,Oi=new $,xf=new $,zi=new $,Hs=new $,Vs=new $,S_=new $,_f=new $,vf=new $,yf=new $,bf=new At,Sf=new At,Mf=new At;class ci{constructor(e=new $,n=new $,i=new $){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),ii.subVectors(e,n),r.cross(ii);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){ii.subVectors(r,n),Oi.subVectors(i,n),xf.subVectors(e,n);const a=ii.dot(ii),o=ii.dot(Oi),l=ii.dot(xf),c=Oi.dot(Oi),u=Oi.dot(xf),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,p=(c*l-o*u)*d,x=(a*u-o*l)*d;return s.set(1-p-x,x,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,zi)===null?!1:zi.x>=0&&zi.y>=0&&zi.x+zi.y<=1}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,zi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,zi.x),l.addScaledVector(a,zi.y),l.addScaledVector(o,zi.z),l)}static getInterpolatedAttribute(e,n,i,r,s,a){return bf.setScalar(0),Sf.setScalar(0),Mf.setScalar(0),bf.fromBufferAttribute(e,n),Sf.fromBufferAttribute(e,i),Mf.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(bf,s.x),a.addScaledVector(Sf,s.y),a.addScaledVector(Mf,s.z),a}static isFrontFacing(e,n,i,r){return ii.subVectors(i,n),Oi.subVectors(e,n),ii.cross(Oi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ii.subVectors(this.c,this.b),Oi.subVectors(this.a,this.b),ii.cross(Oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ci.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ci.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return ci.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return ci.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ci.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;Hs.subVectors(r,i),Vs.subVectors(s,i),_f.subVectors(e,i);const l=Hs.dot(_f),c=Vs.dot(_f);if(l<=0&&c<=0)return n.copy(i);vf.subVectors(e,r);const u=Hs.dot(vf),f=Vs.dot(vf);if(u>=0&&f<=u)return n.copy(r);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),n.copy(i).addScaledVector(Hs,a);yf.subVectors(e,s);const p=Hs.dot(yf),x=Vs.dot(yf);if(x>=0&&p<=x)return n.copy(s);const y=p*c-l*x;if(y<=0&&c>=0&&x<=0)return o=c/(c-x),n.copy(i).addScaledVector(Vs,o);const m=u*x-p*f;if(m<=0&&f-u>=0&&p-x>=0)return S_.subVectors(s,r),o=(f-u)/(f-u+(p-x)),n.copy(r).addScaledVector(S_,o);const h=1/(m+y+d);return a=y*h,o=d*h,n.copy(i).addScaledVector(Hs,a).addScaledVector(Vs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class vl{constructor(e=new $(1/0,1/0,1/0),n=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(ri.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(ri.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=ri.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ri):ri.fromBufferAttribute(s,a),ri.applyMatrix4(e.matrixWorld),this.expandByPoint(ri);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),sc.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),sc.copy(i.boundingBox)),sc.applyMatrix4(e.matrixWorld),this.union(sc)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ri),ri.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ro),ac.subVectors(this.max,ro),Gs.subVectors(e.a,ro),Ws.subVectors(e.b,ro),js.subVectors(e.c,ro),pr.subVectors(Ws,Gs),mr.subVectors(js,Ws),Jr.subVectors(Gs,js);let n=[0,-pr.z,pr.y,0,-mr.z,mr.y,0,-Jr.z,Jr.y,pr.z,0,-pr.x,mr.z,0,-mr.x,Jr.z,0,-Jr.x,-pr.y,pr.x,0,-mr.y,mr.x,0,-Jr.y,Jr.x,0];return!wf(n,Gs,Ws,js,ac)||(n=[1,0,0,0,1,0,0,0,1],!wf(n,Gs,Ws,js,ac))?!1:(oc.crossVectors(pr,mr),n=[oc.x,oc.y,oc.z],wf(n,Gs,Ws,js,ac))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ri).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ri).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Bi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Bi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Bi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Bi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Bi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Bi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Bi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Bi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Bi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Bi=[new $,new $,new $,new $,new $,new $,new $,new $],ri=new $,sc=new vl,Gs=new $,Ws=new $,js=new $,pr=new $,mr=new $,Jr=new $,ro=new $,ac=new $,oc=new $,es=new $;function wf(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){es.fromArray(t,s);const o=r.x*Math.abs(es.x)+r.y*Math.abs(es.y)+r.z*Math.abs(es.z),l=e.dot(es),c=n.dot(es),u=i.dot(es);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Ot=new $,lc=new Ze;let GR=0;class Li extends Ns{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:GR++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=MR,this.updateRanges=[],this.gpuType=Ai,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)lc.fromBufferAttribute(this,n),lc.applyMatrix3(e),this.setXY(n,lc.x,lc.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyMatrix3(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyMatrix4(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyNormalMatrix(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.transformDirection(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=no(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=bn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=no(n,this.array)),n}setX(e,n){return this.normalized&&(n=bn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=no(n,this.array)),n}setY(e,n){return this.normalized&&(n=bn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=no(n,this.array)),n}setZ(e,n){return this.normalized&&(n=bn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=no(n,this.array)),n}setW(e,n){return this.normalized&&(n=bn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=bn(n,this.array),i=bn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=bn(n,this.array),i=bn(i,this.array),r=bn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=bn(n,this.array),i=bn(i,this.array),r=bn(r,this.array),s=bn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class BS extends Li{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class HS extends Li{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Kt extends Li{constructor(e,n,i){super(new Float32Array(e),n,i)}}const WR=new vl,so=new $,Ef=new $;class ud{constructor(e=new $,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):WR.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;so.subVectors(e,this.center);const n=so.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(so,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ef.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(so.copy(e.center).add(Ef)),this.expandByPoint(so.copy(e.center).sub(Ef))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let jR=0;const Gn=new Rt,Tf=new en,Xs=new $,Pn=new vl,ao=new vl,jt=new $;class Cn extends Ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jR++}),this.uuid=_l(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wR(e)?HS:BS)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Be().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Gn.makeRotationFromQuaternion(e),this.applyMatrix4(Gn),this}rotateX(e){return Gn.makeRotationX(e),this.applyMatrix4(Gn),this}rotateY(e){return Gn.makeRotationY(e),this.applyMatrix4(Gn),this}rotateZ(e){return Gn.makeRotationZ(e),this.applyMatrix4(Gn),this}translate(e,n,i){return Gn.makeTranslation(e,n,i),this.applyMatrix4(Gn),this}scale(e,n,i){return Gn.makeScale(e,n,i),this.applyMatrix4(Gn),this}lookAt(e){return Tf.lookAt(e),Tf.updateMatrix(),this.applyMatrix4(Tf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xs).negate(),this.translate(Xs.x,Xs.y,Xs.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Kt(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vl);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Pn.setFromBufferAttribute(s),this.morphTargetsRelative?(jt.addVectors(this.boundingBox.min,Pn.min),this.boundingBox.expandByPoint(jt),jt.addVectors(this.boundingBox.max,Pn.max),this.boundingBox.expandByPoint(jt)):(this.boundingBox.expandByPoint(Pn.min),this.boundingBox.expandByPoint(Pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&it('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ud);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new $,1/0);return}if(e){const i=this.boundingSphere.center;if(Pn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];ao.setFromBufferAttribute(o),this.morphTargetsRelative?(jt.addVectors(Pn.min,ao.min),Pn.expandByPoint(jt),jt.addVectors(Pn.max,ao.max),Pn.expandByPoint(jt)):(Pn.expandByPoint(ao.min),Pn.expandByPoint(ao.max))}Pn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)jt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(jt));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)jt.fromBufferAttribute(o,c),l&&(Xs.fromBufferAttribute(e,c),jt.add(Xs)),r=Math.max(r,i.distanceToSquared(jt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&it('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){it("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Li(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<i.count;v++)o[v]=new $,l[v]=new $;const c=new $,u=new $,f=new $,d=new Ze,p=new Ze,x=new Ze,y=new $,m=new $;function h(v,A,R){c.fromBufferAttribute(i,v),u.fromBufferAttribute(i,A),f.fromBufferAttribute(i,R),d.fromBufferAttribute(s,v),p.fromBufferAttribute(s,A),x.fromBufferAttribute(s,R),u.sub(c),f.sub(c),p.sub(d),x.sub(d);const N=1/(p.x*x.y-x.x*p.y);isFinite(N)&&(y.copy(u).multiplyScalar(x.y).addScaledVector(f,-p.y).multiplyScalar(N),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-x.x).multiplyScalar(N),o[v].add(y),o[A].add(y),o[R].add(y),l[v].add(m),l[A].add(m),l[R].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let v=0,A=_.length;v<A;++v){const R=_[v],N=R.start,L=R.count;for(let B=N,D=N+L;B<D;B+=3)h(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const M=new $,b=new $,S=new $,E=new $;function C(v){S.fromBufferAttribute(r,v),E.copy(S);const A=o[v];M.copy(A),M.sub(S.multiplyScalar(S.dot(A))).normalize(),b.crossVectors(E,A);const N=b.dot(l[v])<0?-1:1;a.setXYZW(v,M.x,M.y,M.z,N)}for(let v=0,A=_.length;v<A;++v){const R=_[v],N=R.start,L=R.count;for(let B=N,D=N+L;B<D;B+=3)C(e.getX(B+0)),C(e.getX(B+1)),C(e.getX(B+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Li(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new $,s=new $,a=new $,o=new $,l=new $,c=new $,u=new $,f=new $;if(e)for(let d=0,p=e.count;d<p;d+=3){const x=e.getX(d+0),y=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(n,x),s.fromBufferAttribute(n,y),a.fromBufferAttribute(n,m),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,x),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=n.count;d<p;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),a.fromBufferAttribute(n,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)jt.fromBufferAttribute(e,n),jt.normalize(),e.setXYZ(n,jt.x,jt.y,jt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,d=new c.constructor(l.length*u);let p=0,x=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?p=l[y]*o.data.stride+o.offset:p=l[y]*u;for(let h=0;h<u;h++)d[x++]=c[p++]}return new Li(d,u,f)}if(this.index===null)return ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Cn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const d=c[u],p=e(d,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let d=0,p=f.length;d<p;d++)u.push(f[d].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Af=new $,XR=new $,$R=new Be;class br{constructor(e=new $(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Af.subVectors(i,n).cross(XR.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(Af),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:n.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||$R.getNormalMatrix(e),r=this.coplanarPoint(Af).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let YR=0;class Ha extends Ns{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:YR++}),this.uuid=_l(),this.name="",this.type="Material",this.blending=Fo,this.side=Ts,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vS,this.blendDst=yS,this.blendEquation=Zs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=sl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gR,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=of,this.stencilZFail=of,this.stencilZPass=of,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){ze(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){ze(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Je().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new br().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ze().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ze().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Hi=new $,Cf=new $,cc=new $,uc=new $;class VS{constructor(e=new $,n=new $(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Hi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Hi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Hi.copy(this.origin).addScaledVector(this.direction,n),Hi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Cf.copy(e).add(n).multiplyScalar(.5),cc.copy(n).sub(e).normalize(),uc.copy(this.origin).sub(Cf);const s=e.distanceTo(n)*.5,a=-this.direction.dot(cc),o=uc.dot(this.direction),l=-uc.dot(cc),c=uc.lengthSq(),u=Math.abs(1-a*a);let f,d,p,x;if(u>0)if(f=a*l-o,d=a*o-l,x=s*u,f>=0)if(d>=-x)if(d<=x){const y=1/u;f*=y,d*=y,p=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;else d=-s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;else d<=-x?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+c):d<=x?(f=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+c);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Cf).addScaledVector(cc,d),p}intersectSphere(e,n){if(e.radius<0)return null;Hi.subVectors(e.center,this.origin);const i=Hi.dot(this.direction),r=Hi.dot(Hi)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Hi)!==null}intersectTriangle(e,n,i,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,f=e.x-a.x,d=e.y-a.y,p=e.z-a.z,x=n.x-a.x,y=n.y-a.y,m=n.z-a.z,h=i.x-a.x,_=i.y-a.y,M=i.z-a.z,b=Math.abs(l),S=Math.abs(c),E=Math.abs(u);let C,v,A,R,N,L,B,D,O,Y,G,H;if(b>=S&&b>=E?(A=l,L=f,O=x,H=h,l>=0?(C=c,v=u,R=d,N=p,B=y,D=m,Y=_,G=M):(C=u,v=c,R=p,N=d,B=m,D=y,Y=M,G=_)):S>=E?(A=c,L=d,O=y,H=_,c>=0?(C=u,v=l,R=p,N=f,B=m,D=x,Y=M,G=h):(C=l,v=u,R=f,N=p,B=x,D=m,Y=h,G=M)):(A=u,L=p,O=m,H=M,u>=0?(C=l,v=c,R=f,N=d,B=x,D=y,Y=h,G=_):(C=c,v=l,R=d,N=f,B=y,D=x,Y=_,G=h)),A===0)return null;const z=C/A,W=v/A,Q=1/A,le=R-z*L,ve=N-W*L,Ue=B-z*O,Fe=D-W*O,De=Y-z*H,Z=G-W*H,te=De*Fe-Z*Ue,be=le*Z-ve*De,Ie=Ue*ve-Fe*le;if(r){if(te<0||be<0||Ie<0)return null}else if((te<0||be<0||Ie<0)&&(te>0||be>0||Ie>0))return null;const xe=te+be+Ie;if(xe===0)return null;const He=Q*(te*L+be*O+Ie*H);return(xe>0?He<0:He>0)?null:this.at(He/xe,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ls extends Ha{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gr,this.combine=bS,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const M_=new Rt,ts=new VS,dc=new ud,w_=new $,fc=new $,hc=new $,pc=new $,Rf=new $,mc=new $,E_=new $,gc=new $;class Xt extends en{constructor(e=new Cn,n=new ls){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){mc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(Rf.fromBufferAttribute(f,e),a?mc.addScaledVector(Rf,u):mc.addScaledVector(Rf.sub(n),u))}n.add(mc)}return n}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),dc.copy(i.boundingSphere),dc.applyMatrix4(s),ts.copy(e.ray).recast(e.near),!(dc.containsPoint(ts.origin)===!1&&(ts.intersectSphere(dc,w_)===null||ts.origin.distanceToSquared(w_)>(e.far-e.near)**2))&&(M_.copy(s).invert(),ts.copy(e.ray).applyMatrix4(M_),!(i.boundingBox!==null&&ts.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,ts)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,y=d.length;x<y;x++){const m=d[x],h=a[m.materialIndex],_=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let b=_,S=M;b<S;b+=3){const E=o.getX(b),C=o.getX(b+1),v=o.getX(b+2);r=xc(this,h,e,i,c,u,f,E,C,v),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const x=Math.max(0,p.start),y=Math.min(o.count,p.start+p.count);for(let m=x,h=y;m<h;m+=3){const _=o.getX(m),M=o.getX(m+1),b=o.getX(m+2);r=xc(this,a,e,i,c,u,f,_,M,b),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,y=d.length;x<y;x++){const m=d[x],h=a[m.materialIndex],_=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let b=_,S=M;b<S;b+=3){const E=b,C=b+1,v=b+2;r=xc(this,h,e,i,c,u,f,E,C,v),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const x=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=x,h=y;m<h;m+=3){const _=m,M=m+1,b=m+2;r=xc(this,a,e,i,c,u,f,_,M,b),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function qR(t,e,n,i,r,s,a,o){let l;if(e.side===un?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Ts,o),l===null)return null;gc.copy(o),gc.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(gc);return c<n.near||c>n.far?null:{distance:c,point:gc.clone(),object:t}}function xc(t,e,n,i,r,s,a,o,l,c){t.getVertexPosition(o,fc),t.getVertexPosition(l,hc),t.getVertexPosition(c,pc);const u=qR(t,e,n,i,fc,hc,pc,E_);if(u){const f=new $;ci.getBarycoord(E_,fc,hc,pc,f),r&&(u.uv=ci.getInterpolatedAttribute(r,o,l,c,f,new Ze)),s&&(u.uv1=ci.getInterpolatedAttribute(s,o,l,c,f,new Ze)),a&&(u.normal=ci.getInterpolatedAttribute(a,o,l,c,f,new $),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new $,materialIndex:0};ci.getNormal(fc,hc,pc,d.normal),u.face=d,u.barycoord=f}return u}class KR extends dn{constructor(e=null,n=1,i=1,r,s,a,o,l,c=Qt,u=Qt,f,d){super(null,a,o,l,c,u,r,s,f,d),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ns=new ud,ZR=new Ze(.5,.5),_c=new $;class cg{constructor(e=new br,n=new br,i=new br,r=new br,s=new br,a=new br){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Ci,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],f=s[5],d=s[6],p=s[7],x=s[8],y=s[9],m=s[10],h=s[11],_=s[12],M=s[13],b=s[14],S=s[15];if(r[0].setComponents(c-a,p-u,h-x,S-_).normalize(),r[1].setComponents(c+a,p+u,h+x,S+_).normalize(),r[2].setComponents(c+o,p+f,h+y,S+M).normalize(),r[3].setComponents(c-o,p-f,h-y,S-M).normalize(),i)r[4].setComponents(l,d,m,b).normalize(),r[5].setComponents(c-l,p-d,h-m,S-b).normalize();else if(r[4].setComponents(c-l,p-d,h-m,S-b).normalize(),n===Ci)r[5].setComponents(c+l,p+d,h+m,S+b).normalize();else if(n===ll)r[5].setComponents(l,d,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ns.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),ns.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ns)}intersectsSprite(e){ns.center.set(0,0,0);const n=ZR.distanceTo(e.center);return ns.radius=.7071067811865476+n,ns.applyMatrix4(e.matrixWorld),this.intersectsSphere(ns)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(_c.x=r.normal.x>0?e.max.x:e.min.x,_c.y=r.normal.y>0?e.max.y:e.min.y,_c.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(_c)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class GS extends Ha{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const T_=new Rt,Ip=new VS,vc=new ud,yc=new $;class QR extends en{constructor(e=new Cn,n=new GS){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),vc.copy(i.boundingSphere),vc.applyMatrix4(r),vc.radius+=s,e.ray.intersectsSphere(vc)===!1)return;T_.copy(r).invert(),Ip.copy(e.ray).applyMatrix4(T_);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){const d=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let x=d,y=p;x<y;x++){const m=c.getX(x);yc.fromBufferAttribute(f,m),A_(yc,m,l,r,e,n,this)}}else{const d=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let x=d,y=p;x<y;x++)yc.fromBufferAttribute(f,x),A_(yc,x,l,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function A_(t,e,n,i,r,s,a){const o=Ip.distanceSqToPoint(t);if(o<n){const l=new $;Ip.closestPointToPoint(t,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class WS extends dn{constructor(e=[],n=As,i,r,s,a,o,l,c,u){super(e,n,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class JR extends dn{constructor(e,n,i,r,s,a,o,l,c){super(e,n,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class cl extends dn{constructor(e,n,i=Di,r,s,a,o=Qt,l=Qt,c,u=sr,f=1){if(u!==sr&&u!==ps)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:n,depth:f};super(d,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new lg(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return n.compareFunction=this.compareFunction,n}}class eP extends cl{constructor(e,n=Di,i=As,r,s,a=Qt,o=Qt,l,c=sr){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,n,i,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class jS extends dn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class zr extends Cn{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let d=0,p=0;x("z","y","x",-1,-1,i,n,e,a,s,0),x("z","y","x",1,-1,i,n,-e,a,s,1),x("x","z","y",1,1,e,i,n,r,a,2),x("x","z","y",1,-1,e,i,-n,r,a,3),x("x","y","z",1,-1,e,n,i,r,s,4),x("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Kt(c,3)),this.setAttribute("normal",new Kt(u,3)),this.setAttribute("uv",new Kt(f,2));function x(y,m,h,_,M,b,S,E,C,v,A){const R=b/C,N=S/v,L=b/2,B=S/2,D=E/2,O=C+1,Y=v+1;let G=0,H=0;const z=new $;for(let W=0;W<Y;W++){const Q=W*N-B;for(let le=0;le<O;le++){const ve=le*R-L;z[y]=ve*_,z[m]=Q*M,z[h]=D,c.push(z.x,z.y,z.z),z[y]=0,z[m]=0,z[h]=E>0?1:-1,u.push(z.x,z.y,z.z),f.push(le/C),f.push(1-W/v),G+=1}}for(let W=0;W<v;W++)for(let Q=0;Q<C;Q++){const le=d+Q+O*W,ve=d+Q+O*(W+1),Ue=d+(Q+1)+O*(W+1),Fe=d+(Q+1)+O*W;l.push(le,ve,Fe),l.push(ve,Ue,Fe),H+=6}o.addGroup(p,H,A),p+=H,d+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ug extends Cn{constructor(e=1,n=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],d=[],p=[];let x=0;const y=[],m=i/2;let h=0;_(),a===!1&&(e>0&&M(!0),n>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new Kt(f,3)),this.setAttribute("normal",new Kt(d,3)),this.setAttribute("uv",new Kt(p,2));function _(){const b=new $,S=new $;let E=0;const C=(n-e)/i;for(let v=0;v<=s;v++){const A=[],R=v/s,N=R*(n-e)+e;for(let L=0;L<=r;L++){const B=L/r,D=B*l+o,O=Math.sin(D),Y=Math.cos(D);S.x=N*O,S.y=-R*i+m,S.z=N*Y,f.push(S.x,S.y,S.z),b.set(O,C,Y).normalize(),d.push(b.x,b.y,b.z),p.push(B,1-R),A.push(x++)}y.push(A)}for(let v=0;v<r;v++)for(let A=0;A<s;A++){const R=y[A][v],N=y[A+1][v],L=y[A+1][v+1],B=y[A][v+1];(e>0||A!==0)&&(u.push(R,N,B),E+=3),(n>0||A!==s-1)&&(u.push(N,L,B),E+=3)}c.addGroup(h,E,0),h+=E}function M(b){const S=x,E=new Ze,C=new $;let v=0;const A=b===!0?e:n,R=b===!0?1:-1;for(let L=1;L<=r;L++)f.push(0,m*R,0),d.push(0,R,0),p.push(.5,.5),x++;const N=x;for(let L=0;L<=r;L++){const D=L/r*l+o,O=Math.cos(D),Y=Math.sin(D);C.x=A*Y,C.y=m*R,C.z=A*O,f.push(C.x,C.y,C.z),d.push(0,R,0),E.x=O*.5+.5,E.y=Y*.5*R+.5,p.push(E.x,E.y),x++}for(let L=0;L<r;L++){const B=S+L,D=N+L;b===!0?u.push(D,D+1,B):u.push(D+1,D,B),v+=3}c.addGroup(h,v,b===!0?1:2),h+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ug(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class dg extends ug{constructor(e=1,n=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,n,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new dg(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class dd extends Cn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,f=e/o,d=n/l,p=[],x=[],y=[],m=[];for(let h=0;h<u;h++){const _=h*d-a;for(let M=0;M<c;M++){const b=M*f-s;x.push(b,-_,0),y.push(0,0,1),m.push(M/o),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let _=0;_<o;_++){const M=_+c*h,b=_+c*(h+1),S=_+1+c*(h+1),E=_+1+c*h;p.push(M,b,E),p.push(b,S,E)}this.setIndex(p),this.setAttribute("position",new Kt(x,3)),this.setAttribute("normal",new Kt(y,3)),this.setAttribute("uv",new Kt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dd(e.width,e.height,e.widthSegments,e.heightSegments)}}class fg extends Cn{constructor(e=.5,n=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],l=[],c=[],u=[];let f=e;const d=(n-e)/r,p=new $,x=new Ze;for(let y=0;y<=r;y++){for(let m=0;m<=i;m++){const h=s+m/i*a;p.x=f*Math.cos(h),p.y=f*Math.sin(h),l.push(p.x,p.y,p.z),c.push(0,0,1),x.x=(p.x/n+1)/2,x.y=(p.y/n+1)/2,u.push(x.x,x.y)}f+=d}for(let y=0;y<r;y++){const m=y*(i+1);for(let h=0;h<i;h++){const _=h+m,M=_,b=_+i+1,S=_+i+2,E=_+1;o.push(M,b,E),o.push(b,S,E)}}this.setIndex(o),this.setAttribute("position",new Kt(l,3)),this.setAttribute("normal",new Kt(c,3)),this.setAttribute("uv",new Kt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fg(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class da extends Cn{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new $,d=new $,p=[],x=[],y=[],m=[];for(let h=0;h<=i;h++){const _=[],M=h/i,b=a+M*o,S=e*Math.cos(b),E=Math.sqrt(e*e-S*S);let C=0;h===0&&a===0?C=.5/n:h===i&&l===Math.PI&&(C=-.5/n);for(let v=0;v<=n;v++){const A=v/n,R=r+A*s;f.x=-E*Math.cos(R),f.y=S,f.z=E*Math.sin(R),x.push(f.x,f.y,f.z),d.copy(f).normalize(),y.push(d.x,d.y,d.z),m.push(A+C,1-M),_.push(c++)}u.push(_)}for(let h=0;h<i;h++)for(let _=0;_<n;_++){const M=u[h][_+1],b=u[h][_],S=u[h+1][_],E=u[h+1][_+1];(h!==0||a>0)&&p.push(M,b,E),(h!==i-1||l<Math.PI)&&p.push(b,S,E)}this.setIndex(p),this.setAttribute("position",new Kt(x,3)),this.setAttribute("normal",new Kt(y,3)),this.setAttribute("uv",new Kt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new da(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Fa(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(C_(r))r.isRenderTargetTexture?(ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(C_(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[n][i]=s}else e[n][i]=r.slice();else e[n][i]=r}}return e}function mn(t){const e={};for(let n=0;n<t.length;n++){const i=Fa(t[n]);for(const r in i)e[r]=i[r]}return e}function C_(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function tP(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function XS(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const nP={clone:Fa,merge:mn};var iP=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rP=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ki extends Ha{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=iP,this.fragmentShader=rP,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fa(e.uniforms),this.uniformsGroups=tP(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=n[r.value]||null;break;case"c":this.uniforms[i].value=new Je().setHex(r.value);break;case"v2":this.uniforms[i].value=new Ze().fromArray(r.value);break;case"v3":this.uniforms[i].value=new $().fromArray(r.value);break;case"v4":this.uniforms[i].value=new At().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Be().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Rt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class sP extends ki{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Pf extends Ha{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lp,this.normalScale=new Ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class aP extends Ha{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=pR,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class oP extends Ha{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class $S extends en{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=n}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}const Nf=new Rt,R_=new $,P_=new $;class lP{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ze(512,512),this.mapType=Dn,this.map=null,this.mapPass=null,this.matrix=new Rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cg,this._frameExtents=new Ze(1,1),this._viewportCount=1,this._viewports=[new At(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera;R_.setFromMatrixPosition(e.matrixWorld),n.position.copy(R_),P_.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(P_),n.updateMatrixWorld(),this._updateMatrix(n,this.matrix,this._frustum)}_updateMatrix(e,n,i,r){Nf.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Nf,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===ll||e.reversedDepth?n.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):n.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),n.multiply(Nf)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const bc=new $,Sc=new Ba,vi=new $;class YS extends en{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Rt,this.projectionMatrix=new Rt,this.projectionMatrixInverse=new Rt,this.coordinateSystem=Ci,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(bc,Sc,vi),vi.x===1&&vi.y===1&&vi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bc,Sc,vi.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(bc,Sc,vi),vi.x===1&&vi.y===1&&vi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bc,Sc,vi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const gr=new $,N_=new Ze,L_=new Ze;class $n extends YS{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Dp*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(lf*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Dp*2*Math.atan(Math.tan(lf*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){gr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(gr.x,gr.y).multiplyScalar(-e/gr.z),gr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(gr.x,gr.y).multiplyScalar(-e/gr.z)}getViewSize(e,n){return this.getViewBounds(e,N_,L_),n.subVectors(L_,N_)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(lf*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class hg extends YS{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class cP extends lP{constructor(){super(new hg(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class D_ extends $S{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(en.DEFAULT_UP),this.updateMatrix(),this.target=new en,this.shadow=new cP}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}class uP extends $S{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const $s=-90,Ys=1;class dP extends en{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new $n($s,Ys,e,n);r.layers=this.layers,this.add(r);const s=new $n($s,Ys,e,n);s.layers=this.layers,this.add(s);const a=new $n($s,Ys,e,n);a.layers=this.layers,this.add(a);const o=new $n($s,Ys,e,n);o.layers=this.layers,this.add(o);const l=new $n($s,Ys,e,n);l.layers=this.layers,this.add(l);const c=new $n($s,Ys,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const c of n)this.remove(c);if(e===Ci)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ll)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,u),e.setRenderTarget(f,d,p),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class fP extends $n{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class hP{constructor(e=1,n=0,i=0){this.radius=e,this.phi=n,this.theta=i}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=qe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(qe(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Mg=class Mg{constructor(e,n,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,r){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=r,this}};Mg.prototype.isMatrix2=!0;let I_=Mg;function k_(t,e,n,i){const r=pP(i);switch(n){case DS:return t*e;case kS:return t*e/r.components*r.byteLength;case ig:return t*e/r.components*r.byteLength;case Cs:return t*e*2/r.components*r.byteLength;case rg:return t*e*2/r.components*r.byteLength;case IS:return t*e*3/r.components*r.byteLength;case ui:return t*e*4/r.components*r.byteLength;case sg:return t*e*4/r.components*r.byteLength;case jc:case Xc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case $c:case Yc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case ip:case sp:return Math.max(t,16)*Math.max(e,8)/4;case np:case rp:return Math.max(t,8)*Math.max(e,8)/2;case ap:case op:case cp:case up:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case lp:case ku:case dp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case fp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case hp:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case pp:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case mp:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case gp:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case xp:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case _p:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case vp:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case yp:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case bp:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Sp:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Mp:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case wp:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Ep:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Tp:case Ap:case Cp:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Rp:case Pp:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Fu:case Np:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function pP(t){switch(t){case Dn:case RS:return{byteLength:1,components:1};case al:case PS:case Ii:return{byteLength:2,components:1};case tg:case ng:return{byteLength:2,components:4};case Di:case eg:case Ai:return{byteLength:4,components:1};case NS:case LS:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qm}}));typeof window<"u"&&(window.__THREE__?ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qm);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function qS(){let t=null,e=!1,n=null,i=null;function r(s,a){i=t.requestAnimationFrame(r),n(s,a)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function mP(t){const e=new WeakMap;function n(o,l){const c=o.array,u=o.usage,f=c.byteLength,d=t.createBuffer();t.bindBuffer(l,d),t.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(t.bindBuffer(c,o),f.length===0)t.bufferSubData(c,0,u);else{f.sort((p,x)=>p.start-x.start);let d=0;for(let p=1;p<f.length;p++){const x=f[d],y=f[p];y.start<=x.start+x.count+1?x.count=Math.max(x.count,y.start+y.count-x.start):(++d,f[d]=y)}f.length=d+1;for(let p=0,x=f.length;p<x;p++){const y=f[p];t.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var gP=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xP=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,_P=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vP=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yP=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bP=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,SP=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,MP=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wP=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,EP=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,TP=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,AP=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,CP=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,RP=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,PP=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,NP=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,LP=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,DP=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,IP=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kP=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,FP=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,UP=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,OP=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,zP=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,BP=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,HP=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,VP=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,GP=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,WP=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jP=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,XP="gl_FragColor = linearToOutputTexel( gl_FragColor );",$P=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,YP=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,qP=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,KP=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ZP=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,QP=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,JP=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,e3=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,t3=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,n3=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,i3=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,r3=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,s3=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,a3=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,o3=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,l3=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,c3=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,u3=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,d3=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,f3=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,h3=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,p3=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,m3=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,g3=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,x3=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_3=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,v3=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,y3=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,b3=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,S3=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,M3=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,w3=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,E3=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,T3=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,A3=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,C3=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,R3=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,P3=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,N3=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,L3=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,D3=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,I3=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,k3=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,F3=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,U3=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,O3=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,z3=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,B3=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,H3=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,V3=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,G3=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,W3=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,j3=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,X3=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$3=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Y3=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,q3=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,K3=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Z3=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Q3=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,J3=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,eN=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,tN=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,nN=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,iN=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,rN=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sN=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,aN=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,oN=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lN=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cN=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,uN=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,dN=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,fN=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hN=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pN=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,mN=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const gN=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xN=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_N=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vN=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bN=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,SN=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,MN=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,wN=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,EN=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,TN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,AN=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,CN=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,RN=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,PN=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,NN=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,LN=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,DN=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IN=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,kN=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,FN=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,UN=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ON=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zN=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,BN=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,HN=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,VN=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GN=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WN=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,jN=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,XN=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$N=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,YN=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qN=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$e={alphahash_fragment:gP,alphahash_pars_fragment:xP,alphamap_fragment:_P,alphamap_pars_fragment:vP,alphatest_fragment:yP,alphatest_pars_fragment:bP,aomap_fragment:SP,aomap_pars_fragment:MP,batching_pars_vertex:wP,batching_vertex:EP,begin_vertex:TP,beginnormal_vertex:AP,bsdfs:CP,iridescence_fragment:RP,bumpmap_pars_fragment:PP,clipping_planes_fragment:NP,clipping_planes_pars_fragment:LP,clipping_planes_pars_vertex:DP,clipping_planes_vertex:IP,color_fragment:kP,color_pars_fragment:FP,color_pars_vertex:UP,color_vertex:OP,common:zP,cube_uv_reflection_fragment:BP,defaultnormal_vertex:HP,displacementmap_pars_vertex:VP,displacementmap_vertex:GP,emissivemap_fragment:WP,emissivemap_pars_fragment:jP,colorspace_fragment:XP,colorspace_pars_fragment:$P,envmap_fragment:YP,envmap_common_pars_fragment:qP,envmap_pars_fragment:KP,envmap_pars_vertex:ZP,envmap_physical_pars_fragment:l3,envmap_vertex:QP,fog_vertex:JP,fog_pars_vertex:e3,fog_fragment:t3,fog_pars_fragment:n3,gradientmap_pars_fragment:i3,lightmap_pars_fragment:r3,lights_lambert_fragment:s3,lights_lambert_pars_fragment:a3,lights_pars_begin:o3,lights_toon_fragment:c3,lights_toon_pars_fragment:u3,lights_phong_fragment:d3,lights_phong_pars_fragment:f3,lights_physical_fragment:h3,lights_physical_pars_fragment:p3,lights_fragment_begin:m3,lights_fragment_maps:g3,lights_fragment_end:x3,lightprobes_pars_fragment:_3,logdepthbuf_fragment:v3,logdepthbuf_pars_fragment:y3,logdepthbuf_pars_vertex:b3,logdepthbuf_vertex:S3,map_fragment:M3,map_pars_fragment:w3,map_particle_fragment:E3,map_particle_pars_fragment:T3,metalnessmap_fragment:A3,metalnessmap_pars_fragment:C3,morphinstance_vertex:R3,morphcolor_vertex:P3,morphnormal_vertex:N3,morphtarget_pars_vertex:L3,morphtarget_vertex:D3,normal_fragment_begin:I3,normal_fragment_maps:k3,normal_pars_fragment:F3,normal_pars_vertex:U3,normal_vertex:O3,normalmap_pars_fragment:z3,clearcoat_normal_fragment_begin:B3,clearcoat_normal_fragment_maps:H3,clearcoat_pars_fragment:V3,iridescence_pars_fragment:G3,opaque_fragment:W3,packing:j3,premultiplied_alpha_fragment:X3,project_vertex:$3,dithering_fragment:Y3,dithering_pars_fragment:q3,roughnessmap_fragment:K3,roughnessmap_pars_fragment:Z3,shadowmap_pars_fragment:Q3,shadowmap_pars_vertex:J3,shadowmap_vertex:eN,shadowmask_pars_fragment:tN,skinbase_vertex:nN,skinning_pars_vertex:iN,skinning_vertex:rN,skinnormal_vertex:sN,specularmap_fragment:aN,specularmap_pars_fragment:oN,tonemapping_fragment:lN,tonemapping_pars_fragment:cN,transmission_fragment:uN,transmission_pars_fragment:dN,uv_pars_fragment:fN,uv_pars_vertex:hN,uv_vertex:pN,worldpos_vertex:mN,background_vert:gN,background_frag:xN,backgroundCube_vert:_N,backgroundCube_frag:vN,cube_vert:yN,cube_frag:bN,depth_vert:SN,depth_frag:MN,distance_vert:wN,distance_frag:EN,equirect_vert:TN,equirect_frag:AN,linedashed_vert:CN,linedashed_frag:RN,meshbasic_vert:PN,meshbasic_frag:NN,meshlambert_vert:LN,meshlambert_frag:DN,meshmatcap_vert:IN,meshmatcap_frag:kN,meshnormal_vert:FN,meshnormal_frag:UN,meshphong_vert:ON,meshphong_frag:zN,meshphysical_vert:BN,meshphysical_frag:HN,meshtoon_vert:VN,meshtoon_frag:GN,points_vert:WN,points_frag:jN,shadow_vert:XN,shadow_frag:$N,sprite_vert:YN,sprite_frag:qN},me={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new Ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new $},probesMax:{value:new $},probesResolution:{value:new $}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new Ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},wi={basic:{uniforms:mn([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:mn([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Je(0)},envMapIntensity:{value:1}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:mn([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:mn([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:mn([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Je(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:mn([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:mn([me.points,me.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:mn([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:mn([me.common,me.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:mn([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:mn([me.sprite,me.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distance:{uniforms:mn([me.common,me.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distance_vert,fragmentShader:$e.distance_frag},shadow:{uniforms:mn([me.lights,me.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};wi.physical={uniforms:mn([wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new Ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new Ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new Ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};const Mc={r:0,b:0,g:0},KN=new Rt,KS=new Be;KS.set(-1,0,0,0,1,0,0,0,1);function ZN(t,e,n,i,r,s){const a=new Je(0);let o=r===!0?0:1,l,c,u=null,f=0,d=null;function p(_){let M=_.isScene===!0?_.background:null;if(M&&M.isTexture){const b=_.backgroundBlurriness>0;M=e.get(M,b)}return M}function x(_){let M=!1;const b=p(_);b===null?m(a,o):b&&b.isColor&&(m(b,1),M=!0);const S=t.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,s):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function y(_,M){const b=p(M);b&&(b.isCubeTexture||b.mapping===cd)?(c===void 0&&(c=new Xt(new zr(1,1,1),new ki({name:"BackgroundCubeMaterial",uniforms:Fa(wi.backgroundCube.uniforms),vertexShader:wi.backgroundCube.vertexShader,fragmentShader:wi.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(KN.makeRotationFromEuler(M.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(KS),c.material.toneMapped=Qe.getTransfer(b.colorSpace)!==ut,(u!==b||f!==b.version||d!==t.toneMapping)&&(c.material.needsUpdate=!0,u=b,f=b.version,d=t.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Xt(new dd(2,2),new ki({name:"BackgroundMaterial",uniforms:Fa(wi.background.uniforms),vertexShader:wi.background.vertexShader,fragmentShader:wi.background.fragmentShader,side:Ts,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Qe.getTransfer(b.colorSpace)!==ut,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||f!==b.version||d!==t.toneMapping)&&(l.material.needsUpdate=!0,u=b,f=b.version,d=t.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function m(_,M){_.getRGB(Mc,XS(t)),n.buffers.color.setClear(Mc.r,Mc.g,Mc.b,M,s)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,M=1){a.set(_),o=M,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,m(a,o)},render:x,addToRenderList:y,dispose:h}}function QN(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(N,L,B,D,O){let Y=!1;const G=f(N,D,B,L);s!==G&&(s=G,c(s.object)),Y=p(N,D,B,O),Y&&x(N,D,B,O),O!==null&&e.update(O,t.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,b(N,L,B,D),O!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return t.createVertexArray()}function c(N){return t.bindVertexArray(N)}function u(N){return t.deleteVertexArray(N)}function f(N,L,B,D){const O=D.wireframe===!0;let Y=i[L.id];Y===void 0&&(Y={},i[L.id]=Y);const G=N.isInstancedMesh===!0?N.id:0;let H=Y[G];H===void 0&&(H={},Y[G]=H);let z=H[B.id];z===void 0&&(z={},H[B.id]=z);let W=z[O];return W===void 0&&(W=d(l()),z[O]=W),W}function d(N){const L=[],B=[],D=[];for(let O=0;O<n;O++)L[O]=0,B[O]=0,D[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:B,attributeDivisors:D,object:N,attributes:{},index:null}}function p(N,L,B,D){const O=s.attributes,Y=L.attributes;let G=0;const H=B.getAttributes();for(const z in H)if(H[z].location>=0){const Q=O[z];let le=Y[z];if(le===void 0&&(z==="instanceMatrix"&&N.instanceMatrix&&(le=N.instanceMatrix),z==="instanceColor"&&N.instanceColor&&(le=N.instanceColor)),Q===void 0||Q.attribute!==le||le&&Q.data!==le.data)return!0;G++}return s.attributesNum!==G||s.index!==D}function x(N,L,B,D){const O={},Y=L.attributes;let G=0;const H=B.getAttributes();for(const z in H)if(H[z].location>=0){let Q=Y[z];Q===void 0&&(z==="instanceMatrix"&&N.instanceMatrix&&(Q=N.instanceMatrix),z==="instanceColor"&&N.instanceColor&&(Q=N.instanceColor));const le={};le.attribute=Q,Q&&Q.data&&(le.data=Q.data),O[z]=le,G++}s.attributes=O,s.attributesNum=G,s.index=D}function y(){const N=s.newAttributes;for(let L=0,B=N.length;L<B;L++)N[L]=0}function m(N){h(N,0)}function h(N,L){const B=s.newAttributes,D=s.enabledAttributes,O=s.attributeDivisors;B[N]=1,D[N]===0&&(t.enableVertexAttribArray(N),D[N]=1),O[N]!==L&&(t.vertexAttribDivisor(N,L),O[N]=L)}function _(){const N=s.newAttributes,L=s.enabledAttributes;for(let B=0,D=L.length;B<D;B++)L[B]!==N[B]&&(t.disableVertexAttribArray(B),L[B]=0)}function M(N,L,B,D,O,Y,G){G===!0?t.vertexAttribIPointer(N,L,B,O,Y):t.vertexAttribPointer(N,L,B,D,O,Y)}function b(N,L,B,D){y();const O=D.attributes,Y=B.getAttributes(),G=L.defaultAttributeValues;for(const H in Y){const z=Y[H];if(z.location>=0){let W=O[H];if(W===void 0&&(H==="instanceMatrix"&&N.instanceMatrix&&(W=N.instanceMatrix),H==="instanceColor"&&N.instanceColor&&(W=N.instanceColor)),W!==void 0){const Q=W.normalized,le=W.itemSize,ve=e.get(W);if(ve===void 0)continue;const Ue=ve.buffer,Fe=ve.type,De=ve.bytesPerElement,Z=Fe===t.INT||Fe===t.UNSIGNED_INT||W.gpuType===eg;if(W.isInterleavedBufferAttribute){const te=W.data,be=te.stride,Ie=W.offset;if(te.isInstancedInterleavedBuffer){for(let xe=0;xe<z.locationSize;xe++)h(z.location+xe,te.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let xe=0;xe<z.locationSize;xe++)m(z.location+xe);t.bindBuffer(t.ARRAY_BUFFER,Ue);for(let xe=0;xe<z.locationSize;xe++)M(z.location+xe,le/z.locationSize,Fe,Q,be*De,(Ie+le/z.locationSize*xe)*De,Z)}else{if(W.isInstancedBufferAttribute){for(let te=0;te<z.locationSize;te++)h(z.location+te,W.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let te=0;te<z.locationSize;te++)m(z.location+te);t.bindBuffer(t.ARRAY_BUFFER,Ue);for(let te=0;te<z.locationSize;te++)M(z.location+te,le/z.locationSize,Fe,Q,le*De,le/z.locationSize*te*De,Z)}}else if(G!==void 0){const Q=G[H];if(Q!==void 0)switch(Q.length){case 2:t.vertexAttrib2fv(z.location,Q);break;case 3:t.vertexAttrib3fv(z.location,Q);break;case 4:t.vertexAttrib4fv(z.location,Q);break;default:t.vertexAttrib1fv(z.location,Q)}}}}_()}function S(){A();for(const N in i){const L=i[N];for(const B in L){const D=L[B];for(const O in D){const Y=D[O];for(const G in Y)u(Y[G].object),delete Y[G];delete D[O]}}delete i[N]}}function E(N){if(i[N.id]===void 0)return;const L=i[N.id];for(const B in L){const D=L[B];for(const O in D){const Y=D[O];for(const G in Y)u(Y[G].object),delete Y[G];delete D[O]}}delete i[N.id]}function C(N){for(const L in i){const B=i[L];for(const D in B){const O=B[D];if(O[N.id]===void 0)continue;const Y=O[N.id];for(const G in Y)u(Y[G].object),delete Y[G];delete O[N.id]}}}function v(N){for(const L in i){const B=i[L],D=N.isInstancedMesh===!0?N.id:0,O=B[D];if(O!==void 0){for(const Y in O){const G=O[Y];for(const H in G)u(G[H].object),delete G[H];delete O[Y]}delete B[D],Object.keys(B).length===0&&delete i[L]}}}function A(){R(),a=!0,s!==r&&(s=r,c(s.object))}function R(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:A,resetDefaultState:R,dispose:S,releaseStatesOfGeometry:E,releaseStatesOfObject:v,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:m,disableUnusedAttributes:_}}function JN(t,e,n){let i;function r(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function a(l,c,u){u!==0&&(t.drawArraysInstanced(i,l,c,u),n.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let p=0;p<u;p++)d+=c[p];n.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function eL(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==ui&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const v=C===Ii&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Dn&&C!==Ai&&!v&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE))}function l(C){if(C==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const u=l(c);u!==c&&(ze("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=n.logarithmicDepthBuffer===!0,d=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&d===!1&&ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),x=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),h=t.getParameter(t.MAX_VERTEX_ATTRIBS),_=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),M=t.getParameter(t.MAX_VARYING_VECTORS),b=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),S=t.getParameter(t.MAX_SAMPLES),E=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:x,maxTextureSize:y,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:_,maxVaryings:M,maxFragmentUniforms:b,maxSamples:S,samples:E}}function tL(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new br,o=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){n=u(f,d,0)},this.setState=function(f,d,p){const x=f.clippingPlanes,y=f.clipIntersection,m=f.clipShadows,h=t.get(f);if(!r||x===null||x.length===0||s&&!m)s?u(null):c();else{const _=s?0:i,M=_*4;let b=h.clippingState||null;l.value=b,b=u(x,d,M,p);for(let S=0;S!==M;++S)b[S]=n[S];h.clippingState=b,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,p,x){const y=f!==null?f.length:0;let m=null;if(y!==0){if(m=l.value,x!==!0||m===null){const h=p+y*4,_=d.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<h)&&(m=new Float32Array(h));for(let M=0,b=p;M!==y;++M,b+=4)a.copy(f[M]).applyMatrix4(_,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}const fa=4,nL=6,iL=20,rL=256,oo=new hg,F_=new Je;let Lf=null,Df=0,If=0,kf=!1;const sL=new $,is=new $;class U_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:a=256,position:o=sL}=s;Lf=this._renderer.getRenderTarget(),Df=this._renderer.getActiveCubeFace(),If=this._renderer.getActiveMipmapLevel(),kf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=B_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=z_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Lf,Df,If),this._renderer.xr.enabled=kf,e.scissorTest=!1,qs(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===As||e.mapping===ka?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lf=this._renderer.getRenderTarget(),Df=this._renderer.getActiveCubeFace(),If=this._renderer.getActiveMipmapLevel(),kf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:Ii,format:ui,colorSpace:Uu,depthBuffer:!1},r=O_(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=O_(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=aL(s)),this._blurMaterial=lL(s,e,n),this._ggxMaterial=oL(s,e,n)}return r}_compileMaterial(e){const n=new Xt(new Cn,e);this._renderer.compile(n,oo)}_sceneToCubeUV(e,n,i,r,s){const l=new $n(90,1,n,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,p=f.toneMapping;f.getClearColor(F_),f.toneMapping=Ni,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Xt(new zr,new ls({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,m=y.material;let h=!1;const _=e.background;_?_.isColor&&(m.color.copy(_),e.background=null,h=!0):(m.color.copy(F_),h=!0);for(let M=0;M<6;M++){const b=M%3;b===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[M],s.y,s.z)):b===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[M]));const S=this._cubeSize;qs(r,b*S,M>2?S:0,S,S),f.setRenderTarget(r),h&&f.render(y,l),f.render(e,l)}f.toneMapping=p,f.autoClear=d,e.background=_}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===As||e.mapping===ka;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=B_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=z_());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;qs(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,oo)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=n/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),d=c*1.25,p=f*d,{_lodMax:x}=this,y=this._sizeLods[i],m=3*y*(i>x-fa?i-x+fa:0),h=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=x-n,qs(s,m,h,3*y,2*y),r.setRenderTarget(s),r.render(o,oo),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=x-i,qs(e,m,h,3*y,2*y),r.setRenderTarget(e),r.render(o,oo)}_blur(e,n,i,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,n,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,n,i,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;const u=this._sizeLods[r],f=3*u*(r>this._lodMax-fa?r-this._lodMax+fa:0),d=4*(this._cubeSize-u);qs(n,f,d,3*u,2*u),a.setRenderTarget(n),a.render(l,oo)}}function aL(t){const e=[],n=[];let i=t;const r=t-fa+1+nL;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,d=6,p=3,x=new Float32Array(p*d*f),y=new Float32Array(p*d*f);for(let h=0;h<f;h++){const _=h%3*2/3-1,M=h>2?0:-1,b=[_,M,0,_+2/3,M,0,_+2/3,M+1,0,_,M,0,_+2/3,M+1,0,_,M+1,0];x.set(b,p*d*h);for(let S=0;S<d;S++){const E=u[S*2]*2-1,C=u[S*2+1]*2-1;h===0?is.set(1,C,E):h===1?is.set(-E,1,-C):h===2?is.set(-E,C,1):h===3?is.set(-1,C,-E):h===4?is.set(-E,-1,C):is.set(E,C,-1),is.toArray(y,(h*d+S)*p)}}const m=new Cn;m.setAttribute("position",new Li(x,p)),m.setAttribute("outputDirection",new Li(y,p)),n.push(new Xt(m,null)),i>fa&&i--}return{lodMeshes:n,sizeLods:e}}function O_(t,e,n){const i=new hi(t,e,n);return i.texture.mapping=cd,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function qs(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function oL(t,e,n){return new ki({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:rL,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:fd(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function lL(t,e,n){return new ki({name:"SphericalGaussianBlur",defines:{SAMPLES:iL,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:fd(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function z_(){return new ki({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function B_(){return new ki({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function fd(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class ZS extends hi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new WS(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new zr(5,5,5),s=new ki({name:"CubemapFromEquirect",uniforms:Fa(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:un,blending:Ji});s.uniforms.tEquirect.value=n;const a=new Xt(r,s),o=n.minFilter;return n.minFilter===hs&&(n.minFilter=cn),new dP(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}function cL(t){let e=new WeakMap,n=new WeakMap,i=null;function r(d,p=!1){return d==null?null:p?a(d):s(d)}function s(d){if(d&&d.isTexture){const p=d.mapping;if(p===rf||p===sf)if(e.has(d)){const x=e.get(d).texture;return o(x,d.mapping)}else{const x=d.image;if(x&&x.height>0){const y=new ZS(x.height);return y.fromEquirectangularTexture(t,d),e.set(d,y),d.addEventListener("dispose",c),o(y.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const p=d.mapping,x=p===rf||p===sf,y=p===As||p===ka;if(x||y){let m=n.get(d);const h=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==h)return i===null&&(i=new U_(t)),m=x?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,n.set(d,m),m.texture;if(m!==void 0)return m.texture;{const _=d.image;return x&&_&&_.height>0||y&&_&&l(_)?(i===null&&(i=new U_(t)),m=x?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,n.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function o(d,p){return p===rf?d.mapping=As:p===sf&&(d.mapping=ka),d}function l(d){let p=0;const x=6;for(let y=0;y<x;y++)d[y]!==void 0&&p++;return p===x}function c(d){const p=d.target;p.removeEventListener("dispose",c);const x=e.get(p);x!==void 0&&(e.delete(p),x.dispose())}function u(d){const p=d.target;p.removeEventListener("dispose",u);const x=n.get(p);x!==void 0&&(n.delete(p),x.dispose())}function f(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function uL(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Ma("WebGLRenderer: "+i+" extension not supported."),r}}}function dL(t,e,n,i){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const x in d.attributes)e.remove(d.attributes[x]);d.removeEventListener("dispose",a),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,n.memory.geometries++),d}function l(f){const d=f.attributes;for(const p in d)e.update(d[p],t.ARRAY_BUFFER)}function c(f){const d=[],p=f.index,x=f.attributes.position;let y=0;if(x===void 0)return;if(p!==null){const _=p.array;y=p.version;for(let M=0,b=_.length;M<b;M+=3){const S=_[M+0],E=_[M+1],C=_[M+2];d.push(S,E,E,C,C,S)}}else{const _=x.array;y=x.version;for(let M=0,b=_.length/3-1;M<b;M+=3){const S=M+0,E=M+1,C=M+2;d.push(S,E,E,C,C,S)}}const m=new(x.count>=65535?HS:BS)(d,1);m.version=y;const h=s.get(f);h&&e.remove(h),s.set(f,m)}function u(f){const d=s.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function fL(t,e,n){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,d){t.drawElements(i,d,s,f*a),n.update(d,i,1)}function c(f,d,p){p!==0&&(t.drawElementsInstanced(i,d,s,f*a,p),n.update(d,i,p))}function u(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,p);let y=0;for(let m=0;m<p;m++)y+=d[m];n.update(y,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function hL(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:it("WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function pL(t,e,n){const i=new WeakMap,r=new At;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==f){let R=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",R)};var p=R;d!==void 0&&d.texture.dispose();const x=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let b=0;x===!0&&(b=1),y===!0&&(b=2),m===!0&&(b=3);let S=o.attributes.position.count*b,E=1;S>e.maxTextureSize&&(E=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const C=new Float32Array(S*E*4*f),v=new US(C,S,E,f);v.type=Ai,v.needsUpdate=!0;const A=b*4;for(let N=0;N<f;N++){const L=h[N],B=_[N],D=M[N],O=S*E*4*N;for(let Y=0;Y<L.count;Y++){const G=Y*A;x===!0&&(r.fromBufferAttribute(L,Y),C[O+G+0]=r.x,C[O+G+1]=r.y,C[O+G+2]=r.z,C[O+G+3]=0),y===!0&&(r.fromBufferAttribute(B,Y),C[O+G+4]=r.x,C[O+G+5]=r.y,C[O+G+6]=r.z,C[O+G+7]=0),m===!0&&(r.fromBufferAttribute(D,Y),C[O+G+8]=r.x,C[O+G+9]=r.y,C[O+G+10]=r.z,C[O+G+11]=D.itemSize===4?r.w:1)}}d={count:f,texture:v,size:new Ze(S,E)},i.set(o,d),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let x=0;for(let m=0;m<c.length;m++)x+=c[m];const y=o.morphTargetsRelative?1:1-x;l.getUniforms().setValue(t,"morphTargetBaseInfluence",y),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",d.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",d.size)}return{update:s}}function mL(t,e,n,i,r){let s=new WeakMap;function a(c){const u=r.render.frame,f=c.geometry,d=e.get(c,f);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==u&&(p.update(),s.set(p,u))}return d}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:a,dispose:o}}const gL={[SS]:"LINEAR_TONE_MAPPING",[MS]:"REINHARD_TONE_MAPPING",[wS]:"CINEON_TONE_MAPPING",[Jm]:"ACES_FILMIC_TONE_MAPPING",[TS]:"AGX_TONE_MAPPING",[AS]:"NEUTRAL_TONE_MAPPING",[ES]:"CUSTOM_TONE_MAPPING"};function xL(t,e,n,i,r,s){const a=new hi(e,n,{type:t,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new Cn;c.setAttribute("position",new Kt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Kt([0,2,0,0,2,0],2));const u=new sP({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Xt(c,u),d=new hg(-1,1,1,-1,0,1);let p=null,x=null,y=!1,m,h=null,_=[],M=!1;this.setSize=function(b,S){a.setSize(b,S),o!==null&&o.setSize(b,S),l!==null&&l.setSize(b,S);for(let E=0;E<_.length;E++){const C=_[E];C.setSize&&C.setSize(b,S)}},this.setEffects=function(b){_=b,M=_.length>0&&_[0].isRenderPass===!0;const S=a.width,E=a.height;_.length>0&&o===null&&(o=new hi(S,E,{type:Ii,depthBuffer:!1,stencilBuffer:!1}),l=new hi(S,E,{type:Ii,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<_.length;C++){const v=_[C];v.setSize&&v.setSize(S,E)}},this.begin=function(b,S){if(y||b.toneMapping===Ni&&_.length===0)return!1;if(h=S,S!==null){const E=S.width,C=S.height;(a.width!==E||a.height!==C)&&this.setSize(E,C)}return M===!1&&b.setRenderTarget(a),m=b.toneMapping,b.toneMapping=Ni,!0},this.hasRenderPass=function(){return M},this.end=function(b,S){b.toneMapping=m,y=!0;let E=a,C=o;for(let v=0;v<_.length;v++){const A=_[v];A.enabled!==!1&&(A.render(b,C,E,S),A.needsSwap!==!1&&(E=C,C=C===o?l:o))}if(p!==b.outputColorSpace||x!==b.toneMapping){p=b.outputColorSpace,x=b.toneMapping,u.defines={},Qe.getTransfer(p)===ut&&(u.defines.SRGB_TRANSFER="");const v=gL[x];v&&(u.defines[v]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=E.texture,b.setRenderTarget(h),b.render(f,d),h=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const QS=new dn,kp=new cl(1,1),JS=new US,eM=new IR,tM=new WS,H_=[],V_=[],G_=new Float32Array(16),W_=new Float32Array(9),j_=new Float32Array(4);function Va(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=H_[r];if(s===void 0&&(s=new Float32Array(r),H_[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function Vt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Gt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function hd(t,e){let n=V_[e];n===void 0&&(n=new Int32Array(e),V_[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function _L(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function vL(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Vt(n,e))return;t.uniform2fv(this.addr,e),Gt(n,e)}}function yL(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Vt(n,e))return;t.uniform3fv(this.addr,e),Gt(n,e)}}function bL(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Vt(n,e))return;t.uniform4fv(this.addr,e),Gt(n,e)}}function SL(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Vt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Gt(n,e)}else{if(Vt(n,i))return;j_.set(i),t.uniformMatrix2fv(this.addr,!1,j_),Gt(n,i)}}function ML(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Vt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Gt(n,e)}else{if(Vt(n,i))return;W_.set(i),t.uniformMatrix3fv(this.addr,!1,W_),Gt(n,i)}}function wL(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Vt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Gt(n,e)}else{if(Vt(n,i))return;G_.set(i),t.uniformMatrix4fv(this.addr,!1,G_),Gt(n,i)}}function EL(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function TL(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Vt(n,e))return;t.uniform2iv(this.addr,e),Gt(n,e)}}function AL(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Vt(n,e))return;t.uniform3iv(this.addr,e),Gt(n,e)}}function CL(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Vt(n,e))return;t.uniform4iv(this.addr,e),Gt(n,e)}}function RL(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function PL(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Vt(n,e))return;t.uniform2uiv(this.addr,e),Gt(n,e)}}function NL(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Vt(n,e))return;t.uniform3uiv(this.addr,e),Gt(n,e)}}function LL(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Vt(n,e))return;t.uniform4uiv(this.addr,e),Gt(n,e)}}function DL(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(kp.compareFunction=n.isReversedDepthBuffer()?og:ag,s=kp):s=QS,n.setTexture2D(e||s,r)}function IL(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||eM,r)}function kL(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||tM,r)}function FL(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||JS,r)}function UL(t){switch(t){case 5126:return _L;case 35664:return vL;case 35665:return yL;case 35666:return bL;case 35674:return SL;case 35675:return ML;case 35676:return wL;case 5124:case 35670:return EL;case 35667:case 35671:return TL;case 35668:case 35672:return AL;case 35669:case 35673:return CL;case 5125:return RL;case 36294:return PL;case 36295:return NL;case 36296:return LL;case 35678:case 36198:case 36298:case 36306:case 35682:return DL;case 35679:case 36299:case 36307:return IL;case 35680:case 36300:case 36308:case 36293:return kL;case 36289:case 36303:case 36311:case 36292:return FL}}function OL(t,e){t.uniform1fv(this.addr,e)}function zL(t,e){const n=Va(e,this.size,2);t.uniform2fv(this.addr,n)}function BL(t,e){const n=Va(e,this.size,3);t.uniform3fv(this.addr,n)}function HL(t,e){const n=Va(e,this.size,4);t.uniform4fv(this.addr,n)}function VL(t,e){const n=Va(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function GL(t,e){const n=Va(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function WL(t,e){const n=Va(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function jL(t,e){t.uniform1iv(this.addr,e)}function XL(t,e){t.uniform2iv(this.addr,e)}function $L(t,e){t.uniform3iv(this.addr,e)}function YL(t,e){t.uniform4iv(this.addr,e)}function qL(t,e){t.uniform1uiv(this.addr,e)}function KL(t,e){t.uniform2uiv(this.addr,e)}function ZL(t,e){t.uniform3uiv(this.addr,e)}function QL(t,e){t.uniform4uiv(this.addr,e)}function JL(t,e,n){const i=this.cache,r=e.length,s=hd(n,r);Vt(i,s)||(t.uniform1iv(this.addr,s),Gt(i,s));let a;this.type===t.SAMPLER_2D_SHADOW?a=kp:a=QS;for(let o=0;o!==r;++o)n.setTexture2D(e[o]||a,s[o])}function eD(t,e,n){const i=this.cache,r=e.length,s=hd(n,r);Vt(i,s)||(t.uniform1iv(this.addr,s),Gt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||eM,s[a])}function tD(t,e,n){const i=this.cache,r=e.length,s=hd(n,r);Vt(i,s)||(t.uniform1iv(this.addr,s),Gt(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||tM,s[a])}function nD(t,e,n){const i=this.cache,r=e.length,s=hd(n,r);Vt(i,s)||(t.uniform1iv(this.addr,s),Gt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||JS,s[a])}function iD(t){switch(t){case 5126:return OL;case 35664:return zL;case 35665:return BL;case 35666:return HL;case 35674:return VL;case 35675:return GL;case 35676:return WL;case 5124:case 35670:return jL;case 35667:case 35671:return XL;case 35668:case 35672:return $L;case 35669:case 35673:return YL;case 5125:return qL;case 36294:return KL;case 36295:return ZL;case 36296:return QL;case 35678:case 36198:case 36298:case 36306:case 35682:return JL;case 35679:case 36299:case 36307:return eD;case 35680:case 36300:case 36308:case 36293:return tD;case 36289:case 36303:case 36311:case 36292:return nD}}class rD{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=UL(n.type)}}class sD{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=iD(n.type)}}class aD{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const Ff=/(\w+)(\])?(\[|\.)?/g;function X_(t,e){t.seq.push(e),t.map[e.id]=e}function oD(t,e,n){const i=t.name,r=i.length;for(Ff.lastIndex=0;;){const s=Ff.exec(i),a=Ff.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){X_(n,c===void 0?new rD(o,t,e):new sD(o,t,e));break}else{let f=n.map[o];f===void 0&&(f=new aD(o),X_(n,f)),n=f}}}class qc{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(n,a),l=e.getUniformLocation(n,o.name);oD(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function $_(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const lD=37297;let cD=0;function uD(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const Y_=new Be;function dD(t){Qe._getMatrix(Y_,Qe.workingColorSpace,t);const e=`mat3( ${Y_.elements.map(n=>n.toFixed(4))} )`;switch(Qe.getTransfer(t)){case Ou:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return ze("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function q_(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+uD(t.getShaderSource(e),o)}else return s}function fD(t,e){const n=dD(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const hD={[SS]:"Linear",[MS]:"Reinhard",[wS]:"Cineon",[Jm]:"ACESFilmic",[TS]:"AgX",[AS]:"Neutral",[ES]:"Custom"};function pD(t,e){const n=hD[e];return n===void 0?(ze("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const wc=new $;function mD(){Qe.getLuminanceCoefficients(wc);const t=wc.x.toFixed(4),e=wc.y.toFixed(4),n=wc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gD(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vo).join(`
`)}function xD(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function _D(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function vo(t){return t!==""}function K_(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Z_(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const vD=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fp(t){return t.replace(vD,bD)}const yD=new Map;function bD(t,e){let n=$e[e];if(n===void 0){const i=yD.get(e);if(i!==void 0)n=$e[i],ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Fp(n)}const SD=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Q_(t){return t.replace(SD,MD)}function MD(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function J_(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const wD={[Wc]:"SHADOWMAP_TYPE_PCF",[_o]:"SHADOWMAP_TYPE_VSM"};function ED(t){return wD[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const TD={[As]:"ENVMAP_TYPE_CUBE",[ka]:"ENVMAP_TYPE_CUBE",[cd]:"ENVMAP_TYPE_CUBE_UV"};function AD(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":TD[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const CD={[ka]:"ENVMAP_MODE_REFRACTION"};function RD(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":CD[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const PD={[bS]:"ENVMAP_BLENDING_MULTIPLY",[dR]:"ENVMAP_BLENDING_MIX",[fR]:"ENVMAP_BLENDING_ADD"};function ND(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":PD[t.combine]||"ENVMAP_BLENDING_NONE"}function LD(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function DD(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=ED(n),c=AD(n),u=RD(n),f=ND(n),d=LD(n),p=gD(n),x=xD(s),y=r.createProgram();let m,h,_=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(vo).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(vo).join(`
`),h.length>0&&(h+=`
`)):(m=[J_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vo).join(`
`),h=[J_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ni?"#define TONE_MAPPING":"",n.toneMapping!==Ni?$e.tonemapping_pars_fragment:"",n.toneMapping!==Ni?pD("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,fD("linearToOutputTexel",n.outputColorSpace),mD(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(vo).join(`
`)),a=Fp(a),a=K_(a,n),a=Z_(a,n),o=Fp(o),o=K_(o,n),o=Z_(o,n),a=Q_(a),o=Q_(o),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",n.glslVersion===c_?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===c_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const M=_+m+a,b=_+h+o,S=$_(r,r.VERTEX_SHADER,M),E=$_(r,r.FRAGMENT_SHADER,b);r.attachShader(y,S),r.attachShader(y,E),n.index0AttributeName!==void 0?r.bindAttribLocation(y,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function C(N){if(t.debug.checkShaderErrors){const L=r.getProgramInfoLog(y)||"",B=r.getShaderInfoLog(S)||"",D=r.getShaderInfoLog(E)||"",O=L.trim(),Y=B.trim(),G=D.trim();let H=!0,z=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(H=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,y,S,E);else{const W=q_(r,S,"vertex"),Q=q_(r,E,"fragment");it("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+O+`
`+W+`
`+Q)}else O!==""?ze("WebGLProgram: Program Info Log:",O):(Y===""||G==="")&&(z=!1);z&&(N.diagnostics={runnable:H,programLog:O,vertexShader:{log:Y,prefix:m},fragmentShader:{log:G,prefix:h}})}r.deleteShader(S),r.deleteShader(E),v=new qc(r,y),A=_D(r,y)}let v;this.getUniforms=function(){return v===void 0&&C(this),v};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let R=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=r.getProgramParameter(y,lD)),R},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=cD++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=S,this.fragmentShader=E,this}let ID=0;class kD{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const r=this._getShaderCacheForMaterial(e);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new FD(e),n.set(e,i)),i}}class FD{constructor(e){this.id=ID++,this.code=e,this.usedTimes=0}}function UD(t){return t===Cs||t===ku||t===Fu}function OD(t,e,n,i,r,s){const a=new OS,o=new kD,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(v){return l.add(v),v===0?"uv":`uv${v}`}function y(v,A,R,N,L,B){const D=N.fog,O=L.geometry,Y=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?N.environment:null,G=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,H=e.get(v.envMap||Y,G),z=H&&H.mapping===cd?H.image.height:null,W=p[v.type];v.precision!==null&&(d=i.getMaxPrecision(v.precision),d!==v.precision&&ze("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const Q=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,le=Q!==void 0?Q.length:0;let ve=0;O.morphAttributes.position!==void 0&&(ve=1),O.morphAttributes.normal!==void 0&&(ve=2),O.morphAttributes.color!==void 0&&(ve=3);let Ue,Fe,De,Z;if(W){const xt=wi[W];Ue=xt.vertexShader,Fe=xt.fragmentShader}else{Ue=v.vertexShader,Fe=v.fragmentShader;const xt=o.getVertexShaderStage(v),ot=o.getFragmentShaderStage(v);o.update(v,xt,ot),De=xt.id,Z=ot.id}const te=t.getRenderTarget(),be=t.state.buffers.depth.getReversed(),Ie=L.isInstancedMesh===!0,xe=L.isBatchedMesh===!0,He=!!v.map,ct=!!v.matcap,Ve=!!H,Ge=!!v.aoMap,rt=!!v.lightMap,Oe=!!v.bumpMap&&v.wireframe===!1,st=!!v.normalMap,wt=!!v.displacementMap,Wt=!!v.emissiveMap,at=!!v.metalnessMap,ht=!!v.roughnessMap,I=v.anisotropy>0,ie=v.clearcoat>0,Ae=v.dispersion>0,P=v.retroreflectivity>0,w=v.iridescence>0,F=v.sheen>0,V=v.transmission>0,K=I&&!!v.anisotropyMap,oe=ie&&!!v.clearcoatMap,ce=ie&&!!v.clearcoatNormalMap,J=ie&&!!v.clearcoatRoughnessMap,ne=w&&!!v.iridescenceMap,ue=w&&!!v.iridescenceThicknessMap,Pe=F&&!!v.sheenColorMap,pe=F&&!!v.sheenRoughnessMap,de=!!v.specularMap,Ne=!!v.specularColorMap,ke=!!v.specularIntensityMap,We=V&&!!v.transmissionMap,U=V&&!!v.thicknessMap,fe=!!v.gradientMap,ee=!!v.alphaMap,he=v.alphaTest>0,ye=!!v.alphaHash,re=!!v.extensions;let Le=Ni;v.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Le=t.toneMapping);const Ce={shaderID:W,shaderType:v.type,shaderName:v.name,vertexShader:Ue,fragmentShader:Fe,defines:v.defines,customVertexShaderID:De,customFragmentShaderID:Z,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:xe,batchingColor:xe&&L._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&L.instanceColor!==null,instancingMorph:Ie&&L.morphTexture!==null,outputColorSpace:te===null?t.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Qe.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:He,matcap:ct,envMap:Ve,envMapMode:Ve&&H.mapping,envMapCubeUVHeight:z,aoMap:Ge,lightMap:rt,bumpMap:Oe,normalMap:st,displacementMap:wt,emissiveMap:Wt,normalMapObjectSpace:st&&v.normalMapType===mR,normalMapTangentSpace:st&&v.normalMapType===Lp,packedNormalMap:st&&v.normalMapType===Lp&&UD(v.normalMap.format),metalnessMap:at,roughnessMap:ht,anisotropy:I,anisotropyMap:K,clearcoat:ie,clearcoatMap:oe,clearcoatNormalMap:ce,clearcoatRoughnessMap:J,dispersion:Ae,retroreflection:P,iridescence:w,iridescenceMap:ne,iridescenceThicknessMap:ue,sheen:F,sheenColorMap:Pe,sheenRoughnessMap:pe,specularMap:de,specularColorMap:Ne,specularIntensityMap:ke,transmission:V,transmissionMap:We,thicknessMap:U,gradientMap:fe,opaque:v.transparent===!1&&v.blending===Fo&&v.alphaToCoverage===!1,alphaMap:ee,alphaTest:he,alphaHash:ye,combine:v.combine,mapUv:He&&x(v.map.channel),aoMapUv:Ge&&x(v.aoMap.channel),lightMapUv:rt&&x(v.lightMap.channel),bumpMapUv:Oe&&x(v.bumpMap.channel),normalMapUv:st&&x(v.normalMap.channel),displacementMapUv:wt&&x(v.displacementMap.channel),emissiveMapUv:Wt&&x(v.emissiveMap.channel),metalnessMapUv:at&&x(v.metalnessMap.channel),roughnessMapUv:ht&&x(v.roughnessMap.channel),anisotropyMapUv:K&&x(v.anisotropyMap.channel),clearcoatMapUv:oe&&x(v.clearcoatMap.channel),clearcoatNormalMapUv:ce&&x(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&x(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&x(v.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&x(v.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&x(v.sheenColorMap.channel),sheenRoughnessMapUv:pe&&x(v.sheenRoughnessMap.channel),specularMapUv:de&&x(v.specularMap.channel),specularColorMapUv:Ne&&x(v.specularColorMap.channel),specularIntensityMapUv:ke&&x(v.specularIntensityMap.channel),transmissionMapUv:We&&x(v.transmissionMap.channel),thicknessMapUv:U&&x(v.thicknessMap.channel),alphaMapUv:ee&&x(v.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(st||I),vertexNormals:!!O.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!O.attributes.uv&&(He||ee),fog:!!D,useFog:v.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||O.attributes.normal===void 0&&st===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:be,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:ve,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:t.shadowMap.enabled&&R.length>0,shadowMapType:t.shadowMap.type,toneMapping:Le,decodeVideoTexture:He&&v.map.isVideoTexture===!0&&Qe.getTransfer(v.map.colorSpace)===ut,decodeVideoTextureEmissive:Wt&&v.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(v.emissiveMap.colorSpace)===ut,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===li,flipSided:v.side===un,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:re&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&v.extensions.multiDraw===!0||xe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ce.vertexUv1s=l.has(1),Ce.vertexUv2s=l.has(2),Ce.vertexUv3s=l.has(3),l.clear(),Ce}function m(v){const A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(const R in v.defines)A.push(R),A.push(v.defines[R]);return v.isRawShaderMaterial===!1&&(h(A,v),_(A,v),A.push(t.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function h(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numSunLights),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numSunLightShadows),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function _(v,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.retroreflection&&a.enable(24),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function M(v){const A=p[v.type];let R;if(A){const N=wi[A];R=nP.clone(N.uniforms)}else R=v.uniforms;return R}function b(v,A){let R=u.get(A);return R!==void 0?++R.usedTimes:(R=new DD(t,A,v,r),c.push(R),u.set(A,R)),R}function S(v){if(--v.usedTimes===0){const A=c.indexOf(v);c[A]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function E(v){o.remove(v)}function C(){o.dispose()}return{getParameters:y,getProgramCacheKey:m,getUniforms:M,acquireProgram:b,releaseProgram:S,releaseShaderCache:E,programs:c,dispose:C}}function zD(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,l){t.get(a)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function BD(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function ev(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function tv(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,x,y,m,h){let _=t[e];return _===void 0?(_={id:d.id,object:d,geometry:p,material:x,materialVariant:a(d),groupOrder:y,renderOrder:d.renderOrder,z:m,group:h},t[e]=_):(_.id=d.id,_.object=d,_.geometry=p,_.material=x,_.materialVariant=a(d),_.groupOrder=y,_.renderOrder=d.renderOrder,_.z=m,_.group=h),e++,_}function l(d,p,x,y,m,h,_){_.reversedDepth===!0&&(m=-m);const M=o(d,p,x,y,m,h);x.transmission>0?i.push(M):x.transparent===!0?r.push(M):n.push(M)}function c(d,p,x,y,m,h){const _=o(d,p,x,y,m,h);x.transmission>0?i.unshift(_):x.transparent===!0?r.unshift(_):n.unshift(_)}function u(d,p){n.length>1&&n.sort(d||BD),i.length>1&&i.sort(p||ev),r.length>1&&r.sort(p||ev)}function f(){for(let d=e,p=t.length;d<p;d++){const x=t[d];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function HD(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new tv,t.set(i,[a])):r>=s.length?(a=new tv,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function VD(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"SunLight":case"DirectionalLight":n={direction:new $,color:new Je};break;case"SpotLight":n={position:new $,direction:new $,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new $,color:new Je,distance:0,decay:0};break;case"HemisphereLight":n={direction:new $,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":n={color:new Je,position:new $,halfWidth:new $,halfHeight:new $};break}return t[e.id]=n,n}}}function GD(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let WD=0;function jD(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function XD(t){const e=new VD,n=GD(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new $);const r=new $,s=new Rt,a=new Rt;function o(c){let u=0,f=0,d=0;for(let L=0;L<9;L++)i.probe[L].set(0,0,0);let p=0,x=0,y=0,m=0,h=0,_=0,M=0,b=0,S=0,E=0,C=0,v=0,A=0,R=0;c.sort(jD);for(let L=0,B=c.length;L<B;L++){const D=c[L],O=D.color,Y=D.intensity,G=D.distance;let H=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Cs?H=D.shadow.map.texture:H=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=O.r*Y,f+=O.g*Y,d+=O.b*Y;else if(D.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(D.sh.coefficients[z],Y);R++}else if(D.isSunLight){const z=e.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const W=D.shadow,Q=n.get(D);Q.shadowIntensity=W.intensity,Q.shadowBias=W.bias,Q.shadowNormalBias=W.normalBias,Q.shadowRadius=W.radius,Q.shadowMapSize.copy(W.mapSize).multiply(W.getFrameExtents()),i.sunShadow[x]=Q,i.sunShadowMap[x]=H;const le=W.getViewportCount();for(let ve=0;ve<le;ve++)i.sunShadowMatrix[y+ve]=W.getMatrix(ve),i.sunShadowCascade[y+ve]=W._cascadeData[ve];y+=le,x++}i.sun[p]=z,p++}else if(D.isDirectionalLight){const z=e.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const W=D.shadow,Q=n.get(D);Q.shadowIntensity=W.intensity,Q.shadowBias=W.bias,Q.shadowNormalBias=W.normalBias,Q.shadowRadius=W.radius,Q.shadowMapSize=W.mapSize,i.directionalShadow[m]=Q,i.directionalShadowMap[m]=H,i.directionalShadowMatrix[m]=D.shadow.matrix,S++}i.directional[m]=z,m++}else if(D.isSpotLight){const z=e.get(D);z.position.setFromMatrixPosition(D.matrixWorld),z.color.copy(O).multiplyScalar(Y),z.distance=G,z.coneCos=Math.cos(D.angle),z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),z.decay=D.decay,i.spot[_]=z;const W=D.shadow;if(D.map&&(i.spotLightMap[v]=D.map,v++,W.updateMatrices(D),D.castShadow&&A++),i.spotLightMatrix[_]=W.matrix,D.castShadow){const Q=n.get(D);Q.shadowIntensity=W.intensity,Q.shadowBias=W.bias,Q.shadowNormalBias=W.normalBias,Q.shadowRadius=W.radius,Q.shadowMapSize=W.mapSize,i.spotShadow[_]=Q,i.spotShadowMap[_]=H,C++}_++}else if(D.isRectAreaLight){const z=e.get(D);z.color.copy(O).multiplyScalar(Y),z.halfWidth.set(D.width*.5,0,0),z.halfHeight.set(0,D.height*.5,0),i.rectArea[M]=z,M++}else if(D.isPointLight){const z=e.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity),z.distance=D.distance,z.decay=D.decay,D.castShadow){const W=D.shadow,Q=n.get(D);Q.shadowIntensity=W.intensity,Q.shadowBias=W.bias,Q.shadowNormalBias=W.normalBias,Q.shadowRadius=W.radius,Q.shadowMapSize=W.mapSize,Q.shadowCameraNear=W.camera.near,Q.shadowCameraFar=W.camera.far,i.pointShadow[h]=Q,i.pointShadowMap[h]=H,i.pointShadowMatrix[h]=D.shadow.matrix,E++}i.point[h]=z,h++}else if(D.isHemisphereLight){const z=e.get(D);z.skyColor.copy(D.color).multiplyScalar(Y),z.groundColor.copy(D.groundColor).multiplyScalar(Y),i.hemi[b]=z,b++}}M>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=me.LTC_FLOAT_1,i.rectAreaLTC2=me.LTC_FLOAT_2):(i.rectAreaLTC1=me.LTC_HALF_1,i.rectAreaLTC2=me.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const N=i.hash;(N.sunLength!==p||N.directionalLength!==m||N.pointLength!==h||N.spotLength!==_||N.rectAreaLength!==M||N.hemiLength!==b||N.numSunShadows!==x||N.numDirectionalShadows!==S||N.numPointShadows!==E||N.numSpotShadows!==C||N.numSpotMaps!==v||N.numLightProbes!==R)&&(i.sun.length=p,i.directional.length=m,i.spot.length=_,i.rectArea.length=M,i.point.length=h,i.hemi.length=b,i.sunShadow.length=x,i.sunShadowMap.length=x,i.sunShadowMatrix.length=y,i.sunShadowCascade.length=y,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.directionalShadowMatrix.length=S,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=C,i.spotShadowMap.length=C,i.spotLightMatrix.length=C+v-A,i.spotLightMap.length=v,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=R,N.sunLength=p,N.directionalLength=m,N.pointLength=h,N.spotLength=_,N.rectAreaLength=M,N.hemiLength=b,N.numSunShadows=x,N.numDirectionalShadows=S,N.numPointShadows=E,N.numSpotShadows=C,N.numSpotMaps=v,N.numLightProbes=R,i.version=WD++)}function l(c,u){let f=0,d=0,p=0,x=0,y=0,m=0;const h=u.matrixWorldInverse;for(let _=0,M=c.length;_<M;_++){const b=c[_];if(b.isSunLight){const S=i.sun[f];S.direction.setFromMatrixPosition(b.matrixWorld),S.direction.transformDirection(h),f++}else if(b.isDirectionalLight){const S=i.directional[d];S.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(h),d++}else if(b.isSpotLight){const S=i.spot[x];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(h),S.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(h),x++}else if(b.isRectAreaLight){const S=i.rectArea[y];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(h),a.identity(),s.copy(b.matrixWorld),s.premultiply(h),a.extractRotation(s),S.halfWidth.set(b.width*.5,0,0),S.halfHeight.set(0,b.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),y++}else if(b.isPointLight){const S=i.point[p];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(h),p++}else if(b.isHemisphereLight){const S=i.hemi[m];S.direction.setFromMatrixPosition(b.matrixWorld),S.direction.transformDirection(h),m++}}}return{setup:o,setupView:l,state:i}}function nv(t){const e=new XD(t),n=[],i=[],r=[];function s(d){f.camera=d,n.length=0,i.length=0,r.length=0}function a(d){n.push(d)}function o(d){i.push(d)}function l(d){r.push(d)}function c(){e.setup(n)}function u(d){e.setupView(n,d)}const f={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function $D(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new nv(t),e.set(r,[o])):s>=a.length?(o=new nv(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const YD=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qD=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,KD=[new $(1,0,0),new $(-1,0,0),new $(0,1,0),new $(0,-1,0),new $(0,0,1),new $(0,0,-1)],ZD=[new $(0,-1,0),new $(0,-1,0),new $(0,0,1),new $(0,0,-1),new $(0,-1,0),new $(0,-1,0)],iv=new Rt,lo=new $,Uf=new $;function QD(t,e,n){let i=new cg;const r=new Ze,s=new Ze,a=new At,o=new aP,l=new oP,c={},u=n.maxTextureSize,f={[Ts]:un,[un]:Ts,[li]:li},d=new ki({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ze},radius:{value:4}},vertexShader:YD,fragmentShader:qD}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const x=new Cn;x.setAttribute("position",new Li(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Xt(x,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wc;let h=this.type;this.render=function(E,C,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===XC&&(ze("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Wc);const A=t.getRenderTarget(),R=t.getActiveCubeFace(),N=t.getActiveMipmapLevel(),L=t.state;L.setBlending(Ji),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const B=h!==this.type;B&&C.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(O=>O.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,O=E.length;D<O;D++){const Y=E[D],G=Y.shadow;if(G===void 0){ze("WebGLShadowMap:",Y,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const H=G.getFrameExtents();r.multiply(H),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/H.x),r.x=s.x*H.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/H.y),r.y=s.y*H.y,G.mapSize.y=s.y));const z=t.state.buffers.depth.getReversed();if(G.camera._reversedDepth=z,G.map===null||B===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===_o){if(Y.isPointLight){ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new hi(r.x,r.y,{format:Cs,type:Ii,minFilter:cn,magFilter:cn,generateMipmaps:!1}),G.map.texture.name=Y.name+".shadowMap",G.map.depthTexture=new cl(r.x,r.y,Ai),G.map.depthTexture.name=Y.name+".shadowMapDepth",G.map.depthTexture.format=sr,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Qt,G.map.depthTexture.magFilter=Qt}else Y.isPointLight?(G.map=new ZS(r.x),G.map.depthTexture=new eP(r.x,Di)):(G.map=new hi(r.x,r.y),G.map.depthTexture=new cl(r.x,r.y,Di)),G.map.depthTexture.name=Y.name+".shadowMap",G.map.depthTexture.format=sr,this.type===Wc?(G.map.depthTexture.compareFunction=z?og:ag,G.map.depthTexture.minFilter=cn,G.map.depthTexture.magFilter=cn):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Qt,G.map.depthTexture.magFilter=Qt);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==r.x||G.map.height!==r.y)&&G.map.setSize(r.x,r.y);const W=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();Y.isPointLight!==!0&&G.updateMatrices(Y,v);for(let Q=0;Q<W;Q++){const le=G.getCamera(Q);if(Y.isPointLight){const ve=G.camera,Ue=G.matrix,Fe=Y.distance||ve.far;Fe!==ve.far&&(ve.far=Fe,ve.updateProjectionMatrix()),lo.setFromMatrixPosition(Y.matrixWorld),ve.position.copy(lo),Uf.copy(ve.position),Uf.add(KD[Q]),ve.up.copy(ZD[Q]),ve.lookAt(Uf),ve.updateMatrixWorld(),Ue.makeTranslation(-lo.x,-lo.y,-lo.z),iv.multiplyMatrices(ve.projectionMatrix,ve.matrixWorldInverse),G._frustum.setFromProjectionMatrix(iv,ve.coordinateSystem,ve.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)t.setRenderTarget(G.map,Q),t.clear();else{Q===0&&(t.setRenderTarget(G.map),t.clear());const ve=G.getViewport(Q);a.set(s.x*ve.x,s.y*ve.y,s.x*ve.z,s.y*ve.w),L.viewport(a)}i=G.getFrustum(Q),b(C,v,le,Y,this.type)}G.isPointLightShadow!==!0&&this.type===_o&&_(G,v),G.needsUpdate=!1}h=this.type,m.needsUpdate=!1,t.setRenderTarget(A,R,N)};function _(E,C){const v=e.update(y);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null?E.mapPass=new hi(r.x,r.y,{format:Cs,type:Ii}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,t.setRenderTarget(E.mapPass),t.clear(),t.renderBufferDirect(C,null,v,d,y,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value.set(E.map.width,E.map.height),p.uniforms.radius.value=E.radius,t.setRenderTarget(E.map),t.clear(),t.renderBufferDirect(C,null,v,p,y,null)}function M(E,C,v,A){let R=null;const N=v.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(N!==void 0)R=N;else if(R=v.isPointLight===!0?l:o,t.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const L=R.uuid,B=C.uuid;let D=c[L];D===void 0&&(D={},c[L]=D);let O=D[B];O===void 0&&(O=R.clone(),D[B]=O,C.addEventListener("dispose",S)),R=O}if(R.visible=C.visible,R.wireframe=C.wireframe,A===_o?R.side=C.shadowSide!==null?C.shadowSide:C.side:R.side=C.shadowSide!==null?C.shadowSide:f[C.side],R.alphaMap=C.alphaMap,R.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,R.map=C.map,R.clipShadows=C.clipShadows,R.clippingPlanes=C.clippingPlanes,R.clipIntersection=C.clipIntersection,R.displacementMap=C.displacementMap,R.displacementScale=C.displacementScale,R.displacementBias=C.displacementBias,R.wireframeLinewidth=C.wireframeLinewidth,R.linewidth=C.linewidth,v.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const L=t.properties.get(R);L.light=v}return R}function b(E,C,v,A,R){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&R===_o)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,E.matrixWorld);const B=e.update(E),D=E.material;if(Array.isArray(D)){const O=B.groups;for(let Y=0,G=O.length;Y<G;Y++){const H=O[Y],z=D[H.materialIndex];if(z&&z.visible){const W=M(E,z,A,R);E.onBeforeShadow(t,E,C,v,B,W,H),t.renderBufferDirect(v,null,B,W,E,H),E.onAfterShadow(t,E,C,v,B,W,H)}}}else if(D.visible){const O=M(E,D,A,R);E.onBeforeShadow(t,E,C,v,B,O,null),t.renderBufferDirect(v,null,B,O,E,null),E.onAfterShadow(t,E,C,v,B,O,null)}}const L=E.children;for(let B=0,D=L.length;B<D;B++)b(L[B],C,v,A,R)}function S(E){E.target.removeEventListener("dispose",S);for(const v in c){const A=c[v],R=E.target.uuid;R in A&&(A[R].dispose(),delete A[R])}}}function JD(t,e){function n(){let U=!1;const fe=new At;let ee=null;const he=new At(0,0,0,0);return{setMask:function(ye){ee!==ye&&!U&&(t.colorMask(ye,ye,ye,ye),ee=ye)},setLocked:function(ye){U=ye},setClear:function(ye,re,Le,Ce,xt){xt===!0&&(ye*=Ce,re*=Ce,Le*=Ce),fe.set(ye,re,Le,Ce),he.equals(fe)===!1&&(t.clearColor(ye,re,Le,Ce),he.copy(fe))},reset:function(){U=!1,ee=null,he.set(-1,0,0,0)}}}function i(){let U=!1,fe=!1,ee=null,he=null,ye=null;return{setReversed:function(re){if(fe!==re){const Le=e.get("EXT_clip_control");re?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),fe=re;const Ce=ye;ye=null,this.setClear(Ce)}},getReversed:function(){return fe},setTest:function(re){re?te(t.DEPTH_TEST):be(t.DEPTH_TEST)},setMask:function(re){ee!==re&&!U&&(t.depthMask(re),ee=re)},setFunc:function(re){if(fe&&(re=AR[re]),he!==re){switch(re){case Yh:t.depthFunc(t.NEVER);break;case qh:t.depthFunc(t.ALWAYS);break;case Kh:t.depthFunc(t.LESS);break;case sl:t.depthFunc(t.LEQUAL);break;case Zh:t.depthFunc(t.EQUAL);break;case Qh:t.depthFunc(t.GEQUAL);break;case Jh:t.depthFunc(t.GREATER);break;case ep:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}he=re}},setLocked:function(re){U=re},setClear:function(re){ye!==re&&(ye=re,fe&&(re=1-re),t.clearDepth(re))},reset:function(){U=!1,ee=null,he=null,ye=null,fe=!1}}}function r(){let U=!1,fe=null,ee=null,he=null,ye=null,re=null,Le=null,Ce=null,xt=null;return{setTest:function(ot){U||(ot?te(t.STENCIL_TEST):be(t.STENCIL_TEST))},setMask:function(ot){fe!==ot&&!U&&(t.stencilMask(ot),fe=ot)},setFunc:function(ot,ei,mi){(ee!==ot||he!==ei||ye!==mi)&&(t.stencilFunc(ot,ei,mi),ee=ot,he=ei,ye=mi)},setOp:function(ot,ei,mi){(re!==ot||Le!==ei||Ce!==mi)&&(t.stencilOp(ot,ei,mi),re=ot,Le=ei,Ce=mi)},setLocked:function(ot){U=ot},setClear:function(ot){xt!==ot&&(t.clearStencil(ot),xt=ot)},reset:function(){U=!1,fe=null,ee=null,he=null,ye=null,re=null,Le=null,Ce=null,xt=null}}}const s=new n,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},f={},d={},p=new WeakMap,x=[],y=null,m=!1,h=null,_=null,M=null,b=null,S=null,E=null,C=null,v=new Je(0,0,0),A=0,R=!1,N=null,L=null,B=null,D=null,O=null;const Y=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,H=0;const z=t.getParameter(t.VERSION);z.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(z)[1]),G=H>=1):z.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),G=H>=2);let W=null,Q={};const le=t.getParameter(t.SCISSOR_BOX),ve=t.getParameter(t.VIEWPORT),Ue=new At().fromArray(le),Fe=new At().fromArray(ve);function De(U,fe,ee,he){const ye=new Uint8Array(4),re=t.createTexture();t.bindTexture(U,re),t.texParameteri(U,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(U,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Le=0;Le<ee;Le++)U===t.TEXTURE_3D||U===t.TEXTURE_2D_ARRAY?t.texImage3D(fe,0,t.RGBA,1,1,he,0,t.RGBA,t.UNSIGNED_BYTE,ye):t.texImage2D(fe+Le,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ye);return re}const Z={};Z[t.TEXTURE_2D]=De(t.TEXTURE_2D,t.TEXTURE_2D,1),Z[t.TEXTURE_CUBE_MAP]=De(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[t.TEXTURE_2D_ARRAY]=De(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Z[t.TEXTURE_3D]=De(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(t.DEPTH_TEST),a.setFunc(sl),Oe(!1),st(a_),te(t.CULL_FACE),Ge(Ji);function te(U){u[U]!==!0&&(t.enable(U),u[U]=!0)}function be(U){u[U]!==!1&&(t.disable(U),u[U]=!1)}function Ie(U,fe){return d[U]!==fe?(t.bindFramebuffer(U,fe),d[U]=fe,U===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=fe),U===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=fe),!0):!1}function xe(U,fe){let ee=x,he=!1;if(U){ee=p.get(fe),ee===void 0&&(ee=[],p.set(fe,ee));const ye=U.textures;if(ee.length!==ye.length||ee[0]!==t.COLOR_ATTACHMENT0){for(let re=0,Le=ye.length;re<Le;re++)ee[re]=t.COLOR_ATTACHMENT0+re;ee.length=ye.length,he=!0}}else ee[0]!==t.BACK&&(ee[0]=t.BACK,he=!0);he&&t.drawBuffers(ee)}function He(U){return y!==U?(t.useProgram(U),y=U,!0):!1}const ct={[Zs]:t.FUNC_ADD,[YC]:t.FUNC_SUBTRACT,[qC]:t.FUNC_REVERSE_SUBTRACT};ct[KC]=t.MIN,ct[ZC]=t.MAX;const Ve={[QC]:t.ZERO,[JC]:t.ONE,[eR]:t.SRC_COLOR,[vS]:t.SRC_ALPHA,[aR]:t.SRC_ALPHA_SATURATE,[rR]:t.DST_COLOR,[nR]:t.DST_ALPHA,[tR]:t.ONE_MINUS_SRC_COLOR,[yS]:t.ONE_MINUS_SRC_ALPHA,[sR]:t.ONE_MINUS_DST_COLOR,[iR]:t.ONE_MINUS_DST_ALPHA,[oR]:t.CONSTANT_COLOR,[lR]:t.ONE_MINUS_CONSTANT_COLOR,[cR]:t.CONSTANT_ALPHA,[uR]:t.ONE_MINUS_CONSTANT_ALPHA};function Ge(U,fe,ee,he,ye,re,Le,Ce,xt,ot){if(U===Ji){m===!0&&(be(t.BLEND),m=!1);return}if(m===!1&&(te(t.BLEND),m=!0),U!==$C){if(U!==h||ot!==R){if((_!==Zs||S!==Zs)&&(t.blendEquation(t.FUNC_ADD),_=Zs,S=Zs),ot)switch(U){case Fo:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Uo:t.blendFunc(t.ONE,t.ONE);break;case o_:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case l_:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:it("WebGLState: Invalid blending: ",U);break}else switch(U){case Fo:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Uo:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case o_:it("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case l_:it("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:it("WebGLState: Invalid blending: ",U);break}M=null,b=null,E=null,C=null,v.set(0,0,0),A=0,h=U,R=ot}return}ye=ye||fe,re=re||ee,Le=Le||he,(fe!==_||ye!==S)&&(t.blendEquationSeparate(ct[fe],ct[ye]),_=fe,S=ye),(ee!==M||he!==b||re!==E||Le!==C)&&(t.blendFuncSeparate(Ve[ee],Ve[he],Ve[re],Ve[Le]),M=ee,b=he,E=re,C=Le),(Ce.equals(v)===!1||xt!==A)&&(t.blendColor(Ce.r,Ce.g,Ce.b,xt),v.copy(Ce),A=xt),h=U,R=!1}function rt(U,fe){U.side===li?be(t.CULL_FACE):te(t.CULL_FACE);let ee=U.side===un;fe&&(ee=!ee),Oe(ee),U.blending===Fo&&U.transparent===!1?Ge(Ji):Ge(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),s.setMask(U.colorWrite);const he=U.stencilWrite;o.setTest(he),he&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Wt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?te(t.SAMPLE_ALPHA_TO_COVERAGE):be(t.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(U){N!==U&&(U?t.frontFace(t.CW):t.frontFace(t.CCW),N=U)}function st(U){U!==WC?(te(t.CULL_FACE),U!==L&&(U===a_?t.cullFace(t.BACK):U===jC?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):be(t.CULL_FACE),L=U}function wt(U){U!==B&&(G&&t.lineWidth(U),B=U)}function Wt(U,fe,ee){U?(te(t.POLYGON_OFFSET_FILL),(D!==fe||O!==ee)&&(D=fe,O=ee,a.getReversed()&&(fe=-fe),t.polygonOffset(fe,ee))):be(t.POLYGON_OFFSET_FILL)}function at(U){U?te(t.SCISSOR_TEST):be(t.SCISSOR_TEST)}function ht(U){U===void 0&&(U=t.TEXTURE0+Y-1),W!==U&&(t.activeTexture(U),W=U)}function I(U,fe,ee){ee===void 0&&(W===null?ee=t.TEXTURE0+Y-1:ee=W);let he=Q[ee];he===void 0&&(he={type:void 0,texture:void 0},Q[ee]=he),(he.type!==U||he.texture!==fe)&&(W!==ee&&(t.activeTexture(ee),W=ee),t.bindTexture(U,fe||Z[U]),he.type=U,he.texture=fe)}function ie(){const U=Q[W];U!==void 0&&U.type!==void 0&&(t.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Ae(){try{t.compressedTexImage2D(...arguments)}catch(U){it("WebGLState:",U)}}function P(){try{t.compressedTexImage3D(...arguments)}catch(U){it("WebGLState:",U)}}function w(){try{t.texSubImage2D(...arguments)}catch(U){it("WebGLState:",U)}}function F(){try{t.texSubImage3D(...arguments)}catch(U){it("WebGLState:",U)}}function V(){try{t.compressedTexSubImage2D(...arguments)}catch(U){it("WebGLState:",U)}}function K(){try{t.compressedTexSubImage3D(...arguments)}catch(U){it("WebGLState:",U)}}function oe(){try{t.texStorage2D(...arguments)}catch(U){it("WebGLState:",U)}}function ce(){try{t.texStorage3D(...arguments)}catch(U){it("WebGLState:",U)}}function J(){try{t.texImage2D(...arguments)}catch(U){it("WebGLState:",U)}}function ne(){try{t.texImage3D(...arguments)}catch(U){it("WebGLState:",U)}}function ue(U){return f[U]!==void 0?f[U]:t.getParameter(U)}function Pe(U,fe){f[U]!==fe&&(t.pixelStorei(U,fe),f[U]=fe)}function pe(U){Ue.equals(U)===!1&&(t.scissor(U.x,U.y,U.z,U.w),Ue.copy(U))}function de(U){Fe.equals(U)===!1&&(t.viewport(U.x,U.y,U.z,U.w),Fe.copy(U))}function Ne(U,fe){let ee=c.get(fe);ee===void 0&&(ee=new WeakMap,c.set(fe,ee));let he=ee.get(U);he===void 0&&(he=t.getUniformBlockIndex(fe,U.name),ee.set(U,he))}function ke(U,fe){const he=c.get(fe).get(U);l.get(fe)!==he&&(t.uniformBlockBinding(fe,he,U.__bindingPointIndex),l.set(fe,he))}function We(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),u={},f={},W=null,Q={},d={},p=new WeakMap,x=[],y=null,m=!1,h=null,_=null,M=null,b=null,S=null,E=null,C=null,v=new Je(0,0,0),A=0,R=!1,N=null,L=null,B=null,D=null,O=null,Ue.set(0,0,t.canvas.width,t.canvas.height),Fe.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:te,disable:be,bindFramebuffer:Ie,drawBuffers:xe,useProgram:He,setBlending:Ge,setMaterial:rt,setFlipSided:Oe,setCullFace:st,setLineWidth:wt,setPolygonOffset:Wt,setScissorTest:at,activeTexture:ht,bindTexture:I,unbindTexture:ie,compressedTexImage2D:Ae,compressedTexImage3D:P,texImage2D:J,texImage3D:ne,pixelStorei:Pe,getParameter:ue,updateUBOMapping:Ne,uniformBlockBinding:ke,texStorage2D:oe,texStorage3D:ce,texSubImage2D:w,texSubImage3D:F,compressedTexSubImage2D:V,compressedTexSubImage3D:K,scissor:pe,viewport:de,reset:We}}function eI(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ze,u=new WeakMap,f=new Set;let d;const p=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(P,w){return x?new OffscreenCanvas(P,w):zu("canvas")}function m(P,w,F){let V=1;const K=Ae(P);if((K.width>F||K.height>F)&&(V=F/Math.max(K.width,K.height)),V<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const oe=Math.floor(V*K.width),ce=Math.floor(V*K.height);d===void 0&&(d=y(oe,ce));const J=w?y(oe,ce):d;return J.width=oe,J.height=ce,J.getContext("2d").drawImage(P,0,0,oe,ce),ze("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+oe+"x"+ce+")."),J}else return"data"in P&&ze("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),P;return P}function h(P){return P.generateMipmaps}function _(P){t.generateMipmap(P)}function M(P){return P.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?t.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function b(P,w,F,V,K,oe=!1){if(P!==null){if(t[P]!==void 0)return t[P];ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ce;V&&(ce=e.get("EXT_texture_norm16"),ce||ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=w;if(w===t.RED&&(F===t.FLOAT&&(J=t.R32F),F===t.HALF_FLOAT&&(J=t.R16F),F===t.UNSIGNED_BYTE&&(J=t.R8),F===t.UNSIGNED_SHORT&&ce&&(J=ce.R16_EXT),F===t.SHORT&&ce&&(J=ce.R16_SNORM_EXT)),w===t.RED_INTEGER&&(F===t.UNSIGNED_BYTE&&(J=t.R8UI),F===t.UNSIGNED_SHORT&&(J=t.R16UI),F===t.UNSIGNED_INT&&(J=t.R32UI),F===t.BYTE&&(J=t.R8I),F===t.SHORT&&(J=t.R16I),F===t.INT&&(J=t.R32I)),w===t.RG&&(F===t.FLOAT&&(J=t.RG32F),F===t.HALF_FLOAT&&(J=t.RG16F),F===t.UNSIGNED_BYTE&&(J=t.RG8),F===t.UNSIGNED_SHORT&&ce&&(J=ce.RG16_EXT),F===t.SHORT&&ce&&(J=ce.RG16_SNORM_EXT)),w===t.RG_INTEGER&&(F===t.UNSIGNED_BYTE&&(J=t.RG8UI),F===t.UNSIGNED_SHORT&&(J=t.RG16UI),F===t.UNSIGNED_INT&&(J=t.RG32UI),F===t.BYTE&&(J=t.RG8I),F===t.SHORT&&(J=t.RG16I),F===t.INT&&(J=t.RG32I)),w===t.RGB_INTEGER&&(F===t.UNSIGNED_BYTE&&(J=t.RGB8UI),F===t.UNSIGNED_SHORT&&(J=t.RGB16UI),F===t.UNSIGNED_INT&&(J=t.RGB32UI),F===t.BYTE&&(J=t.RGB8I),F===t.SHORT&&(J=t.RGB16I),F===t.INT&&(J=t.RGB32I)),w===t.RGBA_INTEGER&&(F===t.UNSIGNED_BYTE&&(J=t.RGBA8UI),F===t.UNSIGNED_SHORT&&(J=t.RGBA16UI),F===t.UNSIGNED_INT&&(J=t.RGBA32UI),F===t.BYTE&&(J=t.RGBA8I),F===t.SHORT&&(J=t.RGBA16I),F===t.INT&&(J=t.RGBA32I)),w===t.RGB&&(F===t.UNSIGNED_SHORT&&ce&&(J=ce.RGB16_EXT),F===t.SHORT&&ce&&(J=ce.RGB16_SNORM_EXT),F===t.UNSIGNED_INT_5_9_9_9_REV&&(J=t.RGB9_E5),F===t.UNSIGNED_INT_10F_11F_11F_REV&&(J=t.R11F_G11F_B10F)),w===t.RGBA){const ne=oe?Ou:Qe.getTransfer(K);F===t.FLOAT&&(J=t.RGBA32F),F===t.HALF_FLOAT&&(J=t.RGBA16F),F===t.UNSIGNED_BYTE&&(J=ne===ut?t.SRGB8_ALPHA8:t.RGBA8),F===t.UNSIGNED_SHORT&&ce&&(J=ce.RGBA16_EXT),F===t.SHORT&&ce&&(J=ce.RGBA16_SNORM_EXT),F===t.UNSIGNED_SHORT_4_4_4_4&&(J=t.RGBA4),F===t.UNSIGNED_SHORT_5_5_5_1&&(J=t.RGB5_A1)}return(J===t.R16F||J===t.R32F||J===t.RG16F||J===t.RG32F||J===t.RGBA16F||J===t.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function S(P,w){let F;return P?w===null||w===Di||w===ol?F=t.DEPTH24_STENCIL8:w===Ai?F=t.DEPTH32F_STENCIL8:w===al&&(F=t.DEPTH24_STENCIL8,ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Di||w===ol?F=t.DEPTH_COMPONENT24:w===Ai?F=t.DEPTH_COMPONENT32F:w===al&&(F=t.DEPTH_COMPONENT16),F}function E(P,w){return h(P)===!0||P.isFramebufferTexture&&P.minFilter!==Qt&&P.minFilter!==cn?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function C(P){const w=P.target;w.removeEventListener("dispose",C),A(w),w.isVideoTexture&&u.delete(w),w.isHTMLTexture&&f.delete(w)}function v(P){const w=P.target;w.removeEventListener("dispose",v),N(w)}function A(P){const w=i.get(P);if(w.__webglInit===void 0)return;const F=P.source,V=p.get(F);if(V){const K=V[w.__cacheKey];K.usedTimes--,K.usedTimes===0&&R(P),Object.keys(V).length===0&&p.delete(F)}i.remove(P)}function R(P){const w=i.get(P);t.deleteTexture(w.__webglTexture);const F=P.source,V=p.get(F);delete V[w.__cacheKey],a.memory.textures--}function N(P){const w=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(w.__webglFramebuffer[V]))for(let K=0;K<w.__webglFramebuffer[V].length;K++)t.deleteFramebuffer(w.__webglFramebuffer[V][K]);else t.deleteFramebuffer(w.__webglFramebuffer[V]);w.__webglDepthbuffer&&t.deleteRenderbuffer(w.__webglDepthbuffer[V])}else{if(Array.isArray(w.__webglFramebuffer))for(let V=0;V<w.__webglFramebuffer.length;V++)t.deleteFramebuffer(w.__webglFramebuffer[V]);else t.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&t.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&t.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let V=0;V<w.__webglColorRenderbuffer.length;V++)w.__webglColorRenderbuffer[V]&&t.deleteRenderbuffer(w.__webglColorRenderbuffer[V]);w.__webglDepthRenderbuffer&&t.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const F=P.textures;for(let V=0,K=F.length;V<K;V++){const oe=i.get(F[V]);oe.__webglTexture&&(t.deleteTexture(oe.__webglTexture),a.memory.textures--),i.remove(F[V])}i.remove(P)}let L=0;function B(){L=0}function D(){return L}function O(P){L=P}function Y(){const P=L;return P>=r.maxTextures&&ze("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+r.maxTextures),L+=1,P}function G(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function H(P,w){const F=i.get(P);if(P.isVideoTexture&&I(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&F.__version!==P.version){const V=P.image;if(V===null)ze("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)ze("WebGLRenderer: Texture marked for update but image is incomplete");else{be(F,P,w);return}}else P.isExternalTexture&&(F.__webglTexture=P.sourceTexture?P.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,F.__webglTexture,t.TEXTURE0+w)}function z(P,w){const F=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&F.__version!==P.version){be(F,P,w);return}else P.isExternalTexture&&(F.__webglTexture=P.sourceTexture?P.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,F.__webglTexture,t.TEXTURE0+w)}function W(P,w){const F=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&F.__version!==P.version){be(F,P,w);return}n.bindTexture(t.TEXTURE_3D,F.__webglTexture,t.TEXTURE0+w)}function Q(P,w){const F=i.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&F.__version!==P.version){Ie(F,P,w);return}n.bindTexture(t.TEXTURE_CUBE_MAP,F.__webglTexture,t.TEXTURE0+w)}const le={[Iu]:t.REPEAT,[Ti]:t.CLAMP_TO_EDGE,[tp]:t.MIRRORED_REPEAT},ve={[Qt]:t.NEAREST,[hR]:t.NEAREST_MIPMAP_NEAREST,[tc]:t.NEAREST_MIPMAP_LINEAR,[cn]:t.LINEAR,[af]:t.LINEAR_MIPMAP_NEAREST,[hs]:t.LINEAR_MIPMAP_LINEAR},Ue={[xR]:t.NEVER,[SR]:t.ALWAYS,[_R]:t.LESS,[ag]:t.LEQUAL,[vR]:t.EQUAL,[og]:t.GEQUAL,[yR]:t.GREATER,[bR]:t.NOTEQUAL};function Fe(P,w){if(w.type===Ai&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===cn||w.magFilter===af||w.magFilter===tc||w.magFilter===hs||w.minFilter===cn||w.minFilter===af||w.minFilter===tc||w.minFilter===hs)&&ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(P,t.TEXTURE_WRAP_S,le[w.wrapS]),t.texParameteri(P,t.TEXTURE_WRAP_T,le[w.wrapT]),(P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY)&&t.texParameteri(P,t.TEXTURE_WRAP_R,le[w.wrapR]),t.texParameteri(P,t.TEXTURE_MAG_FILTER,ve[w.magFilter]),t.texParameteri(P,t.TEXTURE_MIN_FILTER,ve[w.minFilter]),w.compareFunction&&(t.texParameteri(P,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(P,t.TEXTURE_COMPARE_FUNC,Ue[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Qt||w.minFilter!==tc&&w.minFilter!==hs||w.type===Ai&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");t.texParameterf(P,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function De(P,w){let F=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",C));const V=w.source;let K=p.get(V);K===void 0&&(K={},p.set(V,K));const oe=G(w);if(oe!==P.__cacheKey){K[oe]===void 0&&(K[oe]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,F=!0),K[oe].usedTimes++;const ce=K[P.__cacheKey];ce!==void 0&&(K[P.__cacheKey].usedTimes--,ce.usedTimes===0&&R(w)),P.__cacheKey=oe,P.__webglTexture=K[oe].texture}return F}function Z(P,w,F){return Math.floor(Math.floor(P/F)/w)}function te(P,w,F,V){const oe=P.updateRanges;if(oe.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,w.width,w.height,F,V,w.data);else{oe.sort((Pe,pe)=>Pe.start-pe.start);let ce=0;for(let Pe=1;Pe<oe.length;Pe++){const pe=oe[ce],de=oe[Pe],Ne=pe.start+pe.count,ke=Z(de.start,w.width,4),We=Z(pe.start,w.width,4);de.start<=Ne+1&&ke===We&&Z(de.start+de.count-1,w.width,4)===ke?pe.count=Math.max(pe.count,de.start+de.count-pe.start):(++ce,oe[ce]=de)}oe.length=ce+1;const J=n.getParameter(t.UNPACK_ROW_LENGTH),ne=n.getParameter(t.UNPACK_SKIP_PIXELS),ue=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,w.width);for(let Pe=0,pe=oe.length;Pe<pe;Pe++){const de=oe[Pe],Ne=Math.floor(de.start/4),ke=Math.ceil(de.count/4),We=Ne%w.width,U=Math.floor(Ne/w.width),fe=ke,ee=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,We),n.pixelStorei(t.UNPACK_SKIP_ROWS,U),n.texSubImage2D(t.TEXTURE_2D,0,We,U,fe,ee,F,V,w.data)}P.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,J),n.pixelStorei(t.UNPACK_SKIP_PIXELS,ne),n.pixelStorei(t.UNPACK_SKIP_ROWS,ue)}}function be(P,w,F){let V=t.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(V=t.TEXTURE_2D_ARRAY),w.isData3DTexture&&(V=t.TEXTURE_3D);const K=De(P,w),oe=w.source;n.bindTexture(V,P.__webglTexture,t.TEXTURE0+F);const ce=i.get(oe);if(oe.version!==ce.__version||K===!0){if(n.activeTexture(t.TEXTURE0+F),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){const ee=Qe.getPrimaries(Qe.workingColorSpace),he=w.colorSpace===wr?null:Qe.getPrimaries(w.colorSpace),ye=w.colorSpace===wr||ee===he?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye)}n.pixelStorei(t.UNPACK_ALIGNMENT,w.unpackAlignment);let ne=m(w.image,!1,r.maxTextureSize);ne=ie(w,ne);const ue=s.convert(w.format,w.colorSpace),Pe=s.convert(w.type);let pe=b(w.internalFormat,ue,Pe,w.normalized,w.colorSpace,w.isVideoTexture);Fe(V,w);let de;const Ne=w.mipmaps,ke=w.isVideoTexture!==!0,We=ce.__version===void 0||K===!0,U=oe.dataReady,fe=E(w,ne);if(w.isDepthTexture)pe=S(w.format===ps,w.type),We&&(ke?n.texStorage2D(t.TEXTURE_2D,1,pe,ne.width,ne.height):n.texImage2D(t.TEXTURE_2D,0,pe,ne.width,ne.height,0,ue,Pe,null));else if(w.isDataTexture)if(Ne.length>0){ke&&We&&n.texStorage2D(t.TEXTURE_2D,fe,pe,Ne[0].width,Ne[0].height);for(let ee=0,he=Ne.length;ee<he;ee++)de=Ne[ee],ke?U&&n.texSubImage2D(t.TEXTURE_2D,ee,0,0,de.width,de.height,ue,Pe,de.data):n.texImage2D(t.TEXTURE_2D,ee,pe,de.width,de.height,0,ue,Pe,de.data);w.generateMipmaps=!1}else ke?(We&&n.texStorage2D(t.TEXTURE_2D,fe,pe,ne.width,ne.height),U&&te(w,ne,ue,Pe)):n.texImage2D(t.TEXTURE_2D,0,pe,ne.width,ne.height,0,ue,Pe,ne.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){ke&&We&&n.texStorage3D(t.TEXTURE_2D_ARRAY,fe,pe,Ne[0].width,Ne[0].height,ne.depth);for(let ee=0,he=Ne.length;ee<he;ee++)if(de=Ne[ee],w.format!==ui)if(ue!==null)if(ke){if(U)if(w.layerUpdates.size>0){const ye=k_(de.width,de.height,w.format,w.type);for(const re of w.layerUpdates){const Le=de.data.subarray(re*ye/de.data.BYTES_PER_ELEMENT,(re+1)*ye/de.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ee,0,0,re,de.width,de.height,1,ue,Le)}}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ee,0,0,0,de.width,de.height,ne.depth,ue,de.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,ee,pe,de.width,de.height,ne.depth,0,de.data,0,0);else ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?U&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,ee,0,0,0,de.width,de.height,ne.depth,ue,Pe,de.data):n.texImage3D(t.TEXTURE_2D_ARRAY,ee,pe,de.width,de.height,ne.depth,0,ue,Pe,de.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{ke&&We&&n.texStorage2D(t.TEXTURE_2D,fe,pe,Ne[0].width,Ne[0].height);for(let ee=0,he=Ne.length;ee<he;ee++)de=Ne[ee],w.format!==ui?ue!==null?ke?U&&n.compressedTexSubImage2D(t.TEXTURE_2D,ee,0,0,de.width,de.height,ue,de.data):n.compressedTexImage2D(t.TEXTURE_2D,ee,pe,de.width,de.height,0,de.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?U&&n.texSubImage2D(t.TEXTURE_2D,ee,0,0,de.width,de.height,ue,Pe,de.data):n.texImage2D(t.TEXTURE_2D,ee,pe,de.width,de.height,0,ue,Pe,de.data)}else if(w.isDataArrayTexture)if(ke){if(We&&n.texStorage3D(t.TEXTURE_2D_ARRAY,fe,pe,ne.width,ne.height,ne.depth),U)if(w.layerUpdates.size>0){const ee=k_(ne.width,ne.height,w.format,w.type);for(const he of w.layerUpdates){const ye=ne.data.subarray(he*ee/ne.data.BYTES_PER_ELEMENT,(he+1)*ee/ne.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,he,ne.width,ne.height,1,ue,Pe,ye)}w.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,ue,Pe,ne.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,pe,ne.width,ne.height,ne.depth,0,ue,Pe,ne.data);else if(w.isData3DTexture)ke?(We&&n.texStorage3D(t.TEXTURE_3D,fe,pe,ne.width,ne.height,ne.depth),U&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,ue,Pe,ne.data)):n.texImage3D(t.TEXTURE_3D,0,pe,ne.width,ne.height,ne.depth,0,ue,Pe,ne.data);else if(w.isFramebufferTexture){if(We)if(ke)n.texStorage2D(t.TEXTURE_2D,fe,pe,ne.width,ne.height);else{let ee=ne.width,he=ne.height;for(let ye=0;ye<fe;ye++)n.texImage2D(t.TEXTURE_2D,ye,pe,ee,he,0,ue,Pe,null),ee>>=1,he>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in t){const ee=t.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),ne.parentNode!==ee){ee.appendChild(ne),f.add(w),ee.onpaint=he=>{const ye=he.changedElements;for(const re of f)ye.includes(re.image)&&(re.needsUpdate=!0)},ee.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,ne);else{const ye=t.RGBA,re=t.RGBA,Le=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,ye,re,Le,ne)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(Ne.length>0){if(ke&&We){const ee=Ae(Ne[0]);n.texStorage2D(t.TEXTURE_2D,fe,pe,ee.width,ee.height)}for(let ee=0,he=Ne.length;ee<he;ee++)de=Ne[ee],ke?U&&n.texSubImage2D(t.TEXTURE_2D,ee,0,0,ue,Pe,de):n.texImage2D(t.TEXTURE_2D,ee,pe,ue,Pe,de);w.generateMipmaps=!1}else if(ke){if(We){const ee=Ae(ne);n.texStorage2D(t.TEXTURE_2D,fe,pe,ee.width,ee.height)}U&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ue,Pe,ne)}else n.texImage2D(t.TEXTURE_2D,0,pe,ue,Pe,ne);h(w)&&_(V),ce.__version=oe.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function Ie(P,w,F){if(w.image.length!==6)return;const V=De(P,w),K=w.source;n.bindTexture(t.TEXTURE_CUBE_MAP,P.__webglTexture,t.TEXTURE0+F);const oe=i.get(K);if(K.version!==oe.__version||V===!0){n.activeTexture(t.TEXTURE0+F);const ce=Qe.getPrimaries(Qe.workingColorSpace),J=w.colorSpace===wr?null:Qe.getPrimaries(w.colorSpace),ne=w.colorSpace===wr||ce===J?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const ue=w.isCompressedTexture||w.image[0].isCompressedTexture,Pe=w.image[0]&&w.image[0].isDataTexture,pe=[];for(let re=0;re<6;re++)!ue&&!Pe?pe[re]=m(w.image[re],!0,r.maxCubemapSize):pe[re]=Pe?w.image[re].image:w.image[re],pe[re]=ie(w,pe[re]);const de=pe[0],Ne=s.convert(w.format,w.colorSpace),ke=s.convert(w.type),We=b(w.internalFormat,Ne,ke,w.normalized,w.colorSpace),U=w.isVideoTexture!==!0,fe=oe.__version===void 0||V===!0,ee=K.dataReady;let he=E(w,de);Fe(t.TEXTURE_CUBE_MAP,w);let ye;if(ue){U&&fe&&n.texStorage2D(t.TEXTURE_CUBE_MAP,he,We,de.width,de.height);for(let re=0;re<6;re++){ye=pe[re].mipmaps;for(let Le=0;Le<ye.length;Le++){const Ce=ye[Le];w.format!==ui?Ne!==null?U?ee&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,0,0,Ce.width,Ce.height,Ne,Ce.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,We,Ce.width,Ce.height,0,Ce.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?ee&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,0,0,Ce.width,Ce.height,Ne,ke,Ce.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,We,Ce.width,Ce.height,0,Ne,ke,Ce.data)}}}else{if(ye=w.mipmaps,U&&fe){ye.length>0&&he++;const re=Ae(pe[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,he,We,re.width,re.height)}for(let re=0;re<6;re++)if(Pe){U?ee&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,pe[re].width,pe[re].height,Ne,ke,pe[re].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,We,pe[re].width,pe[re].height,0,Ne,ke,pe[re].data);for(let Le=0;Le<ye.length;Le++){const xt=ye[Le].image[re].image;U?ee&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,0,0,xt.width,xt.height,Ne,ke,xt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,We,xt.width,xt.height,0,Ne,ke,xt.data)}}else{U?ee&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Ne,ke,pe[re]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,We,Ne,ke,pe[re]);for(let Le=0;Le<ye.length;Le++){const Ce=ye[Le];U?ee&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,0,0,Ne,ke,Ce.image[re]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,We,Ne,ke,Ce.image[re])}}}h(w)&&_(t.TEXTURE_CUBE_MAP),oe.__version=K.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function xe(P,w,F,V,K,oe){const ce=s.convert(F.format,F.colorSpace),J=s.convert(F.type),ne=b(F.internalFormat,ce,J,F.normalized,F.colorSpace),ue=i.get(w),Pe=i.get(F);if(Pe.__renderTarget=w,!ue.__hasExternalTextures){const pe=Math.max(1,w.width>>oe),de=Math.max(1,w.height>>oe);K===t.TEXTURE_3D||K===t.TEXTURE_2D_ARRAY?n.texImage3D(K,oe,ne,pe,de,w.depth,0,ce,J,null):n.texImage2D(K,oe,ne,pe,de,0,ce,J,null)}n.bindFramebuffer(t.FRAMEBUFFER,P),ht(w)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,V,K,Pe.__webglTexture,0,at(w)):(K===t.TEXTURE_2D||K>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,V,K,Pe.__webglTexture,oe),n.bindFramebuffer(t.FRAMEBUFFER,null)}function He(P,w,F){if(t.bindRenderbuffer(t.RENDERBUFFER,P),w.depthBuffer){const V=w.depthTexture,K=V&&V.isDepthTexture?V.type:null,oe=S(w.stencilBuffer,K),ce=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;ht(w)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,at(w),oe,w.width,w.height):F?t.renderbufferStorageMultisample(t.RENDERBUFFER,at(w),oe,w.width,w.height):t.renderbufferStorage(t.RENDERBUFFER,oe,w.width,w.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,ce,t.RENDERBUFFER,P)}else{const V=w.textures;for(let K=0;K<V.length;K++){const oe=V[K],ce=s.convert(oe.format,oe.colorSpace),J=s.convert(oe.type),ne=b(oe.internalFormat,ce,J,oe.normalized,oe.colorSpace);ht(w)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,at(w),ne,w.width,w.height):F?t.renderbufferStorageMultisample(t.RENDERBUFFER,at(w),ne,w.width,w.height):t.renderbufferStorage(t.RENDERBUFFER,ne,w.width,w.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function ct(P,w,F){const V=w.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const K=i.get(w.depthTexture);if(K.__renderTarget=w,(!K.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),V){if(K.__webglInit===void 0&&(K.__webglInit=!0,w.depthTexture.addEventListener("dispose",C)),K.__webglTexture===void 0){K.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,K.__webglTexture),Fe(t.TEXTURE_CUBE_MAP,w.depthTexture);const ue=s.convert(w.depthTexture.format),Pe=s.convert(w.depthTexture.type);let pe;w.depthTexture.format===sr?pe=t.DEPTH_COMPONENT24:w.depthTexture.format===ps&&(pe=t.DEPTH24_STENCIL8);for(let de=0;de<6;de++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,pe,w.width,w.height,0,ue,Pe,null)}}else H(w.depthTexture,0);const oe=K.__webglTexture,ce=at(w),J=V?t.TEXTURE_CUBE_MAP_POSITIVE_X+F:t.TEXTURE_2D,ne=w.depthTexture.format===ps?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(w.depthTexture.format===sr)ht(w)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ne,J,oe,0,ce):t.framebufferTexture2D(t.FRAMEBUFFER,ne,J,oe,0);else if(w.depthTexture.format===ps)ht(w)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ne,J,oe,0,ce):t.framebufferTexture2D(t.FRAMEBUFFER,ne,J,oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ve(P){const w=i.get(P),F=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){const V=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),V){const K=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,V.removeEventListener("dispose",K)};V.addEventListener("dispose",K),w.__depthDisposeCallback=K}w.__boundDepthTexture=V}if(P.depthTexture&&!w.__autoAllocateDepthBuffer)if(F)for(let V=0;V<6;V++)ct(w.__webglFramebuffer[V],P,V);else{const V=P.texture.mipmaps;V&&V.length>0?ct(w.__webglFramebuffer[0],P,0):ct(w.__webglFramebuffer,P,0)}else if(F){w.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(n.bindFramebuffer(t.FRAMEBUFFER,w.__webglFramebuffer[V]),w.__webglDepthbuffer[V]===void 0)w.__webglDepthbuffer[V]=t.createRenderbuffer(),He(w.__webglDepthbuffer[V],P,!1);else{const K=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,oe=w.__webglDepthbuffer[V];t.bindRenderbuffer(t.RENDERBUFFER,oe),t.framebufferRenderbuffer(t.FRAMEBUFFER,K,t.RENDERBUFFER,oe)}}else{const V=P.texture.mipmaps;if(V&&V.length>0?n.bindFramebuffer(t.FRAMEBUFFER,w.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=t.createRenderbuffer(),He(w.__webglDepthbuffer,P,!1);else{const K=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,oe=w.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,oe),t.framebufferRenderbuffer(t.FRAMEBUFFER,K,t.RENDERBUFFER,oe)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ge(P,w,F){const V=i.get(P);w!==void 0&&xe(V.__webglFramebuffer,P,P.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),F!==void 0&&Ve(P)}function rt(P){const w=P.texture,F=i.get(P),V=i.get(w);P.addEventListener("dispose",v);const K=P.textures,oe=P.isWebGLCubeRenderTarget===!0,ce=K.length>1;if(ce||(V.__webglTexture===void 0&&(V.__webglTexture=t.createTexture()),V.__version=w.version,a.memory.textures++),oe){F.__webglFramebuffer=[];for(let J=0;J<6;J++)if(w.mipmaps&&w.mipmaps.length>0){F.__webglFramebuffer[J]=[];for(let ne=0;ne<w.mipmaps.length;ne++)F.__webglFramebuffer[J][ne]=t.createFramebuffer()}else F.__webglFramebuffer[J]=t.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){F.__webglFramebuffer=[];for(let J=0;J<w.mipmaps.length;J++)F.__webglFramebuffer[J]=t.createFramebuffer()}else F.__webglFramebuffer=t.createFramebuffer();if(ce)for(let J=0,ne=K.length;J<ne;J++){const ue=i.get(K[J]);ue.__webglTexture===void 0&&(ue.__webglTexture=t.createTexture(),a.memory.textures++)}if(P.samples>0&&ht(P)===!1){F.__webglMultisampledFramebuffer=t.createFramebuffer(),F.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let J=0;J<K.length;J++){const ne=K[J];F.__webglColorRenderbuffer[J]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,F.__webglColorRenderbuffer[J]);const ue=s.convert(ne.format,ne.colorSpace),Pe=s.convert(ne.type),pe=b(ne.internalFormat,ue,Pe,ne.normalized,ne.colorSpace,P.isXRRenderTarget===!0),de=at(P);t.renderbufferStorageMultisample(t.RENDERBUFFER,de,pe,P.width,P.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+J,t.RENDERBUFFER,F.__webglColorRenderbuffer[J])}t.bindRenderbuffer(t.RENDERBUFFER,null),P.depthBuffer&&(F.__webglDepthRenderbuffer=t.createRenderbuffer(),He(F.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(oe){n.bindTexture(t.TEXTURE_CUBE_MAP,V.__webglTexture),Fe(t.TEXTURE_CUBE_MAP,w);for(let J=0;J<6;J++)if(w.mipmaps&&w.mipmaps.length>0)for(let ne=0;ne<w.mipmaps.length;ne++)xe(F.__webglFramebuffer[J][ne],P,w,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ne);else xe(F.__webglFramebuffer[J],P,w,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);h(w)&&_(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ce){for(let J=0,ne=K.length;J<ne;J++){const ue=K[J],Pe=i.get(ue);let pe=t.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(pe=P.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(pe,Pe.__webglTexture),Fe(pe,ue),xe(F.__webglFramebuffer,P,ue,t.COLOR_ATTACHMENT0+J,pe,0),h(ue)&&_(pe)}n.unbindTexture()}else{let J=t.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(J=P.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(J,V.__webglTexture),Fe(J,w),w.mipmaps&&w.mipmaps.length>0)for(let ne=0;ne<w.mipmaps.length;ne++)xe(F.__webglFramebuffer[ne],P,w,t.COLOR_ATTACHMENT0,J,ne);else xe(F.__webglFramebuffer,P,w,t.COLOR_ATTACHMENT0,J,0);h(w)&&_(J),n.unbindTexture()}P.depthBuffer&&Ve(P)}function Oe(P){const w=P.textures;for(let F=0,V=w.length;F<V;F++){const K=w[F];if(h(K)){const oe=M(P),ce=i.get(K).__webglTexture;n.bindTexture(oe,ce),_(oe),n.unbindTexture()}}}const st=[],wt=[];function Wt(P){if(P.samples>0){if(ht(P)===!1){const w=P.textures,F=P.width,V=P.height;let K=t.COLOR_BUFFER_BIT;const oe=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ce=i.get(P),J=w.length>1;if(J)for(let ue=0;ue<w.length;ue++)n.bindFramebuffer(t.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,ce.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const ne=P.texture.mipmaps;ne&&ne.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let ue=0;ue<w.length;ue++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(K|=t.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(K|=t.STENCIL_BUFFER_BIT)),J){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ce.__webglColorRenderbuffer[ue]);const Pe=i.get(w[ue]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Pe,0)}t.blitFramebuffer(0,0,F,V,0,0,F,V,K,t.NEAREST),l===!0&&(st.length=0,wt.length=0,st.push(t.COLOR_ATTACHMENT0+ue),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(st.push(oe),wt.push(oe),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,wt)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,st))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),J)for(let ue=0;ue<w.length;ue++){n.bindFramebuffer(t.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.RENDERBUFFER,ce.__webglColorRenderbuffer[ue]);const Pe=i.get(w[ue]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,ce.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.TEXTURE_2D,Pe,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){const w=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[w])}}}function at(P){return Math.min(r.maxSamples,P.samples)}function ht(P){const w=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function I(P){const w=a.render.frame;u.get(P)!==w&&(u.set(P,w),P.update())}function ie(P,w){const F=P.colorSpace,V=P.format,K=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||F!==Uu&&F!==wr&&(Qe.getTransfer(F)===ut?(V!==ui||K!==Dn)&&ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):it("WebGLTextures: Unsupported texture color space:",F)),w}function Ae(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=B,this.getTextureUnits=D,this.setTextureUnits=O,this.setTexture2D=H,this.setTexture2DArray=z,this.setTexture3D=W,this.setTextureCube=Q,this.rebindTextures=Ge,this.setupRenderTarget=rt,this.updateRenderTargetMipmap=Oe,this.updateMultisampleRenderTarget=Wt,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=ht,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function tI(t,e){function n(i,r=wr){let s;const a=Qe.getTransfer(r);if(i===Dn)return t.UNSIGNED_BYTE;if(i===tg)return t.UNSIGNED_SHORT_4_4_4_4;if(i===ng)return t.UNSIGNED_SHORT_5_5_5_1;if(i===NS)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===LS)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===RS)return t.BYTE;if(i===PS)return t.SHORT;if(i===al)return t.UNSIGNED_SHORT;if(i===eg)return t.INT;if(i===Di)return t.UNSIGNED_INT;if(i===Ai)return t.FLOAT;if(i===Ii)return t.HALF_FLOAT;if(i===DS)return t.ALPHA;if(i===IS)return t.RGB;if(i===ui)return t.RGBA;if(i===sr)return t.DEPTH_COMPONENT;if(i===ps)return t.DEPTH_STENCIL;if(i===kS)return t.RED;if(i===ig)return t.RED_INTEGER;if(i===Cs)return t.RG;if(i===rg)return t.RG_INTEGER;if(i===sg)return t.RGBA_INTEGER;if(i===jc||i===Xc||i===$c||i===Yc)if(a===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===jc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Xc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===$c)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Yc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===jc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Xc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===$c)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Yc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===np||i===ip||i===rp||i===sp)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===np)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ip)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===rp)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===sp)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ap||i===op||i===lp||i===cp||i===up||i===ku||i===dp)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ap||i===op)return a===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===lp)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===cp)return s.COMPRESSED_R11_EAC;if(i===up)return s.COMPRESSED_SIGNED_R11_EAC;if(i===ku)return s.COMPRESSED_RG11_EAC;if(i===dp)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===fp||i===hp||i===pp||i===mp||i===gp||i===xp||i===_p||i===vp||i===yp||i===bp||i===Sp||i===Mp||i===wp||i===Ep)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===fp)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===hp)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pp)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===mp)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===gp)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===xp)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===_p)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===vp)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===yp)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===bp)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Sp)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Mp)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===wp)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ep)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Tp||i===Ap||i===Cp)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Tp)return a===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ap)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Cp)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Rp||i===Pp||i===Fu||i===Np)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Rp)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Pp)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Fu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Np)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ol?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const nI=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,iI=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class rI{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new jS(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new ki({vertexShader:nI,fragmentShader:iI,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Xt(new dd(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sI extends Ns{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,d=null,p=null,x=null;const y=typeof XRWebGLBinding<"u",m=new rI,h={},_=n.getContextAttributes();let M=null,b=null;const S=[],E=[],C=new Ze;let v=null,A=null;const R=new $n;R.viewport=new At;const N=new $n;N.viewport=new At;const L=[R,N],B=new fP;let D=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let te=S[Z];return te===void 0&&(te=new mf,S[Z]=te),te.getTargetRaySpace()},this.getControllerGrip=function(Z){let te=S[Z];return te===void 0&&(te=new mf,S[Z]=te),te.getGripSpace()},this.getHand=function(Z){let te=S[Z];return te===void 0&&(te=new mf,S[Z]=te),te.getHandSpace()};function Y(Z){const te=E.indexOf(Z.inputSource);if(te===-1)return;const be=S[te];be!==void 0&&(be.update(Z.inputSource,Z.frame,c||a),be.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){r.removeEventListener("select",Y),r.removeEventListener("selectstart",Y),r.removeEventListener("selectend",Y),r.removeEventListener("squeeze",Y),r.removeEventListener("squeezestart",Y),r.removeEventListener("squeezeend",Y),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",H);for(let Z=0;Z<S.length;Z++){const te=E[Z];te!==null&&(E[Z]=null,S[Z].disconnect(te))}D=null,O=null,m.reset();for(const Z in h)delete h[Z];if(e.setRenderTarget(M),p=null,d=null,f=null,r=null,b=null,De.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(C.width,C.height,!1),A!==null){const Z=A.camera;Z.fov=A.fov,Z.zoom=A.zoom,Z.updateProjectionMatrix(),A=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,i.isPresenting===!0&&ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f===null&&y&&(f=new XRWebGLBinding(r,n)),f},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",Y),r.addEventListener("selectstart",Y),r.addEventListener("selectend",Y),r.addEventListener("squeeze",Y),r.addEventListener("squeezestart",Y),r.addEventListener("squeezeend",Y),r.addEventListener("end",G),r.addEventListener("inputsourceschange",H),_.xrCompatible!==!0&&await n.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(C),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let be=null,Ie=null,xe=null;_.depth&&(xe=_.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,be=_.stencil?ps:sr,Ie=_.stencil?ol:Di);const He={colorFormat:n.RGBA8,depthFormat:xe,scaleFactor:s};f=this.getBinding(),d=f.createProjectionLayer(He),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new hi(d.textureWidth,d.textureHeight,{format:ui,type:Dn,depthTexture:new cl(d.textureWidth,d.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,be),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const be={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,be),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new hi(p.framebufferWidth,p.framebufferHeight,{format:ui,type:Dn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),De.setContext(r),De.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function H(Z){for(let te=0;te<Z.removed.length;te++){const be=Z.removed[te],Ie=E.indexOf(be);Ie>=0&&(E[Ie]=null,S[Ie].disconnect(be))}for(let te=0;te<Z.added.length;te++){const be=Z.added[te];let Ie=E.indexOf(be);if(Ie===-1){for(let He=0;He<S.length;He++)if(He>=E.length){E.push(be),Ie=He;break}else if(E[He]===null){E[He]=be,Ie=He;break}if(Ie===-1)break}const xe=S[Ie];xe&&xe.connect(be)}}const z=new $,W=new $;function Q(Z,te,be){z.setFromMatrixPosition(te.matrixWorld),W.setFromMatrixPosition(be.matrixWorld);const Ie=z.distanceTo(W),xe=te.projectionMatrix.elements,He=be.projectionMatrix.elements,ct=xe[14]/(xe[10]-1),Ve=xe[14]/(xe[10]+1),Ge=(xe[9]+1)/xe[5],rt=(xe[9]-1)/xe[5],Oe=(xe[8]-1)/xe[0],st=(He[8]+1)/He[0],wt=ct*Oe,Wt=ct*st,at=Ie/(-Oe+st),ht=at*-Oe;if(te.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(ht),Z.translateZ(at),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),xe[10]===-1)Z.projectionMatrix.copy(te.projectionMatrix),Z.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const I=ct+at,ie=Ve+at,Ae=wt-ht,P=Wt+(Ie-ht),w=Ge*Ve/ie*I,F=rt*Ve/ie*I;Z.projectionMatrix.makePerspective(Ae,P,w,F,I,ie),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function le(Z,te){te===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(te.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;let te=Z.near,be=Z.far;m.texture!==null&&(m.depthNear>0&&(te=m.depthNear),m.depthFar>0&&(be=m.depthFar)),B.near=N.near=R.near=te,B.far=N.far=R.far=be,(D!==B.near||O!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),D=B.near,O=B.far),B.layers.mask=Z.layers.mask|6,R.layers.mask=B.layers.mask&-5,N.layers.mask=B.layers.mask&-3;const Ie=Z.parent,xe=B.cameras;le(B,Ie);for(let He=0;He<xe.length;He++)le(xe[He],Ie);xe.length===2?Q(B,R,N):B.projectionMatrix.copy(R.projectionMatrix),A===null&&Z.isPerspectiveCamera&&(A={camera:Z,fov:Z.fov,zoom:Z.zoom}),ve(Z,B,Ie)};function ve(Z,te,be){be===null?Z.matrix.copy(te.matrixWorld):(Z.matrix.copy(be.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(te.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(te.projectionMatrix),Z.projectionMatrixInverse.copy(te.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Dp*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(Z){return h[Z]};let Ue=null;function Fe(Z,te){if(u=te.getViewerPose(c||a),x=te,u!==null){const be=u.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let Ie=!1;be.length!==B.cameras.length&&(B.cameras.length=0,Ie=!0);for(let Ve=0;Ve<be.length;Ve++){const Ge=be[Ve];let rt=null;if(p!==null)rt=p.getViewport(Ge);else{const st=f.getViewSubImage(d,Ge);rt=st.viewport,Ve===0&&(e.setRenderTargetTextures(b,st.colorTexture,st.depthStencilTexture),e.setRenderTarget(b))}let Oe=L[Ve];Oe===void 0&&(Oe=new $n,Oe.layers.enable(Ve),Oe.viewport=new At,L[Ve]=Oe),Oe.matrix.fromArray(Ge.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(Ge.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(rt.x,rt.y,rt.width,rt.height),Ve===0&&(B.matrix.copy(Oe.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ie===!0&&B.cameras.push(Oe)}const xe=r.enabledFeatures;if(xe&&xe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){f=i.getBinding();const Ve=f.getDepthInformation(be[0]);Ve&&Ve.isValid&&Ve.texture&&m.init(Ve,r.renderState)}if(xe&&xe.includes("camera-access")&&y){e.state.unbindTexture(),f=i.getBinding();for(let Ve=0;Ve<be.length;Ve++){const Ge=be[Ve].camera;if(Ge){let rt=h[Ge];rt||(rt=new jS,h[Ge]=rt);const Oe=f.getCameraImage(Ge);rt.sourceTexture=Oe}}}}for(let be=0;be<S.length;be++){const Ie=E[be],xe=S[be];Ie!==null&&xe!==void 0&&xe.update(Ie,te,c||a)}Ue&&Ue(Z,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),x=null}const De=new qS;De.setAnimationLoop(Fe),this.setAnimationLoop=function(Z){Ue=Z},this.dispose=function(){}}}const aI=new Rt,nM=new Be;nM.set(-1,0,0,0,1,0,0,0,1);function oI(t,e){function n(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,XS(t)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,_,M,b){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?s(m,h):h.isMeshLambertMaterial?(s(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(s(m,h),f(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(s(m,h),d(m,h),h.isMeshPhysicalMaterial&&p(m,h,b)):h.isMeshMatcapMaterial?(s(m,h),x(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),y(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(a(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?l(m,h,_,M):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,n(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===un&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,n(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===un&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,n(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,n(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const _=e.get(h),M=_.envMap,b=_.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(aI.makeRotationFromEuler(b)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(nM),m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,m.aoMapTransform))}function a(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,_,M){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*_,m.scale.value=M*.5,h.map&&(m.map.value=h.map,n(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function f(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function d(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,_){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===un&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.retroreflectivity>0&&(m.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,h){h.matcap&&(m.matcap.value=h.matcap)}function y(m,h){const _=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function lI(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,S){const E=S.program;i.uniformBlockBinding(b,E)}function c(b,S){let E=r[b.id];E===void 0&&(m(b),E=u(b),r[b.id]=E,b.addEventListener("dispose",_));const C=S.program;i.updateUBOMapping(b,C);const v=e.render.frame;s[b.id]!==v&&(d(b),s[b.id]=v)}function u(b){const S=f();b.__bindingPointIndex=S;const E=t.createBuffer(),C=b.__size,v=b.usage;return t.bindBuffer(t.UNIFORM_BUFFER,E),t.bufferData(t.UNIFORM_BUFFER,C,v),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,S,E),E}function f(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return it("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const S=r[b.id],E=b.uniforms,C=b.__cache;t.bindBuffer(t.UNIFORM_BUFFER,S);for(let v=0,A=E.length;v<A;v++){const R=E[v];if(Array.isArray(R))for(let N=0,L=R.length;N<L;N++)p(R[N],v,N,C);else p(R,v,0,C)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(b,S,E,C){if(y(b,S,E,C)===!0){const v=b.__offset,A=b.value;if(Array.isArray(A)){let R=0;for(let N=0;N<A.length;N++){const L=A[N],B=h(L);x(L,b.__data,R),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(R+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(A,b.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,v,b.__data)}}function x(b,S,E){typeof b=="number"||typeof b=="boolean"?S[0]=b:b.isMatrix3?(S[0]=b.elements[0],S[1]=b.elements[1],S[2]=b.elements[2],S[3]=0,S[4]=b.elements[3],S[5]=b.elements[4],S[6]=b.elements[5],S[7]=0,S[8]=b.elements[6],S[9]=b.elements[7],S[10]=b.elements[8],S[11]=0):ArrayBuffer.isView(b)?S.set(new b.constructor(b.buffer,b.byteOffset,S.length)):b.toArray(S,E)}function y(b,S,E,C){const v=b.value,A=S+"_"+E;if(C[A]===void 0)return typeof v=="number"||typeof v=="boolean"?C[A]=v:ArrayBuffer.isView(v)?C[A]=v.slice():C[A]=v.clone(),!0;{const R=C[A];if(typeof v=="number"||typeof v=="boolean"){if(R!==v)return C[A]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(R.equals(v)===!1)return R.copy(v),!0}}return!1}function m(b){const S=b.uniforms;let E=0;const C=16;for(let A=0,R=S.length;A<R;A++){const N=Array.isArray(S[A])?S[A]:[S[A]];for(let L=0,B=N.length;L<B;L++){const D=N[L],O=Array.isArray(D.value)?D.value:[D.value];for(let Y=0,G=O.length;Y<G;Y++){const H=O[Y],z=h(H),W=E%C,Q=W%z.boundary,le=W+Q;E+=Q,le!==0&&C-le<z.storage&&(E+=C-le),D.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=E,E+=z.storage}}}const v=E%C;return v>0&&(E+=C-v),b.__size=E,b.__cache={},this}function h(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(S.boundary=16,S.storage=b.byteLength):ze("WebGLRenderer: Unsupported uniform value type.",b),S}function _(b){const S=b.target;S.removeEventListener("dispose",_);const E=a.indexOf(S.__bindingPointIndex);a.splice(E,1),t.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function M(){for(const b in r)t.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:l,update:c,dispose:M}}const cI=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let yi=null;function uI(){return yi===null&&(yi=new KR(cI,16,16,Cs,Ii),yi.name="DFG_LUT",yi.minFilter=cn,yi.magFilter=cn,yi.wrapS=Ti,yi.wrapT=Ti,yi.generateMipmaps=!1,yi.needsUpdate=!0),yi}class dI{constructor(e={}){const{canvas:n=ER(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:p=Dn}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=a;const y=p,m=new Set([sg,rg,ig]),h=new Set([Dn,Di,al,ol,tg,ng]),_=new Uint32Array(4),M=new Int32Array(4),b=new $;let S=null,E=null;const C=[],v=[];let A=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ni,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let N=!1,L=null,B=null,D=null,O=null;this._outputColorSpace=Wn;let Y=0,G=0,H=null,z=-1,W=null;const Q=new At,le=new At;let ve=null;const Ue=new Je(0);let Fe=0,De=n.width,Z=n.height,te=1,be=null,Ie=null;const xe=new At(0,0,De,Z),He=new At(0,0,De,Z);let ct=!1;const Ve=new cg;let Ge=!1,rt=!1;const Oe=new Rt,st=new $,wt=new At,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let at=!1;function ht(){return H===null?te:1}let I=i;function ie(T,k){return n.getContext(T,k)}let Ae,P,w,F,V,K,oe,ce,J,ne,ue,Pe,pe,de,Ne,ke,We,U,fe,ee,he,ye,re;try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Qm}`),n.addEventListener("webglcontextlost",xt,!1),n.addEventListener("webglcontextrestored",ot,!1),n.addEventListener("webglcontextcreationerror",ei,!1),I===null){const k="webgl2";if(I=ie(k,T),I===null)throw ie(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Le()}catch(T){throw n.removeEventListener("webglcontextlost",xt,!1),n.removeEventListener("webglcontextrestored",ot,!1),n.removeEventListener("webglcontextcreationerror",ei,!1),it("WebGLRenderer: "+T.message),T}function Le(){Ae=new uL(I),Ae.init(),he=new tI(I,Ae),P=new eL(I,Ae,e,he),w=new JD(I,Ae),P.reversedDepthBuffer&&d&&w.buffers.depth.setReversed(!0),B=I.createFramebuffer(),D=I.createFramebuffer(),O=I.createFramebuffer(),F=new hL(I),V=new zD,K=new eI(I,Ae,w,V,P,he,F),oe=new cL(R),ce=new mP(I),ye=new QN(I,ce),J=new dL(I,ce,F,ye),ne=new mL(I,J,ce,ye,F),U=new pL(I,P,K),Ne=new tL(V),ue=new OD(R,oe,Ae,P,ye,Ne),Pe=new oI(R,V),pe=new HD,de=new $D(Ae),We=new ZN(R,oe,w,ne,x,l),ke=new QD(R,ne,P),re=new lI(I,F,P,w),fe=new JN(I,Ae,F),ee=new fL(I,Ae,F),F.programs=ue.programs,R.capabilities=P,R.extensions=Ae,R.properties=V,R.renderLists=pe,R.shadowMap=ke,R.state=w,R.info=F}y!==Dn&&(A=new xL(y,n.width,n.height,o,r,s));const Ce=new sI(R,I);this.xr=Ce,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const T=Ae.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ae.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(T){T!==void 0&&(te=T,this.setSize(De,Z,!1))},this.getSize=function(T){return T.set(De,Z)},this.setSize=function(T,k,q=!0){if(Ce.isPresenting){ze("WebGLRenderer: Can't change size while VR device is presenting.");return}De=T,Z=k,n.width=Math.floor(T*te),n.height=Math.floor(k*te),q===!0&&(n.style.width=T+"px",n.style.height=k+"px"),A!==null&&A.setSize(n.width,n.height),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(De*te,Z*te).floor()},this.setDrawingBufferSize=function(T,k,q){De=T,Z=k,te=q,n.width=Math.floor(T*q),n.height=Math.floor(k*q),this.setViewport(0,0,T,k)},this.setEffects=function(T){if(y===Dn){it("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let k=0;k<T.length;k++)if(T[k].isOutputPass===!0){ze("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(Q)},this.getViewport=function(T){return T.copy(xe)},this.setViewport=function(T,k,q,j){T.isVector4?xe.set(T.x,T.y,T.z,T.w):xe.set(T,k,q,j),w.viewport(Q.copy(xe).multiplyScalar(te).round())},this.getScissor=function(T){return T.copy(He)},this.setScissor=function(T,k,q,j){T.isVector4?He.set(T.x,T.y,T.z,T.w):He.set(T,k,q,j),w.scissor(le.copy(He).multiplyScalar(te).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(T){w.setScissorTest(ct=T)},this.setOpaqueSort=function(T){be=T},this.setTransparentSort=function(T){Ie=T},this.getClearColor=function(T){return T.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor(...arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha(...arguments)},this.clear=function(T=!0,k=!0,q=!0){let j=0;if(T){let X=!1;if(H!==null){const _e=H.texture.format;X=m.has(_e)}if(X){const _e=H.texture.type,Me=h.has(_e),ge=We.getClearColor(),Ee=We.getClearAlpha(),Re=ge.r,je=ge.g,Ye=ge.b;Me?(_[0]=Re,_[1]=je,_[2]=Ye,_[3]=Ee,I.clearBufferuiv(I.COLOR,0,_)):(M[0]=Re,M[1]=je,M[2]=Ye,M[3]=Ee,I.clearBufferiv(I.COLOR,0,M))}else j|=I.COLOR_BUFFER_BIT}k&&(j|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(j|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j!==0&&I.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),L=T},this.dispose=function(){n.removeEventListener("webglcontextlost",xt,!1),n.removeEventListener("webglcontextrestored",ot,!1),n.removeEventListener("webglcontextcreationerror",ei,!1),We.dispose(),pe.dispose(),de.dispose(),V.dispose(),oe.dispose(),ne.dispose(),ye.dispose(),re.dispose(),ue.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",Eg),Ce.removeEventListener("sessionend",Tg),Yr.stop()};function xt(T){T.preventDefault(),d_("WebGLRenderer: Context Lost."),N=!0}function ot(){d_("WebGLRenderer: Context Restored."),N=!1;const T=F.autoReset,k=ke.enabled,q=ke.autoUpdate,j=ke.needsUpdate,X=ke.type;Le(),F.autoReset=T,ke.enabled=k,ke.autoUpdate=q,ke.needsUpdate=j,ke.type=X}function ei(T){it("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function mi(T){const k=T.target;k.removeEventListener("dispose",mi),wM(k)}function wM(T){EM(T),V.remove(T)}function EM(T){const k=V.get(T).programs;k!==void 0&&(k.forEach(function(q){ue.releaseProgram(q)}),T.isShaderMaterial&&ue.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,q,j,X,_e){k===null&&(k=Wt);const Me=X.isMesh&&X.matrixWorld.determinantAffine()<0,ge=CM(T,k,q,j,X);w.setMaterial(j,Me);let Ee=q.index,Re=1;if(j.wireframe===!0){if(Ee=J.getWireframeAttribute(q),Ee===void 0)return;Re=2}const je=q.drawRange,Ye=q.attributes.position;let Te=je.start*Re,lt=(je.start+je.count)*Re;_e!==null&&(Te=Math.max(Te,_e.start*Re),lt=Math.min(lt,(_e.start+_e.count)*Re)),Ee!==null?(Te=Math.max(Te,0),lt=Math.min(lt,Ee.count)):Ye!=null&&(Te=Math.max(Te,0),lt=Math.min(lt,Ye.count));const Ut=lt-Te;if(Ut<0||Ut===1/0)return;ye.setup(X,j,ge,q,Ee);let yt,gt=fe;if(Ee!==null&&(yt=ce.get(Ee),gt=ee,gt.setIndex(yt)),X.isMesh)j.wireframe===!0?(w.setLineWidth(j.wireframeLinewidth*ht()),gt.setMode(I.LINES)):gt.setMode(I.TRIANGLES);else if(X.isLine){let nn=j.linewidth;nn===void 0&&(nn=1),w.setLineWidth(nn*ht()),X.isLineSegments?gt.setMode(I.LINES):X.isLineLoop?gt.setMode(I.LINE_LOOP):gt.setMode(I.LINE_STRIP)}else X.isPoints?gt.setMode(I.POINTS):X.isSprite&&gt.setMode(I.TRIANGLES);if(X.isBatchedMesh)if(Ae.get("WEBGL_multi_draw"))gt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const nn=X._multiDrawStarts,Se=X._multiDrawCounts,pn=X._multiDrawCount,tt=Ee?ce.get(Ee).bytesPerElement:1,Hn=V.get(j).currentProgram.getUniforms();for(let gi=0;gi<pn;gi++)Hn.setValue(I,"_gl_DrawID",gi),gt.render(nn[gi]/tt,Se[gi])}else if(X.isInstancedMesh)gt.renderInstances(Te,Ut,X.count);else if(q.isInstancedBufferGeometry){const nn=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Se=Math.min(q.instanceCount,nn);gt.renderInstances(Te,Ut,Se)}else gt.render(Te,Ut)};function wg(T,k,q,j){L!==null&&T.isNodeMaterial&&L.setObject(j,T),Ge===!0&&Ne.setState(T,q,!1),T.transparent===!0&&T.side===li&&T.forceSinglePass===!1?(T.side=un,T.needsUpdate=!0,bl(T,k,j),T.side=Ts,T.needsUpdate=!0,bl(T,k,j),T.side=li):bl(T,k,j)}this.compile=function(T,k,q=null){q===null&&(q=T),L!==null&&L.renderStart(T,k,q),E=de.get(q),E.init(k),v.push(E),q.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(E.pushLight(X),X.castShadow&&E.pushShadow(X))}),T!==q&&T.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(E.pushLight(X),X.castShadow&&E.pushShadow(X))}),E.setupLights(),L!==null&&L.updateLights(E.state.lightsArray),rt=this.localClippingEnabled,Ge=Ne.init(this.clippingPlanes,rt),Ge===!0&&Ne.setGlobalState(this.clippingPlanes,k),L!==null&&ke.render(E.state.shadowsArray,q,k);const j=new Set;return T.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const _e=X.material;if(_e)if(Array.isArray(_e))for(let Me=0;Me<_e.length;Me++){const ge=_e[Me];wg(ge,q,k,X),j.add(ge)}else wg(_e,q,k,X),j.add(_e)}),E=v.pop(),L!==null&&L.renderEnd(),j},this.compileAsync=function(T,k,q=null){const j=this.compile(T,k,q);return new Promise(X=>{function _e(){if(j.forEach(function(Me){const Ee=V.get(Me).currentProgram;(Ee===void 0||Ee.isReady())&&j.delete(Me)}),j.size===0){X(T);return}setTimeout(_e,10)}Ae.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let xd=null;function TM(T){xd&&xd(T)}function Eg(){Yr.stop()}function Tg(){Yr.start()}const Yr=new qS;Yr.setAnimationLoop(TM),typeof self<"u"&&Yr.setContext(self),this.setAnimationLoop=function(T){xd=T,Ce.setAnimationLoop(T),T===null?Yr.stop():Yr.start()},Ce.addEventListener("sessionstart",Eg),Ce.addEventListener("sessionend",Tg),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){it("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;L!==null&&L.renderStart(T,k);const q=Ce.enabled===!0&&Ce.isPresenting===!0,j=A!==null&&(H===null||q)&&A.begin(R,H);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(k),k=Ce.getCamera()),T.isScene===!0&&T.onBeforeRender(R,T,k,H),E=de.get(T,v.length),E.init(k),E.state.textureUnits=K.getTextureUnits(),v.push(E),Oe.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Ve.setFromProjectionMatrix(Oe,Ci,k.reversedDepth),rt=this.localClippingEnabled,Ge=Ne.init(this.clippingPlanes,rt),S=pe.get(T,C.length),S.init(),C.push(S),Ce.enabled===!0&&Ce.isPresenting===!0){const Me=R.xr.getDepthSensingMesh();Me!==null&&_d(Me,k,-1/0,R.sortObjects)}_d(T,k,0,R.sortObjects),S.finish(),L!==null&&L.updateLights(E.state.lightsArray),R.sortObjects===!0&&S.sort(be,Ie),at=Ce.enabled===!1||Ce.isPresenting===!1||Ce.hasDepthSensing()===!1,at&&We.addToRenderList(S,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ge===!0&&Ne.beginShadows();const X=E.state.shadowsArray;if(ke.render(X,T,k),Ge===!0&&Ne.endShadows(),(j&&A.hasRenderPass())===!1){const Me=S.opaque,ge=S.transmissive;if(E.setupLights(),k.isArrayCamera){const Ee=k.cameras;if(ge.length>0)for(let Re=0,je=Ee.length;Re<je;Re++){const Ye=Ee[Re];Cg(Me,ge,T,Ye)}at&&We.render(T);for(let Re=0,je=Ee.length;Re<je;Re++){const Ye=Ee[Re];Ag(S,T,Ye,Ye.viewport)}}else ge.length>0&&Cg(Me,ge,T,k),at&&We.render(T),Ag(S,T,k)}H!==null&&G===0&&(K.updateMultisampleRenderTarget(H),K.updateRenderTargetMipmap(H)),j&&A.end(R),T.isScene===!0&&T.onAfterRender(R,T,k),ye.resetDefaultState(),z=-1,W=null,v.pop(),v.length>0?(E=v[v.length-1],K.setTextureUnits(E.state.textureUnits),Ge===!0&&Ne.setGlobalState(R.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?S=C[C.length-1]:S=null,L!==null&&L.renderEnd()};function _d(T,k,q,j){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)q=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLightProbeGrid)E.pushLightProbeGrid(T);else if(T.isLight)E.pushLight(T),T.castShadow&&E.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(Ve)){j&&wt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Oe);const Me=ne.update(T),ge=T.material;ge.visible&&S.push(T,Me,ge,q,wt.z,null,k)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(Ve))){const Me=ne.update(T),ge=T.material;if(j&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),wt.copy(T.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),wt.copy(Me.boundingSphere.center)),wt.applyMatrix4(T.matrixWorld).applyMatrix4(Oe)),Array.isArray(ge)){const Ee=Me.groups;for(let Re=0,je=Ee.length;Re<je;Re++){const Ye=Ee[Re],Te=ge[Ye.materialIndex];Te&&Te.visible&&S.push(T,Me,Te,q,wt.z,Ye,k)}}else ge.visible&&S.push(T,Me,ge,q,wt.z,null,k)}}const _e=T.children;for(let Me=0,ge=_e.length;Me<ge;Me++)_d(_e[Me],k,q,j)}function Ag(T,k,q,j){const{opaque:X,transmissive:_e,transparent:Me}=T;E.setupLightsView(q),Ge===!0&&Ne.setGlobalState(R.clippingPlanes,q),j&&w.viewport(Q.copy(j)),X.length>0&&yl(X,k,q),_e.length>0&&yl(_e,k,q),Me.length>0&&yl(Me,k,q),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function Cg(T,k,q,j){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[j.id]===void 0){const Te=Ae.has("EXT_color_buffer_half_float")||Ae.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[j.id]=new hi(1,1,{generateMipmaps:!0,type:Te?Ii:Dn,minFilter:hs,samples:Math.max(4,P.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Qe.workingColorSpace})}const _e=E.state.transmissionRenderTarget[j.id],Me=j.viewport||Q;_e.setSize(Me.z*R.transmissionResolutionScale,Me.w*R.transmissionResolutionScale);const ge=R.getRenderTarget(),Ee=R.getActiveCubeFace(),Re=R.getActiveMipmapLevel();R.setRenderTarget(_e),R.getClearColor(Ue),Fe=R.getClearAlpha(),Fe<1&&R.setClearColor(16777215,.5),R.clear(),at&&We.render(q);const je=R.toneMapping;R.toneMapping=Ni;const Ye=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),E.setupLightsView(j),Ge===!0&&Ne.setGlobalState(R.clippingPlanes,j),yl(T,q,j),K.updateMultisampleRenderTarget(_e),K.updateRenderTargetMipmap(_e),Ae.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let lt=0,Ut=k.length;lt<Ut;lt++){const yt=k[lt],{object:gt,geometry:nn,material:Se,group:pn}=yt;if(Se.side===li&&gt.layers.test(j.layers)){const tt=Se.side;Se.side=un,Se.needsUpdate=!0,Rg(gt,q,j,nn,Se,pn),Se.side=tt,Se.needsUpdate=!0,Te=!0}}Te===!0&&(K.updateMultisampleRenderTarget(_e),K.updateRenderTargetMipmap(_e))}R.setRenderTarget(ge,Ee,Re),R.setClearColor(Ue,Fe),Ye!==void 0&&(j.viewport=Ye),R.toneMapping=je}function yl(T,k,q){const j=k.isScene===!0?k.overrideMaterial:null;for(let X=0,_e=T.length;X<_e;X++){const Me=T[X],{object:ge,geometry:Ee,group:Re}=Me;let je=Me.material;je.allowOverride===!0&&j!==null&&(je=j),ge.layers.test(q.layers)&&Rg(ge,k,q,Ee,je,Re)}}function Rg(T,k,q,j,X,_e){L!==null&&X.isNodeMaterial&&L.setObject(T,X),T.onBeforeRender(R,k,q,j,X,_e),T.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),X.onBeforeRender(R,k,q,j,T,_e),X.transparent===!0&&X.side===li&&X.forceSinglePass===!1?(X.side=un,X.needsUpdate=!0,R.renderBufferDirect(q,k,j,X,T,_e),X.side=Ts,X.needsUpdate=!0,R.renderBufferDirect(q,k,j,X,T,_e),X.side=li):R.renderBufferDirect(q,k,j,X,T,_e),T.onAfterRender(R,k,q,j,X,_e)}function bl(T,k,q){k.isScene!==!0&&(k=Wt);const j=V.get(T),X=E.state.lights,_e=E.state.shadowsArray,Me=X.state.version,ge=ue.getParameters(T,X.state,_e,k,q,E.state.lightProbeGridArray),Ee=ue.getProgramCacheKey(ge);let Re=j.programs;j.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?k.environment:null,j.fog=k.fog;const je=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;j.envMap=oe.get(T.envMap||j.environment,je),j.envMapRotation=j.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,Re===void 0&&(T.addEventListener("dispose",mi),Re=new Map,j.programs=Re);let Ye=Re.get(Ee);if(Ye!==void 0){if(j.currentProgram===Ye&&j.lightsStateVersion===Me)return Ng(T,ge),Ye}else ge.uniforms=ue.getUniforms(T),L!==null&&T.isNodeMaterial&&L.build(T,q,ge),T.onBeforeCompile(ge,R),Ye=ue.acquireProgram(ge,Ee),Re.set(Ee,Ye),j.uniforms=ge.uniforms;const Te=j.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Te.clippingPlanes=Ne.uniform),Ng(T,ge),j.needsLights=PM(T),j.lightsStateVersion=Me,j.needsLights&&(Te.ambientLightColor.value=X.state.ambient,Te.lightProbe.value=X.state.probe,Te.sunLights.value=X.state.sun,Te.sunLightShadows.value=X.state.sunShadow,Te.directionalLights.value=X.state.directional,Te.directionalLightShadows.value=X.state.directionalShadow,Te.spotLights.value=X.state.spot,Te.spotLightShadows.value=X.state.spotShadow,Te.rectAreaLights.value=X.state.rectArea,Te.ltc_1.value=X.state.rectAreaLTC1,Te.ltc_2.value=X.state.rectAreaLTC2,Te.pointLights.value=X.state.point,Te.pointLightShadows.value=X.state.pointShadow,Te.hemisphereLights.value=X.state.hemi,Te.sunShadowMatrix.value=X.state.sunShadowMatrix,Te.sunShadowCascade.value=X.state.sunShadowCascade,Te.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Te.spotLightMatrix.value=X.state.spotLightMatrix,Te.spotLightMap.value=X.state.spotLightMap,Te.pointShadowMatrix.value=X.state.pointShadowMatrix),j.lightProbeGrid=E.state.lightProbeGridArray.length>0,j.currentProgram=Ye,j.uniformsList=null,Ye}function Pg(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=qc.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function Ng(T,k){const q=V.get(T);q.outputColorSpace=k.outputColorSpace,q.batching=k.batching,q.batchingColor=k.batchingColor,q.instancing=k.instancing,q.instancingColor=k.instancingColor,q.instancingMorph=k.instancingMorph,q.skinning=k.skinning,q.morphTargets=k.morphTargets,q.morphNormals=k.morphNormals,q.morphColors=k.morphColors,q.morphTargetsCount=k.morphTargetsCount,q.numClippingPlanes=k.numClippingPlanes,q.numIntersection=k.numClipIntersection,q.vertexAlphas=k.vertexAlphas,q.vertexTangents=k.vertexTangents,q.toneMapping=k.toneMapping}function AM(T,k){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;b.setFromMatrixPosition(k.matrixWorld);for(let q=0,j=T.length;q<j;q++){const X=T[q];if(X.texture!==null&&X.boundingBox.containsPoint(b))return X}return null}function CM(T,k,q,j,X){k.isScene!==!0&&(k=Wt),K.resetTextureUnits();const _e=k.fog,Me=j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial?k.environment:null,ge=H===null?R.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:Qe.workingColorSpace,Ee=j.isMeshStandardMaterial||j.isMeshLambertMaterial&&!j.envMap||j.isMeshPhongMaterial&&!j.envMap,Re=oe.get(j.envMap||Me,Ee),je=j.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Ye=!!q.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Te=!!q.morphAttributes.position,lt=!!q.morphAttributes.normal,Ut=!!q.morphAttributes.color;let yt=Ni;j.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(yt=R.toneMapping);const gt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,nn=gt!==void 0?gt.length:0,Se=V.get(j),pn=E.state.lights;if(Ge===!0&&(rt===!0||T!==W)){const _t=T===W&&j.id===z;Ne.setState(j,T,_t)}let tt=!1;j.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==pn.state.version||Se.outputColorSpace!==ge||X.isBatchedMesh&&Se.batching===!1||!X.isBatchedMesh&&Se.batching===!0||X.isBatchedMesh&&Se.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Se.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Se.instancing===!1||!X.isInstancedMesh&&Se.instancing===!0||X.isSkinnedMesh&&Se.skinning===!1||!X.isSkinnedMesh&&Se.skinning===!0||X.isInstancedMesh&&Se.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Se.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Se.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Se.instancingMorph===!1&&X.morphTexture!==null||Se.envMap!==Re||j.fog===!0&&Se.fog!==_e||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==Ne.numPlanes||Se.numIntersection!==Ne.numIntersection)||Se.vertexAlphas!==je||Se.vertexTangents!==Ye||Se.morphTargets!==Te||Se.morphNormals!==lt||Se.morphColors!==Ut||Se.toneMapping!==yt||Se.morphTargetsCount!==nn||!!Se.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(tt=!0):(tt=!0,Se.__version=j.version);let Hn=Se.currentProgram;tt===!0&&(Hn=bl(j,k,X),L&&j.isNodeMaterial&&L.onUpdateProgram(j,Hn,Se));let gi=!1,lr=!1,Ls=!1;const pt=Hn.getUniforms(),It=Se.uniforms;if(w.useProgram(Hn.program)&&(gi=!0,lr=!0,Ls=!0),j.id!==z&&(z=j.id,lr=!0),Se.needsLights){const _t=AM(E.state.lightProbeGridArray,X);Se.lightProbeGrid!==_t&&(Se.lightProbeGrid=_t,lr=!0)}if(gi||W!==T){w.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),pt.setValue(I,"projectionMatrix",T.projectionMatrix),pt.setValue(I,"viewMatrix",T.matrixWorldInverse);const ur=pt.map.cameraPosition;ur!==void 0&&ur.setValue(I,st.setFromMatrixPosition(T.matrixWorld)),P.logarithmicDepthBuffer&&pt.setValue(I,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&pt.setValue(I,"isOrthographic",T.isOrthographicCamera===!0),W!==T&&(W=T,lr=!0,Ls=!0)}if(Se.needsLights&&(pn.state.sunShadowMap.length>0&&pt.setValue(I,"sunShadowMap",pn.state.sunShadowMap,K),pn.state.directionalShadowMap.length>0&&pt.setValue(I,"directionalShadowMap",pn.state.directionalShadowMap,K),pn.state.spotShadowMap.length>0&&pt.setValue(I,"spotShadowMap",pn.state.spotShadowMap,K),pn.state.pointShadowMap.length>0&&pt.setValue(I,"pointShadowMap",pn.state.pointShadowMap,K)),X.isSkinnedMesh){pt.setOptional(I,X,"bindMatrix"),pt.setOptional(I,X,"bindMatrixInverse");const _t=X.skeleton;_t&&(_t.boneTexture===null&&_t.computeBoneTexture(),pt.setValue(I,"boneTexture",_t.boneTexture,K))}X.isBatchedMesh&&(pt.setOptional(I,X,"batchingTexture"),pt.setValue(I,"batchingTexture",X._matricesTexture,K),pt.setOptional(I,X,"batchingIdTexture"),pt.setValue(I,"batchingIdTexture",X._indirectTexture,K),pt.setOptional(I,X,"batchingColorTexture"),X._colorsTexture!==null&&pt.setValue(I,"batchingColorTexture",X._colorsTexture,K));const cr=q.morphAttributes;if((cr.position!==void 0||cr.normal!==void 0||cr.color!==void 0)&&U.update(X,q,Hn),(lr||Se.receiveShadow!==X.receiveShadow)&&(Se.receiveShadow=X.receiveShadow,pt.setValue(I,"receiveShadow",X.receiveShadow)),(j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial)&&j.envMap===null&&k.environment!==null&&(It.envMapIntensity.value=k.environmentIntensity),It.dfgLUT!==void 0&&(It.dfgLUT.value=uI()),lr){if(pt.setValue(I,"toneMappingExposure",R.toneMappingExposure),Se.needsLights&&RM(It,Ls),_e&&j.fog===!0&&Pe.refreshFogUniforms(It,_e),Pe.refreshMaterialUniforms(It,j,te,Z,E.state.transmissionRenderTarget[T.id]),Se.needsLights&&Se.lightProbeGrid){const _t=Se.lightProbeGrid;It.probesSH.value=_t.texture,It.probesMin.value.copy(_t.boundingBox.min),It.probesMax.value.copy(_t.boundingBox.max),It.probesResolution.value.copy(_t.resolution)}qc.upload(I,Pg(Se),It,K)}if(j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(qc.upload(I,Pg(Se),It,K),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&pt.setValue(I,"center",X.center),pt.setValue(I,"modelViewMatrix",X.modelViewMatrix),pt.setValue(I,"normalMatrix",X.normalMatrix),pt.setValue(I,"modelMatrix",X.matrixWorld),j.uniformsGroups!==void 0){const _t=j.uniformsGroups;for(let ur=0,Ds=_t.length;ur<Ds;ur++){const Dg=_t[ur];re.update(Dg,Hn),re.bind(Dg,Hn)}}return Hn}function RM(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.sunLights.needsUpdate=k,T.sunLightShadows.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function PM(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(T,k,q){const j=V.get(T);j.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),V.get(T.texture).__webglTexture=k,V.get(T.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:q,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,k){const q=V.get(T);q.__webglFramebuffer=k,q.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,q=0){H=T,Y=k,G=q;let j=null,X=!1,_e=!1;if(T){const ge=V.get(T);if(ge.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(I.FRAMEBUFFER,ge.__webglFramebuffer),Q.copy(T.viewport),le.copy(T.scissor),ve=T.scissorTest,w.viewport(Q),w.scissor(le),w.setScissorTest(ve),z=-1;return}else if(ge.__webglFramebuffer===void 0)K.setupRenderTarget(T);else if(ge.__hasExternalTextures)K.rebindTextures(T,V.get(T.texture).__webglTexture,V.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const je=T.depthTexture;if(ge.__boundDepthTexture!==je){if(je!==null&&V.has(je)&&(T.width!==je.image.width||T.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(T)}}const Ee=T.texture;(Ee.isData3DTexture||Ee.isDataArrayTexture||Ee.isCompressedArrayTexture)&&(_e=!0);const Re=V.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Re[k])?j=Re[k][q]:j=Re[k],X=!0):T.samples>0&&K.useMultisampledRTT(T)===!1?j=V.get(T).__webglMultisampledFramebuffer:Array.isArray(Re)?j=Re[q]:j=Re,Q.copy(T.viewport),le.copy(T.scissor),ve=T.scissorTest}else Q.copy(xe).multiplyScalar(te).floor(),le.copy(He).multiplyScalar(te).floor(),ve=ct;if(q!==0&&(j=B),w.bindFramebuffer(I.FRAMEBUFFER,j)&&w.drawBuffers(T,j),w.viewport(Q),w.scissor(le),w.setScissorTest(ve),X){const ge=V.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+k,ge.__webglTexture,q)}else if(_e){const ge=k;for(let Ee=0;Ee<T.textures.length;Ee++){const Re=V.get(T.textures[Ee]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Ee,Re.__webglTexture,q,ge)}}else if(T!==null&&q!==0){const ge=V.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ge.__webglTexture,q)}z=-1};function Lg(T){const k=V.get(T);return(k.__readFormat!==T.format||k.__readType!==T.type)&&(k.__readFormat=T.format,k.__readType=T.type,k.__formatReadable=P.textureFormatReadable(T.format),k.__typeReadable=P.textureTypeReadable(T.type)),k}this.readRenderTargetPixels=function(T,k,q,j,X,_e,Me,ge=0){if(!(T&&T.isWebGLRenderTarget)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=V.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Me!==void 0&&(Ee=Ee[Me]),Ee){w.bindFramebuffer(I.FRAMEBUFFER,Ee);try{const Re=T.textures[ge],je=Re.format,Ye=Re.type;T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ge);const Te=Lg(Re);if(Te.__formatReadable===!1){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Te.__typeReadable===!1){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-j&&q>=0&&q<=T.height-X&&I.readPixels(k,q,j,X,he.convert(je),he.convert(Ye),_e)}finally{const Re=H!==null?V.get(H).__webglFramebuffer:null;w.bindFramebuffer(I.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(T,k,q,j,X,_e,Me,ge=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=V.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Me!==void 0&&(Ee=Ee[Me]),Ee)if(k>=0&&k<=T.width-j&&q>=0&&q<=T.height-X){w.bindFramebuffer(I.FRAMEBUFFER,Ee);const Re=T.textures[ge],je=Re.format,Ye=Re.type;T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ge);const Te=Lg(Re);if(Te.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Te.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const lt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,lt),I.bufferData(I.PIXEL_PACK_BUFFER,_e.byteLength,I.STREAM_READ),I.readPixels(k,q,j,X,he.convert(je),he.convert(Ye),0),I.bindBuffer(I.PIXEL_PACK_BUFFER,null);const Ut=H!==null?V.get(H).__webglFramebuffer:null;w.bindFramebuffer(I.FRAMEBUFFER,Ut);const yt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await TR(I,yt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,lt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,_e),I.bindBuffer(I.PIXEL_PACK_BUFFER,null),I.deleteBuffer(lt),I.deleteSync(yt),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,k=null,q=0){const j=Math.pow(2,-q),X=Math.floor(T.image.width*j),_e=Math.floor(T.image.height*j),Me=k!==null?k.x:0,ge=k!==null?k.y:0;K.setTexture2D(T,0),I.copyTexSubImage2D(I.TEXTURE_2D,q,0,0,Me,ge,X,_e),w.unbindTexture()},this.copyTextureToTexture=function(T,k,q=null,j=null,X=0,_e=0){let Me,ge,Ee,Re,je,Ye,Te,lt,Ut;const yt=T.isCompressedTexture?T.mipmaps[_e]:T.image;if(q!==null)Me=q.max.x-q.min.x,ge=q.max.y-q.min.y,Ee=q.isBox3?q.max.z-q.min.z:1,Re=q.min.x,je=q.min.y,Ye=q.isBox3?q.min.z:0;else{const It=Math.pow(2,-X);Me=Math.floor(yt.width*It),ge=Math.floor(yt.height*It),T.isDataArrayTexture?Ee=yt.depth:T.isData3DTexture?Ee=Math.floor(yt.depth*It):Ee=1,Re=0,je=0,Ye=0}j!==null?(Te=j.x,lt=j.y,Ut=j.z):(Te=0,lt=0,Ut=0);const gt=he.convert(k.format),nn=he.convert(k.type);let Se;k.isData3DTexture?(K.setTexture3D(k,0),Se=I.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(K.setTexture2DArray(k,0),Se=I.TEXTURE_2D_ARRAY):(K.setTexture2D(k,0),Se=I.TEXTURE_2D),w.activeTexture(I.TEXTURE0),w.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,k.flipY),w.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),w.pixelStorei(I.UNPACK_ALIGNMENT,k.unpackAlignment);const pn=w.getParameter(I.UNPACK_ROW_LENGTH),tt=w.getParameter(I.UNPACK_IMAGE_HEIGHT),Hn=w.getParameter(I.UNPACK_SKIP_PIXELS),gi=w.getParameter(I.UNPACK_SKIP_ROWS),lr=w.getParameter(I.UNPACK_SKIP_IMAGES);w.pixelStorei(I.UNPACK_ROW_LENGTH,yt.width),w.pixelStorei(I.UNPACK_IMAGE_HEIGHT,yt.height),w.pixelStorei(I.UNPACK_SKIP_PIXELS,Re),w.pixelStorei(I.UNPACK_SKIP_ROWS,je),w.pixelStorei(I.UNPACK_SKIP_IMAGES,Ye);const Ls=T.isDataArrayTexture||T.isData3DTexture,pt=k.isDataArrayTexture||k.isData3DTexture;if(T.isDepthTexture){const It=V.get(T),cr=V.get(k),_t=V.get(It.__renderTarget),ur=V.get(cr.__renderTarget);w.bindFramebuffer(I.READ_FRAMEBUFFER,_t.__webglFramebuffer),w.bindFramebuffer(I.DRAW_FRAMEBUFFER,ur.__webglFramebuffer);for(let Ds=0;Ds<Ee;Ds++)Ls&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,V.get(T).__webglTexture,X,Ye+Ds),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,V.get(k).__webglTexture,_e,Ut+Ds)),I.blitFramebuffer(Re,je,Me,ge,Te,lt,Me,ge,I.DEPTH_BUFFER_BIT,I.NEAREST);w.bindFramebuffer(I.READ_FRAMEBUFFER,null),w.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(X!==0||T.isRenderTargetTexture||V.has(T)){const It=V.get(T),cr=V.get(k);w.bindFramebuffer(I.READ_FRAMEBUFFER,D),w.bindFramebuffer(I.DRAW_FRAMEBUFFER,O);for(let _t=0;_t<Ee;_t++)Ls?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,It.__webglTexture,X,Ye+_t):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,It.__webglTexture,X),pt?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,cr.__webglTexture,_e,Ut+_t):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,cr.__webglTexture,_e),X!==0?I.blitFramebuffer(Re,je,Me,ge,Te,lt,Me,ge,I.COLOR_BUFFER_BIT,I.NEAREST):pt?I.copyTexSubImage3D(Se,_e,Te,lt,Ut+_t,Re,je,Me,ge):I.copyTexSubImage2D(Se,_e,Te,lt,Re,je,Me,ge);w.bindFramebuffer(I.READ_FRAMEBUFFER,null),w.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else pt?T.isDataTexture||T.isData3DTexture?I.texSubImage3D(Se,_e,Te,lt,Ut,Me,ge,Ee,gt,nn,yt.data):k.isCompressedArrayTexture?I.compressedTexSubImage3D(Se,_e,Te,lt,Ut,Me,ge,Ee,gt,yt.data):I.texSubImage3D(Se,_e,Te,lt,Ut,Me,ge,Ee,gt,nn,yt):T.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,_e,Te,lt,Me,ge,gt,nn,yt.data):T.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,_e,Te,lt,yt.width,yt.height,gt,yt.data):I.texSubImage2D(I.TEXTURE_2D,_e,Te,lt,Me,ge,gt,nn,yt);w.pixelStorei(I.UNPACK_ROW_LENGTH,pn),w.pixelStorei(I.UNPACK_IMAGE_HEIGHT,tt),w.pixelStorei(I.UNPACK_SKIP_PIXELS,Hn),w.pixelStorei(I.UNPACK_SKIP_ROWS,gi),w.pixelStorei(I.UNPACK_SKIP_IMAGES,lr),_e===0&&k.generateMipmaps&&I.generateMipmap(Se),w.unbindTexture()},this.initRenderTarget=function(T){V.get(T).__webglFramebuffer===void 0&&K.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?K.setTextureCube(T,0):T.isData3DTexture?K.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?K.setTexture2DArray(T,0):K.setTexture2D(T,0),w.unbindTexture()},this.resetState=function(){Y=0,G=0,H=null,w.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),n.unpackColorSpace=Qe._getUnpackColorSpace()}}const rv={japan:{lat:36.2048,lon:138.2529,label:"Japan (Honshu Region)"},tokyo:{lat:35.6762,lon:139.6503,label:"Tokyo, Japan"},noto:{lat:37.2842,lon:136.9145,label:"Noto Peninsula, Ishikawa, Japan"},ishikawa:{lat:36.5947,lon:136.6256,label:"Ishikawa Prefecture, Japan"},osaka:{lat:34.6937,lon:135.5023,label:"Osaka, Japan"},kyoto:{lat:35.0116,lon:135.7681,label:"Kyoto, Japan"},assam:{lat:26.2006,lon:92.9376,label:"Assam (Brahmaputra Basin), India"},brahmaputra:{lat:26.1856,lon:91.7485,label:"Brahmaputra River, India"},kerala:{lat:10.8505,lon:76.2711,label:"Kerala (Flood Plains), India"},uttarakhand:{lat:30.0668,lon:79.0193,label:"Uttarakhand Himalayas, India"},bihar:{lat:25.0961,lon:85.3131,label:"Bihar (Kosi Floodplain), India"},kosi:{lat:25.4326,lon:87.2711,label:"Kosi River Zone, India"},nepal:{lat:28.3949,lon:84.124,label:"Nepal / Himalayan Arc"},himalaya:{lat:27.9881,lon:86.925,label:"Himalayan Range"},india:{lat:20.5937,lon:78.9629,label:"India (Central Sector)"}};function sv(t,e=[]){const n=(t+" "+e.join(" ")).toLowerCase();for(const[i,r]of Object.entries(rv))if(n.includes(i))return r;return n.includes("जापान")||n.includes("टोक्यो")?rv.japan:null}function fI(t,e,n){const i=(90-t)*(Math.PI/180),r=(e+180)*(Math.PI/180),s=-(n*Math.sin(i)*Math.cos(r)),a=n*Math.sin(i)*Math.sin(r),o=n*Math.cos(i);return new $(s,o,a)}function hI(){const t=document.createElement("canvas");t.width=2048,t.height=1024;const e=t.getContext("2d"),n=e.createLinearGradient(0,0,0,t.height);n.addColorStop(0,"#030816"),n.addColorStop(.5,"#07152f"),n.addColorStop(1,"#030816"),e.fillStyle=n,e.fillRect(0,0,t.width,t.height),e.strokeStyle="rgba(59, 130, 246, 0.12)",e.lineWidth=1;for(let o=-80;o<=80;o+=20){const l=(90-o)/180*t.height;e.beginPath(),e.moveTo(0,l),e.lineTo(t.width,l),e.stroke()}for(let o=-180;o<=180;o+=30){const l=(o+180)/360*t.width;e.beginPath(),e.moveTo(l,0),e.lineTo(l,t.height),e.stroke()}e.fillStyle="#0f2744",e.strokeStyle="#2563eb",e.lineWidth=2;const i=(o,l)=>[(l+180)/360*t.width,(90-o)/180*t.height],r=(o,l="#112d4e",c="#3b82f6")=>{if(o.length===0)return;e.beginPath();const[u,f]=i(o[0][0],o[0][1]);e.moveTo(u,f);for(let d=1;d<o.length;d++){const[p,x]=i(o[d][0],o[d][1]);e.lineTo(p,x)}e.closePath(),e.fillStyle=l,e.fill(),e.strokeStyle=c,e.stroke()};r([[70,25],[72,60],[70,100],[65,140],[60,170],[50,155],[40,130],[30,122],[22,114],[10,105],[8,77],[25,68],[30,60],[35,45],[42,28],[55,10],[65,15]],"#122e4d","#3b82f6"),r([[35,74],[32,79],[28,88],[26,95],[22,89],[15,80],[8,77],[13,74],[20,72],[25,68],[30,70]],"#15365e","#60a5fa"),r([[45,142],[43,145],[40,140],[36,139],[34,135],[32,130],[33,129],[35,133],[38,138],[42,141]],"#1d4ed8","#93c5fd"),r([[35,-5],[37,10],[32,32],[12,51],[-5,40],[-25,33],[-34,18],[-20,12],[5,10],[12,-15],[25,-15]],"#112b46","#2563eb"),r([[70,-165],[72,-130],[60,-85],[50,-55],[30,-80],[25,-80],[15,-90],[20,-105],[32,-117],[48,-125],[60,-145]],"#112b46","#2563eb"),r([[12,-72],[5,-52],[-10,-36],[-22,-41],[-45,-65],[-55,-68],[-40,-73],[-20,-70],[-5,-80]],"#10273f","#2563eb"),r([[-12,130],[-15,145],[-25,153],[-37,150],[-38,140],[-32,115],[-22,114],[-15,124]],"#122c47","#3b82f6"),e.fillStyle="#60a5fa";const s=[[35.6,139.6],[28.6,77.2],[19,72.8],[13,80.2],[22.5,88.3],[26.2,92.9],[31.2,121.4],[39.9,116.4],[51.5,-.1],[40.7,-74],[48.8,2.3],[37.7,-122.4],[1.3,103.8],[34,-118.2]];for(const[o,l]of s){const[c,u]=i(o,l),f=e.createRadialGradient(c,u,0,c,u,8);f.addColorStop(0,"rgba(147, 197, 253, 1)"),f.addColorStop(.4,"rgba(59, 130, 246, 0.6)"),f.addColorStop(1,"rgba(59, 130, 246, 0)"),e.fillStyle=f,e.beginPath(),e.arc(c,u,8,0,Math.PI*2),e.fill()}const a=new JR(t);return a.wrapS=Iu,a.wrapT=Ti,a}function pI({targetLocation:t,onResetTarget:e}){const n=se.useRef(null),[i,r]=se.useState(null),[s,a]=se.useState(!1),[o,l]=se.useState(.85),c=se.useRef(null),u=se.useRef(null),f=se.useRef(null),d=se.useRef(null),p=se.useRef(null),x=se.useRef(null),y=se.useRef(null),m=se.useRef(new $(0,0,3.8)),h=se.useRef(!1);se.useEffect(()=>{if(!n.current)return;const M=n.current,b=M.clientWidth||window.innerWidth,S=M.clientHeight||window.innerHeight,E=new VR;c.current=E;const C=new $n(45,b/S,.1,1e3);C.position.set(0,0,3.8),u.current=C;const v=new dI({antialias:!0,alpha:!0});v.setSize(b,S),v.setPixelRatio(Math.min(window.devicePixelRatio,2)),v.toneMapping=Jm,M.appendChild(v.domElement);const A=new uP(990520,1.8);E.add(A);const R=new D_(16777215,2.5);R.position.set(5,3,5),E.add(R);const N=new D_(3900150,1.2);N.position.set(-5,-2,-3),E.add(N);const L=new Cn,B=1200,D=new Float32Array(B*3);for(let F=0;F<B*3;F+=3)D[F]=(Math.random()-.5)*100,D[F+1]=(Math.random()-.5)*100,D[F+2]=(Math.random()-.5)*100;L.setAttribute("position",new Li(D,3));const O=new GS({color:9684477,size:.18,transparent:!0,opacity:.75}),Y=new QR(L,O);E.add(Y);const G=new ua;f.current=G,E.add(G);const H=1,z=new da(H,64,64),W=hI(),Q=new Pf({map:W,roughness:.65,metalness:.15,emissive:new Je(661809),emissiveIntensity:.35}),le=new Xt(z,Q);d.current=le,G.add(le);const ve=new da(H*1.035,48,48),Ue=new ls({color:3718648,transparent:!0,opacity:.18,blending:Uo,side:un}),Fe=new Xt(ve,Ue);G.add(Fe);const De=new da(H*1.15,32,32),Z=new ls({color:1920728,transparent:!0,opacity:.08,blending:Uo,side:un}),te=new Xt(De,Z);G.add(te);const be=new da(.025,16,16),Ie=new ls({color:15680580,transparent:!0,opacity:.95}),xe=new Xt(be,Ie);xe.visible=!1,p.current=xe,G.add(xe);const He=new fg(.02,.08,32),ct=new ls({color:3718648,side:li,transparent:!0,opacity:.8}),Ve=new Xt(He,ct);Ve.visible=!1,x.current=Ve,G.add(Ve);const Ge=new ua;y.current=Ge;const rt=new Xt(new zr(.06,.06,.09),new Pf({color:14870768,metalness:.9,roughness:.2}));Ge.add(rt);const Oe=new Pf({color:1981066,metalness:.8,roughness:.3}),st=new Xt(new zr(.18,.005,.07),Oe);st.position.set(-.13,0,0),Ge.add(st);const wt=new Xt(new zr(.18,.005,.07),Oe);wt.position.set(.13,0,0),Ge.add(wt);const Wt=new dg(.35,.8,16,1,!0),at=new ls({color:440020,transparent:!0,opacity:.18,blending:Uo,side:li}),ht=new Xt(Wt,at);ht.rotation.x=Math.PI,ht.position.set(0,-.4,0),Ge.add(ht),E.add(Ge);let I=0,ie=1,Ae;const P=()=>{if(Ae=requestAnimationFrame(P),!(window.scrollY>window.innerHeight*.35||s))return;f.current&&!h.current&&(f.current.rotation.y+=8e-4),I+=.012;const V=1.6;Ge.position.set(Math.cos(I)*V,Math.sin(I*1.5)*.4,Math.sin(I)*V),Ge.lookAt(0,0,0),x.current&&x.current.visible&&(ie+=.03,ie>2.2&&(ie=.8),x.current.scale.set(ie,ie,ie),x.current.material.opacity=Math.max(0,.9-(ie-.8)/1.4)),u.current&&u.current.position.lerp(m.current,.045),v.render(E,C)};P();const w=()=>{if(!M||!u.current)return;const F=M.clientWidth||window.innerWidth,V=M.clientHeight||window.innerHeight;u.current.aspect=F/V,u.current.updateProjectionMatrix(),v.setSize(F,V)};return window.addEventListener("resize",w),()=>{cancelAnimationFrame(Ae),window.removeEventListener("resize",w),v.dispose(),M.contains(v.domElement)&&M.removeChild(v.domElement)}},[]),se.useEffect(()=>{if(!t||!f.current||!p.current||!x.current){t||(m.current.set(0,0,3.8),h.current=!1,p.current&&(p.current.visible=!1),x.current&&(x.current.visible=!1),r(null));return}r(t),h.current=!0;const M=fI(t.lat,t.lon,1);p.current.position.copy(M),p.current.visible=!0,x.current.position.copy(M.clone().multiplyScalar(1.005)),x.current.lookAt(M.clone().multiplyScalar(2)),x.current.visible=!0;const b=new hP().setFromVector3(M),S=-b.theta+Math.PI/2,E=b.phi-Math.PI/2;f.current&&(f.current.rotation.x=E*.5,f.current.rotation.y=S),m.current.set(0,0,t.zoom||1.9);const C=setTimeout(()=>{h.current=!1},1500);return()=>clearTimeout(C)},[t]);const _=se.useCallback(()=>{m.current.set(0,0,3.8),h.current=!1,p.current&&(p.current.visible=!1),x.current&&(x.current.visible=!1),r(null),e&&e()},[e]);return g.jsxs("div",{className:`earth-background-wrapper ${s?"cinematic-view":""}`,style:{opacity:o},children:[g.jsx("div",{ref:n,className:"earth-canvas-container"}),g.jsxs("div",{className:"earth-hud-panel fade-in",children:[g.jsxs("div",{className:"earth-hud-badge",children:[g.jsx("span",{className:"earth-status-dot"}),g.jsx("span",{className:"earth-hud-title",children:"3D Orbit: Sentinel / Cartosat"})]}),i&&g.jsxs("div",{className:"earth-target-pill fade-in",children:[g.jsx("span",{className:"target-radar-icon",children:"🎯"}),g.jsxs("div",{className:"target-info",children:[g.jsx("span",{className:"target-label",children:i.label}),g.jsxs("span",{className:"target-coords",children:[i.lat>=0?`${i.lat.toFixed(2)}°N`:`${Math.abs(i.lat).toFixed(2)}°S`," ·"," ",i.lon>=0?`${i.lon.toFixed(2)}°E`:`${Math.abs(i.lon).toFixed(2)}°W`]})]}),g.jsx("button",{className:"target-reset-btn",onClick:_,title:"Reset camera to global orbit",children:"✕"})]}),g.jsxs("div",{className:"earth-hud-actions",children:[g.jsx("button",{className:`earth-hud-btn ${s?"active":""}`,onClick:()=>a(!s),title:s?"Exit full cinematic 3D mode":"Enter full cinematic 3D Earth mode",children:s?"🖥 UI Mode":"🎬 Cinematic 3D"}),g.jsx("button",{className:"earth-hud-btn",onClick:_,title:"Reset globe to full orbit",children:"🔄 Reset"}),g.jsx("button",{className:"earth-hud-btn opacity-btn",onClick:()=>l(o===.85?.45:.85),title:"Toggle background brightness",children:o===.85?"💡 Dim":"✨ Bright"})]})]}),g.jsx("style",{children:`
        .earth-background-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          transition: opacity 0.4s ease;
          overflow: hidden;
        }
        .earth-canvas-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        /* Cinematic view brings canvas on top with transparent UI pass-through */
        .cinematic-view {
          pointer-events: auto;
          z-index: 50;
          background: rgba(6, 10, 20, 0.4);
          backdrop-filter: blur(2px);
        }
        .earth-hud-panel {
          position: absolute;
          bottom: 1.5rem;
          right: 2rem;
          pointer-events: auto;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(13, 20, 36, 0.82);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(59, 130, 246, 0.28);
          border-radius: 999px;
          padding: 6px 14px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(59, 130, 246, 0.15);
          z-index: 100;
        }
        .earth-hud-badge {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .earth-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          animation: pulseDot 2s infinite ease-in-out;
        }
        .earth-hud-title {
          font-size: 0.75rem;
          letter-spacing: 0.02em;
        }
        .earth-target-pill {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.4);
          border-radius: 999px;
          padding: 2px 10px;
        }
        .target-radar-icon {
          font-size: 0.85rem;
        }
        .target-info {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .target-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #fca5a5;
        }
        .target-coords {
          font-size: 0.62rem;
          font-family: var(--font-mono);
          color: #f87171;
        }
        .target-reset-btn {
          background: transparent;
          border: none;
          color: #fca5a5;
          cursor: pointer;
          font-size: 0.7rem;
          padding: 0 2px;
          line-height: 1;
        }
        .earth-hud-actions {
          display: flex;
          gap: 0.35rem;
        }
        .earth-hud-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s ease;
          font-family: var(--font-sans);
        }
        .earth-hud-btn:hover {
          background: rgba(59, 130, 246, 0.22);
          border-color: rgba(59, 130, 246, 0.5);
          color: #fff;
        }
        .earth-hud-btn.active {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          color: #fff;
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.4);
        }
        @media (max-width: 768px) {
          .earth-hud-panel {
            bottom: 0.75rem;
            right: 0.75rem;
            left: 0.75rem;
            justify-content: space-between;
          }
        }
      `})]})}function mI(t){const e=se.useRef(null);return e.current===null&&(e.current=t()),e.current}const gI=typeof window<"u",xI=gI?se.useLayoutEffect:se.useEffect;function _I(t,e){t.indexOf(e)===-1&&t.push(e)}function vI(t,e){const n=t.indexOf(e);n>-1&&t.splice(n,1)}const pd=(t,e,n)=>n>e?e:n<t?t:n;let yI=()=>{};const pg={},iM=t=>typeof t=="object"&&t!==null;function bI(t){let e;return()=>(e===void 0&&(e=t()),e)}const md=t=>t,rM=(...t)=>t.reduce((e,n)=>i=>n(e(i))),mg=(t,e,n)=>{const i=e-t;return i?(n-t)/i:1};class SI{constructor(){this.subscriptions=[]}add(e){return _I(this.subscriptions,e),()=>vI(this.subscriptions,e)}notify(e,n,i){const r=this.subscriptions.length;if(r)if(r===1)this.subscriptions[0](e,n,i);else for(let s=0;s<r;s++){const a=this.subscriptions[s];a&&a(e,n,i)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const sM=(t,e)=>e?t*(1e3/e):0,Ec=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function MI(t){let e=new Set,n=new Set,i=!1,r=!1;const s=new WeakSet;let a={delta:0,timestamp:0,isProcessing:!1};function o(c){s.has(c)&&(l.schedule(c),t()),c(a)}const l={schedule:(c,u=!1,f=!1)=>{const p=f&&i?e:n;return u&&s.add(c),p.add(c),c},cancel:c=>{n.delete(c),s.delete(c)},process:c=>{if(a=c,i){r=!0;return}i=!0;const u=e;e=n,n=u,e.forEach(o),e.clear(),i=!1,r&&(r=!1,l.process(c))}};return l}const wI=40;function aM(t,e){let n=!1,i=!0;const r={delta:0,timestamp:0,isProcessing:!1},s=()=>n=!0,a=Ec.reduce((M,b)=>(M[b]=MI(s),M),{}),{setup:o,read:l,resolveKeyframes:c,preUpdate:u,update:f,preRender:d,render:p,postRender:x}=a,y=()=>{const M=pg.useManualTiming,b=M?r.timestamp:performance.now();n=!1,M||(r.delta=i?1e3/60:Math.max(Math.min(b-r.timestamp,wI),1)),r.timestamp=b,r.isProcessing=!0,o.process(r),l.process(r),c.process(r),u.process(r),f.process(r),d.process(r),p.process(r),x.process(r),r.isProcessing=!1,n&&e&&(i=!1,t(y))},m=()=>{n=!0,i=!0,r.isProcessing||t(y)};return{schedule:Ec.reduce((M,b)=>{const S=a[b];return M[b]=(E,C=!1,v=!1)=>(n||m(),S.schedule(E,C,v)),M},{}),cancel:M=>{for(let b=0;b<Ec.length;b++)a[Ec[b]].cancel(M)},state:r,steps:a}}const{schedule:ha,cancel:Up,state:Op}=aM(typeof requestAnimationFrame<"u"?requestAnimationFrame:md,!0);let Kc;function EI(){Kc=void 0}const Zc={now:()=>(Kc===void 0&&Zc.set(Op.isProcessing||pg.useManualTiming?Op.timestamp:performance.now()),Kc),set:t=>{Kc=t,queueMicrotask(EI)}},TI=t=>e=>typeof e=="string"&&e.startsWith(t),AI=TI("var(--"),CI=t=>AI(t)?RI.test(t.split("/*")[0].trim()):!1,RI=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,oM={test:t=>typeof t=="number",parse:parseFloat,transform:t=>t},lM={...oM,transform:t=>pd(0,1,t)},Oo=t=>Math.round(t*1e5)/1e5,cM=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function PI(t){return t==null}const NI=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,gg=(t,e)=>n=>!!(typeof n=="string"&&NI.test(n)&&n.startsWith(t)||e&&!PI(n)&&Object.prototype.hasOwnProperty.call(n,e)),uM=(t,e,n)=>i=>{if(typeof i!="string")return i;const[r,s,a,o]=i.match(cM);return{[t]:parseFloat(r),[e]:parseFloat(s),[n]:parseFloat(a),alpha:o!==void 0?parseFloat(o):1}},LI=t=>pd(0,255,t),Of={...oM,transform:t=>Math.round(LI(t))},ms={test:gg("rgb","red"),parse:uM("red","green","blue"),transform:({red:t,green:e,blue:n,alpha:i=1})=>"rgba("+Of.transform(t)+", "+Of.transform(e)+", "+Of.transform(n)+", "+Oo(lM.transform(i))+")"};function DI(t){let e="",n="",i="",r="";return t.length>5?(e=t.substring(1,3),n=t.substring(3,5),i=t.substring(5,7),r=t.substring(7,9)):(e=t.substring(1,2),n=t.substring(2,3),i=t.substring(3,4),r=t.substring(4,5),e+=e,n+=n,i+=i,r+=r),{red:parseInt(e,16),green:parseInt(n,16),blue:parseInt(i,16),alpha:r?parseInt(r,16)/255:1}}const zp={test:gg("#"),parse:DI,transform:ms.transform},II=t=>({test:e=>typeof e=="string"&&e.endsWith(t)&&e.split(" ").length===1,parse:parseFloat,transform:e=>`${e}${t}`}),av=II("%"),pa={test:gg("hsl","hue"),parse:uM("hue","saturation","lightness"),transform:({hue:t,saturation:e,lightness:n,alpha:i=1})=>"hsla("+Math.round(t)+", "+av.transform(Oo(e))+", "+av.transform(Oo(n))+", "+Oo(lM.transform(i))+")"},ar={test:t=>ms.test(t)||zp.test(t)||pa.test(t),parse:t=>ms.test(t)?ms.parse(t):pa.test(t)?pa.parse(t):zp.parse(t),transform:t=>typeof t=="string"?t:t.hasOwnProperty("red")?ms.transform(t):pa.transform(t),getAnimatableNone:t=>{const e=ar.parse(t);return e.alpha=0,ar.transform(e)}},kI=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function FI(t){var e,n;return isNaN(t)&&typeof t=="string"&&(((e=t.match(cM))==null?void 0:e.length)||0)+(((n=t.match(kI))==null?void 0:n.length)||0)>0}const dM="number",fM="color",UI="var",OI="var(",ov="${}",zI=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function ul(t){const e=t.toString(),n=[],i={color:[],number:[],var:[]},r=[];let s=0;const o=e.replace(zI,l=>(ar.test(l)?(i.color.push(s),r.push(fM),n.push(ar.parse(l))):l.startsWith(OI)?(i.var.push(s),r.push(UI),n.push(l)):(i.number.push(s),r.push(dM),n.push(parseFloat(l))),++s,ov)).split(ov);return{values:n,split:o,indexes:i,types:r}}function BI(t){return ul(t).values}function hM({split:t,types:e}){const n=t.length;return i=>{let r="";for(let s=0;s<n;s++)if(r+=t[s],i[s]!==void 0){const a=e[s];a===dM?r+=Oo(i[s]):a===fM?r+=ar.transform(i[s]):r+=i[s]}return r}}function HI(t){return hM(ul(t))}const VI=t=>typeof t=="number"?0:ar.test(t)?ar.getAnimatableNone(t):t,GI=(t,e)=>typeof t=="number"?e!=null&&e.trim().endsWith("/")?t:0:VI(t);function WI(t){const e=ul(t);return hM(e)(e.values.map((i,r)=>GI(i,e.split[r])))}const jI={test:FI,parse:BI,createTransformer:HI,getAnimatableNone:WI};function zf(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*(2/3-n)*6:t}function XI({hue:t,saturation:e,lightness:n,alpha:i}){t/=360,e/=100,n/=100;let r=0,s=0,a=0;if(!e)r=s=a=n;else{const o=n<.5?n*(1+e):n+e-n*e,l=2*n-o;r=zf(l,o,t+1/3),s=zf(l,o,t),a=zf(l,o,t-1/3)}return{red:Math.round(r*255),green:Math.round(s*255),blue:Math.round(a*255),alpha:i}}function Bu(t,e){return n=>n>0?e:t}const gd=(t,e,n)=>t+(e-t)*n,Bf=(t,e,n)=>{const i=t*t,r=n*(e*e-i)+i;return r<0?0:Math.sqrt(r)},$I=[zp,ms,pa],YI=t=>$I.find(e=>e.test(t));function lv(t){const e=YI(t);if(!e)return!1;let n=e.parse(t);return e===pa&&(n=XI(n)),n}const cv=(t,e)=>{const n=lv(t),i=lv(e);if(!n||!i)return Bu(t,e);const r={...n};return s=>(r.red=Bf(n.red,i.red,s),r.green=Bf(n.green,i.green,s),r.blue=Bf(n.blue,i.blue,s),r.alpha=gd(n.alpha,i.alpha,s),ms.transform(r))},Bp=new Set(["none","hidden"]);function qI(t,e){return Bp.has(t)?n=>n<=0?t:e:n=>n>=1?e:t}function KI(t,e){return n=>gd(t,e,n)}function xg(t){return typeof t=="number"?KI:typeof t=="string"?CI(t)?Bu:ar.test(t)?cv:JI:Array.isArray(t)?pM:typeof t=="object"?ar.test(t)?cv:ZI:Bu}function pM(t,e){const n=[...t],i=n.length,r=t.map((s,a)=>xg(s)(s,e[a]));return s=>{for(let a=0;a<i;a++)n[a]=r[a](s);return n}}function ZI(t,e){const n={...t,...e},i={};for(const r in n)t[r]!==void 0&&e[r]!==void 0&&(i[r]=xg(t[r])(t[r],e[r]));return r=>{for(const s in i)n[s]=i[s](r);return n}}function QI(t,e){const n=[],i={color:0,var:0,number:0};for(let r=0;r<e.values.length;r++){const s=e.types[r],a=t.indexes[s][i[s]],o=t.values[a]??0;n[r]=o,i[s]++}return n}const JI=(t,e)=>{const n=jI.createTransformer(e),i=ul(t),r=ul(e);return i.indexes.var.length===r.indexes.var.length&&i.indexes.color.length===r.indexes.color.length&&i.indexes.number.length>=r.indexes.number.length?Bp.has(t)&&!r.values.length||Bp.has(e)&&!i.values.length?qI(t,e):rM(pM(QI(i,r),r.values),n):Bu(t,e)};function ek(t,e,n){return typeof t=="number"&&typeof e=="number"&&typeof n=="number"?gd(t,e,n):xg(t)(t,e)}function tk(t,e,n){const i=[],r=n||pg.mix||ek,s=t.length-1;for(let a=0;a<s;a++){let o=r(t[a],t[a+1]);if(e){const l=Array.isArray(e)?e[a]||md:e;o=rM(l,o)}i.push(o)}return i}function nk(t,e,{clamp:n=!0,ease:i,mixer:r}={}){const s=t.length;if(yI(s===e.length),s===1)return()=>e[0];if(s===2&&e[0]===e[1])return()=>e[1];const a=t[0]===t[1];t[0]>t[s-1]&&(t=[...t].reverse(),e=[...e].reverse());const o=tk(e,i,r),l=o.length,c=u=>{if(a&&u<t[0])return e[0];let f=0;if(l>1)for(;f<t.length-2&&!(u<t[f+1]);f++);const d=mg(t[f],t[f+1],u);return o[f](d)};return n?u=>c(pd(t[0],t[s-1],u)):c}function ik(t,e){const n=t[t.length-1];for(let i=1;i<=e;i++){const r=mg(0,e,i);t.push(gd(n,1,r))}}function rk(t){const e=[0];return ik(e,t.length-1),e}const sk={};function mM(t,e){const n=bI(t);return()=>sk[e]??n()}const gM=mM(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),xM=mM(()=>window.ViewTimeline!==void 0,"viewTimeline"),uv=30,ak=t=>!isNaN(parseFloat(t));class ok{constructor(e,n={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=i=>{var s;const r=Zc.now();if(this.updatedAt!==r&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(i),this.current!==this.prev&&((s=this.events.change)==null||s.notify(this.current),this.dependents))for(const a of this.dependents)a.dirty()},this.hasAnimated=!1,this.setCurrent(e),this.owner=n.owner}setCurrent(e){this.current=e,this.updatedAt=Zc.now(),this.canTrackVelocity===null&&e!==void 0&&(this.canTrackVelocity=ak(this.current))}setPrevFrameValue(e=this.current){this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt}onChange(e){return this.on("change",e)}on(e,n){this.events[e]||(this.events[e]=new SI);const i=this.events[e].add(n);return e==="change"?()=>{i(),ha.read(()=>{this.events.change.getSize()||this.stop()})}:i}clearListeners(){for(const e in this.events)this.events[e].clear()}attach(e,n){this.passiveEffect=e,this.stopPassiveEffect=n}set(e){this.passiveEffect?this.passiveEffect(e,this.updateAndNotify):this.updateAndNotify(e)}setWithVelocity(e,n,i){this.set(n),this.prev=void 0,this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt-i}jump(e,n=!0){this.updateAndNotify(e),this.prev=e,this.prevUpdatedAt=this.prevFrameValue=void 0,n&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var e;(e=this.events.change)==null||e.notify(this.current)}addDependent(e){this.dependents||(this.dependents=new Set),this.dependents.add(e)}removeDependent(e){this.dependents&&this.dependents.delete(e)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const e=Zc.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||e-this.updatedAt>uv)return 0;const n=Math.min(this.updatedAt-this.prevUpdatedAt,uv);return sM(parseFloat(this.current)-parseFloat(this.prevFrameValue),n)}start(e){return this.stop(),new Promise(n=>{this.hasAnimated=!0,this.animation=e(n),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var e,n;(e=this.dependents)==null||e.clear(),(n=this.events.destroy)==null||n.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Tc(t,e){return new ok(t,e)}function lk(t,e,n){if(t==null)return[];if(t instanceof EventTarget)return[t];if(typeof t=="string"){const r=document.querySelectorAll(t);return r?Array.from(r):[]}return Array.from(t).filter(i=>i!=null)}function ck(t){return iM(t)&&"offsetHeight"in t&&!("ownerSVGElement"in t)}const{schedule:Hp,cancel:_M}=aM(queueMicrotask,!1);function uk(t){return iM(t)&&"ownerSVGElement"in t}const Qc=new WeakMap;let _r;const vM=(t,e,n)=>(i,r)=>r&&r[0]?r[0][t+"Size"]:uk(i)&&"getBBox"in i?i.getBBox()[e]:i[n],dk=vM("inline","width","offsetWidth"),fk=vM("block","height","offsetHeight");function hk({target:t,borderBoxSize:e}){var n;(n=Qc.get(t))==null||n.forEach(i=>{i(t,{get width(){return dk(t,e)},get height(){return fk(t,e)}})})}function pk(t){t.forEach(hk)}function mk(){typeof ResizeObserver>"u"||(_r=new ResizeObserver(pk))}function gk(t,e){_r||mk();const n=lk(t);return n.forEach(i=>{let r=Qc.get(i);r||(r=new Set,Qc.set(i,r)),r.add(e),_r==null||_r.observe(i)}),()=>{n.forEach(i=>{const r=Qc.get(i);r==null||r.delete(e),r!=null&&r.size||_r==null||_r.unobserve(i)})}}const Jc=new Set;let ma;function xk(){ma=()=>{const t={get width(){return window.innerWidth},get height(){return window.innerHeight}};Jc.forEach(e=>e(t))},window.addEventListener("resize",ma)}function _k(t){return Jc.add(t),ma||xk(),()=>{Jc.delete(t),!Jc.size&&typeof ma=="function"&&(window.removeEventListener("resize",ma),ma=void 0)}}function vk(t,e){return typeof t=="function"?_k(t):gk(t,e)}function yM(t,e){let n;const i=()=>{const{currentTime:r}=e,a=(r===null?0:r.value)/100;n!==a&&t(a),n=a};return ha.preUpdate(i,!0),()=>Up(i)}function Hu(t){return typeof window>"u"?!1:t?xM():gM()}const yk=50,dv=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),bk=()=>({time:0,x:dv(),y:dv()}),Sk={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function fv(t,e,n,i){const r=n[e],{length:s,position:a}=Sk[e],o=r.current,l=n.time;r.current=Math.abs(t[`scroll${a}`]),r.scrollLength=t[`scroll${s}`]-t[`client${s}`],r.offset.length=0,r.offset[0]=0,r.offset[1]=r.scrollLength,r.progress=mg(0,r.scrollLength,r.current);const c=i-l;r.velocity=c>yk?0:sM(r.current-o,c)}function Mk(t,e,n){fv(t,"x",e,n),fv(t,"y",e,n),e.time=n}function wk(t,e){const n={x:0,y:0};let i=t;for(;i&&i!==e;)if(ck(i))n.x+=i.offsetLeft,n.y+=i.offsetTop,i=i.offsetParent;else if(i.tagName==="svg"){const r=i.getBoundingClientRect();i=i.parentElement;const s=i.getBoundingClientRect();n.x+=r.left-s.left,n.y+=r.top-s.top}else if(i instanceof SVGGraphicsElement){const{x:r,y:s}=i.getBBox();n.x+=r,n.y+=s;let a=null,o=i.parentNode;for(;!a;)o.tagName==="svg"&&(a=o),o=i.parentNode;i=a}else break;return n}const Vp={start:0,center:.5,end:1};function hv(t,e,n=0){let i=0;if(t in Vp&&(t=Vp[t]),typeof t=="string"){const r=parseFloat(t);t.endsWith("px")?i=r:t.endsWith("%")?t=r/100:t.endsWith("vw")?i=r/100*document.documentElement.clientWidth:t.endsWith("vh")?i=r/100*document.documentElement.clientHeight:t=r}return typeof t=="number"&&(i=e*t),n+i}const Ek=[0,0];function Tk(t,e,n,i){let r=Array.isArray(t)?t:Ek,s=0,a=0;return typeof t=="number"?r=[t,t]:typeof t=="string"&&(t=t.trim(),t.includes(" ")?r=t.split(" "):r=[t,Vp[t]?t:"0"]),s=hv(r[0],n,i),a=hv(r[1],e),s-a}const yo={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},Ak={x:0,y:0};function Ck(t){return"getBBox"in t&&t.tagName!=="svg"?t.getBBox():{width:t.clientWidth,height:t.clientHeight}}function Rk(t,e,n){const{offset:i=yo.All}=n,{target:r=t,axis:s="y"}=n,a=s==="y"?"height":"width",o=r!==t?wk(r,t):Ak,l=r===t?{width:t.scrollWidth,height:t.scrollHeight}:Ck(r),c={width:t.clientWidth,height:t.clientHeight};e[s].offset.length=0;let u=!e[s].interpolate;const f=i.length;for(let d=0;d<f;d++){const p=Tk(i[d],c[a],l[a],o[s]);!u&&p!==e[s].interpolatorOffsets[d]&&(u=!0),e[s].offset[d]=p}u&&(e[s].interpolate=nk(e[s].offset,rk(i),{clamp:!1}),e[s].interpolatorOffsets=[...e[s].offset]),e[s].progress=pd(0,1,e[s].interpolate(e[s].current))}function Pk(t,e=t,n){if(n.x.targetOffset=0,n.y.targetOffset=0,e!==t){let i=e;for(;i&&i!==t;)n.x.targetOffset+=i.offsetLeft,n.y.targetOffset+=i.offsetTop,i=i.offsetParent}n.x.targetLength=e===t?e.scrollWidth:e.clientWidth,n.y.targetLength=e===t?e.scrollHeight:e.clientHeight,n.x.containerLength=t.clientWidth,n.y.containerLength=t.clientHeight}function Nk(t,e,n,i={}){return{measure:r=>{Pk(t,i.target,n),Mk(t,n,r),(i.offset||i.target)&&Rk(t,n,i)},notify:()=>e(n)}}const Ks=new WeakMap,pv=new WeakMap,Hf=new WeakMap,mv=new WeakMap,Ac=new WeakMap,gv=t=>t===document.scrollingElement?window:t;function bM(t,{container:e=document.scrollingElement,trackContentSize:n=!1,...i}={}){if(!e)return md;let r=Hf.get(e);r||(r=new Set,Hf.set(e,r));const s=bk(),a=Nk(e,t,s,i);if(r.add(a),!Ks.has(e)){const l=()=>{for(const d of r)d.measure(Op.timestamp);ha.preUpdate(c)},c=()=>{for(const d of r)d.notify()},u=()=>ha.read(l);Ks.set(e,u);const f=gv(e);window.addEventListener("resize",u),e!==document.documentElement&&pv.set(e,vk(e,u)),f.addEventListener("scroll",u),u()}if(n&&!Ac.has(e)){const l=Ks.get(e),c={width:e.scrollWidth,height:e.scrollHeight};mv.set(e,c);const u=()=>{const d=e.scrollWidth,p=e.scrollHeight;(c.width!==d||c.height!==p)&&(l(),c.width=d,c.height=p)},f=ha.read(u,!0);Ac.set(e,f)}const o=Ks.get(e);return ha.read(o,!1,!0),()=>{var f;Up(o);const l=Hf.get(e);if(!l||(l.delete(a),l.size))return;const c=Ks.get(e);Ks.delete(e),c&&(gv(e).removeEventListener("scroll",c),(f=pv.get(e))==null||f(),window.removeEventListener("resize",c));const u=Ac.get(e);u&&(Up(u),Ac.delete(e)),mv.delete(e)}}const Lk=[[yo.Enter,"entry"],[yo.Exit,"exit"],[yo.Any,"cover"],[yo.All,"contain"]],xv={start:0,end:1};function Dk(t){const e=t.trim().split(/\s+/);if(e.length!==2)return;const n=xv[e[0]],i=xv[e[1]];if(!(n===void 0||i===void 0))return[n,i]}function Ik(t){if(t.length!==2)return;const e=[];for(const n of t)if(Array.isArray(n))e.push(n);else if(typeof n=="string"){const i=Dk(n);if(!i)return;e.push(i)}else return;return e}function kk(t,e){const n=Ik(t);if(!n)return!1;for(let i=0;i<2;i++){const r=n[i],s=e[i];if(r[0]!==s[0]||r[1]!==s[1])return!1}return!0}function _g(t){if(!t)return{rangeStart:"contain 0%",rangeEnd:"contain 100%"};for(const[e,n]of Lk)if(kk(t,e))return{rangeStart:`${n} 0%`,rangeEnd:`${n} 100%`}}const _v=new Map;function vv(t){const e={value:0},n=bM(i=>{e.value=i[t.axis].progress*100},t);return{currentTime:e,cancel:n}}function SM({source:t,container:e,...n}){const{axis:i}=n;t&&(e=t);let r=_v.get(e);r||(r=new Map,_v.set(e,r));const s=n.target??"self";let a=r.get(s);a||(a={},r.set(s,a));const o=i+(n.offset??[]).join(",");return a[o]||(n.target&&Hu(n.target)?_g(n.offset)?a[o]=new ViewTimeline({subject:n.target,axis:i}):a[o]=vv({container:e,...n}):Hu()?a[o]=new ScrollTimeline({source:e,axis:i}):a[o]=vv({container:e,...n})),a[o]}function Fk(t,e){const n=SM(e),i=e.target?_g(e.offset):void 0,r=e.target?Hu(e.target)&&!!i:Hu();return t.attachTimeline({timeline:r?n:void 0,...i&&r&&{rangeStart:i.rangeStart,rangeEnd:i.rangeEnd},observe:s=>(s.pause(),yM(a=>{s.time=s.iterationDuration*a},n))})}function Uk(t){return t&&(t.target||t.offset)}function Ok(t){return t.length===2}function zk(t,e){return Ok(t)||Uk(e)?bM(n=>{t(n[e.axis].progress,n)},e):yM(t,SM(e))}function MM(t,{axis:e="y",container:n=document.scrollingElement,...i}={}){if(!n)return md;const r={axis:e,container:n,...i};return typeof t=="function"?zk(t,r):Fk(t,r)}const Bk=()=>({scrollX:Tc(0),scrollY:Tc(0),scrollXProgress:Tc(0),scrollYProgress:Tc(0)}),ga=t=>t?!t.current:!1;function yv(t,e,n,i){return{factory:r=>{let s;const a=()=>{if(ga(n)||ga(i)){Hp.read(a);return}s=MM(r,{...e,axis:t,container:(n==null?void 0:n.current)||void 0,target:(i==null?void 0:i.current)||void 0})};return Hp.read(a),()=>{_M(a),s==null||s()}},times:[0,1],keyframes:[0,1],ease:r=>r,duration:1}}function Hk(t,e){return typeof window>"u"?!1:t?xM()&&!!_g(e):gM()}function Vk({container:t,target:e,...n}={}){const i=mI(Bk);Hk(e,n.offset)&&(i.scrollXProgress.accelerate=yv("x",n,t,e),i.scrollYProgress.accelerate=yv("y",n,t,e));const r=se.useRef(null),s=se.useRef(!1),a=se.useCallback(()=>(r.current=MM((o,{x:l,y:c})=>{i.scrollX.set(l.current),i.scrollXProgress.set(l.progress),i.scrollY.set(c.current),i.scrollYProgress.set(c.progress)},{...n,container:(t==null?void 0:t.current)||void 0,target:(e==null?void 0:e.current)||void 0}),()=>{var o;(o=r.current)==null||o.call(r)}),[t,e,JSON.stringify(n.offset)]);return xI(()=>{if(s.current=!1,ga(t)||ga(e)){s.current=!0;return}else return a()},[a]),se.useEffect(()=>{if(!s.current)return;let o;const l=()=>{const c=ga(t),u=ga(e);!c&&!u&&(o=a())};return Hp.read(l),()=>{_M(l),o==null||o()}},[a]),i}const xr=360,Gk=1,Wk="/SATQUERY-SEQUENCE/sat_",jk=".webp";function Xk(t){return`${Wk}${String(t).padStart(3,"0")}${jk}`}function $k({progress:t}){const e=Math.round(t*100),n=54,i=2*Math.PI*n;return g.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#030712",zIndex:50},children:[g.jsxs("div",{style:{position:"relative",width:"128px",height:"128px",marginBottom:"24px"},children:[g.jsxs("svg",{style:{width:"100%",height:"100%",transform:"rotate(-90deg)"},viewBox:"0 0 120 120",children:[g.jsx("circle",{cx:"60",cy:"60",r:n,fill:"none",stroke:"rgba(0,240,255,0.08)",strokeWidth:"3"}),g.jsx("circle",{cx:"60",cy:"60",r:n,fill:"none",stroke:"#00f0ff",strokeWidth:"3",strokeDasharray:i,strokeDashoffset:i*(1-t),strokeLinecap:"round",style:{transition:"stroke-dashoffset 0.1s linear"}})]}),g.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"},children:g.jsxs("span",{style:{color:"#67e8f9",fontFamily:"monospace",fontSize:"1.25rem",fontWeight:"bold"},children:[e,"%"]})})]}),g.jsx("p",{style:{fontFamily:"monospace",color:"#22d3ee",fontSize:"11px",letterSpacing:"0.3em",textTransform:"uppercase"},children:"INITIALIZING ORBITAL LINK..."}),g.jsx("div",{style:{marginTop:"16px",width:"192px",height:"1px",backgroundColor:"rgba(22, 78, 99, 0.4)",overflow:"hidden"},children:g.jsx("div",{style:{height:"100%",backgroundColor:"rgba(34, 211, 238, 0.6)",width:`${e}%`,transition:"width 0.1s linear"}})})]})}function Yk(){const t=se.useRef(null),e=se.useRef(null),n=se.useRef(null),i=se.useRef(null),r=se.useRef([]),s=se.useRef(0);se.useRef(null);const[a,o]=se.useState(0),[l,c]=se.useState(!1),[u,f]=se.useState(1),{scrollYProgress:d}=Vk({target:t}),p=se.useCallback(m=>{const h=e.current,_=Math.max(0,Math.min(xr-1,m)),M=r.current[_];if(!h||!M||!M.complete||M.naturalWidth===0)return;i.current||(i.current=h.getContext("2d"));const b=i.current;if(!b)return;const S=h.clientWidth,E=h.clientHeight;if(S===0||E===0)return;const C=Math.min(S/M.naturalWidth,E/M.naturalHeight),v=M.naturalWidth*C,A=M.naturalHeight*C;b.clearRect(0,0,S,E),b.drawImage(M,(S-v)/2,(E-A)/2,v,A);const R=b.createRadialGradient(S/2,E/2,E*.38,S/2,E/2,E*.85);R.addColorStop(0,"rgba(3,7,18,0)"),R.addColorStop(1,"rgba(3,7,18,0.40)"),b.fillStyle=R,b.fillRect(0,0,S,E)},[]),x=se.useCallback(()=>{const m=e.current;if(!m)return;const h=window.devicePixelRatio||1;m.width=window.innerWidth*h,m.height=window.innerHeight*h,m.style.width=`${window.innerWidth}px`,m.style.height=`${window.innerHeight}px`;const _=m.getContext("2d");_&&(_.setTransform(1,0,0,1,0,0),_.scale(h,h),_.imageSmoothingEnabled=!0,_.imageSmoothingQuality="high",i.current=_),p(s.current)},[p]);se.useEffect(()=>{let m=0;const h=[];for(let _=0;_<xr;_++){const M=new Image;M.decoding="async",M.src=Xk(Gk+_);const b=()=>{m++,o(m/xr),_===0&&(x(),p(0)),m===xr&&c(!0)};M.onload=b,M.onerror=b,h.push(M)}r.current=h},[x,p]),se.useEffect(()=>(x(),window.addEventListener("resize",x),()=>window.removeEventListener("resize",x)),[x]),se.useEffect(()=>{l&&(x(),p(0))},[l,x,p]),se.useEffect(()=>{let m=0,h=0,_=null;const M=()=>{const E=t.current;if(!E)return;const C=E.getBoundingClientRect(),v=E.offsetHeight-window.innerHeight;if(v<=0)return;const A=-C.top;m=Math.max(0,Math.min(1,A/v))},b=()=>{const E=m-h;Math.abs(E)>1e-5?h+=E*.18:h=m;const C=Math.round(h*(xr-1)),v=Math.max(0,Math.min(xr-1,C));if(v!==s.current&&(s.current=v,f(v+1),p(v)),n.current){const A=Math.max(0,Math.min(1,(h-.92)/.08));n.current.style.opacity=String(A)}_=requestAnimationFrame(b)};M(),h=m;const S=Math.round(h*(xr-1));return s.current=S,p(S),window.addEventListener("scroll",M,{passive:!0}),_=requestAnimationFrame(b),()=>{window.removeEventListener("scroll",M),_!==null&&cancelAnimationFrame(_)}},[p]);const y=()=>{const m=document.getElementById("dashboard-section");m&&m.scrollIntoView({behavior:"smooth"})};return g.jsx("div",{ref:t,style:{height:"400vh",position:"relative",width:"100%",backgroundColor:"#030712"},children:g.jsxs("div",{style:{position:"sticky",top:0,height:"100vh",width:"100vw",overflow:"hidden",backgroundColor:"#030712",zIndex:10},children:[g.jsx("div",{style:{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 50% 30%, rgba(14, 165, 233, 0.12) 0%, rgba(3, 7, 18, 0.9) 70%, #030712 100%)",pointerEvents:"none"}}),g.jsx("canvas",{ref:e,style:{position:"absolute",inset:0,width:"100%",height:"100%",display:"block"}}),!l&&a<.15&&g.jsx($k,{progress:a}),g.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"2rem 3rem",pointerEvents:"none",zIndex:20},children:[g.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",pointerEvents:"auto"},children:[g.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:"0.75rem",background:"rgba(15, 23, 42, 0.75)",border:"1px solid rgba(56, 189, 248, 0.25)",backdropFilter:"blur(16px)",padding:"0.45rem 1.2rem",borderRadius:"999px",boxShadow:"0 0 20px rgba(56, 189, 248, 0.12)"},children:[g.jsx("span",{style:{display:"inline-block",width:"8px",height:"8px",borderRadius:"50%",backgroundColor:"#38bdf8",boxShadow:"0 0 10px #38bdf8",animation:"pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"}}),g.jsx("span",{style:{fontFamily:"monospace",fontSize:"0.75rem",color:"#bae6fd",letterSpacing:"0.15em",textTransform:"uppercase",fontWeight:600},children:"ISRO SIH26167 · ORBITAL AI ENGINE"})]}),g.jsx("div",{style:{display:"flex",gap:"1rem",alignItems:"center"},children:g.jsxs("span",{style:{fontFamily:"monospace",fontSize:"0.72rem",color:"#64748b",letterSpacing:"0.1em"},children:["FRAME: ",g.jsx("strong",{style:{color:"#38bdf8"},children:String(u).padStart(3,"0")})," / ",xr]})})]}),g.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",maxWidth:"820px",margin:"0 auto",pointerEvents:"auto"},children:[g.jsx("h1",{style:{fontSize:"clamp(2.5rem, 5vw, 4.2rem)",fontWeight:900,letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:"1rem",color:"#ffffff",textShadow:"0 0 40px rgba(56, 189, 248, 0.35)"},children:g.jsx("span",{style:{background:"linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}})}),g.jsx("p",{style:{fontSize:"clamp(0.95rem, 1.5vw, 1.15rem)",color:"#94a3b8",lineHeight:1.6,marginBottom:"2rem",maxWidth:"680px"}})]}),g.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-end",width:"100%",pointerEvents:"auto"},children:[g.jsxs("div",{style:{fontFamily:"monospace",fontSize:"0.75rem",color:"#64748b",display:"flex",flexDirection:"column",gap:"0.3rem"},children:[g.jsxs("span",{children:["MODES: ",g.jsx("strong",{style:{color:"#38bdf8"},children:"RGB · SENTINEL-2 · SAR · BI-TEMPORAL"})]}),g.jsxs("span",{children:["COMPLIANCE: ",g.jsx("strong",{style:{color:"#4ade80"},children:"SIH26167 ISRO SPEC LIVE"})]})]}),g.jsxs("div",{onClick:y,style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.4rem",cursor:"pointer",opacity:.85},children:[g.jsx("span",{style:{fontFamily:"monospace",fontSize:"0.7rem",letterSpacing:"0.2em",color:"#38bdf8",textTransform:"uppercase"},children:"SCROLL TO EXPLORE ORBIT"}),g.jsx("div",{style:{width:"20px",height:"32px",borderRadius:"10px",border:"2px solid rgba(56, 189, 248, 0.4)",display:"flex",justifyContent:"center",paddingTop:"6px"},children:g.jsx("div",{style:{width:"3px",height:"6px",backgroundColor:"#38bdf8",borderRadius:"2px",animation:"bounce 1.5s infinite"}})})]})]})]}),g.jsx("div",{ref:n,style:{position:"absolute",inset:0,background:"linear-gradient(to bottom, transparent 0%, rgba(3,7,18,0.4) 60%, rgba(6,10,20,1) 100%)",pointerEvents:"none",opacity:0,transition:"opacity 0.05s linear"}})]})})}function qk(){const t=se.useRef(null),e=se.useRef(null),n=se.useRef({x:.5,y:.5,targetX:.5,targetY:.5});return se.useEffect(()=>{const i=p=>{const x=p.clientX/window.innerWidth,y=p.clientY/window.innerHeight;n.current.targetX=x,n.current.targetY=y};window.addEventListener("mousemove",i);const r=e.current;if(!r)return;const s=r.getContext("2d");if(!s)return;let a,o=r.width=window.innerWidth,l=r.height=window.innerHeight;const c=()=>{r&&(o=r.width=window.innerWidth,l=r.height=window.innerHeight)};window.addEventListener("resize",c);const f=Array.from({length:70},()=>({x:Math.random()*o,y:Math.random()*l,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,size:Math.random()*2+1,color:Math.random()>.4?"#38bdf8":"#818cf8",alpha:Math.random()*.6+.2,depth:Math.random()*.8+.2})),d=()=>{n.current.x+=(n.current.targetX-n.current.x)*.08,n.current.y+=(n.current.targetY-n.current.y)*.08;const p=(n.current.x-.5)*60,x=(n.current.y-.5)*60;t.current&&(t.current.style.transform=`translate3d(${-p*.5}px, ${-x*.5}px, 0) scale(1.05)`),s.clearRect(0,0,o,l);for(let y=0;y<f.length;y++){const m=f[y];m.x+=m.vx,m.y+=m.vy,m.x<0&&(m.x=o),m.x>o&&(m.x=0),m.y<0&&(m.y=l),m.y>l&&(m.y=0);const h=m.x+p*m.depth,_=m.y+x*m.depth;s.beginPath(),s.arc(h,_,m.size,0,Math.PI*2),s.fillStyle=m.color,s.globalAlpha=m.alpha,s.shadowColor=m.color,s.shadowBlur=8,s.fill(),s.shadowBlur=0;for(let M=y+1;M<f.length;M++){const b=f[M],S=b.x+p*b.depth,E=b.y+x*b.depth,C=Math.hypot(h-S,_-E);C<110&&(s.beginPath(),s.moveTo(h,_),s.lineTo(S,E),s.strokeStyle="#38bdf8",s.globalAlpha=(1-C/110)*.18,s.lineWidth=.8,s.stroke())}}s.globalAlpha=1,a=requestAnimationFrame(d)};return a=requestAnimationFrame(d),()=>{window.removeEventListener("mousemove",i),window.removeEventListener("resize",c),cancelAnimationFrame(a)}},[]),g.jsxs("div",{style:{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0},children:[g.jsx("div",{ref:t,style:{position:"absolute",inset:"-5%",width:"110%",height:"110%",backgroundImage:`
            radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.15) 0%, transparent 45%),
            radial-gradient(circle at 80% 60%, rgba(139, 92, 246, 0.16) 0%, transparent 50%),
            radial-gradient(circle at 50% 85%, rgba(6, 182, 212, 0.12) 0%, transparent 45%),
            radial-gradient(circle at 70% 15%, rgba(59, 130, 246, 0.12) 0%, transparent 40%)
          `,backgroundSize:"cover",transition:"transform 0.1s ease-out",opacity:.85}}),g.jsx("canvas",{ref:e,style:{position:"absolute",inset:0,width:"100%",height:"100%",display:"block",opacity:.75}})]})}async function Kk(t){const e=await fetch("/query/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok){const n=await e.json().catch(()=>({detail:e.statusText}));throw new Error(n.detail??"API error")}return e.json()}function Zk(){const[t,e]=se.useState(null),[n,i]=se.useState(!1),[r,s]=se.useState(null),[a,o]=se.useState(null),[l,c]=se.useState({}),u=se.useCallback(async(d,p={})=>{var y;i(!0),s(null),e(null),c(p);const x=sv(d.question);x&&o(x);try{const m=await Kk(d);e(m);const h=((y=m.earthquery_spec)==null?void 0:y.extracted_entities)||[],_=sv(m.question,h);_&&o(_)}catch(m){s(m instanceof Error?m.message:"Unknown error")}finally{i(!1)}},[]),f=se.useCallback(()=>{e(null),s(null),o(null);const d=document.getElementById("dashboard-section");d&&d.scrollIntoView({behavior:"smooth"})},[]);return g.jsxs("div",{className:"app bg-[#030712]",style:{backgroundColor:"#030712"},children:[g.jsx(Yk,{}),g.jsxs("div",{className:"dashboard-container",id:"dashboard-section",style:{position:"relative",minHeight:"100vh",width:"100%",backgroundColor:"#030712",overflow:"hidden"},children:[g.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:"180px",background:"linear-gradient(to bottom, #030712 0%, rgba(3,7,18,0.85) 40%, transparent 100%)",pointerEvents:"none",zIndex:15}}),g.jsx("div",{style:{position:"relative",zIndex:25,display:"flex",alignItems:"center",justifyContent:"center",paddingTop:"2rem",paddingBottom:"0.5rem"},children:g.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:"0.6rem",padding:"6px 18px",borderRadius:"999px",background:"rgba(6, 182, 212, 0.08)",border:"1px solid rgba(6, 182, 212, 0.3)",backdropFilter:"blur(12px)",boxShadow:"0 0 25px rgba(6, 182, 212, 0.15)"},children:[g.jsx("span",{style:{width:"8px",height:"8px",borderRadius:"50%",backgroundColor:"#06b6d4",boxShadow:"0 0 10px #06b6d4",display:"inline-block"}}),g.jsx("span",{style:{fontFamily:"monospace",fontSize:"0.74rem",letterSpacing:"0.2em",color:"#67e8f9",textTransform:"uppercase",fontWeight:600},children:"SURFACE TELEMETRY LOCKED · SATELLITE COPILOT ACTIVE"})]})}),g.jsx(qk,{}),g.jsx(pI,{targetLocation:a,onResetTarget:()=>o(null)}),g.jsx("nav",{className:"navbar",id:"main-navbar",style:{position:"relative",zIndex:20},children:g.jsxs("div",{className:"navbar-inner",children:[g.jsxs("div",{className:"nav-brand",onClick:f,style:{cursor:"pointer"},children:[g.jsx("div",{className:"nav-logo",children:"🛰"}),g.jsxs("div",{children:[g.jsx("h1",{className:"nav-title gradient-text",children:"SatQuery AI"}),g.jsx("p",{className:"nav-subtitle",children:"Interactive Vision-Language Assistant for Remote Sensing"})]})]}),g.jsxs("div",{className:"nav-badges",children:[g.jsx("span",{className:"badge badge-blue",children:"SIH26167"}),g.jsx("span",{className:"badge badge-cyan",children:"ISRO"}),g.jsx("span",{className:"badge badge-purple",children:"Smart India Hackathon 2026"})]})]})}),g.jsxs("main",{className:"mission-stage-main",id:"main-workspace",style:{position:"relative",zIndex:20},children:[n&&g.jsx(Qk,{}),r&&g.jsx(Jk,{message:r,onRetry:f}),t&&!n&&g.jsx(GC,{response:t,requestMeta:l,onNewMission:f}),!n&&!t&&g.jsx(dE,{onAnalyze:u,loading:n})]})]}),g.jsx("style",{children:`
        .app { min-height: 100vh; display: flex; flex-direction: column; }
        .dashboard-container { position: relative; }

        /* Navbar */
        .navbar {
          position: sticky; top: 0; z-index: 100;
          background: rgba(6,10,20,0.85); backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-card);
          padding: 0.75rem 2rem;
        }
        .navbar-inner { max-width: 1400px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; }
        .nav-brand { display: flex; align-items: center; gap: 0.75rem; }
        .nav-logo { font-size: 1.8rem; line-height: 1; }
        .nav-title { font-size: 1.25rem; font-weight: 800; line-height: 1.1; }
        .nav-subtitle { font-size: 0.68rem; color: var(--text-muted); white-space: nowrap; }
        .nav-badges { display: flex; gap: 0.4rem; flex-wrap: wrap; }

        .mission-stage-main {
          width: 100%;
          min-height: calc(100vh - 80px);
        }

        @media (max-width: 600px) {
          .navbar { padding: 0.6rem 1rem; }
          .nav-badges .badge:nth-child(n+3) { display: none; }
        }
      `})]})}function Qk(){return g.jsxs("div",{className:"mission-loading-wrap fade-in",children:[g.jsxs("div",{className:"orbital-scanner-card card",children:[g.jsxs("div",{className:"scanner-orb-wrap",children:[g.jsx("div",{className:"scanner-pulse-ring"}),g.jsx("div",{className:"scanner-pulse-ring-inner"}),g.jsx("div",{className:"scanner-sat-icon",children:"🛰"})]}),g.jsx("h2",{className:"scanner-heading gradient-text",children:"Satellite Copilot Executing Pipeline"}),g.jsx("p",{className:"scanner-sub",children:"Orchestrating VQA, ChangeFormer, SAM grounding, and SAR-optical multi-agent fusion…"}),g.jsxs("div",{className:"scanner-telemetry-steps",children:[g.jsxs("div",{className:"scanner-step active",children:[g.jsx("span",{className:"step-dot"}),g.jsx("span",{children:"Multi-modal Perception & Task Intent Extraction"})]}),g.jsxs("div",{className:"scanner-step active",children:[g.jsx("span",{className:"step-dot"}),g.jsx("span",{children:"Sensor Selection & Cloud Penetration Arbitration"})]}),g.jsxs("div",{className:"scanner-step active",children:[g.jsx("span",{className:"step-dot"}),g.jsx("span",{children:"Bi-Temporal Change Detection & Spatial Intersection"})]}),g.jsxs("div",{className:"scanner-step active",children:[g.jsx("span",{className:"step-dot"}),g.jsx("span",{children:"Cross-Modal Evidence Fusion & 6-Component Confidence Scoring"})]})]}),g.jsx("div",{className:"progress-bar mt-4",style:{height:"6px",maxWidth:"380px",margin:"1.5rem auto 0"},children:g.jsx("div",{className:"progress-bar-fill scanner-progress-anim"})})]}),g.jsx("style",{children:`
        .mission-loading-wrap {
          max-width: 720px;
          margin: 4rem auto;
          padding: 0 1.5rem;
        }
        .orbital-scanner-card {
          text-align: center;
          padding: 3rem 2rem;
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(8, 14, 28, 0.98));
          border: 1px solid rgba(56, 189, 248, 0.35);
          border-radius: 20px;
          box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(56, 189, 248, 0.2);
        }
        .scanner-orb-wrap {
          position: relative;
          width: 90px;
          height: 90px;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .scanner-pulse-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px dashed rgba(56, 189, 248, 0.6);
          animation: spin 8s linear infinite;
        }
        .scanner-pulse-ring-inner {
          position: absolute;
          inset: 10px;
          border-radius: 50%;
          border: 1.5px solid rgba(168, 85, 247, 0.5);
          animation: spinReverse 6s linear infinite;
        }
        .scanner-sat-icon {
          font-size: 2.2rem;
          line-height: 1;
          filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.8));
          animation: floatOrb 3s ease-in-out infinite;
        }
        .scanner-heading {
          font-size: 1.45rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        .scanner-sub {
          font-size: 0.85rem;
          color: var(--text-secondary);
          max-width: 480px;
          margin: 0 auto 1.5rem;
        }
        .scanner-telemetry-steps {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          max-width: 460px;
          margin: 0 auto;
          text-align: left;
        }
        .scanner-step {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.78rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .scanner-step .step-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 6px #38bdf8;
          animation: pulse 1.5s infinite;
        }
        .scanner-progress-anim {
          width: 60%;
          background: linear-gradient(90deg, #38bdf8, #818cf8, #c084fc);
          animation: loadingBar 2s infinite ease-in-out;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes spinReverse { to { transform: rotate(-360deg); } }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes loadingBar {
          0% { transform: translateX(-100%); width: 30%; }
          50% { width: 70%; }
          100% { transform: translateX(200%); width: 30%; }
        }
      `})]})}function Jk({message:t,onRetry:e}){return g.jsxs("div",{className:"mission-error-wrap fade-in",children:[g.jsxs("div",{className:"card error-card-inner",id:"error-card",children:[g.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[g.jsx("span",{style:{fontSize:"1.4rem"},children:"⚠"}),g.jsx("p",{className:"section-label",style:{margin:0,color:"var(--accent-danger)"},children:"Pipeline Execution Error"})]}),g.jsx("p",{className:"text-sm",style:{color:"var(--text-secondary)",lineHeight:1.6},children:t}),g.jsxs("p",{className:"text-xs text-muted mt-3",children:["Ensure backend server is running: ",g.jsx("code",{className:"text-mono",children:"uvicorn backend.main:app --reload"})]}),g.jsx("button",{type:"button",className:"btn btn-secondary btn-sm mt-4",onClick:e,children:"↺ Return to Mission Setup"})]}),g.jsx("style",{children:`
        .mission-error-wrap {
          max-width: 640px;
          margin: 4rem auto;
          padding: 0 1.5rem;
        }
        .error-card-inner {
          border-left: 4px solid var(--accent-danger);
          padding: 2rem;
          background: linear-gradient(145deg, rgba(30, 10, 15, 0.8), rgba(15, 23, 42, 0.95));
        }
      `})]})}Vf.createRoot(document.getElementById("root")).render(g.jsx(qM.StrictMode,{children:g.jsx(Zk,{})}));
