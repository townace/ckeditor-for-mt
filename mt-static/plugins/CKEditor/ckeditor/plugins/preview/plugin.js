﻿(function(){var a={modes:{wysiwyg:1,source:1},canUndo:false,exec:function(c){var d,e=c.config,f=e.baseHref?'<base href="'+e.baseHref+'"/>':'',g=CKEDITOR.env.isCustomDomain();if(e.fullPage)d=c.getData().replace(/<head>/,'$&'+f).replace(/[^>]*(?=<\/title>)/,'$& &mdash; '+c.lang.preview);else{var h='<body ',i=c.document&&c.document.getBody();if(i){if(i.getAttribute('id'))h+='id="'+i.getAttribute('id')+'" ';if(i.getAttribute('class'))h+='class="'+i.getAttribute('class')+'" ';}h+='>';d=c.config.docType+'<html dir="'+c.config.contentsLangDirection+'">'+'<head>'+f+'<title>'+c.lang.preview+'</title>'+CKEDITOR.tools.buildStyleHtml(c.config.contentsCss)+'</head>'+h+c.getData()+'</body></html>';}var j=640,k=420,l=80;try{var m=window.screen;j=Math.round(m.width*0.8);k=Math.round(m.height*0.7);l=Math.round(m.width*0.1);}catch(p){}var n='';if(g){window._cke_htmlToLoad=d;n='javascript:void( (function(){document.open();document.domain="'+document.domain+'";'+'document.write( window.opener._cke_htmlToLoad );'+'document.close();'+'window.opener._cke_htmlToLoad = null;'+'})() )';}var o=window.open(n,null,'toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width='+j+',height='+k+',left='+l);if(!g){o.document.open();o.document.write(d);o.document.close();}}},b='preview';CKEDITOR.plugins.add(b,{init:function(c){c.addCommand(b,a);c.ui.addButton('Preview',{label:c.lang.preview,command:b});}});})();