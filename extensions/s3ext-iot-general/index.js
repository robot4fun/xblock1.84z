parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"yh9p":[function(require,module,exports) {
"use strict";exports.byteLength=u,exports.toByteArray=i,exports.fromByteArray=d;for(var r=[],t=[],e="undefined"!=typeof Uint8Array?Uint8Array:Array,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o=0,a=n.length;o<a;++o)r[o]=n[o],t[n.charCodeAt(o)]=o;function h(r){var t=r.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=r.indexOf("=");return-1===e&&(e=t),[e,e===t?0:4-e%4]}function u(r){var t=h(r),e=t[0],n=t[1];return 3*(e+n)/4-n}function c(r,t,e){return 3*(t+e)/4-e}function i(r){var n,o,a=h(r),u=a[0],i=a[1],f=new e(c(r,u,i)),A=0,d=i>0?u-4:u;for(o=0;o<d;o+=4)n=t[r.charCodeAt(o)]<<18|t[r.charCodeAt(o+1)]<<12|t[r.charCodeAt(o+2)]<<6|t[r.charCodeAt(o+3)],f[A++]=n>>16&255,f[A++]=n>>8&255,f[A++]=255&n;return 2===i&&(n=t[r.charCodeAt(o)]<<2|t[r.charCodeAt(o+1)]>>4,f[A++]=255&n),1===i&&(n=t[r.charCodeAt(o)]<<10|t[r.charCodeAt(o+1)]<<4|t[r.charCodeAt(o+2)]>>2,f[A++]=n>>8&255,f[A++]=255&n),f}function f(t){return r[t>>18&63]+r[t>>12&63]+r[t>>6&63]+r[63&t]}function A(r,t,e){for(var n,o=[],a=t;a<e;a+=3)n=(r[a]<<16&16711680)+(r[a+1]<<8&65280)+(255&r[a+2]),o.push(f(n));return o.join("")}function d(t){for(var e,n=t.length,o=n%3,a=[],h=0,u=n-o;h<u;h+=16383)a.push(A(t,h,h+16383>u?u:h+16383));return 1===o?(e=t[n-1],a.push(r[e>>2]+r[e<<4&63]+"==")):2===o&&(e=(t[n-2]<<8)+t[n-1],a.push(r[e>>10]+r[e>>4&63]+r[e<<2&63]+"=")),a.join("")}t["-".charCodeAt(0)]=62,t["_".charCodeAt(0)]=63;
},{}],"JgNJ":[function(require,module,exports) {
exports.read=function(a,o,t,r,h){var M,p,w=8*h-r-1,f=(1<<w)-1,e=f>>1,i=-7,N=t?h-1:0,n=t?-1:1,s=a[o+N];for(N+=n,M=s&(1<<-i)-1,s>>=-i,i+=w;i>0;M=256*M+a[o+N],N+=n,i-=8);for(p=M&(1<<-i)-1,M>>=-i,i+=r;i>0;p=256*p+a[o+N],N+=n,i-=8);if(0===M)M=1-e;else{if(M===f)return p?NaN:1/0*(s?-1:1);p+=Math.pow(2,r),M-=e}return(s?-1:1)*p*Math.pow(2,M-r)},exports.write=function(a,o,t,r,h,M){var p,w,f,e=8*M-h-1,i=(1<<e)-1,N=i>>1,n=23===h?Math.pow(2,-24)-Math.pow(2,-77):0,s=r?0:M-1,u=r?1:-1,l=o<0||0===o&&1/o<0?1:0;for(o=Math.abs(o),isNaN(o)||o===1/0?(w=isNaN(o)?1:0,p=i):(p=Math.floor(Math.log(o)/Math.LN2),o*(f=Math.pow(2,-p))<1&&(p--,f*=2),(o+=p+N>=1?n/f:n*Math.pow(2,1-N))*f>=2&&(p++,f/=2),p+N>=i?(w=0,p=i):p+N>=1?(w=(o*f-1)*Math.pow(2,h),p+=N):(w=o*Math.pow(2,N-1)*Math.pow(2,h),p=0));h>=8;a[t+s]=255&w,s+=u,w/=256,h-=8);for(p=p<<h|w,e+=h;e>0;a[t+s]=255&p,s+=u,p/=256,e-=8);a[t+s-u]|=128*l};
},{}],"REa7":[function(require,module,exports) {
var r={}.toString;module.exports=Array.isArray||function(t){return"[object Array]"==r.call(t)};
},{}],"dskh":[function(require,module,exports) {

var global = arguments[3];
var t=arguments[3],r=require("base64-js"),e=require("ieee754"),n=require("isarray");function i(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(r){return!1}}function o(){return f.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function u(t,r){if(o()<r)throw new RangeError("Invalid typed array length");return f.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(r)).__proto__=f.prototype:(null===t&&(t=new f(r)),t.length=r),t}function f(t,r,e){if(!(f.TYPED_ARRAY_SUPPORT||this instanceof f))return new f(t,r,e);if("number"==typeof t){if("string"==typeof r)throw new Error("If encoding is specified then the first argument must be a string");return c(this,t)}return s(this,t,r,e)}function s(t,r,e,n){if("number"==typeof r)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&r instanceof ArrayBuffer?g(t,r,e,n):"string"==typeof r?l(t,r,e):y(t,r)}function h(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function a(t,r,e,n){return h(r),r<=0?u(t,r):void 0!==e?"string"==typeof n?u(t,r).fill(e,n):u(t,r).fill(e):u(t,r)}function c(t,r){if(h(r),t=u(t,r<0?0:0|w(r)),!f.TYPED_ARRAY_SUPPORT)for(var e=0;e<r;++e)t[e]=0;return t}function l(t,r,e){if("string"==typeof e&&""!==e||(e="utf8"),!f.isEncoding(e))throw new TypeError('"encoding" must be a valid string encoding');var n=0|v(r,e),i=(t=u(t,n)).write(r,e);return i!==n&&(t=t.slice(0,i)),t}function p(t,r){var e=r.length<0?0:0|w(r.length);t=u(t,e);for(var n=0;n<e;n+=1)t[n]=255&r[n];return t}function g(t,r,e,n){if(r.byteLength,e<0||r.byteLength<e)throw new RangeError("'offset' is out of bounds");if(r.byteLength<e+(n||0))throw new RangeError("'length' is out of bounds");return r=void 0===e&&void 0===n?new Uint8Array(r):void 0===n?new Uint8Array(r,e):new Uint8Array(r,e,n),f.TYPED_ARRAY_SUPPORT?(t=r).__proto__=f.prototype:t=p(t,r),t}function y(t,r){if(f.isBuffer(r)){var e=0|w(r.length);return 0===(t=u(t,e)).length?t:(r.copy(t,0,0,e),t)}if(r){if("undefined"!=typeof ArrayBuffer&&r.buffer instanceof ArrayBuffer||"length"in r)return"number"!=typeof r.length||W(r.length)?u(t,0):p(t,r);if("Buffer"===r.type&&n(r.data))return p(t,r.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function w(t){if(t>=o())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+o().toString(16)+" bytes");return 0|t}function d(t){return+t!=t&&(t=0),f.alloc(+t)}function v(t,r){if(f.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var e=t.length;if(0===e)return 0;for(var n=!1;;)switch(r){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":case void 0:return $(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*e;case"hex":return e>>>1;case"base64":return K(t).length;default:if(n)return $(t).length;r=(""+r).toLowerCase(),n=!0}}function E(t,r,e){var n=!1;if((void 0===r||r<0)&&(r=0),r>this.length)return"";if((void 0===e||e>this.length)&&(e=this.length),e<=0)return"";if((e>>>=0)<=(r>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return x(this,r,e);case"utf8":case"utf-8":return Y(this,r,e);case"ascii":return L(this,r,e);case"latin1":case"binary":return D(this,r,e);case"base64":return S(this,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return C(this,r,e);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function b(t,r,e){var n=t[r];t[r]=t[e],t[e]=n}function R(t,r,e,n,i){if(0===t.length)return-1;if("string"==typeof e?(n=e,e=0):e>2147483647?e=2147483647:e<-2147483648&&(e=-2147483648),e=+e,isNaN(e)&&(e=i?0:t.length-1),e<0&&(e=t.length+e),e>=t.length){if(i)return-1;e=t.length-1}else if(e<0){if(!i)return-1;e=0}if("string"==typeof r&&(r=f.from(r,n)),f.isBuffer(r))return 0===r.length?-1:_(t,r,e,n,i);if("number"==typeof r)return r&=255,f.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,r,e):Uint8Array.prototype.lastIndexOf.call(t,r,e):_(t,[r],e,n,i);throw new TypeError("val must be string, number or Buffer")}function _(t,r,e,n,i){var o,u=1,f=t.length,s=r.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||r.length<2)return-1;u=2,f/=2,s/=2,e/=2}function h(t,r){return 1===u?t[r]:t.readUInt16BE(r*u)}if(i){var a=-1;for(o=e;o<f;o++)if(h(t,o)===h(r,-1===a?0:o-a)){if(-1===a&&(a=o),o-a+1===s)return a*u}else-1!==a&&(o-=o-a),a=-1}else for(e+s>f&&(e=f-s),o=e;o>=0;o--){for(var c=!0,l=0;l<s;l++)if(h(t,o+l)!==h(r,l)){c=!1;break}if(c)return o}return-1}function A(t,r,e,n){e=Number(e)||0;var i=t.length-e;n?(n=Number(n))>i&&(n=i):n=i;var o=r.length;if(o%2!=0)throw new TypeError("Invalid hex string");n>o/2&&(n=o/2);for(var u=0;u<n;++u){var f=parseInt(r.substr(2*u,2),16);if(isNaN(f))return u;t[e+u]=f}return u}function m(t,r,e,n){return Q($(r,t.length-e),t,e,n)}function P(t,r,e,n){return Q(G(r),t,e,n)}function T(t,r,e,n){return P(t,r,e,n)}function B(t,r,e,n){return Q(K(r),t,e,n)}function U(t,r,e,n){return Q(H(r,t.length-e),t,e,n)}function S(t,e,n){return 0===e&&n===t.length?r.fromByteArray(t):r.fromByteArray(t.slice(e,n))}function Y(t,r,e){e=Math.min(t.length,e);for(var n=[],i=r;i<e;){var o,u,f,s,h=t[i],a=null,c=h>239?4:h>223?3:h>191?2:1;if(i+c<=e)switch(c){case 1:h<128&&(a=h);break;case 2:128==(192&(o=t[i+1]))&&(s=(31&h)<<6|63&o)>127&&(a=s);break;case 3:o=t[i+1],u=t[i+2],128==(192&o)&&128==(192&u)&&(s=(15&h)<<12|(63&o)<<6|63&u)>2047&&(s<55296||s>57343)&&(a=s);break;case 4:o=t[i+1],u=t[i+2],f=t[i+3],128==(192&o)&&128==(192&u)&&128==(192&f)&&(s=(15&h)<<18|(63&o)<<12|(63&u)<<6|63&f)>65535&&s<1114112&&(a=s)}null===a?(a=65533,c=1):a>65535&&(a-=65536,n.push(a>>>10&1023|55296),a=56320|1023&a),n.push(a),i+=c}return O(n)}exports.Buffer=f,exports.SlowBuffer=d,exports.INSPECT_MAX_BYTES=50,f.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:i(),exports.kMaxLength=o(),f.poolSize=8192,f._augment=function(t){return t.__proto__=f.prototype,t},f.from=function(t,r,e){return s(null,t,r,e)},f.TYPED_ARRAY_SUPPORT&&(f.prototype.__proto__=Uint8Array.prototype,f.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&f[Symbol.species]===f&&Object.defineProperty(f,Symbol.species,{value:null,configurable:!0})),f.alloc=function(t,r,e){return a(null,t,r,e)},f.allocUnsafe=function(t){return c(null,t)},f.allocUnsafeSlow=function(t){return c(null,t)},f.isBuffer=function(t){return!(null==t||!t._isBuffer)},f.compare=function(t,r){if(!f.isBuffer(t)||!f.isBuffer(r))throw new TypeError("Arguments must be Buffers");if(t===r)return 0;for(var e=t.length,n=r.length,i=0,o=Math.min(e,n);i<o;++i)if(t[i]!==r[i]){e=t[i],n=r[i];break}return e<n?-1:n<e?1:0},f.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},f.concat=function(t,r){if(!n(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return f.alloc(0);var e;if(void 0===r)for(r=0,e=0;e<t.length;++e)r+=t[e].length;var i=f.allocUnsafe(r),o=0;for(e=0;e<t.length;++e){var u=t[e];if(!f.isBuffer(u))throw new TypeError('"list" argument must be an Array of Buffers');u.copy(i,o),o+=u.length}return i},f.byteLength=v,f.prototype._isBuffer=!0,f.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var r=0;r<t;r+=2)b(this,r,r+1);return this},f.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var r=0;r<t;r+=4)b(this,r,r+3),b(this,r+1,r+2);return this},f.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var r=0;r<t;r+=8)b(this,r,r+7),b(this,r+1,r+6),b(this,r+2,r+5),b(this,r+3,r+4);return this},f.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?Y(this,0,t):E.apply(this,arguments)},f.prototype.equals=function(t){if(!f.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===f.compare(this,t)},f.prototype.inspect=function(){var t="",r=exports.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(t+=" ... ")),"<Buffer "+t+">"},f.prototype.compare=function(t,r,e,n,i){if(!f.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===r&&(r=0),void 0===e&&(e=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),r<0||e>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&r>=e)return 0;if(n>=i)return-1;if(r>=e)return 1;if(this===t)return 0;for(var o=(i>>>=0)-(n>>>=0),u=(e>>>=0)-(r>>>=0),s=Math.min(o,u),h=this.slice(n,i),a=t.slice(r,e),c=0;c<s;++c)if(h[c]!==a[c]){o=h[c],u=a[c];break}return o<u?-1:u<o?1:0},f.prototype.includes=function(t,r,e){return-1!==this.indexOf(t,r,e)},f.prototype.indexOf=function(t,r,e){return R(this,t,r,e,!0)},f.prototype.lastIndexOf=function(t,r,e){return R(this,t,r,e,!1)},f.prototype.write=function(t,r,e,n){if(void 0===r)n="utf8",e=this.length,r=0;else if(void 0===e&&"string"==typeof r)n=r,e=this.length,r=0;else{if(!isFinite(r))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r|=0,isFinite(e)?(e|=0,void 0===n&&(n="utf8")):(n=e,e=void 0)}var i=this.length-r;if((void 0===e||e>i)&&(e=i),t.length>0&&(e<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return A(this,t,r,e);case"utf8":case"utf-8":return m(this,t,r,e);case"ascii":return P(this,t,r,e);case"latin1":case"binary":return T(this,t,r,e);case"base64":return B(this,t,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return U(this,t,r,e);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},f.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var I=4096;function O(t){var r=t.length;if(r<=I)return String.fromCharCode.apply(String,t);for(var e="",n=0;n<r;)e+=String.fromCharCode.apply(String,t.slice(n,n+=I));return e}function L(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(127&t[i]);return n}function D(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(t[i]);return n}function x(t,r,e){var n=t.length;(!r||r<0)&&(r=0),(!e||e<0||e>n)&&(e=n);for(var i="",o=r;o<e;++o)i+=Z(t[o]);return i}function C(t,r,e){for(var n=t.slice(r,e),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function M(t,r,e){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+r>e)throw new RangeError("Trying to access beyond buffer length")}function k(t,r,e,n,i,o){if(!f.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(r>i||r<o)throw new RangeError('"value" argument is out of bounds');if(e+n>t.length)throw new RangeError("Index out of range")}function N(t,r,e,n){r<0&&(r=65535+r+1);for(var i=0,o=Math.min(t.length-e,2);i<o;++i)t[e+i]=(r&255<<8*(n?i:1-i))>>>8*(n?i:1-i)}function z(t,r,e,n){r<0&&(r=4294967295+r+1);for(var i=0,o=Math.min(t.length-e,4);i<o;++i)t[e+i]=r>>>8*(n?i:3-i)&255}function F(t,r,e,n,i,o){if(e+n>t.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function j(t,r,n,i,o){return o||F(t,r,n,4,3.4028234663852886e38,-3.4028234663852886e38),e.write(t,r,n,i,23,4),n+4}function q(t,r,n,i,o){return o||F(t,r,n,8,1.7976931348623157e308,-1.7976931348623157e308),e.write(t,r,n,i,52,8),n+8}f.prototype.slice=function(t,r){var e,n=this.length;if((t=~~t)<0?(t+=n)<0&&(t=0):t>n&&(t=n),(r=void 0===r?n:~~r)<0?(r+=n)<0&&(r=0):r>n&&(r=n),r<t&&(r=t),f.TYPED_ARRAY_SUPPORT)(e=this.subarray(t,r)).__proto__=f.prototype;else{var i=r-t;e=new f(i,void 0);for(var o=0;o<i;++o)e[o]=this[o+t]}return e},f.prototype.readUIntLE=function(t,r,e){t|=0,r|=0,e||M(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return n},f.prototype.readUIntBE=function(t,r,e){t|=0,r|=0,e||M(t,r,this.length);for(var n=this[t+--r],i=1;r>0&&(i*=256);)n+=this[t+--r]*i;return n},f.prototype.readUInt8=function(t,r){return r||M(t,1,this.length),this[t]},f.prototype.readUInt16LE=function(t,r){return r||M(t,2,this.length),this[t]|this[t+1]<<8},f.prototype.readUInt16BE=function(t,r){return r||M(t,2,this.length),this[t]<<8|this[t+1]},f.prototype.readUInt32LE=function(t,r){return r||M(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},f.prototype.readUInt32BE=function(t,r){return r||M(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},f.prototype.readIntLE=function(t,r,e){t|=0,r|=0,e||M(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*r)),n},f.prototype.readIntBE=function(t,r,e){t|=0,r|=0,e||M(t,r,this.length);for(var n=r,i=1,o=this[t+--n];n>0&&(i*=256);)o+=this[t+--n]*i;return o>=(i*=128)&&(o-=Math.pow(2,8*r)),o},f.prototype.readInt8=function(t,r){return r||M(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},f.prototype.readInt16LE=function(t,r){r||M(t,2,this.length);var e=this[t]|this[t+1]<<8;return 32768&e?4294901760|e:e},f.prototype.readInt16BE=function(t,r){r||M(t,2,this.length);var e=this[t+1]|this[t]<<8;return 32768&e?4294901760|e:e},f.prototype.readInt32LE=function(t,r){return r||M(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},f.prototype.readInt32BE=function(t,r){return r||M(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},f.prototype.readFloatLE=function(t,r){return r||M(t,4,this.length),e.read(this,t,!0,23,4)},f.prototype.readFloatBE=function(t,r){return r||M(t,4,this.length),e.read(this,t,!1,23,4)},f.prototype.readDoubleLE=function(t,r){return r||M(t,8,this.length),e.read(this,t,!0,52,8)},f.prototype.readDoubleBE=function(t,r){return r||M(t,8,this.length),e.read(this,t,!1,52,8)},f.prototype.writeUIntLE=function(t,r,e,n){(t=+t,r|=0,e|=0,n)||k(this,t,r,e,Math.pow(2,8*e)-1,0);var i=1,o=0;for(this[r]=255&t;++o<e&&(i*=256);)this[r+o]=t/i&255;return r+e},f.prototype.writeUIntBE=function(t,r,e,n){(t=+t,r|=0,e|=0,n)||k(this,t,r,e,Math.pow(2,8*e)-1,0);var i=e-1,o=1;for(this[r+i]=255&t;--i>=0&&(o*=256);)this[r+i]=t/o&255;return r+e},f.prototype.writeUInt8=function(t,r,e){return t=+t,r|=0,e||k(this,t,r,1,255,0),f.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[r]=255&t,r+1},f.prototype.writeUInt16LE=function(t,r,e){return t=+t,r|=0,e||k(this,t,r,2,65535,0),f.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8):N(this,t,r,!0),r+2},f.prototype.writeUInt16BE=function(t,r,e){return t=+t,r|=0,e||k(this,t,r,2,65535,0),f.TYPED_ARRAY_SUPPORT?(this[r]=t>>>8,this[r+1]=255&t):N(this,t,r,!1),r+2},f.prototype.writeUInt32LE=function(t,r,e){return t=+t,r|=0,e||k(this,t,r,4,4294967295,0),f.TYPED_ARRAY_SUPPORT?(this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=255&t):z(this,t,r,!0),r+4},f.prototype.writeUInt32BE=function(t,r,e){return t=+t,r|=0,e||k(this,t,r,4,4294967295,0),f.TYPED_ARRAY_SUPPORT?(this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t):z(this,t,r,!1),r+4},f.prototype.writeIntLE=function(t,r,e,n){if(t=+t,r|=0,!n){var i=Math.pow(2,8*e-1);k(this,t,r,e,i-1,-i)}var o=0,u=1,f=0;for(this[r]=255&t;++o<e&&(u*=256);)t<0&&0===f&&0!==this[r+o-1]&&(f=1),this[r+o]=(t/u>>0)-f&255;return r+e},f.prototype.writeIntBE=function(t,r,e,n){if(t=+t,r|=0,!n){var i=Math.pow(2,8*e-1);k(this,t,r,e,i-1,-i)}var o=e-1,u=1,f=0;for(this[r+o]=255&t;--o>=0&&(u*=256);)t<0&&0===f&&0!==this[r+o+1]&&(f=1),this[r+o]=(t/u>>0)-f&255;return r+e},f.prototype.writeInt8=function(t,r,e){return t=+t,r|=0,e||k(this,t,r,1,127,-128),f.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[r]=255&t,r+1},f.prototype.writeInt16LE=function(t,r,e){return t=+t,r|=0,e||k(this,t,r,2,32767,-32768),f.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8):N(this,t,r,!0),r+2},f.prototype.writeInt16BE=function(t,r,e){return t=+t,r|=0,e||k(this,t,r,2,32767,-32768),f.TYPED_ARRAY_SUPPORT?(this[r]=t>>>8,this[r+1]=255&t):N(this,t,r,!1),r+2},f.prototype.writeInt32LE=function(t,r,e){return t=+t,r|=0,e||k(this,t,r,4,2147483647,-2147483648),f.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24):z(this,t,r,!0),r+4},f.prototype.writeInt32BE=function(t,r,e){return t=+t,r|=0,e||k(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),f.TYPED_ARRAY_SUPPORT?(this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t):z(this,t,r,!1),r+4},f.prototype.writeFloatLE=function(t,r,e){return j(this,t,r,!0,e)},f.prototype.writeFloatBE=function(t,r,e){return j(this,t,r,!1,e)},f.prototype.writeDoubleLE=function(t,r,e){return q(this,t,r,!0,e)},f.prototype.writeDoubleBE=function(t,r,e){return q(this,t,r,!1,e)},f.prototype.copy=function(t,r,e,n){if(e||(e=0),n||0===n||(n=this.length),r>=t.length&&(r=t.length),r||(r=0),n>0&&n<e&&(n=e),n===e)return 0;if(0===t.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-r<n-e&&(n=t.length-r+e);var i,o=n-e;if(this===t&&e<r&&r<n)for(i=o-1;i>=0;--i)t[i+r]=this[i+e];else if(o<1e3||!f.TYPED_ARRAY_SUPPORT)for(i=0;i<o;++i)t[i+r]=this[i+e];else Uint8Array.prototype.set.call(t,this.subarray(e,e+o),r);return o},f.prototype.fill=function(t,r,e,n){if("string"==typeof t){if("string"==typeof r?(n=r,r=0,e=this.length):"string"==typeof e&&(n=e,e=this.length),1===t.length){var i=t.charCodeAt(0);i<256&&(t=i)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!f.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof t&&(t&=255);if(r<0||this.length<r||this.length<e)throw new RangeError("Out of range index");if(e<=r)return this;var o;if(r>>>=0,e=void 0===e?this.length:e>>>0,t||(t=0),"number"==typeof t)for(o=r;o<e;++o)this[o]=t;else{var u=f.isBuffer(t)?t:$(new f(t,n).toString()),s=u.length;for(o=0;o<e-r;++o)this[o+r]=u[o%s]}return this};var V=/[^+\/0-9A-Za-z-_]/g;function X(t){if((t=J(t).replace(V,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}function J(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function Z(t){return t<16?"0"+t.toString(16):t.toString(16)}function $(t,r){var e;r=r||1/0;for(var n=t.length,i=null,o=[],u=0;u<n;++u){if((e=t.charCodeAt(u))>55295&&e<57344){if(!i){if(e>56319){(r-=3)>-1&&o.push(239,191,189);continue}if(u+1===n){(r-=3)>-1&&o.push(239,191,189);continue}i=e;continue}if(e<56320){(r-=3)>-1&&o.push(239,191,189),i=e;continue}e=65536+(i-55296<<10|e-56320)}else i&&(r-=3)>-1&&o.push(239,191,189);if(i=null,e<128){if((r-=1)<0)break;o.push(e)}else if(e<2048){if((r-=2)<0)break;o.push(e>>6|192,63&e|128)}else if(e<65536){if((r-=3)<0)break;o.push(e>>12|224,e>>6&63|128,63&e|128)}else{if(!(e<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;o.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128)}}return o}function G(t){for(var r=[],e=0;e<t.length;++e)r.push(255&t.charCodeAt(e));return r}function H(t,r){for(var e,n,i,o=[],u=0;u<t.length&&!((r-=2)<0);++u)n=(e=t.charCodeAt(u))>>8,i=e%256,o.push(i),o.push(n);return o}function K(t){return r.toByteArray(X(t))}function Q(t,r,e,n){for(var i=0;i<n&&!(i+e>=r.length||i>=t.length);++i)r[i+e]=t[i];return i}function W(t){return t!=t}
},{"base64-js":"yh9p","ieee754":"JgNJ","isarray":"REa7","buffer":"dskh"}],"Focm":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
var t=require("buffer").Buffer;function e(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function a(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}var i=Scratch.ArgumentType,r=Scratch.BlockType,u=Scratch.log,c=function(){try{return window.require("ip").address()}catch(t){return console.log(t),"kittenblock"}},l=function(t){t.includes_.iot='#include "KBIot.h"',t.definitions_.iot="KBIot iot(&Serial);",t.setupCodes_._serial="Serial.begin(115200);",t.setupCodes_.iot="iot.init()",t.loopCodes_.iot="iot.loop()"},s=function(t){t.functions_.iot_init='# iot init process\ndef waitSerial():\n    line = ""\n    while not line.endswith(\'\\n\'):\n      a = uart.readline()\n      if a:\n        line += str(a, \'utf8\')\n    return line\nsleep(1000)\nuart.write("\\n\\n")\nsleep(500)\nuart.write("WF 1 0 1\\n")\nsleep(500)\nuart.write("WF 10 4 0 2 3 4 5\\n")\nsleep(500)\n'},T=function(t){return t.replace(/"/g,"").trim()},p=function(t){return t.startsWith("ws://")||t.startsWith("mqtt://")||t.startsWith("wss://")||(t="mqtt://"+t),t},d=function(){function o(t){n(this,o),this.runtime=t,this.runtime.registerPeripheralExtension("IOT",this),this.decoder=new TextDecoder,this.mqttConnServer=this.mqttConnServer.bind(this),this.lineBuffer="",this._iftttkey=null,this._server=null,this._cloudvar={},this._io=null,this.onenetDataStreams={}}return a(o,[{key:"dispose",value:function(){this._server&&(this._server.close(),this.runtime.cloudHost(null),this._server=null)}},{key:"getInfo",value:function(){var t=c();return{id:"IoT",name:"IoT",color1:"#1395BA",color2:"#107895",color3:"#107895",blocks:[{opcode:"mqttConnect",blockType:r.COMMAND,text:"Connect MQTT [SERVER] ID[CLIENTID]",arguments:{SERVER:{type:i.STRING,defaultValue:t},CLIENTID:{type:i.STRING,defaultValue:"robot01"}},func:"mqttConnect",gen:{arduino:this.connAr,micropy:this.connPy}},{opcode:"mqttConnectCloud",blockType:r.COMMAND,text:"Connect Mqtt [SERVER] Access ID[USER] Pass[PASS] Device ID[CLIENTID]",arguments:{SERVER:{type:i.STRING,defaultValue:"iot.kittenbot.cn"},CLIENTID:{type:i.STRING,defaultValue:"robot01"},USER:{type:i.STRING,defaultValue:""},PASS:{type:i.STRING,defaultValue:""}},func:"mqttConnectCloud",gen:{arduino:this.connAr,micropy:this.connPy}},{opcode:"mqttPub",blockType:r.COMMAND,text:"MQTT Publish [TOPIC] [DATA]",arguments:{TOPIC:{type:i.STRING,defaultValue:"/hello"},DATA:{type:i.STRING,defaultValue:"helloworld"}},func:"mqttPub",gen:{arduino:this.pubAr,micropy:this.pubPy}},{opcode:"mqttSub",blockType:r.COMMAND,text:"MQTT Subscribe [TOPIC]",arguments:{TOPIC:{type:i.STRING,defaultValue:"/hello"}},func:"mqttSub",gen:{arduino:this.subAr,micropy:this.subPy}},{opcode:"mqttGot",blockType:r.HAT,text:"MQTT Topic [TOPIC]",arguments:{TOPIC:{type:i.STRING,defaultValue:"/hello"}},isEdgeActivated:!1,func:"mqttGot",gen:{arduino:this.mqttGotAr,micropy:this.mqttGotPy}},{opcode:"mqttData",blockType:r.REPORTER,text:"Topic Data [DATATYPE]",arguments:{DATATYPE:{type:i.STRING,defaultValue:"String",menu:"datatype"}},func:"mqttData",gen:{arduino:this.mqttDataAr,micropy:this.mqttDataPy}},{opcode:"mqttPubStage",blockType:r.COMMAND,text:"MQTT Publish [TOPIC] Stage Canvas",arguments:{TOPIC:{type:i.STRING,defaultValue:"/hello"}},func:"mqttPubStage",mode:["stage"]},"---",{opcode:"iotwork",blockType:r.COMMAND,text:"Iot work@micropy",func:"noop",gen:{micropy:this.iotWork_py}},{opcode:"ntptime",blockType:r.REPORTER,text:"ntp time [NTP]",arguments:{NTP:{type:i.STRING,defaultValue:"hh",menu:"NTPMENU"}},func:"noop",gen:{micropy:this.ntptime_py}},{opcode:"connectAP",blockType:r.COMMAND,text:"connect AP [AP] pass[PASS]",arguments:{AP:{type:i.STRING,defaultValue:"Home"},PASS:{type:i.STRING,defaultValue:"12345"}},func:"noop",gen:{arduino:this.connApAr,micropy:this.connApPy}},"---",{opcode:"connOneNet",blockType:r.COMMAND,text:"Connect OneNet DeviceID[CLIENTID] ProductID[USER] SN[PASS]",arguments:{CLIENTID:{type:i.STRING},USER:{type:i.STRING},PASS:{type:i.STRING}},gen:{micropy:this.connOneNetPy}},{opcode:"pubOneNet",blockType:r.COMMAND,text:"Publish OneNet stream [POINT]=[DATA]",arguments:{POINT:{type:i.STRING},DATA:{type:i.STRING}},gen:{micropy:this.pubOneNetPy}},{opcode:"onenetSetApikey",blockType:r.COMMAND,text:"OneNet APIKEY [KEY]",arguments:{KEY:{type:i.STRING}},gen:{micropy:this.onenetSetApikeyPy}},{opcode:"onenetData",blockType:r.REPORTER,text:"OneNet Data DeviceID[DEVID] datapoint[POINT]",arguments:{DEVID:{type:i.STRING},POINT:{type:i.STRING}},func:"onenetData",gen:{micropy:this.onenetDataPy}},"---",{opcode:"iftttkey",blockType:r.COMMAND,text:"IFttt Set KEY [KEY]",arguments:{KEY:{type:i.STRING,defaultValue:"Your KEY"}},func:"iftttkey",mode:["stage"]},{opcode:"ifttttrig",blockType:r.COMMAND,text:"IFttt Trig Event[EVENT] [VALUE]=[DATA]",arguments:{EVENT:{type:i.STRING,defaultValue:"event1"},VALUE:{type:i.STRING,defaultValue:"value1"},DATA:{type:i.STRING,defaultValue:"hello world"}},func:"ifttttrig",mode:["stage"]},"---",{opcode:"cloudServer",blockType:r.COMMAND,text:"Cloud Var Server Start",mode:["stage"]},{opcode:"cloudVarConn",blockType:r.COMMAND,text:"Connect Cloud Var [SERVER]",arguments:{SERVER:{type:i.STRING,defaultValue:t}},mode:["stage"]}],menus:{datatype:["String","Number","C_Str"],NTPMENU:[{text:"Hour",value:"hh"},{text:"Min",value:"mm"},{text:"Sec",value:"ss"},{text:"1970s",value:"None"}]},translation_map:{"zh-cn":{mqttConnect:"连接MQTT 服务器[SERVER] ID[CLIENTID]",mqttConnectCloud:"连接服务器[SERVER] 话题登录名[USER] 登录密码[PASS] 设备ID [CLIENTID]",connectAP:"连接 路由器[AP] 密码[PASS]",mqttPub:"MQTT 广播话题[TOPIC] 消息[DATA]",mqttSub:"MQTT 订阅话题[TOPIC]",mqttGot:"MQTT 收到话题[TOPIC]",mqttData:"话题内容 [DATATYPE]",datatype:{String:"文本",Number:"数字",C_Str:"C指针"},iotwork:"访问IOT",cloudServer:"云变量服务器启动",cloudVarConn:"连接 云变量 [SERVER]",connOneNet:"连接 OneNet 设备ID[CLIENTID] 产品ID[USER] SN[PASS]",pubOneNet:"发布 OneNet 数据流 [POINT]=[DATA]",onenetData:"OneNet数据 设备ID[DEVID] 数据点[POINT]"},"zh-tw":{mqttConnect:"連接MQTT 伺服器[SERVER] ID[CLIENTID]",mqttConnectCloud:"雲端服務器[SERVER] 訪問帳號ID[USER] 訪問密碼[PASS] 設備ID [CLIENTID]",connectAP:"連接 路由器[AP] 密碼[PASS]",mqttPub:"MQTT 廣播話題[TOPIC] 消息[DATA]",mqttSub:"MQTT 訂閱話題[TOPIC]",mqttGot:"MQTT 收到話題[TOPIC]",mqttData:"話題內容 [DATATYPE]",datatype:{String:"文本",Number:"數字",C_Str:"C指針"},iotwork:"IOT作業"}}}}},{key:"noop",value:function(){}},{key:"mqttConnect",value:function(t){var e=p(t.SERVER),n=t.CLIENTID;return this.mqttConnServer(e,n)}},{key:"mqttConnectCloud",value:function(t){var e=p(t.SERVER),n=t.CLIENTID,o=t.USER,a=t.PASS;return this.mqttConnServer(e,n,o,a)}},{key:"mqttConnServer",value:function(t,e,n,o){var a=this;return new Promise(function(i,r){a.client&&a.client.end();var u={clientId:e};n&&(u.username=n),n&&(u.password=o);var c=window.require("mqtt").connect(t,u);c.retryCnt=0,a.client=c,a.client.on("message",function(t,e){window.vm.runtime.startHats("IoT_mqttGot",{TEXT:t}),a.mqttTopicData=e.toString("utf-8"),"mqtt.heclouds.com"===c.options.hostname&&(a.onenetDataStreams[t]=e)}),a.client.on("end",function(){console.log("mqtt end")}),a.client.on("error",function(t){console.log("mqtt err",t)}),a.client.on("connect",function(t){c.retryCnt=0,i()}),a.client.on("reconnect",function(){c.retryCnt++,c.retryCnt>5&&(c.end(),r("error: time out"))})})}},{key:"mqttPub",value:function(t){this.client&&this.client.publish(t.TOPIC,t.DATA.toString(),{qos:1,retain:!1})}},{key:"mqttPubStage",value:function(t,e){if(this.client){var n=e.ioQuery("fs","stageCanvasData",[]);return this.client.publish(t.TOPIC,n,{qos:1,retain:!1}),n}}},{key:"mqttSub",value:function(t){this.client&&this.client.subscribe(t.TOPIC,{qos:1})}},{key:"mqttGot",value:function(t){return!0}},{key:"onenetGot",value:function(t){return!0}},{key:"mqttData",value:function(t){return this.mqttTopicData}},{key:"connApAr",value:function(t,e){l(t);var n=t.valueToCode(e,"AP"),o=t.valueToCode(e,"PASS");return t.isNumber(o)&&(o='"'.concat(o,'"')),"iot.connectAP(".concat(n,", ").concat(o,")")}},{key:"connApPy",value:function(t,e){s(t);var n=t.valueToCode(e,"AP"),o=t.valueToCode(e,"PASS"),a=T("WF 52 2 52 ".concat(n," ").concat(o,"\\n"));return'uart.write("'.concat(a,'")\n')}},{key:"connAr",value:function(t,e){l(t);var n=t.valueToCode(e,"SERVER"),o=t.valueToCode(e,"CLIENTID"),a=t.valueToCode(e,"USER"),i=t.valueToCode(e,"PASS");return a?"iot.mqttConect(".concat(n,", ").concat(o,", ").concat(a,", ").concat(i,")"):"iot.mqttConect(".concat(n,", ").concat(o,")")}},{key:"connPy",value:function(t,e){var n;s(t);var o=t.valueToCode(e,"SERVER"),a=t.valueToCode(e,"CLIENTID"),i=t.valueToCode(e,"USER"),r=t.valueToCode(e,"PASS");return n=T(i&&'""'!==i?"WF 15 4 15 ".concat(o," ").concat(a," ").concat(i," ").concat(r,"\\n"):"WF 15 2 15 ".concat(o," ").concat(a,"\\n")),'uart.write("'.concat(n,'")\nuart.write("WF 10 4 0 2 3 4 5\\n")\n')}},{key:"pubAr",value:function(t,e){l(t);var n=t.valueToCode(e,"TOPIC"),o=t.valueToCode(e,"DATA");return"iot.publish(".concat(n,", ").concat(o,")")}},{key:"pubPy",value:function(t,e){s(t);var n=t.valueToCode(e,"TOPIC"),o=t.valueToCode(e,"DATA"),a=T("WF 11 4 11 1 0 ".concat(n," %s\\n"));return'uart.write("'.concat(a,'" %(').concat(o,"))\n")}},{key:"subAr",value:function(t,e){l(t);var n=t.valueToCode(e,"TOPIC");return"iot.subscribe(".concat(n,")")}},{key:"subPy",value:function(t,e){s(t);var n=t.valueToCode(e,"TOPIC"),o=T("WF 12 2 1 ".concat(n," 0\\n"));return'uart.write("'.concat(o,'")\n')}},{key:"mqttGotAr",value:function(t,e){l(t);var n=t.valueToCode(e,"TOPIC"),o="GOT"+n.replace(/["']/g,"").replace(/\//g,"_");t.setupCodes_[o]="iot.regGot(".concat(n,", &").concat(o,")");var a=e.nextConnection&&e.nextConnection.targetBlock(),i=t.blockToCode(a);return t.functions_[o]="\nvoid ".concat(o,"(String topicData){\n").concat(i,"\n}\n"),""}},{key:"mqttGotPy",value:function(t,e){s(t);var n="GOT"+t.valueToCode(e,"TOPIC").replace(/["']/g,"").replace(/\//g,"_"),o=e.nextConnection&&e.nextConnection.targetBlock(),a=t.blockToCode(o);return a=a.split("\n").map(function(t){return"\t"+t}).join("\n"),t.functions_[n]="\ndef ".concat(n,"(topicData):\n\t").concat(t.getVarGlobals(),"\n").concat(a),""}},{key:"mqttDataAr",value:function(t,e){var n=t.valueToCode(e,"DATATYPE"),o="topicData";return"Number"===n?o+=".toInt()":"C_Str"===n&&(o+=".c_str()"),[o,t.ORDER_ATOMIC]}},{key:"mqttDataPy",value:function(t,e){t.valueToCode(e,"DATATYPE");return["topicData",t.ORDER_ATOMIC]}},{key:"iotWork_py",value:function(t,e){return s(t),t.variables_.iotserial="linebuf = '';lastCmd=0;ntpTime=0;\n",t.functions_.iotserial="\ndef iotSerialWork():\n    global linebuf,ntpTime,lastCmd\n    if uart.any():\n        a = uart.readline()\n        linebuf += str(a, 'utf8')\n        if linebuf.endswith('\\n'):\n            tmp = linebuf.split(' ')\n            linebuf = ''\n            if tmp[0] == 'WF':\n                if tmp[1] == '3' and tmp[3] == '5':\n                    topic = tmp[4]\n                    topic = topic.replace('/', '_')\n                    data = tmp[5].strip()\n                    cmdline = 'GOT%s(data)' %topic\n                    eval(cmdline, globals(), {'data': data})\n                elif lastCmd == 7 and tmp[1] == '2':\n                    ntpTime = int(tmp[3])\n                    lastCmd = 0\n","iotSerialWork()\n"}},{key:"ntptime_py",value:function(t,e){s(t);var n=t.valueToCode(e,"NTP");return t.functions_.ntptime="\ndef ntpTimeGet(t):\n    global ntpTime,lastCmd\n    uart.write(\"WF 7\\n\")\n    lastCmd = 7\n    if t == 'hh':\n        return int(ntpTime % 86400) / 3600\n    elif t == 'mm':\n        return (ntpTime % 3600) / 60\n    elif t == 'ss':\n        return (ntpTime % 60)\n    else:\n        return ntpTime\n",['ntpTimeGet("'.concat(n,'")'),0]}},{key:"iftttkey",value:function(t,e){this._iftttkey=t.KEY}},{key:"ifttttrig",value:function(t,e){if(this._iftttkey){var n=t.EVENT,o=new FormData;t.VALUE&&t.DATA&&o.append(t.VALUE,t.DATA);var a={method:"POST",body:o};fetch("https://maker.ifttt.com/trigger/".concat(n,"/with/key/").concat(this._iftttkey),a).then(function(t){t.ok?t.text().then(function(t){console.log("ifttt trig",t)}):(console.log("ifttt trig error",t),vm.emit("showAlert",{msg:"Ifttt trig error"}))})}else vm.emit("showAlert",{msg:"Please Go https://ifttt.com/maker_webhooks/settings for your setting"})}},{key:"cloudServer",value:function(t,e){var n=this;if(!this._server){var o=new(window.require("ws").Server)({port:3011});this._server=o,window.cloudws=o,window.cloudws._cloudvar=this._cloudvar;var a=this._cloudvar;setTimeout(function(){n.runtime.cloudHost("localhost:3011")},500),o.on("connection",function(t){t.on("message",function(e){var n=JSON.parse(e);if(n.method)if("handshake"===n.method)for(var i in a){var r={method:"set",name:i,value:a[i]};t.send(JSON.stringify(r))}else"create"===n.method?a[n.name]=n.value:"set"===n.method&&(a[n.name]=n.value,o.clients.forEach(function(t){if(t.readyState===WebSocket.OPEN){var e={method:"set",name:n.name,value:n.value};t.send(JSON.stringify(e))}}))})})}}},{key:"cloudVarConn",value:function(t,e){var n=t.SERVER;-1===n.indexOf(":")&&(n+=":3011"),this.runtime.cloudHost(n)}},{key:"connOneNet",value:function(t,e){return t.SERVER="mqtt://mqtt.heclouds.com:6002",this.onenetDevID=t.CLIENTID,this.mqttConnectCloud(t)}},{key:"connOneNetPy",value:function(t,e){s(t);var n=t.valueToCode(e,"CLIENTID"),o=t.valueToCode(e,"USER"),a=t.valueToCode(e,"PASS"),i=T("WF 15 5 15 ".concat("mqtt.heclouds.com"," ").concat(n," 6002 ").concat(o," ").concat(a,"\\n"));return'uart.write("'.concat(i,'")\nuart.write("WF 10 4 0 2 3 4 5\\n")\n')}},{key:"pubOneNet",value:function(n,o){var a=e({},n.POINT,n.DATA),i=JSON.stringify(a),r=t.alloc(i.length+3);r.write(i,3),r[0]=3,r[1]=i.length>>8&255,r[2]=255&i.length,this.client&&this.client.publish("$dp",r,{qos:1,retain:!1})}},{key:"pubOneNetPy",value:function(t,e){s(t);var n=t.valueToCode(e,"POINT"),o=t.valueToCode(e,"DATA");return t.functions_.onenet_pub='\ndef onenetPub(dp, value):\n    tmp = ",;%s,%s;" %(dp, value)\n    content = "${5}${0}${%s}%s" %(len(tmp), tmp)\n    cmd = "WF 11 4 11 1 0 $dp %s\\n" %content\n    uart.write(cmd)\n',"onenetPub(".concat(n,", ").concat(o,")\n")}},{key:"onenetSetApikey",value:function(t){this.onenetAPIKEY=t.KEY}},{key:"onenetSetApikeyPy",value:function(t,e){var n=t.valueToCode(e,"KEY");t.variables_.onenet_apikey="api_key = ".concat(n,"\n")}},{key:"onenetDataPy",value:function(t,e){s(t);var n=t.valueToCode(e,"DEVID"),o=t.valueToCode(e,"POINT");return t.variables_.onenet_queryret="isDpInit=False\n",t.functions_.onenet_query='\ndef onenetQuery(devid, datapoint):\n    global isDpInit\n    if not isDpInit:\n        uart.write("WF 20 3 20 api.heclouds.com 80\\n")\n        sleep(100)\n        uart.write("WF 22 2 0 1 application/json\\n")\n        sleep(100)\n        uart.write("WF 22 2 0 0 api-key:%s\\n" %api_key)\n        sleep(100)\n        uart.readline()\n        isDpInit = True\n    uart.write("WF 21 2 0 GET /devices/%s/datastreams/%s\\n" %(devid, datapoint))\n    ret = waitSerial()\n    cur = "current_value"\n    if ret.find(cur)>-1:\n        a = ret[ret.find(cur)+len(cur)+3:-1]\n        b = a[0:a.find(\'"\')]\n        return b\n    else:\n        return None\n',["onenetQuery(".concat(n,", ").concat(o,")"),0]}},{key:"onenetData",value:function(t){if(this.onenetAPIKEY){var e=t.DEVID,n=t.POINT,o={method:"GET",headers:{"api-key":this.onenetAPIKEY}},a="http://api.heclouds.com/devices/".concat(e,"/datastreams/").concat(n);return new Promise(function(t,e){fetch(a,o).then(function(t){return t.json()}).then(function(n){0===n.errno?t(n.data.current_value):e(n.error)}).catch(function(t){e(t)})})}vm.emit("showAlert",{msg:"No Onenet APIKEY"})}}]),o}();module.exports=d;
},{"buffer":"dskh"}]},{},["Focm"], null)
//# sourceMappingURL=/index.map