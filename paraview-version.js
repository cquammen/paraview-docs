!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function r(e,t,n){var r=["<select>"];return e.forEach(function(e){r.push('<option value="'+e+'" '+(e==t?'selected="selected"':"")+">"+e+"</option>")}),r.push("</select>"),r.push('<a href="/paraview-docs/'+t+"/"+n+'" style="display: inline-block; margin: 5px;">Go to '+n+" documentation</a>"),r.join("")}function o(e,t,n){var r=n||c.exec(window.location.href)[3];return e.replace(c,"paraview-docs/"+t+"/"+r+"/")}function i(e){var t=e.target.value,n=window.location.href,r=o(n,t);r!=n&&(window.location.href=r)}var c=/paraview-docs\/(nightly|(v\d\.\d))\/(cxx|python)\//,a={python:"cxx",cxx:"python"};(function(e){return new Promise(function(t,n){var r=new XMLHttpRequest;r.onreadystatechange=function(e){4===r.readyState&&(200===r.status||0===r.status?t(r.response):n(r,e))},r.open("GET",e,!0),r.responseType="text",r.send()})})("/paraview-docs/versions").then(function(e){console.log("fetchText");var t=e.split("\n").filter(function(e){return e.length});t.sort();var n=c.exec(window.location.href);if(n){var o=n[3],s=a[o]||"cxx",u=n[1],l=r(t,u,s);if("python"===o){var p=document.querySelector(".wy-side-nav-search li.version");p.innerHTML=l,p.querySelector("select").addEventListener("change",i)}else if("cxx"===o){var d=document.querySelector("#projectname"),f=document.createElement("div");f.setAttribute("class","versionSwitch"),f.setAttribute("style","display: inline-flex; align-items: center; margin-left: 15px;"),f.innerHTML=l,d.appendChild(f),f.querySelector("select").addEventListener("change",i)}}})}]);