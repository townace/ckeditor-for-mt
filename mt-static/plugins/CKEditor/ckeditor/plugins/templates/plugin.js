﻿(function(){CKEDITOR.plugins.add('templates',{requires:['dialog'],init:function(c){CKEDITOR.dialog.add('templates',CKEDITOR.getUrl(this.path+'dialogs/templates.js'));c.addCommand('templates',new CKEDITOR.dialogCommand('templates'));c.ui.addButton('Templates',{label:c.lang.templates.button,command:'templates'});}});var a={},b={};CKEDITOR.addTemplates=function(c,d){a[c]=d;};CKEDITOR.getTemplates=function(c){return a[c];};CKEDITOR.loadTemplates=function(c,d){var e=[];for(var f=0,g=c.length;f<g;f++){if(!b[c[f]]){e.push(c[f]);b[c[f]]=1;}}if(e.length)CKEDITOR.scriptLoader.load(e,d);else setTimeout(d,0);};})();CKEDITOR.config.templates_files=[CKEDITOR.getUrl('plugins/templates/templates/default.js')];CKEDITOR.config.templates_replaceContent=true;
