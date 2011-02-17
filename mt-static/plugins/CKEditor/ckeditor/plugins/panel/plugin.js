﻿CKEDITOR.plugins.add('panel',{beforeInit:function(a){a.ui.addHandler(CKEDITOR.UI_PANEL,CKEDITOR.ui.panel.handler);}});CKEDITOR.UI_PANEL=2;CKEDITOR.ui.panel=function(a,b){var c=this;if(b)CKEDITOR.tools.extend(c,b);CKEDITOR.tools.extend(c,{className:'',css:[]});c.id=CKEDITOR.tools.getNextNumber();c.document=a;c._={blocks:{}};};CKEDITOR.ui.panel.handler={create:function(a){return new CKEDITOR.ui.panel(a);}};CKEDITOR.ui.panel.prototype={renderHtml:function(a){var b=[];this.render(a,b);return b.join('');},render:function(a,b){var d=this;var c='cke_'+d.id;b.push('<div class="',a.skinClass,'" lang="',a.langCode,'" role="presentation" style="display:none;z-index:'+(a.config.baseFloatZIndex+1)+'">'+'<div'+' id=',c,' dir=',a.lang.dir,' role="presentation" class="cke_panel cke_',a.lang.dir);if(d.className)b.push(' ',d.className);b.push('">');if(d.forceIFrame||d.css.length){b.push('<iframe id="',c,'_frame" frameborder="0" role="application" src="javascript:void(');b.push(CKEDITOR.env.isCustomDomain()?"(function(){document.open();document.domain='"+document.domain+"';"+'document.close();'+'})()':'0');b.push(')"></iframe>');}b.push('</div></div>');return c;},getHolderElement:function(){var a=this._.holder;if(!a){if(this.forceIFrame||this.css.length){var b=this.document.getById('cke_'+this.id+'_frame'),c=b.getParent(),d=c.getAttribute('dir'),e=c.getParent().getAttribute('class'),f=c.getParent().getAttribute('lang'),g=b.getFrameDocument();g.$.open();if(CKEDITOR.env.isCustomDomain())g.$.domain=document.domain;var h=CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function(j){this.isLoaded=true;if(this.onLoad)this.onLoad();},this));g.$.write('<!DOCTYPE html><html dir="'+d+'" class="'+e+'_container" lang="'+f+'">'+'<head>'+'<style>.'+e+'_container{visibility:hidden}</style>'+'</head>'+'<body class="cke_'+d+' cke_panel_frame '+CKEDITOR.env.cssClass+'" style="margin:0;padding:0"'+' onload="( window.CKEDITOR || window.parent.CKEDITOR ).tools.callFunction('+h+');"></body>'+CKEDITOR.tools.buildStyleHtml(this.css)+'</html>');g.$.close();var i=g.getWindow();i.$.CKEDITOR=CKEDITOR;g.on('keydown',function(j){var m=this;var k=j.data.getKeystroke(),l=m.document.getById('cke_'+m.id).getAttribute('dir');if(m._.onKeyDown&&m._.onKeyDown(k)===false){j.data.preventDefault();return;}if(k==27||k==(l=='rtl'?39:37))if(m.onEscape&&m.onEscape(k)===false)j.data.preventDefault();},this);a=g.getBody();}else a=this.document.getById('cke_'+this.id);this._.holder=a;}return a;},addBlock:function(a,b){var c=this;
b=c._.blocks[a]=b instanceof CKEDITOR.ui.panel.block?b:new CKEDITOR.ui.panel.block(c.getHolderElement(),b);if(!c._.currentBlock)c.showBlock(a);return b;},getBlock:function(a){return this._.blocks[a];},showBlock:function(a){var b=this._.blocks,c=b[a],d=this._.currentBlock,e=this.forceIFrame?this.document.getById('cke_'+this.id+'_frame'):this._.holder;e.getParent().getParent().disableContextMenu();if(d){e.removeAttributes(d.attributes);d.hide();}this._.currentBlock=c;e.setAttributes(c.attributes);CKEDITOR.fire('ariaWidget',e);c._.focusIndex=-1;this._.onKeyDown=c.onKeyDown&&CKEDITOR.tools.bind(c.onKeyDown,c);c.onMark=function(f){e.setAttribute('aria-activedescendant',f.getId()+'_option');};c.onUnmark=function(){e.removeAttribute('aria-activedescendant');};c.show();return c;},destroy:function(){this.element&&this.element.remove();}};CKEDITOR.ui.panel.block=CKEDITOR.tools.createClass({$:function(a,b){var c=this;c.element=a.append(a.getDocument().createElement('div',{attributes:{tabIndex:-1,'class':'cke_panel_block',role:'presentation'},styles:{display:'none'}}));if(b)CKEDITOR.tools.extend(c,b);if(!c.attributes.title)c.attributes.title=c.attributes['aria-label'];c.keys={};c._.focusIndex=-1;c.element.disableContextMenu();},_:{markItem:function(a){var d=this;if(a==-1)return;var b=d.element.getElementsByTag('a'),c=b.getItem(d._.focusIndex=a);if(CKEDITOR.env.webkit)c.getDocument().getWindow().focus();c.focus();d.onMark&&d.onMark(c);}},proto:{show:function(){this.element.setStyle('display','');},hide:function(){var a=this;if(!a.onHide||a.onHide.call(a)!==true)a.element.setStyle('display','none');},onKeyDown:function(a){var f=this;var b=f.keys[a];switch(b){case 'next':var c=f._.focusIndex,d=f.element.getElementsByTag('a'),e;while(e=d.getItem(++c)){if(e.getAttribute('_cke_focus')&&e.$.offsetWidth){f._.focusIndex=c;e.focus();break;}}return false;case 'prev':c=f._.focusIndex;d=f.element.getElementsByTag('a');while(c>0&&(e=d.getItem(--c))){if(e.getAttribute('_cke_focus')&&e.$.offsetWidth){f._.focusIndex=c;e.focus();break;}}return false;case 'click':c=f._.focusIndex;e=c>=0&&f.element.getElementsByTag('a').getItem(c);if(e)e.$.click?e.$.click():e.$.onclick();return false;}return true;}}});