﻿CKEDITOR.plugins.add('pagebreak',{init:function(a){a.addCommand('pagebreak',CKEDITOR.plugins.pagebreakCmd);a.ui.addButton('PageBreak',{label:a.lang.pagebreak,command:'pagebreak'});a.addCss('img.cke_pagebreak{background-image: url('+CKEDITOR.getUrl(this.path+'images/pagebreak.gif')+');'+'background-position: center center;'+'background-repeat: no-repeat;'+'clear: both;'+'display: block;'+'float: none;'+'width:100% !important; _width:99.9% !important;'+'border-top: #999999 1px dotted;'+'border-bottom: #999999 1px dotted;'+'height: 5px !important;'+'page-break-after: always;'+'}');},afterInit:function(a){var b=a.dataProcessor,c=b&&b.dataFilter;if(c)c.addRules({elements:{div:function(d){var e=d.attributes,f=e&&e.style,g=f&&d.children.length==1&&d.children[0],h=g&&g.name=='span'&&g.attributes.style;if(h&&/page-break-after\s*:\s*always/i.test(f)&&/display\s*:\s*none/i.test(h)){var i=a.createFakeParserElement(d,'cke_pagebreak','div'),j=a.lang.pagebreakAlt;i.attributes.alt=j;i.attributes['aria-label']=j;return i;}}}});},requires:['fakeobjects']});CKEDITOR.plugins.pagebreakCmd={exec:function(a){var b=a.lang.pagebreakAlt,c=CKEDITOR.dom.element.createFromHtml('<div style="page-break-after: always;"><span style="display: none;">&nbsp;</span></div>');c=a.createFakeElement(c,'cke_pagebreak','div');c.setAttributes({alt:b,'aria-label':b,title:b});var d=a.getSelection().getRanges(true);a.fire('saveSnapshot');for(var e,f=d.length-1;f>=0;f--){e=d[f];if(f<d.length-1)c=c.clone(true);e.splitBlock('p');e.insertNode(c);if(f==d.length-1){e.moveToPosition(c,CKEDITOR.POSITION_AFTER_END);e.select();}var g=c.getPrevious();if(g&&CKEDITOR.dtd[g.getName()].div)c.move(g);}a.fire('saveSnapshot');}};
