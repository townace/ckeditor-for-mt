﻿(function(){function a(){var p=this;try{var m=p.getSelection();if(!m||!m.document.getWindow().$)return;var n=m.getStartElement(),o=new CKEDITOR.dom.elementPath(n);if(!o.compare(p._.selectionPreviousPath)){p._.selectionPreviousPath=o;p.fire('selectionChange',{selection:m,path:o,element:n});}}catch(q){}};var b,c;function d(){c=true;if(b)return;e.call(this);b=CKEDITOR.tools.setTimeout(e,200,this);};function e(){b=null;if(c){CKEDITOR.tools.setTimeout(a,0,this);c=false;}};function f(m){function n(q){return q&&q.type==CKEDITOR.NODE_ELEMENT&&q.getName() in CKEDITOR.dtd.$removeEmpty;};var o=m.startContainer,p=m.startOffset;if(o.type==CKEDITOR.NODE_TEXT)return false;return!CKEDITOR.tools.trim(o.getHtml())?n(o):n(o.getChild(p-1))||n(o.getChild(p));};var g={modes:{wysiwyg:1,source:1},exec:function(m){switch(m.mode){case 'wysiwyg':m.document.$.execCommand('SelectAll',false,null);m.forceNextSelectionCheck();m.selectionChange();break;case 'source':var n=m.textarea.$;if(CKEDITOR.env.ie)n.createTextRange().execCommand('SelectAll');else{n.selectionStart=0;n.selectionEnd=n.value.length;}n.focus();}},canUndo:false};function h(m){k(m);var n=m.createText('​');m.setCustomData('cke-fillingChar',n);return n;};function i(m){return m&&m.getCustomData('cke-fillingChar');};function j(m){var n=m&&i(m);if(n)if(n.getCustomData('ready'))k(m);else n.setCustomData('ready',1);};function k(m){var n=m&&m.removeCustomData('cke-fillingChar');if(n){n.setText(n.getText().replace(/\u200B/g,''));n=0;}};CKEDITOR.plugins.add('selection',{init:function(m){if(CKEDITOR.env.webkit){m.on('selectionChange',function(){j(m.document);});m.on('beforeSetMode',function(){k(m.document);});m.on('key',function(r){switch(r.data.keyCode){case 13:case CKEDITOR.SHIFT+13:case 37:case 39:case 8:k(m.document);}},null,null,10);var n,o;function p(){var r=m.document,s=i(r);if(s){var t=r.$.defaultView.getSelection();if(t.type=='Caret'&&t.anchorNode==s.$)o=1;n=s.getText();s.setText(n.replace(/\u200B/g,''));}};function q(){var r=m.document,s=i(r);if(s){s.setText(n);if(o){r.$.defaultView.getSelection().setPosition(s.$,s.getLength());o=0;}}};m.on('beforeUndoImage',p);m.on('afterUndoImage',q);m.on('beforeGetData',p,null,null,0);m.on('getData',q);}m.on('contentDom',function(){var r=m.document,s=r.getBody(),t=r.getDocumentElement();if(CKEDITOR.env.ie){var u,v,w=1;s.on('focusin',function(A){if(A.data.$.srcElement.nodeName!='BODY')return;if(u){if(w){try{u.select();}catch(C){}var B=r.getCustomData('cke_locked_selection');if(B){B.unlock();
B.lock();}}u=null;}});s.on('focus',function(){v=1;z();});s.on('beforedeactivate',function(A){if(A.data.$.toElement)return;v=0;w=1;});if(CKEDITOR.env.ie&&CKEDITOR.env.version<8)m.on('blur',function(A){try{m.document&&m.document.$.selection.empty();}catch(B){}});t.on('mousedown',function(){w=0;});t.on('mouseup',function(){w=1;});if(CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.version<8||CKEDITOR.env.quirks))t.on('click',function(A){if(A.data.getTarget().getName()=='html')m.getSelection().getRanges()[0].select();});var x;s.on('mousedown',function(A){if(A.data.$.button==2){var B=m.document.$.selection;if(B.type=='None')x=m.window.getScrollPosition();}y();});s.on('mouseup',function(A){if(A.data.$.button==2&&x){m.document.$.documentElement.scrollLeft=x.x;m.document.$.documentElement.scrollTop=x.y;}x=null;v=1;setTimeout(function(){z(true);},0);});s.on('keydown',y);s.on('keyup',function(){v=1;z();});r.on('selectionchange',z);function y(){v=0;};function z(A){if(v){var B=m.document,C=m.getSelection(),D=C&&C.getNative();if(A&&D&&D.type=='None')if(!B.$.queryCommandEnabled('InsertImage')){CKEDITOR.tools.setTimeout(z,50,this,true);return;}var E;if(D&&D.type&&D.type!='Control'&&(E=D.createRange())&&(E=E.parentElement())&&(E=E.nodeName)&&E.toLowerCase() in {input:1,textarea:1})return;u=D&&C.getRanges()[0];d.call(m);}};}else{r.on('mouseup',d,m);r.on('keyup',d,m);}});m.on('contentDomUnload',m.forceNextSelectionCheck,m);m.addCommand('selectAll',g);m.ui.addButton('SelectAll',{label:m.lang.selectAll,command:'selectAll'});m.selectionChange=d;}});CKEDITOR.editor.prototype.getSelection=function(){return this.document&&this.document.getSelection();};CKEDITOR.editor.prototype.forceNextSelectionCheck=function(){delete this._.selectionPreviousPath;};CKEDITOR.dom.document.prototype.getSelection=function(){var m=new CKEDITOR.dom.selection(this);return!m||m.isInvalid?null:m;};CKEDITOR.SELECTION_NONE=1;CKEDITOR.SELECTION_TEXT=2;CKEDITOR.SELECTION_ELEMENT=3;CKEDITOR.dom.selection=function(m){var p=this;var n=m.getCustomData('cke_locked_selection');if(n)return n;p.document=m;p.isLocked=0;p._={cache:{}};if(CKEDITOR.env.ie){var o=p.getNative().createRange();if(!o||o.item&&o.item(0).ownerDocument!=p.document.$||o.parentElement&&o.parentElement().ownerDocument!=p.document.$)p.isInvalid=true;}return p;};var l={img:1,hr:1,li:1,table:1,tr:1,td:1,th:1,embed:1,object:1,ol:1,ul:1,a:1,input:1,form:1,select:1,textarea:1,button:1,fieldset:1,th:1,thead:1,tfoot:1};CKEDITOR.dom.selection.prototype={getNative:CKEDITOR.env.ie?function(){return this._.cache.nativeSel||(this._.cache.nativeSel=this.document.$.selection);
}:function(){return this._.cache.nativeSel||(this._.cache.nativeSel=this.document.getWindow().$.getSelection());},getType:CKEDITOR.env.ie?function(){var m=this._.cache;if(m.type)return m.type;var n=CKEDITOR.SELECTION_NONE;try{var o=this.getNative(),p=o.type;if(p=='Text')n=CKEDITOR.SELECTION_TEXT;if(p=='Control')n=CKEDITOR.SELECTION_ELEMENT;if(o.createRange().parentElement)n=CKEDITOR.SELECTION_TEXT;}catch(q){}return m.type=n;}:function(){var m=this._.cache;if(m.type)return m.type;var n=CKEDITOR.SELECTION_TEXT,o=this.getNative();if(!o)n=CKEDITOR.SELECTION_NONE;else if(o.rangeCount==1){var p=o.getRangeAt(0),q=p.startContainer;if(q==p.endContainer&&q.nodeType==1&&p.endOffset-p.startOffset==1&&l[q.childNodes[p.startOffset].nodeName.toLowerCase()])n=CKEDITOR.SELECTION_ELEMENT;}return m.type=n;},getRanges:(function(){var m=CKEDITOR.env.ie?(function(){function n(p){return new CKEDITOR.dom.node(p).getIndex();};var o=function(p,q){p=p.duplicate();p.collapse(q);var r=p.parentElement(),s=r.ownerDocument;if(!r.hasChildNodes())return{container:r,offset:0};var t=r.children,u,v,w=p.duplicate(),x=0,y=t.length-1,z=-1,A,B;while(x<=y){z=Math.floor((x+y)/2);u=t[z];w.moveToElementText(u);A=w.compareEndPoints('StartToStart',p);if(A>0)y=z-1;else if(A<0)x=z+1;else if(CKEDITOR.env.ie9Compat&&u.tagName=='BR'){var C='cke_range_marker';p.execCommand('CreateBookmark',false,C);u=s.getElementsByName(C)[0];var D=n(u);r.removeChild(u);return{container:r,offset:D};}else return{container:r,offset:n(u)};}if(z==-1||z==t.length-1&&A<0){w.moveToElementText(r);w.setEndPoint('StartToStart',p);B=w.text.replace(/(\r\n|\r)/g,'\n').length;t=r.childNodes;if(!B){u=t[t.length-1];if(u.nodeType==CKEDITOR.NODE_ELEMENT)return{container:r,offset:t.length};else return{container:u,offset:u.nodeValue.length};}var E=t.length;while(B>0)B-=t[--E].nodeValue.length;return{container:t[E],offset:-B};}else{w.collapse(A>0?true:false);w.setEndPoint(A>0?'StartToStart':'EndToStart',p);B=w.text.replace(/(\r\n|\r)/g,'\n').length;if(!B)return{container:r,offset:n(u)+(A>0?0:1)};while(B>0)try{v=u[A>0?'previousSibling':'nextSibling'];B-=v.nodeValue.length;u=v;}catch(F){return{container:r,offset:n(u)};}return{container:u,offset:A>0?-B:u.nodeValue.length+B};}};return function(){var z=this;var p=z.getNative(),q=p&&p.createRange(),r=z.getType(),s;if(!p)return[];if(r==CKEDITOR.SELECTION_TEXT){s=new CKEDITOR.dom.range(z.document);var t=o(q,true);s.setStart(new CKEDITOR.dom.node(t.container),t.offset);t=o(q);s.setEnd(new CKEDITOR.dom.node(t.container),t.offset);
if(s.endContainer.getPosition(s.startContainer)&CKEDITOR.POSITION_PRECEDING&&s.endOffset<=s.startContainer.getIndex())s.collapse();return[s];}else if(r==CKEDITOR.SELECTION_ELEMENT){var u=[];for(var v=0;v<q.length;v++){var w=q.item(v),x=w.parentNode,y=0;s=new CKEDITOR.dom.range(z.document);for(;y<x.childNodes.length&&x.childNodes[y]!=w;y++){}s.setStart(new CKEDITOR.dom.node(x),y);s.setEnd(new CKEDITOR.dom.node(x),y+1);u.push(s);}return u;}return[];};})():function(){var n=[],o,p=this.document,q=this.getNative();if(!q)return n;if(!q.rangeCount){o=new CKEDITOR.dom.range(p);o.moveToElementEditStart(p.getBody());n.push(o);}for(var r=0;r<q.rangeCount;r++){var s=q.getRangeAt(r);o=new CKEDITOR.dom.range(p);o.setStart(new CKEDITOR.dom.node(s.startContainer),s.startOffset);o.setEnd(new CKEDITOR.dom.node(s.endContainer),s.endOffset);n.push(o);}return n;};return function(n){var o=this._.cache;if(o.ranges&&!n)return o.ranges;else if(!o.ranges)o.ranges=new CKEDITOR.dom.rangeList(m.call(this));if(n){var p=o.ranges;for(var q=0;q<p.length;q++){var r=p[q],s=r.getCommonAncestor();if(s.isReadOnly())p.splice(q,1);if(r.collapsed)continue;var t=r.startContainer,u=r.endContainer,v=r.startOffset,w=r.endOffset,x=r.clone(),y;if(y=t.isReadOnly())r.setStartAfter(y);if(t&&t.type==CKEDITOR.NODE_TEXT)if(v>=t.getLength())x.setStartAfter(t);else x.setStartBefore(t);if(u&&u.type==CKEDITOR.NODE_TEXT)if(!w)x.setEndBefore(u);else x.setEndAfter(u);var z=new CKEDITOR.dom.walker(x);z.evaluator=function(A){if(A.type==CKEDITOR.NODE_ELEMENT&&A.isReadOnly()){var B=r.clone();r.setEndBefore(A);if(r.collapsed)p.splice(q--,1);if(!(A.getPosition(x.endContainer)&CKEDITOR.POSITION_CONTAINS)){B.setStartAfter(A);if(!B.collapsed)p.splice(q+1,0,B);}return true;}return false;};z.next();}}return o.ranges;};})(),getStartElement:function(){var t=this;var m=t._.cache;if(m.startElement!==undefined)return m.startElement;var n,o=t.getNative();switch(t.getType()){case CKEDITOR.SELECTION_ELEMENT:return t.getSelectedElement();case CKEDITOR.SELECTION_TEXT:var p=t.getRanges()[0];if(p){if(!p.collapsed){p.optimize();while(1){var q=p.startContainer,r=p.startOffset;if(r==(q.getChildCount?q.getChildCount():q.getLength())&&!q.isBlockBoundary())p.setStartAfter(q);else break;}n=p.startContainer;if(n.type!=CKEDITOR.NODE_ELEMENT)return n.getParent();n=n.getChild(p.startOffset);if(!n||n.type!=CKEDITOR.NODE_ELEMENT)n=p.startContainer;else{var s=n.getFirst();while(s&&s.type==CKEDITOR.NODE_ELEMENT){n=s;s=s.getFirst();}}}else{n=p.startContainer;
if(n.type!=CKEDITOR.NODE_ELEMENT)n=n.getParent();}n=n.$;}}return m.startElement=n?new CKEDITOR.dom.element(n):null;},getSelectedElement:function(){var m=this._.cache;if(m.selectedElement!==undefined)return m.selectedElement;var n=this,o=CKEDITOR.tools.tryThese(function(){return n.getNative().createRange().item(0);},function(){var p=n.getRanges()[0],q,r;for(var s=2;s&&!((q=p.getEnclosedNode())&&q.type==CKEDITOR.NODE_ELEMENT&&l[q.getName()]&&(r=q));s--)p.shrink(CKEDITOR.SHRINK_ELEMENT);return r.$;});return m.selectedElement=o?new CKEDITOR.dom.element(o):null;},lock:function(){var m=this;m.getRanges();m.getStartElement();m.getSelectedElement();m._.cache.nativeSel={};m.isLocked=1;m.document.setCustomData('cke_locked_selection',m);},unlock:function(m){var r=this;var n=r.document,o=n.getCustomData('cke_locked_selection');if(o){n.setCustomData('cke_locked_selection',null);if(m){var p=o.getSelectedElement(),q=!p&&o.getRanges();r.isLocked=0;r.reset();n.getBody().focus();if(p)r.selectElement(p);else r.selectRanges(q);}}if(!o||!m){r.isLocked=0;r.reset();}},reset:function(){this._.cache={};},selectElement:function(m){var o=this;if(o.isLocked){var n=new CKEDITOR.dom.range(o.document);n.setStartBefore(m);n.setEndAfter(m);o._.cache.selectedElement=m;o._.cache.startElement=m;o._.cache.ranges=new CKEDITOR.dom.rangeList(n);o._.cache.type=CKEDITOR.SELECTION_ELEMENT;return;}n=new CKEDITOR.dom.range(m.getDocument());n.setStartBefore(m);n.setEndAfter(m);n.select();o.document.fire('selectionchange');o.reset();},selectRanges:function(m){var A=this;if(A.isLocked){A._.cache.selectedElement=null;A._.cache.startElement=m[0]&&m[0].getTouchedStartNode();A._.cache.ranges=new CKEDITOR.dom.rangeList(m);A._.cache.type=CKEDITOR.SELECTION_TEXT;return;}if(CKEDITOR.env.ie){if(m.length>1){var n=m[m.length-1];m[0].setEnd(n.endContainer,n.endOffset);m.length=1;}if(m[0])m[0].select();A.reset();}else{var o=A.getNative();if(!o)return;if(m.length){o.removeAllRanges();CKEDITOR.env.webkit&&k(A.document);}for(var p=0;p<m.length;p++){if(p<m.length-1){var q=m[p],r=m[p+1],s=q.clone();s.setStart(q.endContainer,q.endOffset);s.setEnd(r.startContainer,r.startOffset);if(!s.collapsed){s.shrink(CKEDITOR.NODE_ELEMENT,true);var t=s.getCommonAncestor(),u=s.getEnclosedNode();if(t.isReadOnly()||u&&u.isReadOnly()){r.setStart(q.startContainer,q.startOffset);m.splice(p--,1);continue;}}}var v=m[p],w=A.document.$.createRange(),x=v.startContainer;if(v.collapsed&&(CKEDITOR.env.opera||CKEDITOR.env.gecko&&CKEDITOR.env.version<10900)&&x.type==CKEDITOR.NODE_ELEMENT&&!x.getChildCount())x.appendText('');
if(v.collapsed&&CKEDITOR.env.webkit&&f(v)){var y=h(A.document);v.insertNode(y);var z=y.getNext();if(z&&!y.getPrevious()&&z.type==CKEDITOR.NODE_ELEMENT&&z.getName()=='br'){k(A.document);v.moveToPosition(z,CKEDITOR.POSITION_BEFORE_START);}else v.moveToPosition(y,CKEDITOR.POSITION_AFTER_END);}w.setStart(v.startContainer.$,v.startOffset);try{w.setEnd(v.endContainer.$,v.endOffset);}catch(B){if(B.toString().indexOf('NS_ERROR_ILLEGAL_VALUE')>=0){v.collapse(1);w.setEnd(v.endContainer.$,v.endOffset);}else throw B;}o.addRange(w);}A.reset();}},createBookmarks:function(m){return this.getRanges().createBookmarks(m);},createBookmarks2:function(m){return this.getRanges().createBookmarks2(m);},selectBookmarks:function(m){var n=[];for(var o=0;o<m.length;o++){var p=new CKEDITOR.dom.range(this.document);p.moveToBookmark(m[o]);n.push(p);}this.selectRanges(n);return this;},getCommonAncestor:function(){var m=this.getRanges(),n=m[0].startContainer,o=m[m.length-1].endContainer;return n.getCommonAncestor(o);},scrollIntoView:function(){var m=this.getStartElement();m.scrollIntoView();}};})();(function(){var a=CKEDITOR.dom.walker.whitespaces(true),b=/\ufeff|\u00a0/,c={table:1,tbody:1,tr:1};CKEDITOR.dom.range.prototype.select=CKEDITOR.env.ie?function(d){var o=this;var e=o.collapsed,f,g,h,i=o.getEnclosedNode();if(i)try{h=o.document.$.body.createControlRange();h.addElement(i.$);h.select();return;}catch(p){}if(o.startContainer.type==CKEDITOR.NODE_ELEMENT&&o.startContainer.getName() in c||o.endContainer.type==CKEDITOR.NODE_ELEMENT&&o.endContainer.getName() in c)o.shrink(CKEDITOR.NODE_ELEMENT,true);var j=o.createBookmark(),k=j.startNode,l;if(!e)l=j.endNode;h=o.document.$.body.createTextRange();h.moveToElementText(k.$);h.moveStart('character',1);if(l){var m=o.document.$.body.createTextRange();m.moveToElementText(l.$);h.setEndPoint('EndToEnd',m);h.moveEnd('character',-1);}else{var n=k.getNext(a);f=!(n&&n.getText&&n.getText().match(b))&&(d||!k.hasPrevious()||k.getPrevious().is&&k.getPrevious().is('br'));g=o.document.createElement('span');g.setHtml('&#65279;');g.insertBefore(k);if(f)o.document.createText('\ufeff').insertBefore(k);}o.setStartBefore(k);k.remove();if(e){if(f){h.moveStart('character',-1);h.select();o.document.$.selection.clear();}else h.select();o.moveToPosition(g,CKEDITOR.POSITION_BEFORE_START);g.remove();}else{o.setEndBefore(l);l.remove();h.select();}o.document.fire('selectionchange');}:function(){this.document.getSelection().selectRanges([this]);};})();