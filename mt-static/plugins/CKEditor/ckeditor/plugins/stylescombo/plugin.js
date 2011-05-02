﻿(function(){CKEDITOR.plugins.add('stylescombo',{requires:['richcombo','styles'],init:function(b){var c=b.config,d=b.lang.stylesCombo,e={},f=[];function g(h){b.getStylesSet(function(i){if(!f.length){var j,k;for(var l=0,m=i.length;l<m;l++){var n=i[l];k=n.name;j=e[k]=new CKEDITOR.style(n);j._name=k;j._.enterMode=c.enterMode;f.push(j);}f.sort(a);}h&&h();});};b.ui.addRichCombo('Styles',{label:d.label,title:d.panelTitle,className:'cke_styles',panel:{css:b.skin.editor.css.concat(c.contentsCss),multiSelect:true,attributes:{'aria-label':d.panelTitle}},init:function(){var h=this;g(function(){var i,j,k,l,m,n;for(m=0,n=f.length;m<n;m++){i=f[m];j=i._name;l=i.type;if(l!=k){h.startGroup(d['panelTitle'+String(l)]);k=l;}h.add(j,i.type==CKEDITOR.STYLE_OBJECT?j:i.buildPreview(),j);}h.commit();h.onOpen();});},onClick:function(h){b.focus();b.fire('saveSnapshot');var i=e[h],j=b.getSelection(),k=new CKEDITOR.dom.elementPath(j.getStartElement());i[i.checkActive(k)?'remove':'apply'](b.document);b.fire('saveSnapshot');},onRender:function(){b.on('selectionChange',function(h){var i=this.getValue(),j=h.data.path,k=j.elements;for(var l=0,m=k.length,n;l<m;l++){n=k[l];for(var o in e){if(e[o].checkElementRemovable(n,true)){if(o!=i)this.setValue(o);return;}}}this.setValue('');},this);},onOpen:function(){var o=this;if(CKEDITOR.env.ie||CKEDITOR.env.webkit)b.focus();var h=b.getSelection(),i=h.getSelectedElement(),j=new CKEDITOR.dom.elementPath(i||h.getStartElement()),k=[0,0,0,0];o.showAll();o.unmarkAll();for(var l in e){var m=e[l],n=m.type;if(m.checkActive(j))o.mark(l);else if(n==CKEDITOR.STYLE_OBJECT&&!m.checkApplicable(j)){o.hideItem(l);k[n]--;}k[n]++;}if(!k[CKEDITOR.STYLE_BLOCK])o.hideGroup(d['panelTitle'+String(CKEDITOR.STYLE_BLOCK)]);if(!k[CKEDITOR.STYLE_INLINE])o.hideGroup(d['panelTitle'+String(CKEDITOR.STYLE_INLINE)]);if(!k[CKEDITOR.STYLE_OBJECT])o.hideGroup(d['panelTitle'+String(CKEDITOR.STYLE_OBJECT)]);}});b.on('instanceReady',function(){g();});}});function a(b,c){var d=b.type,e=c.type;return d==e?0:d==CKEDITOR.STYLE_OBJECT?-1:e==CKEDITOR.STYLE_OBJECT?1:e==CKEDITOR.STYLE_BLOCK?1:-1;};})();
