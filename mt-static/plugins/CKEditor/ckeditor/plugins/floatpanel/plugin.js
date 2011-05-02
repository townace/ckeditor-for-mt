﻿CKEDITOR.plugins.add('floatpanel',{requires:['panel']});(function(){var a={},b=false;function c(d,e,f,g,h){var i=CKEDITOR.tools.genKey(e.getUniqueId(),f.getUniqueId(),d.skinName,d.lang.dir,d.uiColor||'',g.css||'',h||''),j=a[i];if(!j){j=a[i]=new CKEDITOR.ui.panel(e,g);j.element=f.append(CKEDITOR.dom.element.createFromHtml(j.renderHtml(d),e));j.element.setStyles({display:'none',position:'absolute'});}return j;};CKEDITOR.ui.floatPanel=CKEDITOR.tools.createClass({$:function(d,e,f,g){f.forceIFrame=1;var h=e.getDocument(),i=c(d,h,e,f,g||0),j=i.element,k=j.getFirst().getFirst();this.element=j;this._={panel:i,parentElement:e,definition:f,document:h,iframe:k,children:[],dir:d.lang.dir};d.on('mode',function(){this.hide();},this);},proto:{addBlock:function(d,e){return this._.panel.addBlock(d,e);},addListBlock:function(d,e){return this._.panel.addListBlock(d,e);},getBlock:function(d){return this._.panel.getBlock(d);},showBlock:function(d,e,f,g,h){var i=this._.panel,j=i.showBlock(d);this.allowBlur(false);b=1;var k=this.element,l=this._.iframe,m=this._.definition,n=e.getDocumentPosition(k.getDocument()),o=this._.dir=='rtl',p=n.x+(g||0),q=n.y+(h||0);if(o&&(f==1||f==4))p+=e.$.offsetWidth;else if(!o&&(f==2||f==3))p+=e.$.offsetWidth-1;if(f==3||f==4)q+=e.$.offsetHeight-1;this._.panel._.offsetParentId=e.getId();k.setStyles({top:q+'px',left:0,display:''});k.setOpacity(0);k.getFirst().removeStyle('width');if(!this._.blurSet){var r=CKEDITOR.env.ie?l:new CKEDITOR.dom.window(l.$.contentWindow);CKEDITOR.event.useCapture=true;r.on('blur',function(s){var u=this;if(!u.allowBlur())return;var t;if(CKEDITOR.env.ie&&!u.allowBlur()||(t=s.data.getTarget())&&t.getName&&t.getName()!='iframe')return;if(u.visible&&!u._.activeChild&&!b)u.hide();},this);r.on('focus',function(){this._.focused=true;this.hideChild();this.allowBlur(true);},this);CKEDITOR.event.useCapture=false;this._.blurSet=1;}i.onEscape=CKEDITOR.tools.bind(function(s){if(this.onEscape&&this.onEscape(s)===false)return false;},this);CKEDITOR.tools.setTimeout(function(){if(o)p-=k.$.offsetWidth;var s=CKEDITOR.tools.bind(function(){var t=k.getFirst();if(j.autoSize){var u=j.element.$;if(CKEDITOR.env.gecko||CKEDITOR.env.opera)u=u.parentNode;if(CKEDITOR.env.ie)u=u.document.body;var v=u.scrollWidth;if(CKEDITOR.env.ie&&CKEDITOR.env.quirks&&v>0)v+=(t.$.offsetWidth||0)-(t.$.clientWidth||0);v+=4;t.setStyle('width',v+'px');j.element.addClass('cke_frameLoaded');var w=j.element.$.scrollHeight;if(CKEDITOR.env.ie&&CKEDITOR.env.quirks&&w>0)w+=(t.$.offsetHeight||0)-(t.$.clientHeight||0);
t.setStyle('height',w+'px');i._.currentBlock.element.setStyle('display','none').removeStyle('display');}else t.removeStyle('height');var x=i.element,y=x.getWindow(),z=y.getScrollPosition(),A=y.getViewPaneSize(),B={height:x.$.offsetHeight,width:x.$.offsetWidth};if(o?p<0:p+B.width>A.width+z.x)p+=B.width*(o?1:-1);if(q+B.height>A.height+z.y)q-=B.height;if(CKEDITOR.env.ie){var C=new CKEDITOR.dom.element(k.$.offsetParent),D=C;if(D.getName()=='html')D=D.getDocument().getBody();if(D.getComputedStyle('direction')=='rtl')if(CKEDITOR.env.ie8Compat)p-=k.getDocument().getDocumentElement().$.scrollLeft*2;else p-=C.$.scrollWidth-C.$.clientWidth;}var E=k.getFirst(),F;if(F=E.getCustomData('activePanel'))F.onHide&&F.onHide.call(this,1);E.setCustomData('activePanel',this);k.setStyles({top:q+'px',left:p+'px'});k.setOpacity(1);},this);i.isLoaded?s():i.onLoad=s;CKEDITOR.tools.setTimeout(function(){l.$.contentWindow.focus();this.allowBlur(true);},0,this);},CKEDITOR.env.air?200:0,this);this.visible=1;if(this.onShow)this.onShow.call(this);b=0;},hide:function(){var d=this;if(d.visible&&(!d.onHide||d.onHide.call(d)!==true)){d.hideChild();d.element.setStyle('display','none');d.visible=0;d.element.getFirst().removeCustomData('activePanel');}},allowBlur:function(d){var e=this._.panel;if(d!=undefined)e.allowBlur=d;return e.allowBlur;},showAsChild:function(d,e,f,g,h,i){if(this._.activeChild==d&&d._.panel._.offsetParentId==f.getId())return;this.hideChild();d.onHide=CKEDITOR.tools.bind(function(){CKEDITOR.tools.setTimeout(function(){if(!this._.focused)this.hide();},0,this);},this);this._.activeChild=d;this._.focused=false;d.showBlock(e,f,g,h,i);if(CKEDITOR.env.ie7Compat||CKEDITOR.env.ie8&&CKEDITOR.env.ie6Compat)setTimeout(function(){d.element.getChild(0).$.style.cssText+='';},100);},hideChild:function(){var d=this._.activeChild;if(d){delete d.onHide;delete this._.activeChild;d.hide();}}}});CKEDITOR.on('instanceDestroyed',function(){var d=CKEDITOR.tools.isEmpty(CKEDITOR.instances);for(var e in a){var f=a[e];if(d)f.destroy();else f.element.hide();}d&&(a={});});})();
