/*
 Copyright (c) 2009 ToI-Planning <office@toi-planning.net> All rights reserved.
 For licensing, see LICENSE-Plugin.html
*/
MT.App.Editor.Iframe = new Class( Editor.Iframe, {

    version: '0.1',
    changed: false,

    initObject: function(element, mode) {
        arguments.callee.applySuper( this, arguments );

		this.textarea_initialized = false;
		this.set_html_on_init = false;

		this.ckeditorShow();

		var interval = 5*1000;
		var editor = this;
		function callSetChanged() {
			if (window.app) {
				if (! editor.changed) {
					editor.setChanged();
					setTimeout(callSetChanged, interval);
				}
			}
			else {
				setTimeout(callSetChanged, interval);
			}
		}
		setTimeout(callSetChanged, interval);
    },

	ckeditorInitialized: function(func) {
		if (this.ckeditor) {
			func.apply(this, []);
		}
		else {
			var editor = this;
			var id = setInterval(function() {
				if (editor.ckeditor) {
					clearInterval(id);
					func.apply(editor, []);
				}
			}, 100);
		}
	},

	ckeditorShow: function() {
		var id = 'editor-content-textarea';
		var editor = this;
		setTimeout(function() {
			CKEDITOR.replace(id, {
				on: {
					instanceReady: function(ev) {
						editor.ckeditor = CKEDITOR.instances[id];
					}
				}
			});
		}, 0);
	},

	ckeditorHide: function() {
		this.ckeditorInitialized(function() {
			this.ckeditor.destroy();
		});
	},

	ckeditorHideAndSetInitial: function(value) {
		this.ckeditorInitialized(function() {
			//this.ckeditor.hide();
			//this.ckeditor.getElement().value = this.initial_contents;
			this.ckeditor.destroy();
		});
	},

    /* Clear the dirty flag on the editor ( dirty == modified ) */
    clearDirty: function() {
		this.ckeditorInitialized(function() {
			this.ckeditor.resetDirty();
			this.changed = false;
		});
    },

    /* Called to set the dirty bit on the editor and call */
    setChanged: function(key) {
		if (
			window.app
			&& window.app.eventSubmitForm
			&& window.app.eventSubmitForm.submitted
		) {
			return;
		}

		this.ckeditorInitialized(function() {
			if (! this.ckeditor.checkDirty()) {
				return;
			}

			this.changed = true;
			if (window.app) {
				this.parent.setChanged();
			}
		});
    },

    /* Focus the editor, forcing the cursor into the textarea or iframe */
    focus: function() {
		this.ckeditorInitialized(function() {
			this.ckeditor.focus();
		});
    },

    /* Get the editor content as html/xhtml */
    getHTML: function() {
        return this.ckeditor.getData();
    },

    /* Get the editor content as xhtml ( if possible, else return html ) */
    getXHTML: function() {
        return this.ckeditor.getData();
    },

    /* Set the html content of the editor */
    setHTML: function(value) {
		this.ckeditorInitialized(function() {
			/*
			if (! this.textarea_initialized) {
				document.getElementById(this.ckeditor.id).value = value;
				this.textarea_initialized = true;
				this.set_html_on_init = true;
			}
			*/
			this.ckeditor.setData(value);
			if (! this.textarea_initialized) {
				var editor = this;
				setTimeout(function() {
					editor.ckeditor.resetDirty();
					editor.textarea_initialized = true;
				}, 500);
			}
		});
    },

    /* Insert html into the editor, the editor should insert it at the cursor */
    insertHTML: function(value) {
		this.ckeditorInitialized(function() {
			/*
			this.ckeditor.focus();
			this.ckeditor.selection.moveToBookmark(
				this.ckeditor.movabletype_plugin_bookmark
			);
			this.ckeditor.execCommand('mceInsertContent', false, value);
			*/
			this.ckeditor.insertHtml(value);
		});
    },

    /* Check the dirty status */
    isDirty: function() {
        return this.ckeditor.checkDirty() || this.changed;
    },

	placement: null
} );


App.singletonConstructor =
MT.App = new Class( MT.App, {
    initEditor: function() {
        arguments.callee.applySuper( this, arguments );

        if ( this.constructor.Editor && DOM.getElement( "editor-content" ) ) {
            var mode = DOM.getElement( "convert_breaks" );
			this.ckeditorUpdateTextareaMode(mode.value);
        }
    },

    /* Called to fix the html in the editor before a save, or an insert.
     * inserted will be defined if called to fix inserted text
     */
    fixHTML: function( inserted ) { },

	ckeditorUpdateTextareaMode: function(mode) {
		var formated = getByID('formatted');
		var resizer = (function() {
			var divs = formated.getElementsByTagName('div');
			for (var i = 0; i < divs.length; i++) {
				if (divs[i].className.match(/resizer/)) {
					return divs[i];
				}
			}
			return null;
		})();
		var enclosure = getByID('editor-content-enclosure');

		if (mode == 'richtext') {
			getByID('editor-content-toolbar').style.display = 'none';
			getByID('editor-content-iframe').style.display = 'none';
			resizer.style.display = 'none';

			enclosure.save_border_width = enclosure.style.borderWidth;
			enclosure.save_height = enclosure.style.height;

			enclosure.style.borderWidth = '0px';
			enclosure.style.height = 'auto';

			if (this.editor.iframe) {
				this.editor.iframe.ckeditorShow();
			}
		}
		else if (! this.last_mode || this.last_mode == 'richtext') {
			getByID('editor-content-toolbar').style.display = '';
			getByID('editor-content-iframe').style.display = '';
			resizer.style.display = '';

			enclosure.style.borderWidth = enclosure.save_border_width || '';
			enclosure.style.height = enclosure.save_height || '250px';

			if (this.editor.iframe) {
				if (! this.last_mode) {
					this.editor.iframe.ckeditorHideAndSetInitial();
				}
				else {
					this.editor.iframe.ckeditorHide();
				}
			}
        }

		this.last_mode = mode;
	},

    /* Called to set the editor to non rich text mode */
    setTextareaMode: function( event ) {
		this.ckeditorUpdateTextareaMode(event.target.value);
        arguments.callee.applySuper(this, arguments);
    },

    /* This clears the editor's dirty flag */
    clearDirty: function() {
		if (this.editor.iframe) {
			this.editor.iframe.clearDirty();
		}
        return arguments.callee.applySuper(this, arguments);
    },

	placement: null
});
