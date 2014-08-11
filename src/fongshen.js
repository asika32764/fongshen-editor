/**
 * Part of Fongshen project.
 *
 * @copyright  Copyright (C) 2014 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

;(function($)
{
	/**
	 * This is Fongshen object.
	 */
	var self, Fongshen, Class;

	/**
	 * Constructor.
	 *
	 * @param {Element} element   The editor container.
	 * @param {Object}  adapter   The editor adapter, default is AceEditor.
	 * @param {Object}  options   The option object.
	 *
	 * @constructor
	 */
	Class = Fongshen = function(element, adapter, options)
	{
		var defaultOptions = {
			id: '',
			namespace: (Math.random() + '').replace('0.', 'ns-'),
			onShiftEnter: '',
			beforeInsert: null,
			afterMultiInsert: null,
			beforeMultiInsert: null,
			afterInsert: null,
			previewContainer: null,
			previewHandler: null,
			previewAjaxPath: null,
			previewAjaxVar: 'data',
			autoPreview: true,
			autoPreviewDelay: 2,
			resize: true,
			buttons: {}
		};

		options = options||{};

		this.options = $.extend(defaultOptions, options);
		this.element = $(element);
		this.editor = adapter || new AceAdapter;

		self = this;

		this.initialise(this.element);
	};

	/**
	 * Initialise.
	 *
	 * @param {Element} element
	 */
	Class.prototype.initialise = function(element)
	{
		var options = this.options;

		wrap(options.id, options.namespace);

		this.editor.initialise(element);

		registerEvents();
	};

	/**
	 * Get editor adapter.
	 *
	 * @returns {Object}
	 */
	Class.prototype.getEditor = function()
	{
		return this.editor;
	};

	/**
	 * Use prompter to ask user questions.
	 *
	 * @param {String} question
	 * @param {String} defaultVar
	 *
	 * @returns {String}
	 */
	Class.prototype.ask = function(question, defaultVar)
	{
		defaultVar = defaultVar||'';

		var value = prompt(question, defaultVar);

		if (value === null)
		{
			throw "User abort.";
		}

		return value;
	};

	/**
	 * Manually add custom button.
	 *
	 * @param {Element|String} ele    Button element, a selector string or an element.
	 * @param {Object}         button The button profile options.
	 */
	Class.prototype.registerButton = function(ele, button)
	{
		if (typeof ele == 'string')
		{
			ele = $(ele);
		}

		ele.bind('click.fongshen', function(e)
		{
			e.preventDefault();
		}).bind("focusin.fongshen", function()
		{
			self.editor.focus();
		}).bind('mouseup', function()
		{
			if (button.call)
			{
				self[button.call]();
			}

			setTimeout(function()
			{
				insert(button)
			}, 1);

			return false;
		});
	};

	/**
	 * Refresh preview.
	 */
	Class.prototype.refreshPreview = function()
	{
		self.element.trigger('Fongshen.BeforePreview', this.editor.getValue(), self);

		renderPreview();

		self.element.trigger('Fongshen.AfterPreview', this.editor.getValue(), self);
	};

	/**
	 * Create preview container if `options.previewElement` not exists.
	 */
	Class.prototype.createPreview = function()
	{
		if (!self.options.previewContainer)
		{
			var container = $('<div class="fongshen-preview"></div>');

			container.insertAfter(self.footer);

			self.options.previewContainer = container;
		}
	};

	/**
	 * Register events.
	 */
	var registerEvents = function()
	{
		// Auto preview
		if (self.options.autoPreview)
		{
			self.refreshBlock = self.options.autoPreviewDelay;

			setInterval(function()
			{
				self.refreshBlock--;

				if (self.refreshBlock < 0)
				{
					self.refreshBlock = 0;
				}
			},1000);

			self.editor.bind('keyup.fongshen', function()
			{
				self.refreshBlock = self.options.autoPreviewDelay;

				setTimeout(function()
				{
					if (!self.refreshBlock)
					{
						self.refreshPreview();
					}
				}, self.options.autoPreviewDelay * 1000 + 100);
			});
		}

		// remember the last focus
		self.element.bind('focus.fongshen', function()
		{
			$.fongshen.focused = this;
		});

		if (self.options.previewContainer)
		{
			self.refreshPreview();
		}
	};

	/**
	 * Wrap editor.
	 *
	 * @param {String} id Id.
	 * @param {String} ns Namespace.
	 */
	var wrap = function(id, ns)
	{
		var toolbar,
			footer;

		id = 'id="' + id + '"';

		self.element.wrap('<div ' + id + ' class="fongshen fongshen-container ' + ns + '"></div>');

		// Toolbar
		self.toolbar = toolbar = $('<div class="fongshen-toolbar"></div>').insertBefore(self.element);

		if (self.options.buttons)
		{
			$(createMenus(self.options.buttons, toolbar)).appendTo(toolbar);
		}

		// Footer
		self.footer = footer = $('<div class="fongshen-footer"></div>').insertAfter(self.element);

		// add the resize handle after Editor
		if (self.options.resize === true)
		{
			var resizeHandle = $('<div class="fongshen-resize-handler"></div>')
				.insertAfter(self.element)
				.bind("mousedown.fongshen", function(e)
				{
					var h = self.element.height(),
						y = e.clientY, mouseMove, mouseUp;

					mouseMove = function(e) {
						self.element.css("height", Math.max(20, e.clientY+h-y)+"px");
						return false;
					};
					mouseUp = function(e) {
						$("html").unbind("mousemove.fongshen", mouseMove).unbind("mouseup.fongshen", mouseUp);

						self.element.on('Fongshen.BeforeResize');

						self.editor.resize();

						self.element.on('Fongshen.AfterResize');

						return false;
					};
					$("html").bind("mousemove.fongshen", mouseMove).bind("mouseup.fongshen", mouseUp);
				});

			self.footer.append(resizeHandle);
		}
	};

	/**
	 * Create menus.
	 *
	 * @param {Array}       buttonset
	 * @param {HTMLElement} toolbar
	 *
	 * @returns {HTMLElement}
	 */
	var createMenus = function(buttonset, toolbar)
	{
		var ul = $('<ul></ul>'),
			i = 1,
			levels = [];

		$('li:hover > ul', ul).css('display', 'block');

		$.each(buttonset, function(name)
		{
			var button = this,
				t = '',
				title,
				key,
				li,
				j;

			title = (button.key) ? (button.name||'')+' [Ctrl+'+button.key+']' : (button.name||'');
			key   = (button.key) ? 'accesskey="'+button.key+'"' : '';

			if (button.separator)
			{
				li = $('<li class="fongshen-separator">' + (button.separator || '') + '</li>').appendTo(ul);
			}
			else
			{
				for (j = levels.length -1; j >= 0; j--) {
					t += levels[j]+"-";
				}

				li = $('<li class="fongshen-button fongshen-button-'+t+(i)+' '+(button.className||'fs-btn-' + name)+'"><a href="" '+key+' title="'+title+'">'+(button.name||'')+'</a></li>')
					.bind('mouseenter.fongshen', function()
					{
						$('> ul', this).show();

						$(document).one('click', function()
						{
							// close dropmenu if click outside
							$('ul ul', toolbar).hide();
						});
					}).bind('mouseleave.fongshen', function()
					{
						$('> ul', this).hide();
					}).appendTo(ul);

				self.registerButton(li, button);

				if (button.dropMenus)
				{
					levels.push(i);
					$(li).addClass('fongshen-dropmenu').append(createMenus(button.dropMenus));
				}

				i++;
			}
		});

		levels.pop();

		return ul;
	};

	/**
	 * Insert button value.
	 *
	 * @param {Object} button Button profile.
	 */
	var insert = function(button)
	{
		var selection = self.editor.getSelection(),
			string;

		try
		{
			// callbacks before insertion
			trigger(self.options.beforeInsert, button);
			trigger(button.beforeInsert, button);

			// callbacks after insertion
			if (button.multiline === true)
			{
				trigger(button.beforeMultiInsert, button);
			}

			self.line = 1;

			if (button.multiline === true && selection)
			{
				var lines = selection.split(/\r?\n/);

				for (var l = 0; l < lines.length; l++)
				{
					self.line = l + 1;

					lines[l] = buildBlock(lines[l], button).block;
				}

				selection = lines.join("\n");

				button.openWith = null;
			}

			string = buildBlock(selection, button);

			doInsert(string);

			// callbacks after insertion
			if (button.multiline === true)
			{
				trigger(button.afterMultiInsert, button);
			}

			trigger(button.afterInsert, button);
			trigger(self.options.afterInsert, button);
		}
		catch (err)
		{
			console.log(err);
		}

		// refresh preview if opened
		if (self.options.previewContainer)
		{
			self.refreshPreview();
		}
	};

	/**
	 * Insert action.
	 *
	 * @param string
	 */
	var doInsert = function(string)
	{
		var selection = self.editor.getSelection();

		if (selection)
		{
			self.editor.insert(string.block);
		}
		else
		{
			self.editor.insert(string.block);

			var backOffset = string.closeWith.length;

			self.editor.moveCursor(0, -backOffset);
		}
	};

	/**
	 * Build button insertion.
	 *
	 * @param string
	 * @param button
	 * @returns {{block: *, openBlockWith: , openWith: , replaceWith: , placeHolder: , closeWith: , closeBlockWith: }}
	 */
	var buildBlock = function(string, button)
	{
		var openWith = trigger(button.openWith, button);
		var placeHolder = trigger(button.placeHolder, button);
		var replaceWith = trigger(button.replaceWith, button);
		var closeWith = trigger(button.closeWith, button);
		var openBlockWith = trigger(button.openBlockWith, button);
		var closeBlockWith = trigger(button.closeBlockWith, button);
		var multiline = button.multiline;
		var block;

		if (replaceWith !== "")
		{
			block = openWith + replaceWith + closeWith;
		}
		else if (string === '' && placeHolder !== '')
		{
			block = openWith + placeHolder + closeWith;
		}
		else
		{
			var lines = [string], blocks = [];

			if (multiline === true)
			{
				lines = string.split(/\r?\n/);
			}

			for (var l = 0; l < lines.length; l++)
			{
				var line = lines[l];
				var trailingSpaces;

				if (trailingSpaces = line.match(/ *$/))
				{
					blocks.push(openWith + line.replace(/ *$/g, '') + closeWith + trailingSpaces);
				}
				else
				{
					blocks.push(openWith + line + closeWith);
				}
			}

			block = blocks.join("\n");
		}

		block = openBlockWith + block + closeBlockWith;

		return {
			block: block,
			openBlockWith: openBlockWith,
			openWith: openWith,
			replaceWith: replaceWith,
			placeHolder: placeHolder,
			closeWith: closeWith,
			closeBlockWith: closeBlockWith
		};
	};

	/**
	 * Trigger button hooks.
	 *
	 * @param action
	 * @param button
	 *
	 * @returns {*}
	 */
	var trigger = function(action, button)
	{
		if ($.isFunction(action))
		{
			action = action(self);
		}
		
		if (action === null || action === undefined)
		{
			return '';
		}

		return action;
	};

	/**
	 * Render preview.
	 */
	var renderPreview = function()
	{
		if (!self.options.previewContainer)
		{
			return;
		}

		if (typeof self.options.previewContainer == 'string')
		{
			self.options.previewContainer = $(self.options.previewContainer);
		}

		if (self.options.previewHandler && typeof self.options.previewHandler === 'function')
		{
			self.options.previewHandler(self.editor.getValue(), self);
		}
		else if (self.options.previewAjaxPath)
		{
			$.ajax({
				type: 'POST',
				dataType: 'text',
				global: false,
				url: self.options.previewAjaxPath,
				data: self.options.previewAjaxVar + '=' + encodeURIComponent(self.editor.getValue()),
				success: function(data)
				{
					$(self.options.previewContainer).html(data);
				}
			});
		}
	};

	/**
	 * Plugin of Fongshen.
	 *
	 * @param {Object} adapter
	 * @param {Object} options
	 *
	 * @returns {*|$.fn}
	 */
	$.fn.fongshen = function(adapter, options)
	{
		var ele = [];

		this.each(function()
		{
			var $this = $(this),
				editor = new Class(this, adapter, options);

			ele.push(editor);

			$this.data('Fongshen', editor);
		});

		return ele[0] || this;
	};

	/**
	 * Plugin to get Fongshen object.
	 *
	 * @returns {Fongshen}
	 */
	$.fn.getFongshen = function()
	{
		return $(this).data('Fongshen');
	};

	window.Fongshen = Class;
})(jQuery);
