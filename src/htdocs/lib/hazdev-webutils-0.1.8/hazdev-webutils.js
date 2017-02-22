require=function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({"mvc/CollectionSelectBox":[function(a,b,c){"use strict";var d=a("../util/Util"),e=a("./View"),f={className:"collection-selectbox",includeBlankOption:!1,blankOption:{value:"-1",text:"Please select&hellip;"},format:function(a){return a.id},renderNow:!0},g=function(a){var b,c,g,h,i,j,k,l,m,n;return a=d.extend({},f,a),b=e(a),c=function(){var c=b.el;h=a.collection,g=a.blankOption,j=a.includeBlankOption,i=a.format,k="SELECT"===c.nodeName?c:c.appendChild(document.createElement("select")),k.classList.add(a.className),h.on("add",b.render),h.on("remove",b.render),h.on("reset",b.render),h.on("select",n),h.on("deselect",n),k.addEventListener("change",m),a.renderNow&&b.render(),a=null},m=function(){var a=k.value;j&&a===g.value?h.deselect():h.selectById(a)},n=function(){var a=h.getSelected();a?k.value=a.id:j&&(k.value=g.value)},l=function(){return["<option ",'value="',g.value,'">',g.text,"</option>"].join("")},b.destroy=d.compose(function(){h.off("add",b.render),h.off("remove",b.render),h.off("reset",b.render),h.off("select",n),h.off("deselect",n),k.removeEventListener("change",m),h=null,k=null},b.destroy),b.render=function(){var a,b,c=h.data(),d=h.getSelected(),e=[];for(j===!0&&e.push(l()),a=0,b=c.length;b>a;a++)e.push('<option value="'+c[a].id+'"'+(d===c[a]?' selected="selected"':"")+">"+i(c[a])+"</option>");k.innerHTML=e.join(""),n()},c(),b};b.exports=g},{"../util/Util":"util/Util","./View":"mvc/View"}],"mvc/CollectionTable":[function(a,b,c){"use strict";var d=a("../util/Util"),e=a("./View"),f={className:"collection-table",clickToSelect:!1,columns:[],emptyMarkup:"No data to display",renderNow:!0},g=function(a){var b,c,g,h,i,j,k,l,m;return a=d.extend({},f,a),b=e(a),c=function(){g=a.className,h=a.clickToSelect,i=a.collection,j=a.columns,k=a.emptyMarkup,i.on("add",b.render),i.on("remove",b.render),i.on("reset",b.render),i.on("select",m),i.on("deselect",m),h&&b.el.addEventListener("click",l),a.renderNow&&b.render()},l=function(a){var c=a.target,e=d.getParentNode(c,"TR",b.el);null!==e&&"TBODY"===e.parentNode.nodeName.toUpperCase()&&i.selectById(e.getAttribute("data-id"))},m=function(){var a,c=b.el;a=c.querySelector(".selected"),a&&a.classList.remove("selected"),a=i.getSelected(),a&&(a=c.querySelector('[data-id="'+a.id+'"]'),a.classList.add("selected"))},b.destroy=d.compose(function(){i.off("add",b.render),i.off("remove",b.render),i.off("reset",b.render),i.off("select",m),i.off("deselect",m),i=null,h&&b.el.removeEventListener("click",l),h=null},b.destroy),b.render=function(){var a,c,d,e,f,h,l,m,n;if(e=i.data(),n=[],0===e.length)return void(b.el.innerHTML=k);for(n.push('<table class="',g,'"><thead>'),a=0,c=j.length;c>a;a++)d=j[a],n.push('<th class="'+d.className+'">'+d.title+"</th>");for(n.push("</thead><tbody>"),f=0,l=e.length;l>f;f++){for(m=e[f],h=(""+m.id).replace(/"/g,"&quot;"),n.push('<tr data-id="'+h+'">'),a=0,c=j.length;c>a;a++)d=j[a],n.push("<"+(d.header?'th scope="row"':"td")+' class="'+d.className+'">'+d.format(m)+"</td>");n.push("</tr>")}n.push("</tbody></table>"),b.el.innerHTML=n.join("")},c(),b};b.exports=g},{"../util/Util":"util/Util","./View":"mvc/View"}],"mvc/CollectionView":[function(a,b,c){"use strict";var d=a("./Collection"),e=a("./View"),f=a("../util/Util"),g=function(a){var b,c,g,h,i,j,k,l,m,n,o,p,q;return b=e(a),c=function(a){var c;g=a.collection,i=a.factory||e,g||(g=d([]),h=!0),j="UL"===b.el.nodeName||"OL"===b.el.nodeName?b.el:b.el.appendChild(document.createElement("ul")),k=d([]),g.on("render",b.render),g.on("add",m),g.on("remove",o),g.on("reset",p),g.on("select",q),g.on("deselect",n),p(),c=g.getSelected(),c&&q(c)},l=function(a,b){var c;return b=b||document.createDocumentFragment(),c=a.map(function(a){var c=i({collection:g,el:b.appendChild(document.createElement("li")),model:a});return("undefined"==typeof c.id||null===c.id)&&(c.id=a.id),c})},m=function(a){var b,c;b=document.createDocumentFragment(),c=l(a,b),k.add.apply(k,c),j.appendChild(b)},n=function(a){var b;b=k.get(a.id),b&&b.el.classList.remove("selected")},o=function(a){a.forEach(function(a){var b=k.get(a.id);b&&(k.remove(b),b.el.parentNode===j&&j.removeChild(b.el))})},p=function(){var a;k.data().forEach(function(a){a.destroy()}),a=l(g.data(),document.createDocumentFragment()),k.reset(a),b.render()},q=function(a){var b;b=k.get(a.id),b&&b.el.classList.add("selected")},b.destroy=f.compose(b.destroy,function(){g.off("render",b.render),g.off("add",m),g.off("remove",o),g.off("reset",p),g.off("select",q),g.off("deselect",n),h&&g.destroy(),k.data().forEach(function(a){a.destroy()}),k.destroy(),g=null,h=null,i=null,k=null,l=null,m=null,n=null,o=null,p=null,q=null,c=null,b=null}),b.getView=function(a){return k.get(a.id)},b.render=function(){var a=document.createDocumentFragment();k.data().forEach(function(b){a.appendChild(b.el)}),f.empty(j),j.appendChild(a)},c(a||{}),a=null,b};b.exports=g},{"../util/Util":"util/Util","./Collection":"mvc/Collection","./View":"mvc/View"}],"mvc/Collection":[function(a,b,c){"use strict";var d=a("../util/Events"),e=a("../util/Util"),f=function(a){var b,c,f,g,h,i;return b=d(),c=function(){f=a||[],g=null,h=null,a=null},i=function(a){return a&&a.silent===!0},b.add=function(){b.addAll(Array.prototype.slice.call(arguments,0))},b.addAll=function(a,c){f.push.apply(f,a),g=null,i(c)||b.trigger("add",a)},b.data=function(){return f},b.deselect=function(a){if(null!==h){var c=h;h=null,i(a)||b.trigger("deselect",c)}},b.destroy=e.compose(function(a){return f=null,g=null,h=null,i(a)||b.trigger("destroy"),a},b.destroy),b.get=function(a){var c=b.getIds();return c.hasOwnProperty(a)?f[c[a]]:null},b.getIds=function(a){var b,c=0,d=f.length;if(a||null===g)for(g={};d>c;c++){if(b=f[c].id,g.hasOwnProperty(b))throw'model with duplicate id "'+b+'" found in collection';g[b]=c}return g},b.getSelected=function(){return h},b.remove=function(){b.removeAll(Array.prototype.slice.call(arguments,0))},b.removeAll=function(a,c){var d,e,j=a.length,k=[],l=b.getIds();for(d=0;j>d;d++){if(e=a[d],e===h&&b.deselect(),!l.hasOwnProperty(e.id))throw"removing object not in collection";k.push(l[e.id])}for(k.sort(function(a,b){return a-b}),d=k.length-1;d>=0;d--)f.splice(k[d],1);g=null,i(c)||b.trigger("remove",a)},b.reset=function(a,c){var d=null;if(null!==h&&(d=h.id),f=null,g=null,h=null,f=a||[],c&&c.silent===!0||b.trigger("reset",a),null!==d){var i=b.get(d);null!==i&&(c=e.extend({},c,{reset:!0}),b.select(i,c))}},b.select=function(a,c){if(null===a)return void b.deselect();if(a!==h){if(null!==h&&b.deselect(c),a!==b.get(a.id))throw"selecting object not in collection";h=a,c&&c.silent===!0||b.trigger("select",h,c)}},b.selectById=function(a,c){var d=b.get(a);null!==d?b.select(d,c):b.deselect(c)},b.sort=function(a,c){f.sort(a),b.reset(f,c)},b.toJSON=function(){var a,b,c,d=f.slice(0);for(b=0,c=d.length;c>b;b++)a=d[b],"object"==typeof a&&null!==a&&"function"==typeof a.toJSON&&(d[b]=a.toJSON());return d},c(),b};b.exports=f},{"../util/Events":"util/Events","../util/Util":"util/Util"}],"mvc/DataTable":[function(a,b,c){"use strict";var d=a("./CollectionTable"),e=a("./DownloadView"),f=a("./SortView"),g=a("../util/Util"),h=a("./View"),i=function(a){var b,c,i,j,k,l,m,n,o,p;return b=h(a),c=function(){var c,h;c=b.el,c.innerHTML='<div class="datatable-tools"></div><div class="datatable-data"></div>',c.classList.add("datatable"),h=c.querySelector(".datatable-tools"),i=a.collection,k=a.columns,n=a.sorts,n&&(o=new f({collection:i,sorts:n,defaultSort:a.defaultSort}),h.appendChild(o.el)),j=new d(g.extend({},a,{el:c.querySelector(".datatable-data")})),m=new e({collection:i,help:a.help||"Copy then paste into a spreadsheet application",format:a.formatDownload||p}),l=document.createElement("button"),l.innerHTML="Download",l.className="download",l.addEventListener("click",m.show),h.appendChild(l),a=null},p=function(a){var b,c,d,e,f,g,h,i,j,l;for(d=[],f=a.data(),l=[],b=0,c=k.length;c>b;b++)e=k[b],l.push(e.title);for(d.push(l.join("	")),h=0,i=f.length;i>h;h++){for(j=f[h],l=[],b=0,c=k.length;c>b;b++)e=k[b],g=e.downloadFormat||e.format,l.push(g(j));d.push(l.join("	"))}return d.join("\n")},b.destroy=g.compose(function(){o&&(o.destroy(),o=null),l.removeEventListener("click",m.show),l=null,m.destroy(),m=null,j.destroy(),j=null},b.destroy),c(),b};b.exports=i},{"../util/Util":"util/Util","./CollectionTable":"mvc/CollectionTable","./DownloadView":"mvc/DownloadView","./SortView":"mvc/SortView","./View":"mvc/View"}],"mvc/DownloadView":[function(a,b,c){"use strict";var d=a("./ModalView"),e=a("../util/Util"),f=a("./View"),g={title:"Download",help:"",format:function(a){return JSON.stringify(a)}},h=function(a){var b,c,h,i,j,k,l;return a=e.extend({},g,a),b=f(a),c=function(){var c=b.el;h=a.collection,i=a.format,l=a.title,c.className="download-view",c.innerHTML='<div class="help">'+a.help+'</div><textarea class="download" readonly="readonly"></textarea>',k=c.querySelector(".download"),a=null},b.destroy=e.compose(function(){j&&(j.destroy(),j=null),h=null,i=null,k=null},b.destroy),b.render=function(){k.value=i(h)},b.show=function(){j||(j=new d(b.el,{title:l})),b.render(),j.show(),k.select()},c(),b};b.exports=h},{"../util/Util":"util/Util","./ModalView":"mvc/ModalView","./View":"mvc/View"}],"mvc/FileInputView":[function(a,b,c){"use strict";var d=a("mvc/Collection"),e=a("mvc/CollectionView"),f=a("mvc/ModalView"),g=a("mvc/Model"),h=a("mvc/View"),i=a("util/FileIO"),j=a("util/Message"),k=a("util/Util"),l=["B","KB","MB","GB"],m=["You may &ldquo;Browse&rdquo; for files, or drag-and-drop files using the ","area below. Once you have added files, you may preview them by clicking ","the blue file name. Preview behavior is browser-dependent. If you select ","a file with the same name more than once, then only the most recent ","selection will be used. Directories are not supported."].join(""),n={browseText:"Browse",cancelCallback:function(){},cancelText:"Cancel",cancelTooltip:"Cancel",dropzoneText:"Drag &amp; drop file(s) here&hellip;",intro:{text:m,classes:"alert info"},title:"File Input",uploadCallback:function(){},uploadText:"Upload",uploadTooltip:"Upload file(s)"},o=function(a){var b,c,d,e,f,g,i,j,m,n,o;return b=h(a),c=function(){d=a.collection,j(),i(),b.render()},i=function(){e.addEventListener("click",n)},j=function(){b.el.classList.add("file-view"),b.el.innerHTML=['<span class="file-view-label">','<a href="javascript:void(null);" target="_blank" ','class="file-view-name"></a>','<span class="file-view-size"></span>',"</span>",'<a href="javascript:void(null);" class="file-view-delete" ','title="Delete File">&times;</a>'].join(""),f=b.el.querySelector(".file-view-name"),g=b.el.querySelector(".file-view-size"),e=b.el.querySelector(".file-view-delete")},m=function(a){var b,c;for(b=0,c=0;a>1024&&c<l.length;)a/=1024,c++;return a-parseInt(a,10)!==0&&(b=1),a.toFixed(b)+l[c]},n=function(){d&&d.remove(b.model),b.destroy()},o=function(){e.removeEventListener("click",n)},b.destroy=k.compose(function(){o(),d=null,e=null,f=null,g=null,i=null,j=null,m=null,n=null,o=null,c=null,b=null},b.destroy),b.render=function(){var a;a=b.model.get("file"),f.innerHTML=a.name,f.setAttribute("title",a.name),f.setAttribute("href",b.model.get("url")),f.setAttribute("download",a.name),g.innerHTML="("+m(a.size)+")"},c(a),a=null,b},p=function(a){var b,c,l,m,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K;return b=h(a),c=function(a){a=k.extend({},n,a),p=d([]),u=i(),x=a.uploadCallback,m=a.cancelCallback,z(a),y(),w=f(b.el,{title:a.title,buttons:[{text:a.uploadText,title:a.uploadTooltip,callback:I},{text:a.cancelText,title:a.cancelTooltip,callback:C}],classes:["file-input"]})},y=function(){r.addEventListener("dragleave",D),r.addEventListener("dragover",E),r.addEventListener("drop",F),l.addEventListener("click",B),s.addEventListener("change",F)},z=function(a){var c;b.el.innerHTML=['<input type="file" class="file-input-input" multiple/>','<div class="file-input-dropzone">','<span class="file-input-dropzone-text">',a.dropzoneText,"</span>",'<button class="file-input-browse-button">',a.browseText,"</button>","</div>",'<div class="file-input-messages"></div>','<ul class="file-input-files no-style"></ul>'].join(""),a.intro&&(a.intro instanceof Node?c=a.intro:"string"==typeof a.intro?(c=document.createElement("div"),c.innerHTML=a.intro):(c=document.createElement("div"),c.innerHTML=a.intro.text||"",a.intro.classes&&(c.className=a.intro.classes)),c.classList.add("file-input-intro"),b.el.insertBefore(c,b.el.firstChild)),r=b.el.querySelector(".file-input-dropzone"),l=b.el.querySelector(".file-input-browse-button"),s=b.el.querySelector(".file-input-input"),t=b.el.querySelector(".file-input-files"),v=b.el.querySelector(".file-input-messages"),q=e({collection:p,el:t,factory:o})},A=function(a){try{u.read({file:a,success:H,error:G})}catch(b){J(b.message)}},B=function(){var a;s.click?s.click():(a=document.createEvent("HTMLEvents"),a.initEvent("click",!0,!0),s.dispatchEvent(a))},C=function(){m(),b.hide()},D=function(a){a.preventDefault(),r.classList.remove("drag-over")},E=function(a){a.preventDefault(),a.dataTransfer.dropEffect="copy",r.classList.add("drag-over")},F=function(a){var b,c;for(D(a),b=a.target.files||a.dataTransfer.files,c=0;c<b.length;c++)A(b[c]);s.value=""},G=function(a){var b;b=["An error occurred reading &ldquo;",a.file.name,"&rdquo;.","<br/>","<small>",a.error.message,"</small>"].join(""),J(b)},H=function(a){var b;a.id=a.file.name;try{b=p.get(a.id),b?(b.set(a),J("A file name &ldquo;"+a.file.name+"&rdquo; was already selected. That file has been replaced by this file. To load both files, please rename one of the files.","info")):p.add(g(a))}catch(c){J(c.message)}},I=function(){x(p.data().slice(0)),b.hide()},J=function(a,b){j({container:v,content:a,autoclose:!1,classes:[b||"error"]})},K=function(){r.removeEventListener("dragleave",D),r.removeEventListener("dragover",E),r.removeEventListener("drop",F),l.removeEventListener("click",B),s.removeEventListener("change",F)},b.destroy=k.compose(function(){K(),q.destroy(),p.destroy(),u.destroy(),w.destroy(),l=null,m=null,p=null,q=null,r=null,s=null,t=null,u=null,v=null,w=null,x=null,y=null,z=null,A=null,B=null,C=null,D=null,E=null,F=null,G=null,H=null,I=null,J=null,K=null,c=null,b=null},b.destroy),b.hide=function(){w.hide()},b.show=function(a){a&&(p.reset([]),v.innerHTML=""),w.show()},c(a),a=null,b};b.exports=p},{"mvc/Collection":"mvc/Collection","mvc/CollectionView":"mvc/CollectionView","mvc/ModalView":"mvc/ModalView","mvc/Model":"mvc/Model","mvc/View":"mvc/View","util/FileIO":"util/FileIO","util/Message":"util/Message","util/Util":"util/Util"}],"mvc/ModalView":[function(a,b,c){"use strict";var d=a("../util/Util"),e=a("./View"),f=!1,g=null,h=null,i=null,j={closable:!0,destroyOnHide:!1,title:document.title+" Says..."},k=function(){g=[],h=[],i=document.createElement("div"),i.classList.add("modal"),f=!0},l=function(a){this.info&&this.info.callback&&"function"==typeof this.info.callback&&this.info.callback(a,this.modal||{})},m=function(){var a;a=h.pop(),a&&a instanceof Node&&a.focus&&a.focus()},n=function(a,b){var c,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B;return b=d.extend({},j,b),c=e(b),n=function(){o=b.buttons,p=b.classes,q=b.closable,t=b.destroyOnHide,v=a,w=b.title,c.el.modal=c,z(),c.render(),f||k(),b=null},y=function(a){var b,e,f,g=document.createElement("button");for(f=d.extend({},{classes:[],text:"Click Me",title:"",callback:function(){}},a),b=0,e=f.classes.length;e>b;b++)g.classList.add(f.classes[b]);return g.innerHTML=f.text,""!==f.title&&g.setAttribute("title",f.title),g.modal=c,g.info=f,f.callback&&g.addEventListener("click",l),g},z=function(){var a,b,e;if(d.empty(c.el),c.el.classList.add("modal-dialog"),p&&p.length>0)for(b=0,e=p.length;e>b;b++)c.el.classList.add(p[b]);w?(a=c.el.appendChild(document.createElement("header")),a.classList.add("modal-header"),x=a.appendChild(document.createElement("h3")),x.setAttribute("tabIndex","-1"),x.classList.add("modal-title"),q&&(r=a.appendChild(document.createElement("span")),r.classList.add("modal-close-link"),r.setAttribute("title","Cancel"),r.innerHTML="&times;",r.addEventListener("click",c.hide))):c.el.classList.add("no-header"),s=c.el.appendChild(document.createElement("section")),s.setAttribute("tabIndex","-1"),s.classList.add("modal-content"),o&&o.length?(u=c.el.appendChild(document.createElement("footer")),u.classList.add("modal-footer")):c.el.classList.add("no-footer")},A=function(a){27===a.keyCode&&c.hide()},B=function(a){"modal"===a.target.className&&c.hide()},c.destroy=function(){var a;if(i.removeEventListener("click",c.hide),o&&o.length)for(;u.childNodes.length>0;)a=u.firstChild,a.removeEventListener("click",l),u.removeChild(a);r&&(r.removeEventListener("click",c.hide),r=null),delete c.el.modal,u=null,x=null,s=null,t=null,c.el=null,B=null},c.hide=function(a){var b;return b=c.el.parentNode===i,a===!0?(d.empty(i),g.splice(0,g.length),h.splice(1,h.length),m(),b&&(c.trigger("hide",c),t&&c.destroy())):b&&(c.el.parentNode.removeChild(c.el),g.length>0&&g.pop().show(),m(),c.trigger("hide",c),t&&c.destroy()),!i.firstChild&&i.parentNode&&(i.parentNode.removeChild(i),i.removeEventListener("click",B),document.body.classList.remove("backgroundScrollDisable"),window.removeEventListener("keydown",A)),c},c.render=function(a){var b,e=a||v,f=null,g=o||[],h=g.length;if(d.empty(s),"string"==typeof e)s.innerHTML=e;else{if("function"==typeof e)return c.render(e(c));e instanceof Node&&s.appendChild(e)}if(w&&(x.innerHTML=w),o&&o.length)for(;u.childNodes.length>0;)f=u.firstChild,d.removeEvent(f,"click",l),u.removeChild(f);for(b=0;h>b;b++)u.appendChild(y(g[b]));return c.trigger("render",c),c},c.setMessage=function(a){return v=a,c.trigger("message",c),c},c.setOptions=function(b,e){return e&&(b=d.extend({},{buttons:o,classes:p,closable:q,message:v,title:w},b)),o=b.buttons,p=b.classes,q=b.closable,v=a,w=b.title,c.trigger("options",c),c},c.show=function(){var a=null;for(h.push(document.activeElement||!1);i.firstChild;)a=i.firstChild,a.modal&&g.push(a.modal),i.removeChild(a);return i.appendChild(c.el),i.addEventListener("click",B),i.parentNode||(document.body.appendChild(i),document.body.classList.add("backgroundScrollDisable"),window.addEventListener("keydown",A)),w?x.focus():s.focus(),c.trigger("show",c),c},n(),c};b.exports=n},{"../util/Util":"util/Util","./View":"mvc/View"}],"mvc/Model":[function(a,b,c){"use strict";var d=a("../util/Events"),e=a("../util/Util"),f=function(a){var b,c,f;return b=d(),c=function(){f=e.extend({},a),a&&a.hasOwnProperty("id")&&(b.id=a.id),a=null},b.get=function(a){return"undefined"==typeof a?f:f.hasOwnProperty(a)?f[a]:null},b.set=function(a,c){var d,g={},h=!1;for(d in a)f.hasOwnProperty(d)&&f[d]===a[d]||(g[d]=a[d],h=!0);if(f=e.extend(f,a),a&&a.hasOwnProperty("id")&&(b.id=a.id),!(c&&c.hasOwnProperty("silent")&&c.silent)&&(h||c&&c.hasOwnProperty("force")&&c.force)){for(d in g)b.trigger("change:"+d,g[d]);b.trigger("change",g)}},b.toJSON=function(){var a,b,c=e.extend({},f);for(a in c)b=c[a],"object"==typeof b&&null!==b&&"function"==typeof b.toJSON&&(c[a]=b.toJSON());return c},c(),b};b.exports=f},{"../util/Events":"util/Events","../util/Util":"util/Util"}],"mvc/SelectView":[function(a,b,c){"use strict";var d=a("../util/Util"),e=a("./View"),f=0,g={includeBlankOption:!1,blankOption:{value:"-1",text:"Please select&hellip;"}},h=function(a){var b,c,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v;return a=d.extend({},g,a),b=e(a),c=function(){i=a.collection||null,h=a.blankOption,k=a.includeBlankOption,b.el=a.el||document.createElement("select"),j="selectview-"+f+"-",f+=1,l="SELECT"===b.el.nodeName?b.el:b.el.appendChild(document.createElement("select")),l.classList.add("view-selectview"),i&&(i.on("add",q,b),i.on("remove",s,b),i.on("reset",t,b),i.on("select",u,b),i.on("deselect",r,b)),l.addEventListener("change",v),b.render(),a=null},n=function(a){return["<option ",'id="',o(a),'" ','value="',a.get("value"),'">',a.get("display"),"</option>"].join("")},m=function(){return["<option ",'value="',h.value,'">',h.text,"</option>"].join("")},o=function(a){return j+a.get("id")},p=function(a){return a.id.replace(j,"")},q=function(){b.render()},r=function(a){var b=l.querySelector("#"+o(a));b&&b.removeAttribute("selected"),k&&(b=l.querySelector('[value="'+h.value+'"]'),b&&b.setAttribute("selected","selected"))},s=function(){b.render()},t=function(){b.render()},u=function(a){var b=l.querySelector("#"+o(a));b&&b.setAttribute("selected","selected")},v=function(){var a=l.selectedIndex,b=l.childNodes[a],c=p(b);k&&l.value===h.value?i.deselect():i.select(i.get(c))},b.render=function(){var a=null,b=null,c=null,d=null,e=[];if(!i)return void(l.innerHTML="");if(b=i.data(),!b)return void(l.innerHTML="");for(b=b.slice(0),c=b.length,k===!0&&e.push(m()),a=0;c>a;a++)e.push(n(b[a]));l.innerHTML=e.join(""),d=i.getSelected(),d&&u(d)},c(),b};b.exports=h},{"../util/Util":"util/Util","./View":"mvc/View"}],"mvc/SortView":[function(a,b,c){"use strict";var d=a("./Collection"),e=a("./CollectionSelectBox"),f=a("../util/Util"),g=a("./View"),h=function(a){var b,c,h,i,j,k,l;return b=g(a),c=function(){var c=b.el;h=a.collection,c.innerHTML="<label>Sort by <select></select></label>",c.classList.add("sortview"),j=new d(a.sorts),j.on("select",l,this),a.defaultSort?j.select(j.get(a.defaultSort)):j.select(j.data()[0]),i=new e({el:c.querySelector("select"),collection:j,format:function(a){return a.title}}),a=null},k=function(a,b){var c={};return function(d,e){var f,g=c[d.id],h=c[e.id];return g||(g=c[d.id]=a(d)),h||(h=c[e.id]=a(e)),b&&(f=h,h=g,g=f),h>g?-1:g>h?1:0}},l=function(){var a,b=j.getSelected();b&&(a=b.sort,a||(a=k(b.sortBy,b.descending)),h.sort(a))},b.destroy=f.compose(function(){j.off("select",l,this),j=null,h=null,i.destroy()},b.destroy),c(),b};b.exports=h},{"../util/Util":"util/Util","./Collection":"mvc/Collection","./CollectionSelectBox":"mvc/CollectionSelectBox","./View":"mvc/View"}],"mvc/View":[function(a,b,c){"use strict";var d=a("./Model"),e=a("../util/Events"),f=a("../util/Util"),g={},h=function(a){var b,c,h;return b=e(),c=function(a){a=f.extend({},g,a),b.el=a&&a.hasOwnProperty("el")?a.el:document.createElement("div"),b.model=a.model,b.model||(b.model=d({}),h=!0),b.model.on("change","render",b)},b.render=function(){},b.destroy=f.compose(function(){b.model.off("change","render",b),h&&b.model.destroy(),h=null,b.model=null,b.el=null},b.destroy),c(a),a=null,b};b.exports=h},{"../util/Events":"util/Events","../util/Util":"util/Util","./Model":"mvc/Model"}],"util/Events":[function(a,b,c){"use strict";var d=null,e=function(a){return"string"==typeof a||a instanceof String},f=function(){var a,b,c;return a={},b=function(){c={}},a.destroy=function(){b=null,c=null,a=null},a.off=function(a,b,d){var e;if("undefined"==typeof a)c=null,c={};else if("undefined"==typeof b)delete c[a];else{var f=null;for(e=c[a].length-1;e>=0&&(f=c[a][e],f.callback!==b||d&&f.context!==d||(c[a].splice(e,1),!d));e--);0===c[a].length&&delete c[a],f=null}},a.on=function(a,b,d){if(!(b||!b.apply||d&&e(b)&&d[b].apply))throw new Error("Callback parameter is not callable.");c.hasOwnProperty(a)||(c[a]=[]),c[a].push({callback:b,context:d})},a.trigger=function(a){var b,d,f,g,h;if(c.hasOwnProperty(a))for(b=Array.prototype.slice.call(arguments,1),h=c[a].slice(0),d=0,f=h.length;f>d;d++)g=h[d],e(g.callback)?g.context[g.callback].apply(g.context,b):g.callback.apply(g.context,b)},b(),a};d=f(),f.on=function(){return d.on.apply(d,arguments)},f.off=function(){return d.off.apply(d,arguments)},f.trigger=function(){return d.trigger.apply(d,arguments)};var g=function(a){f.trigger("hashchange",a)};if("onhashchange"in window)window.addEventListener&&window.addEventListener("hashchange",g,!1);else{var h=document.location.hash;setInterval(function(){h!==document.location.hash&&(h=document.location.hash,g({type:"hashchange",newURL:document.location.hash,oldURL:h}))},300)}b.exports=f},{}],"util/FileIO":[function(a,b,c){"use strict";var d=a("util/Util"),e={maxFileSize:209715200},f=function(a){var b,c,f,g;return b={read:null,write:null},c=function(a){a=d.extend({},e,a),f=a.maxFileSize},g=function(a){var b,c;return b=a.reader,a.hasOwnProperty("url")?a.method&&"function"==typeof b[a.method]?b[a.method]:(c=a.file.type,-1!==c.indexOf("text")||-1!==c.indexOf("txt")||"application/xml"===c||"application/json"===c?b.readAsText:b.readAsBinaryString):b.readAsDataURL},b.destroy=function(){f=null,g=null,c=null,b=null},b.read=function(a){var c,d,e,h,i;if(!a||!a.file)throw new Error("Parameters are required for reading.");if(a.file.size>f)throw new Error("File size is too large.");i=a.reader=new FileReader,c=g(a),h=function(){a.success&&(i.removeEventListener("load",e),e=null),a.error&&(i.removeEventListener("error",d),d=null),i.removeEventListener("loadend",h),h=null,i=null},i.addEventListener("loadend",h),e=function(){a.url?a.success&&a.success({file:a.file,content:i.result,method:c.name,url:a.url}):(a.url=i.result,b.read(a))},i.addEventListener("load",e),a.error&&(d=function(){a.error({error:i.error,file:a.file,result:i.result})},i.addEventListener("error",d)),c.call(i,a.file)},b.write=function(a){var b,c;if(!a||!a.content)throw new Error("Parameters are required for writing.");b=new Blob([a.content],{type:a.type||"text/plain"}),window.navigator&&window.navigator.msSaveOrOpenBlob?window.navigator.msSaveOrOpenBlob(b,a.name||"download"):(c=window.URL.createObjectURL(b),window.open(c,a.name||"download"),window.URL.revokeObjectURL(c))},c(a),a=null,b};b.exports=f},{"util/Util":"util/Util"}],"util/Message":[function(a,b,c){"use strict";var d=a("./Events"),e=0,f=function(){return"hazdev-webutils-message-"+e++},g=function(a){var b,c,e,g,h,i,j,k,l,m,n,o,p,q;return b=d(),c=function(a){l=f(),j=a.container||document.body,k=a.content||"Something just happened...",e=parseInt(a.autoclose,10)||0,g=["alert","webutils-message"].concat(a.classes||[]),h=a.closeable||!0,m=a.insertBefore||!1,q()},o=function(){return i=document.createElement("button"),i.setAttribute("href","#"),i.setAttribute("tabindex","0"),i.setAttribute("aria-label","Close Alert"),i.setAttribute("aria-controls",l),i.classList.add("webutils-message-close"),i.innerHTML="&times;",i.addEventListener("click",p),i},p=function(a){return b.hide(!0),a.preventDefault()},q=function(){n=document.createElement("div"),n.setAttribute("id",l),n.setAttribute("role","alert"),n.setAttribute("aria-live","polite"),n.innerHTML=k,g.forEach(function(a){n.classList.add(a)}),h&&(n.classList.add("webutils-message-closeable"),n.appendChild(o())),e&&window.setTimeout(b.hide,e),j&&(m&&j.firstChild?j.insertBefore(n,j.firstChild):j.appendChild(n))},b.hide=function(a){n.classList.add("invisible"),window.setTimeout(function(){n.parentNode&&n.parentNode.removeChild(n),b.trigger("hide",{userTriggered:a}),b.destroy()},262)},b.destroy=function(){i&&i.removeEventListener("click",p),e=null,g=null,h=null,i=null,j=null,k=null,l=null,m=null,n=null,o=null,p=null,q=null,c=null,b=null},c(a),a=null,b};b.exports=g},{"./Events":"util/Events"}],"util/Util":[function(a,b,c){"use strict";var d=!1,e=!1,f=function(){};f.isMobile=function(){return d},f.supportsDateInput=function(){return e},f.extend=function(a){var b,c,d,e;for(b=1,c=arguments.length;c>b;b++)if(d=arguments[b])for(e in d)a[e]=d[e];return a},f.equals=function(a,b){var c,d;if(a===b)return!0;if(null===a||null===b)return!1;if("object"==typeof a&&"object"==typeof b){for(c in a)if(a.hasOwnProperty(c)&&!b.hasOwnProperty(c))return!1;for(d in b)if(b.hasOwnProperty(d)){if(!a.hasOwnProperty(d))return!1;if(!f.equals(a[d],b[d]))return!1}return!0}return a===b},f.getEvent=function(a){var b;return a||(a=window.event),a.target?b=a.target:a.srcElement&&(b=a.srcElement),3===b.nodeType&&(b=b.parentNode),{target:b,originalEvent:a}},f.getParentNode=function(a,b,c){for(var d=a;d&&d!==c&&d.nodeName.toUpperCase()!==b.toUpperCase();)d=d.parentNode;return d&&"nodeName"in d&&d.nodeName.toUpperCase()===b.toUpperCase()?d:null},f.empty=function(a){for(;a.firstChild;)a.removeChild(a.firstChild)},f.detach=function(a){a.parentNode&&a.parentNode.removeChild(a)},f.getWindowSize=function(){var a={width:null,height:null};if("innerWidth"in window&&"innerHeight"in window)a={width:window.innerWidth,height:window.innerHeight};else{var b="documentElement"in document?document.documentElement:document.body;a={width:b.offsetWidth,height:b.offsetHeight}}return a},f.compose=function(){var a=arguments;return function(b){var c,d,e;for(c=0,e=a.length;e>c;c++)d=a[c],d&&d.call&&(b=d.call(this,b));return b}},f.contains=function(a,b){var c,d;for(c=0,d=a.length;d>c;c++)if(b===a[c])return!0;return!1},f.isArray=function(a){return"function"==typeof Array.isArray?Array.isArray(a):"[object Array]"===Object.prototype.toString.call(a)},f.loadScript=function(a,b){var c,d,e,g,h;b=f.extend({},{success:null,error:null,done:null},b),c=function(){h.removeEventListener("load",g),h.removeEventListener("error",e),h.parentNode.removeChild(h),c=null,g=null,e=null,h=null},d=function(){null!==b.done&&b.done(),b=null},e=function(){c(),null!==b.error&&b.error.apply(null,arguments),d()},g=function(){c(),null!==b.success&&b.success.apply(null,arguments),d()},h=document.createElement("script"),h.addEventListener("load",g),h.addEventListener("error",e),h.src=a,h.async=!0,document.querySelector("script").parentNode.appendChild(h)},function(){var a=document.createElement("div"),b=document.createElement("input"),c=navigator.userAgent||navigator.vendor||window.opera;d=c.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i),b.setAttribute("type","date"),e="text"!==b.type,a=null}(),b.exports=f},{}],"util/Xhr":[function(a,b,c){"use strict";var d,e,f,g,h,i=a("./Util"),j=0,k={url:null,success:null,error:null,done:null,data:null,callbackName:null,callbackParameter:"callback"},l={url:null,success:null,error:null,done:null,method:"GET",headers:null,data:null,rawdata:null};d=function(a){var b,c,d,e,f;if(a=i.extend({},l,a),e=a.url,a.restrictOrigin&&(e=g(e)),c=a.rawdata,null!==a.data&&(d=h(a.data),"GET"===a.method?e=e+"?"+d:(c=d,null===a.headers&&(a.headers={}),a.headers["Content-Type"]="application/x-www-form-urlencoded")),f=new XMLHttpRequest,f.onreadystatechange=function(){var b,c;4===f.readyState&&(200===f.status?null!==a.success&&(b=f.response,c=f.getResponseHeader("Content-Type"),c&&-1!==c.indexOf("json")&&(b=JSON.parse(b)),a.success(b,f)):null!==a.error&&a.error(f.status,f),null!==a.done&&a.done(f))},f.open(a.method,e,!0),null!==a.headers)for(b in a.headers)f.setRequestHeader(b,a.headers[b]);f.send(c)},e=function(){return"_xhr_callback_"+(new Date).getTime()+"_"+ ++j},f=function(a){var b,c,d;a=i.extend({},k,a),d=a.url,b=i.extend({},a.data),c=a.callbackName||e(),b[a.callbackParameter]=c,d+=(-1===d.indexOf("?")?"?":"&")+h(b),window[c]=function(){a.success.apply(null,arguments)},i.loadScript(d,{error:a.error,done:function(){window[c]=null,delete window[c],null!==a.done&&a.done()}})},g=function(a){var b,c;return b=document.createElement("a"),b.setAttribute("href",a),c=b.pathname,0!==a.indexOf("http")&&0!==a.indexOf("/")||0===c.indexOf("/")||(c="/"+c),c},h=function(a){var b,c,d,e,f,g;b=[];for(c in a)if(d=encodeURIComponent(c),e=a[c],e instanceof Array)for(f=0,g=e.length;g>f;f++)b.push(d+"="+encodeURIComponent(e[f]));else b.push(d+"="+encodeURIComponent(e));return b.join("&")},b.exports={ajax:d,getCallbackName:e,jsonp:f,restrictOrigin:g,urlEncode:h}},{"./Util":"util/Util"}]},{},[]);