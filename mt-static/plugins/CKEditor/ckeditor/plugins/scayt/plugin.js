﻿(function(){var a='scaytcheck',b='';function c(h,i){var j=0,k;for(k in i){if(i[k]==h){j=1;break;}}return j;};var d=function(){var h=this,i=function(){var m=h.config,n={};n.srcNodeRef=h.document.getWindow().$.frameElement;n.assocApp='CKEDITOR.'+CKEDITOR.version+'@'+CKEDITOR.revision;n.customerid=m.scayt_customerid||'1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2';n.customDictionaryIds=m.scayt_customDictionaryIds||'';n.userDictionaryName=m.scayt_userDictionaryName||'';n.sLang=m.scayt_sLang||'en_US';n.onLoad=function(){if(!(CKEDITOR.env.ie&&CKEDITOR.env.version<8))this.addStyle(this.selectorCss(),'padding-bottom: 2px !important;');if(h.focusManager.hasFocus&&!e.isControlRestored(h))this.focus();};n.onBeforeChange=function(){if(e.getScayt(h)&&!h.checkDirty())setTimeout(function(){h.resetDirty();},0);};var o=window.scayt_custom_params;if(typeof o=='object')for(var p in o)n[p]=o[p];if(e.getControlId(h))n.id=e.getControlId(h);var q=new window.scayt(n);q.afterMarkupRemove.push(function(s){new CKEDITOR.dom.element(s,q.document).mergeSiblings();});var r=e.instances[h.name];if(r){q.sLang=r.sLang;q.option(r.option());q.paused=r.paused;}e.instances[h.name]=q;try{q.setDisabled(e.isPaused(h)===false);}catch(s){}h.fire('showScaytState');};h.on('contentDom',i);h.on('contentDomUnload',function(){var m=CKEDITOR.document.getElementsByTag('script'),n=/^dojoIoScript(\d+)$/i,o=/^https?:\/\/svc\.spellchecker\.net\/spellcheck\/script\/ssrv\.cgi/i;for(var p=0;p<m.count();p++){var q=m.getItem(p),r=q.getId(),s=q.getAttribute('src');if(r&&s&&r.match(n)&&s.match(o))q.remove();}});h.on('beforeCommandExec',function(m){if((m.data.name=='source'||m.data.name=='newpage')&&h.mode=='wysiwyg'){var n=e.getScayt(h);if(n){e.setPaused(h,!n.disabled);e.setControlId(h,n.id);n.destroy(true);delete e.instances[h.name];}}else if(m.data.name=='source'&&h.mode=='source')e.markControlRestore(h);});h.on('afterCommandExec',function(m){if(!e.isScaytEnabled(h))return;if(h.mode=='wysiwyg'&&(m.data.name=='undo'||m.data.name=='redo'))window.setTimeout(function(){e.getScayt(h).refresh();},10);});h.on('destroy',function(m){var n=m.editor,o=e.getScayt(n);if(!o)return;delete e.instances[n.name];e.setControlId(n,o.id);o.destroy(true);});h.on('afterSetData',function(){if(e.isScaytEnabled(h))window.setTimeout(function(){var m=e.getScayt(h);m&&m.refresh();},10);});h.on('insertElement',function(){var m=e.getScayt(h);if(e.isScaytEnabled(h)){if(CKEDITOR.env.ie)h.getSelection().unlock(true);window.setTimeout(function(){m.focus();
m.refresh();},10);}},this,null,50);h.on('insertHtml',function(){var m=e.getScayt(h);if(e.isScaytEnabled(h)){if(CKEDITOR.env.ie)h.getSelection().unlock(true);window.setTimeout(function(){m.focus();m.refresh();},10);}},this,null,50);h.on('scaytDialog',function(m){m.data.djConfig=window.djConfig;m.data.scayt_control=e.getScayt(h);m.data.tab=b;m.data.scayt=window.scayt;});var j=h.dataProcessor,k=j&&j.htmlFilter;if(k)k.addRules({elements:{span:function(m){if(m.attributes['data-scayt_word']&&m.attributes['data-scaytid']){delete m.name;return m;}}}});var l=CKEDITOR.plugins.undo.Image.prototype;l.equals=CKEDITOR.tools.override(l.equals,function(m){return function(n){var s=this;var o=s.contents,p=n.contents,q=e.getScayt(s.editor);if(q&&e.isScaytReady(s.editor)){s.contents=q.reset(o)||'';n.contents=q.reset(p)||'';}var r=m.apply(s,arguments);s.contents=o;n.contents=p;return r;};});if(h.document)i();};CKEDITOR.plugins.scayt={engineLoaded:false,instances:{},controlInfo:{},setControlInfo:function(h,i){if(h&&h.name&&typeof this.controlInfo[h.name]!='object')this.controlInfo[h.name]={};for(var j in i)this.controlInfo[h.name][j]=i[j];},isControlRestored:function(h){if(h&&h.name&&this.controlInfo[h.name])return this.controlInfo[h.name].restored;return false;},markControlRestore:function(h){this.setControlInfo(h,{restored:true});},setControlId:function(h,i){this.setControlInfo(h,{id:i});},getControlId:function(h){if(h&&h.name&&this.controlInfo[h.name]&&this.controlInfo[h.name].id)return this.controlInfo[h.name].id;return null;},setPaused:function(h,i){this.setControlInfo(h,{paused:i});},isPaused:function(h){if(h&&h.name&&this.controlInfo[h.name])return this.controlInfo[h.name].paused;return undefined;},getScayt:function(h){return this.instances[h.name];},isScaytReady:function(h){return this.engineLoaded===true&&'undefined'!==typeof window.scayt&&this.getScayt(h);},isScaytEnabled:function(h){var i=this.getScayt(h);return i?i.disabled===false:false;},getUiTabs:function(h){var i=[],j=h.config.scayt_uiTabs||'1,1,1';j=j.split(',');j[3]='1';for(var k=0;k<4;k++)i[k]=typeof window.scayt!='undefined'&&typeof window.scayt.uiTags!='undefined'?parseInt(j[k],10)&&window.scayt.uiTags[k]:parseInt(j[k],10);return i;},loadEngine:function(h){if(CKEDITOR.env.gecko&&CKEDITOR.env.version<10900||CKEDITOR.env.opera||CKEDITOR.env.air)return h.fire('showScaytState');if(this.engineLoaded===true)return d.apply(h);else if(this.engineLoaded==-1)return CKEDITOR.on('scaytReady',function(){d.apply(h);});CKEDITOR.on('scaytReady',d,h);
CKEDITOR.on('scaytReady',function(){this.engineLoaded=true;},this,null,0);this.engineLoaded=-1;var i=document.location.protocol;i=i.search(/https?:/)!=-1?i:'http:';var j='svc.spellchecker.net/scayt26/loader__base.js',k=h.config.scayt_srcUrl||i+'//'+j,l=e.parseUrl(k).path+'/';if(window.scayt==undefined){CKEDITOR._djScaytConfig={baseUrl:l,addOnLoad:[function(){CKEDITOR.fireOnce('scaytReady');}],isDebug:false};CKEDITOR.document.getHead().append(CKEDITOR.document.createElement('script',{attributes:{type:'text/javascript',async:'true',src:k}}));}else CKEDITOR.fireOnce('scaytReady');return null;},parseUrl:function(h){var i;if(h.match&&(i=h.match(/(.*)[\/\\](.*?\.\w+)$/)))return{path:i[1],file:i[2]};else return h;}};var e=CKEDITOR.plugins.scayt,f=function(h,i,j,k,l,m,n){h.addCommand(k,l);h.addMenuItem(k,{label:j,command:k,group:m,order:n});},g={preserveState:true,editorFocus:false,canUndo:false,exec:function(h){if(e.isScaytReady(h)){var i=e.isScaytEnabled(h);this.setState(i?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_ON);var j=e.getScayt(h);j.focus();j.setDisabled(i);}else if(!h.config.scayt_autoStartup&&e.engineLoaded>=0){this.setState(CKEDITOR.TRISTATE_DISABLED);e.loadEngine(h);}}};CKEDITOR.plugins.add('scayt',{requires:['menubutton'],beforeInit:function(h){var i=h.config.scayt_contextMenuItemsOrder||'suggest|moresuggest|control',j='';i=i.split('|');if(i&&i.length)for(var k=0;k<i.length;k++)j+='scayt_'+i[k]+(i.length!=parseInt(k,10)+1?',':'');h.config.menu_groups=j+','+h.config.menu_groups;},init:function(h){var i=h.dataProcessor&&h.dataProcessor.dataFilter,j={elements:{span:function(s){var t=s.attributes;if(t&&t['data-scaytid'])delete s.name;}}};i&&i.addRules(j);var k={},l={},m=h.addCommand(a,g);CKEDITOR.dialog.add(a,CKEDITOR.getUrl(this.path+'dialogs/options.js'));var n=e.getUiTabs(h),o='scaytButton';h.addMenuGroup(o);var p={},q=h.lang.scayt;p.scaytToggle={label:q.enable,command:a,group:o};if(n[0]==1)p.scaytOptions={label:q.options,group:o,onClick:function(){b='options';h.openDialog(a);}};if(n[1]==1)p.scaytLangs={label:q.langs,group:o,onClick:function(){b='langs';h.openDialog(a);}};if(n[2]==1)p.scaytDict={label:q.dictionariesTab,group:o,onClick:function(){b='dictionaries';h.openDialog(a);}};p.scaytAbout={label:h.lang.scayt.about,group:o,onClick:function(){b='about';h.openDialog(a);}};h.addMenuItems(p);h.ui.add('Scayt',CKEDITOR.UI_MENUBUTTON,{label:q.title,title:CKEDITOR.env.opera?q.opera_title:q.title,className:'cke_button_scayt',modes:{wysiwyg:1},onRender:function(){m.on('state',function(){this.setState(m.state);
},this);},onMenu:function(){var s=e.isScaytEnabled(h);h.getMenuItem('scaytToggle').label=q[s?'disable':'enable'];var t=e.getUiTabs(h);return{scaytToggle:CKEDITOR.TRISTATE_OFF,scaytOptions:s&&t[0]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,scaytLangs:s&&t[1]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,scaytDict:s&&t[2]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,scaytAbout:s&&t[3]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED};}});if(h.contextMenu&&h.addMenuItems)h.contextMenu.addListener(function(s,t){if(!e.isScaytEnabled(h)||t.getRanges()[0].checkReadOnly())return null;var u=e.getScayt(h),v=u.getScaytNode();if(!v)return null;var w=u.getWord(v);if(!w)return null;var x=u.getLang(),y={},z=window.scayt.getSuggestion(w,x);if(!z||!z.length)return null;for(i in k){delete h._.menuItems[i];delete h._.commands[i];}for(i in l){delete h._.menuItems[i];delete h._.commands[i];}k={};l={};var A=h.config.scayt_moreSuggestions||'on',B=false,C=h.config.scayt_maxSuggestions;typeof C!='number'&&(C=5);!C&&(C=z.length);var D=h.config.scayt_contextCommands||'all';D=D.split('|');for(var E=0,F=z.length;E<F;E+=1){var G='scayt_suggestion_'+z[E].replace(' ','_'),H=(function(L,M){return{exec:function(){u.replace(L,M);}};})(v,z[E]);if(E<C){f(h,'button_'+G,z[E],G,H,'scayt_suggest',E+1);y[G]=CKEDITOR.TRISTATE_OFF;l[G]=CKEDITOR.TRISTATE_OFF;}else if(A=='on'){f(h,'button_'+G,z[E],G,H,'scayt_moresuggest',E+1);k[G]=CKEDITOR.TRISTATE_OFF;B=true;}}if(B){h.addMenuItem('scayt_moresuggest',{label:q.moreSuggestions,group:'scayt_moresuggest',order:10,getItems:function(){return k;}});l.scayt_moresuggest=CKEDITOR.TRISTATE_OFF;}if(c('all',D)||c('ignore',D)){var I={exec:function(){u.ignore(v);}};f(h,'ignore',q.ignore,'scayt_ignore',I,'scayt_control',1);l.scayt_ignore=CKEDITOR.TRISTATE_OFF;}if(c('all',D)||c('ignoreall',D)){var J={exec:function(){u.ignoreAll(v);}};f(h,'ignore_all',q.ignoreAll,'scayt_ignore_all',J,'scayt_control',2);l.scayt_ignore_all=CKEDITOR.TRISTATE_OFF;}if(c('all',D)||c('add',D)){var K={exec:function(){window.scayt.addWordToUserDictionary(v);}};f(h,'add_word',q.addWord,'scayt_add_word',K,'scayt_control',3);l.scayt_add_word=CKEDITOR.TRISTATE_OFF;}if(u.fireOnContextMenu)u.fireOnContextMenu(h);return l;});var r=function(){h.removeListener('showScaytState',r);if(!CKEDITOR.env.opera&&!CKEDITOR.env.air)m.setState(e.isScaytEnabled(h)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);else m.setState(CKEDITOR.TRISTATE_DISABLED);};h.on('showScaytState',r);if(CKEDITOR.env.opera||CKEDITOR.env.air)h.on('instanceReady',function(){r();
});if(h.config.scayt_autoStartup)h.on('instanceReady',function(){e.loadEngine(h);});},afterInit:function(h){var i,j=function(k){if(k.hasAttribute('data-scaytid'))return false;};if(h._.elementsPath&&(i=h._.elementsPath.filters))i.push(j);h.addRemoveFormatFilter&&h.addRemoveFormatFilter(j);}});})();
