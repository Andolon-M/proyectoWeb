(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j=globalThis,F=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),J=new WeakMap;let st=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(F&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=J.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&J.set(e,t))}return t}toString(){return this.cssText}};const pt=s=>new st(typeof s=="string"?s:s+"",void 0,W),ot=(s,...t)=>{const e=s.length===1?s[0]:t.reduce((r,i,o)=>r+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[o+1],s[0]);return new st(e,s,W)},ut=(s,t)=>{if(F)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const r=document.createElement("style"),i=j.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=e.cssText,s.appendChild(r)}},G=F?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return pt(e)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:gt,defineProperty:ft,getOwnPropertyDescriptor:mt,getOwnPropertyNames:bt,getOwnPropertySymbols:yt,getPrototypeOf:$t}=Object,m=globalThis,K=m.trustedTypes,vt=K?K.emptyScript:"",R=m.reactiveElementPolyfillSupport,E=(s,t)=>s,q={toAttribute(s,t){switch(t){case Boolean:s=s?vt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},at=(s,t)=>!gt(s,t),Q={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:at};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),m.litPropertyMetadata??(m.litPropertyMetadata=new WeakMap);class v extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Q){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(t,r,e);i!==void 0&&ft(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){const{get:i,set:o}=mt(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get(){return i==null?void 0:i.call(this)},set(a){const c=i==null?void 0:i.call(this);o.call(this,a),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Q}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const t=$t(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const e=this.properties,r=[...bt(e),...yt(e)];for(const i of r)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,i]of e)this.elementProperties.set(r,i)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const i=this._$Eu(e,r);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const i of r)e.unshift(G(i))}else t!==void 0&&e.push(G(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ut(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostConnected)==null?void 0:r.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostDisconnected)==null?void 0:r.call(e)})}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$EC(t,e){var o;const r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(i!==void 0&&r.reflect===!0){const a=(((o=r.converter)==null?void 0:o.toAttribute)!==void 0?r.converter:q).toAttribute(e,r.type);this._$Em=t,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(t,e){var o;const r=this.constructor,i=r._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const a=r.getPropertyOptions(i),c=typeof a.converter=="function"?{fromAttribute:a.converter}:((o=a.converter)==null?void 0:o.fromAttribute)!==void 0?a.converter:q;this._$Em=i,this[i]=c.fromAttribute(e,a.type),this._$Em=null}}requestUpdate(t,e,r){if(t!==void 0){if(r??(r=this.constructor.getPropertyOptions(t)),!(r.hasChanged??at)(this[t],e))return;this.P(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,r){this._$AL.has(t)||this._$AL.set(t,e),r.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,a]of this._$Ep)this[o]=a;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,a]of i)a.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.P(o,this[o],a)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(r=this._$EO)==null||r.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(e)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(r=>{var i;return(i=r.hostUpdated)==null?void 0:i.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[E("elementProperties")]=new Map,v[E("finalized")]=new Map,R==null||R({ReactiveElement:v}),(m.reactiveElementVersions??(m.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,H=P.trustedTypes,Y=H?H.createPolicy("lit-html",{createHTML:s=>s}):void 0,nt="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,lt="?"+f,_t=`<${lt}>`,$=document,k=()=>$.createComment(""),T=s=>s===null||typeof s!="object"&&typeof s!="function",ct=Array.isArray,xt=s=>ct(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",M=`[ 	
\f\r]`,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Z=/-->/g,X=/>/g,b=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),tt=/'/g,et=/"/g,dt=/^(?:script|style|textarea|title)$/i,wt=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),_=wt(1),A=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),it=new WeakMap,y=$.createTreeWalker($,129);function ht(s,t){if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Y!==void 0?Y.createHTML(t):t}const At=(s,t)=>{const e=s.length-1,r=[];let i,o=t===2?"<svg>":"",a=S;for(let c=0;c<e;c++){const n=s[c];let d,p,l=-1,u=0;for(;u<n.length&&(a.lastIndex=u,p=a.exec(n),p!==null);)u=a.lastIndex,a===S?p[1]==="!--"?a=Z:p[1]!==void 0?a=X:p[2]!==void 0?(dt.test(p[2])&&(i=RegExp("</"+p[2],"g")),a=b):p[3]!==void 0&&(a=b):a===b?p[0]===">"?(a=i??S,l=-1):p[1]===void 0?l=-2:(l=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?b:p[3]==='"'?et:tt):a===et||a===tt?a=b:a===Z||a===X?a=S:(a=b,i=void 0);const g=a===b&&s[c+1].startsWith("/>")?" ":"";o+=a===S?n+_t:l>=0?(r.push(d),n.slice(0,l)+nt+n.slice(l)+f+g):n+f+(l===-2?c:g)}return[ht(s,o+(s[e]||"<?>")+(t===2?"</svg>":"")),r]};class U{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let o=0,a=0;const c=t.length-1,n=this.parts,[d,p]=At(t,e);if(this.el=U.createElement(d,r),y.currentNode=this.el.content,e===2){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=y.nextNode())!==null&&n.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(nt)){const u=p[a++],g=i.getAttribute(l).split(f),O=/([.?@])?(.*)/.exec(u);n.push({type:1,index:o,name:O[2],strings:g,ctor:O[1]==="."?St:O[1]==="?"?Et:O[1]==="@"?Pt:I}),i.removeAttribute(l)}else l.startsWith(f)&&(n.push({type:6,index:o}),i.removeAttribute(l));if(dt.test(i.tagName)){const l=i.textContent.split(f),u=l.length-1;if(u>0){i.textContent=H?H.emptyScript:"";for(let g=0;g<u;g++)i.append(l[g],k()),y.nextNode(),n.push({type:2,index:++o});i.append(l[u],k())}}}else if(i.nodeType===8)if(i.data===lt)n.push({type:2,index:o});else{let l=-1;for(;(l=i.data.indexOf(f,l+1))!==-1;)n.push({type:7,index:o}),l+=f.length-1}o++}}static createElement(t,e){const r=$.createElement("template");return r.innerHTML=t,r}}function C(s,t,e=s,r){var a,c;if(t===A)return t;let i=r!==void 0?(a=e._$Co)==null?void 0:a[r]:e._$Cl;const o=T(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==o&&((c=i==null?void 0:i._$AO)==null||c.call(i,!1),o===void 0?i=void 0:(i=new o(s),i._$AT(s,e,r)),r!==void 0?(e._$Co??(e._$Co=[]))[r]=i:e._$Cl=i),i!==void 0&&(t=C(s,i._$AS(s,t.values),i,r)),t}class Ct{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,i=((t==null?void 0:t.creationScope)??$).importNode(e,!0);y.currentNode=i;let o=y.nextNode(),a=0,c=0,n=r[0];for(;n!==void 0;){if(a===n.index){let d;n.type===2?d=new N(o,o.nextSibling,this,t):n.type===1?d=new n.ctor(o,n.name,n.strings,this,t):n.type===6&&(d=new kt(o,this,t)),this._$AV.push(d),n=r[++c]}a!==(n==null?void 0:n.index)&&(o=y.nextNode(),a++)}return y.currentNode=$,i}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class N{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),T(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):xt(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==h&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T($.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:r}=t,i=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=U.createElement(ht(r.h,r.h[0]),this.options)),r);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(e);else{const a=new Ct(i,this),c=a.u(this.options);a.p(e),this.T(c),this._$AH=a}}_$AC(t){let e=it.get(t.strings);return e===void 0&&it.set(t.strings,e=new U(t)),e}k(t){ct(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const o of t)i===e.length?e.push(r=new N(this.S(k()),this.S(k()),this,this.options)):r=e[i],r._$AI(o),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class I{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,o){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=h}_$AI(t,e=this,r,i){const o=this.strings;let a=!1;if(o===void 0)t=C(this,t,e,0),a=!T(t)||t!==this._$AH&&t!==A,a&&(this._$AH=t);else{const c=t;let n,d;for(t=o[0],n=0;n<o.length-1;n++)d=C(this,c[r+n],e,n),d===A&&(d=this._$AH[n]),a||(a=!T(d)||d!==this._$AH[n]),d===h?t=h:t!==h&&(t+=(d??"")+o[n+1]),this._$AH[n]=d}a&&!i&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class St extends I{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}}class Et extends I{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}}class Pt extends I{constructor(t,e,r,i,o){super(t,e,r,i,o),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??h)===A)return;const r=this._$AH,i=t===h&&r!==h||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==h&&(r===h||i);i&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class kt{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}}const D=P.litHtmlPolyfillSupport;D==null||D(U,N),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.1.3");const Tt=(s,t,e)=>{const r=(e==null?void 0:e.renderBefore)??t;let i=r._$litPart$;if(i===void 0){const o=(e==null?void 0:e.renderBefore)??null;r._$litPart$=i=new N(t.insertBefore(k(),o),o,void 0,e??{})}return i._$AI(s),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class x extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Tt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return A}}var rt;x._$litElement$=!0,x.finalized=!0,(rt=globalThis.litElementHydrateSupport)==null||rt.call(globalThis,{LitElement:x});const L=globalThis.litElementPolyfillSupport;L==null||L({LitElement:x});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.5");const Ut="172.16.101.146:5642",z=Ut,zt=async()=>{let s=[],t=await w("camiseta");s=s.concat(t);let e=await w("pantalon");s=s.concat(e);let r=await w("abrigo");return s=s.concat(r),s},Nt=async(s,t)=>{for(let e of s)e.id=t+"-"+e.id},w=async s=>{let e=await(await fetch(`http://${z}/${s}`)).json();return Nt(e,s),e},Ot=async s=>{const t=s.reduce((r,i)=>i.id>r?i.id:r,0);return(parseInt(t,10)+1).toString()},V=async()=>await(await fetch(`http://${z}/carrito`)).json(),B=async(s,t)=>{try{const e=await V();let r=!1;for(let i of e)if(i.categorie===s.categorie&&i.idInCategorie===s.idInCategorie){t?i.cantidad=s.cantidad:i.cantidad++,r=!0,await fetch(`http://${z}/carrito/${i.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({cantidad:i.cantidad})});break}if(!r){const i=await Ot(e);s.id=i,await fetch(`http://${z}/carrito`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})}console.log("Carrito actualizado exitosamente.")}catch(e){console.error("Error al actualizar el carrito:",e)}},jt=async s=>{try{await fetch(`http://${z}/carrito/${s}`,{method:"DELETE"}),console.log("Producto eliminado del carrito exitosamente.")}catch(t){console.error("Error al eliminar el producto del carrito:",t)}};class Ht extends x{static get properties(){return{page:{type:String},pageTitle:{type:String},data:{type:Array}}}constructor(){super(),this.pageTitle="Todos los Productos",this.data=[]}updated(t){t.has("page")&&this.handlePageSelected()}async handlePageSelected(){this.page=="allProducts"?(this.pageTitle="Todos los Productos",this.data=await zt()):this.page=="abrigos"?(this.pageTitle="Abrigos",this.data=await w("abrigo")):this.page=="pantalones"?(this.pageTitle="Pantalones",this.data=await w("pantalon")):this.page=="camisetas"?(this.pageTitle="Camisetas",this.data=await w("camiseta")):this.page=="carrito"&&(this.pageTitle="Tu Carrito",this.data=await V(),console.log(this.data)),this.requestUpdate()}async addCarrito(t){let e={},r=t.id.split("-")[0],i=t.id.split("-")[1];e.categorie=r,e.idInCategorie=i,e.nombre=t.nombre,e.imagen=t.imagen,e.precio=t.precio,e.cantidad=1,B(e,!1),await this.updateComplete,this.actualizarNumberCarrito()}render(){return _`
        <section class="dashboard-container">
            <article>
                <div class="titulo__pagina">
                    <h1>${this.pageTitle}</h1>
                </div>
                <!-- se verifica si la pagina es carrito y mostrar un html diferente en consecuencia. -->
                <div class="articulos">
                    ${this.page==="carrito"?this.renderCarrito():this.renderArticulos()}
                </div>

            </article>
        </section>
        `}renderArticulos(){return _`
          ${this.data.map(t=>_`
            <div class="articulo">
              <div class="articulo__foto">
                <img src="${t.imagen}" alt="${t.nombre}">
              </div>
              <div class="articulo__info">
                <div>
                  <h3>${t.nombre}</h3>
                </div>
                <div>
                  <p>Precio: ${t.precio}</p>
                  <a @click="${()=>this.addCarrito(t)}" href="#">Agregar</a>
                </div>
              </div>
            </div>
          `)}
        `}renderCarrito(){return _`
          ${this.data.map(t=>_`
            <div class="articulo">
              <div class="articulo__foto">
                <img src="${t.imagen}" alt="${t.nombre}">
              </div>
              <div class="articulo__info">
                <div>
                  <h3>${t.nombre}</h3>
                </div>
                <div>
                  <p>Precio: ${t.precio}</p>
                  <p>Cantidad: ${t.cantidad}</p>
                </div>
                <div>
                  <button @click="${()=>this.incrementarCantidad(t)}">+</button>
                  <button @click="${()=>this.decrementarCantidad(t)}">-</button>
                  <button @click="${()=>this.removeItem(t)}">Eliminar</button>
                </div>
              </div>
            </div>
          `)}
          <div class="total">
            <h3>Total: ${this.calcularTotal()}</h3>
          </div>
          <button @click="${this.realizarCompra}">Realizar Compra</button>
        `}incrementarCantidad(t){t.cantidad++,B(t,!0),this.requestUpdate()}decrementarCantidad(t){if(t.cantidad--,t.cantidad===0){this.removeItem(t),this.data;return}else t.cantidad>0&&B(t,!0);this.requestUpdate()}removeItem(t){this.data=this.data.filter(e=>e.id!==t.id||e.categorie!==t.categorie),this.actualizarNumberCarrito(),this.requestUpdate(),jt(t.id)}async actualizarNumberCarrito(){this.dispatchEvent(new CustomEvent("changeCarrito",{bubbles:!0,composed:!0}))}calcularTotal(){return this.data.reduce((t,e)=>t+e.precio*e.cantidad,0)}realizarCompra(){}static get styles(){return ot`

        :root {
          --color-primary: #33211D;
          --color-secundary: #CDA16B;
          --color-base: #FFFBF2;
  
          font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
          /* line-height: 1.5; */
          font-weight: 400;
  
  
        /* configuracion para permitir el modo oscuro */
          
          /* color-scheme: light dark;
          color: rgba(255, 255, 255, 0.87);
          background-color: #242424; */
  
  
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        * {
            margin: 0em 0em 0em 0em;
            padding: 0em 0em 0em 0em;
            font-family: Arial, Helvetica, sans-serif;
            font-style: normal;
          }
       .dashboard-container {
        grid-area: dashboard;
        background: var(--color-base);
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
       
      }
      
      .articulos {
        display: flex;
        align-items: start;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: scroll;
        width: 100%;
        height: 90%;
        padding-top: 3.5em;
      }
      .dashboard-container article {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        width: 98%;
        height: 97%;
        overflow-y: hidden;
        border: solid 3px var(--color-primary);
        box-sizing: border-box;
      
      
      }
      
      .titulo__pagina {
        width: 70%;
        height: 8%;
        display: flex;
        align-items: center;
        position: fixed;
        background: #fffbf2e1;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px); /* Desenfoque del fondo */
      }
      
      .titulo__pagina h1 {
        margin-left: 1.5em;
        color: var(--color-primary);
        text-transform: capitalize;
      
      }
      
      .articulo {
        width: 20vw;
        height: 50vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        box-shadow: 1px 0px 10px var(--color-secundary);
        border-radius: 10px;
        box-sizing: border-box;
        margin: 0.5em;
        background: white;
      }
      
      .articulo__foto {
        width: 100%;
        height: 100%;
        overflow: hidden;
      
      }
      
      .articulo__foto img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      
      .articulo__info {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        gap: 1em;
        background: var(--color-primary);
        border-radius: 10px;
      }
      
      .articulo__info div:first-child,
      .articulo__info div:last-child {
        display: flex;
        align-items: center;
        width: 90%;
        margin: 0.5em 0em;
      }
      
      .articulo__info div:first-child {
        background: none;
      }
      
      .articulo__info div:first-child h3 {
        color: var(--color-base);
        text-transform: capitalize;
        font-weight: 500;
        font-size: 1em;
      }
      
      .articulo__info div:last-child {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
      }
      
      .articulo__info div:last-child p {
        color: var(--color-secundary);
        font-size: 1.1em;
        font-weight: 500;
      
      }
      
      .articulo__info div:last-child a {
        color: var(--color-primary);
        font-size: 1em;
        font-weight: 500;
        background: var(--color-secundary);
        padding: 0.3em 0.7em;
        border-radius: 10px;
        text-decoration: none;
        text-transform: capitalize;
        border: solid 2px transparent;
      }
      
      .articulo__info div:last-child a:hover {
        box-shadow: 0px 0px 3px var(--color-secundary);
        border-radius: 5px;
        text-decoration: none;
        text-transform: capitalize;
        border: solid 2px var(--color-base);
        transition: all 0.2s ease-in-out;
      }


      @media (width < 951px) {
        

        .titulo__pagina {
          width: 100%;
          height: 8%;
          display: flex;
          align-items: center;
          position: fixed;
          background: #fffbf2e1;
          backdrop-filter: blur(5px); /* Desenfoque del fondo */
        }
        
        .titulo__pagina h1 {
          margin-left: 1.5em;
          color: var(--color-primary);
          text-transform: capitalize;
        
        }
      
        .dashboard-container {
            grid-area: dashboard;
            background: var(--color-base);
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: start;
            overflow: hidden;
            
        }
      
        .articulos {
            display: flex;
            align-items: start;
            justify-content: center;
            flex-wrap: wrap;
            overflow-y: scroll;
            width: 100%;
            height: 90%;
            background: none;
        }
      
        .dashboard-container article {
            border: none;
            width: 100%;
            height: 88%;
          
        }
      
        .articulo {
            width: 45%;
            height: 50vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            box-shadow: 1px 0px 10px var(--color-secundary);
            border-radius: 10px;
            box-sizing: border-box;
            margin: 0.5em;
            background: white;
        }
      
        
      }

    `}}customElements.define("my-dashboard",Ht);const It="/assets/abrigo-DEkeLQ0E.svg",Rt="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3c!--%20Creator:%20CorelDRAW%20--%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xml:space='preserve'%20width='110.582mm'%20height='129.1mm'%20version='1.1'%20style='shape-rendering:geometricPrecision;%20text-rendering:geometricPrecision;%20image-rendering:optimizeQuality;%20fill-rule:evenodd;%20clip-rule:evenodd'%20viewBox='0%200%2011058.2%2012910'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20xmlns:xodm='http://www.corel.com/coreldraw/odm/2003'%3e%3cdefs%3e%3cstyle%20type='text/css'%3e%3c![CDATA[%20.fil0%20{fill:%2333211D}%20]]%3e%3c/style%3e%3c/defs%3e%3cg%20id='Capa_x0020_1'%3e%3cmetadata%20id='CorelCorpID_0Corel-Layer'/%3e%3cg%20id='_2700037410864'%3e%3cpath%20class='fil0'%20d='M2286.78%202942.86c74.97,-20.05%20358.89,-229.24%20438.79,-288.89%20239.88,-179.04%20190.33,-60.55%20253.85,-500.81%2034.43,-238.49%2063.12,-421.31%2097.06,-657.64%2024.16,-168.36%206.03,-493.23%20261.43,-493.23%20336.48,0%20143.46,639.67%2092.65,955.17%20-106.71,662.53%20-10.88,731.55%20-340.31,953.37%20-150.35,101.3%20-838.96,551.01%20-874.45,634.87l-82.47%20564.33c-259.8,1780.98%20-455.91,3608.93%20-707.52,5383.67l-293.04%202294.33c-33.05,269.57%20-85.81,525.34%20-85.81,803.63l1024.19%20161.68c220.64,36.68%20871.44,161.73%201051.13,161.73%203.38,-152.72%201609.92,-6277.84%201708.77,-6673.28l503.66%20-1948.97c51.51,-149.74%2075.38,-164.08%20240.2,-164.08%20142.33,0%20180.63,326.86%20215.43,458.39%2048.69,183.93%2095.67,354.53%20145.74,554.96l711.47%202765.36c48.53,194.03%2088.26,371.56%20143.43,557.32%20103.74,349.44%20178.06,727.28%20281.88,1092.69l571.91%202231.06c50.04,200.14%20272.19,1001.29%20274.96,1126.55%20320.22,0%201826.28,-317.86%202075.32,-323.41%200,-317.2%20-737.1,-5825.75%20-776.7,-6150.01l-380.04%20-2854.19c-24.86,-101.29%20-10.06,-71.38%20-108.67,-133.89%20-150.23,-95.26%20-950.61,-623.41%20-993.68,-731.23%20-52.23,-130.59%20-220.51,-1357.86%20-220.51,-1558.33%200,-132.71%20349.27,-307.35%20413.08,99.01l159.97%201079.85c26.57,193.1%2017.56,168.16%20165.23,266%2089.6,59.36%20147.17,106.34%20237.63,166.65%2087.89,58.59%20162.7,140.29%20263.87,167.34%20-13.49,-162.41%20-56.31,-374.29%20-79.33,-540.54%20-25.27,-182.38%20-53.54,-370.62%20-77.71,-542.21l-113.11%20-803.26c-11.53,-94.54%20-8.23,-216.24%20-107.16,-216.24l-5713.83%200c-95.63,0%20-93.68,106.3%20-104.56,191.91%20-59.32,467.44%20-243.29,1556.13%20-272.75,1910.34z'/%3e%3cpolygon%20class='fil0'%20points='2610.18,436.32%208431.83,436.32%208431.83,5.07%202610.18,5.07%20'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";class Mt extends x{static properties(){return{pageSelected:{type:String},numCarrito:{type:Number}}}constructor(){super(),this.pageSelected="allProducts",this.writeNumberCarrto()}pagination(t){let e=t.target.closest("li");e.parentElement.parentElement.querySelectorAll("li").forEach(i=>i.classList.remove("active")),e.classList.add("active"),this.pageSelected=e.id,this.requestUpdate()}async writeNumberCarrto(){console.log("soy el evento");const t=await V();console.log(t),this.numCarrito=t.reduce((e,r)=>e+r.cantidad,0),this.requestUpdate()}handleIncrementarCantidad(){this.writeNumberCarrto()}render(){return _`
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <div class="body">
        
          <section class="sidebar">
          <article>
            <header class="header">
              <h1>CampusShop</h1>
            </header>
            <navbar>
                <div class="navbar">
                    <ul>
                        <li id="allProducts" class="active" @click="${this.pagination}" >
                            <a href="#"> 
                                <i class='bx bxs-store '></i>
                                <span>todos los productos</span>
                            </a>
                        </li>
                        <li id="abrigos" @click="${this.pagination}"><a href="#"> <img class="icono-nav" src=${It} alt="blank"> <span>abrigos</span></a></li>
                        <li id="camisetas" @click="${this.pagination}"><a href="#"> <i class='bx bxs-t-shirt'></i><span>camisetas</span></a></li>
                        <li id="pantalones" @click="${this.pagination}"><a href="#"> <img class="icono-nav" src=${Rt} alt="blank"><span>pantalones</span></a></li>
                    </ul>
                    <ul>
                        <li id="carrito" @click="${this.pagination}"><a href="#"><i class='bx bxs-cart'></i><span>carritos</span><small class="num_carritos">${this.numCarrito}</small></a></li>
                    </ul>
                </div>
            </navbar>

            <footer>
              <p> <i class='bx bx-copyright'></i> 2023 Camper </p>
            </footer>
          </article>
        </section>

        <my-dashboard page="${this.pageSelected}"  @changeCarrito="${this.handleIncrementarCantidad}"></my-dashboard>
       
        </div>
        `}static get styles(){return ot`

      
      :root {
        --color-primary: #33211D;
        --color-secundary: #CDA16B;
        --color-base: #FFFBF2;

        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        /* line-height: 1.5; */
        font-weight: 400;


      /* configuracion para permitir el modo oscuro */
        
        /* color-scheme: light dark;
        color: rgba(255, 255, 255, 0.87);
        background-color: #242424; */


        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      @media (prefers-color-scheme: light) {
      :root {
        color: #213547;
        background-color: #ffffff;
      }
      }

      * {
        margin: 0em 0em 0em 0em;
        padding: 0em 0em 0em 0em;
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
      } 

        navbar{
        width: 100%;
        height: 72%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      
      }
       .navbar {
        width: 97%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 3em;
        justify-content: space-around;
        background: var(--color-base);
        border-radius: 10px;
      }
      
      .icono-nav {
        width: 1.2em;
        height: auto;
      
      }
      
      .navbar ul {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: flex-start;
        list-style-type: none;
        text-transform: capitalize;
        gap: 0.5em;
        margin: 1em;
        margin-left: 1em;
      }
      
      .navbar ul li {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        border-top-right-radius: 0%;
        border-bottom-right-radius: 0%;
        padding: 0.1em;
        border-right: solid 2px transparent;
        border: solid 2px transparent;
        background: none;
      }
      
      .active {
        border: solid 2px var(--color-primary) !important;
      }
      
      .navbar ul li:hover {
        box-sizing: border-box;
        border-color: var(--color-secundary);
        border-right: solid 2px transparent;
        width: 96%;
        transition: border-color 0.3s ease-in-out;
      
      }
      
      .navbar ul li a {
        text-decoration: none;
        color: var(--color-primary);
        font-size: 1.1em;
        font-weight: 600;
        gap: 0.5em;
        padding: 0.5rem;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      
      .navbar ul li a i {
        color: var(--color-primary);
        font-size: 1.3em;
      
      }
      
      .num_carritos {
        width: 2em;
        height: 2em;
        background: var(--color-secundary);
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .body {
        display: grid;
        width: 100%;
        height: 100vh;
        /* place-items: center; */
        min-width: 320px;
        min-height: 100vh;
        grid-template-columns: 27% auto;
        grid-template-rows: 100%;
        grid-template-areas:
            "sidebar dashboard"
        ;
      
      }
      
      .sidebar {
        grid-area: sidebar;
        background: var(--color-base);
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: end;
        justify-content: center;
        padding-right: 5em;
      }
      
      .sidebar article {
      
        background: var(--color-primary);
        width: 96%;
        height: 97%;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      
      .dashboard-container {
        grid-area: dashboard;
        background: var(--color-base);
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
      }
      
      .articulos {
        display: flex;
        align-items: start;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: scroll;
        width: 100%;
        height: 91%;
      }
      
      
      
      .header {
        width: 100%;
        height: 15%;
        margin-bottom: 1em;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      
      }
      
      .header h1 {
        font-size: 2em;
        font-weight: 600;
        color: var(--color-base);
        margin-left: 0.5em;
      }
      
      
      
      
      
      footer {
        width: 100%;
        height: 10%;
        display: flex;
        align-items: end;
        flex-wrap: wrap;
        justify-content: center;
        font-size: 1em;
        color: var(--color-secundary);
      }
      
      
      footer p {
        margin: 1em;
      }
      
      @media (width < 951px) {
        .body {
            display: grid;
            width: 100%;
            height: 100vh;
            grid-template-rows: auto 9%;
            grid-template-columns: 100%;
            grid-template-areas:
                "dashboard"
                "sidebar"
            ;
        }
               
        .sidebar {
            grid-area: sidebar;
            width: 100%;
            height: fit-content;
            display: flex;
            flex-direction: column;
            align-items: end;
            justify-content: center;
            padding-right: 0em;
            bottom: 0;
            position: fixed;
        }
      
        .sidebar article {
      
            background: var(--color-base);
            width: 100%;
            height: 12vh;
            border-top-right-radius: 10px;
            border-bottom-left-radius: 0px;
      
        }
      
        .header {
            width: 100%;
            margin: 0.5em 1em;
            flex-direction: row;
            align-items: center;
            justify-content: start;
      
        }
      
        .header h1 {
            font-size: 1.2em;
            font-weight: 600;
            color: var(--color-primary);
            margin-left: 0.5em;
        }
      
      
        main {
            height: 48%;
            flex-direction: row;
      
        }
      
        .navbar {
            width: 100%;
            height: 85%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0;
            justify-content: space-between;
            background: var(--color-base);
      
        }
      
        .icono-nav {
            width: 1.1em;
            height: auto;
      
      
        }
      
        .navbar ul {
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            list-style-type: none;
            text-transform: capitalize;
            gap: 0em;
            margin: 0em 0em;
        }
      
        .navbar ul:first-child {
            width: 75%;
            border-right: solid 1px var(--color-secundary);
        }
      
        .navbar ul:last-child {
            width: 20%;
        }
      
        .navbar ul li {
            border-radius: 5px;
            border-right: solid 2px transparent;
            border: solid 2px transparent;
            background: none;
        }
      
        .selected {
            border: solid 2px var(--color-primary) !important;
        }
      
        .navbar ul li:hover {
            box-sizing: border-box;
            border-color: var(--color-secundary);
            width: 96%;
            transition: border-color 0.3s ease-in-out;
      
        }
      
        .navbar ul li a {
            gap: 0em;
            padding: 0rem;
        }
      
        .navbar ul:first-child li {
      
            width: fit-content;
        }
      
        .navbar ul li a span {
            display: none;
        }
      
        .navbar ul li i {
            color: var(--color-primary);
            font-size: 1.6em;
      
        }
      
        .num_carritos {
            width: 1.7em;
            height: 1.7em;
            background: var(--color-secundary);
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
      
      
        footer {
            width: 100%;
            height: 20%;
            display: flex;
            align-items: end;
            flex-wrap: wrap;
            justify-content: center;
            font-size: 0.8em;
            color: var(--color-secundary);
        }
      
      
        footer p {
            margin: 0em;
        }
      
      }
            
        `}}customElements.define("my-navbar",Mt);
