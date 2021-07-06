(this["webpackJsonpcoherent-states"]=this["webpackJsonpcoherent-states"]||[]).push([[0],{28:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(1),i=t.n(a),r=t(19),c=t.n(r),s=(t(28),t(8)),o=t(7),u=t(9),l=(t(29),t(6)),d=t.n(l),p=t(11),h=t(17);var m,f,j,x=t(3);function b(e){var n=e.onInit,t=e.onResize,i=e.animate,r=e.initUniforms,c=function(e){var n=Object(a.useState)({width:null,height:null}),t=Object(o.a)(n,2),i=t[0],r=t[1];function c(){var n=document.getElementById(e);r({width:n.offsetWidth,height:n.offsetHeight})}return Object(a.useEffect)((function(){return window.addEventListener("resize",c),c(),function(){return window.removeEventListener("resize",c)}}),[]),i}("canvas-container"),l=c.width,b=c.height,v=Object(a.useState)(null),O=Object(o.a)(v,2),w=O[0],g=O[1];return Object(a.useEffect)((function(){Object(p.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n();case 2:t=e.sent,g(t),r(t.uniforms),i(t);case 6:case"end":return e.stop()}}),e)})))()}),[n,i,r]),Object(a.useEffect)((function(){t(w,l,b)}),[t,w,l,b]),Object(x.jsxs)("div",{id:"canvas-container",className:Object(u.a)(m||(m=Object(s.a)(["\n        flex-grow: 1;\n        overflow: hidden;\n        position: relative;\n    "]))),children:[Object(x.jsx)("div",{className:Object(u.a)(f||(f=Object(s.a)(["\n            position: absolute;\n            top: 32px;\n            left: 32px;\n            color: white;\n            opacity: 0.8;\n            z-index: 2;\n\n            font-size: 24px;\n        "]))),children:Object(x.jsx)(h.InlineMath,{children:"Q(\\theta, \\phi) \\propto |\\langle\\theta, \\phi \\, | \\, \\psi\\rangle|^2"})}),Object(x.jsx)("canvas",{id:"main",width:l,height:b,className:Object(u.a)(j||(j=Object(s.a)(["\n            display: block;\n        "])))})]})}var v,O,w,g,y,M=t(18),S=t(49);function C(e){var n=e.children;return Object(x.jsx)("h2",{className:Object(u.a)(v||(v=Object(s.a)(["\n        margin-top: 32px;\n\n        font-size: 14px;\n        color: hsl(200, 10%, 40%);\n        font-weight: 500;\n        letter-spacing: 0.09em;\n        text-transform: uppercase;\n\n        @media (max-width: 1000px) {\n            font-size: 12px;\n            margin-top: 16px;\n        }\n    "]))),children:n})}function z(e){for(var n=[],t=1,a=0;a<=Math.floor(e/2);a++){if(a>3){n.push("\\cdots");break}var i=t*(e+1-2*a)/(e+1);i>1?n.push("\\mathbf{".concat(e+1-2*a,"}^{\\otimes").concat(i,"}")):n.push("\\mathbf{".concat(e+1-2*a,"}")),t*=e+1-a,t/=a+1}return"\\mathbf{2}^{\\otimes ".concat(e,"} = ")+n.join("\\oplus")}function I(e){var n=e.spin,t=e.amplitudes,a=e.setAmplitude;if(void 0===t)return null;for(var i=[],r=function(){var e=Object(o.a)(l[c],2),t=e[0],r=e[1];if(t>n-1)return"continue";var d=Math.hypot(r.x,r.y);i.push(Object(x.jsxs)("div",{className:Object(u.a)(O||(O=Object(s.a)(["\n            color: hsl(200, 10%, 30%);\n            display: flex;\n            flex-direction: row;\n        "]))),children:[Object(x.jsx)("span",{className:Object(u.a)(w||(w=Object(s.a)(["min-width: 64px;"]))),children:Object(x.jsx)(h.InlineMath,{children:"|".concat(t,"\\rangle")})}),Object(x.jsx)(S.a,{min:0,max:1,step:.001,value:d,onChange:function(e,n){return a(t,n)}})]},t))},c=0,l=Object.entries(t);c<l.length;c++)r();return Object(x.jsx)(x.Fragment,{children:i})}function E(e){var n=e.spin.value,t=e.spinComponents.value;if(void 0!==t){for(var a=0,i=0;i<n;i++){var r=t[i].lengthSq();0===r&&(t[i].x=.001),a+=r}a=Math.sqrt(a+.001);for(var c=0;c<n;c++)t[c].x/=a,t[c].y/=a}}function N(e){var n,t,a=e.uniforms,i=e.setUniforms,r=null===(n=a.spin)||void 0===n?void 0:n.value,c=r-1;return Object(x.jsxs)("div",{className:Object(u.a)(g||(g=Object(s.a)(["\n        min-width: 400px;\n        background-color: white;\n        box-shadow: 1px 1px 4px hsla(200, 10%, 10%, 0.1);\n        font-size: 18px;\n        padding: 32px;\n\n        @media (max-width: 1000px) {\n            min-width: unset;\n            height: 200px;\n            padding: 20px;\n\n            font-size: 14px;\n        }\n    "]))),children:[Object(x.jsxs)("span",{children:[c,c>1?" atoms":" atom"]}),Object(x.jsx)(S.a,{value:c,onChange:function(e,n){return t=n+1,a.spin.value=Math.max(2,Math.min(14,t)),E(a),void i(Object(M.a)({},a));var t},step:1,min:1,max:13}),Object(x.jsx)(C,{children:"Spin Decomposition"}),Object(x.jsx)(h.InlineMath,{children:z(c)}),Object(x.jsxs)("div",{className:Object(u.a)(y||(y=Object(s.a)(["\n            @media (max-width: 1000px) {\n                display: none;\n            }\n        "]))),children:[Object(x.jsx)(C,{children:"Stretched Representation Amplitudes"}),Object(x.jsx)(I,{spin:r,amplitudes:null===(t=a.spinComponents)||void 0===t?void 0:t.value,setAmplitude:function(e,n){var t=a.spinComponents.value[e],r=t.length();0===r?(t.x=n,t.y=0):(t.x*=n/r,t.y*=n/r),E(a),i(Object(M.a)({},a))}})]})]})}var k,D=t(12),F=t(5),L=t.p+"static/media/sphereVert.074410ee.glsl",V=t.p+"static/media/sphereFrag.141cd3b6.glsl",P=t(37)(F);function A(){return B.apply(this,arguments)}function B(){return(B=Object(p.a)(d.a.mark((function e(){var n,t,a,i,r,c,s,o,u,l,p,h;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=document.getElementById("main"),t=n.getContext("webgl"),n.addEventListener("touchstart",(function(e){return e.preventDefault()})),(a=new F.Scene).background=new F.Color(526344),i=new F.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3),r=new F.WebGLRenderer({context:t}),e.next=9,fetch(L);case 9:return e.next=11,e.sent.text();case 11:return c=e.sent,e.next=14,fetch(V);case 14:return e.next=16,e.sent.text();case 16:return s=e.sent,14,(o={spin:{value:4},spinComponents:{value:Object(D.a)(new Array(14)).map((function(){return new F.Vector2(0,0)}))},time:{value:0}}).spinComponents.value[0].x=Math.sqrt(.5),o.spinComponents.value[3].x=Math.sqrt(.5),u=new F.Mesh(new F.SphereGeometry(.99,32,32),new F.ShaderMaterial({defines:{MAX_SIZE:14,M_PI:Math.PI},uniforms:o,vertexShader:c,fragmentShader:s})),a.add(u),l=[new F.Vector3(0,0,0),new F.Vector3(1.5,0,0),new F.Vector3(0,0,0),new F.Vector3(0,1.5,0),new F.Vector3(0,0,0),new F.Vector3(0,0,1.5)],p=new F.LineSegments((new F.BufferGeometry).setFromPoints(l),new F.LineBasicMaterial({color:8421504})),a.add(p),(h=new P(i,n)).enableDamping=!0,h.rotateSpeed=.3,h.minDistance=1.5,h.maxDistance=5,i.position.z=3,e.abrupt("return",{gl:t,scene:a,camera:i,renderer:r,controls:h,sphere:u,uniforms:o});case 33:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function q(e,n,t){if(null!==e){var a=e.renderer,i=e.camera;i.aspect=n/t,i.updateProjectionMatrix(),a.setSize(n,t)}}function T(e){var n=e.renderer,t=e.scene,a=e.camera,i=e.controls,r=e.uniforms;requestAnimationFrame((function(){return T(e)})),null!==e&&(n.render(t,a),i.update(),void 0===e.startTime?e.startTime=+new Date:r.time.value=.001*(+new Date-e.startTime))}var R=function(){var e=Object(a.useState)({}),n=Object(o.a)(e,2),t=n[0],i=n[1];return Object(x.jsxs)("div",{className:Object(u.a)(k||(k=Object(s.a)(["\n        width: 100%;\n        height: 100%;\n\n        display: flex;\n        flex-direction: row;\n\n        @media (max-width: 1000px) {\n             flex-direction: column;\n        }\n  "]))),children:[Object(x.jsx)(N,{uniforms:t,setUniforms:i}),Object(x.jsx)(b,{onInit:A,onResize:q,animate:T,initUniforms:i})]})},U=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,50)).then((function(n){var t=n.getCLS,a=n.getFID,i=n.getFCP,r=n.getLCP,c=n.getTTFB;t(e),a(e),i(e),r(e),c(e)}))};c.a.render(Object(x.jsx)(i.a.StrictMode,{children:Object(x.jsx)(R,{})}),document.getElementById("root")),U()}},[[38,1,2]]]);
//# sourceMappingURL=main.6ddf02d7.chunk.js.map