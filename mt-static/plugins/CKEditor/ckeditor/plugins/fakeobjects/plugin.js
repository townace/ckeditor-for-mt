﻿(function(){var a={elements:{$:function(b){var c=b.attributes,d=c&&c['data-cke-realelement'],e=d&&new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(d)),f=e&&e.children[0];if(f&&b.attributes['data-cke-resizable']){var g=b.attributes.style;if(g){var h=/(?:^|\s)width\s*:\s*(\d+)/i.exec(g),i=h&&h[1];h=/(?:^|\s)height\s*:\s*(\d+)/i.exec(g);var j=h&&h[1];if(i)f.attributes.width=i;if(j)f.attributes.height=j;}}return f;}}};CKEDITOR.plugins.add('fakeobjects',{requires:['htmlwriter'],afterInit:function(b){var c=b.dataProcessor,d=c&&c.htmlFilter;if(d)d.addRules(a);}});})();CKEDITOR.editor.prototype.createFakeElement=function(a,b,c,d){var e=this.lang.fakeobjects,f=e[c]||e.unknown,g={'class':b,src:CKEDITOR.getUrl('images/spacer.gif'),'data-cke-realelement':encodeURIComponent(a.getOuterHtml()),'data-cke-real-node-type':a.type,alt:f,title:f,align:a.getAttribute('align')||''};if(c)g['data-cke-real-element-type']=c;if(d)g['data-cke-resizable']=d;return this.document.createElement('img',{attributes:g});};CKEDITOR.editor.prototype.createFakeParserElement=function(a,b,c,d){var e=this.lang.fakeobjects,f=e[c]||e.unknown,g,h=new CKEDITOR.htmlParser.basicWriter();a.writeHtml(h);g=h.getHtml();var i={'class':b,src:CKEDITOR.getUrl('images/spacer.gif'),'data-cke-realelement':encodeURIComponent(g),'data-cke-real-node-type':a.type,alt:f,title:f,align:a.attributes.align||''};if(c)i['data-cke-real-element-type']=c;if(d)i['data-cke-resizable']=d;return new CKEDITOR.htmlParser.element('img',i);};CKEDITOR.editor.prototype.restoreRealElement=function(a){if(a.data('cke-real-node-type')!=CKEDITOR.NODE_ELEMENT)return null;return CKEDITOR.dom.element.createFromHtml(decodeURIComponent(a.data('cke-realelement')),this.document);};
