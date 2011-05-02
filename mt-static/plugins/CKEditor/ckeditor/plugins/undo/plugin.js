﻿(function(){CKEDITOR.plugins.add('undo',{requires:['selection','wysiwygarea'],init:function(g){var h=new c(g),i=g.addCommand('undo',{exec:function(){if(h.undo()){g.selectionChange();this.fire('afterUndo');}},state:CKEDITOR.TRISTATE_DISABLED,canUndo:false}),j=g.addCommand('redo',{exec:function(){if(h.redo()){g.selectionChange();this.fire('afterRedo');}},state:CKEDITOR.TRISTATE_DISABLED,canUndo:false});h.onChange=function(){i.setState(h.undoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);j.setState(h.redoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);};function k(l){if(h.enabled&&l.data.command.canUndo!==false)h.save();};g.on('beforeCommandExec',k);g.on('afterCommandExec',k);g.on('saveSnapshot',function(){h.save();});g.on('contentDom',function(){g.document.on('keydown',function(l){if(!l.data.$.ctrlKey&&!l.data.$.metaKey)h.type(l);});});g.on('beforeModeUnload',function(){g.mode=='wysiwyg'&&h.save(true);});g.on('mode',function(){h.enabled=g.mode=='wysiwyg';h.onChange();});g.ui.addButton('Undo',{label:g.lang.undo,command:'undo'});g.ui.addButton('Redo',{label:g.lang.redo,command:'redo'});g.resetUndo=function(){h.reset();g.fire('saveSnapshot');};g.on('updateSnapshot',function(){if(h.currentImage&&new a(g).equals(h.currentImage))setTimeout(function(){h.update();},0);});}});CKEDITOR.plugins.undo={};var a=CKEDITOR.plugins.undo.Image=function(g){this.editor=g;g.fire('beforeUndoImage');var h=g.getSnapshot(),i=h&&g.getSelection();CKEDITOR.env.ie&&h&&(h=h.replace(/\s+data-cke-expando=".*?"/g,''));this.contents=h;this.bookmarks=i&&i.createBookmarks2(true);g.fire('afterUndoImage');},b=/\b(?:href|src|name)="[^"]*?"/gi;a.prototype={equals:function(g,h){var i=this.contents,j=g.contents;if(CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.ie6Compat)){i=i.replace(b,'');j=j.replace(b,'');}if(i!=j)return false;if(h)return true;var k=this.bookmarks,l=g.bookmarks;if(k||l){if(!k||!l||k.length!=l.length)return false;for(var m=0;m<k.length;m++){var n=k[m],o=l[m];if(n.startOffset!=o.startOffset||n.endOffset!=o.endOffset||!CKEDITOR.tools.arrayCompare(n.start,o.start)||!CKEDITOR.tools.arrayCompare(n.end,o.end))return false;}}return true;}};function c(g){this.editor=g;this.reset();};var d={8:1,46:1},e={16:1,17:1,18:1},f={37:1,38:1,39:1,40:1};c.prototype={type:function(g){var h=g&&g.data.getKey(),i=h in e,j=h in d,k=this.lastKeystroke in d,l=j&&h==this.lastKeystroke,m=h in f,n=this.lastKeystroke in f,o=!j&&!m,p=j&&!l,q=!(i||this.typing)||o&&(k||n);if(q||p){var r=new a(this.editor);
CKEDITOR.tools.setTimeout(function(){var t=this;var s=t.editor.getSnapshot();if(CKEDITOR.env.ie)s=s.replace(/\s+data-cke-expando=".*?"/g,'');if(r.contents!=s){t.typing=true;if(!t.save(false,r,false))t.snapshots.splice(t.index+1,t.snapshots.length-t.index-1);t.hasUndo=true;t.hasRedo=false;t.typesCount=1;t.modifiersCount=1;t.onChange();}},0,this);}this.lastKeystroke=h;if(j){this.typesCount=0;this.modifiersCount++;if(this.modifiersCount>25){this.save(false,null,false);this.modifiersCount=1;}}else if(!m){this.modifiersCount=0;this.typesCount++;if(this.typesCount>25){this.save(false,null,false);this.typesCount=1;}}},reset:function(){var g=this;g.lastKeystroke=0;g.snapshots=[];g.index=-1;g.limit=g.editor.config.undoStackSize||20;g.currentImage=null;g.hasUndo=false;g.hasRedo=false;g.resetType();},resetType:function(){var g=this;g.typing=false;delete g.lastKeystroke;g.typesCount=0;g.modifiersCount=0;},fireChange:function(){var g=this;g.hasUndo=!!g.getNextImage(true);g.hasRedo=!!g.getNextImage(false);g.resetType();g.onChange();},save:function(g,h,i){var k=this;var j=k.snapshots;if(!h)h=new a(k.editor);if(h.contents===false)return false;if(k.currentImage&&h.equals(k.currentImage,g))return false;j.splice(k.index+1,j.length-k.index-1);if(j.length==k.limit)j.shift();k.index=j.push(h)-1;k.currentImage=h;if(i!==false)k.fireChange();return true;},restoreImage:function(g){var i=this;i.editor.loadSnapshot(g.contents);if(g.bookmarks)i.editor.getSelection().selectBookmarks(g.bookmarks);else if(CKEDITOR.env.ie){var h=i.editor.document.getBody().$.createTextRange();h.collapse(true);h.select();}i.index=g.index;i.update();i.fireChange();},getNextImage:function(g){var l=this;var h=l.snapshots,i=l.currentImage,j,k;if(i)if(g)for(k=l.index-1;k>=0;k--){j=h[k];if(!i.equals(j,true)){j.index=k;return j;}}else for(k=l.index+1;k<h.length;k++){j=h[k];if(!i.equals(j,true)){j.index=k;return j;}}return null;},redoable:function(){return this.enabled&&this.hasRedo;},undoable:function(){return this.enabled&&this.hasUndo;},undo:function(){var h=this;if(h.undoable()){h.save(true);var g=h.getNextImage(true);if(g)return h.restoreImage(g),true;}return false;},redo:function(){var h=this;if(h.redoable()){h.save(true);if(h.redoable()){var g=h.getNextImage(false);if(g)return h.restoreImage(g),true;}}return false;},update:function(){var g=this;g.snapshots.splice(g.index,1,g.currentImage=new a(g.editor));}};})();