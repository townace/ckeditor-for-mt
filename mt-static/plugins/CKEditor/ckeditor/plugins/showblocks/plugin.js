﻿(function(){var a='.%2 p,.%2 div,.%2 pre,.%2 address,.%2 blockquote,.%2 h1,.%2 h2,.%2 h3,.%2 h4,.%2 h5,.%2 h6{background-repeat: no-repeat;background-position: top %3;border: 1px dotted gray;padding-top: 8px;padding-%3: 8px;}.%2 p{%1p.png);}.%2 div{%1div.png);}.%2 pre{%1pre.png);}.%2 address{%1address.png);}.%2 blockquote{%1blockquote.png);}.%2 h1{%1h1.png);}.%2 h2{%1h2.png);}.%2 h3{%1h3.png);}.%2 h4{%1h4.png);}.%2 h5{%1h5.png);}.%2 h6{%1h6.png);}',b=/%1/g,c=/%2/g,d=/%3/g,e={preserveState:true,editorFocus:false,exec:function(f){this.toggleState();this.refresh(f);},refresh:function(f){var g=this.state==CKEDITOR.TRISTATE_ON?'addClass':'removeClass';f.document.getBody()[g]('cke_show_blocks');}};CKEDITOR.plugins.add('showblocks',{requires:['wysiwygarea'],init:function(f){var g=f.addCommand('showblocks',e);g.canUndo=false;if(f.config.startupOutlineBlocks)g.setState(CKEDITOR.TRISTATE_ON);f.addCss(a.replace(b,'background-image: url('+CKEDITOR.getUrl(this.path)+'images/block_').replace(c,'cke_show_blocks ').replace(d,f.lang.dir=='rtl'?'right':'left'));f.ui.addButton('ShowBlocks',{label:f.lang.showBlocks,command:'showblocks'});f.on('mode',function(){if(g.state!=CKEDITOR.TRISTATE_DISABLED)g.refresh(f);});f.on('contentDom',function(){if(g.state!=CKEDITOR.TRISTATE_DISABLED)g.refresh(f);});}});})();
