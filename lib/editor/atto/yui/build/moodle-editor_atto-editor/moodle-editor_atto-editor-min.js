YUI.add("moodle-editor_atto-editor",function(e,t){function i(){i.superclass.constructor.apply(this,arguments)}function a(){}function f(){}function p(){}function d(){}function v(){}function m(){}function g(){}function y(){}function b(){}var n="moodle-editor_atto-editor",r={CONTENT:"editor_atto_content",CONTENTWRAPPER:"editor_atto_content_wrap",TOOLBAR:"editor_atto_toolbar",WRAPPER:"editor_atto",HIGHLIGHT:"highlight"};e.extend(i,e.Base,{BLOCK_TAGS:["address","article","aside","audio","blockquote","canvas","dd","div","dl","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","noscript","ol","output","p","pre","section","table","tfoot","ul","video"],PLACEHOLDER_CLASS:"atto-tmp-class",ALL_NODES_SELECTOR:"[style],font[face]",FONT_FAMILY:"fontFamily",_wrapper:null,editor:null,textarea:null,textareaLabel:null,plugins:null,_eventHandles:null,initializer:function(){var t;this.textarea=e.one(document.getElementById(this.get("elementid")));if(!this.textarea)return;this._eventHandles=[],this._wrapper=e.Node.create('<div class="'+r.WRAPPER+'" />'),t=e.Handlebars.compile('<div id="{{elementid}}editable" contenteditable="true" role="textbox" spellcheck="true" aria-live="off" class="{{CSS.CONTENT}}" />'),this.editor=e.Node.create(t({elementid:this.get("elementid"),CSS:r})),this.textareaLabel=e.one('[for="'+this.get("elementid")+'"]'),this.textareaLabel&&(this.textareaLabel.generateID(),this.editor.setAttribute("aria-labelledby",this.textareaLabel.get("id"))),this.setupToolbar();var n=e.Node.create('<div class="'+r.CONTENTWRAPPER+'" />');n.appendChild(this.editor),this._wrapper.appendChild(n),this.editor.setStyle("minHeight",20*this.textarea.getAttribute("rows")+8+"px"),e.UA.ie===0&&this.editor.setStyle("height",20*this.textarea.getAttribute("rows")+8+"px"),this.disableCssStyling(),document.queryCommandSupported("DefaultParagraphSeparator")&&document.execCommand("DefaultParagraphSeparator",!1,"p"),this.textarea.get("parentNode").insert(this._wrapper,this.textarea),this.textarea.hide(),this.updateFromTextArea(),this.publishEvents(),this.setupSelectionWatchers(),this.setupAutomaticPolling(),this.setupPlugins(),this.setupAutosave(),this.setupNotifications()},focus:function(){return this.editor.focus(),this},publishEvents:function(){return this.publish("change",{broadcast:!0,preventable:!0}),this.publish("pluginsloaded",{fireOnce:!0}),this.publish("atto:selectionchanged",{prefix:"atto"}),this},setupAutomaticPolling:function(){return this._registerEventHandle(this.editor.on(["keyup","paste","cut"],this.updateOriginal,this)),this},setupPlugins:function(){this.plugins={};var t=this.get("plugins"),n,r,i,s,o;for(n in t){r=t[n];if(!r.plugins)continue;for(i in r.plugins){s=r.plugins[i],o=e.mix({name:s.name,group:r.group,editor:this.editor,toolbar:this.toolbar,host:this},s);if(typeof e.M["atto_"+s.name]=="undefined")continue;this.plugins[s.name]=new e.M["atto_"+s.name].Button(o)}}return this.fire("pluginsloaded"),this},enablePlugins:function(e){this._setPluginState(!0,e)},disablePlugins:function(e){this._setPluginState(!1,e)},_setPluginState:function(t,n){var r="disableButtons";t&&(r="enableButtons"),n?this.plugins[n][r]():e.Object.each(this.plugins,function(e){e[r]()},this)},_registerEventHandle:function(e){this._eventHandles.push(e)}},{NS:"editor_atto",ATTRS:{elementid:{value:null,writeOnce:!0},contextid:{value:null,writeOnce:!0},plugins:{value:{},writeOnce:!0}}}),e.augment(i,e.EventTarget),e.namespace("M.editor_atto").Editor=i,e.namespace("M.editor_atto.Editor").init=function(t){return new e.M.editor_atto.Editor(t)};var s="moodle-editor_atto-editor-notify",o="info",u="warning";a.ATTRS={},a.prototype={messageOverlay:null,hideTimer:null,setupNotifications:function(){var e=new Image,t=new Image;return e.src=M.util.image_url("i/warning","moodle"),t.src=M.util.image_url("i/info","moodle"),this},showMessage:function(t,n,r){var i="",s,a;return this.messageOverlay===null&&(this.messageOverlay=e.Node.create('<div class="editor_atto_notification"></div>'),this.messageOverlay.hide(!0),this.textarea.get("parentNode").append(this.messageOverlay),this.messageOverlay.on("click",function(){this.messageOverlay.hide(!0)},this)),this.hideTimer!==null&&this.hideTimer.cancel(),n===u?i='<img src="'+M.util.image_url("i/warning","moodle")+'" alt="'+M.util.get_string("warning","moodle")+'"/>':n===o&&(i='<img src="'+M.util.image_url("i/info","moodle")+'" alt="'+M.util.get_string("info","moodle")+'"/>'),s=parseInt(r,10),s<=0&&(s=6e4),n="atto_"+n,a=e.Node.create('<div class="'+n+'" role="alert" aria-live="assertive">'+i+" "+e.Escape.html(t)+"</div>"),this.messageOverlay.empty(),this.messageOverlay.append(a),this.messageOverlay.show(!0),this.hideTimer=e.later(s,this,function(){this.hideTimer=null,this.messageOverlay.hide(!0)}),this}},e.Base.mix(e.M.editor_atto.Editor,[a]),f.ATTRS={},f.prototype={_getEmptyContent:function(){return e.UA.ie&&e.UA.ie<10?"<p></p>":"<p><br></p>"},updateFromTextArea:function(){this.editor.setHTML(""),this.editor.append(this.textarea.get("value")),this.cleanEditorHTML(),this.editor.getHTML()===""&&this.editor.setHTML(this._getEmptyContent())},updateOriginal:function(){var e=this.textarea.get("value"),t=this.getCleanHTML();return t===""&&this.isActive()&&(t=this._getEmptyContent()),e!==t&&(this.textarea.set("value",t),this.textarea.simulate("change"),this.fire("change")),this}},e.Base.mix(e.M.editor_atto.Editor,[f]);var l=5e3,c=6e4,h="moodle-editor_atto-editor-autosave";p.ATTRS={autosaveEnabled:{value:!0,writeOnce:!0},autosaveFrequency:{value:60,writeOnce:!0},pageHash:{value:"",writeOnce:!0},autosaveAjaxScript:{value:"/lib/editor/atto/autosave-ajax.php",readOnly:!0}},p.prototype={lastText:null,autosaveInstance:null,setupAutosave:function(){var t=-1,n=null,r=this.get("filepickeroptions");if(!this.get("autosaveEnabled"))return;this.autosaveInstance=e.stamp(this);for(n in r)typeof r[n].itemid!="undefined"&&(t=r[n].itemid);url=M.cfg.wwwroot+this.get("autosaveAjaxScript"),params=
{sesskey:M.cfg.sesskey,contextid:this.get("contextid"),action:"resume",drafttext:"",draftid:t,elementid:this.get("elementid"),pageinstance:this.autosaveInstance,pagehash:this.get("pageHash")},e.io(url,{method:"POST",data:params,context:this,on:{success:function(e,t){typeof t.responseText!="undefined"&&t.responseText!==""&&(response_json=JSON.parse(t.responseText),response_json.error||typeof response_json.result=="undefined"?this.showMessage(M.util.get_string("errortextrecovery","editor_atto"),u,c):response_json!==this.textarea.get("value")&&this.recoverText(response_json.result),this._fireSelectionChanged())},failure:function(){this.showMessage(M.util.get_string("errortextrecovery","editor_atto"),u,c)}}});var i=parseInt(this.get("autosaveFrequency"),10)*1e3;return e.later(i,this,this.saveDraft,!1,!0),this.textarea.ancestor("form").on("submit",this.resetAutosave,this),this},resetAutosave:function(){return url=M.cfg.wwwroot+this.get("autosaveAjaxScript"),params={sesskey:M.cfg.sesskey,contextid:this.get("contextid"),action:"reset",elementid:this.get("elementid"),pageinstance:this.autosaveInstance,pagehash:this.get("pageHash")},e.io(url,{method:"POST",data:params,sync:!0}),this},recoverText:function(e){return this.editor.setHTML(e),this.saveSelection(),this.updateOriginal(),this.lastText=e,this.showMessage(M.util.get_string("textrecovered","editor_atto"),o,c),this},saveDraft:function(){this.editor.get("hidden")||this.updateOriginal();var t=this.textarea.get("value");if(t!==this.lastText){url=M.cfg.wwwroot+this.get("autosaveAjaxScript"),params={sesskey:M.cfg.sesskey,contextid:this.get("contextid"),action:"save",drafttext:t,elementid:this.get("elementid"),pagehash:this.get("pageHash"),pageinstance:this.autosaveInstance};var n=function(e,t){var n=parseInt(this.get("autosaveFrequency"),10)*1e3;this.showMessage(M.util.get_string("autosavefailed","editor_atto"),u,n)};e.io(url,{method:"POST",data:params,context:this,on:{error:n,failure:n,success:function(r,i){i.response!==""?e.soon(e.bind(n,this,[r,i])):(this.lastText=t,this.showMessage(M.util.get_string("autosavesucceeded","editor_atto"),o,l))}}})}return this}},e.Base.mix(e.M.editor_atto.Editor,[p]),d.ATTRS={},d.prototype={getCleanHTML:function(){var t=this.editor.cloneNode(!0),n;return e.each(t.all('[id^="yui"]'),function(e){e.removeAttribute("id")}),t.all(".atto_control").remove(!0),n=t.get("innerHTML"),n==="<p></p>"||n==="<p><br></p>"?"":this._cleanHTML(n)},cleanEditorHTML:function(){var e=this.editor.get("innerHTML");return this.editor.set("innerHTML",this._cleanHTML(e)),this},_cleanHTML:function(e){var t=[{regex:/<!--[\s\S]*?-->/gi,replace:""},{regex:/<\\?\?xml[^>]*>/gi,replace:""},{regex:/<\/?\w+:[^>]*>/gi,replace:""},{regex:/\s*MSO[-:][^;"']*;?/gi,replace:""},{regex:/<span[^>]*>(&nbsp;|\s)*<\/span>/gi,replace:""},{regex:/class="Mso[^"]*"/gi,replace:""},{regex:/<(\/?title|\/?meta|\/?style|\/?st\d|\/?head|\/?font|\/?html|\/?body|!\[)[^>]*?>/gi,replace:""},{regex:new RegExp(String.fromCharCode(8220),"gi"),replace:'"'},{regex:new RegExp(String.fromCharCode(8216),"gi"),replace:"'"},{regex:new RegExp(String.fromCharCode(8217),"gi"),replace:"'"},{regex:new RegExp(String.fromCharCode(8211),"gi"),replace:"-"},{regex:new RegExp(String.fromCharCode(8212),"gi"),replace:"--"},{regex:new RegExp(String.fromCharCode(189),"gi"),replace:"1/2"},{regex:new RegExp(String.fromCharCode(188),"gi"),replace:"1/4"},{regex:new RegExp(String.fromCharCode(190),"gi"),replace:"3/4"},{regex:new RegExp(String.fromCharCode(169),"gi"),replace:"(c)"},{regex:new RegExp(String.fromCharCode(174),"gi"),replace:"(r)"},{regex:new RegExp(String.fromCharCode(8230),"gi"),replace:"..."}],n=0;for(n=0;n<t.length;n++)e=e.replace(t[n].regex,t[n].replace);return e}},e.Base.mix(e.M.editor_atto.Editor,[d]),v.ATTRS={},v.prototype={toolbar:null,openMenus:null,setupToolbar:function(){return this.toolbar=e.Node.create('<div class="'+r.TOOLBAR+'" role="toolbar" aria-live="off"/>'),this.openMenus=[],this._wrapper.appendChild(this.toolbar),this.textareaLabel&&this.toolbar.setAttribute("aria-labelledby",this.textareaLabel.get("id")),this.setupToolbarNavigation(),this}},e.Base.mix(e.M.editor_atto.Editor,[v]),m.ATTRS={},m.prototype={_tabFocus:null,setupToolbarNavigation:function(){return this._wrapper.delegate("key",this.toolbarKeyboardNavigation,"down:37,39","."+r.TOOLBAR,this),this._wrapper.delegate("focus",function(e){this._setTabFocus(e.currentTarget)},"."+r.TOOLBAR+" button",this),this},toolbarKeyboardNavigation:function(e){e.preventDefault();var t=this.toolbar.all("button"),n=1,r,i=e.target.ancestor("button",!0);e.keyCode===37&&(n=-1),r=this._findFirstFocusable(t,i,n),r&&(r.focus(),this._setTabFocus(r))},_findFirstFocusable:function(e,t,n){var r=0,i,s,o,u;u=e.indexOf(t),u<-1&&(u=0);while(r<e.size()){u+=n,u<0?u=e.size()-1:u>=e.size()&&(u=0),s=e.item(u),r++;if(s.hasAttribute("hidden")||s.hasAttribute("disabled"))continue;i=s.ancestor(".atto_group");if(i.hasAttribute("hidden"))continue;o=s;break}return o},checkTabFocus:function(){return this._tabFocus&&(this._tabFocus.hasAttribute("disabled")||this._tabFocus.hasAttribute("hidden")||this._tabFocus.ancestor(".atto_group").hasAttribute("hidden"))&&(button=this._findFirstFocusable(this.toolbar.all("button"),this._tabFocus,-1),button&&(this._tabFocus.compareTo(document.activeElement)&&button.focus(),this._setTabFocus(button))),this},_setTabFocus:function(e){return this._tabFocus&&this._tabFocus.setAttribute("tabindex","-1"),this._tabFocus=e,this._tabFocus.setAttribute("tabindex",0),this.toolbar.setAttribute("aria-activedescendant",this._tabFocus.generateID()),this}},e.Base.mix(e.M.editor_atto.Editor,[m]),g.ATTRS={},g.prototype={_selections:null,_lastSelection:null,_focusFromClick:!1,setupSelectionWatchers:function(){return this.on("atto:selectionchanged",this.saveSelection,this),this.editor.on("focus",this.restoreSelection,this),this.editor.on("mousedown",function(){this._focusFromClick=!0},this),this.editor.on("blur",function(){this._focusFromClick=!1,this
.updateOriginal()},this),e.delegate(["keyup","focus"],function(t){e.soon(e.bind(this._hasSelectionChanged,this,t))},document.body,"#"+this.editor.get("id"),this),e.delegate("gesturemoveend",function(t){e.soon(e.bind(this._hasSelectionChanged,this,t))},document.body,"#"+this.editor.get("id"),{standAlone:!0},this),this},isActive:function(){var t=rangy.createRange(),n=rangy.getSelection();return n.rangeCount?!document.activeElement||e.one(document.activeElement)!==this.editor?!1:(t.selectNode(this.editor.getDOMNode()),t.intersectsRange(n.getRangeAt(0))):!1},getSelectionFromNode:function(e){var t=rangy.createRange();return t.selectNode(e.getDOMNode()),[t]},saveSelection:function(){this.isActive()&&(this._selections=this.getSelection())},restoreSelection:function(){this._focusFromClick||this._selections&&this.setSelection(this._selections),this._focusFromClick=!1},getSelection:function(){return rangy.getSelection().getAllRanges()},selectionContainsNode:function(e){return rangy.getSelection().containsNode(e.getDOMNode(),!0)},selectionFilterMatches:function(e,t,n){typeof n=="undefined"&&(n=!0),t||(t=this.getSelectedNodes());var r=t.size()>0,i=!1,s=this.editor,o=function(e){return e===s};return s.one(e)?(t.each(function(t){if(n){if(!r||!t.ancestor(e,!0,o))r=!1}else!i&&t.ancestor(e,!0,o)&&(i=!0)},this),n?r:i):!1},getSelectedNodes:function(){var t=new e.NodeList,n,r,i,s,o;r=rangy.getSelection(),r.rangeCount?i=r.getRangeAt(0):i=rangy.createRange(),i.collapsed&&i.commonAncestorContainer!==this.editor.getDOMNode()&&i.commonAncestorContainer!==e.config.doc&&(i=i.cloneRange(),i.selectNode(i.commonAncestorContainer)),n=i.getNodes();for(o=0;o<n.length;o++)s=e.one(n[o]),this.editor.contains(s)&&t.push(s);return t},_hasSelectionChanged:function(e){var t=rangy.getSelection(),n,r=!1;return t.rangeCount?n=t.getRangeAt(0):n=rangy.createRange(),this._lastSelection&&!this._lastSelection.equals(n)?(r=!0,this._fireSelectionChanged(e)):(this._lastSelection=n,r)},_fireSelectionChanged:function(e){this.fire("atto:selectionchanged",{event:e,selectedNodes:this.getSelectedNodes()})},getSelectionParentNode:function(){var e=rangy.getSelection();return e.rangeCount?e.getRangeAt(0).commonAncestorContainer:!1},setSelection:function(e){var t=rangy.getSelection();t.setRanges(e)},insertContentAtFocusPoint:function(t){var n=rangy.getSelection(),r,i=e.Node.create(t);n.rangeCount&&(r=n.getRangeAt(0)),r&&(r.deleteContents(),r.insertNode(i.getDOMNode()))}},e.Base.mix(e.M.editor_atto.Editor,[g]),y.ATTRS={},y.prototype={disableCssStyling:function(){try{document.execCommand("styleWithCSS",0,!1)}catch(e){try{document.execCommand("useCSS",0,!0)}catch(t){try{document.execCommand("styleWithCSS",!1,!1)}catch(n){}}}},enableCssStyling:function(){try{document.execCommand("styleWithCSS",0,!0)}catch(e){try{document.execCommand("useCSS",0,!1)}catch(t){try{document.execCommand("styleWithCSS",!1,!0)}catch(n){}}}},toggleInlineSelectionClass:function(e){var t=e.join(" "),n=this.getSelection(),r=rangy.createCssClassApplier(t,{normalize:!0});r.toggleSelection(),this.setSelection(n)},formatSelectionInlineStyle:function(e){var t=this.PLACEHOLDER_CLASS,n=this.getSelection(),r=rangy.createCssClassApplier(t,{normalize:!0});r.applyToSelection(),this.editor.all("."+t).each(function(n){n.removeClass(t).setStyles(e)},this),this.setSelection(n)},formatSelectionBlock:function(t,n){var r=this.getSelectionParentNode(),i,s,o,u,a,f;if(!r)return!1;i=this.editor,r=e.one(r),s=r.ancestor(function(e){var t=e.get("tagName");return t&&(t=t.toLowerCase()),e===i||t==="td"||t==="th"},!0),s&&(i=s),o=r.ancestor(this.BLOCK_TAGS.join(", "),!0),o&&(a=o.ancestor(function(e){return e===i},!1),a||(o=!1)),o||(u=e.Node.create("<p></p>"),i.get("childNodes").each(function(e){u.append(e.remove())}),i.append(u),o=u),t&&t!==""&&(f=e.Node.create("<"+t+"></"+t+">"),f.setAttrs(o.getAttrs()),o.get("childNodes").each(function(e){e.remove(),f.append(e)}),o.replace(f),o=f),n&&o.setAttrs(n);var l=this.getSelectionFromNode(o);return this.setSelection(l),o}},e.Base.mix(e.M.editor_atto.Editor,[y]),b.ATTRS={filepickeroptions:{value:{}}},b.prototype={canShowFilepicker:function(e){return typeof this.get("filepickeroptions")[e]!="undefined"},showFilepicker:function(t,n,r){var i=this;e.use("core_filepicker",function(e){var s=e.clone(i.get("filepickeroptions")[t],!0);s.formcallback=n,r&&(s.magicscope=r),M.core_filepicker.show(e,s)})}},e.Base.mix(e.M.editor_atto.Editor,[b])},"@VERSION@",{requires:["node","transition","io","overlay","escape","event","event-simulate","event-custom","yui-throttle","moodle-core-notification-dialogue","moodle-core-notification-confirm","moodle-editor_atto-rangy","handlebars","timers"]});