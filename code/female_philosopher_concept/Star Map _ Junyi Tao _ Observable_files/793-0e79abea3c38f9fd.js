"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[793],{90793:function(e,t,n){n.d(t,{r9:function(){return pe},Y4:function(){return ve},vz:function(){return de},uf:function(){return Oe},wt:function(){return De},jI:function(){return be},kR:function(){return Ee}});var a,o=n(67294),i=n(765),r=n(44270),u=n(28274),c=n(75296),l=n(96637),s=n(22945),d=n(45558),g=n(85777),v=n(94411),f=n(40884),p=n(61331),y=n(12837),b=n(24683);!function(e){e[e.NotStarted=0]="NotStarted",e[e.Running=1]="Running",e[e.Stopped=2]="Stopped"}(a||(a={}));var O={type:"xstate.init"};function D(e){return void 0===e?[]:[].concat(e)}function E(e){return{type:"xstate.assign",assignment:e}}function h(e,t){return"string"==typeof(e="string"==typeof e&&t&&t[e]?t[e]:e)?{type:e}:"function"==typeof e?{type:e.name,exec:e}:e}function M(e){return function(t){return e===t}}function w(e){return"string"==typeof e?{type:e}:e}function I(e,t){return{value:e,context:t,actions:[],changed:!1,matches:M(e)}}var x=function(e,t){return e.actions.forEach((function(n){var a=n.exec;return a&&a(e.context,t)}))};var N=n(67454);function T(){return(T=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function m(e,t,n){var i=(0,o.useRef)(e),r=(0,N.h)((function(){return function(e){var t=e.initialState,n=a.NotStarted,o=new Set,i={_machine:e,send:function(i){n===a.Running&&(t=e.transition(t,i),x(t,w(i)),o.forEach((function(e){return e(t)})))},subscribe:function(e){return o.add(e),e(t),{unsubscribe:function(){return o.delete(e)}}},start:function(){return n=a.Running,x(t,O),i},stop:function(){return n=a.Stopped,o.clear(),i},get state(){return t},get status(){return n}};return i}(i.current).start()})),u=(0,o.useRef)(null),c=(0,o.useState)((function(){return function(e){var t;return e.subscribe((function(e){t=e})).unsubscribe(),t}(r)})),l=c[0],s=c[1],d=(0,o.useCallback)((function(e){var n=(0,g.HD)(e)?{type:e}:e,a=function(e){return Object.entries(e).reduce((function(e,t){var n=t[0],a=t[1];return e[n]=a.current,e}),{})}(t);r.send(T({},n,{lastEventType:u.current,refs:a})),u.current=n.type}),[n]);return(0,o.useEffect)((function(){return r.subscribe((function(e){e.changed&&s(e)})),function(){r.stop()}}),[r]),(0,o.useEffect)((function(){0}),[n,l]),[(0,o.useMemo)((function(){return T({},l,{matches:function(e){return e===l.value}})}),[l.changed,l.context,l.value]),d,r]}function S(e,t){return(0,N.h)((function(){return function(e,t){void 0===t&&(t={});var n={config:e,_options:t,initialState:{value:e.initial,actions:D(e.states[e.initial].entry).map((function(e){return h(e,t.actions)})),context:e.context,matches:M(e.initial)},transition:function(t,a){var o,i,r="string"==typeof t?{value:t,context:e.context}:t,u=r.value,c=r.context,l=w(a),s=e.states[u];if(s.on){var d=D(s.on[l.type]),g=function(t){if(void 0===t)return{value:I(u,c)};var a="string"==typeof t?{target:t}:t,o=a.target,i=void 0===o?u:o,r=a.actions,d=void 0===r?[]:r,g=a.cond,v=c;if((void 0===g?function(){return!0}:g)(c,l)){var f=e.states[i],p=!1,y=[].concat(s.exit,d,f.entry).filter((function(e){return e})).map((function(e){return h(e,n._options.actions)})).filter((function(e){if("xstate.assign"===e.type){p=!0;var t=Object.assign({},v);return"function"==typeof e.assignment?t=e.assignment(v,l):Object.keys(e.assignment).forEach((function(n){t[n]="function"==typeof e.assignment[n]?e.assignment[n](v,l):e.assignment[n]})),v=t,!1}return!0}));return{value:{value:i,context:v,actions:y,changed:i!==u||y.length>0||p,matches:M(i)}}}};try{for(var v=function(e){var t="function"==typeof Symbol&&e[Symbol.iterator],n=0;return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}}(d),f=v.next();!f.done;f=v.next()){var p=g(f.value);if("object"==typeof p)return p.value}}catch(e){o={error:e}}finally{try{f&&!f.done&&(i=v.return)&&i.call(v)}finally{if(o)throw o.error}}}return I(u,c)}};return n}(e,t)}))}var _,R,C,U=n(55152);function K(){return(K=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function P(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}!function(e){e.Idle="IDLE",e.Open="OPEN",e.Navigating="NAVIGATING",e.Dragging="DRAGGING",e.Interacting="INTERACTING"}(R||(R={})),function(e){e.ButtonMouseDown="BUTTON_MOUSE_DOWN",e.ButtonMouseUp="BUTTON_MOUSE_UP",e.Blur="BLUR",e.ClearNavSelection="CLEAR_NAV_SELECTION",e.ClearTypeahead="CLEAR_TYPEAHEAD",e.GetDerivedData="GET_DERIVED_DATA",e.KeyDownEscape="KEY_DOWN_ESCAPE",e.KeyDownEnter="KEY_DOWN_ENTER",e.KeyDownSpace="KEY_DOWN_SPACE",e.KeyDownNavigate="KEY_DOWN_NAVIGATE",e.KeyDownSearch="KEY_DOWN_SEARCH",e.KeyDownTab="KEY_DOWN_TAB",e.KeyDownShiftTab="KEY_DOWN_SHIFT_TAB",e.OptionTouchStart="OPTION_TOUCH_START",e.OptionMouseMove="OPTION_MOUSE_MOVE",e.OptionMouseEnter="OPTION_MOUSE_ENTER",e.OptionMouseDown="OPTION_MOUSE_DOWN",e.OptionMouseUp="OPTION_MOUSE_UP",e.OptionClick="OPTION_CLICK",e.ListMouseUp="LIST_MOUSE_UP",e.OptionPress="OPTION_PRESS",e.OutsideMouseDown="OUTSIDE_MOUSE_DOWN",e.OutsideMouseUp="OUTSIDE_MOUSE_UP",e.ValueChange="VALUE_CHANGE",e.PopoverPointerDown="POPOVER_POINTER_DOWN",e.PopoverPointerUp="POPOVER_POINTER_UP",e.UpdateAfterTypeahead="UPDATE_AFTER_TYPEAHEAD"}(C||(C={}));var A=E({navigationValue:null}),L=E({typeaheadQuery:null}),k=E({value:function(e,t){return t.value}}),B=E({navigationValue:function(e,t){return t.value}}),V=E({navigationValue:function(e){var t,n,a,o=(t=e.value,n=e.options,t?n.find((function(e){return e.value===t})):void 0);return o&&!o.disabled?e.value:(null==(a=e.options.find((function(e){return!e.disabled})))?void 0:a.value)||null}});function q(e,t){if(t.type===C.Blur){var n=t.refs,a=n.list,o=n.popover,i=t.relatedTarget,r=(0,U.r)(o);return!((null==r?void 0:r.activeElement)===a||!o||o.contains(i||(null==r?void 0:r.activeElement)))}return!1}function G(e,t){if(t.type===C.OutsideMouseDown||t.type===C.OutsideMouseUp){var n=t.refs,a=n.button,o=n.popover,i=t.relatedTarget;return!(i===a||!a||a.contains(i)||!o||o.contains(i))}return!1}function j(e,t){return!!e.options.find((function(t){return t.value===e.navigationValue}))}function W(e,t){var n=t.refs,a=n.popover,o=n.list,i=t.relatedTarget;return!(a&&i&&a.contains(i)&&i!==o)&&j(e)}function Y(e,t){requestAnimationFrame((function(){t.refs.list&&t.refs.list.focus()}))}function H(e,t){t.refs.button&&t.refs.button.focus()}function Q(e,t){return!t.disabled}function F(e,t){return t.type!==C.OptionTouchStart||!t||!t.disabled}function z(e,t){return(!("disabled"in t)||!t.disabled)&&("value"in t?null!=t.value:null!=e.navigationValue)}function J(e,t){t.callback&&t.callback(t.value)}function X(e,t){if(t.type===C.KeyDownEnter){var n=t.refs.hiddenInput;if(n&&n.form){var a=n.form.querySelector("button,[type='submit']");a&&a.click()}}}var Z=E({typeaheadQuery:function(e,t){return(e.typeaheadQuery||"")+t.query}}),$=E({value:function(e,t){if(t.type===C.UpdateAfterTypeahead&&t.query){var n=ne(e.options,t.query);if(n&&!n.disabled)return t.callback&&t.callback(n.value),n.value}return e.value}}),ee=E({navigationValue:function(e,t){if(t.type===C.UpdateAfterTypeahead&&t.query){var n=ne(e.options,t.query);if(n&&!n.disabled)return n.value}return e.navigationValue}}),te=((_={})[C.GetDerivedData]={actions:E((function(e,t){return K({},e,t.data)}))},_[C.ValueChange]={actions:[k,J]},_);function ne(e,t){return void 0===t&&(t=""),t&&e.find((function(e){return!e.disabled&&e.label&&e.label.toLowerCase().startsWith(t.toLowerCase())}))||null}var ae=["as","aria-labelledby","aria-label","children","defaultValue","disabled","form","name","onChange","required","value","__componentName"],oe=["aria-label","arrow","as","children","onKeyDown","onMouseDown","onMouseUp"],ie=["as","children"],re=["as","position","onBlur","onKeyDown","onMouseUp","portal","unstable_observableRefs"],ue=["as"],ce=["as","children","disabled","index","label","onClick","onMouseDown","onMouseEnter","onMouseLeave","onMouseMove","onMouseUp","onTouchStart","value"],le=(0,u.nm)("ListboxDescendantContext"),se=(0,d.o)("ListboxContext",{}),de=(0,o.forwardRef)((function(e,t){var n=e.as,a=void 0===n?"div":n,r=e["aria-labelledby"],c=e["aria-label"],s=e.children,d=e.defaultValue,y=e.disabled,b=void 0!==y&&y,O=e.form,D=e.name,E=e.onChange,h=e.required,M=e.value,w=e.__componentName,I=void 0===w?"ListboxInput":w,x=P(e,ae),N=(0,o.useRef)(null!=M),T=(0,u.f5)(),_=T[0],U=T[1],ne=(0,o.useRef)(null),oe=(0,o.useRef)(null),ie=(0,o.useRef)(null),re=(0,o.useRef)(null),ue=(0,o.useRef)(null),ce=(0,o.useRef)(null),de=(0,o.useRef)(null),ge=m(S(function(e){var t,n,a,o,i,r,u=e.value;return{id:"listbox",initial:R.Idle,context:{value:u,options:[],navigationValue:null,typeaheadQuery:null},states:(r={},r[R.Idle]={on:K({},te,(t={},t[C.ButtonMouseDown]={target:R.Open,actions:[V],cond:Q},t[C.KeyDownSpace]={target:R.Navigating,actions:[V,Y],cond:Q},t[C.KeyDownSearch]={target:R.Idle,actions:Z,cond:Q},t[C.UpdateAfterTypeahead]={target:R.Idle,actions:[$],cond:Q},t[C.ClearTypeahead]={target:R.Idle,actions:L},t[C.KeyDownNavigate]={target:R.Navigating,actions:[V,L,Y],cond:Q},t[C.KeyDownEnter]={actions:[X],cond:Q},t))},r[R.Interacting]={entry:[A],on:K({},te,(n={},n[C.ClearNavSelection]={actions:[A,Y]},n[C.KeyDownEnter]={target:R.Idle,actions:[k,L,H,J],cond:z},n[C.KeyDownSpace]={target:R.Idle,actions:[k,L,H,J],cond:z},n[C.ButtonMouseDown]={target:R.Idle,actions:[H]},n[C.KeyDownEscape]={target:R.Idle,actions:[H]},n[C.OptionMouseDown]={target:R.Dragging},n[C.OutsideMouseDown]=[{target:R.Idle,cond:G,actions:L},{target:R.Dragging,actions:L,cond:j}],n[C.OutsideMouseUp]=[{target:R.Idle,cond:G,actions:L},{target:R.Navigating,cond:j},{target:R.Interacting,actions:L}],n[C.KeyDownEnter]=R.Interacting,n[C.Blur]=[{target:R.Idle,cond:q,actions:L},{target:R.Navigating,cond:W},{target:R.Interacting,actions:L}],n[C.OptionTouchStart]={target:R.Navigating,actions:[B,L],cond:F},n[C.OptionClick]={target:R.Idle,actions:[k,L,H,J],cond:z},n[C.OptionPress]={target:R.Idle,actions:[k,L,H,J],cond:z},n[C.OptionMouseEnter]={target:R.Navigating,actions:[B,L],cond:F},n[C.KeyDownNavigate]={target:R.Navigating,actions:[B,L,Y]},n))},r[R.Open]={on:K({},te,(a={},a[C.ClearNavSelection]={actions:[A]},a[C.KeyDownEnter]={target:R.Idle,actions:[k,L,H,J],cond:z},a[C.KeyDownSpace]={target:R.Idle,actions:[k,L,H,J],cond:z},a[C.ButtonMouseDown]={target:R.Idle,actions:[H]},a[C.KeyDownEscape]={target:R.Idle,actions:[H]},a[C.OptionMouseDown]={target:R.Dragging},a[C.OutsideMouseDown]=[{target:R.Idle,cond:G,actions:L},{target:R.Dragging,cond:j},{target:R.Interacting,actions:L}],a[C.OutsideMouseUp]=[{target:R.Idle,cond:G,actions:L},{target:R.Navigating,cond:j},{target:R.Interacting,actions:L}],a[C.Blur]=[{target:R.Idle,cond:q,actions:L},{target:R.Navigating,cond:W},{target:R.Interacting,actions:L}],a[C.ButtonMouseUp]={target:R.Navigating,actions:[V,Y]},a[C.ListMouseUp]={target:R.Navigating,actions:[V,Y]},a[C.OptionTouchStart]={target:R.Navigating,actions:[B,L],cond:F},a[C.OptionClick]={target:R.Idle,actions:[k,L,H,J],cond:z},a[C.OptionPress]={target:R.Idle,actions:[k,L,H,J],cond:z},a[C.KeyDownNavigate]={target:R.Navigating,actions:[B,L,Y]},a[C.KeyDownSearch]={target:R.Navigating,actions:Z},a[C.UpdateAfterTypeahead]={actions:[ee]},a[C.ClearTypeahead]={actions:L},a[C.OptionMouseMove]=[{target:R.Dragging,actions:[B],cond:F},{target:R.Dragging}],a))},r[R.Dragging]={on:K({},te,(o={},o[C.ClearNavSelection]={actions:[A]},o[C.KeyDownEnter]={target:R.Idle,actions:[k,L,H,J],cond:z},o[C.KeyDownSpace]={target:R.Idle,actions:[k,L,H,J],cond:z},o[C.ButtonMouseDown]={target:R.Idle,actions:[H]},o[C.KeyDownEscape]={target:R.Idle,actions:[H]},o[C.OptionMouseDown]={target:R.Dragging},o[C.OutsideMouseDown]=[{target:R.Idle,cond:G,actions:L},{target:R.Navigating,cond:j},{target:R.Interacting,actions:L}],o[C.OutsideMouseUp]=[{target:R.Idle,cond:G,actions:L},{target:R.Navigating,cond:j,actions:Y},{target:R.Interacting,actions:[L,Y]}],o[C.Blur]=[{target:R.Idle,cond:q,actions:L},{target:R.Navigating,cond:W},{target:R.Interacting,actions:L}],o[C.ButtonMouseUp]={target:R.Navigating,actions:[V,Y]},o[C.OptionTouchStart]={target:R.Navigating,actions:[B,L],cond:F},o[C.OptionClick]={target:R.Idle,actions:[k,L,H,J],cond:z},o[C.OptionPress]={target:R.Idle,actions:[k,L,H,J],cond:z},o[C.OptionMouseEnter]={target:R.Dragging,actions:[B,L],cond:F},o[C.KeyDownNavigate]={target:R.Navigating,actions:[B,L,Y]},o[C.KeyDownSearch]={target:R.Navigating,actions:Z},o[C.UpdateAfterTypeahead]={actions:[ee]},o[C.ClearTypeahead]={actions:L},o[C.OptionMouseMove]=[{target:R.Navigating,actions:[B],cond:F},{target:R.Navigating}],o[C.OptionMouseUp]={target:R.Idle,actions:[k,L,H,J],cond:z},o))},r[R.Navigating]={on:K({},te,(i={},i[C.ClearNavSelection]={actions:[A,Y]},i[C.KeyDownEnter]={target:R.Idle,actions:[k,L,H,J],cond:z},i[C.KeyDownSpace]={target:R.Idle,actions:[k,L,H,J],cond:z},i[C.ButtonMouseDown]={target:R.Idle,actions:[H]},i[C.KeyDownEscape]={target:R.Idle,actions:[H]},i[C.OptionMouseDown]={target:R.Dragging},i[C.OutsideMouseDown]=[{target:R.Idle,cond:G,actions:L},{target:R.Navigating,cond:j},{target:R.Interacting,actions:L}],i[C.OutsideMouseUp]=[{target:R.Idle,cond:G,actions:L},{target:R.Navigating,cond:j},{target:R.Interacting,actions:L}],i[C.Blur]=[{target:R.Idle,cond:q,actions:L},{target:R.Navigating,cond:W},{target:R.Interacting,actions:L}],i[C.ButtonMouseUp]={target:R.Navigating,actions:[V,Y]},i[C.OptionTouchStart]={target:R.Navigating,actions:[B,L],cond:F},i[C.OptionClick]={target:R.Idle,actions:[k,L,H,J],cond:z},i[C.OptionPress]={target:R.Idle,actions:[k,L,H,J],cond:z},i[C.OptionMouseEnter]={target:R.Navigating,actions:[B,L],cond:F},i[C.KeyDownNavigate]={target:R.Navigating,actions:[B,L,Y]},i[C.KeyDownSearch]={target:R.Navigating,actions:Z},i[C.UpdateAfterTypeahead]={actions:[ee]},i[C.ClearTypeahead]={actions:L},i[C.OptionMouseMove]=[{target:R.Navigating,actions:[B],cond:F},{target:R.Navigating}],i))},r)}}({value:(N.current?M:d)||null})),{button:ne,hiddenInput:oe,highlightedOption:ie,input:re,list:ue,popover:ce,selectedOption:de},false),ve=ge[0],fe=ge[1];var pe=(0,i.M)(x.id),ye=x.id||(0,v.q)("listbox-input",pe),be=(0,p.e)(re,t),Oe=(0,o.useMemo)((function(){var e=_.find((function(e){return e.value===ve.context.value}));return e?e.label:null}),[_,ve.context.value]),De=function(e){return[R.Navigating,R.Open,R.Dragging,R.Interacting].includes(e)}(ve.value),Ee={ariaLabel:c,ariaLabelledBy:r,buttonRef:ne,disabled:b,highlightedOptionRef:ie,isExpanded:De,listboxId:ye,listboxValueLabel:Oe,listRef:ue,onValueChange:function(e){e!==ve.context.value&&(null==E||E(e))},popoverRef:ce,selectedOptionRef:de,send:fe,state:ve.value,stateData:ve.context},he=(0,o.useRef)(!1);if(!N.current&&null==d&&!he.current&&_.length){he.current=!0;var Me=_.find((function(e){return!e.disabled}));Me&&Me.value&&fe({type:C.ValueChange,value:Me.value})}return(0,f.cO)(M,"value",I),function(e,t,n){(0,o.useRef)(null!=e).current&&e!==t&&n()}(M,ve.context.value,(function(){fe({type:C.ValueChange,value:M})})),(0,l.L)((function(){fe({type:C.GetDerivedData,data:{options:_}})}),[_,fe]),(0,o.useEffect)((function(){function e(e){var t=e.target,n=e.relatedTarget;we(ce.current,t)||fe({type:C.OutsideMouseDown,relatedTarget:n||t})}return De&&window.addEventListener("mousedown",e),function(){window.removeEventListener("mousedown",e)}}),[fe,De]),(0,o.useEffect)((function(){function e(e){var t=e.target,n=e.relatedTarget;we(ce.current,t)||fe({type:C.OutsideMouseUp,relatedTarget:n||t})}return De&&window.addEventListener("mouseup",e),function(){window.removeEventListener("mouseup",e)}}),[fe,De]),(0,f.kG)("listbox"),(0,o.createElement)(a,K({},x,{ref:be,"data-reach-listbox-input":"","data-state":De?"expanded":"closed","data-value":ve.context.value,id:ye}),(0,o.createElement)(se.Provider,{value:Ee},(0,o.createElement)(u.w_,{context:le,items:_,set:U},(0,g.mf)(s)?s({id:ye,isExpanded:De,value:ve.context.value,selectedOptionRef:de,highlightedOptionRef:ie,valueLabel:Oe,expanded:De}):s,(O||D||h)&&(0,o.createElement)("input",{ref:oe,"data-reach-listbox-hidden-input":"",disabled:b,form:O,name:D,readOnly:!0,required:h,tabIndex:-1,type:"hidden",value:ve.context.value||""}))))}));var ge=(0,o.forwardRef)((function(e,t){var n=e["aria-label"],a=e.arrow,i=void 0!==a&&a,r=e.as,u=void 0===r?"span":r,l=e.children,s=e.onKeyDown,d=e.onMouseDown,f=e.onMouseUp,y=P(e,oe),O=(0,o.useContext)(se),D=O.buttonRef,E=O.send,h=O.ariaLabelledBy,M=O.disabled,w=O.isExpanded,I=O.listboxId,x=O.stateData,N=O.listboxValueLabel,T=x.value,m=(0,p.e)(D,t),S=he();var _=(0,v.q)("button",I),R=(0,o.useMemo)((function(){return l?(0,g.mf)(l)?l({isExpanded:w,label:N,value:T,expanded:w}):l:N}),[l,N,w,T]);return(0,o.createElement)(u,K({"aria-disabled":M||void 0,"aria-expanded":w||void 0,"aria-haspopup":"listbox","aria-labelledby":n?void 0:[h,_].filter(Boolean).join(" "),"aria-label":n,role:"button",tabIndex:M?-1:0},y,{ref:m,"data-reach-listbox-button":"",id:_,onKeyDown:(0,b.M)(s,S),onMouseDown:(0,b.M)(d,(function(e){(0,c.d)(e.nativeEvent)||(e.preventDefault(),e.stopPropagation(),E({type:C.ButtonMouseDown,disabled:M}))})),onMouseUp:(0,b.M)(f,(function(e){(0,c.d)(e.nativeEvent)||(e.preventDefault(),e.stopPropagation(),E({type:C.ButtonMouseUp}))}))}),R,i&&(0,o.createElement)(pe,null,(0,g.jn)(i)?null:i))}));var ve=(0,o.memo)(ge),fe=(0,o.forwardRef)((function(e,t){var n=e.as,a=void 0===n?"span":n,i=e.children,r=P(e,ie),u=(0,o.useContext)(se).isExpanded;return(0,o.createElement)(a,K({"aria-hidden":!0},r,{ref:t,"data-reach-listbox-arrow":"","data-expanded":u?"":void 0}),(0,g.mf)(i)?i({isExpanded:u,expanded:u}):i||"\u25bc")}));var pe=(0,o.memo)(fe),ye=(0,o.forwardRef)((function(e,t){var n=e.as,a=void 0===n?"div":n,i=e.position,u=void 0===i?r.g0:i,c=e.onBlur,l=e.onKeyDown,s=e.onMouseUp,d=e.portal,g=void 0===d||d,v=e.unstable_observableRefs,f=P(e,re),y=(0,o.useContext)(se),O=y.isExpanded,D=y.buttonRef,E=y.popoverRef,h=y.send,M=(0,p.e)(E,t),w=he();var I=K({hidden:!O,tabIndex:-1},f,{ref:M,"data-reach-listbox-popover":"",onMouseUp:(0,b.M)(s,(function(){h({type:C.ListMouseUp})})),onBlur:(0,b.M)(c,(function(e){var t=e.nativeEvent;requestAnimationFrame((function(){h({type:C.Blur,relatedTarget:t.relatedTarget||t.target})}))})),onKeyDown:(0,b.M)(l,w)});return g?(0,o.createElement)(r.J2,K({},I,{as:a,targetRef:D,position:u,unstable_observableRefs:v})):(0,o.createElement)(a,I)}));var be=(0,o.memo)(ye),Oe=(0,o.forwardRef)((function(e,t){var n=e.as,a=void 0===n?"ul":n,i=P(e,ue),r=(0,o.useContext)(se),u=r.listRef,c=r.ariaLabel,l=r.ariaLabelledBy,s=r.isExpanded,d=r.listboxId,g=r.stateData,f=g.value,y=g.navigationValue,b=(0,p.e)(t,u);return(0,o.createElement)(a,K({"aria-activedescendant":Me(s?y:f),"aria-labelledby":c?void 0:l,"aria-label":c,role:"listbox",tabIndex:-1},i,{ref:b,"data-reach-listbox-list":"",id:(0,v.q)("listbox",d)}))}));var De=(0,o.forwardRef)((function(e,t){var n=e.as,a=void 0===n?"li":n,i=e.children,r=e.disabled,l=e.index,s=e.label,d=e.onClick,g=e.onMouseDown,v=e.onMouseEnter,f=e.onMouseLeave,O=e.onMouseMove,D=e.onMouseUp,E=e.onTouchStart,h=e.value,M=P(e,ce);var w=(0,o.useContext)(se),I=w.highlightedOptionRef,x=w.selectedOptionRef,N=w.send,T=w.isExpanded,m=w.onValueChange,S=w.state,_=w.stateData,U=_.value,A=_.navigationValue,L=(0,o.useState)(s),k=L[0],B=L[1],V=s||k||"",q=(0,o.useRef)(null),G=(0,y.B)(q,null),j=G[0],W=G[1],Y=(0,o.useMemo)((function(){return{element:j,value:h,label:V,disabled:!!r}}),[r,j,V,h]);(0,u.Yf)(Y,le,l);var H=(0,o.useCallback)((function(e){!s&&e&&B((function(t){return e.textContent&&t!==e.textContent?e.textContent:t||""}))}),[s]),Q=!!A&&A===h,F=U===h,z=(0,p.e)(H,t,W,F?x:null,Q?I:null);return(0,o.createElement)(a,K({"aria-selected":(T?Q:F)||void 0,"aria-disabled":r||void 0,role:"option"},M,{ref:z,id:Me(h),"data-reach-listbox-option":"","data-current-nav":Q?"":void 0,"data-current-selected":F?"":void 0,"data-label":V,"data-value":h,onClick:(0,b.M)(d,(function(e){(0,c.d)(e.nativeEvent)||N({type:C.OptionClick,value:h,callback:m,disabled:!!r})})),onMouseDown:(0,b.M)(g,(function(e){(0,c.d)(e.nativeEvent)||(e.preventDefault(),N({type:C.OptionMouseDown}))})),onMouseEnter:(0,b.M)(v,(function(){N({type:C.OptionMouseEnter,value:h,disabled:!!r})})),onMouseLeave:(0,b.M)(f,(function(){N({type:C.ClearNavSelection})})),onMouseMove:(0,b.M)(O,(function(){S!==R.Open&&A===h||N({type:C.OptionMouseMove,value:h,disabled:!!r})})),onMouseUp:(0,b.M)(D,(function(e){(0,c.d)(e.nativeEvent)||N({type:C.OptionMouseUp,value:h,callback:m,disabled:!!r})})),onTouchStart:(0,b.M)(E,(function(){N({type:C.OptionTouchStart,value:h,disabled:!!r})}))}),i)}));function Ee(){var e=(0,o.useContext)(se),t=e.highlightedOptionRef,n=e.selectedOptionRef,a=e.listboxId,i=e.listboxValueLabel,r=e.isExpanded,u=e.stateData.value;return(0,o.useMemo)((function(){return{id:a,isExpanded:r,selectedOptionRef:n,highlightedOptionRef:t,value:u,valueLabel:i}}),[a,r,u,i,n,t])}function he(){var e=(0,o.useContext)(se),t=e.send,n=e.disabled,a=e.onValueChange,i=e.stateData,r=i.navigationValue,c=i.typeaheadQuery,l=(0,u.Ak)(le),d=(0,s.R)(a);(0,o.useEffect)((function(){c&&t({type:C.UpdateAfterTypeahead,query:c,callback:d});var e=window.setTimeout((function(){null!=c&&t({type:C.ClearTypeahead})}),1e3);return function(){window.clearTimeout(e)}}),[d,t,c]);var v=l.findIndex((function(e){return e.value===r}));return(0,b.M)((function(e){var o=e.key,i=(0,g.HD)(o)&&1===o.length,u=l.find((function(e){return e.value===r}));switch(o){case"Enter":return void t({type:C.KeyDownEnter,value:r,callback:a,disabled:!!(null!=u&&u.disabled||n)});case" ":return e.preventDefault(),void t({type:C.KeyDownSpace,value:r,callback:a,disabled:!!(null!=u&&u.disabled||n)});case"Escape":return void t({type:C.KeyDownEscape});case"Tab":var c=e.shiftKey?C.KeyDownShiftTab:C.KeyDownTab;return void t({type:c});default:return void(i&&t({type:C.KeyDownSearch,query:o,disabled:n}))}}),(0,u.Dv)(le,{currentIndex:v,orientation:"vertical",key:"index",rotate:!0,filter:function(e){return!e.disabled},callback:function(e){t({type:C.KeyDownNavigate,value:l[e].value,disabled:n})}}))}function Me(e){var t=(0,o.useContext)(se).listboxId;return e?(0,v.q)("option-"+e,t):void 0}function we(e,t){return!(!e||!e.contains(t))}}}]);
