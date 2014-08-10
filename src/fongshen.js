/**
 * Part of Fongshen project.
 *
 * @copyright  Copyright (C) 2014 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

;(function($)
{
	var ClassName = 'Fongshen';

	var self,
		element,
		toolbar,
		footer,
		abort;

	var Class = window[ClassName] = function(element, adapter, options, myOptions)
	{
		var defaultOptions = {
			id: '',
			namespace: (Math.random() + '').replace('0.', 'ns-'),
			onShiftEnter: '',
			buttons: [{}]
		};

		options = options||{};
		myOptions = myOptions||{};

		this.options = $.extend(defaultOptions, options, myOptions);
		this.element = $(element);
		this.editor = adapter || new AceAdapter;

		self = this;

		this.initialise(this.element);
	};

	

	Class.prototype.initialise = function(element)
	{
		var options = this.options;

		wrap(options.id, options.namespace);

		registerEvents();

		this.editor.initialise(element);
	};

	Class.prototype.getEditor = function()
	{
		return this.editor;
	};

	Class.prototype.preview = function()
	{
		// TODO: Implement preview.
	};

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

	var registerEvents = function()
	{
		// listen key events
		// element.bind('keydown.fongshen', keyPressed).bind('keyup', keyPressed);

		// bind an event to catch external calls
		self.element.bind("insertion.fongshen", function(e, settings)
		{
			if (settings.target !== false)
			{
				get();
			}

			if (textarea === $.fongshen.focused)
			{
				insert(settings);
			}
		});

		// remember the last focus
		self.element.bind('focus.fongshen', function()
		{
			$.fongshen.focused = this;
		});

		if (self.options.previewInElement)
		{
			refreshPreview();
		}
	};

	var wrap = function(id, ns)
	{
		id = 'id="' + id + '"';

		self.element.wrap('<div ' + id + ' class="fongshen fongshen-container ' + ns + '"></div>');

		// Toolbar
		self.toolbar = toolbar = $('<div class="fongshen-toolbar"></div>').insertBefore(self.element);

		$(createMenus(self.options.buttons, toolbar)).appendTo(toolbar);

		// Footer
		this.footer = footer = $('<div class="fongshen-footer"></div>').insertAfter(self.element);

		// add the resize handle after textarea
		if (self.options.resize === true && self.browser.safari !== true) {
			var resizeHandle = $('<div class="fongshen-resize-handler"></div>')
				.insertAfter(self.element)
				.bind("mousedown.fongshen", function(e)
				{
					var h = element.height(),
						y = e.clientY, mouseMove, mouseUp;

					mouseMove = function(e) {
						element.css("height", Math.max(20, e.clientY+h-y)+"px");
						return false;
					};
					mouseUp = function(e) {
						$("html").unbind("mousemove.fongshen", mouseMove).unbind("mouseup.fongshen", mouseUp);

						this.editor.resize();

						return false;
					};
					$("html").bind("mousemove.fongshen", mouseMove).bind("mouseup.fongshen", mouseUp);
				});

			footer.append(resizeHandle);
		}
	};

	var createMenus = function(buttonset, toolbar)
	{
		var ul = $('<ul></ul>'),
			i = 0,
			levels = [];

		$('li:hover > ul', ul).css('display', 'block');

		$(buttonset).each(function()
		{
			var button = this,
				t = '',
				title,
				li,
				j;

			title = (button.key) ? (button.name||'')+' [Ctrl+'+button.key+']' : (button.name||'');
			key   = (button.key) ? 'accesskey="'+button.key+'"' : '';

			if (button.separator)
			{
				li = $('<li class="fongshen-separator">'+(button.separator||'')+'</li>').appendTo(ul);
			}
			else
			{
				i++;

				for (j = levels.length -1; j >= 0; j--) {
					t += levels[j]+"-";
				}

				li = $('<li class="fongshen-button fongshen-button-'+t+(i)+' '+(button.className||'')+'"><a href="" '+key+' title="'+title+'">'+(button.name||'')+'</a></li>')
					.bind("contextmenu.fongshen", function()
					{ // prevent contextmenu on mac and allow ctrl+click
						return false;
					}).bind('click.fongshen', function(e)
					{
						e.preventDefault();
					}).bind("focusin.fongshen", function()
					{
						self.element.focus();
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
					}).bind('mouseenter.fongshen', function()
					{
						$('> ul', this).show();

						$(document).one('click', function() { // close dropmenu if click outside
								$('ul ul', toolbar).hide();
							}
						);
					}).bind('mouseleave.fongshen', function()
					{
						$('> ul', this).hide();
					}).appendTo(ul);

				if (button.dropMenus)
				{
					levels.push(i);
					$(li).addClass('fongshen-dropmenu').append(createMenus(button.dropMenus));
				}
			}
		});

		levels.pop();

		return ul;
	};

	var insert = function(button)
	{
		var selection = self.editor.getCopyText(),
			string;

		try
		{
			// callbacks before insertion
			trigger(self.options.beforeInsert, button);
			trigger(button.beforeInsert, button);

			string = buildBlock(selection, button, selection);

			if (string.block !== selection)
			{
				doInsert(string);
			}

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
//		if (previewWindow && options.previewAutoRefresh)
//		{
//			refreshPreview();
//		}
	};

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

	var buildBlock = function(string, button, selection)
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
		else if (selection === '' && placeHolder !== '')
		{
			block = openWith + placeHolder + closeWith;
		}
		else
		{
			string = string || selection;

			var lines = [string], blocks = [];

			if (multiline === true)
			{
				lines = string.split(/\r?\n/);
			}

			for (var l = 0; l < lines.length; l++)
			{
				line = lines[l];
				var trailingSpaces;
				if (trailingSpaces = line.match(/ *$/))
				{
					blocks.push(openWith + line.replace(/ *$/g, '') + closeWith + trailingSpaces);
				} else
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

	$.fn[ClassName] = function(adapter, options, myOptions)
	{
		var el = [];

		this.each(function() {
			el.push(new window[ClassName](this, adapter, options, myOptions));
		});

		return el[0] || this;
	};
})(jQuery);
